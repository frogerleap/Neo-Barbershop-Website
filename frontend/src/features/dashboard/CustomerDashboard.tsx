import React, { useState } from 'react';
import NeoCard from '../../components/ui/NeoCard';
import NeoBadge from '../../components/ui/NeoBadge';
import NeoButton from '../../components/ui/NeoButton';
import { NeoTextarea } from '../../components/ui/NeoInput';
import { useAuthStore } from '../../store/authStore';
import { dummyBookings, dummyServices, dummyBarbers } from '../../data/dummy';
import { Link } from 'react-router-dom';

// ── Stat Card ──────────────────────────────────────────────
const StatCard: React.FC<{
  label: string; value: string | number; icon: string;
  variant?: 'white' | 'yellow' | 'blue' | 'pink' | 'green' | 'orange';
}> = ({ label, value, icon, variant = 'white' }) => (
  <NeoCard variant={variant} hoverEffect="lift" className="flex items-center gap-4">
    <span className="text-4xl">{icon}</span>
    <div>
      <p className="text-3xl font-display">{value}</p>
      <p className="text-xs font-black uppercase text-current/70">{label}</p>
    </div>
  </NeoCard>
);

// ── Booking Row ────────────────────────────────────────────
const BookingRow: React.FC<{ booking: typeof dummyBookings[0], onReview: (id: string) => void }> = ({ booking, onReview }) => {
  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric', month: 'short' });
  const formatPrice = (p: number) => `Rp ${p.toLocaleString('id-ID')}`;

  return (
    <tr className="border-b-4 border-neo-black hover:bg-neo-light transition-colors group">
      <td className="p-4">
        <p className="font-black text-sm">{booking.serviceName}</p>
        <p className="text-xs text-neo-black/50 font-bold">{booking.barberName}</p>
      </td>
      <td className="p-4 font-bold text-sm">{formatDate(booking.date)} · {booking.time}</td>
      <td className="p-4">
        <NeoBadge status={booking.status} />
      </td>
      <td className="p-4 font-black text-sm">{formatPrice(booking.totalAmount)}</td>
      <td className="p-4">
        {booking.status === 'pending' && (
          <NeoButton variant="danger" size="xs">Cancel</NeoButton>
        )}
        {booking.status === 'completed' && (
          <div className="flex gap-2">
            <NeoButton variant="yellow" size="xs">Re-book</NeoButton>
            <NeoButton variant="primary" size="xs" onClick={() => onReview(booking.id)}>Review</NeoButton>
          </div>
        )}
      </td>
    </tr>
  );
};

// ── CustomerDashboard ──────────────────────────────────────
const CustomerDashboard: React.FC = () => {
  const { user } = useAuthStore();
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [selectedBookingForReview, setSelectedBookingForReview] = useState<string | null>(null);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(5);

  const totalSpent = dummyBookings
    .filter((b) => b.status === 'completed')
    .reduce((sum, b) => sum + b.totalAmount, 0);

  const upcomingCount = dummyBookings.filter(
    (b) => b.status === 'confirmed' || b.status === 'pending'
  ).length;

  const handleOpenReview = (bookingId: string) => {
    setSelectedBookingForReview(bookingId);
    setReviewText('');
    setRating(5);
    setReviewModalOpen(true);
  };

  const handleSubmitReview = () => {
    // Implement API call for submitting review here in the future
    alert(`Review submitted for booking ${selectedBookingForReview}!\nRating: ${rating} Stars\nReview: ${reviewText}`);
    setReviewModalOpen(false);
  };

  return (
    <div className="py-10 px-6 md:px-12 lg:px-20 max-w-screen-xl mx-auto relative">
      
      {/* Review Modal */}
      {reviewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neo-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-neo-white border-4 border-neo-black rounded-neo shadow-neo-lg w-full max-w-md p-6 relative animate-wiggle">
            
            <button 
              className="absolute -top-4 -right-4 bg-neo-pink border-4 border-neo-black w-10 h-10 rounded-full flex items-center justify-center font-black text-xl text-neo-white shadow-neo cursor-pointer hover:scale-110 transition-transform focus:outline-none" 
              onClick={() => setReviewModalOpen(false)}
            >
              ×
            </button>

            <h2 className="text-3xl font-display mb-2">Leave a Review</h2>
            <p className="font-bold text-neo-black/60 mb-6 text-sm">Bagaimana pengalaman potong rambutmu? Berikan penilaian agar kami bisa lebih baik lagi!</p>
            
            {/* Star Rating Selection */}
            <div className="mb-4">
              <label className="text-sm font-black uppercase tracking-wide text-neo-black mb-2 block">
                Penilaian <span className="text-neo-pink">*</span>
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className={`w-10 h-10 flex items-center justify-center text-2xl border-4 border-neo-black rounded-neo shadow-neo-sm transition-transform focus:outline-none focus:ring-4 focus:ring-neo-orange focus:ring-offset-1 hover:-translate-y-1 ${
                      star <= rating ? 'bg-neo-yellow' : 'bg-neo-white grayscale opacity-50'
                    }`}
                    aria-label={`Rate ${star} stars`}
                  >
                    ⭐
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <NeoTextarea 
                label="Review Kamu"
                placeholder="Tuliskan pengalamanmu di sini..."
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                rows={4}
                required
              />
            </div>

            <NeoButton variant="primary" className="w-full" onClick={handleSubmitReview} disabled={!reviewText.trim()}>
              Submit Review
            </NeoButton>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div>
          <p className="text-neo-orange font-black uppercase text-sm tracking-widest mb-1">My Dashboard</p>
          <h1 className="text-5xl md:text-6xl font-display">
            Hey, {user?.name.split(' ')[0]} 👋
          </h1>
          <p className="text-neo-black/60 font-bold mt-1">Berikut ringkasan aktivitas booking kamu.</p>
        </div>
        <Link to="/book">
          <NeoButton variant="primary" size="lg" id="dashboard-book-btn">
            + New Booking
          </NeoButton>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <StatCard label="Total Bookings"  value={dummyBookings.length} icon="📅" variant="yellow" />
        <StatCard label="Upcoming"        value={upcomingCount}         icon="⏳" variant="blue"   />
        <StatCard label="Completed"       value={dummyBookings.filter(b => b.status === 'completed').length} icon="✅" variant="green" />
        <StatCard label="Total Spent"     value={`Rp ${(totalSpent / 1000).toFixed(0)}K`} icon="💰" variant="pink" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Booking History Table */}
        <div className="lg:col-span-2">
          <h2 className="text-3xl font-display mb-4">Booking History</h2>
          <div className="bg-neo-white border-4 border-neo-black shadow-neo rounded-neo overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[560px]">
              <thead>
                <tr className="bg-neo-orange border-b-4 border-neo-black">
                  <th className="p-4 font-display text-sm uppercase">Service</th>
                  <th className="p-4 font-display text-sm uppercase">Date</th>
                  <th className="p-4 font-display text-sm uppercase">Status</th>
                  <th className="p-4 font-display text-sm uppercase">Price</th>
                  <th className="p-4 font-display text-sm uppercase">Action</th>
                </tr>
              </thead>
              <tbody>
                {dummyBookings.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-12 text-center text-neo-black/40 font-bold">
                      Belum ada booking. <Link to="/book" className="text-neo-orange font-black hover:underline">Book sekarang!</Link>
                    </td>
                  </tr>
                ) : (
                  dummyBookings.map((b) => <BookingRow key={b.id} booking={b} onReview={handleOpenReview} />)
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Profile Card */}
        <div className="flex flex-col gap-4">
          <h2 className="text-3xl font-display">My Profile</h2>
          <NeoCard variant="black" className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-neo-yellow border-4 border-neo-white rounded-full flex items-center justify-center text-4xl shadow-neo-sm">
                {user?.avatar || '👤'}
              </div>
              <div>
                <p className="text-xl font-display text-neo-white">{user?.name}</p>
                <p className="text-neo-white/60 text-sm font-bold">{user?.email}</p>
              </div>
            </div>
            <div className="border-t-4 border-neo-white/20 pt-4 flex flex-col gap-2">
              {user?.phone && (
                <p className="text-neo-white/70 text-sm font-bold">📱 {user.phone}</p>
              )}
              <span className="inline-block bg-neo-yellow text-neo-black text-xs font-black uppercase px-2 py-1 rounded-neo w-fit">
                {user?.role}
              </span>
            </div>
            <NeoButton variant="yellow" size="sm" fullWidth id="edit-profile-btn">
              Edit Profile
            </NeoButton>
          </NeoCard>

          {/* Favourite Barber */}
          <h2 className="text-3xl font-display mt-2">Fav. Barber</h2>
          <NeoCard variant="blue" hoverEffect="lift">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-4xl">{dummyBarbers[0].avatar}</span>
              <div>
                <p className="font-display text-lg">{dummyBarbers[0].name}</p>
                <p className="text-xs font-black uppercase text-neo-black/60">{dummyBarbers[0].specialty}</p>
              </div>
            </div>
            <Link to="/book">
              <NeoButton variant="primary" size="sm" fullWidth>Book Again</NeoButton>
            </Link>
          </NeoCard>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
