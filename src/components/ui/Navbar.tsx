'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sparkles, Menu, X, ArrowUpRight, Shield, User, LogOut, ChevronRight } from 'lucide-react';
import { AuthModal } from './AuthModal';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
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
          {/* Main Floating Round Navbar Pill with Ultra-Bright Electric Neon Radiance */}
          <div className="relative group">
            {/* 1. Intense Radiant Neon Background Halo */}
            <div className="absolute -inset-1.5 bg-gradient-to-r from-[#00F0FF] via-[#3B82F6] to-[#C084FC] rounded-full filter blur-2xl opacity-90 group-hover:opacity-100 transition-opacity pointer-events-none -z-10 animate-pulse-glow" />

            {/* 2. Main Pill Bar with Solid Electric Cyan Border & Multi-Tiered Neon Light Bloom */}
            <div className="bg-[#030712]/95 backdrop-blur-2xl border-[2.5px] border-[#00F0FF] rounded-full px-5 py-2.5 flex items-center justify-between shadow-[0_0_20px_#00F0FF,_0_0_40px_#3B82F6,_0_0_75px_rgba(0,240,255,0.7),_inset_0_0_20px_rgba(0,240,255,0.4)]">
              {/* Logo */}
              <Link href="/" className="flex items-center space-x-3 group/logo">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#00F0FF] via-blue-500 to-purple-500 p-[1.5px] shadow-[0_0_20px_#00F0FF] group-hover/logo:scale-105 transition-transform">
                  <div className="w-full h-full bg-[#030712] rounded-[10px] flex items-center justify-center">
                    <span className="font-display font-black text-lg text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] via-white to-purple-300">
                      X
                    </span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="font-display font-black text-xl tracking-wider text-white drop-shadow-[0_0_12px_rgba(0,240,255,0.8)]">
                    BREAK<span className="text-[#00F0FF]">X</span>
                  </span>
                  <span className="text-[8px] uppercase tracking-widest text-[#00F0FF] font-extrabold -mt-1 drop-shadow-[0_0_8px_rgba(0,240,255,0.9)]">
                    Digital Transformation
                  </span>
                </div>
              </Link>

              {/* Navigation Links */}
              <nav className="hidden md:flex items-center space-x-1.5 bg-[#030712]/90 px-3.5 py-1.5 rounded-full border border-[#00F0FF]/60 shadow-[0_0_15px_rgba(0,240,255,0.35)]">
                {navLinks.map((link) => {
                  const active = pathname === link.href;
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-wide transition-all ${
                        active
                          ? 'bg-gradient-to-r from-[#00F0FF]/40 to-blue-600/50 text-white border border-[#00F0FF] shadow-[0_0_20px_#00F0FF]'
                          : 'text-slate-200 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </nav>

              {/* Action Triggers */}
              <div className="hidden md:flex items-center space-x-3">
                {userSession ? (
                  <div className="flex items-center space-x-3">
                    <Link
                      href={userSession.role === 'admin' ? '/admin' : '/dashboard'}
                      className="flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-surface border border-[#00F0FF]/60 text-xs font-semibold text-white hover:border-[#00F0FF] shadow-[0_0_12px_rgba(0,240,255,0.4)]"
                    >
                      {userSession.role === 'admin' ? (
                        <Shield className="w-3.5 h-3.5 text-accent-purple" />
                      ) : (
                        <User className="w-3.5 h-3.5 text-[#00F0FF]" />
                      )}
                      <span>{userSession.fullName.split(' ')[0]}</span>
                      <span className="text-[9px] uppercase font-bold px-1.5 py-0.5 rounded bg-primary-500/30 text-[#00F0FF]">
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
                      className="text-xs font-bold text-slate-200 hover:text-white px-3 py-1.5 transition-colors"
                    >
                      Join BreakX
                    </button>

                    <Link
                      href="/project-request"
                      className="relative group/btn overflow-hidden rounded-full p-[2px] font-bold text-xs transition-all hover:scale-105 shadow-[0_0_25px_#00F0FF]"
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-[#00F0FF] via-blue-500 to-purple-500 rounded-full animate-shimmer" />
                      <span className="relative px-5 py-2 rounded-full bg-[#030712] flex items-center space-x-2 text-white">
                        <span>Start Your Project</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-[#00F0FF] group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                      </span>
                    </Link>
                  </>
                )}
              </div>

              {/* Mobile Hamburger Button */}
              <div className="flex md:hidden items-center space-x-2">
                <button
                  onClick={() => setMobileDrawerOpen(!mobileDrawerOpen)}
                  className="p-2.5 rounded-full bg-slate-900/90 text-white hover:bg-slate-800 border border-[#00F0FF]/60 shadow-[0_0_15px_rgba(0,240,255,0.4)] min-h-[44px] min-w-[44px] flex items-center justify-center"
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
        <div className="fixed inset-0 z-50 md:hidden bg-black/90 backdrop-blur-xl flex flex-col justify-between p-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-6 border-b border-surface-border">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#00F0FF] to-purple-600 p-[1px]">
                  <div className="w-full h-full bg-background rounded-[11px] flex items-center justify-center font-black text-sm text-[#00F0FF]">
                    X
                  </div>
                </div>
                <span className="font-display font-bold text-xl text-white">BREAKX</span>
              </div>
              <button
                onClick={() => setMobileDrawerOpen(false)}
                className="p-2.5 text-slate-400 hover:text-white rounded-full min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileDrawerOpen(false)}
                  className="flex items-center justify-between px-4 py-3.5 rounded-2xl bg-surface-card border border-surface-border text-base font-semibold text-white min-h-[48px]"
                >
                  <span>{link.name}</span>
                  <ChevronRight className="w-5 h-5 text-slate-500" />
                </Link>
              ))}
            </div>

            <div className="pt-4 space-y-3 border-t border-surface-border">
              <Link
                href="/project-request"
                onClick={() => setMobileDrawerOpen(false)}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#00F0FF] to-purple-600 text-white font-bold text-center block text-base shadow-[0_0_25px_#00F0FF] min-h-[48px]"
              >
                Start Your Project
              </Link>
              <Link
                href="/join-breakx"
                onClick={() => setMobileDrawerOpen(false)}
                className="w-full py-3.5 rounded-2xl bg-surface-card border border-surface-border text-slate-300 font-semibold text-center block text-sm min-h-[48px]"
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
