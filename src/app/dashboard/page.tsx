'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sparkles, FileText, CheckCircle2, Clock, ShieldAlert, Download, ExternalLink, PlusCircle, User, Briefcase, RefreshCw, LogIn } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { AuthModal } from '@/components/ui/AuthModal';

export default function DashboardPage() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [projectRequests, setProjectRequests] = useState<any[]>([]);
  const [seekerApplications, setSeekerApplications] = useState<any[]>([]);
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const meRes = await fetch('/api/auth/me');
      const meData = await meRes.json();

      if (meData.user) {
        setSession(meData.user);

        if (meData.user.role === 'client') {
          const pRes = await fetch('/api/project-requests');
          const pData = await pRes.json();
          if (pData.requests) setProjectRequests(pData.requests);
        } else if (meData.user.role === 'seeker') {
          const sRes = await fetch('/api/opportunity-seekers');
          const sData = await sRes.json();
          if (sData.seekers) setSeekerApplications(sData.seekers);
        }
      }
    } catch (err) {
      console.error('Fetch dashboard error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Approved':
      case 'Selected':
      case 'Completed':
        return isDark
          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
          : 'bg-emerald-50 text-emerald-700 border-emerald-300';
      case 'Reviewing':
      case 'Shortlisted':
      case 'Reviewed':
        return isDark
          ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
          : 'bg-amber-50 text-amber-700 border-amber-300';
      default:
        return isDark
          ? 'bg-primary-500/10 text-primary-400 border-primary-500/30'
          : 'bg-blue-50 text-blue-700 border-blue-300';
    }
  };

  const getFileName = (url: string, index: number) => {
    if (!url) return `Document_${index + 1}.pdf`;
    if (url.startsWith('data:')) {
      const match = url.match(/name=([^;]+)/);
      if (match && match[1]) return decodeURIComponent(match[1]);
      return `Document_${index + 1}.pdf`;
    }
    return url.split('/').pop() || `Document_${index + 1}.pdf`;
  };

  if (loading) {
    return (
      <div className="py-32 text-center space-y-4">
        <div className="w-10 h-10 border-2 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className={`text-xs font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          Loading your verified portal data...
        </p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="py-24 max-w-md mx-auto px-4 text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-primary-500/10 border border-primary-500/30 text-primary-400 flex items-center justify-center mx-auto">
          <LogIn className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h1 className={`font-display font-bold text-2xl ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Authentication Required
          </h1>
          <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Please sign in with your Google, GitHub, or LinkedIn account to access your personal dashboard.
          </p>
        </div>
        <button
          onClick={() => setAuthModalOpen(true)}
          className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-primary-600 to-accent-cyan text-white font-bold text-xs shadow-neon-blue hover:scale-105 transition-transform"
        >
          Sign In to BreakX
        </button>
        <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
      </div>
    );
  }

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div
        className={`flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b ${
          isDark ? 'border-surface-border' : 'border-slate-200'
        }`}
      >
        <div>
          <div
            className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full border text-xs font-semibold mb-2 ${
              session.role === 'seeker'
                ? isDark
                  ? 'bg-accent-purple/10 border-accent-purple/30 text-accent-purple'
                  : 'bg-purple-50 border-purple-200 text-purple-700'
                : isDark
                ? 'bg-primary-500/10 border-primary-500/30 text-primary-400'
                : 'bg-blue-50 border-blue-200 text-blue-700'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="uppercase tracking-wider">
              {session.role === 'seeker' ? 'Talent Candidate Portal' : 'Client Partner Dashboard'}
            </span>
          </div>
          <h1
            className={`font-display font-black text-3xl sm:text-4xl ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            Welcome Back,{' '}
            <span
              className={
                session.role === 'seeker'
                  ? isDark ? 'text-accent-purple' : 'text-purple-600'
                  : isDark ? 'text-primary-400' : 'text-blue-600'
              }
            >
              {session.fullName || session.email}
            </span>
          </h1>
          <p className={`text-xs sm:text-sm mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            {session.role === 'seeker'
              ? 'Track your job applications, profile reviews, and recruitment status in real-time.'
              : 'Track your active project estimates, architecture proposals, and delivery milestones.'}
          </p>
        </div>

        {/* User Identity Info */}
        <div className="flex items-center space-x-3">
          <div
            className={`flex items-center space-x-3 px-4 py-2.5 rounded-2xl border ${
              isDark ? 'bg-surface-card border-surface-border' : 'bg-slate-50 border-slate-200 shadow-sm'
            }`}
          >
            {session.profilePicture && (
              <img
                src={session.profilePicture}
                alt={session.fullName}
                className="w-8 h-8 rounded-full object-cover border border-primary-400"
              />
            )}
            <div className="text-left">
              <div className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {session.fullName}
              </div>
              <div className={`text-[10px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                {session.email}
              </div>
            </div>
          </div>

          {session.role === 'admin' && (
            <Link
              href="/admin"
              className="px-4 py-2.5 rounded-2xl text-xs font-bold bg-amber-500/20 border border-amber-500/40 text-amber-600 hover:bg-amber-500/30"
            >
              Admin Portal →
            </Link>
          )}
        </div>
      </div>

      {/* Role-Specific View */}
      {session.role === 'client' ? (
        /* Client Requests Dashboard View (Strictly for Clients) */
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className={`font-display font-bold text-xl ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Your Project Proposals & Requests ({projectRequests.length})
            </h2>
            <Link
              href="/project-request"
              className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-500 text-white text-xs font-bold shadow-neon-blue transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span>New Project Request</span>
            </Link>
          </div>

          {projectRequests.length === 0 ? (
            <div
              className={`glass-card p-12 rounded-3xl text-center space-y-4 border ${
                isDark ? 'border-surface-border' : 'border-slate-200 bg-white shadow-md'
              }`}
            >
              <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                No project requests submitted under {session.email} yet.
              </p>
              <Link
                href="/project-request"
                className="inline-block px-6 py-3 rounded-xl bg-primary-600 text-white font-bold text-xs shadow-neon-blue"
              >
                Submit First Project Request
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {projectRequests.map((req) => {
                const files = req.attachedFiles ? JSON.parse(req.attachedFiles) : [];
                return (
                  <div
                    key={req.id}
                    className={`glass-card p-6 sm:p-8 rounded-3xl border space-y-4 relative overflow-hidden transition-colors ${
                      isDark ? 'border-surface-border' : 'border-slate-200 bg-white/90 shadow-md'
                    }`}
                  >
                    <div
                      className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b ${
                        isDark ? 'border-surface-border' : 'border-slate-200'
                      }`}
                    >
                      <div>
                        <div className="flex items-center space-x-3">
                          <h3 className={`font-display font-bold text-xl ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            {req.serviceRequired}
                          </h3>
                          <span
                            className={`px-3 py-1 rounded-full border text-xs font-bold ${getStatusBadge(
                              req.status
                            )}`}
                          >
                            ● {req.status}
                          </span>
                        </div>
                        <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                          Company: {req.companyName || 'N/A'} • Submitted:{' '}
                          {new Date(req.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className={`text-[11px] uppercase font-bold block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                          Budget
                        </span>
                        <span className={`font-bold text-sm ${isDark ? 'text-primary-400' : 'text-blue-600'}`}>
                          {req.projectBudget}
                        </span>
                      </div>
                    </div>

                    <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                      {req.projectDescription}
                    </p>

                    {files.length > 0 && (
                      <div className="pt-2">
                        <span className={`text-xs font-semibold block mb-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                          Attached Documents ({files.length}):
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {files.map((fileUrl: string, idx: number) => {
                            const fileName = getFileName(fileUrl, idx);
                            return (
                              <a
                                key={idx}
                                href={fileUrl}
                                download={fileName}
                                target="_blank"
                                rel="noreferrer"
                                className={`px-3 py-1.5 rounded-lg border text-xs flex items-center space-x-1.5 transition-colors ${
                                  isDark
                                    ? 'bg-surface border-surface-border text-primary-400 hover:text-white hover:border-primary-500'
                                    : 'bg-slate-50 border-slate-200 text-blue-600 hover:text-blue-800 hover:border-blue-400 shadow-sm'
                                }`}
                              >
                                <Download className="w-3.5 h-3.5 shrink-0" />
                                <span className="truncate max-w-[200px]">{fileName}</span>
                              </a>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ) : (
        /* Seeker Candidate Dashboard View (Strictly for Talent Seekers) */
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className={`font-display font-bold text-xl ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Your Job Applications ({seekerApplications.length})
            </h2>
            <Link
              href="/join-breakx"
              className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-accent-purple hover:bg-accent-purple/80 text-white text-xs font-bold shadow-neon-purple transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Submit Another Application</span>
            </Link>
          </div>

          {seekerApplications.length === 0 ? (
            <div
              className={`glass-card p-12 rounded-3xl text-center space-y-4 border ${
                isDark ? 'border-surface-border' : 'border-slate-200 bg-white shadow-md'
              }`}
            >
              <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                No candidate applications found under {session.email}.
              </p>
              <Link
                href="/join-breakx"
                className="inline-block px-6 py-3 rounded-xl bg-accent-purple text-white font-bold text-xs shadow-neon-purple"
              >
                Submit Candidate Application
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {seekerApplications.map((app) => {
                const resumeFileName = getFileName(app.resumeFile, 0);
                return (
                  <div
                    key={app.id}
                    className={`glass-card p-6 sm:p-8 rounded-3xl border space-y-4 transition-colors ${
                      isDark ? 'border-surface-border' : 'border-slate-200 bg-white/90 shadow-md'
                    }`}
                  >
                    <div
                      className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b ${
                        isDark ? 'border-surface-border' : 'border-slate-200'
                      }`}
                    >
                      <div>
                        <div className="flex items-center space-x-3">
                          <h3 className={`font-display font-bold text-xl ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            {app.role}
                          </h3>
                          <span
                            className={`px-3 py-1 rounded-full border text-xs font-bold ${getStatusBadge(
                              app.status
                            )}`}
                          >
                            ● {app.status}
                          </span>
                        </div>
                        <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                          Experience: {app.experience} • Applied:{' '}
                          {new Date(app.createdAt).toLocaleDateString()}
                        </p>
                      </div>

                      {app.resumeFile && (
                        <a
                          href={app.resumeFile}
                          download={resumeFileName}
                          target="_blank"
                          rel="noreferrer"
                          className={`px-4 py-2 rounded-xl border text-xs font-semibold flex items-center space-x-2 transition-colors ${
                            isDark
                              ? 'bg-surface border-surface-border text-primary-400 hover:text-white hover:border-primary-500'
                              : 'bg-slate-50 border-slate-200 text-blue-600 hover:text-blue-800 hover:border-blue-400 shadow-sm'
                          }`}
                        >
                          <Download className="w-4 h-4" />
                          <span>Download Submitted Resume</span>
                        </a>
                      )}
                    </div>

                    <p className={`text-xs sm:text-sm italic ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                      "{app.introduction}"
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
