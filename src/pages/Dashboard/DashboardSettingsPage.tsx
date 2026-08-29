import React from 'react';
import { PageContainer } from '../../components/layout/PageContainer';
import { Breadcrumbs } from '../../components/navigation/Breadcrumbs';
import { Button } from '../../components/ui/Button';
import { Settings, ArrowLeft, Sparkles } from 'lucide-react';

export const DashboardSettingsPage: React.FC = () => {
  return (
    <PageContainer>
      <div className="max-w-2xl mx-auto space-y-6">
        <Breadcrumbs items={[{ label: 'Dashboard', to: '/dashboard' }, { label: 'Settings', active: true }]} />
        
        <div className="bg-white rounded-3xl border border-smartdoc-slate-border p-8 shadow-card space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-smartdoc-blue-soft text-smartdoc-blue flex items-center justify-center">
              <Settings className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-smartdoc-navy">Account & Security Settings</h2>
              <p className="text-xs text-smartdoc-slate-muted">Configure document notifications and preferences</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-smartdoc-blue-soft text-xs text-smartdoc-blue-dark flex items-start gap-2 border border-smartdoc-blue-border">
            <Sparkles className="w-4 h-4 text-smartdoc-blue shrink-0 mt-0.5" />
            <span>Document expiry alerts, 2FA, and encryption keys settings will be active in Phase 4 & Phase 7.</span>
          </div>

          <Button to="/dashboard" variant="outline" size="sm" leftIcon={ArrowLeft}>
            Back to Dashboard
          </Button>
        </div>
      </div>
    </PageContainer>
  );
};
