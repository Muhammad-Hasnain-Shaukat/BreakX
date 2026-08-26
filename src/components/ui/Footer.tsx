'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, Sparkles, Github, Twitter, Linkedin, Mail, MapPin, Shield, LogOut, Activity } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

export const Footer: React.FC = () => {
  const pathname = usePathname();
  const isAdminPortal = pathname === '/admin';
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const handleAdminLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    window.location.href = '/';
  };

  return (
    <footer
      className={`border-t relative overflow-hidden z-20 transition-colors duration-300 ${
        isDark ? 'bg-background border-surface-border' : 'bg-slate-50/80 border-slate-200'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        {/* Call to Action Banner */}
        {isAdminPortal ? (
          <div
            className={`p-8 md:p-12 rounded-3xl border relative overflow-hidden mb-16 shadow-2xl transition-colors ${
              isDark
                ? 'bg-gradient-to-r from-purple-950/40 via-surface-card to-purple-950/30 border-purple-500/40'
                : 'bg-gradient-to-r from-purple-50 via-white to-purple-50 border-purple-200 shadow-[0_15px_40px_rgba(168,85,247,0.12)]'
            }`}
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/15 rounded-full filter blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-3">
                <div
                  className={`inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border text-xs font-bold ${
                    isDark
                      ? 'bg-purple-500/20 border-purple-500/40 text-purple-300 shadow-neon-purple'
                      : 'bg-purple-100 border-purple-300 text-purple-800'
                  }`}
                >
                  <Shield className="w-3.5 h-3.5 text-purple-500" />
                  <span className="uppercase tracking-widest text-[10px]">BREAKX EXECUTIVE OPERATIONS CONSOLE</span>
                </div>
                <h2
                  className={`font-display font-black text-3xl md:text-5xl tracking-tight ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  Master Governance &{' '}
                  <span
                    className={`text-transparent bg-clip-text ${
                      isDark
                        ? 'bg-gradient-to-r from-[#00F0FF] via-[#A855F7] to-[#C084FC] drop-shadow-[0_0_30px_rgba(168,85,247,0.7)]'
                        : 'bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600'
                    }`}
                  >
                    Pipeline Control.
                  </span>
                </h2>
                <p className={`text-sm md:text-base max-w-2xl leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  Real-time administration of enterprise project scopes, candidate applications, automated pipelines, and confidential client engagement records.
                </p>
              </div>
              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
                <a
                  href="#top"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-sm text-center shadow-[0_0_25px_rgba(168,85,247,0.5)] hover:scale-105 transition-all flex items-center justify-center space-x-2"
                >
                  <Activity className="w-4 h-4" />
                  <span>Inspect System Records</span>
                </a>
                <button
                  onClick={handleAdminLogout}
                  className={`w-full py-3.5 px-6 rounded-2xl border font-semibold text-xs text-center transition-all flex items-center justify-center space-x-2 hover:scale-105 ${
                    isDark
                      ? 'bg-red-500/15 border-red-500/40 hover:bg-red-500/25 text-red-300'
                      : 'bg-red-50 border-red-200 hover:bg-red-100 text-red-700'
                  }`}
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out of Master Admin</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div
            className={`p-8 md:p-12 rounded-3xl border relative overflow-hidden mb-16 shadow-2xl transition-colors ${
              isDark
                ? 'bg-gradient-to-r from-surface-card via-surface-border/40 to-surface-card border-primary-500/30'
                : 'bg-gradient-to-r from-blue-50 via-white to-blue-50 border-blue-200 shadow-[0_15px_40px_rgba(37,99,235,0.12)]'
            }`}
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-accent-purple/15 rounded-full filter blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-3">
                <div
                  className={`inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border text-xs font-bold ${
                    isDark
                      ? 'bg-primary-500/20 border-primary-500/40 text-accent-cyan shadow-neon-blue'
                      : 'bg-blue-100 border-blue-300 text-blue-800'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span className="uppercase tracking-widest text-[10px]">READY TO ELEVATE YOUR BRAND?</span>
                </div>
                <h2
                  className={`font-display font-black text-3xl md:text-5xl tracking-tight ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  Let's build something{' '}
                  <span
                    className={`text-transparent bg-clip-text ${
                      isDark
                        ? 'bg-gradient-to-r from-[#00F0FF] via-[#60A5FA] to-[#C084FC] drop-shadow-[0_0_30px_rgba(0,240,255,0.7)]'
                        : 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600'
                    }`}
                  >
                    extraordinary.
                  </span>
                </h2>
                <p className={`text-sm md:text-base max-w-2xl leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  Partner with BreakX to engineer high-converting web experiences, custom AI workflows, and digital products that dominate your market.
                </p>
              </div>
              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
                <Link
                  href="/project-request"
                  className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-primary-600 via-primary-500 to-accent-purple text-white font-bold text-sm text-center shadow-neon-blue hover:shadow-neon-purple transition-all flex items-center justify-center space-x-2 hover:scale-105"
                >
                  <span>Start Your Project</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/join-breakx"
                  className={`w-full py-3.5 px-6 rounded-2xl border font-semibold text-xs text-center transition-all block hover:scale-105 ${
                    isDark
                      ? 'bg-surface-card border-surface-border hover:border-primary-500/50 text-slate-300'
                      : 'bg-white border-slate-200 hover:border-blue-400 text-slate-700 shadow-sm'
                  }`}
                >
                  Join BreakX Team
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Footer Navigation Columns */}
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b ${
            isDark ? 'border-surface-border' : 'border-slate-200'
          }`}
        >
          {/* Column 1: Brand */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center space-x-3">
              <div
                className={`w-9 h-9 rounded-xl border flex items-center justify-center font-black text-lg ${
                  isDark
                    ? 'bg-primary-600/20 border-primary-500/40 text-accent-cyan shadow-neon-blue'
                    : 'bg-blue-600 text-white shadow-sm'
                }`}
              >
                X
              </div>
              <span className={`font-display font-black text-2xl tracking-wider ${isDark ? 'text-white' : 'text-slate-900'}`}>
                BREAK<span className={isDark ? 'text-accent-cyan' : 'text-blue-600'}>X</span>
              </span>
            </Link>
            <p className={`text-xs sm:text-sm max-w-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              BreakX is an elite digital engineering studio building WebGL-powered web platforms, custom AI architectures, and growth automation tools.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className={`p-2.5 rounded-full border transition-colors ${
                  isDark
                    ? 'bg-surface border-surface-border text-slate-400 hover:text-white hover:border-primary-500'
                    : 'bg-white border-slate-200 text-slate-600 hover:text-blue-600 hover:border-blue-400 shadow-sm'
                }`}
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className={`p-2.5 rounded-full border transition-colors ${
                  isDark
                    ? 'bg-surface border-surface-border text-slate-400 hover:text-white hover:border-primary-500'
                    : 'bg-white border-slate-200 text-slate-600 hover:text-blue-600 hover:border-blue-400 shadow-sm'
                }`}
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className={`p-2.5 rounded-full border transition-colors ${
                  isDark
                    ? 'bg-surface border-surface-border text-slate-400 hover:text-white hover:border-primary-500'
                    : 'bg-white border-slate-200 text-slate-600 hover:text-blue-600 hover:border-blue-400 shadow-sm'
                }`}
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div className="space-y-3">
            <h4 className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Navigation
            </h4>
            <ul className={`space-y-2 text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              <li>
                <Link href="/services" className={isDark ? 'hover:text-white' : 'hover:text-blue-600'}>
                  Our Services
                </Link>
              </li>
              <li>
                <Link href="/work" className={isDark ? 'hover:text-white' : 'hover:text-blue-600'}>
                  Selected Work
                </Link>
              </li>
              <li>
                <Link href="/delivered-projects" className={isDark ? 'hover:text-white' : 'hover:text-blue-600'}>
                  Delivered Projects
                </Link>
              </li>
              <li>
                <Link href="/about" className={isDark ? 'hover:text-white' : 'hover:text-blue-600'}>
                  About BreakX
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Opportunities & Admin Portal */}
          <div className="space-y-3">
            <h4 className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Engage
            </h4>
            <ul className={`space-y-2 text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              <li>
                <Link href="/project-request" className={isDark ? 'hover:text-white' : 'hover:text-blue-600'}>
                  Request a Project
                </Link>
              </li>
              <li>
                <Link href="/join-breakx" className={isDark ? 'hover:text-white' : 'hover:text-blue-600'}>
                  Opportunity Seekers
                </Link>
              </li>
              <li>
                <Link href="/services#pricing" className={isDark ? 'hover:text-white' : 'hover:text-blue-600'}>
                  Transparent Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/admin"
                  className={`flex items-center space-x-1.5 font-semibold pt-1 ${
                    isDark ? 'text-purple-300 hover:text-purple-200' : 'text-purple-700 hover:text-purple-900'
                  }`}
                >
                  <Shield className="w-3.5 h-3.5 text-purple-500" />
                  <span>Admin Portal</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Location & Contact */}
          <div className="space-y-3">
            <h4 className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Global Headquarters
            </h4>
            <div className={`space-y-2 text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              <div className="flex items-center space-x-2">
                <MapPin className="w-3.5 h-3.5 text-primary-500 shrink-0" />
                <span>Lahore, Pakistan</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-3.5 h-3.5 text-primary-500 shrink-0" />
                <span>contact@breakx.agency</span>
              </div>
              <div className={`pt-2 text-[11px] font-bold ${isDark ? 'text-accent-cyan' : 'text-blue-600'}`}>
                ● Accepting new enterprise partnerships
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className={`pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] space-y-4 sm:space-y-0 ${
            isDark ? 'text-slate-400' : 'text-slate-500'
          }`}
        >
          <div>
            &copy; {new Date().getFullYear()} BreakX Studio Inc. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <Link href="/privacy" className={isDark ? 'hover:text-white' : 'hover:text-slate-900'}>
              Privacy Policy
            </Link>
            <Link href="/terms" className={isDark ? 'hover:text-white' : 'hover:text-slate-900'}>
              Terms of Service
            </Link>
            <Link href="/security" className={isDark ? 'hover:text-white' : 'hover:text-slate-900'}>
              Security Compliance
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
