import React from 'react';
import { ArrowDownRight, Sparkles, Send, Eye } from 'lucide-react';

interface EditorialHeroProps {
  onOpenConsultation: () => void;
}

export const EditorialHero: React.FC<EditorialHeroProps> = ({ onOpenConsultation }) => {
  return (
    <section className="relative w-full pt-6 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background subtle noise/grid ambiance */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05] bg-[radial-gradient(#000_1px,transparent_1px)] dark:bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="max-w-6xl mx-auto">
        {/* Poster Wrapper with subtle outer framing */}
        <div className="relative bg-white/70 dark:bg-neutral-900/60 rounded-3xl border border-stone-200/80 dark:border-neutral-800/80 p-6 sm:p-10 lg:p-14 shadow-sm backdrop-blur-sm transition-all duration-300">
          
          {/* Top Editorial Rule & Markers (Matching layout poster: Design · Confiança · Samuel) */}
          <div className="flex items-center justify-between text-xs sm:text-sm font-light tracking-[0.25em] uppercase text-neutral-500 dark:text-neutral-400 border-b border-stone-200/60 dark:border-neutral-800/60 pb-6 mb-8 sm:mb-12 font-display">
            <span>Desain</span>
            <span className="font-medium text-neutral-800 dark:text-neutral-200">Kepercayaan</span>
            <span>Samuel W.</span>
          </div>

          {/* Central Editorial Split Composition */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center my-4">
            
            {/* Left Column: Social Handle & Philosophical Premise */}
            <div className="lg:col-span-3 flex flex-col justify-center order-2 lg:order-1 text-left">
              {/* Creator Tag Handle */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-stone-200 dark:border-neutral-800 bg-stone-50/80 dark:bg-neutral-800/60 w-fit mb-6 text-xs text-neutral-700 dark:text-neutral-300">
                <img
                  src="/assets/aistudio/Gemini_Generated_Image_k4jo3dk4jo3dk4jo_8bf28cf4.jpg"
                  alt="Samuel Avatar"
                  className="w-5 h-5 rounded-full object-cover"
                />
                <span className="font-mono text-[11px] tracking-tight">@abahahawrp</span>
              </div>

              {/* Bold Statement */}
              <h2 className="text-2xl sm:text-3xl lg:text-3xl font-display leading-[1.18] tracking-tight text-neutral-800 dark:text-neutral-200">
                <span className="font-light block text-neutral-500 dark:text-neutral-400">Jika Anda</span>
                <span className="font-bold block text-neutral-900 dark:text-white">tidak percaya</span>
                <span className="font-light block text-neutral-500 dark:text-neutral-400">pada karya</span>
                <span className="font-extrabold block text-neutral-950 dark:text-white">Anda sendiri,</span>
              </h2>

              <p className="mt-6 text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-xs">
                Karya berkelas lahir dari keyakinan murni pada detail, kejujuran arsitektur kode, dan kepuasan pengguna akhir.
              </p>
            </div>

            {/* Center Column: The Central Framed Portrait Card */}
            <div className="lg:col-span-6 flex justify-center order-1 lg:order-2">
              <div className="relative group w-full max-w-[340px] sm:max-w-[390px] aspect-[4/5] rounded-[2.5rem] p-3 border border-stone-300/90 dark:border-neutral-700/80 bg-stone-100/50 dark:bg-neutral-800/40 shadow-xl transition-transform duration-500 hover:scale-[1.01]">
                
                {/* Secondary inner contour wireframe outline matching reference */}
                <div className="relative w-full h-full rounded-[2rem] overflow-hidden border border-stone-200/60 dark:border-neutral-700/60 bg-neutral-900">
                  <img
                    src="/assets/aistudio/Gemini_Generated_Image_k4jo3dk4jo3dk4jo_8bf28cf4.jpg"
                    alt="Samuel Portrait"
                    className="w-full h-full object-cover object-center filter saturate-[0.95] contrast-[1.04] transition-transform duration-700 group-hover:scale-105"
                    loading="eager"
                  />
                  {/* Subtle soft gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/70 via-transparent to-transparent opacity-80" />

                  {/* Floating card caption inside */}
                  <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between text-white">
                    <div>
                      <p className="text-[10px] tracking-widest uppercase text-amber-300 font-mono">Creative Technologist</p>
                      <p className="text-base font-semibold font-display">Samuel W. R. P.</p>
                    </div>
                    <span className="text-[11px] font-mono text-neutral-300">Jakarta, ID</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Oversized Punchline (por que o cliente confiaria?) */}
            <div className="lg:col-span-3 flex flex-col justify-center order-3 text-left lg:text-left">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-display leading-[1.05] tracking-tight text-neutral-900 dark:text-white">
                <span className="font-extralight block text-neutral-400 dark:text-neutral-500">mengapa</span>
                <span className="font-bold block text-neutral-900 dark:text-neutral-100">sang klien</span>
                <span className="font-serif italic font-normal block text-amber-600 dark:text-amber-400">harus percaya?</span>
              </div>

              <div className="mt-8 pt-6 border-t border-stone-200/80 dark:border-neutral-800/80 space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 dark:text-neutral-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>Tersedia untuk Kolaborasi Q1 2026</span>
                </div>
                <p className="text-xs text-neutral-600 dark:text-neutral-400">
                  Desain UI/UX · Arsitektur Full-Stack · Konsultasi Produk
                </p>
              </div>
            </div>

          </div>

          {/* Bottom Editorial Markers */}
          <div className="flex items-center justify-between text-xs sm:text-sm font-light tracking-[0.25em] uppercase text-neutral-500 dark:text-neutral-400 border-t border-stone-200/60 dark:border-neutral-800/60 pt-6 mt-8 sm:mt-12 font-display">
            <span>Presisi</span>
            <span className="font-medium text-neutral-800 dark:text-neutral-200">Kepercayaan</span>
            <span>Estetika</span>
          </div>

        </div>

        {/* Action strip below the split */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 p-4 sm:p-6 rounded-2xl bg-stone-100/60 dark:bg-neutral-900/40 border border-stone-200/60 dark:border-neutral-800/60">
          <div className="flex items-center gap-3">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
            </span>
            <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300">
              Butuh evaluasi proyek atau rancangan arsitektur teknologi personal?
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenConsultation}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-amber-950 bg-amber-400 hover:bg-amber-300 dark:bg-amber-500 dark:hover:bg-amber-400 rounded-xl transition-all shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Thinking Consultation</span>
            </button>

            <a
              href="#karya"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white bg-white dark:bg-neutral-800 border border-stone-200 dark:border-neutral-700 rounded-xl transition-colors"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Lihat Portofolio</span>
            </a>

            <a
              href="#kontak"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-white bg-neutral-900 dark:bg-neutral-100 dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-200 rounded-xl transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Kirim Pesan</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
