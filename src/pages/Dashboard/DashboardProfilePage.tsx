import React from 'react';
import { PageContainer } from '../../components/layout/PageContainer';
import { Breadcrumbs } from '../../components/navigation/Breadcrumbs';
import { Button } from '../../components/ui/Button';
import { ArrowLeft, Sparkles } from 'lucide-react';

export const DashboardProfilePage: React.FC = () => {
  return (
    <PageContainer>
      <div className="max-w-2xl mx-auto space-y-6">
        <Breadcrumbs items={[{ label: 'Dashboard', to: '/dashboard' }, { label: 'Profile', active: true }]} />
        
        <div className="bg-white rounded-3xl border border-smartdoc-slate-border p-8 shadow-card space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-smartdoc-blue-soft text-smartdoc-blue flex items-center justify-center font-bold text-xl">
              DU
            </div>
            <div>
              <h2 className="text-xl font-bold text-smartdoc-navy">Demo User Profile</h2>
              <p className="text-xs text-smartdoc-slate-muted">demo@smartdoc.org</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-smartdoc-blue-soft text-xs text-smartdoc-blue-dark flex items-start gap-2 border border-smartdoc-blue-border">
            <Sparkles className="w-4 h-4 text-smartdoc-blue shrink-0 mt-0.5" />
            <span>Profile editing and multi-device synchronization will be activated in Phase 4.</span>
          </div>

          <Button to="/dashboard" variant="outline" size="sm" leftIcon={ArrowLeft}>
            Back to Dashboard
          </Button>
        </div>
      </div>
    </PageContainer>
  );
};
