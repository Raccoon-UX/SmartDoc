import React from 'react';
import { Link } from 'react-router-dom';
import { PageContainer } from '../../components/layout/PageContainer';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { DocIcon } from '../../components/ui/DocIcon';
import { getPopularDocuments } from '../../lib/utils';
import {
  UploadCloud,
  Search,
  FileText,
  FolderOpen,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Eye,
  Layers,
  User,
} from 'lucide-react';

export const DashboardOverviewPage: React.FC = () => {
  const popularDocs = getPopularDocuments().slice(0, 3);

  // Mock dashboard sample user documents for demonstration
  const mockVaultDocuments = [
    {
      id: 'usr-doc-1',
      name: 'Aadhaar_Card_Verified_2024.pdf',
      documentType: 'Aadhaar Card',
      category: 'Identity',
      fileSize: '1.4 MB',
      uploadDate: '12 Aug 2024',
      status: 'Active' as const,
      iconName: 'Fingerprint',
    },
    {
      id: 'usr-doc-2',
      name: 'PAN_Card_eKYC_Copy.pdf',
      documentType: 'PAN Card',
      category: 'Financial',
      fileSize: '840 KB',
      uploadDate: '04 Jul 2024',
      status: 'Active' as const,
      iconName: 'CreditCard',
    },
    {
      id: 'usr-doc-3',
      name: 'Passport_First_Last_Page.pdf',
      documentType: 'Indian Passport',
      category: 'Travel',
      fileSize: '2.8 MB',
      uploadDate: '19 May 2024',
      status: 'Active' as const,
      iconName: 'Plane',
    },
  ];

  return (
    <PageContainer>
      <div className="space-y-8">
        {/* Phase Roadmap Notification Banner */}
        <div className="bg-gradient-to-r from-smartdoc-blue-soft via-blue-50 to-indigo-50 border border-smartdoc-blue-border rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-smartdoc-blue text-white shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold text-smartdoc-navy">
                  User Dashboard Preview (Phase 1 Shell)
                </h4>
                <Badge variant="blue" size="sm">Phase 4 & 5 Roadmap</Badge>
              </div>
              <p className="text-xs text-smartdoc-slate-muted mt-0.5">
                This screen previews your personal document vault. Personal uploads, storage encryption, and account syncing will become active in Phases 4 & 5.
              </p>
            </div>
          </div>
          <Button to="/documents" variant="primary" size="sm" rightIcon={Search} className="shrink-0">
            Browse Directory
          </Button>
        </div>

        {/* Dashboard Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-smartdoc-navy tracking-tight">
              Welcome back, <span className="text-smartdoc-blue">Demo User</span>
            </h1>
            <p className="text-xs sm:text-sm text-smartdoc-slate-muted">
              Manage your personal documents, check requirements, and access verified public services.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2.5">
            <Button
              variant="outline"
              size="sm"
              leftIcon={UploadCloud}
              onClick={() => alert('Document upload will be activated in Phase 5.')}
              title="Upload Document Copy"
            >
              Upload Document
            </Button>
            <Button
              to="/documents"
              variant="primary"
              size="sm"
              leftIcon={Search}
            >
              Find a Service
            </Button>
          </div>
        </div>

        {/* Stat Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="bg-white rounded-2xl border border-smartdoc-slate-border p-5 shadow-card space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-smartdoc-slate-muted">Saved Documents</span>
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-smartdoc-blue flex items-center justify-center">
                <FileText className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-black text-smartdoc-navy">3</p>
            <p className="text-[11px] text-smartdoc-slate-muted">Demo document copies in vault</p>
          </div>

          <div className="bg-white rounded-2xl border border-smartdoc-slate-border p-5 shadow-card space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-smartdoc-slate-muted">Active Categories</span>
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Layers className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-black text-smartdoc-navy">3</p>
            <p className="text-[11px] text-smartdoc-slate-muted">Identity, Financial, Travel</p>
          </div>

          <div className="bg-white rounded-2xl border border-smartdoc-slate-border p-5 shadow-card space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-smartdoc-slate-muted">Security Status</span>
              <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4" />
              </div>
            </div>
            <p className="text-sm font-bold text-smartdoc-green-dark flex items-center gap-1.5 pt-1">
              <span className="w-2 h-2 rounded-full bg-smartdoc-green" />
              Encrypted Vault Ready
            </p>
            <p className="text-[11px] text-smartdoc-slate-muted">Zero unauthorized third-party access</p>
          </div>
        </div>

        {/* Two Column Section: Recent Vault Documents & Quick Services */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Recent Vault Documents Table (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-smartdoc-navy flex items-center gap-2">
                <FolderOpen className="w-5 h-5 text-smartdoc-blue" />
                <span>Recent Personal Documents</span>
              </h3>
              <span className="text-xs text-smartdoc-slate-muted font-medium">
                Phase 5 Feature Preview
              </span>
            </div>

            <div className="bg-white rounded-2xl border border-smartdoc-slate-border shadow-card overflow-hidden">
              <div className="divide-y divide-slate-100">
                {mockVaultDocuments.map((doc) => (
                  <div
                    key={doc.id}
                    className="p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-smartdoc-slate-subtle/50 transition-colors"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-smartdoc-blue-soft border border-smartdoc-blue-border/60 text-smartdoc-blue flex items-center justify-center shrink-0">
                        <DocIcon name={doc.iconName} className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-sm font-bold text-smartdoc-navy truncate">
                          {doc.name}
                        </h4>
                        <div className="flex items-center gap-2 text-xs text-smartdoc-slate-muted">
                          <span>{doc.documentType}</span>
                          <span>•</span>
                          <span>{doc.fileSize}</span>
                          <span>•</span>
                          <span>Uploaded {doc.uploadDate}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <Badge variant="green" size="sm">
                        {doc.status}
                      </Badge>
                      <button
                        onClick={() => alert(`View/Download will be activated in Phase 5.`)}
                        className="p-2 text-smartdoc-slate-muted hover:text-smartdoc-blue hover:bg-smartdoc-blue-soft rounded-lg transition-colors"
                        title="View Document"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-slate-50 border-t border-slate-100 text-center">
                <Button
                  to="/documents"
                  variant="ghost"
                  size="sm"
                  rightIcon={ArrowRight}
                  className="text-xs text-smartdoc-blue"
                >
                  Explore services to add more documents
                </Button>
              </div>
            </div>
          </div>

          {/* Quick Popular Services (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="text-lg font-bold text-smartdoc-navy flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-smartdoc-blue" />
              <span>Recommended Services</span>
            </h3>

            <div className="space-y-3">
              {popularDocs.map((doc) => (
                <Link
                  key={doc.id}
                  to={`/documents/${doc.id}`}
                  className="p-4 rounded-2xl bg-white border border-smartdoc-slate-border hover:border-smartdoc-blue hover:shadow-card transition-all duration-200 block group"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-smartdoc-blue-soft text-smartdoc-blue flex items-center justify-center shrink-0">
                        <DocIcon name={doc.iconName} className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-smartdoc-navy group-hover:text-smartdoc-blue transition-colors">
                          {doc.name}
                        </h4>
                        <p className="text-xs text-smartdoc-slate-muted">
                          {doc.availableServiceIds.length} verified services
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-smartdoc-blue group-hover:translate-x-0.5 transition-transform shrink-0" />
                  </div>
                </Link>
              ))}
            </div>

            {/* Account Settings / Profile preview pill */}
            <div className="p-4 rounded-2xl bg-white border border-smartdoc-slate-border shadow-subtle flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-slate-400" />
                <span className="font-semibold text-smartdoc-navy">Account Profile</span>
              </div>
              <span className="text-slate-400">Phase 4 Active</span>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};
