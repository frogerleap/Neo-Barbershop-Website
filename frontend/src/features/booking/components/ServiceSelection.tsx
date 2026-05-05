import React, { useState } from 'react';
import { dummyServices } from '../../../data/dummy';

interface ServiceSelectionProps {
  onNext: (serviceId: string) => void;
  selectedId?: string;
}

const ServiceSelection: React.FC<ServiceSelectionProps> = ({ onNext, selectedId }) => {
  const [hovered, setHovered] = useState<string | null>(null);

  const cardColors = [
    'bg-neo-white',
    'bg-neo-blue',
    'bg-neo-yellow',
    'bg-neo-pink text-neo-white',
    'bg-neo-light',
    'bg-neo-orange text-neo-white',
  ];

  return (
    <div className="animate-fade-in">
      <h2 className="text-4xl font-display mb-2">Choose Your Style</h2>
      <p className="text-neo-black/60 font-bold mb-8">Pilih layanan yang kamu inginkan untuk sesi ini.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {dummyServices.map((service, idx) => {
          const isSelected = selectedId === service.id;
          const isHovered  = hovered === service.id;
          const baseColor  = cardColors[idx % cardColors.length];

          return (
            <button
              key={service.id}
              id={`service-${service.id}`}
              onClick={() => onNext(service.id)}
              onMouseEnter={() => setHovered(service.id)}
              onMouseLeave={() => setHovered(null)}
              className={[
                'relative text-left border-4 rounded-neo p-5 transition-all duration-150 cursor-pointer',
                'focus:outline-none focus:ring-4 focus:ring-neo-orange focus:ring-offset-2',
                isSelected
                  ? 'bg-neo-black text-neo-white border-neo-black shadow-neo-yellow scale-[1.02]'
                  : `${baseColor} border-neo-black shadow-neo hover:-translate-y-1 hover:shadow-neo-md`,
              ].join(' ')}
              aria-pressed={isSelected}
              aria-label={`Select ${service.name}`}
            >
              {/* Popular badge */}
              {service.popular && (
                <span className={[
                  'absolute top-3 right-3 text-[10px] font-black uppercase px-2 py-0.5 rounded-neo border-2',
                  isSelected ? 'bg-neo-yellow text-neo-black border-neo-yellow' : 'bg-neo-black text-neo-yellow border-neo-black',
                ].join(' ')}>
                  🔥 Popular
                </span>
              )}

              {/* Selected check */}
              {isSelected && (
                <span className="absolute top-3 left-3 w-6 h-6 bg-neo-green border-2 border-neo-white rounded-full flex items-center justify-center text-neo-white text-xs font-black">
                  ✓
                </span>
              )}

              <span className="text-4xl block mb-3">{service.icon}</span>
              <h3 className="text-xl font-display mb-1">{service.name}</h3>
              <p className={`text-sm font-bold leading-relaxed mb-3 ${isSelected ? 'text-neo-white/70' : 'text-current/60'}`}>
                {service.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-display">
                  Rp {service.price.toLocaleString('id-ID')}
                </span>
                <span className={`text-xs font-black ${isSelected ? 'text-neo-white/60' : 'text-current/50'}`}>
                  ⏱ {service.duration}m
                </span>
              </div>
            </button>
          );
        })}
      </div>

      <p className="text-center text-sm font-bold text-neo-black/40 mt-6">
        Klik layanan untuk langsung lanjut ke langkah berikutnya
      </p>
    </div>
  );
};

export default ServiceSelection;
