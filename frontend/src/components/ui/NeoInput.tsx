import React, { InputHTMLAttributes, TextareaHTMLAttributes, forwardRef } from 'react';

interface NeoInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

interface NeoTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const NeoInput = forwardRef<HTMLInputElement, NeoInputProps>(({
  label,
  error,
  hint,
  leftIcon,
  rightIcon,
  className = '',
  id,
  ...props
}, ref) => {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-black uppercase tracking-wide text-neo-black"
        >
          {label}
          {props.required && <span className="text-neo-pink ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neo-black/60 pointer-events-none">
            {leftIcon}
          </span>
        )}
        <input
          ref={ref}
          id={inputId}
          className={[
            'w-full border-4 border-neo-black bg-neo-white text-neo-black font-bold',
            'rounded-neo shadow-neo-sm',
            'py-3 text-base',
            leftIcon  ? 'pl-11 pr-4' : 'px-4',
            rightIcon ? 'pr-11'      : '',
            'placeholder:text-neo-black/40 placeholder:font-normal',
            'focus:outline-none focus:ring-4 focus:ring-neo-orange focus:ring-offset-2 focus:ring-offset-neo-yellow',
            'transition-shadow duration-150',
            error ? 'border-neo-pink ring-4 ring-neo-pink/30' : '',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            className,
          ].join(' ')}
          {...props}
        />
        {rightIcon && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-neo-black/60">
            {rightIcon}
          </span>
        )}
      </div>
      {error && (
        <p className="text-neo-pink text-sm font-bold flex items-center gap-1">
          <span>✕</span> {error}
        </p>
      )}
      {hint && !error && (
        <p className="text-neo-black/60 text-sm">{hint}</p>
      )}
    </div>
  );
});

NeoInput.displayName = 'NeoInput';

export const NeoTextarea = forwardRef<HTMLTextAreaElement, NeoTextareaProps>(({
  label,
  error,
  hint,
  className = '',
  id,
  rows = 4,
  ...props
}, ref) => {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-black uppercase tracking-wide text-neo-black"
        >
          {label}
          {props.required && <span className="text-neo-pink ml-1">*</span>}
        </label>
      )}
      <textarea
        ref={ref}
        id={inputId}
        rows={rows}
        className={[
          'w-full border-4 border-neo-black bg-neo-white text-neo-black font-bold',
          'rounded-neo shadow-neo-sm px-4 py-3 text-base resize-y',
          'placeholder:text-neo-black/40 placeholder:font-normal',
          'focus:outline-none focus:ring-4 focus:ring-neo-orange focus:ring-offset-2 focus:ring-offset-neo-yellow',
          'transition-shadow duration-150',
          error ? 'border-neo-pink ring-4 ring-neo-pink/30' : '',
          className,
        ].join(' ')}
        {...props}
      />
      {error && (
        <p className="text-neo-pink text-sm font-bold flex items-center gap-1">
          <span>✕</span> {error}
        </p>
      )}
      {hint && !error && (
        <p className="text-neo-black/60 text-sm">{hint}</p>
      )}
    </div>
  );
});

NeoTextarea.displayName = 'NeoTextarea';

export default NeoInput;
