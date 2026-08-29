import React from 'react';
import { CheckCircle2, ArrowRight, ClipboardList } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export const BeforeYouApplySection: React.FC = () => {
  const checklistItems = [
    {
      title: 'Required documents are ready',
      detail: 'Keep clear digital scans (PDF/JPG) or original document proofs accessible.',
    },
    {
      title: 'Personal details match across records',
      detail: 'Confirm your name spelling, date of birth, and parentage match across all supporting IDs.',
    },
    {
      title: 'Aadhaar-linked mobile is active',
      detail: 'Ensure your registered mobile number is ready to receive instant authentication OTPs.',
    },
    {
      title: 'Official fees and turnaround checked',
      detail: 'Review statutory government fee amounts and expected processing timelines in advance.',
    },
    {
      title: 'Using the correct sovereign platform',
      detail: 'Verify the browser address bar contains verified official domains (.gov.in / .nic.in).',
    },
  ];

  return (
    <section className="py-12 sm:py-16 bg-[#F8FAFC] border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-card">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Header Area (5 Cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100">
                <ClipboardList className="w-6 h-6" />
              </div>
              <div className="space-y-1.5">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  Before You Apply
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  A few practical things to verify before starting any public document application or renewal process.
                </p>
              </div>

              <div className="pt-2">
                <Button
                  to="/documents"
                  variant="primary"
                  size="md"
                  rightIcon={ArrowRight}
                  className="font-semibold shadow-xs"
                >
                  View Service Requirements
                </Button>
              </div>
            </div>

            {/* Right Checklist Items (7 Cols) */}
            <div className="lg:col-span-7 space-y-3">
              {checklistItems.map((item, index) => (
                <div
                  key={index}
                  className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3 hover:bg-indigo-50/50 hover:border-indigo-100 transition-colors"
                >
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {item.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
