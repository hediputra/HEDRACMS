import React, { useState } from 'react';
import { INITIAL_PENGADUAN } from '../data/mockData';
import { PengaduanTiket } from '../types';
import { PenTool, HelpCircle, Send, ShieldAlert, CheckSquare, MessageSquare, AlertCircle, Trash2 } from 'lucide-react';

export default function PosbankumPengaduan() {
  const [complaints, setComplaints] = useState<PengaduanTiket[]>(INITIAL_PENGADUAN);
  const [selectedTicket, setSelectedTicket] = useState<PengaduanTiket | null>(INITIAL_PENGADUAN[0]);

  // Form states
  const [pengadu, setPengadu] = useState('');
  const [kategori, setKategori] = useState<'Layanan' | 'Infrastruktur' | 'Keamanan' | 'Lainnya'>('Infrastruktur');
  const [isi, setIsi] = useState('');
  const [loading, setLoading] = useState(false);

  // Legal Consultations state simulation
  const [laws, setLaws] = useState([
    { id: 'LAW-01', klien: 'Bams Sugiharto', kasus: 'Mediasi sengketa batas lahan karet pekarangan belakang.', advokat: 'Hendry Siahaan, S.H.', status: 'Dimediasi' },
    { id: 'LAW-02', klien: 'Kusniawati (BUMDes)', kasus: 'Penyusunan Anggaran Dasar / Anggaran Rumah Tangga BUMDes.', advokat: 'Hendry Siahaan, S.H.', status: 'Selesai' }
  ]);
  const [newLawClient, setNewLawClient] = useState('');
  const [newLawCase, setNewLawCase] = useState('');

  const submitComplaint = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pengadu || !isi) return;

    setLoading(true);
    setTimeout(() => {
      const newTiket: PengaduanTiket = {
        id: `TKT-${Math.floor(100 + Math.random() * 899)}`,
        namaPengadu: pengadu,
        kategori,
        tanggal: new Date().toISOString().split('T')[0],
        isi,
        status: 'Diterima',
        tanggapan: 'Pengaduan telah masuk sistem HEDRA Core. Kasi Pelayanan segera memvalidasi berkas dan meneruskan ke kepala dusun terkait.'
      };

      setComplaints([newTiket, ...complaints]);
      setSelectedTicket(newTiket);
      setPengadu('');
      setIsi('');
      setLoading(false);
    }, 600);
  };

  const registerLawConsultation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLawClient || !newLawCase) return;

    const newCase = {
      id: `LAW-0${laws.length + 1}`,
      klien: newLawClient,
      kasus: newLawCase,
      advokat: 'Hendry Siahaan, S.H.',
      status: 'Konsultasi'
    };

    setLaws([newCase, ...laws]);
    setNewLawClient('');
    setNewLawCase('');
  };

  const changeTicketStatus = (id: string, newStatus: PengaduanTiket['status']) => {
    setComplaints(prev => prev.map(t => {
      if (t.id === id) {
        const updated = { 
          ...t, 
          status: newStatus,
          tanggapan: newStatus === 'Selesai' 
            ? 'Penanganan pengaduan selesai divalidasi oleh regu terkait, terima kasih atas kepedulian Anda.' 
            : t.tanggapan 
        };
        if (selectedTicket?.id === id) {
          setSelectedTicket(updated);
        }
        return updated;
      }
      return t;
    }));
  };

  return (
    <div className="space-y-6" id="legal-complaints">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* 1. Aduan Masyarakat Form & Posbankum Reg */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-1.5 border-b border-slate-150 pb-3">
              <span className="p-1.5 bg-rose-50 text-rose-600 rounded">
                <AlertCircle className="w-4.5 h-4.5" />
              </span>
              <h3 className="text-sm font-bold text-slate-800 font-display">Lapor Pengaduan Warga</h3>
            </div>

            <form onSubmit={submitComplaint} className="space-y-3.5">
              <div>
                <label className="text-[11px] text-slate-400 block mb-0.5">Nama Pengadu / Warga</label>
                <input 
                  type="text" 
                  value={pengadu}
                  onChange={e => setPengadu(e.target.value)}
                  placeholder="Nama Pelapor..."
                  className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 bg-slate-50"
                  required
                />
              </div>

              <div>
                <label className="text-[11px] text-slate-400 block mb-0.5">Kategori Aduan</label>
                <select 
                  value={kategori}
                  onChange={e => setKategori(e.target.value as any)}
                  className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg bg-slate-50 focus:outline-none focus:ring-1"
                >
                  <option>Infrastruktur</option>
                  <option>Layanan</option>
                  <option>Keamanan</option>
                  <option>Lainnya</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] text-slate-400 block mb-0.5">Isi Laporan Pengaduan</label>
                <textarea 
                  value={isi}
                  onChange={e => setIsi(e.target.value)}
                  rows={4}
                  placeholder="Ceritakan kendala, kerusakan jalan, atau masalah secara jelas..."
                  className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 bg-slate-50"
                  required
                ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-2 rounded-lg text-xs flex items-center justify-center gap-1.5 cursor-pointer disabled:bg-rose-400 transition-colors"
              >
                <Send className="w-3.5 h-3.5" /> <span>Kirim Aduan Resmi</span>
              </button>
            </form>
          </div>

          <p className="text-[10px] text-slate-400 mt-4 italic text-center">Setiap aduan melahirkan tiket tracking dengan notifikasi otomatis.</p>
        </div>

        {/* 2. Daftar Tiket & Tanggapan */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5 border-b border-slate-150 pb-3 mb-4">
              <span className="p-1.5 bg-indigo-50 text-indigo-600 rounded">
                <CheckSquare className="w-4.5 h-4.5" />
              </span>
              <h3 className="text-sm font-bold text-slate-800 font-display">Tiket Tracking Pengaduan</h3>
            </div>

            <div className="space-y-3 h-[250px] overflow-y-auto pr-1">
              {complaints.map(t => (
                <div 
                  key={t.id} 
                  onClick={() => setSelectedTicket(t)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer ${selectedTicket?.id === t.id ? 'border-indigo-500 bg-indigo-50/50' : 'border-slate-100 hover:bg-slate-50'}`}
                >
                  <div className="flex justify-between items-center text-xs">
                    <p className="font-bold text-slate-800 font-mono">{t.id}</p>
                    <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                      t.status === 'Selesai' ? 'bg-emerald-100 text-emerald-800' :
                      t.status === 'Diproses' ? 'bg-amber-100 text-amber-800' :
                      t.status === 'Ditolak' ? 'bg-rose-100 text-rose-800' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {t.status}
                    </span>
                  </div>
                  <p className="text-[11.5px] text-slate-500 truncate mt-1">{t.isi}</p>
                  <div className="flex justify-between items-center text-[10px] text-slate-400 mt-2.5">
                    <span>Oleh: {t.namaPengadu}</span>
                    <span>{t.tanggal}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {selectedTicket && (
            <div className="border-t border-slate-150 pt-4 mt-4 space-y-3.5">
              <div className="text-xs p-3 bg-slate-50 rounded-xl border border-slate-100 relative">
                <p className="font-bold text-slate-800 flex items-center gap-1 text-[11px]"><MessageSquare className="w-3.5 h-3.5 text-indigo-500" /> Tanggapan Aparatur Desa:</p>
                <p className="text-[11px] text-slate-500 mt-1 italic">{selectedTicket.tanggapan || 'Harap bersabar, operator sedang menyusun verifikasi lapangan.'}</p>
              </div>

              {/* Status Simulation Controls */}
              <div className="flex gap-2">
                <button 
                  onClick={() => changeTicketStatus(selectedTicket.id, 'Diproses')}
                  className="flex-1 py-1 px-1.5 border border-amber-250 bg-amber-50 hover:bg-amber-100 text-amber-800 rounded-lg text-[10px] font-semibold cursor-pointer"
                >
                  Proses Lapangan
                </button>
                <button 
                  onClick={() => changeTicketStatus(selectedTicket.id, 'Selesai')}
                  className="flex-1 py-1 px-1.5 border border-emerald-250 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-lg text-[10px] font-semibold cursor-pointer"
                >
                  Selesaikan Tiket
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 3. Posbankum (Pos Bantuan Hukum) Desa */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-1.5 border-b border-slate-150 pb-3 mb-4">
            <span className="p-1.5 bg-indigo-50 text-indigo-600 rounded">
              <PenTool className="w-4.5 h-4.5" />
            </span>
            <h3 className="text-sm font-bold text-slate-800 font-display">Posbankum (Konsultasi Hukum)</h3>
          </div>

          <p className="text-xs text-slate-400 mb-4 leading-relaxed">Pengaduan keadilan hukum warga yang dibina oleh BPD, LPM, dan Penasihat Hukum Desa (Hendry Siahaan, S.H.).</p>

          <form onSubmit={registerLawConsultation} className="space-y-2 mb-4 p-3 bg-slate-50 border border-slate-100 rounded-xl">
            <p className="text-[10px] font-bold text-indigo-950 uppercase">Daftar Konsultasi Baru</p>
            <input 
              type="text"
              value={newLawClient}
              onChange={e => setNewLawClient(e.target.value)}
              placeholder="Nama Klien..."
              className="w-full text-xs p-1.5 border border-slate-200 rounded focus:outline-none bg-white font-semibold"
            />
            <input 
              type="text"
              value={newLawCase}
              onChange={e => setNewLawCase(e.target.value)}
              placeholder="Kasus (contoh: Sengketa Batas sawah RT 02)..."
              className="w-full text-xs p-1.5 border border-slate-200 rounded focus:outline-none bg-white"
            />
            <button 
              type="submit"
              className="w-full bg-indigo-600 text-white font-bold py-1.5 rounded text-[10px] cursor-pointer"
            >
              Registrasi Kasus Posbankum
            </button>
          </form>

          {/* Cases log list */}
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {laws.map(l => (
              <div key={l.id} className="p-2.5 rounded-lg border border-slate-50 bg-slate-50 text-xs">
                <div className="flex justify-between items-center text-[10.5px]">
                  <p className="font-bold text-slate-700">{l.klien}</p>
                  <span className={`px-1.5 py-0.2 rounded text-[8.5px] font-bold ${l.status==='Selesai' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>{l.status}</span>
                </div>
                <p className="text-[10px] text-slate-500 mt-1">{l.kasus}</p>
                <span className="text-[9px] text-slate-400 block mt-1.5">Advokat Desa: {l.advokat}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
