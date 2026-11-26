import React from 'react';
import { motion } from 'framer-motion';
import { defaultMotionEase } from './MotionText';

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  copy?: string;
  light?: boolean;
};

export function SectionHeading({ eyebrow, title, copy, light = false }: SectionHeadingProps) {
  return (
    <div className={light ? 'section-heading light' : 'section-heading'}>
      <motion.div
        className="eyebrow"
        initial={{ opacity: 0, x: -45 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.6, ease: defaultMotionEase }}
      >
        <span /> {eyebrow}
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, x: -45 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.65, delay: 0.08, ease: defaultMotionEase }}
      >
        {title}
      </motion.h2>

      {copy && (
        <motion.p
          initial={{ opacity: 0, x: 45 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.65, delay: 0.16, ease: defaultMotionEase }}
        >
          {copy}
        </motion.p>
      )}
    </div>
  );
}
