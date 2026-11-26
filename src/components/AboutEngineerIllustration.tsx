import React, { useState } from 'react';
import { Gauge, Cpu, BarChart2, CheckCircle, Crosshair } from 'lucide-react';
import './AboutEngineerIllustration.css';

interface AboutEngineerIllustrationProps {
  parallaxTilt?: { x: number; y: number };
}

export function AboutEngineerIllustration({ parallaxTilt = { x: 0, y: 0 } }: AboutEngineerIllustrationProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="about-eng-wrap"
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
      <div className="eng-hud-badge eng-hud-badge-top">
        <Gauge size={13} className="text-sky-500" />
        <span>STC Standard: <strong>1,000 W/m² • 25°C</strong></span>
      </div>

      {/* Bottom Floating Badge */}
      <div className="eng-hud-badge eng-hud-badge-bottom">
        <Cpu size={13} className="text-emerald-500" />
        <span>Pmax Rating: <strong>500 to 740 Wp Verified</strong></span>
      </div>

      <svg
        className="about-eng-svg"
        viewBox="0 0 640 480"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Solar engineer CAD blueprint, STC rating test, and Pmax power curve"
      >
        <defs>
          <linearGradient id="engGround" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f0f7ff" />
            <stop offset="60%" stopColor="#e0f2fe" />
            <stop offset="100%" stopColor="#bae6fd" />
          </linearGradient>

          <filter id="engGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* CAD Drafting Table / Blueprint Base */}
        <g id="cad-base">
          <ellipse cx="320" cy="400" rx="270" ry="60" fill="#0284c7" fillOpacity="0.12" />

          {/* Isometric Blueprint Tablet */}
          <polygon
            points="90,320 320,420 570,310 340,210"
            fill="url(#engGround)"
            stroke="#0284c7"
            strokeWidth="1.5"
          />
          <polygon points="90,320 90,335 320,435 320,420" fill="#bae6fd" stroke="#0284c7" strokeWidth="1" />
          <polygon points="320,420 320,435 570,325 570,310" fill="#7dd3fc" stroke="#0284c7" strokeWidth="1" />

          {/* Blueprint Precision Grid Lines */}
          {[140, 190, 240, 290, 340, 390, 440, 490].map((x, idx) => (
            <line
              key={idx}
              x1={x - 40}
              y1={290 - idx * 5}
              x2={x + 70}
              y2={390 - idx * 5}
              stroke="#0284c7"
              strokeWidth="0.6"
              strokeDasharray="3 3"
              strokeOpacity="0.35"
            />
          ))}
        </g>

        {/* 3D Holographic Wireframe Solar Panel Blueprint */}
        <g id="hologram-module" className="eng-blueprint-shimmer">
          {/* Module Outer Frame Wireframe */}
          <polygon
            points="180,240 310,180 430,230 300,290"
            fill="rgba(2, 132, 199, 0.12)"
            stroke="#0284c7"
            strokeWidth="2"
          />

          {/* Internal Cell Grid Wireframe (6x10 Cells) */}
          <line x1="212" y1="225" x2="340" y2="272" stroke="#38bdf8" strokeWidth="1" strokeOpacity="0.7" />
          <line x1="245" y1="210" x2="370" y2="257" stroke="#38bdf8" strokeWidth="1" strokeOpacity="0.7" />
          <line x1="277" y1="195" x2="400" y2="242" stroke="#38bdf8" strokeWidth="1" strokeOpacity="0.7" />

          <line x1="225" y1="250" x2="350" y2="192" stroke="#38bdf8" strokeWidth="1" strokeOpacity="0.7" />
          <line x1="260" y1="265" x2="385" y2="207" stroke="#38bdf8" strokeWidth="1" strokeOpacity="0.7" />

          {/* Dimension Measurement Callout Lines */}
          {/* Length: 1980mm */}
          <line x1="165" y1="230" x2="295" y2="170" stroke="#0c4a6e" strokeWidth="1.2" />
          <circle cx="165" cy="230" r="2.5" fill="#0284c7" />
          <circle cx="295" cy="170" r="2.5" fill="#0284c7" />
          <text x="220" y="195" fill="#0c4a6e" fontSize="7.5" fontWeight="bold">1980 mm</text>

          {/* Width: 992mm */}
          <line x1="315" y1="165" x2="435" y2="215" stroke="#0c4a6e" strokeWidth="1.2" />
          <circle cx="315" cy="165" r="2.5" fill="#0284c7" />
          <circle cx="435" cy="215" r="2.5" fill="#0284c7" />
          <text x="385" y="185" fill="#0c4a6e" fontSize="7.5" fontWeight="bold">992 mm</text>

          {/* Scanning Reticle Laser Sweep */}
          <line
            x1="180"
            y1="240"
            x2="310"
            y2="180"
            stroke="#22c55e"
            strokeWidth="2"
            filter="url(#engGlow)"
            className="cad-scanner-line"
          />
        </g>

        {/* Real-Time Pmax Power Curve Screen (Right) */}
        <g id="pmax-chart-screen" transform="translate(420, 260)">
          {/* Mini Monitor Frame */}
          <polygon points="0,0 85,-35 125,-15 40,20" fill="#0f172a" stroke="#0284c7" strokeWidth="1.5" />
          {/* Chart Axes */}
          <line x1="15" y1="5" x2="75" y2="-20" stroke="#64748b" strokeWidth="1" />
          <line x1="15" y1="5" x2="35" y2="-15" stroke="#64748b" strokeWidth="1" />

          {/* Pmax Power Curve (I-V & P-V curve) */}
          <path
            d="M 15 2 Q 40 -15, 60 -18 T 80 0"
            fill="none"
            stroke="#10b981"
            strokeWidth="2.5"
            strokeLinecap="round"
            className="pmax-curve-draw"
            filter="url(#engGlow)"
          />

          {/* Peak point indicator */}
          <circle cx="60" cy="-18" r="3" fill="#fde047" filter="url(#engGlow)" />
          <text x="24" y="-22" fill="#22c55e" fontSize="6.5" fontWeight="bold">500 to 740 Wp</text>
        </g>

        {/* STC Rating Test Monitor (Left) */}
        <g id="stc-test-monitor" transform="translate(130, 280)">
          <polygon points="0,0 75,30 75,65 0,35" fill="#ffffff" stroke="#0284c7" strokeWidth="1.2" />
          <polygon points="75,30 115,12 115,47 75,65" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.2" />

          {/* Digital Readout Text */}
          <text x="8" y="22" fill="#0284c7" fontSize="7" fontWeight="bold">STC TEST</text>
          <text x="8" y="32" fill="#0c4a6e" fontSize="6">1000 W/m²</text>
          <text x="8" y="42" fill="#10b981" fontSize="6" fontWeight="bold">25°C • AM 1.5</text>
        </g>

        {/* Calibration Reticle Crosshair */}
        <g transform="translate(305, 235)">
          <circle cx="0" cy="0" r="12" fill="none" stroke="#22c55e" strokeWidth="1" strokeDasharray="2 2" />
          <line x1="-16" y1="0" x2="16" y2="0" stroke="#22c55e" strokeWidth="1" />
          <line x1="0" y1="-16" x2="0" y2="16" stroke="#22c55e" strokeWidth="1" />
          <circle cx="0" cy="0" r="2.5" fill="#fde047" />
        </g>
      </svg>
    </div>
  );
}
