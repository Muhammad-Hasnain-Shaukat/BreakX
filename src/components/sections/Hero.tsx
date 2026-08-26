'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, Play, ChevronDown } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

export const HeroSection: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <>
      {/* =========================================================================
          1. MOBILE VIEW ONLY (< lg):
          - Screen 1: Blank landing page with ONLY top bar and visible 3D X. No text!
          - Screen 2 onwards: Clean Overview with active theme styling.
         ========================================================================= */}
      <div className="lg:hidden">
        {/* Screen 1: Blank 3D X Landing */}
        <section
          className="min-h-[85vh] flex flex-col justify-end items-center pb-8 px-4 relative overflow-hidden transition-all duration-500"
          style={{
            backgroundImage: isDark ? "url('/hero-full-bg.jpg')" : "url('/hero-full-bg-light.jpg')",
            backgroundPosition: 'right 15% center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}
        >
          {/* Subtle bottom gradient fade */}
          <div
            className={`absolute inset-x-0 bottom-0 h-32 pointer-events-none transition-colors duration-300 ${
              isDark ? 'bg-gradient-to-t from-[#030712] to-transparent' : 'bg-gradient-to-t from-[#F8FAFC] to-transparent'
            }`}
          />

          {/* Interactive Bouncing Scroll Button */}
          <a
            href="#mobile-overview"
            className={`relative z-10 inline-flex items-center space-x-2 px-5 py-2.5 rounded-full text-xs font-bold backdrop-blur-md animate-bounce transition-all ${
              isDark
                ? 'bg-[#030712]/90 border-2 border-[#00F0FF] text-white shadow-[0_0_20px_#00F0FF,_0_0_40px_rgba(0,240,255,0.4)]'
                : 'bg-white/95 border-2 border-blue-500 text-slate-900 shadow-[0_8px_25px_rgba(37,99,235,0.25)]'
            }`}
          >
            <span>Explore BreakX</span>
            <ChevronDown className={`w-4 h-4 ${isDark ? 'text-[#00F0FF]' : 'text-blue-600'}`} />
          </a>
        </section>

        {/* Screen 2: Overview */}
        <section
          id="mobile-overview"
          className="relative z-20 py-12 px-5 space-y-8"
        >
          {/* Tagline Badge */}
          <div
            className={`inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full text-xs font-bold ${
              isDark
                ? 'bg-surface-card border border-cyan-400/50 shadow-neon-blue'
                : 'bg-white border border-blue-300 shadow-sm'
            }`}
          >
            <span className={`w-2 h-2 rounded-full animate-ping ${isDark ? 'bg-[#00F0FF]' : 'bg-blue-600'}`} />
            <span
              className={`font-extrabold uppercase tracking-widest text-[10px] ${
                isDark ? 'text-[#00F0FF]' : 'text-blue-600'
              }`}
            >
              DIGITAL EXCELLENCE, DELIVERED
            </span>
          </div>

          {/* Main Headline */}
          <h1
            className={`font-display font-black text-4xl sm:text-5xl tracking-tight leading-[1.0] ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            BREAK <br />
            <span
              className={`text-transparent bg-clip-text ${
                isDark
                  ? 'bg-gradient-to-r from-[#00F0FF] via-[#60A5FA] to-[#C084FC] drop-shadow-[0_0_30px_rgba(0,240,255,0.7)]'
                  : 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 drop-shadow-[0_2px_15px_rgba(37,99,235,0.25)]'
              }`}
            >
              THE ORDINARY.
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className={`text-sm sm:text-base font-normal leading-relaxed ${
              isDark ? 'text-slate-200' : 'text-slate-600'
            }`}
          >
            BreakX is a digital transformation studio building premium websites, bespoke AI solutions, and automated digital products for ambitious brands worldwide.
          </p>

          {/* CTA Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3.5 pt-1">
            <Link
              href="/project-request"
              className="py-4 px-7 rounded-full bg-gradient-to-r from-primary-600 via-primary-500 to-accent-purple text-white font-bold text-sm shadow-neon-blue flex items-center justify-center space-x-2.5 border border-primary-400/50"
            >
              <span>Start Your Project</span>
              <ArrowUpRight className="w-4 h-4 text-white" />
            </Link>

            <Link
              href="/work"
              className={`py-4 px-6 rounded-full font-bold text-sm flex items-center justify-center space-x-2.5 shadow-sm ${
                isDark
                  ? 'bg-surface-card border border-cyan-400/50 text-white'
                  : 'bg-white border border-slate-300 text-slate-900 hover:border-blue-500'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center ${
                  isDark ? 'bg-slate-800' : 'bg-blue-50'
                }`}
              >
                <Play
                  className={`w-2.5 h-2.5 ml-0.5 ${
                    isDark ? 'text-[#00F0FF] fill-[#00F0FF]' : 'text-blue-600 fill-blue-600'
                  }`}
                />
              </div>
              <span>View Our Work</span>
            </Link>
          </div>

          {/* Client Social Proof Avatar Badge */}
          <div
            className={`pt-6 flex items-center space-x-4 border-t ${
              isDark ? 'border-surface-border' : 'border-slate-200'
            }`}
          >
            <div className="flex -space-x-2.5">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                alt="Client Avatar"
                className="w-9 h-9 rounded-full border-2 border-background object-cover ring-2 ring-primary-500/50"
              />
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
                alt="Client Avatar"
                className="w-9 h-9 rounded-full border-2 border-background object-cover ring-2 ring-primary-500/50"
              />
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80"
                alt="Client Avatar"
                className="w-9 h-9 rounded-full border-2 border-background object-cover ring-2 ring-primary-500/50"
              />
              <div className="w-9 h-9 rounded-full border-2 border-background bg-primary-600 font-bold text-[11px] text-white flex items-center justify-center shadow-neon-blue">
                2K+
              </div>
            </div>

            <div>
              <div
                className={`text-[11px] font-black uppercase tracking-wider ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}
              >
                2,000+ CLIENTS WORLDWIDE
              </div>
              <div className={`text-[11px] ${isDark ? 'text-slate-300' : 'text-slate-500'}`}>
                Global brands trust BreakX to build their digital future.
              </div>
            </div>
          </div>

          {/* Client Logos Grid */}
          <div className={`pt-6 border-t space-y-4 ${isDark ? 'border-surface-border' : 'border-slate-200'}`}>
            <p
              className={`text-center text-[10px] uppercase tracking-widest font-extrabold ${
                isDark ? 'text-cyan-300' : 'text-blue-600'
              }`}
            >
              TRUSTED BY INNOVATIVE COMPANIES WORLDWIDE
            </p>
            <div className="grid grid-cols-2 gap-3 items-center justify-items-center">
              <div
                className={`w-full text-center py-2.5 px-3 rounded-2xl font-display font-black text-sm flex items-center justify-center space-x-1.5 ${
                  isDark
                    ? 'bg-surface border border-surface-border text-white'
                    : 'bg-white border border-slate-200 text-slate-900 shadow-sm'
                }`}
              >
                <span className="text-amber-400">⚡</span> <span>ACME</span>
              </div>
              <div
                className={`w-full text-center py-2.5 px-3 rounded-2xl font-display font-bold text-sm flex items-center justify-center space-x-1.5 ${
                  isDark
                    ? 'bg-surface border border-surface-border text-white'
                    : 'bg-white border border-slate-200 text-slate-900 shadow-sm'
                }`}
              >
                <span className="text-cyan-500">✦</span> <span>visionary</span>
              </div>
              <div
                className={`w-full text-center py-2.5 px-3 rounded-2xl font-display font-black text-sm uppercase tracking-widest flex items-center justify-center ${
                  isDark
                    ? 'bg-surface border border-surface-border text-white'
                    : 'bg-white border border-slate-200 text-slate-900 shadow-sm'
                }`}
              >
                PULSE
              </div>
              <div
                className={`w-full text-center py-2.5 px-3 rounded-2xl font-display font-bold text-sm flex items-center justify-center space-x-1.5 ${
                  isDark
                    ? 'bg-surface border border-surface-border text-white'
                    : 'bg-white border border-slate-200 text-slate-900 shadow-sm'
                }`}
              >
                <span className="text-purple-500">▲</span> <span>VERTEX</span>
              </div>
              <div
                className={`w-full text-center py-2.5 px-3 rounded-2xl font-display font-semibold text-sm tracking-wider flex items-center justify-center space-x-1.5 ${
                  isDark
                    ? 'bg-surface border border-surface-border text-white'
                    : 'bg-white border border-slate-200 text-slate-900 shadow-sm'
                }`}
              >
                <span className="text-cyan-500">⚛</span> <span>Spherule</span>
              </div>
              <div
                className={`w-full text-center py-2.5 px-3 rounded-2xl font-display font-bold text-sm flex items-center justify-center space-x-1.5 ${
                  isDark
                    ? 'bg-surface border border-surface-border text-white'
                    : 'bg-white border border-slate-200 text-slate-900 shadow-sm'
                }`}
              >
                <span className="text-sky-500">☁</span> <span>Cloudix</span>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* =========================================================================
          2. PC / DESKTOP VIEW (lg:):
         ========================================================================= */}
      <section className="hidden lg:flex relative min-h-[85vh] flex-col justify-between overflow-hidden pt-2 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 my-auto">
          {/* Main Grid: Left Copy & Controls */}
          <div className="grid grid-cols-12 gap-8 items-center min-h-[55vh]">
            {/* Left Column */}
            <div className="col-span-7 space-y-6 text-left py-4">
              {/* Tagline Badge */}
              <div
                className={`inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide backdrop-blur-md ${
                  isDark
                    ? 'bg-[#030712]/95 border-2 border-[#00F0FF] shadow-[0_0_15px_#00F0FF,_0_0_30px_rgba(0,240,255,0.45),_inset_0_0_10px_rgba(0,240,255,0.25)]'
                    : 'bg-white/95 border-2 border-blue-400/80 shadow-[0_4px_20px_rgba(37,99,235,0.2)]'
                }`}
              >
                <span className={`w-2 h-2 rounded-full animate-ping ${isDark ? 'bg-[#00F0FF]' : 'bg-blue-600'}`} />
                <span
                  className={`font-extrabold uppercase tracking-widest text-[10px] ${
                    isDark
                      ? 'text-[#00F0FF] drop-shadow-[0_0_8px_rgba(0,240,255,0.8)]'
                      : 'text-blue-600 font-black'
                  }`}
                >
                  DIGITAL EXCELLENCE, DELIVERED
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="font-display font-black text-6xl lg:text-7xl tracking-tight leading-[0.95]">
                <span
                  className={
                    isDark
                      ? 'text-white drop-shadow-[0_4px_24px_rgba(0,0,0,1)]'
                      : 'text-slate-900 drop-shadow-[0_2px_15px_rgba(0,0,0,0.08)]'
                  }
                >
                  BREAK
                </span>{' '}
                <br />
                <span
                  className={`text-transparent bg-clip-text ${
                    isDark
                      ? 'bg-gradient-to-r from-[#60A5FA] via-[#818CF8] to-[#38BDF8] drop-shadow-[0_0_40px_rgba(96,165,250,0.8)]'
                      : 'bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 drop-shadow-[0_2px_20px_rgba(37,99,235,0.2)]'
                  }`}
                >
                  THE ORDINARY.
                </span>
              </h1>

              {/* Subtitle */}
              <p
                className={`font-normal text-base max-w-lg leading-relaxed ${
                  isDark ? 'text-slate-200 drop-shadow-md' : 'text-slate-600'
                }`}
              >
                BreakX is a digital transformation studio building premium websites, bespoke AI solutions, and automated digital products for ambitious brands worldwide.
              </p>

              {/* CTA Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-1">
                <Link
                  href="/project-request"
                  className="group py-3.5 px-7 rounded-full bg-gradient-to-r from-primary-600 via-primary-500 to-accent-purple text-white font-bold text-xs shadow-neon-blue hover:shadow-neon-purple transition-all duration-300 flex items-center space-x-2.5 hover:scale-105 border border-primary-400/50"
                >
                  <span>Start Your Project</span>
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:rotate-45 transition-transform">
                    <ArrowUpRight className="w-3.5 h-3.5 text-white" />
                  </div>
                </Link>

                <Link
                  href="/work"
                  className={`py-3.5 px-6 rounded-full font-bold text-xs transition-all duration-300 flex items-center space-x-2.5 hover:scale-105 backdrop-blur-md ${
                    isDark
                      ? 'bg-[#030712]/90 border-2 border-[#00F0FF] text-white shadow-[0_0_18px_#00F0FF,_0_0_35px_rgba(0,240,255,0.45),_inset_0_0_12px_rgba(0,240,255,0.25)] hover:shadow-[0_0_25px_#00F0FF,_0_0_50px_rgba(0,240,255,0.65)]'
                      : 'bg-white/95 border-2 border-blue-400/80 text-slate-800 shadow-[0_4px_20px_rgba(37,99,235,0.18)] hover:border-blue-600 hover:shadow-[0_6px_25px_rgba(37,99,235,0.25)]'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center ${
                      isDark ? 'bg-slate-800' : 'bg-blue-50'
                    }`}
                  >
                    <Play
                      className={`w-2.5 h-2.5 ml-0.5 ${
                        isDark ? 'text-[#00F0FF] fill-[#00F0FF]' : 'text-blue-600 fill-blue-600'
                      }`}
                    />
                  </div>
                  <span>View Our Work</span>
                </Link>
              </div>

              {/* Client Social Proof Avatar Badge */}
              <div
                className={`pt-4 flex items-center space-x-4 border-t ${
                  isDark ? 'border-primary-500/30' : 'border-slate-200'
                }`}
              >
                <div className="flex -space-x-2.5">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                    alt="Client Avatar"
                    className="w-9 h-9 rounded-full border-2 border-background object-cover ring-2 ring-primary-500/50"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
                    alt="Client Avatar"
                    className="w-9 h-9 rounded-full border-2 border-background object-cover ring-2 ring-primary-500/50"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80"
                    alt="Client Avatar"
                    className="w-9 h-9 rounded-full border-2 border-background object-cover ring-2 ring-primary-500/50"
                  />
                  <div className="w-9 h-9 rounded-full border-2 border-background bg-primary-600 font-bold text-[11px] text-white flex items-center justify-center shadow-neon-blue">
                    2K+
                  </div>
                </div>

                <div>
                  <div
                    className={`text-[11px] font-extrabold uppercase tracking-wider ${
                      isDark ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    2,000+ CLIENTS WORLDWIDE
                  </div>
                  <div className={`text-[11px] ${isDark ? 'text-slate-300' : 'text-slate-500'}`}>
                    Global brands trust BreakX to build their digital future.
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Space for 3D X backdrop */}
            <div className="col-span-5 pointer-events-none min-h-[440px]" />
          </div>

          {/* Client Logos Bar */}
          <div id="clients" className="mt-8 pt-4">
            <div
              className={`max-w-6xl mx-auto backdrop-blur-xl rounded-3xl p-5 sm:p-6 transition-all duration-300 ${
                isDark
                  ? 'bg-[#030712]/90 border border-cyan-400/40 shadow-[0_0_50px_rgba(0,0,0,0.9)]'
                  : 'bg-white/90 border border-slate-200 shadow-[0_15px_40px_rgba(0,0,0,0.06)]'
              }`}
            >
              <p
                className={`text-center text-[10px] uppercase tracking-widest font-extrabold mb-4 drop-shadow-sm ${
                  isDark ? 'text-cyan-300' : 'text-blue-600'
                }`}
              >
                TRUSTED BY INNOVATIVE COMPANIES WORLDWIDE
              </p>
              <div className="grid grid-cols-6 gap-6 items-center justify-items-center">
                <div
                  className={`w-full text-center py-2.5 px-3 rounded-2xl font-display font-black text-base shadow-sm flex items-center justify-center space-x-1.5 transition-colors ${
                    isDark
                      ? 'bg-surface/90 border border-primary-500/30 text-white hover:border-cyan-400'
                      : 'bg-slate-50 border border-slate-200 text-slate-900 hover:border-blue-400'
                  }`}
                >
                  <span className="text-amber-400">⚡</span> <span>ACME</span>
                </div>
                <div
                  className={`w-full text-center py-2.5 px-3 rounded-2xl font-display font-bold text-base shadow-sm flex items-center justify-center space-x-1.5 transition-colors ${
                    isDark
                      ? 'bg-surface/90 border border-primary-500/30 text-white hover:border-cyan-400'
                      : 'bg-slate-50 border border-slate-200 text-slate-900 hover:border-blue-400'
                  }`}
                >
                  <span className="text-cyan-500">✦</span> <span>visionary</span>
                </div>
                <div
                  className={`w-full text-center py-2.5 px-3 rounded-2xl font-display font-black text-base uppercase tracking-widest shadow-sm flex items-center justify-center transition-colors ${
                    isDark
                      ? 'bg-surface/90 border border-primary-500/30 text-white hover:border-cyan-400'
                      : 'bg-slate-50 border border-slate-200 text-slate-900 hover:border-blue-400'
                  }`}
                >
                  PULSE
                </div>
                <div
                  className={`w-full text-center py-2.5 px-3 rounded-2xl font-display font-bold text-base shadow-sm flex items-center justify-center space-x-1.5 transition-colors ${
                    isDark
                      ? 'bg-surface/90 border border-primary-500/30 text-white hover:border-cyan-400'
                      : 'bg-slate-50 border border-slate-200 text-slate-900 hover:border-blue-400'
                  }`}
                >
                  <span className="text-purple-500">▲</span> <span>VERTEX</span>
                </div>
                <div
                  className={`w-full text-center py-2.5 px-3 rounded-2xl font-display font-semibold text-base tracking-wider shadow-sm flex items-center justify-center space-x-1.5 transition-colors ${
                    isDark
                      ? 'bg-surface/90 border border-primary-500/30 text-white hover:border-cyan-400'
                      : 'bg-slate-50 border border-slate-200 text-slate-900 hover:border-blue-400'
                  }`}
                >
                  <span className="text-cyan-500">⚛</span> <span>Spherule</span>
                </div>
                <div
                  className={`w-full text-center py-2.5 px-3 rounded-2xl font-display font-bold text-base shadow-sm flex items-center justify-center space-x-1.5 transition-colors ${
                    isDark
                      ? 'bg-surface/90 border border-primary-500/30 text-white hover:border-cyan-400'
                      : 'bg-slate-50 border border-slate-200 text-slate-900 hover:border-blue-400'
                  }`}
                >
                  <span className="text-sky-500">☁</span> <span>Cloudix</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
