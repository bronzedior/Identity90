# PRD - Identity90: Nusantara Reimagined

## 1. Overview
Identity90 adalah aplikasi web satu halaman (SPA) yang memungkinkan pengguna mengubah foto mereka menjadi avatar legendaris atau bangsawan Nusantara dengan kualitas sinematik (ala Marvel/Disney).

Masalah Utama: Kurangnya medium ekspresi budaya yang relevan bagi Gen Z yang terasa modern, keren, dan mudah dibagikan.

Tujuan Utama: Menyediakan platform transformasi AI yang cepat (<15 detik) untuk membangkitkan kebanggaan identitas daerah melalui "Persona Card" yang bisa dibagikan secara instan ke media sosial.

## 2. Requirements
Persyaratan tingkat tinggi untuk pengembangan sistem:
- Aksesibilitas: Web Browser (Mobile-first) karena fokus pada sharing ke IG/WhatsApp.
- Pengguna: Publik (Tanpa login untuk meminimalkan friction).
- Data Input: Foto wajah (Upload/Kamera) atau pemilihan Archetype (tanpa upload).
- Spesifisitas Data: Metadata regional (Jawa, Bali, dll) dan Vibe (Cyber, Mythical, dll).
- Notifikasi: Status proses "The Forge" dan notifikasi Social Proof (Heatmap).
- Prioritas Teknis: Low Latency. Optimasi pada pemrosesan prompt dan ukuran file gambar untuk kecepatan maksimal.

## 3. Core Features (MVP)
Dual-Input Mode
- Upload Mode: Deteksi wajah dan transformasi via AI.
- Archetype Mode: Pilihan 6 persona basis (Ksatria, Putri, dll) bagi user yang tidak ingin upload foto.
Guided Prompting (Vibe Check)
- Sistem pemilihan berbasis Chip/Visual Card untuk Regional (6 region) dan Vibe Style (4 style) untuk menghindari kebingungan prompting manual.
The Forge (Cultural Loading)
- Animasi transisi estetik dengan tampilan Educational Snippet (Fun fact budaya) agar proses menunggu tidak terasa membosankan.
Viral Engine & Persona Card
- Dynamic Watermark: Branding premium "Identity90 // Nusantara Series".
- Power Scale: Statistik karakter otomatis (Wisdom, Charisma, dll).
- One-Click Share: Integrasi Web Share API untuk berbagi langsung ke IG Story/WA.

## 4. User Flow
- Hero & Hook: User mendarat, melihat video loop transisi avatar, klik "Mulai Transformasi".
- Choose Your Path: User memilih antara "Gunakan Wajahku" (Upload) atau "Persona Nusantara" (Archetype).
- Vibe Check: User memilih Region (misal: Kalimantan) -> memilih Vibe (misal: Cyber-Kingdom) -> Menambah detail (optional).
- The Forge: Sistem mengirim data ke Backend. Sambil menunggu, user membaca fakta unik budaya yang dipilih.
- The Reveal: Avatar muncul dalam bentuk "Persona Card" lengkap dengan statistik. User klik "Share to IG Story" atau "Download".

## 5. Architecture
Gambaran aliran data dari UI hingga AI API Alibaba Cloud:

Code snippet

sequenceDiagram
    participant User as Admin (Browser)
    participant UI as Frontend (Vue.js)
    participant Server as Backend (Express)
    participant AI as Alibaba Cloud Qwen-Image-Max

    Note over User, AI: Proses Transformasi Avatar

    User->>UI: Upload Foto + Pilih Region & Vibe
    UI->>Server: POST (Base64 Image + Style Tags)
    Server->>Server: Prompt Engineering (Mapping Tags ke Complex Prompt)
    Server->>AI: Request Image Generation (Optimized for Speed)
    AI-->>Server: Return Generated Image URL/Base64
    Server-->>UI: Response (Image + Power Scale Stats)
    UI-->>User: Tampilkan Persona Card + Tombol Share

## 6. Design & Technical Constraints
- Frontend: Vue.js + Tailwind CSS + Headless UI untuk komponen yang ringan.
- Backend: Express.js (Stateless). Tidak ada penyimpanan permanen untuk foto user demi privasi dan kecepatan.
- AI Engine: Alibaba Cloud Qwen-Image-Max (Model Studio).
- Output Format: 9:16 (Story format) dengan resolusi yang dioptimalkan (Web-ready) untuk mengurangi transfer time.
- Sharing: Wajib menggunakan Web Share API agar bisa memicu menu berbagi bawaan OS smartphone.
- Latency Goal: Target total proses dari klik "Generate" hingga muncul hasil adalah <15 detik.

