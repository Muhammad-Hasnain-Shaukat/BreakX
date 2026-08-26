'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sparkles, Menu, X, ArrowUpRight, Shield, User, LogOut, ChevronRight } from 'lucide-react';
import { AuthModal } from './AuthModal';
import { ThemeToggle } from './ThemeToggle';
import { useTheme } from '@/context/ThemeContext';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [scrolled, setScrolled] = useState<boolean>(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState<boolean>(false);
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [authRole, setAuthRole] = useState<'client' | 'seeker'>('client');
  const [userSession, setUserSession] = useState<any>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);

    fetch('/api/auth/me')
      .then((res) => res.json())
      .then((data) => {
        if (data.user) setUserSession(data.user);
      })
      .catch(() => {});

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openAuth = (role: 'client' | 'seeker') => {
    setAuthRole(role);
    setAuthModalOpen(true);
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setUserSession(null);
    window.location.href = '/';
  };

  const navLinks = [
    { name: 'Services', href: '/services' },
    { name: 'Work', href: '/work' },
    { name: 'Delivered', href: '/delivered-projects' },
    { name: 'About', href: '/about' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled ? 'py-3' : 'py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Floating Round Navbar Pill with Adaptive Radiance */}
          <div className="relative group">
            {/* 1. Radiant Background Halo */}
            <div
              className={`absolute -inset-1.5 rounded-full filter blur-2xl transition-opacity pointer-events-none -z-10 animate-pulse-glow ${
                isDark
                  ? 'bg-gradient-to-r from-[#00F0FF] via-[#3B82F6] to-[#C084FC] opacity-85 group-hover:opacity-100'
                  : 'bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-300 opacity-40 group-hover:opacity-60'
              }`}
            />

            {/* 2. Main Pill Bar */}
            <div
              className={`backdrop-blur-2xl rounded-full px-5 py-2.5 flex items-center justify-between transition-all duration-300 ${
                isDark
                  ? 'bg-[#030712]/95 border-[2.5px] border-[#00F0FF] shadow-[0_0_20px_#00F0FF,_0_0_40px_#3B82F6,_0_0_75px_rgba(0,240,255,0.7),_inset_0_0_20px_rgba(0,240,255,0.4)]'
                  : 'bg-white/95 border-[2px] border-blue-400/60 shadow-[0_10px_35px_rgba(37,99,235,0.18),_0_0_20px_rgba(59,130,246,0.15)]'
              }`}
            >
              {/* Logo */}
              <Link href="/" className="flex items-center space-x-3 group/logo">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#00F0FF] via-blue-500 to-purple-500 p-[1.5px] shadow-[0_0_20px_rgba(0,240,255,0.6)] group-hover/logo:scale-105 transition-transform overflow-hidden">
                  <div
                    className={`w-full h-full rounded-[10px] flex items-center justify-center overflow-hidden p-0.5 transition-colors ${
                      isDark ? 'bg-[#030712]' : 'bg-white'
                    }`}
                  >
                    <img
                      src="/breakx-bx-logo.png"
                      alt="BreakX Logo"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <span
                    className={`font-display font-black text-xl tracking-wider transition-colors ${
                      isDark
                        ? 'text-white drop-shadow-[0_0_12px_rgba(0,240,255,0.8)]'
                        : 'text-slate-900 drop-shadow-[0_2px_10px_rgba(37,99,235,0.25)]'
                    }`}
                  >
                    BREAK<span className={isDark ? 'text-[#00F0FF]' : 'text-blue-600'}>X</span>
                  </span>
                  <span
                    className={`text-[8px] uppercase tracking-widest font-extrabold -mt-1 ${
                      isDark
                        ? 'text-[#00F0FF] drop-shadow-[0_0_8px_rgba(0,240,255,0.9)]'
                        : 'text-blue-600 font-black'
                    }`}
                  >
                    Digital Transformation
                  </span>
                </div>
              </Link>

              {/* Navigation Links */}
              <nav
                className={`hidden md:flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full transition-colors ${
                  isDark
                    ? 'bg-[#030712]/90 border border-[#00F0FF]/60 shadow-[0_0_15px_rgba(0,240,255,0.35)]'
                    : 'bg-slate-100/90 border border-slate-200/90 shadow-sm'
                }`}
              >
                {navLinks.map((link) => {
                  const active = pathname === link.href;
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-wide transition-all ${
                        active
                          ? isDark
                            ? 'bg-gradient-to-r from-[#00F0FF]/40 to-blue-600/50 text-white border border-[#00F0FF] shadow-[0_0_20px_#00F0FF]'
                            : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-[0_4px_15px_rgba(37,99,235,0.35)]'
                          : isDark
                          ? 'text-slate-200 hover:text-white hover:bg-white/10'
                          : 'text-slate-700 hover:text-slate-900 hover:bg-white/80'
                      }`}
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </nav>

              {/* Action Triggers & Theme Toggle */}
              <div className="hidden md:flex items-center space-x-3">
                {/* Theme Switcher Button */}
                <ThemeToggle />

                {userSession ? (
                  <div className="flex items-center space-x-3">
                    <Link
                      href={userSession.role === 'admin' ? '/admin' : '/dashboard'}
                      className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                        isDark
                          ? 'bg-surface border border-[#00F0FF]/60 text-white hover:border-[#00F0FF] shadow-[0_0_12px_rgba(0,240,255,0.4)]'
                          : 'bg-white border border-blue-400/60 text-slate-800 hover:border-blue-600 shadow-sm'
                      }`}
                    >
                      {userSession.role === 'admin' ? (
                        <Shield className="w-3.5 h-3.5 text-accent-purple" />
                      ) : (
                        <User className={`w-3.5 h-3.5 ${isDark ? 'text-[#00F0FF]' : 'text-blue-600'}`} />
                      )}
                      <span>{userSession.fullName.split(' ')[0]}</span>
                      <span
                        className={`text-[9px] uppercase font-bold px-1.5 py-0.5 rounded ${
                          isDark
                            ? 'bg-primary-500/30 text-[#00F0FF]'
                            : 'bg-blue-100 text-blue-700'
                        }`}
                      >
                        {userSession.role}
                      </span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="p-1.5 text-slate-400 hover:text-red-400 rounded-full transition-colors"
                      title="Sign Out"
                    >
                      <LogOut className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <>
                    <button
                      onClick={() => openAuth('seeker')}
                      className={`text-xs font-bold px-3 py-1.5 transition-colors ${
                        isDark ? 'text-slate-200 hover:text-white' : 'text-slate-700 hover:text-slate-900'
                      }`}
                    >
                      Join BreakX
                    </button>

                    <Link
                      href="/project-request"
                      className="relative group/btn overflow-hidden rounded-full p-[2px] font-bold text-xs transition-all hover:scale-105 shadow-[0_0_25px_rgba(0,240,255,0.6)]"
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-[#00F0FF] via-blue-500 to-purple-500 rounded-full animate-shimmer" />
                      <span
                        className={`relative px-5 py-2 rounded-full flex items-center space-x-2 transition-colors ${
                          isDark ? 'bg-[#030712] text-white' : 'bg-slate-900 text-white'
                        }`}
                      >
                        <span>Start Your Project</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-[#00F0FF] group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                      </span>
                    </Link>
                  </>
                )}
              </div>

              {/* Mobile Hamburger & Theme Button */}
              <div className="flex md:hidden items-center space-x-2">
                <ThemeToggle />
                <button
                  onClick={() => setMobileDrawerOpen(!mobileDrawerOpen)}
                  className={`p-2.5 rounded-full min-h-[44px] min-w-[44px] flex items-center justify-center transition-colors ${
                    isDark
                      ? 'bg-slate-900/90 text-white hover:bg-slate-800 border border-[#00F0FF]/60 shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                      : 'bg-white text-slate-900 hover:bg-slate-100 border border-slate-300 shadow-sm'
                  }`}
                  aria-label="Toggle navigation menu"
                >
                  {mobileDrawerOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileDrawerOpen && (
        <div
          className={`fixed inset-0 z-50 md:hidden backdrop-blur-2xl flex flex-col justify-between p-6 transition-colors ${
            isDark ? 'bg-black/90' : 'bg-white/95'
          }`}
        >
          <div className="space-y-6">
            <div
              className={`flex items-center justify-between pb-6 border-b ${
                isDark ? 'border-surface-border' : 'border-slate-200'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#00F0FF] to-purple-600 p-[1px]">
                  <div
                    className={`w-full h-full rounded-[11px] flex items-center justify-center font-black text-sm ${
                      isDark ? 'bg-[#030712] text-[#00F0FF]' : 'bg-white text-blue-600'
                    }`}
                  >
                    X
                  </div>
                </div>
                <span className={`font-display font-bold text-xl ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  BREAKX
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <ThemeToggle showLabel />
                <button
                  onClick={() => setMobileDrawerOpen(false)}
                  className={`p-2.5 rounded-full min-h-[44px] min-w-[44px] flex items-center justify-center ${
                    isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                  }`}
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileDrawerOpen(false)}
                  className={`flex items-center justify-between px-4 py-3.5 rounded-2xl border text-base font-semibold min-h-[48px] ${
                    isDark
                      ? 'bg-surface-card border-surface-border text-white'
                      : 'bg-slate-50 border-slate-200 text-slate-800'
                  }`}
                >
                  <span>{link.name}</span>
                  <ChevronRight className="w-5 h-5 text-slate-400" />
                </Link>
              ))}
            </div>

            <div className={`pt-4 space-y-3 border-t ${isDark ? 'border-surface-border' : 'border-slate-200'}`}>
              <Link
                href="/project-request"
                onClick={() => setMobileDrawerOpen(false)}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#00F0FF] to-purple-600 text-white font-bold text-center block text-base shadow-[0_0_25px_rgba(0,240,255,0.5)] min-h-[48px]"
              >
                Start Your Project
              </Link>
              <Link
                href="/join-breakx"
                onClick={() => setMobileDrawerOpen(false)}
                className={`w-full py-3.5 rounded-2xl border font-semibold text-center block text-sm min-h-[48px] ${
                  isDark
                    ? 'bg-surface-card border-surface-border text-slate-300'
                    : 'bg-slate-100 border-slate-200 text-slate-700'
                }`}
              >
                Join BreakX Team
              </Link>
            </div>
          </div>
        </div>
      )}

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialRole={authRole}
      />
    </>
  );
};
