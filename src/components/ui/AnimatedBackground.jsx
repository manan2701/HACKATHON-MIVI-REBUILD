import React from "react";
import { motion } from "framer-motion";
import "./AnimatedBackground.css";

const AnimatedBackground = () => {
  return (
    <div className="animated-bg-container">
      <motion.div
        className="square-shape"
        animate={{
          rotate: [-45, 45, -45],
          y: [-20, 20, -20],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};

export default AnimatedBackground;
