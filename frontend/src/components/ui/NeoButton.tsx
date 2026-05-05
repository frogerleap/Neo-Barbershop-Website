import React, { ButtonHTMLAttributes } from 'react';

interface NeoButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'outline' | 'ghost' | 'yellow' | 'blue' | 'pink';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const variantStyles: Record<string, string> = {
  primary:   'bg-neo-black text-neo-white border-neo-black hover:bg-neo-orange hover:border-neo-orange hover:text-neo-white',
  secondary: 'bg-neo-white text-neo-black border-neo-black hover:bg-neo-light',
  danger:    'bg-neo-pink text-neo-white border-neo-pink hover:brightness-90',
  outline:   'bg-transparent text-neo-black border-neo-black hover:bg-neo-black hover:text-neo-white',
  ghost:     'bg-transparent text-neo-black border-transparent hover:bg-neo-black/10',
  yellow:    'bg-neo-yellow text-neo-black border-neo-black hover:bg-neo-orange hover:text-neo-white hover:border-neo-orange',
  blue:      'bg-neo-blue text-neo-black border-neo-black hover:brightness-90',
  pink:      'bg-neo-pink text-neo-white border-neo-black hover:brightness-90',
};

const sizeStyles: Record<string, string> = {
  xs: 'px-3 py-1.5 text-xs',
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
  xl: 'px-10 py-5 text-xl',
};

const NeoButton: React.FC<NeoButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  icon,
  iconPosition = 'left',
  className = '',
  disabled,
  ...props
}) => {
  const isDisabled = disabled || loading;

  return (
    <button
      disabled={isDisabled}
      className={[
        'inline-flex items-center justify-center gap-2',
        'font-black uppercase tracking-wide',
        'border-4 rounded-neo',
        'shadow-neo transition-all duration-150',
        'active:translate-x-1 active:translate-y-1 active:shadow-neo-xs',
        'hover:-translate-y-0.5 hover:shadow-neo-md',
        'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-neo-orange focus-visible:ring-offset-2',
        isDisabled ? 'opacity-60 cursor-not-allowed pointer-events-none' : 'cursor-pointer',
        fullWidth ? 'w-full' : '',
        variantStyles[variant],
        sizeStyles[size],
        className,
      ].join(' ')}
      {...props}
    >
      {loading && (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
        </svg>
      )}
      {!loading && icon && iconPosition === 'left' && icon}
      {children}
      {!loading && icon && iconPosition === 'right' && icon}
    </button>
  );
};

export default NeoButton;
