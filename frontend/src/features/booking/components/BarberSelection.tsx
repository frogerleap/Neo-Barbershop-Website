import React from 'react';
import NeoButton from '../../../components/ui/NeoButton';
import { dummyBarbers } from '../../../data/dummy';

interface BarberSelectionProps {
  onBack: () => void;
  onNext: (barberId: string) => void;
  selectedId?: string;
}

const avatarBg = ['bg-neo-blue', 'bg-neo-pink', 'bg-neo-green', 'bg-neo-purple'];

const BarberSelection: React.FC<BarberSelectionProps> = ({ onBack, onNext, selectedId }) => {
  return (
    <div className="animate-fade-in">
      <h2 className="text-4xl font-display mb-2">Choose Your Barber</h2>
      <p className="text-neo-black/60 font-bold mb-8">Pilih barber yang paling cocok dengan gaya kamu.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {dummyBarbers.map((barber, idx) => {
          const isSelected = selectedId === barber.id;

          return (
            <button
              key={barber.id}
              id={`barber-${barber.id}`}
              onClick={() => !barber.available ? undefined : onNext(barber.id)}
              disabled={!barber.available}
              aria-pressed={isSelected}
              className={[
                'text-left border-4 border-neo-black rounded-neo transition-all duration-150 overflow-hidden',
                'focus:outline-none focus:ring-4 focus:ring-neo-orange focus:ring-offset-2',
                isSelected
                  ? 'bg-neo-black text-neo-white shadow-neo-yellow scale-[1.01]'
                  : barber.available
                    ? 'bg-neo-white shadow-neo hover:-translate-y-1 hover:shadow-neo-md cursor-pointer'
                    : 'bg-neo-gray opacity-60 cursor-not-allowed shadow-neo-sm',
              ].join(' ')}
            >
              <div className="flex items-stretch">
                {/* Avatar column */}
                <div className={`${avatarBg[idx % avatarBg.length]} w-24 flex-shrink-0 flex items-center justify-center text-5xl border-r-4 border-neo-black`}>
                  {barber.avatar}
                </div>

                {/* Info column */}
                <div className="flex-1 p-4">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="text-lg font-display leading-tight">{barber.name}</h3>
                    {isSelected && (
                      <span className="shrink-0 w-6 h-6 bg-neo-green border-2 border-neo-white rounded-full flex items-center justify-center text-white text-xs font-black">
                        ✓
                      </span>
                    )}
                    {!barber.available && (
                      <span className="shrink-0 text-xs font-black bg-neo-black text-neo-white px-2 py-0.5 rounded-neo">
                        Full
                      </span>
                    )}
                  </div>
                  <p className={`text-xs font-black uppercase tracking-wide mb-2 ${isSelected ? 'text-neo-orange' : 'text-neo-orange'}`}>
                    {barber.specialty}
                  </p>
                  <p className={`text-xs font-bold leading-relaxed mb-3 ${isSelected ? 'text-neo-white/70' : 'text-neo-black/50'}`}>
                    {barber.bio}
                  </p>
                  <div className="flex gap-3 text-xs font-black">
                    <span>⭐ {barber.rating}</span>
                    <span className={isSelected ? 'text-neo-white/60' : 'text-neo-black/40'}>
                      {barber.totalCuts.toLocaleString()} cuts
                    </span>
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="flex justify-between">
        <NeoButton variant="secondary" size="lg" onClick={onBack}>← Back</NeoButton>
      </div>

      <p className="text-center text-sm font-bold text-neo-black/40 mt-4">
        Klik barber untuk langsung lanjut ke langkah berikutnya
      </p>
    </div>
  );
};

export default BarberSelection;
