import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import NeoButton from '../components/ui/NeoButton';
import NeoCard from '../components/ui/NeoCard';
import { dummyServices, dummyBarbers, dummyReviews, stats } from '../data/dummy';

// ─────────────────── MARQUEE STRIP ───────────────────
const MarqueeStrip: React.FC = () => {
  const items = ['✂ Cut', '💈 Fade', '🧔 Beard', '👑 Style', '🪒 Shave', '⭐ Premium', '✂ Cut', '💈 Fade', '🧔 Beard', '👑 Style', '🪒 Shave', '⭐ Premium'];
  return (
    <div className="w-full overflow-hidden bg-neo-black border-y-4 border-neo-black py-3">
      <div className="marquee-track">
        {[...items, ...items].map((item, i) => (
          <span key={i} className="text-neo-yellow font-display text-lg uppercase mx-8 shrink-0">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

// ─────────────────── HERO SECTION ───────────────────
const HeroSection: React.FC = () => (
  <section
    id="hero"
    className="neo-section pt-16 pb-0 max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-center"
  >
    {/* Text */}
    <div className="animate-slide-up">
      <div className="inline-flex items-center gap-2 bg-neo-black text-neo-yellow py-2 px-4 border-4 border-neo-black rounded-neo text-xs font-black uppercase mb-6 -rotate-1 shadow-neo-sm">
        <span className="animate-pulse2 inline-block">✂</span>
        Premium Barbershop Since 2018
      </div>

      <h1 className="text-[72px] md:text-[96px] xl:text-[120px] font-display leading-[0.88] text-neo-black mb-6">
        CUT.<br />
        STYLE.<br />
        <span className="text-stroke inline-block hover:text-neo-orange hover:[-webkit-text-stroke-color:transparent] transition-all duration-300 cursor-default">REPEAT.</span>
      </h1>

      <p className="text-lg md:text-xl font-bold leading-relaxed text-neo-black/80 max-w-lg mb-8">
        Tempat potong rambut modern dengan vibe bold, edgy, dan penuh karakter.
        Dari classic cut sampai skin fade — semua dibuat dengan presisi.
      </p>

      <div className="flex flex-wrap gap-4">
        <Link to="/book" id="hero-book-btn">
          <NeoButton variant="primary" size="lg">
            Book Now ✂
          </NeoButton>
        </Link>
        <a href="#services">
          <NeoButton variant="secondary" size="lg">
            See Services
          </NeoButton>
        </a>
      </div>

      {/* Mini Stats */}
      <div className="flex flex-wrap gap-6 mt-10 pt-8 border-t-4 border-neo-black">
        {stats.slice(0, 3).map((stat) => (
          <div key={stat.label}>
            <p className="text-3xl font-display">{stat.value}</p>
            <p className="text-sm font-bold uppercase text-neo-black/60">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>

    {/* Hero Image */}
    <div className="relative flex justify-center">
      {/* Main card */}
      <div className="bg-neo-blue border-5 border-neo-black rounded-[28px] p-4 -rotate-2 shadow-neo-lg transition-all duration-300 hover:rotate-0 hover:scale-[1.02] max-w-[480px] w-full">
        <img
          src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=1000&auto=format&fit=crop"
          alt="Barber profesional sedang bekerja"
          className="w-full h-[460px] object-cover rounded-[18px] border-4 border-neo-black"
          loading="eager"
        />
      </div>
      {/* Floating badge 1 */}
      <div className="absolute -left-4 md:-left-8 bottom-8 bg-neo-pink border-4 border-neo-black py-3 px-5 font-display text-white text-xl uppercase rotate-3 shadow-neo animate-float z-10">
        Fresh Everyday ✂
      </div>
      {/* Floating badge 2 */}
      <div className="absolute -right-2 md:-right-6 top-8 bg-neo-yellow border-4 border-neo-black py-2 px-4 font-black text-neo-black text-sm uppercase -rotate-3 shadow-neo animate-float-reverse z-10">
        ⭐ 4.8 Rating
      </div>
    </div>
  </section>
);

// ─────────────────── SERVICES SECTION ───────────────────
const ServicesSection: React.FC = () => (
  <section id="services" className="neo-section bg-neo-black">
    <div className="max-w-screen-2xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
        <div>
          <p className="text-neo-yellow font-black uppercase text-sm mb-2 tracking-widest">What We Offer</p>
          <h2 className="neo-section-title text-neo-white">Our Services</h2>
        </div>
        <Link to="/book">
          <NeoButton variant="yellow" size="md">Book a Service</NeoButton>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {dummyServices.map((service, idx) => {
          const cardVariants = ['white', 'blue', 'yellow', 'pink', 'light', 'orange'] as const;
          const variant = cardVariants[idx % cardVariants.length];
          return (
            <NeoCard
              key={service.id}
              variant={variant}
              hoverEffect="lift"
              className="flex flex-col gap-3 relative overflow-hidden"
            >
              {service.popular && (
                <div className="absolute top-4 right-4 bg-neo-black text-neo-yellow text-xs font-black uppercase px-2 py-1 border-2 border-neo-black rounded-neo shadow-neo-xs rotate-2">
                  🔥 Popular
                </div>
              )}
              <span className="text-5xl">{service.icon}</span>
              <h3 className="text-2xl font-display">{service.name}</h3>
              <p className="text-sm font-bold leading-relaxed opacity-80 flex-1">{service.description}</p>
              <div className="flex items-center justify-between pt-3 border-t-4 border-current/20">
                <div>
                  <p className="text-2xl font-display">Rp {service.price.toLocaleString('id-ID')}</p>
                  <p className="text-xs font-bold opacity-60">⏱ {service.duration} menit</p>
                </div>
                <Link to="/book">
                  <NeoButton variant="outline" size="sm">Book</NeoButton>
                </Link>
              </div>
            </NeoCard>
          );
        })}
      </div>
    </div>
  </section>
);

// ─────────────────── BARBERS SECTION ───────────────────
const BarbersSection: React.FC = () => (
  <section id="barbers" className="neo-section">
    <div className="max-w-screen-2xl mx-auto">
      <div className="text-center mb-12">
        <p className="text-neo-orange font-black uppercase text-sm mb-2 tracking-widest">The Team</p>
        <h2 className="neo-section-title">Meet Our Barbers</h2>
        <p className="text-neo-black/60 font-bold mt-3 max-w-xl mx-auto">
          Setiap barber adalah seorang seniman. Temukan yang paling cocok untukmu.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {dummyBarbers.map((barber) => (
          <div
            key={barber.id}
            className={`bg-neo-white border-4 border-neo-black rounded-neo shadow-neo hover:-translate-y-1 hover:shadow-neo-lg transition-all duration-200 overflow-hidden ${!barber.available ? 'opacity-70' : ''}`}
          >
            {/* Avatar */}
            <div className={`bg-neo-${barber.color || 'blue'} border-b-4 border-neo-black p-8 flex flex-col items-center gap-2`}>
              <span className="text-7xl">{barber.avatar}</span>
              {!barber.available && (
                <span className="bg-neo-black text-neo-white text-xs font-black uppercase px-2 py-0.5 rounded-neo">
                  Unavailable
                </span>
              )}
            </div>
            {/* Info */}
            <div className="p-5">
              <h3 className="text-xl font-display mb-1">{barber.name}</h3>
              <p className="text-neo-orange font-black text-xs uppercase tracking-wide mb-2">{barber.specialty}</p>
              <p className="text-sm font-bold text-neo-black/60 leading-relaxed mb-4">{barber.bio}</p>
              <div className="flex justify-between items-center border-t-4 border-neo-black pt-3">
                <div>
                  <p className="text-lg font-display">⭐ {barber.rating}</p>
                  <p className="text-xs font-bold text-neo-black/50">{barber.totalCuts.toLocaleString()} cuts</p>
                </div>
                <Link to="/book">
                  <NeoButton
                    variant={barber.available ? 'primary' : 'outline'}
                    size="sm"
                    disabled={!barber.available}
                  >
                    {barber.available ? 'Book' : 'Full'}
                  </NeoButton>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ─────────────────── HOW IT WORKS ───────────────────
const HowItWorksSection: React.FC = () => {
  const steps = [
    { step: '01', icon: '📱', title: 'Book Online', desc: 'Pilih layanan, barber, dan jadwal favoritmu kapan saja.' },
    { step: '02', icon: '✅', title: 'Konfirmasi', desc: 'Dapatkan konfirmasi booking langsung via email atau notifikasi.' },
    { step: '03', icon: '💈', title: 'Datang & Duduk', desc: 'Tiba di waktu yang ditentukan dan biarkan barber bekerja.' },
    { step: '04', icon: '😎', title: 'Tampil Keren', desc: 'Pergi dengan tampilan baru yang fresh dan penuh percaya diri.' },
  ];

  return (
    <section id="how-it-works" className="neo-section bg-neo-orange">
      <div className="max-w-screen-2xl mx-auto">
        <div className="text-center mb-12">
          <p className="font-black uppercase text-sm mb-2 tracking-widest text-neo-black/70">Simple Process</p>
          <h2 className="neo-section-title">How It Works</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, idx) => (
            <div key={s.step} className="relative">
              <NeoCard variant="white" className="text-center">
                <div className="text-5xl mb-4">{s.icon}</div>
                <div className="inline-block bg-neo-black text-neo-yellow font-display text-sm px-3 py-1 rounded-neo mb-3">
                  {s.step}
                </div>
                <h3 className="text-xl font-display mb-2">{s.title}</h3>
                <p className="text-sm font-bold text-neo-black/60 leading-relaxed">{s.desc}</p>
              </NeoCard>
              {idx < steps.length - 1 && (
                <div className="hidden lg:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-neo-black text-neo-yellow font-black text-lg items-center justify-center border-4 border-neo-black rounded-full shadow-neo-sm">
                  →
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─────────────────── REVIEWS SECTION ───────────────────
const ReviewsSection: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir === 'left' ? -340 : 340, behavior: 'smooth' });
    }
  };

  return (
    <section id="reviews" className="neo-section bg-neo-light border-y-4 border-neo-black">
      <div className="max-w-screen-2xl mx-auto">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-neo-pink font-black uppercase text-sm mb-2 tracking-widest">Testimonials</p>
            <h2 className="neo-section-title">What Clients Say</h2>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => scroll('left')}
              aria-label="Scroll left"
              className="w-12 h-12 border-4 border-neo-black bg-neo-white rounded-neo shadow-neo flex items-center justify-center font-black text-xl hover:-translate-y-0.5 hover:shadow-neo-md transition-all"
            >
              ←
            </button>
            <button
              onClick={() => scroll('right')}
              aria-label="Scroll right"
              className="w-12 h-12 border-4 border-neo-black bg-neo-black text-neo-white rounded-neo shadow-neo flex items-center justify-center font-black text-xl hover:-translate-y-0.5 hover:shadow-neo-md transition-all"
            >
              →
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth"
          style={{ scrollbarWidth: 'none' }}
        >
          {dummyReviews.map((review, idx) => {
            const cardVariants = ['white', 'yellow', 'blue', 'pink', 'light', 'orange'] as const;
            const variant = cardVariants[idx % cardVariants.length];
            return (
              <NeoCard
                key={review.id}
                variant={variant}
                className="min-w-[300px] md:min-w-[340px] flex-shrink-0 snap-start flex flex-col gap-3"
              >
                {/* Stars */}
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className={i < review.rating ? 'text-neo-orange' : 'opacity-30'}>★</span>
                  ))}
                </div>
                {/* Comment */}
                <p className="font-bold text-sm leading-relaxed flex-1">"{review.comment}"</p>
                {/* Meta */}
                <div className="border-t-4 border-current/20 pt-3 flex items-center gap-3">
                  <span className="text-3xl">{review.avatar}</span>
                  <div>
                    <p className="font-black text-sm uppercase">{review.customerName}</p>
                    <p className="text-xs font-bold opacity-60">{review.service} • {review.date}</p>
                  </div>
                </div>
              </NeoCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// ─────────────────── CTA SECTION ───────────────────
const CTASection: React.FC = () => (
  <section id="cta" className="neo-section bg-neo-black">
    <div className="max-w-screen-xl mx-auto text-center">
      <p className="text-neo-yellow font-black uppercase text-sm tracking-widest mb-4">Ready to Level Up?</p>
      <h2 className="text-[60px] md:text-[80px] font-display text-neo-white leading-[0.9] mb-6">
        BOOK YOUR<br />
        <span className="text-neo-yellow">SESSION</span><br />
        TODAY.
      </h2>
      <p className="text-neo-white/60 font-bold max-w-md mx-auto mb-10">
        Jangan tunda tampilan terbaikmu. Slot terbatas — book sekarang!
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <Link to="/book" id="cta-book-btn">
          <NeoButton variant="yellow" size="xl">
            Book Now ✂
          </NeoButton>
        </Link>
        <Link to="/register">
          <NeoButton variant="outline" size="xl" className="!border-neo-white !text-neo-white hover:!bg-neo-white hover:!text-neo-black">
            Create Account
          </NeoButton>
        </Link>
      </div>
    </div>
  </section>
);

// ─────────────────── LANDING PAGE ───────────────────
const LandingPage: React.FC = () => {
  return (
    <div>
      <HeroSection />
      <MarqueeStrip />
      <ServicesSection />
      <BarbersSection />
      <HowItWorksSection />
      <ReviewsSection />
      <CTASection />
    </div>
  );
};

export default LandingPage;
