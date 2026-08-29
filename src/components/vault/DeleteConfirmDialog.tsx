import React, { useState } from 'react';
import { Trash2, AlertTriangle, AlertCircle } from 'lucide-react';
import { VaultDocument } from '../../types/vault';
import { Button } from '../ui/Button';

export interface DeleteConfirmDialogProps {
  document: VaultDocument | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirmDelete: (doc: VaultDocument) => Promise<void>;
}

export const DeleteConfirmDialog: React.FC<DeleteConfirmDialogProps> = ({
  document,
  isOpen,
  onClose,
  onConfirmDelete,
}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen || !document) return null;

  const handleDelete = async () => {
    setIsDeleting(true);
    setErrorMessage(null);

    try {
      await onConfirmDelete(document);
      onClose();
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to delete document.');
      setIsDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in-50 duration-150">
      <div
        className="bg-white rounded-3xl border border-smartdoc-slate-border shadow-elevated w-full max-w-md overflow-hidden p-6 space-y-5 animate-in zoom-in-95 duration-150"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-desc"
      >
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center shrink-0 border border-red-200">
            <Trash2 className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 id="delete-dialog-title" className="text-base font-bold text-smartdoc-navy">
              Delete Document?
            </h3>
            <p id="delete-dialog-desc" className="text-xs text-smartdoc-slate-muted leading-relaxed">
              Are you sure you want to delete <span className="font-bold text-smartdoc-navy">"{document.name}"</span>? This will permanently remove the file from your SmartDoc vault and cannot be undone.
            </p>
          </div>
        </div>

        {errorMessage && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-3 text-xs text-red-800 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        <div className="p-3 bg-amber-50/70 border border-amber-200/80 rounded-2xl flex items-center gap-2.5 text-[11px] text-amber-900">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
          <span>Both database record and encrypted cloud file will be permanently purged.</span>
        </div>

        <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onClose}
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="danger"
            size="sm"
            onClick={handleDelete}
            isLoading={isDeleting}
            leftIcon={Trash2}
            className="bg-red-600 hover:bg-red-700 text-white font-bold"
          >
            Delete Permanently
          </Button>
        </div>
      </div>
    </div>
  );
};
