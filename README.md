# Our Memories 💌

Álbum de recuerdos interactivo para parejas: collage tipo scrapbook, línea de
tiempo cronológica, favoritos, carta de amor y contador de aniversario en tiempo
real. Los datos se sincronizan entre dispositivos con **Firebase (Firestore)** y,
si Firebase no está configurado, la app sigue funcionando en **modo local**
(guardando en el navegador con `localStorage`).

Hecho con React 19 + Vite + Tailwind CSS v4.

## Correr localmente

**Requisitos:** Node.js 18+

1. Instala dependencias:
   ```bash
   npm install
   ```
2. (Opcional) Configura Firebase para sincronizar entre dispositivos. Copia
   `.env.example` a `.env` y rellena los valores de tu proyecto:
   ```bash
   cp .env.example .env
   ```
   Los valores se sacan de la consola de Firebase en
   *Project settings → General → Your apps → SDK setup and configuration*.
   Estas claves web **no son secretas** (viajan en el cliente); la seguridad se
   controla con las **reglas de Firestore** (ver abajo).
3. Arranca el servidor de desarrollo:
   ```bash
   npm run dev
   ```

## Scripts

- `npm run dev` — servidor de desarrollo (Vite) en el puerto 3000.
- `npm run build` — build de producción en `dist/`.
- `npm run preview` — sirve el build de producción localmente.
- `npm run lint` — chequeo de tipos con TypeScript (`tsc --noEmit`).

## Deploy

El build es estático (`npm run build` → `dist/`), listo para Vercel, Netlify o
cualquier hosting de estáticos. Recuerda definir las variables `VITE_FIREBASE_*`
en el panel del proveedor para que la sincronización funcione en producción.

## Seguridad de Firestore

La app guarda todo en la colección `app`. Antes de publicar, define reglas que
restrinjan el acceso; si dejas Firestore en "modo de prueba", cualquiera con la
URL podría leer o escribir tus recuerdos. Como mínimo, protege la colección con
autenticación o una condición que solo tu pareja y tú puedan cumplir.

## Nota sobre las fotos

Las fotos subidas se comprimen y redimensionan en el navegador antes de
guardarse como data URL dentro de Firestore (límite de 1 MB por documento). Si
prevés muchas fotos pesadas, considera migrar el almacenamiento de imágenes a
**Firebase Storage** y guardar solo la URL.
