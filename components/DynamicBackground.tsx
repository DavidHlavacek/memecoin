import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function DynamicBackground() {
  const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 -z-10">
      <motion.div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at ${50 + (scrollY * 0.02)}% ${50 + (scrollY * 0.01)}%, 
            rgba(57, 255, 20, 0.15) 0%,
            rgba(57, 255, 20, 0.1) 20%,
            rgba(10, 10, 10, 1) 70%)`,
        }}
        animate={{
          opacity: [0.5, 0.7, 0.5],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      <div className="absolute inset-0 backdrop-blur-[1px]" />
    </div>
  );
}
