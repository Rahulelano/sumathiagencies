import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Camera,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Eye,
  Filter,
  Layers,
  MapPin,
  Maximize2,
  Search,
  ShieldCheck,
  Sparkles,
  Sun,
  X,
  Zap,
  Video,
  Play,
  Image as ImageIcon,
} from 'lucide-react';
import { WhatsAppIcon } from '../components/WhatsAppIcon';
import type { LucideIcon } from 'lucide-react';
import type { Page, GalleryCategory, GalleryItem } from '../types';
import { galleryItems as defaultGalleryItems } from '../data/gallery';
import { PageHero } from '../components/PageHero';
import { Cta } from '../components/Cta';
import { whatsappLink } from '../utils/navigation';
import { defaultMotionEase } from '../components/MotionText';
import { fetchGalleryItems } from '../services/api';

type GalleryProps = {
  navigate: (page: Page) => void;
};

type FilterOption = {
  id: GalleryCategory;
  label: string;
  icon: LucideIcon;
};

const filterOptions: FilterOption[] = [
  { id: 'all', label: 'All Projects', icon: Layers },
  { id: 'solar-rooftop', label: 'Solar Rooftop & PV', icon: Sun },
  { id: 'water-heating', label: 'Solar Water Heaters', icon: Zap },
  { id: 'solar-lighting', label: 'Solar Street Lights', icon: Sparkles },
  { id: 'security-cctv', label: 'Smart Security & CCTV', icon: Camera },
];

export function Gallery({ navigate }: GalleryProps): React.ReactElement {
  const [items, setItems] = useState<GalleryItem[]>(defaultGalleryItems);
  const [activeCategory, setActiveCategory] = useState<GalleryCategory | string>('all');
  const [mediaTypeFilter, setMediaTypeFilter] = useState<'all' | 'image' | 'video'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isLoadingBackend, setIsLoadingBackend] = useState(false);

  // Fetch dynamic gallery items from backend MongoDB via Axios
  useEffect(() => {
    let isMounted = true;
    const loadItems = async () => {
      try {
        setIsLoadingBackend(true);
        const backendItems = await fetchGalleryItems();
        if (isMounted && backendItems && backendItems.length > 0) {
          // Merge uploaded items on top of static fallback items
          const backendIds = new Set(backendItems.map((i) => i.id || i._id));
          const nonDuplicates = defaultGalleryItems.filter(
            (def) => !backendIds.has(def.id)
          );
          setItems([...backendItems, ...nonDuplicates]);
        }
      } catch (err) {
        console.warn('Backend not available yet, using local gallery items:', err);
      } finally {
        if (isMounted) setIsLoadingBackend(false);
      }
    };
    loadItems();
    return () => {
      isMounted = false;
    };
  }, []);

  // Filter items based on category, mediaType, and search query
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesCategory =
        activeCategory === 'all' || item.category === activeCategory;
      const itemMediaType = item.mediaType || 'image';
      const matchesMediaType =
        mediaTypeFilter === 'all' || itemMediaType === mediaTypeFilter;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.title.toLowerCase().includes(q) ||
        (item.location && item.location.toLowerCase().includes(q)) ||
        (item.tag && item.tag.toLowerCase().includes(q)) ||
        (item.description && item.description.toLowerCase().includes(q));
      return matchesCategory && matchesMediaType && matchesSearch;
    });
  }, [items, activeCategory, mediaTypeFilter, searchQuery]);

  // Counts per category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      all: items.length,
      'solar-rooftop': 0,
      'water-heating': 0,
      'solar-lighting': 0,
      'security-cctv': 0,
    };
    items.forEach((item) => {
      if (counts[item.category] !== undefined) {
        counts[item.category]++;
      }
    });
    return counts;
  }, [items]);

  // Keyboard navigation for lightbox
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') {
        setLightboxIndex(null);
        setIsZoomed(false);
      } else if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) =>
          prev === null ? null : (prev + 1) % filteredItems.length
        );
        setIsZoomed(false);
      } else if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) =>
          prev === null
            ? null
            : (prev - 1 + filteredItems.length) % filteredItems.length
        );
        setIsZoomed(false);
      }
    },
    [lightboxIndex, filteredItems.length]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    if (lightboxIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleKeyDown, lightboxIndex]);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setIsZoomed(false);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
    setIsZoomed(false);
  };

  const nextLightboxItem = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
      setIsZoomed(false);
    }
  };

  const prevLightboxItem = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex(
        (lightboxIndex - 1 + filteredItems.length) % filteredItems.length
      );
      setIsZoomed(false);
    }
  };

  const activeItem: GalleryItem | undefined =
    lightboxIndex !== null ? filteredItems[lightboxIndex] : undefined;

  return (
    <div className="gallery-page">
      {/* Page Hero */}
      <PageHero
        eyebrow="On-Site Installations"
        title={
          <>
            Crafted with care.
            <br />
            <em>Proven in the field.</em>
          </>
        }
        copy="Take a look at real-world solar power systems, solar water heaters, street light arrays, and smart IoT security setups installed by Sumathi Agencies across Coimbatore and Tamil Nadu."
      />

      {/* Gallery Stats Bar */}
      <section className="gallery-stats-bar">
        <div className="container">
          <div className="gallery-stats-grid">
            <motion.div
              className="gallery-stat-item"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.55, ease: defaultMotionEase }}
            >
              <span className="stat-number">500+</span>
              <span className="stat-label">Sites Installed</span>
            </motion.div>
            <div className="gallery-stat-divider" />
            <motion.div
              className="gallery-stat-item"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.55, delay: 0.08, ease: defaultMotionEase }}
            >
              <span className="stat-number">15+</span>
              <span className="stat-label">Years Field Proven</span>
            </motion.div>
            <div className="gallery-stat-divider" />
            <motion.div
              className="gallery-stat-item"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.55, delay: 0.16, ease: defaultMotionEase }}
            >
              <span className="stat-number">100%</span>
              <span className="stat-label">MNRE &amp; BIS Compliant</span>
            </motion.div>
            <div className="gallery-stat-divider" />
            <motion.div
              className="gallery-stat-item"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.55, delay: 0.24, ease: defaultMotionEase }}
            >
              <span className="stat-number">4.9 ★</span>
              <span className="stat-label">Client Trust Score</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Interactive Gallery Section */}
      <section className="gallery-main section-pad">
        <div className="container">
          {/* Controls Bar: Categories & Search */}
          <div className="gallery-controls-wrap">
            {/* Category Filter Tabs */}
            <motion.div
              className="gallery-tabs"
              role="tablist"
              initial={{ opacity: 0, x: -45 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, ease: defaultMotionEase }}
            >
              {filterOptions.map((opt) => {
                const Icon = opt.icon;
                const isActive = activeCategory === opt.id;
                const count = categoryCounts[opt.id];
                return (
                  <button
                    key={opt.id}
                    role="tab"
                    aria-selected={isActive}
                    className={`gallery-tab-btn ${isActive ? 'is-active' : ''}`}
                    onClick={() => setActiveCategory(opt.id)}
                  >
                    <Icon size={15} />
                    <span>{opt.label}</span>
                    <span className="tab-count-pill">{count}</span>
                  </button>
                );
              })}
            </motion.div>

            {/* Search Input Box */}
            <motion.div
              className="gallery-search-wrap"
              initial={{ opacity: 0, x: 45 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, ease: defaultMotionEase }}
            >
              <Search size={16} className="search-icon" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search installations, locations..."
                className="gallery-search-input"
                aria-label="Search gallery installations"
              />
              {searchQuery && (
                <button
                  className="search-clear-btn"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                >
                  <X size={14} />
                </button>
              )}
            </motion.div>
          </div>

          {/* Results Summary & Media Filter Pills */}
          <div className="gallery-results-meta flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span>
                Showing <strong>{filteredItems.length}</strong> of{' '}
                {items.length} installations
              </span>
              {isLoadingBackend && (
                <span className="text-xs text-sky-600 animate-pulse ml-2">
                  (Syncing with live database...)
                </span>
              )}
            </div>

            {/* Media Type Toggle Pills */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-full text-xs font-semibold">
              <button
                onClick={() => setMediaTypeFilter('all')}
                className={`px-3 py-1 rounded-full transition-all ${
                  mediaTypeFilter === 'all'
                    ? 'bg-sky-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All Media
              </button>
              <button
                onClick={() => setMediaTypeFilter('image')}
                className={`px-3 py-1 rounded-full transition-all flex items-center gap-1 ${
                  mediaTypeFilter === 'image'
                    ? 'bg-sky-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <ImageIcon size={12} /> Photos
              </button>
              <button
                onClick={() => setMediaTypeFilter('video')}
                className={`px-3 py-1 rounded-full transition-all flex items-center gap-1 ${
                  mediaTypeFilter === 'video'
                    ? 'bg-sky-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Video size={12} /> Videos
              </button>
            </div>

            {searchQuery && (
              <button
                className="clear-filters-btn"
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                  setMediaTypeFilter('all');
                }}
              >
                Reset filters
              </button>
            )}
          </div>

          {/* Gallery Items Grid */}
          {filteredItems.length > 0 ? (
            <div className="gallery-grid">
              {filteredItems.map((item, index) => {
                const isHovered = hoveredCardId === item.id;
                const isEven = index % 2 === 0;
                return (
                  <motion.article
                    key={item.id}
                    className={`gallery-card ${isHovered ? 'card-hovered' : ''}`}
                    onMouseEnter={() => setHoveredCardId(item.id)}
                    onMouseLeave={() => setHoveredCardId(null)}
                    onClick={() => openLightbox(index)}
                    role="button"
                    tabIndex={0}
                    initial={{ opacity: 0, x: isEven ? -35 : 35 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.12 }}
                    transition={{ duration: 0.55, delay: (index % 4) * 0.08, ease: defaultMotionEase }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        openLightbox(index);
                      }
                    }}
                    aria-label={`View photo & installation details: ${item.title}`}
                  >
                    {/* Media Container with Zoom */}
                    <div className="gallery-card-media">
                      {item.mediaType === 'video' ? (
                        <div className="relative w-full h-full bg-slate-950 flex items-center justify-center">
                          <video
                            src={item.mediaUrl || item.image}
                            className="gallery-card-img object-cover w-full h-full"
                            preload="metadata"
                          />
                          <div className="absolute inset-0 bg-black/35 flex items-center justify-center">
                            <div className="w-12 h-12 rounded-full bg-white/90 text-slate-900 flex items-center justify-center shadow-lg hover:scale-110 transition-transform pl-0.5">
                              <Play size={20} fill="#0f172a" />
                            </div>
                          </div>
                        </div>
                      ) : (
                        <img
                          src={item.mediaUrl || item.image}
                          alt={item.title}
                          loading="lazy"
                          className="gallery-card-img"
                        />
                      )}
                      {/* Top Badges */}
                      <div className="gallery-card-badges">
                        {item.mediaType === 'video' && (
                          <span className="gallery-tag-pill bg-purple-600 text-white font-semibold flex items-center gap-1">
                            <Video size={11} /> Video
                          </span>
                        )}
                        <span className="gallery-tag-pill">{item.tag}</span>
                        <span className="gallery-location-pill">
                          <MapPin size={12} />
                          {item.location}
                        </span>
                      </div>

                      {/* Interactive Hover / Focus Overlay */}
                      <div className="gallery-card-overlay">
                        <div className="overlay-content">
                          <span className="overlay-category">
                            <Sun size={12} /> {item.categoryLabel}
                          </span>
                          <h3 className="overlay-title">{item.title}</h3>
                          <span className="overlay-view-pill">
                            <Eye size={15} />
                            <span>View Installation</span>
                          </span>
                        </div>
                      </div>

                      {/* Ambient Gradient Rim */}
                      <div className="gallery-card-rim" />
                    </div>
                  </motion.article>
                );
              })}
            </div>
          ) : (
            <div className="gallery-empty-state">
              <Filter size={36} className="empty-icon" />
              <h3>No installation matches found</h3>
              <p>Try refining your search keyword or selecting another sector.</p>
              <button
                className="button primary"
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                }}
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Interactive Lightbox Modal */}
      {lightboxIndex !== null && activeItem && (
        <div
          className="lightbox-backdrop"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label={`Photo viewer: ${activeItem.title}`}
        >
          {/* Modal Container */}
          <div
            className="lightbox-dialog"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar Controls */}
            <div className="lightbox-top-bar">
              <div className="lightbox-counter">
                <span className="counter-current">{lightboxIndex + 1}</span>
                <span className="counter-sep">/</span>
                <span className="counter-total">{filteredItems.length}</span>
                <span className="counter-label">{activeItem.categoryLabel}</span>
              </div>

              <div className="lightbox-actions">
                <button
                  className="lightbox-icon-btn"
                  onClick={() => setIsZoomed(!isZoomed)}
                  title={isZoomed ? 'Zoom out' : 'Zoom in'}
                  aria-label="Toggle zoom"
                >
                  <Maximize2 size={18} />
                </button>
                <button
                  className="lightbox-icon-btn close-btn"
                  onClick={closeLightbox}
                  title="Close viewer (Esc)"
                  aria-label="Close photo viewer"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Main Stage: Image & Nav Arrows */}
            <div className="lightbox-stage">
              <button
                className="lightbox-nav-btn prev-btn"
                onClick={prevLightboxItem}
                aria-label="Previous photo (Left arrow)"
              >
                <ChevronLeft size={30} />
              </button>

              <div className={`lightbox-image-wrap ${isZoomed ? 'is-zoomed' : ''}`}>
                {activeItem.mediaType === 'video' ? (
                  <video
                    src={activeItem.mediaUrl || activeItem.image}
                    controls
                    autoPlay
                    className="lightbox-full-video"
                    style={{
                      maxHeight: '75vh',
                      maxWidth: '100%',
                      borderRadius: '12px',
                      backgroundColor: '#000',
                    }}
                  />
                ) : (
                  <img
                    src={activeItem.mediaUrl || activeItem.image}
                    alt={activeItem.title}
                    className="lightbox-full-img"
                    onClick={() => setIsZoomed(!isZoomed)}
                  />
                )}
              </div>

              <button
                className="lightbox-nav-btn next-btn"
                onClick={nextLightboxItem}
                aria-label="Next photo (Right arrow)"
              >
                <ChevronRight size={30} />
              </button>
            </div>

            {/* Bottom Caption & WhatsApp CTA */}
            <div className="lightbox-caption-bar">
              <div className="caption-text-area">
                <div className="caption-meta">
                  <span className="caption-category">
                    <Sun size={12} /> {activeItem.categoryLabel}
                  </span>
                  <span className="caption-badge">{activeItem.tag}</span>
                  <span className="caption-location">
                    <MapPin size={13} /> {activeItem.location}
                  </span>
                </div>
                <h2 className="caption-title">{activeItem.title}</h2>
                <p className="caption-desc">{activeItem.description}</p>
              </div>

              <div className="caption-cta-area">
                <a
                  href={whatsappLink(
                    `Hello Sumathi Agencies, I am interested in a setup like "${activeItem.title}" (${activeItem.location}). Could you provide a site inspection and quote?`
                  )}
                  target="_blank"
                  rel="noreferrer"
                  className="lightbox-whatsapp-btn"
                  title="Enquire on WhatsApp (+91 96002 99942)"
                >
                  <WhatsAppIcon size={17} />
                  <span>Get Quote For This Setup</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Trust & Quality Assurance Section */}
      <section className="gallery-trust-section">
        <div className="container">
          <div className="gallery-trust-card">
            <div className="trust-col-content">
              <motion.div
                className="eyebrow"
                initial={{ opacity: 0, x: -45 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.6, ease: defaultMotionEase }}
              >
                <span /> Certified Workmanship
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, x: -45 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.65, delay: 0.08, ease: defaultMotionEase }}
              >
                Every system engineered for extreme longevity.
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, x: 45 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.65, delay: 0.15, ease: defaultMotionEase }}
              >
                From heavy-gauge anodized aluminum mounting frames and cyclone-resistant
                fasteners to sealed weather-proof junction boxes and factory-tested solar water
                tanks, our field team builds installations built to withstand decades of sun, rain,
                and wind.
              </motion.p>
              <div className="trust-features-grid">
                <motion.div
                  className="trust-feat"
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.6, delay: 0.1, ease: defaultMotionEase }}
                >
                  <CheckCircle2 size={18} className="feat-icon" />
                  <div>
                    <strong>MNRE &amp; TANGEDCO Compliant</strong>
                    <span>Fully certified for net metering and subsidy compliance.</span>
                  </div>
                </motion.div>
                <motion.div
                  className="trust-feat"
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.6, delay: 0.18, ease: defaultMotionEase }}
                >
                  <ShieldCheck size={18} className="feat-icon" />
                  <div>
                    <strong>25-Year Panel Linear Warranty</strong>
                    <span>Backed directly by tier-1 global module manufacturers.</span>
                  </div>
                </motion.div>
                <motion.div
                  className="trust-feat"
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.6, delay: 0.26, ease: defaultMotionEase }}
                >
                  <Zap size={18} className="feat-icon" />
                  <div>
                    <strong>Dedicated Maintenance AMC</strong>
                    <span>Local technician dispatched within 24 hours of any service call.</span>
                  </div>
                </motion.div>
              </div>
            </div>

            <motion.div
              className="trust-col-cta"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.7, delay: 0.15, ease: defaultMotionEase }}
            >
              <div className="trust-cta-box">
                <Sun size={40} className="cta-sun-icon" />
                <h3>Ready to power your property?</h3>
                <p>
                  Request a free site assessment and customized generation report for your home,
                  factory, or farm.
                </p>
                <button
                  className="button primary w-full"
                  onClick={() => navigate('contact')}
                >
                  Schedule Site Survey <ArrowRight size={15} />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Global CTA Banner */}
      <Cta navigate={navigate} />
    </div>
  );
}
