import React, { useState } from 'react';
import { INITIAL_ASSET_DESA } from '../data/mockData';
import { AssetDesa } from '../types';
import { 
  Building2, MapPin, BadgeAlert, AlertCircle, Sparkles, Filter, 
  Search, Plus, Hammer, Trash, CheckCircle2, TrendingUp, DollarSign,
  Map, FileSpreadsheet, RefreshCcw, ShieldCheck, Box, Info, Lock
} from 'lucide-react';

interface ManajemenAsetProps {
  isPremium?: boolean;
}

export default function ManajemenAset({ isPremium = false }: ManajemenAsetProps) {
  const [assets, setAssets] = useState<AssetDesa[]>(INITIAL_ASSET_DESA);
  
  // Search and Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedKategori, setSelectedKategori] = useState<string>('Semua');
  const [selectedKondisi, setSelectedKondisi] = useState<string>('Semua');

  // Form State for Adding New Asset
  const [isAdding, setIsAdding] = useState(false);
  const [fNama, setFNama] = useState('');
  const [fKategori, setFKategori] = useState<'Tanah' | 'Gedung' | 'Kendaraan' | 'Peralatan'>('Peralatan');
  const [fKondisi, setFKondisi] = useState<'Baik' | 'Rusak Ringan' | 'Rusak Berat'>('Baik');
  const [fNilai, setFNilai] = useState<number>(15000000);
  const [fLokasi, setFLokasi] = useState('');
  const [fX, setFX] = useState<number>(50);
  const [fY, setFY] = useState<number>(50);

  // Maintenance Log Simulation State
  const [selectedAsset, setSelectedAsset] = useState<AssetDesa | null>(INITIAL_ASSET_DESA[0]);
  const [maintenanceNotes, setMaintenanceNotes] = useState<string>('');
  const [maintenanceHistory, setMaintenanceHistory] = useState<Array<{ id: string, assetName: string, date: string, cost: number, desc: string }>>([
    { id: 'm-1', assetName: 'Motor Dinas Sekdes (Honda Win)', date: '2026-05-15', cost: 450000, desc: 'Overhaul karburator & ganti baterai kelistrikan' },
    { id: 'm-2', assetName: 'Kantor Kepala Desa Pondokpanjang', date: '2026-04-10', cost: 12000000, desc: 'Pengecatan ulang aula utama & perbaikan pipa bocor' }
  ]);

  // Calculations
  const assetTotalValue = assets.reduce((sum, a) => sum + a.nilai, 0);
  const assetCountByCondition = (cond: 'Baik' | 'Rusak Ringan' | 'Rusak Berat') => {
    return assets.filter(a => a.kondisi === cond).length;
  };

  // Handle adding asset
  const handleAddAsset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fNama.trim() || !fLokasi.trim()) {
      alert('Mohon lengkapi nama aset dan lokasinya.');
      return;
    }

    // Generate consecutive asset code resembling AST.1706.01.2026.XXX
    const nextNum = String(assets.length + 1).padStart(3, '0');
    const computedCode = `AST.1706.01.2026.${nextNum}`;

    const newAsset: AssetDesa = {
      id: `as-${Date.now()}`,
      kode: computedCode,
      nama: fNama,
      kategori: fKategori,
      kondisi: fKondisi,
      nilai: Number(fNilai) || 0,
      lokasi: fLokasi,
      koordinat: { x: Number(fX), y: Number(fY) }
    };

    setAssets([...assets, newAsset]);
    
    // Reset Form
    setFNama('');
    setFKategori('Peralatan');
    setFKondisi('Baik');
    setFNilai(15000000);
    setFLokasi('');
    setFX(50);
    setFY(50);
    setIsAdding(false);
  };

  // Remove asset
  const handleDeleteAsset = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus pencatatan aset desa ini? Tindakan ini permanen.')) {
      setAssets(assets.filter(a => a.id !== id));
      if (selectedAsset?.id === id) {
        setSelectedAsset(null);
      }
    }
  };

  // Quick Update Condition
  const handleUpdateCondition = (id: string, newKondisi: 'Baik' | 'Rusak Ringan' | 'Rusak Berat') => {
    setAssets(assets.map(a => a.id === id ? { ...a, kondisi: newKondisi } : a));
    // update current inspecting selection if matches
    if (selectedAsset?.id === id) {
      setSelectedAsset(prev => prev ? { ...prev, kondisi: newKondisi } : null);
    }
  };

  // Submit maintenance action
  const handleAddMaintenance = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAsset) return;
    if (!maintenanceNotes.trim()) return;

    const mockCost = Math.floor(Math.random() * 5000000) + 150000;
    const newLog = {
      id: `m-log-${Date.now()}`,
      assetName: selectedAsset.nama,
      date: new Date().toISOString().split('T')[0],
      cost: mockCost,
      desc: maintenanceNotes
    };

    setMaintenanceHistory([newLog, ...maintenanceHistory]);
    setMaintenanceNotes('');

    // Automatically flag as "Baik" when serviced if it was broken
    if (selectedAsset.kondisi !== 'Baik') {
      handleUpdateCondition(selectedAsset.id, 'Baik');
    }
  };

  // Filtered Assets list
  const filteredAssets = assets.filter(a => {
    const matchesSearch = a.nama.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          a.kode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          a.lokasi.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesKategori = selectedKategori === 'Semua' || a.kategori === selectedKategori;
    const matchesKondisi = selectedKondisi === 'Semua' || a.kondisi === selectedKondisi;
    return matchesSearch && matchesKategori && matchesKondisi;
  });

  return (
    <div className="space-y-6" id="manajemen-aset-root">
      
      {/* Upper Title Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm" id="aset-header">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] bg-emerald-100 text-emerald-800 font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider font-mono">
              Modul BUMDes & Ekonomi Desa
            </span>
            <span className="text-[10px] bg-slate-100 text-slate-700 font-bold px-2 py-0.5 rounded-full">
              Sesuai UU Desa No. 6
            </span>
          </div>
          <h2 className="text-xl font-bold font-display text-slate-800 mt-2 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-emerald-600" /> Pengelolaan Aset & Inventaris Desa (HEDRA Assets)
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Sistem akuntansi terintegrasi pencatatan inventarisasi, evaluasi kondisi, dan letak geografis aset milik Pemerintah Desa Pondokpanjang.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Premium KIB exporter */}
          <button
            onClick={() => {
              if (!isPremium) {
                alert('⚠️ Fitur Ekspor KIB (Kartu Inventaris Barang) PDF adalah layanan HEDRA Premium. Silakan isi lisensi premium Anda di tab "Aset & Ekstensi" terlebih dahulu!');
                return;
              }
              window.print();
            }}
            className={`text-xs font-bold px-4 py-2.5 rounded-xl cursor-pointer transition-all flex items-center gap-2 ${
              isPremium 
              ? 'bg-amber-500 hover:bg-amber-600 text-white' 
              : 'bg-slate-100 hover:bg-slate-200 text-slate-505 border border-slate-200 shadow-sm'
            }`}
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Ekspor KIB (PDF)</span>
            {!isPremium && <Lock className="w-3.5 h-3.5 text-amber-500 fill-amber-150 animate-pulse" />}
          </button>

          <button
            onClick={() => setIsAdding(!isAdding)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl cursor-pointer transition-colors shadow-sm flex items-center gap-2"
            id="btn-tambah-aset"
          >
            <Plus className="w-4 h-4" />
            <span>Pencatatan Baru</span>
          </button>
        </div>
      </div>

      {/* Asset KPI Statistics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" id="aset-kpi-grid">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Total Nilai Aset</p>
            <h4 className="text-lg font-bold text-slate-850">Rp {assetTotalValue.toLocaleString('id-ID')}</h4>
            <p className="text-[10px] text-slate-500 mt-0.5">Kumulatif seluruh kategori</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
            <Box className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Total Item</p>
            <h4 className="text-2xl font-bold text-slate-850">{assets.length} <span className="text-xs font-normal text-slate-500">Unit Terdaftar</span></h4>
            <p className="text-[10px] text-slate-500 mt-0.5">Tercatat di Buku Inventaris</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider font-mono text-emerald-600">Kondisi Baik</p>
            <h4 className="text-2xl font-bold text-slate-850">{assetCountByCondition('Baik')} <span className="text-xs font-normal text-slate-500">Aset</span></h4>
            <p className="text-[10px] text-slate-500 mt-0.5">Aman digunakan/Siap Operasional</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-rose-50 text-rose-600 rounded-lg">
            <BadgeAlert className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider text-rose-600">Perlu Pemeliharaan</p>
            <h4 className="text-2xl font-bold text-slate-850">
              {assetCountByCondition('Rusak Ringan') + assetCountByCondition('Rusak Berat')} <span className="text-xs font-normal text-slate-500">Unit</span>
            </h4>
            <div className="text-[9px] text-slate-500 flex gap-2 mt-0.5">
              <span>{assetCountByCondition('Rusak Ringan')} Rusak Ringan</span>
              <span>{assetCountByCondition('Rusak Berat')} Rusak Berat</span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Form (if open) & Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="aset-core-panels">
        
        {/* Left Form Panel: Add Asset (Conditional Render) */}
        {isAdding && (
          <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-emerald-300 shadow-md animate-fade-in" id="panel-add-aset">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3 mb-4">
              <h3 className="text-sm font-bold text-slate-800 flex items-center gap-1.5 uppercase">
                <Plus className="w-4.5 h-4.5 text-emerald-600" /> Formulir Input Aset
              </h3>
              <button 
                onClick={() => setIsAdding(false)} 
                className="text-xs text-slate-400 hover:text-slate-650 cursor-pointer font-bold px-1.5 py-1 hover:bg-slate-50 rounded"
              >
                Batal
              </button>
            </div>

            <form onSubmit={handleAddAsset} className="space-y-4">
              <div>
                <label className="text-[11px] text-slate-400 block mb-1 font-bold uppercase">Nama Aset / Inventaris</label>
                <input 
                  type="text" 
                  value={fNama} 
                  onChange={e => setFNama(e.target.value)}
                  placeholder="Contoh: Genset Cadangan 10000W PKK"
                  className="w-full text-xs px-3 py-2 border border-slate-200 bg-slate-50 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1 font-bold uppercase">Kategori</label>
                  <select 
                    value={fKategori} 
                    onChange={e => setFKategori(e.target.value as any)}
                    className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none"
                  >
                    <option value="Tanah">Tanah</option>
                    <option value="Gedung">Gedung</option>
                    <option value="Kendaraan">Kendaraan</option>
                    <option value="Peralatan">Peralatan</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] text-slate-400 block mb-1 font-bold uppercase">Kondisi Awal</label>
                  <select 
                    value={fKondisi} 
                    onChange={e => setFKondisi(e.target.value as any)}
                    className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none"
                  >
                    <option value="Baik">Baik</option>
                    <option value="Rusak Ringan">Rusak Ringan</option>
                    <option value="Rusak Berat">Rusak Berat</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[11px] text-slate-400 block mb-1 font-bold uppercase">Nilai Perolehan / Estimasi (Rp)</label>
                <input 
                  type="number" 
                  value={fNilai} 
                  onChange={e => setFNilai(Number(e.target.value))}
                  placeholder="Estimasi total dalam rupiah"
                  className="w-full text-xs px-3 py-2 border border-slate-200 bg-slate-50 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  required
                />
              </div>

              <div>
                <label className="text-[11px] text-slate-400 block mb-1 font-bold uppercase">Lokasi Detil</label>
                <input 
                  type="text" 
                  value={fLokasi} 
                  onChange={e => setFLokasi(e.target.value)}
                  placeholder="RT/RW, Dusun, atau penanggung jawab"
                  className="w-full text-xs px-3 py-2 border border-slate-200 bg-slate-50 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  required
                />
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                <span className="text-[10px] text-emerald-800 font-extrabold uppercase block font-mono">
                  Koordinat GIS Grid Desa (% Luas)
                </span>
                <p className="text-[10px] text-slate-500 leading-tight">
                  Lokasikan secara relatif untuk divisualisasikan langsung pada panel peta plot HEDRA CMS.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] text-slate-405 block font-bold">X (Barat - Timur): {fX}%</label>
                    <input 
                      type="range" 
                      min="5" 
                      max="95" 
                      value={fX} 
                      onChange={e => setFX(Number(e.target.value))}
                      className="w-full accent-emerald-600 h-1"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-405 block font-bold">Y (Utara - Selatan): {fY}%</label>
                    <input 
                      type="range" 
                      min="5" 
                      max="95" 
                      value={fY} 
                      onChange={e => setFY(Number(e.target.value))}
                      className="w-full accent-emerald-600 h-1"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-lg text-xs transition-colors cursor-pointer"
              >
                Simpan Ke Data Buku Inventaris
              </button>
            </form>
          </div>
        )}

        {/* Assets List Panel */}
        <div className={`bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between ${isAdding ? 'lg:col-span-8' : 'lg:col-span-12'}`} id="panel-daftar-aset">
          
          {/* Top Bar for Searching and Filtering */}
          <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center border-b border-slate-100 pb-4 mb-4" id="aset-controls">
            <div className="relative w-full md:w-72">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                <Search className="w-4 h-4" />
              </span>
              <input 
                type="text" 
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Cari nama aset, kode, atau lokasi..."
                className="w-full text-xs pl-9 pr-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500 bg-slate-5"
              />
            </div>

            {/* Selecting Category & Conditions Filter */}
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              <div className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1.5 rounded-xl border border-slate-200">
                <Filter className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Kategori:</span>
                <select 
                  value={selectedKategori}
                  onChange={e => setSelectedKategori(e.target.value)}
                  className="bg-transparent text-xs font-semibold focus:outline-none text-slate-700 cursor-pointer"
                >
                  <option value="Semua">Semua Kategori</option>
                  <option value="Tanah">Tanah</option>
                  <option value="Gedung">Gedung</option>
                  <option value="Kendaraan">Kendaraan</option>
                  <option value="Peralatan">Peralatan</option>
                </select>
              </div>

              <div className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1.5 rounded-xl border border-slate-200">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Kondisi:</span>
                <select 
                  value={selectedKondisi}
                  onChange={e => setSelectedKondisi(e.target.value)}
                  className="bg-transparent text-xs font-semibold focus:outline-none text-slate-700 cursor-pointer"
                >
                  <option value="Semua">Semua Kondisi</option>
                  <option value="Baik">Baik</option>
                  <option value="Rusak Ringan">Rusak Ringan</option>
                  <option value="Rusak Berat">Rusak Berat</option>
                </select>
              </div>
            </div>
          </div>

          {/* Table representing all properties registered */}
          <div className="overflow-x-auto" id="table-wrap-aset">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 text-[10px] font-bold uppercase tracking-wider">
                  <th className="py-3 px-3">Kode & Nama</th>
                  <th className="py-3 px-3">Kategori</th>
                  <th className="py-3 px-3">Nilai Estimasi</th>
                  <th className="py-3 px-3">Kondisi</th>
                  <th className="py-3 px-3">Lokasi Aset</th>
                  <th className="py-3 px-3 text-right">Aksi & Kontrol</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {filteredAssets.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-8 text-slate-400 font-medium">
                      Tidak ditemukan aset yang cocok dengan filter pencarian "{searchTerm}".
                    </td>
                  </tr>
                ) : (
                  filteredAssets.map(asset => {
                    return (
                      <tr 
                        key={asset.id} 
                        className={`hover:bg-slate-50 transition-colors cursor-pointer ${selectedAsset?.id === asset.id ? 'bg-emerald-50/50' : ''}`}
                        onClick={() => setSelectedAsset(asset)}
                      >
                        <td className="py-3.5 px-3">
                          <div>
                            <p className="font-semibold text-slate-800">{asset.nama}</p>
                            <p className="text-[10px] text-slate-400 font-mono mt-0.5">{asset.kode}</p>
                          </div>
                        </td>
                        <td className="py-3.5 px-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                            asset.kategori === 'Tanah' ? 'bg-amber-100 text-amber-800' :
                            asset.kategori === 'Gedung' ? 'bg-indigo-100 text-indigo-800' :
                            asset.kategori === 'Kendaraan' ? 'bg-blue-100 text-blue-800' :
                            'bg-slate-150 text-slate-800'
                          }`}>
                            {asset.kategori}
                          </span>
                        </td>
                        <td className="py-3.5 px-3 font-semibold font-mono text-slate-800">
                          Rp {asset.nilai.toLocaleString('id-ID')}
                        </td>
                        <td className="py-3.5 px-3">
                          <div className="flex items-center space-x-1">
                            <span className={`w-1.5 h-1.5 rounded-full ${
                              asset.kondisi === 'Baik' ? 'bg-emerald-500' :
                              asset.kondisi === 'Rusak Ringan' ? 'bg-amber-500' : 'bg-rose-500'
                            }`}></span>
                            <span className="font-semibold">{asset.kondisi}</span>
                          </div>
                        </td>
                        <td className="py-3.5 px-3 text-slate-500 max-w-xs truncate">
                          <div className="flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            <span className="truncate">{asset.lokasi}</span>
                          </div>
                        </td>
                        <td className="py-3.5 px-3 text-right" onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center justify-end gap-1.5">
                            <select
                              value={asset.kondisi}
                              onChange={(e) => handleUpdateCondition(asset.id, e.target.value as any)}
                              className="text-[10px] bg-slate-100 font-bold hover:bg-slate-200 text-slate-700 px-2 py-1 rounded cursor-pointer transition focus:outline-none"
                            >
                              <option value="Baik">Set Baik</option>
                              <option value="Rusak Ringan">Set Rusak Ringan</option>
                              <option value="Rusak Berat">Set Rusak Berat</option>
                            </select>
                            
                            <button
                              onClick={() => handleDeleteAsset(asset.id)}
                              className="p-1 px-1.5 text-rose-600 hover:text-white hover:bg-rose-600 rounded transition cursor-pointer"
                              title="Hapus pencatatan aset"
                            >
                              <Trash className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          <div className="bg-slate-50 p-3 rounded-lg border border-slate-150 mt-4 flex items-center justify-between text-[11px] text-slate-500 font-mono">
            <span>Daftar tersaring: <b>{filteredAssets.length} unit</b> dari total <b>{assets.length} item</b></span>
            <span>Guna pembukuan APBDes BUMDes Berkelanjutan</span>
          </div>

        </div>
      </div>

      {/* Down section: Interactive GIS Location Plotter & Maintenance Log Scheduler */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" id="aset-secondary-interactive">
        
        {/* Panel A: Interactive GIS Asset Plotter Map */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between" id="gis-aset-plotter">
          <div>
            <span className="text-[10px] bg-indigo-50 border border-indigo-100 text-indigo-700 font-bold px-2 py-0.5 rounded-full uppercase tracking-wider font-mono">
              Visualisasi HEDRA GIS
            </span>
            <h3 className="text-md font-bold font-display text-slate-800 mt-2 flex items-center gap-2">
              <Map className="w-4.5 h-4.5 text-emerald-600 animate-pulse" /> Peta Koordinat Relatif Aset Desa
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Plot lokasi seluruh inventaris di koordinat grid wilayah Desa Pondokpanjang (% wilayah). Klik titik pin untuk melihat rincian cepat.
            </p>
          </div>

          {/* Interactive Canvas Grid */}
          <div className="my-4 h-72 bg-gradient-to-br from-emerald-50/70 via-indigo-50/20 to-sky-50/40 border border-slate-200 rounded-xl relative overflow-hidden flex items-center justify-center p-4">
            <div className="absolute top-2 left-2 text-[10px] text-slate-400 font-mono">Sektor Utara (Sungai & Bukit Sawit)</div>
            <div className="absolute bottom-2 right-2 text-[10px] text-slate-400 font-mono">Sektor Selatan (Permukiman & Irigasi)</div>
            
            {/* Visual map roads / rivers lines representation */}
            <div className="absolute w-[1px] h-full left-1/3 bg-slate-200/80 border-dashed pointer-events-none"></div>
            <div className="absolute w-full h-[1px] top-1/2 bg-slate-200/80 border-dashed pointer-events-none"></div>
            <div className="absolute w-full h-8 top-1/3 bg-blue-100/60 -rotate-12 pointer-events-none flex items-center justify-center text-[10px] text-blue-500 font-semibold tracking-widest uppercase">
              Aliran Sungai Pondok
            </div>

            {/* Active Points */}
            {assets.map(asset => {
              const { x, y } = asset.koordinat || { x: 50, y: 50 };
              const isSelected = selectedAsset?.id === asset.id;
              
              // Color base on category
              const markerBg = 
                asset.kondisi === 'Baik' ? 'bg-emerald-600 ring-emerald-200' :
                asset.kondisi === 'Rusak Ringan' ? 'bg-amber-500 ring-amber-200' :
                'bg-rose-500 ring-rose-200';

              return (
                <button
                  key={asset.id}
                  onClick={() => setSelectedAsset(asset)}
                  className={`absolute w-3.5 h-3.5 rounded-full ${markerBg} text-white cursor-pointer hover:scale-130 transition-transform ring-4 flex items-center justify-center`}
                  style={{ left: `${x}%`, top: `${y}%` }}
                  title={`${asset.nama} (${asset.kode})`}
                >
                  <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                  {isSelected && (
                    <span className="absolute -inset-2 rounded-full border-2 border-emerald-600 animate-ping"></span>
                  )}
                </button>
              );
            })}

            {/* Quick Map Legend */}
            <div className="absolute bottom-2 left-2 bg-white/90 p-2 rounded-lg border border-slate-150 text-[9px] text-slate-500 flex flex-col space-y-1">
              <span className="font-bold text-slate-705">Legenda Kondisi:</span>
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
                <span>Operasional / Baik</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                <span>Rusak Ringan</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                <span>Rusak Berat</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-150 text-xs">
            {selectedAsset ? (
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-bold text-slate-750">{selectedAsset.nama}</h4>
                  <p className="text-[10px] text-slate-400 font-mono">Kode Aset: {selectedAsset.kode} | Kategori: <b>{selectedAsset.kategori}</b></p>
                  <p className="text-[11px] text-slate-500 mt-1">Nilai: <b>Rp {selectedAsset.nilai.toLocaleString('id-ID')}</b> · Kondisi: <span className="font-bold text-slate-700">{selectedAsset.kondisi}</span></p>
                  <p className="text-[11px] text-slate-420 mt-1 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" /> {selectedAsset.lokasi} (Koordinat Grid: {selectedAsset.koordinat.x}%, {selectedAsset.koordinat.y}%)
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded font-mono">X: {selectedAsset.koordinat.x}%</span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded font-mono ml-1">Y: {selectedAsset.koordinat.y}%</span>
                </div>
              </div>
            ) : (
              <p className="text-slate-400 italic text-center py-2">
                Klik salah satu titik plot di atas atau pilih item tabel untuk memproyeksikan detail spasial.
              </p>
            )}
          </div>
        </div>

        {/* Panel B: Maintenance Scheduler and Maintenance Log */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between" id="aset-logbook-perawatan">
          <div>
            <span className="text-[10px] bg-emerald-50 border border-emerald-100 text-emerald-700 font-bold px-2 py-0.5 rounded-full uppercase tracking-wider font-mono">
              Pemeliharaan Aset Terjadwal
            </span>
            <h3 className="text-md font-bold font-display text-slate-800 mt-2 flex items-center gap-2">
              <Hammer className="w-4.5 h-4.5 text-emerald-600" /> Log Tindakan & Pemeliharaan Inventaris
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Catat perbaikan kerusakan ringan/berat guna memulihkan nilai guna aset dan menjaga keamanan penggunaan publik.
            </p>
          </div>

          {selectedAsset ? (
            <form onSubmit={handleAddMaintenance} className="my-4 bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
              <div className="flex items-center justify-between text-xs font-bold leading-tight">
                <span className="text-slate-500">Mencatat Pemeliharaan Untuk:</span>
                <span className="text-emerald-700">{selectedAsset.nama}</span>
              </div>
              
              <div>
                <textarea 
                  value={maintenanceNotes} 
                  onChange={e => setMaintenanceNotes(e.target.value)}
                  placeholder="Deskripsikan tindakan pemeliharaan, misalnya: 'Perbaikan sasis kaki jembatan & pengecatan antikarat semen hidrolik'..."
                  className="w-full text-xs p-3.5 border border-slate-200 bg-white rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 h-20"
                  required
                />
              </div>

              <div className="flex justify-between items-center text-[10px] text-slate-500 italic">
                <span>* Setelah disimpan, kondisi aset otomatis di-set ke "BAIK"</span>
                <button
                  type="submit"
                  className="bg-slate-800 hover:bg-slate-900 text-white font-bold px-3 py-1.5 rounded-lg text-[11px] cursor-pointer"
                >
                  Simpan Agenda Perbaikan
                </button>
              </div>
            </form>
          ) : (
            <div className="my-4 p-6 text-center border border-dashed border-slate-200 bg-slate-50 rounded-xl text-slate-400 text-xs italic">
              Pilih aset terlebih dahulu di tabel untuk mengagendakan tindakan pemeliharaan.
            </div>
          )}

          {/* Historical Log */}
          <div>
            <h4 className="text-xs font-bold text-slate-550 uppercase tracking-wider mb-2.5">Histori Perawatan Terakhir</h4>
            <div className="space-y-2 max-h-36 overflow-y-auto pr-1 text-xs">
              {maintenanceHistory.map(log => (
                <div key={log.id} className="p-3 bg-slate-50 hover:bg-slate-100 transition-colors border border-slate-200 rounded-xl">
                  <div className="flex justify-between items-center font-bold text-slate-700">
                    <span className="truncate pr-1">{log.assetName}</span>
                    <span className="text-[10px] font-mono text-emerald-700 shrink-0">Rp {log.cost.toLocaleString('id-ID')}</span>
                  </div>
                  <p className="text-slate-500 text-[11px] mt-1 leading-normal">{log.desc}</p>
                  <p className="text-[9px] text-slate-400 font-mono mt-1 text-right">{log.date} · HEDRA Log</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Standard cPanel PDF Backup Export Simulation Section explicitly defined in PRD */}
      <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6" id="aset-export-backup">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-2xl border border-emerald-500/20">
            <FileSpreadsheet className="w-8 h-8" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Ekspor Laporan Inventaris Aset Desa (KIB)</h4>
            <p className="text-xs text-slate-400 mt-1">
              Unduh Kartu Inventaris Barang (KIB A, B, C) format standar Kemendagri RI lengkap dengan koordinat GIS dan kalkulasi penyusutan aset.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => {
              alert('Laporan KIB (Kartu Inventaris Barang) berhasil diekspor ke Excel / CSV untuk Arsip cPanel HEDRA.');
            }}
            className="text-xs font-bold border border-emerald-500 bg-emerald-600/10 hover:bg-emerald-600/25 text-emerald-400 px-4 py-2 rounded-xl cursor-pointer transition-colors"
          >
            Ekspor CSV / Excel
          </button>
          <button 
            onClick={() => {
              alert('Dokumen legal Inventarisasi Desa berhasil digenerasi ke format PDF terverifikasi QR Code.');
            }}
            className="text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl cursor-pointer transition-colors"
          >
            Cetak PDF KIB Desa
          </button>
        </div>
      </div>

    </div>
  );
}

// Extra supporting SVGIcons as fallback if needed
function EYEIcon({ className }: { className?: string }) {
  return (
    <svg 
      className={className} 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24" 
      stroke="currentColor" 
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7Z" />
    </svg>
  );
}
