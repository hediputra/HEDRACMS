# HEDRA CMS

**High Efficiency Digital Rural Application** — CMS untuk manajemen sistem informasi desa: pelayanan publik, transparansi APBDes, kependudukan, GIS, UMKM, aset desa, dan asisten AI administrasi.

> *Dari Desa, Untuk Desa, Menuju Digitalisasi yang Lebih Baik.*

## Fitur utama

| Modul | Keterangan |
|-------|------------|
| Dashboard | Ringkasan operasional desa dan arsitektur sistem |
| CMS & Ekstensi | Marketplace modul/tema |
| Pelayanan Surat | Layanan surat keterangan dan administrasi |
| Kependudukan & PBB | Data warga dan pajak bumi bangunan |
| Kas APBDes | Transparansi keuangan desa |
| GIS Peta Desa | Pemetaan wilayah |
| Wisata & UMKM | Promosi ekonomi lokal |
| Aset Desa | Inventaris aset |
| Aduan & Posbankum | Pengaduan masyarakat |
| Absensi Biometrik | Kehadiran aparatur desa |
| AI HEDRA Asisten | Draf surat, berita, dan analisis (opsional, via API Gemini) |
| Simulasi Mobile | Pratinjau tampilan aplikasi warga |

## Stack teknologi

- **Frontend:** React 19, TypeScript, Tailwind CSS 4, Vite 6
- **Backend:** Express (Node.js), endpoint REST `/api/*`
- **AI (opsional):** Google Gemini API lewat `@google/genai` — tanpa kunci API, asisten berjalan dalam mode simulasi

## Prasyarat

- [Node.js](https://nodejs.org/) 18 atau lebih baru
- npm

## Menjalankan secara lokal

```bash
# Clone dan masuk ke folder proyek
git clone https://github.com/hediputra/HEDRACMS.git
cd HEDRACMS

# Instal dependensi
npm install

# Salin contoh environment (opsional, untuk AI generatif)
cp .env.example .env.local
# Edit .env.local — isi GEMINI_API_KEY jika ingin AI live (bukan simulasi)

# Jalankan server pengembangan (Express + Vite) di http://localhost:3000
npm run dev
```

## Variabel lingkungan

| Variabel | Wajib | Keterangan |
|----------|-------|------------|
| `GEMINI_API_KEY` | Tidak | Kunci API Gemini untuk AI HEDRA Asisten. Kosong = mode simulasi draf surat/berita |
| `APP_URL` | Tidak | URL publik aplikasi (tautan, callback OAuth, dll.) |
| `NODE_ENV` | Produksi | Set `production` saat menjalankan build |
| `DISABLE_HMR` | Tidak | Set `true` untuk mematikan hot reload Vite |

## Skrip npm

| Perintah | Fungsi |
|----------|--------|
| `npm run dev` | Server dev (port **3000**) |
| `npm run build` | Build frontend + bundle server ke `dist/` |
| `npm start` | Jalankan `dist/server.cjs` (produksi) |
| `npm run lint` | Pemeriksaan TypeScript (`tsc --noEmit`) |
| `npm run clean` | Hapus folder `dist/` |

## Struktur proyek

```
├── server.ts          # Express: API health, Gemini proxy, Vite middleware
├── index.html
├── src/
│   ├── App.tsx        # Navigasi modul & tema
│   ├── components/    # Modul fitur per layanan desa
│   ├── data/          # Data contoh (mock)
│   └── types.ts
├── assets/
└── package.json
```

## API

- `GET /api/health` — status server dan apakah AI aktif
- `POST /api/gemini/generate` — body JSON `{ "prompt": "...", "systemInstruction": "..." }` (opsional)

## Produksi

```bash
npm run build
NODE_ENV=production npm start
```

Pastikan `GEMINI_API_KEY` diset di lingkungan server jika fitur AI generatif diperlukan.

## Lisensi & pengembang

Dikembangkan oleh **Mas Hedi** — Sekretaris Desa Pondokpanjang.

Repositori: [github.com/hediputra/HEDRACMS](https://github.com/hediputra/HEDRACMS)

Dokumentasi visi, misi, dan edisi produk lengkap: lihat `HEDRA CMS.md` di repo ini.
