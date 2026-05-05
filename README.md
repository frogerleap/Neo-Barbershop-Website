# 💈 Neo Barbershop

Neo Barbershop adalah sebuah proyek web hobi yang mengimplementasikan sistem pemesanan barbershop modern dengan gaya desain **Neobrutalism** yang unik, berani, dan interaktif. Proyek ini dibangun untuk mendemonstrasikan arsitektur frontend yang skalabel, manajemen *state* yang *robust*, dan alur pengalaman pengguna (UX) yang mulus.

## ✨ Fitur Utama

*   **Sistem Pemesanan (Booking Flow) yang Komprehensif:**
    *   Pemilihan layanan dan barber yang dinamis.
    *   Pemilihan tanggal dan waktu yang interaktif.
    *   Konfirmasi pemesanan dengan *Policy Modal* (Syarat & Ketentuan).
    *   Dukungan *auto-fill* dari data profil pengguna.
*   **Role-Based Dashboard:**
    *   **Customer Dashboard:** Manajemen profil, melihat riwayat potong rambut (booking history), dan memberikan rating/ulasan.
    *   **Barber Dashboard:** Antarmuka khusus untuk barber melihat jadwal dan pelanggan mereka.
    *   **Admin Dashboard:** Antarmuka untuk mengelola operasional barbershop.
*   **Desain Neobrutalism Premium:**
    *   Penggunaan warna kontras tinggi, batas tegas (*hard shadows*), dan tipografi tebal.
    *   Animasi mikro (*micro-animations*) dan efek *hover* yang responsif untuk meningkatkan interaksi pengguna.
    *   *Auto-scrolling review carousel* pada halaman utama.
*   **Arsitektur Frontend Modern:**
    *   Struktur folder dan komponen yang modular serta *reusable*.
    *   Manajemen *state* global yang efisien untuk sinkronisasi data (seperti info kontak) di seluruh aplikasi.

## 🛠️ Tech Stack

Proyek ini dibangun di atas fondasi teknologi web modern berikut:

*   **Framework:** React.js (v18)
*   **Build Tool:** Vite
*   **Bahasa Pemrograman:** TypeScript
*   **Styling:** Tailwind CSS (dikustomisasi untuk estetika Neobrutalism)
*   **State Management:** Zustand
*   **Routing:** React Router DOM
*   **Data Fetching/Caching:** React Query (@tanstack/react-query)
*   **Ikon:** Lucide React

## 🚀 Cara Menjalankan Proyek (Lokal)

Ikuti langkah-langkah berikut untuk menjalankan aplikasi ini di komputer Anda:

1.  Pastikan Anda telah menginstal Node.js.
2.  Buka terminal/command prompt dan masuk ke direktori `frontend`:
    ```bash
    cd frontend
    ```
3.  Instal semua dependensi yang dibutuhkan:
    ```bash
    npm install
    ```
4.  Jalankan server *development*:
    ```bash
    npm run dev
    ```
5.  Aplikasi akan berjalan secara lokal. Buka tautan yang muncul di terminal (biasanya `http://localhost:5173`) pada *browser* Anda.

## 📁 Struktur Direktori Utama

```text
barbershop/
├── client/                 # (Legacy) Implementasi awal web dengan HTML/CSS/JS murni
└── frontend/               # Implementasi utama menggunakan React.js
    ├── src/
    │   ├── components/     # Komponen UI modular yang dapat digunakan kembali (layout, button, modal, dll)
    │   ├── features/       # Komponen yang dikelompokkan berdasarkan fitur aplikasi (booking, dashboard, auth)
    │   ├── pages/          # Komponen tingkat halaman yang merender fitur-fitur
    │   ├── store/          # Konfigurasi state management menggunakan Zustand
    │   ├── data/           # Mock data sementara untuk keperluan development
    │   ├── App.tsx         # Konfigurasi routing utama
    │   └── index.css       # Global styles dan Tailwind CSS directives
    ├── package.json        # Daftar dependensi dan script npm
    └── vite.config.ts      # Konfigurasi Vite
```

## 📝 Status Proyek

Saat ini, proyek fokus pada penyelesaian arsitektur dan pengalaman antarmuka pengguna (UI/UX) di sisi **Frontend**. Fungsionalitas aplikasi berjalan menggunakan *mock data* yang dikelola oleh *global state*. Desain ini dirancang agar siap untuk diintegrasikan dengan sistem *Backend* sungguhan di masa mendatang.
