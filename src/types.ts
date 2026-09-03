export type MemoryCategory = 'meet' | 'first_date' | 'trip' | 'anniversary' | 'special' | 'everyday';

export interface Memory {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  category: MemoryCategory;
  imageUrl: string;
  caption?: string;
  story?: string;
  location?: string;
  isFavorite: boolean;
  rotation?: number; // e.g. -2.5 to 2.5
  washiColor?: 'rose' | 'gold' | 'tan';
  tapePosition?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top-center';
  songTag?: string;
  badge?: string;
}

export interface LoveQuote {
  id: string;
  text: string;
  author?: string;
  date?: string;
  customNote?: string;
}

export interface CoupleConfig {
  partner1Name: string;
  partner2Name: string;
  relationshipStartDate: string; // e.g., '2022-05-18T19:00:00'
  anniversaryDate: string; // e.g. '2026-05-18T00:00:00'
  motto: string;
  avatarUrl1?: string;
  avatarUrl2?: string;
}

export type ActiveTab = 'story' | 'timeline' | 'collage' | 'favs';
