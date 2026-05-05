import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const Footer: React.FC = () => (
  <footer className="bg-neo-black text-neo-white border-t-4 border-neo-black mt-auto">
    <div className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-20 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Brand */}
      <div>
        <h3 className="font-display text-2xl text-neo-yellow mb-3">NEO BARBERSHOP</h3>
        <p className="text-neo-white/60 text-sm leading-relaxed max-w-xs">
          Tempat potong rambut modern dengan vibe bold, edgy, dan penuh karakter.
        </p>
        <div className="flex gap-3 mt-4">
          {['📸', '🎵', '💬'].map((icon, i) => (
            <button
              key={i}
              className="w-10 h-10 bg-neo-white/10 border-2 border-neo-white/20 rounded-neo flex items-center justify-center hover:bg-neo-yellow hover:border-neo-yellow hover:text-neo-black transition-all duration-150"
            >
              {icon}
            </button>
          ))}
        </div>
      </div>
      {/* Links */}
      <div>
        <h4 className="font-display text-lg text-neo-yellow mb-3">Quick Links</h4>
        <ul className="flex flex-col gap-2">
          {[
            { label: 'Services', href: '/#services' },
            { label: 'Barbers', href: '/#barbers' },
            { label: 'Reviews', href: '/#reviews' },
            { label: 'Book Now', href: '/book' },
            { label: 'Login', href: '/login' }
          ].map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className="text-neo-white/60 text-sm font-bold hover:text-neo-yellow transition-colors"
              >
                → {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
      {/* Contact */}
      <div>
        <h4 className="font-display text-lg text-neo-yellow mb-3">Contact</h4>
        <ul className="flex flex-col gap-2 text-sm text-neo-white/60 font-bold">
          <li>📍 Jl. Kemang Raya No. 12, Jakarta</li>
          <li>📞 +62 857-9868-3721</li>
          <li>✉️ hello@neobarbershop.id</li>
          <li>🕒 Sen–Sab: 08.00 – 20.00</li>
        </ul>
      </div>
    </div>
    <div className="border-t-4 border-neo-white/10 px-6 md:px-12 lg:px-20 py-5 flex flex-col md:flex-row justify-between items-center gap-2 max-w-screen-2xl mx-auto">
      <p className="text-neo-white/40 text-xs font-bold">© 2026 Neo Barbershop. All rights reserved.</p>
      <p className="text-neo-white/40 text-xs font-bold">Built with ✂️ & React</p>
    </div>
  </footer>
);

const CustomerLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default CustomerLayout;
