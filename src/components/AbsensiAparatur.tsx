import { useState, useEffect } from 'react';
import { LIST_APARATUR } from '../data/mockData';
import { Camera, MapPin, CheckSquare, Shield, Loader, UserCheck } from 'lucide-react';

export default function AbsensiAparatur() {
  const [selectedStaff, setSelectedStaff] = useState(LIST_APARATUR[1].nama); // Default: Mas Hedi
  const [scanning, setScanning] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [matchPercent, setMatchPercent] = useState(0);
  const [logs, setLogs] = useState([
    { nama: 'Mas Hedi', waktu: '08:00:15', status: 'Hadir (GPS Presisi)', km: '0.0 km dari Kantor Desa' },
    { nama: 'Siti Rahma, A.Md.Ak', waktu: '07:44:20', status: 'Hadir (GPS Presisi)', km: '0.1 km' }
  ]);

  const handleSimulateAbsensi = () => {
    if (scanning) return;
    setScanning(true);
    setScanned(false);
    
    // Increment match percentage slowly for high-tech effect
    let count = 0;
    const interval = setInterval(() => {
      count += 8;
      if (count >= 96) {
        setMatchPercent(98.4);
        clearInterval(interval);
        setScanning(false);
        setScanned(true);

        // Add to log
        const timestamp = new Date().toLocaleTimeString('id-ID');
        setLogs(prev => [
          { nama: selectedStaff, waktu: timestamp, status: 'Hadir (GPS Presisi)', km: 'Dilegitimasi (Liveness match: 98.4%)' },
          ...prev
        ]);
      } else {
        setMatchPercent(count);
      }
    }, 150);
  };

  return (
    <div className="space-y-6" id="absensi-aparatur-component">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Camera Face Scanner Mock */}
        <div className="lg:col-span-2 bg-slate-950 text-white p-6 rounded-3xl relative overflow-hidden flex flex-col justify-between min-h-[420px] bg-grid-white">
          
          <div className="z-10 flex justify-between items-start">
            <div>
              <span className="text-[10px] bg-indigo-500/20 text-indigo-300 font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">Modul Biometrik Kehadiran</span>
              <h3 className="text-md font-bold font-display text-white mt-1">Sistem Absensi Aparatur Desa</h3>
            </div>
            
            <div className="flex bg-slate-900 border border-slate-800 p-2 rounded-xl text-[10px] items-center gap-1.5 font-mono text-slate-350">
              <Shield className="w-3.5 h-3.5 text-indigo-400" /> Secure Encryption
            </div>
          </div>

          {/* Interactive Screen Camera Viewport */}
          <div className="relative w-full max-w-sm mx-auto h-56 bg-slate-900 rounded-2xl border-2 border-slate-800 flex flex-col items-center justify-center overflow-hidden my-4">
            
            {/* Hologram details */}
            <div className="absolute top-2 left-3 text-[9px] font-mono text-indigo-400">
              GPS LAT/LONG: 17.4361° S, 101.4589° E
            </div>
            <div className="absolute top-5 left-3 text-[9px] font-mono text-sky-400">
              CELLID: Subis_Sector_2A
            </div>

            {scanning ? (
              <>
                {/* Horizontal scanning light bar */}
                <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-indigo-400 to-transparent shadow-[0_0_15px_#6366f1] animate-scan z-20"></div>
                
                {/* Simulated Face mesh outlines */}
                <div className="absolute inset-0 flex items-center justify-center opacity-40 animate-pulse-ring pointer-events-none">
                  <div className="w-28 h-36 border-2 border-dashed border-sky-400 rounded-full"></div>
                </div>

                <div className="text-center z-10 space-y-1">
                  <Loader className="w-6 h-6 animate-spin mx-auto text-indigo-500" />
                  <p className="text-xs font-bold font-mono tracking-wide">MEMINDAI GEOMETRI WAJAH...</p>
                  <p className="text-[10px] text-slate-400 font-mono">Kecocokan: {matchPercent}%</p>
                </div>
              </>
            ) : scanned ? (
              <div className="text-center z-10 space-y-2">
                <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-400/50">
                  <UserCheck className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold font-mono text-emerald-400 uppercase tracking-wide">VERIFIKASI ABSENSI SUSKES</p>
                  <p className="text-[10px] text-slate-300">Biometrik: <b>{matchPercent}% Match</b></p>
                  <p className="text-[9px] text-indigo-300 font-mono">Aparatur: {selectedStaff}</p>
                </div>
              </div>
            ) : (
              <div className="text-center z-10 space-y-2">
                <Camera className="w-10 h-10 stroke-1 mx-auto text-slate-500" />
                <p className="text-xs font-mono text-slate-400">Pilih nama staf di kanan, lalu klik absen.</p>
                <div className="text-[10px] bg-slate-800 text-slate-300 inline-block px-2.2 py-0.5 rounded border border-slate-700">
                  Liveness detection aktif
                </div>
              </div>
            )}
          </div>

          <div className="z-10 flex flex-wrap justify-between items-center text-[11px] text-slate-400 border-t border-slate-800 bg-slate-900/40 p-2.5 rounded-xl">
            <span className="flex items-center gap-1"><MapPin className="span-inline w-3.5 h-3.5 text-rose-500" /> Radius Presisi: <b>7 meter dari Balai Desa</b></span>
            <span className="text-emerald-400 font-bold">✓ Koordinat Latch Valid</span>
          </div>
        </div>

        {/* Staff Selection & Absensi logs */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between">
          <div>
            <h3 className="text-md font-bold text-slate-800 font-display mb-4">Aparatur & Log Kehadiran</h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-xs text-slate-400 block mb-1">Pilih Jabatan untuk Absen</label>
                <select 
                  value={selectedStaff}
                  onChange={e => {
                    setSelectedStaff(e.target.value);
                    setScanned(false);
                  }}
                  className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg bg-slate-50 focus:outline-none"
                >
                  {LIST_APARATUR.map(staff => (
                    <option key={staff.jabatan} value={staff.nama}>
                      {staff.jabatan} ({staff.nama})
                    </option>
                  ))}
                </select>
                
                <button 
                  onClick={handleSimulateAbsensi}
                  disabled={scanning}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-500/80 text-white font-bold py-2 rounded-lg text-xs mt-3 flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                >
                  <Camera className="w-4 h-4 text-indigo-300" /> <span>Mulai Scan Biometrik</span>
                </button>
              </div>

              {/* Logs history */}
              <div className="border-t border-slate-100 pt-4">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Riwayat Presensi Hari Ini</p>
                
                <div className="space-y-2 h-[150px] overflow-y-auto pr-1">
                  {logs.map((log, i) => (
                    <div key={i} className="p-2 bg-slate-50 border border-slate-100 rounded-lg text-xs flex justify-between items-center">
                      <div>
                        <p className="font-bold text-slate-700">{log.nama}</p>
                        <p className="text-[9px] text-slate-400">{log.status} · {log.km}</p>
                      </div>
                      <span className="font-mono text-[10px] text-indigo-600 font-semibold">{log.waktu}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
