import React, { useState } from 'react';
import NeoButton from '../../../components/ui/NeoButton';
import NeoInput from '../../../components/ui/NeoInput';
import { timeSlots } from '../../../data/dummy';

interface DateTimeSelectionProps {
  onBack: () => void;
  onNext: (date: string, time: string) => void;
  selectedDate?: string;
  selectedTime?: string;
}

const DateTimeSelection: React.FC<DateTimeSelectionProps> = ({
  onBack,
  onNext,
  selectedDate,
  selectedTime,
}) => {
  const [date, setDate] = useState(selectedDate || '');
  const [time, setTime] = useState(selectedTime || '');
  const [error, setError] = useState('');

  // Min date = today
  const today = new Date().toISOString().split('T')[0];

  // Friendly date display
  const displayDate = date
    ? new Date(date + 'T00:00:00').toLocaleDateString('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : null;

  const handleNext = () => {
    if (!date && !time) {
      setError('Pilih tanggal dan waktu terlebih dahulu.');
      return;
    }
    if (!date) { setError('Pilih tanggal terlebih dahulu.'); return; }
    if (!time) { setError('Pilih slot waktu terlebih dahulu.'); return; }
    setError('');
    onNext(date, time);
  };

  return (
    <div className="animate-fade-in">
      <h2 className="text-4xl font-display mb-2">Pick a Schedule</h2>
      <p className="text-neo-black/60 font-bold mb-8">Pilih tanggal dan waktu yang paling nyaman untukmu.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
        {/* Date Picker */}
        <div>
          <NeoInput
            id="booking-date"
            type="date"
            label="Tanggal Kunjungan"
            value={date}
            min={today}
            onChange={(e) => { setDate(e.target.value); setError(''); }}
            onClick={(e) => {
              try {
                if ('showPicker' in e.currentTarget) {
                  (e.currentTarget as any).showPicker();
                }
              } catch (err) {
                // Ignore, fallback to native behavior
              }
            }}
            required
          />
          {date && (
            <div className="mt-3 bg-neo-yellow border-4 border-neo-black rounded-neo p-3 shadow-neo-sm">
              <p className="font-black text-sm uppercase">📅 {displayDate}</p>
            </div>
          )}
        </div>

        {/* Time Slots */}
        <div>
          <p className="text-sm font-black uppercase tracking-wide text-neo-black mb-2">
            Slot Waktu <span className="text-neo-pink">*</span>
          </p>
          <div className="grid grid-cols-3 gap-2">
            {timeSlots.map((slot) => {
              const isSelected = time === slot;
              return (
                <button
                  key={slot}
                  id={`slot-${slot.replace(':', '')}`}
                  type="button"
                  onClick={() => { setTime(slot); setError(''); }}
                  className={[
                    'py-2.5 px-1 border-4 border-neo-black rounded-neo font-black text-sm transition-all duration-150',
                    'focus:outline-none focus:ring-4 focus:ring-neo-orange focus:ring-offset-1',
                    isSelected
                      ? 'bg-neo-orange text-neo-white shadow-none translate-x-[2px] translate-y-[2px]'
                      : 'bg-neo-white shadow-neo-sm hover:bg-neo-yellow hover:-translate-y-0.5 hover:shadow-neo',
                  ].join(' ')}
                  aria-pressed={isSelected}
                  aria-label={`Select time slot ${slot}`}
                >
                  {slot}
                </button>
              );
            })}
          </div>
          {time && (
            <div className="mt-3 bg-neo-green border-4 border-neo-black rounded-neo p-3 shadow-neo-sm">
              <p className="font-black text-sm uppercase">🕐 Dipilih: {time} WIB</p>
            </div>
          )}
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-4 bg-neo-pink border-4 border-neo-black rounded-neo p-3 text-neo-white font-black text-sm flex items-center gap-2">
          <span>✕</span> {error}
        </div>
      )}

      <div className="flex justify-between">
        <NeoButton variant="secondary" size="lg" onClick={onBack}>← Back</NeoButton>
        <NeoButton
          variant="primary"
          size="lg"
          onClick={handleNext}
          id="datetime-next-btn"
        >
          Next: Summary →
        </NeoButton>
      </div>
    </div>
  );
};

export default DateTimeSelection;
