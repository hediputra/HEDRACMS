import { useState } from 'react';
import { INITIAL_LEDBERG_APBDES } from '../data/mockData';
import { APBDesLedger } from '../types';
import { DollarSign, Percent, TrendingUp, AlertTriangle, Check, RefreshCw, BarChart2 } from 'lucide-react';

export default function KeuanganTransparansi() {
  const [ledger, setLedger] = useState<APBDesLedger[]>(INITIAL_LEDBERG_APBDES);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [tempAnggaran, setTempAnggaran] = useState<number>(0);

  const startEdit = (item: APBDesLedger) => {
    setEditingId(item.id);
    setTempAnggaran(item.anggaran);
  };

  const saveEdit = (id: string) => {
    setLedger(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, anggaran: tempAnggaran };
      }
      return item;
    }));
    setEditingId(null);
  };

  // Re-calculate aggregations in real-time
  const totalPendapatan = ledger.filter(i => i.tipe === 'Pendapatan').reduce((sum, i) => sum + i.anggaran, 0);
  const totalBelanja = ledger.filter(i => i.tipe === 'Belanja').reduce((sum, i) => sum + i.anggaran, 0);
  const totalPembiayaan = ledger.filter(i => i.tipe === 'Pembiayaan').reduce((sum, i) => sum + i.anggaran, 0);

  const realPendapatan = ledger.filter(i => i.tipe === 'Pendapatan').reduce((sum, i) => sum + i.realisasi, 0);
  const realBelanja = ledger.filter(i => i.tipe === 'Belanja').reduce((sum, i) => sum + i.realisasi, 0);

  const surplusDefisit = totalPendapatan - totalBelanja;
  const isDefisit = surplusDefisit < 0;

  return (
    <div className="space-y-6" id="keuangan-transparansi">
      {/* 1. APBDes Fiscal Health Banner */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        
        <div className="bg-slate-900 text-white p-5 rounded-2xl relative overflow-hidden bg-grid-white">
          <p className="text-[10px] text-indigo-200 font-semibold uppercase tracking-wider">Total Pendapatan (APBDes)</p>
          <h3 className="text-xl font-bold font-mono mt-1">Rp {totalPendapatan.toLocaleString('id-ID')}</h3>
          <span className="text-[10px] text-indigo-300 block mt-2">Realisasi: Rp {realPendapatan.toLocaleString('id-ID')}</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
          <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Anggaran Belanja Desa</p>
          <h3 className="text-xl font-bold text-slate-800 font-mono mt-1">Rp {totalBelanja.toLocaleString('id-ID')}</h3>
          <span className="text-[10px] text-slate-400 block mt-2">Realisasi: Rp {realBelanja.toLocaleString('id-ID')}</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
          <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Pembiayaan Neto</p>
          <h2 className="text-xl font-bold text-slate-800 font-mono mt-1">Rp {totalPembiayaan.toLocaleString('id-ID')}</h2>
          <span className="text-[10px] text-slate-400 block mt-2">Pemberdayaan & Modal BUMDes</span>
        </div>

        <div className={`p-5 rounded-2xl border ${isDefisit ? 'bg-rose-50 border-rose-100 text-rose-850' : 'bg-emerald-50 border-emerald-100 text-emerald-850'} flex flex-col justify-between`}>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider">Sisa Lebih / (Defisit)</p>
            <h3 className="text-lg font-bold font-mono mt-1">Rp {surplusDefisit.toLocaleString('id-ID')}</h3>
          </div>
          {isDefisit ? (
            <span className="text-[10px] font-semibold text-rose-600 flex items-center gap-1 mt-1">
              <AlertTriangle className="w-3.5 h-3.5" /> Defisit Anggaran!
            </span>
          ) : (
            <span className="text-[10px] font-semibold text-emerald-600 flex items-center gap-1 mt-1">
              <Check className="w-3.5 h-3.5" /> Struktur Berimbang ✓
            </span>
          )}
        </div>
      </div>

      {/* Defisit warning alert */}
      {isDefisit && (
        <div className="p-3 bg-rose-50 border-l-4 border-rose-500 rounded text-rose-800 text-xs flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-rose-500" />
          <span><b>Awas:</b> Total penetapan rancangan APBDes Belanja melompat melebihi kapasitas pendapatan. Harap kurangi draf anggaran pembangunan fisik desa atau kaji optimalisasi Pendapatan Asli Desa (PADes).</span>
        </div>
      )}

      {/* 2. Visual Budget Balancing Chart */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-4">
        <div>
          <h3 className="text-md font-bold font-display text-slate-800 flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-indigo-500" /> Transparansi Komposisi APBDes
          </h3>
          <p className="text-xs text-slate-400">Distribusi alokasi dana desa (APBDes TA 2026)</p>
        </div>

        <div className="space-y-3 pt-2">
          {/* Income Bar */}
          <div>
            <div className="flex justify-between text-xs text-slate-500 mb-1">
              <span className="font-semibold text-slate-700">1. Rencana Pendapatan Desa</span>
              <span className="font-mono">Rp {totalPendapatan.toLocaleString('id-ID')}</span>
            </div>
            <div className="w-full bg-slate-150 h-3 rounded-full overflow-hidden">
              <div className="bg-indigo-600 h-full rounded-full" style={{ width: '100%' }}></div>
            </div>
          </div>

          {/* Spending Bar relative to income */}
          <div>
            <div className="flex justify-between text-xs text-slate-500 mb-1">
              <span className="font-semibold text-slate-700">2. Rencana Belanja Desa</span>
              <span className="font-mono">Rp {totalBelanja.toLocaleString('id-ID')}</span>
            </div>
            <div className="w-full bg-slate-150 h-3 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full ${isDefisit ? 'bg-rose-500' : 'bg-emerald-500'}`} 
                style={{ width: `${Math.min((totalBelanja / totalPendapatan) * 100, 100)}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Editable APBDes Ledger Table */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-md font-bold text-slate-800 font-display">Rincian Buku Kas Ledger Keuangan (APBDes)</h3>
            <p className="text-xs text-slate-400">Perangkat desa dapat mengedit draf nominal secara interaktif.</p>
          </div>
          <span className="text-xs text-slate-400 italic">Sistem Interaktif HEDRA</span>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-150">
          <table className="w-full text-xs text-left text-slate-600">
            <thead className="bg-slate-50 text-[10px] text-slate-400 font-bold uppercase">
              <tr>
                <th className="p-3">Rincian & Kategori</th>
                <th className="p-3">Kelompok</th>
                <th className="p-3">Anggaran (Draf)</th>
                <th className="p-3">Realisasi (Salur)</th>
                <th className="p-3 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {ledger.map(item => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-3">
                    <p className="font-bold text-slate-800">{item.kategori}</p>
                    <p className="text-[10px] text-slate-400">{item.rincian}</p>
                  </td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                      item.tipe === 'Pendapatan' ? 'bg-indigo-100 text-indigo-850' :
                      item.tipe === 'Belanja' ? 'bg-amber-100 text-amber-850' : 'bg-slate-150 text-slate-800'
                    }`}>
                      {item.tipe}
                    </span>
                  </td>
                  <td className="p-3 font-semibold font-mono text-slate-700">
                    {editingId === item.id ? (
                      <input 
                        type="number"
                        value={tempAnggaran}
                        onChange={e => setTempAnggaran(Number(e.target.value))}
                        className="w-32 px-1.5 py-1 text-xs border border-slate-300 rounded focus:ring-1 focus:ring-indigo-500 bg-white"
                      />
                    ) : (
                      `Rp ${item.anggaran.toLocaleString('id-ID')}`
                    )}
                  </td>
                  <td className="p-3 font-mono text-slate-500">{`Rp ${item.realisasi.toLocaleString('id-ID')}`}</td>
                  <td className="p-3 text-center">
                    {editingId === item.id ? (
                      <button 
                        onClick={() => saveEdit(item.id)}
                        className="bg-emerald-600 text-white rounded px-2.5 py-1 font-bold text-[10px] cursor-pointer"
                      >
                        Simpan
                      </button>
                    ) : (
                      <button 
                        onClick={() => startEdit(item)}
                        className="text-indigo-600 hover:text-indigo-850 font-semibold underline cursor-pointer"
                      >
                        Koreksi
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
