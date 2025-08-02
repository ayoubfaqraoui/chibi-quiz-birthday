import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  life: number;
  maxLife: number;
}

interface KawaiiPageTransitionProps {
  children: React.ReactNode;
  pageKey: string;
  direction?: 'left' | 'right' | 'up' | 'down';
}

const KawaiiPageTransition: React.FC<KawaiiPageTransitionProps> = ({ 
  children, 
  pageKey, 
  direction = 'right' 
}) => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Create trailing particles during transition
  const createParticles = (count: number = 20) => {
    const newParticles: Particle[] = [];
    const colors = ['#FFB6C1', '#DDA0DD', '#98FB98', '#F0E68C', '#87CEEB'];
    
    for (let i = 0; i < count; i++) {
      newParticles.push({
        id: Date.now() + i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 4,
        vy: (Math.random() - 0.5) * 4,
        size: 2 + Math.random() * 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 60,
        maxLife: 60
      });
    }
    
    setParticles(newParticles);
  };

  // Animate particles
  useEffect(() => {
    if (!isTransitioning) return;

    const interval = setInterval(() => {
      setParticles(prev => prev
        .map(particle => ({
          ...particle,
          x: particle.x + particle.vx,
          y: particle.y + particle.vy,
          life: particle.life - 1,
          vy: particle.vy + 0.1 // gravity
        }))
        .filter(particle => particle.life > 0)
      );
    }, 16);

    return () => clearInterval(interval);
  }, [isTransitioning]);

  // Clear particles when transition ends
  useEffect(() => {
    if (!isTransitioning) {
      const timeout = setTimeout(() => setParticles([]), 1000);
      return () => clearTimeout(timeout);
    }
  }, [isTransitioning]);

  const getSlideVariants = () => {
    const distance = window.innerWidth;
    
    switch (direction) {
      case 'left':
        return {
          initial: { x: -distance, opacity: 0 },
          animate: { x: 0, opacity: 1 },
          exit: { x: distance, opacity: 0 }
        };
      case 'right':
        return {
          initial: { x: distance, opacity: 0 },
          animate: { x: 0, opacity: 1 },
          exit: { x: -distance, opacity: 0 }
        };
      case 'up':
        return {
          initial: { y: -window.innerHeight, opacity: 0 },
          animate: { y: 0, opacity: 1 },
          exit: { y: window.innerHeight, opacity: 0 }
        };
      case 'down':
        return {
          initial: { y: window.innerHeight, opacity: 0 },
          animate: { y: 0, opacity: 1 },
          exit: { y: -window.innerHeight, opacity: 0 }
        };
      default:
        return {
          initial: { x: distance, opacity: 0 },
          animate: { x: 0, opacity: 1 },
          exit: { x: -distance, opacity: 0 }
        };
    }
  };

  const slideVariants = getSlideVariants();

  return (
    <>
      {/* Particle Effects */}
      <div className="fixed inset-0 pointer-events-none z-50">
        {particles.map(particle => (
          <div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              left: particle.x,
              top: particle.y,
              width: particle.size,
              height: particle.size,
              backgroundColor: particle.color,
              opacity: particle.life / particle.maxLife,
              boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
              filter: 'blur(0.5px)'
            }}
          />
        ))}
      </div>

      {/* Page Transition */}
      <AnimatePresence
        mode="wait"
        onExitComplete={() => {
          setIsTransitioning(false);
        }}
      >
        <motion.div
          key={pageKey}
          initial={slideVariants.initial}
          animate={slideVariants.animate}
          exit={slideVariants.exit}
          onAnimationStart={() => {
            if (isTransitioning) {
              setIsTransitioning(true);
              createParticles();
            }
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
            mass: 0.8,
            duration: 0.6
          }}
          className="w-full h-full"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default KawaiiPageTransition;
