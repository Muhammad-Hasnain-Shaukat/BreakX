'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Sparkles, Upload, FileText, CheckCircle2, ArrowRight, X, AlertCircle } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

function ProjectRequestForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preselectedService = searchParams.get('service') || 'Website Development';
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [companyName, setCompanyName] = useState<string>('');
  const [serviceRequired, setServiceRequired] = useState<string>(preselectedService);
  const [projectBudget, setProjectBudget] = useState<string>('$25,000 - $50,000');
  const [projectDeadline, setProjectDeadline] = useState<string>('4 - 6 Weeks');
  const [projectDescription, setProjectDescription] = useState<string>('');
  const [attachedFiles, setAttachedFiles] = useState<string[]>([]);

  const [uploading, setUploading] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);

  useEffect(() => {
    fetch('/api/auth/me')
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setName(data.user.fullName || '');
          setEmail(data.user.email || '');
        }
      })
      .catch(() => {});
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    setError('');

    try {
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append('files', files[i]);
      }

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Upload failed');

      setAttachedFiles((prev) => [...prev, ...data.urls]);
    } catch (err: any) {
      setError(err.message || 'File upload failed');
    } finally {
      setUploading(false);
    }
  };

  const removeFile = (index: number) => {
    setAttachedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/project-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          companyName,
          serviceRequired,
          projectBudget,
          projectDeadline,
          projectDescription,
          attachedFiles,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Submission failed');

      setSuccess(true);
      setTimeout(() => {
        router.push('/dashboard');
      }, 1500);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <div
          className={`inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border text-xs font-semibold ${
            isDark
              ? 'bg-primary-500/10 border-primary-500/30 text-primary-400'
              : 'bg-blue-50 border-blue-200 text-blue-700'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>START YOUR PROJECT</span>
        </div>
        <h1
          className={`font-display font-black text-4xl sm:text-5xl tracking-tight ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}
        >
          Request a Project{' '}
          <span
            className={`text-transparent bg-clip-text ${
              isDark
                ? 'bg-gradient-to-r from-primary-400 to-accent-cyan'
                : 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600'
            }`}
          >
            Proposal.
          </span>
        </h1>
        <p className={`text-sm sm:text-base max-w-xl mx-auto ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
          Fill out your project specifications below. Our technical engineering lead will review your details and send a complete architectural estimate.
        </p>
      </div>

      {/* Form Container */}
      <div
        className={`glass-card p-8 sm:p-12 rounded-3xl border relative overflow-hidden transition-colors ${
          isDark ? 'border-surface-border' : 'border-slate-200 shadow-xl bg-white/90'
        }`}
      >
        {success ? (
          <div className="py-16 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500 text-emerald-500 flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className={`font-display font-bold text-2xl ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Project Request Submitted!
            </h2>
            <p className={`text-xs sm:text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Redirecting to your BreakX Client Dashboard...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-500 text-xs font-medium flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Inputs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={`text-xs font-semibold mb-2 block ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Sarah Jenkins"
                  className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:border-primary-500 transition-colors ${
                    isDark
                      ? 'bg-surface-card border-surface-border text-white'
                      : 'bg-white border-slate-200 text-slate-900'
                  }`}
                />
              </div>

              <div>
                <label className={`text-xs font-semibold mb-2 block ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  Work Email *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="sarah@company.com"
                  className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:border-primary-500 transition-colors ${
                    isDark
                      ? 'bg-surface-card border-surface-border text-white'
                      : 'bg-white border-slate-200 text-slate-900'
                  }`}
                />
              </div>

              <div>
                <label className={`text-xs font-semibold mb-2 block ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  Company / Organization
                </label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Acme Corp"
                  className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:border-primary-500 transition-colors ${
                    isDark
                      ? 'bg-surface-card border-surface-border text-white'
                      : 'bg-white border-slate-200 text-slate-900'
                  }`}
                />
              </div>

              <div>
                <label className={`text-xs font-semibold mb-2 block ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  Service Required *
                </label>
                <select
                  value={serviceRequired}
                  onChange={(e) => setServiceRequired(e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:border-primary-500 transition-colors ${
                    isDark
                      ? 'bg-surface-card border-surface-border text-white'
                      : 'bg-white border-slate-200 text-slate-900'
                  }`}
                >
                  <option value="Website Development">Website & Web App Development</option>
                  <option value="AI Solution">Bespoke AI Solution & RAG</option>
                  <option value="Automation">Enterprise Automation Engine</option>
                  <option value="UI/UX">UI/UX & Motion Design System</option>
                  <option value="Other">Custom Product Engineering</option>
                </select>
              </div>

              <div>
                <label className={`text-xs font-semibold mb-2 block ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  Estimated Budget *
                </label>
                <select
                  value={projectBudget}
                  onChange={(e) => setProjectBudget(e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:border-primary-500 transition-colors ${
                    isDark
                      ? 'bg-surface-card border-surface-border text-white'
                      : 'bg-white border-slate-200 text-slate-900'
                  }`}
                >
                  <option value="$10,000 - $25,000">$10,000 - $25,000</option>
                  <option value="$25,000 - $50,000">$25,000 - $50,000</option>
                  <option value="$50,000 - $100,000">$50,000 - $100,000</option>
                  <option value="$100,000+">$100,000+</option>
                </select>
              </div>

              <div>
                <label className={`text-xs font-semibold mb-2 block ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  Target Timeline
                </label>
                <select
                  value={projectDeadline}
                  onChange={(e) => setProjectDeadline(e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:border-primary-500 transition-colors ${
                    isDark
                      ? 'bg-surface-card border-surface-border text-white'
                      : 'bg-white border-slate-200 text-slate-900'
                  }`}
                >
                  <option value="2 - 4 Weeks">2 - 4 Weeks (Rush)</option>
                  <option value="4 - 6 Weeks">4 - 6 Weeks (Standard)</option>
                  <option value="8 - 12 Weeks">8 - 12 Weeks (Enterprise)</option>
                  <option value="Flexible">Flexible Timeline</option>
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className={`text-xs font-semibold mb-2 block ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                Project Overview & Requirements *
              </label>
              <textarea
                required
                rows={5}
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
                placeholder="Describe your project goals, core features, target users, and technical constraints..."
                className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:border-primary-500 transition-colors ${
                  isDark
                    ? 'bg-surface-card border-surface-border text-white'
                    : 'bg-white border-slate-200 text-slate-900'
                }`}
              />
            </div>

            {/* File Upload Pipeline */}
            <div>
              <label className={`text-xs font-semibold mb-2 block ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                Attach Specs / Wireframes / Guidelines (Multi-file + Mobile Camera)
              </label>
              <div
                className={`border-2 border-dashed rounded-2xl p-6 text-center transition-colors ${
                  isDark
                    ? 'border-surface-border hover:border-primary-500/50 bg-surface-card/40'
                    : 'border-slate-300 hover:border-blue-400 bg-slate-50'
                }`}
              >
                <input
                  type="file"
                  multiple
                  accept="image/*,.pdf,.doc,.docx,.json"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="project-file-input"
                />
                <label
                  htmlFor="project-file-input"
                  className="cursor-pointer flex flex-col items-center justify-center space-y-2"
                >
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      isDark ? 'bg-primary-500/10 text-primary-400' : 'bg-blue-100 text-blue-600'
                    }`}
                  >
                    <Upload className="w-6 h-6" />
                  </div>
                  <span className={`text-xs font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Click to upload documents or take photo
                  </span>
                  <span className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    Supports PDF, DOCX, PNG, JPG, JSON (Max 50MB)
                  </span>
                </label>
              </div>

              {/* Uploaded File List */}
              {attachedFiles.length > 0 && (
                <div className="mt-4 space-y-2">
                  {attachedFiles.map((url, i) => (
                    <div
                      key={i}
                      className={`flex items-center justify-between p-3 rounded-xl border text-xs ${
                        isDark
                          ? 'bg-surface border-surface-border text-slate-300'
                          : 'bg-slate-50 border-slate-200 text-slate-700'
                      }`}
                    >
                      <div className="flex items-center space-x-2 truncate">
                        <FileText className={`w-4 h-4 shrink-0 ${isDark ? 'text-primary-400' : 'text-blue-600'}`} />
                        <span className="truncate">{url.split('/').pop()}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile(i)}
                        className="p-1 text-slate-400 hover:text-red-500 rounded"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting || uploading}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-primary-600 to-accent-purple text-white font-bold text-sm shadow-neon-blue hover:shadow-neon-purple transition-all flex items-center justify-center space-x-2"
            >
              {submitting ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Submit Project Request</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default function ProjectRequestPage() {
  return (
    <Suspense
      fallback={
        <div className="py-24 text-center text-slate-400 text-sm">
          Loading project request...
        </div>
      }
    >
      <ProjectRequestForm />
    </Suspense>
  );
}
