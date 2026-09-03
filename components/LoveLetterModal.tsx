import React, { useState } from 'react';
import { X, Heart, Sparkles, Send, Check } from 'lucide-react';
import { CoupleConfig } from '../src/types';

interface LoveLetterModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: CoupleConfig;
}

export const LoveLetterModal: React.FC<LoveLetterModalProps> = ({
  isOpen,
  onClose,
  config,
}) => {
  if (!isOpen) return null;

  const defaultLetter = `Mi amor,

Desde el primer día que nuestras miradas se cruzaron, supe que mi mundo había cambiado para siempre. 

Gracias por cada risa compartida, por los abrazos que calman cualquier tormenta, por los viajes que hemos hecho y por todos los que aún soñamos con hacer juntos. 

Mirar atrás y ver cada foto de nuestro camino me llena el corazón de una gratitud inmensa. Eres mi hogar, mi cómplice y mi gran amor.

Por mil aventuras más tomados de la mano.`;

  const [letterText, setLetterText] = useState(defaultLetter);
  const [isEditing, setIsEditing] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = () => {
    setIsEditing(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-lg bg-[#fff8f3] border border-[#e2d9ce] rounded-xs shadow-2xl p-6 sm:p-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-[#82756a] hover:text-[#1f1b14] rounded-full hover:bg-[#f6ece1] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header with wax seal look */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 mx-auto rounded-full bg-[#8b4c50] text-white flex items-center justify-center shadow-md border-2 border-[#7b3f42] mb-3">
            <Heart className="w-7 h-7 fill-white" />
          </div>
          <h3 className="font-serif text-2xl font-bold text-[#1f1b14]">
            Carta de Amor
          </h3>
          <p className="text-xs font-sans text-[#7d562d]">
            Para {config.partner2Name}, de {config.partner1Name}
          </p>
        </div>

        {/* Letter Body (Paper texture) */}
        <div className="bg-[#fcf2e7] border border-[#e2d9ce] rounded-xs p-5 sm:p-6 scrapbook-shadow relative">
          {isEditing ? (
            <textarea
              rows={10}
              value={letterText}
              onChange={(e) => setLetterText(e.target.value)}
              className="w-full bg-transparent font-literata text-sm text-[#1f1b14] leading-relaxed focus:outline-hidden resize-none"
            />
          ) : (
            <div className="font-literata text-sm text-[#1f1b14] leading-relaxed whitespace-pre-line">
              {letterText}
            </div>
          )}

          <div className="mt-4 pt-3 border-t border-[#e2d9ce] text-right font-script text-xl text-[#8b4c50]">
            Con todo mi amor, {config.partner1Name} ♥
          </div>
        </div>

        {/* Action Controls */}
        <div className="mt-5 flex items-center justify-between gap-3">
          {isEditing ? (
            <button
              onClick={handleSave}
              className="w-full py-2 bg-[#8b4c50] text-white rounded-full text-xs font-medium hover:bg-[#7b3f42] active:scale-98 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>Guardar mi carta</span>
            </button>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-white border border-[#d4c4b7] text-[#7d562d] rounded-full text-xs font-medium hover:bg-[#f6ece1] active:scale-95 transition-all cursor-pointer"
              >
                Editar texto
              </button>

              <button
                onClick={onClose}
                className="px-6 py-2 bg-[#8b4c50] text-white rounded-full text-xs font-medium hover:bg-[#7b3f42] active:scale-95 transition-all cursor-pointer"
              >
                Cerrar
              </button>
            </>
          )}
        </div>

        {savedSuccess && (
          <p className="text-center text-xs text-[#8b4c50] font-medium mt-2 animate-fade-in">
            ¡Carta de amor actualizada con éxito!
          </p>
        )}
      </div>
    </div>
  );
};
