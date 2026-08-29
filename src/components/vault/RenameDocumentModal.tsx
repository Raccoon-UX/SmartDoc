import React, { useState, useEffect } from 'react';
import { X, Edit2, AlertCircle } from 'lucide-react';
import { VaultDocument } from '../../types/vault';
import { Button } from '../ui/Button';

export interface RenameDocumentModalProps {
  document: VaultDocument | null;
  isOpen: boolean;
  onClose: () => void;
  onRename: (docId: string, newName: string) => Promise<void>;
}

export const RenameDocumentModal: React.FC<RenameDocumentModalProps> = ({
  document,
  isOpen,
  onClose,
  onRename,
}) => {
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (document) {
      setName(document.name);
      setErrorMessage(null);
    }
  }, [document, isOpen]);

  if (!isOpen || !document) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) {
      setErrorMessage('Document name cannot be empty.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      await onRename(document.id, trimmed);
      onClose();
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to rename document.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in-50 duration-150">
      <div
        className="bg-white rounded-3xl border border-smartdoc-slate-border shadow-elevated w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-150"
        role="dialog"
        aria-modal="true"
        aria-labelledby="rename-modal-title"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-smartdoc-blue-soft text-smartdoc-blue flex items-center justify-center">
              <Edit2 className="w-4 h-4" />
            </div>
            <h3 id="rename-modal-title" className="text-base font-bold text-smartdoc-navy">
              Rename Document
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-smartdoc-navy hover:bg-slate-100 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {errorMessage && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-3 text-xs text-red-800 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-smartdoc-navy">
              New Document Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Aadhaar Card 2026"
              required
              autoFocus
              className="w-full bg-white border border-smartdoc-slate-border text-smartdoc-navy rounded-xl py-2.5 px-3.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-smartdoc-blue/20 focus:border-smartdoc-blue"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="sm"
              isLoading={isSubmitting}
              disabled={!name.trim() || name.trim() === document.name}
            >
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
