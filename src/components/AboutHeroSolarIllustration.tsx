import React, { useState } from 'react';
import { Sun, Droplets, Lightbulb, Sparkles, Zap, Navigation } from 'lucide-react';
import './AboutHeroSolarIllustration.css';

interface AboutHeroSolarIllustrationProps {
  parallaxTilt?: { x: number; y: number };
}

export function AboutHeroSolarIllustration({ parallaxTilt = { x: 0, y: 0 } }: AboutHeroSolarIllustrationProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="about-hero-ill-wrap"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transform: `perspective(1000px) rotateX(${parallaxTilt.y * -4}deg) rotateY(${parallaxTilt.x * 4}deg) ${
          isHovered ? 'scale(1.02)' : 'scale(1)'
        }`,
        transition: 'transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)',
      }}
    >
      {/* Top Floating Badge: Dual-Axis Solar Tracker */}
      <div className="about-hero-badge about-hero-badge-top">
        <span className="about-hero-badge-dot" />
        <Navigation size={13} className="text-sky-500" />
        <span>Dual-Axis Tracker: <strong>+35% Energy Yield</strong></span>
      </div>

      {/* Bottom Floating Badge: Solar Pump & Clean Infrastructure */}
      <div className="about-hero-badge about-hero-badge-bottom">
        <span className="about-hero-badge-dot" style={{ background: '#0284c7', boxShadow: '0 0 6px #0284c7' }} />
        <Droplets size={13} className="text-sky-500" />
        <span>Solar Pumping: <strong>100% Clean Water Flow</strong></span>
      </div>

      <svg
        className="about-hero-ill-svg"
        viewBox="0 0 680 540"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Solar tracking array, agricultural pump system, and solar street lighting"
      >
        <defs>
          {/* Base Ground Gradient */}
          <linearGradient id="heroGroundGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f8fafc" />
            <stop offset="60%" stopColor="#e2e8f0" />
            <stop offset="100%" stopColor="#cbd5e1" />
          </linearGradient>

          {/* Ground Shadow */}
          <radialGradient id="heroGroundShadow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0284c7" stopOpacity="0.16" />
            <stop offset="60%" stopColor="#0284c7" stopOpacity="0.04" />
            <stop offset="100%" stopColor="#0284c7" stopOpacity="0" />
          </radialGradient>

          {/* Deep Navy/Blue Solar Cells */}
          <linearGradient id="trackerPanelGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#082f49" />
            <stop offset="45%" stopColor="#0284c7" />
            <stop offset="85%" stopColor="#0369a1" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>

          {/* Pure Blue Water Gradient */}
          <linearGradient id="waterGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="50%" stopColor="#0284c7" />
            <stop offset="100%" stopColor="#0369a1" />
          </linearGradient>

          {/* Solar Street Light Cone */}
          <linearGradient id="lightConeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" stopOpacity="0.75" />
            <stop offset="60%" stopColor="#fde047" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#fde047" stopOpacity="0" />
          </linearGradient>

          {/* Shimmer Glint */}
          <linearGradient id="trackerGlint" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>

          {/* Glow Filters */}
          <filter id="heroIllGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ==================================================================
            1. GROUND PLATFORM & ENVIRONMENT
            ================================================================== */}
        <g id="ground-platform">
          <ellipse cx="340" cy="450" rx="300" ry="75" fill="url(#heroGroundShadow)" />

          <path
            d="M 90 370 L 330 480 L 610 360 L 370 250 Z"
            fill="url(#heroGroundGrad)"
            stroke="#cbd5e1"
            strokeWidth="1.5"
          />
          {/* Slab rim */}
          <path d="M 90 370 L 90 386 L 330 496 L 330 480 Z" fill="#cbd5e1" />
          <path d="M 330 480 L 330 496 L 610 376 L 610 360 Z" fill="#94a3b8" />

          {/* Green agricultural lawn patch on the left */}
          <polygon points="110,365 200,405 170,420 85,380" fill="#86efac" opacity="0.65" />
        </g>

        {/* ==================================================================
            2. DUAL-AXIS SOLAR TRACKING ARRAY (CENTER/LEFT)
            ================================================================== */}
        <g id="dual-axis-tracker">
          {/* Ground Mounting Pedestal Base */}
          <polygon points="230,370 280,390 300,380 250,360" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1" />
          {/* Reinforced Support Column */}
          <polygon points="260,250 270,250 275,375 255,375" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1.2" />
          {/* Hydraulic Tracking Piston Actuator */}
          <line x1="285" y1="350" x2="270" y2="280" stroke="#0284c7" strokeWidth="3" strokeLinecap="round" />

          {/* Tilting Solar Panel Array (Follows the Sun) */}
          <g className="tracker-array-tilt">
            {/* Structural Rack Frame */}
            <polygon
              points="160,225 295,160 380,200 245,265"
              fill="#94a3b8"
              stroke="#64748b"
              strokeWidth="1.5"
            />
            {/* Photovoltaic Active Cell Matrix */}
            <polygon
              points="164,225 293,163 376,201 247,263"
              fill="url(#trackerPanelGrad)"
            />
            {/* Precision Grid Busbars */}
            <line x1="195" y1="210" x2="315" y2="173" stroke="#38bdf8" strokeWidth="0.8" strokeOpacity="0.8" />
            <line x1="225" y1="245" x2="345" y2="208" stroke="#38bdf8" strokeWidth="0.8" strokeOpacity="0.8" />
            <line x1="230" y1="195" x2="310" y2="232" stroke="#38bdf8" strokeWidth="0.8" strokeOpacity="0.8" />
            <line x1="210" y1="205" x2="290" y2="242" stroke="#38bdf8" strokeWidth="0.8" strokeOpacity="0.8" />

            {/* Shimmer Glint */}
            <polygon
              points="200,215 240,195 270,210 230,230"
              fill="url(#trackerGlint)"
              style={{ animation: 'commercialGlint 4s ease-in-out infinite' }}
            />
          </g>

          {/* Tracker Solar Excitation Sparkle */}
          <circle cx="280" cy="210" r="14" fill="none" stroke="#fde047" strokeWidth="1.8" filter="url(#heroIllGlow)" />
          <path
            d="M 280 200 Q 280 210 270 210 Q 280 210 280 220 Q 280 210 290 210 Q 280 210 280 200 Z"
            fill="#ffffff"
          />
        </g>

        {/* ==================================================================
            3. SOLAR AGRICULTURAL WATER PUMP & FLOWING CISTERN (LEFT)
            ================================================================== */}
        <g id="solar-water-pump">
          {/* Pump Controller Box on Pedestal */}
          <polygon points="140,360 170,375 170,410 140,395" fill="#ffffff" stroke="#0284c7" strokeWidth="1.2" />
          <polygon points="170,375 185,368 185,403 170,410" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1" />
          <circle cx="155" cy="380" r="3" fill="#10b981" filter="url(#heroIllGlow)" />

          {/* Water Pipe Arching Out */}
          <path
            d="M 175 390 Q 210 360 215 410"
            fill="none"
            stroke="#94a3b8"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Water Reservoir / Basin */}
          <ellipse cx="225" cy="425" rx="36" ry="16" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1" />
          <ellipse cx="225" cy="423" rx="33" ry="14" fill="url(#waterGrad)" />

          {/* Animated Water Stream pouring into basin */}
          <path
            d="M 215 408 Q 218 420 222 425"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2.5"
            strokeLinecap="round"
            className="water-stream-flow"
          />

          {/* Animated Water Droplets & Ripples */}
          <circle cx="222" cy="420" r="2.5" fill="#e0f2fe" className="water-droplet" />
          <circle cx="228" cy="422" r="2" fill="#e0f2fe" className="water-droplet" style={{ animationDelay: '0.6s' }} />
          <ellipse cx="225" cy="423" rx="14" ry="5" fill="none" stroke="#bae6fd" strokeWidth="1" opacity="0.7" />
        </g>

        {/* ==================================================================
            4. SOLAR STREET LIGHT SYSTEM (RIGHT)
            ================================================================== */}
        <g id="solar-street-light">
          {/* Street Light Base Anchor */}
          <polygon points="480,360 500,370 515,362 495,352" fill="#94a3b8" />

          {/* Graceful Curved Light Pole */}
          <path
            d="M 495 360 L 495 190 Q 495 150 460 160"
            fill="none"
            stroke="#64748b"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Mini Rooftop Solar Panel on Top of Pole */}
          <polygon
            points="465,152 490,140 505,148 480,160"
            fill="url(#trackerPanelGrad)"
            stroke="#cbd5e1"
            strokeWidth="0.8"
          />

          {/* Downward LED Luminaire Head */}
          <polygon points="455,160 468,162 465,168 452,166" fill="#1e293b" />
          <circle cx="460" cy="166" r="3" fill="#fde047" filter="url(#heroIllGlow)" />

          {/* Illuminated Downward Light Cone */}
          <polygon
            points="460,166 425,360 515,360"
            fill="url(#lightConeGrad)"
            className="street-light-beam"
          />
          {/* Ground Warm Light Puddle */}
          <ellipse cx="470" cy="360" rx="45" ry="15" fill="#fde047" fillOpacity="0.25" />
        </g>

        {/* ==================================================================
            5. CONNECTING POWER CONDUITS & ENERGY ORBS
            ================================================================== */}
        <g id="conduit-network">
          {/* From Tracker to Water Pump */}
          <path
            d="M 260 375 L 210 395 L 170 395"
            fill="none"
            stroke="#0284c7"
            strokeWidth="2"
            strokeLinecap="round"
            className="tracker-conduit-flow"
          />
          {/* From Tracker to Street Light */}
          <path
            d="M 270 375 L 360 415 L 495 360"
            fill="none"
            stroke="#10b981"
            strokeWidth="2"
            strokeLinecap="round"
            className="tracker-conduit-flow"
          />

          {/* Moving Energy Orbs */}
          <circle r="3.5" fill="#38bdf8" filter="url(#heroIllGlow)">
            <animateMotion
              path="M 260 375 L 210 395 L 170 395"
              dur="1.4s"
              repeatCount="indefinite"
            />
          </circle>
          <circle r="3.5" fill="#facc15" filter="url(#heroIllGlow)">
            <animateMotion
              path="M 270 375 L 360 415 L 495 360"
              dur="1.8s"
              repeatCount="indefinite"
            />
          </circle>
        </g>
      </svg>
    </div>
  );
}
