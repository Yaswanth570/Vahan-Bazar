import React from 'react';
import { Bike } from 'lucide-react';
import { cn } from '@/lib/utils';

export type BikeLogoProps = {
  size?: number;            // square size in px
  showText?: boolean;       // render brand text next to the logo
  text?: string;            // brand text
  className?: string;       // container className
};

/**
 * BikeLogo
 * Bright, theme-proof bike logo using vivid gradients and Tailwind dark: variants.
 * - The emblem uses a high-contrast gradient ring.
 * - Inner tile remains bright in both themes (white) for maximum icon visibility.
 * - The icon color adapts with dark: utilities to remain vivid.
 */
const BikeLogo: React.FC<BikeLogoProps> = ({
  size = 40,
  showText = false,
  text = 'Vahan Bazar',
  className,
}) => {
  return (
    <>
      <Bike
        className={cn(
          'transition-colors duration-300',
          // vivid icon color for light background
          'text-blue-600',
          // adapt to dark mode while inner remains white -> keep vivid
          'dark:text-blue-700',
          className
        )}
        style={{ width: size, height: size }}
        aria-label="Bike Logo"
      />

      {showText && (
        <span
          className={cn(
            'text-2xl font-bold tracking-tight',
            // vivid gradient text for light
            'bg-gradient-to-br from-sky-500 to-blue-600 bg-clip-text text-transparent',
            // vivid gradient text for dark
            'dark:from-cyan-300 dark:to-sky-400'
          )}
        >
          {text}
        </span>
      )}
    </>
  );
};

export default BikeLogo;
