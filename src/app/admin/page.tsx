'use client';

import React, { useState, useEffect } from 'react';
import { Shield, Sparkles, FileText, CheckCircle2, Clock, Filter, Eye, Edit3, Trash2, ExternalLink, Download, Search, AlertTriangle, Lock, Key, ArrowRight, LogOut } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

export default function AdminPortalPage() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'projects' | 'seekers'>('projects');
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [projectRequests, setProjectRequests] = useState<any[]>([]);
  const [opportunitySeekers, setOpportunitySeekers] = useState<any[]>([]);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('All');

  // Detail / Edit Modal state
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const [selectedSeeker, setSelectedSeeker] = useState<any | null>(null);
  const [internalNote, setInternalNote] = useState<string>('');
  const [updateStatus, setUpdateStatus] = useState<string>('');

  // Admin Login State
  const [adminIdInput, setAdminIdInput] = useState<string>('');
  const [adminPasswordInput, setAdminPasswordInput] = useState<string>('');
  const [authError, setAuthError] = useState<string>('');
  const [authLoading, setAuthLoading] = useState<boolean>(false);

  const getFileName = (url: string, defaultName: string) => {
    if (!url) return defaultName;
    if (url.startsWith('data:')) {
      const match = url.match(/name=([^;]+)/);
      if (match && match[1]) return decodeURIComponent(match[1]);
      return `${defaultName}.pdf`;
    }
    return url.split('/').pop() || `${defaultName}.pdf`;
  };

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      const meRes = await fetch('/api/auth/me');
      const meData = await meRes.json();
      setSession(meData.user);

      if (meData.user && meData.user.role === 'admin') {
        const [pRes, sRes] = await Promise.all([
          fetch('/api/project-requests'),
          fetch('/api/opportunity-seekers'),
        ]);

        const pData = await pRes.json();
        const sData = await sRes.json();

        if (pData.requests) setProjectRequests(pData.requests);
        if (sData.seekers) setOpportunitySeekers(sData.seekers);
      }
    } catch (err) {
      console.error('Fetch admin error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  const handleAdminFormLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          role: 'admin',
          email: adminIdInput,
          password: adminPasswordInput,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Invalid Admin credentials. Access denied.');
      }

      await fetchAdminData();
    } catch (err: any) {
      setAuthError(err.message || 'Authentication failed');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleAdminLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    window.location.reload();
  };

  const handleUpdateProject = async (id: string) => {
    try {
      const res = await fetch(`/api/project-requests/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: updateStatus,
          internalNotes: internalNote,
        }),
      });
      if (res.ok) {
        setSelectedProject(null);
        fetchAdminData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateSeeker = async (id: string) => {
    try {
      const res = await fetch(`/api/opportunity-seekers/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: updateStatus,
          internalNotes: internalNote,
        }),
      });
      if (res.ok) {
        setSelectedSeeker(null);
        fetchAdminData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filteredProjects = projectRequests.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.companyName && p.companyName.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = statusFilter === 'All' || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredSeekers = opportunitySeekers.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || s.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="py-24 text-center space-y-3">
        <div className="w-8 h-8 border-2 border-accent-purple border-t-transparent rounded-full animate-spin mx-auto" />
        <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Verifying Admin permissions...</p>
      </div>
    );
  }

  // Admin Login Guard
  if (!session || session.role !== 'admin') {
    return (
      <div className="py-20 max-w-md mx-auto px-4">
        <div
          className={`border-2 rounded-3xl p-6 sm:p-8 space-y-6 relative overflow-hidden transition-colors ${
            isDark
              ? 'bg-[#030712] border-purple-500/50 shadow-[0_0_50px_rgba(168,85,247,0.3)]'
              : 'bg-white border-purple-200 shadow-[0_20px_50px_rgba(168,85,247,0.15)]'
          }`}
        >
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-purple-500/10 rounded-full filter blur-3xl pointer-events-none" />

          <div className="text-center space-y-2">
            <div
              className={`w-14 h-14 rounded-2xl border flex items-center justify-center mx-auto ${
                isDark
                  ? 'bg-purple-500/10 border-purple-500/30 text-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.3)]'
                  : 'bg-purple-100 border-purple-300 text-purple-700 shadow-sm'
              }`}
            >
              <Shield className="w-7 h-7" />
            </div>
            <h1 className={`font-display font-bold text-2xl ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Admin Authentication
            </h1>
            <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Restricted management console. Enter administrator credentials to proceed.
            </p>
          </div>

          {authError && (
            <div className="p-3.5 rounded-2xl bg-red-500/15 border border-red-500/40 text-red-500 text-xs font-semibold">
              {authError}
            </div>
          )}

          <form onSubmit={handleAdminFormLogin} className="space-y-4">
            <div>
              <label className={`text-xs font-bold mb-1.5 block ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                Admin ID
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={adminIdInput}
                  onChange={(e) => setAdminIdInput(e.target.value)}
                  placeholder="Enter administrator ID"
                  className={`w-full px-4 py-3 rounded-2xl border text-sm focus:outline-none focus:border-purple-400 transition-colors pl-10 ${
                    isDark
                      ? 'bg-surface-card border-surface-border text-white'
                      : 'bg-white border-slate-200 text-slate-900'
                  }`}
                />
                <Shield className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              </div>
            </div>

            <div>
              <label className={`text-xs font-bold mb-1.5 block ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={adminPasswordInput}
                  onChange={(e) => setAdminPasswordInput(e.target.value)}
                  placeholder="Enter password"
                  className={`w-full px-4 py-3 rounded-2xl border text-sm focus:outline-none focus:border-purple-400 transition-colors pl-10 ${
                    isDark
                      ? 'bg-surface-card border-surface-border text-white'
                      : 'bg-white border-slate-200 text-slate-900'
                  }`}
                />
                <Key className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              </div>
            </div>

            <button
              type="submit"
              disabled={authLoading}
              className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-sm shadow-[0_0_25px_rgba(168,85,247,0.5)] hover:scale-[1.02] transition-all flex items-center justify-center space-x-2 mt-2"
            >
              {authLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Sign In to Admin Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Admin Header with Tab Switcher and Sign Out Button */}
      <div
        className={`flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b ${
          isDark ? 'border-surface-border' : 'border-slate-200'
        }`}
      >
        <div className="space-y-1">
          <div
            className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full border text-xs font-semibold ${
              isDark
                ? 'bg-accent-purple/10 border-accent-purple/30 text-accent-purple'
                : 'bg-purple-50 border-purple-200 text-purple-700'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>CENTRALIZED ADMIN MANAGEMENT PORTAL</span>
          </div>
          <h1 className={`font-display font-black text-3xl ${isDark ? 'text-white' : 'text-slate-900'}`}>
            BreakX System Overview
          </h1>
        </div>

        {/* Controls & Sign Out */}
        <div className="flex flex-wrap items-center gap-3">
          <div
            className={`flex items-center space-x-2 p-1.5 rounded-2xl border ${
              isDark ? 'bg-surface-card border-surface-border' : 'bg-slate-100 border-slate-200 shadow-sm'
            }`}
          >
            <button
              onClick={() => {
                setActiveTab('projects');
                setStatusFilter('All');
              }}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'projects'
                  ? 'bg-primary-600 text-white shadow-neon-blue'
                  : isDark
                  ? 'text-slate-400 hover:text-white'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Projects Management ({projectRequests.length})
            </button>
            <button
              onClick={() => {
                setActiveTab('seekers');
                setStatusFilter('All');
              }}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'seekers'
                  ? 'bg-accent-purple text-white shadow-neon-purple'
                  : isDark
                  ? 'text-slate-400 hover:text-white'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Talent Candidates ({opportunitySeekers.length})
            </button>
          </div>

          <button
            onClick={handleAdminLogout}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-2xl border text-xs font-bold transition-all shadow-sm hover:scale-105 ${
              isDark
                ? 'bg-red-500/15 border-red-500/40 text-red-300 hover:bg-red-500/25'
                : 'bg-red-50 border-red-200 text-red-700 hover:bg-red-100'
            }`}
            title="Sign Out of Admin"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Analytics Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          className={`glass-card p-6 rounded-2xl space-y-2 border ${
            isDark ? 'border-surface-border' : 'border-slate-200 bg-white/90 shadow-md'
          }`}
        >
          <span className={`text-[11px] uppercase font-bold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Total Project Leads
          </span>
          <div className={`font-display font-black text-3xl ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {projectRequests.length}
          </div>
          <p className="text-[11px] text-emerald-600 font-semibold">+24% Lead Growth this month</p>
        </div>

        <div
          className={`glass-card p-6 rounded-2xl space-y-2 border ${
            isDark ? 'border-surface-border' : 'border-slate-200 bg-white/90 shadow-md'
          }`}
        >
          <span className={`text-[11px] uppercase font-bold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Talent Applicants
          </span>
          <div className={`font-display font-black text-3xl ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {opportunitySeekers.length}
          </div>
          <p className={`text-[11px] font-semibold ${isDark ? 'text-accent-cyan' : 'text-blue-600'}`}>
            Active talent pool
          </p>
        </div>

        <div
          className={`glass-card p-6 rounded-2xl space-y-2 border ${
            isDark ? 'border-surface-border' : 'border-slate-200 bg-white/90 shadow-md'
          }`}
        >
          <span className={`text-[11px] uppercase font-bold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Approved Pipeline Value
          </span>
          <div className={`font-display font-black text-3xl ${isDark ? 'text-primary-400' : 'text-blue-600'}`}>
            $350,000+
          </div>
          <p className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Based on submitted estimates</p>
        </div>

        <div
          className={`glass-card p-6 rounded-2xl space-y-2 border ${
            isDark ? 'border-surface-border' : 'border-slate-200 bg-white/90 shadow-md'
          }`}
        >
          <span className={`text-[11px] uppercase font-bold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            System SLA Uptime
          </span>
          <div className="font-display font-black text-3xl text-emerald-600">99.98%</div>
          <p className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>WebGL canvas & API pipeline</p>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div
        className={`flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl border ${
          isDark ? 'bg-surface-card/60 border-surface-border' : 'bg-slate-50 border-slate-200'
        }`}
      >
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search records by name, email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pl-10 pr-4 py-2 rounded-xl border text-xs focus:outline-none focus:border-primary-500 ${
              isDark
                ? 'bg-surface border-surface-border text-white'
                : 'bg-white border-slate-200 text-slate-900'
            }`}
          />
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-400 shrink-0" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className={`px-3 py-2 rounded-xl border text-xs focus:outline-none ${
              isDark
                ? 'bg-surface border-surface-border text-white'
                : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            <option value="All">All Statuses</option>
            {activeTab === 'projects' ? (
              <>
                <option value="Pending">Pending</option>
                <option value="Reviewing">Reviewing</option>
                <option value="Approved">Approved</option>
                <option value="Completed">Completed</option>
              </>
            ) : (
              <>
                <option value="New">New</option>
                <option value="Shortlisted">Shortlisted</option>
                <option value="Selected">Selected</option>
              </>
            )}
          </select>
        </div>
      </div>

      {/* Data Table */}
      {activeTab === 'projects' ? (
        <div
          className={`glass-card rounded-3xl border overflow-hidden ${
            isDark ? 'border-surface-border' : 'border-slate-200 bg-white/90 shadow-md'
          }`}
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr
                  className={`border-b text-[11px] uppercase tracking-wider font-bold ${
                    isDark
                      ? 'border-surface-border bg-surface-card/80 text-slate-400'
                      : 'border-slate-200 bg-slate-100 text-slate-700'
                  }`}
                >
                  <th className="p-4">Client / Company</th>
                  <th className="p-4">Service</th>
                  <th className="p-4">Budget</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Date</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody
                className={`divide-y text-xs ${
                  isDark
                    ? 'divide-surface-border/60 text-slate-300'
                    : 'divide-slate-200 text-slate-700'
                }`}
              >
                {filteredProjects.map((p) => (
                  <tr
                    key={p.id}
                    className={`transition-colors ${
                      isDark ? 'hover:bg-surface-card/40' : 'hover:bg-blue-50/50'
                    }`}
                  >
                    <td className="p-4">
                      <div className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{p.name}</div>
                      <div className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                        {p.email} • {p.companyName || 'N/A'}
                      </div>
                    </td>
                    <td className={`p-4 font-semibold ${isDark ? 'text-primary-400' : 'text-blue-600'}`}>
                      {p.serviceRequired}
                    </td>
                    <td className={`p-4 font-mono font-bold ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>
                      {p.projectBudget}
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${
                          isDark
                            ? 'bg-primary-500/10 text-primary-400 border-primary-500/30'
                            : 'bg-blue-50 text-blue-700 border-blue-200'
                        }`}
                      >
                        {p.status}
                      </span>
                    </td>
                    <td className={`p-4 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      {new Date(p.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => {
                          setSelectedProject(p);
                          setUpdateStatus(p.status);
                          setInternalNote(p.internalNotes || '');
                        }}
                        className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition-colors ${
                          isDark
                            ? 'bg-surface border-surface-border text-white hover:border-primary-500'
                            : 'bg-white border-slate-200 text-slate-800 hover:border-blue-500 shadow-sm'
                        }`}
                      >
                        Inspect & Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div
          className={`glass-card rounded-3xl border overflow-hidden ${
            isDark ? 'border-surface-border' : 'border-slate-200 bg-white/90 shadow-md'
          }`}
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr
                  className={`border-b text-[11px] uppercase tracking-wider font-bold ${
                    isDark
                      ? 'border-surface-border bg-surface-card/80 text-slate-400'
                      : 'border-slate-200 bg-slate-100 text-slate-700'
                  }`}
                >
                  <th className="p-4">Candidate</th>
                  <th className="p-4">Target Role</th>
                  <th className="p-4">Experience</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Resume</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody
                className={`divide-y text-xs ${
                  isDark
                    ? 'divide-surface-border/60 text-slate-300'
                    : 'divide-slate-200 text-slate-700'
                }`}
              >
                {filteredSeekers.map((s) => (
                  <tr
                    key={s.id}
                    className={`transition-colors ${
                      isDark ? 'hover:bg-surface-card/40' : 'hover:bg-purple-50/50'
                    }`}
                  >
                    <td className="p-4">
                      <div className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{s.name}</div>
                      <div className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                        {s.email} • {s.phone}
                      </div>
                    </td>
                    <td className={`p-4 font-semibold ${isDark ? 'text-accent-purple' : 'text-purple-700'}`}>
                      {s.role}
                    </td>
                    <td className="p-4">{s.experience}</td>
                    <td className="p-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${
                          isDark
                            ? 'bg-accent-purple/10 text-accent-purple border-accent-purple/30'
                            : 'bg-purple-50 text-purple-700 border-purple-200'
                        }`}
                      >
                        {s.status}
                      </span>
                    </td>
                    <td className="p-4">
                      {s.resumeFile && (
                        <a
                          href={s.resumeFile}
                          download={getFileName(s.resumeFile, `${s.name.replace(/\s+/g, '_')}_Resume`)}
                          target="_blank"
                          rel="noreferrer"
                          className={`text-xs font-semibold flex items-center space-x-1 ${
                            isDark ? 'text-primary-400 hover:underline' : 'text-blue-600 hover:underline'
                          }`}
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Download</span>
                        </a>
                      )}
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => {
                          setSelectedSeeker(s);
                          setUpdateStatus(s.status);
                          setInternalNote(s.internalNotes || '');
                        }}
                        className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition-colors ${
                          isDark
                            ? 'bg-surface border-surface-border text-white hover:border-accent-purple'
                            : 'bg-white border-slate-200 text-slate-800 hover:border-purple-500 shadow-sm'
                        }`}
                      >
                        Inspect & Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Inspect & Edit Project Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div
            className={`border rounded-3xl max-w-xl w-full p-6 space-y-6 shadow-2xl ${
              isDark
                ? 'bg-surface border-surface-border'
                : 'bg-white border-slate-200'
            }`}
          >
            <div
              className={`flex items-center justify-between pb-4 border-b ${
                isDark ? 'border-surface-border' : 'border-slate-200'
              }`}
            >
              <h3 className={`font-display font-bold text-xl ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Project Request Details
              </h3>
              <button
                onClick={() => setSelectedProject(null)}
                className={`transition-colors ${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'}`}
              >
                ✕
              </button>
            </div>

            <div className={`space-y-3 text-xs ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              <div>
                <span className={`font-bold ${isDark ? 'text-slate-400' : 'text-slate-900'}`}>Client:</span>{' '}
                {selectedProject.name} ({selectedProject.email})
              </div>
              <div>
                <span className={`font-bold ${isDark ? 'text-slate-400' : 'text-slate-900'}`}>Company:</span>{' '}
                {selectedProject.companyName || 'N/A'}
              </div>
              <div>
                <span className={`font-bold ${isDark ? 'text-slate-400' : 'text-slate-900'}`}>Service:</span>{' '}
                {selectedProject.serviceRequired}
              </div>
              <div>
                <span className={`font-bold ${isDark ? 'text-slate-400' : 'text-slate-900'}`}>Description:</span>{' '}
                {selectedProject.projectDescription}
              </div>

              {/* Attached Project Files */}
              {selectedProject.attachedFiles && (
                <div>
                  <span className={`font-bold block mb-1.5 ${isDark ? 'text-slate-400' : 'text-slate-900'}`}>
                    Attached Documents:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {(() => {
                      try {
                        const parsed = JSON.parse(selectedProject.attachedFiles);
                        if (!Array.isArray(parsed) || parsed.length === 0) {
                          return <span className="text-slate-500 italic">None attached</span>;
                        }
                        return parsed.map((fileUrl: string, idx: number) => {
                          const fileName = getFileName(fileUrl, `Document_${idx + 1}`);
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
                              <span className="truncate max-w-[180px]">{fileName}</span>
                            </a>
                          );
                        });
                      } catch {
                        return <span className="text-slate-500 italic">None attached</span>;
                      }
                    })()}
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className={`text-xs font-bold block mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                Update Status
              </label>
              <select
                value={updateStatus}
                onChange={(e) => setUpdateStatus(e.target.value)}
                className={`w-full px-3 py-2 rounded-xl border text-xs focus:outline-none ${
                  isDark
                    ? 'bg-surface-card border-surface-border text-white'
                    : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
              >
                <option value="Pending">Pending</option>
                <option value="Reviewing">Reviewing</option>
                <option value="Approved">Approved</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <div>
              <label className={`text-xs font-bold block mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                Internal Administrator Notes
              </label>
              <textarea
                rows={3}
                value={internalNote}
                onChange={(e) => setInternalNote(e.target.value)}
                className={`w-full px-3 py-2 rounded-xl border text-xs focus:outline-none ${
                  isDark
                    ? 'bg-surface-card border-surface-border text-white'
                    : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
                placeholder="Add confidential notes for team..."
              />
            </div>

            <div
              className={`flex items-center justify-end space-x-3 pt-4 border-t ${
                isDark ? 'border-surface-border' : 'border-slate-200'
              }`}
            >
              <button
                onClick={() => setSelectedProject(null)}
                className={`px-4 py-2 rounded-xl border text-xs ${
                  isDark ? 'bg-surface border-surface-border text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-700'
                }`}
              >
                Cancel
              </button>
              <button
                onClick={() => handleUpdateProject(selectedProject.id)}
                className="px-4 py-2 rounded-xl bg-primary-600 text-white font-bold text-xs shadow-neon-blue"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Inspect & Edit Seeker Modal */}
      {selectedSeeker && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div
            className={`border rounded-3xl max-w-xl w-full p-6 space-y-6 shadow-2xl ${
              isDark
                ? 'bg-surface border-surface-border'
                : 'bg-white border-slate-200'
            }`}
          >
            <div
              className={`flex items-center justify-between pb-4 border-b ${
                isDark ? 'border-surface-border' : 'border-slate-200'
              }`}
            >
              <h3 className={`font-display font-bold text-xl ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Candidate Details
              </h3>
              <button
                onClick={() => setSelectedSeeker(null)}
                className={`transition-colors ${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'}`}
              >
                ✕
              </button>
            </div>

            <div className={`space-y-3 text-xs ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              <div>
                <span className={`font-bold ${isDark ? 'text-slate-400' : 'text-slate-900'}`}>Candidate:</span>{' '}
                {selectedSeeker.name} ({selectedSeeker.email})
              </div>
              <div>
                <span className={`font-bold ${isDark ? 'text-slate-400' : 'text-slate-900'}`}>Phone:</span>{' '}
                {selectedSeeker.phone}
              </div>
              <div>
                <span className={`font-bold ${isDark ? 'text-slate-400' : 'text-slate-900'}`}>Role & Exp:</span>{' '}
                {selectedSeeker.role} • {selectedSeeker.experience}
              </div>
              <div>
                <span className={`font-bold ${isDark ? 'text-slate-400' : 'text-slate-900'}`}>Intro:</span>{' '}
                {selectedSeeker.introduction}
              </div>

              {/* Resume Download Action */}
              {selectedSeeker.resumeFile && (
                <div>
                  <span className={`font-bold block mb-1.5 ${isDark ? 'text-slate-400' : 'text-slate-900'}`}>
                    Resume Document:
                  </span>
                  <a
                    href={selectedSeeker.resumeFile}
                    download={getFileName(selectedSeeker.resumeFile, `${selectedSeeker.name.replace(/\s+/g, '_')}_Resume`)}
                    target="_blank"
                    rel="noreferrer"
                    className={`inline-flex items-center space-x-2 px-4 py-2 rounded-xl border text-xs font-bold transition-all ${
                      isDark
                        ? 'bg-accent-purple/15 border-accent-purple/40 text-accent-purple hover:bg-accent-purple/25'
                        : 'bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100 shadow-sm'
                    }`}
                  >
                    <Download className="w-4 h-4" />
                    <span>Download {selectedSeeker.name}'s Resume</span>
                  </a>
                </div>
              )}
            </div>

            <div>
              <label className={`text-xs font-bold block mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                Update Candidate Status
              </label>
              <select
                value={updateStatus}
                onChange={(e) => setUpdateStatus(e.target.value)}
                className={`w-full px-3 py-2 rounded-xl border text-xs focus:outline-none ${
                  isDark
                    ? 'bg-surface-card border-surface-border text-white'
                    : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
              >
                <option value="New">New</option>
                <option value="Shortlisted">Shortlisted</option>
                <option value="Selected">Selected</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

            <div>
              <label className={`text-xs font-bold block mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                Internal Candidate Notes
              </label>
              <textarea
                rows={3}
                value={internalNote}
                onChange={(e) => setInternalNote(e.target.value)}
                className={`w-full px-3 py-2 rounded-xl border text-xs focus:outline-none ${
                  isDark
                    ? 'bg-surface-card border-surface-border text-white'
                    : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
                placeholder="Add interview notes..."
              />
            </div>

            <div
              className={`flex items-center justify-end space-x-3 pt-4 border-t ${
                isDark ? 'border-surface-border' : 'border-slate-200'
              }`}
            >
              <button
                onClick={() => setSelectedSeeker(null)}
                className={`px-4 py-2 rounded-xl border text-xs ${
                  isDark ? 'bg-surface border-surface-border text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-700'
                }`}
              >
                Cancel
              </button>
              <button
                onClick={() => handleUpdateSeeker(selectedSeeker.id)}
                className="px-4 py-2 rounded-xl bg-accent-purple text-white font-bold text-xs shadow-neon-purple"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
