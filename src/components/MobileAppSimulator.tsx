import React, { useState } from 'react';
import { Smartphone, Zap, CheckCircle, Bell, ArrowRight, UserCheck, Shield, HelpCircle, FileText, Send } from 'lucide-react';
import { LIST_PENDUDUK, LIST_APARATUR } from '../data/mockData';

export default function MobileAppSimulator() {
  const [role, setRole] = useState<'Warga' | 'Aparatur'>('Warga');
  
  // Mobile citizen state mocks
  const [wargaPbbState, setWargaPbbState] = useState('Belum Lunas');
  const [quickAduan, setQuickAduan] = useState('');
  const [aduanLogged, setAduanLogged] = useState(false);

  // Mobile staff state mocks
  const [staffCheckIn, setStaffCheckIn] = useState(false);
  const [mobileSuratStatus, setMobileSuratStatus] = useState<'Operator' | 'Verifikasi' | 'Selesai'>('Operator');

  const triggerMobileCheckin = () => {
    setStaffCheckIn(true);
  };

  const handleQuickAduanSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickAduan) return;
    setAduanLogged(true);
    setQuickAduan('');
  };

  return (
    <div className="space-y-6" id="hedra-mobile-simulator">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
        
        {/* Left Side: Product Details & Toggle */}
        <div className="space-y-4">
          <span className="text-[10px] bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full font-bold uppercase tracking-wider">HEDRA Companion Apps</span>
          <h2 className="text-xl font-bold font-display text-slate-800">Uji Aplikasi Mobile HEDRA</h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            HEDRA dirancang responsif dan multifungsi untuk mendukung ekosistem seluler warga Indonesia yang inklusif. Staf desa dapat mengontrol persetujuan, melakukan absensi berbasis GPS, dan warga dapat melacak surat pengantar secara mobile tanpa ribet.
          </p>

          <div className="flex gap-2">
            <button 
              onClick={() => { setRole('Warga'); }}
              className={`flex-1 py-3 text-xs font-bold rounded-2xl cursor-pointer border transition-all ${role === 'Warga' ? 'bg-indigo-600 text-white border-indigo-600 shadow-md' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}
            >
              Mode: Aplikasi Warga
            </button>
            <button 
              onClick={() => { setRole('Aparatur'); }}
              className={`flex-1 py-3 text-xs font-bold rounded-2xl cursor-pointer border transition-all ${role === 'Aparatur' ? 'bg-indigo-600 text-white border-indigo-600 shadow-md' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}
            >
              Mode: Aplikasi Aparatur
            </button>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-150 rounded-2xl space-y-2">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wide">Fitur Sesuai Edisi</h4>
            <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-500">
              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span> Pelayanan Surat Online</span>
              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span> Absensi GPS Selfie</span>
              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span> Keuangan Transparansi</span>
              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></span> AI Assistant Terpadu</span>
            </div>
          </div>
        </div>

        {/* Right Side: The Smartphone shell mockup */}
        <div className="flex justify-center">
          <div className="w-[280px] h-[550px] bg-slate-900 rounded-[40px] p-3 border-[6px] border-slate-800 shadow-2xl relative overflow-hidden flex flex-col justify-between select-none">
            
            {/* iPhone/Smartphone ear speaker notches */}
            <div className="absolute top-1 left-1/2 -translate-x-1/2 bg-slate-800 w-24 h-4 rounded-b-xl z-30 flex items-center justify-center">
              <div className="w-10 h-1 bg-slate-700/80 rounded"></div>
            </div>

            {/* Mobile Header Banner */}
            <div className="bg-indigo-600 text-white pt-5 pb-3 px-3.5 rounded-t-3xl text-center space-y-1 relative">
              <div className="flex justify-between items-center text-[10px] opacity-75">
                <span>08:00</span>
                <span className="flex items-center gap-1">HEDRA LTE <Shield className="w-2.5 h-2.5 fill-white text-indigo-600" /></span>
              </div>
              <h4 className="text-xs font-bold tracking-wide font-display mt-1">HEDRA Mobile</h4>
              <p className="text-[9px] text-indigo-200">Desa Pondokpanjang Modern</p>
            </div>

            {/* The Smartphone dynamic Screen body content */}
            <div className="flex-1 bg-slate-50 overflow-y-auto px-3.5 py-4 space-y-3">
              
              {role === 'Warga' ? (
                // Warga View Screen
                <div className="space-y-3">
                  <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] text-slate-400">Selamat pagi warga,</p>
                      <h5 className="text-xs font-bold text-slate-800">Budi Santoso</h5>
                    </div>
                    <span className="text-[9px] font-mono font-semibold bg-emerald-50 text-emerald-600 border border-emerald-100 px-1.5 py-0.5 rounded">
                      RT 01 / RW 01
                    </span>
                  </div>

                  {/* PBB Status */}
                  <div className="p-3 bg-white rounded-xl shadow-sm border border-slate-100 flex justify-between items-center text-xs">
                    <div>
                      <p className="text-[10px] text-slate-400">Pajak PBB Saya</p>
                      <p className="font-bold text-slate-700">Rp 145.000</p>
                    </div>

                    {wargaPbbState === 'Belum Lunas' ? (
                      <button 
                        onClick={() => setWargaPbbState('Lunas')}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-2 py-1 rounded text-[9px] cursor-pointer"
                      >
                        Bayar
                      </button>
                    ) : (
                      <span className="text-emerald-600 font-bold text-[10px] flex items-center gap-0.5">✓ Lunas</span>
                    )}
                  </div>

                  {/* Document tracking status */}
                  <div className="p-3 bg-white rounded-xl shadow-sm border border-slate-100 text-xs text-slate-600 space-y-1.5">
                    <p className="text-[10px] text-slate-400 font-semibold uppercase">Lacak Berkas SKU</p>
                    <div className="flex items-center justify-between text-[10px] font-mono font-semibold bg-slate-50 p-1.5 rounded border border-slate-150">
                      <span>Ref: #SRT-9426</span>
                      <span className="text-emerald-700">SIAP AMBIL</span>
                    </div>
                  </div>

                  {/* Complaint box */}
                  <form onSubmit={handleQuickAduanSubmit} className="p-3 bg-white rounded-xl shadow-sm border border-slate-100 space-y-2">
                    <p className="text-[10px] text-slate-400 font-semibold uppercase">Layanan Pengaduan Sakit/Sosial</p>
                    {aduanLogged ? (
                      <p className="text-[10px] text-emerald-800 bg-emerald-50 p-1.5 rounded text-center">✓ Laporan darurat diinput.</p>
                    ) : (
                      <>
                        <input 
                          type="text" 
                          value={quickAduan}
                          onChange={e => setQuickAduan(e.target.value)}
                          placeholder="Ketik pengaduan darurat..."
                          className="w-full text-[10px] p-1.5 border border-slate-150 rounded"
                        />
                        <button type="submit" className="w-full bg-rose-600 text-white font-bold py-1 rounded text-[10px]">Kirim Darurat</button>
                      </>
                    )}
                  </form>
                </div>
              ) : (
                // Aparatur View Screen
                <div className="space-y-3">
                  <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] text-slate-400">Selamat bekerja,</p>
                      <h5 className="text-xs font-bold text-slate-800">Mas Hedi (Sekdes)</h5>
                    </div>
                    <span className="text-[9px] font-mono font-semibold bg-indigo-50 text-indigo-600 border border-indigo-100 px-1.5 py-0.5 rounded">
                      OPERATOR
                    </span>
                  </div>

                  {/* Digital attendance check-in on the phone */}
                  <div className="p-3 bg-slate-900 text-white rounded-xl shadow-sm flex flex-col items-center justify-between text-center relative overflow-hidden bg-grid-white">
                    <p className="text-[9px] text-indigo-300">Presensi Kehadiran GPS</p>
                    
                    {staffCheckIn ? (
                      <span className="text-emerald-400 font-bold text-xs mt-1.5 animate-bounce block">✓ Hadir (08:00:15)</span>
                    ) : (
                      <button 
                        onClick={triggerMobileCheckin}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-2 py-1.5 rounded-lg text-[9px] mt-2 cursor-pointer transition-colors"
                      >
                        Absen Masuk (GPS)
                      </button>
                    )}
                  </div>

                  {/* Mobile queue processing */}
                  <div className="p-3 bg-white rounded-xl shadow-sm border border-slate-100 text-xs text-slate-600 space-y-2">
                    <p className="text-[10px] text-slate-400 font-semibold uppercase">Persetujuan Berkas (Surat)</p>
                    
                    <div className="p-2 bg-slate-50 rounded-lg text-[10.5px]">
                      <div className="flex justify-between items-center">
                        <span className="font-bold">Ahmad Fauzi</span>
                        <span className="text-[8.5px] bg-amber-100 font-bold px-1 rounded uppercase">{mobileSuratStatus}</span>
                      </div>
                      <p className="text-[9.5px] text-slate-400 mt-0.5">Surat Keterangan Usaha</p>
                      
                      {mobileSuratStatus === 'Operator' ? (
                        <button 
                          onClick={() => setMobileSuratStatus('Verifikasi')}
                          className="w-full bg-emerald-600 text-white font-bold py-1 rounded text-[9.5px] mt-2 cursor-pointer"
                        >
                          Loloskan Verifikasi
                        </button>
                      ) : mobileSuratStatus === 'Verifikasi' ? (
                        <button 
                          onClick={() => setMobileSuratStatus('Selesai')}
                          className="w-full bg-indigo-900 text-white font-bold py-1 rounded text-[9.5px] mt-2 cursor-pointer"
                        >
                          Bubuhkan TTD Kades (QR)
                        </button>
                      ) : (
                        <p className="text-center font-bold text-emerald-700 text-[9.5px] mt-2 bg-emerald-50 p-1 rounded">✓ Surat Telah Terkirim ke Warga</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* Simulated home button navigation bar on phone */}
            <div className="bg-slate-900 py-2.5 rounded-b-3xl text-center border-t border-slate-800 flex justify-center items-center">
              <div className="w-20 h-1 bg-slate-700 rounded-full"></div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
