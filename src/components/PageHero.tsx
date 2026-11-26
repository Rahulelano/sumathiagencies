import React, { useState, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Sun } from 'lucide-react';
import { defaultMotionEase } from './MotionText';

type PageHeroProps = {
  eyebrow: string;
  title: ReactNode;
  copy: string;
  visual?: ReactNode;
};

export function PageHero({ eyebrow, title, copy, visual }: PageHeroProps) {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isMarkHovered, setIsMarkHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  return (
    <section
      className="page-hero"
      onMouseMove={handleMouseMove}
      style={
        {
          '--hero-mouse-x': `${mousePos.x}%`,
          '--hero-mouse-y': `${mousePos.y}%`,
        } as React.CSSProperties
      }
    >
      <div className="page-hero-glow" />
      <div className="page-hero-pattern" />
      <div className="container page-hero-inner">
        <div className="page-hero-copy">
          <motion.div
            className="eyebrow"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: defaultMotionEase }}
          >
            <span /> {eyebrow}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, delay: 0.1, ease: defaultMotionEase }}
          >
            {title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, delay: 0.2, ease: defaultMotionEase }}
          >
            {copy}
          </motion.p>
        </div>

        {visual ? (
          <motion.div
            className="page-hero-visual-wrap"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, delay: 0.15, ease: defaultMotionEase }}
          >
            {visual}
          </motion.div>
        ) : (
          <motion.div
            className={`page-hero-mark ${isMarkHovered ? 'mark-hovered' : ''}`}
            onMouseEnter={() => setIsMarkHovered(true)}
            onMouseLeave={() => setIsMarkHovered(false)}
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, delay: 0.15, ease: defaultMotionEase }}
          >
            <div className="page-hero-mark-glow" />
            <div className="page-hero-mark-ring ring-outer" />
            <div className="page-hero-mark-ring ring-middle" />
            <div className="page-hero-mark-ring ring-inner" />
            <div className="mark-sun-icon">
              <Sun size={48} strokeWidth={1.8} />
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
