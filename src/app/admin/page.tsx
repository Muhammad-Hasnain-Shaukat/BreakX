'use client';

import React, { useState, useEffect } from 'react';
import { Shield, Sparkles, FileText, CheckCircle2, Clock, Filter, Eye, Edit3, Trash2, ExternalLink, Download, Search, AlertTriangle, Lock, Key, ArrowRight, LogOut } from 'lucide-react';

export default function AdminPortalPage() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'projects' | 'seekers'>('projects');

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

  // Admin Login State (Empty by default, No Autowrite)
  const [adminIdInput, setAdminIdInput] = useState<string>('');
  const [adminPasswordInput, setAdminPasswordInput] = useState<string>('');
  const [authError, setAuthError] = useState<string>('');
  const [authLoading, setAuthLoading] = useState<boolean>(false);

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
        <p className="text-xs text-slate-400">Verifying Admin permissions...</p>
      </div>
    );
  }

  // Admin Login Guard: Clean ID & Password Authentication Form (Zero Autowrite & Zero Displayed Credentials)
  if (!session || session.role !== 'admin') {
    return (
      <div className="py-20 max-w-md mx-auto px-4">
        <div className="bg-[#030712] border-2 border-purple-500/50 rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(168,85,247,0.3)] space-y-6 relative overflow-hidden">
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-purple-500/10 rounded-full filter blur-3xl pointer-events-none" />

          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/30 text-purple-400 flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(168,85,247,0.3)]">
              <Shield className="w-7 h-7" />
            </div>
            <h1 className="font-display font-bold text-2xl text-white">Admin Authentication</h1>
            <p className="text-slate-400 text-xs">
              Restricted management console. Enter administrator credentials to proceed.
            </p>
          </div>

          {authError && (
            <div className="p-3.5 rounded-2xl bg-red-500/15 border border-red-500/40 text-red-400 text-xs font-semibold">
              {authError}
            </div>
          )}

          <form onSubmit={handleAdminFormLogin} className="space-y-4">
            <div>
              <label className="text-xs text-slate-300 font-bold mb-1.5 block">Admin ID</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={adminIdInput}
                  onChange={(e) => setAdminIdInput(e.target.value)}
                  placeholder="Enter administrator ID"
                  className="w-full px-4 py-3 rounded-2xl bg-surface-card border border-surface-border text-white text-sm focus:outline-none focus:border-purple-400 transition-colors pl-10"
                />
                <Shield className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              </div>
            </div>

            <div>
              <label className="text-xs text-slate-300 font-bold mb-1.5 block">Password</label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={adminPasswordInput}
                  onChange={(e) => setAdminPasswordInput(e.target.value)}
                  placeholder="Enter password"
                  className="w-full px-4 py-3 rounded-2xl bg-surface-card border border-surface-border text-white text-sm focus:outline-none focus:border-purple-400 transition-colors pl-10"
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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-surface-border">
        <div className="space-y-1">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-accent-purple/10 border border-accent-purple/30 text-accent-purple text-xs font-semibold">
            <Shield className="w-3.5 h-3.5" />
            <span>CENTRALIZED ADMIN MANAGEMENT PORTAL</span>
          </div>
          <h1 className="font-display font-black text-3xl text-white">BreakX System Overview</h1>
        </div>

        {/* Controls & Sign Out */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center space-x-2 bg-surface-card p-1.5 rounded-2xl border border-surface-border">
            <button
              onClick={() => {
                setActiveTab('projects');
                setStatusFilter('All');
              }}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'projects'
                  ? 'bg-primary-600 text-white shadow-neon-blue'
                  : 'text-slate-400 hover:text-white'
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
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Talent Candidates ({opportunitySeekers.length})
            </button>
          </div>

          <button
            onClick={handleAdminLogout}
            className="flex items-center space-x-2 px-4 py-2.5 rounded-2xl bg-red-500/15 border border-red-500/40 text-red-300 hover:bg-red-500/25 text-xs font-bold transition-all shadow-sm hover:scale-105"
            title="Sign Out of Admin"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Analytics Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-card p-6 rounded-2xl space-y-2">
          <span className="text-[11px] uppercase font-bold text-slate-400">Total Project Leads</span>
          <div className="font-display font-black text-3xl text-white">{projectRequests.length}</div>
          <p className="text-[11px] text-emerald-400 font-semibold">+24% Lead Growth this month</p>
        </div>

        <div className="glass-card p-6 rounded-2xl space-y-2">
          <span className="text-[11px] uppercase font-bold text-slate-400">Talent Applicants</span>
          <div className="font-display font-black text-3xl text-white">{opportunitySeekers.length}</div>
          <p className="text-[11px] text-accent-cyan font-semibold">Active talent pool</p>
        </div>

        <div className="glass-card p-6 rounded-2xl space-y-2">
          <span className="text-[11px] uppercase font-bold text-slate-400">Approved Pipeline Value</span>
          <div className="font-display font-black text-3xl text-primary-400">$350,000+</div>
          <p className="text-[11px] text-slate-400">Based on submitted estimates</p>
        </div>

        <div className="glass-card p-6 rounded-2xl space-y-2">
          <span className="text-[11px] uppercase font-bold text-slate-400">System SLA Uptime</span>
          <div className="font-display font-black text-3xl text-emerald-400">99.98%</div>
          <p className="text-[11px] text-slate-400">WebGL canvas & API pipeline</p>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-surface-card/60 p-4 rounded-2xl border border-surface-border">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search records by name, email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-surface border border-surface-border text-white text-xs focus:outline-none focus:border-primary-500"
          />
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-400 shrink-0" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-surface border border-surface-border text-white text-xs focus:outline-none"
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
        <div className="glass-card rounded-3xl border border-surface-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-surface-border bg-surface-card/80 text-[11px] uppercase tracking-wider text-slate-400 font-bold">
                  <th className="p-4">Client / Company</th>
                  <th className="p-4">Service</th>
                  <th className="p-4">Budget</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Date</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-border/60 text-xs text-slate-300">
                {filteredProjects.map((p) => (
                  <tr key={p.id} className="hover:bg-surface-card/40 transition-colors">
                    <td className="p-4">
                      <div className="font-bold text-white">{p.name}</div>
                      <div className="text-[11px] text-slate-400">{p.email} • {p.companyName || 'N/A'}</div>
                    </td>
                    <td className="p-4 font-semibold text-primary-400">{p.serviceRequired}</td>
                    <td className="p-4 font-mono font-bold text-slate-200">{p.projectBudget}</td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-primary-500/10 text-primary-400 border border-primary-500/30">
                        {p.status}
                      </span>
                    </td>
                    <td className="p-4 text-slate-400">{new Date(p.createdAt).toLocaleDateString()}</td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => {
                          setSelectedProject(p);
                          setUpdateStatus(p.status);
                          setInternalNote(p.internalNotes || '');
                        }}
                        className="px-3 py-1.5 rounded-lg bg-surface border border-surface-border text-xs font-semibold text-white hover:border-primary-500"
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
        <div className="glass-card rounded-3xl border border-surface-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-surface-border bg-surface-card/80 text-[11px] uppercase tracking-wider text-slate-400 font-bold">
                  <th className="p-4">Candidate</th>
                  <th className="p-4">Target Role</th>
                  <th className="p-4">Experience</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Resume</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-border/60 text-xs text-slate-300">
                {filteredSeekers.map((s) => (
                  <tr key={s.id} className="hover:bg-surface-card/40 transition-colors">
                    <td className="p-4">
                      <div className="font-bold text-white">{s.name}</div>
                      <div className="text-[11px] text-slate-400">{s.email} • {s.phone}</div>
                    </td>
                    <td className="p-4 font-semibold text-accent-purple">{s.role}</td>
                    <td className="p-4">{s.experience}</td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-accent-purple/10 text-accent-purple border border-accent-purple/30">
                        {s.status}
                      </span>
                    </td>
                    <td className="p-4">
                      {s.resumeFile && (
                        <a
                          href={s.resumeFile}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs font-semibold text-primary-400 hover:underline flex items-center space-x-1"
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
                        className="px-3 py-1.5 rounded-lg bg-surface border border-surface-border text-xs font-semibold text-white hover:border-accent-purple"
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
          <div className="bg-surface border border-surface-border rounded-3xl max-w-xl w-full p-6 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-surface-border">
              <h3 className="font-display font-bold text-xl text-white">Project Request Details</h3>
              <button onClick={() => setSelectedProject(null)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <div className="space-y-3 text-xs text-slate-300">
              <div><span className="text-slate-400 font-bold">Client:</span> {selectedProject.name} ({selectedProject.email})</div>
              <div><span className="text-slate-400 font-bold">Company:</span> {selectedProject.companyName || 'N/A'}</div>
              <div><span className="text-slate-400 font-bold">Service:</span> {selectedProject.serviceRequired}</div>
              <div><span className="text-slate-400 font-bold">Description:</span> {selectedProject.projectDescription}</div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-2">Update Status</label>
              <select
                value={updateStatus}
                onChange={(e) => setUpdateStatus(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-surface-card border border-surface-border text-white text-xs focus:outline-none"
              >
                <option value="Pending">Pending</option>
                <option value="Reviewing">Reviewing</option>
                <option value="Approved">Approved</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-2">Internal Administrator Notes</label>
              <textarea
                rows={3}
                value={internalNote}
                onChange={(e) => setInternalNote(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-surface-card border border-surface-border text-white text-xs focus:outline-none"
                placeholder="Add confidential notes for team..."
              />
            </div>

            <div className="flex items-center justify-end space-x-3 pt-4 border-t border-surface-border">
              <button onClick={() => setSelectedProject(null)} className="px-4 py-2 rounded-xl bg-surface border border-surface-border text-xs">Cancel</button>
              <button onClick={() => handleUpdateProject(selectedProject.id)} className="px-4 py-2 rounded-xl bg-primary-600 text-white font-bold text-xs">Save Changes</button>
            </div>
          </div>
        </div>
      )}

      {/* Inspect & Edit Seeker Modal */}
      {selectedSeeker && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-surface border border-surface-border rounded-3xl max-w-xl w-full p-6 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-surface-border">
              <h3 className="font-display font-bold text-xl text-white">Candidate Details</h3>
              <button onClick={() => setSelectedSeeker(null)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <div className="space-y-3 text-xs text-slate-300">
              <div><span className="text-slate-400 font-bold">Candidate:</span> {selectedSeeker.name} ({selectedSeeker.email})</div>
              <div><span className="text-slate-400 font-bold">Phone:</span> {selectedSeeker.phone}</div>
              <div><span className="text-slate-400 font-bold">Role & Exp:</span> {selectedSeeker.role} • {selectedSeeker.experience}</div>
              <div><span className="text-slate-400 font-bold">Intro:</span> {selectedSeeker.introduction}</div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-2">Update Candidate Status</label>
              <select
                value={updateStatus}
                onChange={(e) => setUpdateStatus(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-surface-card border border-surface-border text-white text-xs focus:outline-none"
              >
                <option value="New">New</option>
                <option value="Shortlisted">Shortlisted</option>
                <option value="Selected">Selected</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-2">Internal Candidate Notes</label>
              <textarea
                rows={3}
                value={internalNote}
                onChange={(e) => setInternalNote(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-surface-card border border-surface-border text-white text-xs focus:outline-none"
                placeholder="Add interview notes..."
              />
            </div>

            <div className="flex items-center justify-end space-x-3 pt-4 border-t border-surface-border">
              <button onClick={() => setSelectedSeeker(null)} className="px-4 py-2 rounded-xl bg-surface border border-surface-border text-xs">Cancel</button>
              <button onClick={() => handleUpdateSeeker(selectedSeeker.id)} className="px-4 py-2 rounded-xl bg-accent-purple text-white font-bold text-xs">Save Changes</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
