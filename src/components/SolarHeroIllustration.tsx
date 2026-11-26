import React, { useState } from 'react';
import { Sun, Zap, BatteryCharging, Home as HomeIcon, Sparkles } from 'lucide-react';
import evCarImg from '../assets/ev-miniature-car.png';
import './SolarHeroIllustration.css';

interface SolarHeroIllustrationProps {
  parallax?: { x: number; y: number };
}

export function SolarHeroIllustration({ parallax = { x: 0, y: 0 } }: SolarHeroIllustrationProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [activeMode, setActiveMode] = useState<'day' | 'boost'>('day');

  return (
    <div
      className="solar-hero-wrap"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transform: `perspective(1000px) rotateX(${parallax.y * -6}deg) rotateY(${parallax.x * 6}deg) ${
          isHovered ? 'scale(1.02)' : 'scale(1)'
        }`,
        transition: 'transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)',
      }}
    >
      {/* Top Floating Telemetry Badge */}
      <div className="solar-hud-badge solar-hud-top">
        <span className="hud-dot hud-dot-yellow" />
        <Sun size={14} className="text-amber-500" />
        <span>Sunlight: <strong>1,000 W/m²</strong></span>
        <span className="hud-pill-tag">5.4 kW Inflow</span>
      </div>

      {/* House Lighting Status Badge */}
      <div className="solar-hud-badge solar-hud-bottom">
        <span className="hud-dot" />
        <HomeIcon size={14} className="text-emerald-500" />
        <span>House Powered: <strong>100% Solar Lit</strong></span>
        <span className="hud-pill-tag" style={{ background: '#fef08a', color: '#854d0e' }}>
          Active
        </span>
      </div>

      {/* Battery & EV Status Badge */}
      <div className="solar-hud-badge solar-hud-battery">
        <span className="hud-dot" />
        <BatteryCharging size={14} className="text-emerald-500" />
        <span>Battery: <strong>98% Stored</strong></span>
      </div>

      {/* SVG Isometric Animated Graphic */}
      <svg
        className="solar-hero-svg"
        viewBox="0 0 760 620"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Sunlight generating solar power to illuminate a house"
      >
        <defs>
          {/* Sunlight Core Gradient */}
          <radialGradient id="sunCoreGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="35%" stopColor="#fef08a" />
            <stop offset="70%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#ea580c" />
          </radialGradient>

          {/* Sun Halo Outer Glow */}
          <radialGradient id="sunHaloGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fde047" stopOpacity="0.45" />
            <stop offset="55%" stopColor="#f59e0b" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
          </radialGradient>

          {/* Sunlight Beam Gradient directly pointing from Sun to Solar Panels */}
          <linearGradient id="sunbeamGrad" x1="125" y1="105" x2="330" y2="205" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
            <stop offset="25%" stopColor="#fef08a" stopOpacity="0.55" />
            <stop offset="65%" stopColor="#fbbf24" stopOpacity="0.32" />
            <stop offset="95%" stopColor="#f59e0b" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.02" />
          </linearGradient>

          {/* Solar Panel Dark Blue Photovoltaic Cells */}
          <linearGradient id="panelCellGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0a2540" />
            <stop offset="45%" stopColor="#0369a1" />
            <stop offset="85%" stopColor="#0c4a6e" />
            <stop offset="100%" stopColor="#082f49" />
          </linearGradient>

          {/* Panel Glint / Reflection Highlight */}
          <linearGradient id="panelGlintGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>

          {/* House Left Facade (Light Sunlight Side) */}
          <linearGradient id="facadeLeftGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f8fafc" />
            <stop offset="100%" stopColor="#e2e8f0" />
          </linearGradient>

          {/* House Right Facade (Isometric Shaded Side) */}
          <linearGradient id="facadeRightGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#cbd5e1" />
            <stop offset="100%" stopColor="#94a3b8" />
          </linearGradient>

          {/* Eco-Green Architectural Trim (matching reference image) */}
          <linearGradient id="ecoGreenGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#22c55e" />
            <stop offset="50%" stopColor="#16a34a" />
            <stop offset="100%" stopColor="#15803d" />
          </linearGradient>

          {/* Illuminated Window Light Glow (Brilliant Warm Yellow) */}
          <linearGradient id="windowLitGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fffbeb" />
            <stop offset="30%" stopColor="#fef08a" />
            <stop offset="80%" stopColor="#fde047" />
            <stop offset="100%" stopColor="#eab308" />
          </linearGradient>

          {/* Window Radial Bloom Spill */}
          <radialGradient id="windowBloomGrad" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="#fde047" stopOpacity="0.8" />
            <stop offset="60%" stopColor="#f59e0b" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
          </radialGradient>

          {/* Roof Terrace Floor */}
          <linearGradient id="terraceFloorGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e2e8f0" />
            <stop offset="100%" stopColor="#cbd5e1" />
          </linearGradient>

          {/* Ground Platform Base */}
          <linearGradient id="groundGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f1f5f9" />
            <stop offset="60%" stopColor="#e2e8f0" />
            <stop offset="100%" stopColor="#cbd5e1" />
          </linearGradient>

          {/* Ground Platform Soft Shadow */}
          <radialGradient id="groundShadow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0369a1" stopOpacity="0.18" />
            <stop offset="60%" stopColor="#0369a1" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#0369a1" stopOpacity="0" />
          </radialGradient>

          {/* EV Car Body Metallic Green */}
          <linearGradient id="evCarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4ade80" />
            <stop offset="50%" stopColor="#22c55e" />
            <stop offset="100%" stopColor="#15803d" />
          </linearGradient>

          {/* EV Metallic Body Gradient */}
          <linearGradient id="evBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#34d399" />
            <stop offset="35%" stopColor="#10b981" />
            <stop offset="80%" stopColor="#059669" />
            <stop offset="100%" stopColor="#064e3b" />
          </linearGradient>

          {/* EV Metallic Hood Gradient */}
          <linearGradient id="evHoodGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6ee7b7" />
            <stop offset="50%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#047857" />
          </linearGradient>

          {/* EV Front Bumper Gradient */}
          <linearGradient id="evFrontGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#059669" />
            <stop offset="100%" stopColor="#064e3b" />
          </linearGradient>

          {/* EV Panoramic Tinted Glass Gradient */}
          <linearGradient id="evGlassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0284c7" />
            <stop offset="50%" stopColor="#0369a1" />
            <stop offset="100%" stopColor="#082f49" />
          </linearGradient>

          {/* Headlight Ambient Beam Gradient */}
          <linearGradient id="headlightBeamGrad" x1="580" y1="432" x2="530" y2="465" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#fef08a" stopOpacity="0.7" />
            <stop offset="60%" stopColor="#38bdf8" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
          </linearGradient>

          {/* Glow Filters */}
          <filter id="glowYellow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="glowSun" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="glowGreen" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ==================================================================
            1. GROUND PLATFORM & AMBIENT SHADOWS
            ================================================================== */}
        <g id="ground-platform">
          {/* Ground Soft Drop Shadow */}
          <ellipse cx="400" cy="530" rx="320" ry="85" fill="url(#groundShadow)" />

          {/* Modern Isometric Base Slab */}
          {/* Top surface */}
          <path
            d="M 120 460 L 380 575 L 700 440 L 440 330 Z"
            fill="url(#groundGrad)"
            stroke="#cbd5e1"
            strokeWidth="1.5"
          />
          {/* Front-left edge */}
          <path
            d="M 120 460 L 120 478 L 380 593 L 380 575 Z"
            fill="#cbd5e1"
          />
          {/* Front-right edge */}
          <path
            d="M 380 575 L 380 593 L 700 458 L 700 440 Z"
            fill="#94a3b8"
          />

          {/* EV Parking Pad (Right side driveway) */}
          <path
            d="M 470 425 L 675 345 L 725 385 L 525 470 Z"
            fill="#e2e8f0"
            stroke="#94a3b8"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
          {/* Driveway lane line */}
          <line x1="495" y1="448" x2="695" y2="365" stroke="#ffffff" strokeWidth="2.5" strokeDasharray="14 10" />
        </g>

        {/* ==================================================================
            2. THE HOUSE ARCHITECTURE (3 FLOORS, MODERN ROOF TERRACE)
            ================================================================== */}
        <g id="house-building">
          {/* Main House Drop Shadow on Ground */}
          <polygon
            points="350,520 230,465 310,430 480,450 480,480"
            fill="#0f172a"
            fillOpacity="0.08"
          />

          {/* Left Wall (Isometric Facing Left-Down) */}
          <polygon
            points="245,230 350,285 350,520 245,465"
            fill="url(#facadeLeftGrad)"
            stroke="#cbd5e1"
            strokeWidth="1.2"
          />

          {/* Right Wall (Isometric Facing Right-Down, Shaded) */}
          <polygon
            points="350,285 465,230 465,465 350,520"
            fill="url(#facadeRightGrad)"
            stroke="#94a3b8"
            strokeWidth="1.2"
          />

          {/* Eco-Green Architectural Feature Panels (Like reference image) */}
          {/* Left side green accent column */}
          <polygon
            points="255,250 270,258 270,470 255,462"
            fill="url(#ecoGreenGrad)"
          />
          {/* Front corner green accent line */}
          <polygon
            points="342,285 350,289 350,520 342,516"
            fill="url(#ecoGreenGrad)"
          />
          {/* Right side green accent column */}
          <polygon
            points="445,245 458,239 458,460 445,454"
            fill="url(#ecoGreenGrad)"
          />

          {/* Architectural Floor Separation Lines (Floors 1, 2, 3) */}
          <line x1="245" y1="310" x2="350" y2="365" stroke="#94a3b8" strokeWidth="2" />
          <line x1="350" y1="365" x2="465" y2="310" stroke="#64748b" strokeWidth="2" />

          <line x1="245" y1="388" x2="350" y2="442" stroke="#94a3b8" strokeWidth="2" />
          <line x1="350" y1="442" x2="465" y2="388" stroke="#64748b" strokeWidth="2" />

          {/* Roof Terrace Slab & Parapet */}
          {/* Outer Parapet Top Rim */}
          <polygon
            points="350,170 235,225 350,285 465,225"
            fill="#e2e8f0"
            stroke="#cbd5e1"
            strokeWidth="1.5"
          />
          {/* Inner Terrace Floor Surface (Recessed) */}
          <polygon
            points="350,180 248,228 350,277 452,228"
            fill="url(#terraceFloorGrad)"
            stroke="#94a3b8"
            strokeWidth="1"
          />
          {/* Parapet inner depth shadows */}
          <polygon points="248,228 350,277 350,285 235,225" fill="#94a3b8" opacity="0.6" />
          <polygon points="350,277 452,228 465,225 350,285" fill="#64748b" opacity="0.6" />

          {/* ================================================================
              3. WINDOWS (DYNAMICALLY LIGHTING UP IN LOCKSTEP WITH SUN EXPANSION)
              ================================================================ */}
          <g id="house-windows">
            {/* --- FLOOR 3 (TOP FLOOR) WINDOWS --- */}
            {/* Top Floor Left Window */}
            <g>
              {/* Warm light halo blooming outward when sun is big */}
              <ellipse cx="295" cy="285" rx="28" ry="22" fill="url(#windowBloomGrad)" className="ambient-light-spill" />
              {/* Window Frame Slate */}
              <polygon points="280,265 315,283 315,302 280,284" fill="#1e293b" />
              {/* Dark Unlit Glass Base (Visible when sun shrinks / lights turn off) */}
              <polygon points="282,267 313,283 313,300 282,284" fill="#0f172a" stroke="#334155" strokeWidth="0.8" />
              {/* Glowing Warm Solar Glass (Lights ON when sun expands) */}
              <polygon points="282,267 313,283 313,300 282,284" fill="url(#windowLitGrad)" className="window-light-pane" />
              {/* Window Mullion Cross */}
              <line x1="297" y1="275" x2="297" y2="292" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.85" />
              <line x1="282" y1="275" x2="313" y2="291" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.85" />
            </g>

            {/* Top Floor Right Window (Pair) */}
            <g>
              <ellipse cx="400" cy="285" rx="32" ry="22" fill="url(#windowBloomGrad)" className="ambient-light-spill" />
              <polygon points="380,283 425,260 425,280 380,303" fill="#1e293b" />
              <polygon points="382,284 423,262 423,278 382,301" fill="#0f172a" stroke="#334155" strokeWidth="0.8" />
              <polygon points="382,284 423,262 423,278 382,301" fill="url(#windowLitGrad)" className="window-light-pane" />
              <line x1="402" y1="273" x2="402" y2="290" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.85" />
              <line x1="382" y1="293" x2="423" y2="270" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.85" />
            </g>

            {/* --- FLOOR 2 (MIDDLE FLOOR) WINDOWS --- */}
            {/* Middle Floor Left Window */}
            <g>
              <ellipse cx="295" cy="360" rx="30" ry="24" fill="url(#windowBloomGrad)" className="ambient-light-spill" />
              <polygon points="280,340 315,358 315,378 280,360" fill="#1e293b" />
              <polygon points="282,342 313,358 313,376 282,360" fill="#0f172a" stroke="#334155" strokeWidth="0.8" />
              <polygon points="282,342 313,358 313,376 282,360" fill="url(#windowLitGrad)" className="window-light-pane" />
              <line x1="297" y1="350" x2="297" y2="368" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.85" />
              <line x1="282" y1="351" x2="313" y2="367" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.85" />
            </g>

            {/* Middle Floor Right Windows */}
            <g>
              <ellipse cx="400" cy="360" rx="32" ry="24" fill="url(#windowBloomGrad)" className="ambient-light-spill" />
              <polygon points="380,358 425,335 425,355 380,378" fill="#1e293b" />
              <polygon points="382,359 423,337 423,353 382,376" fill="#0f172a" stroke="#334155" strokeWidth="0.8" />
              <polygon points="382,359 423,337 423,353 382,376" fill="url(#windowLitGrad)" className="window-light-pane" />
              <line x1="402" y1="348" x2="402" y2="365" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.85" />
              <line x1="382" y1="368" x2="423" y2="345" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.85" />
            </g>

            {/* --- FLOOR 1 (GROUND FLOOR) ENTRANCE & LIGHTS --- */}
            {/* Ground Floor Left: Front Door + Welcoming Light */}
            <g>
              {/* Door Frame */}
              <polygon points="280,435 315,453 315,502 280,484" fill="#334155" />
              {/* Door Unlit Glass Base */}
              <polygon points="283,438 312,453 312,500 283,485" fill="#0f172a" />
              {/* Modern Glass Entrance with Solar Glow (Lights ON with sun) */}
              <polygon points="283,438 312,453 312,500 283,485" fill="url(#windowLitGrad)" className="door-light-pane" />
              {/* Door handle & frame */}
              <line x1="305" y1="465" x2="305" y2="480" stroke="#0f172a" strokeWidth="2" />
              {/* Porch light fixture glowing above door */}
              <circle cx="298" cy="432" r="3.5" fill="#fde047" className="porch-light-bulb" />
            </g>

            {/* Ground Floor Right Windows */}
            <g>
              <ellipse cx="400" cy="435" rx="34" ry="24" fill="url(#windowBloomGrad)" className="ambient-light-spill" />
              <polygon points="380,433 425,410 425,432 380,455" fill="#1e293b" />
              <polygon points="382,434 423,412 423,430 382,453" fill="#0f172a" stroke="#334155" strokeWidth="0.8" />
              <polygon points="382,434 423,412 423,430 382,453" fill="url(#windowLitGrad)" className="window-light-pane" />
              <line x1="402" y1="423" x2="402" y2="442" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.85" />
              <line x1="382" y1="443" x2="423" y2="420" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.85" />
            </g>
          </g>
        </g>

        {/* ==================================================================
            4. ROOFTOP SOLAR POWER PANEL ARRAY (MOUNTED & ANGLED TO SUN)
            ================================================================== */}
        <g id="solar-panel-array">
          {/* Triangular Mounting Racks Struts */}
          <path d="M 285 235 L 285 220 L 305 210" stroke="#64748b" strokeWidth="2.5" />
          <path d="M 335 255 L 335 240 L 355 230" stroke="#64748b" strokeWidth="2.5" />
          <path d="M 380 235 L 380 220 L 400 210" stroke="#64748b" strokeWidth="2.5" />

          {/* ROW 1: Front Primary Solar Panel (Where Sunbeam Directly Lands) */}
          <g id="primary-solar-panel">
            {/* Panel Aluminum Frame */}
            <polygon
              points="270,225 340,190 385,212 315,247"
              fill="#cbd5e1"
              stroke="#94a3b8"
              strokeWidth="1.5"
            />
            {/* Photovoltaic Active Silicon Face */}
            <polygon
              points="273,225 338,192 382,213 317,245"
              fill="url(#panelCellGrad)"
            />
            {/* Solar Cell Grid Lines (Silver Busbars) */}
            <line x1="295" y1="214" x2="361" y2="235" stroke="#38bdf8" strokeWidth="0.8" strokeOpacity="0.7" />
            <line x1="316" y1="203" x2="339" y2="225" stroke="#38bdf8" strokeWidth="0.8" strokeOpacity="0.7" />
            <line x1="305" y1="208" x2="350" y2="230" stroke="#38bdf8" strokeWidth="0.8" strokeOpacity="0.7" />

            {/* Dynamic Glass Shimmer Highlight */}
            <polygon
              points="290,215 320,200 345,212 315,227"
              fill="url(#panelGlintGrad)"
              className="panel-shimmer"
            />
          </g>

          {/* ROW 2: Upper / Back Solar Panel */}
          <g id="secondary-solar-panel">
            <polygon
              points="335,190 405,155 445,175 375,210"
              fill="#cbd5e1"
              stroke="#94a3b8"
              strokeWidth="1.5"
            />
            <polygon
              points="338,190 403,157 442,176 377,208"
              fill="url(#panelCellGrad)"
            />
            <line x1="360" y1="178" x2="422" y2="198" stroke="#38bdf8" strokeWidth="0.8" strokeOpacity="0.7" />
            <line x1="372" y1="172" x2="395" y2="194" stroke="#38bdf8" strokeWidth="0.8" strokeOpacity="0.7" />
          </g>

          {/* Rooftop Solar Combiner Junction Box */}
          <polygon points="315,248 328,242 328,252 315,258" fill="#0284c7" />
        </g>

        {/* ==================================================================
            5. THE SUN (VIBRANT GLOWING SOURCE IN TOP-LEFT)
            ================================================================== */}
        <g id="sun-entity">
          {/* Broad Atmospheric Sun Glow Halo */}
          <circle cx="125" cy="105" r="95" fill="url(#sunHaloGrad)" />
          <circle cx="125" cy="105" r="70" fill="url(#sunHaloGrad)" className="sun-core-pulse" />

          {/* Rotating Corona Rays / Flares (Slow 360 Spin) */}
          <g className="sun-corona-spin">
            {/* 16 Stylized Solar Flare Spikes */}
            {[0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5, 180, 202.5, 225, 247.5, 270, 292.5, 315, 337.5].map(
              (angle, idx) => {
                const rad = (angle * Math.PI) / 180;
                const innerR = 40;
                const outerR = idx % 2 === 0 ? 64 : 52;
                const x1 = 125 + innerR * Math.cos(rad);
                const y1 = 105 + innerR * Math.sin(rad);
                const x2 = 125 + outerR * Math.cos(rad);
                const y2 = 105 + outerR * Math.sin(rad);
                return (
                  <line
                    key={angle}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="#f59e0b"
                    strokeWidth={idx % 2 === 0 ? 3.5 : 2}
                    strokeLinecap="round"
                    className="sun-ray-pulse"
                  />
                );
              }
            )}
          </g>

          {/* Mid Solar Flare Corona */}
          <circle cx="125" cy="105" r="44" fill="#fbbf24" fillOpacity="0.35" className="sun-core-pulse" />

          {/* Radiant Sun Core Disc */}
          <circle
            cx="125"
            cy="105"
            r="35"
            fill="url(#sunCoreGrad)"
            filter="url(#glowSun)"
            className="sun-core-pulse"
          />

          {/* Glowing Center Specular Highlight */}
          <circle cx="118" cy="98" r="10" fill="#ffffff" fillOpacity="0.75" />
        </g>

        {/* ==================================================================
            6. SUNLIGHT BEAM FALLING DIRECTLY ONTO SOLAR PANEL
            ================================================================== */}
        <g id="sunlight-projection">
          {/* Broad Luminous Sunbeam Column (Direct line of sight to solar panel) */}
          <polygon
            points="135,115 155,100 375,195 285,240"
            fill="url(#sunbeamGrad)"
            className="sunbeam-shaft"
          />

          {/* High-Intensity Photon Stream Lines Traveling Down Directly into Panel */}
          {/* Main central beam */}
          <line
            x1="135"
            y1="115"
            x2="325"
            y2="215"
            stroke="#ffffff"
            strokeWidth="3"
            strokeLinecap="round"
            className="photon-beam-line"
            filter="url(#glowYellow)"
          />
          {/* Upper beam streak */}
          <line
            x1="145"
            y1="108"
            x2="350"
            y2="198"
            stroke="#fef08a"
            strokeWidth="2.5"
            strokeLinecap="round"
            className="photon-beam-line-fast"
            filter="url(#glowYellow)"
          />
          {/* Lower beam streak */}
          <line
            x1="128"
            y1="122"
            x2="300"
            y2="230"
            stroke="#fde047"
            strokeWidth="2"
            strokeLinecap="round"
            className="photon-beam-line-slow"
          />

          {/* Animated Photon Particles Floating Down the Sunbeam */}
          <circle cx="180" cy="140" r="3.5" fill="#ffffff" className="photon-beam-line">
            <animate attributeName="cx" values="140;320" dur="1.4s" repeatCount="indefinite" />
            <animate attributeName="cy" values="115;210" dur="1.4s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.2;1;0.2" dur="1.4s" repeatCount="indefinite" />
          </circle>
          <circle cx="210" cy="155" r="4.5" fill="#fef08a" filter="url(#glowYellow)">
            <animate attributeName="cx" values="150;340" dur="1.7s" begin="0.5s" repeatCount="indefinite" />
            <animate attributeName="cy" values="110;205" dur="1.7s" begin="0.5s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.1;1;0.1" dur="1.7s" begin="0.5s" repeatCount="indefinite" />
          </circle>
          <circle cx="240" cy="170" r="3" fill="#ffffff">
            <animate attributeName="cx" values="135;310" dur="1.2s" begin="0.8s" repeatCount="indefinite" />
            <animate attributeName="cy" values="120;220" dur="1.2s" begin="0.8s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.3;1;0.1" dur="1.2s" begin="0.8s" repeatCount="indefinite" />
          </circle>
        </g>

        {/* ==================================================================
            7. PHOTOVOLTAIC ENERGY GENERATION HOTSPOT (EXCITATION SPARK)
            ================================================================== */}
        <g id="solar-impact-hotspot" transform="translate(5, 5)">
          {/* Pulsing Concentric Energy Waves on the Panel */}
          <circle
            cx="320"
            cy="205"
            r="16"
            fill="none"
            stroke="#fde047"
            strokeWidth="2.5"
            className="solar-spark-ring"
            filter="url(#glowYellow)"
          />
          <circle
            cx="320"
            cy="205"
            r="16"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="2"
            className="solar-spark-ring-delayed"
            filter="url(#glowYellow)"
          />

          {/* Golden Solar Energy Core Sparkle */}
          <g className="solar-spark-core">
            <circle cx="320" cy="205" r="9" fill="#ffffff" filter="url(#glowYellow)" />
            <circle cx="320" cy="205" r="6" fill="#facc15" />
            {/* 4-point energy star */}
            <path
              d="M 320 193 Q 320 205 308 205 Q 320 205 320 217 Q 320 205 332 205 Q 320 205 320 193 Z"
              fill="#ffffff"
            />
          </g>
        </g>

        {/* ==================================================================
            8. ENERGY CONDUIT WIRES & FLOWING ELECTRICITY
            ================================================================== */}
        <g id="energy-conduit-system">
          {/* --- ROUTE 1: FROM SOLAR PANEL DOWN THE HOUSE TO INVERTER --- */}
          {/* Base conduit wire (dark slate casing) */}
          <path
            d="M 324 250 L 350 263 L 350 495 L 245 495"
            fill="none"
            stroke="#334155"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* High-speed glowing green/cyan electricity pulse flowing down */}
          <path
            d="M 324 250 L 350 263 L 350 495 L 245 495"
            fill="none"
            stroke="#10b981"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="conduit-flow-green"
            filter="url(#glowGreen)"
          />
          {/* Secondary bright gold energy streak */}
          <path
            d="M 324 250 L 350 263 L 350 495 L 245 495"
            fill="none"
            stroke="#fef08a"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="conduit-flow-gold"
          />

          {/* --- ROUTE 2: BRANCHING CONDUITS INTO HOUSE LIGHTS & ROOMS --- */}
          {/* Branch to Top Floor Windows */}
          <path
            d="M 350 320 L 315 302"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="2"
            className="conduit-flow-cyan"
            filter="url(#glowYellow)"
          />
          {/* Branch to Middle Floor Windows */}
          <path
            d="M 350 380 L 315 362"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="2"
            className="conduit-flow-cyan"
            filter="url(#glowYellow)"
          />
          {/* Branch to Right Facade Windows */}
          <path
            d="M 350 340 L 380 320"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="2"
            className="conduit-flow-cyan"
            filter="url(#glowYellow)"
          />

          {/* --- ROUTE 3: CONDUIT FROM INVERTER TO EV CAR & DRIVEWAY --- */}
          <path
            d="M 350 495 L 465 440 L 575 395"
            fill="none"
            stroke="#334155"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M 350 495 L 465 440 L 575 395"
            fill="none"
            stroke="#22c55e"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="conduit-flow-green"
            filter="url(#glowGreen)"
          />

          {/* Coiled Charging Cord from EV Pillar to Car */}
          <path
            d="M 575 405 Q 585 435 605 425"
            fill="none"
            stroke="#10b981"
            strokeWidth="2.5"
            className="conduit-flow-cyan"
          />

          {/* Moving Energy Orbs (Packets traveling in real time) */}
          {/* Orb traveling down house corner */}
          <circle r="4.5" fill="#fde047" className="pulse-orb">
            <animateMotion
              path="M 324 250 L 350 263 L 350 495 L 245 495"
              dur="1.8s"
              repeatCount="indefinite"
            />
          </circle>
          <circle r="3.5" fill="#10b981" className="pulse-orb">
            <animateMotion
              path="M 324 250 L 350 263 L 350 495 L 245 495"
              dur="1.8s"
              begin="0.9s"
              repeatCount="indefinite"
            />
          </circle>

          {/* Orb branching into house window */}
          <circle r="3" fill="#ffffff" filter="url(#glowYellow)">
            <animateMotion
              path="M 350 320 L 315 302"
              dur="1.2s"
              repeatCount="indefinite"
            />
          </circle>
          <circle r="3" fill="#ffffff" filter="url(#glowYellow)">
            <animateMotion
              path="M 350 380 L 315 362"
              dur="1.2s"
              begin="0.4s"
              repeatCount="indefinite"
            />
          </circle>

          {/* Orb branching to EV car */}
          <circle r="4" fill="#34d399" className="pulse-orb">
            <animateMotion
              path="M 350 495 L 465 440 L 575 395 Q 585 435 605 425"
              dur="2.2s"
              repeatCount="indefinite"
            />
          </circle>
        </g>

        {/* ==================================================================
            9. SOLAR HYBRID INVERTER & BATTERY STORAGE (GROUND LEFT)
            ================================================================== */}
        <g id="inverter-unit">
          {/* Cabinet Base Shadow */}
          <polygon points="190,515 245,535 255,525 200,505" fill="#0f172a" opacity="0.12" />

          {/* Inverter Top Rim */}
          <polygon points="200,470 240,485 255,477 215,462" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" />
          {/* Front Face */}
          <polygon points="200,470 240,485 240,525 200,510" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
          {/* Right Face (Shaded) */}
          <polygon points="240,485 255,477 255,517 240,525" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="1" />

          {/* Digital Screen with Green LED Battery Bars */}
          <rect x="206" y="482" width="28" height="14" rx="2" fill="#0f172a" />

          {/* 4 Animated Battery LED Bars */}
          <rect x="209" y="485" width="4.5" height="8" rx="1" className="battery-bar-1" />
          <rect x="215" y="485" width="4.5" height="8" rx="1" className="battery-bar-2" />
          <rect x="221" y="485" width="4.5" height="8" rx="1" className="battery-bar-3" />
          <rect x="227" y="485" width="4.5" height="8" rx="1" className="battery-bar-4" />

          {/* Energy Bolt Logo on Inverter Front */}
          <circle cx="220" cy="502" r="5" fill="#e0f2fe" />
          <path d="M 220 498 L 217 503 L 220 503 L 219 506 L 223 501 L 220 501 Z" fill="#0284c7" />
        </g>

        {/* ==================================================================
            10. EV CHARGING STATION & REFINED ELECTRIC VEHICLE (DRIVEWAY RIGHT)
            ================================================================== */}
        <g id="ev-charging-system">
          {/* Driveway Parking Bay Guide Markings */}
          <g id="ev-bay-markings">
            {/* White parking bay line */}
            <path
              d="M 520 445 L 675 370"
              stroke="#ffffff"
              strokeWidth="2"
              strokeDasharray="6 6"
              strokeOpacity="0.85"
            />
            {/* EV charging green road emblem */}
            <g transform="translate(620, 460) scale(0.9, 0.45) rotate(-28)">
              <rect x="-14" y="-8" width="28" height="16" rx="4" fill="#0284c7" fillOpacity="0.25" stroke="#38bdf8" strokeWidth="1" />
              <text x="-9" y="4" fill="#38bdf8" fontSize="10" fontWeight="bold">EV</text>
            </g>
          </g>

          {/* Smart EV Charging Station Pedestal */}
          <g id="ev-fast-charger-pedestal">
            {/* Pedestal Concrete Base Pad */}
            <polygon points="536,424 554,414 566,420 548,430" fill="#94a3b8" />
            {/* Pedestal Left Shaded Side */}
            <polygon points="536,370 544,365 544,422 536,427" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="0.8" />
            {/* Pedestal Front Face */}
            <polygon points="544,365 558,357 558,414 544,422" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
            {/* Pedestal Top Bevel */}
            <polygon points="536,370 550,362 558,357 544,365" fill="#0284c7" />

            {/* Smart Digital Screen */}
            <polygon points="546,376 555,371 555,392 546,397" fill="#0f172a" className="ev-charger-screen-glow" />
            {/* Screen Charging Graphic */}
            <path d="M 548 385 L 551 380 L 551 385 L 554 385 L 550 392 L 550 387 Z" fill="#22c55e" />
            <text x="548" y="375" fill="#38bdf8" fontSize="4.5" fontWeight="bold">EV</text>

            {/* Status Indicator LED Ring */}
            <circle cx="551" cy="404" r="3" fill="#22c55e" filter="url(#glowGreen)" />

            {/* Charger Cable Holster */}
            <polygon points="555,402 561,399 561,407 555,410" fill="#334155" />
          </g>

          {/* Real Miniature 3D Electric Vehicle */}
          <g id="electric-car">
            {/* Ambient Ground Contact Shadow */}
            <ellipse cx="640" cy="430" rx="64" ry="16" fill="#0f172a" opacity="0.3" />

            {/* High-Resolution 3D Miniature Model Car */}
            <image
              href={evCarImg}
              x="572"
              y="352"
              width="135"
              height="87"
              preserveAspectRatio="xMidYMid meet"
              className="ev-miniature-model"
            />

            {/* Charging Cable Holster & Connecting Cord */}
            <path
              d="M 551 396 Q 568 412 586 414"
              fill="none"
              stroke="#22c55e"
              strokeWidth="2.4"
              strokeLinecap="round"
              className="ev-cable-glow"
            />
            {/* Glowing Charge Port LED on Fender */}
            <circle cx="586" cy="414" r="2.5" fill="#22c55e" className="ev-port-pulse" />

            {/* Floating EV Battery Indicator (HUD Card Over Car) */}
            <g transform="translate(642, 335)" className="ev-charge-pulse">
              <rect
                x="-34"
                y="-13"
                width="68"
                height="24"
                rx="5"
                fill="rgba(255, 255, 255, 0.98)"
                stroke="#10b981"
                strokeWidth="1.2"
              />
              {/* Mini Battery Shell */}
              <rect x="-28" y="-6" width="22" height="12" rx="2" fill="none" stroke="#0f172a" strokeWidth="1" />
              <rect x="-6" y="-3" width="2" height="6" rx="0.5" fill="#0f172a" />
              {/* Battery Fill Bars (98% full) */}
              <rect x="-26" y="-4" width="4.5" height="8" rx="0.8" fill="#10b981" />
              <rect x="-20.5" y="-4" width="4.5" height="8" rx="0.8" fill="#10b981" />
              <rect x="-15" y="-4" width="4.5" height="8" rx="0.8" fill="#10b981" />
              <rect x="-9.5" y="-4" width="3" height="8" rx="0.8" fill="#10b981" />
              {/* Percentage & Zap icon */}
              <text x="-2" y="3.5" fill="#0f172a" fontSize="8" fontWeight="bold">98%</text>
              <Zap size={11} x={18} y={-8} fill="#10b981" color="#10b981" />
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}
