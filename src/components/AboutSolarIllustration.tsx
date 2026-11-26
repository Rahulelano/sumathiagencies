import React, { useState } from 'react';
import {
  Sun,
  Zap,
  Building2,
  TrendingUp,
  ShieldCheck,
  Wind,
  Sparkles,
  ArrowUpRight,
  BatteryCharging,
} from 'lucide-react';
import evCarImg from '../assets/ev-miniature-car.png';
import './AboutSolarIllustration.css';

interface AboutSolarIllustrationProps {
  parallaxTilt?: { x: number; y: number };
}

export function AboutSolarIllustration({ parallaxTilt = { x: 0, y: 0 } }: AboutSolarIllustrationProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="about-solar-wrap"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transform: `perspective(1000px) rotateX(${parallaxTilt.y * -5}deg) rotateY(${parallaxTilt.x * 5}deg) ${
          isHovered ? 'scale(1.02)' : 'scale(1)'
        }`,
        transition: 'transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)',
      }}
    >
      {/* Top Left: 15+ Years Proven Experience Badge (Matching Image 3) */}
      <div className="about-hud-badge about-hud-top-left">
        <span className="about-hud-dot about-hud-dot-yellow" />
        <Sparkles size={14} className="text-amber-500" />
        <span><strong>15+ Years</strong> Experience</span>
        <span className="about-hud-pill-tag">South India's Solar Pioneer</span>
      </div>

      {/* Top Right: Wind & Solar Hybrid System Badge */}
      <div className="about-hud-badge about-hud-top-right">
        <span className="about-hud-dot" />
        <Wind size={14} className="text-emerald-500" />
        <span>Hybrid: <strong>Wind & Solar Farm</strong></span>
        <span className="about-hud-pill-tag about-hud-pill-emerald">Microgrid</span>
      </div>

      {/* Bottom Left: Commercial & Industrial Solar Plants - 80% Energy Cost Cut (Matching Image 3) */}
      <div className="about-hud-badge about-hud-bottom-left">
        <span className="about-hud-dot" />
        <Building2 size={14} className="text-emerald-500" />
        <span>Commercial Solar: <strong>80% Energy Cost Cut</strong></span>
        <span className="about-hud-pill-tag">Govt Subsidies</span>
      </div>

      {/* Bottom Right: Net-Metering Grid Export & EV Charging (Matching Image 3) */}
      <div className="about-hud-badge about-hud-bottom-right">
        <span className="about-hud-dot" />
        <TrendingUp size={14} className="text-sky-500" />
        <span>Net-Metering & EV: <strong>+58 kW Grid Revenue</strong></span>
        <ArrowUpRight size={13} className="text-emerald-500" />
      </div>

      {/* SVG Canvas */}
      <svg
        className="about-solar-svg"
        viewBox="0 0 760 620"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Sunlight falling onto commercial solar plant, wind farm, EV charging station, and smart grid"
      >
        <defs>
          {/* Base Ground Foundation Gradient */}
          <linearGradient id="aboutGroundGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f8fafc" />
            <stop offset="60%" stopColor="#e2e8f0" />
            <stop offset="100%" stopColor="#cbd5e1" />
          </linearGradient>

          {/* Soft Ground Ambient Shadow */}
          <radialGradient id="aboutGroundShadow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0369a1" stopOpacity="0.18" />
            <stop offset="60%" stopColor="#0369a1" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#0369a1" stopOpacity="0" />
          </radialGradient>

          {/* Sun Core Gradient */}
          <radialGradient id="aboutSunCoreGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="35%" stopColor="#fef08a" />
            <stop offset="70%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#ea580c" />
          </radialGradient>

          {/* Sun Halo Outer Glow */}
          <radialGradient id="aboutSunHaloGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fde047" stopOpacity="0.5" />
            <stop offset="55%" stopColor="#f59e0b" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
          </radialGradient>

          {/* Sunlight Beam Streaming from Sun to Commercial Rooftop Panels */}
          <linearGradient id="aboutSunbeamGrad" x1="110" y1="85" x2="280" y2="280" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
            <stop offset="30%" stopColor="#fef08a" stopOpacity="0.55" />
            <stop offset="70%" stopColor="#fbbf24" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.02" />
          </linearGradient>

          {/* Sunlight Beam Streaming from Sun to Ground Solar Array */}
          <linearGradient id="aboutSunbeamGroundGrad" x1="110" y1="85" x2="180" y2="420" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.75" />
            <stop offset="35%" stopColor="#fef08a" stopOpacity="0.45" />
            <stop offset="75%" stopColor="#fbbf24" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.02" />
          </linearGradient>

          {/* Commercial Facility Wall Gradients (Crisp White + Shading) */}
          <linearGradient id="commWallFront" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#e2e8f0" />
          </linearGradient>

          <linearGradient id="commWallSide" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#cbd5e1" />
            <stop offset="100%" stopColor="#94a3b8" />
          </linearGradient>

          {/* Eco-Green Architectural Feature Trim (Matching Sumathi Branding) */}
          <linearGradient id="commEcoGreenGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#22c55e" />
            <stop offset="50%" stopColor="#16a34a" />
            <stop offset="100%" stopColor="#15803d" />
          </linearGradient>

          {/* Solar Panel Cells High-Efficiency Deep Navy/Blue */}
          <linearGradient id="commPanelGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#071d49" />
            <stop offset="40%" stopColor="#0284c7" />
            <stop offset="85%" stopColor="#0369a1" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>

          {/* Solar Glint Reflection */}
          <linearGradient id="commGlintGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>

          {/* Commercial Facility Windows Clean Energy Glow */}
          <linearGradient id="commWindowGlow" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fffbeb" />
            <stop offset="30%" stopColor="#fef08a" />
            <stop offset="70%" stopColor="#fde047" />
            <stop offset="100%" stopColor="#eab308" />
          </linearGradient>

          {/* Wind Turbine Blades Aerodynamic White/Silver */}
          <linearGradient id="turbineBladeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="60%" stopColor="#e2e8f0" />
            <stop offset="100%" stopColor="#94a3b8" />
          </linearGradient>

          {/* EV Electric Car Body Metallic Eco-Green */}
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

          {/* BESS Battery Container Body */}
          <linearGradient id="bessBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#e2e8f0" />
          </linearGradient>

          {/* Filters for Radiant Energy Glow */}
          <filter id="aboutGlowYellow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="aboutGlowSun" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="aboutGlowGreen" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="aboutGlowCyan" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ==================================================================
            1. BASE PLATFORM & INDUSTRIAL GROUNDS
            ================================================================== */}
        <g id="ground-base">
          {/* Ground Soft Ambient Shadow */}
          <ellipse cx="380" cy="530" rx="340" ry="85" fill="url(#aboutGroundShadow)" />

          {/* Main Isometric Campus Slab */}
          <path
            d="M 100 440 L 370 575 L 710 425 L 440 310 Z"
            fill="url(#aboutGroundGrad)"
            stroke="#cbd5e1"
            strokeWidth="1.5"
          />
          {/* Front Left Slab Rim */}
          <path d="M 100 440 L 100 458 L 370 593 L 370 575 Z" fill="#cbd5e1" />
          {/* Front Right Slab Rim */}
          <path d="M 370 575 L 370 593 L 710 443 L 710 425 Z" fill="#94a3b8" />

          {/* Eco-Green Turf Strip on the left for Ground Solar Array */}
          <polygon points="110,435 240,495 210,515 90,445" fill="#86efac" opacity="0.55" />

          {/* EV Parking Pad & Driveway (Foreground Center-Right) */}
          <path
            d="M 450 455 L 620 375 L 670 415 L 500 495 Z"
            fill="#e2e8f0"
            stroke="#94a3b8"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
          {/* Driveway lane divider line */}
          <line x1="475" y1="475" x2="645" y2="395" stroke="#ffffff" strokeWidth="2.5" strokeDasharray="14 10" />

          {/* Utility access roadway mark */}
          <line x1="370" y1="565" x2="670" y2="425" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="8 6" />
        </g>

        {/* ==================================================================
            2. THE RADIANT SUN (TOP LEFT)
            ================================================================== */}
        <g id="about-sun-system">
          {/* Outer Sun Ambient Halo Glow */}
          <circle cx="110" cy="85" r="75" fill="url(#aboutSunHaloGrad)" className="about-sun-core-pulse" />

          {/* Rotating Sunburst Corona Rays */}
          <g className="about-sun-rays">
            {[0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5, 180, 202.5, 225, 247.5, 270, 292.5, 315, 337.5].map(
              (angle, idx) => {
                const rad = (angle * Math.PI) / 180;
                const rInner = 38;
                const rOuter = idx % 2 === 0 ? 58 : 48;
                const x1 = 110 + rInner * Math.cos(rad);
                const y1 = 85 + rInner * Math.sin(rad);
                const x2 = 110 + rOuter * Math.cos(rad);
                const y2 = 85 + rOuter * Math.sin(rad);
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
                    className="about-sun-ray-pulse"
                  />
                );
              }
            )}
          </g>

          {/* Mid Solar Flare Corona */}
          <circle cx="110" cy="85" r="40" fill="#fbbf24" fillOpacity="0.35" className="about-sun-core-pulse" />

          {/* Radiant Sun Core Disc */}
          <circle
            cx="110"
            cy="85"
            r="32"
            fill="url(#aboutSunCoreGrad)"
            filter="url(#aboutGlowSun)"
            className="about-sun-core-pulse"
          />

          {/* Glowing Center Specular Highlight */}
          <circle cx="103" cy="78" r="9" fill="#ffffff" fillOpacity="0.8" />
        </g>

        {/* ==================================================================
            3. SUNLIGHT BEAMS SHINING DIRECTLY ONTO SOLAR ARRAYS
            ================================================================== */}
        <g id="about-sunlight-beams">
          {/* Main Sunbeam Shaft Streaming to Commercial Rooftop Solar Array */}
          <polygon
            points="120,95 140,80 345,260 250,305"
            fill="url(#aboutSunbeamGrad)"
            className="about-sunbeam-shaft"
          />

          {/* High-speed Photon Beam Lines to Rooftop Array */}
          <line
            x1="120"
            y1="95"
            x2="280"
            y2="280"
            stroke="#ffffff"
            strokeWidth="2.8"
            strokeLinecap="round"
            className="about-photon-beam-fast"
            filter="url(#aboutGlowYellow)"
          />
          <line
            x1="132"
            y1="90"
            x2="310"
            y2="265"
            stroke="#fef08a"
            strokeWidth="2"
            strokeLinecap="round"
            className="about-photon-beam-slow"
          />

          {/* Animated Traveling Photons (Sun to Rooftop Panels) */}
          <circle cx="150" cy="120" r="3.5" fill="#ffffff">
            <animate attributeName="cx" values="120;280" dur="1.4s" repeatCount="indefinite" />
            <animate attributeName="cy" values="95;280" dur="1.4s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.2;1;0.2" dur="1.4s" repeatCount="indefinite" />
          </circle>
          <circle cx="160" cy="130" r="4" fill="#fef08a" filter="url(#aboutGlowYellow)">
            <animate attributeName="cx" values="130;300" dur="1.7s" begin="0.5s" repeatCount="indefinite" />
            <animate attributeName="cy" values="90;270" dur="1.7s" begin="0.5s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.1;1;0.1" dur="1.7s" begin="0.5s" repeatCount="indefinite" />
          </circle>

          {/* Secondary Sunbeam Shaft Streaming to Ground Solar Array */}
          <polygon
            points="115,100 130,90 220,410 140,435"
            fill="url(#aboutSunbeamGroundGrad)"
            className="about-sunbeam-shaft"
            style={{ animationDelay: '0.6s' }}
          />
          <line
            x1="115"
            y1="100"
            x2="180"
            y2="420"
            stroke="#ffffff"
            strokeWidth="2.2"
            strokeLinecap="round"
            className="about-photon-beam-fast"
            filter="url(#aboutGlowYellow)"
          />
        </g>

        {/* ==================================================================
            4. COMMERCIAL SOLAR POWER PLANT & INDUSTRIAL FACILITY (LEFT/CENTER)
            ================================================================== */}
        <g id="commercial-facility">
          {/* Building Ambient Drop Shadow */}
          <polygon points="190,440 380,510 410,480 340,400 170,410" fill="#0f172a" opacity="0.08" />

          {/* Commercial Facility Left Wall (Crisp Modern White) */}
          <polygon
            points="180,295 320,365 320,490 180,425"
            fill="url(#commWallFront)"
            stroke="#cbd5e1"
            strokeWidth="1.2"
          />

          {/* Commercial Facility Right Wall (Shaded Isometric) */}
          <polygon
            points="320,365 420,315 420,440 320,490"
            fill="url(#commWallSide)"
            stroke="#64748b"
            strokeWidth="1.2"
          />

          {/* Eco-Green Architectural Accent Columns & Trim */}
          <polygon points="190,300 202,306 202,434 190,428" fill="url(#commEcoGreenGrad)" />
          <polygon points="314,362 320,365 320,490 314,487" fill="url(#commEcoGreenGrad)" />
          <polygon points="410,320 418,316 418,441 410,445" fill="url(#commEcoGreenGrad)" />

          {/* Architectural Canopy Rim / Parapet */}
          <polygon
            points="320,240 170,300 320,370 430,310"
            fill="#e2e8f0"
            stroke="#cbd5e1"
            strokeWidth="1.2"
          />

          {/* Recessed Commercial Roof Surface */}
          <polygon
            points="320,250 180,302 320,362 418,312"
            fill="#cbd5e1"
            stroke="#94a3b8"
            strokeWidth="1"
          />

          {/* --- COMMERCIAL ROOFTOP SOLAR ARRAYS --- */}
          {/* Row 1: Front Rooftop Commercial Panels */}
          <g id="comm-roof-panels-1">
            <polygon
              points="205,305 285,265 335,290 255,330"
              fill="#94a3b8"
              stroke="#64748b"
              strokeWidth="1.2"
            />
            <polygon
              points="208,305 283,267 332,291 257,328"
              fill="url(#commPanelGrad)"
            />
            {/* Photovoltaic Busbar Grid */}
            <line x1="230" y1="293" x2="305" y2="278" stroke="#38bdf8" strokeWidth="0.8" strokeOpacity="0.8" />
            <line x1="250" y1="283" x2="325" y2="298" stroke="#38bdf8" strokeWidth="0.8" strokeOpacity="0.8" />
            <line x1="243" y1="312" x2="295" y2="273" stroke="#38bdf8" strokeWidth="0.8" strokeOpacity="0.8" />
            {/* Shimmer Glint */}
            <polygon
              points="230,295 265,278 290,290 255,308"
              fill="url(#commGlintGrad)"
              className="commercial-solar-glint"
            />
          </g>

          {/* Row 2: Back Rooftop Commercial Panels */}
          <g id="comm-roof-panels-2">
            <polygon
              points="275,270 350,232 395,255 320,292"
              fill="#94a3b8"
              stroke="#64748b"
              strokeWidth="1.2"
            />
            <polygon
              points="277,270 348,234 392,256 322,290"
              fill="url(#commPanelGrad)"
            />
            <line x1="300" y1="257" x2="370" y2="242" stroke="#38bdf8" strokeWidth="0.8" strokeOpacity="0.8" />
            <line x1="320" y1="247" x2="385" y2="262" stroke="#38bdf8" strokeWidth="0.8" strokeOpacity="0.8" />
          </g>

          {/* Rooftop Solar Hotspot Excitation Rings (Energy Generation) */}
          <circle
            cx="275"
            cy="285"
            r="16"
            fill="none"
            stroke="#fde047"
            strokeWidth="2.5"
            className="commercial-spark-ring"
            filter="url(#aboutGlowYellow)"
          />
          <circle
            cx="275"
            cy="285"
            r="16"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="1.8"
            className="commercial-spark-ring"
            style={{ animationDelay: '0.6s' }}
            filter="url(#aboutGlowYellow)"
          />

          {/* --- GROUND-MOUNT COMMERCIAL SOLAR ARRAYS (Tilted Racks) --- */}
          <g id="ground-solar-array">
            {/* Structural mounting rack legs */}
            <path d="M 135 440 L 135 418 L 175 400" stroke="#64748b" strokeWidth="2.2" />
            <path d="M 185 465 L 185 443 L 225 425" stroke="#64748b" strokeWidth="2.2" />

            {/* Front Ground Panel Array */}
            <polygon
              points="125,425 180,397 230,422 175,450"
              fill="#cbd5e1"
              stroke="#94a3b8"
              strokeWidth="1.2"
            />
            <polygon
              points="127,425 178,399 227,423 177,448"
              fill="url(#commPanelGrad)"
            />
            <line x1="145" y1="415" x2="205" y2="410" stroke="#38bdf8" strokeWidth="0.8" strokeOpacity="0.8" />
            <line x1="160" y1="435" x2="195" y2="417" stroke="#38bdf8" strokeWidth="0.8" strokeOpacity="0.8" />

            {/* Ground Solar Hotspot Spark */}
            <circle
              cx="175"
              cy="420"
              r="12"
              fill="none"
              stroke="#fde047"
              strokeWidth="2"
              className="commercial-spark-ring-ground"
              filter="url(#aboutGlowYellow)"
            />
          </g>

          {/* Commercial Facility Windows & Clean Energy Interior Glow */}
          <g id="facility-windows" className="facility-window-lit">
            {/* Upper floor commercial ribbon window */}
            <polygon points="205,340 305,390 305,410 205,360" fill="#1e293b" />
            <polygon points="207,342 303,390 303,408 207,360" fill="url(#commWindowGlow)" />
            {/* Window mullion dividers */}
            <line x1="235" y1="355" x2="235" y2="375" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.8" />
            <line x1="265" y1="370" x2="265" y2="390" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.8" />

            {/* Ground floor entrance & glass lobby */}
            <polygon points="230,420 290,450 290,480 230,450" fill="#1e293b" />
            <polygon points="232,422 288,450 288,478 232,450" fill="url(#commWindowGlow)" />
            <line x1="260" y1="436" x2="260" y2="465" stroke="#0f172a" strokeWidth="1.5" />
          </g>
        </g>

        {/* ==================================================================
            5. ROTATING WIND TURBINE / WIND FARM (UPPER RIGHT)
            ================================================================== */}
        <g id="wind-turbine-system">
          {/* Atmospheric Wind Breeze Streaks */}
          <path
            d="M 480 120 C 525 110, 610 110, 675 130"
            stroke="#bae6fd"
            strokeWidth="1.8"
            strokeLinecap="round"
            className="wind-breeze"
          />
          <path
            d="M 450 150 C 515 135, 600 140, 685 165"
            stroke="#e0f2fe"
            strokeWidth="2.2"
            strokeLinecap="round"
            className="wind-breeze"
            style={{ animationDelay: '0.8s' }}
          />

          {/* Turbine Tower (Tapered Cylinder) */}
          <polygon
            points="573,140 577,140 581,345 569,345"
            fill="url(#commWallFront)"
            stroke="#94a3b8"
            strokeWidth="1"
          />
          {/* Base foundation pedestal */}
          <polygon points="560,345 590,330 600,337 570,353" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1" />

          {/* Tower Power Conduit (Pulsing Green Down) */}
          <line
            x1="575"
            y1="145"
            x2="575"
            y2="345"
            stroke="#10b981"
            strokeWidth="2.2"
            className="conduit-flow-wind"
            filter="url(#aboutGlowGreen)"
          />

          {/* Turbine Nacelle (Generator Housing) */}
          <ellipse cx="575" cy="140" rx="9" ry="6" fill="#e2e8f0" stroke="#64748b" strokeWidth="1" />

          {/* Rotating Rotor with 3 Aerodynamic Blades */}
          <g className="turbine-rotor">
            {/* Blade 1 (pointing up) */}
            <path
              d="M 575 140 Q 578 90 575 55 Q 571 90 575 140 Z"
              fill="url(#turbineBladeGrad)"
              stroke="#cbd5e1"
              strokeWidth="0.8"
            />
            {/* Blade 2 (pointing down-right 120 deg) */}
            <path
              d="M 575 140 Q 617 165 650 183 Q 610 175 575 140 Z"
              fill="url(#turbineBladeGrad)"
              stroke="#cbd5e1"
              strokeWidth="0.8"
            />
            {/* Blade 3 (pointing down-left 240 deg) */}
            <path
              d="M 575 140 Q 533 165 500 183 Q 540 175 575 140 Z"
              fill="url(#turbineBladeGrad)"
              stroke="#cbd5e1"
              strokeWidth="0.8"
            />
            {/* Rotor Nose Cone */}
            <circle cx="575" cy="140" r="4.5" fill="#0284c7" stroke="#ffffff" strokeWidth="1.2" />
          </g>
        </g>

        {/* ==================================================================
            6. BESS INDUSTRIAL BATTERY STORAGE BANK & CENTRAL INVERTER (CENTER)
            ================================================================== */}
        <g id="bess-storage-inverter">
          {/* BESS Container Drop Shadow */}
          <polygon points="360,450 440,490 460,478 380,438" fill="#0f172a" opacity="0.12" />

          {/* BESS Container Top Rim */}
          <polygon points="380,410 440,440 460,430 400,400" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" />
          {/* Front Face */}
          <polygon points="380,410 440,440 440,480 380,450" fill="url(#bessBodyGrad)" stroke="#cbd5e1" strokeWidth="1" />
          {/* Side Face */}
          <polygon points="440,440 460,430 460,470 440,480" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1" />

          {/* Cooling Vents & Container Ribs */}
          <line x1="390" y1="428" x2="390" y2="445" stroke="#94a3b8" strokeWidth="1.5" />
          <line x1="396" y1="431" x2="396" y2="448" stroke="#94a3b8" strokeWidth="1.5" />

          {/* LED Charge Display Screen */}
          <rect x="408" y="432" width="26" height="13" rx="2" fill="#0f172a" />
          <rect x="410" y="434" width="4.5" height="9" rx="1" className="bess-led-bar-1" />
          <rect x="416" y="434" width="4.5" height="9" rx="1" className="bess-led-bar-2" />
          <rect x="422" y="434" width="4.5" height="9" rx="1" className="bess-led-bar-3" />
          <rect x="428" y="434" width="4.5" height="9" rx="1" className="bess-led-bar-4" />

          {/* Eco Battery Leaf / Zap Symbol */}
          <circle cx="422" cy="460" r="5" fill="#e0f2fe" />
          <path d="M 422 457 L 419 461 L 422 461 L 421 464 L 425 459 L 422 459 Z" fill="#10b981" />
        </g>

        {/* ==================================================================
            7. EV CHARGING PORT & ELECTRIC VEHICLE (FOREGROUND CENTER-RIGHT)
            ================================================================== */}
        <g id="ev-charging-system">
          {/* EV Charging Station Pedestal Post */}
          <g id="ev-charger-pedestal">
            {/* Base Pad */}
            <polygon points="480,445 496,437 504,441 488,449" fill="#94a3b8" stroke="#64748b" strokeWidth="0.8" />
            {/* Charger Column */}
            <polygon points="488,415 498,410 498,442 488,447" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
            <polygon points="498,410 504,413 504,441 498,442" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1" />
            {/* Charger Glowing Screen / LED ring */}
            <circle cx="493" cy="422" r="3.5" fill="#10b981" className="ev-charger-pulse" filter="url(#aboutGlowGreen)" />
            <path d="M 493 420 L 491 423 L 493 423 L 492 425 L 495 422 L 493 422 Z" fill="#ffffff" />
          </g>

          {/* EV Charging Cable connecting Pedestal to Electric Car */}
          <path
            d="M 498 428 Q 512 438 529 432"
            fill="none"
            stroke="#22c55e"
            strokeWidth="2.4"
            strokeLinecap="round"
            className="ev-cable-flow"
          />

          {/* Real Miniature 3D Electric Vehicle */}
          <g id="electric-car">
            {/* Ambient Ground Contact Shadow */}
            <ellipse cx="582" cy="448" rx="64" ry="16" fill="#0f172a" opacity="0.32" />

            {/* High-Resolution 3D Miniature Model Car */}
            <image
              href={evCarImg}
              x="515"
              y="370"
              width="135"
              height="87"
              preserveAspectRatio="xMidYMid meet"
              className="ev-miniature-model"
            />

            {/* Glowing Charge Port LED on Fender */}
            <circle cx="529" cy="432" r="2.5" fill="#22c55e" className="ev-charger-pulse" />

            {/* Floating EV Battery Indicator (HUD Card Over Car) */}
            <g transform="translate(582, 348)">
              <g className="ev-battery-hud">
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
                {/* Battery Fill Bars */}
                <rect x="-26" y="-4" width="4.5" height="8" rx="0.8" fill="#10b981" />
                <rect x="-20.5" y="-4" width="4.5" height="8" rx="0.8" fill="#10b981" />
                <rect x="-15" y="-4" width="4.5" height="8" rx="0.8" fill="#10b981" />
                <rect x="-9.5" y="-4" width="3" height="8" rx="0.8" fill="#10b981" />
                {/* Percentage & Status */}
                <text x="-2" y="3.5" fill="#0f172a" fontSize="7.5" fontWeight="bold">88% EV</text>
              </g>
            </g>
          </g>
        </g>

        {/* ==================================================================
            8. SMART POWER GRID & NET-METERING SUBSTATION (FAR RIGHT)
            ================================================================== */}
        <g id="smart-grid-substation">
          {/* Utility Transformer Base Pad */}
          <polygon points="610,375 670,405 690,395 630,365" fill="#94a3b8" stroke="#64748b" strokeWidth="1" />

          {/* Power Transmission Pole / Pylon Tower */}
          <polygon points="650,235 654,235 658,395 646,395" fill="#cbd5e1" stroke="#64748b" strokeWidth="1.2" />

          {/* Crossarms */}
          <line x1="625" y1="260" x2="675" y2="250" stroke="#334155" strokeWidth="3" strokeLinecap="round" />
          <line x1="630" y1="285" x2="670" y2="277" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />

          {/* Glass Insulators with Energy Corona Glow */}
          <circle cx="627" cy="260" r="3" fill="#38bdf8" filter="url(#aboutGlowCyan)" />
          <circle cx="673" cy="250" r="3" fill="#38bdf8" filter="url(#aboutGlowCyan)" />

          {/* Grid Overhead Transmission Cables extending offsite */}
          <path d="M 627 260 Q 685 275 760 255" fill="none" stroke="#38bdf8" strokeWidth="1.8" className="conduit-flow-grid" />
          <path d="M 673 250 Q 715 265 765 245" fill="none" stroke="#10b981" strokeWidth="1.8" className="conduit-flow-grid" />

          {/* Smart Bi-Directional Net-Meter Digital Enclosure */}
          <g transform="translate(640, 335)" className="grid-meter-pulse">
            <rect x="-20" y="-12" width="40" height="24" rx="4" fill="rgba(255, 255, 255, 0.95)" stroke="#0284c7" strokeWidth="1.5" />
            <rect x="-16" y="-8" width="32" height="10" rx="1.5" fill="#0f172a" />
            {/* Live Green Net-Meter readout */}
            <line x1="-12" y1="-3" x2="10" y2="-3" stroke="#22c55e" strokeWidth="2" strokeDasharray="3 2" />
            <text x="-14" y="9" fill="#0284c7" fontSize="7" fontWeight="bold">NET-METER</text>
          </g>
        </g>

        {/* ==================================================================
            9. ANIMATED CONDUITS & BI-DIRECTIONAL ELECTRICITY FLOW
            ================================================================== */}
        <g id="microgrid-conduits">
          {/* --- CONDUIT A: Solar Rooftop to Inverter --- */}
          <path
            d="M 320 370 L 320 460 L 380 430"
            fill="none"
            stroke="#0284c7"
            strokeWidth="2.5"
            strokeLinecap="round"
            className="conduit-flow-solar"
            filter="url(#aboutGlowCyan)"
          />

          {/* --- CONDUIT B: Ground Solar Array to Inverter --- */}
          <path
            d="M 225 435 L 380 440"
            fill="none"
            stroke="#f59e0b"
            strokeWidth="2"
            strokeLinecap="round"
            className="conduit-flow-solar"
            filter="url(#aboutGlowYellow)"
          />

          {/* --- CONDUIT C: Wind Turbine to Inverter --- */}
          <path
            d="M 570 353 L 440 430"
            fill="none"
            stroke="#10b981"
            strokeWidth="2.5"
            strokeLinecap="round"
            className="conduit-flow-wind"
            filter="url(#aboutGlowGreen)"
          />

          {/* --- CONDUIT D: Inverter Hub to EV Fast Charger --- */}
          <path
            d="M 440 460 L 488 440"
            fill="none"
            stroke="#10b981"
            strokeWidth="2.2"
            strokeLinecap="round"
            className="conduit-flow-ev"
            filter="url(#aboutGlowGreen)"
          />

          {/* --- CONDUIT E: Inverter Hub to Smart Grid (Net-Metering Export) --- */}
          <path
            d="M 440 440 L 530 485 L 650 395"
            fill="none"
            stroke="#334155"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path
            d="M 440 440 L 530 485 L 650 395"
            fill="none"
            stroke="#10b981"
            strokeWidth="2"
            strokeLinecap="round"
            className="conduit-flow-grid"
            filter="url(#aboutGlowGreen)"
          />

          {/* Moving Energy Orbs (Packets traveling in real time) */}
          {/* Solar power orb into inverter */}
          <circle r="4.5" fill="#fde047" className="grid-energy-orb">
            <animateMotion
              path="M 320 370 L 320 460 L 380 430"
              dur="1.6s"
              repeatCount="indefinite"
            />
          </circle>

          {/* Ground solar power orb into inverter */}
          <circle r="3.5" fill="#f59e0b" className="grid-energy-orb">
            <animateMotion
              path="M 225 435 L 380 440"
              dur="1.8s"
              begin="0.4s"
              repeatCount="indefinite"
            />
          </circle>

          {/* Wind power orb into inverter */}
          <circle r="4.5" fill="#34d399" className="grid-energy-orb">
            <animateMotion
              path="M 575 160 L 575 345 L 570 353 L 440 430"
              dur="2.4s"
              repeatCount="indefinite"
            />
          </circle>

          {/* EV charging power orb flowing into EV station and car */}
          <circle r="3.5" fill="#22c55e" className="grid-energy-orb">
            <animateMotion
              path="M 440 460 L 488 440 Q 515 445 528 438"
              dur="1.3s"
              repeatCount="indefinite"
            />
          </circle>

          {/* Surplus export orb flowing out to the Grid (Net-metering revenue) */}
          <circle r="4.5" fill="#38bdf8" className="grid-energy-orb">
            <animateMotion
              path="M 440 440 L 530 485 L 650 395 Q 685 275 760 255"
              dur="2.2s"
              repeatCount="indefinite"
            />
          </circle>
          <circle r="3.5" fill="#10b981" className="grid-energy-orb">
            <animateMotion
              path="M 440 440 L 530 485 L 650 395 Q 685 275 760 255"
              dur="2.2s"
              begin="1.1s"
              repeatCount="indefinite"
            />
          </circle>
        </g>
      </svg>
    </div>
  );
}
