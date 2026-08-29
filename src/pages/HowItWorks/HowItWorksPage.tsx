import React from 'react';
import { PageContainer } from '../../components/layout/PageContainer';
import { Breadcrumbs } from '../../components/navigation/Breadcrumbs';
import { SectionHeader } from '../../components/ui/SectionHeader';
import { Button } from '../../components/ui/Button';
import {
  Search,
  FileCheck2,
  ExternalLink,
  FolderKanban,
  ShieldCheck,
  AlertTriangle,
  Lock,
  ArrowRight,
  Sparkles,
  HelpCircle,
} from 'lucide-react';

export const HowItWorksPage: React.FC = () => {
  const breadcrumbs = [
    { label: 'How It Works', active: true },
  ];

  const workflowSteps = [
    {
      step: '01',
      title: 'Search & Identify Service',
      description:
        'Search our structured database by document name (e.g., "PAN Card", "Aadhaar", "Passport") or specific transaction type (e.g., "Address change", "Instant e-PAN", "Learner Licence").',
      icon: Search,
      tag: 'Discovery',
    },
    {
      step: '02',
      title: 'Analyze Requirements & Checklist',
      description:
        'Review comprehensive checklists of mandatory Proof of Identity (PoI), Proof of Address (PoA), Proof of Date of Birth (DoB), applicable statutory fees, and turnaround estimates.',
      icon: FileCheck2,
      tag: 'Preparation',
    },
    {
      step: '03',
      title: 'Direct Navigation to Verified Official Portals',
      description:
        'Access direct, verified links to official government platforms (such as UIDAI, Income Tax e-Filing, Passport Seva, Sarathi Parivahan, ECI, and CRS) without risk of navigating to phishing or intermediate agency sites.',
      icon: ExternalLink,
      tag: 'Verification',
    },
    {
      step: '04',
      title: 'Manage Your Personal Digital Document Vault',
      description:
        'Securely organize, categorize, label, and keep copies of your active documents in your SmartDoc private dashboard for convenient instant access during applications.',
      icon: FolderKanban,
      tag: 'Management',
    },
  ];

  const safetyRules = [
    {
      title: 'Always Verify the Domain Extension',
      description:
        'Legitimate Indian central and state government portals operate primarily on .gov.in or .nic.in domains. Be skeptical of commercial .com, .in, or .org portals charging unofficial processing commissions.',
      icon: ShieldCheck,
      color: 'text-blue-600 bg-blue-50 border-blue-200',
    },
    {
      title: 'Never Share OTPs via Third-Party Links',
      description:
        'UIDAI, Income Tax, and Passport Seva will never ask for OTPs via unauthorized phone calls, SMS links, or social media messaging.',
      icon: Lock,
      color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
    },
    {
      title: 'Cross-Check Fee Schedules',
      description:
        'Statutory government fees are standardized (e.g. ₹50 for Aadhaar demographic update, ₹1,500 for normal passport). SmartDoc lists accurate official fee brackets so you know what to expect.',
      icon: AlertTriangle,
      color: 'text-amber-600 bg-amber-50 border-amber-200',
    },
  ];

  const faqItems = [
    {
      q: 'Is SmartDoc an official government portal?',
      a: 'No. SmartDoc is an independent public information system and digital document management platform. We provide verified navigation links and comprehensive procedural guides to official government departments.',
    },
    {
      q: 'Does SmartDoc charge for government services?',
      a: 'No. SmartDoc does not collect government fees or charge for directing you to official portals. All statutory fees are paid directly to the respective government department or authorized service agency.',
    },
    {
      q: 'How does SmartDoc verify official links?',
      a: 'Our directory indexes only official sovereign portals administered by recognized ministries (UIDAI, Ministry of Finance, Ministry of External Affairs, MoRTH, ECI, and Registrar General of India).',
    },
    {
      q: 'How will the User Dashboard work?',
      a: 'The dashboard will allow you to store, categorize, view, rename, and manage your personal document files securely with user-specific access control.',
    },
  ];

  return (
    <PageContainer>
      <div className="space-y-12 max-w-5xl mx-auto">
        {/* Breadcrumb Navigation */}
        <Breadcrumbs items={breadcrumbs} />

        {/* Page Hero */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-smartdoc-blue-soft border border-smartdoc-blue-border text-smartdoc-blue-dark text-xs font-semibold">
            <Sparkles className="w-4 h-4 text-smartdoc-blue" />
            <span>Platform Overview & Guide</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-smartdoc-navy tracking-tight">
            How SmartDoc Works
          </h1>
          <p className="text-base sm:text-lg text-smartdoc-slate-muted leading-relaxed">
            A comprehensive, transparent guide to navigating public document services and keeping your records organized.
          </p>
        </div>

        {/* Step-by-Step Flow Grid */}
        <div className="space-y-6">
          <SectionHeader
            tag="Systematic Workflow"
            title="The 4-Step Document Lifecycle"
            description="How SmartDoc simplifies discovery, compliance, and document organization."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {workflowSteps.map((step) => {
              const StepIcon = step.icon;

              return (
                <div
                  key={step.step}
                  className="bg-white rounded-2xl border border-smartdoc-slate-border p-7 shadow-card hover:shadow-card-hover hover:border-slate-300 transition-all duration-200 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-3xl font-black text-smartdoc-blue/25 font-mono">
                        {step.step}
                      </span>
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-smartdoc-blue-soft text-smartdoc-blue border border-smartdoc-blue-border/60">
                        {step.tag}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-smartdoc-navy text-white flex items-center justify-center shrink-0 shadow-xs">
                        <StepIcon className="w-5 h-5 text-blue-300" />
                      </div>
                      <h3 className="text-lg font-bold text-smartdoc-navy">
                        {step.title}
                      </h3>
                    </div>

                    <p className="text-sm text-smartdoc-slate-muted leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Safety and Anti-Fraud Education */}
        <div className="bg-smartdoc-navy text-white rounded-3xl p-8 sm:p-10 shadow-elevated space-y-8 relative overflow-hidden">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-300">
              Cybersecurity & Public Safety
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Recognizing Official Portals vs Fake Websites
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Urban residents frequently fall victim to clone portals that charge exorbitant hidden fees or harvest personal identity information. Follow these three rules to stay safe:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {safetyRules.map((rule) => {
              const RuleIcon = rule.icon;

              return (
                <div
                  key={rule.title}
                  className="bg-white/10 rounded-2xl p-5 border border-white/10 space-y-3 flex flex-col justify-between"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                    <RuleIcon className="w-5 h-5 text-blue-300" />
                  </div>
                  <h4 className="text-base font-bold text-white">
                    {rule.title}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {rule.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-3xl border border-smartdoc-slate-border p-8 sm:p-10 shadow-card space-y-8">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-smartdoc-blue">
              Common Inquiries
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-smartdoc-navy">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqItems.map((faq, index) => (
              <div key={index} className="space-y-2 p-5 rounded-2xl bg-smartdoc-slate-subtle/50 border border-smartdoc-slate-border">
                <h4 className="text-base font-bold text-smartdoc-navy flex items-start gap-2">
                  <HelpCircle className="w-4 h-4 text-smartdoc-blue shrink-0 mt-1" />
                  <span>{faq.q}</span>
                </h4>
                <p className="text-xs sm:text-sm text-smartdoc-slate-muted pl-6 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Bar */}
        <div className="p-8 rounded-2xl bg-gradient-to-r from-smartdoc-blue-soft to-blue-100/50 border border-smartdoc-blue-border flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-lg font-bold text-smartdoc-navy">Ready to explore document services?</h3>
            <p className="text-xs sm:text-sm text-smartdoc-slate-muted">
              Browse our directory or access your personal document dashboard.
            </p>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Button to="/documents" variant="primary" size="md" rightIcon={ArrowRight} className="w-full sm:w-auto">
              Open Document Directory
            </Button>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};
