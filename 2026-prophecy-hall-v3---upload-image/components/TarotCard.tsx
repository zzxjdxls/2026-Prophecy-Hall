
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import { TarotCard as TarotCardType } from '../types';

interface Props {
  card: TarotCardType;
  isSelected: boolean;
  isRevealed: boolean;
  generatedImage?: string;
  onClick?: () => void;
  disabled?: boolean;
  isLarge?: boolean;
}

const TarotCard: React.FC<Props> = ({ 
  card, 
  isSelected, 
  isRevealed, 
  generatedImage, 
  onClick,
  disabled,
  isLarge = false
}) => {
  const [imgError, setImgError] = useState(false);

  const dimensions = isLarge 
    ? "w-52 h-[21rem] md:w-80 md:h-[30rem]" 
    : "w-40 h-64 md:w-56 md:h-80";

  const displayImage = generatedImage || card.staticImage;

  // RE-DESIGNED: High-fidelity mystical card back with Sacred Geometry and Moon Phases
  const CardBackArt = () => (
    <svg viewBox="0 0 300 450" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[0_0_8px_rgba(212,175,55,0.3)]">
      <defs>
        <linearGradient id="goldMetallic" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FBDF93" />
          <stop offset="20%" stopColor="#D4AF37" />
          <stop offset="50%" stopColor="#F5D17E" />
          <stop offset="80%" stopColor="#B8860B" />
          <stop offset="100%" stopColor="#D4AF37" />
        </linearGradient>
        <filter id="softGlow">
          <feGaussianBlur stdDeviation="1.5" result="blur"/>
          <feComposite in="SourceGraphic" in2="blur" operator="over"/>
        </filter>
        <radialGradient id="nebulaCenter" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#1E1B4B" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#020617" stopOpacity="1" />
        </radialGradient>
      </defs>

      {/* Deep Midnight Canvas */}
      <rect width="300" height="450" fill="#020617" rx="12" />
      <rect width="300" height="450" fill="url(#nebulaCenter)" rx="12" />

      {/* Symmetrical Geometric Frame */}
      <g stroke="url(#goldMetallic)" strokeWidth="1.5" fill="none">
        <rect x="12" y="12" width="276" height="426" rx="8" />
        <rect x="20" y="20" width="260" height="410" rx="6" opacity="0.4" strokeWidth="0.5" />
      </g>

      {/* Corner Mystical Seals */}
      {[
        { x: 12, y: 12, rot: 0 },
        { x: 288, y: 12, rot: 90 },
        { x: 288, y: 438, rot: 180 },
        { x: 12, y: 438, rot: 270 }
      ].map((c, i) => (
        <g key={i} transform={`translate(${c.x}, ${c.y}) rotate(${c.rot})`}>
          <path d="M0,0 L25,0 C25,0 15,10 0,25 Z" fill="url(#goldMetallic)" opacity="0.8" />
          <circle cx="8" cy="8" r="3" stroke="white" strokeWidth="0.5" opacity="0.5" />
        </g>
      ))}

      {/* Central Sacred Geometry (Flower of Life Motif) */}
      <g transform="translate(150, 225)" filter="url(#softGlow)">
        {/* Outer Circular Rings */}
        <circle r="95" stroke="url(#goldMetallic)" strokeWidth="0.5" opacity="0.3" />
        <circle r="100" stroke="url(#goldMetallic)" strokeWidth="1" />
        <circle r="110" stroke="url(#goldMetallic)" strokeWidth="0.5" opacity="0.5" />

        {/* 12-Pointed Celestial Star */}
        {[...Array(12)].map((_, i) => (
          <path 
            key={i} 
            d="M0,-90 L10,-20 L0,-10 L-10,-20 Z" 
            transform={`rotate(${i * 30})`} 
            fill="url(#goldMetallic)" 
            opacity={i % 3 === 0 ? 0.9 : 0.6}
          />
        ))}

        {/* Inner Geometric Lattice */}
        {[...Array(6)].map((_, i) => (
          <circle 
            key={i} 
            cx={Math.cos(i * Math.PI / 3) * 35} 
            cy={Math.sin(i * Math.PI / 3) * 35} 
            r="35" 
            stroke="url(#goldMetallic)" 
            strokeWidth="0.8" 
            opacity="0.4" 
          />
        ))}
        <circle r="35" stroke="url(#goldMetallic)" strokeWidth="1.2" />
        
        {/* Core Eye / Sun Symbol */}
        <circle r="12" fill="url(#goldMetallic)" />
        <circle r="18" stroke="url(#goldMetallic)" strokeWidth="0.5" strokeDasharray="2 2" />
      </g>

      {/* Vertical Moon Phase Axis */}
      <g transform="translate(150, 225)" stroke="url(#goldMetallic)" fill="url(#goldMetallic)">
        {/* Top Phases */}
        <g transform="translate(0, -145)">
           <circle r="6" fill="none" stroke="url(#goldMetallic)" strokeWidth="1" /> {/* New Moon */}
           <path d="M-8,0 A 8,8 0 0,1 8,0 A 6,6 0 0,0 -8,0" transform="translate(0, 30)" /> {/* Waxing Crescent */}
           <path d="M-8,-8 A 8,8 0 1,1 -8,8 Z" transform="translate(0, 60)" /> {/* First Quarter */}
        </g>
        
        {/* Bottom Phases */}
        <g transform="translate(0, 145)">
           <circle r="8" transform="translate(0, 0)" /> {/* Full Moon */}
           <path d="M8,8 A 8,8 0 1,1 8,-8 Z" transform="translate(0, -30)" /> {/* Last Quarter */}
           <path d="M8,0 A 8,8 0 0,0 -8,0 A 6,6 0 0,1 8,0" transform="translate(0, -60)" /> {/* Waning Crescent */}
        </g>
      </g>

      {/* Celestial Dust / Stars */}
      <g opacity="0.6">
        {[...Array(40)].map((_, i) => {
          const x = (i * 137.5) % 270 + 15;
          const y = (i * 222.5) % 420 + 15;
          const size = Math.random() * 1.5 + 0.5;
          return <circle key={i} cx={x} cy={y} r={size} fill="white" opacity={Math.random()} />;
        })}
      </g>

      {/* Decorative filigree along the vertical center */}
      <path d="M150,20 L150,60 M150,390 L150,430" stroke="url(#goldMetallic)" strokeWidth="0.5" strokeDasharray="4 4" />
    </svg>
  );

  return (
    <div 
      className={`relative ${dimensions} perspective-1000 cursor-pointer ${disabled ? 'pointer-events-none' : ''}`}
      onClick={onClick}
    >
      <motion.div
        className="w-full h-full relative preserve-3d"
        animate={{ rotateY: isRevealed ? 180 : 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d" }}
        whileHover={{ scale: isRevealed ? 1 : 1.05 }}
      >
        {/* CARD BACK */}
        <div 
          className={`absolute inset-0 backface-hidden rounded-xl border-[6px] shadow-2xl overflow-hidden
            ${isSelected 
              ? 'border-amber-400 shadow-[0_0_60px_rgba(251,191,36,0.7)] scale-[1.03]' 
              : 'border-[#1a2a4a] hover:border-amber-500/80'} 
            bg-[#020617]`}
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="absolute inset-0 opacity-[0.15] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
          <div className="absolute inset-0 p-1 flex items-center justify-center">
            <CardBackArt />
          </div>
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_8s_infinite] pointer-events-none"></div>
        </div>

        {/* CARD FRONT */}
        <div 
          className="absolute inset-0 backface-hidden rounded-xl border-2 border-amber-500 overflow-hidden bg-slate-950 shadow-2xl"
          style={{ 
            backfaceVisibility: 'hidden', 
            transform: 'rotateY(180deg)' 
          }}
        >
          <div className="absolute inset-0 overflow-hidden">
            {imgError ? (
              <div className="w-full h-full flex flex-col items-center justify-center text-amber-900/40 bg-slate-900">
                <AlertCircle className="w-12 h-12 mb-2" />
                <span className="text-[10px] font-cinzel text-center px-4">Vision Clouded</span>
              </div>
            ) : (
              <img 
                src={displayImage} 
                alt={card.name} 
                onError={() => {
                  console.error(`Failed to load image for ${card.name}: ${displayImage}`);
                  setImgError(true);
                }}
                className="block absolute inset-0 w-full h-full object-cover sepia-[0.1] contrast-[1.1] scale-[1.08] transform-gpu origin-center"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent opacity-95"></div>
          </div>

          <div className="absolute bottom-0 left-0 w-full p-2 z-10 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent pb-3 flex flex-col items-center justify-end min-h-[30%]">
            <div className="w-full px-3 text-center flex flex-col items-center">
              <h3 className={`text-amber-100 font-cinzel font-bold tracking-wider drop-shadow-[0_2px_4px_rgba(0,0,0,1)] break-words leading-tight w-full text-center ${isLarge ? 'text-sm md:text-base' : 'text-[11px] md:text-[13px]'}`}>
                {card.name}
              </h3>
              <p className="text-indigo-400 text-[7px] md:text-[8px] font-lato uppercase tracking-[0.2em] -mr-[0.2em] mt-0.5 opacity-90 font-semibold w-full text-center">
                {card.theme}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes shimmer {
          0% { transform: translateX(-250%) skewX(-20deg); }
          40% { transform: translateX(250%) skewX(-20deg); }
          100% { transform: translateX(250%) skewX(-20deg); }
        }
      `}} />
    </div>
  );
};

export default TarotCard;
