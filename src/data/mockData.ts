import { Penduduk, SuratPermohonan, APBDesLedger, AssetDesa, BumdesUnit, UmkmProduk, PengaduanTiket, LembagaDesaData } from '../types';

export const INI_DESA = {
  nama: 'Pondokpanjang',
  kecamatan: 'Subis',
  kabupaten: 'Muko-Muko',
  provinsi: 'Bengkulu',
  tahunBerdiri: '1974',
  sejarah: 'Desa Pondokpanjang dibentuk pada tahun 1974 oleh para transmigran dan petani perkebunan sawit dan karet. Nama Pondokpanjang diambil dari kebiasaan warga yang mendirikan pemukiman pondokan memanjang di sepanjang aliran sungai untuk tempat beristirahat selama bertani.',
  visi: 'Mewujudkan Desa Pondokpanjang yang Maju, Sejahtera, Mandiri, Berbudaya, dan Terdepan dalam Pelayanan Publik berbasis Digital di Indonesia.',
  misi: [
    'Optimalisasi sistem tata kelola pemerintahan desa berbasis digital HEDRA CMS.',
    'Meningkatkan transparansi dan akuntabilitas pengelolaan APBDes secara terbuka dan real-time.',
    'Mendorong produktivitas pertanian sawit, karet, dan ketahanan pangan hortikultura warga desa.',
    'Mengembangkan unit usaha BUMDes "Pondok Makmur" dan mendampingi digitalisasi pemasaran UMKM lokal.',
    'Menyelenggarakan ketertiban, keamanan, kepastian hukum (Posbankum), serta pengaduan masyarakat yang responsif.'
  ]
};

export const LIST_APARATUR = [
  { jabatan: 'Kepala Desa', nama: 'H. Sudarsono, M.AP', nip: '196805121991031002', fotoSig: 'Kades_Sudarsono' },
  { jabatan: 'Sekretaris Desa (Developer HEDRA)', nama: 'Mas Hedi (Hedi Kiswanto, S.Kom)', nip: '198402152010041001', fotoSig: 'Sekdes_Hedi' },
  { jabatan: 'Kaur Keuangan', nama: 'Siti Rahma, A.Md.Ak', nip: '199004182015022003', fotoSig: 'Keu_Siti' },
  { jabatan: 'Kaur Tata Usaha & Umum', nama: 'Dedi Kurniawan', nip: '198308222012011002', fotoSig: 'TU_Dedi' },
  { jabatan: 'Kasi Pemerintahan', nama: 'Supriadi', nip: '197811102008031005', fotoSig: 'Pem_Supri' },
  { jabatan: 'Kasi Pelayanan & Kesejahteraan', nama: 'Rini Astuti, S.Sos', nip: '199112252018012001', fotoSig: 'Pel_Rini' },
  { jabatan: 'Kadus I', nama: 'Bambang Sugiharto', nip: '-', fotoSig: 'Kadus_Bambang' },
  { jabatan: 'Kadus II', nama: 'M. Yusuf', nip: '-', fotoSig: 'Kadus_Yusuf' }
];

export const LIST_PENDUDUK: Penduduk[] = [
  {
    nik: '1706011204850001',
    kk: '1706010505100021',
    nama: 'Budi Santoso',
    jenisKelamin: 'Laki-laki',
    tempatLahir: 'Pondokpanjang',
    tanggalLahir: '1985-04-12',
    alamat: 'RT 001/RW 001, Dusun I',
    rt: '01',
    rw: '01',
    dusun: 'Dusun I',
    pendidikan: 'SMA',
    pekerjaan: 'Petani Kelapa Sawit',
    agama: 'Islam',
    statusKeluarga: 'Kepala Keluarga'
  },
  {
    nik: '1706015508880002',
    kk: '1706010505100021',
    nama: 'Sukasih',
    jenisKelamin: 'Perempuan',
    tempatLahir: 'Curup',
    tanggalLahir: '1988-08-15',
    alamat: 'RT 001/RW 001, Dusun I',
    rt: '01',
    rw: '01',
    dusun: 'Dusun I',
    pendidikan: 'D3 Kebidanan',
    pekerjaan: 'Bidan Desa',
    agama: 'Islam',
    statusKeluarga: 'Istri'
  },
  {
    nik: '1706012301070003',
    kk: '1706010505100021',
    nama: 'Ahmad Rafli Santoso',
    jenisKelamin: 'Laki-laki',
    tempatLahir: 'Pondokpanjang',
    tanggalLahir: '2007-01-23',
    alamat: 'RT 001/RW 001, Dusun I',
    rt: '01',
    rw: '01',
    dusun: 'Dusun I',
    pendidikan: 'SMP',
    pekerjaan: 'Pelajar',
    agama: 'Islam',
    statusKeluarga: 'Anak'
  },
  {
    nik: '1706012408790001',
    kk: '1706011212150045',
    nama: 'Wayan Sudarta',
    jenisKelamin: 'Laki-laki',
    tempatLahir: 'Karangasem',
    tanggalLahir: '1979-08-24',
    alamat: 'RT 003/RW 001, Dusun I',
    rt: '03',
    rw: '01',
    dusun: 'Dusun I',
    pendidikan: 'S1 Pertanian',
    pekerjaan: 'Wiraswasta / Pemilik Penggilingan',
    agama: 'Hindu',
    statusKeluarga: 'Kepala Keluarga'
  },
  {
    nik: '1706011409940004',
    kk: '1706012502120012',
    nama: 'Dewi Lestari',
    jenisKelamin: 'Perempuan',
    tempatLahir: 'Pondokpanjang',
    tanggalLahir: '1994-09-14',
    alamat: 'RT 002/RW 002, Dusun II',
    rt: '02',
    rw: '02',
    dusun: 'Dusun II',
    pendidikan: 'S1 Manajemen',
    pekerjaan: 'Pemilik UMKM Kopi Luwak Desa',
    agama: 'Kristen',
    statusKeluarga: 'Kepala Keluarga'
  },
  {
    nik: '1706010101900005',
    kk: '1706010101900000',
    nama: 'Hendry Siahaan',
    jenisKelamin: 'Laki-laki',
    tempatLahir: 'Medan',
    tanggalLahir: '1990-01-01',
    alamat: 'RT 001/RW 002, Dusun II',
    rt: '01',
    rw: '02',
    dusun: 'Dusun II',
    pendidikan: 'S1 Hukum',
    pekerjaan: 'Pengacara / Penasihat Posbankum',
    agama: 'Kristen',
    statusKeluarga: 'Kepala Keluarga'
  },
  {
    nik: '1706014407820002',
    kk: '1706012502120018',
    nama: 'Kusniawati',
    jenisKelamin: 'Perempuan',
    tempatLahir: 'Bengkulu',
    tanggalLahir: '1982-07-04',
    alamat: 'RT 004/RW 002, Dusun II',
    rt: '04',
    rw: '02',
    dusun: 'Dusun II',
    pendidikan: 'S1 Kehutanan',
    pekerjaan: 'Pegawai BUMDes',
    agama: 'Islam',
    statusKeluarga: 'Kepala Keluarga'
  }
];

export const INITIAL_LEDBERG_APBDES: APBDesLedger[] = [
  // PENDAPATAN
  { id: 'apb-1', tipe: 'Pendapatan', kategori: 'Dana Desa (DD)', rincian: 'Penyaluran APBN Pusat Tahunan', anggaran: 912000000, realisasi: 912000000 },
  { id: 'apb-2', tipe: 'Pendapatan', kategori: 'Alokasi Dana Desa (ADD)', rincian: 'Alokasi Anggaran Kabupaten Muko-Muko', anggaran: 384000000, realisasi: 384000000 },
  { id: 'apb-3', tipe: 'Pendapatan', kategori: 'Bagi Hasil Pajak & Retribusi', rincian: 'Sektor Retribusi Galian C dan Wisata Air', anggaran: 45000000, realisasi: 38040000 },
  { id: 'apb-4', tipe: 'Pendapatan', kategori: 'Pendapatan Asli Desa (PADes)', rincian: 'Bagi hasil BUMDes Pondok Makmur & Wisata Air', anggaran: 85000000, realisasi: 72400000 },
  
  // BELANJA
  { id: 'apb-5', tipe: 'Belanja', kategori: 'Siltap dan Tunjangan Aparatur', rincian: 'Gaji Bulanan Kades, Perangkat Desa & Insentif RT/RW', anggaran: 320000000, realisasi: 320000000 },
  { id: 'apb-6', tipe: 'Belanja', kategori: 'Pembangunan Fisik Desa', rincian: 'Rabat Beton Jalan Usaha Tani Dusun I & Drainase Dusun II', anggaran: 480000000, realisasi: 420000000 },
  { id: 'apb-7', tipe: 'Belanja', kategori: 'Sektor Pertanian & Peternakan', rincian: 'Pembagian pupuk sawit subsidi dan vaksinasi ternak sapi', anggaran: 120000000, realisasi: 115000000 },
  { id: 'apb-8', tipe: 'Belanja', kategori: 'Pelayanan Publik & TI (HEDRA CMS)', rincian: 'Pengembangan HEDRA Pro, langganan server cloud, & setup Kiosk Desa', anggaran: 35000000, realisasi: 35000000 },
  { id: 'apb-9', tipe: 'Belanja', kategori: 'Pemberdayaan Posyandu & Kesehatan', rincian: 'Pemberian Makanan Tambahan (PMT) Balita & insentif Kader', anggaran: 60000000, realisasi: 58000000 },
  { id: 'apb-10', tipe: 'Belanja', kategori: 'Bantuan Langsung Tunai (BLT-DD)', rincian: 'Penyaluran BLT 30 KPM miskin ekstrem', anggaran: 108000000, realisasi: 108000000 },

  // PEMBIAYAAN
  { id: 'apb-11', tipe: 'Pembiayaan', kategori: 'Penyertaan Modal BUMDes', rincian: 'Tambahan modal ekspansi unit pengolahan limbah sawit', anggaran: 150000000, realisasi: 150000000 },
  { id: 'apb-12', tipe: 'Pembiayaan', kategori: 'Silpa Tahun Sebelumnya', rincian: 'Sisa Lebih Perhitungan Anggaran Tahun Lalu', anggaran: 95000000, realisasi: 95000000 }
];

export const INITIAL_ASSET_DESA: AssetDesa[] = [
  { id: 'as-1', kode: 'AST.1706.01.2026.001', nama: 'Kantor Kepala Desa Pondokpanjang', kategori: 'Gedung', kondisi: 'Baik', nilai: 450000000, lokasi: 'Jl. Utama No. 1, RT 001/001', koordinat: { x: 45, y: 35 } },
  { id: 'as-2', kode: 'AST.1706.01.2026.002', nama: 'Mobil Ambulans Layanan Kesehatan', kategori: 'Kendaraan', kondisi: 'Baik', nilai: 215000000, lokasi: 'Garasi Aula Kantor Desa', koordinat: { x: 47, y: 38 } },
  { id: 'as-3', kode: 'AST.1706.01.2026.003', nama: 'Lahan Kompleks Wisata Pemandian BUMDes', kategori: 'Tanah', kondisi: 'Baik', nilai: 850000000, lokasi: 'Sektor Utara aliran Sungai Pondok', koordinat: { x: 75, y: 15 } },
  { id: 'as-4', kode: 'AST.1706.01.2026.004', nama: 'Hand Tractor Kelompok Tani 02', kategori: 'Peralatan', kondisi: 'Baik', nilai: 24000000, lokasi: 'Gudang Pertanian Kadus II', koordinat: { x: 25, y: 65 } },
  { id: 'as-5', kode: 'AST.1706.01.2026.005', nama: 'Motor Dinas Sekdes (Honda Win)', kategori: 'Kendaraan', kondisi: 'Rusak Ringan', nilai: 8500000, lokasi: 'Rumah Mas Hedi', koordinat: { x: 50, y: 48 } },
  { id: 'as-6', kode: 'AST.1706.01.2026.006', nama: 'Gedung Serbaguna & Gedung PKK', kategori: 'Gedung', kondisi: 'Baik', nilai: 320000000, lokasi: 'Samping Kantor Desa', koordinat: { x: 42, y: 45 } },
  { id: 'as-7', kode: 'AST.1706.01.2026.007', nama: 'Lahan Ketahanan Pangan Hidroponik', kategori: 'Tanah', kondisi: 'Baik', nilai: 95000000, lokasi: 'Belakang Aula PKK', koordinat: { x: 38, y: 55 } }
];

export const BUMDES_INFO: BumdesUnit[] = [
  { id: 'bm-1', namaUnit: 'Unit Simpan Pinjam "Maju Mandiri"', deskripsi: 'Pemberian pinjaman lunak tanpa agunan berat untuk permodalan tani & IRT dengan bunga sangat rendah 0.5% per bulan.', pengelola: 'Bams Sugiharto', modal: 120000000, kas: 94500000, pendapatan: 14200000 },
  { id: 'bm-2', namaUnit: 'Unit Wisata Air "Bendungan Sungai Pondok"', deskripsi: 'Pengelolaan areal bendungan alam sebagai destinasi piknik keluarga, kolam renang anak, gazebo, & pemancingan.', pengelola: 'Rani Wulandari', modal: 250000000, kas: 145000000, pendapatan: 42300000 },
  { id: 'bm-3', namaUnit: 'Unit Distributor & Saprotan Sawit', deskripsi: 'Penyalur pupuk, racun rumput sekunder, bibit sawit unggul subsidi, & sewa timbangan sawit ram untuk petani desa.', pengelola: 'Tomi Gunawan', modal: 180000000, kas: 68000000, pendapatan: 28500000 }
];

export const LIST_UMKM_PRODUK: UmkmProduk[] = [
  {
    id: 'um-1',
    namaToko: 'Kopi Lestari Pondokpanjang',
    namaProduk: 'Kopi Robusta Asli Dusun II (250g)',
    kategori: 'Makanan',
    harga: 35000,
    stok: 45,
    deskripsi: 'Biji kopi robusta pilihan tanah subur Pondokpanjang, dikeringkan solar-system & dipanggang medium-dark. Menghasilkan rasa cokelat pekat & wangi awet.',
    kontak: 'Dewi Lestari (0812-3456-7890)',
    rating: 4.8
  },
  {
    id: 'um-2',
    namaToko: 'Penggilingan Wayan',
    namaProduk: 'Beras Organik Pandan Wangi (5kg)',
    kategori: 'Pertanian',
    harga: 84000,
    stok: 20,
    deskripsi: 'Beras sehat organik bebas pestisida kimia, diproduksi langsung dari irigasi bendungan sawah Poktan I. Wangi alami & pulen.',
    kontak: 'Wayan Sudarta (0813-9876-5432)',
    rating: 4.9
  },
  {
    id: 'um-3',
    namaToko: 'Craft Anyaman Bambu PKK',
    namaProduk: 'Keranjang Belanja Ramah Lingkungan',
    kategori: 'Kerajinan',
    harga: 25000,
    stok: 12,
    deskripsi: 'Dibuat manual oleh ibu-ibu PKK Pokja II dari bambu hitam tebing desa. Kokoh, estetika, dan sangat tahan lama untuk ke pasar.',
    kontak: 'Ibu Kusih (0821-4433-2211)',
    rating: 4.7
  },
  {
    id: 'um-4',
    namaToko: 'BUMDes Pondok Makmur',
    namaProduk: 'Tiket Terusan Wisata Bendungan Desa',
    kategori: 'Wisata',
    harga: 15000,
    stok: 999,
    deskripsi: 'Akses masuk wahana kolam renang sawah, pondokan gazebo, & sewa ban apung bendungan sungai sepanjang hari.',
    kontak: 'Rani Wulandari (0852-6677-8899)',
    rating: 5.0
  }
];

export const INITIAL_LEMBAGA_DESA: LembagaDesaData[] = [
  { nama: 'Badan Permusyawaratan Desa', singkatan: 'BPD', ketua: 'Drs. H. Mulyono', anggotaCount: 7, tugas: 'Menampung & menyalurkan aspirasi warga, mengarahkan kebijakan kades, & membahas draf Perdes.' },
  { nama: 'Pemberdayaan Kesejahteraan Keluarga', singkatan: 'PKK', ketua: 'Hj. Ratna Sudarsono', anggotaCount: 24, tugas: 'Pembinaan 10 Program Pokok PKK, pengelolaan Posyandu, program stunting, & kerajinan ibu-ibu desa.' },
  { nama: 'Karang Taruna "Karya Muda"', singkatan: 'KT KM', ketua: 'Romi Wijaya', anggotaCount: 35, tugas: 'Pemberdayaan kepemudaan, operasional olahraga (Karang Taruna Arena), pementasan seni, & bakti lingkungan.' },
  { nama: 'Lembaga Pemberdayaan Masyarakat', singkatan: 'LPM', ketua: 'Sukiman Sutrisno', anggotaCount: 9, tugas: 'Penyusunan rencana pembangunan desa partisipatif & pelestarian gotong royong swadaya masyarakat.' },
  { nama: 'Pertahanan Sipil / Linmas', singkatan: 'LINMAS', ketua: 'Komandan Wagiman', anggotaCount: 16, tugas: 'Mitigasi kebencanaan lokal, perbantuan ronda malam, pemilu, & pengamanan hajatan adat/warga.' }
];

export const INITIAL_PENGADUAN: PengaduanTiket[] = [
  {
    id: 'TKT-001',
    namaPengadu: 'Budi Santoso',
    kategori: 'Infrastruktur',
    tanggal: '2026-05-20',
    isi: 'Selamat pagi kades, tiang penyangga jembatan gantung penghubung Dusun I ke kebun sawit warga mulai retak akibat pengikisan arus air bendungan. Mohon segera dicek sebelum ambruk.',
    status: 'Diproses',
    tanggapan: 'Terima kasih laporan Pak Budi. Kaur Pembangunan & Pendamping Desa sudah melakukan pengukuran kemarin sore. Pembiayaan rehabilitasi darurat telah dimasukkan ke Perubahan APBDes APB-6.'
  },
  {
    id: 'TKT-002',
    namaPengadu: 'Wayan Sudarta',
    kategori: 'Layanan',
    tanggal: '2026-05-24',
    isi: 'Sistem surat online HEDRA CMS luar biasa mudah digunakan! Kemarin saya apply Surat Keterangan Usaha (SKU) jam 9 pagi, jam 11 sudah disetujui Pak Kades. Hanya saja QR Code-nya apa bisa diprint hitam putih biasa atau wajib warna? Terima kasih.',
    status: 'Selesai',
    tanggapan: 'Bisa diprint hitam putih, Pak Wayan! QR Code HEDRA memiliki verifikasi kontras tinggi (PageSpeed optimized & print-safe). Siapapun, termasuk bank, dapat menscan QR tersebut untuk memverifikasi keaslian dokumen di database desa (https://pondokpanjang.desa.id).'
  },
  {
    id: 'TKT-003',
    namaPengadu: 'Imron Rosadi',
    kategori: 'Keamanan',
    tanggal: '2026-06-01',
    isi: 'Ada indikasi hewan liar anjing hutan masuk areal peternakan ayam warga di RT 03 Dusun II. Mohon kiranya regu Linmas melakukan siskamling khusus malam minggu ini.',
    status: 'Diterima',
    tanggapan: 'Laporan diverifikasi. Regu Linmas yang dipimpin Komandan Wagiman telah menjadwalkan patroli malam area perbatasan hutan karet mulai malam ini.'
  }
];

export const INITIAL_SURAT: SuratPermohonan[] = [
  {
    id: 'SRT-9426',
    nik: '1706011204850001',
    namaPemohon: 'Budi Santoso',
    jenisSurat: 'Surat Keterangan Usaha (SKU)',
    tanggalPermohonan: '2026-06-01',
    keperluan: 'Syarat pengajuan Kredit Usaha Rakyat (KUR) Mandiri untuk pemenuhan pupuk kebun sawit.',
    status: 'Selesai',
    keterangan: 'Surat dicetak, ditandatangani digital (QR), & diarsip.',
    qrcodeContent: 'VERIFIED: HEDRA-CMS_SRT-9426_PEMOHON:BudiSantoso_KADES:Sudarsono'
  },
  {
    id: 'SRT-9427',
    nik: '1706012408790001',
    namaPemohon: 'Wayan Sudarta',
    jenisSurat: 'Surat Keterangan Kematian (SKK)',
    tanggalPermohonan: '2026-06-02',
    keperluan: 'Pengurusan klaim asuransi ahli waris & pencatatan database penduduk.',
    status: 'Verifikasi',
    keterangan: 'Menunggu validasi berkas kematian dari Kepala Dusun I.',
    qrcodeContent: 'VERIFIED: HEDRA-CMS_SRT-9427_PEMOHON:WayanSudarta_STATUS:Verifikasi'
  },
  {
    id: 'SRT-9428',
    nik: '1706011409940004',
    namaPemohon: 'Dewi Lestari',
    jenisSurat: 'Surat Pengantar SKCK',
    tanggalPermohonan: '2026-06-03',
    keperluan: 'Pencalonan pengurus koperasi kabupaten & keperluan profesional.',
    status: 'Operator',
    keterangan: 'Menunggu cetak draf dikoordinasi Mas Hedi.',
    qrcodeContent: 'VERIFIED: HEDRA-CMS_SRT-9428_PEMOHON:DewiLestari_STATUS:Operator'
  }
];
