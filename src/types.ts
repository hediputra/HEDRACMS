export interface Penduduk {
  nik: string;
  kk: string;
  nama: string;
  jenisKelamin: 'Laki-laki' | 'Perempuan';
  tempatLahir: string;
  tanggalLahir: string;
  alamat: string;
  rt: string;
  rw: string;
  dusun: string;
  pendidikan: string;
  pekerjaan: string;
  agama: string;
  statusKeluarga: string;
}

export interface SuratPermohonan {
  id: string;
  nik: string;
  namaPemohon: string;
  jenisSurat: string;
  tanggalPermohonan: string;
  keperluan: string;
  status: 'Draft' | 'Pemohon' | 'Operator' | 'Verifikasi' | 'Kepala Desa' | 'Selesai';
  keterangan?: string;
  qrcodeContent?: string;
}

export interface APBDesLedger {
  id: string;
  tipe: 'Pendapatan' | 'Belanja' | 'Pembiayaan';
  kategori: string;
  rincian: string;
  anggaran: number;
  realisasi: number;
}

export interface AssetDesa {
  id: string;
  kode: string;
  nama: string;
  kategori: 'Tanah' | 'Gedung' | 'Kendaraan' | 'Peralatan';
  kondisi: 'Baik' | 'Rusak Ringan' | 'Rusak Berat';
  nilai: number;
  lokasi: string;
  koordinat: { x: number; y: number }; // Relative coordinates for our interactive GIS
}

export interface BumdesUnit {
  id: string;
  namaUnit: string;
  deskripsi: string;
  pengelola: string;
  modal: number;
  kas: number;
  pendapatan: number;
}

export interface UmkmProduk {
  id: string;
  namaToko: string;
  namaProduk: string;
  kategori: 'Makanan' | 'Kerajinan' | 'Pertanian' | 'Wisata';
  harga: number;
  stok: number;
  deskripsi: string;
  kontak: string;
  rating: number;
}

export interface PengaduanTiket {
  id: string;
  namaPengadu: string;
  kategori: 'Layanan' | 'Infrastruktur' | 'Keamanan' | 'Lainnya';
  tanggal: string;
  isi: string;
  status: 'Diterima' | 'Diproses' | 'Selesai' | 'Ditolak';
  tanggapan?: string;
}

export interface LembagaDesaData {
  nama: string;
  singkatan: string;
  ketua: string;
  anggotaCount: number;
  tugas: string;
}
