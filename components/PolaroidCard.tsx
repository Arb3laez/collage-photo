import React from 'react';
import { Heart, MapPin, Music2 } from 'lucide-react';
import { Memory } from '../src/types';
import { formatShortDate } from '../src/utils/timeCalculations';

interface PolaroidCardProps {
  memory: Memory;
  onToggleFavorite: (id: string, e?: React.MouseEvent) => void;
  onClickPhoto: (memory: Memory) => void;
  enableTilt?: boolean;
  priority?: boolean;
}

export const PolaroidCard: React.FC<PolaroidCardProps> = ({
  memory,
  onToggleFavorite,
  onClickPhoto,
  enableTilt = true,
}) => {
  const rotationDeg = enableTilt ? memory.rotation || 0 : 0;
  const washiColor = memory.washiColor || 'rose';
  const tapePosition = memory.tapePosition || 'top-left';

  // Determine washi tape classes & placement
  const getTapeClass = () => {
    let base = 'absolute w-14 h-5 z-20 opacity-85 shadow-xs pointer-events-none transform ';
    if (washiColor === 'rose') {
      base += 'bg-[#e29b8a]/80 ';
    } else if (washiColor === 'gold') {
      base += 'bg-[#d4a373]/80 ';
    } else {
      base += 'bg-[#d4c4b7]/80 ';
    }

    switch (tapePosition) {
      case 'top-left':
        return base + '-top-2.5 -left-3 -rotate-12';
      case 'top-right':
        return base + '-top-2.5 -right-3 rotate-12';
      case 'bottom-left':
        return base + '-bottom-2 -left-3 rotate-6';
      case 'bottom-right':
        return base + '-bottom-2 -right-3 -rotate-6';
      case 'top-center':
        return base + '-top-3 left-1/2 -translate-x-1/2 rotate-1';
      default:
        return base + '-top-2.5 -left-3 -rotate-12';
    }
  };

  return (
    <div
      id={`memory-card-${memory.id}`}
      style={{
        transform: `rotate(${rotationDeg}deg)`,
      }}
      className="relative bg-white rounded-xs p-3 pb-8 polaroid-shadow transition-transform duration-300 hover:scale-[1.01] hover:z-20 group"
    >
      {/* Decorative Washi Tape */}
      <div className={getTapeClass()} aria-hidden="true" />

      {/* Image container */}
      <div
        className="relative overflow-hidden rounded-xs bg-[#f6ece1] aspect-4/3 sm:aspect-16/11 cursor-pointer group-hover:opacity-95 transition-opacity"
        onClick={() => onClickPhoto(memory)}
      >
        <img
          src={memory.imageUrl}
          alt={memory.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Date Stamp */}
        <div className="absolute bottom-2.5 left-2.5 px-2 py-0.5 bg-white/85 backdrop-blur-xs rounded text-[#50453b] text-[10px] font-sans font-semibold tracking-wider uppercase shadow-2xs">
          {formatShortDate(memory.date)}
        </div>
      </div>

      {/* Caption & Info Section */}
      <div className="mt-3.5 px-1 text-center relative">
        <h3
          onClick={() => onClickPhoto(memory)}
          className="font-literata text-lg sm:text-xl font-semibold text-[#1f1b14] leading-snug cursor-pointer hover:text-[#8b4c50] transition-colors"
        >
          {memory.title}
        </h3>

        {memory.caption && (
          <p className="mt-1 text-xs font-sans text-[#50453b] line-clamp-2 max-w-md mx-auto leading-relaxed">
            {memory.caption}
          </p>
        )}

        {/* Location or Song Tag if available */}
        <div className="mt-2 flex flex-wrap items-center justify-center gap-2 text-[11px] text-[#82756a]">
          {memory.location && (
            <span className="inline-flex items-center gap-1">
              <MapPin className="w-3 h-3 text-[#7d562d]" />
              {memory.location}
            </span>
          )}
          {memory.songTag && (
            <span className="inline-flex items-center gap-1 text-[#8b4c50]">
              <Music2 className="w-3 h-3" />
              {memory.songTag}
            </span>
          )}
        </div>

        {/* Favorite Heart Button matching reference placement */}
        <div className="absolute -bottom-5 right-1">
          <button
            id={`fav-btn-${memory.id}`}
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(memory.id, e);
            }}
            className="p-1.5 rounded-full hover:bg-[#ffafb1]/20 active:scale-90 transition-all cursor-pointer"
            aria-label={memory.isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
          >
            <Heart
              className={`w-5 h-5 transition-all duration-300 ${
                memory.isFavorite
                  ? 'text-[#8b4c50] fill-[#8b4c50] scale-110'
                  : 'text-[#82756a]/70 hover:text-[#8b4c50]'
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};
