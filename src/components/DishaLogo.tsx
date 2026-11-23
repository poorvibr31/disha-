import React, { useId } from 'react';

interface DishaLogoProps {
  variant?: 'header' | 'footer';
  className?: string;
}

export const DishaCompassIcon: React.FC<{ className?: string }> = ({
  className = 'w-12 h-12 shrink-0',
}) => {
  const gradId = useId();

  return (
    <svg
      className={className}
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id={gradId}
          x1="4"
          y1="4"
          x2="44"
          y2="44"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#2c58e8" />
          <stop offset="100%" stopColor="#4f46e5" />
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="13" fill={`url(#${gradId})`} />
      <rect
        x="1.25"
        y="1.25"
        width="45.5"
        height="45.5"
        rx="11.75"
        stroke="rgba(255,255,255,0.22)"
        strokeWidth="1.5"
      />
      <circle
        cx="24"
        cy="24"
        r="14.5"
        stroke="rgba(255,255,255,0.9)"
        strokeWidth="2"
      />
      <path
        d="M24 9.5V12M24 36V38.5M9.5 24H12M36 24H38.5"
        stroke="rgba(255,255,255,0.75)"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <polygon points="32.5,15.5 26.8,26.8 21.2,21.2" fill="#ffffff" />
      <polygon points="15.5,32.5 21.2,21.2 26.8,26.8" fill="#c7d2fe" />
      <circle
        cx="24"
        cy="24"
        r="2.1"
        fill="#3b4ee8"
        stroke="#ffffff"
        strokeWidth="1.25"
      />
    </svg>
  );
};

export const DishaBrandLockup: React.FC<DishaLogoProps> = ({
  variant = 'header',
  className = '',
}) => {
  const isFooter = variant === 'footer';

  return (
    <span className={`inline-flex items-center gap-3.5 ${className}`}>
      <DishaCompassIcon className="w-12 h-12 shrink-0 transition-transform duration-200 group-hover:scale-[1.03]" />
      <span className="flex flex-col justify-center">
        <span
          className={`font-[family-name:var(--f-head)] font-extrabold leading-none tracking-[-0.02em] whitespace-nowrap ${
            isFooter
              ? 'text-[22px] text-white'
              : 'text-[25px] sm:text-[27px] text-[var(--fg)]'
          }`}
        >
          Disha{' '}
          <span className={isFooter ? 'text-[#a5b4fc]' : 'text-[var(--blue)]'}>
            Career
          </span>
        </span>
        <span
          className={`text-[12px] font-semibold tracking-[0.01em] mt-1 leading-none whitespace-nowrap ${
            isFooter ? 'text-[var(--hero-muted)]' : 'text-[var(--muted)]'
          }`}
        >
          Guidance &amp; Information Portal
        </span>
      </span>
    </span>
  );
};
