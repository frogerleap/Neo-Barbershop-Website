// ============================================================
// SERVICES
// ============================================================
export const dummyServices = [
  {
    id: 's1',
    name: 'Classic Cut',
    description: 'Potongan rambut klasik dengan hasil rapi dan elegan. Cocok untuk semua usia.',
    price: 50000,
    duration: 30,
    icon: '✂️',
    popular: false,
  },
  {
    id: 's2',
    name: 'Skin Fade',
    description: 'Gradasi halus dari kulit kepala hingga ke bagian atas. Tampak tajam dan fresh.',
    price: 65000,
    duration: 45,
    icon: '💈',
    popular: true,
  },
  {
    id: 's3',
    name: 'Hair & Beard',
    description: 'Paket lengkap potong rambut dan trim brewok dengan hot towel treatment.',
    price: 85000,
    duration: 60,
    icon: '🧔',
    popular: false,
  },
  {
    id: 's4',
    name: 'Pompadour Style',
    description: 'Gaya pompadour ikonik yang bold dan penuh kepribadian. Siap tampil beda.',
    price: 75000,
    duration: 50,
    icon: '🎸',
    popular: false,
  },
  {
    id: 's5',
    name: 'Beard Grooming',
    description: 'Shaping, trimming, dan styling brewok profesional dengan hot towel + balm.',
    price: 45000,
    duration: 25,
    icon: '🪒',
    popular: false,
  },
  {
    id: 's6',
    name: 'Full Package',
    description: 'Semua yang kamu butuhkan: potong + fade + beard + cuci rambut + styling.',
    price: 120000,
    duration: 90,
    icon: '👑',
    popular: true,
  },
];

// ============================================================
// BARBERS
// ============================================================
export const dummyBarbers = [
  {
    id: 'b1',
    name: 'Alex "The Edge"',
    specialty: 'Skin Fade Specialist',
    bio: '8 tahun pengalaman di industri barbershop. Master of precision fade dan clean lineup.',
    rating: 4.9,
    totalCuts: 1250,
    avatar: '😎',
    color: 'neo-blue',
    available: true,
  },
  {
    id: 'b2',
    name: 'Ben "Classic"',
    specialty: 'Pompadour & Classic',
    bio: 'Ahli dalam gaya klasik dan vintage. Setiap potongan adalah karya seni yang timeless.',
    rating: 4.8,
    totalCuts: 980,
    avatar: '🥸',
    color: 'neo-pink',
    available: true,
  },
  {
    id: 'b3',
    name: 'Charlie "Trim"',
    specialty: 'Beard Grooming Expert',
    bio: 'Spesialis beard grooming dan shaping. Brewokmu adalah kanvasnya.',
    rating: 4.7,
    totalCuts: 720,
    avatar: '🧔‍♂️',
    color: 'neo-green',
    available: true,
  },
  {
    id: 'b4',
    name: 'Danny "Fade"',
    specialty: 'Textured & Curly Hair',
    bio: 'Spesialis rambut keriting dan tekstur. Setiap curl mendapatkan treatmentnya.',
    rating: 4.6,
    totalCuts: 560,
    avatar: '🧑‍🎤',
    color: 'neo-purple',
    available: false,
  },
];

// ============================================================
// REVIEWS
// ============================================================
export const dummyReviews = [
  {
    id: 'r1',
    customerName: 'Rizky P.',
    rating: 5,
    comment: 'Skin fade-nya super clean! Alex benar-benar tahu cara bikin tampilan makin tajam.',
    service: 'Skin Fade',
    barber: 'Alex "The Edge"',
    date: '2 hari lalu',
    avatar: '👨',
  },
  {
    id: 'r2',
    customerName: 'Doni S.',
    rating: 5,
    comment: 'Full package worth banget! Dari potong sampai styling hasilnya luar biasa rapi.',
    service: 'Full Package',
    barber: 'Ben "Classic"',
    date: '1 minggu lalu',
    avatar: '🧑',
  },
  {
    id: 'r3',
    customerName: 'Andi M.',
    rating: 4,
    comment: 'Beard grooming Charlie profesional abis. Hot towel-nya bikin relax juga.',
    service: 'Beard Grooming',
    barber: 'Charlie "Trim"',
    date: '3 hari lalu',
    avatar: '👦',
  },
  {
    id: 'r4',
    customerName: 'Faiz R.',
    rating: 5,
    comment: 'Booking online gampang, tempatnya keren, dan hasilnya beyond ekspektasi!',
    service: 'Classic Cut',
    barber: 'Alex "The Edge"',
    date: '5 hari lalu',
    avatar: '🧔',
  },
  {
    id: 'r5',
    customerName: 'Budi H.',
    rating: 5,
    comment: 'Sudah langganan 6 bulan. Konsistensinya top! Setiap potong selalu perfect.',
    service: 'Pompadour Style',
    barber: 'Ben "Classic"',
    date: '2 minggu lalu',
    avatar: '👨‍🦱',
  },
  {
    id: 'r6',
    customerName: 'Yogi K.',
    rating: 4,
    comment: 'Tempat nyaman, barber ramah, hasil memuaskan. Pasti balik lagi!',
    service: 'Hair & Beard',
    barber: 'Charlie "Trim"',
    date: '1 minggu lalu',
    avatar: '👨‍🦰',
  },
];

// ============================================================
// DUMMY BOOKING HISTORY (for Customer Dashboard)
// ============================================================
export const dummyBookings = [
  {
    id: 'bk1',
    serviceId: 's2',
    serviceName: 'Skin Fade',
    barberId: 'b1',
    barberName: 'Alex "The Edge"',
    date: '2026-04-28',
    time: '10:00',
    status: 'completed' as const,
    totalAmount: 65000,
    createdAt: '2026-04-25',
  },
  {
    id: 'bk2',
    serviceId: 's6',
    serviceName: 'Full Package',
    barberId: 'b2',
    barberName: 'Ben "Classic"',
    date: '2026-05-10',
    time: '13:00',
    status: 'confirmed' as const,
    totalAmount: 120000,
    createdAt: '2026-05-05',
  },
  {
    id: 'bk3',
    serviceId: 's5',
    serviceName: 'Beard Grooming',
    barberId: 'b3',
    barberName: 'Charlie "Trim"',
    date: '2026-05-15',
    time: '09:00',
    status: 'pending' as const,
    totalAmount: 45000,
    createdAt: '2026-05-05',
  },
];

// ============================================================
// TIME SLOTS
// ============================================================
export const timeSlots = [
  '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
  '11:00', '11:30', '13:00', '13:30', '14:00', '14:30',
  '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
];

// ============================================================
// STATS (for Landing Page marquee)
// ============================================================
export const stats = [
  { label: 'Happy Clients', value: '3,500+' },
  { label: 'Expert Barbers', value: '4' },
  { label: 'Years Experience', value: '8+' },
  { label: 'Services', value: '6' },
  { label: 'Avg Rating', value: '4.8 ⭐' },
];
