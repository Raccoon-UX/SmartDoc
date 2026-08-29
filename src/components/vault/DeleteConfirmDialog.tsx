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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in-50 duration-150">
      <div
        className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-elevated w-full max-w-md overflow-hidden p-5 sm:p-6 space-y-5 animate-in zoom-in-95 duration-150"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-desc"
      >
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 border border-rose-100">
            <Trash2 className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h3 id="delete-dialog-title" className="text-sm sm:text-base font-bold text-slate-900">
              Delete Document?
            </h3>
            <p id="delete-dialog-desc" className="text-xs text-slate-500 leading-relaxed">
              Are you sure you want to delete <span className="font-semibold text-slate-900">"{document.name}"</span>? This will permanently remove the file from your SmartDoc vault and cannot be undone.
            </p>
          </div>
        </div>

        {errorMessage && (
          <div className="bg-rose-50 border border-rose-200/80 rounded-xl p-3 text-xs text-rose-800 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <span className="font-medium">{errorMessage}</span>
          </div>
        )}

        <div className="p-3 bg-amber-50/80 border border-amber-200/80 rounded-xl flex items-center gap-2.5 text-[11px] text-amber-900">
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
            className="font-semibold"
          >
            Delete Permanently
          </Button>
        </div>
      </div>
    </div>
  );
};
