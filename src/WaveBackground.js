import React from 'react';
import { motion } from 'framer-motion';

const waveVariants = {
  animate: (custom) => ({
    x: [0, -1000],
    transition: {
      x: {
        repeat: Infinity,
        repeatType: "loop",
        duration: custom.duration,
        ease: "linear",
      },
    },
  }),
};

const WaveBackground = () => {
  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: -1,
      overflow: 'hidden',
      background: 'linear-gradient(180deg, #0f172a 0%, #1e1b4b 100%)',
      pointerEvents: 'none'
    }}>
      {/* Wave 1 - Back */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: -20,
          left: 0,
          width: '200%',
          height: '200px',
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 88.7'%3E%3Cpath d='M800 56.9c-155.5 0-204.9-50-405.5-49.9-200 0-250 49.9-394.5 49.9v31.8h800v-.2-31.6z' fill='%23312e81'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat-x',
          backgroundSize: '50% 100%',
          opacity: 0.4,
        }}
        custom={{ duration: 20 }}
        variants={waveVariants}
        animate="animate"
      />

      {/* Wave 2 - Middle */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: -10,
          left: 0,
          width: '200%',
          height: '220px',
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 88.7'%3E%3Cpath d='M800 56.9c-155.5 0-204.9-50-405.5-49.9-200 0-250 49.9-394.5 49.9v31.8h800v-.2-31.6z' fill='%234338ca'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat-x',
          backgroundSize: '50% 100%',
          opacity: 0.5,
        }}
        custom={{ duration: 15 }}
        variants={waveVariants}
        animate="animate"
      />

      {/* Wave 3 - Front */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '200%',
          height: '250px',
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 88.7'%3E%3Cpath d='M800 56.9c-155.5 0-204.9-50-405.5-49.9-200 0-250 49.9-394.5 49.9v31.8h800v-.2-31.6z' fill='%236366f1'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat-x',
          backgroundSize: '50% 100%',
          opacity: 0.2,
        }}
        custom={{ duration: 10 }}
        variants={waveVariants}
        animate="animate"
      />
    </div>
  );
};

export default WaveBackground;
