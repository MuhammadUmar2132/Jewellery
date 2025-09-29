"use client"
import React from "react";
import { motion } from "framer-motion";

// FramerLoader.jsx
// Circle + rotating ring loader (centered)

export default function FramerLoader({
  size = 100, // bigger default size
  color = "brown",
  speed = 1.2,
}) {
  const dotSize = Math.max(10, Math.round(size / 5));

  return (
    <div
      className="loader_main"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh", // centers vertically
        width: "100%",
      }}
    >
      {/* Rotating ring */}
      <motion.div
        style={{
          position: "relative",
          width: size,
          height: size,
          borderRadius: "50%",
          border: `${Math.max(3, size / 20)}px solid ${color}33`, // light ring
          borderTopColor: color, // main color
        }}
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: speed,
          ease: "linear",
        }}
      >
        {/* Inner bouncing circle */}
        <motion.div
          style={{
            width: dotSize,
            height: dotSize,
            borderRadius: "50%",
            background: color,
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
          animate={{ scale: [1, 1.3, 1] }}
          transition={{
            duration: speed,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </div>
  );
}

/*
Usage:
<FramerLoader size={120} color="#ef4444" speed={1.5} />
- size: overall loader size
- color: main color
- speed: rotation + bounce speed
*/
