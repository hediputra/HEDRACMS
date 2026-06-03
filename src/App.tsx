import { useState } from 'react';
import { INI_DESA, LIST_APARATUR } from './data/mockData';
import CoreDashboard from './components/CoreDashboard';
import SuratPelayanan from './components/SuratPelayanan';
import PendudukPajak from './components/PendudukPajak';
import KeuanganTransparansi from './components/KeuanganTransparansi';
import GisDesa from './components/GisDesa';
import UmkmMarketplace from './components/UmkmMarketplace';
import PosbankumPengaduan from './components/PosbankumPengaduan';
import AbsensiAparatur from './components/AbsensiAparatur';
import AiHedraWorkspace from './components/AiHedraWorkspace';
import MobileAppSimulator from './components/MobileAppSimulator';
import ManajemenAset from './components/ManajemenAset';
import CmsMarketplace from './components/CmsMarketplace';

import { 
  Network, Sparkles, LayoutDashboard, FileText, Users, DollarSign, Map, ShoppingBag, 
  AlertTriangle, Fingerprint, Bot, Smartphone, Server, Shield, Globe, Award, Heart, Box, Puzzle
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'marketplace' | 'surat' | 'penduduk' | 'keuangan' | 'gis' | 'umkm' | 'pengaduan' | 'absensi' | 'ai' | 'mobile' | 'aset'>('dashboard');
  const [showVisiMisi, setShowVisiMisi] = useState(false);
  const [isPremium, setIsPremium] = useState<boolean>(false);
  const [activeTheme, setActiveTheme] = useState<string>('emerald');

  // Theme support classes
  const getThemeClasses = () => {
    switch (activeTheme) {
      case 'amber':
        return {
          bg: 'bg-amber-500',
          hoverBg: 'hover:bg-amber-600',
          text: 'text-amber-600',
          border: 'border-amber-200/40',
          lightBg: 'bg-amber-50 text-amber-800'
        };
      case 'indigo':
        return {
          bg: 'bg-indigo-650',
          hoverBg: 'hover:bg-indigo-700',
          text: 'text-indigo-600',
          border: 'border-indigo-600/20',
          lightBg: 'bg-indigo-50 text-indigo-800'
        };
      case 'emerald':
      default:
        return {
          bg: 'bg-emerald-600',
          hoverBg: 'hover:bg-emerald-700',
          text: 'text-emerald-600',
          border: 'border-emerald-600/20',
          lightBg: 'bg-emerald-50 text-emerald-700'
        };
    }
  };

  const themeClasses = getThemeClasses();

  // Tabs structure
  const tabs = [
    { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { key: 'marketplace', label: 'CMS & Ekstensi', icon: Puzzle },
    { key: 'surat', label: 'Pelayanan Surat', icon: FileText },
    { key: 'penduduk', label: 'Kependudukan & PBB', icon: Users },
    { key: 'keuangan', label: 'Kas APBDes', icon: DollarSign },
    { key: 'gis', label: 'GIS Peta Desa', icon: Map },
    { key: 'umkm', label: 'Wisata & UMKM', icon: ShoppingBag },
    { key: 'aset', label: 'Aset Desa', icon: Box },
    { key: 'pengaduan', label: 'Aduan & Posbankum', icon: AlertTriangle },
    { key: 'absensi', label: 'Absensi Biometrik', icon: Fingerprint },
    { key: 'ai', label: 'AI HEDRA Asisten', icon: Bot },
    { key: 'mobile', label: 'Simulasi Mobile', icon: Smartphone }
  ] as const;

  return (
    <div className="h-screen w-full bg-slate-50 text-slate-900 font-sans flex flex-col overflow-hidden" id="applet-root">
      
      {/* 1. Professional Top Navigation Bar */}
      <header className="flex flex-col sm:flex-row items-center justify-between px-6 py-4 bg-white border-b border-slate-200 shadow-sm z-30 shrink-0 gap-4">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 ${themeClasses.bg} rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-md cursor-pointer transition-transform hover:scale-105`}>
            H
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold leading-none text-slate-800 tracking-tight">HEDRA CMS</h1>
              <span className={`text-[10px] ${themeClasses.lightBg} px-2 py-0.5 rounded-full font-bold uppercase tracking-wider font-mono`}>
                {isPremium ? 'v1.2.0-Premium' : 'v1.2.0-Pro'}
              </span>
            </div>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1 font-semibold leading-none">
              High Efficiency Digital Rural Application
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 sm:gap-6 justify-end w-full sm:w-auto">
          {/* Real-time pulse server badge */}
          <div className={`flex items-center gap-2 px-3 py-1.5 ${themeClasses.lightBg} border border-slate-200 rounded-full text-xs font-semibold`}>
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            Server Status: High Efficiency
          </div>

          {/* Visi Misi toggle in header */}
          <button 
            onClick={() => setShowVisiMisi(!showVisiMisi)}
            className="text-xs border border-slate-200 hover:border-slate-350 bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold px-3.5 py-1.5 rounded-xl cursor-pointer transition-all flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>{showVisiMisi ? 'Sembunyikan Visi Misi & Sejarah' : 'Visi Misi & Sejarah'}</span>
          </button>

          {/* Developer Profile Card */}
          <div className="flex items-center gap-3 pl-6 border-l border-slate-200">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold text-slate-800">Mas Hedi</p>
              <p className="text-[10px] text-slate-400 font-medium font-mono">Sekretaris Desa</p>
            </div>
            <div className="w-9 h-9 rounded-full bg-emerald-500/10 text-emerald-700 border border-emerald-200 flex items-center justify-center font-extrabold text-xs">
              MH
            </div>
          </div>
        </div>
      </header>

      {/* 2. Interactive Visi, Misi and Sejarah expanding drawer */}
      {showVisiMisi && (
        <div className="bg-slate-900 text-white border-b border-slate-800 transition-all duration-300 shadow-inner z-20 shrink-0 max-h-[35vh] overflow-y-auto">
          <div className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <h3 className="text-xs font-bold font-display uppercase tracking-widest text-emerald-400">Sejarah Desa Pondokpanjang</h3>
              <p className="text-[11px] text-slate-350 leading-relaxed text-justify">
                {INI_DESA.sejarah}
              </p>
              <div className="flex gap-4 pt-1 text-[11px] text-slate-400 font-mono">
                <span>Didirikan: <b className="text-white">{INI_DESA.tahunBerdiri}</b></span>
                <span>Kecamatan: <b className="text-white">{INI_DESA.kecamatan}</b></span>
                <span>Kabupaten: <b className="text-white">{INI_DESA.kabupaten}</b></span>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-xs font-bold font-display uppercase tracking-widest text-emerald-400">Visi & Misi Desa</h3>
              <div>
                <span className="text-[9px] font-bold text-emerald-500 uppercase tracking-wider block mb-0.5">VISI INDONESIA SMART-VILLAGE</span>
                <p className="text-xs italic text-indigo-200 font-semibold">"{INI_DESA.visi}"</p>
              </div>

              <div>
                <span className="text-[9px] font-bold text-emerald-500 uppercase tracking-wider block mb-1">MISI STRATEGIS KAUR JASA</span>
                <ul className="space-y-1 text-xs text-slate-350 list-decimal pl-4 leading-relaxed">
                  {INI_DESA.misi.map((m, i) => (
                    <li key={i}>{m}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. Main Dashboard Side-by-Side Area */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* Left Navigation Sidebar for Desktop/Tablets */}
        <nav className="w-64 bg-slate-900 border-r border-slate-800 text-slate-300 flex-col p-4 gap-1 select-none hidden md:flex shrink-0 h-full overflow-y-auto justify-between">
          <div className="space-y-5">
            {/* Group 1: Core */}
            <div>
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-3 mb-1.5">Core Management</div>
              <div className="space-y-0.5">
                {tabs.slice(0, 5).map(tab => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.key;
                  return (
                    <button
                      key={tab.key}
                      onClick={() => setActiveTab(tab.key)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                        isActive 
                          ? `${themeClasses.bg} text-white shadow-md` 
                          : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                      }`}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Group 2: Economic & Asset */}
            <div>
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-3 mb-1.5">Economic & Asset</div>
              <div className="space-y-0.5">
                {tabs.slice(5, 8).map(tab => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.key;
                  return (
                    <button
                      key={tab.key}
                      onClick={() => setActiveTab(tab.key)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                        isActive 
                          ? `${themeClasses.bg} text-white shadow-md` 
                          : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                      }`}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Group 3: Security & Attendance */}
            <div>
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-3 mb-1.5">Citizen & Staff</div>
              <div className="space-y-0.5">
                {tabs.slice(8, 10).map(tab => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.key;
                  return (
                    <button
                      key={tab.key}
                      onClick={() => setActiveTab(tab.key)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                        isActive 
                          ? `${themeClasses.bg} text-white shadow-md` 
                          : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                      }`}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Group 4: Intelligent features */}
            <div>
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-3 mb-1.5">Intelligent Modules</div>
              <div className="space-y-0.5">
                {tabs.slice(10, 12).map(tab => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.key;
                  return (
                    <button
                      key={tab.key}
                      onClick={() => setActiveTab(tab.key)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                        isActive 
                          ? `${themeClasses.bg} text-white shadow-md` 
                          : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                      }`}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Professional Pro Upgrade Sidebar Decoration Card */}
          <div className="mt-8 p-3.5 bg-slate-800 rounded-xl border border-slate-705/85 select-none">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[9px] bg-emerald-500 text-white px-1.5 py-0.2 rounded font-mono font-bold tracking-wide">PRO</span>
              <span className="text-[11px] font-bold text-white tracking-wide">HEDRA AI Engine</span>
            </div>
            <p className="text-[10px] text-slate-400 leading-relaxed">
              Tanya asisten cerdas untuk membuat laporan, draf legal dinas, APBDes, or optimize SEO tag.
            </p>
          </div>
        </nav>

        {/* Right Pane: Scrollable Workspace Content viewport */}
        <div className="flex-1 flex flex-col min-w-0 bg-slate-50 h-full overflow-hidden">
          
          {/* Mobile Tab bar - Rendered ONLY on screen sizes below md */}
          <div className="md:hidden bg-white border-b border-slate-200 p-2.5 shrink-0 z-10 w-full overflow-x-auto scrollbar-thin">
            <div className="flex gap-1.5 w-max">
              {tabs.map(tab => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.key;
                return (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-xl cursor-pointer transition-all ${
                      isActive 
                        ? `${themeClasses.bg} text-white shadow-sm` 
                        : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900 border border-transparent hover:border-slate-100'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5 shrink-0" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Central Active component mount area */}
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6" id="hedra-workspace-viewport">
            {activeTab === 'dashboard' && <CoreDashboard />}
            {activeTab === 'marketplace' && (
              <CmsMarketplace 
                isPremium={isPremium} 
                setIsPremium={setIsPremium} 
                activeTheme={activeTheme} 
                setActiveTheme={setActiveTheme} 
              />
            )}
            {activeTab === 'surat' && <SuratPelayanan isPremium={isPremium} />}
            {activeTab === 'penduduk' && <PendudukPajak />}
            {activeTab === 'keuangan' && <KeuanganTransparansi />}
            {activeTab === 'gis' && <GisDesa />}
            {activeTab === 'umkm' && <UmkmMarketplace />}
            {activeTab === 'aset' && <ManajemenAset isPremium={isPremium} />}
            {activeTab === 'pengaduan' && <PosbankumPengaduan />}
            {activeTab === 'absensi' && <AbsensiAparatur />}
            {activeTab === 'ai' && <AiHedraWorkspace />}
            {activeTab === 'mobile' && <MobileAppSimulator />}
          </main>
          
          {/* Footer inside the view boundary */}
          <footer className="bg-white border-t border-slate-200 px-6 py-3 flex flex-col md:flex-row items-center justify-between text-[10px] text-slate-500 font-medium shrink-0 gap-2">
            <div className="flex flex-wrap items-center gap-2 md:gap-4 justify-center md:justify-start">
              <span className="font-bold text-slate-700">HEDRA CMS v1.2.0-Pro</span>
              <span className="w-1 h-1 bg-slate-300 rounded-full hidden md:block"></span>
              <span>Laravel 12 LTS · Alpine.js & HTMX · PHP 8.4+</span>
              <span className="w-1 h-1 bg-slate-300 rounded-full hidden md:block"></span>
              <span>MySQL 8 / Postgres</span>
            </div>
            
            <div className="flex items-center gap-4 text-slate-400 shrink-0 font-mono">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                <span>LiteSpeed Enterprise</span>
              </div>
              <span>·</span>
              <span>Smart Village Indonesia</span>
            </div>
          </footer>

        </div>
      </div>

    </div>
  );
}
