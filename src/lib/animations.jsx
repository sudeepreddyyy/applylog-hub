
import React from 'react';
import { motion } from 'framer-motion';

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } }
};

export const fadeInUp = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const slideLeft = {
  hidden: { x: '100%' },
  visible: { x: 0, transition: { type: 'spring', damping: 25, stiffness: 300 } }
};

export const slideRight = {
  hidden: { x: '-100%' },
  visible: { x: 0, transition: { type: 'spring', damping: 25, stiffness: 300 } }
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { 
      type: 'spring', 
      damping: 20, 
      stiffness: 300 
    } 
  }
};

export const FadeIn = ({ children, delay = 0, ...props }) => (
  <motion.div
    initial="hidden"
    animate="visible"
    variants={{
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { delay, duration: 0.3 } }
    }}
    {...props}
  >
    {children}
  </motion.div>
);

export const FadeInUp = ({ children, delay = 0, ...props }) => (
  <motion.div
    initial="hidden"
    animate="visible"
    variants={{
      hidden: { opacity: 0, y: 10 },
      visible: { opacity: 1, y: 0, transition: { delay, duration: 0.5 } }
    }}
    {...props}
  >
    {children}
  </motion.div>
);

export const ScaleIn = ({ children, delay = 0, ...props }) => (
  <motion.div
    initial="hidden"
    animate="visible"
    variants={{
      hidden: { opacity: 0, scale: 0.95 },
      visible: { 
        opacity: 1, 
        scale: 1, 
        transition: { 
          delay,
          type: 'spring', 
          damping: 20, 
          stiffness: 300 
        } 
      }
    }}
    {...props}
  >
    {children}
  </motion.div>
);
