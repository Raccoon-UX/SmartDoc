import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../../components/navigation/Logo';
import { Button } from '../../components/ui/Button';
import { Lock, Mail, User, ArrowRight, Info } from 'lucide-react';

export const RegisterPage: React.FC = () => {
  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-smartdoc-slate-bg">
      <div className="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-3xl border border-smartdoc-slate-border shadow-card">
        {/* Top Header */}
        <div className="text-center space-y-3">
          <Logo size="md" className="justify-center" />
          <div className="pt-2">
            <h2 className="text-2xl font-bold text-smartdoc-navy">Create SmartDoc Account</h2>
            <p className="text-xs sm:text-sm text-smartdoc-slate-muted mt-1">
              Organize your documents and receive renewal alerts
            </p>
          </div>
        </div>

        {/* Phase 1 Notice Banner */}
        <div className="p-3.5 rounded-xl bg-smartdoc-blue-soft border border-smartdoc-blue-border text-xs text-smartdoc-blue-dark flex items-start gap-2.5">
          <Info className="w-4 h-4 text-smartdoc-blue shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Phase 1 Preview:</span> Registration backend is scheduled for Phase 3. You can explore the <Link to="/dashboard" className="underline font-semibold">Dashboard preview</Link> directly.
          </div>
        </div>

        {/* Mock Form */}
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-smartdoc-navy">Full Name</label>
            <div className="relative flex items-center">
              <User className="w-4 h-4 absolute left-3.5 text-slate-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Aarav Sharma"
                defaultValue="Aarav Sharma"
                className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-white border border-smartdoc-slate-border rounded-xl focus:outline-none focus:ring-2 focus:ring-smartdoc-blue/20 focus:border-smartdoc-blue"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-smartdoc-navy">Email Address</label>
            <div className="relative flex items-center">
              <Mail className="w-4 h-4 absolute left-3.5 text-slate-400 pointer-events-none" />
              <input
                type="email"
                placeholder="name@example.com"
                defaultValue="aarav@example.com"
                className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-white border border-smartdoc-slate-border rounded-xl focus:outline-none focus:ring-2 focus:ring-smartdoc-blue/20 focus:border-smartdoc-blue"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-smartdoc-navy">Password</label>
            <div className="relative flex items-center">
              <Lock className="w-4 h-4 absolute left-3.5 text-slate-400 pointer-events-none" />
              <input
                type="password"
                placeholder="Create a strong password"
                defaultValue="password123"
                className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-white border border-smartdoc-slate-border rounded-xl focus:outline-none focus:ring-2 focus:ring-smartdoc-blue/20 focus:border-smartdoc-blue"
              />
            </div>
          </div>

          <Button
            to="/dashboard"
            variant="primary"
            size="md"
            className="w-full justify-center shadow-sm"
            rightIcon={ArrowRight}
          >
            Create Free Account
          </Button>
        </form>

        {/* Footer info */}
        <div className="text-center pt-4 border-t border-slate-100 space-y-2">
          <p className="text-xs text-smartdoc-slate-muted">
            Already have an account?{' '}
            <Link to="/login" className="text-smartdoc-blue font-semibold hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
