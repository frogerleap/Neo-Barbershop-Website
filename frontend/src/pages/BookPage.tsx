import React, { useState, useEffect } from 'react';
import BookWizard from '../features/booking/BookWizard';
import NeoButton from '../components/ui/NeoButton';

const BookPage: React.FC = () => {
  const [showPolicy, setShowPolicy] = useState(true);

  const handleAcceptPolicy = () => {
    setShowPolicy(false);
  };

  return (
    <div className="min-h-[calc(100vh-80px)] py-16 px-4 md:px-8 flex flex-col items-center relative">
      
      {/* Policy Modal Overlay */}
      {showPolicy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neo-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-neo-white border-4 border-neo-black rounded-neo shadow-neo-lg w-full max-w-md p-6 relative animate-wiggle">
            
            <button 
              className="absolute -top-4 -right-4 bg-neo-orange border-4 border-neo-black w-10 h-10 rounded-full flex items-center justify-center font-black text-xl text-neo-black shadow-neo cursor-pointer hover:scale-110 transition-transform focus:outline-none" 
              onClick={() => setShowPolicy(false)}
              aria-label="Close"
            >
              ×
            </button>

            <div className="mb-4">
              <span className="bg-neo-red text-neo-white font-display text-sm px-3 py-1 border-2 border-neo-black shadow-neo-sm uppercase inline-block -rotate-2">
                Penting!
              </span>
            </div>

            <h2 className="text-3xl font-display mb-2">Our Booking Policy</h2>
            <p className="font-bold text-neo-red mb-6 uppercase tracking-wider text-sm">Dibaca dulu gaes!</p>
            
            <ul className="space-y-4 mb-8 text-neo-black/80 font-medium">
              <li className="flex items-start gap-3">
                <span className="text-neo-orange mt-1">⚠️</span>
                <span>Maks telat <strong className="text-neo-black">15 menit</strong>, lebih dari itu kami anggap batal</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-neo-orange mt-1">📱</span>
                <span>Mohon booking dengan nomor yang bisa dihubungi</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-neo-orange mt-1">🔄</span>
                <span>Batal/reschedule hubungi <strong className="text-neo-black">+62 857-9868-3721</strong> maks 4 jam sebelum jadwal bookingnya</span>
              </li>
            </ul>

            <NeoButton variant="primary" className="w-full" onClick={handleAcceptPolicy}>
              Saya Mengerti & Lanjut
            </NeoButton>
          </div>
        </div>
      )}

      {/* Page Header */}
      <div className="text-center mb-10 w-full max-w-3xl">
        <div className="inline-block bg-neo-black text-neo-yellow font-display text-sm uppercase px-4 py-2 border-4 border-neo-black rounded-neo shadow-neo mb-4 -rotate-1">
          ✂ Online Booking
        </div>
        <h1 className="text-5xl md:text-6xl font-display">Book Your Session</h1>
        <p className="text-neo-black/60 font-bold mt-3 max-w-md mx-auto">
          Ikuti langkah-langkah berikut untuk memesan jadwal barber favoritmu.
        </p>
      </div>

      {/* Wizard */}
      <div className="w-full max-w-3xl">
        <BookWizard />
      </div>
    </div>
  );
};

export default BookPage;
