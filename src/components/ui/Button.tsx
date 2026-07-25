import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  href?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  onClick,
  className = '',
  type = 'button',
  disabled = false,
  href,
}) => {
  const baseStyles = 'inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium text-sm tracking-wide transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold/50 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-gradient-to-r from-primary to-primary-light text-white shadow-lg shadow-primary/20 border border-primary-light/10 hover:shadow-primary-light/30',
    secondary: 'bg-gradient-to-r from-gold to-gold-dark text-white shadow-lg shadow-gold/10 border border-gold-light/10 hover:shadow-gold/25',
    outline: 'border border-primary-light text-primary-light hover:bg-primary/20 hover:text-white',
  };

  const buttonContent = (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </motion.button>
  );

  if (href) {
    // If it's a smooth scroll link, we can wrap it or just use an anchor
    return (
      <a href={href} className="inline-block">
        <motion.div
          whileHover={{ y: -2, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`${baseStyles} ${variants[variant]} ${className}`}
          onClick={onClick}
        >
          {children}
        </motion.div>
      </a>
    );
  }

  return buttonContent;
};
