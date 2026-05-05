import React, { HTMLAttributes } from 'react';

type CardVariant = 'white' | 'pink' | 'light' | 'yellow' | 'blue' | 'black' | 'orange' | 'green' | 'purple' | 'gray';
type HoverEffect = 'lift' | 'tilt' | 'glow' | 'none';

interface NeoCardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  hoverEffect?: HoverEffect;
  noPadding?: boolean;
}

const variantStyles: Record<CardVariant, string> = {
  white:  'bg-neo-white text-neo-black border-neo-black shadow-neo',
  pink:   'bg-neo-pink text-neo-white border-neo-black shadow-neo',
  light:  'bg-neo-light text-neo-black border-neo-black shadow-neo',
  yellow: 'bg-neo-yellow text-neo-black border-neo-black shadow-neo',
  blue:   'bg-neo-blue text-neo-black border-neo-black shadow-neo',
  black:  'bg-neo-black text-neo-white border-neo-black shadow-neo-yellow',
  orange: 'bg-neo-orange text-neo-white border-neo-black shadow-neo',
  green:  'bg-neo-green text-neo-black border-neo-black shadow-neo',
  purple: 'bg-neo-purple text-neo-white border-neo-black shadow-neo',
  gray:   'bg-neo-gray text-neo-black border-neo-black shadow-neo',
};

const hoverStyles: Record<HoverEffect, string> = {
  lift:  'hover:-translate-y-1 hover:-translate-x-0.5 hover:shadow-neo-lg transition-all duration-200',
  tilt:  'hover:rotate-1 hover:shadow-neo-md transition-all duration-200',
  glow:  'hover:ring-4 hover:ring-neo-orange transition-all duration-200',
  none:  '',
};

const NeoCard: React.FC<NeoCardProps> = ({
  children,
  variant = 'white',
  hoverEffect = 'none',
  noPadding = false,
  className = '',
  ...props
}) => {
  return (
    <div
      className={[
        'border-4 rounded-neo',
        variantStyles[variant],
        hoverStyles[hoverEffect],
        noPadding ? '' : 'p-6',
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </div>
  );
};

export default NeoCard;
