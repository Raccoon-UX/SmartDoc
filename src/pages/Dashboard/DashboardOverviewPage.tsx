import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
import { UploadDocumentModal, CATEGORY_OPTIONS } from '../../components/vault/UploadDocumentModal';
import { DocumentPreviewModal } from '../../components/vault/DocumentPreviewModal';
import { RenameDocumentModal } from '../../components/vault/RenameDocumentModal';
import { DeleteConfirmDialog } from '../../components/vault/DeleteConfirmDialog';
import { DashboardNav } from '../../components/dashboard/DashboardNav';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { formatFileSize, validateDocumentFile, MAX_FILE_SIZE_MB } from '../../lib/fileValidation';
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
  Eye,
  Download,
  MoreVertical,
  Edit2,
  Trash2,
  User,
  Image as ImageIcon,
  TrendingUp,
  FilePlus2,
  ChevronRight,
  Lock,
} from 'lucide-react';

const MAX_STORAGE_BYTES = 10 * 1024 * 1024 * 1024; // 10 GB limit

export const DashboardOverviewPage: React.FC = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

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
  const [activeMenuDocId, setActiveMenuDocId] = useState<string | null>(null);

  // Drag and drop state on quick upload box
  const [isDragging, setIsDragging] = useState(false);

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

  const handleQuickFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      const validation = validateDocumentFile(droppedFile);
      if (!validation.isValid) {
        showToast(validation.error || 'Invalid file.', 'error');
        return;
      }
      setIsUploadModalOpen(true);
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

  // Calculate category distribution counts from real documents
  const categoryCounts = useMemo(() => {
    const map = new Map<string, number>();
    documents.forEach((d) => {
      map.set(d.category, (map.get(d.category) || 0) + 1);
    });
    return Array.from(map.entries())
      .map(([catId, count]) => {
        const catObj = CATEGORY_OPTIONS.find((c) => c.id === catId);
        return {
          id: catId,
          label: catObj?.label || catId.charAt(0).toUpperCase() + catId.slice(1),
          count,
        };
      })
      .sort((a, b) => b.count - a.count);
  }, [documents]);

  const storagePercentage = Math.min(
    100,
    Math.max(1, Math.round((stats.totalStorageBytes / MAX_STORAGE_BYTES) * 100))
  );

  const remainingStorageBytes = Math.max(0, MAX_STORAGE_BYTES - stats.totalStorageBytes);

  return (
    <PageContainer>
      <div className="py-4 sm:py-6 space-y-6 sm:space-y-8">
        {/* Sub-Navigation Bar */}
        <DashboardNav />

        {/* 1. SaaS Hero / Welcome Panel */}
        <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-card border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2.5 relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20 backdrop-blur-xs">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Encrypted Personal Vault</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Welcome back, {user?.fullName || user?.email?.split('@')[0] || 'User'}! 👋
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
              Your secure document vault is ready. Organize, search, and manage your important personal document copies with full privacy.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0 relative z-10">
            <Button
              variant="primary"
              size="md"
              onClick={() => setIsUploadModalOpen(true)}
              leftIcon={Upload}
              className="font-bold shadow-xs bg-indigo-600 hover:bg-indigo-700 text-white border-none"
            >
              Upload Document
            </Button>
            <Button
              to="/dashboard/documents"
              variant="outline"
              size="md"
              className="bg-white/10 hover:bg-white/20 text-white border-white/20 font-semibold"
            >
              View Documents
            </Button>
          </div>

          {/* Decorative Pattern Background */}
          <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
        </div>

        {/* 2. Four Compact KPI Analytics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
          {/* Card 1: Total Documents */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-card space-y-2 hover:border-slate-300 transition-all">
            <div className="flex items-center justify-between text-slate-500 text-xs">
              <span className="font-semibold text-slate-700">Total Documents</span>
              <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100">
                <FileText className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline justify-between">
              <p className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                {isLoading ? '...' : stats.totalDocuments}
              </p>
              <span className="inline-flex items-center gap-0.5 text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-md">
                <TrendingUp className="w-3 h-3" />
                <span>Vault Active</span>
              </span>
            </div>
            <p className="text-[11px] text-slate-500">Stored in encrypted vault</p>
          </div>

          {/* Card 2: Categories Used */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-card space-y-2 hover:border-slate-300 transition-all">
            <div className="flex items-center justify-between text-slate-500 text-xs">
              <span className="font-semibold text-slate-700">Categories Used</span>
              <div className="w-8 h-8 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center border border-violet-100">
                <Layers className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline justify-between">
              <p className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                {isLoading ? '...' : stats.categoriesCount}
              </p>
              <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded-md">
                of 14 total
              </span>
            </div>
            <p className="text-[11px] text-slate-500">Structured category tags</p>
          </div>

          {/* Card 3: Storage Used */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-card space-y-2 hover:border-slate-300 transition-all">
            <div className="flex items-center justify-between text-slate-500 text-xs">
              <span className="font-semibold text-slate-700">Storage Used</span>
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
                <HardDrive className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline justify-between">
              <p className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                {isLoading ? '...' : formatFileSize(stats.totalStorageBytes)}
              </p>
              <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded-md">
                of 10 GB
              </span>
            </div>
            <p className="text-[11px] text-slate-500">Private object storage</p>
          </div>

          {/* Card 4: Recent Activity */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-card space-y-2 hover:border-slate-300 transition-all">
            <div className="flex items-center justify-between text-slate-500 text-xs">
              <span className="font-semibold text-slate-700">Recent Activity</span>
              <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-200/60">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline justify-between">
              <p className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                {isLoading ? '...' : stats.recentUploadsCount}
              </p>
              <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded-md">
                30 Days
              </span>
            </div>
            <p className="text-[11px] text-slate-500">Uploads and updates</p>
          </div>
        </div>

        {/* 3. Two-Column Dashboard Layout (68% Left / 32% Right on Desktop) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          {/* ================= LEFT COLUMN (68%) ================= */}
          <div className="lg:col-span-8 space-y-6 sm:space-y-8">
            {/* Recent Documents Table / List */}
            <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-card overflow-hidden">
              <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-indigo-600" />
                    <span>Recent Documents</span>
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Your latest uploaded or modified document files
                  </p>
                </div>

                {documents.length > 0 && (
                  <Link
                    to="/dashboard/documents"
                    className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 hover:underline inline-flex items-center gap-1"
                  >
                    <span>View all ({documents.length})</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                )}
              </div>

              {isLoading ? (
                <div className="py-16 text-center text-slate-400 space-y-2">
                  <Loader2 className="w-7 h-7 animate-spin mx-auto text-indigo-600" />
                  <p className="text-xs font-medium text-slate-500">Loading documents...</p>
                </div>
              ) : documents.length === 0 ? (
                <div className="p-8 sm:p-12 text-center space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto border border-indigo-100">
                    <FolderOpen className="w-6 h-6" />
                  </div>
                  <div className="space-y-1 max-w-sm mx-auto">
                    <h3 className="text-sm font-bold text-slate-900">No documents in vault yet</h3>
                    <p className="text-xs text-slate-500">
                      Upload your first copy to start organizing your files securely.
                    </p>
                  </div>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => setIsUploadModalOpen(true)}
                    leftIcon={Upload}
                    className="font-semibold shadow-xs mt-2"
                  >
                    Upload Document
                  </Button>
                </div>
              ) : (
                <div className="divide-y divide-slate-100 overflow-x-auto">
                  {documents.slice(0, 5).map((doc) => {
                    const isPdf = doc.mimeType.includes('pdf') || doc.fileName.toLowerCase().endsWith('.pdf');
                    const isImage = doc.mimeType.includes('image') || doc.documentType === 'image';
                    const formattedDate = new Date(doc.createdAt).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    });

                    return (
                      <div
                        key={doc.id}
                        className="p-4 sm:p-5 flex items-center justify-between gap-3 hover:bg-slate-50/80 transition-colors group"
                      >
                        {/* File Icon & Details */}
                        <div className="flex items-center gap-3 min-w-0 flex-1">
                          <div
                            className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${
                              isPdf
                                ? 'bg-rose-50 text-rose-600 border-rose-100'
                                : isImage
                                ? 'bg-indigo-50 text-indigo-600 border-indigo-100'
                                : 'bg-slate-50 text-slate-600 border-slate-200'
                            }`}
                          >
                            {isPdf ? <FileText className="w-5 h-5" /> : isImage ? <ImageIcon className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
                          </div>

                          <div className="min-w-0 space-y-0.5">
                            <h4
                              className="text-xs sm:text-sm font-semibold text-slate-900 truncate group-hover:text-indigo-600 transition-colors cursor-pointer"
                              onClick={() => setPreviewDoc(doc)}
                              title={doc.name}
                            >
                              {doc.name}
                            </h4>
                            <div className="flex items-center gap-2 text-[11px] text-slate-500">
                              <Badge variant="indigo" size="sm" className="capitalize text-[10px] py-0 px-1.5">
                                {doc.category}
                              </Badge>
                              <span className="hidden sm:inline">•</span>
                              <span className="hidden sm:inline">{formattedDate}</span>
                              <span>•</span>
                              <span className="font-mono">{formatFileSize(doc.fileSize)}</span>
                            </div>
                          </div>
                        </div>

                        {/* Row Actions */}
                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            type="button"
                            onClick={() => setPreviewDoc(doc)}
                            className="p-2 rounded-xl text-slate-500 hover:text-indigo-600 hover:bg-indigo-50/80 transition-colors"
                            title="View Document"
                            aria-label="View Document"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDownload(doc)}
                            className="p-2 rounded-xl text-slate-500 hover:text-indigo-600 hover:bg-indigo-50/80 transition-colors"
                            title="Download Document"
                            aria-label="Download Document"
                          >
                            <Download className="w-4 h-4" />
                          </button>

                          <div className="relative">
                            <button
                              type="button"
                              onClick={() => setActiveMenuDocId(activeMenuDocId === doc.id ? null : doc.id)}
                              className="p-2 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors"
                              aria-label="More options"
                            >
                              <MoreVertical className="w-4 h-4" />
                            </button>

                            {activeMenuDocId === doc.id && (
                              <>
                                <div
                                  className="fixed inset-0 z-20"
                                  onClick={() => setActiveMenuDocId(null)}
                                />
                                <div className="absolute right-0 top-full mt-1 w-36 bg-white rounded-xl border border-slate-200 shadow-card-hover z-30 p-1 divide-y divide-slate-100 animate-in fade-in-50 zoom-in-95 duration-100">
                                  <div className="py-0.5">
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setActiveMenuDocId(null);
                                        setRenameDoc(doc);
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
                                        setActiveMenuDocId(null);
                                        setDeleteDoc(doc);
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
                    );
                  })}
                </div>
              )}
            </div>

            {/* Quick Upload Drop Area */}
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleQuickFileDrop}
              onClick={() => setIsUploadModalOpen(true)}
              className={`border-2 border-dashed rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-center cursor-pointer transition-all bg-white shadow-card ${
                isDragging
                  ? 'border-indigo-600 bg-indigo-50/50 scale-[0.99]'
                  : 'border-slate-300 hover:border-indigo-400 hover:bg-slate-50/80'
              }`}
            >
              <div className="max-w-md mx-auto space-y-2 flex flex-col items-center">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100">
                  <FilePlus2 className="w-6 h-6" />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900">
                  Drag & drop your document here
                </h3>
                <p className="text-xs text-slate-500">
                  or click to select and upload document copies (PDF, JPG, PNG up to {MAX_FILE_SIZE_MB}MB)
                </p>
                <div className="pt-2">
                  <Button
                    type="button"
                    variant="primary"
                    size="sm"
                    leftIcon={Upload}
                    className="font-semibold shadow-xs"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsUploadModalOpen(true);
                    }}
                  >
                    Select Document File
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* ================= RIGHT COLUMN (32%) ================= */}
          <div className="lg:col-span-4 space-y-6">
            {/* Storage Overview Card */}
            <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-card space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
                    <HardDrive className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">Storage Overview</h3>
                </div>
                <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                  Healthy
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex items-baseline justify-between text-xs">
                  <span className="font-bold text-slate-900">
                    {formatFileSize(stats.totalStorageBytes)} <span className="font-normal text-slate-500">of 10 GB used</span>
                  </span>
                  <span className="font-semibold text-indigo-600">{storagePercentage}%</span>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full transition-all duration-500"
                    style={{ width: `${storagePercentage}%` }}
                  />
                </div>

                <p className="text-[11px] text-slate-400">
                  {formatFileSize(remainingStorageBytes)} available in your private storage tier.
                </p>
              </div>
            </div>

            {/* Quick Actions Panel */}
            <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-card space-y-3.5">
              <h3 className="text-sm font-bold text-slate-900">Quick Actions</h3>

              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(true)}
                  className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-indigo-50/80 border border-slate-100 hover:border-indigo-100 transition-all text-left group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                      <Upload className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                        Upload Document
                      </h4>
                      <p className="text-[10px] text-slate-500">Add copies to encrypted vault</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                </button>

                <Link
                  to="/dashboard/documents"
                  className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-indigo-50/80 border border-slate-100 hover:border-indigo-100 transition-all text-left group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-violet-50 text-violet-600 flex items-center justify-center border border-violet-100 group-hover:bg-violet-600 group-hover:text-white transition-colors">
                      <FolderOpen className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                        My Documents Vault
                      </h4>
                      <p className="text-[10px] text-slate-500">Browse and filter files</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                </Link>

                <Link
                  to="/documents"
                  className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-indigo-50/80 border border-slate-100 hover:border-indigo-100 transition-all text-left group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                      <Search className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                        Find Official Services
                      </h4>
                      <p className="text-[10px] text-slate-500">Search 34+ verified portals</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                </Link>

                <Link
                  to="/dashboard/profile"
                  className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-indigo-50/80 border border-slate-100 hover:border-indigo-100 transition-all text-left group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center border border-slate-200 group-hover:bg-slate-900 group-hover:text-white transition-colors">
                      <User className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                        Profile & Account
                      </h4>
                      <p className="text-[10px] text-slate-500">Manage display details</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Category Breakdown Card */}
            <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-card space-y-3.5">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900">Categories Breakdown</h3>
                <span className="text-xs text-slate-500 font-medium">
                  {categoryCounts.length} active
                </span>
              </div>

              {categoryCounts.length === 0 ? (
                <p className="text-xs text-slate-400 italic">No categorized files yet.</p>
              ) : (
                <div className="space-y-2">
                  {categoryCounts.slice(0, 5).map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => navigate(`/dashboard/documents?category=${cat.id}`)}
                      className="w-full flex items-center justify-between py-1.5 px-2 rounded-lg hover:bg-slate-50 text-left transition-colors text-xs"
                    >
                      <span className="font-medium text-slate-700 truncate">{cat.label}</span>
                      <span className="font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-100 text-[11px]">
                        {cat.count}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Security Assurance Card */}
            <div className="bg-gradient-to-br from-emerald-900 to-slate-900 text-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-card border border-emerald-800/40 space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                  <Lock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white">
                    Your data is safe with SmartDoc
                  </h4>
                  <p className="text-[10px] text-emerald-300">Verified Isolation</p>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                Industry-standard PostgreSQL Row Level Security keeps your document copies private and accessible only to your authenticated session.
              </p>

              <div className="pt-1">
                <Link
                  to="/dashboard/settings"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 hover:text-emerald-300 hover:underline"
                >
                  <span>Learn more about security</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
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
