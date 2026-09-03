import React from 'react';
import { BookOpen, GitCommitHorizontal, LayoutGrid, Sparkles, Heart } from 'lucide-react';
import { ActiveTab } from '../src/types';

interface BottomNavProps {
  activeTab: ActiveTab;
  onChangeTab: (tab: ActiveTab) => void;
  favoritesCount: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onChangeTab,
  favoritesCount,
}) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#fff8f3]/95 backdrop-blur-md border-t border-[#e2d9ce]/80 px-4 py-2 sm:py-3 transition-all shadow-md">
      <div className="max-w-md mx-auto flex items-center justify-around">
        {/* 1. Our Story (Feed) */}
        <button
          id="tab-story-btn"
          onClick={() => onChangeTab('story')}
          className="flex flex-col items-center gap-1 group cursor-pointer"
        >
          <div
            className={`px-5 py-1.5 rounded-full flex items-center justify-center transition-all ${
              activeTab === 'story'
                ? 'bg-[#ffafb1] text-[#7b3f42] shadow-2xs font-semibold'
                : 'text-[#82756a] hover:bg-[#f6ece1]'
            }`}
          >
            <BookOpen className="w-5 h-5" />
          </div>
          <span
            className={`text-[11px] font-sans transition-colors ${
              activeTab === 'story'
                ? 'font-bold text-[#7b3f42]'
                : 'font-medium text-[#82756a]'
            }`}
          >
            Our Story
          </span>
        </button>

        {/* 2. Chronological Timeline */}
        <button
          id="tab-timeline-btn"
          onClick={() => onChangeTab('timeline')}
          className="flex flex-col items-center gap-1 group cursor-pointer"
        >
          <div
            className={`px-5 py-1.5 rounded-full flex items-center justify-center transition-all ${
              activeTab === 'timeline'
                ? 'bg-[#ffafb1] text-[#7b3f42] shadow-2xs font-semibold'
                : 'text-[#82756a] hover:bg-[#f6ece1]'
            }`}
          >
            <GitCommitHorizontal className="w-5 h-5" />
          </div>
          <span
            className={`text-[11px] font-sans transition-colors ${
              activeTab === 'timeline'
                ? 'font-bold text-[#7b3f42]'
                : 'font-medium text-[#82756a]'
            }`}
          >
            Timeline
          </span>
        </button>

        {/* 3. Collage & Gallery */}
        <button
          id="tab-collage-btn"
          onClick={() => onChangeTab('collage')}
          className="flex flex-col items-center gap-1 group cursor-pointer"
        >
          <div
            className={`px-5 py-1.5 rounded-full flex items-center justify-center transition-all ${
              activeTab === 'collage'
                ? 'bg-[#ffafb1] text-[#7b3f42] shadow-2xs font-semibold'
                : 'text-[#82756a] hover:bg-[#f6ece1]'
            }`}
          >
            <LayoutGrid className="w-5 h-5" />
          </div>
          <span
            className={`text-[11px] font-sans transition-colors ${
              activeTab === 'collage'
                ? 'font-bold text-[#7b3f42]'
                : 'font-medium text-[#82756a]'
            }`}
          >
            Gallery
          </span>
        </button>

        {/* 4. Favorites */}
        <button
          id="tab-favs-btn"
          onClick={() => onChangeTab('favs')}
          className="flex flex-col items-center gap-1 group cursor-pointer relative"
        >
          <div
            className={`px-5 py-1.5 rounded-full flex items-center justify-center transition-all ${
              activeTab === 'favs'
                ? 'bg-[#ffafb1] text-[#7b3f42] shadow-2xs font-semibold'
                : 'text-[#82756a] hover:bg-[#f6ece1]'
            }`}
          >
            <Sparkles className="w-5 h-5" />
          </div>
          <span
            className={`text-[11px] font-sans transition-colors ${
              activeTab === 'favs'
                ? 'font-bold text-[#7b3f42]'
                : 'font-medium text-[#82756a]'
            }`}
          >
            Favs {favoritesCount > 0 && `(${favoritesCount})`}
          </span>
        </button>
      </div>
    </nav>
  );
};
