import React, { useState, useEffect } from 'react';
import { LIST_PENDUDUK, INITIAL_PENGADUAN, INITIAL_SURAT, INITIAL_LEDBERG_APBDES } from '../data/mockData';
import { 
  Users, FileText, CheckCircle, HelpCircle, Activity, BarChart2, Plus, Globe, 
  Sparkles, TrendingUp, Server, Shield, Database, Code, Terminal, Sliders, 
  Cpu, Layers, Lock, RefreshCw, FolderGit, CheckSquare, Play, Send, Eye, AppWindow,
  Search, Info, AlertCircle, Link
} from 'lucide-react';

export default function CoreDashboard() {
  const [activeSegment, setActiveSegment] = useState<'portal' | 'system'>('portal');
  const [visitorCount, setVisitorCount] = useState(1408);
  const [blogs, setBlogs] = useState([
    { id: 1, judul: 'Penyaluran Pupuk Subsidi Sektor Sawit Berjalan Lancar di Dusun I', status: 'Published', tanggal: '2026-06-01', views: 342, author: 'Mas Hedi' },
    { id: 2, judul: 'Waspada Serangan Hama Wereng, Poktan Sawah Gelar Sosialisasi', status: 'Published', tanggal: '2026-05-28', views: 189, author: 'Kasi Pemerintahan' },
    { id: 3, judul: 'Draf Peraturan Desa Sinergitas BUMDes dan UMKM Masuki Uji Publik', status: 'Draft', tanggal: '2026-06-02', views: 0, author: 'Mas Hedi' }
  ]);
  const [newTitle, setNewTitle] = useState('');
  const [blogStatus, setBlogStatus] = useState<'Publish'|'Draft'>('Publish');

  const addBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    const newPost = {
      id: Date.now(),
      judul: newTitle,
      status: blogStatus === 'Publish' ? 'Published' : 'Draft',
      tanggal: new Date().toISOString().split('T')[0],
      views: 0,
      author: 'Mas Hedi'
    };
    setBlogs([newPost, ...blogs]);
    setNewTitle('');
  };

  const revenueSum = INITIAL_LEDBERG_APBDES
    .filter(item => item.tipe === 'Pendapatan')
    .reduce((sum, item) => sum + item.realisasi, 0);

  const spendingSum = INITIAL_LEDBERG_APBDES
    .filter(item => item.tipe === 'Belanja')
    .reduce((sum, item) => sum + item.realisasi, 0);

  // --- PRD LEVEL 2 STATE ---
  const [activeLayer, setActiveLayer] = useState<'presentation' | 'application' | 'service' | 'repository' | 'database'>('presentation');
  
  // Custom Modules State (Install / Enable / Disable)
  const [moduleStates, setModuleStates] = useState<{ [key: string]: 'active' | 'inactive' | 'uninstalled' }>({
    'cms': 'active',
    'news': 'active',
    'village-profile': 'active',
    'letters': 'active',
    'population': 'active',
    'complaints': 'active',
    'apbdes': 'active',
    'assets': 'active',
    'taxes': 'active',
    'tourism': 'active',
    'umkm': 'active',
    'bumdes': 'active',
    'posbankum': 'active',
    'attendance': 'active',
    'gis': 'active'
  });

  const toggleModule = (moduleKey: string, nextState: 'active' | 'inactive' | 'uninstalled') => {
    setModuleStates(prev => ({
      ...prev,
      [moduleKey]: nextState
    }));
    addSystemLog(`Modul '${moduleKey}' diubah statusnya menjadi '${nextState.toUpperCase()}'`);
  };

  // Systems Logs Simulated
  const [systemLogs, setSystemLogs] = useState<string[]>([
    'System: HEDRA Core engine booted successfully on cPanel host.',
    'System: Auth middleware integrated via Laravel Sanctum emulation.',
    'System: Database connection MySQL @ localhost (HEDRA_db) - Port 3306 ESTABLISHED.',
    'Cache: Storage cache initialized with automatic Redis TTL configured to 3600s.',
    'Security: Brute-force listener initialized with peak rate limit 60 requests/min.'
  ]);

  const addSystemLog = (msg: string) => {
    const time = new Date().toLocaleTimeString('id-Id');
    setSystemLogs(prev => [`[${time}] ${msg}`, ...prev.slice(0, 7)]);
  };

  // Selected Schema for Interactive Explorer
  const [selectedSchema, setSelectedSchema] = useState<string>('users');
  const [schemaSampleOutput, setSchemaSampleOutput] = useState<string>('Pilih tabel di kiri lalu klik "Ambil Sampel Data" untuk mengambil Record Live.');

  const tablesStructure: any = {
    users: {
      columns: [
        { name: 'id', type: 'BIGINT (PK)', attribs: 'UNSIGNED AUTO_INCREMENT' },
        { name: 'uuid', type: 'CHAR(36)', attribs: 'UNIQUE NOT NULL' },
        { name: 'name', type: 'VARCHAR(150)', attribs: 'NOT NULL' },
        { name: 'username', type: 'VARCHAR(50)', attribs: 'UNIQUE NOT NULL' },
        { name: 'email', type: 'VARCHAR(100)', attribs: 'UNIQUE NOT NULL' },
        { name: 'password', type: 'VARCHAR(255)', attribs: 'NOT NULL (Argon2id)' },
        { name: 'phone', type: 'VARCHAR(20)', attribs: 'NULL' },
        { name: 'avatar', type: 'VARCHAR(255)', attribs: 'NULL' },
        { name: 'status', type: 'ENUM(\'active\',\'inactive\')', attribs: 'DEFAULT \'active\'' },
        { name: 'created_at', type: 'TIMESTAMP', attribs: 'DEFAULT CURRENT_TIMESTAMP' }
      ],
      mockCount: 5,
      getMockData: () => [
        { id: 1, uuid: '53603dcc-68e1-4c1b-9da8-a401c4323e01', name: 'H. Sudarsono, M.AP', username: 'kades_muko', email: 'kades@pondokpanjang.desa.id', status: 'active', created_at: '2026-01-10 08:22' },
        { id: 2, uuid: 'f4b16259-2b00-4b21-88ec-a309e3a67735', name: 'Hedi Kiswanto, S.Kom', username: 'mas_hedi', email: 'sekdes@pondokpanjang.desa.id', status: 'active', created_at: '2026-01-10 08:30' },
        { id: 3, uuid: '98403dcc-68e1-4c1b-9da8-c419c4323e10', name: 'Siti Rahma, A.Md.Ak', username: 'siti_keu', email: 'siti@pondokpanjang.desa.id', status: 'active', created_at: '2026-01-12 09:15' }
      ]
    },
    roles: {
      columns: [
        { name: 'id', type: 'INT (PK)', attribs: 'UNSIGNED AUTO_INCREMENT' },
        { name: 'name', type: 'VARCHAR(50)', attribs: 'NOT NULL' },
        { name: 'slug', type: 'VARCHAR(50)', attribs: 'UNIQUE NOT NULL' }
      ],
      mockCount: 9,
      getMockData: () => [
        { id: 1, name: 'Super Admin', slug: 'super-admin' },
        { id: 2, name: 'Administrator', slug: 'administrator' },
        { id: 3, name: 'Village Officer (Aparatur)', slug: 'village-officer' },
        { id: 4, name: 'Citizen (Warga)', slug: 'citizen' }
      ]
    },
    citizens: {
      columns: [
        { name: 'id', type: 'BIGINT (PK)', attribs: 'UNSIGNED AUTO_INCREMENT' },
        { name: 'nik', type: 'CHAR(16)', attribs: 'UNIQUE NOT NULL' },
        { name: 'no_kk', type: 'CHAR(16)', attribs: 'NOT NULL' },
        { name: 'nama', type: 'VARCHAR(150)', attribs: 'NOT NULL' },
        { name: 'tempat_lahir', type: 'VARCHAR(100)', attribs: 'NOT NULL' },
        { name: 'tanggal_lahir', type: 'DATE', attribs: 'NOT NULL' },
        { name: 'jenis_kelamin', type: 'ENUM(\'Laki-laki\',\'Perempuan\')', attribs: 'NOT NULL' },
        { name: 'agama', type: 'VARCHAR(50)', attribs: 'NOT NULL' },
        { name: 'pendidikan', type: 'VARCHAR(100)', attribs: 'NOT NULL' },
        { name: 'pekerjaan', type: 'VARCHAR(150)', attribs: 'NOT NULL' },
        { name: 'alamat', type: 'TEXT', attribs: 'NOT NULL' }
      ],
      mockCount: LIST_PENDUDUK.length,
      getMockData: () => LIST_PENDUDUK.slice(0, 3)
    },
    letters: {
      columns: [
        { name: 'id', type: 'BIGINT (PK)', attribs: 'UNSIGNED AUTO_INCREMENT' },
        { name: 'citizen_id', type: 'BIGINT (FK)', attribs: 'REFERENCES citizens(id)' },
        { name: 'template_id', type: 'INT (FK)', attribs: 'REFERENCES letter_templates(id)' },
        { name: 'nomor_surat', type: 'VARCHAR(100)', attribs: 'UNIQUE NOT NULL' },
        { name: 'status', type: 'VARCHAR(50)', attribs: 'NOT NULL' },
        { name: 'created_at', type: 'TIMESTAMP', attribs: 'DEFAULT CURRENT_TIMESTAMP' }
      ],
      mockCount: INITIAL_SURAT.length,
      getMockData: () => INITIAL_SURAT.slice(0, 3)
    },
    apbdes: {
      columns: [
        { name: 'id', type: 'BIGINT (PK)', attribs: 'UNSIGNED AUTO_INCREMENT' },
        { name: 'tipe', type: 'ENUM(\'Pendapatan\',\'Belanja\',\'Pembiayaan\')', attribs: 'NOT NULL' },
        { name: 'kategori', type: 'VARCHAR(150)', attribs: 'NOT NULL' },
        { name: 'rincian', type: 'TEXT', attribs: 'NOT NULL' },
        { name: 'anggaran', type: 'DECIMAL(15,2)', attribs: 'NOT NULL DEFAULT 0.00' },
        { name: 'realisasi', type: 'DECIMAL(15,2)', attribs: 'NOT NULL DEFAULT 0.00' }
      ],
      mockCount: INITIAL_LEDBERG_APBDES.length,
      getMockData: () => INITIAL_LEDBERG_APBDES.slice(0, 4)
    },
    audit_logs: {
      columns: [
        { name: 'id', type: 'BIGINT (PK)', attribs: 'UNSIGNED AUTO_INCREMENT' },
        { name: 'user_id', type: 'BIGINT (FK)', attribs: 'REFERENCES users(id) ON DELETE SET NULL' },
        { name: 'action', type: 'VARCHAR(255)', attribs: 'NOT NULL' },
        { name: 'ip_address', type: 'VARCHAR(45)', attribs: 'NOT NULL' },
        { name: 'created_at', type: 'TIMESTAMP', attribs: 'DEFAULT CURRENT_TIMESTAMP' }
      ],
      mockCount: 1422,
      getMockData: () => [
        { id: 1042, user_id: 2, action: 'CREATE_LETTER (No: 140/PP.01/VI/2026)', ip_address: '114.124.208.5', created_at: new Date().toISOString() },
        { id: 1041, user_id: 2, action: 'UPDATE_APBDES_REALIZATION (Category: Pendapatan Dana Desa)', ip_address: '114.124.208.5', created_at: new Date().toISOString() },
        { id: 1040, user_id: 1, action: 'LOGIN_SUCCESS', ip_address: '36.85.91.12', created_at: new Date().toISOString() }
      ]
    }
  };

  const handleQueryLiveSample = () => {
    const tableObj = tablesStructure[selectedSchema];
    if (tableObj) {
      const data = tableObj.getMockData();
      setSchemaSampleOutput(JSON.stringify(data, null, 2));
      addSystemLog(`Melakukan query live relasional untuk skema \`${selectedSchema}\`.`);
    }
  };

  // REST API Simulator
  const [selectedEndpoint, setSelectedEndpoint] = useState<string>('GET /api/posts');
  const [apiResponseOutput, setApiResponseOutput] = useState<string>('Pilih rute API dan klik "Send Request" untuk memicu emulator.');
  const [apiLatency, setApiLatency] = useState<number | null>(null);

  const triggerApiRequest = () => {
    setApiLatency(null);
    addSystemLog(`Memicu endpoint HEDRA REST API: \`${selectedEndpoint}\``);
    
    setTimeout(() => {
      let payload: any = {};
      const latencyStr = Math.floor(Math.random() * 30 + 15);
      setApiLatency(latencyStr);

      switch(selectedEndpoint) {
        case 'GET /api/posts':
          payload = {
            success: true,
            status: '200 OK',
            timestamp: new Date().toISOString(),
            meta: { total: blogs.length, limit: 10, page: 1 },
            data: blogs.map(b => ({
              id: b.id,
              title: b.judul,
              slug: b.judul.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
              status: b.status,
              published_at: b.tanggal,
              author_id: b.author === 'Mas Hedi' ? 2 : 1
            }))
          };
          break;
        case 'GET /api/citizens':
          payload = {
            success: true,
            status: '200 OK',
            timestamp: new Date().toISOString(),
            meta: { count_records: LIST_PENDUDUK.length },
            data: LIST_PENDUDUK.slice(0, 5)
          };
          break;
        case 'GET /api/letters':
          payload = {
            success: true,
            status: '200 OK',
            timestamp: new Date().toISOString(),
            meta: { total_issued: INITIAL_SURAT.length },
            data: INITIAL_SURAT.slice(0, 4)
          };
          break;
        case 'GET /api/apbdes':
          payload = {
            success: true,
            status: '200 OK',
            timestamp: new Date().toISOString(),
            summary: {
              total_pendapatan: revenueSum,
              total_belanja: spendingSum,
              status_anggaran: 'Surplus'
            },
            data: INITIAL_LEDBERG_APBDES
          };
          break;
        case 'GET /api/umkm':
          payload = {
            success: true,
            status: '200 OK',
            timestamp: new Date().toISOString(),
            data: [
              { id: 101, owner_name: 'Pak Harjo', business_name: 'Madu Kelulut Murni', category: 'Herbal & Kesehatan' },
              { id: 102, owner_name: 'Ibu Ratna', business_name: 'Keripik Tempe Renyah', category: 'Kuliner' }
            ]
          };
          break;
        case 'GET /api/complaints':
          payload = {
            success: true,
            status: '200 OK',
            timestamp: new Date().toISOString(),
            data: INITIAL_PENGADUAN
          };
          break;
        default:
          payload = { error: 'Unknown Endpoint' };
      }

      setApiResponseOutput(JSON.stringify(payload, null, 2));
    }, 400);
  };

  // Custom SDK Manifest Playground
  const [manifestType, setManifestType] = useState<'plugin' | 'theme'>('plugin');
  const [manifestContent, setManifestContent] = useState<string>(`{
  "name": "Sistem Pembayaran Pajak PBB HEDRA",
  "version": "1.0.5",
  "author": "Mas Hedi",
  "license": "GPLv3",
  "required_version": "v1.2.0-Pro",
  "sandbox": true,
  "capabilities": [
    "manage_tax",
    "create_letter"
  ]
}`);
  const [manifestVerifyResult, setManifestVerifyResult] = useState<{ status: 'idle' | 'success' | 'error', message: string }>({ status: 'idle', message: '' });

  const handleVerifyManifest = () => {
    try {
      const parsed = JSON.parse(manifestContent);
      if (!parsed.name || !parsed.version || !parsed.author) {
        throw new Error('Manifest missing critical nodes: "name", "version", or "author" fields required.');
      }
      setManifestVerifyResult({
        status: 'success',
        message: `Verifikasi Sukses! Manifest ${manifestType.toUpperCase()} \`${parsed.name}\` valid & lulus uji sandboxing cPanel HEDRA.`
      });
      addSystemLog(`Engine: Validasi manifest ${manifestType} \`${parsed.name}\` BERHASIL.`);
    } catch (err: any) {
      setManifestVerifyResult({
        status: 'error',
        message: `Gagal Validasi JSON: ${err.message}`
      });
      addSystemLog(`Engine Error: Validasi manifest ${manifestType} GAGAL.`);
    }
  };

  const loadThemeSample = () => {
    setManifestType('theme');
    setManifestContent(`{
  "name": "Bengkulu Hijau Sawit Modern",
  "version": "2.1.0",
  "author": "Mas Hedi Dev",
  "dependencies": {
    "core": "v1.2.0-Pro",
    "gis": "enable"
  },
  "widgets": [
    "peta_gis_desa",
    "apbdes_progress_chart"
  ]
}`);
  };

  const loadPluginSample = () => {
    setManifestType('plugin');
    setManifestContent(`{
  "name": "Sistem Pembayaran Pajak PBB HEDRA",
  "version": "1.0.5",
  "author": "Mas Hedi",
  "license": "GPLv3",
  "required_version": "v1.2.0-Pro",
  "sandbox": true,
  "capabilities": [
    "manage_tax",
    "create_letter"
  ]
}`);
  };

  // Security Helper: Live Argon2id simulator
  const [plainPassword, setPlainPassword] = useState<string>('Pondokpanjang2026!');
  const [hashedPassword, setHashedPassword] = useState<string>('');

  useEffect(() => {
    // Generate a beautiful mock Argon2id salt prefix hash
    if (!plainPassword) {
      setHashedPassword('');
      return;
    }
    const fakeArgon2 = `$argon2id$v=19$m=65536,t=4,p=1$c2FsdHNhbHRzYWx0c2FsdA$${btoa(plainPassword).substring(0, 24)}...`;
    setHashedPassword(fakeArgon2);
  }, [plainPassword]);

  // Security Helper: Live 2FA OTP simulation
  const [otpCode, setOtpCode] = useState<string>('408221');
  const [otpProgress, setOtpProgress] = useState<number>(100);

  useEffect(() => {
    const interval = setInterval(() => {
      setOtpProgress(prev => {
        if (prev <= 5) {
          // Generate a new 6 digit string
          const newCode = Math.floor(100000 + Math.random() * 900000).toString();
          setOtpCode(newCode);
          addSystemLog(`Security Auth: Kode 2FA OTP baru digenerasi secara acak: ${newCode}`);
          return 100;
        }
        return prev - 5;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Multi Tenant Active Village selection
  const [activeTenant, setActiveTenant] = useState<string>('pondokpanjang');

  const tenantConfig: any = {
    pondokpanjang: {
      dbPartName: 'db_partition_des01_muko',
      bucket: 's3://pondokpanjang-hedra-bucket/media/',
      status: 'PRISTINE / ACTIVE',
      tenantColor: 'border-emerald-500'
    },
    airputih: {
      dbPartName: 'db_partition_des02_airputih',
      bucket: 's3://airputih-hedra-bucket/media/',
      status: 'STAGING LIVE',
      tenantColor: 'border-blue-500'
    },
    lubukpinang: {
      dbPartName: 'db_partition_des03_lupin',
      bucket: 's3://lubukpinang-hedra-bucket/media/',
      status: 'SANDBOX TEST BED',
      tenantColor: 'border-amber-500'
    }
  };

  return (
    <div className="space-y-6" id="dashboard-core">
      
      {/* 1. Switch Segment Tab Bar (Portal Operator v/s System architecture Explorer) */}
      <div className="flex bg-white rounded-xl p-1.5 border border-slate-200 shadow-sm gap-2">
        <button 
          onClick={() => setActiveSegment('portal')}
          className={`flex-1 sm:flex-none flex items-center justify-center gap-2 py-3 px-6 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            activeSegment === 'portal' 
              ? 'bg-emerald-600 text-white shadow-sm' 
              : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          <EYEIcon className="w-4 h-4" />
          <span>Kinerja Portal & Operator Berita</span>
        </button>
        <button 
          onClick={() => setActiveSegment('system')}
          className={`flex-1 sm:flex-none flex items-center justify-center gap-2 py-3 px-6 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            activeSegment === 'system' 
              ? 'bg-emerald-600 text-white shadow-sm' 
              : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          <Cpu className="w-4 h-4" />
          <span>Arsitektur Sistem & Core Engine (PRD L2)</span>
        </button>
      </div>

      {activeSegment === 'portal' ? (
        <>
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 flex items-center space-x-4 hover:shadow-md transition-shadow">
              <div className="p-3 bg-indigo-50 rounded-lg text-indigo-600">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Penduduk</p>
                <h4 className="text-2xl font-bold font-display text-slate-800">{LIST_PENDUDUK.length * 52} <span className="text-xs text-indigo-500 font-normal">Jiwa</span></h4>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 flex items-center space-x-4 hover:shadow-md transition-shadow">
              <div className="p-3 bg-emerald-50 rounded-lg text-emerald-600">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Surat Aktif</p>
                <h4 className="text-2xl font-bold font-display text-slate-800">{INITIAL_SURAT.length} <span className="text-xs text-emerald-500 font-normal">Berkas</span></h4>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 flex items-center space-x-4 hover:shadow-md transition-shadow">
              <div className="p-3 bg-amber-50 rounded-lg text-amber-600">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">BUMDes Unit</p>
                <h4 className="text-2xl font-bold font-display text-slate-800">3 <span className="text-xs text-amber-500 font-normal">Unit</span></h4>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 flex items-center space-x-4 hover:shadow-md transition-shadow">
              <div className="p-3 bg-rose-50 rounded-lg text-rose-600">
                <HelpCircle className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Pengaduan</p>
                <h4 className="text-2xl font-bold font-display text-slate-800">{INITIAL_PENGADUAN.filter(p=>p.status!=='Selesai').length} <span className="text-xs text-rose-500 font-normal">Proses</span></h4>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 flex items-center space-x-4 hover:shadow-md transition-shadow col-span-1 md:col-span-2">
              <div className="p-3 bg-violet-50 rounded-lg text-violet-600">
                <Activity className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Kas Pendapatan Desa</p>
                <h4 className="text-lg font-bold font-display text-slate-800">
                  Rp {(revenueSum).toLocaleString('id-ID')}
                </h4>
                <div className="w-full bg-slate-100 h-1.5 rounded-full mt-1.5 overflow-hidden">
                  <div 
                    className="bg-violet-600 h-full rounded-full" 
                    style={{ width: `${Math.min((spendingSum / revenueSum) * 100, 100)}%` }}
                  ></div>
                </div>
                <p className="text-[10px] text-slate-400 mt-1">Realisasi Belanja: Rp {spendingSum.toLocaleString('id-ID')}</p>
              </div>
            </div>
          </div>

          {/* Main Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left column: Quick Visitor Insight & Mini Charts */}
            <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-bold font-display text-slate-800 flex items-center gap-2">
                    <Globe className="w-5 h-5 text-emerald-600" /> Metrik Pengunjung Website Desa
                  </h3>
                  <p className="text-xs text-slate-400">Analisis traffic kunjungan portal Pondokpanjang secara live</p>
                </div>
                <span className="text-xs px-2.5 py-1 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-full font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></span> Live Real-time
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 relative overflow-hidden">
                  <p className="text-xs text-slate-400 font-medium">Hari Ini</p>
                  <h4 className="text-xl font-bold font-display mt-1 text-slate-800">421 <span className="text-xs text-emerald-500 font-normal">Kunjungan</span></h4>
                  <span className="absolute right-3 bottom-3 text-xs font-semibold text-emerald-600 flex items-center gap-0.5">
                    <TrendingUp className="w-3.5 h-3.5" /> +12%
                  </span>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 relative overflow-hidden">
                  <p className="text-xs text-slate-400 font-medium">Bulan Ini</p>
                  <h4 className="text-xl font-bold font-display mt-1 text-slate-800">8,908 <span className="text-xs text-emerald-500 font-normal">Kunjungan</span></h4>
                  <p className="text-[10px] text-slate-400 mt-1">Sesuai SEO Target</p>
                </div>
                <div className="p-4 bg-emerald-950 text-white rounded-xl relative overflow-hidden bg-grid-white">
                  <p className="text-xs text-emerald-200 font-medium">Total PageViews</p>
                  <h4 className="text-xl font-bold font-display mt-1 text-emerald-100">{(visitorCount * 12).toLocaleString('id-ID')}</h4>
                  <button 
                    onClick={() => {
                      setVisitorCount(prev => prev + 17);
                      addSystemLog('Traffic: Simulasi +17 Portal Hits terdeteksi dan tercatat di cache.');
                    }}
                    className="text-[10px] bg-white/20 hover:bg-white/30 text-emerald-100 px-2 py-0.5 rounded-md mt-1 cursor-pointer transition-colors"
                  >
                    + Simulasi Hits
                  </button>
                </div>
              </div>

              {/* Simple Highly visual SVG bar chart for page performance */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs text-slate-500 font-medium">
                  <span>Kecepatan Render Portal HEDRA</span>
                  <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">Rata-rata: 210 ms (PageSpeed: 98/100)</span>
                </div>
                <div className="h-28 flex items-end justify-between px-4 pb-2 bg-slate-50 rounded-xl border border-slate-100 relative pt-6 animate-fade-in">
                  <div className="absolute top-2 left-4 text-[10px] text-slate-400 font-mono">Batas Ideal TTFB (500ms)</div>
                  <div className="absolute top-5 left-0 right-0 border-t border-dashed border-rose-300 pointer-events-none"></div>
                  
                  <div className="flex flex-col items-center flex-1">
                    <div className="w-7 bg-emerald-600 rounded-t-md hover:bg-emerald-700 transition-colors h-14 relative group">
                      <span className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-1.5 py-0.5 rounded whitespace-nowrap z-10">140 ms</span>
                    </div>
                    <span className="text-[9px] text-slate-400 mt-1">Senin</span>
                  </div>
                  <div className="flex flex-col items-center flex-1">
                    <div className="w-7 bg-emerald-600 rounded-t-md hover:bg-emerald-700 transition-colors h-16 relative group">
                      <span className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-1.5 py-0.5 rounded whitespace-nowrap z-10">160 ms</span>
                    </div>
                    <span className="text-[9px] text-slate-400 mt-1">Selasa</span>
                  </div>
                  <div className="flex flex-col items-center flex-1">
                    <div className="w-7 bg-emerald-600 rounded-t-md hover:bg-emerald-700 transition-colors h-12 relative group">
                      <span className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-1.5 py-0.5 rounded whitespace-nowrap z-10">120 ms</span>
                    </div>
                    <span className="text-[9px] text-slate-400 mt-1">Rabu</span>
                  </div>
                  <div className="flex flex-col items-center flex-1">
                    <div className="w-7 bg-emerald-500 rounded-t-md hover:bg-emerald-600 transition-colors h-8 relative group">
                      <span className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-1.5 py-0.5 rounded whitespace-nowrap z-10">80 ms</span>
                    </div>
                    <span className="text-[9px] text-slate-400 mt-1">Kamis</span>
                  </div>
                  <div className="flex flex-col items-center flex-1">
                    <div className="w-7 bg-emerald-600 rounded-t-md hover:bg-emerald-700 transition-colors h-20 relative group">
                      <span className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-1.5 py-0.5 rounded whitespace-nowrap z-10">200 ms</span>
                    </div>
                    <span className="text-[9px] text-slate-400 mt-1">Jumat</span>
                  </div>
                  <div className="flex flex-col items-center flex-1">
                    <div className="w-7 bg-emerald-600 rounded-t-md hover:bg-emerald-700 transition-colors h-10 relative group">
                      <span className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-1.5 py-0.5 rounded whitespace-nowrap z-10">100 ms</span>
                    </div>
                    <span className="text-[9px] text-slate-400 mt-1">Sabtu</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right column: Article & News Publisher */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-md font-bold font-display text-slate-800 flex items-center gap-2">
                    <Sparkles className="w-4.5 h-4.5 text-amber-500" /> Penulisan Artikel Desa
                  </h3>
                  <span className="text-[10px] font-mono text-slate-400">Core CMS</span>
                </div>

                <form onSubmit={addBlog} className="space-y-3 mb-4">
                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">Judul Artikel/Kabar Desa Baru</label>
                    <input 
                      type="text" 
                      value={newTitle}
                      onChange={e => setNewTitle(e.target.value)}
                      placeholder="Contoh: Panen Raya Sawah Dusun II Memuaskan..."
                      className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 bg-slate-50"
                    />
                  </div>

                  <div className="flex gap-2">
                    <button 
                      type="button" 
                      onClick={() => setBlogStatus('Publish')}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-semibold cursor-pointer border transition-all ${blogStatus === 'Publish' ? 'bg-emerald-50 text-emerald-700 border-emerald-300' : 'bg-slate-50 text-slate-500 border-slate-200'}`}
                    >
                      Langsung Publish
                    </button>
                    <button 
                      type="button" 
                      onClick={() => setBlogStatus('Draft')}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-semibold cursor-pointer border transition-all ${blogStatus === 'Draft' ? 'bg-indigo-50 text-indigo-700 border-indigo-300' : 'bg-slate-50 text-slate-500 border-slate-200'}`}
                    >
                      Simpan Draft
                    </button>
                  </div>

                  <button 
                    type="submit" 
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 rounded-lg text-xs flex items-center justify-center gap-1 cursor-pointer transition-colors mt-2"
                  >
                    <Plus className="w-3.5 h-3.5" /> Terbitkan Berita
                  </button>
                </form>
              </div>

              <div className="border-t border-slate-100 pt-4">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Daftar Artikel Aktif</h4>
                <div className="space-y-2 h-36 overflow-y-auto pr-1">
                  {blogs.map(post => (
                    <div key={post.id} className="flex justify-between items-center p-2 rounded bg-slate-50 border border-slate-100 text-xs">
                      <div className="truncate flex-1 pr-2">
                        <p className="font-semibold text-slate-700 truncate">{post.judul}</p>
                        <span className="text-[10px] text-slate-400">{post.tanggal} · Oleh {post.author}</span>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold font-mono ${post.status === 'Published' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                        {post.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </>
      ) : (
        /* --- INTEGRATED PRD LEVEL 2 SYSTEM ARCHITECTURE & CORE SYSTEM VIEW --- */
        <div className="space-y-6 animate-fade-in" id="prd-l2-workspace">
          
          {/* Top Banner Alert clarifying actual dynamic code architectures */}
          <div className="bg-slate-900 text-slate-100 p-4 rounded-xl border border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-lg border border-emerald-500/20">
                <Terminal className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xs font-extrabold uppercase tracking-widest text-emerald-400">cPanel Shared Hosting Ready Dashboard</h4>
                <p className="text-[11px] text-slate-400">Kepatuhan Arsitektur HEDRA Level 2: Database Relasional, RBAC, Rest API & Plugin Sandboxed.</p>
              </div>
            </div>
            <div className="flex gap-2">
              <span className="text-[9px] bg-slate-800 text-slate-300 font-mono font-bold uppercase tracking-wider px-2 py-1 rounded">
                Laravel 12 LTS Emulation
              </span>
              <span className="text-[9px] bg-emerald-500 text-slate-950 font-mono font-bold uppercase tracking-wider px-2 py-1 rounded animate-pulse">
                SQLite/MySQL Connected
              </span>
            </div>
          </div>

          {/* Quick specs matrix */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            <div className="p-3.5 bg-white border border-slate-200 rounded-xl">
              <p className="text-[10px] text-slate-400 uppercase font-mono font-bold">API Auth Scheme</p>
              <p className="text-xs font-bold text-slate-800 mt-1">Laravel Sanctum / JWT</p>
            </div>
            <div className="p-3.5 bg-white border border-slate-200 rounded-xl">
              <p className="text-[10px] text-slate-400 uppercase font-mono font-bold">Secure Hash Type</p>
              <p className="text-xs font-bold text-slate-800 mt-1">Argon2id (PHP 8.4+)</p>
            </div>
            <div className="p-3.5 bg-white border border-slate-200 rounded-xl">
              <p className="text-[10px] text-slate-400 uppercase font-mono font-bold">Cache Driver</p>
              <p className="text-xs font-bold text-slate-800 mt-1">Redis / File Cache</p>
            </div>
            <div className="p-3.5 bg-white border border-slate-200 rounded-xl">
              <p className="text-[10px] text-slate-400 uppercase font-mono font-bold">Storage strategy</p>
              <p className="text-xs font-bold text-slate-800 mt-1">S3 Compatible / MinIO</p>
            </div>
            <div className="p-3.5 bg-white border border-slate-200 rounded-xl col-span-2 md:col-span-1">
              <p className="text-[10px] text-slate-400 uppercase font-mono font-bold">System Status</p>
              <p className="text-xs font-bold text-emerald-600 mt-1 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></span> Pristine & Online
              </p>
            </div>
          </div>

          {/* Side-by-Side: Layer diagram v/s active systems logs */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* 1. Layer Architecture visual board */}
            <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <h3 className="text-sm font-extrabold text-slate-800 flex items-center gap-1.5 uppercase tracking-wide">
                    <Layers className="w-4.5 h-4.5 text-emerald-600" /> Layered System Architecture
                  </h3>
                  <span className="text-[10px] bg-slate-100 text-slate-600 font-bold px-2 py-0.5 rounded uppercase tracking-wider font-mono">Interactive Map</span>
                </div>
                <p className="text-[11px] text-slate-400 mb-5">Klik barisan layer di bawah untuk mendalami log servis, penempatan file dan logic aliran data:</p>

                <div className="space-y-2.5">
                  {[
                    { key: 'presentation', name: '1. Presentation Layer (Vite React + Blade Layouts)', desc: 'Menangani UI, reactive rendering, SPA routers, widget, and AlpineJS components.' },
                    { key: 'application', name: '2. Application Layer (Http / Middleware Router)', desc: 'Menangani CSRF Token, Rate-limiting, authentication sanitization, dan RBAC filters.' },
                    { key: 'service', name: '3. Service Layer (Business Core Services/AI Engine)', desc: 'Kalkulasi APBDes, generator template surat dinas PDF, enkripsi biometrik, and Gemini proxy.' },
                    { key: 'repository', name: '4. Repository Layer (Data Mapping & Cache Provider)', desc: 'Mengabstraksi query SQL, inject Redis caching, and prevent direct raw DB injections.' },
                    { key: 'database', name: '5. Database Layer (Modular MySQL & PostgreSQL)', desc: 'Penyimpanan skema relasional, index audit login, spatial data GIS, dan foreign constraints.' }
                  ].map(layer => {
                    const isSelected = activeLayer === layer.key;
                    return (
                      <div 
                        key={layer.key}
                        onClick={() => {
                          setActiveLayer(layer.key as any);
                          addSystemLog(`Melihat detail implementasi arsitektur: ${layer.name}`);
                        }}
                        className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                          isSelected 
                            ? 'bg-emerald-950 text-white border-emerald-600 shadow-sm' 
                            : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-bold leading-none">{layer.name}</span>
                          <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded font-semibold ${isSelected ? 'bg-emerald-800 text-emerald-100' : 'bg-slate-200 text-slate-600'}`}>
                            {isSelected ? 'INSPECTING' : 'VIEW DETAILS'}
                          </span>
                        </div>
                        <p className={`text-[10px] mt-1 line-clamp-1 ${isSelected ? 'text-emerald-250' : 'text-slate-400'}`}>
                          {layer.desc}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Sub layer details print area */}
              <div className="bg-slate-900 text-slate-200 p-4 rounded-xl font-mono text-[10px] mt-4 space-y-1.5">
                <p className="text-emerald-400 font-bold border-b border-slate-800 pb-1 uppercase tracking-wider">
                  &gt;_ Current Selected Layer Specs ({activeLayer.toUpperCase()})
                </p>
                {activeLayer === 'presentation' && (
                  <>
                    <p><span className="text-slate-400">Components:</span> React 18, Vite Bundler, Tailwind CSS, Alpine.js Sandbox</p>
                    <p><span className="text-slate-400">Path Targets:</span> /public/themes/ , /resources/js/App.tsx</p>
                    <p><span className="text-slate-400">Render Speed:</span> SPA Fast Load &lt; 150ms</p>
                  </>
                )}
                {activeLayer === 'application' && (
                  <>
                    <p><span className="text-slate-400">Handlers:</span> Larvel 12 Sanitizers, CORS headers rules, JWT verify</p>
                    <p><span className="text-slate-450">Middleware list:</span> TrimStrings, EncryptCookies, VerifyCsrfToken, EnsureUserHasRole</p>
                    <p><span className="text-slate-400">Limiter:</span> 60 hits/ip/min (429 Too Many Requests response fallback)</p>
                  </>
                )}
                {activeLayer === 'service' && (
                  <>
                    <p><span className="text-slate-400">Service Engs:</span> DocumentPdfGenerator, PopulationTaxCalculator, BiometricMatchingEngine</p>
                    <p><span className="text-slate-400">AI Integration:</span> Gemini API SDK for Draft Legal & Auto Categorizer</p>
                    <p><span className="text-slate-400">Isolation:</span> Sandboxed from primary Web server pool</p>
                  </>
                )}
                {activeLayer === 'repository' && (
                  <>
                    <p><span className="text-slate-400">Pattern:</span> Repository & Unit of Work (PHP 8.4 Interfaces)</p>
                    <p><span className="text-slate-400">Cache Strategy:</span> Cache tags integration. Redis connection via Predis client</p>
                    <p><span className="text-slate-400">Raw Guard:</span> Strictly forbidden direct SQL execution outside ORM wrapper</p>
                  </>
                )}
                {activeLayer === 'database' && (
                  <>
                    <p><span className="text-slate-400">Connection:</span> MySQL 8.0, PostgreSQL, SQLite (for Local testing sandbox)</p>
                    <p><span className="text-slate-400">Keys Integrity:</span> CASCADE on delete, strict secondary key indexes</p>
                    <p><span className="text-slate-400">Spatial Support:</span> MySQL Spatial (Point/Polygon spatial types) for GIS Layer</p>
                  </>
                )}
              </div>
            </div>

            {/* 2. Real-time Live Logs (System Console Console Output) */}
            <div className="lg:col-span-5 bg-slate-950 text-emerald-400 p-6 rounded-2xl border border-slate-900 shadow-md flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center border-b border-slate-800 pb-3 mb-4">
                  <h3 className="text-xs font-bold font-mono uppercase tracking-widest text-white flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-emerald-500 animate-pulse" /> Live Core Logs & Events
                  </h3>
                  <div className="flex gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
                  </div>
                </div>

                <div className="font-mono text-[10px] space-y-2 h-76 overflow-y-auto pr-1">
                  {systemLogs.map((log, idx) => (
                    <div key={idx} className="border-l-2 border-emerald-850 pl-2 leading-relaxed">
                      <span className="text-slate-500">[{logsType(log)}]</span> {log}
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-slate-900 pt-4 mt-4">
                <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                  <span>HEDRA Engine Port: <span className="text-emerald-400 font-semibold">3306</span></span>
                  <button 
                    onClick={() => {
                      setSystemLogs([]);
                      addSystemLog('Console cleaned by Operator Mas Hedi.');
                    }}
                    className="text-[10px] hover:text-white underline cursor-pointer bg-slate-900 px-2 py-0.5 rounded border border-slate-800"
                  >
                    Bersihkan Konsol
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* Module Installer and Enabled Registry */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div>
              <h3 className="text-sm font-extrabold text-slate-800 flex items-center gap-1.5 uppercase tracking-wide">
                <Sliders className="w-4.5 h-4.5 text-emerald-600" /> Modular System Registry & Controls
              </h3>
              <p className="text-xs text-slate-400 mt-1">Sesuai blueprint arsitektur Level 2, seluruh fungsionalitas harus mandiri dan dapat diaktifkan/dinonaktifkan tanpa bentrok:</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {Object.keys(moduleStates).map(modKey => {
                const state = moduleStates[modKey];
                return (
                  <div key={modKey} className="p-3 bg-slate-50 rounded-xl border border-slate-200 hover:border-slate-300 transition-all flex flex-col justify-between space-y-2">
                    <div className="flex justify-between items-start">
                      <span className="text-xs font-bold text-slate-750 font-mono tracking-tight break-all uppercase">
                        {modKey}
                      </span>
                      {state === 'active' && (
                        <span className="text-[8px] bg-emerald-100 text-emerald-800 font-extrabold px-1.5 py-0.2 rounded uppercase font-mono">ACTIVE</span>
                      )}
                      {state === 'inactive' && (
                        <span className="text-[8px] bg-zinc-200 text-zinc-700 font-extrabold px-1.5 py-0.2 rounded uppercase font-mono">DISABLED</span>
                      )}
                      {state === 'uninstalled' && (
                        <span className="text-[8px] bg-rose-100 text-rose-800 font-extrabold px-1.5 py-0.2 rounded uppercase font-mono">REMOVED</span>
                      )}
                    </div>
                    
                    <p className="text-[10px] text-slate-420 line-clamp-1 italic">
                      modules/{modKey}/Controller
                    </p>

                    <div className="flex gap-1.5 pt-1 border-t border-slate-200/50">
                      {state === 'active' ? (
                        <button 
                          onClick={() => toggleModule(modKey, 'inactive')}
                          className="flex-1 text-[9px] bg-zinc-100 hover:bg-zinc-200 text-zinc-850 px-1.5 py-0.5 rounded cursor-pointer font-semibold transition"
                        >
                          Disable
                        </button>
                      ) : (
                        <button 
                          onClick={() => toggleModule(modKey, 'active')}
                          className="flex-1 text-[9px] bg-emerald-50 hover:bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded cursor-pointer font-bold transition"
                        >
                          Enable
                        </button>
                      )}
                      <button 
                        onClick={() => toggleModule(modKey, state === 'uninstalled' ? 'inactive' : 'uninstalled')}
                        className="text-[9px] bg-rose-50 text-rose-600 hover:bg-rose-100 px-1.5 py-0.5 rounded cursor-pointer font-semibold transition"
                      >
                        {state === 'uninstalled' ? 'Install' : 'Uninstall'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Schema Explorer & Raw Query Sandbox */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* A. Skeletal DB Tables Schema Explorer */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-extrabold text-slate-800 flex items-center gap-1.5 uppercase tracking-wide">
                  <Database className="w-4.5 h-4.5 text-emerald-600" /> Relational Database Schema Explorer
                </h3>
                <p className="text-xs text-slate-400 mt-1 mb-4">Sesuai spesifikasi tabel di PRD L2. Pilih tabel dan lakukan runtime query relasional:</p>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                  {/* Tables sidebar */}
                  <div className="sm:col-span-5 space-y-1 h-64 overflow-y-auto pr-1">
                    {Object.keys(tablesStructure).map(tbl => (
                      <button
                        key={tbl}
                        onClick={() => {
                          setSelectedSchema(tbl);
                          setSchemaSampleOutput('Tabel dipilih. Klik "Ambil Sampel Data" untuk mengambil Record.');
                          addSystemLog(`Menjelajahi kamus kolom skema untuk tabel \`${tbl}\``);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold cursor-pointer flex items-center justify-between transition-all ${
                          selectedSchema === tbl 
                            ? 'bg-emerald-600 text-white shadow-sm' 
                            : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <span className="font-mono">dbo.{tbl}</span>
                        <span className={`text-[9px] font-mono font-bold ${selectedSchema === tbl ? 'text-emerald-100' : 'text-slate-400'}`}>
                          ({tablesStructure[tbl].columns.length} cols)
                        </span>
                      </button>
                    ))}
                  </div>

                  {/* Columns schema grid */}
                  <div className="sm:col-span-7 bg-slate-50 p-4 rounded-xl border border-slate-200 overflow-y-auto h-64 space-y-3">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block font-mono border-b border-slate-200 pb-1">
                      Columns of dbo.{selectedSchema} ({tablesStructure[selectedSchema]?.mockCount || 0} Total Records cached)
                    </p>
                    <div className="space-y-1.5 text-[10px] font-mono">
                      {tablesStructure[selectedSchema]?.columns.map((col: any, idx: number) => (
                        <div key={idx} className="flex justify-between items-center bg-white p-1.5 rounded border border-slate-150">
                          <span className="text-emerald-700 font-bold">{col.name}</span>
                          <span className="text-slate-500 text-[9px]">{col.type} <span className="text-slate-350">({col.attribs})</span></span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 items-center justify-between mt-4 border-t border-slate-100 pt-4">
                <p className="text-[11px] text-slate-400 font-medium">Klik kanan/tombol untuk mengekstrak sampel baris live database:</p>
                <button
                  onClick={handleQueryLiveSample}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-xs font-bold cursor-pointer transition flex items-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5" /> Ambil Sampel Data
                </button>
              </div>
            </div>

            {/* B. Live Json Terminal & DB query Output */}
            <div className="bg-slate-900 text-slate-200 p-6 rounded-2xl border border-slate-800 shadow-md flex flex-col justify-between font-mono">
              <div>
                <div className="flex justify-between items-center border-b border-slate-800 pb-2 mb-3 text-xs uppercase text-slate-400">
                  <span className="flex items-center gap-1.5"><Terminal className="w-4 h-4 text-emerald-500" /> Live SQL Query Output Terminal</span>
                  <span className="text-[10px] bg-slate-800 text-slate-300 px-1.5 py-0.2 rounded font-mono">stdout</span>
                </div>
                <div className="h-68 overflow-y-auto bg-slate-950 p-4 rounded-xl border border-slate-850 text-[10px] leading-relaxed text-emerald-350">
                  <pre className="whitespace-pre-wrap">{schemaSampleOutput}</pre>
                </div>
              </div>

              <div className="flex justify-between items-center text-[10px] text-slate-500 pt-3 border-t border-slate-850 mt-3">
                <span>Database Client: PHP PDO / MySQLi</span>
                <span>Transaction: AUTO COMMIT</span>
              </div>
            </div>

          </div>

          {/* Core REST API Endpoint Sandbox */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div>
              <h3 className="text-sm font-extrabold text-slate-800 flex items-center gap-1.5 uppercase tracking-wide">
                <Code className="w-4.5 h-4.5 text-emerald-600" /> Core REST API Emulator
              </h3>
              <p className="text-xs text-slate-400 font-medium mt-1">HEDRA CMS mengekspos data desa melalui API publik dan privat teramankan. Silakan pilih rute di bawah untuk testing:</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* Endpoint selection & details selector */}
              <div className="lg:col-span-5 space-y-4">
                <div>
                  <label className="text-xs text-slate-500 block mb-1.5 font-bold font-mono">Endpoint Route</label>
                  <select
                    value={selectedEndpoint}
                    onChange={e => {
                      setSelectedEndpoint(e.target.value);
                      setApiResponseOutput('Router siap. Klik "Send Request" untuk debug output JSON.');
                    }}
                    className="w-full text-xs font-semibold px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 bg-slate-50 font-mono"
                  >
                    <option value="GET /api/posts">GET /api/posts (Berita Portal Desa)</option>
                    <option value="GET /api/citizens">GET /api/citizens (Kependudukan / NIK)</option>
                    <option value="GET /api/letters">GET /api/letters (Semua Berkas Surat)</option>
                    <option value="GET /api/apbdes">GET /api/apbdes (Bagan Akun APBDes Kas Desa)</option>
                    <option value="GET /api/umkm">GET /api/umkm (Wisata & Produk BUMDes)</option>
                    <option value="GET /api/complaints">GET /api/complaints (Aduan Warga)</option>
                  </select>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-2">
                  <p className="font-bold border-b border-slate-200 pb-1">Headers & Settings</p>
                  <p className="text-[10px] font-mono text-slate-450 leading-relaxed">
                    Authorization: Bearer sanctum_token_pro_99<br />
                    Accept: application/json<br />
                    Content-Type: application/json<br />
                    Rate-Limit: 60/min
                  </p>
                  <div className="bg-yellow-50 text-yellow-800 text-[10px] p-2 rounded border border-yellow-200 italic leading-relaxed">
                    Sesuai PRD, seluruh respons menggunakan standard format REST JSON terkompresi GZIP untuk efisiensi Shared Hosting cPanel.
                  </div>
                </div>

                <button
                  onClick={triggerApiRequest}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 rounded-lg text-xs flex items-center justify-center gap-1.5 cursor-pointer transition"
                >
                  <Send className="w-3.5 h-3.5 text-emerald-400" /> Send Mock Request
                </button>
              </div>

              {/* Endpoint response viewport */}
              <div className="lg:col-span-7 space-y-2">
                <div className="flex justify-between items-center font-mono text-[11px] text-slate-500 px-1">
                  <span>Response Header: <span className="text-emerald-600 font-bold">200 OK</span></span>
                  {apiLatency !== null && (
                    <span className="text-slate-400">Latency: <b className="text-emerald-600">{apiLatency} ms</b></span>
                  )}
                </div>
                <div className="bg-slate-950 text-emerald-400 p-4 rounded-xl border border-slate-900 font-mono text-[10px] h-60 overflow-y-auto">
                  <pre>{apiResponseOutput}</pre>
                </div>
              </div>

            </div>
          </div>

          {/* Theme & Plugin Manifest SDK Validator */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div>
              <h3 className="text-sm font-extrabold text-slate-800 flex items-center gap-1.5 uppercase tracking-wide">
                <FolderGit className="w-4.5 h-4.5 text-emerald-600" /> Theme & Plugin Manifest SDK
              </h3>
              <p className="text-xs text-slate-400 font-medium mt-1">
                Kembangkan HEDRA dengan memvalidasi manifest kustom `plugin.json` atau `theme.json` secara sandboxed:
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* Manifest Editor */}
              <div className="lg:col-span-6 space-y-3">
                <div className="flex gap-2.5 border-b border-slate-200 pb-2">
                  <button 
                    onClick={loadPluginSample}
                    className={`px-3 py-1.5 text-xs font-bold rounded cursor-pointer ${
                      manifestType === 'plugin' ? 'bg-emerald-50 text-emerald-700 border border-emerald-305' : 'text-slate-500 hover:bg-slate-50'
                    }`}
                  >
                    Plugin SDK Template (plugin.json)
                  </button>
                  <button 
                    onClick={loadThemeSample}
                    className={`px-3 py-1.5 text-xs font-bold rounded cursor-pointer ${
                      manifestType === 'theme' ? 'bg-emerald-50 text-emerald-700 border border-emerald-305' : 'text-slate-500 hover:bg-slate-50'
                    }`}
                  >
                    Theme Engine Template (theme.json)
                  </button>
                </div>

                <textarea
                  value={manifestContent}
                  onChange={e => setManifestContent(e.target.value)}
                  className="w-full h-48 bg-slate-950 text-emerald-400 p-4 rounded-xl font-mono text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none border border-slate-900 leading-relaxed"
                />

                <div className="flex gap-3">
                  <button
                    onClick={handleVerifyManifest}
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 rounded-lg text-xs cursor-pointer transition flex items-center justify-center gap-1.5"
                  >
                    <CheckSquare className="w-4 h-4" /> Validasi Manifest
                  </button>
                </div>
              </div>

              {/* Manifest verification feedback */}
              <div className="lg:col-span-6 bg-slate-50 p-5 rounded-2xl border border-slate-200 h-64 flex flex-col justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest font-mono">SDK DEBUGER ENGINE</p>
                  
                  {manifestVerifyResult.status === 'idle' && (
                    <div className="mt-8 flex flex-col items-center justify-center text-slate-400">
                      <Cpu className="w-10 h-10 mb-2 stroke-1 animate-pulse" />
                      <p className="text-xs italic">Ubah kode JSON di kiri jika perlu lalu klik Validasi.</p>
                    </div>
                  )}

                  {manifestVerifyResult.status === 'success' && (
                    <div className="mt-4 p-4 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-200 text-xs space-y-2 animate-scale-in">
                      <div className="flex items-center gap-2 font-bold font-mono">
                        <CheckCircle className="w-4 h-4 text-emerald-600" />
                        <span>KODE STATUS VALID</span>
                      </div>
                      <p className="leading-relaxed text-[11px] font-medium">{manifestVerifyResult.message}</p>
                    </div>
                  )}

                  {manifestVerifyResult.status === 'error' && (
                    <div className="mt-4 p-4 bg-rose-50 text-rose-800 rounded-xl border border-rose-200 text-xs space-y-2 animate-scale-in">
                      <div className="flex items-center gap-2 font-bold font-mono">
                        <AlertCircle className="w-4 h-4 text-rose-600" />
                        <span>KODE ERROR DETECTED</span>
                      </div>
                      <p className="leading-relaxed text-[11px] font-mono">{manifestVerifyResult.message}</p>
                    </div>
                  )}
                </div>

                <div className="text-[10px] text-slate-400 leading-relaxed font-mono mt-3 border-t border-slate-200 pt-3">
                  • Sandboxed file structure matches PRD L2 target Theme/Plugin SDK standard. No databases/OS can be modified without API broker.
                </div>
              </div>

            </div>
          </div>

          {/* Security & Command Deck (Argon2id and OTP 2FA) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left: 2FA OTP Code Simulator */}
            <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-extrabold text-slate-800 flex items-center gap-1.5 uppercase tracking-wide mb-1">
                  <Lock className="w-4.5 h-4.5 text-emerald-600" /> OTP 2FA Code generator
                </h3>
                <p className="text-xs text-slate-400 mb-4">Emulasi OTP sekuriti admin dinas login HEDRA Pro (Regenerasi otomatis 30s):</p>

                <div className="flex flex-col items-center justify-center py-6 bg-slate-50 border border-slate-200 rounded-xl relative overflow-hidden">
                  <p className="text-[10px] text-zinc-400 uppercase tracking-widest font-mono">2FA TOKEN VERIFIKASI</p>
                  <p className="text-3xl font-extrabold tracking-widest font-mono text-slate-800 mt-2 select-all">
                    {otpCode}
                  </p>
                  
                  {/* Visual timer progress bar */}
                  <div className="w-40 h-1.5 bg-slate-200 rounded-full mt-4 overflow-hidden">
                    <div className="bg-emerald-600 h-full transition-all duration-1000" style={{ width: `${otpProgress}%` }}></div>
                  </div>
                  <span className="text-[9px] text-slate-400 mt-1.5 font-mono">Siklus Expire Token</span>
                </div>
              </div>

              <div className="text-[10px] text-slate-400 font-mono pt-3 border-t border-slate-100 mt-3 flex items-center gap-1 leading-none">
                <Shield className="w-3.5 h-3.5 text-emerald-600" />
                <span>Multi-Authentication Shield Activated</span>
              </div>
            </div>

            {/* Right: Argon2id Hash Generator */}
            <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-extrabold text-slate-800 flex items-center gap-1.5 uppercase tracking-wide">
                  <Shield className="w-4.5 h-4.5 text-emerald-600" /> Argon2id Password Encryptor
                </h3>
                <p className="text-xs text-slate-400 mt-1 mb-4">HEDRA mewajibkan standard hash Argon2id (PHP 8.4+) untuk menjaga data kependudukan sensitif:</p>

                <div className="space-y-3">
                  <div>
                    <label className="text-[10px] text-slate-400 block font-mono font-bold uppercase">Plaintext String</label>
                    <input 
                      type="text"
                      className="w-full text-xs font-mono font-semibold px-3 py-2 border border-slate-200 rounded-lg bg-slate-50 mt-1 focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                      value={plainPassword}
                      onChange={e => setPlainPassword(e.target.value)}
                      placeholder="Masukkan teks sandi..."
                    />
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 block font-mono font-bold uppercase">HEDRA Secure Digest Hash</span>
                    <p className="w-full p-2.5 bg-slate-900 text-emerald-350 rounded-lg text-[9px] font-mono break-all mt-1 border border-slate-800">
                      {hashedPassword || 'Ketik password di atas untuk emulasi...'}
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-[10px] text-slate-400 italic pt-3 border-t border-slate-100 mt-3 leading-none">
                • Standard level enkripsi ini aman dari Brute Force & GPU dictionary attack.
              </p>
            </div>

          </div>

          {/* Multi Tenancy (Enterprise Selection Grid) */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div>
              <h3 className="text-sm font-extrabold text-slate-800 flex items-center gap-1.5 uppercase tracking-wide">
                <AppWindow className="w-4.5 h-4.5 text-emerald-600" /> Multi-Tenancy Enterprise Administration
              </h3>
              <p className="text-xs text-slate-400 mt-1">Satu instance HEDRA dapat bertindak sebagai core server untuk banyak desa pendamping di kecamatan:</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              
              {/* Tenant picker block */}
              <div className="lg:col-span-4 space-y-2">
                {[
                  { key: 'pondokpanjang', label: '1. Desa Pondokpanjang (Active Tenant)', desc: 'Desa utama Hedi Kiswanto.' },
                  { key: 'airputih', label: '2. Desa Air Putih (Staging Tenant)', desc: 'Desa bertetangga uji integrasi.' },
                  { key: 'lubukpinang', label: '3. Desa Lubuk Pinang (Sandbox Tenant)', desc: 'Instance pendukung test-bed.' }
                ].map(tenant => (
                  <button
                    key={tenant.key}
                    onClick={() => {
                      setActiveTenant(tenant.key);
                      addSystemLog(`Mengganti Tenant Multi-Tenancy aktif ke \`${tenant.key}\``);
                    }}
                    className={`w-full text-left p-3 rounded-xl border cursor-pointer transition-all ${
                      activeTenant === tenant.key 
                        ? 'bg-emerald-50 text-emerald-900 border-emerald-500 font-extrabold shadow-sm' 
                        : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200'
                    }`}
                  >
                    <p className="text-xs">{tenant.label}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5 font-normal">{tenant.desc}</p>
                  </button>
                ))}
              </div>

              {/* Selected Tenant Isolation specs */}
              <div className={`lg:col-span-8 p-5 bg-slate-950 text-white rounded-2xl border-l-4 ${tenantConfig[activeTenant].tenantColor} font-mono text-xs space-y-3`}>
                <p className="text-emerald-400 font-bold border-b border-slate-900 pb-1.5 uppercase tracking-widest text-[10px]">
                  &gt;_ TENANT PROPERTY ISOLATION DICTIONARY
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[10px]">
                  <div className="space-y-1.5">
                    <p className="text-slate-400">Database Partition ID:</p>
                    <p className="text-white font-bold bg-slate-900 p-2 rounded border border-slate-850 break-all select-all">
                      {tenantConfig[activeTenant].dbPartName}
                    </p>
                  </div>
                  <div className="space-y-1.5">
                    <p className="text-slate-400">S3 Media Storage Bucket URI:</p>
                    <p className="text-white font-bold bg-slate-900 p-2 rounded border border-slate-850 break-all select-all">
                      {tenantConfig[activeTenant].bucket}
                    </p>
                  </div>
                  <div className="space-y-1.5">
                    <p className="text-slate-400">Tenant Sync status:</p>
                    <p className="text-emerald-400 font-bold bg-slate-900 p-2 rounded border border-slate-850">
                      {tenantConfig[activeTenant].status}
                    </p>
                  </div>
                  <div className="space-y-1.5">
                    <p className="text-slate-400">Routing Policy Domain:</p>
                    <p className="text-white font-bold bg-slate-900 p-2 rounded border border-slate-850">
                      http://{activeTenant}.muko-muko.desa.id/
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Core Interactive Roadmap Specs with Phase Checklist */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div>
              <h3 className="text-sm font-extrabold text-slate-800 flex items-center gap-1.5 uppercase tracking-wide">
                <Sparkles className="w-4.5 h-4.5 text-emerald-600" /> Strategic Smart-Village Roadmap Progress
              </h3>
              <p className="text-xs text-slate-400 mt-1">Status dan kelengkapan fitur HEDRA CMS berdasarkan lima fase komprehensif:</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {[
                { phase: 'PHASE 1', title: 'Core CMS', desc: 'Theme & Plugin Engines, News Portal, Media Manager.', progress: '100% DONE', status: 'live' },
                { phase: 'PHASE 2', title: 'Pelayanan Publik', desc: 'Surat Online, Data Penduduk, POS Pengaduan.', progress: '100% DONE', status: 'live' },
                { phase: 'PHASE 3', title: 'Ekonomi Desa', desc: 'Kas APBDes, PBB Pajak, UMKM BUMDes Marketplace.', progress: '100% DONE', status: 'live' },
                { phase: 'PHASE 4', title: 'Smart Integration', desc: 'GIS Peta, Biometrik Absen, HEDRA AI, Mobile App.', progress: '100% DONE', status: 'live' },
                { phase: 'PHASE 5', title: 'Enterprise Core', desc: 'Multi-Tenant Sandbox, Regional & Nasional Dashboard.', progress: 'SANDBOX ACTIVE', status: 'staging' }
              ].map((rd, i) => (
                <div key={i} className={`p-4 rounded-xl border text-left flex flex-col justify-between ${rd.status === 'live' ? 'bg-emerald-50/50 border-emerald-250 text-emerald-950' : 'bg-slate-50 border-slate-200 text-slate-800'}`}>
                  <div>
                    <div className="flex justify-between items-center text-[9px] font-mono font-bold tracking-wider">
                      <span>{rd.phase}</span>
                      <span className={`px-1.5 py-0.2 rounded ${rd.status === 'live' ? 'bg-emerald-200 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                        {rd.progress}
                      </span>
                    </div>
                    <h4 className="text-xs font-bold font-display mt-2">{rd.title}</h4>
                    <p className="text-[10px] text-slate-505 mt-1 leading-relaxed">
                      {rd.desc}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] font-semibold text-emerald-600 mt-3 pt-2 border-t border-emerald-100/50">
                    <CheckCircle className="w-3.5 h-3.5 fill-emerald-600 text-white" />
                    <span>Sistem Siap</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

    </div>
  );
}

// Internal icons helper to prevent bundling errors
function EYEIcon(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
    >
      <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

// Log badge generator helper
function logsType(log: string): string {
  if (log.startsWith('System')) return 'SYS';
  if (log.startsWith('Cache')) return 'MEM';
  if (log.startsWith('Security')) return 'SEC';
  if (log.startsWith('Traffic')) return 'NET';
  if (log.startsWith('Engine')) return 'ENG';
  return 'LOG';
}
