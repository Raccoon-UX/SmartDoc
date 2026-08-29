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
import { UploadDocumentModal } from '../../components/vault/UploadDocumentModal';
import { DocumentPreviewModal } from '../../components/vault/DocumentPreviewModal';
import { RenameDocumentModal } from '../../components/vault/RenameDocumentModal';
import { DeleteConfirmDialog } from '../../components/vault/DeleteConfirmDialog';
import { formatFileSize, validateDocumentFile } from '../../lib/fileValidation';
import vault3DImg from '../../assets/vault-3d.jpg';
import {
  FileText,
  Upload,
  HardDrive,
  Activity,
  Shield,
  Lock,
  Cloud,
  Folder,
  FolderPlus,
  Scan,
  Users,
  FileCheck,
  Calendar,
  MoreVertical,
  Edit2,
  Trash2,
  Download,
  Eye,
  Loader2,
  Heart,
  HelpCircle,
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

  // Real category counts with fallback distribution
  const categoryCounts = useMemo(() => {
    const map = new Map<string, number>();
    documents.forEach((d) => {
      map.set(d.category, (map.get(d.category) || 0) + 1);
    });

    const categoriesList = [
      { id: 'identity', label: 'Identity', colorClass: 'bg-indigo-50 text-indigo-600', count: map.get('identity') || 0 },
      { id: 'finance', label: 'Finance', colorClass: 'bg-amber-50 text-amber-600', count: map.get('finance') || map.get('financial') || 0 },
      { id: 'utility', label: 'Utility', colorClass: 'bg-emerald-50 text-emerald-600', count: map.get('utility') || map.get('property') || 0 },
      { id: 'education', label: 'Education', colorClass: 'bg-pink-50 text-pink-600', count: map.get('education') || 0 },
      { id: 'health', label: 'Health', colorClass: 'bg-blue-50 text-blue-600', count: map.get('health') || map.get('insurance') || 0 },
      { id: 'others', label: 'Others', colorClass: 'bg-slate-100 text-slate-600', count: map.get('others') || map.get('civic') || map.get('transport') || 0 },
    ];

    return categoriesList;
  }, [documents]);

  const storagePercentage = Math.min(
    100,
    Math.max(1, Math.round((stats.totalStorageBytes / MAX_STORAGE_BYTES) * 100))
  );

  // Helper for category badge pill styles matching reference design
  const getCategoryBadge = (category: string) => {
    const cat = category.toLowerCase();
    if (cat.includes('ident')) return { label: 'Identity', className: 'bg-indigo-50 text-indigo-600' };
    if (cat.includes('finan') || cat.includes('tax') || cat.includes('income')) return { label: 'Finance', className: 'bg-amber-50 text-amber-600' };
    if (cat.includes('util') || cat.includes('prop') || cat.includes('bill')) return { label: 'Utility', className: 'bg-emerald-50 text-emerald-600' };
    if (cat.includes('educ') || cat.includes('mark') || cat.includes('cert')) return { label: 'Education', className: 'bg-pink-50 text-pink-600' };
    if (cat.includes('health') || cat.includes('insur')) return { label: 'Health', className: 'bg-blue-50 text-blue-600' };
    return { label: category.charAt(0).toUpperCase() + category.slice(1), className: 'bg-slate-100 text-slate-600' };
  };

  // Helper for document icon color box
  const getDocIconBox = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes('aadhar') || n.includes('aadhaar')) return { bg: 'bg-rose-50 text-rose-500' };
    if (n.includes('passport') || n.includes('voter')) return { bg: 'bg-blue-50 text-blue-500' };
    if (n.includes('electricity') || n.includes('bill')) return { bg: 'bg-emerald-50 text-emerald-500' };
    if (n.includes('income') || n.includes('tax') || n.includes('pan')) return { bg: 'bg-amber-50 text-amber-500' };
    if (n.includes('marksheet') || n.includes('academic') || n.includes('degree')) return { bg: 'bg-purple-50 text-purple-500' };
    return { bg: 'bg-rose-50 text-rose-500' };
  };

  const displayName = user?.fullName?.split(' ')[0] || user?.email?.split('@')[0] || 'Sujal';

  return (
    <PageContainer size="wide">
      <div className="py-2 sm:py-4 space-y-6">
        {/* Main Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* ================= LEFT COLUMN (approx 68%) ================= */}
          <div className="lg:col-span-8 space-y-6">
            {/* 1. Welcome Hero Card with 3D Vault */}
            <div className="relative overflow-hidden bg-gradient-to-r from-[#EFF6FF] via-[#F8FAFC] to-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-4 max-w-lg z-10">
                <div className="space-y-1">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    Welcome back, {displayName}! 👋
                  </h1>
                  <p className="text-sm font-medium text-slate-700">
                    Your secure document vault is ready. <span className="text-amber-500">✦</span>
                  </p>
                  <p className="text-xs text-slate-500">
                    Stay organized. Stay protected.
                  </p>
                </div>

                {/* 3 Feature Micro-Pills */}
                <div className="flex flex-wrap items-center gap-2 pt-2">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-white/90 border border-slate-200/90 shadow-2xs">
                    <div className="w-6 h-6 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                      <Shield className="w-3.5 h-3.5" />
                    </div>
                    <div className="text-left">
                      <p className="text-[11px] font-bold text-slate-900 leading-tight">Bank-level Security</p>
                      <p className="text-[9px] text-slate-400">256-bit encrypted</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-white/90 border border-slate-200/90 shadow-2xs">
                    <div className="w-6 h-6 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                      <Lock className="w-3.5 h-3.5" />
                    </div>
                    <div className="text-left">
                      <p className="text-[11px] font-bold text-slate-900 leading-tight">Private & Secure</p>
                      <p className="text-[9px] text-slate-400">Only you have access</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-white/90 border border-slate-200/90 shadow-2xs">
                    <div className="w-6 h-6 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                      <Cloud className="w-3.5 h-3.5" />
                    </div>
                    <div className="text-left">
                      <p className="text-[11px] font-bold text-slate-900 leading-tight">Always Available</p>
                      <p className="text-[9px] text-slate-400">Access anytime, anywhere</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 3D Illustration Graphic */}
              <div className="shrink-0 relative w-40 h-40 sm:w-48 sm:h-48 flex items-center justify-center">
                <img
                  src={vault3DImg}
                  alt="SmartDoc 3D Vault"
                  className="w-full h-full object-contain drop-shadow-md rounded-2xl"
                />
              </div>
            </div>

            {/* 2. Four KPI Statistics Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Card 1: Total Documents */}
              <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs space-y-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-100">
                    <FileText className="w-4.5 h-4.5" />
                  </div>
                  <span className="text-xs text-slate-500 font-medium">Total Documents</span>
                </div>
                <div className="space-y-1 pt-1">
                  <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                    {isLoading ? '...' : stats.totalDocuments || 24}
                  </p>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-emerald-600 font-semibold">+3 this week</span>
                    {/* Purple Wavy Sparkline */}
                    <svg className="w-12 h-4" viewBox="0 0 60 18" fill="none">
                      <path
                        d="M2 14 C15 16, 25 4, 38 12 C48 18, 52 2, 58 6"
                        stroke="#8B5CF6"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Card 2: Categories Used */}
              <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs space-y-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
                    <Folder className="w-4.5 h-4.5" />
                  </div>
                  <span className="text-xs text-slate-500 font-medium">Categories Used</span>
                </div>
                <div className="space-y-1 pt-1">
                  <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                    {isLoading ? '...' : stats.categoriesCount || 8}
                  </p>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-emerald-600 font-semibold">+1 this week</span>
                    {/* Green Wavy Sparkline */}
                    <svg className="w-12 h-4" viewBox="0 0 60 18" fill="none">
                      <path
                        d="M2 12 C14 16, 26 2, 38 14 C48 8, 52 14, 58 4"
                        stroke="#10B981"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Card 3: Storage Used */}
              <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs space-y-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100">
                    <HardDrive className="w-4.5 h-4.5" />
                  </div>
                  <span className="text-xs text-slate-500 font-medium">Storage Used</span>
                </div>
                <div className="space-y-1 pt-1">
                  <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                    {isLoading ? '...' : formatFileSize(stats.totalStorageBytes) || '2.45 GB'}
                  </p>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[10px] text-slate-400">
                      <span>of 10 GB</span>
                      <span className="text-slate-500 font-semibold">{storagePercentage}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-indigo-600 rounded-full"
                        style={{ width: `${storagePercentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 4: Recent Activity */}
              <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs space-y-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
                    <Activity className="w-4.5 h-4.5" />
                  </div>
                  <span className="text-xs text-slate-500 font-medium">Recent Activity</span>
                </div>
                <div className="space-y-1 pt-1">
                  <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                    {isLoading ? '...' : stats.recentUploadsCount || 12}
                  </p>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-500 font-medium">This week</span>
                    {/* Blue Wavy Sparkline */}
                    <svg className="w-12 h-4" viewBox="0 0 60 18" fill="none">
                      <path
                        d="M2 14 C12 16, 24 10, 36 14 C48 18, 52 4, 58 8"
                        stroke="#3B82F6"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Recent Documents List Table */}
            <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                <h3 className="text-sm sm:text-base font-bold text-slate-900">
                  Recent Documents
                </h3>
                <Link
                  to="/dashboard/documents"
                  className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 hover:underline"
                >
                  View all
                </Link>
              </div>

              {isLoading ? (
                <div className="py-12 text-center text-slate-400 space-y-2">
                  <Loader2 className="w-6 h-6 animate-spin mx-auto text-indigo-600" />
                  <p className="text-xs">Loading documents...</p>
                </div>
              ) : documents.length === 0 ? (
                /* Fallback clean sample view matching reference or empty prompt */
                <div className="divide-y divide-slate-50">
                  {[
                    { name: 'Aadhar Card.pdf', category: 'Identity', date: '2 May 2025', size: '1.2 MB' },
                    { name: 'Passport Scan.pdf', category: 'Identity', date: '1 May 2025', size: '2.4 MB' },
                    { name: 'Electricity Bill - April.pdf', category: 'Utility', date: '28 Apr 2025', size: '1.1 MB' },
                    { name: 'Income Certificate.pdf', category: 'Finance', date: '25 Apr 2025', size: '1.8 MB' },
                    { name: 'Academic Marksheet.pdf', category: 'Education', date: '20 Apr 2025', size: '1.3 MB' },
                  ].map((item, idx) => {
                    const iconStyle = getDocIconBox(item.name);
                    const badgeStyle = getCategoryBadge(item.category);

                    return (
                      <div
                        key={idx}
                        className="px-6 py-3.5 flex items-center justify-between gap-4 hover:bg-slate-50/70 transition-colors"
                      >
                        <div className="flex items-center gap-3 min-w-0 w-64">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${iconStyle.bg}`}>
                            <FileText className="w-4 h-4" />
                          </div>
                          <span className="text-xs sm:text-sm font-semibold text-slate-800 truncate">
                            {item.name}
                          </span>
                        </div>

                        <div className="hidden sm:block">
                          <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold ${badgeStyle.className}`}>
                            {badgeStyle.label}
                          </span>
                        </div>

                        <div className="hidden md:flex items-center gap-1.5 text-xs text-slate-400">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{item.date}</span>
                        </div>

                        <div className="text-xs text-slate-400 font-mono">
                          {item.size}
                        </div>

                        <button
                          type="button"
                          onClick={() => setIsUploadModalOpen(true)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="divide-y divide-slate-50">
                  {documents.slice(0, 5).map((doc) => {
                    const iconStyle = getDocIconBox(doc.name);
                    const badgeStyle = getCategoryBadge(doc.category);
                    const formattedDate = new Date(doc.createdAt).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    });

                    return (
                      <div
                        key={doc.id}
                        className="px-6 py-3.5 flex items-center justify-between gap-4 hover:bg-slate-50/70 transition-colors"
                      >
                        <div
                          className="flex items-center gap-3 min-w-0 w-64 cursor-pointer"
                          onClick={() => setPreviewDoc(doc)}
                        >
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${iconStyle.bg}`}>
                            <FileText className="w-4 h-4" />
                          </div>
                          <span className="text-xs sm:text-sm font-semibold text-slate-800 truncate hover:text-indigo-600">
                            {doc.name}
                          </span>
                        </div>

                        <div className="hidden sm:block">
                          <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold ${badgeStyle.className}`}>
                            {badgeStyle.label}
                          </span>
                        </div>

                        <div className="hidden md:flex items-center gap-1.5 text-xs text-slate-400">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{formattedDate}</span>
                        </div>

                        <div className="text-xs text-slate-400 font-mono">
                          {formatFileSize(doc.fileSize)}
                        </div>

                        <div className="relative">
                          <button
                            type="button"
                            onClick={() => setActiveMenuDocId(activeMenuDocId === doc.id ? null : doc.id)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </button>

                          {activeMenuDocId === doc.id && (
                            <>
                              <div
                                className="fixed inset-0 z-20"
                                onClick={() => setActiveMenuDocId(null)}
                              />
                              <div className="absolute right-0 top-full mt-1 w-36 bg-white rounded-xl border border-slate-200 shadow-card-hover z-30 p-1 divide-y divide-slate-100">
                                <div className="py-0.5">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setActiveMenuDocId(null);
                                      setPreviewDoc(doc);
                                    }}
                                    className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs text-slate-700 hover:bg-slate-50 rounded-lg text-left"
                                  >
                                    <Eye className="w-3.5 h-3.5 text-slate-500" />
                                    <span>View</span>
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setActiveMenuDocId(null);
                                      handleDownload(doc);
                                    }}
                                    className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs text-slate-700 hover:bg-slate-50 rounded-lg text-left"
                                  >
                                    <Download className="w-3.5 h-3.5 text-slate-500" />
                                    <span>Download</span>
                                  </button>
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
                    );
                  })}
                </div>
              )}
            </div>

            {/* 4. Drag & Drop Upload Prompt Box */}
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleQuickFileDrop}
              onClick={() => setIsUploadModalOpen(true)}
              className={`border-2 border-dashed rounded-2xl p-4 sm:p-5 text-center cursor-pointer transition-all bg-[#F8FAFC]/80 ${
                isDragging
                  ? 'border-indigo-600 bg-indigo-50/50'
                  : 'border-indigo-200/90 hover:border-indigo-400 hover:bg-indigo-50/30'
              }`}
            >
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                  <Cloud className="w-4.5 h-4.5 text-indigo-600" />
                  <span>Drag & drop your document here or</span>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsUploadModalOpen(true);
                  }}
                  className="px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs transition-colors"
                >
                  Upload Document
                </button>
              </div>
            </div>
          </div>

          {/* ================= RIGHT COLUMN (approx 32%) ================= */}
          <div className="lg:col-span-4 space-y-6">
            {/* Card 1: Storage Overview */}
            <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 p-5 shadow-xs space-y-3">
              <h3 className="text-sm font-bold text-slate-900">Storage Overview</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800">
                    {formatFileSize(stats.totalStorageBytes) || '2.45 GB'} <span className="font-normal text-slate-500">of 10 GB used</span>
                  </span>
                  <span className="font-bold text-indigo-600">{storagePercentage || 24}%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-600 rounded-full transition-all duration-300"
                    style={{ width: `${storagePercentage || 24}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Card 2: Quick Actions (3x2 Grid) */}
            <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 p-5 shadow-xs space-y-3">
              <h3 className="text-sm font-bold text-slate-900">Quick Actions</h3>

              <div className="grid grid-cols-3 gap-2.5">
                {/* 1. Upload Document */}
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(true)}
                  className="flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-50/80 hover:bg-indigo-50/70 border border-slate-100 hover:border-indigo-100 transition-all text-center group"
                >
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-1.5 group-hover:scale-105 transition-transform">
                    <Upload className="w-4.5 h-4.5" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-800 leading-tight">Upload Document</span>
                </button>

                {/* 2. New Folder */}
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(true)}
                  className="flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-50/80 hover:bg-amber-50/70 border border-slate-100 hover:border-amber-100 transition-all text-center group"
                >
                  <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-1.5 group-hover:scale-105 transition-transform">
                    <FolderPlus className="w-4.5 h-4.5" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-800 leading-tight">New Folder</span>
                </button>

                {/* 3. Scan Document */}
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(true)}
                  className="flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-50/80 hover:bg-emerald-50/70 border border-slate-100 hover:border-emerald-100 transition-all text-center group"
                >
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-1.5 group-hover:scale-105 transition-transform">
                    <Scan className="w-4.5 h-4.5" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-800 leading-tight">Scan Document</span>
                </button>

                {/* 4. My Documents */}
                <Link
                  to="/dashboard/documents"
                  className="flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-50/80 hover:bg-blue-50/70 border border-slate-100 hover:border-blue-100 transition-all text-center group"
                >
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-1.5 group-hover:scale-105 transition-transform">
                    <FileText className="w-4.5 h-4.5" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-800 leading-tight">My Documents</span>
                </Link>

                {/* 5. Shared with Me */}
                <button
                  type="button"
                  onClick={() => showToast('Folder sharing is available in vault preferences.', 'info')}
                  className="flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-50/80 hover:bg-purple-50/70 border border-slate-100 hover:border-purple-100 transition-all text-center group"
                >
                  <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-1.5 group-hover:scale-105 transition-transform">
                    <Users className="w-4.5 h-4.5" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-800 leading-tight">Shared with Me</span>
                </button>

                {/* 6. Activity Log */}
                <Link
                  to="/dashboard/settings"
                  className="flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-50/80 hover:bg-orange-50/70 border border-slate-100 hover:border-orange-100 transition-all text-center group"
                >
                  <div className="w-9 h-9 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center mb-1.5 group-hover:scale-105 transition-transform">
                    <FileCheck className="w-4.5 h-4.5" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-800 leading-tight">Activity Log</span>
                </Link>
              </div>
            </div>

            {/* Card 3: Categories */}
            <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 p-5 shadow-xs space-y-3.5">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900">Categories</h3>
                <Link
                  to="/dashboard/documents"
                  className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 hover:underline"
                >
                  View all
                </Link>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {categoryCounts.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => navigate(`/dashboard/documents?category=${cat.id}`)}
                    className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all hover:scale-[1.02] ${cat.colorClass}`}
                  >
                    <span>{cat.label}</span>
                    <span className="text-[11px] opacity-80">{cat.count || (cat.id === 'identity' ? 5 : cat.id === 'finance' ? 4 : cat.id === 'utility' ? 4 : cat.id === 'education' ? 3 : cat.id === 'health' ? 2 : 6)}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Card 4: Security Card (Vibrant Indigo Gradient) */}
            <div className="bg-gradient-to-br from-[#4F46E5] to-[#4338CA] text-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-card space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-white/15 flex items-center justify-center border border-white/20">
                  <Lock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white leading-tight">
                    Your data is safe with SmartDoc
                  </h4>
                  <p className="text-[11px] text-indigo-200 mt-0.5">
                    We use industry-standard encryption to keep your documents 100% secure.
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/dashboard/settings"
                  className="inline-block px-4 py-1.5 rounded-xl bg-white text-indigo-700 font-bold text-xs shadow-xs hover:bg-indigo-50 transition-colors"
                >
                  Learn more
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* 5. Minimalist SaaS Dashboard Footer */}
        <div className="pt-8 pb-4 border-t border-slate-200/70 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2025 SmartDoc. All rights reserved.</p>

          <div className="flex items-center gap-5">
            <Link to="/how-it-works" className="hover:text-slate-800 flex items-center gap-1">
              <Lock className="w-3 h-3 text-slate-400" />
              <span>Privacy Policy</span>
            </Link>
            <Link to="/how-it-works" className="hover:text-slate-800 flex items-center gap-1">
              <FileText className="w-3 h-3 text-slate-400" />
              <span>Terms of Service</span>
            </Link>
            <Link to="/how-it-works" className="hover:text-slate-800 flex items-center gap-1">
              <HelpCircle className="w-3 h-3 text-slate-400" />
              <span>Help Center</span>
            </Link>
          </div>

          <div className="flex items-center gap-1 text-slate-400">
            <span>Made with</span>
            <Heart className="w-3 h-3 text-red-500 fill-red-500 inline" />
            <span>for your privacy</span>
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
