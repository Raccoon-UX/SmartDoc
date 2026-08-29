import React, { useState, useRef } from 'react';
import { X, Upload, FileText, AlertCircle, ShieldCheck } from 'lucide-react';
import { UploadDocumentPayload, VaultCategory } from '../../types/vault';
import { validateDocumentFile, MAX_FILE_SIZE_MB, formatFileSize } from '../../lib/fileValidation';
import { Button } from '../ui/Button';

export interface UploadDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (payload: UploadDocumentPayload) => Promise<void>;
}

export const CATEGORY_OPTIONS: { id: VaultCategory; label: string }[] = [
  { id: 'identity', label: 'Identity & Personal' },
  { id: 'financial', label: 'Banking, Tax & Finance' },
  { id: 'insurance', label: 'Insurance & Protection' },
  { id: 'investments', label: 'Investments & Savings' },
  { id: 'transport', label: 'Transport & Vehicles' },
  { id: 'property', label: 'Property & Utilities' },
  { id: 'education', label: 'Education & Academics' },
  { id: 'employment', label: 'Employment & Social Security' },
  { id: 'health', label: 'Health & Medical' },
  { id: 'travel', label: 'Travel & Immigration' },
  { id: 'civic', label: 'Civic & Grievances' },
  { id: 'certificates', label: 'Vital Records & Certificates' },
  { id: 'business', label: 'Business & Professional' },
  { id: 'schemes', label: 'Government Schemes' },
  { id: 'other', label: 'Other Documents' },
];

export const UploadDocumentModal: React.FC<UploadDocumentModalProps> = ({
  isOpen,
  onClose,
  onUpload,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState('');
  const [category, setCategory] = useState<VaultCategory>('identity');
  const [description, setDescription] = useState('');
  const [issuingAuthority, setIssuingAuthority] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileSelect = (selectedFile: File) => {
    setErrorMessage(null);
    const validation = validateDocumentFile(selectedFile);

    if (!validation.isValid) {
      setErrorMessage(validation.error || 'Invalid file.');
      setFile(null);
      return;
    }

    setFile(selectedFile);
    // Suggest default document name from file name without extension
    const baseName = selectedFile.name.replace(/\.[^/.]+$/, '').replace(/[_-]/g, ' ');
    if (!name) {
      setName(baseName.charAt(0).toUpperCase() + baseName.slice(1));
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setErrorMessage('Please select a file to upload.');
      return;
    }

    if (!name.trim()) {
      setErrorMessage('Please enter a document name.');
      return;
    }

    setIsUploading(true);
    setErrorMessage(null);

    try {
      await onUpload({
        file,
        name: name.trim(),
        category,
        description: description.trim() || undefined,
        issuingAuthority: issuingAuthority.trim() || undefined,
      });
      // Reset & close
      setFile(null);
      setName('');
      setDescription('');
      setIssuingAuthority('');
      onClose();
    } catch (err: any) {
      setErrorMessage(err.message || 'Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in-50 duration-150 overflow-y-auto">
      <div
        className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-elevated w-full max-w-lg overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-150 my-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="upload-modal-title"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-slate-100 bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100">
              <Upload className="w-4 h-4" />
            </div>
            <div>
              <h3 id="upload-modal-title" className="text-sm sm:text-base font-bold text-slate-900">
                Upload Document to Vault
              </h3>
              <p className="text-[11px] text-slate-500">
                Stored privately in your encrypted user storage
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form Body */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 overflow-y-auto space-y-4 text-xs sm:text-sm">
          {errorMessage && (
            <div className="bg-rose-50 border border-rose-200/80 rounded-xl p-3 text-xs text-rose-800 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span className="font-medium">{errorMessage}</span>
            </div>
          )}

          {/* Drag & Drop File Upload Area */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-5 sm:p-6 text-center cursor-pointer transition-all ${
              isDragging
                ? 'border-indigo-600 bg-indigo-50/50 scale-[0.99]'
                : file
                ? 'border-emerald-300 bg-emerald-50/30'
                : 'border-slate-300 hover:border-indigo-400 hover:bg-slate-50'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  handleFileSelect(e.target.files[0]);
                }
              }}
              className="hidden"
            />

            {file ? (
              <div className="space-y-1 flex flex-col items-center">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <FileText className="w-5 h-5" />
                </div>
                <p className="font-bold text-slate-900 text-xs sm:text-sm truncate max-w-xs">
                  {file.name}
                </p>
                <p className="text-[11px] text-slate-500 font-mono">
                  {formatFileSize(file.size)} • Click to choose a different file
                </p>
              </div>
            ) : (
              <div className="space-y-1.5 flex flex-col items-center">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100/70">
                  <Upload className="w-5 h-5" />
                </div>
                <p className="font-semibold text-slate-900 text-xs sm:text-sm">
                  Click to select file or drag & drop here
                </p>
                <p className="text-[11px] text-slate-400">
                  Supported: PDF, JPG, PNG (Max {MAX_FILE_SIZE_MB}MB)
                </p>
              </div>
            )}
          </div>

          {/* Document Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-800">
              Document Display Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. My Aadhaar Card, Driving Licence Copy"
              required
              className="w-full bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 rounded-xl py-2 px-3 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 shadow-2xs"
            />
          </div>

          {/* Category Picker */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-800">
              Document Category <span className="text-rose-500">*</span>
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as VaultCategory)}
              className="w-full bg-white border border-slate-200 text-slate-900 rounded-xl py-2 px-3 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 shadow-2xs cursor-pointer"
            >
              {CATEGORY_OPTIONS.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Issuing Authority (Optional) */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-800">
              Issuing Authority (Optional)
            </label>
            <input
              type="text"
              value={issuingAuthority}
              onChange={(e) => setIssuingAuthority(e.target.value)}
              placeholder="e.g. UIDAI, Income Tax Dept, MoRTH"
              className="w-full bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 rounded-xl py-2 px-3 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 shadow-2xs"
            />
          </div>

          {/* Notes / Description (Optional) */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-800">
              Notes or Description (Optional)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add any reminders, reference numbers, or context..."
              rows={2}
              className="w-full bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 rounded-xl py-2 px-3 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 shadow-2xs"
            />
          </div>

          {/* Security Assurance */}
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-[11px] text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Files are encrypted and stored in your private storage folder.</span>
          </div>

          {/* Modal Actions */}
          <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onClose}
              disabled={isUploading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="sm"
              isLoading={isUploading}
              disabled={!file || !name.trim()}
              leftIcon={Upload}
              className="font-semibold"
            >
              Upload to Vault
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
