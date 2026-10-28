"use client";
import { MotionConfig, motion } from "framer-motion";

// A template re-mounts on every navigation, which gives each page a soft enter transition.
// MotionConfig makes every animation in the tree respect prefers-reduced-motion.
export default function Template({ children }) {
  return (
    <MotionConfig reducedMotion="user">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, ease: "easeOut" }}>
        {children}
      </motion.div>
    </MotionConfig>
  );
}
