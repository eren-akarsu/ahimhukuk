import React from 'react';
import { motion } from 'framer-motion';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  align?: 'center' | 'left';
  className?: string;
  theme?: 'light' | 'dark';
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  subtitle,
  align = 'center',
  className = '',
  theme = 'dark',
}) => {
  const containerAlignment = align === 'center' ? 'text-center items-center' : 'text-left items-start';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`flex flex-col mb-12 ${containerAlignment} ${className}`}
    >
      {subtitle && (
        <span className="text-xs md:text-sm font-semibold tracking-widest text-gold uppercase mb-2">
          {subtitle}
        </span>
      )}
      <h2 className={`text-3xl md:text-4xl font-serif font-bold tracking-wide relative ${
        theme === 'light' ? 'text-darker-bg' : 'text-white'
      }`}>
        {title}
      </h2>
      <div className="w-16 h-1 bg-gradient-to-r from-gold to-gold-dark rounded-full mt-4" />
    </motion.div>
  );
};
