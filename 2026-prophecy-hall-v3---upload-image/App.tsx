import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Sparkles, RotateCcw } from 'lucide-react';

import { CARD_LIBRARY } from './constants';
import { TarotCard as TarotCardType, AppState, ReadingResult } from './types';
import { fetchFortuneReading } from './services/geminiService';

import StarryBackground from './components/StarryBackground';
import TarotCard from './components/TarotCard';
import LoadingSpinner from './components/LoadingSpinner';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.INTRO);
  const [selectedCardIds, setSelectedCardIds] = useState<number[]>([]);
  const [readingResult, setReadingResult] = useState<ReadingResult | null>(null);

  // Derived state
  const isSelectionComplete = selectedCardIds.length === 2;
  const selectedCards = CARD_LIBRARY.filter(c => selectedCardIds.includes(c.id));

  // --- Handlers ---

  const handleEnterHall = () => {
    setAppState(AppState.SELECTION);
  };

  const handleCardClick = (id: number) => {
    if (appState !== AppState.SELECTION) return;
    
    if (selectedCardIds.includes(id)) {
      setSelectedCardIds(prev => prev.filter(cId => cId !== id));
    } else {
      if (selectedCardIds.length < 2) {
        setSelectedCardIds(prev => [...prev, id]);
      }
    }
  };

  const handleReset = () => {
    setSelectedCardIds([]);
    setReadingResult(null);
    setAppState(AppState.INTRO);
  };

  // --- Effects ---

  // Auto-transition from SELECTION to FETCHING
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    if (appState === AppState.SELECTION && isSelectionComplete) {
      timeout = setTimeout(() => {
        setAppState(AppState.FETCHING);
      }, 1200);
    }
    return () => clearTimeout(timeout);
  }, [appState, isSelectionComplete]);

  // Handle API Fetching
  useEffect(() => {
    if (appState === AppState.FETCHING && selectedCards.length === 2) {
      const performReading = async () => {
        try {
          const result = await fetchFortuneReading(selectedCards[0], selectedCards[1]);
          setReadingResult(result);
          setAppState(AppState.REVEAL);
        } catch (error) {
          console.error("Critical error in fetching:", error);
          setAppState(AppState.ERROR); 
        }
      };
      performReading();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appState]);

  // --- Renders ---

  const renderIntro = () => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4"
    >
      <div className="mb-8 p-6 rounded-full border border-indigo-500/30 bg-indigo-900/20 backdrop-blur-sm shadow-[0_0_50px_rgba(79,70,229,0.2)]">
        <Sparkles className="w-16 h-16 text-amber-400 animate-pulse" />
      </div>
      <h1 className="text-4xl md:text-6xl font-cinzel text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 mb-6 drop-shadow-lg">
        2026 Prophecy Hall
      </h1>
      <p className="text-lg md:text-xl text-indigo-200 max-w-2xl font-lato leading-relaxed mb-10">
        The stars align for the coming year. Enter the sacred space, draw two cards, 
        and uncover the destiny that awaits your journey.
      </p>
      <button 
        onClick={handleEnterHall}
        className="group relative px-8 py-4 bg-transparent overflow-hidden rounded-lg transition-all hover:shadow-[0_0_30px_rgba(245,158,11,0.4)]"
      >
        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-indigo-900 to-slate-900 border border-amber-500/50 group-hover:border-amber-400 transition-colors"></div>
        <div className="absolute inset-0 bg-amber-500/10 group-hover:bg-amber-500/20 transition-colors"></div>
        <span className="relative text-amber-100 font-cinzel font-bold text-xl tracking-widest group-hover:text-white transition-colors">
          Enter Hall
        </span>
      </button>
    </motion.div>
  );

  const renderSelection = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center w-full max-w-6xl mx-auto px-4 py-8"
    >
      <h2 className="text-2xl md:text-3xl font-cinzel text-indigo-100 mb-2">Select Two Cards</h2>
      <p className="text-indigo-400 font-lato mb-8 text-center">
        Listen to your intuition. {selectedCardIds.length < 2 && <span className="block mt-2 text-amber-500/70 text-sm">Follow the pull of the celestial energies.</span>}
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 pb-20">
        {CARD_LIBRARY.map((card) => {
          return (
            <TarotCard
              key={card.id}
              card={card}
              isSelected={selectedCardIds.includes(card.id)}
              isRevealed={false}
              onClick={() => handleCardClick(card.id)}
              disabled={isSelectionComplete && !selectedCardIds.includes(card.id)}
            />
          );
        })}
      </div>
    </motion.div>
  );

  const renderReveal = () => {
    if (!readingResult || selectedCards.length < 2) return null;

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center w-full max-w-5xl mx-auto px-4 py-8 pb-24"
      >
        <h2 className="text-3xl font-cinzel text-amber-200 mb-10 drop-shadow-md">The Veil is Lifted</h2>

        <div className="flex flex-col md:flex-row gap-10 md:gap-16 mb-16 items-center">
          {selectedCards.map((card, idx) => (
            <div key={card.id} className="flex flex-col items-center gap-6 max-w-sm">
              <TarotCard
                card={card}
                isSelected={true}
                isRevealed={true}
                generatedImage={idx === 0 ? readingResult.card1Image : readingResult.card2Image}
                isLarge={false} 
              />
              <div className="bg-slate-900/60 backdrop-blur-md p-6 rounded-xl border border-indigo-500/30 text-center shadow-lg w-full min-h-[140px] flex flex-col justify-center">
                <p className="font-cinzel text-amber-400 text-lg mb-2">{card.name}</p>
                <p className="font-lato text-indigo-100 text-sm leading-relaxed italic">
                  "{card.fixedMeaning}"
                </p>
              </div>
            </div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center"
        >
           <button 
            onClick={handleReset}
            className="flex items-center gap-2 px-8 py-3 rounded-full border border-amber-500/50 bg-amber-500/5 text-amber-200 hover:bg-amber-500/20 hover:text-white transition-all text-sm font-cinzel uppercase tracking-widest shadow-[0_0_20px_rgba(245,158,11,0.1)]"
          >
            <RotateCcw className="w-4 h-4" />
            Seek a New Vision
          </button>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <div className="relative min-h-screen text-slate-200 overflow-x-hidden">
      <StarryBackground />
      
      <div className="relative z-10 flex flex-col min-h-screen">
        <header className="w-full py-6 px-8 flex justify-between items-center bg-gradient-to-b from-slate-950/80 to-transparent">
          <div className="font-cinzel font-bold text-amber-500 tracking-wider">2026 Prophecy</div>
        </header>

        <main className="flex-grow flex flex-col items-center justify-center p-4">
          <AnimatePresence mode="wait">
            {appState === AppState.INTRO && renderIntro()}
            {appState === AppState.SELECTION && renderSelection()}
            {appState === AppState.FETCHING && <LoadingSpinner key="loading" />}
            {appState === AppState.REVEAL && renderReveal()}
            {appState === AppState.ERROR && (
               <div className="text-center p-8 bg-red-900/20 border border-red-500/30 rounded-xl backdrop-blur-md max-w-md">
                  <h3 className="font-cinzel text-xl text-red-200 mb-4">The Vision has Clouded</h3>
                  <p className="text-indigo-300 text-sm mb-6">The cosmic energies were too turbulent for this specific alignment. Please try again.</p>
                  <button onClick={handleReset} className="text-amber-400 underline underline-offset-4 font-cinzel">Return to Entrance</button>
               </div>
            )}
          </AnimatePresence>
        </main>
        
        <footer className="w-full py-4 text-center text-indigo-500/50 text-xs font-lato">
          Powered by Gemini AI • 2026 Prophecy Hall
        </footer>
      </div>
    </div>
  );
};

export default App;
