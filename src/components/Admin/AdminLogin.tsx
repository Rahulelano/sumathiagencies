import React, { useState } from 'react';
import { Lock, User, Eye, EyeOff, ShieldCheck, ArrowLeft, Loader2, AlertCircle } from 'lucide-react';
import { login } from '../../services/api';
import type { Page } from '../../types';

interface AdminLoginProps {
  onLoginSuccess: () => void;
  navigate: (page: Page) => void;
}

export function AdminLogin({ onLoginSuccess, navigate }: AdminLoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!username.trim() || !password.trim()) {
      setError('Please enter both your admin username and password.');
      return;
    }

    setLoading(true);
    try {
      const res = await login(username.trim(), password);
      if (res.success) {
        onLoginSuccess();
      } else {
        setError(res.message || 'Login failed. Please check your credentials.');
      }
    } catch (err: any) {
      console.error('Login error:', err);
      const msg =
        err.response?.data?.message ||
        'Unable to connect to the backend server. Please make sure the backend is running on port 6272.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-sky-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-sky-100/30 overflow-hidden">
        {/* Brand Banner */}
        <div className="bg-gradient-to-r from-sky-600 via-cyan-600 to-emerald-600 px-8 py-8 text-white relative">
          <button
            onClick={() => navigate('home')}
            className="absolute top-4 left-4 inline-flex items-center gap-1.5 text-xs font-semibold text-white/90 hover:text-white bg-black/20 hover:bg-black/30 px-3 py-1.5 rounded-full transition-colors"
          >
            <ArrowLeft size={14} /> Back to Site
          </button>

          <div className="mt-4 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-white rounded-2xl p-2.5 shadow-lg flex items-center justify-center mb-3">
              <img
                src="/image.png"
                alt="Sumathi Agencies"
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Admin Portal
            </h1>
            <p className="text-sky-100 text-xs mt-1">
              Sumathi Agencies Management Console
            </p>
          </div>
        </div>

        {/* Login Form */}
        <div className="p-8">
          {error && (
            <div className="mb-6 p-3.5 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-xs flex items-start gap-2.5">
              <AlertCircle size={16} className="text-rose-600 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Admin Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User size={18} />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  required
                  autoFocus
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock size={18} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-11 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-gradient-to-r from-sky-600 to-emerald-600 hover:from-sky-500 hover:to-emerald-500 text-white font-semibold rounded-xl text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Authenticating...
                  </>
                ) : (
                  <>
                    <ShieldCheck size={18} />
                    Sign In to Dashboard
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-100 flex items-center justify-center text-xs text-slate-500 gap-1.5">
            <Lock size={12} className="text-slate-400" />
            <span>Authorized personnel only. End-to-end encrypted.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
