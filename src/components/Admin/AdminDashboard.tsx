import React, { useState, useEffect, useRef } from 'react';
import {
  Upload,
  Plus,
  Trash2,
  Edit,
  Eye,
  Video,
  Image as ImageIcon,
  Search,
  Filter,
  LogOut,
  ArrowLeft,
  X,
  CheckCircle2,
  AlertCircle,
  FileText,
  Loader2,
  RefreshCw,
  FolderOpen,
  Film,
  Sparkles,
  MapPin,
  Tag,
  Play,
} from 'lucide-react';
import {
  fetchGalleryItems,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
  logout,
  getCurrentUser,
} from '../../services/api';
import type { GalleryItem, Page } from '../../types';

interface AdminDashboardProps {
  navigate: (page: Page) => void;
  onLogout: () => void;
}

const CATEGORIES = [
  { id: 'solar-rooftop', label: 'Rooftop Solar PV' },
  { id: 'water-heating', label: 'Solar Water Heating' },
  { id: 'solar-lighting', label: 'Solar Lighting' },
  { id: 'security-cctv', label: 'Smart Security & CCTV' },
];

export function AdminDashboard({ navigate, onLogout }: AdminDashboardProps) {
  const currentUser = getCurrentUser();

  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedMediaType, setSelectedMediaType] = useState<'all' | 'image' | 'video'>('all');

  // Modals
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  // Active / Selected item
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  // Upload Form state
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [filePreviewUrl, setFilePreviewUrl] = useState<string | null>(null);
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadCategory, setUploadCategory] = useState('solar-rooftop');
  const [uploadLocation, setUploadLocation] = useState('Coimbatore, Tamil Nadu');
  const [uploadTag, setUploadTag] = useState('Commercial Solar Array');
  const [uploadDescription, setUploadDescription] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Edit Form state
  const [editTitle, setEditTitle] = useState('');
  const [editCategory, setEditCategory] = useState('solar-rooftop');
  const [editLocation, setEditLocation] = useState('');
  const [editTag, setEditTag] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editFile, setEditFile] = useState<File | null>(null);
  const [editFilePreviewUrl, setEditFilePreviewUrl] = useState<string | null>(null);
  const [isSavingEdit, setIsSavingEdit] = useState(false);

  // Delete state
  const [isDeleting, setIsDeleting] = useState(false);

  // File input refs
  const fileInputRef = useRef<HTMLInputElement>(null);
  const editFileInputRef = useRef<HTMLInputElement>(null);

  // Load items from backend
  const loadGalleryData = async (isManualRefresh = false) => {
    if (isManualRefresh) setRefreshing(true);
    else setLoading(true);
    setError(null);

    try {
      const data = await fetchGalleryItems();
      setItems(data);
    } catch (err: any) {
      console.error('Error loading gallery items:', err);
      setError(
        err.response?.data?.message ||
          'Failed to connect to backend server. Make sure MongoDB backend is running.'
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadGalleryData();
  }, []);

  // Auto-dismiss success notification
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  // Handle file selection from file manager
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadFile(file);
      // Auto-suggest title if empty
      if (!uploadTitle) {
        const cleanName = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
        setUploadTitle(cleanName.charAt(0).toUpperCase() + cleanName.slice(1));
      }
      // Create local object URL for instant preview
      const previewUrl = URL.createObjectURL(file);
      setFilePreviewUrl(previewUrl);
    }
  };

  // Handle edit file selection
  const handleEditFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setEditFile(file);
      const previewUrl = URL.createObjectURL(file);
      setEditFilePreviewUrl(previewUrl);
    }
  };

  // Submit Upload
  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadFile) {
      setError('Please choose an image or video file from your file manager.');
      return;
    }
    if (!uploadTitle.trim()) {
      setError('Please enter a title for this media item.');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);
    setError(null);

    const formData = new FormData();
    formData.append('file', uploadFile);
    formData.append('title', uploadTitle.trim());
    formData.append('category', uploadCategory);
    formData.append('location', uploadLocation.trim());
    formData.append('tag', uploadTag.trim());
    formData.append('description', uploadDescription.trim());

    try {
      await createGalleryItem(formData, (progressEvent) => {
        if (progressEvent.total) {
          const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percent);
        }
      });

      setSuccessMessage('Media uploaded and saved to gallery successfully!');
      setShowUploadModal(false);
      resetUploadForm();
      loadGalleryData(true);
    } catch (err: any) {
      console.error('Upload failed:', err);
      setError(err.response?.data?.message || 'Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const resetUploadForm = () => {
    setUploadFile(null);
    if (filePreviewUrl) URL.revokeObjectURL(filePreviewUrl);
    setFilePreviewUrl(null);
    setUploadTitle('');
    setUploadCategory('solar-rooftop');
    setUploadLocation('Coimbatore, Tamil Nadu');
    setUploadTag('Commercial Solar Array');
    setUploadDescription('');
    setUploadProgress(0);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Open Edit Modal
  const openEditModal = (item: GalleryItem) => {
    setActiveItem(item);
    setEditTitle(item.title);
    setEditCategory(item.category || 'solar-rooftop');
    setEditLocation(item.location || 'Coimbatore, Tamil Nadu');
    setEditTag(item.tag || 'Solar Installation');
    setEditDescription(item.description || '');
    setEditFile(null);
    setEditFilePreviewUrl(null);
    setShowEditModal(true);
  };

  // Submit Edit
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeItem) return;

    setIsSavingEdit(true);
    setError(null);

    const formData = new FormData();
    if (editFile) {
      formData.append('file', editFile);
    }
    formData.append('title', editTitle.trim());
    formData.append('category', editCategory);
    formData.append('location', editLocation.trim());
    formData.append('tag', editTag.trim());
    formData.append('description', editDescription.trim());

    try {
      const itemId = activeItem._id || activeItem.id;
      await updateGalleryItem(itemId, formData);
      setSuccessMessage('Gallery item updated successfully!');
      setShowEditModal(false);
      loadGalleryData(true);
    } catch (err: any) {
      console.error('Update failed:', err);
      setError(err.response?.data?.message || 'Failed to update item.');
    } finally {
      setIsSavingEdit(false);
    }
  };

  // Open Delete Modal
  const openDeleteModal = (item: GalleryItem) => {
    setActiveItem(item);
    setShowDeleteModal(true);
  };

  // Confirm Delete
  const confirmDelete = async () => {
    if (!activeItem) return;
    setIsDeleting(true);
    setError(null);

    try {
      const itemId = activeItem._id || activeItem.id;
      await deleteGalleryItem(itemId);
      setSuccessMessage('Item deleted successfully.');
      setShowDeleteModal(false);
      loadGalleryData(true);
    } catch (err: any) {
      console.error('Delete failed:', err);
      setError(err.response?.data?.message || 'Failed to delete item.');
    } finally {
      setIsDeleting(false);
    }
  };

  // Filter items
  const filteredItems = items.filter((item) => {
    const matchesCategory =
      selectedCategory === 'all' || item.category === selectedCategory;
    const matchesMediaType =
      selectedMediaType === 'all' || (item.mediaType || 'image') === selectedMediaType;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      item.title.toLowerCase().includes(q) ||
      (item.location && item.location.toLowerCase().includes(q)) ||
      (item.tag && item.tag.toLowerCase().includes(q)) ||
      (item.description && item.description.toLowerCase().includes(q));
    return matchesCategory && matchesMediaType && matchesSearch;
  });

  // Calculate stats
  const totalCount = items.length;
  const imageCount = items.filter((i) => (i.mediaType || 'image') === 'image').length;
  const videoCount = items.filter((i) => i.mediaType === 'video').length;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-16">
      {/* Top Navigation Bar */}
      <header className="bg-slate-900 text-white sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-xl p-1.5 flex items-center justify-center shadow-inner">
              <img
                src="/image.png"
                alt="Sumathi Agencies"
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base tracking-tight text-white">
                  Sumathi Agencies
                </span>
                <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Admin Panel
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                CRUD Media & Gallery Management
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => navigate('home')}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-3 py-2 rounded-lg transition-colors border border-slate-700"
            >
              <ArrowLeft size={14} />
              <span className="hidden sm:inline">View Live Site</span>
            </button>

            <button
              onClick={() => {
                logout();
                onLogout();
              }}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-300 hover:text-rose-100 bg-rose-950/40 hover:bg-rose-900/60 px-3 py-2 rounded-lg transition-colors border border-rose-800/50"
            >
              <LogOut size={14} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Banner Alert Messages */}
        {error && (
          <div className="mb-6 p-4 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-sm flex items-start gap-3 shadow-sm">
            <AlertCircle size={18} className="text-rose-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-semibold">Notice</p>
              <p className="text-xs mt-0.5">{error}</p>
            </div>
            <button
              onClick={() => setError(null)}
              className="text-rose-500 hover:text-rose-700"
            >
              <X size={16} />
            </button>
          </div>
        )}

        {successMessage && (
          <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-sm flex items-center gap-3 shadow-sm">
            <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
            <span className="flex-1 font-medium">{successMessage}</span>
            <button
              onClick={() => setSuccessMessage(null)}
              className="text-emerald-500 hover:text-emerald-700"
            >
              <X size={16} />
            </button>
          </div>
        )}

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
            <div className="flex items-center justify-between text-slate-500 text-xs font-medium uppercase tracking-wider mb-2">
              <span>Total Uploads</span>
              <FileText size={16} className="text-sky-600" />
            </div>
            <div className="text-2xl font-bold text-slate-900">{totalCount}</div>
            <div className="text-[11px] text-slate-400 mt-1">Live in Gallery DB</div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
            <div className="flex items-center justify-between text-slate-500 text-xs font-medium uppercase tracking-wider mb-2">
              <span>Photos</span>
              <ImageIcon size={16} className="text-emerald-600" />
            </div>
            <div className="text-2xl font-bold text-slate-900">{imageCount}</div>
            <div className="text-[11px] text-slate-400 mt-1">High-Res Images</div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
            <div className="flex items-center justify-between text-slate-500 text-xs font-medium uppercase tracking-wider mb-2">
              <span>Videos</span>
              <Film size={16} className="text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-slate-900">{videoCount}</div>
            <div className="text-[11px] text-slate-400 mt-1">Uploaded Clips</div>
          </div>

          <div className="bg-gradient-to-br from-sky-600 to-emerald-600 p-5 rounded-2xl text-white shadow-md flex flex-col justify-between">
            <div className="flex items-center justify-between text-sky-100 text-xs font-medium uppercase tracking-wider">
              <span>Fast Actions</span>
              <Sparkles size={16} />
            </div>
            <button
              onClick={() => {
                resetUploadForm();
                setShowUploadModal(true);
              }}
              className="mt-3 w-full py-2.5 px-3 bg-white hover:bg-sky-50 text-slate-900 font-semibold rounded-xl text-xs shadow-sm flex items-center justify-center gap-1.5 transition-colors"
            >
              <Upload size={14} className="text-sky-600" />
              Upload New Media
            </button>
          </div>
        </div>

        {/* Toolbar & Filters */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm mb-6 flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          <div className="flex flex-1 items-center gap-3">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by title, location, tag..."
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white"
              />
            </div>

            {/* Category Dropdown */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              <option value="all">All Categories</option>
              {CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            {/* Media Type Filter Tabs */}
            <div className="flex bg-slate-100 p-1 rounded-xl">
              <button
                onClick={() => setSelectedMediaType('all')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  selectedMediaType === 'all'
                    ? 'bg-white text-sky-700 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setSelectedMediaType('image')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1 ${
                  selectedMediaType === 'image'
                    ? 'bg-white text-sky-700 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <ImageIcon size={12} /> Photos
              </button>
              <button
                onClick={() => setSelectedMediaType('video')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1 ${
                  selectedMediaType === 'video'
                    ? 'bg-white text-sky-700 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Video size={12} /> Videos
              </button>
            </div>

            {/* Refresh Button */}
            <button
              onClick={() => loadGalleryData(true)}
              disabled={refreshing}
              className="p-2 text-slate-500 hover:text-slate-800 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors"
              title="Refresh list"
            >
              <RefreshCw size={16} className={refreshing ? 'animate-spin' : ''} />
            </button>

            {/* Upload Button */}
            <button
              onClick={() => {
                resetUploadForm();
                setShowUploadModal(true);
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold rounded-xl shadow-sm transition-colors shrink-0"
            >
              <Plus size={16} /> Upload Media
            </button>
          </div>
        </div>

        {/* Content Section: Media Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-slate-200/80">
            <Loader2 size={36} className="animate-spin text-sky-600 mb-3" />
            <p className="text-sm font-medium text-slate-600">
              Loading gallery media from database...
            </p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-dashed border-slate-300 text-center p-6">
            <div className="w-16 h-16 bg-sky-50 text-sky-600 rounded-2xl flex items-center justify-center mb-4">
              <FolderOpen size={32} />
            </div>
            <h3 className="text-base font-bold text-slate-800">
              No Media Uploads Found
            </h3>
            <p className="text-xs text-slate-500 max-w-md mt-1 mb-5">
              {searchQuery || selectedCategory !== 'all' || selectedMediaType !== 'all'
                ? 'No items matched your current filter criteria. Try resetting the filters or upload a new item.'
                : 'Your gallery database is currently empty. Upload real installation photos or project videos directly from your computer file manager.'}
            </p>
            <button
              onClick={() => {
                resetUploadForm();
                setShowUploadModal(true);
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold rounded-xl shadow-md transition-all"
            >
              <Upload size={14} /> Upload First Media Item
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => {
              const isVid = (item.mediaType || 'image') === 'video';
              const itemId = item._id || item.id;
              const mediaSource = item.mediaUrl || item.image || '';

              return (
                <div
                  key={itemId}
                  className="group bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col"
                >
                  {/* Thumbnail / Video View */}
                  <div className="relative aspect-video bg-slate-900 overflow-hidden">
                    {isVid ? (
                      <video
                        src={mediaSource}
                        className="w-full h-full object-cover"
                        preload="metadata"
                      />
                    ) : (
                      <img
                        src={mediaSource}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    )}

                    {/* Media Type Badge */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      <span
                        className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full shadow-md backdrop-blur-md ${
                          isVid
                            ? 'bg-purple-600/90 text-white'
                            : 'bg-slate-900/80 text-white'
                        }`}
                      >
                        {isVid ? <Video size={12} /> : <ImageIcon size={12} />}
                        {isVid ? 'Video' : 'Photo'}
                      </span>
                    </div>

                    {/* Play Button Overlay for Videos */}
                    {isVid && (
                      <button
                        onClick={() => {
                          setActiveItem(item);
                          setShowPreviewModal(true);
                        }}
                        className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors"
                      >
                        <div className="w-12 h-12 rounded-full bg-white/90 text-slate-900 flex items-center justify-center shadow-lg hover:scale-110 transition-transform pl-0.5">
                          <Play size={20} fill="#0f172a" />
                        </div>
                      </button>
                    )}

                    {/* Preview Button Overlay for Images */}
                    {!isVid && (
                      <button
                        onClick={() => {
                          setActiveItem(item);
                          setShowPreviewModal(true);
                        }}
                        className="absolute bottom-3 right-3 p-2 bg-slate-900/80 hover:bg-slate-900 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                        title="Quick View"
                      >
                        <Eye size={14} />
                      </button>
                    )}
                  </div>

                  {/* Details */}
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-[11px] font-semibold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-md">
                          {item.categoryLabel || item.category}
                        </span>
                        {item.tag && (
                          <span className="text-[11px] text-slate-500 flex items-center gap-1">
                            <Tag size={10} /> {item.tag}
                          </span>
                        )}
                      </div>

                      <h4 className="font-bold text-sm text-slate-900 line-clamp-1">
                        {item.title}
                      </h4>

                      {item.description && (
                        <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                          {item.description}
                        </p>
                      )}

                      <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mt-2.5">
                        <MapPin size={12} />
                        <span>{item.location || 'Coimbatore, Tamil Nadu'}</span>
                      </div>
                    </div>

                    {/* Actions Bar */}
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <button
                        onClick={() => {
                          setActiveItem(item);
                          setShowPreviewModal(true);
                        }}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-sky-600 transition-colors"
                      >
                        <Eye size={14} /> View
                      </button>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => openEditModal(item)}
                          className="p-1.5 text-slate-500 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors"
                          title="Edit Details"
                        >
                          <Edit size={14} />
                        </button>
                        <button
                          onClick={() => openDeleteModal(item)}
                          className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                          title="Delete Item"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* =====================================================================
          UPLOAD MODAL (File Manager Upload)
          ===================================================================== */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 my-8">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-600 flex items-center justify-center">
                  <Upload size={16} />
                </div>
                <h3 className="font-bold text-base text-slate-900">
                  Upload Media via File Manager
                </h3>
              </div>
              <button
                onClick={() => {
                  if (!isUploading) setShowUploadModal(false);
                }}
                className="text-slate-400 hover:text-slate-600"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="mt-4 space-y-4">
              {/* File Dropzone / Picker */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Choose Image or Video File *
                </label>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/jpeg,image/png,image/webp,image/gif,video/mp4,video/webm,video/quicktime,video/x-matroska"
                  className="hidden"
                />

                {!uploadFile ? (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-slate-300 hover:border-sky-500 hover:bg-sky-50/50 rounded-2xl p-6 text-center cursor-pointer transition-all"
                  >
                    <div className="w-12 h-12 bg-sky-50 text-sky-600 rounded-xl flex items-center justify-center mx-auto mb-2">
                      <FolderOpen size={24} />
                    </div>
                    <p className="text-sm font-semibold text-slate-800">
                      Click to browse your device
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      Upload Photos (JPG, PNG, WEBP) or Videos (MP4, WEBM, MOV) up to 150MB
                    </p>
                  </div>
                ) : (
                  <div className="border border-slate-200 rounded-xl p-3 bg-slate-50">
                    <div className="flex items-start gap-3">
                      {/* Live Thumbnail Preview */}
                      <div className="w-20 h-16 rounded-lg bg-black/10 overflow-hidden shrink-0 flex items-center justify-center relative">
                        {uploadFile.type.startsWith('video/') ? (
                          <video
                            src={filePreviewUrl || ''}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <img
                            src={filePreviewUrl || ''}
                            alt="Selected"
                            className="w-full h-full object-cover"
                          />
                        )}
                        {uploadFile.type.startsWith('video/') && (
                          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                            <Play size={14} className="text-white fill-white" />
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-slate-900 truncate">
                          {uploadFile.name}
                        </p>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          {(uploadFile.size / (1024 * 1024)).toFixed(2)} MB •{' '}
                          {uploadFile.type.startsWith('video/') ? 'Video' : 'Image'}
                        </p>
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="text-[11px] font-semibold text-sky-600 hover:text-sky-700 mt-1 underline"
                        >
                          Change file
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setUploadFile(null);
                          setFilePreviewUrl(null);
                          if (fileInputRef.current) fileInputRef.current.value = '';
                        }}
                        className="text-slate-400 hover:text-rose-600 p-1"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Title */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  value={uploadTitle}
                  onChange={(e) => setUploadTitle(e.target.value)}
                  placeholder="e.g. 50kW Rooftop Solar Installation Kanuvai"
                  required
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white"
                />
              </div>

              {/* Category */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Category *
                  </label>
                  <select
                    value={uploadCategory}
                    onChange={(e) => setUploadCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Tag / Highlight
                  </label>
                  <input
                    type="text"
                    value={uploadTag}
                    onChange={(e) => setUploadTag(e.target.value)}
                    placeholder="e.g. Commercial Array"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white"
                  />
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Project Location
                </label>
                <input
                  type="text"
                  value={uploadLocation}
                  onChange={(e) => setUploadLocation(e.target.value)}
                  placeholder="Coimbatore, Tamil Nadu"
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={uploadDescription}
                  onChange={(e) => setUploadDescription(e.target.value)}
                  placeholder="Details about client, system capacity, equipment used..."
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white"
                />
              </div>

              {/* Upload Progress Bar */}
              {isUploading && (
                <div className="pt-2">
                  <div className="flex justify-between text-[11px] font-semibold text-slate-600 mb-1">
                    <span>Uploading file...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-sky-600 to-emerald-500 transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  disabled={isUploading}
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUploading || !uploadFile}
                  className="px-5 py-2 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-500 disabled:opacity-50 rounded-xl shadow-md transition-all flex items-center gap-1.5"
                >
                  {isUploading ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload size={14} /> Upload Media
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =====================================================================
          EDIT MODAL
          ===================================================================== */}
      {showEditModal && activeItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 my-8">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center">
                  <Edit size={16} />
                </div>
                <h3 className="font-bold text-base text-slate-900">
                  Edit Gallery Media
                </h3>
              </div>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="mt-4 space-y-4">
              {/* Optional Replacement File */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Replace File (Optional)
                </label>
                <input
                  type="file"
                  ref={editFileInputRef}
                  onChange={handleEditFileChange}
                  accept="image/jpeg,image/png,image/webp,image/gif,video/mp4,video/webm,video/quicktime,video/x-matroska"
                  className="hidden"
                />

                <div className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl">
                  <div className="w-16 h-12 rounded-lg bg-black/10 overflow-hidden shrink-0 flex items-center justify-center">
                    {editFilePreviewUrl ? (
                      editFile?.type.startsWith('video/') ? (
                        <video src={editFilePreviewUrl} className="w-full h-full object-cover" />
                      ) : (
                        <img src={editFilePreviewUrl} alt="New" className="w-full h-full object-cover" />
                      )
                    ) : (
                      <img
                        src={activeItem.mediaUrl || activeItem.image}
                        alt="Current"
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-slate-800 truncate">
                      {editFile ? editFile.name : 'Current media kept'}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      {editFile
                        ? `${(editFile.size / (1024 * 1024)).toFixed(2)} MB`
                        : 'Choose new file only if replacing'}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => editFileInputRef.current?.click()}
                    className="px-3 py-1.5 text-xs font-semibold text-sky-700 bg-sky-100 hover:bg-sky-200 rounded-lg transition-colors"
                  >
                    Browse...
                  </button>
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  required
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white"
                />
              </div>

              {/* Category & Tag */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Category *
                  </label>
                  <select
                    value={editCategory}
                    onChange={(e) => setEditCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Tag / Highlight
                  </label>
                  <input
                    type="text"
                    value={editTag}
                    onChange={(e) => setEditTag(e.target.value)}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white"
                  />
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Location
                </label>
                <input
                  type="text"
                  value={editLocation}
                  onChange={(e) => setEditLocation(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  disabled={isSavingEdit}
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSavingEdit}
                  className="px-5 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 rounded-xl shadow-md transition-all flex items-center gap-1.5"
                >
                  {isSavingEdit ? (
                    <>
                      <Loader2 size={14} className="animate-spin" /> Saving...
                    </>
                  ) : (
                    'Save Changes'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =====================================================================
          DELETE CONFIRMATION MODAL
          ===================================================================== */}
      {showDeleteModal && activeItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100">
            <div className="flex items-center gap-3 mb-3 text-rose-600">
              <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center">
                <Trash2 size={20} />
              </div>
              <h3 className="font-bold text-base text-slate-900">
                Delete Media Item
              </h3>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Are you sure you want to permanently delete{' '}
              <strong className="text-slate-900">"{activeItem.title}"</strong>? This will
              remove both the database record and the uploaded file from the server.
            </p>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isDeleting}
                onClick={confirmDelete}
                className="px-5 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-500 disabled:opacity-50 rounded-xl shadow-md transition-all flex items-center gap-1.5"
              >
                {isDeleting ? (
                  <>
                    <Loader2 size={14} className="animate-spin" /> Deleting...
                  </>
                ) : (
                  'Yes, Delete'
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          PREVIEW MODAL (Interactive Lightbox for Image & Video)
          ===================================================================== */}
      {showPreviewModal && activeItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
          <button
            onClick={() => setShowPreviewModal(false)}
            className="absolute top-5 right-5 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors z-10"
          >
            <X size={20} />
          </button>

          <div className="max-w-4xl w-full bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-white/10 flex flex-col max-h-[90vh]">
            {/* Visual Media */}
            <div className="flex-1 bg-black flex items-center justify-center overflow-hidden min-h-[300px]">
              {activeItem.mediaType === 'video' ? (
                <video
                  src={activeItem.mediaUrl || activeItem.image}
                  controls
                  autoPlay
                  className="w-full max-h-[70vh] object-contain"
                />
              ) : (
                <img
                  src={activeItem.mediaUrl || activeItem.image}
                  alt={activeItem.title}
                  className="w-full max-h-[70vh] object-contain"
                />
              )}
            </div>

            {/* Media Information Footer */}
            <div className="p-4 bg-slate-900/95 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-white/10">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[11px] font-semibold text-sky-400 bg-sky-950/60 border border-sky-800/50 px-2 py-0.5 rounded-md">
                    {activeItem.categoryLabel || activeItem.category}
                  </span>
                  {activeItem.tag && (
                    <span className="text-[11px] text-slate-400">
                      • {activeItem.tag}
                    </span>
                  )}
                </div>
                <h3 className="font-bold text-sm text-white">{activeItem.title}</h3>
                {activeItem.description && (
                  <p className="text-xs text-slate-300 mt-1 max-w-xl">
                    {activeItem.description}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => {
                    setShowPreviewModal(false);
                    openEditModal(activeItem);
                  }}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <Edit size={13} /> Edit
                </button>
                <button
                  onClick={() => setShowPreviewModal(false)}
                  className="px-3.5 py-1.5 bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold rounded-lg transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
