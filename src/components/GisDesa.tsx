import { useState } from 'react';
import { INITIAL_ASSET_DESA } from '../data/mockData';
import { AssetDesa } from '../types';
import { Map, Pin, CheckCircle, Info, Landmark, HelpCircle, Activity, Heart, ShieldAlert } from 'lucide-react';

export default function GisDesa() {
  const [assets, setAssets] = useState<AssetDesa[]>(INITIAL_ASSET_DESA);
  const [selectedAsset, setSelectedAsset] = useState<AssetDesa | null>(INITIAL_ASSET_DESA[0]);
  const [activePlot, setActivePlot] = useState<string | null>(null);

  // Simulated GPS positioning
  const [gpsReady, setGpsReady] = useState(true);

  // Village sector specifications
  const sectors = [
    { name: 'Sektor Sawit Utara', description: 'Kebun Kelapa Sawit Kemitraan Mandiri Poktan I', color: 'fill-emerald-100 stroke-emerald-400' },
    { name: 'Sektor Pemukiman Dusun I', description: 'Pusat administrasi desa, rumah-rumah warga RT 01-03', color: 'fill-orange-50 stroke-orange-200' },
    { name: 'Sektor Bendung Irigasi', description: 'Lokasi BUMDes Wisata Air dan pengairan sawah warga', color: 'fill-sky-100 stroke-sky-300' },
    { name: 'Sektor Sawah & Pangan Dusun II', description: 'Sawah padi, sayuran hidroponik, & kandang kelompok ternas', color: 'fill-lime-50 stroke-lime-300' }
  ];

  return (
    <div className="space-y-6" id="gis-village-map">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Vector SVG map canvas */}
        <div className="lg:col-span-3 bg-slate-900 rounded-3xl p-6 text-white relative overflow-hidden flex flex-col justify-between min-h-[450px]">
          
          {/* Header over map */}
          <div className="z-10 flex justify-between items-start">
            <div>
              <h3 className="text-md font-bold font-display text-white flex items-center gap-1.5">
                <Map className="w-5 h-5 text-indigo-400" /> Peta Interaktif GIS Desa Pondokpanjang
              </h3>
              <p className="text-[11px] text-slate-350">Klik pin penanda atau plot wilayah untuk scan QR & tracking aset desa.</p>
            </div>
            
            {/* Legend / Status indicators */}
            <div className="flex bg-slate-800/80 p-2 rounded-xl text-[10px] items-center gap-3 border border-slate-700/50 backdrop-blur-sm">
              <span className="flex items-center gap-1"><span className="w-2 h-2 bg-indigo-500 rounded-full"></span> Gedung</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 bg-emerald-500 rounded-full"></span> Wisata</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 bg-sky-400 rounded-full"></span> Sungai</span>
            </div>
          </div>

          {/* Interactive SVG Rendering of the Village */}
          <div className="my-6 relative w-full flex-1 flex items-center justify-center min-h-[250px]">
            <svg 
              viewBox="0 0 100 80" 
              className="w-full max-w-2xl h-auto drop-shadow-xl select-none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Background Village grid space */}
              <rect width="100" height="80" rx="6" fill="#1e293b" />
              
              {/* Sectors / Land Plots */}
              {/* Plot A: Northern Palm Plantation */}
              <path 
                d="M 5,5 L 95,5 L 95,25 L 60,25 Z" 
                className={`transition-all duration-300 cursor-pointer ${activePlot === 'A' ? 'fill-emerald-250 stroke-emerald-400 opacity-90' : 'fill-emerald-950/40 stroke-emerald-800'}`}
                onClick={() => setActivePlot('A')}
              />
              {/* Plot B: Village Settlement Dusun I */}
              <path 
                d="M 5,25 L 60,25 L 45,55 L 5,55 Z" 
                className={`transition-all duration-300 cursor-pointer ${activePlot === 'B' ? 'fill-amber-950/60 stroke-amber-500 opacity-90' : 'fill-slate-800/60 stroke-slate-700'}`}
                onClick={() => setActivePlot('B')}
              />
              {/* Plot C: Irrigated Sawah Dusun II */}
              <path 
                d="M 45,55 L 95,25 L 95,75 L 45,75 Z" 
                className={`transition-all duration-300 cursor-pointer ${activePlot === 'C' ? 'fill-lime-950/40 stroke-lime-600 opacity-90' : 'fill-slate-800/80 stroke-slate-700'}`}
                onClick={() => setActivePlot('C')}
              />

              {/* Natural River running memanjang */}
              <path 
                d="M 10,80 Q 30,55 50,45 T 90,0" 
                fill="none" 
                stroke="#38bdf8" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                opacity="0.8"
              />

              {/* Main Street road line */}
              <path 
                d="M 5,45 H 95 M 50,5 V 75" 
                fill="none" 
                stroke="#64748b" 
                strokeWidth="1.2" 
                strokeDasharray="2,2" 
                opacity="0.6"
              />

              {/* Landmark Sector label text */}
              <text x="35" y="12" fill="#10b981" fontSize="3" fontWeight="bold" className="pointer-events-none opacity-60 font-mono">SEKTOR KELAPA SAWIT UTARA</text>
              <text x="12" y="38" fill="#f59e0b" fontSize="3" fontWeight="bold" className="pointer-events-none opacity-60 font-mono">PEMUKIMAN DUSUN I</text>
              <text x="62" y="65" fill="#84cc16" fontSize="3" fontWeight="bold" className="pointer-events-none opacity-60 font-mono">SEKTOR SAWAH DUSUN II</text>
              <text x="65" y="38" fill="#38bdf8" fontSize="2.5" fontWeight="semibold" className="pointer-events-none opacity-40 font-mono rotate-12">ALIRAN SUNGAI PONDOK</text>

              {/* Asset Coordinate Markers dynamically generated */}
              {assets.map(asset => (
                <g 
                  key={asset.id} 
                  transform={`translate(${asset.koordinat.x}, ${asset.koordinat.y})`}
                  className="cursor-pointer group"
                  onClick={() => setSelectedAsset(asset)}
                >
                  <circle 
                    r="3.5" 
                    className={`animate-ping absolute opacity-25 ${
                      asset.kategori === 'Gedung' ? 'fill-indigo-400' :
                      asset.kategori === 'Kendaraan' ? 'fill-amber-400' : 'fill-emerald-400'
                    }`} 
                  />
                  <circle 
                    r="2.2" 
                    className={`transition-colors ${
                      selectedAsset?.id === asset.id 
                        ? 'fill-rose-500' 
                        : asset.kategori === 'Gedung' ? 'fill-indigo-500' : 'fill-emerald-500'
                    } stroke-white stroke-[0.4]`}
                  />
                  {/* Subtle hover tooltip directly in SVG */}
                  <rect x="-4" y="-7" width="12" height="4" rx="1" fill="#1e293b" className="opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  <text x="2" y="-4" fill="#ffffff" fontSize="2.2" className="opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none font-sans text-center">{asset.id}</text>
                </g>
              ))}
            </svg>
          </div>

          <div className="z-10 flex flex-wrap justify-between items-center text-xs text-slate-400 pt-4 border-t border-slate-800/80 bg-slate-900/60 p-2 rounded-xl">
            {activePlot ? (
              <span className="text-indigo-300">✓ Wilayah Terpilih: <b>{activePlot === 'A' ? sectors[0].name : activePlot === 'B' ? sectors[1].name : sectors[3].name}</b> - {activePlot === 'A' ? sectors[0].description : activePlot === 'B' ? sectors[1].description : sectors[3].description}</span>
            ) : (
              <span>Pilih Sektor Lahan untuk analisis zonasi Smart-Village.</span>
            )}
            <button 
              onClick={() => setActivePlot(null)}
              className="text-[10px] text-indigo-400 hover:underline cursor-pointer"
            >
              Set Ulang Filter Sektor
            </button>
          </div>
        </div>

        {/* Floating Asset Metadata Panel (The QR Tracking and Specs) */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5 border-b border-slate-100 pb-3 mb-4">
              <span className="p-1.5 bg-indigo-50 text-indigo-600 rounded">
                <Landmark className="w-4.5 h-4.5" />
              </span>
              <h3 className="text-md font-bold text-slate-800 font-display">Informasi QR Aset Desa</h3>
            </div>

            {selectedAsset ? (
              <div className="space-y-4">
                <div className="flex flex-col items-center p-3 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                  {/* Digital QR Code Placeholder for the asset */}
                  <div className="w-24 h-24 bg-white p-2 rounded-lg shadow-sm border border-slate-200 flex flex-col justify-between items-center relative overflow-hidden">
                    <div className="grid grid-cols-4 gap-1 w-20 h-20">
                      {Array.from({ length: 16 }).map((_, i) => (
                        <div 
                          key={i} 
                          className={`w-4 h-4 ${
                            (i * selectedAsset.nama.length) % 3 === 0 ? 'bg-slate-900' : 'bg-transparent'
                          }`}
                        ></div>
                      ))}
                    </div>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-slate-400 mt-2 bg-slate-100 px-2 py-0.5 rounded uppercase">{selectedAsset.kode}</span>
                </div>

                <div className="space-y-2 text-xs">
                  <div>
                    <label className="text-[10px] text-slate-400 font-semibold block uppercase">Nama Aset</label>
                    <p className="font-bold text-slate-800">{selectedAsset.nama}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] text-slate-400 font-semibold block uppercase">Kategori</label>
                      <p className="font-medium text-slate-600">{selectedAsset.kategori}</p>
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-400 font-semibold block uppercase">Kondisi</label>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        selectedAsset.kondisi === 'Baik' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-rose-50 text-rose-600'
                      }`}>
                        {selectedAsset.kondisi}
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 font-semibold block uppercase">Nilai Aset Terdaftar</label>
                    <p className="font-bold text-slate-800 font-mono">Rp {selectedAsset.nilai.toLocaleString('id-ID')}</p>
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 font-semibold block uppercase">Lokasi Koordinat</label>
                    <p className="text-slate-550 font-mono">{selectedAsset.lokasi} (<span className="text-indigo-600">{selectedAsset.koordinat.x}° , {selectedAsset.koordinat.y}°</span>)</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-slate-450 text-xs">
                <Info className="w-10 h-10 stroke-1 mx-auto mb-2 text-slate-350" />
                <p>Klik salah satu marker pada peta GIS di kiri untuk memindai spesifikasi inventaris desa secara detail.</p>
              </div>
            )}
          </div>

          <div className="mt-5 p-3.5 bg-indigo-50 border border-indigo-150 rounded-xl text-xs text-indigo-950 flex gap-2">
            <Activity className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5 animate-pulse-ring" />
            <div>
              <p className="font-bold text-indigo-900">Teknologi GIS HEDRA</p>
              <p className="text-[11px] text-indigo-750">Mendukung pemetaan Dusun, RW, RT, Jalan, Lahan Pertanian, & Spot Wisata Desa tanpa beban loading berat.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
