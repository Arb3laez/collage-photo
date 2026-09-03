import { CoupleConfig, LoveQuote, Memory } from '../types';

export const INITIAL_COUPLE_CONFIG: CoupleConfig = {
  partner1Name: '',
  partner2Name: '',
  relationshipStartDate: '2022-09-15T18:30:00',
  anniversaryDate: '2026-09-15T00:00:00',
  motto: 'Eres la casualidad más bonita que llegó a mi vida.',
  avatarUrl1: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  avatarUrl2: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
};

export const INITIAL_QUOTES: LoveQuote[] = [
  {
    id: 'q1',
    text: '"Eres la casualidad más bonita que llegó a mi vida."',
    author: 'Para ti, siempre',
  },
  {
    id: 'q2',
    text: '"Encontré en tu sonrisa mi rincón favorito de paz en el mundo."',
    author: 'Nuestro diario',
  },
  {
    id: 'q3',
    text: '"Cada día a tu lado es una página que quiero volver a leer una y otra vez."',
    author: 'De mí para ti',
  },
  {
    id: 'q4',
    text: '"No fue en un instante perfecto, fue en cada pequeño segundo que compartimos."',
    author: 'Nuestra historia',
  }
];

export const INITIAL_MEMORIES: Memory[] = [
  {
    id: 'mem-1',
    title: 'Primer día en la playa',
    date: '2022-09-15',
    category: 'first_date',
    imageUrl: '/assets/momento-1-primera-cita.jpeg',
    caption: 'El picnic en el parque de otoño donde el tiempo se detuvo por completo.',
    story: 'Recuerdo cómo nos sentamos en la manta con un café caliente mientras las hojas doradas caían. Estaba tan nervioso al principio, pero tu risa hizo que todo fuera tan natural e inolvidable.',
    location: 'Parque Central, 17:30 hs',
    isFavorite: true,
    rotation: -1.5,
    washiColor: 'rose',
    tapePosition: 'top-left',
    songTag: 'Golden Hour - JVKE',
    badge: 'El Comienzo ✨'
  },
  {
    id: 'mem-2',
    title: 'Mi sonrisa favorita',
    date: '2026-03-01',
    category: 'everyday',
    imageUrl: '/assets/momento-2-tus-ojos.jpeg',
    caption: 'La luz de la mañana entrando por la ventana y esa mirada que lo dice todo.',
    story: 'Tomé esta foto desprevenido mientras me contabas tu sueño. Tienes una luz en los ojos que ilumina cualquier día gris.',
    location: 'Café de la esquina',
    isFavorite: true,
    rotation: 1.8,
    washiColor: 'gold',
    tapePosition: 'top-right',
    songTag: 'Yellow - Coldplay',
    badge: 'Momento Dulce ☕'
  },
  {
    id: 'mem-3',
    title: 'Atardeceres contigo',
    date: '2023-03-12',
    category: 'trip',
    imageUrl: '/assets/momento-3-atardeceres.jpeg',
    caption: 'Nuestras manos entrelazadas viendo caer el sol en la costa.',
    story: 'Ese fin de semana escapamos a la playa. El cielo se tiñó de tonos rosas y naranjas mientras prometimos estar siempre el uno para el otro.',
    location: 'Mirador del Acantilado',
    isFavorite: true,
    rotation: -1.2,
    washiColor: 'rose',
    tapePosition: 'bottom-right',
    songTag: 'Lover - Taylor Swift',
    badge: 'Viaje Soñado 🌊'
  },
  {
    id: 'mem-5',
    title: 'Caminar la ciudad contigo',
    date: '2023-09-15',
    category: 'anniversary',
    imageUrl: '/assets/momento-4-ciudad-noche.jpeg',
    caption: '365 días de amarte y de saber que eres mi persona.',
    story: 'Cena a la luz de las velas y un álbum hecho a mano con nuestras primeras 50 fotos. Un año que se sintió como un suspiro.',
    location: 'Bistró Terraza Rosa',
    isFavorite: true,
    rotation: -2.0,
    washiColor: 'rose',
    tapePosition: 'top-center',
    songTag: 'Perfect - Ed Sheeran',
    badge: '1er Año Juntos 🥂'
  },
  {
    id: 'mem-7',
    title: 'Cada carnaval',
    date: '2024-07-22',
    category: 'everyday',
    imageUrl: '/assets/momento-7-carnaval.jpeg',
    caption: 'Despertar a tu lado y sentir que todo está bien.',
    story: 'Un domingo sin alarmas, café recién preparado en la cama y horas hablando de nuestros planes de futuro.',
    location: 'Nuestro hogar',
    isFavorite: true,
    rotation: -1.0,
    washiColor: 'rose',
    tapePosition: 'top-left',
    songTag: 'Stand by Me - Ben E. King',
    badge: 'Hogar 🤍'
  },
  {
    id: 'mem-8',
    title: 'Celebrar cada logro tuyo',
    date: '2025-01-02',
    category: 'special',
    imageUrl: '/assets/momento-8-ramo.jpeg',
    caption: 'Noche bajo el cielo estrellado pidiendo deseos juntos.',
    story: 'Subimos a la colina con una fogata pequeña y una manta. Vimos tres estrellas fugaces y ambos pedimos el mismo deseo.',
    location: 'Observatorio de las Alturas',
    isFavorite: true,
    rotation: 1.9,
    washiColor: 'gold',
    tapePosition: 'bottom-left',
    songTag: 'Rewrite The Stars - James Arthur',
    badge: 'Deseos ✨'
  },
  {
    id: 'mem-9',
    title: 'Salir a los jueguitos contigo',
    date: '2026-02-14',
    category: 'anniversary',
    imageUrl: '/assets/momento-9-jueguitos.jpeg',
    caption: 'El tiempo pasa, pero mi amor por ti sigue creciendo cada día.',
    story: 'Mirando hacia atrás todas las fotos de nuestro camino juntos y soñando con todo lo que todavía nos queda por vivir.',
    location: 'Jardín Botánico',
    isFavorite: true,
    rotation: -1.6,
    washiColor: 'rose',
    tapePosition: 'top-right',
    songTag: 'Can\'t Help Falling in Love - Elvis Presley',
    badge: 'Por Siempre 💍'
  }
];

// "Nuestra Historia" (Our Story) es ahora una pantalla independiente de Favoritos.
// Empieza vacía: las memorias de la historia se agregan por separado desde esa pantalla.
export const INITIAL_STORY_MEMORIES: Memory[] = [];

export const PRESET_GALLERY_PHOTOS = [
  { url: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1000&q=85', label: 'Picnic de otoño' },
  { url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1000&q=85', label: 'Mirada sincera' },
  { url: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=1000&q=85', label: 'Atardecer dorado' },
  { url: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=1000&q=85', label: 'Caminata en el bosque' },
  { url: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=1000&q=85', label: 'Cena romántica' },
  { url: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1000&q=85', label: 'Risas bajo la lluvia' },
  { url: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=1000&q=85', label: 'Mañanas de café' },
  { url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=85', label: 'Noche estrellada' },
  { url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=85', label: 'Flores y promesa' },
  { url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=85', label: 'Retrato con sonrisa' },
  { url: 'https://images.unsplash.com/photo-1474552226712-ac0f0961a954?auto=format&fit=crop&w=1000&q=85', label: 'Carretera y viaje' },
  { url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1000&q=85', label: 'Fiesta y brindis' },
];
