import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SparkleRevealProps {
  children: React.ReactNode;
  isVisible: boolean;
  delay?: number;
  sparkleCount?: number;
}

const SparkleReveal: React.FC<SparkleRevealProps> = ({ 
  children, 
  isVisible, 
  delay = 0,
  sparkleCount = 8 
}) => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setShowContent(true);
      }, delay + 100); // Very fast reveal
      
      return () => clearTimeout(timer);
    } else {
      setShowContent(false);
    }
  }, [isVisible, delay]);

  // Generate sparkle positions in a circle
  const generateSparkles = () => {
    const sparkles = [];
    for (let i = 0; i < sparkleCount; i++) {
      const angle = (i * 360) / sparkleCount;
      const radian = (angle * Math.PI) / 180;
      
      sparkles.push({
        id: i,
        angle,
        x: Math.cos(radian) * 80,
        y: Math.sin(radian) * 80,
        rotation: angle
      });
    }
    return sparkles;
  };

  const sparkles = generateSparkles();

  const sparkleVariants = {
    hidden: () => ({
      scale: 0,
      rotate: 0,
      x: 0,
      y: 0,
      opacity: 0
    }),
    visible: (i: number) => ({
      scale: [0, 1.5, 1],
      rotate: [0, 180, 360],
      x: sparkles[i].x,
      y: sparkles[i].y,
      opacity: [0, 1, 0.7, 0]
    })
  };

  const contentVariants = {
    hidden: {
      scale: 0.8,
      opacity: 0,
      y: 10
    },
    visible: {
      scale: 1,
      opacity: 1,
      y: 0
    }
  };

  return (
    <div className="relative flex items-center justify-center">
      {/* Sparkles */}
      <div className="absolute inset-0 flex items-center justify-center">
        <AnimatePresence>
          {isVisible && sparkles.map((sparkle, i) => (
            <motion.div
              key={sparkle.id}
              custom={i}
              variants={sparkleVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{
                duration: 0.6,
                delay: i * 0.05,
                ease: "easeOut"
              }}
              className="absolute"
              style={{
                width: '12px',
                height: '12px'
              }}
            >
              <div 
                className="w-full h-full"
                style={{
                  background: `radial-gradient(circle, 
                    rgba(255, 215, 0, 0.9) 0%, 
                    rgba(255, 182, 193, 0.7) 50%, 
                    rgba(147, 51, 234, 0.5) 100%)`,
                  clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
                  filter: 'drop-shadow(0 0 6px rgba(255, 215, 0, 0.6))'
                }}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Content */}
      <AnimatePresence>
        {showContent && (
          <motion.div
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 20,
              delay: 0.1
            }}
            className="relative z-10"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Center glow effect */}
      <AnimatePresence>
        {isVisible && !showContent && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: [0, 1.2, 1], 
              opacity: [0, 0.8, 0.6]
            }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ 
              duration: 0.4,
              ease: "easeOut"
            }}
            className="absolute z-5"
          >
            <div 
              className="w-6 h-6 rounded-full"
              style={{
                background: 'radial-gradient(circle, #FFD700 30%, #FF69B4 70%)',
                boxShadow: '0 0 20px rgba(255, 215, 0, 0.8), 0 0 40px rgba(255, 105, 180, 0.4)'
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SparkleReveal;
