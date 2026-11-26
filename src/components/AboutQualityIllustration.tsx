import React, { useState } from 'react';
import { ShieldCheck, Cpu, Zap, Award, Activity } from 'lucide-react';
import './AboutQualityIllustration.css';

interface AboutQualityIllustrationProps {
  parallaxTilt?: { x: number; y: number };
}

export function AboutQualityIllustration({ parallaxTilt = { x: 0, y: 0 } }: AboutQualityIllustrationProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="about-quality-wrap"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transform: `perspective(1000px) rotateX(${parallaxTilt.y * -4}deg) rotateY(${parallaxTilt.x * 4}deg) ${
          isHovered ? 'scale(1.02)' : 'scale(1)'
        }`,
        transition: 'transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)',
      }}
    >
      {/* Top Floating Badge */}
      <div className="quality-hud-badge quality-hud-badge-top">
        <ShieldCheck size={13} className="text-emerald-500" />
        <span>Tier-1 Modules: <strong>25-Yr Weatherproof</strong></span>
      </div>

      {/* Bottom Floating Badge */}
      <div className="quality-hud-badge quality-hud-badge-bottom">
        <Activity size={13} className="text-sky-500" />
        <span>Smart Inverter: <strong>Pure Sine Wave AC</strong></span>
      </div>

      <svg
        className="about-quality-svg"
        viewBox="0 0 640 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Tier-1 solar module engineering, aerodynamic wind endurance, and smart inverter"
      >
        <defs>
          <linearGradient id="qualGround" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f8fafc" />
            <stop offset="60%" stopColor="#e2e8f0" />
            <stop offset="100%" stopColor="#cbd5e1" />
          </linearGradient>

          <linearGradient id="qualPanel" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#082f49" />
            <stop offset="40%" stopColor="#0284c7" />
            <stop offset="85%" stopColor="#0369a1" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>

          <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#0284c7" stopOpacity="0.05" />
          </linearGradient>

          <filter id="qualGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Base Pad */}
        <g id="qual-platform">
          <ellipse cx="320" cy="420" rx="280" ry="65" fill="#0284c7" fillOpacity="0.1" />
          <path
            d="M 80 340 L 310 440 L 570 330 L 340 230 Z"
            fill="url(#qualGround)"
            stroke="#cbd5e1"
            strokeWidth="1.2"
          />
          {/* Engineering blueprint grid lines */}
          <line x1="140" y1="315" x2="370" y2="415" stroke="#bae6fd" strokeWidth="0.8" strokeDasharray="4 4" />
          <line x1="200" y1="290" x2="430" y2="390" stroke="#bae6fd" strokeWidth="0.8" strokeDasharray="4 4" />
          <line x1="260" y1="265" x2="490" y2="365" stroke="#bae6fd" strokeWidth="0.8" strokeDasharray="4 4" />
        </g>

        {/* Aerodynamic Wind Stress Streamlines (Testing 150 km/h Endurance) */}
        <g id="wind-load-testing">
          <path
            d="M 70 180 C 130 160, 200 150, 310 180 C 370 200, 440 190, 500 170"
            stroke="#38bdf8"
            strokeWidth="1.8"
            strokeLinecap="round"
            className="wind-streamline"
          />
          <path
            d="M 90 210 C 150 190, 220 180, 320 210 C 390 230, 460 220, 520 200"
            stroke="#bae6fd"
            strokeWidth="2.2"
            strokeLinecap="round"
            className="wind-streamline"
            style={{ animationDelay: '0.6s' }}
          />
          <path
            d="M 110 240 C 170 220, 240 210, 330 240 C 400 260, 470 250, 530 230"
            stroke="#38bdf8"
            strokeWidth="1.6"
            strokeLinecap="round"
            className="wind-streamline"
            style={{ animationDelay: '1.1s' }}
          />
        </g>

        {/* Tier-1 Solar Module Assembly */}
        <g id="tier1-module">
          {/* Mounting Bracket Legs */}
          <path d="M 170 330 L 170 300 L 210 280" stroke="#64748b" strokeWidth="2.5" />
          <path d="M 270 375 L 270 345 L 310 325" stroke="#64748b" strokeWidth="2.5" />

          {/* Anodized Aluminum Frame */}
          <polygon
            points="140,270 280,200 375,245 235,315"
            fill="#cbd5e1"
            stroke="#94a3b8"
            strokeWidth="1.5"
          />

          {/* Crystalline Silicon Photovoltaic Cells */}
          <polygon
            points="144,270 278,203 371,246 237,313"
            fill="url(#qualPanel)"
          />

          {/* Grid Busbars */}
          <line x1="175" y1="255" x2="305" y2="215" stroke="#38bdf8" strokeWidth="0.9" strokeOpacity="0.8" />
          <line x1="205" y1="295" x2="335" y2="255" stroke="#38bdf8" strokeWidth="0.9" strokeOpacity="0.8" />
          <line x1="210" y1="237" x2="305" y2="280" stroke="#38bdf8" strokeWidth="0.9" strokeOpacity="0.8" />
          <line x1="190" y1="247" x2="285" y2="290" stroke="#38bdf8" strokeWidth="0.9" strokeOpacity="0.8" />

          {/* Weatherproof Shield Halo */}
          <polygon
            points="130,265 280,190 385,240 235,325"
            fill="url(#shieldGrad)"
            stroke="#38bdf8"
            strokeWidth="1.2"
            strokeDasharray="4 4"
            className="weather-shield-pulse"
          />
        </g>

        {/* German-Engineered Smart Inverter Unit (Right Side) */}
        <g id="smart-inverter-oscilloscope">
          {/* Inverter Cabinet Base Shadow */}
          <polygon points="410,350 490,390 510,380 430,340" fill="#0f172a" opacity="0.1" />

          {/* Inverter Top Face */}
          <polygon points="430,290 490,320 510,310 450,280" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
          {/* Inverter Front Face */}
          <polygon points="430,290 490,320 490,375 430,345" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" />
          {/* Inverter Right Face */}
          <polygon points="490,320 510,310 510,365 490,375" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="1" />

          {/* Oscilloscope Digital Screen Enclosure */}
          <rect x="438" y="305" width="44" height="26" rx="3" fill="#0f172a" stroke="#0284c7" strokeWidth="1" />

          {/* Oscilloscope Grid Lines */}
          <line x1="438" y1="318" x2="482" y2="318" stroke="#334155" strokeWidth="0.6" strokeDasharray="2 2" />
          <line x1="460" y1="305" x2="460" y2="331" stroke="#334155" strokeWidth="0.6" strokeDasharray="2 2" />

          {/* Active Animated Pure Sine Wave AC Trace */}
          <g clipPath="url(#inverterScreenClip)">
            <clipPath id="inverterScreenClip">
              <rect x="439" y="306" width="42" height="24" rx="2" />
            </clipPath>
            <path
              d="M 430 318 Q 438 308, 446 318 T 462 318 T 478 318 T 494 318 T 510 318"
              fill="none"
              stroke="#22c55e"
              strokeWidth="2"
              className="inverter-sine-wave"
              filter="url(#qualGlow)"
            />
          </g>

          {/* LED Frequency indicator */}
          <circle cx="445" cy="336" r="2" fill="#22c55e" filter="url(#qualGlow)" />
          <text x="450" y="338" fill="#0284c7" fontSize="5.5" fontWeight="bold">50Hz PURE SINE</text>

          {/* Cooling Vents */}
          <line x1="440" y1="352" x2="480" y2="352" stroke="#cbd5e1" strokeWidth="1.2" />
          <line x1="440" y1="356" x2="480" y2="356" stroke="#cbd5e1" strokeWidth="1.2" />
        </g>

        {/* Dynamic 85% System Efficiency Dial (Center Bottom) */}
        <g id="efficiency-dial" transform="translate(300, 360)">
          {/* Dial Base Circle */}
          <circle cx="0" cy="0" r="32" fill="rgba(255, 255, 255, 0.95)" stroke="#0284c7" strokeWidth="1.5" />
          {/* Gauge Background Track */}
          <circle cx="0" cy="0" r="24" fill="none" stroke="#e0f2fe" strokeWidth="4.5" />
          {/* Active 85% Gauge Fill */}
          <circle
            cx="0"
            cy="0"
            r="24"
            fill="none"
            stroke="#10b981"
            strokeWidth="4.5"
            strokeDasharray="150"
            strokeDashoffset="26"
            strokeLinecap="round"
            transform="rotate(-90)"
            filter="url(#qualGlow)"
          />
          {/* Dial Center Text */}
          <text x="0" y="2" fill="#0c2340" fontSize="12" fontWeight="800" textAnchor="middle">85%</text>
          <text x="0" y="12" fill="#0284c7" fontSize="6.5" fontWeight="bold" textAnchor="middle">EFFICIENCY</text>
        </g>

        {/* High-Current Power Conduit */}
        <path
          d="M 235 315 L 235 380 L 300 380 L 430 355"
          fill="none"
          stroke="#0284c7"
          strokeWidth="2.5"
          strokeLinecap="round"
          className="quality-conduit-pulse"
        />

        {/* Moving Energy Orbs */}
        <circle r="3.5" fill="#fde047" filter="url(#qualGlow)">
          <animateMotion
            path="M 235 315 L 235 380 L 300 380 L 430 355"
            dur="1.5s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
    </div>
  );
}
