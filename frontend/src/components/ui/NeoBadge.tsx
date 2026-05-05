import React from 'react';

export type BadgeStatus =
  | 'pending'
  | 'confirmed'
  | 'completed'
  | 'cancelled'
  | 'paid'
  | 'unpaid'
  | 'expired'
  | 'active'
  | 'inactive';

interface NeoBadgeProps {
  status: BadgeStatus;
  className?: string;
  size?: 'sm' | 'md';
}

const badgeConfig: Record<BadgeStatus, { label: string; bg: string; dot: string }> = {
  pending:   { label: 'Pending',   bg: 'bg-neo-yellow border-neo-black text-neo-black',   dot: 'bg-neo-orange' },
  confirmed: { label: 'Confirmed', bg: 'bg-neo-blue border-neo-black text-neo-black',     dot: 'bg-neo-black'  },
  completed: { label: 'Completed', bg: 'bg-neo-green border-neo-black text-neo-black',    dot: 'bg-neo-black'  },
  cancelled: { label: 'Cancelled', bg: 'bg-neo-pink border-neo-black text-neo-white',     dot: 'bg-neo-white'  },
  paid:      { label: 'Paid',      bg: 'bg-neo-green border-neo-black text-neo-black',    dot: 'bg-neo-black'  },
  unpaid:    { label: 'Unpaid',    bg: 'bg-neo-orange border-neo-black text-neo-white',   dot: 'bg-neo-white'  },
  expired:   { label: 'Expired',   bg: 'bg-neo-black/20 border-neo-black text-neo-black', dot: 'bg-neo-black'  },
  active:    { label: 'Active',    bg: 'bg-neo-green border-neo-black text-neo-black',    dot: 'bg-neo-black'  },
  inactive:  { label: 'Inactive',  bg: 'bg-neo-gray border-neo-black text-neo-black',     dot: 'bg-neo-black'  },
};

const NeoBadge: React.FC<NeoBadgeProps> = ({ status, className = '', size = 'sm' }) => {
  const config = badgeConfig[status];
  const sizeStyle = size === 'sm'
    ? 'px-2.5 py-1 text-xs'
    : 'px-3.5 py-1.5 text-sm';

  return (
    <span
      className={[
        'inline-flex items-center gap-1.5 font-black uppercase tracking-wide',
        'border-2 rounded-neo',
        config.bg,
        sizeStyle,
        className,
      ].join(' ')}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot} flex-shrink-0`} />
      {config.label}
    </span>
  );
};

export default NeoBadge;
