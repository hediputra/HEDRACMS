import React, { useState } from 'react';
import { INITIAL_SURAT, LIST_PENDUDUK } from '../data/mockData';
import { SuratPermohonan } from '../types';
import { FileText, ChevronRight, User, Check, Printer, FileDown, ArrowRight, Loader2, Sparkles, RefreshCw, Sparkle, Lock } from 'lucide-react';

interface SuratPelayananProps {
  isPremium?: boolean;
}

export default function SuratPelayanan({ isPremium = false }: SuratPelayananProps) {
  const [requests, setRequests] = useState<SuratPermohonan[]>(INITIAL_SURAT);
  const [selectedRequest, setSelectedRequest] = useState<SuratPermohonan | null>(INITIAL_SURAT[0]);
  
  // Form input states
  const [nik, setNik] = useState('');
  const [nama, setNama] = useState('');
  const [jenisSurat, setJenisSurat] = useState('Surat Keterangan Usaha (SKU)');
  const [keperluan, setKeperluan] = useState('');
  const [customAlamat, setCustomAlamat] = useState('');
  const [loading, setLoading] = useState(false);
  const [aiGenerating, setAiGenerating] = useState(false);
  const [showPremiumLockAlert, setShowPremiumLockAlert] = useState(false);

  // Auto-fill form when typing NIK from listed resident
  const handleNikChange = (inputNik: string) => {
    setNik(inputNik);
    const found = LIST_PENDUDUK.find(p => p.nik === inputNik);
    if (found) {
      setNama(found.nama);
      setCustomAlamat(found.alamat);
    }
  };

  const handleCreateRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nik || !nama || !keperluan) return;

    setLoading(true);
    setTimeout(() => {
      const newReq: SuratPermohonan = {
        id: `SRT-${Math.floor(1000 + Math.random() * 9000)}`,
        nik,
        namaPemohon: nama,
        jenisSurat,
        tanggalPermohonan: new Date().toISOString().split('T')[0],
        keperluan,
        status: 'Pemohon',
        qrcodeContent: `VERIFIED: HEDRA-CMS_NEWREQ_${Date.now()}_PEMOHON:${nama}`,
        keterangan: 'Berkas diajukan secara online oleh pemohon.'
      };

      setRequests([newReq, ...requests]);
      setSelectedRequest(newReq);
      setNik('');
      setNama('');
      setKeperluan('');
      setCustomAlamat('');
      setLoading(false);
    }, 800);
  };

  // Advance workflow simulation
  const advanceWorkflow = (id: string) => {
    const nextStates: Record<string, SuratPermohonan['status']> = {
      'Pemohon': 'Operator',
      'Operator': 'Verifikasi',
      'Verifikasi': 'Kepala Desa',
      'Kepala Desa': 'Selesai'
    };

    setRequests(prev => prev.map(req => {
      if (req.id === id) {
        const nextStatus = nextStates[req.status];
        if (nextStatus) {
          const finishedQR = nextStatus === 'Selesai' 
            ? `VERIFIED: HEDRA-CMS_APPROVED_${req.id}_KADES:Sudarsono_SEC:Hedi` 
            : req.qrcodeContent;
          const updated = {
            ...req,
            status: nextStatus,
            qrcodeContent: finishedQR,
            keterangan: getStatusMessage(nextStatus)
          };
          if (selectedRequest?.id === id) {
            setSelectedRequest(updated);
          }
          return updated;
        }
      }
      return req;
    }));
  };

  const resetRequest = (id: string) => {
    setRequests(prev => prev.map(req => {
      if (req.id === id) {
        const updated: SuratPermohonan = {
          ...req,
          status: 'Pemohon',
          keterangan: 'Persetujuan diset ulang ke tahap awal.'
        };
        if (selectedRequest?.id === id) {
          setSelectedRequest(updated);
        }
        return updated;
      }
      return req;
    }));
  };

  const getStatusMessage = (status: SuratPermohonan['status']) => {
    switch(status) {
      case 'Operator': return 'Sedang diproses oleh operator (Mas Hedi) untuk verifikasi draf.';
      case 'Verifikasi': return 'Draf lolos validasi administrasi, bersiap diajukan ke Kades.';
      case 'Kepala Desa': return 'Menunggu otorisasi tanda tangan elektronik Kepala Desa.';
      case 'Selesai': return 'Surat selesai ditandatangani secara elektronik (QR aktif).';
      default: return 'Berkas draf awal.';
    }
  };

  const getStepClass = (stepName: SuratPermohonan['status'], currentStatus: SuratPermohonan['status']) => {
    const statesOrder: SuratPermohonan['status'][] = ['Pemohon', 'Operator', 'Verifikasi', 'Kepala Desa', 'Selesai'];
    const currentIndex = statesOrder.indexOf(currentStatus);
    const stepIndex = statesOrder.indexOf(stepName);

    if (currentIndex >= stepIndex) {
      return 'bg-emerald-600 text-white border-emerald-600';
    }
    return 'bg-slate-100 text-slate-400 border-slate-200';
  };

  return (
    <div className="space-y-6" id="surat-pelayanan">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* 1. Form Permohonan Baru */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-2 mb-4">
            <span className="p-1.5 bg-indigo-50 text-indigo-600 rounded">
              <FileText className="w-4.5 h-4.5" />
            </span>
            <h3 className="text-md font-bold text-slate-800 font-display">Ajukan Layanan Surat</h3>
          </div>

          <form onSubmit={handleCreateRequest} className="space-y-4">
            <div>
              <label className="text-xs text-slate-400 block mb-1">Cari / Input NIK Pemohon</label>
              <div className="relative">
                <input 
                  type="text" 
                  value={nik}
                  onChange={e => handleNikChange(e.target.value)}
                  placeholder="Ketik NIK (contoh: 1706011204850001)"
                  maxLength={16}
                  className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:indigo-500 bg-slate-50 font-mono"
                />
                <button 
                  type="button" 
                  onClick={() => handleNikChange('1706011204850001')}
                  className="absolute right-2 top-2 text-[10px] bg-slate-200 hover:bg-slate-300 text-slate-600 px-1.5 py-0.5 rounded cursor-pointer"
                >
                  Gunakan Demo
                </button>
              </div>
            </div>

            <div>
              <label className="text-xs text-slate-400 block mb-1">Nama Pemohon</label>
              <input 
                type="text" 
                value={nama}
                onChange={e => setNama(e.target.value)}
                placeholder="Terisi otomatis jika NIK terdaftar"
                className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 bg-slate-50"
              />
            </div>

            <div>
              <label className="text-xs text-slate-400 block mb-1">Jenis Surat</label>
              <select 
                value={jenisSurat} 
                onChange={e => setJenisSurat(e.target.value)}
                className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg bg-slate-50 focus:outline-none focus:ring-1"
              >
                <option>Surat Keterangan Usaha (SKU)</option>
                <option>Surat Pengantar SKCK</option>
                <option>Surat Keterangan Kematian (SKK)</option>
                <option>Surat Keterangan Pindah Domisili</option>
                <option>Surat Silsilah Keluarga (Ahli Waris)</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-slate-400 block mb-1">Keperluan</label>
              <textarea 
                value={keperluan}
                onChange={e => setKeperluan(e.target.value)}
                rows={3}
                placeholder="Sebutkan keperluan pengajuan surat secara jelas..."
                className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 bg-slate-50"
              ></textarea>

              {/* Premium AI generator trigger */}
              <div className="mt-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    if (!isPremium) {
                      setShowPremiumLockAlert(true);
                      setTimeout(() => setShowPremiumLockAlert(false), 8000);
                      return;
                    }
                    if (!nama) {
                      alert('Isi NIK atau nama pemohon terlebih dahulu untuk memformulasikan draf khusus.');
                      return;
                    }
                    setAiGenerating(true);
                    setTimeout(() => {
                      let text = '';
                      if (jenisSurat.includes('Usaha')) {
                        text = `Kelengkapan berkas fisik pengajuan Surat Izin Usaha Mikro Kecil (IUMK), permohonan dana bergulir KUR Bank BRI Cabang Pembantu Mukomuko, serta penguatan legalitas hukum dari pelaku UMKM ${nama} di wilayah Dusun II Pondokpanjang.`;
                      } else if (jenisSurat.includes('Domisili')) {
                        text = `Pembuktian keabsahan tempat tinggal tinggal / berdomisili sementara operator ${nama} guna urusan pendaftaran beasiswa mahasiswa berprestasi Bengkulu, kelengkapan administrasi kepolisian, serta pelaporan ketenagakerjaan daerah.`;
                      } else {
                        text = `Digunakan sebagai berkas pendukung administrasi kependudukan resmi yang bersangkutan (${nama}) untuk melengkapi berkas syarat perkawinan/nikah, mutasi luar daerah, atau jaminan kesehatan BPJS nasional.`;
                      }
                      setKeperluan(text);
                      setAiGenerating(false);
                    }, 1000);
                  }}
                  className="text-[10px] bg-indigo-50 hover:bg-slate-100 text-indigo-700 font-bold px-2 py-1.5 rounded-lg border border-indigo-200 flex items-center gap-1 cursor-pointer transition shadow-xs"
                >
                  {aiGenerating ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>AI merumuskan narasi...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5 text-indigo-600 fill-indigo-200" />
                      <span>Formulasikan Narasi Hukum (AI)</span>
                    </>
                  )}
                </button>
              </div>

              {/* Alert Warning for locked premium features */}
              {showPremiumLockAlert && (
                <div className="mt-2 bg-gradient-to-r from-amber-50 to-amber-100 p-2.5 rounded-lg border border-amber-250 text-[10px] text-amber-900 leading-normal flex items-start gap-1.5 animate-fade-in" id="surat-premium-alert">
                  <Lock className="w-3.5 h-3.5 mt-0.5 text-amber-600 shrink-0" />
                  <div>
                    <p className="font-extrabold flex items-center gap-1 text-[11px]">Fitur Terkunci (HEDRA Premium Only)</p>
                    <p className="mt-0.5 leading-snug text-slate-600 font-medium">Integrasi kecerdasan buatan draft otomatis ini dikhususkan bagi pelanggan pro. Silakan pergi ke tab <b>"Aset & Ekstensi" -&gt; Lisensi Premium</b> untuk mengaktifkannya dalam satu klik!</p>
                  </div>
                </div>
              )}
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white text-xs font-semibold py-2.5 rounded-lg flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Merender Draf Docx...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-indigo-200" /> Proses Draf Digital
                </>
              )}
            </button>
          </form>
        </div>

        {/* 2. Daftar Pengajuan & Status */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between">
          <div>
            <h3 className="text-md font-bold text-slate-800 font-display mb-4">Daftar Surat Masuk</h3>
            <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
              {requests.map(req => (
                <div 
                  key={req.id} 
                  onClick={() => setSelectedRequest(req)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer ${selectedRequest?.id === req.id ? 'border-indigo-500 bg-indigo-50/50' : 'border-slate-100 hover:bg-slate-50'}`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-xs font-bold font-mono text-slate-400">{req.id}</p>
                      <p className="text-xs font-semibold text-slate-800 mt-0.5">{req.jenisSurat}</p>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold font-mono ${
                      req.status === 'Selesai' ? 'bg-emerald-100 text-emerald-800' :
                      req.status === 'Kepala Desa' ? 'bg-indigo-150 text-indigo-800' :
                      req.status === 'Verifikasi' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {req.status}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mt-3 text-[10px] text-slate-400 border-t border-dashed border-slate-200/60 pt-2">
                    <span>Pemohon: {req.namaPemohon}</span>
                    <span>{req.tanggalPermohonan}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <p className="text-[10px] text-slate-400 mt-4 italic text-center">Klik pada draf surat untuk memicu simulasi alur kerja approval.</p>
        </div>

        {/* 3. Detail Draf & Alur Approval */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between">
          {selectedRequest ? (
            <div className="space-y-5 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start pb-3 border-b border-slate-100">
                  <div>
                    <span className="text-[10px] font-bold font-mono bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded">HEDRA Engine</span>
                    <h4 className="text-sm font-bold text-slate-800 mt-1">{selectedRequest.jenisSurat}</h4>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-slate-700 font-mono">{selectedRequest.id}</p>
                    <span className="text-[10px] text-slate-400">{selectedRequest.tanggalPermohonan}</span>
                  </div>
                </div>

                {/* Workflow Stepper */}
                <div className="my-5">
                  <p className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider mb-3">Workflow Verifikasi Dokumen</p>
                  <div className="flex items-center justify-between">
                    {['Pemohon', 'Operator', 'Verifikasi', 'Kepala Desa', 'Selesai'].map((step, idx) => (
                      <React.Fragment key={step}>
                        {idx > 0 && <ChevronRight className="w-3.5 h-3.5 text-slate-350" />}
                        <div className="flex flex-col items-center group relative">
                          <div className={`w-6 h-6 rounded-full border flex items-center justify-center text-[10px] font-bold transition-all ${getStepClass(step as SuratPermohonan['status'], selectedRequest.status)}`}>
                            {idx + 1}
                          </div>
                          <span className="text-[9px] text-slate-400 mt-1 scale-90 md:scale-100 whitespace-nowrap">{step}</span>
                        </div>
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                {/* Document Information / Formatted View */}
                <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-2 text-xs">
                  <p className="font-semibold text-indigo-950 font-display text-center border-b border-indigo-100 pb-1 text-[11px]">Draf Templat DOCX (Preview)</p>
                  <div>
                    <span className="text-[10px] text-slate-400 font-semibold block">NAMA LENGKAP:</span>
                    <p className="font-bold text-slate-800 font-mono italic">{`{{nama}}`} → {selectedRequest.namaPemohon}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-semibold block">NIK:</span>
                    <p className="font-bold text-slate-800 font-mono italic">{`{{nik}}`} → {selectedRequest.nik}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-semibold block">KEPERLUAN:</span>
                    <p className="text-slate-700">{selectedRequest.keperluan}</p>
                  </div>
                  <div className="pt-2 border-t border-dashed border-slate-200 flex justify-between items-center text-[10px] text-indigo-900 bg-indigo-50/40 p-2 rounded">
                    <div>
                      <p className="font-bold">Penandatangan: H. Sudarsono</p>
                      <p className="text-slate-400">Kepala Desa Pondokpanjang</p>
                    </div>
                    {/* Simulated Verification QR Code */}
                    <div className="w-12 h-12 bg-white p-1 rounded-sm border border-slate-200 flex items-center justify-center">
                      <div className="grid grid-cols-4 gap-0.5 w-10 h-10">
                        {Array.from({ length: 16 }).map((_, i) => (
                          <div 
                            key={i} 
                            className={`w-2 h-2 ${
                              selectedRequest.status === 'Selesai' 
                                ? (i % 2 === 0 || i % 5 === 0 ? 'bg-slate-900' : 'bg-transparent') 
                                : 'bg-slate-200'
                            }`}
                          ></div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Simulation Controls */}
              <div className="space-y-2 pt-4 border-t border-slate-100">
                <div className="bg-amber-50 p-2.5 rounded-lg border border-amber-100 text-[11px] text-amber-800">
                  <p className="font-bold">Status Berkas:</p>
                  <p className="text-xs">{selectedRequest.keterangan || 'Berkas draf awal.'}</p>
                </div>
                
                <div className="flex gap-2">
                  {selectedRequest.status !== 'Selesai' ? (
                    <button 
                      onClick={() => advanceWorkflow(selectedRequest.id)}
                      className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1 cursor-pointer transition-colors"
                    >
                      <span>Lanjutkan Alur</span> <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <button 
                      onClick={() => {
                        window.print();
                      }}
                      className="flex-1 bg-indigo-900 hover:bg-indigo-950 text-white py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                    >
                      <Printer className="w-3.5 h-3.5" /> <span>Cetak Arsip PDF</span>
                    </button>
                  )}
                  
                  <button 
                    onClick={() => resetRequest(selectedRequest.id)}
                    className="p-2 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-600 rounded-lg cursor-pointer transition-colors"
                    title="Set Ulang Alur"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-48 text-slate-400">
              <FileText className="w-12 h-12 stroke-1 mb-2" />
              <p className="text-xs">Pilih salah satu surat untuk melihat alur workflow.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
