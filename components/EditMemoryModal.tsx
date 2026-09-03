import React, { useState, useRef, useEffect } from 'react';
import { X, Upload, Check } from 'lucide-react';
import { Memory, MemoryCategory } from '../src/types';

interface EditMemoryModalProps {
  isOpen: boolean;
  memory: Memory | null;
  onClose: () => void;
  onSave: (id: string, data: Partial<Memory>) => void;
}

export const EditMemoryModal: React.FC<EditMemoryModalProps> = ({
  isOpen,
  memory,
  onClose,
  onSave,
}) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState<MemoryCategory>('special');
  const [imageUrl, setImageUrl] = useState('');
  const [caption, setCaption] = useState('');
  const [story, setStory] = useState('');
  const [location, setLocation] = useState('');
  const [songTag, setSongTag] = useState('');
  const [washiColor, setWashiColor] = useState<'rose' | 'gold' | 'tan'>('rose');
  const [isFavorite, setIsFavorite] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sincroniza el formulario cada vez que se abre con una tarjeta distinta.
  useEffect(() => {
    if (memory) {
      setTitle(memory.title ?? '');
      setDate(memory.date ?? '');
      setCategory(memory.category);
      setImageUrl(memory.imageUrl ?? '');
      setCaption(memory.caption ?? '');
      setStory(memory.story ?? '');
      setLocation(memory.location ?? '');
      setSongTag(memory.songTag ?? '');
      setWashiColor(memory.washiColor ?? 'rose');
      setIsFavorite(!!memory.isFavorite);
    }
  }, [memory]);

  if (!isOpen || !memory) return null;

  const handleFileUpload = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Por favor selecciona un archivo de imagen válido.');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) setImageUrl(e.target.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) handleFileUpload(e.target.files[0]);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
    else if (e.type === 'dragleave') setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) handleFileUpload(e.dataTransfer.files[0]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Por favor ingresa un título para el recuerdo.');
      return;
    }
    onSave(memory.id, {
      title: title.trim(),
      date,
      category,
      imageUrl,
      caption: caption.trim() || undefined,
      story: story.trim() || undefined,
      location: location.trim() || undefined,
      songTag: songTag.trim() || undefined,
      washiColor,
      isFavorite,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-lg bg-[#fff8f3] border border-[#e2d9ce] rounded-xs shadow-2xl p-5 sm:p-7 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-[#82756a] hover:text-[#1f1b14] rounded-full hover:bg-[#f6ece1] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Title */}
        <div className="text-center mb-6">
          <h3 className="font-serif text-2xl font-bold text-[#7d562d]">
            Editar Recuerdo
          </h3>
          <p className="text-xs font-sans text-[#82756a] mt-0.5">
            Cambia la etiqueta, la fecha y las descripciones de esta tarjeta
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Current photo + optional change */}
          <div>
            <label className="block text-xs font-semibold text-[#50453b] uppercase tracking-wider mb-2">
              Foto del Recuerdo
            </label>
            <div className="flex items-center gap-3 mb-2 p-2 bg-white rounded-xs border border-[#e2d9ce]">
              {imageUrl && (
                <img src={imageUrl} alt="Vista previa" className="w-14 h-14 object-cover rounded-2xs" />
              )}
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-[#1f1b14] truncate">Foto actual</p>
                <p className="text-[10px] text-[#82756a]">Puedes conservarla o cambiarla abajo</p>
              </div>
            </div>
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xs p-3 text-center cursor-pointer transition-colors ${
                dragActive ? 'border-[#8b4c50] bg-[#ffafb1]/20' : 'border-[#d4c4b7] bg-white hover:bg-[#fcf2e7]'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <Upload className="w-5 h-5 text-[#8b4c50] mx-auto mb-1" />
              <p className="text-[11px] font-medium text-[#1f1b14]">
                Cambiar foto (clic o arrastra)
              </p>
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-xs font-semibold text-[#50453b] uppercase tracking-wider mb-1">
              Título del Momento *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-[#d4c4b7] rounded-xs text-xs text-[#1f1b14] focus:outline-hidden focus:border-[#8b4c50]"
            />
          </div>

          {/* Date & Category (la "etiqueta") */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#50453b] uppercase tracking-wider mb-1">
                Fecha
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-[#d4c4b7] rounded-xs text-xs text-[#1f1b14] focus:outline-hidden focus:border-[#8b4c50]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#50453b] uppercase tracking-wider mb-1">
                Etiqueta / Categoría
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as MemoryCategory)}
                className="w-full px-3 py-2 bg-white border border-[#d4c4b7] rounded-xs text-xs text-[#1f1b14] focus:outline-hidden focus:border-[#8b4c50]"
              >
                <option value="first_date">Citas</option>
                <option value="trip">Viajes</option>
                <option value="anniversary">Aniversarios</option>
                <option value="everyday">Cotidianos</option>
                <option value="special">Especial</option>
                <option value="meet">Cómo nos conocimos</option>
              </select>
            </div>
          </div>

          {/* Caption */}
          <div>
            <label className="block text-xs font-semibold text-[#50453b] uppercase tracking-wider mb-1">
              Pie de Foto (Frase corta)
            </label>
            <input
              type="text"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-[#d4c4b7] rounded-xs text-xs text-[#1f1b14] focus:outline-hidden focus:border-[#8b4c50]"
            />
          </div>

          {/* Story */}
          <div>
            <label className="block text-xs font-semibold text-[#50453b] uppercase tracking-wider mb-1">
              Historia o Nota (Opcional)
            </label>
            <textarea
              rows={3}
              value={story}
              onChange={(e) => setStory(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-[#d4c4b7] rounded-xs text-xs text-[#1f1b14] focus:outline-hidden focus:border-[#8b4c50]"
            />
          </div>

          {/* Location & Song */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#50453b] uppercase tracking-wider mb-1">
                Lugar
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-[#d4c4b7] rounded-xs text-xs text-[#1f1b14] focus:outline-hidden focus:border-[#8b4c50]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#50453b] uppercase tracking-wider mb-1">
                Canción del Recuerdo
              </label>
              <input
                type="text"
                value={songTag}
                onChange={(e) => setSongTag(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-[#d4c4b7] rounded-xs text-xs text-[#1f1b14] focus:outline-hidden focus:border-[#8b4c50]"
              />
            </div>
          </div>

          {/* Washi tape color & Favorite toggle */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#50453b] font-medium">Cinta washi:</span>
              <button
                type="button"
                onClick={() => setWashiColor('rose')}
                className={`w-6 h-6 rounded-full bg-[#e29b8a] border-2 cursor-pointer ${
                  washiColor === 'rose' ? 'border-[#1f1b14]' : 'border-transparent'
                }`}
                title="Rosa empolvado"
              />
              <button
                type="button"
                onClick={() => setWashiColor('gold')}
                className={`w-6 h-6 rounded-full bg-[#d4a373] border-2 cursor-pointer ${
                  washiColor === 'gold' ? 'border-[#1f1b14]' : 'border-transparent'
                }`}
                title="Dorado miel"
              />
              <button
                type="button"
                onClick={() => setWashiColor('tan')}
                className={`w-6 h-6 rounded-full bg-[#d4c4b7] border-2 cursor-pointer ${
                  washiColor === 'tan' ? 'border-[#1f1b14]' : 'border-transparent'
                }`}
                title="Lino vintage"
              />
            </div>

            <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-[#8b4c50]">
              <input
                type="checkbox"
                checked={isFavorite}
                onChange={(e) => setIsFavorite(e.target.checked)}
                className="w-4 h-4 accent-[#8b4c50] rounded-xs"
              />
              <span>En Favoritos ♥</span>
            </label>
          </div>

          {/* Submit Button */}
          <div className="pt-4 flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 bg-white border border-[#d4c4b7] text-[#50453b] font-medium text-xs rounded-full hover:bg-[#f6ece1] active:scale-98 transition-all cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 bg-[#8b4c50] hover:bg-[#7b3f42] text-white font-medium text-xs rounded-full shadow-xs active:scale-98 transition-all cursor-pointer inline-flex items-center justify-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>Guardar cambios</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
