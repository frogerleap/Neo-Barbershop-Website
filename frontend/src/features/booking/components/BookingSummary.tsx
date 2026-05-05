import React from 'react';
import NeoButton from '../../../components/ui/NeoButton';
import { dummyServices, dummyBarbers } from '../../../data/dummy';

interface BookingSummaryProps {
  onBack: () => void;
  onNext: () => void;
  data: {
    serviceId: string;
    barberId: string;
    date: string;
    time: string;
  };
}

const BookingSummary: React.FC<BookingSummaryProps> = ({ onBack, onNext, data }) => {
  const service = dummyServices.find((s) => s.id === data.serviceId);
  const barber  = dummyBarbers.find((b)  => b.id === data.barberId);

  const formatPrice = (n: number) => `Rp ${n.toLocaleString('id-ID')}`;
  const formatDate = (d: string) =>
    d
      ? new Date(d + 'T00:00:00').toLocaleDateString('id-ID', {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })
      : '—';

  const adminFee = 2500;
  const totalAmount = (service?.price ?? 0) + adminFee;

  const rows = [
    { label: 'Service',    icon: '✂️',  value: service?.name ?? '—',        sub: service ? `⏱ ${service.duration} menit` : '' },
    { label: 'Barber',     icon: '💈',  value: barber?.name  ?? '—',        sub: barber?.specialty ?? '' },
    { label: 'Date',       icon: '📅',  value: formatDate(data.date),        sub: '' },
    { label: 'Time',       icon: '🕐',  value: data.time ? `${data.time} WIB` : '—', sub: '' },
  ];

  return (
    <div className="animate-fade-in">
      <h2 className="text-4xl font-display mb-2">Booking Summary</h2>
      <p className="text-neo-black/60 font-bold mb-8">Periksa kembali detail booking kamu sebelum lanjut ke pembayaran.</p>

      {/* Summary Card */}
      <div className="bg-neo-light border-4 border-neo-black rounded-neo shadow-neo-md mb-6 overflow-hidden">
        {/* Header */}
        <div className="bg-neo-black text-neo-white px-6 py-4 flex items-center gap-3">
          <span className="text-2xl">📋</span>
          <div>
            <p className="font-display text-xl">Booking Details</p>
            <p className="text-neo-white/50 text-xs font-bold">Konfirmasi sebelum pembayaran</p>
          </div>
        </div>

        {/* Detail Rows */}
        <div className="divide-y-4 divide-neo-black">
          {rows.map((row) => (
            <div key={row.label} className="flex items-start gap-4 px-6 py-4">
              <span className="text-2xl shrink-0 mt-0.5">{row.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-black uppercase text-neo-black/50 tracking-wide mb-0.5">{row.label}</p>
                <p className="font-black text-lg leading-tight truncate">{row.value}</p>
                {row.sub && <p className="text-xs font-bold text-neo-black/50 mt-0.5">{row.sub}</p>}
              </div>
            </div>
          ))}
        </div>

        {/* Price Breakdown */}
        <div className="bg-neo-white border-t-4 border-neo-black px-6 py-4 flex flex-col gap-2">
          <div className="flex justify-between items-center text-sm font-bold text-neo-black/60">
            <span>Harga Layanan</span>
            <span>{service ? formatPrice(service.price) : '—'}</span>
          </div>
          <div className="flex justify-between items-center text-sm font-bold text-neo-black/60">
            <span>Biaya Admin</span>
            <span>{formatPrice(adminFee)}</span>
          </div>
          <div className="border-t-4 border-neo-black pt-3 mt-1 flex justify-between items-center">
            <span className="font-display text-xl">Total</span>
            <span className="font-display text-3xl text-neo-orange">{formatPrice(totalAmount)}</span>
          </div>
        </div>
      </div>

      {/* Policy reminder */}
      <div className="bg-neo-yellow border-4 border-neo-black rounded-neo p-4 mb-8 flex items-start gap-3">
        <span className="text-xl shrink-0">⚠️</span>
        <div>
          <p className="font-black text-sm uppercase mb-1">Kebijakan Pembatalan</p>
          <p className="text-sm font-bold text-neo-black/70 leading-relaxed">
            Pembatalan dapat dilakukan maksimal <strong>2 jam sebelum</strong> jadwal. Pembatalan mendadak dikenakan biaya admin.
          </p>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex flex-col sm:flex-row gap-3 justify-between">
        <NeoButton variant="secondary" size="lg" onClick={onBack}>← Back</NeoButton>
        <NeoButton
          variant="primary"
          size="lg"
          onClick={onNext}
          id="summary-proceed-btn"
        >
          Proceed to Payment →
        </NeoButton>
      </div>
    </div>
  );
};

export default BookingSummary;
