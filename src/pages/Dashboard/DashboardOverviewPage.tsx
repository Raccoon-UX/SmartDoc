import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PageContainer } from '../../components/layout/PageContainer';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../components/ui/Toast';
import {
  fetchUserDocuments,
  uploadVaultDocument,
  renameVaultDocument,
  deleteVaultDocument,
  getUserVaultStats,
  downloadVaultDocumentBlob,
} from '../../services/vaultService';
import { VaultDocument, VaultStats, UploadDocumentPayload } from '../../types/vault';
import { VaultDocumentCard } from '../../components/vault/VaultDocumentCard';
import { UploadDocumentModal } from '../../components/vault/UploadDocumentModal';
import { DocumentPreviewModal } from '../../components/vault/DocumentPreviewModal';
import { RenameDocumentModal } from '../../components/vault/RenameDocumentModal';
import { DeleteConfirmDialog } from '../../components/vault/DeleteConfirmDialog';
import { Button } from '../../components/ui/Button';
import { formatFileSize } from '../../lib/fileValidation';
import {
  FileText,
  Upload,
  Layers,
  HardDrive,
  Clock,
  ArrowRight,
  ShieldCheck,
  Search,
  Sparkles,
  Loader2,
  FolderOpen,
} from 'lucide-react';

export const DashboardOverviewPage: React.FC = () => {
  const { user } = useAuth();
  const { showToast } = useToast();

  const [documents, setDocuments] = useState<VaultDocument[]>([]);
  const [stats, setStats] = useState<VaultStats>({
    totalDocuments: 0,
    categoriesCount: 0,
    totalStorageBytes: 0,
    recentUploadsCount: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  // Modals state
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [previewDoc, setPreviewDoc] = useState<VaultDocument | null>(null);
  const [renameDoc, setRenameDoc] = useState<VaultDocument | null>(null);
  const [deleteDoc, setDeleteDoc] = useState<VaultDocument | null>(null);

  const loadDashboardData = async () => {
    if (!user) return;
    setIsLoading(true);
    try {
      const [docs, st] = await Promise.all([
        fetchUserDocuments(user.id, { sort: 'recent' }),
        getUserVaultStats(user.id),
      ]);
      setDocuments(docs);
      setStats(st);
    } catch (err: any) {
      console.error('Error loading dashboard data:', err);
      showToast('Failed to load vault data.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, [user]);

  const handleUpload = async (payload: UploadDocumentPayload) => {
    if (!user) return;
    try {
      await uploadVaultDocument(user.id, payload);
      showToast('Document uploaded securely to vault!', 'success');
      loadDashboardData();
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
      loadDashboardData();
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
      loadDashboardData();
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

  return (
    <PageContainer>
      <div className="space-y-8 py-4">
        {/* Welcome Header Banner */}
        <div className="bg-gradient-to-br from-smartdoc-navy via-slate-900 to-smartdoc-navy text-white rounded-3xl p-6 sm:p-8 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
          <div className="space-y-2 relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-emerald-400 text-xs font-semibold border border-white/10 backdrop-blur-xs">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Personal Encrypted Vault</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Welcome back, {user?.fullName || 'Citizen'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
              Your centralized dashboard to store, organize, and access important document copies securely.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0 relative z-10">
            <Button
              variant="primary"
              size="md"
              onClick={() => setIsUploadModalOpen(true)}
              leftIcon={Upload}
              className="font-bold shadow-md bg-smartdoc-blue hover:bg-smartdoc-blue-dark text-white border-none"
            >
              Upload Document
            </Button>
            <Button
              to="/dashboard/documents"
              variant="outline"
              size="md"
              className="bg-white/10 hover:bg-white/20 text-white border-white/20"
            >
              My Documents
            </Button>
          </div>

          {/* Background Decorative Pattern */}
          <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-smartdoc-blue/20 rounded-full blur-3xl pointer-events-none" />
        </div>

        {/* Real Dynamic Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl border border-smartdoc-slate-border p-5 shadow-card space-y-2">
            <div className="flex items-center justify-between text-smartdoc-slate-muted text-xs">
              <span>Total Documents</span>
              <div className="w-7 h-7 rounded-lg bg-blue-50 text-smartdoc-blue flex items-center justify-center">
                <FileText className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl font-extrabold text-smartdoc-navy">
              {isLoading ? '...' : stats.totalDocuments}
            </p>
            <p className="text-[11px] text-slate-400">Stored in private vault</p>
          </div>

          <div className="bg-white rounded-2xl border border-smartdoc-slate-border p-5 shadow-card space-y-2">
            <div className="flex items-center justify-between text-smartdoc-slate-muted text-xs">
              <span>Categories Used</span>
              <div className="w-7 h-7 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                <Layers className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl font-extrabold text-smartdoc-navy">
              {isLoading ? '...' : stats.categoriesCount}
            </p>
            <p className="text-[11px] text-slate-400">Across 14 categories</p>
          </div>

          <div className="bg-white rounded-2xl border border-smartdoc-slate-border p-5 shadow-card space-y-2">
            <div className="flex items-center justify-between text-smartdoc-slate-muted text-xs">
              <span>Storage Used</span>
              <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <HardDrive className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl font-extrabold text-smartdoc-navy">
              {isLoading ? '...' : formatFileSize(stats.totalStorageBytes)}
            </p>
            <p className="text-[11px] text-slate-400">Private object storage</p>
          </div>

          <div className="bg-white rounded-2xl border border-smartdoc-slate-border p-5 shadow-card space-y-2">
            <div className="flex items-center justify-between text-smartdoc-slate-muted text-xs">
              <span>Recent Activity</span>
              <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl font-extrabold text-smartdoc-navy">
              {isLoading ? '...' : stats.recentUploadsCount}
            </p>
            <p className="text-[11px] text-slate-400">Uploads in last 30 days</p>
          </div>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button
            type="button"
            onClick={() => setIsUploadModalOpen(true)}
            className="group flex items-start gap-4 p-5 rounded-2xl bg-white border border-smartdoc-slate-border shadow-card hover:border-smartdoc-blue/50 hover:shadow-card-hover text-left transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-smartdoc-blue-soft text-smartdoc-blue flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-smartdoc-navy group-hover:text-smartdoc-blue transition-colors">
                Upload New Document
              </h4>
              <p className="text-xs text-smartdoc-slate-muted mt-0.5">
                Add PDFs or photos of Aadhaar, PAN, certificates, etc.
              </p>
            </div>
          </button>

          <Link
            to="/dashboard/documents"
            className="group flex items-start gap-4 p-5 rounded-2xl bg-white border border-smartdoc-slate-border shadow-card hover:border-smartdoc-blue/50 hover:shadow-card-hover text-left transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <FolderOpen className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-smartdoc-navy group-hover:text-smartdoc-blue transition-colors">
                Browse My Documents
              </h4>
              <p className="text-xs text-smartdoc-slate-muted mt-0.5">
                Search, filter, view, and organize all stored documents.
              </p>
            </div>
          </Link>

          <Link
            to="/documents"
            className="group flex items-start gap-4 p-5 rounded-2xl bg-white border border-smartdoc-slate-border shadow-card hover:border-smartdoc-blue/50 hover:shadow-card-hover text-left transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Search className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-smartdoc-navy group-hover:text-smartdoc-blue transition-colors">
                Find Official Services
              </h4>
              <p className="text-xs text-smartdoc-slate-muted mt-0.5">
                Explore procedures and verified links for 34+ public services.
              </p>
            </div>
          </Link>
        </div>

        {/* Recent Documents Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-smartdoc-navy flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-smartdoc-blue" />
                <span>Recent Documents</span>
              </h2>
              <p className="text-xs text-smartdoc-slate-muted mt-0.5">
                Your most recently uploaded or updated files
              </p>
            </div>

            {documents.length > 0 && (
              <Link
                to="/dashboard/documents"
                className="text-xs font-bold text-smartdoc-blue hover:underline inline-flex items-center gap-1"
              >
                <span>View all ({documents.length})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>

          {isLoading ? (
            <div className="py-12 text-center text-slate-400 space-y-2">
              <Loader2 className="w-8 h-8 animate-spin mx-auto text-smartdoc-blue" />
              <p className="text-xs font-medium">Loading your document vault...</p>
            </div>
          ) : documents.length === 0 ? (
            /* Empty State */
            <div className="bg-white rounded-3xl border border-smartdoc-slate-border p-8 sm:p-12 text-center space-y-4 shadow-card">
              <div className="w-16 h-16 rounded-2xl bg-smartdoc-blue-soft text-smartdoc-blue flex items-center justify-center mx-auto">
                <FolderOpen className="w-8 h-8" />
              </div>
              <div className="space-y-1.5 max-w-sm mx-auto">
                <h3 className="text-base sm:text-lg font-bold text-smartdoc-navy">
                  Your SmartDoc vault is empty
                </h3>
                <p className="text-xs sm:text-sm text-smartdoc-slate-muted leading-relaxed">
                  Upload your first document copy to start organizing your important files in one secure place.
                </p>
              </div>
              <div className="pt-2">
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => setIsUploadModalOpen(true)}
                  leftIcon={Upload}
                  className="font-bold shadow-sm"
                >
                  Upload Your First Document
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {documents.slice(0, 3).map((doc) => (
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
