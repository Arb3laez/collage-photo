import React, { useState } from 'react';
import { Memory, CoupleConfig, LoveQuote } from '../src/types';
import { 
  LayoutGrid, 
  Sparkles, 
  Film, 
  Layers, 
  Plus,
  Heart,
  Camera,
  Download,
  Share2,
  Pencil
} from 'lucide-react';
import { formatShortDate } from '../src/utils/timeCalculations';

interface CollageViewProps {
  memories: Memory[];
  quotes: LoveQuote[];
  config: CoupleConfig;
  onToggleFavorite: (id: string, e?: React.MouseEvent) => void;
  onClickPhoto: (memory: Memory) => void;
  onEditMemory: (memory: Memory) => void;
  onOpenAddModal: () => void;
}

export const CollageView: React.FC<CollageViewProps> = ({
  memories,
  quotes,
  config,
  onToggleFavorite,
  onClickPhoto,
  onEditMemory,
  onOpenAddModal,
}) => {
  const [layoutMode, setLayoutMode] = useState<'scrapbook' | 'masonry' | 'filmstrip'>('scrapbook');
  const [selectedTag, setSelectedTag] = useState<string>('all');

  const filteredMemories = memories.filter((mem) => {
    if (selectedTag === 'all') return true;
    if (selectedTag === 'favs') return mem.isFavorite;
    return mem.category === selectedTag;
  });

  const downloadCollageCard = () => {
    // Printable / Share notification
    window.print();
  };

  return (
    <div className="pb-16 px-2 sm:px-4">
      {/* Header & Controls */}
      <div className="text-center mb-6">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1f1b14]">
          Collage de Momentos
        </h2>
        <p className="mt-1 text-xs font-sans text-[#7d562d]">
          Nuestros mejores recuerdos reunidos en un lienzo de amor
        </p>

        {/* Layout Switcher (Material 3 Segmented Button) */}
        <div className="mt-4 inline-flex p-1 bg-[#f6ece1] rounded-full border border-[#d4c4b7]">
          <button
            id="layout-scrapbook-btn"
            onClick={() => setLayoutMode('scrapbook')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
              layoutMode === 'scrapbook'
                ? 'bg-[#8b4c50] text-white shadow-2xs'
                : 'text-[#50453b] hover:text-[#1f1b14]'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Scrapbook</span>
          </button>

          <button
            id="layout-masonry-btn"
            onClick={() => setLayoutMode('masonry')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
              layoutMode === 'masonry'
                ? 'bg-[#8b4c50] text-white shadow-2xs'
                : 'text-[#50453b] hover:text-[#1f1b14]'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Mosaico</span>
          </button>

          <button
            id="layout-filmstrip-btn"
            onClick={() => setLayoutMode('filmstrip')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
              layoutMode === 'filmstrip'
                ? 'bg-[#8b4c50] text-white shadow-2xs'
                : 'text-[#50453b] hover:text-[#1f1b14]'
            }`}
          >
            <Film className="w-3.5 h-3.5" />
            <span>Filmstrip</span>
          </button>
        </div>
      </div>

      {/* Filter Chips & Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 bg-[#fcf2e7] p-3 rounded-xs border border-[#e2d9ce]">
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {[
            { id: 'all', label: 'Todos' },
            { id: 'favs', label: 'Favoritos ♥' },
            { id: 'trip', label: 'Viajes' },
            { id: 'first_date', label: 'Citas' },
            { id: 'anniversary', label: 'Aniversarios' },
            { id: 'everyday', label: 'Cotidianos' },
          ].map((tag) => (
            <button
              key={tag.id}
              onClick={() => setSelectedTag(tag.id)}
              className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                selectedTag === tag.id
                  ? 'bg-[#7d562d] text-white'
                  : 'bg-white text-[#50453b] border border-[#d4c4b7] hover:bg-[#f6ece1]'
              }`}
            >
              {tag.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            id="collage-add-photo-btn"
            onClick={onOpenAddModal}
            className="flex items-center gap-1 px-3 py-1.5 bg-[#8b4c50] text-white text-xs font-medium rounded-full shadow-2xs hover:bg-[#7b3f42] active:scale-95 transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Subir foto</span>
          </button>

          <button
            id="collage-print-btn"
            onClick={downloadCollageCard}
            title="Imprimir o guardar collage como PDF"
            className="p-1.5 bg-white border border-[#d4c4b7] rounded-full text-[#7d562d] hover:bg-[#f6ece1] active:scale-95 transition-all cursor-pointer"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 1. SCRAPBOOK FREE-FORM BOARD */}
      {layoutMode === 'scrapbook' && (
        <div className="relative min-h-[600px] bg-[#fcf2e7]/70 border border-[#e2d9ce] rounded-xs p-4 sm:p-6 scrapbook-shadow">
          {/* Decorative Corner Stamps */}
          <div className="absolute top-3 left-3 w-8 h-8 rounded-full border border-[#8b4c50]/40 flex items-center justify-center text-[10px] text-[#8b4c50] font-serif rotate-[-12deg] pointer-events-none">
            AMOR
          </div>
          <div className="absolute top-3 right-3 text-xs font-literata italic text-[#7d562d] pointer-events-none">
            {config.partner1Name} & {config.partner2Name}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
            {filteredMemories.map((mem, index) => {
              // Alternate subtle rotations for polaroid scrap effect
              const tilts = [-2.5, 1.8, -1.2, 2.3, -1.9, 1.4];
              const tilt = tilts[index % tilts.length];

              return (
                <div
                  key={mem.id}
                  style={{ transform: `rotate(${tilt}deg)` }}
                  className="bg-white p-3 pb-6 polaroid-shadow rounded-xs relative group hover:scale-105 hover:z-30 transition-all duration-300"
                >
                  {/* Washi tape */}
                  <div
                    className={`absolute -top-2.5 ${
                      index % 2 === 0 ? '-left-2 -rotate-12' : '-right-2 rotate-12'
                    } w-12 h-4 ${
                      index % 3 === 0
                        ? 'bg-[#e29b8a]/80'
                        : index % 3 === 1
                        ? 'bg-[#d4a373]/80'
                        : 'bg-[#d4c4b7]/80'
                    } shadow-xs pointer-events-none`}
                  />

                  {/* Photo */}
                  <div
                    className="aspect-square bg-[#f6ece1] rounded-xs overflow-hidden cursor-pointer"
                    onClick={() => onClickPhoto(mem)}
                  >
                    <img
                      src={mem.imageUrl}
                      alt={mem.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Caption & Favorite */}
                  <div className="mt-3 flex items-start justify-between gap-1">
                    <div>
                      <h4
                        onClick={() => onClickPhoto(mem)}
                        className="font-literata text-sm font-semibold text-[#1f1b14] hover:text-[#8b4c50] cursor-pointer"
                      >
                        {mem.title}
                      </h4>
                      <p className="text-[10px] font-sans text-[#82756a]">
                        {formatShortDate(mem.date)}
                      </p>
                    </div>

                    <div className="flex items-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onEditMemory(mem);
                        }}
                        title="Editar tarjeta"
                        className="p-1 text-[#82756a] hover:text-[#8b4c50] cursor-pointer"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleFavorite(mem.id, e);
                        }}
                        className="p-1 text-[#82756a] hover:text-[#8b4c50] cursor-pointer"
                      >
                        <Heart
                          className={`w-4 h-4 ${
                            mem.isFavorite ? 'text-[#8b4c50] fill-[#8b4c50]' : ''
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 2. MASONRY PINTEREST-STYLE GRID */}
      {layoutMode === 'masonry' && (
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {filteredMemories.map((mem) => (
            <div
              key={mem.id}
              className="break-inside-avoid bg-white border border-[#e2d9ce] rounded-xs p-3.5 polaroid-shadow group hover:border-[#8b4c50] transition-all"
            >
              <div
                className="rounded-xs overflow-hidden bg-[#f6ece1] cursor-pointer relative"
                onClick={() => onClickPhoto(mem)}
              >
                <img
                  src={mem.imageUrl}
                  alt={mem.title}
                  loading="lazy"
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/60 backdrop-blur-xs text-white text-[10px] rounded-full">
                  {formatShortDate(mem.date)}
                </div>
              </div>

              <div className="mt-2.5 flex items-start justify-between gap-2">
                <div>
                  <h4
                    onClick={() => onClickPhoto(mem)}
                    className="font-literata font-semibold text-sm text-[#1f1b14] hover:text-[#8b4c50] cursor-pointer"
                  >
                    {mem.title}
                  </h4>
                  {mem.caption && (
                    <p className="text-xs font-sans text-[#50453b] mt-1 line-clamp-2">
                      {mem.caption}
                    </p>
                  )}
                </div>

                <div className="flex items-center shrink-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onEditMemory(mem);
                    }}
                    title="Editar tarjeta"
                    className="p-1 text-[#82756a] hover:text-[#8b4c50] cursor-pointer"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleFavorite(mem.id, e);
                    }}
                    className="p-1 text-[#82756a] hover:text-[#8b4c50] cursor-pointer"
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        mem.isFavorite ? 'text-[#8b4c50] fill-[#8b4c50]' : ''
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 3. VINTAGE RETRO FILMSTRIP */}
      {layoutMode === 'filmstrip' && (
        <div className="space-y-6">
          <div className="bg-[#1f1b14] text-white p-4 sm:p-6 rounded-xs shadow-lg">
            {/* Sprocket holes on top */}
            <div className="flex justify-between items-center mb-4 px-2">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="w-4 h-3 bg-white/20 rounded-2xs" />
              ))}
            </div>

            {/* Horizontal Film Reel */}
            <div className="flex gap-4 overflow-x-auto pb-4 pt-2 no-scrollbar snap-x">
              {filteredMemories.map((mem) => (
                <div
                  key={mem.id}
                  className="shrink-0 w-64 sm:w-72 bg-[#2c261e] p-3 rounded-2xs border border-white/10 snap-center group cursor-pointer"
                  onClick={() => onClickPhoto(mem)}
                >
                  <div className="aspect-4/3 overflow-hidden rounded-2xs bg-black mb-2">
                    <img
                      src={mem.imageUrl}
                      alt={mem.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <h4 className="font-serif text-sm font-bold text-[#ffdada] truncate">
                    {mem.title}
                  </h4>
                  <p className="text-[11px] text-white/60 font-mono">
                    {formatShortDate(mem.date)}
                  </p>
                </div>
              ))}
            </div>

            {/* Sprocket holes on bottom */}
            <div className="flex justify-between items-center mt-2 px-2">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="w-4 h-3 bg-white/20 rounded-2xs" />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
