'use client';

import React, { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';

export const HeroImageDisplay: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
    setMousePos({ x, y });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMousePos({ x: 0, y: 0 })}
      className="relative w-full max-w-[620px] aspect-square mx-auto flex items-center justify-center pointer-events-auto"
    >
      {/* 1. Large Ambient Radiating Core Glow */}
      <div
        className={`absolute -left-[40%] top-1/2 -translate-y-1/2 w-[140%] h-[120%] rounded-full filter blur-[80px] pointer-events-none -z-10 animate-pulse-glow transition-all duration-500 ${
          isDark
            ? 'bg-gradient-radial from-primary-500/35 via-accent-blue/20 to-transparent'
            : 'bg-gradient-radial from-blue-400/25 via-indigo-300/15 to-transparent'
        }`}
      />

      {/* 2. Seamless Borderless 3D X with Feathered Edge Mask */}
      <div
        className="relative w-full h-full flex items-center justify-center transition-transform duration-500 ease-out"
        style={{
          transform: `perspective(1000px) rotateY(${mousePos.x * 0.3}deg) rotateX(${-mousePos.y * 0.3}deg)`,
        }}
      >
        <img
          src={isDark ? '/hero-x.jpg' : '/hero-x-light.jpg'}
          alt="BreakX 3D Lit Crystal X"
          className={`w-full h-full object-contain filter transition-all duration-500 ${
            isDark
              ? 'brightness-110 contrast-110 mix-blend-screen'
              : 'brightness-105 contrast-105'
          }`}
          style={{
            maskImage:
              'radial-gradient(ellipse 90% 90% at 50% 50%, rgba(0,0,0,1) 60%, rgba(0,0,0,0.8) 80%, rgba(0,0,0,0) 100%)',
            WebkitMaskImage:
              'radial-gradient(ellipse 90% 90% at 50% 50%, rgba(0,0,0,1) 60%, rgba(0,0,0,0.8) 80%, rgba(0,0,0,0) 100%)',
          }}
        />

        {/* Dynamic Specular Shimmer that tracks mouse */}
        <div
          className={`absolute inset-0 pointer-events-none transition-opacity duration-300 group-hover:opacity-80 ${
            isDark ? 'mix-blend-screen opacity-50' : 'mix-blend-overlay opacity-35'
          }`}
          style={{
            background: `radial-gradient(circle at ${50 + mousePos.x}% ${50 + mousePos.y}%, rgba(255,255,255,0.7) 0%, rgba(59,130,246,0.3) 30%, transparent 65%)`,
          }}
        />
      </div>
    </div>
  );
};
