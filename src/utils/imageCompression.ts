// Comprime y redimensiona una imagen a un data URL JPEG liviano.
//
// Por qué importa, sobre todo en móvil:
//  - Las fotos se guardan como data URL (base64) dentro de un único documento de
//    Firestore, con límite duro de 1 MB por documento. Una foto de móvil sin
//    procesar (3-12 MP, 3-8 MB) revienta ese límite.
//  - Además, mantener y renderizar una imagen de varios MB en Safari iOS puede
//    agotar la memoria de la pestaña y hacer que la app se quede EN BLANCO.
//
// Por eso: decodificamos de forma eficiente (createImageBitmap directo del File,
// sin pasar por un base64 gigante), reescalamos, exportamos a JPEG y, si de
// verdad no se puede procesar (formato no soportado como HEIC en algunos
// navegadores, o resultado aún demasiado pesado), LANZAMOS un error claro en
// lugar de devolver una imagen enorme que rompería la app.

const MAX_DIMENSION = 1280; // px del lado más largo
const MAX_BYTES = 700 * 1024; // objetivo por imagen (~0,7 MB) para no acercarse al tope de Firestore

// Tamaño aproximado en bytes de un data URL base64.
function dataUrlBytes(dataUrl: string): number {
  const comma = dataUrl.indexOf(',');
  const base64 = comma >= 0 ? dataUrl.slice(comma + 1) : dataUrl;
  return Math.floor((base64.length * 3) / 4);
}

function targetSize(width: number, height: number, maxSide: number) {
  if (width <= maxSide && height <= maxSide) return { width, height };
  if (width >= height) {
    return { width: maxSide, height: Math.max(1, Math.round((height * maxSide) / width)) };
  }
  return { width: Math.max(1, Math.round((width * maxSide) / height)), height: maxSide };
}

// Decodifica el archivo a un ImageBitmap (rápido y ligero) o, si el navegador no
// soporta createImageBitmap, cae a un <img> + object URL.
async function decode(file: File): Promise<{ draw: CanvasImageSource; width: number; height: number; release: () => void }> {
  if (typeof createImageBitmap === 'function') {
    const bmp = await createImageBitmap(file);
    return { draw: bmp, width: bmp.width, height: bmp.height, release: () => bmp.close() };
  }
  const url = URL.createObjectURL(file);
  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const el = new Image();
      el.onload = () => resolve(el);
      el.onerror = () => reject(new Error('decode-failed'));
      el.src = url;
    });
    return { draw: img, width: img.naturalWidth, height: img.naturalHeight, release: () => URL.revokeObjectURL(url) };
  } catch (e) {
    URL.revokeObjectURL(url);
    throw e;
  }
}

/**
 * Devuelve un data URL JPEG comprimido y redimensionado, listo para guardar.
 * Lanza un Error si la imagen no se puede procesar o sigue siendo demasiado
 * grande; el llamador debe capturarlo y avisar al usuario.
 */
export async function compressImageFile(file: File): Promise<string> {
  let decoded;
  try {
    decoded = await decode(file);
  } catch {
    throw new Error(
      'No se pudo leer la imagen. Puede ser un formato no compatible (por ejemplo HEIC de iPhone). ' +
        'Prueba a exportarla como JPG o PNG.'
    );
  }

  try {
    const { draw, width, height } = decoded;
    // Intenta con el lado máximo y baja tamaño/calidad si el resultado pesa mucho.
    const attempts: Array<{ maxSide: number; quality: number }> = [
      { maxSide: MAX_DIMENSION, quality: 0.82 },
      { maxSide: MAX_DIMENSION, quality: 0.65 },
      { maxSide: 1024, quality: 0.6 },
      { maxSide: 800, quality: 0.55 },
    ];

    let best = '';
    for (const { maxSide, quality } of attempts) {
      const size = targetSize(width, height, maxSide);
      const canvas = document.createElement('canvas');
      canvas.width = size.width;
      canvas.height = size.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) break;
      ctx.drawImage(draw, 0, 0, size.width, size.height);
      const out = canvas.toDataURL('image/jpeg', quality);
      best = out;
      if (dataUrlBytes(out) <= MAX_BYTES) break;
    }

    if (!best) {
      throw new Error('No se pudo procesar la imagen en este dispositivo.');
    }
    if (dataUrlBytes(best) > MAX_BYTES) {
      throw new Error('La foto es demasiado grande incluso comprimida. Prueba con una imagen más pequeña.');
    }
    return best;
  } finally {
    // Si algo falló después de decodificar, libera la memoria del bitmap.
    try {
      decoded.release();
    } catch {
      // ya liberado
    }
  }
}
