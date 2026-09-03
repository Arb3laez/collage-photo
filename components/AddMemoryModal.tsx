import React, { useState, useRef } from 'react';
import { X, Upload, Sparkles, Image as ImageIcon, MapPin, Music2, Check } from 'lucide-react';
import { Memory, MemoryCategory } from '../src/types';
import { PRESET_GALLERY_PHOTOS } from '../src/data/initialMemories';

interface AddMemoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddMemory: (memory: Omit<Memory, 'id'>) => void;
}

export const AddMemoryModal: React.FC<AddMemoryModalProps> = ({
  isOpen,
  onClose,
  onAddMemory,
}) => {
  if (!isOpen) return null;

  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [category, setCategory] = useState<MemoryCategory>('special');
  const [imageUrl, setImageUrl] = useState(PRESET_GALLERY_PHOTOS[0].url);
  const [caption, setCaption] = useState('');
  const [story, setStory] = useState('');
  const [location, setLocation] = useState('');
  const [songTag, setSongTag] = useState('');
  const [washiColor, setWashiColor] = useState<'rose' | 'gold' | 'tan'>('rose');
  const [isFavorite, setIsFavorite] = useState(false);
  const [imageSourceMode, setImageSourceMode] = useState<'preset' | 'upload'>('preset');
  const [dragActive, setDragActive] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Por favor selecciona un archivo de imagen válido.');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setImageUrl(e.target.result as string);
        setImageSourceMode('upload');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Por favor ingresa un título para el recuerdo.');
      return;
    }

    const randomRotations = [-2.2, -1.5, 1.2, 1.8, -1.8, 2.0];
    const rotation = randomRotations[Math.floor(Math.random() * randomRotations.length)];

    onAddMemory({
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
      rotation,
      badge: category === 'first_date' ? 'Cita Especial ✨' : category === 'trip' ? 'Viaje 🌍' : category === 'anniversary' ? 'Aniversario 🥂' : undefined,
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
            Añadir Nuevo Recuerdo
          </h3>
          <p className="text-xs font-sans text-[#82756a] mt-0.5">
            Guarda una foto especial en su collage cronológico
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Photo Selector */}
          <div>
            <label className="block text-xs font-semibold text-[#50453b] uppercase tracking-wider mb-2">
              Foto del Recuerdo
            </label>

            {/* Source Mode Toggle */}
            <div className="grid grid-cols-2 gap-2 mb-3">
              <button
                type="button"
                onClick={() => setImageSourceMode('preset')}
                className={`py-1.5 text-xs font-medium rounded-full border transition-all cursor-pointer ${
                  imageSourceMode === 'preset'
                    ? 'bg-[#8b4c50] text-white border-[#8b4c50]'
                    : 'bg-white text-[#50453b] border-[#d4c4b7]'
                }`}
              >
                Galería Romántica
              </button>
              <button
                type="button"
                onClick={() => {
                  setImageSourceMode('upload');
                  fileInputRef.current?.click();
                }}
                className={`py-1.5 text-xs font-medium rounded-full border transition-all cursor-pointer ${
                  imageSourceMode === 'upload'
                    ? 'bg-[#8b4c50] text-white border-[#8b4c50]'
                    : 'bg-white text-[#50453b] border-[#d4c4b7]'
                }`}
              >
                Subir mi Foto
              </button>
            </div>

            {/* Upload Area */}
            {imageSourceMode === 'upload' && (
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-xs p-4 text-center cursor-pointer transition-colors ${
                  dragActive
                    ? 'border-[#8b4c50] bg-[#ffafb1]/20'
                    : 'border-[#d4c4b7] bg-white hover:bg-[#fcf2e7]'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <Upload className="w-6 h-6 text-[#8b4c50] mx-auto mb-1" />
                <p className="text-xs font-medium text-[#1f1b14]">
                  Haz clic o arrastra tu foto aquí
                </p>
                <p className="text-[10px] text-[#82756a] mt-0.5">
                  JPG, PNG o WEBP (se guarda localmente en tu álbum)
                </p>
              </div>
            )}

            {/* Preset Gallery Grid */}
            {imageSourceMode === 'preset' && (
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 max-h-36 overflow-y-auto p-1 border border-[#e2d9ce] rounded-xs bg-white">
                {PRESET_GALLERY_PHOTOS.map((photo, i) => (
                  <div
                    key={i}
                    onClick={() => setImageUrl(photo.url)}
                    className={`aspect-square rounded-2xs overflow-hidden cursor-pointer relative border-2 ${
                      imageUrl === photo.url ? 'border-[#8b4c50] scale-95' : 'border-transparent'
                    }`}
                  >
                    <img
                      src={photo.url}
                      alt={photo.label}
                      className="w-full h-full object-cover"
                    />
                    {imageUrl === photo.url && (
                      <div className="absolute inset-0 bg-[#8b4c50]/40 flex items-center justify-center">
                        <Check className="w-4 h-4 text-white stroke-[3]" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Selected Image Preview */}
            {imageUrl && (
              <div className="mt-2 flex items-center gap-3 p-2 bg-white rounded-xs border border-[#e2d9ce]">
                <img
                  src={imageUrl}
                  alt="Vista previa"
                  className="w-12 h-12 object-cover rounded-2xs"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-[#1f1b14] truncate">
                    Foto seleccionada
                  </p>
                  <p className="text-[10px] text-[#82756a]">
                    Lista para el collage
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Title */}
          <div>
            <label className="block text-xs font-semibold text-[#50453b] uppercase tracking-wider mb-1">
              Título del Momento *
            </label>
            <input
              type="text"
              required
              placeholder="Ej. Tarde de helados, Nuestra primera cena, Viaje a la playa..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-[#d4c4b7] rounded-xs text-xs text-[#1f1b14] focus:outline-hidden focus:border-[#8b4c50]"
            />
          </div>

          {/* Date & Category Grid */}
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
                Categoría
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as MemoryCategory)}
                className="w-full px-3 py-2 bg-white border border-[#d4c4b7] rounded-xs text-xs text-[#1f1b14] focus:outline-hidden focus:border-[#8b4c50]"
              >
                <option value="first_date">Primera Cita</option>
                <option value="trip">Viaje / Escapada</option>
                <option value="anniversary">Aniversario</option>
                <option value="everyday">Cotidiano / Dulce</option>
                <option value="special">Especial</option>
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
              placeholder="Ej. Esa sonrisa que ilumina mis días..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-[#d4c4b7] rounded-xs text-xs text-[#1f1b14] focus:outline-hidden focus:border-[#8b4c50]"
            />
          </div>

          {/* Story */}
          <div>
            <label className="block text-xs font-semibold text-[#50453b] uppercase tracking-wider mb-1">
              Historia o Nota de Amor (Opcional)
            </label>
            <textarea
              rows={2}
              placeholder="Escribe lo que sentiste en ese momento..."
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
                placeholder="Ej. Parque del Retiro, París..."
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
                placeholder="Ej. Yellow - Coldplay"
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
              <span>Guardar en Favoritos ♥</span>
            </label>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full py-2.5 bg-[#8b4c50] hover:bg-[#7b3f42] text-white font-medium text-xs rounded-full shadow-xs active:scale-98 transition-all cursor-pointer"
            >
              Guardar Momento en el Álbum
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
