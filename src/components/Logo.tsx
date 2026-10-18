import React from 'react';

interface LogoProps {
  variant?: 'light' | 'dark' | 'auto';
  isScrolled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'auto',
  isScrolled = false,
  size = 'md',
  className = '',
}) => {
  // Determine if text/elements should render light (for dark backgrounds) or dark
  const isLight = variant === 'light' || (variant === 'auto' && !isScrolled);

  const emblemSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  const titleSizes = {
    sm: 'text-lg tracking-[0.22em]',
    md: 'text-2xl tracking-[0.22em] max-sm:text-xl max-sm:tracking-[0.16em]',
    lg: 'text-3xl tracking-[0.24em]',
  };

  const subtitleSizes = {
    sm: 'text-[7.5px] tracking-[0.3em]',
    md: 'text-[9.5px] tracking-[0.32em] max-sm:text-[7px] max-sm:tracking-[0.14em]',
    lg: 'text-[11px] tracking-[0.36em]',
  };

  return (
    <div className={`group flex items-center gap-3 select-none ${className}`}>
      {/* Architectural Monogram Emblem */}
      <div className={`relative ${emblemSizes[size]} shrink-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-105`}>
        {/* Glow behind emblem on hover */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-[#C59B63] to-[#E6CA9E] opacity-20 blur-md group-hover:opacity-45 transition-opacity duration-300" />

        {/* Emblem SVG Container with layered architectural lines */}
        <svg
          viewBox="0 0 44 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-sm transition-all duration-300"
        >
          <defs>
            {/* Rich gold gradient */}
            <linearGradient id="nestoraGoldGrad" x1="4" y1="4" x2="40" y2="40" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#DFB77D" />
              <stop offset="50%" stopColor="#C59B63" />
              <stop offset="100%" stopColor="#9E7339" />
            </linearGradient>

            {/* Subtle inner background gradient */}
            <linearGradient id="nestoraBaseDark" x1="0" y1="0" x2="44" y2="44" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#1E2025" />
              <stop offset="100%" stopColor="#0D0E11" />
            </linearGradient>

            <linearGradient id="nestoraBaseLight" x1="0" y1="0" x2="44" y2="44" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#252830" />
              <stop offset="100%" stopColor="#121316" />
            </linearGradient>
          </defs>

          {/* Luxury Rounded Square Bezel */}
          <rect
            x="1.5"
            y="1.5"
            width="41"
            height="41"
            rx="11"
            fill="url(#nestoraBaseDark)"
            stroke="url(#nestoraGoldGrad)"
            strokeWidth="1.5"
            className="transition-colors duration-300"
          />

          {/* Minimalist Architectural Roof / Diamond Zenith */}
          <path
            d="M22 8.5L34 17.5V33.5C34 34.6 33.1 35.5 32 35.5H12C10.9 35.5 10 34.6 10 33.5V17.5L22 8.5Z"
            stroke="url(#nestoraGoldGrad)"
            strokeWidth="1.2"
            strokeOpacity="0.4"
            fill="none"
          />

          {/* Modern Geometric 'N' & Keyhole Arch */}
          {/* Left Vertical Column */}
          <line
            x1="16"
            y1="16.5"
            x2="16"
            y2="31.5"
            stroke="url(#nestoraGoldGrad)"
            strokeWidth="2.4"
            strokeLinecap="round"
          />

          {/* Dynamic Diagonal Ribbon */}
          <path
            d="M16 17L28 31"
            stroke="url(#nestoraGoldGrad)"
            strokeWidth="2.4"
            strokeLinecap="round"
          />

          {/* Right Vertical Column */}
          <line
            x1="28"
            y1="16.5"
            x2="28"
            y2="31.5"
            stroke="url(#nestoraGoldGrad)"
            strokeWidth="2.4"
            strokeLinecap="round"
          />

          {/* Prestige Golden North-Star Sparkle at Zenith */}
          <circle cx="22" cy="8.5" r="1.5" fill="#F4DEB3" />
        </svg>
      </div>

      {/* Typography Block */}
      <div className="flex flex-col justify-center">
        <div className="flex items-center gap-1.5">
          <span
            className={`font-serif font-bold ${titleSizes[size]} uppercase leading-none transition-colors duration-300 ${
              isLight ? 'text-white' : 'text-[#121316]'
            }`}
          >
            NESTORA
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#C59B63] self-baseline mt-1 group-hover:scale-125 transition-transform duration-300" />
        </div>

        <div className="flex items-center gap-1 mt-1">
          <span
            className={`font-sans font-medium uppercase whitespace-nowrap ${subtitleSizes[size]} transition-colors duration-300 ${
              isLight ? 'text-zinc-300/90' : 'text-zinc-500'
            }`}
          >
            Immobilier d'Exception
          </span>
        </div>
      </div>
    </div>
  );
};
