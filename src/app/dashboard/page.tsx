'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sparkles, FileText, CheckCircle2, Clock, ShieldAlert, Download, ExternalLink, PlusCircle, User, Briefcase, RefreshCw } from 'lucide-react';

export default function DashboardPage() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeRole, setActiveRole] = useState<'client' | 'seeker'>('client');
  const [projectRequests, setProjectRequests] = useState<any[]>([]);
  const [seekerApplications, setSeekerApplications] = useState<any[]>([]);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const meRes = await fetch('/api/auth/me');
      const meData = await meRes.json();

      if (meData.user) {
        setSession(meData.user);
        setActiveRole(meData.user.role === 'seeker' ? 'seeker' : 'client');
      }

      // Fetch requests and applications
      const [pRes, sRes] = await Promise.all([
        fetch('/api/project-requests'),
        fetch('/api/opportunity-seekers'),
      ]);

      const pData = await pRes.json();
      const sData = await sRes.json();

      if (pData.requests) setProjectRequests(pData.requests);
      if (sData.seekers) setSeekerApplications(sData.seekers);
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
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'Reviewing':
      case 'Shortlisted':
      case 'Reviewed':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      default:
        return 'bg-primary-500/10 text-primary-400 border-primary-500/30';
    }
  };

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-surface-border">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-primary-500/10 border border-primary-500/30 text-primary-400 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>USER PORTAL DASHBOARD</span>
          </div>
          <h1 className="font-display font-black text-3xl sm:text-4xl text-white">
            Welcome Back, <span className="text-primary-400">{session?.fullName || 'BreakX Partner'}</span>
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm">
            Track your active proposals, project milestones, and candidate application states in real-time.
          </p>
        </div>

        {/* View Role Switcher */}
        <div className="flex items-center space-x-2 bg-surface-card p-1.5 rounded-2xl border border-surface-border">
          <button
            onClick={() => setActiveRole('client')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center space-x-2 transition-all ${
              activeRole === 'client'
                ? 'bg-primary-600 text-white shadow-neon-blue'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>Client View</span>
          </button>
          <button
            onClick={() => setActiveRole('seeker')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center space-x-2 transition-all ${
              activeRole === 'seeker'
                ? 'bg-accent-purple text-white shadow-neon-purple'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Talent Seeker View</span>
          </button>
          {session?.role === 'admin' && (
            <Link
              href="/admin"
              className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-500/20 border border-amber-500/40 text-amber-300 hover:bg-amber-500/30"
            >
              Admin Portal →
            </Link>
          )}
        </div>
      </div>

      {loading ? (
        <div className="py-24 text-center space-y-3">
          <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-slate-400">Loading your real-time portal data...</p>
        </div>
      ) : activeRole === 'client' ? (
        /* Client Requests Dashboard View */
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="font-display font-bold text-xl text-white">Your Project Proposals & Requests</h2>
            <Link
              href="/project-request"
              className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-500 text-white text-xs font-bold shadow-neon-blue transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span>New Project Request</span>
            </Link>
          </div>

          {projectRequests.length === 0 ? (
            <div className="glass-card p-12 rounded-3xl text-center space-y-4">
              <p className="text-slate-400 text-sm">No project requests found for your account.</p>
              <Link
                href="/project-request"
                className="inline-block px-6 py-3 rounded-xl bg-primary-600 text-white font-bold text-xs shadow-neon-blue"
              >
                Submit First Request
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {projectRequests.map((req) => {
                const files = req.attachedFiles ? JSON.parse(req.attachedFiles) : [];
                return (
                  <div
                    key={req.id}
                    className="glass-card p-6 sm:p-8 rounded-3xl border border-surface-border space-y-4 relative overflow-hidden"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-surface-border">
                      <div>
                        <div className="flex items-center space-x-3">
                          <h3 className="font-display font-bold text-xl text-white">{req.serviceRequired}</h3>
                          <span
                            className={`px-3 py-1 rounded-full border text-xs font-bold ${getStatusBadge(
                              req.status
                            )}`}
                          >
                            ● {req.status}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">
                          Company: {req.companyName || 'N/A'} • Submitted:{' '}
                          {new Date(req.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-[11px] uppercase font-bold text-slate-400 block">Budget</span>
                        <span className="font-bold text-primary-400 text-sm">{req.projectBudget}</span>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {req.projectDescription}
                    </p>

                    {files.length > 0 && (
                      <div className="pt-2">
                        <span className="text-xs font-semibold text-slate-400 block mb-2">Attached Documents:</span>
                        <div className="flex flex-wrap gap-2">
                          {files.map((fileUrl: string, idx: number) => (
                            <a
                              key={idx}
                              href={fileUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="px-3 py-1.5 rounded-lg bg-surface border border-surface-border text-xs text-primary-400 hover:text-white flex items-center space-x-1"
                            >
                              <FileText className="w-3.5 h-3.5" />
                              <span className="truncate max-w-[180px]">{fileUrl.split('/').pop()}</span>
                            </a>
                          ))}
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
        /* Seeker Candidate Dashboard View */
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="font-display font-bold text-xl text-white">Your Candidate Applications</h2>
            <Link
              href="/join-breakx"
              className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-accent-purple hover:bg-accent-purple/80 text-white text-xs font-bold shadow-neon-purple transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Apply for New Role</span>
            </Link>
          </div>

          {seekerApplications.length === 0 ? (
            <div className="glass-card p-12 rounded-3xl text-center space-y-4">
              <p className="text-slate-400 text-sm">No applications found for your account.</p>
              <Link
                href="/join-breakx"
                className="inline-block px-6 py-3 rounded-xl bg-accent-purple text-white font-bold text-xs shadow-neon-purple"
              >
                Submit Candidate Application
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {seekerApplications.map((app) => (
                <div
                  key={app.id}
                  className="glass-card p-6 sm:p-8 rounded-3xl border border-surface-border space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-surface-border">
                    <div>
                      <div className="flex items-center space-x-3">
                        <h3 className="font-display font-bold text-xl text-white">{app.role}</h3>
                        <span
                          className={`px-3 py-1 rounded-full border text-xs font-bold ${getStatusBadge(
                            app.status
                          )}`}
                        >
                          ● {app.status}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1">
                        Experience: {app.experience} • Applied:{' '}
                        {new Date(app.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                    {app.resumeFile && (
                      <a
                        href={app.resumeFile}
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2 rounded-xl bg-surface border border-surface-border text-xs font-semibold text-primary-400 hover:text-white flex items-center space-x-2"
                      >
                        <Download className="w-4 h-4" />
                        <span>Preview Uploaded Resume</span>
                      </a>
                    )}
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 italic">
                    "{app.introduction}"
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
