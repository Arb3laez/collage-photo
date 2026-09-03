import React, { useState, useMemo } from 'react';
import { Memory, CoupleConfig } from '../src/types';
import { formatDateSpanish } from '../src/utils/timeCalculations';
import { 
  Calendar, 
  MapPin, 
  Heart, 
  Music2, 
  ArrowUpDown, 
  Search,
  Plus,
  CalendarHeart
} from 'lucide-react';

interface TimelineViewProps {
  memories: Memory[];
  config: CoupleConfig;
  onToggleFavorite: (id: string, e?: React.MouseEvent) => void;
  onClickPhoto: (memory: Memory) => void;
  onOpenAddModal: () => void;
}

const CATEGORY_LABELS: Record<string, string> = {
  all: 'Todos los momentos',
  first_date: 'Primeras citas',
  trip: 'Viajes & Escapadas',
  anniversary: 'Aniversarios',
  special: 'Especiales',
  everyday: 'Cotidianos',
};

export const TimelineView: React.FC<TimelineViewProps> = ({
  memories,
  config,
  onToggleFavorite,
  onClickPhoto,
  onOpenAddModal,
}) => {
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const processedMemories = useMemo(() => {
    return [...memories]
      .filter((mem) => {
        const matchesCategory = selectedCategory === 'all' || mem.category === selectedCategory;
        const matchesSearch =
          searchQuery.trim() === '' ||
          mem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (mem.location && mem.location.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (mem.caption && mem.caption.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        const timeA = new Date(a.date).getTime();
        const timeB = new Date(b.date).getTime();
        return sortOrder === 'asc' ? timeA - timeB : timeB - timeA;
      });
  }, [memories, selectedCategory, searchQuery, sortOrder]);

  const memoriesByYear = useMemo(() => {
    const map = new Map<string, Memory[]>();
    for (const mem of processedMemories) {
      const year = mem.date.split('-')[0] || 'Otros';
      if (!map.has(year)) {
        map.set(year, []);
      }
      map.get(year)!.push(mem);
    }
    return map;
  }, [processedMemories]);

  const calculateDaysSinceStart = (memDateStr: string) => {
    const start = new Date(config.relationshipStartDate).getTime();
    const memDate = new Date(memDateStr).getTime();
    const diff = Math.floor((memDate - start) / (1000 * 60 * 60 * 24));
    if (diff < 0) return 'Antes del inicio';
    if (diff === 0) return '¡Día 1!';
    if (diff < 30) return `Día ${diff}`;
    const months = Math.floor(diff / 30.4);
    if (months < 12) return `Mes ${months} (${diff} días)`;
    const years = (diff / 365.25).toFixed(1);
    return `${years} años (${diff} días)`;
  };

  // Pantalla independiente: si aún no hay momentos en la historia, mostramos un
  // estado vacío (sin buscador ni filtros), en lugar del mensaje de "sin resultados".
  if (memories.length === 0) {
    return (
      <div className="pb-16 px-2 sm:px-4">
        <div className="text-center mb-6">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1f1b14]">
            Nuestra Línea del Tiempo
          </h2>
        </div>
        <div className="text-center py-16 bg-[#fcf2e7] border border-[#e2d9ce] rounded-xs p-8 scrapbook-shadow max-w-md mx-auto">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#ffafb1]/30 text-[#8b4c50] mb-3">
            <CalendarHeart className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-xl font-bold text-[#1f1b14]">
            Tu línea del tiempo está vacía
          </h3>
          <p className="text-xs font-sans text-[#50453b] mt-2 mb-6 max-w-sm mx-auto">
            A medida que agregues momentos a tu historia, aquí verás su recorrido en orden cronológico.
          </p>
          <button
            onClick={onOpenAddModal}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#8b4c50] hover:bg-[#7b3f42] text-white rounded-full font-medium text-xs shadow-xs active:scale-95 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Agregar primer hito</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-16 px-2 sm:px-4">
      {/* Header & Intro */}
      <div className="text-center mb-6">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1f1b14]">
          Nuestra Línea del Tiempo
        </h2>
        <p className="mt-1 text-xs font-sans text-[#7d562d]">
          {sortOrder === 'asc'
            ? 'Desde el día que nos conocimos hasta el día de hoy'
            : 'De los recuerdos más recientes a nuestros comienzos'}
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#fcf2e7] border border-[#e2d9ce]/80 rounded-xs p-3.5 scrapbook-shadow mb-8 space-y-3">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#82756a] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar por lugar, título o recuerdo..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-white border border-[#d4c4b7] rounded-full text-xs text-[#1f1b14] placeholder-[#82756a] focus:outline-hidden focus:border-[#8b4c50]"
            />
          </div>

          <button
            id="timeline-sort-order-btn"
            onClick={() => setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'))}
            className="flex items-center gap-1 px-3 py-1.5 bg-white border border-[#d4c4b7] rounded-full text-xs font-medium text-[#7d562d] hover:bg-[#f6ece1] active:scale-95 transition-all cursor-pointer whitespace-nowrap"
            title="Cambiar orden cronológico"
          >
            <ArrowUpDown className="w-3.5 h-3.5 text-[#8b4c50]" />
            <span>{sortOrder === 'asc' ? 'Antiguos ➔ Hoy' : 'Hoy ➔ Antiguos'}</span>
          </button>
        </div>

        {/* Category Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {Object.entries(CATEGORY_LABELS).map(([catKey, label]) => {
            const isSelected = selectedCategory === catKey;
            return (
              <button
                key={catKey}
                onClick={() => setSelectedCategory(catKey)}
                className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#8b4c50] text-white shadow-2xs'
                    : 'bg-white/80 text-[#50453b] border border-[#e2d9ce] hover:bg-white'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Timeline Journey Line */}
      {processedMemories.length === 0 ? (
        <div className="text-center py-12 bg-white/70 border border-[#e2d9ce] rounded-xs p-6">
          <p className="text-sm font-sans text-[#50453b]">
            No se encontraron recuerdos con estos filtros.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
            }}
            className="mt-3 text-xs text-[#8b4c50] underline font-medium cursor-pointer"
          >
            Restablecer filtros
          </button>
        </div>
      ) : (
        <div className="relative pl-6 sm:pl-8 border-l-2 border-[#d4a373]/50 space-y-12 ml-2 sm:ml-6">
          {Array.from(memoriesByYear.entries()).map(([year, yearMemories]) => (
            <div key={year} className="relative space-y-8">
              {/* Year Stamp Pill */}
              <div className="sticky top-16 z-30 -ml-10 sm:-ml-12 mb-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#7d562d] text-white font-serif font-bold text-xs tracking-wider rounded-full shadow-xs">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{year}</span>
                </span>
              </div>

              {/* Memory Nodes */}
              {yearMemories.map((mem) => {
                const daysLabel = calculateDaysSinceStart(mem.date);

                return (
                  <div key={mem.id} className="relative group">
                    {/* Timeline Node Icon on the line */}
                    <div
                      className={`absolute -left-[31px] sm:-left-[39px] top-4 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center shadow-xs transition-transform group-hover:scale-125 ${
                        mem.isFavorite ? 'bg-[#8b4c50] text-white' : 'bg-[#d4a373] text-white'
                      }`}
                    >
                      <Heart className={`w-3 h-3 ${mem.isFavorite ? 'fill-white' : ''}`} />
                    </div>

                    {/* Timeline Card */}
                    <div className="bg-white border border-[#e2d9ce] rounded-xs p-4 polaroid-shadow hover:border-[#8b4c50]/50 transition-all">
                      {/* Top Header of Card */}
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#f6ece1] pb-2.5 mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold text-[#8b4c50] font-sans">
                            {formatDateSpanish(mem.date)}
                          </span>
                          <span className="px-2 py-0.5 bg-[#f6ece1] text-[#7d562d] text-[10px] font-sans font-medium rounded-full">
                            {daysLabel}
                          </span>
                        </div>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleFavorite(mem.id, e);
                          }}
                          className="p-1 rounded-full text-[#82756a] hover:text-[#8b4c50] transition-colors cursor-pointer"
                          aria-label="Marcar como favorito"
                        >
                          <Heart
                            className={`w-4 h-4 ${
                              mem.isFavorite ? 'text-[#8b4c50] fill-[#8b4c50]' : ''
                            }`}
                          />
                        </button>
                      </div>

                      {/* Content Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5 items-start">
                        {/* Image Thumbnail */}
                        <div
                          className="sm:col-span-4 aspect-4/3 sm:aspect-square rounded-xs overflow-hidden bg-[#f6ece1] cursor-pointer group-hover:opacity-95"
                          onClick={() => onClickPhoto(mem)}
                        >
                          <img
                            src={mem.imageUrl}
                            alt={mem.title}
                            loading="lazy"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>

                        {/* Story / Details */}
                        <div className="sm:col-span-8 space-y-2">
                          <h4
                            onClick={() => onClickPhoto(mem)}
                            className="font-literata text-lg font-semibold text-[#1f1b14] hover:text-[#8b4c50] cursor-pointer transition-colors"
                          >
                            {mem.title}
                          </h4>

                          {mem.caption && (
                            <p className="text-xs font-sans text-[#50453b] leading-relaxed">
                              {mem.caption}
                            </p>
                          )}

                          {mem.story && (
                            <p className="text-xs font-literata italic text-[#7d562d]/90 bg-[#fcf2e7]/70 p-2.5 rounded-xs border-l-2 border-[#d4a373]">
                              "{mem.story}"
                            </p>
                          )}

                          {/* Tags & Meta */}
                          <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-[#82756a]">
                            {mem.location && (
                              <span className="flex items-center gap-1">
                                <MapPin className="w-3 h-3 text-[#7d562d]" />
                                {mem.location}
                              </span>
                            )}
                            {mem.songTag && (
                              <span className="flex items-center gap-1 text-[#8b4c50]">
                                <Music2 className="w-3 h-3" />
                                {mem.songTag}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      )}

      {/* Bottom Action */}
      <div className="mt-12 text-center">
        <button
          onClick={onOpenAddModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#8b4c50] hover:bg-[#7b3f42] text-white rounded-full font-medium text-xs shadow-xs active:scale-95 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Agregar hito a la línea de tiempo</span>
        </button>
      </div>
    </div>
  );
};
