import React from 'react';
import { Memory, CoupleConfig } from '../src/types';
import { Heart, Sparkles, Plus, Image as ImageIcon } from 'lucide-react';
import { PolaroidCard } from './PolaroidCard';

interface FavoritesViewProps {
  memories: Memory[];
  config: CoupleConfig;
  onToggleFavorite: (id: string, e?: React.MouseEvent) => void;
  onClickPhoto: (memory: Memory) => void;
  onOpenAddModal: () => void;
  onGoToStory: () => void;
}

export const FavoritesView: React.FC<FavoritesViewProps> = ({
  memories,
  config,
  onToggleFavorite,
  onClickPhoto,
  onOpenAddModal,
  onGoToStory,
}) => {
  const favoriteMemories = memories.filter((m) => m.isFavorite);

  return (
    <div className="pb-16 px-2 sm:px-4">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#ffafb1]/30 text-[#8b4c50] mb-3">
          <Heart className="w-6 h-6 fill-[#8b4c50]" />
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1f1b14]">
          Momentos Favoritos
        </h2>
        <p className="mt-1 text-xs font-sans text-[#7d562d]">
          {favoriteMemories.length} recuerdos marcados en el corazón de {config.partner1Name} & {config.partner2Name}
        </p>
      </div>

      {favoriteMemories.length === 0 ? (
        <div className="text-center py-16 bg-[#fcf2e7] border border-[#e2d9ce] rounded-xs p-8 scrapbook-shadow max-w-md mx-auto">
          <Sparkles className="w-8 h-8 text-[#d4a373] mx-auto mb-3" />
          <h3 className="font-serif text-lg font-bold text-[#1f1b14]">
            Aún no has marcado momentos favoritos
          </h3>
          <p className="text-xs font-sans text-[#50453b] mt-2 mb-6">
            Toca el corazón ♥ en cualquier foto o polaroid para guardarla en esta colección especial.
          </p>
          <button
            onClick={onGoToStory}
            className="px-5 py-2 bg-[#8b4c50] text-white rounded-full text-xs font-medium hover:bg-[#7b3f42] active:scale-95 transition-all cursor-pointer"
          >
            Explorar recuerdos
          </button>
        </div>
      ) : (
        <div className="space-y-8 max-w-lg mx-auto">
          {favoriteMemories.map((mem) => (
            <PolaroidCard
              key={mem.id}
              memory={mem}
              onToggleFavorite={onToggleFavorite}
              onClickPhoto={onClickPhoto}
              enableTilt={true}
            />
          ))}
        </div>
      )}

      {/* Action Footer */}
      <div className="mt-12 text-center">
        <button
          onClick={onOpenAddModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#8b4c50] hover:bg-[#7b3f42] text-white rounded-full font-medium text-xs shadow-xs active:scale-95 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Añadir nuevo recuerdo favorito</span>
        </button>
      </div>
    </div>
  );
};
