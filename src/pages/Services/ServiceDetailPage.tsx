import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PageContainer } from '../../components/layout/PageContainer';
import { Breadcrumbs } from '../../components/navigation/Breadcrumbs';
import { Badge } from '../../components/ui/Badge';
import { DocIcon } from '../../components/ui/DocIcon';
import { Button } from '../../components/ui/Button';
import { PlatformLinkBadge } from '../../components/services/PlatformLinkBadge';
import { InteractiveChecklist } from '../../components/documents/InteractiveChecklist';
import { StateSelector } from '../../components/documents/StateSelector';
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
  Building2,
  Share2,
  Printer,
} from 'lucide-react';
import { useShare } from '../../hooks/useShare';

export const ServiceDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const service = id ? getServiceById(id) : undefined;
  const parentDocument = service ? getDocumentById(service.documentId) : undefined;
  const [selectedStateCode, setSelectedStateCode] = useState<string | undefined>(undefined);
  const { share, isCopied } = useShare();

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

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    share({
      title: `${service.name} Requirements — SmartDoc`,
      text: `Check requirements, fees, and official links for ${service.name} (${parentDocument.name}) on SmartDoc.`,
    });
  };

  return (
    <PageContainer>
      <div className="space-y-10">
        {/* Breadcrumb Navigation */}
        <Breadcrumbs items={breadcrumbs} className="print:hidden" />

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

            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handlePrint}
                leftIcon={Printer}
                className="hidden sm:inline-flex text-xs"
              >
                Print Checklist
              </Button>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={handleShare}
                leftIcon={Share2}
                className="text-xs"
              >
                {isCopied ? 'Link Copied!' : 'Share'}
              </Button>
            </div>
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

            {/* Interactive & Printable Required Documents Checklist */}
            <section>
              <InteractiveChecklist
                title="Required Supporting Documents Checklist"
                documentName={parentDocument.name}
                serviceName={service.name}
                requirements={service.requiredDocuments}
                officialPlatformName={service.officialPlatform.name}
              />
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
            {/* Optional State Guidance */}
            {parentDocument.supportsStateSpecific && (
              <div className="bg-white rounded-2xl border border-smartdoc-slate-border p-6 shadow-card space-y-3">
                <h4 className="text-sm font-bold text-smartdoc-navy">State-Specific Procedure</h4>
                <p className="text-xs text-smartdoc-slate-muted">
                  Select your state to verify if digital slot booking or online test is supported in your transport/municipal portal.
                </p>
                <StateSelector
                  selectedStateCode={selectedStateCode}
                  onSelectState={setSelectedStateCode}
                  label=""
                />
              </div>
            )}

            {/* Official Platform Direct Portal Card */}
            <PlatformLinkBadge platform={service.officialPlatform} />

            {/* Prerequisites & Criteria */}
            <div className="bg-white rounded-2xl border border-smartdoc-slate-border p-6 shadow-card space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-smartdoc-navy">
                Eligibility & Conditions
              </h4>
              <ul className="space-y-2">
                {service.requirements.map((req) => (
                  <li
                    key={req.id}
                    className="p-3 rounded-xl bg-smartdoc-slate-subtle/70 border border-smartdoc-slate-border text-xs text-smartdoc-slate-text space-y-1"
                  >
                    <div className="flex items-center justify-between font-semibold text-smartdoc-navy">
                      <span>{req.title}</span>
                      {req.isMandatory && (
                        <span className="text-[9px] uppercase font-bold text-rose-600 bg-rose-50 px-1 py-0.2 rounded border border-rose-200">
                          Mandatory
                        </span>
                      )}
                    </div>
                    {req.description && (
                      <p className="text-slate-500">{req.description}</p>
                    )}
                  </li>
                ))}
              </ul>
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
