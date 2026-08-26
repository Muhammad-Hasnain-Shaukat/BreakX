'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, LogIn, UserCheck, ArrowRight, Github, Linkedin } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialRole?: 'client' | 'seeker';
  targetRedirect?: string;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialRole = 'client',
  targetRedirect,
}) => {
  const [role, setRole] = useState<'client' | 'seeker'>(initialRole === 'seeker' ? 'seeker' : 'client');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  if (!isOpen) return null;

  // Authentic OAuth Identity Provider Login for Clients & Seekers
  const handleOAuthLogin = (provider: 'google' | 'github' | 'linkedin') => {
    setLoading(true);
    setError('');

    const destination = targetRedirect || (role === 'seeker' ? '/join-breakx' : '/project-request');
    window.location.href = `/api/auth/${provider}?role=${role}&redirect=${encodeURIComponent(destination)}`;
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-4 bg-black/70 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ type: 'spring', damping: 25, stiffness: 250 }}
          className={`w-full max-w-lg rounded-t-3xl md:rounded-3xl p-6 md:p-8 overflow-hidden relative shadow-2xl transition-colors ${
            isDark
              ? 'bg-[#030712] border-2 border-cyan-400/50 shadow-[0_0_50px_rgba(6,182,212,0.4)]'
              : 'bg-white border-2 border-blue-200 shadow-[0_20px_60px_rgba(0,0,0,0.2)]'
          }`}
        >
          {/* Ambient Glow */}
          <div
            className={`absolute top-0 right-0 w-64 h-64 rounded-full filter blur-3xl pointer-events-none ${
              isDark ? 'bg-cyan-500/15' : 'bg-blue-500/10'
            }`}
          />

          {/* Header */}
          <div
            className={`flex items-center justify-between pb-6 border-b ${
              isDark ? 'border-surface-border' : 'border-slate-200'
            }`}
          >
            <div className="flex items-center space-x-2">
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center text-white ${
                  isDark
                    ? 'bg-gradient-to-tr from-cyan-500 to-purple-600 shadow-neon-blue'
                    : 'bg-gradient-to-tr from-blue-600 to-indigo-600 shadow-sm'
                }`}
              >
                <Sparkles className="w-4 h-4" />
              </div>
              <span
                className={`font-display font-bold text-xl tracking-wider ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}
              >
                BREAK<span className={isDark ? 'text-[#00F0FF]' : 'text-blue-600'}>X</span> AUTHENTICATION
              </span>
            </div>
            <button
              onClick={onClose}
              className={`p-2 rounded-full transition-colors ${
                isDark
                  ? 'text-slate-400 hover:text-white hover:bg-white/10'
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Role Picker */}
          <div className="mt-6">
            <label
              className={`text-xs uppercase tracking-wider font-extrabold mb-2.5 block ${
                isDark ? 'text-cyan-300' : 'text-blue-600'
              }`}
            >
              1. Select Access Role
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRole('client')}
                className={`py-3 px-3 rounded-2xl border text-xs font-bold flex flex-col items-center justify-center space-y-1.5 transition-all ${
                  role === 'client'
                    ? isDark
                      ? 'border-[#00F0FF] bg-[#00F0FF]/15 text-white shadow-[0_0_20px_rgba(0,240,255,0.4)]'
                      : 'border-blue-600 bg-blue-50 text-blue-900 shadow-sm'
                    : isDark
                    ? 'border-surface-border bg-surface-card text-slate-400 hover:text-white'
                    : 'border-slate-200 bg-slate-50 text-slate-600 hover:text-slate-900'
                }`}
              >
                <LogIn className={`w-4 h-4 ${isDark ? 'text-cyan-400' : 'text-blue-600'}`} />
                <span>Client Partner</span>
              </button>
              <button
                type="button"
                onClick={() => setRole('seeker')}
                className={`py-3 px-3 rounded-2xl border text-xs font-bold flex flex-col items-center justify-center space-y-1.5 transition-all ${
                  role === 'seeker'
                    ? isDark
                      ? 'border-[#00F0FF] bg-[#00F0FF]/15 text-white shadow-[0_0_20px_rgba(0,240,255,0.4)]'
                      : 'border-purple-600 bg-purple-50 text-purple-900 shadow-sm'
                    : isDark
                    ? 'border-surface-border bg-surface-card text-slate-400 hover:text-white'
                    : 'border-slate-200 bg-slate-50 text-slate-600 hover:text-slate-900'
                }`}
              >
                <UserCheck className={`w-4 h-4 ${isDark ? 'text-blue-400' : 'text-purple-600'}`} />
                <span>Talent Seeker</span>
              </button>
            </div>
          </div>

          {error && (
            <div className="mt-4 p-3.5 rounded-2xl bg-red-500/15 border border-red-500/40 text-red-500 text-xs font-semibold">
              {error}
            </div>
          )}

          {/* Client & Talent Seeker OAuth Authentication */}
          <div className="mt-6 space-y-3">
            <label
              className={`text-xs uppercase tracking-wider font-extrabold mb-1 block ${
                isDark ? 'text-cyan-300' : 'text-blue-600'
              }`}
            >
              2. Authenticate With Identity Provider
            </label>

            {/* Google OAuth Button */}
            <button
              type="button"
              onClick={() => handleOAuthLogin('google')}
              disabled={loading}
              className={`w-full py-3.5 px-5 rounded-2xl border font-bold text-sm flex items-center justify-between transition-all hover:scale-[1.02] shadow-sm ${
                isDark
                  ? 'border-white/20 bg-surface-card hover:bg-white/10 text-white hover:border-[#00F0FF]'
                  : 'border-slate-200 bg-slate-50 hover:bg-white text-slate-800 hover:border-blue-400'
              }`}
            >
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.96H1.29v3.15C3.26 21.3 7.31 24 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.28 14.24c-.25-.72-.38-1.49-.38-2.24s.13-1.52.38-2.24V6.61H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.39l3.99-3.15z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.61l3.99 3.15c.95-2.85 3.6-4.96 6.72-4.96z"
                  />
                </svg>
                <span>Continue with Google</span>
              </div>
              <ArrowRight className={`w-4 h-4 ${isDark ? 'text-slate-400' : 'text-slate-500'}`} />
            </button>

            {/* GitHub OAuth Button */}
            <button
              type="button"
              onClick={() => handleOAuthLogin('github')}
              disabled={loading}
              className={`w-full py-3.5 px-5 rounded-2xl border font-bold text-sm flex items-center justify-between transition-all hover:scale-[1.02] shadow-sm ${
                isDark
                  ? 'border-white/20 bg-surface-card hover:bg-white/10 text-white hover:border-[#00F0FF]'
                  : 'border-slate-200 bg-slate-50 hover:bg-white text-slate-800 hover:border-blue-400'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Github className={`w-5 h-5 ${isDark ? 'text-white' : 'text-slate-900'}`} />
                <span>Continue with GitHub</span>
              </div>
              <ArrowRight className={`w-4 h-4 ${isDark ? 'text-slate-400' : 'text-slate-500'}`} />
            </button>

            {/* LinkedIn OAuth Button */}
            <button
              type="button"
              onClick={() => handleOAuthLogin('linkedin')}
              disabled={loading}
              className={`w-full py-3.5 px-5 rounded-2xl border font-bold text-sm flex items-center justify-between transition-all hover:scale-[1.02] shadow-sm ${
                isDark
                  ? 'border-white/20 bg-surface-card hover:bg-white/10 text-white hover:border-[#00F0FF]'
                  : 'border-slate-200 bg-slate-50 hover:bg-white text-slate-800 hover:border-blue-400'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Linkedin className="w-5 h-5 text-[#0A66C2]" />
                <span>Continue with LinkedIn</span>
              </div>
              <ArrowRight className={`w-4 h-4 ${isDark ? 'text-slate-400' : 'text-slate-500'}`} />
            </button>
          </div>

          <div
            className={`mt-6 pt-4 border-t text-center ${
              isDark ? 'border-surface-border' : 'border-slate-200'
            }`}
          >
            <p className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Authenticated user profiles and scopes are securely stored in BreakX Database.
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
