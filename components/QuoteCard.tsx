import React from 'react';
import { Sparkles, RefreshCw, Heart } from 'lucide-react';
import { LoveQuote } from '../src/types';

interface QuoteCardProps {
  quote: LoveQuote;
  onNextQuote?: () => void;
  onOpenLetterModal?: () => void;
}

export const QuoteCard: React.FC<QuoteCardProps> = ({
  quote,
  onNextQuote,
  onOpenLetterModal,
}) => {
  return (
    <div
      id="romantic-quote-card"
      className="relative bg-[#fcf2e7] border border-[#e2d9ce]/70 rounded-xs p-6 sm:p-8 scrapbook-shadow text-center my-6 group"
    >
      {/* Decorative diamond / star icon on corner matching reference image */}
      <div className="absolute -top-3 -left-3 w-6 h-6 rotate-45 bg-[#e29b8a]/60 flex items-center justify-center shadow-xs">
        <Sparkles className="w-3.5 h-3.5 text-white -rotate-45" />
      </div>

      {/* Quote text */}
      <blockquote className="font-serif text-2xl sm:text-3xl font-bold text-[#8b4c50] leading-relaxed tracking-tight px-2 sm:px-6">
        {quote.text}
      </blockquote>

      {/* Subtle divider line matching screenshot */}
      <div className="w-12 h-0.5 bg-[#d4c4b7] mx-auto my-4 rounded-full" />

      {/* Subtext / author */}
      {quote.author && (
        <p className="font-literata italic text-xs sm:text-sm text-[#7d562d]">
          {quote.author}
        </p>
      )}

      {/* Interactive controls */}
      <div className="mt-4 flex items-center justify-center gap-3">
        {onNextQuote && (
          <button
            id="next-quote-btn"
            onClick={onNextQuote}
            className="inline-flex items-center gap-1 text-[11px] font-sans font-medium text-[#82756a] hover:text-[#8b4c50] bg-white/70 px-3 py-1 rounded-full border border-[#d4c4b7]/50 active:scale-95 transition-all cursor-pointer"
            title="Cambiar frase de amor"
          >
            <RefreshCw className="w-3 h-3 group-hover:rotate-45 transition-transform" />
            <span>Otra frase</span>
          </button>
        )}

        {onOpenLetterModal && (
          <button
            id="write-letter-btn"
            onClick={onOpenLetterModal}
            className="inline-flex items-center gap-1 text-[11px] font-sans font-medium text-[#8b4c50] hover:text-[#7b3f42] bg-[#ffafb1]/20 px-3 py-1 rounded-full border border-[#ffafb1]/40 active:scale-95 transition-all cursor-pointer"
            title="Ver o escribir carta de amor"
          >
            <Heart className="w-3 h-3 fill-[#8b4c50]/40" />
            <span>Nuestra carta</span>
          </button>
        )}
      </div>
    </div>
  );
};
