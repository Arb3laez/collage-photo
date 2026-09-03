import React from 'react';
import { Heart, Calendar, Plus, Music, Sparkles, Settings } from 'lucide-react';
import { CoupleConfig } from '../src/types';

interface HeaderProps {
  config: CoupleConfig;
  isPlayingMusic: boolean;
  onToggleMusic: () => void;
  onOpenAddModal: () => void;
  onOpenCoupleModal: () => void;
  onScrollToCountdown: () => void;
  favoritesCount: number;
  onOpenFavsTab: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  config,
  isPlayingMusic,
  onToggleMusic,
  onOpenAddModal,
  onOpenCoupleModal,
  onScrollToCountdown,
  favoritesCount,
  onOpenFavsTab,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#fff8f3]/95 backdrop-blur-md border-b border-[#e2d9ce]/60 px-4 py-3 sm:px-6 transition-all shadow-xs">
      <div className="max-w-2xl mx-auto flex items-center justify-between">
        {/* Left Heart / Favs button */}
        <div className="flex items-center gap-1.5">
          <button
            id="header-favs-btn"
            onClick={onOpenFavsTab}
            title="Ver favoritos"
            className="p-2 rounded-full text-[#8b4c50] hover:bg-[#ffafb1]/20 active:scale-95 transition-all relative flex items-center justify-center cursor-pointer"
            aria-label="Ver recuerdos favoritos"
          >
            <Heart className="w-5 h-5 text-[#8b4c50] fill-[#8b4c50]/20 hover:fill-[#8b4c50] transition-colors" />
            {favoritesCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#8b4c50] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {favoritesCount}
              </span>
            )}
          </button>

          <button
            id="header-music-btn"
            onClick={onToggleMusic}
            title={isPlayingMusic ? 'Pausar melodía romántica' : 'Reproducir melodía romántica'}
            className={`p-2 rounded-full transition-all cursor-pointer flex items-center justify-center ${
              isPlayingMusic
                ? 'bg-[#d4a373]/30 text-[#7d562d] animate-pulse'
                : 'text-[#82756a] hover:bg-[#f6ece1] active:scale-95'
            }`}
            aria-label="Música ambiental"
          >
            <Music className="w-4 h-4" />
          </button>
        </div>

        {/* Center Title */}
        <div className="flex flex-col items-center text-center cursor-pointer" onClick={onOpenCoupleModal}>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#1f1b14] select-none hover:text-[#7d562d] transition-colors">
            Our Memories
          </h1>
          <p className="text-[11px] font-sans font-medium text-[#7d562d] flex items-center gap-1 tracking-wider uppercase">
            <span>{config.partner1Name}</span>
            <span className="text-[#8b4c50]">♥</span>
            <span>{config.partner2Name}</span>
          </p>
        </div>

        {/* Right Action buttons */}
        <div className="flex items-center gap-1.5">
          <button
            id="header-add-memory-btn"
            onClick={onOpenAddModal}
            title="Añadir nuevo recuerdo"
            className="p-2 rounded-full bg-[#8b4c50] text-white shadow-xs hover:bg-[#7b3f42] active:scale-95 transition-all flex items-center justify-center cursor-pointer"
            aria-label="Añadir recuerdo"
          >
            <Plus className="w-4 h-4" />
          </button>

          <button
            id="header-calendar-btn"
            onClick={onScrollToCountdown}
            title="Ir a cuenta atrás de aniversario"
            className="p-2 rounded-full text-[#7d562d] hover:bg-[#d4a373]/20 active:scale-95 transition-all flex items-center justify-center cursor-pointer"
            aria-label="Ver cuenta regresiva de aniversario"
          >
            <Calendar className="w-5 h-5 text-[#1f1b14]" />
          </button>

          <button
            id="header-settings-btn"
            onClick={onOpenCoupleModal}
            title="Configurar pareja y fechas"
            className="p-2 rounded-full text-[#82756a] hover:bg-[#f6ece1] active:scale-95 transition-all flex items-center justify-center cursor-pointer"
            aria-label="Configuración de pareja"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
