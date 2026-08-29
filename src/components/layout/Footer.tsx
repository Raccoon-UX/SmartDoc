import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../navigation/Logo';
import { ShieldAlert, FileText, CheckCircle2, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const publicLinks = [
    { label: 'Home', to: '/' },
    { label: 'Document Directory', to: '/documents' },
    { label: 'How It Works', to: '/how-it-works' },
    { label: 'User Dashboard (Preview)', to: '/dashboard' },
  ];

  const popularDocs = [
    { label: 'Aadhaar Card', to: '/documents/aadhaar-card' },
    { label: 'PAN Card', to: '/documents/pan-card' },
    { label: 'Indian Passport', to: '/documents/passport' },
    { label: 'Driving Licence', to: '/documents/driving-licence' },
    { label: 'Voter ID (EPIC)', to: '/documents/voter-id' },
    { label: 'Birth Certificate', to: '/documents/birth-certificate' },
  ];

  return (
    <footer className="bg-smartdoc-navy text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <Logo size="md" isLink={false} variant="dark" />
            <p className="text-sm text-slate-300 leading-relaxed max-w-md">
              Find official document services and manage your important documents in one place.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Verified Direct Portals</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs text-slate-300">
                <FileText className="w-3.5 h-3.5 text-blue-400" />
                <span>Clear Requirements</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-100">
              Platform Navigation
            </h4>
            <ul className="space-y-2 text-sm">
              {publicLinks.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-slate-400 hover:text-white transition-colors inline-flex items-center gap-1 group"
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Core Documents */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-100">
              Public Document Services
            </h4>
            <ul className="grid grid-cols-2 gap-2 text-sm">
              {popularDocs.map((doc) => (
                <li key={doc.to}>
                  <Link
                    to={doc.to}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    {doc.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Disclaimer Notice Banner */}
        <div className="rounded-xl bg-slate-900/80 border border-slate-800 p-4 sm:p-5 flex items-start gap-3.5">
          <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs text-slate-300 leading-relaxed">
            <p className="font-semibold text-white">
              Official Verification & Non-Affiliation Notice
            </p>
            <p>
              SmartDoc is an independent information directory and digital document management platform created to assist users in identifying verified service channels and requirements. SmartDoc is <strong>not</strong> an official government entity and is not affiliated with, endorsed by, or operating on behalf of any government department.
            </p>
            <p className="text-slate-400">
              Always verify the domain name (e.g. <code>.gov.in</code> / <code>.nic.in</code>) and security certificate when visiting external portals before submitting personal credentials or sensitive documents.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {currentYear} SmartDoc. Public Service & Digital Document Management System.</p>
          <div className="flex items-center gap-6">
            <Link to="/how-it-works" className="hover:text-slate-300 transition-colors">
              How It Works
            </Link>
            <Link to="/documents" className="hover:text-slate-300 transition-colors">
              Document Directory
            </Link>
            <a
              href="https://github.com/Raccoon-UX/SmartDoc.git"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors inline-flex items-center gap-1 text-slate-300 font-semibold"
            >
              <span>GitHub</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
