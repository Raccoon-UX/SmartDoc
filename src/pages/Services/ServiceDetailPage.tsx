import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { PageContainer } from '../../components/layout/PageContainer';
import { Breadcrumbs } from '../../components/navigation/Breadcrumbs';
import { Badge } from '../../components/ui/Badge';
import { DocIcon } from '../../components/ui/DocIcon';
import { Button } from '../../components/ui/Button';
import { PlatformLinkBadge } from '../../components/services/PlatformLinkBadge';
import { RequirementList } from '../../components/documents/RequirementList';
import {
  getServiceById,
  getDocumentById,
  getServicesForDocument,
} from '../../lib/utils';
import {
  Clock,
  Banknote,
  Globe,
  FileCheck2,
  ListOrdered,
  Layers,
  ArrowLeft,
  ArrowRight,
  HelpCircle,
  ShieldCheck,
  Building2,
} from 'lucide-react';

export const ServiceDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const service = id ? getServiceById(id) : undefined;
  const parentDocument = service ? getDocumentById(service.documentId) : undefined;

  if (!service || !parentDocument) {
    return (
      <PageContainer>
        <div className="text-center py-16 space-y-4">
          <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto text-slate-400">
            <HelpCircle className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-smartdoc-navy">Service Not Found</h2>
          <p className="text-sm text-smartdoc-slate-muted max-w-md mx-auto">
            The document service you requested does not exist or has been modified.
          </p>
          <Button to="/documents" variant="primary" size="md" leftIcon={ArrowLeft}>
            Back to Document Directory
          </Button>
        </div>
      </PageContainer>
    );
  }

  const siblingServices = getServicesForDocument(parentDocument.id).filter(
    (s) => s.id !== service.id
  );

  const breadcrumbs = [
    { label: 'Documents', to: '/documents' },
    { label: parentDocument.name, to: `/documents/${parentDocument.id}` },
    { label: service.name, active: true },
  ];

  return (
    <PageContainer>
      <div className="space-y-10">
        {/* Breadcrumb Navigation */}
        <Breadcrumbs items={breadcrumbs} />

        {/* Top Header Card */}
        <div className="bg-white rounded-3xl border border-smartdoc-slate-border p-6 sm:p-8 shadow-card space-y-6">
          {/* Parent Document Context Banner */}
          <div className="flex items-center justify-between gap-4 p-3 rounded-2xl bg-smartdoc-blue-soft/60 border border-smartdoc-blue-border/60">
            <Link
              to={`/documents/${parentDocument.id}`}
              className="inline-flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-smartdoc-navy hover:text-smartdoc-blue transition-colors group"
            >
              <div className="w-7 h-7 rounded-lg bg-smartdoc-blue text-white flex items-center justify-center shrink-0">
                <DocIcon name={parentDocument.iconName} className="w-4 h-4" />
              </div>
              <span>Part of: <strong className="text-smartdoc-blue">{parentDocument.name}</strong></span>
              <ArrowRight className="w-3.5 h-3.5 text-smartdoc-blue group-hover:translate-x-0.5 transition-transform" />
            </Link>

            <Badge variant="blue" size="sm" className="hidden sm:inline-flex capitalize">
              {parentDocument.category}
            </Badge>
          </div>

          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="navy" size="md">
                  {service.serviceType.toUpperCase()}
                </Badge>

                {service.isOnlineAvailable ? (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    <Globe className="w-3.5 h-3.5 text-emerald-600" />
                    <span>100% Online Service</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full">
                    <span>Center / In-Person Visit Required</span>
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-smartdoc-navy tracking-tight">
                {service.name}
              </h1>

              <p className="text-sm sm:text-base text-smartdoc-slate-muted max-w-3xl leading-relaxed">
                {service.shortDescription}
              </p>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-smartdoc-slate-subtle">
            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-smartdoc-slate-subtle/70 border border-smartdoc-slate-border">
              <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] uppercase tracking-wider font-semibold text-slate-500">
                  Estimated Turnaround
                </span>
                <p className="text-sm font-bold text-smartdoc-navy">
                  {service.estimatedTime}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-smartdoc-slate-subtle/70 border border-smartdoc-slate-border">
              <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <Banknote className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] uppercase tracking-wider font-semibold text-slate-500">
                  Statutory Fee
                </span>
                <p className="text-sm font-bold text-smartdoc-navy">
                  {service.fee.amount}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-smartdoc-slate-subtle/70 border border-smartdoc-slate-border">
              <div className="w-9 h-9 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
                <Building2 className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] uppercase tracking-wider font-semibold text-slate-500">
                  Issuing Authority
                </span>
                <p className="text-sm font-bold text-smartdoc-navy truncate" title={service.officialPlatform.authorityName}>
                  {service.officialPlatform.authorityName}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Two Columns Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Column (8 Cols) */}
          <div className="lg:col-span-8 space-y-8">
            {/* Purpose & What this service does */}
            <section className="bg-white rounded-2xl border border-smartdoc-slate-border p-6 shadow-card space-y-3">
              <h3 className="text-base font-bold text-smartdoc-navy flex items-center gap-2">
                <FileCheck2 className="w-4 h-4 text-smartdoc-blue" />
                <span>Purpose of This Service</span>
              </h3>
              <p className="text-sm text-smartdoc-slate-text leading-relaxed">
                {service.purpose}
              </p>
              {service.fee.details && (
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 mt-3">
                  <strong>Fee Breakdown:</strong> {service.fee.details}
                </div>
              )}
            </section>

            {/* Step-by-Step Walkthrough */}
            <section className="bg-white rounded-2xl border border-smartdoc-slate-border p-6 shadow-card space-y-4">
              <h3 className="text-base font-bold text-smartdoc-navy flex items-center gap-2">
                <ListOrdered className="w-4 h-4 text-smartdoc-blue" />
                <span>Step-by-Step Application Procedure</span>
              </h3>
              <ol className="space-y-3">
                {service.detailedProcess.map((step, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3.5 p-3.5 rounded-xl bg-smartdoc-slate-subtle/60 border border-smartdoc-slate-border text-sm"
                  >
                    <span className="w-6 h-6 rounded-full bg-smartdoc-navy text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {index + 1}
                    </span>
                    <span className="text-smartdoc-slate-text leading-relaxed">
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
            </section>

            {/* Required Documents Checklist */}
            <section className="bg-white rounded-2xl border border-smartdoc-slate-border p-6 shadow-card space-y-4">
              <h3 className="text-base font-bold text-smartdoc-navy flex items-center gap-2">
                <FileCheck2 className="w-4 h-4 text-smartdoc-green-dark" />
                <span>Required Supporting Documents</span>
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {service.requiredDocuments.map((docItem, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2.5 p-3 rounded-xl bg-smartdoc-slate-subtle/70 border border-smartdoc-slate-border text-xs sm:text-sm text-smartdoc-slate-text"
                  >
                    <ShieldCheck className="w-4 h-4 text-smartdoc-blue shrink-0 mt-0.5" />
                    <span>{docItem}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Sibling / Other Services */}
            {siblingServices.length > 0 && (
              <section className="space-y-4">
                <h3 className="text-base font-bold text-smartdoc-navy flex items-center gap-2">
                  <Layers className="w-4 h-4 text-smartdoc-blue" />
                  <span>Other Services for {parentDocument.name}</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {siblingServices.map((sib) => (
                    <Link
                      key={sib.id}
                      to={`/services/${sib.id}`}
                      className="p-4 rounded-xl bg-white border border-smartdoc-slate-border hover:border-smartdoc-blue hover:shadow-card transition-all group flex flex-col justify-between"
                    >
                      <div>
                        <span className="text-[10px] uppercase font-semibold text-slate-500">
                          {sib.serviceType}
                        </span>
                        <h4 className="text-sm font-bold text-smartdoc-navy group-hover:text-smartdoc-blue transition-colors">
                          {sib.name}
                        </h4>
                      </div>
                      <span className="text-xs font-semibold text-smartdoc-blue inline-flex items-center gap-1 mt-3">
                        View Service <ArrowRight className="w-3 h-3" />
                      </span>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Official Platform Direct Portal Card */}
            <PlatformLinkBadge platform={service.officialPlatform} />

            {/* Prerequisites & Criteria */}
            <div className="bg-white rounded-2xl border border-smartdoc-slate-border p-6 shadow-card space-y-4">
              <RequirementList requirements={service.requirements} title="Prerequisites & Conditions" />
            </div>

            {/* Return to parent document action */}
            <div className="p-5 rounded-2xl bg-white border border-smartdoc-slate-border shadow-subtle space-y-3">
              <h4 className="text-sm font-bold text-smartdoc-navy">Need full document info?</h4>
              <p className="text-xs text-smartdoc-slate-muted">
                View all eligibility criteria, validity regulations, and related documents for {parentDocument.name}.
              </p>
              <Button
                to={`/documents/${parentDocument.id}`}
                variant="outline"
                size="sm"
                className="w-full justify-center"
                leftIcon={ArrowLeft}
              >
                Back to {parentDocument.name}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};
