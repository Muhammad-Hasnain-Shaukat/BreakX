'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, Play, Sparkles } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { Minimal3DBackground } from '@/components/ui/Minimal3DBackground';

export const HeroSection: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section className="relative min-h-[88vh] flex flex-col justify-center items-center overflow-hidden py-12 md:py-20">
      {/* 3D Minimalist Ambient Grid Wave Engine */}
      <Minimal3DBackground />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center relative z-10 space-y-8 my-auto">
        {/* 1. Tagline Badge */}
        <div className="inline-flex items-center justify-center">
          <div
            className={`inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide backdrop-blur-xl transition-all duration-300 ${
              isDark
                ? 'bg-[#030712]/90 border border-cyan-400/50 shadow-[0_0_20px_rgba(0,240,255,0.35)]'
                : 'bg-white/95 border border-blue-300 shadow-[0_4px_20px_rgba(37,99,235,0.15)]'
            }`}
          >
            <span className={`w-2 h-2 rounded-full animate-ping ${isDark ? 'bg-[#00F0FF]' : 'bg-blue-600'}`} />
            <span
              className={`font-extrabold uppercase tracking-widest text-[10px] sm:text-[11px] ${
                isDark ? 'text-[#00F0FF]' : 'text-blue-600'
              }`}
            >
              DIGITAL EXCELLENCE, DELIVERED
            </span>
          </div>
        </div>

        {/* 2. Main Minimalist Typography Headline */}
        <h1 className="font-display font-black text-5xl sm:text-7xl lg:text-8xl tracking-tight leading-[0.95] max-w-4xl mx-auto">
          <span
            className={
              isDark
                ? 'text-white drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)]'
                : 'text-slate-900 drop-shadow-[0_2px_15px_rgba(0,0,0,0.06)]'
            }
          >
            BREAK
          </span>{' '}
          <br className="hidden sm:inline" />
          <span
            className={`text-transparent bg-clip-text ${
              isDark
                ? 'bg-gradient-to-r from-[#00F0FF] via-[#60A5FA] to-[#C084FC] drop-shadow-[0_0_40px_rgba(0,240,255,0.5)]'
                : 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 drop-shadow-[0_2px_20px_rgba(37,99,235,0.2)]'
            }`}
          >
            THE ORDINARY.
          </span>
        </h1>

        {/* 3. Subtitle Description */}
        <p
          className={`font-normal text-base sm:text-lg max-w-2xl mx-auto leading-relaxed transition-colors duration-300 ${
            isDark ? 'text-slate-300 drop-shadow-sm' : 'text-slate-600'
          }`}
        >
          BreakX is an elite digital transformation studio engineering high-performance web platforms, bespoke AI solutions, and automated products for ambitious brands.
        </p>

        {/* 4. Minimalist Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <Link
            href="/project-request"
            className="group w-full sm:w-auto py-4 px-8 rounded-full bg-gradient-to-r from-primary-600 via-primary-500 to-accent-purple text-white font-bold text-sm shadow-neon-blue hover:shadow-neon-purple transition-all duration-300 flex items-center justify-center space-x-3 hover:scale-105 border border-primary-400/40"
          >
            <span>Start Your Project</span>
            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:rotate-45 transition-transform">
              <ArrowUpRight className="w-3.5 h-3.5 text-white" />
            </div>
          </Link>

          <Link
            href="/work"
            className={`w-full sm:w-auto py-4 px-7 rounded-full font-bold text-sm transition-all duration-300 flex items-center justify-center space-x-2.5 hover:scale-105 backdrop-blur-xl ${
              isDark
                ? 'bg-[#030712]/85 border border-cyan-400/50 text-white shadow-[0_0_18px_rgba(0,240,255,0.25)] hover:border-[#00F0FF] hover:shadow-[0_0_30px_rgba(0,240,255,0.45)]'
                : 'bg-white/95 border border-slate-300 text-slate-800 shadow-[0_4px_20px_rgba(37,99,235,0.12)] hover:border-blue-500 hover:shadow-[0_6px_25px_rgba(37,99,235,0.2)]'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full flex items-center justify-center ${
                isDark ? 'bg-slate-800 text-[#00F0FF]' : 'bg-blue-50 text-blue-600'
              }`}
            >
              <Play className="w-2.5 h-2.5 ml-0.5 fill-current" />
            </div>
            <span>Explore Work</span>
          </Link>
        </div>

        {/* 5. Client Social Proof Avatar Badge */}
        <div className="pt-6 flex items-center justify-center">
          <div
            className={`inline-flex items-center space-x-3.5 px-5 py-2.5 rounded-full backdrop-blur-xl border transition-colors duration-300 ${
              isDark
                ? 'bg-[#030712]/80 border-slate-800 shadow-sm'
                : 'bg-white/80 border-slate-200 shadow-sm'
            }`}
          >
            <div className="flex -space-x-2">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                alt="Client"
                className="w-7 h-7 rounded-full border-2 border-background object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
                alt="Client"
                className="w-7 h-7 rounded-full border-2 border-background object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80"
                alt="Client"
                className="w-7 h-7 rounded-full border-2 border-background object-cover"
              />
            </div>
            <span className={`text-xs font-semibold ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              Trusted by <strong className={isDark ? 'text-white' : 'text-slate-900'}>2,000+ ambitious clients</strong> worldwide
            </span>
          </div>
        </div>

        {/* 6. Minimalist Trusted Companies Strip */}
        <div id="clients" className="pt-8 max-w-4xl mx-auto">
          <p
            className={`text-center text-[10px] uppercase tracking-widest font-extrabold mb-5 ${
              isDark ? 'text-cyan-300/80' : 'text-blue-600/80'
            }`}
          >
            TRUSTED BY INNOVATIVE COMPANIES WORLDWIDE
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3.5 items-center justify-items-center">
            <div
              className={`w-full text-center py-2.5 px-3 rounded-2xl font-display font-black text-sm flex items-center justify-center space-x-1.5 transition-all ${
                isDark
                  ? 'bg-surface-card/60 border border-slate-800 text-white hover:border-cyan-400/50'
                  : 'bg-white/80 border border-slate-200 text-slate-800 shadow-sm hover:border-blue-400'
              }`}
            >
              <span className="text-amber-400">⚡</span> <span>ACME</span>
            </div>
            <div
              className={`w-full text-center py-2.5 px-3 rounded-2xl font-display font-bold text-sm flex items-center justify-center space-x-1.5 transition-all ${
                isDark
                  ? 'bg-surface-card/60 border border-slate-800 text-white hover:border-cyan-400/50'
                  : 'bg-white/80 border border-slate-200 text-slate-800 shadow-sm hover:border-blue-400'
              }`}
            >
              <span className="text-cyan-400">✦</span> <span>visionary</span>
            </div>
            <div
              className={`w-full text-center py-2.5 px-3 rounded-2xl font-display font-black text-sm uppercase tracking-widest flex items-center justify-center transition-all ${
                isDark
                  ? 'bg-surface-card/60 border border-slate-800 text-white hover:border-cyan-400/50'
                  : 'bg-white/80 border border-slate-200 text-slate-800 shadow-sm hover:border-blue-400'
              }`}
            >
              PULSE
            </div>
            <div
              className={`w-full text-center py-2.5 px-3 rounded-2xl font-display font-bold text-sm flex items-center justify-center space-x-1.5 transition-all ${
                isDark
                  ? 'bg-surface-card/60 border border-slate-800 text-white hover:border-cyan-400/50'
                  : 'bg-white/80 border border-slate-200 text-slate-800 shadow-sm hover:border-blue-400'
              }`}
            >
              <span className="text-purple-400">▲</span> <span>VERTEX</span>
            </div>
            <div
              className={`w-full text-center py-2.5 px-3 rounded-2xl font-display font-semibold text-sm tracking-wider flex items-center justify-center space-x-1.5 transition-all ${
                isDark
                  ? 'bg-surface-card/60 border border-slate-800 text-white hover:border-cyan-400/50'
                  : 'bg-white/80 border border-slate-200 text-slate-800 shadow-sm hover:border-blue-400'
              }`}
            >
              <span className="text-cyan-400">⚛</span> <span>Spherule</span>
            </div>
            <div
              className={`w-full text-center py-2.5 px-3 rounded-2xl font-display font-bold text-sm flex items-center justify-center space-x-1.5 transition-all ${
                isDark
                  ? 'bg-surface-card/60 border border-slate-800 text-white hover:border-cyan-400/50'
                  : 'bg-white/80 border border-slate-200 text-slate-800 shadow-sm hover:border-blue-400'
              }`}
            >
              <span className="text-sky-400">☁</span> <span>Cloudix</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
