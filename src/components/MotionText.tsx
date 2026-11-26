import React, { type ReactNode } from 'react';
import { motion, type HTMLMotionProps, type Easing } from 'framer-motion';

export interface MotionProps extends HTMLMotionProps<'div'> {
  children: ReactNode;
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
  once?: boolean;
}

export const defaultMotionEase: Easing = [0.22, 1, 0.36, 1] as const; // Smooth spring-like cubic bezier

export function MotionFromLeft({
  children,
  delay = 0,
  duration = 0.65,
  distance = 45,
  className = '',
  once = true,
  ...props
}: MotionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -distance }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once, amount: 0.12 }}
      transition={{ duration, delay, ease: defaultMotionEase }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function MotionFromRight({
  children,
  delay = 0,
  duration = 0.65,
  distance = 45,
  className = '',
  once = true,
  ...props
}: MotionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: distance }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once, amount: 0.12 }}
      transition={{ duration, delay, ease: defaultMotionEase }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function MotionText({
  children,
  direction = 'left',
  delay = 0,
  duration = 0.65,
  distance = 45,
  className = '',
  once = true,
  ...props
}: MotionProps & { direction?: 'left' | 'right' }) {
  const xOffset = direction === 'left' ? -distance : distance;
  return (
    <motion.div
      initial={{ opacity: 0, x: xOffset }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once, amount: 0.12 }}
      transition={{ duration, delay, ease: defaultMotionEase }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function MotionHeading({
  children,
  level = 2,
  direction = 'left',
  delay = 0,
  duration = 0.65,
  distance = 45,
  className = '',
  once = true,
}: {
  children: ReactNode;
  level?: 1 | 2 | 3 | 4;
  direction?: 'left' | 'right';
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
  once?: boolean;
}) {
  const xOffset = direction === 'left' ? -distance : distance;
  const transition = { duration, delay, ease: defaultMotionEase };
  const initial = { opacity: 0, x: xOffset };
  const whileInView = { opacity: 1, x: 0 };
  const viewport = { once, amount: 0.12 };

  if (level === 1) {
    return (
      <motion.h1
        initial={initial}
        whileInView={whileInView}
        viewport={viewport}
        transition={transition}
        className={className}
      >
        {children}
      </motion.h1>
    );
  }
  if (level === 3) {
    return (
      <motion.h3
        initial={initial}
        whileInView={whileInView}
        viewport={viewport}
        transition={transition}
        className={className}
      >
        {children}
      </motion.h3>
    );
  }
  if (level === 4) {
    return (
      <motion.h4
        initial={initial}
        whileInView={whileInView}
        viewport={viewport}
        transition={transition}
        className={className}
      >
        {children}
      </motion.h4>
    );
  }
  return (
    <motion.h2
      initial={initial}
      whileInView={whileInView}
      viewport={viewport}
      transition={transition}
      className={className}
    >
      {children}
    </motion.h2>
  );
}

export function MotionParagraph({
  children,
  direction = 'right',
  delay = 0,
  duration = 0.65,
  distance = 45,
  className = '',
  once = true,
}: {
  children: ReactNode;
  direction?: 'left' | 'right';
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
  once?: boolean;
}) {
  const xOffset = direction === 'left' ? -distance : distance;
  return (
    <motion.p
      initial={{ opacity: 0, x: xOffset }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once, amount: 0.12 }}
      transition={{ duration, delay, ease: defaultMotionEase }}
      className={className}
    >
      {children}
    </motion.p>
  );
}
