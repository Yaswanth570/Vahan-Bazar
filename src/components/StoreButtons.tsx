import React from 'react';
import { cn } from '@/lib/utils';

type StoreButtonProps = {
  href?: string;
  className?: string;
  title?: string;
};

export const AppStoreButton: React.FC<StoreButtonProps> = ({
  href = '#',
  className,
  title = 'Download on the App Store',
}) => (
  <a href={href} aria-label={title} title={title} className={cn('inline-block', className)} rel="noopener noreferrer">
    <span className="sr-only">{title}</span>
    <svg
      viewBox="0 0 135 40"
      width="135"
      height="40"
      xmlns="http://www.w3.org/2000/svg"
      className="rounded-lg shadow-sm"
    >
      <rect width="135" height="40" rx="8" fill="#000" className="dark:fill-black fill-black" />
      <g transform="translate(10,8)">
        <path fill="#fff" d="M24.6 13.6c-.2 1.6.5 3.2 1.8 4.2-.7 1.1-1.7 2.1-3 2.1-1.3 0-1.7-.6-3.2-.6-1.5 0-2 .6-3.2.6-1.3 0-2.3-1.1-3-2.1-1.7-2.4-1.5-6 .9-7.9 1-.8 2.3-1.2 3.6-1 .9 0 1.8.7 2.4.7.6 0 1.7-.8 2.9-.7.5 0 2 .2 3 1.6-1 .6-1.7 1.5-2 2.7z" />
        <path fill="#fff" d="M22.4 5.3c.5-.7.8-1.6.7-2.6-.9.1-1.8.6-2.4 1.3-.5.6-.9 1.6-.8 2.5.9 0 1.8-.5 2.5-1.2z" />
      </g>
      <text x="48" y="16" fill="#fff" fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial" fontSize="8">Download on the</text>
      <text x="48" y="30" fill="#fff" fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial" fontSize="14" fontWeight="bold">App Store</text>
    </svg>
  </a>
);

export const PlayStoreButton: React.FC<StoreButtonProps> = ({
  href = '#',
  className,
  title = 'Get it on Google Play',
}) => (
  <a href={href} aria-label={title} title={title} className={cn('inline-block', className)} rel="noopener noreferrer">
    <span className="sr-only">{title}</span>
    <svg
      viewBox="0 0 135 40"
      width="135"
      height="40"
      xmlns="http://www.w3.org/2000/svg"
      className="rounded-lg shadow-sm"
    >
      <rect width="135" height="40" rx="8" fill="#000" className="dark:fill-black fill-black" />
      <g transform="translate(10,10)">
        <polygon fill="#00c853" points="0,10 0,0 6,5" />
        <polygon fill="#ffab00" points="0,10 6,5 12,9" />
        <polygon fill="#2962ff" points="0,0 12,1 6,5" />
        <polygon fill="#ff3d00" points="12,1 12,9 6,5" />
      </g>
      <text x="48" y="16" fill="#fff" fontFamily="Roboto, 'Segoe UI', Helvetica, Arial" fontSize="8">GET IT ON</text>
      <text x="48" y="30" fill="#fff" fontFamily="Roboto, 'Segoe UI', Helvetica, Arial" fontSize="14" fontWeight="bold">Google Play</text>
    </svg>
  </a>
);
