import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Phone, ChevronLeft, ChevronRight, LayoutGrid, SlidersHorizontal } from 'lucide-react';
import type { Page } from '../types';
import { products } from '../data/products';
import { officeNumber, officeNumberDisplay } from '../utils/navigation';
import { PageHero } from '../components/PageHero';
import { SectionHeading } from '../components/SectionHeading';
import { ProductCard } from '../components/ProductCard';
import { Cta } from '../components/Cta';
import { defaultMotionEase } from '../components/MotionText';

type ProductsProps = {
  navigate: (page: Page) => void;
};

export function Products({ navigate }: ProductsProps) {
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'carousel' | 'grid'>('carousel');
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(4);
  const [isCarouselHovered, setIsCarouselHovered] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  // Extract all unique tags while maintaining exact labels
  const allTags = ['All', ...Array.from(new Set(products.map((p) => p.tag)))];

  const filteredProducts =
    selectedTag === 'All'
      ? products
      : products.filter((p) => p.tag === selectedTag);

  // Responsive items count for carousel
  useEffect(() => {
    const updateVisibleCount = () => {
      if (typeof window === 'undefined') return;
      if (window.innerWidth < 640) {
        setVisibleCount(1);
      } else if (window.innerWidth < 960) {
        setVisibleCount(2);
      } else if (window.innerWidth < 1200) {
        setVisibleCount(3);
      } else {
        setVisibleCount(4);
      }
    };
    updateVisibleCount();
    window.addEventListener('resize', updateVisibleCount);
    return () => window.removeEventListener('resize', updateVisibleCount);
  }, []);

  const maxIndex = Math.max(0, filteredProducts.length - visibleCount);

  // Keep carousel index in bounds when filtering or resizing
  useEffect(() => {
    if (carouselIndex > maxIndex) {
      setCarouselIndex(maxIndex);
    }
  }, [maxIndex, carouselIndex]);

  // Autoplay for carousel
  useEffect(() => {
    if (viewMode !== 'carousel' || isCarouselHovered || maxIndex === 0) return;
    const timer = setInterval(() => {
      setCarouselIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 4500);
    return () => clearInterval(timer);
  }, [viewMode, isCarouselHovered, maxIndex]);

  const prevSlide = () => {
    setCarouselIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const nextSlide = () => {
    setCarouselIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX;
    if (deltaX > 45) {
      prevSlide();
    } else if (deltaX < -45) {
      nextSlide();
    }
    setTouchStartX(null);
  };

  return (
    <>
      <PageHero
        eyebrow="Our solutions"
        title={
          <>
            Power made<br />
            <em>practical.</em>
          </>
        }
        copy="Thoughtfully selected products, installed with care and supported by people who know the local conditions."
      />

      <section className="section-pad products-main">
        <div className="container">
          <div className="products-intro">
            <SectionHeading
              eyebrow="What we offer"
              title="The right solution for your next step."
              copy="Whether you want to cut your electricity bill, secure your property or improve water quality, we can help you make the right choice."
            />
            <motion.a
              className="phone-note"
              href={`tel:${officeNumber}`}
              initial={{ opacity: 0, x: 45 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, ease: defaultMotionEase }}
            >
              <Phone size={18} /> Need help choosing? <strong>Call {officeNumberDisplay}</strong>
            </motion.a>
          </div>

          <div className="products-controls-bar">
            <motion.div
              className="products-filter-bar"
              initial={{ opacity: 0, x: -45 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, ease: defaultMotionEase }}
            >
              {allTags.map((tag) => (
                <button
                  key={tag}
                  className={`filter-pill ${selectedTag === tag ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedTag(tag);
                    setCarouselIndex(0);
                  }}
                >
                  {tag === 'All' ? `All Solutions (${products.length})` : tag}
                </button>
              ))}
            </motion.div>

            <motion.div
              className="products-view-actions"
              initial={{ opacity: 0, x: 45 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, ease: defaultMotionEase }}
            >
              <div className="view-mode-toggle">
                <button
                  type="button"
                  className={`view-mode-btn ${viewMode === 'carousel' ? 'active' : ''}`}
                  onClick={() => setViewMode('carousel')}
                  title="Carousel View"
                >
                  <SlidersHorizontal size={14} /> Carousel
                </button>
                <button
                  type="button"
                  className={`view-mode-btn ${viewMode === 'grid' ? 'active' : ''}`}
                  onClick={() => setViewMode('grid')}
                  title="Grid View"
                >
                  <LayoutGrid size={14} /> Grid
                </button>
              </div>

              {viewMode === 'carousel' && (
                <div className="carousel-nav-group">
                  <div className="carousel-status-pill">
                    <span className="pill-active">
                      {String(carouselIndex + 1).padStart(2, '0')}
                    </span>
                    <span className="pill-divider">/</span>
                    <span className="pill-total">
                      {String(filteredProducts.length).padStart(2, '0')}
                    </span>
                  </div>
                  <button
                    type="button"
                    className="carousel-btn prev"
                    onClick={prevSlide}
                    disabled={filteredProducts.length <= visibleCount && carouselIndex === 0}
                    aria-label="Previous solution"
                    title="Previous solution"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    type="button"
                    className="carousel-btn next"
                    onClick={nextSlide}
                    disabled={filteredProducts.length <= visibleCount && carouselIndex === 0}
                    aria-label="Next solution"
                    title="Next solution"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              )}
            </motion.div>
          </div>

          {viewMode === 'carousel' ? (
            <motion.div
              className="product-carousel-viewport"
              onMouseEnter={() => setIsCarouselHovered(true)}
              onMouseLeave={() => setIsCarouselHovered(false)}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.7, ease: defaultMotionEase }}
            >
              <div
                className="product-carousel-track"
                style={{
                  transform: `translateX(-${(carouselIndex * 100) / visibleCount}%)`,
                }}
              >
                {filteredProducts.map((product, index) => (
                  <div
                    className="product-carousel-item"
                    key={product.number}
                    style={{
                      flex: `0 0 ${100 / visibleCount}%`,
                    }}
                  >
                    <ProductCard product={product} index={index} />
                  </div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              className="product-grid full"
              key={selectedTag}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.7, ease: defaultMotionEase }}
            >
              {filteredProducts.map((product, index) => (
                <ProductCard key={product.number} product={product} index={index} />
              ))}
            </motion.div>
          )}

          {viewMode === 'carousel' && maxIndex > 0 && (
            <div className="carousel-dots-row">
              {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`carousel-dot ${carouselIndex === idx ? 'active' : ''}`}
                  onClick={() => setCarouselIndex(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <Cta navigate={navigate} />
    </>
  );
}
