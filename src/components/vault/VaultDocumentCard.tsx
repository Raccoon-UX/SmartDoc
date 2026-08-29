import React, { useState } from 'react';
import { FileText, Image as ImageIcon, Eye, Download, MoreVertical, Edit2, Trash2, Calendar, HardDrive } from 'lucide-react';
import { VaultDocument } from '../../types/vault';
import { Badge } from '../ui/Badge';
import { formatFileSize } from '../../lib/fileValidation';
import { cn } from '../../lib/utils';

export interface VaultDocumentCardProps {
  document: VaultDocument;
  onView: (document: VaultDocument) => void;
  onDownload: (document: VaultDocument) => void;
  onRename: (document: VaultDocument) => void;
  onDelete: (document: VaultDocument) => void;
  className?: string;
}

export const VaultDocumentCard: React.FC<VaultDocumentCardProps> = ({
  document,
  onView,
  onDownload,
  onRename,
  onDelete,
  className,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isPdf = document.mimeType.includes('pdf') || document.fileName.toLowerCase().endsWith('.pdf');
  const isImage = document.mimeType.includes('image') || document.documentType === 'image';

  const formattedDate = new Date(document.createdAt).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <div
      className={cn(
        'group relative bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-card hover:shadow-card-hover hover:border-slate-300/90 transition-all duration-200 flex flex-col justify-between',
        className
      )}
    >
      {/* Top Header */}
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          {/* Document Type Icon */}
          <div
            className={cn(
              'w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border transition-all duration-200',
              isPdf
                ? 'bg-rose-50 text-rose-600 border-rose-100/80 group-hover:bg-rose-600 group-hover:text-white'
                : isImage
                ? 'bg-indigo-50 text-indigo-600 border-indigo-100/80 group-hover:bg-indigo-600 group-hover:text-white'
                : 'bg-slate-50 text-slate-600 border-slate-200/80 group-hover:bg-slate-800 group-hover:text-white'
            )}
          >
            {isPdf ? (
              <FileText className="w-5 h-5" />
            ) : isImage ? (
              <ImageIcon className="w-5 h-5" />
            ) : (
              <FileText className="w-5 h-5" />
            )}
          </div>

          {/* Category Badge & More Actions */}
          <div className="flex items-center gap-1.5">
            <Badge variant="indigo" size="sm" className="capitalize text-[10px] truncate max-w-[130px]">
              {document.category}
            </Badge>

            {/* Menu Trigger */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                aria-label="Document options"
              >
                <MoreVertical className="w-4 h-4" />
              </button>

              {/* Action Dropdown Menu */}
              {isMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-20"
                    onClick={() => setIsMenuOpen(false)}
                  />
                  <div className="absolute right-0 top-full mt-1 w-36 bg-white rounded-xl border border-slate-200 shadow-card-hover z-30 p-1 divide-y divide-slate-100 animate-in fade-in-50 zoom-in-95 duration-100">
                    <div className="py-0.5">
                      <button
                        type="button"
                        onClick={() => {
                          setIsMenuOpen(false);
                          onRename(document);
                        }}
                        className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs text-slate-700 hover:bg-slate-50 rounded-lg text-left"
                      >
                        <Edit2 className="w-3.5 h-3.5 text-slate-500" />
                        <span>Rename</span>
                      </button>
                    </div>
                    <div className="py-0.5">
                      <button
                        type="button"
                        onClick={() => {
                          setIsMenuOpen(false);
                          onDelete(document);
                        }}
                        className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs text-rose-600 hover:bg-rose-50 rounded-lg text-left font-medium"
                      >
                        <Trash2 className="w-3.5 h-3.5 text-rose-500" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Title & Description */}
        <div className="space-y-1">
          <h3
            className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors truncate cursor-pointer"
            onClick={() => onView(document)}
            title={document.name}
          >
            {document.name}
          </h3>
          {document.description ? (
            <p className="text-xs text-slate-500 line-clamp-1">
              {document.description}
            </p>
          ) : (
            <p className="text-xs text-slate-400 italic truncate">
              {document.fileName}
            </p>
          )}
        </div>
      </div>

      {/* Metadata & Quick Actions */}
      <div className="mt-4 pt-3 border-t border-slate-100 space-y-3">
        <div className="flex items-center justify-between text-[11px] text-slate-500">
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3 text-slate-400" />
            <span>{formattedDate}</span>
          </span>
          <span className="flex items-center gap-1 font-mono text-[11px] text-slate-500 bg-slate-50 px-1.5 py-0.5 rounded border border-slate-100">
            <HardDrive className="w-3 h-3 text-slate-400" />
            <span>{formatFileSize(document.fileSize)}</span>
          </span>
        </div>

        {/* Primary Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            type="button"
            onClick={() => onView(document)}
            className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-50 hover:bg-indigo-50 text-slate-800 hover:text-indigo-600 text-xs font-semibold border border-slate-200/80 transition-colors min-h-[36px]"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>View</span>
          </button>
          <button
            type="button"
            onClick={() => onDownload(document)}
            className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-50 hover:bg-indigo-50 text-slate-800 hover:text-indigo-600 text-xs font-semibold border border-slate-200/80 transition-colors min-h-[36px]"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download</span>
          </button>
        </div>
      </div>
    </div>
  );
};
