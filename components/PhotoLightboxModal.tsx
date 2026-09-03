import React from 'react';
import { X, ChevronLeft, ChevronRight, Heart, MapPin, Music2, Calendar, Share2 } from 'lucide-react';
import { Memory } from '../src/types';
import { formatDateSpanish } from '../src/utils/timeCalculations';

interface PhotoLightboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  memory: Memory | null;
  memories: Memory[];
  onSelectMemory: (mem: Memory) => void;
  onToggleFavorite: (id: string, e?: React.MouseEvent) => void;
}

export const PhotoLightboxModal: React.FC<PhotoLightboxModalProps> = ({
  isOpen,
  onClose,
  memory,
  memories,
  onSelectMemory,
  onToggleFavorite,
}) => {
  if (!isOpen || !memory) return null;

  const currentIndex = memories.findIndex((m) => m.id === memory.id);

  const handlePrev = () => {
    if (currentIndex > 0) {
      onSelectMemory(memories[currentIndex - 1]);
    } else {
      onSelectMemory(memories[memories.length - 1]);
    }
  };

  const handleNext = () => {
    if (currentIndex < memories.length - 1) {
      onSelectMemory(memories[currentIndex + 1]);
    } else {
      onSelectMemory(memories[0]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 p-2 text-white/80 hover:text-white bg-black/40 rounded-full hover:bg-black/70 transition-colors cursor-pointer"
        aria-label="Cerrar vista previa"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Prev Navigation */}
      {memories.length > 1 && (
        <button
          onClick={handlePrev}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-50 p-2 sm:p-3 text-white/80 hover:text-white bg-black/40 rounded-full hover:bg-black/70 transition-colors cursor-pointer"
          aria-label="Foto anterior"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {/* Next Navigation */}
      {memories.length > 1 && (
        <button
          onClick={handleNext}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-50 p-2 sm:p-3 text-white/80 hover:text-white bg-black/40 rounded-full hover:bg-black/70 transition-colors cursor-pointer"
          aria-label="Foto siguiente"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

      {/* Main Content Modal Card */}
      <div className="relative w-full max-w-2xl max-h-[92vh] bg-white rounded-xs polaroid-shadow overflow-y-auto flex flex-col">
        {/* Photo Container */}
        <div className="relative w-full bg-[#1f1b14] flex items-center justify-center max-h-[60vh] overflow-hidden">
          <img
            src={memory.imageUrl}
            alt={memory.title}
            className="w-full h-auto max-h-[60vh] object-contain"
          />

          {/* Favorite button overlay */}
          <button
            onClick={(e) => onToggleFavorite(memory.id, e)}
            className="absolute top-3 left-3 p-2 bg-black/40 backdrop-blur-xs rounded-full text-white hover:bg-black/60 active:scale-90 transition-all cursor-pointer"
          >
            <Heart
              className={`w-5 h-5 ${
                memory.isFavorite ? 'text-[#ffafb1] fill-[#ffafb1]' : 'text-white'
              }`}
            />
          </button>
        </div>

        {/* Story and Details */}
        <div className="p-5 sm:p-6 bg-[#fff8f3] space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#e2d9ce] pb-3">
            <div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1f1b14]">
                {memory.title}
              </h3>
              <p className="flex items-center gap-1.5 text-xs text-[#8b4c50] font-medium mt-0.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>{formatDateSpanish(memory.date)}</span>
              </p>
            </div>

          </div>

          {memory.caption && (
            <p className="text-sm font-sans text-[#50453b] font-medium leading-relaxed">
              {memory.caption}
            </p>
          )}

          {memory.story && (
            <div className="bg-[#fcf2e7] p-3.5 rounded-xs border-l-2 border-[#8b4c50]">
              <p className="text-xs font-literata italic text-[#50453b] leading-relaxed">
                "{memory.story}"
              </p>
            </div>
          )}

          {/* Metadata Footer */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-2 text-xs text-[#82756a]">
            <div className="flex flex-wrap items-center gap-3">
              {memory.location && (
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#7d562d]" />
                  {memory.location}
                </span>
              )}
              {memory.songTag && (
                <span className="flex items-center gap-1 text-[#8b4c50]">
                  <Music2 className="w-3.5 h-3.5" />
                  {memory.songTag}
                </span>
              )}
            </div>

            <span className="text-[11px] text-[#82756a]">
              Recuerdo {currentIndex + 1} de {memories.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
