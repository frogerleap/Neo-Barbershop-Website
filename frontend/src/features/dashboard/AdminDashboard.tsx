import React, { useState } from 'react';
import NeoCard from '../../components/ui/NeoCard';
import NeoBadge, { BadgeStatus } from '../../components/ui/NeoBadge';
import NeoButton from '../../components/ui/NeoButton';
import { dummyBarbers } from '../../data/dummy';

// ── Mock recent bookings ───────────────────────────────────
const recentBookings = [
  { id: 'bk1', customer: 'Rizky P.',   service: 'Skin Fade',   barber: 'Alex',  time: '09:00', date: '05 Mei', amount: 65000,  status: 'completed' as BadgeStatus },
  { id: 'bk2', customer: 'Doni S.',    service: 'Full Package', barber: 'Ben',   time: '10:30', date: '05 Mei', amount: 120000, status: 'confirmed' as BadgeStatus },
  { id: 'bk3', customer: 'Andi M.',    service: 'Classic Cut',  barber: 'Alex',  time: '13:00', date: '05 Mei', amount: 50000,  status: 'confirmed' as BadgeStatus },
  { id: 'bk4', customer: 'Faiz R.',    service: 'Hair & Beard', barber: 'Charlie',time: '14:30',date: '04 Mei', amount: 85000,  status: 'completed' as BadgeStatus },
  { id: 'bk5', customer: 'Budi H.',    service: 'Beard Grooming',barber: 'Charlie',time:'09:00', date: '04 Mei', amount: 45000, status: 'cancelled' as BadgeStatus },
];

// ── Mini Stat Card ─────────────────────────────────────────
const MiniStat: React.FC<{
  label: string; value: string | number; icon: string; change?: string; positive?: boolean;
  variant?: 'yellow' | 'blue' | 'pink' | 'green' | 'orange' | 'white';
}> = ({ label, value, icon, change, positive = true, variant = 'white' }) => (
  <NeoCard variant={variant} hoverEffect="lift" className="flex flex-col gap-2">
    <div className="flex items-center justify-between">
      <span className="text-3xl">{icon}</span>
      {change && (
        <span className={`text-xs font-black px-2 py-0.5 rounded-neo border-2 border-neo-black ${positive ? 'bg-neo-green' : 'bg-neo-pink text-neo-white'}`}>
          {positive ? '↑' : '↓'} {change}
        </span>
      )}
    </div>
    <p className="text-4xl font-display">{value}</p>
    <p className="text-xs font-black uppercase text-current/60">{label}</p>
  </NeoCard>
);

// ── AdminDashboard ─────────────────────────────────────────
const AdminDashboard: React.FC = () => {
  const [bookings, setBookings] = useState(recentBookings);

  const updateStatus = (id: string, status: BadgeStatus) => {
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)));
  };

  const formatPrice = (n: number) => `Rp ${n.toLocaleString('id-ID')}`;

  const revenue = bookings
    .filter((b) => b.status === 'completed')
    .reduce((s, b) => s + b.amount, 0);

  return (
    <div>
      {/* Page Title */}
      <div className="mb-8">
        <h1 className="text-5xl font-display border-b-4 border-neo-black pb-4">Overview</h1>
        <p className="text-neo-black/50 font-bold mt-2 text-sm">
          {new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        <MiniStat label="Total Bookings" value="128"       icon="📅" change="8%"   variant="yellow" />
        <MiniStat label="Active Barbers" value={dummyBarbers.filter(b => b.available).length} icon="💈" variant="blue" />
        <MiniStat label="Today's Revenue" value={`Rp ${(revenue/1000).toFixed(0)}K`} icon="💰" change="12%" variant="green" />
        <MiniStat label="Pending"        value={bookings.filter(b => b.status === 'pending').length} icon="⏳" positive={false} change="3" variant="pink" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
        {/* Recent Bookings Table */}
        <div>
          <h2 className="text-3xl font-display mb-4">Recent Bookings</h2>
          <div className="bg-neo-white border-4 border-neo-black shadow-neo rounded-neo overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[500px]">
              <thead>
                <tr className="bg-neo-orange border-b-4 border-neo-black">
                  <th className="p-4 font-display text-sm uppercase">Customer</th>
                  <th className="p-4 font-display text-sm uppercase">Service</th>
                  <th className="p-4 font-display text-sm uppercase">Status</th>
                  <th className="p-4 font-display text-sm uppercase">Action</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr key={b.id} className="border-b-4 border-neo-black hover:bg-neo-light transition-colors">
                    <td className="p-4">
                      <p className="font-black text-sm">{b.customer}</p>
                      <p className="text-xs text-neo-black/50 font-bold">{b.date} · {b.time}</p>
                    </td>
                    <td className="p-4">
                      <p className="font-bold text-sm">{b.service}</p>
                      <p className="text-xs text-neo-black/50 font-bold">{b.barber}</p>
                    </td>
                    <td className="p-4">
                      <NeoBadge status={b.status} />
                    </td>
                    <td className="p-4">
                      <div className="flex gap-1.5 flex-wrap">
                        {b.status === 'pending' && (
                          <>
                            <NeoButton size="xs" variant="blue"
                              onClick={() => updateStatus(b.id, 'confirmed')}
                              id={`confirm-${b.id}`}
                            >Confirm</NeoButton>
                            <NeoButton size="xs" variant="danger"
                              onClick={() => updateStatus(b.id, 'cancelled')}
                            >Cancel</NeoButton>
                          </>
                        )}
                        {b.status === 'confirmed' && (
                          <NeoButton size="xs" variant="yellow"
                            onClick={() => updateStatus(b.id, 'completed')}
                          >Mark Done</NeoButton>
                        )}
                        {(b.status === 'completed' || b.status === 'cancelled') && (
                          <span className="text-xs font-bold text-neo-black/40">—</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Barbers */}
        <div>
          <h2 className="text-3xl font-display mb-4">Barbers Performance</h2>
          <div className="flex flex-col gap-3">
            {dummyBarbers.map((barber, idx) => {
              const bookingCount = [45, 38, 28, 12][idx] || 10;
              const maxB = 45;
              const colorMap = ['neo-blue', 'neo-pink', 'neo-green', 'neo-purple'];
              return (
                <div
                  key={barber.id}
                  className="bg-neo-white border-4 border-neo-black rounded-neo shadow-neo p-4 hover:-translate-y-0.5 hover:shadow-neo-md transition-all"
                >
                  <div className="flex items-center gap-4 mb-3">
                    <div className={`w-12 h-12 bg-${colorMap[idx]} border-3 border-neo-black rounded-full flex items-center justify-center text-2xl shrink-0`}>
                      {barber.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <p className="font-display text-base truncate">{barber.name}</p>
                        <span className={`shrink-0 text-xs font-black ml-2 ${barber.available ? 'text-neo-green' : 'text-neo-pink'}`}>
                          {barber.available ? '● Online' : '● Off'}
                        </span>
                      </div>
                      <p className="text-xs font-bold text-neo-black/50">{barber.specialty}</p>
                    </div>
                  </div>
                  {/* Progress bar */}
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-3 bg-neo-light border-2 border-neo-black rounded-neo overflow-hidden">
                      <div
                        className={`h-full bg-${colorMap[idx]} transition-all duration-500`}
                        style={{ width: `${(bookingCount / maxB) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-black w-20 text-right">{bookingCount} bookings</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Revenue Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <NeoCard variant="black" className="md:col-span-2 flex flex-col gap-3">
          <h2 className="text-3xl font-display text-neo-white">Revenue Breakdown</h2>
          <div className="grid grid-cols-3 gap-4 mt-2">
            {[
              { label: 'Today',   value: formatPrice(revenue),    highlight: true  },
              { label: 'This Week', value: 'Rp 4.5M',            highlight: false },
              { label: 'This Month',value: 'Rp 18.2M',           highlight: false },
            ].map((r) => (
              <div key={r.label} className={`p-4 rounded-neo border-4 ${r.highlight ? 'border-neo-yellow bg-neo-yellow text-neo-black' : 'border-neo-white/20 bg-neo-white/10 text-neo-white'}`}>
                <p className={`text-2xl font-display ${r.highlight ? 'text-neo-black' : 'text-neo-yellow'}`}>{r.value}</p>
                <p className={`text-xs font-black uppercase ${r.highlight ? 'text-neo-black/70' : 'text-neo-white/50'}`}>{r.label}</p>
              </div>
            ))}
          </div>
        </NeoCard>

        <NeoCard variant="orange">
          <h3 className="text-2xl font-display mb-4">Quick Actions</h3>
          <div className="flex flex-col gap-3">
            <NeoButton variant="primary" size="sm" fullWidth id="admin-add-barber">+ Add Barber</NeoButton>
            <NeoButton variant="secondary" size="sm" fullWidth id="admin-add-service">+ Add Service</NeoButton>
            <NeoButton variant="outline"  size="sm" fullWidth id="admin-export">↓ Export Report</NeoButton>
          </div>
        </NeoCard>
      </div>
    </div>
  );
};

export default AdminDashboard;
