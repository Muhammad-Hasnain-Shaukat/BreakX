'use client';

import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Sun, Moon, Sparkles } from 'lucide-react';

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  className = '',
  showLabel = false,
}) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      type="button"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      className={`group relative inline-flex items-center justify-center rounded-full p-2 text-xs font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
        isDark
          ? 'bg-slate-900/90 text-cyan-300 border border-[#00F0FF]/50 shadow-[0_0_15px_rgba(0,240,255,0.35)] hover:border-[#00F0FF] hover:shadow-[0_0_22px_#00F0FF]'
          : 'bg-white/95 text-slate-800 border border-blue-400/60 shadow-[0_4px_20px_rgba(59,130,246,0.25)] hover:border-blue-500 hover:shadow-[0_4px_25px_rgba(59,130,246,0.4)]'
      } ${className}`}
    >
      {/* Background Animated Ambient Glow */}
      <span
        className={`absolute -inset-0.5 rounded-full filter blur-sm opacity-50 group-hover:opacity-100 transition-opacity pointer-events-none -z-10 ${
          isDark
            ? 'bg-gradient-to-r from-[#00F0FF] via-blue-500 to-purple-500'
            : 'bg-gradient-to-r from-blue-400 via-indigo-400 to-amber-300'
        }`}
      />

      <div className="relative flex items-center space-x-2 px-1">
        {/* Dynamic Icon with 3D Flip & Spin Animation */}
        <div className="relative w-4 h-4 flex items-center justify-center">
          <Sun
            className={`w-4 h-4 text-amber-500 absolute transition-all duration-500 transform ${
              isDark
                ? 'rotate-90 scale-0 opacity-0'
                : 'rotate-0 scale-100 opacity-100'
            }`}
          />
          <Moon
            className={`w-4 h-4 text-[#00F0FF] absolute transition-all duration-500 transform ${
              isDark
                ? 'rotate-0 scale-100 opacity-100'
                : '-rotate-90 scale-0 opacity-0'
            }`}
          />
        </div>

        {showLabel && (
          <span className="text-[11px] font-bold uppercase tracking-wider pl-1">
            {isDark ? 'Dark Mode' : 'Light Mode'}
          </span>
        )}
      </div>
    </button>
  );
};
