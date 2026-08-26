'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, Play } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { Minimal3DBackground } from '@/components/ui/Minimal3DBackground';
import { CyberComputingDevice3D } from '@/components/ui/CyberComputingDevice3D';

export const HeroSection: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section className="relative min-h-[85vh] lg:min-h-[88vh] flex flex-col justify-center items-center overflow-hidden pt-2 pb-8 sm:py-8 lg:py-14">
      {/* 3D Minimalist Ambient Glow Engine */}
      <Minimal3DBackground />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 my-auto">
        
        {/* =========================================================================
            DESKTOP LAYOUT (lg:block): 2-Column Side-by-Side Grid
           ========================================================================= */}
        <div className="hidden lg:grid grid-cols-12 gap-8 items-center">
          {/* Left Column: Typography & CTAs */}
          <div className="col-span-6 space-y-6 text-left">
            {/* Tagline Badge */}
            <div className="inline-flex items-center">
              <div
                className={`inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide backdrop-blur-xl transition-all duration-300 ${
                  isDark
                    ? 'bg-[#030712]/90 border border-cyan-400/50 shadow-[0_0_20px_rgba(0,240,255,0.35)]'
                    : 'bg-white/95 border border-blue-300 shadow-[0_4px_20px_rgba(37,99,235,0.15)]'
                }`}
              >
                <span className={`w-2 h-2 rounded-full animate-ping ${isDark ? 'bg-[#00F0FF]' : 'bg-blue-600'}`} />
                <span
                  className={`font-extrabold uppercase tracking-widest text-[11px] ${
                    isDark ? 'text-[#00F0FF]' : 'text-blue-600'
                  }`}
                >
                  DIGITAL EXCELLENCE, DELIVERED
                </span>
              </div>
            </div>

            {/* Headline */}
            <h1 className="font-display font-black text-6xl xl:text-7xl tracking-tight leading-[0.95]">
              <span
                className={
                  isDark
                    ? 'text-white drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)]'
                    : 'text-slate-900 drop-shadow-[0_2px_15px_rgba(0,0,0,0.06)]'
                }
              >
                BREAK
              </span>{' '}
              <br />
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

            {/* Description */}
            <p
              className={`font-normal text-base xl:text-lg max-w-xl leading-relaxed transition-colors duration-300 ${
                isDark ? 'text-slate-300 drop-shadow-sm' : 'text-slate-600'
              }`}
            >
              BreakX is an elite digital engineering studio building WebGL platforms, bespoke AI solutions, and automated workflows for ambitious brands worldwide.
            </p>

            {/* Two Identical Sized Buttons in Same Row */}
            <div className="flex flex-row items-center gap-4 pt-1 max-w-md">
              <Link
                href="/project-request"
                className="group flex-1 h-13 py-3.5 px-6 rounded-full bg-gradient-to-r from-primary-600 via-primary-500 to-accent-purple text-white font-bold text-sm shadow-neon-blue hover:shadow-neon-purple transition-all duration-300 flex items-center justify-center space-x-2.5 hover:scale-105 border border-primary-400/40"
              >
                <span className="truncate">Start Your Project</span>
                <div className="w-6 h-6 rounded-full bg-white/20 flex-shrink-0 flex items-center justify-center group-hover:rotate-45 transition-transform">
                  <ArrowUpRight className="w-3.5 h-3.5 text-white" />
                </div>
              </Link>

              <Link
                href="/work"
                className={`group flex-1 h-13 py-3.5 px-6 rounded-full font-bold text-sm transition-all duration-300 flex items-center justify-center space-x-2.5 hover:scale-105 backdrop-blur-xl ${
                  isDark
                    ? 'bg-[#030712]/85 border border-cyan-400/50 text-white shadow-[0_0_18px_rgba(0,240,255,0.25)] hover:border-[#00F0FF] hover:shadow-[0_0_30px_rgba(0,240,255,0.45)]'
                    : 'bg-white/95 border border-slate-300 text-slate-800 shadow-[0_4px_20px_rgba(37,99,235,0.12)] hover:border-blue-500 hover:shadow-[0_6px_25px_rgba(37,99,235,0.2)]'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center ${
                    isDark ? 'bg-slate-800 text-[#00F0FF]' : 'bg-blue-50 text-blue-600'
                  }`}
                >
                  <Play className="w-2.5 h-2.5 ml-0.5 fill-current" />
                </div>
                <span className="truncate">Explore Work</span>
              </Link>
            </div>

            {/* Client Social Proof */}
            <div
              className={`pt-5 flex items-center space-x-4 border-t ${
                isDark ? 'border-surface-border' : 'border-slate-200'
              }`}
            >
              <div className="flex -space-x-2.5">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                  alt="Client"
                  className="w-8 h-8 rounded-full border-2 border-background object-cover ring-1 ring-primary-400/50"
                />
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
                  alt="Client"
                  className="w-8 h-8 rounded-full border-2 border-background object-cover ring-1 ring-primary-400/50"
                />
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80"
                  alt="Client"
                  className="w-8 h-8 rounded-full border-2 border-background object-cover ring-1 ring-primary-400/50"
                />
              </div>
              <div className="text-left">
                <div className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  2,000+ Clients Worldwide
                </div>
                <div className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  High-converting digital platforms engineered.
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Computing Device */}
          <div className="col-span-6 flex items-center justify-center w-full">
            <CyberComputingDevice3D />
          </div>
        </div>


        {/* =========================================================================
            MOBILE LAYOUT (< lg): Perfect Order to Fit in 1st Mobile Screen
            1. Tagline Bar -> 2. 3D Computer Device -> 3. Headline -> 4. Description -> 5. Buttons (Same Row)
           ========================================================================= */}
        <div className="lg:hidden flex flex-col items-center text-center space-y-3.5 max-w-lg mx-auto">
          {/* 1. Tagline Badge */}
          <div className="inline-flex items-center">
            <div
              className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-[10px] font-extrabold tracking-wide backdrop-blur-xl transition-all duration-300 ${
                isDark
                  ? 'bg-[#030712]/90 border border-cyan-400/50 shadow-[0_0_15px_rgba(0,240,255,0.3)]'
                  : 'bg-white/95 border border-blue-300 shadow-[0_4px_15px_rgba(37,99,235,0.12)]'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full animate-ping ${isDark ? 'bg-[#00F0FF]' : 'bg-blue-600'}`} />
              <span className={isDark ? 'text-[#00F0FF]' : 'text-blue-600'}>
                DIGITAL EXCELLENCE, DELIVERED
              </span>
            </div>
          </div>

          {/* 2. 3D Computer Device (Directly under the bar, scaled for mobile) */}
          <div className="w-full flex justify-center py-1">
            <CyberComputingDevice3D />
          </div>

          {/* 3. Headline */}
          <h1 className="font-display font-black text-3xl sm:text-4xl tracking-tight leading-tight">
            <span className={isDark ? 'text-white' : 'text-slate-900'}>BREAK </span>
            <span
              className={`text-transparent bg-clip-text ${
                isDark
                  ? 'bg-gradient-to-r from-[#00F0FF] via-[#60A5FA] to-[#C084FC]'
                  : 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600'
              }`}
            >
              THE ORDINARY.
            </span>
          </h1>

          {/* 4. Description */}
          <p
            className={`font-normal text-xs sm:text-sm max-w-sm mx-auto leading-snug ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}
          >
            BreakX builds high-performance WebGL platforms, bespoke AI solutions, and automated workflows.
          </p>

          {/* 5. Two Identical Sized Buttons in the Same Row */}
          <div className="flex flex-row items-center justify-center gap-2.5 w-full max-w-xs sm:max-w-sm pt-1">
            <Link
              href="/project-request"
              className="flex-1 h-11 py-2.5 px-3 rounded-full bg-gradient-to-r from-primary-600 via-primary-500 to-accent-purple text-white font-bold text-xs shadow-neon-blue flex items-center justify-center space-x-1.5 border border-primary-400/40"
            >
              <span className="truncate">Start Project</span>
              <div className="w-5 h-5 rounded-full bg-white/20 flex-shrink-0 flex items-center justify-center">
                <ArrowUpRight className="w-3 h-3 text-white" />
              </div>
            </Link>

            <Link
              href="/work"
              className={`flex-1 h-11 py-2.5 px-3 rounded-full font-bold text-xs flex items-center justify-center space-x-1.5 backdrop-blur-xl border ${
                isDark
                  ? 'bg-[#030712]/85 border-cyan-400/50 text-white shadow-[0_0_12px_rgba(0,240,255,0.2)]'
                  : 'bg-white/95 border-slate-300 text-slate-800 shadow-sm'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center ${
                  isDark ? 'bg-slate-800 text-[#00F0FF]' : 'bg-blue-50 text-blue-600'
                }`}
              >
                <Play className="w-2 h-2 ml-0.5 fill-current" />
              </div>
              <span className="truncate">Explore Work</span>
            </Link>
          </div>
        </div>

        {/* 6. Minimalist Trusted Companies Strip */}
        <div id="clients" className="mt-10 lg:mt-14 pt-5 border-t border-white/5">
          <p
            className={`text-center text-[9px] sm:text-[10px] uppercase tracking-widest font-extrabold mb-4 ${
              isDark ? 'text-cyan-300/80' : 'text-blue-600/80'
            }`}
          >
            TRUSTED BY INNOVATIVE COMPANIES WORLDWIDE
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5 sm:gap-3.5 items-center justify-items-center">
            <div
              className={`w-full text-center py-2 px-2.5 rounded-xl sm:rounded-2xl font-display font-black text-xs sm:text-sm flex items-center justify-center space-x-1 transition-all ${
                isDark
                  ? 'bg-surface-card/60 border border-slate-800 text-white hover:border-cyan-400/50'
                  : 'bg-white/80 border border-slate-200 text-slate-800 shadow-sm hover:border-blue-400'
              }`}
            >
              <span className="text-amber-400">⚡</span> <span>ACME</span>
            </div>
            <div
              className={`w-full text-center py-2 px-2.5 rounded-xl sm:rounded-2xl font-display font-bold text-xs sm:text-sm flex items-center justify-center space-x-1 transition-all ${
                isDark
                  ? 'bg-surface-card/60 border border-slate-800 text-white hover:border-cyan-400/50'
                  : 'bg-white/80 border border-slate-200 text-slate-800 shadow-sm hover:border-blue-400'
              }`}
            >
              <span className="text-cyan-400">✦</span> <span>visionary</span>
            </div>
            <div
              className={`w-full text-center py-2 px-2.5 rounded-xl sm:rounded-2xl font-display font-black text-xs sm:text-sm uppercase tracking-widest flex items-center justify-center transition-all ${
                isDark
                  ? 'bg-surface-card/60 border border-slate-800 text-white hover:border-cyan-400/50'
                  : 'bg-white/80 border border-slate-200 text-slate-800 shadow-sm hover:border-blue-400'
              }`}
            >
              PULSE
            </div>
            <div
              className={`w-full text-center py-2 px-2.5 rounded-xl sm:rounded-2xl font-display font-bold text-xs sm:text-sm flex items-center justify-center space-x-1 transition-all ${
                isDark
                  ? 'bg-surface-card/60 border border-slate-800 text-white hover:border-cyan-400/50'
                  : 'bg-white/80 border border-slate-200 text-slate-800 shadow-sm hover:border-blue-400'
              }`}
            >
              <span className="text-purple-400">▲</span> <span>VERTEX</span>
            </div>
            <div
              className={`w-full text-center py-2 px-2.5 rounded-xl sm:rounded-2xl font-display font-semibold text-xs sm:text-sm tracking-wider flex items-center justify-center space-x-1 transition-all ${
                isDark
                  ? 'bg-surface-card/60 border border-slate-800 text-white hover:border-cyan-400/50'
                  : 'bg-white/80 border border-slate-200 text-slate-800 shadow-sm hover:border-blue-400'
              }`}
            >
              <span className="text-cyan-400">⚛</span> <span>Spherule</span>
            </div>
            <div
              className={`w-full text-center py-2 px-2.5 rounded-xl sm:rounded-2xl font-display font-bold text-xs sm:text-sm flex items-center justify-center space-x-1 transition-all ${
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
