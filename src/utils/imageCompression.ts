// Comprime y redimensiona una imagen a un data URL liviano.
//
// Las fotos se guardan como data URL (base64) dentro de un único documento de
// Firestore, que tiene un límite duro de 1 MB por documento. Una foto de móvil
// sin procesar (3-8 MB) revienta ese límite y la sincronización falla en
// silencio. Reescalar a un lado máximo razonable y recomprimir a JPEG deja cada
// imagen en ~100-250 KB, de modo que varias caben holgadamente.

const MAX_DIMENSION = 1280; // px del lado más largo
const JPEG_QUALITY = 0.82;

/**
 * Lee un File de imagen y devuelve un data URL JPEG comprimido y redimensionado.
 * Si algo falla (formato raro, canvas no disponible), cae al data URL original.
 */
export function compressImageFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('No se pudo leer el archivo.'));
    reader.onload = () => {
      const originalDataUrl = reader.result as string;
      const img = new Image();
      img.onerror = () => resolve(originalDataUrl); // fallback: usar tal cual
      img.onload = () => {
        try {
          let { width, height } = img;
          if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
            if (width >= height) {
              height = Math.round((height * MAX_DIMENSION) / width);
              width = MAX_DIMENSION;
            } else {
              width = Math.round((width * MAX_DIMENSION) / height);
              height = MAX_DIMENSION;
            }
          }
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (!ctx) return resolve(originalDataUrl);
          ctx.drawImage(img, 0, 0, width, height);
          const compressed = canvas.toDataURL('image/jpeg', JPEG_QUALITY);
          // Si por lo que sea la versión "comprimida" quedó más pesada, usa la original.
          resolve(compressed.length < originalDataUrl.length ? compressed : originalDataUrl);
        } catch {
          resolve(originalDataUrl);
        }
      };
      img.src = originalDataUrl;
    };
    reader.readAsDataURL(file);
  });
}
