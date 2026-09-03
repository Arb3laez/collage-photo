import React, { useState, useEffect } from 'react';
import { Calendar, Heart, Sparkles, Clock, PartyPopper } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CoupleConfig } from '../src/types';
import { calculateCountdownToAnniversary, calculateTimeElapsed, formatDateSpanish } from '../src/utils/timeCalculations';

interface AnniversaryCountdownProps {
  config: CoupleConfig;
  onOpenEditModal: () => void;
}

export const AnniversaryCountdown: React.FC<AnniversaryCountdownProps> = ({
  config,
  onOpenEditModal,
}) => {
  const [mode, setMode] = useState<'countdown' | 'together'>('countdown');
  const [countdown, setCountdown] = useState(() => calculateCountdownToAnniversary(config.anniversaryDate));
  const [together, setTogether] = useState(() => calculateTimeElapsed(config.relationshipStartDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(calculateCountdownToAnniversary(config.anniversaryDate));
      setTogether(calculateTimeElapsed(config.relationshipStartDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [config.anniversaryDate, config.relationshipStartDate]);

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#8b4c50', '#d4a373', '#e29b8a', '#ffafb1', '#ffdada'],
      });
    } catch {
      // Ignore if confetti fails
    }
  };

  const padZero = (num: number) => num.toString().padStart(2, '0');

  return (
    <section id="anniversary-section" className="my-10 pt-4 text-center">
      {/* Title with Calendar icon matching screenshot */}
      <div className="flex items-center justify-center gap-2.5 mb-6 px-2">
        <Calendar className="w-6 h-6 text-[#7d562d]" />
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#7d562d] tracking-tight">
          {mode === 'countdown' ? 'Cuenta atrás para nuestro aniversario' : 'Tiempo que llevamos juntos'}
        </h2>
      </div>

      {mode === 'countdown' ? (
        /* 3 on top, 1 centered below matching exact screenshot layout */
        <div className="max-w-md mx-auto">
          <div className="grid grid-cols-3 gap-3 mb-3">
            {/* Días */}
            <div className="bg-[#fcf2e7] border border-[#e2d9ce]/80 rounded-xs p-3.5 sm:p-4 scrapbook-shadow flex flex-col items-center justify-center">
              <span className="font-serif text-3xl sm:text-4xl font-bold text-[#7d562d] leading-none">
                {padZero(countdown.days)}
              </span>
              <span className="mt-1.5 text-[11px] font-sans font-semibold tracking-wider text-[#50453b] uppercase">
                Días
              </span>
            </div>

            {/* Horas */}
            <div className="bg-[#fcf2e7] border border-[#e2d9ce]/80 rounded-xs p-3.5 sm:p-4 scrapbook-shadow flex flex-col items-center justify-center">
              <span className="font-serif text-3xl sm:text-4xl font-bold text-[#7d562d] leading-none">
                {padZero(countdown.hours)}
              </span>
              <span className="mt-1.5 text-[11px] font-sans font-semibold tracking-wider text-[#50453b] uppercase">
                Horas
              </span>
            </div>

            {/* Minutos */}
            <div className="bg-[#fcf2e7] border border-[#e2d9ce]/80 rounded-xs p-3.5 sm:p-4 scrapbook-shadow flex flex-col items-center justify-center">
              <span className="font-serif text-3xl sm:text-4xl font-bold text-[#7d562d] leading-none">
                {padZero(countdown.minutes)}
              </span>
              <span className="mt-1.5 text-[11px] font-sans font-semibold tracking-wider text-[#50453b] uppercase">
                Minutos
              </span>
            </div>
          </div>

          {/* Segundos centered */}
          <div className="flex justify-center">
            <div className="w-1/3 bg-[#fcf2e7] border border-[#e2d9ce]/80 rounded-xs p-3.5 sm:p-4 scrapbook-shadow flex flex-col items-center justify-center">
              <span className="font-serif text-3xl sm:text-4xl font-bold text-[#7d562d] leading-none tabular-nums">
                {padZero(countdown.seconds)}
              </span>
              <span className="mt-1.5 text-[11px] font-sans font-semibold tracking-wider text-[#50453b] uppercase">
                Segundos
              </span>
            </div>
          </div>
        </div>
      ) : (
        /* Time Together Display */
        <div className="max-w-md mx-auto bg-[#fcf2e7] border border-[#e2d9ce]/80 rounded-xs p-5 sm:p-6 scrapbook-shadow">
          <p className="text-xs font-sans uppercase tracking-widest text-[#8b4c50] font-semibold mb-3">
            Desde el {formatDateSpanish(config.relationshipStartDate.split('T')[0])}
          </p>

          <div className="grid grid-cols-3 gap-2 text-center mb-3">
            <div className="bg-white/80 p-2.5 rounded-xs border border-[#e2d9ce]/60">
              <span className="font-serif text-2xl font-bold text-[#7d562d]">{together.years}</span>
              <p className="text-[10px] uppercase font-semibold text-[#82756a]">Años</p>
            </div>
            <div className="bg-white/80 p-2.5 rounded-xs border border-[#e2d9ce]/60">
              <span className="font-serif text-2xl font-bold text-[#7d562d]">{together.months}</span>
              <p className="text-[10px] uppercase font-semibold text-[#82756a]">Meses</p>
            </div>
            <div className="bg-white/80 p-2.5 rounded-xs border border-[#e2d9ce]/60">
              <span className="font-serif text-2xl font-bold text-[#7d562d]">{together.days}</span>
              <p className="text-[10px] uppercase font-semibold text-[#82756a]">Días</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 text-xs font-mono font-medium text-[#7d562d] bg-white/50 py-1.5 px-3 rounded-full mx-auto w-fit">
            <span>{padZero(together.hours)}h</span>
            <span>:</span>
            <span>{padZero(together.minutes)}m</span>
            <span>:</span>
            <span className="text-[#8b4c50]">{padZero(together.seconds)}s</span>
          </div>

          <p className="mt-3 text-xs font-literata italic text-[#50453b]">
            Total: <span className="font-semibold text-[#8b4c50]">{together.totalDays}</span> días llenos de amor y recuerdos compartidos.
          </p>
        </div>
      )}

      {/* Action switches and celebration button */}
      <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5">
        <button
          id="toggle-counter-mode-btn"
          onClick={() => setMode(m => m === 'countdown' ? 'together' : 'countdown')}
          className="px-3.5 py-1.5 bg-[#f6ece1] hover:bg-[#ebe1d6] text-[#7d562d] text-xs font-medium rounded-full border border-[#d4c4b7] active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
        >
          {mode === 'countdown' ? (
            <>
              <Clock className="w-3.5 h-3.5" />
              <span>Ver tiempo total juntos</span>
            </>
          ) : (
            <>
              <Calendar className="w-3.5 h-3.5" />
              <span>Ver cuenta atrás aniversario</span>
            </>
          )}
        </button>

        <button
          id="celebrate-love-btn"
          onClick={triggerConfetti}
          className="px-3.5 py-1.5 bg-[#8b4c50] hover:bg-[#7b3f42] text-white text-xs font-medium rounded-full shadow-xs active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
        >
          <PartyPopper className="w-3.5 h-3.5 text-[#ffdada]" />
          <span>¡Celebrar!</span>
        </button>

        <button
          id="edit-anniversary-date-btn"
          onClick={onOpenEditModal}
          className="px-3 py-1.5 text-xs text-[#82756a] hover:text-[#1f1b14] hover:underline cursor-pointer"
        >
          Editar fecha
        </button>
      </div>
    </section>
  );
};
