import React from 'react';
import { useParams } from 'react-router-dom';
import { PageContainer } from '../../components/layout/PageContainer';
import { Breadcrumbs } from '../../components/navigation/Breadcrumbs';
import { Badge } from '../../components/ui/Badge';
import { DocIcon } from '../../components/ui/DocIcon';
import { Button } from '../../components/ui/Button';
import { ServiceCard } from '../../components/services/ServiceCard';
import { PlatformLinkBadge } from '../../components/services/PlatformLinkBadge';
import { RequirementList } from '../../components/documents/RequirementList';
import { RelatedDocsList } from '../../components/documents/RelatedDocsList';
import {
  getDocumentById,
  getServicesForDocument,
  getRelatedDocuments,
} from '../../lib/utils';
import {
  Clock,
  Banknote,
  ShieldCheck,
  Globe,
  FileText,
  CheckCircle2,
  HelpCircle,
  Layers,
  ArrowLeft,
} from 'lucide-react';

export const DocumentDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const document = id ? getDocumentById(id) : undefined;

  if (!document) {
    return (
      <PageContainer>
        <div className="text-center py-16 space-y-4">
          <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto text-slate-400">
            <HelpCircle className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-smartdoc-navy">Document Not Found</h2>
          <p className="text-sm text-smartdoc-slate-muted max-w-md mx-auto">
            The document service you are looking for does not exist or has been moved.
          </p>
          <Button to="/documents" variant="primary" size="md" leftIcon={ArrowLeft}>
            Back to Document Directory
          </Button>
        </div>
      </PageContainer>
    );
  }

  const services = getServicesForDocument(document.id);
  const relatedDocuments = getRelatedDocuments(document.id);

  const breadcrumbs = [
    { label: 'Documents', to: '/documents' },
    { label: document.name, active: true },
  ];

  return (
    <PageContainer>
      <div className="space-y-10">
        {/* Breadcrumb Bar */}
        <Breadcrumbs items={breadcrumbs} />

        {/* Top Header Card */}
        <div className="bg-white rounded-3xl border border-smartdoc-slate-border p-6 sm:p-8 shadow-card space-y-6">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="flex items-start gap-4 sm:gap-5">
              {/* Document Big Icon */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-smartdoc-blue-soft border border-smartdoc-blue-border flex items-center justify-center text-smartdoc-blue shrink-0 shadow-xs">
                <DocIcon name={document.iconName} className="w-8 h-8 sm:w-10 sm:h-10" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant="blue" size="md" className="capitalize">
                    {document.category}
                  </Badge>
                  {document.badgeText && (
                    <Badge variant="slate" size="md">
                      {document.badgeText}
                    </Badge>
                  )}
                  {document.code && (
                    <span className="text-xs font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded border border-slate-200">
                      {document.code}
                    </span>
                  )}
                </div>

                <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-smartdoc-navy tracking-tight">
                  {document.name}
                </h1>
                <p className="text-sm sm:text-base text-smartdoc-slate-muted max-w-3xl leading-relaxed">
                  {document.fullDescription}
                </p>
              </div>
            </div>

            {/* Authority Tag */}
            <div className="shrink-0 flex flex-col sm:items-end gap-2 bg-smartdoc-slate-subtle/70 p-4 rounded-2xl border border-smartdoc-slate-border">
              <span className="text-[11px] uppercase tracking-wider font-semibold text-slate-500">
                Issuing Authority
              </span>
              <span className="text-xs sm:text-sm font-bold text-smartdoc-navy text-left sm:text-right max-w-xs">
                {document.issuingAuthority}
              </span>
            </div>
          </div>

          {/* Quick Stat Highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-smartdoc-slate-subtle">
            <div className="space-y-1">
              <span className="text-xs text-smartdoc-slate-muted flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>Processing Time</span>
              </span>
              <p className="text-xs sm:text-sm font-bold text-smartdoc-navy">
                {document.estimatedProcessingTime}
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-xs text-smartdoc-slate-muted flex items-center gap-1.5">
                <Banknote className="w-3.5 h-3.5 text-slate-400" />
                <span>Statutory Fee</span>
              </span>
              <p className="text-xs sm:text-sm font-bold text-smartdoc-navy truncate" title={document.feeRange}>
                {document.feeRange}
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-xs text-smartdoc-slate-muted flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-slate-400" />
                <span>Acceptance Scope</span>
              </span>
              <p className="text-xs sm:text-sm font-bold text-smartdoc-navy">
                {document.acceptanceLevel || 'National'}
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-xs text-smartdoc-slate-muted flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                <span>Validity Period</span>
              </span>
              <p className="text-xs sm:text-sm font-bold text-smartdoc-navy truncate" title={document.validityPeriod}>
                {document.validityPeriod || 'Lifelong'}
              </p>
            </div>
          </div>
        </div>

        {/* Two Columns Grid: Left Services & Info, Right Requirements & Official Platform */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content Area (8 Cols) */}
          <div className="lg:col-span-8 space-y-10">
            {/* Available Services Section */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-smartdoc-navy flex items-center gap-2">
                    <Layers className="w-5 h-5 text-smartdoc-blue" />
                    <span>Available Document Services</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-smartdoc-slate-muted mt-0.5">
                    Select a service below to view specific prerequisites, steps, and official application portals.
                  </p>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-smartdoc-blue-soft text-smartdoc-blue">
                  {services.length} Options
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {services.map((service) => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </div>
            </section>

            {/* Key Uses & Applications */}
            <section className="bg-white rounded-2xl border border-smartdoc-slate-border p-6 shadow-card space-y-4">
              <h3 className="text-base font-bold text-smartdoc-navy flex items-center gap-2">
                <FileText className="w-4 h-4 text-smartdoc-blue" />
                <span>Primary Uses & Real-World Applications</span>
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {document.keyUses.map((use, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2.5 text-xs sm:text-sm text-smartdoc-slate-text p-2.5 rounded-xl bg-smartdoc-slate-subtle/60 border border-smartdoc-slate-border/80"
                  >
                    <CheckCircle2 className="w-4 h-4 text-smartdoc-green-dark shrink-0 mt-0.5" />
                    <span>{use}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Related Documents Component */}
            <section className="bg-white rounded-2xl border border-smartdoc-slate-border p-6 shadow-card">
              <RelatedDocsList documents={relatedDocuments} />
            </section>
          </div>

          {/* Sidebar Area (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Official Platform Direct Portal Card */}
            <PlatformLinkBadge platform={document.officialPlatform} />

            {/* Eligibility & Basic Prerequisites */}
            <div className="bg-white rounded-2xl border border-smartdoc-slate-border p-6 shadow-card space-y-4">
              <RequirementList
                requirements={document.eligibility}
                title="Eligibility Criteria"
              />
            </div>

            {/* Personal Document Management Tip (Roadmap teaser) */}
            <div className="bg-gradient-to-br from-smartdoc-navy to-slate-900 text-white rounded-2xl p-6 shadow-card space-y-3">
              <h4 className="text-sm font-bold flex items-center gap-2 text-white">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Secure Document Vault</span>
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Keep an organized copy of your {document.name} in your personal SmartDoc dashboard for quick access during service applications.
              </p>
              <Button
                to="/dashboard"
                variant="outline"
                size="sm"
                className="w-full bg-white/10 hover:bg-white/20 text-white border-white/20 text-xs"
              >
                Go to Document Dashboard
              </Button>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};
