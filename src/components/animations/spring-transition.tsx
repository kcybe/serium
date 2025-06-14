"use client";

import { motion } from "framer-motion";

export default function SpringTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }} // Start a bit further down for a more noticeable spring
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -30, opacity: 0 }} // Exit a bit further up
      transition={{
        type: "spring", // Use the spring transition type
        stiffness: 260, // How "stiff" the spring is (higher is more rigid)
        damping: 20, // How much opposition/drag the spring has (higher means less oscillation)
        mass: 1.5, // Optional: Affects how heavy the element feels (default is 1)
      }}
      style={{ position: "relative", width: "100%" }} // Keep this for layout
    >
      {children}
    </motion.div>
  );
}
