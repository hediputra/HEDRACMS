import { useState } from 'react';
import { Sparkles, Send, Copy, ClipboardCheck, ArrowUpRight, Loader, Zap, BookOpen, FileText } from 'lucide-react';

export default function AiHedraWorkspace() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [loadingStep, setLoadingStep] = useState('');

  const quickTasks = [
    { title: 'Surat SKU Kebun', prompt: 'Buatkan draf Surat Keterangan Usaha (SKU) untuk warga bernama Ahmad Fauzi yang memiliki usaha perkebunan Kelapa Sawit mandiri di RT 01 Dusun I, untuk syarat pengajuan Kredit Usaha Rakyat.' },
    { title: 'Berita Panen', prompt: 'Tulis draf berita resmi portal desa tentang keberhasilan panen raya padi kelompok tani 02 Desa Pondokpanjang, menyoroti peran irigasi bendungan air BUMDes.' },
    { title: 'Saran BUMDes', prompt: 'Buat laporan analisis strategis rekomendasi pariwisata Bendungan Air BUMDes Pondokpanjang agar meningkatkan PADes (Pendapatan Asli Desa) di Bengkulu.' },
    { title: 'AI SEO Tag', prompt: 'Optimalkan metadata SEO berupa Judul, Meta Deskripsi, & Open Graph Tag dengan kata kunci "Smart Village Indonesia, Desa Digital Bengkulu muko muko".' }
  ];

  const handleAiCall = async (customPrompt: string) => {
    const finalPrompt = customPrompt || prompt;
    if (!finalPrompt.trim()) return;

    setLoading(true);
    setResponse('');
    setPrompt(finalPrompt);

    // Simulated staggered load message steps to increase user engagement
    const steps = [
      'Menjangkau Server HEDRA Cloud...',
      'Membuka koneksi aman ke Google Gemini 3.5...',
      'Menerapkan Tata Kebijakan Naskah Dinas Kementerian...',
      'Memproses penulisan draf final...'
    ];

    let stepIdx = 0;
    setLoadingStep(steps[0]);
    const stepInterval = setInterval(() => {
      stepIdx++;
      if (stepIdx < steps.length) {
        setLoadingStep(steps[stepIdx]);
      }
    }, 500);

    try {
      const res = await fetch('/api/gemini/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: finalPrompt })
      });

      if (!res.ok) {
        throw new Error('Server AI mengembalikan respon kegagalan.');
      }

      const data = await res.json();
      setResponse(data.text || '');
    } catch (err: any) {
      console.error(err);
      setResponse(`[Koneksi Bermasalah] Gagal mengontak asisten AI Hedra. ${err.message || 'Harap periksa logs.'}`);
    } finally {
      clearInterval(stepInterval);
      setLoading(false);
      setLoadingStep('');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(response);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6" id="ai-hedra-workspace">
      
      {/* Short quick buttons */}
      <div className="bg-indigo-950 p-6 rounded-3xl text-white relative overflow-hidden bg-grid-white">
        
        {/* Absolute ambient decorations */}
        <div className="absolute right-10 top-0 bottom-0 flex items-center justify-center opacity-10 select-none pointer-events-none">
          <Sparkles className="w-40 h-40" />
        </div>

        <div className="max-w-2xl z-10 relative">
          <span className="text-[10px] bg-indigo-500/30 text-indigo-200 px-3 py-1 rounded-full font-bold uppercase tracking-wider flex items-center gap-1.5 w-max">
            <Zap className="w-3.5 h-3.5" /> AI HEDRA Assistant (V1.0.0-PRO)
          </span>
          <h2 className="text-xl font-bold font-display mt-3">Asisten AI Pemerintahan Desa Pintar</h2>
          <p className="text-xs text-indigo-150 mt-1.5 leading-relaxed">
            HEDRA AI secara khusus mengimplementasikan modul naskah administrasi desa terintegrasi, draf perancangan surat, SEO optimasi berita desa, dan perumusan laporan anggaran dengan kecerdasan buatan terpercaya.
          </p>
        </div>

        {/* Quick Task select buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
          {quickTasks.map(task => (
            <button 
              key={task.title}
              onClick={() => handleAiCall(task.prompt)}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/15 p-3 rounded-xl text-left cursor-pointer transition-all flex flex-col justify-between group h-24"
            >
              <span className="text-xs font-bold font-display block">{task.title}</span>
              <span className="text-[10px] text-indigo-200 flex items-center justify-between gap-1 w-full mt-1">
                Kirim Perintah <ArrowUpRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Dynamic Prompt Editor */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between h-[380px]">
          <div className="space-y-4">
            <div className="flex items-center gap-1.5 border-b border-slate-150 pb-3">
              <span className="p-1.5 bg-indigo-50 text-indigo-600 rounded">
                <BookOpen className="w-4.5 h-4.5" />
              </span>
              <h3 className="text-sm font-bold text-slate-800 font-display">Tulis Perintah Khusus</h3>
            </div>

            <textarea 
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
              rows={6}
              placeholder="Contoh: Susun draf pidato Kades Sudarsono tentang pembukaan agenda turnamen kasti Karang Taruna..."
              className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 bg-slate-50 leading-relaxed"
            ></textarea>
          </div>

          <button 
            onClick={() => handleAiCall('')}
            disabled={loading || !prompt.trim()}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold py-3 rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
          >
            {loading ? (
              <>
                <Loader className="w-4 h-4 animate-spin text-indigo-400" />
                <span>Memproses Draf...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-indigo-200" />
                <span>Jalankan Sintesis AI</span>
              </>
            )}
          </button>
        </div>

        {/* Format output container */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between min-h-[380px]">
          <div>
            <div className="flex justify-between items-center border-b border-slate-150 pb-3 mb-4">
              <h3 className="text-sm font-bold text-slate-800 font-display flex items-center gap-1.5">
                <FileText className="w-4.5 h-4.5 text-indigo-500" /> Hasil Penulisan Dokumen AI
              </h3>
              
              {response && (
                <button 
                  onClick={copyToClipboard}
                  className="text-[10px] bg-slate-105 hover:bg-slate-150 text-slate-600 border border-slate-200 px-2.5 py-1 rounded-md flex items-center gap-1 transition-colors cursor-pointer font-semibold"
                >
                  {copied ? (
                    <>
                      <ClipboardCheck className="w-3.5 h-3.5 text-emerald-600" /> Disalin!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" /> Salin Dokumen
                    </>
                  )}
                </button>
              )}
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 text-slate-450 space-y-3">
                <Loader className="w-8 h-8 animate-spin text-indigo-500" />
                <p className="text-xs font-semibold animate-pulse-ring px-6 text-center">{loadingStep}</p>
              </div>
            ) : response ? (
              <div className="bg-slate-50 border border-slate-150 p-5 rounded-2xl max-h-[300px] overflow-y-auto font-mono text-xs whitespace-pre-wrap leading-relaxed text-slate-700">
                {response}
              </div>
            ) : (
              <div className="text-center py-24 text-slate-400">
                <Sparkles className="w-12 h-12 stroke-1 mx-auto mb-2 text-indigo-400" />
                <p className="text-xs">Formula asisten AI desa siap menerbitkan draf instan.</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
