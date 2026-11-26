import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  BadgeCheck,
  ChevronLeft,
  ChevronRight,
  CircleCheck,
  Droplets,
  Flame,
  Lightbulb,
  Play,
  ShieldCheck,
  Sparkles,
  Sun,
  Wrench,
  Zap,
} from 'lucide-react';
import type { Page } from '../types';
import { products } from '../data/products';
import { clients } from '../data/clients';
import { SectionHeading } from '../components/SectionHeading';
import { ProductCard } from '../components/ProductCard';
import { Cta } from '../components/Cta';
import { SolarHeroIllustration } from '../components/SolarHeroIllustration';
import { AboutSolarIllustration } from '../components/AboutSolarIllustration';
import { defaultMotionEase } from '../components/MotionText';

type HomeProps = {
  navigate: (page: Page) => void;
};

export function Home({ navigate }: HomeProps) {
  const [parallax, setParallax] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [introTilt, setIntroTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [hoveredClient, setHoveredClient] = useState<string | null>(null);

  // Solutions Carousel State
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(4);
  const [isCarouselHovered, setIsCarouselHovered] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

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

  const maxIndex = Math.max(0, products.length - visibleCount);

  // Auto-correct index if window resizing reduces maxIndex
  useEffect(() => {
    if (carouselIndex > maxIndex) {
      setCarouselIndex(maxIndex);
    }
  }, [maxIndex, carouselIndex]);

  // Smooth Autoplay
  useEffect(() => {
    if (isCarouselHovered || maxIndex === 0) return;
    const timer = setInterval(() => {
      setCarouselIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 4200);
    return () => clearInterval(timer);
  }, [isCarouselHovered, maxIndex]);

  const nextSlide = () => {
    setCarouselIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCarouselIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (diff > 50) {
      nextSlide();
    } else if (diff < -50) {
      prevSlide();
    }
    setTouchStartX(null);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setParallax({ x, y });

    e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  const handleMouseLeave = () => {
    setParallax({ x: 0, y: 0 });
  };

  const handleIntroMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setIntroTilt({ x: x * 8, y: y * -8 });
  };

  const handleIntroMouseLeave = () => {
    setIntroTilt({ x: 0, y: 0 });
  };

  return (
    <>
      <section
        className="hero"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="hero-glow" />
        <div className="hero-interactive-spotlight" />
        <div className="hero-particles">
          <span className="photon" />
          <span className="photon" />
          <span className="photon" />
          <span className="photon" />
          <span className="photon" />
        </div>
        <div className="hero-grid" />

        <div className="container hero-content">
          <div className="hero-copy">
            <motion.div
              className="eyebrow"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: defaultMotionEase }}
            >
              <span /> Make the future bright with solar power
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.65, delay: 0.1, ease: defaultMotionEase }}
            >
              Make the future bright<br />
              <em>with solar power.</em>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.65, delay: 0.2, ease: defaultMotionEase }}
            >
              Take the mystery out of selecting and developing clean energy solutions. Sumathi Agencies is your global solar panel system specialist for commercial and domestic purpose. Achieve impressive energy savings, property appreciation, a potential revenue stream, and company integrity.
            </motion.p>

            <motion.div
              className="hero-actions"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.65, delay: 0.28, ease: defaultMotionEase }}
            >
              <button className="button primary" onClick={() => navigate('products')}>
                Explore our solutions <ArrowRight size={18} />
              </button>
              <button className="button ghost-light" onClick={() => navigate('contact')}>
                <Play size={16} fill="currentColor" /> Talk to an expert
              </button>
            </motion.div>

            <motion.div
              className="hero-trust"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.65, delay: 0.35, ease: defaultMotionEase }}
            >
              <div className="trust-avatars">
                <span>SA</span>
                <span>15+</span>
                <span>★</span>
              </div>
              <div>
                <strong>Trusted Leader Since 2010</strong>
                <small>Turnkey Solar & Energy Engineering Across South India</small>
              </div>
            </motion.div>
          </div>

          <motion.div
            className="hero-art"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, delay: 0.2, ease: defaultMotionEase }}
          >
            <SolarHeroIllustration parallax={parallax} />
          </motion.div>
        </div>

        <div className="container hero-bottom">
          <span>Explore our impact</span>
          <div className="scroll-line" />
        </div>
      </section>

      {/* Intro Section: Who We Are & We Offer Special Solar Energy Solutions */}
      <section className="intro section-pad">
        <div className="container intro-grid">
          <motion.div
            onMouseMove={handleIntroMouseMove}
            onMouseLeave={handleIntroMouseLeave}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7, ease: defaultMotionEase }}
          >
            <AboutSolarIllustration parallaxTilt={introTilt} />
          </motion.div>
          <div>
            <SectionHeading
              eyebrow="About Us"
              title="We Offer Special Solar Energy Solution"
              copy="Sumathi Agencies is your global solar panel system specialist for commercial and domestic purpose. We help you maximize the assets and value of your property by introducing the financial benefits of solar for your business. Achieve impressive energy savings, property appreciation, a potential revenue stream, and company integrity."
            />

            <motion.p
              className="body-copy"
              initial={{ opacity: 0, x: 45 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.65, delay: 0.1, ease: defaultMotionEase }}
            >
              We always support our clients every step of the way and help them access the financial subsidies and tax benefits of solar from the local government. We take care of the entire process from design to activation to provide you with a turnkey solar system that you know how to operate.
            </motion.p>

            <motion.p
              className="body-copy"
              initial={{ opacity: 0, x: -45 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.65, delay: 0.18, ease: defaultMotionEase }}
            >
              We believe Solar is the most affordable energy source on the planet. Using solar energy we can make easier our life on this earth. We are able to provide the advanced-quality installation and maintenance of wind farms, solar energy systems, and also EV charging ports.
            </motion.p>

            <div className="feature-row">
              <motion.div
                className="feature-card-interactive"
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.6, delay: 0.22, ease: defaultMotionEase }}
              >
                <ShieldCheck size={22} />
                <strong>Quality first</strong>
                <span>International quality standards</span>
              </motion.div>

              <motion.div
                className="feature-card-interactive"
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.6, delay: 0.28, ease: defaultMotionEase }}
              >
                <Wrench size={22} />
                <strong>End-to-end care</strong>
                <span>From design to activation</span>
              </motion.div>
            </div>

            <motion.button
              className="text-link"
              onClick={() => navigate('about')}
              initial={{ opacity: 0, x: 45 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, delay: 0.32, ease: defaultMotionEase }}
            >
              More about our story <ArrowRight size={17} />
            </motion.button>
          </div>
        </div>

        {/* Special Solar Energy Solution Cards from old website */}
        <div className="container">
          <div className="home-special-grid">
            <motion.div
              className="home-special-card"
              onClick={() => navigate('solar-power-plants')}
              role="button"
              tabIndex={0}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, ease: defaultMotionEase }}
            >
              <div className="home-special-card-top">
                <div className="home-special-card-icon">
                  <Sun size={22} />
                </div>
                <h4>Solar Power Plant</h4>
              </div>
              <p>
                We are one of the largest residential rooftop solar On-grid and Off-grid Solar Solutions in South India.
              </p>
            </motion.div>

            <motion.div
              className="home-special-card"
              onClick={() => navigate('solar-water-heaters-etc')}
              role="button"
              tabIndex={0}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, delay: 0.08, ease: defaultMotionEase }}
            >
              <div className="home-special-card-top">
                <div className="home-special-card-icon">
                  <Flame size={22} />
                </div>
                <h4>Solar Water Heater (ETC & FPC)</h4>
              </div>
              <p>
                Sumathi Agencies offers ETC and FPC solar water heaters at par with international quality standards.
              </p>
            </motion.div>

            <motion.div
              className="home-special-card"
              onClick={() => navigate('solar-street-lights-pole')}
              role="button"
              tabIndex={0}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, delay: 0.16, ease: defaultMotionEase }}
            >
              <div className="home-special-card-top">
                <div className="home-special-card-icon">
                  <Lightbulb size={22} />
                </div>
                <h4>Solar Street Light (Wall & Pole)</h4>
              </div>
              <p>
                Leading manufacturer of Pole-Mounted and independent Wall-Mounted Solar LED Street lights in South India.
              </p>
            </motion.div>

            <motion.div
              className="home-special-card"
              onClick={() => navigate('water-softeners-ro')}
              role="button"
              tabIndex={0}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, delay: 0.24, ease: defaultMotionEase }}
            >
              <div className="home-special-card-top">
                <div className="home-special-card-icon">
                  <Droplets size={22} />
                </div>
                <h4>RO Plant & Softeners</h4>
              </div>
              <p>
                We offer a comprehensive range of products, designed to meet specific needs of industries and homes.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Solutions Carousel Section */}
      <section className="services section-pad">
        <div className="container">
          <div className="services-head">
            <SectionHeading
              eyebrow="What We Do"
              title="A better way to power every part of life."
              copy="Purpose-built solutions for the energy, comfort and safety needs of modern Tamil Nadu."
            />

            {/* Carousel Control Bar */}
            <motion.div
              className="carousel-controls"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, ease: defaultMotionEase }}
            >
              <div className="carousel-status-pill">
                <span className="pill-active">
                  {String(carouselIndex + 1).padStart(2, '0')}
                </span>
                <span className="pill-divider">/</span>
                <span className="pill-total">
                  {String(products.length).padStart(2, '0')}
                </span>
              </div>

              <button
                type="button"
                className="carousel-btn prev"
                onClick={prevSlide}
                aria-label="Previous solution"
                title="Previous solution"
              >
                <ChevronLeft size={20} />
              </button>

              <button
                type="button"
                className="carousel-btn next"
                onClick={nextSlide}
                aria-label="Next solution"
                title="Next solution"
              >
                <ChevronRight size={20} />
              </button>
            </motion.div>
          </div>

          {/* Interactive Carousel Viewport & Track */}
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
              {products.map((product, index) => (
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

          {/* Carousel Pagination Dots */}
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

          <div className="center-action">
            <button className="button outline" onClick={() => navigate('products')}>
              View all solutions <ArrowRight size={17} />
            </button>
          </div>

          {/* Why Choose Us Banner */}
          <div className="home-why-choose-banner">
            <motion.h3
              initial={{ opacity: 0, x: -45 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.65, ease: defaultMotionEase }}
            >
              <Sparkles size={24} /> Greener Tomorrow for Everyone — Why Choose Us
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, x: 45 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.65, delay: 0.1, ease: defaultMotionEase }}
            >
              We’re able to offset expensive electricity prices because our solar panels produce energy much more efficiently than traditional utilities. You save money. We are lucky enough to work with a wide variety of clients from various businesses and establishments who rate us for quality and efficiency.
            </motion.p>

            <div className="about-ratios-grid">
              <motion.div
                className="about-ratio-card"
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.6, ease: defaultMotionEase }}
              >
                <strong>80%</strong>
                <span>Cost Savings on Energy</span>
              </motion.div>

              <motion.div
                className="about-ratio-card"
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.6, delay: 0.08, ease: defaultMotionEase }}
              >
                <strong>80%</strong>
                <span>Energy Efficiency</span>
              </motion.div>

              <motion.div
                className="about-ratio-card"
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.6, delay: 0.16, ease: defaultMotionEase }}
              >
                <strong>70%</strong>
                <span>Renewable & Environmental</span>
              </motion.div>

              <motion.div
                className="about-ratio-card"
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.6, delay: 0.24, ease: defaultMotionEase }}
              >
                <strong>85%</strong>
                <span>Proven System Efficiency</span>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Happy Customers Section */}
      <section className="client-glimpse section-pad">
        <div className="container">
          <div className="client-glimpse-head">
            <SectionHeading
              eyebrow="Trusted Connections"
              title="Happy Customers"
              copy="Chosen by prestigious institutions, resorts, and businesses across South India."
            />
            <motion.button
              className="text-link"
              onClick={() => navigate('clients')}
              initial={{ opacity: 0, x: 45 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, ease: defaultMotionEase }}
            >
              View happy customers <ArrowRight size={17} />
            </motion.button>
          </div>
          <motion.div
            className={`client-logo-row ${hoveredClient ? 'has-hover' : ''}`}
            onMouseLeave={() => setHoveredClient(null)}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.65, delay: 0.1, ease: defaultMotionEase }}
          >
            {clients
              .filter((client) => client.image && client.name !== 'Holy Cross Academy')
              .slice(0, 5)
              .map((client) => {
                const isHovered = hoveredClient === client.name;
                const isDimmed = hoveredClient !== null && !isHovered;
                return (
                  <button
                    className={`client-logo-card ${isHovered ? 'is-active' : ''} ${isDimmed ? 'is-dimmed' : ''}`}
                    key={client.name}
                    onClick={() => navigate('clients')}
                    onMouseEnter={() => setHoveredClient(client.name)}
                    title={client.name}
                  >
                    <img src={client.image} alt={client.name} />
                    {isHovered && (
                      <span className="client-pill-tooltip">{client.name}</span>
                    )}
                  </button>
                );
              })}
          </motion.div>
        </div>
      </section>

      <Cta navigate={navigate} />
    </>
  );
}
