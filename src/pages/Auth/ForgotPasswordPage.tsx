import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PageContainer } from '../../components/layout/PageContainer';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../../components/ui/Button';
import { Mail, KeyRound, ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react';

export const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { resetPasswordForEmail, isConfigured } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setErrorMessage('Please enter your email address.');
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await resetPasswordForEmail(trimmedEmail);
      if (error) {
        setErrorMessage(error.message);
      } else {
        setIsSuccess(true);
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to send reset email.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageContainer>
      <div className="max-w-md mx-auto py-8 sm:py-12">
        <div className="bg-white rounded-3xl border border-smartdoc-slate-border p-6 sm:p-8 shadow-card space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-smartdoc-blue-soft text-smartdoc-blue flex items-center justify-center mx-auto mb-3 shadow-xs">
              <KeyRound className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-extrabold text-smartdoc-navy tracking-tight">
              Reset Your Password
            </h1>
            <p className="text-xs sm:text-sm text-smartdoc-slate-muted">
              Enter your registered email and we'll send you a password recovery link
            </p>
          </div>

          {!isConfigured && (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs text-amber-800">
              Please configure Supabase credentials in <code className="font-mono bg-amber-100 px-1 py-0.5 rounded">.env</code> to send recovery emails.
            </div>
          )}

          {isSuccess ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center space-y-3 animate-in fade-in-50 duration-200">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h3 className="text-base font-bold text-emerald-950">Check Your Inbox</h3>
              <p className="text-xs text-emerald-800 leading-relaxed">
                If an account exists for <span className="font-semibold">{email}</span>, we've sent password reset instructions to your email.
              </p>
              <div className="pt-2">
                <Button to="/login" variant="outline" size="sm" className="text-xs">
                  Return to Login
                </Button>
              </div>
            </div>
          ) : (
            <>
              {errorMessage && (
                <div className="bg-red-50 border border-red-200 rounded-2xl p-4 text-xs text-red-800 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-smartdoc-navy">
                    Email Address
                  </label>
                  <div className="relative flex items-center">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      autoComplete="email"
                      required
                      className="w-full bg-white border border-smartdoc-slate-border text-smartdoc-navy placeholder:text-smartdoc-slate-muted rounded-xl py-2.5 pl-10 pr-3.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-smartdoc-blue/20 focus:border-smartdoc-blue transition-all"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  isLoading={isSubmitting}
                  className="w-full justify-center text-sm font-bold shadow-sm"
                >
                  Send Recovery Link
                </Button>
              </form>
            </>
          )}

          {/* Back to Login Footer */}
          <div className="pt-4 border-t border-slate-100 text-center">
            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-smartdoc-blue hover:underline"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Login</span>
            </Link>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};
