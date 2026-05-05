import React, { useState } from 'react';
import NeoCard from '../../components/ui/NeoCard';
import NeoBadge, { BadgeStatus } from '../../components/ui/NeoBadge';
import NeoButton from '../../components/ui/NeoButton';
import { useAuthStore } from '../../store/authStore';

// ── Mock schedule for today ────────────────────────────────
const todaySchedule = [
  { id: 'sc1', time: '09:00', customer: 'Rizky Pratama',   service: 'Skin Fade',     status: 'completed' as BadgeStatus, duration: 45 },
  { id: 'sc2', time: '10:30', customer: 'Doni Setiawan',   service: 'Hair & Beard',  status: 'completed' as BadgeStatus, duration: 60 },
  { id: 'sc3', time: '13:00', customer: 'Andi Maulana',    service: 'Classic Cut',   status: 'confirmed' as BadgeStatus, duration: 30 },
  { id: 'sc4', time: '14:00', customer: 'Faiz Ramadhan',   service: 'Full Package',  status: 'confirmed' as BadgeStatus, duration: 90 },
  { id: 'sc5', time: '16:30', customer: 'Budi Hartono',    service: 'Beard Grooming',status: 'pending'   as BadgeStatus, duration: 25 },
];

const weeklyStats = [
  { day: 'Sen', cuts: 8  },
  { day: 'Sel', cuts: 12 },
  { day: 'Rab', cuts: 10 },
  { day: 'Kam', cuts: 15 },
  { day: 'Jum', cuts: 18 },
  { day: 'Sab', cuts: 22 },
  { day: 'Min', cuts: 5  },
];
const maxCuts = Math.max(...weeklyStats.map((w) => w.cuts));

const BarberDashboard: React.FC = () => {
  const { user } = useAuthStore();
  const [schedule, setSchedule] = useState(todaySchedule);

  const updateStatus = (id: string, status: BadgeStatus) => {
    setSchedule((prev) => prev.map((s) => (s.id === id ? { ...s, status } : s)));
  };

  const todayRevenue = schedule
    .filter((s) => s.status === 'completed')
    .length * 65000; // avg price

  const completedCount = schedule.filter((s) => s.status === 'completed').length;
  const remainingCount = schedule.filter((s) => s.status === 'confirmed' || s.status === 'pending').length;

  return (
    <div className="py-10 px-6 md:px-12 lg:px-20 max-w-screen-xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div>
          <p className="text-neo-blue font-black uppercase text-sm tracking-widest mb-1">Barber Panel</p>
          <h1 className="text-5xl md:text-6xl font-display">
            {user?.name.split('"')[0].trim() || 'Barber'} 💈
          </h1>
          <p className="text-neo-black/60 font-bold mt-1">
            {new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>
        <div className="flex flex-col gap-2 items-end">
          <span className="bg-neo-green border-4 border-neo-black text-neo-black font-black uppercase text-sm px-4 py-2 rounded-neo shadow-neo animate-pulse2">
            🟢 Available
          </span>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {[
          { label: "Today's Cuts",   value: completedCount, icon: '✂️',  bg: 'bg-neo-blue'  },
          { label: 'Remaining',      value: remainingCount, icon: '⏳',  bg: 'bg-neo-yellow'},
          { label: "Today's Revenue",value: `Rp ${(todayRevenue/1000).toFixed(0)}K`, icon: '💰', bg: 'bg-neo-green'},
          { label: 'Rating',         value: '4.9 ⭐',       icon: '🏆',  bg: 'bg-neo-pink'  },
        ].map((s) => (
          <div key={s.label} className={`${s.bg} border-4 border-neo-black rounded-neo shadow-neo p-5 hover:-translate-y-0.5 hover:shadow-neo-md transition-all`}>
            <span className="text-3xl block mb-2">{s.icon}</span>
            <p className="text-3xl font-display">{s.value}</p>
            <p className="text-xs font-black uppercase text-neo-black/70">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Today's Schedule */}
        <div className="lg:col-span-2">
          <h2 className="text-3xl font-display mb-4">Today's Schedule</h2>
          <div className="flex flex-col gap-3">
            {schedule.map((appt) => (
              <div
                key={appt.id}
                className={[
                  'bg-neo-white border-4 border-neo-black rounded-neo shadow-neo p-5',
                  'flex items-center gap-4 justify-between flex-wrap',
                  appt.status === 'completed' ? 'opacity-60' : '',
                ].join(' ')}
              >
                {/* Time & Info */}
                <div className="flex items-center gap-4">
                  <div className="text-center bg-neo-black text-neo-white rounded-neo px-3 py-2 min-w-[56px]">
                    <p className="font-display text-lg leading-none">{appt.time}</p>
                    <p className="text-[10px] font-bold text-neo-white/60">{appt.duration}m</p>
                  </div>
                  <div>
                    <p className="font-black text-base uppercase">{appt.customer}</p>
                    <p className="text-sm font-bold text-neo-black/60">{appt.service}</p>
                  </div>
                </div>
                {/* Actions */}
                <div className="flex items-center gap-3">
                  <NeoBadge status={appt.status} size="md" />
                  {appt.status === 'confirmed' && (
                    <NeoButton
                      variant="green"
                      size="xs"
                      onClick={() => updateStatus(appt.id, 'completed')}
                      id={`complete-${appt.id}`}
                    >
                      ✓ Done
                    </NeoButton>
                  )}
                  {appt.status === 'pending' && (
                    <div className="flex gap-2">
                      <NeoButton
                        variant="blue"
                        size="xs"
                        onClick={() => updateStatus(appt.id, 'confirmed')}
                      >
                        Accept
                      </NeoButton>
                      <NeoButton
                        variant="danger"
                        size="xs"
                        onClick={() => updateStatus(appt.id, 'cancelled')}
                      >
                        Decline
                      </NeoButton>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Chart */}
        <div>
          <h2 className="text-3xl font-display mb-4">This Week</h2>
          <NeoCard variant="white">
            <div className="flex items-end justify-between gap-2 h-36">
              {weeklyStats.map((w) => (
                <div key={w.day} className="flex flex-col items-center gap-1 flex-1">
                  <span className="text-xs font-black">{w.cuts}</span>
                  <div
                    className="w-full bg-neo-orange border-2 border-neo-black rounded-neo transition-all"
                    style={{ height: `${(w.cuts / maxCuts) * 100}%`, minHeight: '6px' }}
                  />
                  <span className="text-[10px] font-black uppercase text-neo-black/60">{w.day}</span>
                </div>
              ))}
            </div>
            <div className="border-t-4 border-neo-black mt-4 pt-4 flex justify-between">
              <div>
                <p className="text-2xl font-display">{weeklyStats.reduce((a, b) => a + b.cuts, 0)}</p>
                <p className="text-xs font-black uppercase text-neo-black/60">Total Cuts</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-display text-neo-green">+12%</p>
                <p className="text-xs font-black uppercase text-neo-black/60">vs Last Week</p>
              </div>
            </div>
          </NeoCard>

          {/* Profile Card */}
          <h2 className="text-3xl font-display mt-6 mb-4">My Profile</h2>
          <NeoCard variant="black" className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="text-5xl">{user?.avatar || '💈'}</span>
              <div>
                <p className="font-display text-xl text-neo-white">{user?.name}</p>
                <p className="text-neo-white/50 text-sm font-bold">{user?.email}</p>
              </div>
            </div>
            <div className="border-t-4 border-neo-white/20 pt-3">
              <p className="text-neo-yellow font-black uppercase text-xs">Skin Fade Specialist</p>
            </div>
            <NeoButton variant="yellow" size="sm" fullWidth>Edit Profile</NeoButton>
          </NeoCard>
        </div>
      </div>
    </div>
  );
};

export default BarberDashboard;
