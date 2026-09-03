import React from 'react';
import { Memory, LoveQuote, CoupleConfig } from '../src/types';
import { PolaroidCard } from './PolaroidCard';
import { QuoteCard } from './QuoteCard';
import { AnniversaryCountdown } from './AnniversaryCountdown';
import { Plus, BookHeart, Sparkles } from 'lucide-react';

interface StoryFeedViewProps {
  memories: Memory[];
  quote: LoveQuote;
  config: CoupleConfig;
  onToggleFavorite: (id: string, e?: React.MouseEvent) => void;
  onClickPhoto: (memory: Memory) => void;
  onNextQuote: () => void;
  onOpenAddModal: () => void;
  onOpenEditModal: () => void;
  onOpenLetterModal: () => void;
}

export const StoryFeedView: React.FC<StoryFeedViewProps> = ({
  memories,
  quote,
  config,
  onToggleFavorite,
  onClickPhoto,
  onNextQuote,
  onOpenAddModal,
  onOpenEditModal,
  onOpenLetterModal,
}) => {
  // Grab top 3 memories for the exact visual structure from the user screenshot
  const mem1 = memories[0];
  const mem2 = memories[1];
  const mem3 = memories[2];
  const remainingMemories = memories.slice(3);

  // Pantalla independiente: si "Nuestra Historia" no tiene momentos, mostramos
  // un estado vacío con invitación a comenzar (sin frase ni contador).
  if (memories.length === 0) {
    return (
      <div className="pb-16 px-2 sm:px-4">
        <div className="text-center py-16 bg-[#fcf2e7] border border-[#e2d9ce] rounded-xs p-8 scrapbook-shadow max-w-md mx-auto">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#ffafb1]/30 text-[#8b4c50] mb-3">
            <BookHeart className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-xl font-bold text-[#1f1b14]">
            Aún no hay momentos en tu historia
          </h3>
          <p className="text-xs font-sans text-[#50453b] mt-2 mb-6 max-w-sm mx-auto">
            Empieza a construir tu historia agregando tus recuerdos favoritos, uno a uno.
          </p>
          <button
            onClick={onOpenAddModal}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#8b4c50] hover:bg-[#7b3f42] text-white rounded-full font-medium text-xs shadow-xs active:scale-95 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Agregar primer momento</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12">
      {/* 1. First Polaroid Memory (e.g. "Nuestra primera cita") */}
      {mem1 && (
        <div className="px-1 sm:px-4">
          <PolaroidCard
            memory={mem1}
            onToggleFavorite={onToggleFavorite}
            onClickPhoto={onClickPhoto}
            enableTilt={true}
          />
        </div>
      )}

      {/* 2. Romantic Quote Card */}
      <div className="px-1 sm:px-4">
        <QuoteCard
          quote={quote}
          onNextQuote={onNextQuote}
          onOpenLetterModal={onOpenLetterModal}
        />
      </div>

      {/* 3. Second Polaroid Memory (e.g. "Tus ojos favoritos") */}
      {mem2 && (
        <div className="px-1 sm:px-4">
          <PolaroidCard
            memory={mem2}
            onToggleFavorite={onToggleFavorite}
            onClickPhoto={onClickPhoto}
            enableTilt={true}
          />
        </div>
      )}

      {/* 4. Third Polaroid Memory (e.g. "Atardeceres contigo") */}
      {mem3 && (
        <div className="px-1 sm:px-4">
          <PolaroidCard
            memory={mem3}
            onToggleFavorite={onToggleFavorite}
            onClickPhoto={onClickPhoto}
            enableTilt={true}
          />
        </div>
      )}

      {/* 5. Anniversary Countdown Component */}
      <div className="px-1 sm:px-4">
        <AnniversaryCountdown
          config={config}
          onOpenEditModal={onOpenEditModal}
        />
      </div>

      {/* 6. Remaining Memories in scrapbook style */}
      {remainingMemories.length > 0 && (
        <div className="space-y-8 pt-4">
          <div className="flex items-center justify-center gap-2 text-[#8b4c50]">
            <BookHeart className="w-5 h-5" />
            <h3 className="font-serif text-xl font-bold">Más momentos inolvidables</h3>
          </div>

          <div className="space-y-8">
            {remainingMemories.map((mem) => (
              <div key={mem.id} className="px-1 sm:px-4">
                <PolaroidCard
                  memory={mem}
                  onToggleFavorite={onToggleFavorite}
                  onClickPhoto={onClickPhoto}
                  enableTilt={true}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Prompt to add more memories */}
      <div className="mt-12 text-center p-6 border-2 border-dashed border-[#d4c4b7] rounded-xs bg-[#fcf2e7]/60">
        <Sparkles className="w-6 h-6 text-[#8b4c50] mx-auto mb-2" />
        <h4 className="font-serif text-lg font-bold text-[#1f1b14]">
          ¿Tienes un nuevo momento especial?
        </h4>
        <p className="text-xs font-sans text-[#50453b] mt-1 mb-4 max-w-sm mx-auto">
          Agrega fotos de viajes, citas románticas o sonrisas cotidianas a su álbum de amor.
        </p>
        <button
          id="feed-add-moment-btn"
          onClick={onOpenAddModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#8b4c50] hover:bg-[#7b3f42] text-white rounded-full font-medium text-xs shadow-xs active:scale-95 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Añadir foto al álbum</span>
        </button>
      </div>
    </div>
  );
};
