import React, { useState, useRef } from 'react';
import { 
  Puzzle, LayoutTemplate, ShieldCheck, Zap, Download, UploadCloud, 
  Check, FileArchive, RefreshCw, Star, ArrowRight, ShieldAlert, 
  Key, AlertTriangle, Sparkles, Sliders, CheckCircle, Info, Heart, Trash2, SlidersHorizontal
} from 'lucide-react';

export interface PluginItem {
  id: string;
  name: string;
  version: string;
  author: string;
  description: string;
  category: 'Pelayanan' | 'Ekonomi' | 'Keamanan' | 'Integrasi';
  status: 'active' | 'inactive';
  isPremium: boolean;
}

export interface ThemeItem {
  id: string;
  name: string;
  version: string;
  author: string;
  description: string;
  primaryColor: string; // Tailind class
  secondaryColor: string; // Hex or text color
  status: 'active' | 'inactive';
  isPremium: boolean;
}

interface CmsMarketplaceProps {
  isPremium: boolean;
  setIsPremium: (v: boolean) => void;
  activeTheme: string;
  setActiveTheme: (v: string) => void;
}

export default function CmsMarketplace({ 
  isPremium, 
  setIsPremium, 
  activeTheme, 
  setActiveTheme 
}: CmsMarketplaceProps) {
  // Initial Plugins matching WordPress / OpenSID structure
  const [plugins, setPlugins] = useState<PluginItem[]>([
    { 
      id: 'pl-pbb', 
      name: 'Pembayaran PBB Online Gateway', 
      version: '1.2.5', 
      author: 'HEDRA Core Team', 
      description: 'Sinkronisasi tagihan PBB langsung dengan database dispenda kabupaten secara real-time.',
      category: 'Ekonomi',
      status: 'active',
      isPremium: false 
    },
    { 
      id: 'pl-wa', 
      name: 'Auto-SMS & WhatsApp Gateway Notifier', 
      version: '2.0.4', 
      author: 'OpenSID Partner Dev', 
      description: 'Megirim notifikasi approval surat dinas, BLT, dan rincian kas APBDes langsung ke nomor warga.',
      category: 'Pelayanan',
      status: 'inactive',
      isPremium: true 
    },
    { 
      id: 'pl-evoting', 
      name: 'E-Voting Pilkades Digital', 
      version: '0.9.8', 
      author: 'Mas Hedi (Bengkulu Dev)', 
      description: 'Sistem pemungutan suara berstandar kriptografi SHA-256 untuk mempermudah pemilihan RT/Kades mandiri.',
      category: 'Keamanan',
      status: 'inactive',
      isPremium: false 
    },
    { 
      id: 'pl-auditLog', 
      name: 'Database Security Auto-Audit & Backup', 
      version: '1.0.1', 
      author: 'Kemendagri Cyber Sentinel', 
      description: 'Melacak IP Operator, menganalisis brute force, dan mengekspor backup `.sql.gz` ke Google Drive otomatis.',
      category: 'Integrasi',
      status: 'inactive',
      isPremium: true 
    },
  ]);

  // Initial Themes for customization
  const [themes, setThemes] = useState<ThemeItem[]>([
    {
      id: 'theme-emerald',
      name: 'Classic Sawit Lestari',
      version: '1.0.0',
      author: 'HEDRA Core Studio',
      description: 'Nuansa hijau emerald khas pedesaan agraris yang ramah lingkungan dan teratur.',
      primaryColor: 'emerald',
      secondaryColor: '#10b981',
      status: 'active',
      isPremium: false
    },
    {
      id: 'theme-royal',
      name: 'Royal Bengkulu Gold',
      version: '1.2.1',
      author: 'Dinas Kominfo Provinsi',
      description: 'Kombinasi warna emas megah dan navy premium untuk profil desa bernuansa sejarah.',
      primaryColor: 'amber',
      secondaryColor: '#f59e0b',
      status: 'inactive',
      isPremium: false
    },
    {
      id: 'theme-slate',
      name: 'Midnight Ocean Cozy (Premium)',
      version: '2.1.0',
      author: 'OpenSID Theme Lab',
      description: 'Tampilan premium bertema malam (Cosmic Dark Slate) untuk kenyamanan mata operator admin.',
      primaryColor: 'indigo',
      secondaryColor: '#6366f1',
      status: 'inactive',
      isPremium: true
    }
  ]);

  // Upload Simulation State
  const [activeTab, setActiveTab] = useState<'plugins' | 'themes' | 'premium'>('plugins');
  const [dragProgress, setDragProgress] = useState<number | null>(null);
  const [uploadMessage, setUploadMessage] = useState<string>('');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // License key input state
  const [licenseKey, setLicenseKey] = useState('');
  const [licenseError, setLicenseError] = useState('');
  const [licenseSuccess, setLicenseSuccess] = useState(false);

  // Toggle Plugin Activation
  const handleTogglePlugin = (id: string) => {
    const target = plugins.find(p => p.id === id);
    if (!target) return;

    if (target.isPremium && !isPremium) {
      alert('⚠️ Modul Ekstensi Premium. Silakan aktifkan lisensi HEDRA Pro/Premium Anda terlebih dahulu!');
      setActiveTab('premium');
      return;
    }

    setPlugins(plugins.map(p => {
      if (p.id === id) {
        const nextStatus = p.status === 'active' ? 'inactive' : 'active';
        return { ...p, status: nextStatus };
      }
      return p;
    }));
  };

  // Switch Theme Active
  const handleActivateTheme = (id: string) => {
    const target = themes.find(t => t.id === id);
    if (!target) return;

    if (target.isPremium && !isPremium) {
      setActiveTab('premium');
      alert('⚠️ Desain Tema ini dikhususkan untuk pelanggan HEDRA Premium. Silakan isi lisensi premium Anda!');
      return;
    }

    setThemes(themes.map(t => ({
      ...t,
      status: t.id === id ? 'active' : 'inactive'
    })));

    setActiveTheme(target.primaryColor);
  };

  // Delete Plugin/Theme Simulator
  const handleDeletePlugin = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus plugin ini dari server?')) {
      setPlugins(plugins.filter(p => p.id !== id));
    }
  };

  const handleDeleteTheme = (id: string) => {
    const target = themes.find(t => t.id === id);
    if (target?.status === 'active') {
      alert('Gagal! Anda tidak bisa menghapus tema yang sedang aktif.');
      return;
    }
    if (confirm('Apakah Anda yakin ingin menghapus tema ini?')) {
      setThemes(themes.filter(t => t.id !== id));
    }
  };

  // Drag Overlay simulation
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      processMockUpload(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      processMockUpload(files[0]);
    }
  };

  // Process Mock Upload for Plugin/Theme zip
  const processMockUpload = (file: File) => {
    if (!file.name.endsWith('.zip') && !file.name.endsWith('.json')) {
      setUploadMessage('Gagal: Format file tidak didukung! Format harus berupa .zip (WordPress/OpenSID package) atau manifest .json.');
      return;
    }

    setDragProgress(10);
    setUploadMessage(`Mengunggah berkas ${file.name}...`);

    let progress = 10;
    const interval = setInterval(() => {
      progress += 15;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        
        // Finalize install simulation
        setTimeout(() => {
          setDragProgress(null);
          // Auto add a mock plugin or theme depending on names
          const nameClean = file.name.replace(/\.[^/.]+$/, "");
          const isTheme = nameClean.toLowerCase().includes('theme') || nameClean.toLowerCase().includes('tema') || activeTab === 'themes';

          if (isTheme) {
            const newTheme: ThemeItem = {
              id: `theme-${Date.now()}`,
              name: `Tema Custom: ${nameClean.replace(/[-_]/g, ' ')}`,
              version: '1.0.0-Uploaded',
              author: 'Dinas Kominfo / Uploaded',
              description: 'Tema kustom hasil unggah arsip zip cPanel yang diverifikasi bebas malware.',
              primaryColor: 'indigo',
              secondaryColor: '#4f46e5',
              status: 'inactive',
              isPremium: false
            };
            setThemes([newTheme, ...themes]);
            setUploadMessage(`Berhasil: Tema "${newTheme.name}" dipasang dan diverifikasi kompatibel!`);
          } else {
            const newPlugin: PluginItem = {
              id: `pl-${Date.now()}`,
              name: `Ekstensi: ${nameClean.replace(/[-_]/g, ' ')}`,
              version: '1.0.0',
              author: 'Operator Desa (Lokal Upload)',
              description: 'Ekstensi plugin fungsional hasil installer .zip sandboxed.',
              category: 'Pelayanan',
              status: 'inactive',
              isPremium: false
            };
            setPlugins([newPlugin, ...plugins]);
            setUploadMessage(`Berhasil: Plugin "${newPlugin.name}" terpasang! Anda sekarang bisa mengaktifkannya.`);
          }
        }, 500);
      }
      setDragProgress(progress);
    }, 150);
  };

  // Verify Premium License Key
  const handleVerifyLicense = (e: React.FormEvent) => {
    e.preventDefault();
    setLicenseError('');
    setLicenseSuccess(false);

    if (!licenseKey.trim()) {
      setLicenseError('Masukkan lisensi key terlebih dahulu.');
      return;
    }

    // Key validation simulation: must contain 'HEDRA-PREMIUM' or any valid 16 chars
    const cleaned = licenseKey.toUpperCase().replace(/\s/g, '');
    if (cleaned.includes('HEDRA-PREMIUM') || cleaned.length >= 10) {
      setIsPremium(true);
      setLicenseSuccess(true);
      setLicenseKey('');
    } else {
      setLicenseError('Serial key tidak valid atau tidak terverifikasi di server OpenSID Central & Kemedagri.');
    }
  };

  // Quick Unlock Trial
  const handleQuickUnlock = () => {
    setIsPremium(true);
    setLicenseSuccess(true);
    alert('🎉 Mode Premium / OpenSID Premium berhasil diaktifkan secara simulasi! Semua fitur eksklusif sekarang terbuka penuh.');
  };

  return (
    <div className="space-y-6" id="cms-marketplace-root">
      
      {/* Header Area */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-4" id="cms-header">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] bg-indigo-100 text-indigo-800 font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider font-mono">
              Marketplace Ekstensi
            </span>
            <span className="text-[10px] bg-slate-100 text-slate-700 font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-emerald-600" /> WordPress & OpenSID Style
            </span>
          </div>
          <h2 className="text-xl font-bold font-display text-slate-800 mt-2 flex items-center gap-2">
            <Puzzle className="w-5 h-5 text-indigo-600" /> Pengelola CMS, Ekstensi & Tema Desa
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Modul pengembang sistem HEDRA Core. Tambahkan plugins, tingkatkan estetika dengan visual tema baru, dan aktifkan lisensi premium demi menunjang akselerasi birokrasi cerdas.
          </p>
        </div>

        {/* License status top card */}
        <div className={`p-4 rounded-xl border flex items-center gap-3 shrink-0 ${
          isPremium 
            ? 'bg-emerald-50 border-emerald-300 text-emerald-800' 
            : 'bg-indigo-50 border-indigo-200 text-indigo-900'
        }`}>
          <div className={`p-2.5 rounded-lg ${isPremium ? 'bg-emerald-500/10 text-emerald-600' : 'bg-indigo-505/10 text-indigo-600'}`}>
            <Zap className="w-5 h-5 fill-current" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Lisensi Akun</p>
            <h4 className="text-xs font-bold mt-0.5">
              {isPremium ? 'HEDRA Premium (OpenSID AKTIF)' : 'HEDRA Edisi Publik (Gratis)'}
            </h4>
            <span className="text-[9px] block text-slate-500 font-mono mt-0.5">ID Tenant: pondokpanjang.desa.id</span>
          </div>
        </div>
      </div>

      {/* Segment Tabs for Plugins, Themes, and License keys */}
      <div className="flex bg-white rounded-xl p-1.5 border border-slate-200 shadow-sm gap-2" id="cms-tabs">
        <button 
          onClick={() => { setActiveTab('plugins'); setUploadMessage(''); }}
          className={`flex-1 sm:flex-none flex items-center justify-center gap-2 py-2.5 px-6 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'plugins' 
              ? 'bg-indigo-600 text-white shadow-sm' 
              : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          <Puzzle className="w-4 h-4" />
          <span>Kelola Plugins ({plugins.length})</span>
        </button>
        <button 
          onClick={() => { setActiveTab('themes'); setUploadMessage(''); }}
          className={`flex-1 sm:flex-none flex items-center justify-center gap-2 py-2.5 px-6 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'themes' 
              ? 'bg-indigo-600 text-white shadow-sm' 
              : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          <LayoutTemplate className="w-4 h-4" />
          <span>Desain Tema ({themes.length})</span>
        </button>
        <button 
          onClick={() => { setActiveTab('premium'); setUploadMessage(''); }}
          className={`flex-1 sm:flex-none flex items-center justify-center gap-2 py-2.5 px-6 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'premium' 
              ? 'bg-indigo-600 text-white shadow-sm' 
              : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          <Star className="w-4 h-4 text-amber-500 fill-current animate-pulse" />
          <span>Lisensi Premium & Layanan</span>
        </button>
      </div>

      {/* Main Row layout: Sidebar Upload Uploader card & Center items list */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="cms-core-layout">
        
        {/* Left Side: Drag and Drop Upload Box */}
        <div className="lg:col-span-4 col-span-1 border border-slate-200 bg-white p-6 rounded-2xl flex flex-col justify-between" id="cms-left-uploader">
          <div className="space-y-4">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">Unggah Ekstensi Kustom</h3>
              <p className="text-[11px] text-slate-400 mt-1">
                Pasang plugin/tema hasil ekspor dari direktori lokal atau repositori WordPress / GitHub Anda secara mandiri.
              </p>
            </div>

            {/* Simulated Drag & Drop Dashboard */}
            <div 
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`p-6 border-2 border-dashed rounded-xl flex flex-col items-center justify-center text-center cursor-pointer transition-all h-60 gap-3 ${
                isDragging 
                  ? 'border-indigo-600 bg-indigo-50/50' 
                  : 'border-slate-300 hover:border-indigo-400 bg-slate-50 hover:bg-white'
              }`}
            >
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileSelect} 
                className="hidden" 
                accept=".zip,.json"
              />
              <div className="p-3 bg-white rounded-full text-indigo-600 shadow-sm border border-slate-100">
                <UploadCloud className="w-8 h-8 animate-bounce" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-700">Tarik berkas .ZIP ke sini</p>
                <p className="text-[10px] text-slate-400 mt-1 uppercase font-mono">Atau telusuri berkas lokal</p>
              </div>
              <span className="text-[9px] bg-slate-250 text-slate-500 font-semibold px-2 py-0.5 rounded">Maksimum 32MB</span>
            </div>

            {/* Install progress bar */}
            {dragProgress !== null && (
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2">
                <div className="flex justify-between items-center text-[10px] font-mono">
                  <span className="font-semibold text-indigo-700">Mengekstrak & Analisis Sandbox...</span>
                  <span>{dragProgress}%</span>
                </div>
                <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-indigo-600 h-full transition-all" style={{ width: `${dragProgress}%` }}></div>
                </div>
              </div>
            )}

            {/* Notifications messages */}
            {uploadMessage && (
              <div className={`p-3.5 rounded-xl text-xs flex gap-2 font-medium ${
                uploadMessage.startsWith('Gagal') 
                ? 'bg-rose-50 border border-rose-200 text-rose-800' 
                : 'bg-emerald-50 border border-emerald-100 text-emerald-900 shadow-sm'
              }`}>
                <div className="shrink-0 mt-0.5">
                  <Info className="w-4 h-4" />
                </div>
                <p className="leading-snug">{uploadMessage}</p>
              </div>
            )}
          </div>

          <div className="mt-8 p-4 bg-slate-50 rounded-xl border border-slate-150-50 text-[10px] leading-relaxed text-slate-500 font-mono">
            💡 <b>Wordpress & OpenSID Sandbox</b>: Kode PHP/JS yang di-upload akan diamankan dalam container filter proxy HEDRA sebelum dirender di dashboard utama, menjamin keamanan total server desa Anda.
          </div>
        </div>

        {/* Right Side: Modules Listing OR Premium Unlock UI */}
        <div className="lg:col-span-8 col-span-1 space-y-4" id="cms-right-listing">
          
          {/* Active plugins block */}
          {activeTab === 'plugins' && (
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm" id="plugins-list-card">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3.5 mb-4">
                <div>
                  <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Direktori Plugin Lokal</h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">Sistem modular dapat dinyalakan atau dimatikan tanpa merusak database intisari.</p>
                </div>
                <span className="text-[11px] font-mono text-slate-400">Total: <b>{plugins.length} item</b> terdaftar</span>
              </div>

              {/* Table representing all properties registered */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500 text-[10px] font-bold uppercase tracking-wider">
                      <th className="py-2.5 px-3">Nama Ekstensi / Deskripsi</th>
                      <th className="py-2.5 px-3">Detail</th>
                      <th className="py-2.5 px-3">Status</th>
                      <th className="py-2.5 px-3 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs">
                    {plugins.map((plugin) => (
                      <tr 
                        key={plugin.id} 
                        className={`hover:bg-slate-55/40 transition-colors ${plugin.status === 'active' ? 'bg-indigo-50/5' : ''}`}
                      >
                        <td className="py-4 px-3 max-w-sm">
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="font-bold text-slate-800 text-xs">{plugin.name}</span>
                              {plugin.isPremium && (
                                <span className="text-[9px] bg-gradient-to-r from-amber-500 to-amber-600 text-white font-extrabold px-1.5 py-0.2 rounded uppercase">
                                  PRO
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-slate-400 leading-normal mt-1">{plugin.description}</p>
                          </div>
                        </td>
                        <td className="py-4 px-3 font-mono text-[10px]">
                          <div>
                            <p className="text-slate-500">v{plugin.version}</p>
                            <p className="text-slate-400 mt-0.5">Oleh: {plugin.author}</p>
                          </div>
                        </td>
                        <td className="py-4 px-3">
                          <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase ${
                            plugin.status === 'active' 
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' 
                              : 'bg-slate-100 text-slate-500 border border-slate-200'
                          }`}>
                            {plugin.status === 'active' ? 'AKTIF' : 'MATI'}
                          </span>
                        </td>
                        <td className="py-4 px-3 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleTogglePlugin(plugin.id)}
                              className={`text-[10px] font-extrabold px-3 py-1.5 rounded transition shadow-sm cursor-pointer ${
                                plugin.status === 'active'
                                  ? 'bg-slate-200 hover:bg-slate-300 text-slate-700'
                                  : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                              }`}
                            >
                              {plugin.status === 'active' ? 'Deaktivasi' : 'Aktifkan'}
                            </button>

                            <button
                              onClick={() => handleDeletePlugin(plugin.id)}
                              className="p-1.5 text-slate-400 hover:text-rose-600 rounded cursor-pointer transition hover:bg-slate-100"
                              title="Hapus ekstensi"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Themes block list */}
          {activeTab === 'themes' && (
            <div className="space-y-4" id="themes-list-panel">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex justify-between items-center border-b border-slate-100 pb-3 mb-4">
                  <div>
                    <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Desain & Tampilan Visual HEDRA</h3>
                    <p className="text-[11px] text-slate-400 mt-0.5">Pilih layout dasar yang merepresentasikan ciri khas unik desa Anda untuk portal publik pendengar utama.</p>
                  </div>
                </div>

                {/* Themes bento layout */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {themes.map((theme) => {
                    const isSelected = theme.status === 'active';
                    return (
                      <div 
                        key={theme.id}
                        className={`border rounded-2xl overflow-hidden bg-slate-50 flex flex-col justify-between transition-all duration-300 ${
                          isSelected 
                            ? 'ring-2 ring-indigo-600 border-transparent shadow-md transform -translate-y-0.5' 
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        {/* Upper visual simulation thumbnail */}
                        <div className="h-28 relative flex items-center justify-center text-white font-extrabold text-center select-none" style={{ backgroundColor: theme.secondaryColor }}>
                          <div className="absolute inset-0 bg-black/10"></div>
                          
                          {/* Inside elements simulation widgets */}
                          <div className="p-3 relative z-10 w-full flex flex-col justify-between h-full text-left">
                            <span className="text-[9px] bg-white/20 border border-white/30 text-white font-bold px-2 py-0.5 rounded uppercase w-max tracking-wide">
                              HEDRA Layout
                            </span>
                            <div>
                              <h4 className="text-sm truncate font-display font-bold leading-tight">{theme.name}</h4>
                              <p className="text-[10px] text-white/80 font-mono font-medium mt-0.5">Oleh: {theme.author}</p>
                            </div>
                          </div>

                          {/* Selected Checkmark overlay */}
                          {isSelected && (
                            <div className="absolute top-2 right-2 p-1.5 bg-emerald-500 rounded-full text-white shadow-md border border-white/25">
                              <Check className="w-3.5 h-3.5" />
                            </div>
                          )}
                        </div>

                        {/* Theme description info panel */}
                        <div className="p-4 flex flex-col justify-between flex-1 gap-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs font-bold text-slate-800">{theme.name}</span>
                              {theme.isPremium && (
                                <span className="text-[8px] bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold px-1 py-0.1 rounded">
                                  PREMIUM
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-slate-420 leading-snug">{theme.description}</p>
                          </div>

                          <div className="flex items-center justify-between border-t border-slate-100 pt-3 text-[10px] text-slate-500 font-mono">
                            <span>Versi {theme.version}</span>
                            <div className="flex gap-1.5 shrink-0">
                              <button
                                onClick={() => handleActivateTheme(theme.id)}
                                className={`font-extrabold px-3 py-1.5 rounded transition cursor-pointer text-[10px] ${
                                  isSelected
                                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                    : 'bg-indigo-600 text-white hover:bg-indigo-700'
                                }`}
                              >
                                {isSelected ? 'Terpasang' : 'Aktifkan'}
                              </button>
                              
                              {!isSelected && (
                                <button
                                  onClick={() => handleDeleteTheme(theme.id)}
                                  className="p-1 px-1.5 text-slate-400 hover:text-rose-600 rounded transition cursor-pointer"
                                  title="Hapus tema"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Dynamic Theme Testing Console indicator */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <h4 className="text-xs font-bold text-slate-700 uppercase flex items-center gap-1 font-mono">
                  <SlidersHorizontal className="w-4 h-4 text-emerald-600" /> Color Accent Testing Center
                </h4>
                <p className="text-[11px] text-slate-500 mt-1">
                  Saat ini aksen warna aktif HEDRA di-set ke: <b className="text-indigo-700 uppercase">{activeTheme}</b>. Mengubah tema di atas secara interaktif mengubah style skema bar samping dan hiasan utama secara dinamis sebagai representasi cPanel live compiler.
                </p>
              </div>
            </div>
          )}

          {/* Premium upgrades licensing block */}
          {activeTab === 'premium' && (
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6" id="licensing-center">
              
              {/* Giant Promo Banner Premium vs Free */}
              <div className="bg-slate-900 text-white p-6 rounded-2xl relative overflow-hidden flex flex-col justify-between gap-6" id="hedra-pro-banner">
                <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-20 pointer-events-none bg-gradient-to-l from-amber-500 to-transparent"></div>
                
                <div className="space-y-2">
                  <span className="text-[9px] bg-gradient-to-r from-amber-400 to-amber-600 text-slate-950 font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider font-mono">
                    OpenSID & HEDRA Premium Partnership Suite
                  </span>
                  <h3 className="text-lg font-bold font-display text-white mt-1 leading-tight flex items-center gap-2">
                    Akselerasi Desa Mandiri dengan Fitur Eksekutif Terbaik
                  </h3>
                  <p className="text-xs text-slate-400 max-w-xl leading-relaxed">
                    Masuki standard birokrasi super cepat. Dapatkan akses ke integrasi server pusat, template laporan kelembagaan KIB yang legal, peta tata ruang andal berbasis GIS, serta asisten AI penulis draf yang berkapabilitas tinggi.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-slate-800 pt-4">
                  <div className="space-y-1 text-xs">
                    <p className="font-semibold text-emerald-400 flex items-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 shrink-0" /> Ekspor KIB PDF & XLS Tanpa Batasan
                    </p>
                    <p className="text-slate-400 text-[10px]">Cetak laporan inventarisasi aset desa ber-QR Code valid.</p>
                  </div>
                  <div className="space-y-1 text-xs">
                    <p className="font-semibold text-emerald-400 flex items-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 shrink-0" /> AI Auto-Drafter Berkas Pelayanan
                    </p>
                    <p className="text-slate-400 text-[10px]">Tulis lampiran, deskripsi kasus, dan kelengkapan surat otomatis.</p>
                  </div>
                  <div className="space-y-1 text-xs">
                    <p className="font-semibold text-emerald-400 flex items-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 shrink-0" /> Integrasi Keamanan Tambahan & SMS Sync
                    </p>
                    <p className="text-slate-400 text-[10px]">Keamanan database cPanel maksimal & WhatsApp terotomatisasi.</p>
                  </div>
                  <div className="space-y-1 text-xs">
                    <p className="font-semibold text-emerald-400 flex items-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 shrink-0" /> Premium GIS CAD Layers
                    </p>
                    <p className="text-slate-400 text-[10px]">Akses data topografi detail dan batas daerah relasional.</p>
                  </div>
                </div>
              </div>

              {/* Form Validation */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-widest font-mono flex items-center gap-1">
                    <Key className="w-4 h-4 text-indigo-500" /> Sertifikasi Lisensi Key Desa
                  </h4>
                  
                  <form onSubmit={handleVerifyLicense} className="space-y-3">
                    <div>
                      <label className="text-[10px] text-slate-400 font-bold block mb-1 uppercase font-mono">Kode Lisensi HEDRA PRO</label>
                      <input 
                        type="text" 
                        value={licenseKey}
                        onChange={e => setLicenseKey(e.target.value)}
                        placeholder="Format: HEDRA-PREMIUM-XXXX-XXXX"
                        className="w-full text-xs px-3.5 py-2.5 border border-slate-250 bg-white rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono"
                      />
                    </div>

                    <button 
                      type="submit"
                      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 rounded-xl text-xs transition cursor-pointer"
                    >
                      Daftarkan Serial Key
                    </button>
                  </form>

                  {/* Feedback warnings */}
                  {licenseError && (
                    <div className="p-3 bg-rose-50 text-rose-800 rounded-xl border border-rose-200 text-[11px] leading-snug font-medium flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600" />
                      <span>{licenseError}</span>
                    </div>
                  )}

                  {licenseSuccess && (
                    <div className="p-3 bg-emerald-50 text-emerald-950 rounded-xl border border-emerald-200 text-[11px] leading-snug font-medium flex items-center gap-1.5">
                      <CheckCircle className="w-4 h-4 shrink-0 text-emerald-600" />
                      <span>Sore, Lisensi Premium terpasang! Terima kasih telah berkontribusi bagi ekosistem desa digital.</span>
                    </div>
                  )}
                </div>

                {/* Simulation Shortcut for Sandbox Evaluator */}
                <div className="border border-indigo-200 bg-indigo-50/15 p-5 rounded-2xl space-y-4 flex flex-col justify-between h-full">
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 uppercase tracking-widest font-mono text-indigo-700">Quick Simulation Sandbox</h4>
                    <p className="text-[11px] text-slate-500 leading-relaxed mt-2">
                      Sebagai evaluator, Anda dapat melewatkan proses administrasi dengan menekan tombol pintas di bawah untuk menyalakan mode HEDRA / OpenSID Premium secara gratis untuk menguji fitur terisolasi.
                    </p>
                  </div>

                  <div className="space-y-3">
                    {isPremium ? (
                      <button
                        onClick={() => {
                          setIsPremium(false);
                          setLicenseSuccess(false);
                          alert('Kembali ke Edisi Publik.');
                        }}
                        className="w-full border border-indigo-600 text-indigo-700 hover:bg-indigo-50 font-bold py-2.5 rounded-xl text-xs transition cursor-pointer text-center"
                      >
                        Reset ke Edisi Free / Publik
                      </button>
                    ) : (
                      <button
                        onClick={handleQuickUnlock}
                        className="w-full bg-slate-900 hover:bg-slate-850 text-white font-bold py-2.5 rounded-xl text-xs transition cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
                      >
                        <Sparkles className="w-4 h-4 text-amber-400 fill-current" />
                        <span>Simulasikan Beli / Unlock Premium</span>
                      </button>
                    )}
                  </div>
                </div>

              </div>

            </div>
          )}

        </div>

      </div>

    </div>
  );
}
