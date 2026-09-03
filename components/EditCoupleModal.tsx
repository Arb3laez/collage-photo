import React, { useState } from 'react';
import { X, Heart, Calendar, Users, Sparkles } from 'lucide-react';
import { CoupleConfig } from '../src/types';

interface EditCoupleModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: CoupleConfig;
  onSaveConfig: (config: CoupleConfig) => void;
}

export const EditCoupleModal: React.FC<EditCoupleModalProps> = ({
  isOpen,
  onClose,
  config,
  onSaveConfig,
}) => {
  if (!isOpen) return null;

  const [partner1Name, setPartner1Name] = useState(config.partner1Name);
  const [partner2Name, setPartner2Name] = useState(config.partner2Name);
  const [startDate, setStartDate] = useState(config.relationshipStartDate.split('T')[0]);
  const [anniversaryDate, setAnniversaryDate] = useState(config.anniversaryDate.split('T')[0]);
  const [motto, setMotto] = useState(config.motto);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveConfig({
      ...config,
      partner1Name: partner1Name.trim() || 'Él',
      partner2Name: partner2Name.trim() || 'Ella',
      relationshipStartDate: `${startDate}T12:00:00`,
      anniversaryDate: `${anniversaryDate}T00:00:00`,
      motto: motto.trim() || 'Nuestra historia de amor.',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="relative w-full max-w-md bg-[#fff8f3] border border-[#e2d9ce] rounded-xs shadow-2xl p-6 sm:p-7">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-[#82756a] hover:text-[#1f1b14] rounded-full hover:bg-[#f6ece1] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="inline-flex p-2.5 bg-[#ffafb1]/30 rounded-full text-[#8b4c50] mb-2">
            <Heart className="w-6 h-6 fill-[#8b4c50]" />
          </div>
          <h3 className="font-serif text-2xl font-bold text-[#7d562d]">
            Nuestra Historia de Amor
          </h3>
          <p className="text-xs font-sans text-[#82756a] mt-0.5">
            Personaliza sus nombres, fechas clave y frase favorita
          </p>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#50453b] uppercase tracking-wider mb-1">
                Tu Nombre
              </label>
              <input
                type="text"
                required
                value={partner1Name}
                onChange={(e) => setPartner1Name(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-[#d4c4b7] rounded-xs text-xs text-[#1f1b14] focus:outline-hidden focus:border-[#8b4c50]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#50453b] uppercase tracking-wider mb-1">
                Nombre de tu Pareja
              </label>
              <input
                type="text"
                required
                value={partner2Name}
                onChange={(e) => setPartner2Name(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-[#d4c4b7] rounded-xs text-xs text-[#1f1b14] focus:outline-hidden focus:border-[#8b4c50]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#50453b] uppercase tracking-wider mb-1">
              Fecha en que nos conocimos / Empezamos
            </label>
            <input
              type="date"
              required
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-[#d4c4b7] rounded-xs text-xs text-[#1f1b14] focus:outline-hidden focus:border-[#8b4c50]"
            />
            <p className="text-[10px] text-[#82756a] mt-1">
              Calcula los días y años que llevan juntos en tiempo real.
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#50453b] uppercase tracking-wider mb-1">
              Fecha de Próximo Aniversario
            </label>
            <input
              type="date"
              required
              value={anniversaryDate}
              onChange={(e) => setAnniversaryDate(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-[#d4c4b7] rounded-xs text-xs text-[#1f1b14] focus:outline-hidden focus:border-[#8b4c50]"
            />
            <p className="text-[10px] text-[#82756a] mt-1">
              Alimenta el reloj de cuenta atrás de aniversario.
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#50453b] uppercase tracking-wider mb-1">
              Frase o Lema de la Pareja
            </label>
            <input
              type="text"
              value={motto}
              onChange={(e) => setMotto(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-[#d4c4b7] rounded-xs text-xs text-[#1f1b14] focus:outline-hidden focus:border-[#8b4c50]"
            />
          </div>

          <div className="pt-3">
            <button
              type="submit"
              className="w-full py-2.5 bg-[#8b4c50] hover:bg-[#7b3f42] text-white font-medium text-xs rounded-full shadow-xs active:scale-98 transition-all cursor-pointer"
            >
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
