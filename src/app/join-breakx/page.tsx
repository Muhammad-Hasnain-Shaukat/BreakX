'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Sparkles, Upload, FileCheck, CheckCircle2, ArrowRight, AlertCircle } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

export default function JoinBreakXPage() {
  const router = useRouter();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [isVerifiedAccount, setIsVerifiedAccount] = useState<boolean>(false);
  const [authProvider, setAuthProvider] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [role, setRole] = useState<string>('Senior WebGL & Creative Frontend Architect');
  const [experience, setExperience] = useState<string>('5+ Years');
  const [portfolioUrl, setPortfolioUrl] = useState<string>('');
  const [githubUrl, setGithubUrl] = useState<string>('');
  const [linkedinUrl, setLinkedinUrl] = useState<string>('');
  const [introduction, setIntroduction] = useState<string>('');
  const [resumeFile, setResumeFile] = useState<string>('');
  const [resumeFileName, setResumeFileName] = useState<string>('');

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
          setIsVerifiedAccount(true);
          setAuthProvider(data.user.provider || 'Google');
        }
      })
      .catch(() => {});
  }, []);

  const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('files', files[0]);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Resume upload failed');

      setResumeFile(data.urls[0]);
      setResumeFileName(files[0].name);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resumeFile) {
      setError('Please upload your resume (PDF/DOC/DOCX) before submitting.');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/opportunity-seekers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          role,
          experience,
          portfolioUrl,
          githubUrl,
          linkedinUrl,
          introduction,
          resumeFile,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Application submission failed');

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
              ? 'bg-accent-purple/10 border-accent-purple/30 text-accent-purple'
              : 'bg-purple-50 border-purple-200 text-purple-700'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>JOIN THE BREAKX TEAM</span>
        </div>
        <h1
          className={`font-display font-black text-4xl sm:text-5xl tracking-tight ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}
        >
          Craft the Future of{' '}
          <span
            className={`text-transparent bg-clip-text ${
              isDark
                ? 'bg-gradient-to-r from-accent-purple to-accent-cyan'
                : 'bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600'
            }`}
          >
            Digital Motion.
          </span>
        </h1>
        <p className={`text-sm sm:text-base max-w-xl mx-auto ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
          We are seeking world-class creative engineers, AI architects, and motion designers. Submit your profile below.
        </p>
      </div>

      {/* Form Card */}
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
              Application Received!
            </h2>
            <p className={`text-xs sm:text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Redirecting to your Talent Dashboard...
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
                  placeholder="Alex Rivera"
                  className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:border-primary-500 transition-colors ${
                    isDark
                      ? 'bg-surface-card border-surface-border text-white'
                      : 'bg-white border-slate-200 text-slate-900'
                  }`}
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className={`text-xs font-semibold block ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    Email Address *
                  </label>
                  {isVerifiedAccount && (
                    <span className="inline-flex items-center space-x-1 text-[11px] font-bold text-emerald-600">
                      <CheckCircle2 className="w-3 h-3" />
                      <span className="capitalize">Verified {authProvider}</span>
                    </span>
                  )}
                </div>
                <input
                  type="email"
                  required
                  readOnly={isVerifiedAccount}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@dev.io"
                  className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none transition-colors ${
                    isVerifiedAccount
                      ? isDark
                        ? 'bg-surface/80 border-emerald-500/40 text-emerald-300 cursor-not-allowed'
                        : 'bg-emerald-50/60 border-emerald-300 text-emerald-900 cursor-not-allowed font-medium'
                      : isDark
                      ? 'bg-surface-card border-surface-border text-white focus:border-primary-500'
                      : 'bg-white border-slate-200 text-slate-900 focus:border-blue-500'
                  }`}
                />
              </div>

              <div>
                <label className={`text-xs font-semibold mb-2 block ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:border-primary-500 transition-colors ${
                    isDark
                      ? 'bg-surface-card border-surface-border text-white'
                      : 'bg-white border-slate-200 text-slate-900'
                  }`}
                />
              </div>

              <div>
                <label className={`text-xs font-semibold mb-2 block ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  Target Role *
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:border-primary-500 transition-colors ${
                    isDark
                      ? 'bg-surface-card border-surface-border text-white'
                      : 'bg-white border-slate-200 text-slate-900'
                  }`}
                >
                  <option value="Senior WebGL & Creative Frontend Architect">Senior WebGL & Creative Frontend Architect</option>
                  <option value="Lead AI / LLM Pipeline Engineer">Lead AI / LLM Pipeline Engineer</option>
                  <option value="Principal Motion UI/UX Designer">Principal Motion UI/UX Designer</option>
                  <option value="Full-Stack Next.js Developer">Full-Stack Next.js Developer</option>
                  <option value="Contractor / Design Partner">Contractor / Design Partner</option>
                </select>
              </div>

              <div>
                <label className={`text-xs font-semibold mb-2 block ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  Experience Level *
                </label>
                <select
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:border-primary-500 transition-colors ${
                    isDark
                      ? 'bg-surface-card border-surface-border text-white'
                      : 'bg-white border-slate-200 text-slate-900'
                  }`}
                >
                  <option value="2 - 4 Years">2 - 4 Years</option>
                  <option value="5+ Years">5+ Years</option>
                  <option value="8+ Years">8+ Years (Lead / Principal)</option>
                </select>
              </div>

              <div>
                <label className={`text-xs font-semibold mb-2 block ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  Portfolio URL
                </label>
                <input
                  type="url"
                  value={portfolioUrl}
                  onChange={(e) => setPortfolioUrl(e.target.value)}
                  placeholder="https://yourportfolio.dev"
                  className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:border-primary-500 transition-colors ${
                    isDark
                      ? 'bg-surface-card border-surface-border text-white'
                      : 'bg-white border-slate-200 text-slate-900'
                  }`}
                />
              </div>

              <div>
                <label className={`text-xs font-semibold mb-2 block ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  GitHub URL
                </label>
                <input
                  type="url"
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                  placeholder="https://github.com/yourhandle"
                  className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:border-primary-500 transition-colors ${
                    isDark
                      ? 'bg-surface-card border-surface-border text-white'
                      : 'bg-white border-slate-200 text-slate-900'
                  }`}
                />
              </div>

              <div>
                <label className={`text-xs font-semibold mb-2 block ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  LinkedIn Profile
                </label>
                <input
                  type="url"
                  value={linkedinUrl}
                  onChange={(e) => setLinkedinUrl(e.target.value)}
                  placeholder="https://linkedin.com/in/yourhandle"
                  className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:border-primary-500 transition-colors ${
                    isDark
                      ? 'bg-surface-card border-surface-border text-white'
                      : 'bg-white border-slate-200 text-slate-900'
                  }`}
                />
              </div>
            </div>

            <div>
              <label className={`text-xs font-semibold mb-2 block ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                Introduction & Technical Background *
              </label>
              <textarea
                required
                rows={4}
                value={introduction}
                onChange={(e) => setIntroduction(e.target.value)}
                placeholder="Tell us about your technical expertise, favorite GLSL/WebGL projects, or AI engineering background..."
                className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:border-primary-500 transition-colors ${
                  isDark
                    ? 'bg-surface-card border-surface-border text-white'
                    : 'bg-white border-slate-200 text-slate-900'
                }`}
              />
            </div>

            {/* Resume Upload */}
            <div>
              <label className={`text-xs font-semibold mb-2 block ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                Resume Upload (PDF, DOC, DOCX) *
              </label>
              <div
                className={`border-2 border-dashed rounded-2xl p-6 text-center transition-colors ${
                  isDark
                    ? 'border-surface-border hover:border-accent-purple/50 bg-surface-card/40'
                    : 'border-slate-300 hover:border-purple-400 bg-slate-50'
                }`}
              >
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleResumeUpload}
                  className="hidden"
                  id="resume-file-input"
                />
                <label htmlFor="resume-file-input" className="cursor-pointer flex flex-col items-center space-y-2">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      isDark ? 'bg-accent-purple/10 text-accent-purple' : 'bg-purple-100 text-purple-600'
                    }`}
                  >
                    <Upload className="w-6 h-6" />
                  </div>
                  <span className={`text-xs font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {resumeFile ? 'Click to replace resume' : 'Upload Resume File'}
                  </span>
                  <span className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    PDF, DOC, DOCX (Max 10MB)
                  </span>
                </label>
              </div>

              {resumeFile && (
                <div
                  className={`mt-3 p-3 rounded-xl border flex items-center justify-between text-xs text-emerald-600 ${
                    isDark ? 'bg-surface border-surface-border' : 'bg-emerald-50 border-emerald-200'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <FileCheck className="w-4 h-4" />
                    <span>
                      Resume attached: {resumeFileName || 'resume.pdf'} (Saved in Database)
                    </span>
                  </div>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={submitting || uploading}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-accent-purple via-primary-600 to-accent-cyan text-white font-bold text-sm shadow-neon-purple hover:scale-[1.01] transition-all flex items-center justify-center space-x-2"
            >
              {submitting ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Submit Application</span>
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
