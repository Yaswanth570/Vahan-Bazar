// Animation utilities for Vahan Bazar
// These animations will help create a modern, award-winning UI experience

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.5 }
  }
};

export const slideInFromLeft = {
  hidden: { x: -100, opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: { 
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

export const slideInFromRight = {
  hidden: { x: 100, opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: { 
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

export const slideInFromBottom = {
  hidden: { y: 100, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { 
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

export const scaleUp = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: { 
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const hoverScale = {
  scale: 1.05,
  transition: { duration: 0.2 }
};

export const pulseAnimation = {
  scale: [1, 1.05, 1],
  transition: { 
    duration: 1.5,
    repeat: Infinity,
    repeatType: "loop" 
  }
};

export const shimmer = {
  hidden: { 
    backgroundPosition: "200% 0",
    opacity: 0.8
  },
  visible: { 
    backgroundPosition: "-200% 0",
    opacity: 1,
    transition: { 
      repeat: Infinity,
      duration: 1.5,
      ease: "linear"
    }
  }
};

// Use this for page transitions
export const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.3 }
};

// Helper function to add delay to animations
export const withDelay = (animation: any, delay: number) => {
  return {
    ...animation,
    visible: {
      ...animation.visible,
      transition: {
        ...animation.visible.transition,
        delay
      }
    }
  };
};