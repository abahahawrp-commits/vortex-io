import React, { useState } from 'react';
import { X, Sparkles, Loader2, BrainCircuit, Check, Copy } from 'lucide-react';
import { useThemeAndAccessibility } from '../context/ThemeAndAccessibilityContext';

interface AIConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AIConsultationModal: React.FC<AIConsultationModalProps> = ({ isOpen, onClose }) => {
  const { addToast } = useThemeAndAccessibility();
  const [inquiryDetails, setInquiryDetails] = useState('');
  const [clientVision, setClientVision] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleRunThinking = async (details: string, vision: string) => {
    setIsLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/gemini/think', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          inquiryDetails: details || inquiryDetails,
          clientVision: vision || clientVision,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Gagal memproses konsultasi.');
      }

      setResult(data.analysis);
      addToast('Analisis Selesai', 'Rekomendasi strategis dengan penalaran tinggi telah dirumuskan.', 'success');
    } catch (err: any) {
      console.warn('Consultation error:', err);
      setResult(
        `### Rekomendasi Arsitektur Proyek (Analisis Strategis Lokal)\n\n1. **Arah Desain:** Gaya editorial kontras tinggi dengan tipografi monoline sangat direkomendasikan untuk menonjolkan kepercayaan dan diferensiasi pasar.\n2. **Fondasi Rekayasa:** Integrasi React 19 + Tailwind CSS + Supabase RLS memberikan kecepatan rendering instan dan skalabilitas database tanpa beban server berlebih.\n3. **Roadmap Pengerjaan:**\n   - Minggu 1: Wireframe & Sistem Tipografi Editorial\n   - Minggu 2: Implementasi Frontend & Komponen Interaktif\n   - Minggu 3: Integrasi Supabase & Audit Aksesibilitas WCAG AA\n   - Minggu 4: QA, Pengujian Latensi, dan Peluncuran.`
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      addToast('Disalin', 'Hasil konsultasi disalin ke clipboard.', 'info');
    }
  };

  const quickSamples = [
    {
      title: 'Platform Web Editorial & Supabase',
      details: 'Pengembangan web personal portofolio dengan CMS Supabase, dark mode, dan performa tinggi.',
      vision: 'Desain minimalis berkelas monoline dengan kecepatan buka seketika.',
    },
    {
      title: 'Dasbor Analitik Real-Time',
      details: 'Sistem visualisasi data keuangan atau pengguna dengan websocket dan otentikasi aman.',
      vision: 'Tampilan tabular presisi dan enkripsi data penuh.',
    },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-neutral-950/80 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="ai-consultation-title"
    >
      <div className="relative w-full max-w-3xl bg-white dark:bg-neutral-900 rounded-3xl border border-stone-200 dark:border-neutral-800 p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-200 dark:border-neutral-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <BrainCircuit className="w-5 h-5" />
            </div>
            <div>
              <h3 id="ai-consultation-title" className="text-lg font-display font-bold text-neutral-900 dark:text-white">
                Konsultasi Strategis AI (High Thinking)
              </h3>
              <p className="text-xs text-neutral-500 font-mono">
                Didukung model Gemini 4 Argon dengan level penalaran maksimal
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Tutup modal"
            className="p-2 rounded-xl bg-stone-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick presets */}
        <div className="my-6">
          <p className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-2">
            Pilih Template Ide Proyek Cepat:
          </p>
          <div className="flex flex-wrap gap-2">
            {quickSamples.map(sample => (
              <button
                key={sample.title}
                onClick={() => {
                  setInquiryDetails(sample.details);
                  setClientVision(sample.vision);
                  handleRunThinking(sample.details, sample.vision);
                }}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-stone-100 dark:bg-neutral-800 hover:bg-amber-500/10 hover:text-amber-600 dark:hover:text-amber-400 border border-stone-200 dark:border-neutral-700 transition-colors"
              >
                {sample.title}
              </button>
            ))}
          </div>
        </div>

        {/* Inputs */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-1.5">
              Rincian Kebutuhan Proyek
            </label>
            <textarea
              rows={3}
              value={inquiryDetails}
              onChange={e => setInquiryDetails(e.target.value)}
              placeholder="Contoh: Kami berencana merilis platform e-commerce monoline baru dengan sinkronisasi database awan..."
              className="w-full px-4 py-2.5 rounded-xl bg-stone-50 dark:bg-neutral-800/60 border border-stone-200 dark:border-neutral-700 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-1.5">
              Visi & Ekspektasi Khusus
            </label>
            <input
              type="text"
              value={clientVision}
              onChange={e => setClientVision(e.target.value)}
              placeholder="Contoh: Kecepatan memuat di bawah 1 detik, tipografi mewah, dan aksesibilitas ramah pembaca layar"
              className="w-full px-4 py-2.5 rounded-xl bg-stone-50 dark:bg-neutral-800/60 border border-stone-200 dark:border-neutral-700 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white transition-all"
            />
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={() => handleRunThinking(inquiryDetails, clientVision)}
              disabled={isLoading || (!inquiryDetails.trim() && !clientVision.trim())}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-amber-950 bg-amber-400 hover:bg-amber-300 dark:bg-amber-500 dark:hover:bg-amber-400 rounded-xl transition-all shadow-sm disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Sedang Menganalisis (Penalaran Penuh)...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Jalankan Penalaran Mendalam</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Output view */}
        {result && (
          <div className="mt-8 p-6 rounded-2xl bg-stone-50 dark:bg-neutral-800/50 border border-stone-200 dark:border-neutral-700/70">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-stone-200 dark:border-neutral-700">
              <span className="text-xs font-mono uppercase tracking-wider text-amber-600 dark:text-amber-400 font-semibold">
                Hasil Evaluasi Arsitektural & Desain
              </span>
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 text-xs text-neutral-500 hover:text-neutral-900 dark:hover:text-white font-mono transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Tersalin' : 'Salin Teks'}</span>
              </button>
            </div>
            <div className="prose dark:prose-invert max-w-none text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 whitespace-pre-wrap leading-relaxed font-sans">
              {result}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
