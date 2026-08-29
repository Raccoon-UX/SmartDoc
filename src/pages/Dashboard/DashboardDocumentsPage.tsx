import React, { useState, useEffect, useMemo } from 'react';
import { PageContainer } from '../../components/layout/PageContainer';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../components/ui/Toast';
import {
  fetchUserDocuments,
  uploadVaultDocument,
  renameVaultDocument,
  deleteVaultDocument,
  downloadVaultDocumentBlob,
} from '../../services/vaultService';
import { VaultDocument, VaultSortOption, UploadDocumentPayload } from '../../types/vault';
import { VaultDocumentCard } from '../../components/vault/VaultDocumentCard';
import { UploadDocumentModal, CATEGORY_OPTIONS } from '../../components/vault/UploadDocumentModal';
import { DocumentPreviewModal } from '../../components/vault/DocumentPreviewModal';
import { RenameDocumentModal } from '../../components/vault/RenameDocumentModal';
import { DeleteConfirmDialog } from '../../components/vault/DeleteConfirmDialog';
import { DashboardNav } from '../../components/dashboard/DashboardNav';
import { Button } from '../../components/ui/Button';
import {
  Search,
  Upload,
  Filter,
  ArrowUpDown,
  FolderOpen,
  ShieldCheck,
  Loader2,
  X,
} from 'lucide-react';

export const DashboardDocumentsPage: React.FC = () => {
  const { user } = useAuth();
  const { showToast } = useToast();

  const [documents, setDocuments] = useState<VaultDocument[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortOption, setSortOption] = useState<VaultSortOption>('recent');

  // Modals
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [previewDoc, setPreviewDoc] = useState<VaultDocument | null>(null);
  const [renameDoc, setRenameDoc] = useState<VaultDocument | null>(null);
  const [deleteDoc, setDeleteDoc] = useState<VaultDocument | null>(null);

  const loadDocuments = async () => {
    if (!user) return;
    setIsLoading(true);
    try {
      const data = await fetchUserDocuments(user.id, {
        category: selectedCategory,
        sort: sortOption,
      });
      setDocuments(data);
    } catch (err: any) {
      console.error('Error fetching documents:', err);
      showToast('Failed to load documents.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadDocuments();
  }, [user, selectedCategory, sortOption]);

  const handleUpload = async (payload: UploadDocumentPayload) => {
    if (!user) return;
    try {
      await uploadVaultDocument(user.id, payload);
      showToast('Document uploaded securely!', 'success');
      loadDocuments();
    } catch (err: any) {
      showToast(err.message || 'Upload failed.', 'error');
      throw err;
    }
  };

  const handleRename = async (docId: string, newName: string) => {
    if (!user) return;
    try {
      await renameVaultDocument(docId, user.id, newName);
      showToast('Document renamed.', 'success');
      loadDocuments();
    } catch (err: any) {
      showToast(err.message || 'Rename failed.', 'error');
      throw err;
    }
  };

  const handleDelete = async (doc: VaultDocument) => {
    if (!user) return;
    try {
      await deleteVaultDocument(doc.id, user.id, doc.filePath);
      showToast('Document deleted permanently.', 'success');
      loadDocuments();
    } catch (err: any) {
      showToast(err.message || 'Delete failed.', 'error');
      throw err;
    }
  };

  const handleDownload = async (doc: VaultDocument) => {
    try {
      showToast('Preparing download...', 'info');
      const blob = await downloadVaultDocumentBlob(doc.filePath);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = doc.fileName || doc.name;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      showToast('Download started.', 'success');
    } catch (err: any) {
      showToast('Failed to download document.', 'error');
    }
  };

  // Filtered documents by search query
  const filteredDocuments = useMemo(() => {
    if (!searchQuery.trim()) return documents;
    const q = searchQuery.trim().toLowerCase();
    return documents.filter(
      (d) =>
        d.name.toLowerCase().includes(q) ||
        d.category.toLowerCase().includes(q) ||
        d.description?.toLowerCase().includes(q) ||
        d.issuingAuthority?.toLowerCase().includes(q) ||
        d.notes?.toLowerCase().includes(q)
    );
  }, [documents, searchQuery]);

  return (
    <PageContainer>
      <div className="py-4 sm:py-6 space-y-6 sm:space-y-8">
        {/* Navigation Tabs */}
        <DashboardNav />

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200/80">
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                My Documents Vault
              </h1>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
                {documents.length} {documents.length === 1 ? 'file' : 'files'}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Organize, view, download, and manage your private document copies.
            </p>
          </div>

          <Button
            variant="primary"
            size="md"
            onClick={() => setIsUploadModalOpen(true)}
            leftIcon={Upload}
            className="font-semibold shadow-xs shrink-0 self-start sm:self-auto"
          >
            Upload Document
          </Button>
        </div>

        {/* Search, Filter & Sort Controls Bar */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-3.5 sm:p-4 shadow-card space-y-3.5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search documents by name, category, or notes..."
                className="w-full bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 rounded-xl py-2 pl-10 pr-9 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 shadow-2xs"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-700"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Sort Control */}
            <div className="flex items-center gap-2 shrink-0">
              <ArrowUpDown className="w-4 h-4 text-slate-400" />
              <span className="text-xs text-slate-500 font-medium">Sort:</span>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as VaultSortOption)}
                className="bg-slate-50 border border-slate-200 text-slate-800 rounded-xl py-2 px-3 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 cursor-pointer shadow-2xs"
              >
                <option value="recent">Recently Added</option>
                <option value="name-asc">Name (A – Z)</option>
                <option value="name-desc">Name (Z – A)</option>
                <option value="updated">Recently Updated</option>
              </select>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
            <span className="text-slate-400 text-[11px] font-semibold uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
              <Filter className="w-3 h-3 text-indigo-600" />
              <span>Category:</span>
            </span>

            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1 rounded-xl font-medium transition-colors whitespace-nowrap shrink-0 ${
                selectedCategory === 'all'
                  ? 'bg-slate-900 text-white font-semibold shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All Categories
            </button>

            {CATEGORY_OPTIONS.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1 rounded-xl font-medium transition-colors whitespace-nowrap shrink-0 ${
                  selectedCategory === cat.id
                    ? 'bg-slate-900 text-white font-semibold shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Documents Grid / States */}
        {isLoading ? (
          <div className="py-16 text-center text-slate-400 space-y-2">
            <Loader2 className="w-8 h-8 animate-spin mx-auto text-indigo-600" />
            <p className="text-xs font-medium text-slate-500">Loading your document vault...</p>
          </div>
        ) : documents.length === 0 ? (
          /* Empty State: Vault is completely empty */
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 p-8 sm:p-12 text-center space-y-4 shadow-card">
            <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto border border-indigo-100">
              <FolderOpen className="w-7 h-7" />
            </div>
            <div className="space-y-1.5 max-w-sm mx-auto">
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                Your SmartDoc vault is empty
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                Upload your first document copy to start organizing your personal files in one secure place.
              </p>
            </div>
            <div className="pt-2">
              <Button
                variant="primary"
                size="md"
                onClick={() => setIsUploadModalOpen(true)}
                leftIcon={Upload}
                className="font-semibold shadow-xs"
              >
                Upload Document
              </Button>
            </div>
          </div>
        ) : filteredDocuments.length === 0 ? (
          /* Empty Search / Filter Result */
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 p-8 text-center space-y-3 shadow-card">
            <Search className="w-8 h-8 text-slate-400 mx-auto" />
            <h3 className="text-sm sm:text-base font-bold text-slate-900">
              No documents match your search
            </h3>
            <p className="text-xs text-slate-500">
              Try adjusting your search query or selecting "All Categories".
            </p>
            <div className="pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="text-xs font-semibold"
              >
                Reset Filters
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
            {filteredDocuments.map((doc) => (
              <VaultDocumentCard
                key={doc.id}
                document={doc}
                onView={setPreviewDoc}
                onDownload={handleDownload}
                onRename={setRenameDoc}
                onDelete={setDeleteDoc}
              />
            ))}
          </div>
        )}

        {/* Privacy UX Notice */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center gap-3 text-xs text-slate-600">
          <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
          <div className="space-y-0.5">
            <span className="font-bold text-slate-900">Encrypted and Private</span>
            <p className="text-[11px] text-slate-500">
              Your files in SmartDoc Vault are isolated by Row Level Security and are never indexed or publicly shared.
            </p>
          </div>
        </div>
      </div>

      {/* Modals */}
      <UploadDocumentModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUpload={handleUpload}
      />

      <DocumentPreviewModal
        document={previewDoc}
        isOpen={Boolean(previewDoc)}
        onClose={() => setPreviewDoc(null)}
        onDownload={handleDownload}
      />

      <RenameDocumentModal
        document={renameDoc}
        isOpen={Boolean(renameDoc)}
        onClose={() => setRenameDoc(null)}
        onRename={handleRename}
      />

      <DeleteConfirmDialog
        document={deleteDoc}
        isOpen={Boolean(deleteDoc)}
        onClose={() => setDeleteDoc(null)}
        onConfirmDelete={handleDelete}
      />
    </PageContainer>
  );
};
