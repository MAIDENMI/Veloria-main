"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils"; // Assuming you have a `cn` utility from shadcn

// Define the props for the component
interface AnimatedFeatureCardProps {
  /** The numerical index to display, e.g., "001" */
  index: string;
  /** The tag or category label */
  tag: string;
  /** The main title or description */
  title: React.ReactNode;
  /** The URL for the central image */
  imageSrc: string;
  /** The color variant which determines the gradient and tag color */
  color: "orange" | "purple" | "blue";
  /** Optional className for styling */
  className?: string;
}

// Define HSL color values for each variant to work with shadcn's theming
const colorVariants = {
  orange: {
    '--feature-color': 'hsl(35, 91%, 55%)',
    '--feature-color-light': 'hsl(41, 100%, 85%)',
    '--feature-color-dark': 'hsl(24, 98%, 98%)',
  },
  purple: {
    '--feature-color': 'hsl(262, 85%, 60%)',
    '--feature-color-light': 'hsl(261, 100%, 87%)',
    '--feature-color-dark': 'hsl(264, 100%, 98%)',
  },
  blue: {
    '--feature-color': 'hsl(211, 100%, 60%)',
    '--feature-color-light': 'hsl(210, 100%, 83%)',
    '--feature-color-dark': 'hsl(216, 100%, 98%)',
  },
};

const AnimatedFeatureCard = React.forwardRef<
  HTMLDivElement,
  AnimatedFeatureCardProps
>(({ className, index, tag, title, imageSrc, color }, ref) => {
  const cardStyle = colorVariants[color] as React.CSSProperties;

  return (
    <motion.div
      ref={ref}
      style={cardStyle}
      className={cn(
        "relative flex h-[320px] sm:h-[360px] lg:h-[380px] w-full max-w-sm flex-col justify-end overflow-hidden rounded-2xl border bg-card p-4 sm:p-6 shadow-sm",
        className
      )}
      whileHover="hover"
      initial="initial"
      variants={{
        initial: { y: 0 },
        hover: { y: -10, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" },
      }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
    >
      {/* Background Gradient */}
      <div
        className="absolute inset-0 z-0 opacity-40 dark:opacity-20"
        style={{
          background: `radial-gradient(circle at 50% 30%, var(--feature-color-light) 0%, transparent 70%)`
        }}
      />
      
      {/* Index Number */}
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 font-mono text-base sm:text-lg font-bold text-muted-foreground">
        {index}
      </div>

      {/* Main Image */}
      <motion.div 
        className="absolute inset-0 z-100 flex items-center justify-center"
        variants={{
            initial: { scale: 1, y: 0 },
            hover: { scale: 1.3, y: -20 },
        }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
      >
        <Image
          src={imageSrc}
          alt={tag}
          width={160}
          height={160}
          className="w-32 h-32 sm:w-36 sm:h-36 lg:w-40 lg:h-40 object-contain"
        />
      </motion.div>
      
      {/* Content */}
      <div className="relative z-20 rounded-lg border bg-background/80 p-4 backdrop-blur-sm dark:bg-background/60">
        <span
          className="mb-2 inline-block rounded-full px-3 py-1 text-xs font-semibold"
          style={{ 
            backgroundColor: 'var(--feature-color-dark)', 
            color: 'var(--feature-color)' 
          }}
        >
          {tag}
        </span>
        <p className="text-base text-card-foreground">{title}</p>
      </div>
    </motion.div>
  );
});
AnimatedFeatureCard.displayName = "AnimatedFeatureCard";

export { AnimatedFeatureCard };