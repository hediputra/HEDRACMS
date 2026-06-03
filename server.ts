import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Initialize Express
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Initialize AI if key is present
let ai: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Ensure API runs FIRST
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    aiEnabled: !!process.env.GEMINI_API_KEY,
    appVersion: 'HEDRA-CMS_v1.0.0-PRO'
  });
});

// AI Generation Endpoint
app.post('/api/gemini/generate', async (req, res) => {
  const { prompt, systemInstruction } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt wajib diisi' });
  }

  // Graceful fallback if AI is not configured
  if (!ai) {
    console.log('Gemini API Key missing or not initialized. Running simulation fallback.');
    
    // Simple rule-based generators for rich simulation
    let simulatedResponse = '';
    const lowerPrompt = prompt.toLowerCase();
    
    if (lowerPrompt.includes('surat') || lowerPrompt.includes('sku') || lowerPrompt.includes('keterangan')) {
      simulatedResponse = `[Demo HEDRA AI Asisten - Simulasi Surat Otomatis]\n\n**PEMERINTAH KABUPATEN MUKO-MUKO**\n**KECAMATAN SUBIS - DESA PONDOKPANJANG**\n*Jl. Utama No. 1, Kode Pos 38767*\n\n--- \n\n**SURAT KETERANGAN USAHA (SKU)**\nNomor: 510/ /PP-Sbs/VI/2026\n\nYang bertanda tangan di bawah ini, Kepala Desa Pondokpanjang menerangkan bahwa:\n\nNama: [Nama Lengkap]\nNIK: [NIK Pemohon]\nAlamat: [Alamat Lengkap]\n\nNama tersebut di atas adalah benar warga Desa Pondokpanjang yang memiliki usaha aktif bidang: **${prompt.replace(/buatin|buatkan|surat|tentang/gi, '').trim() || 'Pertanian Sawit / Dagang Kelontong'}** yang berlokasi di wilayah RT 02 Dusun II Desa Pondokpanjang.\n\nDemikian surat keterangan ini dibuat dengan sebenarnya untuk dapat dipergunakan sebagaimana mestinya.\n\nPondokpanjang, 3 Juni 2026\nKepala Desa Pondokpanjang\n\n\n**H. Sudarsono, M.AP**`;
    } else if (lowerPrompt.includes('berita') || lowerPrompt.includes('artikel')) {
      simulatedResponse = `[Demo HEDRA AI Asisten - Draft Berita Otomatis]\n\n**KEMAJUAN DESA: Geliat Sektor Pertanian di Pondokpanjang**\n\n*Pondokpanjang, 3 Juni 2026* - Pemerintah Desa Pondokpanjang hari ini menyalurkan bantuan bibit ketahanan pangan serta memotivasi kelompok tani sawit. Langkah produktif ini dikoordinatori oleh Bapak Kades H. Sudarsono bersama Sekretaris Desa Mas Hedi.\n\nMelalui optimalisasi HEDRA CMS, penyaluran sarana produksi pertanian kini tercatat transparan di sistem desa, membuka akses pelaporan real-time bagi warga. Pembangunan infrastruktur rabat beton pendukung hasil panen sawit sepanjang 350 meter juga dilaporkan telah mencapai realisasi 85% anggaran APBDes.\n\nDiharapkan pendapatan petani meroket seiring integrasi platform smart-village HEDRA CMS yang membantu sirkulasi harga panen karet & sawit terupdate secara harian langsung ke gadget warga.`;
    } else {
      simulatedResponse = `[Demo HEDRA AI Asisten]\n\nHalo dari AI HEDRA! Asisten AI Pemerintahan Desa Pondokpanjang.\n\nSaya mendeteksi Anda ingin membuat dokumen/analisis mengenai: "${prompt}".\n\nUntuk draf resmi, kami menyarankan struktur berikut:\n1. Kepala Surat (Kop Resmi Desa Pondokpanjang)\n2. Justifikasi administratif Permendagri No. 135\n3. QR verifikasi digital terintegrasi\n\nSilakan konfigurasikan GEMINI_API_KEY di Settings > Secrets untuk hasil naskah AI generatif real-time yang optimal serta disesuaikan dengan regulasi terbaru!`;
    }

    return res.json({ 
      text: simulatedResponse,
      debug: 'Simulation mode active (API Key was not found in environment)'
    });
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config: {
        systemInstruction: systemInstruction || 'Anda adalah AI HEDRA, Asisten AI Pintar Pemerintahan Desa Pondokpanjang. Bantu urusan administrasi desa seperti menulis draf surat resmi, laporan masyarakat, artikel panen tani, rincian APBDes, & rekomendasi BUMDes. Gunakan bahasa Indonesia yang sopan, formal, terstruktur, tata naskah dinas, dan ramah desa.',
        temperature: 0.7,
      },
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error('Gemini API Call failed:', error);
    res.status(500).json({ error: error.message || 'Gagal generate konten via Gemini API.' });
  }
});

// Configure Vite or Static Asset delivery
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[HEDRA SERVER] Express server running on port ${PORT}`);
  });
}

startServer();
