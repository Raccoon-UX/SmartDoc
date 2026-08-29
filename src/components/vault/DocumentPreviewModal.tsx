import React, { useState, useEffect } from 'react';
import { X, Download, FileText, Loader2, AlertCircle, ExternalLink } from 'lucide-react';
import { VaultDocument } from '../../types/vault';
import { getSignedDocumentUrl } from '../../services/vaultService';
import { formatFileSize } from '../../lib/fileValidation';
import { Button } from '../ui/Button';

export interface DocumentPreviewModalProps {
  document: VaultDocument | null;
  isOpen: boolean;
  onClose: () => void;
  onDownload: (doc: VaultDocument) => void;
}

export const DocumentPreviewModal: React.FC<DocumentPreviewModalProps> = ({
  document,
  isOpen,
  onClose,
  onDownload,
}) => {
  const [signedUrl, setSignedUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && document) {
      setIsLoading(true);
      setError(null);
      getSignedDocumentUrl(document.filePath, 300)
        .then((url) => {
          setSignedUrl(url);
          setIsLoading(false);
        })
        .catch((err) => {
          setError(err.message || 'Failed to load preview.');
          setIsLoading(false);
        });
    } else {
      setSignedUrl(null);
    }
  }, [isOpen, document]);

  if (!isOpen || !document) return null;

  const isPdf = document.mimeType.includes('pdf') || document.fileName.toLowerCase().endsWith('.pdf');
  const isImage = document.mimeType.includes('image') || document.documentType === 'image';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-slate-900/70 backdrop-blur-xs animate-in fade-in-50 duration-150">
      <div
        className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-elevated w-full max-w-4xl h-[90vh] sm:h-[86vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-150"
        role="dialog"
        aria-modal="true"
        aria-labelledby="preview-modal-title"
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-slate-100 bg-slate-50/90 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 border border-indigo-100">
              <FileText className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <h3 id="preview-modal-title" className="text-xs sm:text-base font-bold text-slate-900 truncate">
                {document.name}
              </h3>
              <p className="text-[10px] sm:text-[11px] text-slate-500 font-mono truncate">
                {document.fileName} • {formatFileSize(document.fileSize)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDownload(document)}
              leftIcon={Download}
              className="text-xs font-semibold"
            >
              <span className="hidden sm:inline">Download</span>
            </Button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Preview Content Area */}
        <div className="flex-1 bg-slate-100/70 relative overflow-hidden flex items-center justify-center">
          {isLoading && (
            <div className="flex flex-col items-center justify-center gap-2 text-slate-500">
              <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
              <p className="text-xs font-medium">Generating secure temporary preview...</p>
            </div>
          )}

          {error && (
            <div className="p-6 text-center space-y-3 max-w-sm">
              <AlertCircle className="w-10 h-10 text-amber-500 mx-auto" />
              <h4 className="text-sm font-bold text-slate-900">Preview Unavailable</h4>
              <p className="text-xs text-slate-500">
                You can download the document directly using the button below.
              </p>
              <Button
                variant="primary"
                size="sm"
                onClick={() => onDownload(document)}
                leftIcon={Download}
                className="text-xs font-semibold"
              >
                Download Document
              </Button>
            </div>
          )}

          {!isLoading && !error && signedUrl && (
            <>
              {isPdf ? (
                <iframe
                  src={`${signedUrl}#toolbar=0`}
                  title={document.name}
                  className="w-full h-full border-none"
                />
              ) : isImage ? (
                <div className="w-full h-full p-3 sm:p-4 flex items-center justify-center overflow-auto">
                  <img
                    src={signedUrl}
                    alt={document.name}
                    className="max-w-full max-h-full object-contain rounded-xl shadow-md border border-slate-200"
                  />
                </div>
              ) : (
                <div className="text-center p-6 space-y-3">
                  <FileText className="w-12 h-12 text-slate-400 mx-auto" />
                  <p className="text-sm font-bold text-slate-900">
                    Browser preview is not supported for this file type.
                  </p>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => onDownload(document)}
                    leftIcon={Download}
                    className="text-xs font-semibold"
                  >
                    Download File
                  </Button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer Security Bar */}
        <div className="px-4 sm:px-6 py-2.5 bg-white border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 shrink-0">
          <span>Temporary preview token expires in 5 minutes</span>
          {signedUrl && (
            <a
              href={signedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:text-indigo-700 hover:underline inline-flex items-center gap-1 font-semibold"
            >
              <span>Open raw file</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
