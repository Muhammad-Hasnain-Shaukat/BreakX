'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, Play, ChevronDown } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <>
      {/* =========================================================================
          1. MOBILE VIEW ONLY (< lg):
          - Screen 1: Blank landing page with ONLY top bar and visible 3D X. No text!
          - Screen 2 onwards: Uses the exact same dark starry theme as Services, Work, etc.
            The 3D X is 100% NOT visible afterwards.
         ========================================================================= */}
      <div className="lg:hidden">
        {/* Screen 1: Blank 3D X Landing (Zero text, unobstructed 3D X) */}
        <section
          className="min-h-[85vh] flex flex-col justify-end items-center pb-8 px-4 relative overflow-hidden"
          style={{
            backgroundImage: "url('/hero-full-bg.jpg')",
            backgroundPosition: 'right 15% center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}
        >
          {/* Subtle bottom gradient fade to seamlessly meet the dark starry space */}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#030712] to-transparent pointer-events-none" />

          {/* Interactive Bouncing Scroll Button */}
          <a
            href="#mobile-overview"
            className="relative z-10 inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-[#030712]/90 border-2 border-[#00F0FF] text-white text-xs font-bold backdrop-blur-md shadow-[0_0_20px_#00F0FF,_0_0_40px_rgba(0,240,255,0.4)] animate-bounce transition-transform"
          >
            <span>Explore BreakX</span>
            <ChevronDown className="w-4 h-4 text-[#00F0FF]" />
          </a>
        </section>

        {/* Screen 2: Clean Dark Starry Overview (Exact same theme as Services & Work - Zero 3D X) */}
        <section
          id="mobile-overview"
          className="relative z-20 py-12 px-5 space-y-8"
        >
          {/* Tagline Badge */}
          <div className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full bg-surface-card border border-cyan-400/50 text-xs font-bold shadow-neon-blue">
            <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-ping" />
            <span className="text-[#00F0FF] font-extrabold uppercase tracking-widest text-[10px]">
              DIGITAL EXCELLENCE, DELIVERED
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="font-display font-black text-4xl sm:text-5xl tracking-tight leading-[1.0] text-white">
            BREAK <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] via-[#60A5FA] to-[#C084FC] drop-shadow-[0_0_30px_rgba(0,240,255,0.7)]">
              THE ORDINARY.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-slate-200 text-sm sm:text-base font-normal leading-relaxed">
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
              className="py-4 px-6 rounded-full bg-surface-card border border-cyan-400/50 text-white font-bold text-sm flex items-center justify-center space-x-2.5 shadow-sm"
            >
              <div className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center">
                <Play className="w-2.5 h-2.5 text-[#00F0FF] fill-[#00F0FF] ml-0.5" />
              </div>
              <span>View Our Work</span>
            </Link>
          </div>

          {/* Client Social Proof Avatar Badge */}
          <div className="pt-6 flex items-center space-x-4 border-t border-surface-border">
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
              <div className="text-[11px] font-black text-white uppercase tracking-wider">
                2,000+ CLIENTS WORLDWIDE
              </div>
              <div className="text-[11px] text-slate-300">
                Global brands trust BreakX to build their digital future.
              </div>
            </div>
          </div>

          {/* Client Logos Grid */}
          <div className="pt-6 border-t border-surface-border space-y-4">
            <p className="text-center text-[10px] uppercase tracking-widest font-extrabold text-cyan-300">
              TRUSTED BY INNOVATIVE COMPANIES WORLDWIDE
            </p>
            <div className="grid grid-cols-2 gap-3 items-center justify-items-center">
              <div className="w-full text-center py-2.5 px-3 rounded-2xl bg-surface border border-surface-border font-display font-black text-sm text-white flex items-center justify-center space-x-1.5">
                <span className="text-amber-400">⚡</span> <span>ACME</span>
              </div>
              <div className="w-full text-center py-2.5 px-3 rounded-2xl bg-surface border border-surface-border font-display font-bold text-sm text-white flex items-center justify-center space-x-1.5">
                <span className="text-cyan-400">✦</span> <span>visionary</span>
              </div>
              <div className="w-full text-center py-2.5 px-3 rounded-2xl bg-surface border border-surface-border font-display font-black text-sm uppercase tracking-widest text-white flex items-center justify-center">
                PULSE
              </div>
              <div className="w-full text-center py-2.5 px-3 rounded-2xl bg-surface border border-surface-border font-display font-bold text-sm text-white flex items-center justify-center space-x-1.5">
                <span className="text-purple-400">▲</span> <span>VERTEX</span>
              </div>
              <div className="w-full text-center py-2.5 px-3 rounded-2xl bg-surface border border-surface-border font-display font-semibold text-sm tracking-wider text-white flex items-center justify-center space-x-1.5">
                <span className="text-cyan-400">⚛</span> <span>Spherule</span>
              </div>
              <div className="w-full text-center py-2.5 px-3 rounded-2xl bg-surface border border-surface-border font-display font-bold text-sm text-white flex items-center justify-center space-x-1.5">
                <span className="text-sky-300">☁</span> <span>Cloudix</span>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* =========================================================================
          2. PC / DESKTOP VIEW (lg:):
          - Widescreen side-by-side layout (Left copy, Right 3D Crystal X artwork)
         ========================================================================= */}
      <section className="hidden lg:flex relative min-h-[85vh] flex-col justify-between overflow-hidden pt-2 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 my-auto">
          {/* Main Grid: Left Copy & Controls */}
          <div className="grid grid-cols-12 gap-8 items-center min-h-[55vh]">
            {/* Left Column */}
            <div className="col-span-7 space-y-6 text-left py-4">
              {/* Tagline Badge */}
              <div className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full bg-[#030712]/95 border-2 border-[#00F0FF] text-xs font-bold tracking-wide backdrop-blur-md shadow-[0_0_15px_#00F0FF,_0_0_30px_rgba(0,240,255,0.45),_inset_0_0_10px_rgba(0,240,255,0.25)]">
                <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-ping" />
                <span className="text-[#00F0FF] font-extrabold uppercase tracking-widest text-[10px] drop-shadow-[0_0_8px_rgba(0,240,255,0.8)]">
                  DIGITAL EXCELLENCE, DELIVERED
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="font-display font-black text-6xl lg:text-7xl tracking-tight leading-[0.95]">
                <span className="text-white drop-shadow-[0_4px_24px_rgba(0,0,0,1)]">
                  BREAK
                </span>{' '}
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#60A5FA] via-[#818CF8] to-[#38BDF8] drop-shadow-[0_0_40px_rgba(96,165,250,0.8)]">
                  THE ORDINARY.
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-slate-200 font-normal text-base max-w-lg leading-relaxed drop-shadow-md">
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
                  className="py-3.5 px-6 rounded-full bg-[#030712]/90 border-2 border-[#00F0FF] text-white font-bold text-xs transition-all duration-300 flex items-center space-x-2.5 hover:scale-105 backdrop-blur-md shadow-[0_0_18px_#00F0FF,_0_0_35px_rgba(0,240,255,0.45),_inset_0_0_12px_rgba(0,240,255,0.25)] hover:shadow-[0_0_25px_#00F0FF,_0_0_50px_rgba(0,240,255,0.65)]"
                >
                  <div className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center">
                    <Play className="w-2.5 h-2.5 text-[#00F0FF] fill-[#00F0FF] ml-0.5" />
                  </div>
                  <span>View Our Work</span>
                </Link>
              </div>

              {/* Client Social Proof Avatar Badge */}
              <div className="pt-4 flex items-center space-x-4 border-t border-primary-500/30">
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
                  <div className="text-[11px] font-extrabold text-white uppercase tracking-wider">
                    2,000+ CLIENTS WORLDWIDE
                  </div>
                  <div className="text-[11px] text-slate-300">
                    Global brands trust BreakX to build their digital future.
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Space for 3D X */}
            <div className="col-span-5 pointer-events-none min-h-[440px]" />
          </div>

          {/* Client Logos Bar with Dark Glass Shield */}
          <div id="clients" className="mt-8 pt-4">
            <div className="max-w-6xl mx-auto bg-[#030712]/90 backdrop-blur-xl border border-cyan-400/40 rounded-3xl p-5 sm:p-6 shadow-[0_0_50px_rgba(0,0,0,0.9)]">
              <p className="text-center text-[10px] uppercase tracking-widest font-extrabold text-cyan-300 mb-4 drop-shadow-sm">
                TRUSTED BY INNOVATIVE COMPANIES WORLDWIDE
              </p>
              <div className="grid grid-cols-6 gap-6 items-center justify-items-center">
                <div className="w-full text-center py-2.5 px-3 rounded-2xl bg-surface/90 border border-primary-500/30 font-display font-black text-base text-white shadow-sm flex items-center justify-center space-x-1.5 hover:border-cyan-400 transition-colors">
                  <span className="text-amber-400">⚡</span> <span>ACME</span>
                </div>
                <div className="w-full text-center py-2.5 px-3 rounded-2xl bg-surface/90 border border-primary-500/30 font-display font-bold text-base text-white shadow-sm flex items-center justify-center space-x-1.5 hover:border-cyan-400 transition-colors">
                  <span className="text-cyan-400">✦</span> <span>visionary</span>
                </div>
                <div className="w-full text-center py-2.5 px-3 rounded-2xl bg-surface/90 border border-primary-500/30 font-display font-black text-base uppercase tracking-widest text-white shadow-sm flex items-center justify-center hover:border-cyan-400 transition-colors">
                  PULSE
                </div>
                <div className="w-full text-center py-2.5 px-3 rounded-2xl bg-surface/90 border border-primary-500/30 font-display font-bold text-base text-white shadow-sm flex items-center justify-center space-x-1.5 hover:border-cyan-400 transition-colors">
                  <span className="text-purple-400">▲</span> <span>VERTEX</span>
                </div>
                <div className="w-full text-center py-2.5 px-3 rounded-2xl bg-surface/90 border border-primary-500/30 font-display font-semibold text-base tracking-wider text-white shadow-sm flex items-center justify-center space-x-1.5 hover:border-cyan-400 transition-colors">
                  <span className="text-cyan-400">⚛</span> <span>Spherule</span>
                </div>
                <div className="w-full text-center py-2.5 px-3 rounded-2xl bg-surface/90 border border-primary-500/30 font-display font-bold text-base text-white shadow-sm flex items-center justify-center space-x-1.5 hover:border-cyan-400 transition-colors">
                  <span className="text-sky-300">☁</span> <span>Cloudix</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
