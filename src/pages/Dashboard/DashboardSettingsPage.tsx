import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageContainer } from '../../components/layout/PageContainer';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../components/ui/Toast';
import { Button } from '../../components/ui/Button';
import {
  Lock,
  LogOut,
  ShieldCheck,
  KeyRound,
  AlertCircle,
  Eye,
  EyeOff,
} from 'lucide-react';

export const DashboardSettingsPage: React.FC = () => {
  const { user, updatePassword, signOut, resetPasswordForEmail } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  // Password update form state
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const [isSendingResetEmail, setIsSendingResetEmail] = useState(false);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError(null);

    if (newPassword.length < 6) {
      setPasswordError('Password must be at least 6 characters.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError('Passwords do not match.');
      return;
    }

    setIsUpdatingPassword(true);

    try {
      const { error } = await updatePassword(newPassword);
      if (error) {
        setPasswordError(error.message);
      } else {
        showToast('Password updated successfully!', 'success');
        setNewPassword('');
        setConfirmPassword('');
      }
    } catch (err: any) {
      setPasswordError(err.message || 'Failed to update password.');
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  const handleSendResetEmail = async () => {
    if (!user?.email) return;
    setIsSendingResetEmail(true);
    try {
      const { error } = await resetPasswordForEmail(user.email);
      if (error) {
        showToast(error.message, 'error');
      } else {
        showToast(`Password reset link sent to ${user.email}`, 'success');
      }
    } catch (err: any) {
      showToast('Failed to send reset link.', 'error');
    } finally {
      setIsSendingResetEmail(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
      showToast('You have been logged out.', 'info');
      navigate('/login', { replace: true });
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  return (
    <PageContainer>
      <div className="max-w-2xl mx-auto py-6 space-y-6">
        {/* Header */}
        <div className="pb-4 border-b border-slate-200">
          <h1 className="text-2xl font-extrabold text-smartdoc-navy tracking-tight">
            Account Settings & Security
          </h1>
          <p className="text-xs sm:text-sm text-smartdoc-slate-muted mt-0.5">
            Manage your credentials, active sessions, and data privacy
          </p>
        </div>

        {/* 1. Security & Password Change */}
        <div className="bg-white rounded-3xl border border-smartdoc-slate-border p-6 sm:p-8 shadow-card space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
            <div className="w-9 h-9 rounded-xl bg-smartdoc-blue-soft text-smartdoc-blue flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-smartdoc-navy">
                Change Password
              </h2>
              <p className="text-xs text-smartdoc-slate-muted">
                Update your account password securely
              </p>
            </div>
          </div>

          {passwordError && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-3.5 text-xs text-red-800 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span>{passwordError}</span>
            </div>
          )}

          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-smartdoc-navy">
                New Password (min. 6 characters)
              </label>
              <div className="relative flex items-center">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••"
                  minLength={6}
                  required
                  className="w-full bg-white border border-smartdoc-slate-border text-smartdoc-navy placeholder:text-smartdoc-slate-muted rounded-xl py-2 pl-10 pr-10 text-xs focus:outline-none focus:ring-2 focus:ring-smartdoc-blue/20 focus:border-smartdoc-blue"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 text-slate-400 hover:text-smartdoc-navy p-1"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-smartdoc-navy">
                Confirm New Password
              </label>
              <div className="relative flex items-center">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  minLength={6}
                  required
                  className="w-full bg-white border border-smartdoc-slate-border text-smartdoc-navy placeholder:text-smartdoc-slate-muted rounded-xl py-2 pl-10 pr-3.5 text-xs focus:outline-none focus:ring-2 focus:ring-smartdoc-blue/20 focus:border-smartdoc-blue"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
              <button
                type="button"
                onClick={handleSendResetEmail}
                disabled={isSendingResetEmail}
                className="text-xs font-semibold text-smartdoc-blue hover:underline text-left inline-flex items-center gap-1.5"
              >
                <KeyRound className="w-3.5 h-3.5" />
                <span>{isSendingResetEmail ? 'Sending...' : 'Send reset link to my email'}</span>
              </button>

              <Button
                type="submit"
                variant="primary"
                size="sm"
                isLoading={isUpdatingPassword}
                disabled={!newPassword || !confirmPassword}
                className="font-bold shadow-sm"
              >
                Update Password
              </Button>
            </div>
          </form>
        </div>

        {/* 2. Privacy & Storage Isolation Statement */}
        <div className="bg-white rounded-3xl border border-smartdoc-slate-border p-6 sm:p-8 shadow-card space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-smartdoc-navy">
                Data Privacy & Isolation
              </h2>
              <p className="text-xs text-smartdoc-slate-muted">
                How SmartDoc protects your personal documents
              </p>
            </div>
          </div>

          <div className="text-xs text-smartdoc-slate-text space-y-2 leading-relaxed">
            <p>
              Your personal document files and records in the SmartDoc vault are protected by PostgreSQL <strong>Row Level Security (RLS)</strong> and isolated private storage paths.
            </p>
            <ul className="list-disc list-inside space-y-1 text-slate-500 pl-1">
              <li>Documents can only be accessed or downloaded by your verified user session.</li>
              <li>Document preview URLs are temporary and automatically expire after 5 minutes.</li>
              <li>No document files are indexed by search engines or shared publicly.</li>
            </ul>
          </div>
        </div>

        {/* 3. Session & Logout */}
        <div className="bg-white rounded-3xl border border-smartdoc-slate-border p-6 sm:p-8 shadow-card space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h3 className="text-sm font-bold text-smartdoc-navy">
                Active Authentication Session
              </h3>
              <p className="text-xs text-smartdoc-slate-muted">
                Logged in as <span className="font-semibold text-smartdoc-navy">{user?.email}</span>
              </p>
            </div>

            <Button
              variant="danger"
              size="sm"
              onClick={handleLogout}
              leftIcon={LogOut}
              className="bg-red-600 hover:bg-red-700 text-white font-bold"
            >
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};
