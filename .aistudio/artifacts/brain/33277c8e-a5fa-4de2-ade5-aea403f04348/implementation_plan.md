# Website Personal Editorial & Dasbor Portofolio Cerdas

Website personal interaktif dan berkinerja tinggi yang mengadopsi estetika poster editorial minimalis sesuai referensi visual pengguna, dipadukan dengan foto profil pengguna, sistem sinkronisasi hybrid Supabase, formulir kontak email terintegrasi langsung ke `abahahawrp@gmail.com`, portal autentikasi aman, panel analitik real-time, dan fitur aksesibilitas menyeluruh.

---

## User Review & Critical Decisions

> [!IMPORTANT]
> **Keputusan Utama yang Telah Dikonfirmasi (Fase Klarifikasi):**
> - **Konektivitas Supabase**: Mode *Hybrid Active*. Aplikasi dapat langsung beroperasi seketika dengan cache sinkronisasi lokal dan menyediakan modal konfigurasi cepat untuk menghubungkan URL Supabase dan Public Anon Key milik pengguna.
> - **Identitas & Fokus Portofolio**: Mengintegrasikan tiga pilar keahlian pengguna (*Creative Technologist*): Desainer Kreatif & Pengarah Seni, Full-Stack Software Engineer & Konsultan Web, serta UI/UX Designer & Product Strategist.
> - **Sistem Autentikasi**: Portal autentikasi pemilik/admin aman dengan dukungan Supabase Auth serta opsi *Quick Demo Access* terenkripsi untuk mengelola analitik, pesan masuk, dan sinkronisasi tanpa hambatan.
> - **Aset Foto Profil**: Menggunakan foto portrait resolusi tinggi pengguna (`/public/assets/aistudio/Gemini_Generated_Image_k4jo3dk4jo3dk4jo_8bf28cf4.jpg`) yang ditempatkan secara presisi dalam bingkai kartu bergaris lengkung sesuai komposisi layout referensi editorial (`/public/assets/aistudio/image_f92b4bb4.png`).

---

## 1. Overview & Core Concept

- **Apa yang Dibangun**: Platform web personal berkelas studio desain internasional yang menggabungkan presensi visual editorial berani (tipografi asimetris, garis bingkai minimalis, komposisi foto humanis) dengan kemampuan aplikasi web modern: pengiriman pesan email langsung, pelacakan analitik pengunjung, modul autentikasi terenkripsi, sinkronisasi awan, dan dukungan tema gelap/terang.
- **Target Audiens**: Klien potensial, mitra bisnis, perekrut teknologi, serta kolaborator desain global yang mencari figur serba bisa dalam ranah desain dan rekayasa perangkat lunak.
- **Nilai Utama**: Menghadirkan kesan pertama yang tak terlupakan melalui estetika poster editorial modern, memberikan kemudahan kontak instan langsung ke email pemilik, serta menyediakan dasbor analitik privat untuk memantau traksi pengunjung secara transparan.

---

## 2. User Experience & Visual Design

### Key User Flows
1. **Hero & Eksplorasi Visual (Landing Flow)**: Pengunjung disambut oleh tata letak editorial asimetris dengan foto portrait pengguna dalam bingkai kartu lengkung, kutipan filosofis berbobot ("Jika Anda tidak percaya pada karya Anda, mengapa klien harus percaya?"), tautan portofolio terpilih, dan penanda identitas tiga pilar keahlian.
2. **Pengiriman Pesan & Kontak Cepat (Inquiry Flow)**: Pengunjung mengisi formulir kontak interaktif (nama, email, jenis proyek, pesan). Sistem memvalidasi input, memberikan feedback haptic visual, menyimpan data ke Supabase/lokal, dan menyiapkan pengiriman langsung ke `abahahawrp@gmail.com` melalui endpoint terpadu serta aksi mailto yang siap kirim seketika.
3. **Portal Admin & Analitik Privat (Dashboard Flow)**: Pemilik website dapat masuk melalui pintu login aman (autentikasi terenkripsi) untuk membuka Dasbor Analitik: visualisasi tren pengunjung mingguan, metrik interaksi proyek, daftar pesan masuk terbaru dengan filter status, dan monitor sinkronisasi status Supabase.
4. **Preferensi Pengguna & Aksesibilitas (Customization Flow)**: Panel preferensi yang mudah diakses untuk beralih mode Gelap/Terang, pengaturan ukuran teks kontras tinggi, opsi *reduced motion*, serta notifikasi browser real-time saat pesan baru masuk.

### Visual Identity & Theme
- **Estetika**: *Modern Swiss Editorial meets Warm Humanist Minimalist*. Menggabungkan garis lengkung monoline tipis, tipografi kontras tinggi (antara serif puitis dan sans-serif geometris tajam), serta ruang bernapas luas tanpa elemen visual semu.
- **Palet Warna (Aturan 60-30-10)**:
  - *Kanvas Netral (60%)*: Off-white hangat (`#FBFBFA` / `bg-stone-50`) pada mode terang dan Obsidian dalam (`#0C0D0E` / `bg-neutral-950`) pada mode gelap.
  - *Struktur & Batas (30%)*: Garis rambut abu-abu halus (`border-stone-200` / `border-neutral-800`), kartu permukaan lembut, dan tipografi abu-abu arang.
  - *Aksen vokal (10%)*: Aksen terracotta hangat / amber tua (`#D97706` atau `#C2410C`) yang selaras dengan pencahayaan alami matahari sore pada foto profil pengguna.
- **Hierarki Tipografi**:
  - Judul Display Utama: *Editorial Serif / Geometric Sans* berkontras tinggi dengan penyeimbang baris (`text-wrap: balance`).
  - Teks Penjelasan & Metadata: Sans-serif geometris bersih dengan pemisah tipografis unboxed (`·`, `/`).
  - Angka & Data Analitik: Tabular monospace figures (`tabular-nums font-mono`) untuk perataan sempurna pada grafik dan kartu metrik.
- **Interaksi & Gerak (Motion)**: Transisi halus berbasis *Framer Motion* dengan kurva redaman natural ($\le 200\text{ms}$ untuk interaksi mikro).

---

## 3. Key Product Decisions & Trade-Offs

- **Desain Layout Editorial Sesuai Gambar Referensi**:
  - *Pendekatan*: Mereplikasi susunan top bar 3-zona (Keahlian, Nilai Inti, Nama Pemilik), frame kartu portrait berbingkai melengkung di bagian tengah, teks kutipan kiri dengan pegangan media sosial, dan tipografi ukuran besar di sisi kanan.
  - *Alasan*: Menghormati estetika visual poster yang dikirim pengguna dengan akurasi tata letak tinggi tanpa kompromi.
- **Arsitektur Supabase Hybrid**:
  - *Pendekatan*: Aplikasi menyertakan adapter penyimpanan reaktif yang secara otomatis bekerja menggunakan penyimpanan lokal terenkripsi jika Supabase belum disambungkan, dan menyinkronkan data secara mulus ke tabel Supabase (`messages`, `analytics_events`, `site_config`) saat pengguna memasukkan kredensial proyek Supabase di panel admin.
  - *Alasan*: Menjamin website langsung dapat digunakan dan didemokan 100% tanpa error koneksi, sekaligus siap pakai untuk produksi langsung bersama proyek Supabase pengguna.
- **Integrasi Email Kontak Langsung**:
  - *Pendekatan*: Sistem menyediakan backend handler Express `/api/contact` yang mencatat pesan serta memicu relay pengiriman email, dilengkapi tombol interaktif "Buka di Email Klien" sebagai cadangan tangguh jika server relay tidak memiliki kredensial SMTP pihak ketiga.
  - *Alasan*: Pesan pengguna dijamin tidak pernah hilang dan langsung dapat ditindaklanjuti ke `abahahawrp@gmail.com`.
- **Aksesibilitas Terintegrasi (WCAG AA)**:
  - *Pendekatan*: Kontras rasio teks teruji ($\ge 4.5:1$), tombol fokus `focus-visible`, dukungan pembaca layar dengan label ARIA lengkap, dan penyesuaian font scaling dinamis.

---

## 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────────────────────┐
│                          APLIKASI REACT (SPA)                          │
├────────────────────────────────────────────────────────────────────────┤
│  Top Navigation (3-Zone Contract: Identitas ─ Navigasi ─ Aksi CTA)     │
├──────────────────────────────────┬─────────────────────────────────────┤
│      TAMPILAN PUBLIK             │         PORTAL PRIVAT & ADMIN       │
│  ┌─────────────────────────────┐ │  ┌────────────────────────────────┐ │
│  │ Hero Editorial Poster       │ │  │ Autentikasi Supabase / Demo    │ │
│  │ (Frame Foto + Tipografi)    │ │  ├────────────────────────────────┤ │
│  ├─────────────────────────────┤ │  │ Dasbor Analitik Pengunjung    │ │
│  │ Showcase Tiga Keahlian      │ │  │ (Grafik Kunjungan & Interaksi) │ │
│  ├─────────────────────────────┤ │  ├────────────────────────────────┤ │
│  │ Galeri Karya & Proyek Utama │ │  │ Kotak Pesan Masuk (Inbox)      │ │
│  ├─────────────────────────────┤ │  ├────────────────────────────────┤ │
│  │ Formulir Kontak Email Cepat │ │  │ Pengaturan Supabase Live       │ │
│  └─────────────────────────────┘ │  └────────────────────────────────┘ │
├──────────────────────────────────┴─────────────────────────────────────┤
│  MODUL KONSISTENSI & PREFERENSI SISTEM                                 │
│  - Mode Gelap / Terang (Dark Mode Toggle)                              │
│  - Pusat Aksesibilitas (Ukuran Font, Kontras Tinggi, Motion Reducer)   │
│  - Notifikasi Push / Browser Alerts                                   │
└────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                   LAPISAN DATA & SINKRONISASI HYBRID                   │
├────────────────────────────────────────────────────────────────────────┤
│  Supabase Client Adapter                                               │
│  ├── Mode Terhubung: Sinkronisasi tabel `messages` & `analytics`      │
│  └── Mode Mandiri: Web Storage Cache + Event Dispatcher Real-time      │
└────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                   SERVER BACKEND PROXY (EXPRESS)                       │
├────────────────────────────────────────────────────────────────────────┤
│  POST /api/contact      -> Validasi pesan & Log notifikasi email       │
│  POST /api/analytics    -> Agregasi metrik kunjungan & perangkat       │
│  POST /api/gemini/think -> Konsultasi AI Cerdas (High Thinking Mode)   │
└────────────────────────────────────────────────────────────────────────┘
```

### Data Model & Entities
1. **Message**: `id`, `sender_name`, `sender_email`, `project_category`, `message_body`, `status` (`new` | `read` | `replied`), `created_at`.
2. **AnalyticsEvent**: `id`, `event_type` (`page_view`, `project_click`, `contact_submit`), `device_type`, `browser`, `referrer`, `timestamp`.
3. **SitePreferences**: `theme` (`light` | `dark` | `system`), `fontSize` (`normal` | `large`), `reducedMotion` (boolean), `highContrast` (boolean).
4. **SupabaseSettings**: `supabase_url`, `supabase_anon_key`, `is_connected`, `last_synced_at`.

### Verification & Performance Plan
- Memastikan bundel React teroptimasi dengan memuat aset foto lokal secara efisien (`lazy` loading untuk proyek tambahan, `priority` untuk poster hero).
- Memverifikasi kepatuhan styling Tailwind CSS tanpa inline styles berlebih dan tanpa layout shift.
- Menguji alur login, pengiriman formulir kontak, dan perubahan preferensi tema.
- Menjalankan `compile_applet` untuk memastikan build bersih tanpa error TypeScript maupun bundler Vite.
