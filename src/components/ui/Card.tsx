import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverGlow?: boolean;
  delay?: number;
  theme?: 'light' | 'dark';
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hoverGlow = true,
  delay = 0,
  theme = 'dark',
}) => {
  const cardClasses = theme === 'light'
    ? `bg-white/70 backdrop-blur-md border border-primary/10 shadow-lg shadow-primary/5 ${
        hoverGlow ? 'hover:bg-white hover:border-gold/40 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-300' : ''
      }`
    : `glass-panel ${hoverGlow ? 'glass-panel-hover' : ''}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: delay, ease: [0.16, 1, 0.3, 1] }}
      className={`${cardClasses} rounded-2xl p-6 ${className}`}
    >
      {children}
    </motion.div>
  );
};
