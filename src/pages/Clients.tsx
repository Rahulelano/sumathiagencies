import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  BadgeCheck,
  Search,
  X,
  GraduationCap,
  TreePine,
  Building2,
  Sparkles,
  CheckCircle2,
  Users
} from 'lucide-react';
import type { Page } from '../types';
import { clients } from '../data/clients';
import { PageHero } from '../components/PageHero';
import { SectionHeading } from '../components/SectionHeading';
import { Cta } from '../components/Cta';
import { defaultMotionEase } from '../components/MotionText';

type ClientsProps = {
  navigate: (page: Page) => void;
};

type CategoryFilter = 'all' | 'education' | 'hospitality' | 'commercial';

// Categorization helper for interactive filtering
const getClientCategory = (name: string): 'education' | 'hospitality' | 'commercial' => {
  const lower = name.toLowerCase();
  if (
    lower.includes('university') ||
    lower.includes('school') ||
    lower.includes('academy') ||
    lower.includes('mission')
  ) {
    return 'education';
  }
  if (
    lower.includes('resort') ||
    lower.includes('retreat') ||
    lower.includes('woods')
  ) {
    return 'hospitality';
  }
  return 'commercial';
};

export function Clients({ navigate }: ClientsProps) {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Filter clients based on selected category and search input
  const filteredClients = useMemo(() => {
    return clients.filter((client) => {
      const category = getClientCategory(client.name);
      const matchesCategory =
        activeCategory === 'all' || category === activeCategory;
      const matchesSearch =
        client.name.toLowerCase().includes(searchQuery.toLowerCase().trim());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Sector counts
  const educationCount = useMemo(
    () => clients.filter((c) => getClientCategory(c.name) === 'education').length,
    []
  );
  const hospitalityCount = useMemo(
    () => clients.filter((c) => getClientCategory(c.name) === 'hospitality').length,
    []
  );
  const commercialCount = useMemo(
    () => clients.filter((c) => getClientCategory(c.name) === 'commercial').length,
    []
  );

  return (
    <>
      <PageHero
        eyebrow="Happy Customers"
        title={
          <>
            Happy<br />
            <em>Customers.</em>
          </>
        }
        copy="We are grateful to work with organizations, institutions, and families that trust Sumathi Agencies to deliver practical, dependable energy solutions."
      />

      <section className="section-pad clients-main">
        <div className="container">
          <div className="clients-intro">
            <SectionHeading
              eyebrow="Trusted Relationships"
              title="Happy Customers"
              copy="Every project starts with listening and ends with lasting support. These are some of the happy customers, resorts, and institutions who have been part of our journey."
            />

            {/* Interactive Sector Highlight Pills */}
            <div className="client-sectors-bar">
              <motion.button
                type="button"
                className={`sector-stat-pill ${activeCategory === 'education' ? 'active' : ''}`}
                onClick={() =>
                  setActiveCategory(activeCategory === 'education' ? 'all' : 'education')
                }
                title="Filter by Education & Institutions"
                initial={{ opacity: 0, x: -35 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.55, ease: defaultMotionEase }}
              >
                <span className="sector-pill-icon"><GraduationCap size={16} /></span>
                <span className="sector-pill-count">{educationCount}</span>
                <span className="sector-pill-label">Academic & Institutions</span>
              </motion.button>

              <motion.button
                type="button"
                className={`sector-stat-pill ${activeCategory === 'hospitality' ? 'active' : ''}`}
                onClick={() =>
                  setActiveCategory(activeCategory === 'hospitality' ? 'all' : 'hospitality')
                }
                title="Filter by Resorts & Hospitality"
                initial={{ opacity: 0, x: 35 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.55, delay: 0.08, ease: defaultMotionEase }}
              >
                <span className="sector-pill-icon"><TreePine size={16} /></span>
                <span className="sector-pill-count">{hospitalityCount}</span>
                <span className="sector-pill-label">Resorts & Retreats</span>
              </motion.button>

              <motion.button
                type="button"
                className={`sector-stat-pill ${activeCategory === 'commercial' ? 'active' : ''}`}
                onClick={() =>
                  setActiveCategory(activeCategory === 'commercial' ? 'all' : 'commercial')
                }
                title="Filter by Commercial & Industry"
                initial={{ opacity: 0, x: -35 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.55, delay: 0.16, ease: defaultMotionEase }}
              >
                <span className="sector-pill-icon"><Building2 size={16} /></span>
                <span className="sector-pill-count">{commercialCount}</span>
                <span className="sector-pill-label">Commercial & Industry</span>
              </motion.button>

              <motion.div
                className="sector-stat-pill static"
                initial={{ opacity: 0, x: 35 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.55, delay: 0.24, ease: defaultMotionEase }}
              >
                <span className="sector-pill-icon"><Sparkles size={16} /></span>
                <span className="sector-pill-count">100%</span>
                <span className="sector-pill-label">Turnkey Support</span>
              </motion.div>
            </div>

            {/* Interactive Search & Filter Controls */}
            <div className="client-controls-bar">
              <motion.div
                className="client-filter-tabs"
                initial={{ opacity: 0, x: -45 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.6, ease: defaultMotionEase }}
              >
                <button
                  type="button"
                  className={`client-tab ${activeCategory === 'all' ? 'active' : ''}`}
                  onClick={() => setActiveCategory('all')}
                >
                  <Users size={14} />
                  <span>All Partners</span>
                  <span className="tab-badge">{clients.length}</span>
                </button>
                <button
                  type="button"
                  className={`client-tab ${activeCategory === 'education' ? 'active' : ''}`}
                  onClick={() => setActiveCategory('education')}
                >
                  <GraduationCap size={14} />
                  <span>Education</span>
                  <span className="tab-badge">{educationCount}</span>
                </button>
                <button
                  type="button"
                  className={`client-tab ${activeCategory === 'hospitality' ? 'active' : ''}`}
                  onClick={() => setActiveCategory('hospitality')}
                >
                  <TreePine size={14} />
                  <span>Resorts</span>
                  <span className="tab-badge">{hospitalityCount}</span>
                </button>
                <button
                  type="button"
                  className={`client-tab ${activeCategory === 'commercial' ? 'active' : ''}`}
                  onClick={() => setActiveCategory('commercial')}
                >
                  <Building2 size={14} />
                  <span>Commercial</span>
                  <span className="tab-badge">{commercialCount}</span>
                </button>
              </motion.div>

              {/* Interactive Search Input */}
              <motion.div
                className="client-search-wrap"
                initial={{ opacity: 0, x: 45 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.6, ease: defaultMotionEase }}
              >
                <Search size={16} className="client-search-icon" />
                <input
                  type="text"
                  placeholder="Search client or institution..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="client-search-input"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="client-search-clear"
                    title="Clear search"
                  >
                    <X size={14} />
                  </button>
                )}
              </motion.div>
            </div>

            {/* Result count indicator */}
            <div className="client-results-summary">
              <span>
                Showing <strong>{filteredClients.length}</strong> of{' '}
                <strong>{clients.length}</strong> trusted partners
                {activeCategory !== 'all' && (
                  <> in <em>{activeCategory}</em></>
                )}
                {searchQuery && (
                  <> matching &ldquo;{searchQuery}&rdquo;</>
                )}
              </span>
              {(activeCategory !== 'all' || searchQuery) && (
                <button
                  type="button"
                  className="client-reset-link"
                  onClick={() => {
                    setActiveCategory('all');
                    setSearchQuery('');
                  }}
                >
                  Reset all filters
                </button>
              )}
            </div>
          </div>

          {/* Client Grid with interactive hover animations */}
          {filteredClients.length > 0 ? (
            <div className="client-grid">
              {filteredClients.map((client, index) => {
                const originalIndex = clients.findIndex((c) => c.name === client.name);
                const isHovered = hoveredIndex === index;
                const isEven = index % 2 === 0;

                return (
                  <motion.div
                    className={`client-feature ${client.image ? '' : 'text-client'} ${
                      isHovered ? 'hovered' : ''
                    }`}
                    key={client.name}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    initial={{ opacity: 0, x: isEven ? -35 : 35 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.12 }}
                    transition={{ duration: 0.55, delay: (index % 4) * 0.08, ease: defaultMotionEase }}
                  >
                    {/* Top ambient shimmer bar */}
                    <div className="client-card-shimmer" />

                    <div className="client-feature-number">
                      {String((originalIndex >= 0 ? originalIndex : index) + 1).padStart(2, '0')}
                    </div>

                    {client.image ? (
                      <div className="client-image-wrap">
                        <img src={client.image} alt={client.name} />
                        <div className="client-verified-tag">
                          <CheckCircle2 size={12} />
                          <span>Verified Client</span>
                        </div>
                      </div>
                    ) : (
                      <div className="client-text-mark-wrap">
                        <div className="client-text-mark">
                          <span>SA</span>
                          <div className="client-mark-ring" />
                        </div>
                        <div className="client-verified-tag text-mark-tag">
                          <CheckCircle2 size={12} />
                          <span>Direct Partner</span>
                        </div>
                      </div>
                    )}

                    <div className="client-feature-info">
                      <div className="client-badge-row">
                        <span className="client-status-dot" />
                        <span>Client partner</span>
                      </div>
                      <h3>{client.name}</h3>
                      <p>
                        Dependable solutions, thoughtful service and support from Sumathi Agencies.
                      </p>
                    </div>

                    {/* Interactive bottom micro-bar */}
                    <div className="client-card-footer">
                      <span className="client-footer-tag">Coimbatore &amp; Region</span>
                      <span className="client-footer-action">
                        Installed &amp; Maintained <ArrowRight size={12} />
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="client-empty-state">
              <Building2 size={44} className="empty-icon" />
              <h3>No matching partners found</h3>
              <p>We couldn&apos;t find any clients matching &ldquo;{searchQuery}&rdquo;.</p>
              <button
                type="button"
                className="button secondary"
                onClick={() => {
                  setActiveCategory('all');
                  setSearchQuery('');
                }}
              >
                Clear search &amp; show all
              </button>
            </div>
          )}

          {/* Interactive Callout Banner */}
          <div className="client-note interactive-note">
            <motion.div
              className="client-note-icon-wrap"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, ease: defaultMotionEase }}
            >
              <BadgeCheck size={26} className="note-badge-icon" />
              <div className="note-pulse-ring" />
            </motion.div>
            <motion.p
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, delay: 0.1, ease: defaultMotionEase }}
            >
              <strong>Looking for a reliable energy partner?</strong> Tell us what you need and we’ll help you find a practical way forward.
            </motion.p>
            <motion.button
              className="button primary client-note-btn"
              onClick={() => navigate('contact')}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, delay: 0.15, ease: defaultMotionEase }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Start a conversation</span>
              <ArrowRight size={17} className="btn-arrow" />
            </motion.button>
          </div>
        </div>
      </section>

      <Cta navigate={navigate} />
    </>
  );
}
