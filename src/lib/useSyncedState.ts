import { useEffect, useRef, useState } from 'react';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db, isFirebaseConfigured } from './firebase';

type Updater<T> = T | ((prev: T) => T);

// Firestore NO admite valores `undefined` (lanza "Unsupported field value:
// undefined"). Un round-trip por JSON descarta las propiedades undefined y deja
// solo datos serializables, que es exactamente lo que también cacheamos en local.
function toFirestoreSafe(serialized: string | null, fallback: unknown): unknown {
  if (serialized != null) return JSON.parse(serialized);
  return JSON.parse(JSON.stringify(fallback ?? null));
}

// Evita spamear al usuario: como mucho un aviso de error de guardado cada 10 s.
let lastSaveErrorAlert = 0;
function notifySaveError(docId: string, err: unknown) {
  console.error('Error al guardar', docId, err);
  const now = Date.now();
  if (typeof window !== 'undefined' && now - lastSaveErrorAlert > 10_000) {
    lastSaveErrorAlert = now;
    // El caso típico: la imagen supera el límite de 1 MB por documento de Firestore.
    window.alert(
      'No se pudieron guardar los cambios en la nube (revisa tu conexión o el tamaño de la foto). ' +
        'Tus cambios siguen guardados en este dispositivo.'
    );
  }
}

/**
 * Estado sincronizado con Firestore en tiempo real.
 * - Si Firebase está configurado: la nube es la fuente de verdad; los cambios
 *   se propagan a todos los dispositivos vía onSnapshot.
 * - Si NO está configurado: cae en localStorage (modo local), igual que antes.
 * Cada documento se guarda como { value: <dato> } en la colección "app".
 */
export function useSyncedState<T>(
  docId: string,
  seed: T,
  localKey: string
): [T, (next: Updater<T>) => void, boolean] {
  const [value, setValue] = useState<T>(() => {
    try {
      const saved = localStorage.getItem(localKey);
      if (saved) return JSON.parse(saved) as T;
    } catch {
      // ignore
    }
    return seed;
  });
  const [loaded, setLoaded] = useState(!isFirebaseConfigured);
  const seedRef = useRef(seed);

  useEffect(() => {
    if (!isFirebaseConfigured || !db) {
      setLoaded(true);
      return;
    }
    const ref = doc(db, 'app', docId);
    const unsub = onSnapshot(
      ref,
      (snap) => {
        if (snap.exists()) {
          const data = snap.data() as { value?: T };
          if (data && 'value' in data) {
            setValue(data.value as T);
            try {
              localStorage.setItem(localKey, JSON.stringify(data.value));
            } catch {
              // ignore
            }
          }
        } else {
          // Primera vez: sembramos el documento con el contenido base.
          setDoc(ref, { value: toFirestoreSafe(null, seedRef.current) }).catch((e) =>
            console.error('Error al inicializar', docId, e)
          );
        }
        setLoaded(true);
      },
      (err) => {
        console.error('Error de sincronización', docId, err);
        setLoaded(true);
      }
    );
    return unsub;
  }, [docId, localKey]);

  const update = (next: Updater<T>) => {
    setValue((prev) => {
      const resolved =
        typeof next === 'function' ? (next as (p: T) => T)(prev) : next;
      let serialized: string | null = null;
      try {
        serialized = JSON.stringify(resolved);
      } catch {
        // valor no serializable; seguimos, Firestore usará el fallback
      }
      if (serialized != null) {
        try {
          localStorage.setItem(localKey, serialized);
        } catch {
          // ignore (p. ej. cuota de localStorage llena)
        }
      }
      if (isFirebaseConfigured && db) {
        try {
          // setDoc valida y puede lanzar de forma SÍNCRONA si los datos no son
          // válidos (p. ej. contienen `undefined`). Saneamos y lo envolvemos en
          // try/catch para que nunca rompa el renderizado de React.
          const safe = toFirestoreSafe(serialized, resolved);
          setDoc(doc(db, 'app', docId), { value: safe }).catch((e) =>
            notifySaveError(docId, e)
          );
        } catch (e) {
          notifySaveError(docId, e);
        }
      }
      return resolved;
    });
  };

  return [value, update, loaded];
}
