import React, { useState } from 'react';
import { Memory, LoveQuote, CoupleConfig, ActiveTab } from './types';
import { INITIAL_MEMORIES, INITIAL_STORY_MEMORIES, INITIAL_QUOTES, INITIAL_COUPLE_CONFIG } from './data/initialMemories';
import { Header } from '../components/Header';
import { StoryFeedView } from '../components/StoryFeedView';
import { TimelineView } from '../components/TimelineView';
import { CollageView } from '../components/CollageView';
import { FavoritesView } from '../components/FavoritesView';
import { BottomNav } from '../components/BottomNav';
import { AddMemoryModal } from '../components/AddMemoryModal';
import { EditMemoryModal } from '../components/EditMemoryModal';
import { EditCoupleModal } from '../components/EditCoupleModal';
import { PhotoLightboxModal } from '../components/PhotoLightboxModal';
import { LoveLetterModal } from '../components/LoveLetterModal';
import { toggleRomanticAudio, isAudioActive } from './utils/romanticAudio';
import { useSyncedState } from './lib/useSyncedState';
import { isFirebaseConfigured } from './lib/firebase';

const STORAGE_KEY_MEMORIES = 'our_memories_data_v14';
const STORAGE_KEY_STORY = 'our_memories_story_v1';
const STORAGE_KEY_CONFIG = 'our_memories_config_v2';
const STORAGE_KEY_QUOTES = 'our_memories_quotes_v2';

export default function App() {
  // 1. App State sincronizado con Firestore (con fallback a localStorage).
  // La colección principal de recuerdos.
  const [memories, setMemories] = useSyncedState<Memory[]>(
    'memories',
    INITIAL_MEMORIES,
    STORAGE_KEY_MEMORIES
  );

  // "Nuestra Historia" (Our Story) es una pantalla independiente con su propia
  // lista. Arranca vacía y se sincroniza por separado.
  const [storyMemories, setStoryMemories] = useSyncedState<Memory[]>(
    'story',
    INITIAL_STORY_MEMORIES,
    STORAGE_KEY_STORY
  );

  const [config, setConfig] = useSyncedState<CoupleConfig>(
    'config',
    INITIAL_COUPLE_CONFIG,
    STORAGE_KEY_CONFIG
  );

  const [quotes] = useSyncedState<LoveQuote[]>(
    'quotes',
    INITIAL_QUOTES,
    STORAGE_KEY_QUOTES
  );

  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<ActiveTab>('story');
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingMemory, setEditingMemory] = useState<Memory | null>(null);
  const [isCoupleModalOpen, setIsCoupleModalOpen] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<Memory | null>(null);
  const [isLetterModalOpen, setIsLetterModalOpen] = useState(false);

  // La persistencia (Firestore + caché local) la maneja useSyncedState.

  // Handlers
  const handleToggleFavorite = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    // El id vive en una sola lista; mapear ambas es inocuo y mantiene todo sincronizado.
    setMemories((prev) =>
      prev.map((mem) => (mem.id === id ? { ...mem, isFavorite: !mem.isFavorite } : mem))
    );
    setStoryMemories((prev) =>
      prev.map((mem) => (mem.id === id ? { ...mem, isFavorite: !mem.isFavorite } : mem))
    );
    if (selectedPhoto && selectedPhoto.id === id) {
      setSelectedPhoto((prev) => (prev ? { ...prev, isFavorite: !prev.isFavorite } : null));
    }
  };

  const handleAddMemory = (newMemData: Omit<Memory, 'id'>) => {
    const newMemory: Memory = {
      ...newMemData,
      id: `mem-${Date.now()}`,
    };
    // Desde "Nuestra Historia" se agrega a su propia lista independiente;
    // desde cualquier otra pantalla se agrega a la colección principal.
    if (activeTab === 'story') {
      setStoryMemories((prev) => [newMemory, ...prev]);
    } else {
      setMemories((prev) => [newMemory, ...prev]);
    }
  };

  const handleOpenPhoto = (memory: Memory) => {
    setSelectedPhoto(memory);
    setIsLightboxOpen(true);
  };

  const handleOpenEditMemory = (memory: Memory) => {
    setEditingMemory(memory);
    setIsEditModalOpen(true);
  };

  const handleUpdateMemory = (id: string, data: Partial<Memory>) => {
    // El momento vive en una sola lista; actualizar ambas mantiene todo sincronizado.
    setMemories((prev) =>
      prev.map((mem) => (mem.id === id ? { ...mem, ...data } : mem))
    );
    setStoryMemories((prev) =>
      prev.map((mem) => (mem.id === id ? { ...mem, ...data } : mem))
    );
    if (selectedPhoto && selectedPhoto.id === id) {
      setSelectedPhoto((prev) => (prev ? { ...prev, ...data } : null));
    }
  };

  const handleNextQuote = () => {
    setCurrentQuoteIndex((prev) => (prev + 1) % quotes.length);
  };

  const handleToggleMusic = () => {
    const active = toggleRomanticAudio((playing) => {
      setIsPlayingMusic(playing);
    });
    setIsPlayingMusic(active);
  };

  const handleScrollToCountdown = () => {
    setActiveTab('story');
    setTimeout(() => {
      const el = document.getElementById('anniversary-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  // Favoritos y Lightbox consideran ambas listas (colección principal + historia).
  const allMemories = [...memories, ...storyMemories];
  const favoritesCount = allMemories.filter((m) => m.isFavorite).length;

  return (
    <div className="min-h-screen bg-[#fff8f3] paper-texture text-[#1f1b14] flex flex-col selection:bg-[#ffafb1]/50 pb-20">
      {/* App Header */}
      <Header
        config={config}
        isPlayingMusic={isPlayingMusic}
        onToggleMusic={handleToggleMusic}
        onOpenAddModal={() => setIsAddModalOpen(true)}
        onOpenCoupleModal={() => setIsCoupleModalOpen(true)}
        onScrollToCountdown={handleScrollToCountdown}
        favoritesCount={favoritesCount}
        onOpenFavsTab={() => setActiveTab('favs')}
      />

      {/* Main Container - Optimized for mobile & desktop with scrapbook feel */}
      <main className="flex-1 w-full max-w-xl mx-auto px-3 sm:px-4 pt-4 sm:pt-6">
        {/* TAB 1: OUR STORY (The exact aesthetic feed from the screenshot) */}
        {activeTab === 'story' && (
          <StoryFeedView
            memories={storyMemories}
            quote={quotes[currentQuoteIndex] || quotes[0]}
            config={config}
            onToggleFavorite={handleToggleFavorite}
            onClickPhoto={handleOpenPhoto}
            onNextQuote={handleNextQuote}
            onOpenAddModal={() => setIsAddModalOpen(true)}
            onOpenEditModal={() => setIsCoupleModalOpen(true)}
            onOpenLetterModal={() => setIsLetterModalOpen(true)}
          />
        )}

        {/* TAB 2: CHRONOLOGICAL TIMELINE */}
        {activeTab === 'timeline' && (
          <TimelineView
            memories={storyMemories}
            config={config}
            onToggleFavorite={handleToggleFavorite}
            onClickPhoto={handleOpenPhoto}
            onOpenAddModal={() => setIsAddModalOpen(true)}
          />
        )}

        {/* TAB 3: COLLAGE & PHOTO SCRAPBOOK */}
        {activeTab === 'collage' && (
          <CollageView
            memories={memories}
            quotes={quotes}
            config={config}
            onToggleFavorite={handleToggleFavorite}
            onClickPhoto={handleOpenPhoto}
            onEditMemory={handleOpenEditMemory}
            onOpenAddModal={() => setIsAddModalOpen(true)}
          />
        )}

        {/* TAB 4: FAVORITES */}
        {activeTab === 'favs' && (
          <FavoritesView
            memories={allMemories}
            config={config}
            onToggleFavorite={handleToggleFavorite}
            onClickPhoto={handleOpenPhoto}
            onOpenAddModal={() => setIsAddModalOpen(true)}
            onGoToStory={() => setActiveTab('story')}
          />
        )}
      </main>

      {/* Bottom Material Navigation Bar */}
      <BottomNav
        activeTab={activeTab}
        onChangeTab={setActiveTab}
        favoritesCount={favoritesCount}
      />

      {/* Modals */}
      <AddMemoryModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddMemory={handleAddMemory}
      />

      <EditMemoryModal
        isOpen={isEditModalOpen}
        memory={editingMemory}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleUpdateMemory}
      />

      <EditCoupleModal
        isOpen={isCoupleModalOpen}
        onClose={() => setIsCoupleModalOpen(false)}
        config={config}
        onSaveConfig={setConfig}
      />

      <PhotoLightboxModal
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        memory={selectedPhoto}
        memories={allMemories}
        onSelectMemory={setSelectedPhoto}
        onToggleFavorite={handleToggleFavorite}
      />

      <LoveLetterModal
        isOpen={isLetterModalOpen}
        onClose={() => setIsLetterModalOpen(false)}
        config={config}
      />

      {/* Aviso discreto: la sincronización en la nube no está activa. */}
      {!isFirebaseConfigured && (
        <div className="fixed bottom-24 left-3 z-40 px-2.5 py-1 bg-[#fcf2e7] border border-[#e2d9ce] rounded-full text-[10px] font-sans text-[#7d562d] shadow-xs pointer-events-none">
          💾 Modo local (sin sincronización)
        </div>
      )}
    </div>
  );
}
