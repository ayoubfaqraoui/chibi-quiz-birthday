import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SakuraPetal {
  id: number;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  speed: number;
  drift: number;
  opacity: number;
  depth: number;
}

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  duration: number;
}

interface Bubble {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
}

const KawaiiEffects: React.FC = () => {
  const [sakuraPetals, setSakuraPetals] = useState<SakuraPetal[]>([]);
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const [bubbles, setBubbles] = useState<Bubble[]>([]);

  // Initialize sakura petals
  useEffect(() => {
    const petals: SakuraPetal[] = [];
    for (let i = 0; i < 15; i++) {
      petals.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight - 100,
        rotation: Math.random() * 360,
        scale: 0.5 + Math.random() * 0.8,
        speed: 0.5 + Math.random() * 1.5,
        drift: (Math.random() - 0.5) * 2,
        opacity: 0.4 + Math.random() * 0.4,
        depth: Math.random() * 3
      });
    }
    setSakuraPetals(petals);
  }, []);

  // Animate sakura petals
  useEffect(() => {
    const interval = setInterval(() => {
      setSakuraPetals(prev => prev.map(petal => {
        const newY = petal.y + petal.speed;
        return {
          ...petal,
          y: newY > window.innerHeight + 50 ? -50 : newY,
          x: petal.x + Math.sin(petal.y * 0.01) * petal.drift,
          rotation: petal.rotation + 1
        };
      }));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  // Create sparkles randomly
  useEffect(() => {
    const createSparkle = () => {
      const newSparkle: Sparkle = {
        id: Date.now() + Math.random(),
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: 2 + Math.random() * 4,
        opacity: 0.8,
        duration: 2000 + Math.random() * 3000
      };
      
      setSparkles(prev => [...prev, newSparkle]);
      
      setTimeout(() => {
        setSparkles(prev => prev.filter(s => s.id !== newSparkle.id));
      }, newSparkle.duration);
    };

    const interval = setInterval(createSparkle, 800 + Math.random() * 1200);
    return () => clearInterval(interval);
  }, []);

  // Create bubbles from bottom
  useEffect(() => {
    const createBubble = () => {
      const newBubble: Bubble = {
        id: Date.now() + Math.random(),
        x: Math.random() * window.innerWidth,
        y: window.innerHeight + 20,
        size: 10 + Math.random() * 30,
        speed: 1 + Math.random() * 2,
        opacity: 0.1 + Math.random() * 0.3
      };
      
      setBubbles(prev => [...prev, newBubble]);
    };

    const interval = setInterval(createBubble, 2000 + Math.random() * 3000);
    return () => clearInterval(interval);
  }, []);

  // Animate bubbles
  useEffect(() => {
    const interval = setInterval(() => {
      setBubbles(prev => prev
        .map(bubble => ({
          ...bubble,
          y: bubble.y - bubble.speed,
          x: bubble.x + Math.sin(bubble.y * 0.01) * 0.5
        }))
        .filter(bubble => bubble.y > -50)
      );
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {/* Sakura Petals */}
      {sakuraPetals.map(petal => (
        <motion.div
          key={petal.id}
          className="absolute"
          style={{
            left: petal.x,
            top: petal.y,
            transform: `rotate(${petal.rotation}deg) scale(${petal.scale})`,
            opacity: petal.opacity,
            zIndex: Math.floor(petal.depth)
          }}
        >
          <div 
            className="w-3 h-3 rounded-full"
            style={{
              background: 'linear-gradient(45deg, #FFB6C1, #FFC0CB)',
              filter: `blur(${petal.depth * 0.5}px)`
            }}
          />
        </motion.div>
      ))}

      {/* Constellation Sparkles */}
      <AnimatePresence>
        {sparkles.map(sparkle => (
          <motion.div
            key={sparkle.id}
            className="absolute"
            style={{
              left: sparkle.x,
              top: sparkle.y,
              width: sparkle.size,
              height: sparkle.size
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, sparkle.opacity, 0],
              scale: [0, 1, 0],
              rotate: [0, 180, 360]
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ 
              duration: sparkle.duration / 1000,
              ease: "easeInOut"
            }}
          >
            <div 
              className="w-full h-full"
              style={{
                background: 'radial-gradient(circle, #FFD700, #FFA500)',
                clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)'
              }}
            />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Floating Bubbles */}
      <AnimatePresence>
        {bubbles.map(bubble => (
          <motion.div
            key={bubble.id}
            className="absolute rounded-full"
            style={{
              left: bubble.x,
              top: bubble.y,
              width: bubble.size,
              height: bubble.size,
              background: `radial-gradient(circle at 30% 30%, rgba(255, 255, 255, ${bubble.opacity * 0.8}), rgba(255, 182, 193, ${bubble.opacity * 0.3}))`,
              border: `1px solid rgba(255, 255, 255, ${bubble.opacity * 0.5})`,
              backdropFilter: 'blur(2px)'
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: bubble.opacity, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.5 }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default KawaiiEffects;
