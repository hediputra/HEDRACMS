import React, { useState } from 'react';
import { LIST_PENDUDUK } from '../data/mockData';
import { Penduduk } from '../types';
import { Users, Search, Plus, Filter, Check, ShieldAlert, Sparkles, AlertCircle } from 'lucide-react';

export default function PendudukPajak() {
  const [residents, setResidents] = useState<Penduduk[]>(LIST_PENDUDUK);
  const [search, setSearch] = useState('');
  const [selectedDusun, setSelectedDusun] = useState('Semua');

  // New resident form states
  const [nik, setNik] = useState('');
  const [nama, setNama] = useState('');
  const [alamat, setAlamat] = useState('');
  const [pekerjaan, setPekerjaan] = useState('Petani Kelapa Sawit');
  const [showAddForm, setShowAddForm] = useState(false);

  // Tax state simulation
  const [pbbRecords, setPbbRecords] = useState([
    { id: 'pbb-1', nama: 'Budi Santoso', nop: '17.06.010.001.025-0012.0', jumlah: 145000, status: 'Belum Lunas', tempo: '2026-09-30' },
    { id: 'pbb-2', nama: 'Wayan Sudarta', nop: '17.06.010.001.025-0045.0', jumlah: 450000, status: 'Lunas', tempo: '2026-09-30' },
    { id: 'pbb-3', nama: 'Dewi Lestari', nop: '17.06.010.001.025-0018.0', jumlah: 95000, status: 'Jatuh Tempo', tempo: '2026-05-31' },
    { id: 'pbb-4', nama: 'Hendry Siahaan', nop: '17.06.010.001.025-0022.0', jumlah: 240000, status: 'Belum Lunas', tempo: '2026-09-30' }
  ]);

  const handleBayarPbb = (id: string) => {
    setPbbRecords(prev => prev.map(rec => {
      if (rec.id === id) {
        return { ...rec, status: 'Lunas' };
      }
      return rec;
    }));
  };

  const addResident = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nik || !nama || !alamat) return;

    const newRes: Penduduk = {
      nik,
      kk: `17060105051000${Math.floor(10 + Math.random() * 89)}`,
      nama,
      jenisKelamin: 'Laki-laki',
      tempatLahir: 'Pondokpanjang',
      tanggalLahir: '1995-12-10',
      alamat,
      rt: '02',
      rw: '01',
      dusun: 'Dusun I',
      pendidikan: 'SMA',
      pekerjaan,
      agama: 'Islam',
      statusKeluarga: 'Anggota Keluarga'
    };

    setResidents([...residents, newRes]);
    
    // Also append to simulated PBB register automatically!
    const newPbb = {
      id: `pbb-${pbbRecords.length + 1}`,
      nama,
      nop: `17.06.010.001.025-00${Math.floor(10 + Math.random() * 89)}.0`,
      jumlah: 120000,
      status: 'Belum Lunas',
      tempo: '2026-09-30'
    };
    setPbbRecords([...pbbRecords, newPbb]);

    setNik('');
    setNama('');
    setAlamat('');
    setShowAddForm(false);
  };

  // Filter calculations
  const filteredResidents = residents.filter(p => {
    const matchesSearch = p.nama.toLowerCase().includes(search.toLowerCase()) || p.nik.includes(search);
    const matchesDusun = selectedDusun === 'Semua' || p.dusun === selectedDusun;
    return matchesSearch && matchesDusun;
  });

  // Simple statistics
  const countLaki = residents.filter(p => p.jenisKelamin === 'Laki-laki').length;
  const countPerempuan = residents.filter(p => p.jenisKelamin === 'Perempuan').length;

  return (
    <div className="space-y-6" id="penduduk-pajak-section">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Resident Registry & Search */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-md font-bold font-display text-slate-800 flex items-center gap-2">
                <Users className="w-5 h-5 text-indigo-500" /> Registrasi Data Penduduk
              </h3>
              <button 
                onClick={() => setShowAddForm(!showAddForm)}
                className="text-xs bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1 cursor-pointer transition-colors"
              >
                <Plus className="w-4 h-4" /> Tambah Penduduk
              </button>
            </div>

            {showAddForm && (
              <form onSubmit={addResident} className="mb-4 p-4 bg-slate-55 rounded-xl border border-dashed border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2 font-semibold text-xs text-slate-600">Registrasi Warga Baru</div>
                <div>
                  <label className="text-[10px] text-slate-450 block mb-0.5">NIK (16 Digit)</label>
                  <input 
                    type="text" 
                    value={nik}
                    onChange={e => setNik(e.target.value)}
                    placeholder="170601..."
                    maxLength={16}
                    className="w-full text-xs px-2.5 py-1.5 border border-slate-200 rounded-md focus:outline-none focus:ring-1 bg-white font-mono"
                    required
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-450 block mb-0.5">Nama Lengkap</label>
                  <input 
                    type="text" 
                    value={nama}
                    onChange={e => setNama(e.target.value)}
                    placeholder="Nama lengkap..."
                    className="w-full text-xs px-2.5 py-1.5 border border-slate-200 rounded-md focus:outline-none focus:ring-1 bg-white"
                    required
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-450 block mb-0.5">Pekerjaan</label>
                  <select 
                    value={pekerjaan}
                    onChange={e => setPekerjaan(e.target.value)}
                    className="w-full text-xs px-2.5 py-1.5 border border-slate-200 rounded-md bg-white focus:outline-none"
                  >
                    <option>Petani Kelapa Sawit</option>
                    <option>Pekebun Karet</option>
                    <option>Pedagang Sembako</option>
                    <option>Guru Madrasah</option>
                    <option>Wiraswasta</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] text-slate-450 block mb-0.5">Alamat / RT RW</label>
                  <input 
                    type="text" 
                    value={alamat}
                    onChange={e => setAlamat(e.target.value)}
                    placeholder="contoh: RT 003 Dusun II"
                    className="w-full text-xs px-2.5 py-1.5 border border-slate-200 rounded-md focus:outline-none focus:ring-1 bg-white"
                    required
                  />
                </div>
                <div className="sm:col-span-2 flex justify-end gap-2 pt-2">
                  <button 
                    type="button" 
                    onClick={() => setShowAddForm(false)}
                    className="px-2.5 py-1.5 border text-xs text-slate-500 rounded-lg cursor-pointer"
                  >
                    Batal
                  </button>
                  <button 
                    type="submit" 
                    className="px-4 py-1.5 bg-indigo-600 text-white font-semibold text-xs rounded-lg cursor-pointer"
                  >
                    Simpan Registrasi
                  </button>
                </div>
              </form>
            )}

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <div className="flex-1 relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input 
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Cari warga berdasarkan Nama atau NIK..."
                  className="w-full text-xs pl-9 pr-4 py-2 border border-slate-200 rounded-lg bg-slate-50 focus:outline-none focus:ring-1"
                />
              </div>
              <div className="flex items-center gap-1.5">
                <Filter className="w-3.5 h-3.5 text-slate-400" />
                <select 
                  value={selectedDusun}
                  onChange={e => setSelectedDusun(e.target.value)}
                  className="text-xs px-3 py-2 border border-slate-200 rounded-lg bg-slate-50 focus:outline-none"
                >
                  <option>Semua</option>
                  <option>Dusun I</option>
                  <option>Dusun II</option>
                </select>
              </div>
            </div>

            {/* Resident Table inside a scroll container */}
            <div className="overflow-x-auto border border-slate-100 rounded-xl">
              <table className="w-full text-left text-xs text-slate-600">
                <thead className="bg-slate-50 text-[10px] text-slate-400 font-bold uppercase">
                  <tr>
                    <th className="p-3">NIK / Nama</th>
                    <th className="p-3">Dusun / Alamat</th>
                    <th className="p-3">Pendidikan</th>
                    <th className="p-3">Pekerjaan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredResidents.map(res => (
                    <tr key={res.nik} className="hover:bg-slate-50/75 transition-colors">
                      <td className="p-3">
                        <p className="font-bold text-slate-800">{res.nama}</p>
                        <p className="font-mono text-[10px] text-slate-400">{res.nik}</p>
                      </td>
                      <td className="p-3">
                        <p className="font-semibold text-slate-700">{res.dusun}</p>
                        <p className="text-[10px] text-slate-400">{res.alamat}</p>
                      </td>
                      <td className="p-3 font-medium text-slate-500">{res.pendidikan}</td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 bg-slate-100 text-slate-700 border border-slate-150 rounded text-[9px] font-medium font-mono">
                          {res.pekerjaan}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between items-center text-xs text-slate-400">
            <span>Menampilkan {filteredResidents.length} dari total {residents.length} data wilayah.</span>
            <div className="flex gap-4">
              <span>Laki-laki: <b>{countLaki}</b></span>
              <span>Perempuan: <b>{countPerempuan}</b></span>
            </div>
          </div>
        </div>

        {/* PBB Pajak Bumi & Bangunan Monitor */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-md font-bold font-display text-slate-800 flex items-center gap-1.5">
                <AlertCircle className="w-5 h-5 text-amber-500" /> Retribusi & PBB-P2 Desa
              </h3>
              <span className="text-[10px] font-mono text-slate-400">Pajak Desa</span>
            </div>

            <p className="text-xs text-slate-400 mb-4">Pemantauan kepatuhan wajib pajak kelapa sawit & pekarangan desa.</p>

            <div className="space-y-3">
              {pbbRecords.map(rec => (
                <div key={rec.id} className="p-3 rounded-xl border border-slate-100 bg-slate-50 text-xs flex justify-between items-center">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5">
                      <p className="font-bold text-slate-800 text-xs">{rec.nama}</p>
                      <span className={`px-1.5 py-0.2 rounded text-[8px] font-bold uppercase tracking-wider ${
                        rec.status === 'Lunas' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                        rec.status === 'Jatuh Tempo' ? 'bg-rose-50 text-rose-600 border border-rose-150' : 'bg-amber-50 text-amber-600'
                      }`}>
                        {rec.status}
                      </span>
                    </div>
                    <p className="font-mono text-[9px] text-slate-400">NOP: {rec.nop}</p>
                    <p className="text-[10px] text-slate-400">Nominal: <b>Rp {rec.jumlah.toLocaleString('id-ID')}</b></p>
                  </div>

                  <div>
                    {rec.status !== 'Lunas' ? (
                      <button 
                        onClick={() => handleBayarPbb(rec.id)}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-2.5 py-1.5 rounded-lg text-[10px] cursor-pointer transition-colors"
                      >
                        Terima Bayar
                      </button>
                    ) : (
                      <span className="p-1 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center">
                        <Check className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-indigo-950 p-4 rounded-xl text-white mt-5 bg-grid-white flex items-center justify-between">
            <div>
              <p className="text-[10px] text-indigo-200">Realisasi Pajak PBB Desa</p>
              <h4 className="text-lg font-bold font-mono">
                Rp {pbbRecords.filter(r => r.status === 'Lunas').reduce((sum, r) => sum + r.jumlah, 0).toLocaleString('id-ID')}
              </h4>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-emerald-300 font-bold block">✓ {pbbRecords.filter(r => r.status === 'Lunas').length} Pembayar</span>
              <span className="text-[9px] text-indigo-300">Target: Rp 930.000</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
