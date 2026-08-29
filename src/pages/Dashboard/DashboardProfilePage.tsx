import React, { useState, useEffect } from 'react';
import { PageContainer } from '../../components/layout/PageContainer';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../components/ui/Toast';
import { Button } from '../../components/ui/Button';
import { User, Mail, Calendar, Save, ShieldCheck, AlertCircle } from 'lucide-react';

export const DashboardProfilePage: React.FC = () => {
  const { user, updateProfileName } = useAuth();
  const { showToast } = useToast();

  const [fullName, setFullName] = useState(user?.fullName || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (user?.fullName) {
      setFullName(user.fullName);
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = fullName.trim();
    if (!trimmed) {
      setErrorMessage('Full name cannot be empty.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const { error } = await updateProfileName(trimmed);
      if (error) {
        setErrorMessage(error.message);
      } else {
        showToast('Profile updated successfully!', 'success');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to update profile.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formattedDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : 'Recently';

  const avatarInitial = (user?.fullName || user?.email || 'U').charAt(0).toUpperCase();

  return (
    <PageContainer>
      <div className="max-w-2xl mx-auto py-6 space-y-6">
        {/* Header */}
        <div className="pb-4 border-b border-slate-200">
          <h1 className="text-2xl font-extrabold text-smartdoc-navy tracking-tight">
            User Profile
          </h1>
          <p className="text-xs sm:text-sm text-smartdoc-slate-muted mt-0.5">
            Manage your personal account details and preferences
          </p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-3xl border border-smartdoc-slate-border p-6 sm:p-8 shadow-card space-y-6">
          {/* Avatar Banner */}
          <div className="flex items-center gap-4 pb-6 border-b border-slate-100">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-smartdoc-blue to-smartdoc-navy text-white text-2xl font-bold flex items-center justify-center shadow-md">
              {avatarInitial}
            </div>
            <div>
              <h2 className="text-lg font-bold text-smartdoc-navy">
                {user?.fullName || 'SmartDoc User'}
              </h2>
              <p className="text-xs text-smartdoc-slate-muted">{user?.email}</p>
            </div>
          </div>

          {errorMessage && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-3.5 text-xs text-red-800 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Edit Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-smartdoc-navy">
                Display Name
              </label>
              <div className="relative flex items-center">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Your full name"
                  required
                  className="w-full bg-white border border-smartdoc-slate-border text-smartdoc-navy placeholder:text-smartdoc-slate-muted rounded-xl py-2.5 pl-10 pr-3.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-smartdoc-blue/20 focus:border-smartdoc-blue"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-smartdoc-navy">
                Email Address (Managed via Auth)
              </label>
              <div className="relative flex items-center">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
                <input
                  type="email"
                  value={user?.email || ''}
                  disabled
                  className="w-full bg-slate-50 border border-slate-200 text-slate-500 rounded-xl py-2.5 pl-10 pr-3.5 text-xs sm:text-sm cursor-not-allowed"
                />
              </div>
              <span className="text-[11px] text-slate-400">
                To update your email address, please use Account Settings.
              </span>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-smartdoc-navy">
                Account Created
              </label>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-600">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span>{formattedDate}</span>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <Button
                type="submit"
                variant="primary"
                size="md"
                isLoading={isSubmitting}
                disabled={!fullName.trim() || fullName.trim() === user?.fullName}
                leftIcon={Save}
                className="font-bold shadow-sm"
              >
                Save Profile Changes
              </Button>
            </div>
          </form>
        </div>

        {/* Security Summary Box */}
        <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 flex items-start gap-3 text-xs text-emerald-900">
          <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <span className="font-bold">Identity & Session Security</span>
            <p className="text-[11px] text-emerald-800/90 leading-relaxed">
              Your profile is authenticated through Supabase Auth with JWT session verification. Passwords and credentials are never stored in plain text.
            </p>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};
