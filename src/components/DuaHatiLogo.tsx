import React from 'react';

interface DuaHatiLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'color' | 'white';
  showSubtitle?: boolean;
}

export const DuaHatiLogo: React.FC<DuaHatiLogoProps> = ({
  className = '',
  size = 'md',
  variant = 'color',
  showSubtitle = true,
}) => {
  const isWhite = variant === 'white';

  const iconSizes = {
    sm: { width: 32, height: 20 },
    md: { width: 44, height: 26 },
    lg: { width: 56, height: 34 },
  };

  const textSizes = {
    sm: { title: 'text-base font-bold', subtitle: 'text-[9px] tracking-[0.2em]' },
    md: { title: 'text-xl font-bold tracking-tight', subtitle: 'text-[10px] tracking-[0.22em]' },
    lg: { title: 'text-2xl font-bold tracking-tight', subtitle: 'text-xs tracking-[0.25em]' },
  };

  const dim = iconSizes[size];

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Interlocking Rings SVG */}
      <svg
        width={dim.width}
        height={dim.height}
        viewBox="0 0 76 46"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        <g>
          {/* Left Ring: Forest/Emerald Green */}
          <circle
            cx="26"
            cy="23"
            r="19"
            stroke={isWhite ? '#ffffff' : '#2D6A4F'}
            strokeWidth="5"
            strokeLinecap="round"
          />
          {/* Right Ring: Dusty Rose */}
          <circle
            cx="50"
            cy="23"
            r="19"
            stroke={isWhite ? '#fecdd3' : '#C27B88'}
            strokeWidth="5"
            strokeLinecap="round"
          />
          {/* Golden Heart in overlapping union */}
          <path
            d="M38 31.5C38 31.5 31 26 31 20.5C31 17.5 33.5 15.2 36.5 15.2C37.8 15.2 38.8 15.9 39.5 16.8C40.2 15.9 41.2 15.2 42.5 15.2C45.5 15.2 48 17.5 48 20.5C48 26 41 31.5 41 31.5L39.5 32.8L38 31.5Z"
            fill={isWhite ? '#fde047' : '#D49B6A'}
            opacity="0.95"
          />
        </g>
      </svg>

      {/* Text Branding */}
      <div className="flex flex-col justify-center leading-none">
        <span
          className={`${textSizes[size].title} ${
            isWhite ? 'text-white' : 'text-[#111827]'
          } font-extrabold`}
          style={{ letterSpacing: '-0.02em' }}
        >
          DuaHati
        </span>
        {showSubtitle && (
          <span
            className={`${textSizes[size].subtitle} font-bold mt-0.5 ${
              isWhite ? 'text-emerald-100' : 'text-[#2D6A4F]'
            } uppercase`}
          >
            Tabungan Bersama
          </span>
        )}
      </div>
    </div>
  );
};
