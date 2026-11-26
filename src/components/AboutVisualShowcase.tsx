import React, { useState, useEffect } from 'react';
import {
  Sun,
  ShieldCheck,
  Zap,
  Building,
  Home as HomeIcon,
  CheckCircle2,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import './AboutVisualShowcase.css';

interface AboutVisualShowcaseProps {
  parallaxTilt?: { x: number; y: number };
}

const showcaseSlides = [
  {
    id: 'commercial',
    tabLabel: 'Commercial Solar',
    icon: Building,
    image: '/solar-power-plant.jpg',
    alt: 'Commercial and industrial solar power plant installation by Sumathi Agencies',
    eyebrow: 'Commercial & Domestic Specialists',
    title: 'Industrial & Commercial Solar Plants',
    highlight: '80% Energy Cost Cut',
    sub: 'Property Appreciation & ROI',
    insetImg: '/gallery/terrace-solar-array.jpg',
    insetLabel: 'Terrace Solar Array',
  },
  {
    id: 'domestic',
    tabLabel: 'Domestic Rooftops',
    icon: HomeIcon,
    image: '/gallery/rooftop-solar-plant.jpg',
    alt: 'Domestic rooftop solar power installation with government subsidies',
    eyebrow: 'Government Subsidies & Tax Benefits',
    title: 'Turnkey Rooftop Solar Systems',
    highlight: 'Govt Subsidy Assistance',
    sub: 'Design to Activation',
    insetImg: '/home-ups-inverter.jpg',
    insetLabel: 'Smart Home Storage',
  },
  {
    id: 'clean-tech',
    tabLabel: 'EV & Clean Energy',
    icon: Zap,
    image: '/gallery/terrace-solar-array.jpg',
    alt: 'Solar energy systems, wind farms, and EV charging ports',
    eyebrow: 'Clean Energy Ecosystem',
    title: 'Solar Energy, Wind & EV Charging Ports',
    highlight: '100% Green Ecosystem',
    sub: 'Advanced Installation & Care',
    insetImg: '/solar-street-light.jpg',
    insetLabel: 'Solar Lighting & Ports',
  },
];

export function AboutVisualShowcase({ parallaxTilt = { x: 0, y: 0 } }: AboutVisualShowcaseProps) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-play cycling every 4.6 seconds
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % showcaseSlides.length);
    }, 4600);
    return () => clearInterval(interval);
  }, [isHovered]);

  const current = showcaseSlides[activeSlide];

  return (
    <div
      className="about-showcase-wrap"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transform: `perspective(900px) rotateX(${parallaxTilt.y * -4}deg) rotateY(${parallaxTilt.x * 4}deg)`,
      }}
    >
      <div className="about-showcase-canvas">
        {/* Story Tabs Bar at Top */}
        <div className="about-tabs-bar">
          {showcaseSlides.map((slide, index) => {
            const Icon = slide.icon;
            const isActive = activeSlide === index;
            return (
              <button
                key={slide.id}
                type="button"
                className={`about-tab-btn ${isActive ? 'active' : ''}`}
                onClick={() => setActiveSlide(index)}
              >
                <Icon size={13} />
                <span>{slide.tabLabel}</span>
                {isActive && !isHovered && (
                  <span
                    className="about-tab-progress"
                    style={{
                      width: '100%',
                      animation: 'progressFill 4.6s linear infinite',
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* 15+ Years Proven Excellence Floating Badge */}
        <div className="about-stat-badge">
          <div className="about-stat-number">15+</div>
          <div className="about-stat-copy">
            <strong>Years Experience</strong>
            <span>South India's Solar Pioneer</span>
          </div>
          <Sparkles size={16} className="text-amber-500 animate-pulse" />
        </div>

        {/* Slides Layers */}
        {showcaseSlides.map((slide, index) => {
          const isActive = activeSlide === index;
          return (
            <div
              key={slide.id}
              className={`about-slide-layer ${isActive ? 'active' : ''}`}
            >
              <img
                src={slide.image}
                alt={slide.alt}
                className="about-slide-img"
                loading="lazy"
              />
              <div className="about-slide-vignette" />
              {isActive && <div className="about-solar-glint" />}
            </div>
          );
        })}

        {/* Overlapping Inset Picture-in-Picture Companion Card */}
        <div className="about-inset-card" title={current.insetLabel}>
          <img src={current.insetImg} alt={current.insetLabel} />
          <div className="about-inset-pill">
            <span className="inset-pulse-dot" />
            <span>{current.insetLabel}</span>
          </div>
        </div>

        {/* Slide Bottom Caption & Content */}
        <div className="about-slide-caption">
          <div className="about-caption-eyebrow">
            <CheckCircle2 size={12} className="text-emerald-300" />
            <span>{current.eyebrow}</span>
          </div>

          <h3 className="about-caption-title">{current.title}</h3>

          <div className="about-caption-meta">
            <span className="about-meta-pill">
              <TrendingUp size={13} className="text-amber-400" />
              <span>{current.highlight}</span>
            </span>

            <div className="about-process-stepper">
              <span className="step-highlight">Design</span>
              <span>➔</span>
              <span className="step-highlight">Subsidy</span>
              <span>➔</span>
              <span className="step-highlight">Activation</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
