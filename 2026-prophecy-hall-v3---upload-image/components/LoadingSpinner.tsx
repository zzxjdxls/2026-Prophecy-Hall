import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-6 animate-in fade-in duration-1000">
      <div className="relative">
        <div className="absolute inset-0 blur-xl bg-amber-500/20 rounded-full"></div>
        <Loader2 className="w-16 h-16 text-amber-500 animate-spin relative z-10" />
      </div>
      <h2 className="text-xl md:text-2xl font-cinzel text-indigo-200 animate-pulse">
        Reading the stars...
      </h2>
      <p className="text-sm font-lato text-indigo-400">Consulting the Oracle of 2026</p>
    </div>
  );
};

export default LoadingSpinner;
