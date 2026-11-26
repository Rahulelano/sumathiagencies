import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import type { Page } from '../types';
import { defaultMotionEase } from './MotionText';

type CtaProps = {
  navigate: (page: Page) => void;
};

export function Cta({ navigate }: CtaProps) {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  return (
    <section
      className="cta"
      onMouseMove={handleMouseMove}
      style={
        {
          '--cta-mouse-x': `${mousePos.x}%`,
          '--cta-mouse-y': `${mousePos.y}%`,
        } as React.CSSProperties
      }
    >
      <div className="cta-ambient-glow" />
      <div className="container cta-inner">
        <div>
          <motion.div
            className="eyebrow light"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: defaultMotionEase }}
          >
            <span /> Ready when you are
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, delay: 0.08, ease: defaultMotionEase }}
          >
            Let’s make your energy<br />
            <em>work harder.</em>
          </motion.h2>
        </div>

        <div className="cta-actions">
          <motion.p
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease: defaultMotionEase }}
          >
            Have a question or a project in mind?<br />
            We’d love to hear from you.
          </motion.p>

          <motion.button
            className="button cream"
            onClick={() => navigate('contact')}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, delay: 0.12, ease: defaultMotionEase }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            Get in touch <ArrowRight size={18} />
          </motion.button>
        </div>
      </div>
    </section>
  );
}
