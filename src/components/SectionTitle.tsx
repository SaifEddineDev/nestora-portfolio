import React from 'react';

interface SectionTitleProps {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  light?: boolean;
  className?: string;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  badge,
  title,
  subtitle,
  align = 'center',
  light = false,
  className = '',
}) => {
  const isCenter = align === 'center';

  return (
    <div className={`mb-12 ${isCenter ? 'text-center mx-auto max-w-2xl' : 'max-w-2xl'} ${className}`}>
      {badge && (
        <span
          className={`inline-block text-xs uppercase tracking-[0.2em] font-semibold mb-3 px-3 py-1 rounded-full ${
            light
              ? 'bg-white/10 text-white/90 border border-white/20'
              : 'bg-[#C59B63]/10 text-[#A87B40] border border-[#C59B63]/20'
          }`}
        >
          {badge}
        </span>
      )}
      <h2
        className={`font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight ${
          light ? 'text-white' : 'text-[#121316]'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 text-base sm:text-lg leading-relaxed ${
            light ? 'text-zinc-300' : 'text-zinc-600'
          }`}
        >
          {subtitle}
        </p>
      )}
      <div
        className={`mt-5 h-[2px] w-12 bg-[#C59B63] ${
          isCenter ? 'mx-auto' : ''
        }`}
      />
    </div>
  );
};
