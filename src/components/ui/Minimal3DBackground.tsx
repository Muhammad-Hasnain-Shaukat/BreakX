'use client';

import React from 'react';
import { useTheme } from '@/context/ThemeContext';

export const Minimal3DBackground: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10 transition-colors duration-500">
      {/* Atmospheric Minimalist Ambient Neon Lighting Orbs */}
      <div
        className={`absolute top-1/4 -left-20 w-96 h-96 rounded-full filter blur-[140px] pointer-events-none transition-colors duration-700 ${
          isDark ? 'bg-cyan-500/12' : 'bg-blue-400/10'
        }`}
      />
      <div
        className={`absolute top-1/3 -right-20 w-[32rem] h-[32rem] rounded-full filter blur-[160px] pointer-events-none transition-colors duration-700 ${
          isDark ? 'bg-indigo-500/10' : 'bg-purple-400/10'
        }`}
      />
      <div
        className={`absolute bottom-10 left-1/3 w-80 h-80 rounded-full filter blur-[120px] pointer-events-none transition-colors duration-700 ${
          isDark ? 'bg-blue-600/10' : 'bg-sky-400/10'
        }`}
      />

      {/* Top & Bottom Vignettes for Seamless Transitions */}
      <div
        className={`absolute inset-x-0 top-0 h-32 pointer-events-none ${
          isDark
            ? 'bg-gradient-to-b from-[#030712] to-transparent'
            : 'bg-gradient-to-b from-[#F8FAFC] to-transparent'
        }`}
      />
      <div
        className={`absolute inset-x-0 bottom-0 h-36 pointer-events-none ${
          isDark
            ? 'bg-gradient-to-t from-[#030712] to-transparent'
            : 'bg-gradient-to-t from-[#F8FAFC] to-transparent'
        }`}
      />
    </div>
  );
};
