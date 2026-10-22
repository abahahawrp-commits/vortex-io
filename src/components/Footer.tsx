import React from 'react';
import { ArrowUp } from 'lucide-react';

interface FooterProps {
  onOpenDocs: () => void;
  onOpenDashboard: () => void;
  onOpenAccessibility: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenDocs,
  onOpenDashboard,
  onOpenAccessibility,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full border-t border-stone-200/80 dark:border-neutral-800/80 py-12 px-4 sm:px-6 lg:px-8 bg-stone-100/50 dark:bg-neutral-950">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-neutral-500 dark:text-neutral-400">
        
        {/* Left: Brand & Copyright */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-center sm:text-left">
          <span className="font-display font-bold text-neutral-900 dark:text-white uppercase tracking-wider text-sm">
            Samuel W. R. P.
          </span>
          <span className="hidden sm:inline text-neutral-300 dark:text-neutral-700">·</span>
          <span>© {new Date().getFullYear()} Hak Cipta Dilindungi.</span>
          <span className="hidden sm:inline text-neutral-300 dark:text-neutral-700">·</span>
          <span>Desain Editorial & Rekayasa Full-Stack</span>
        </div>

        {/* Center: Clean links */}
        <div className="flex items-center gap-5 font-medium">
          <button
            onClick={onOpenDocs}
            className="hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            Dokumentasi & Setup
          </button>
          <span className="text-neutral-300 dark:text-neutral-700">·</span>
          <button
            onClick={onOpenDashboard}
            className="hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            Panel Pemilik
          </button>
          <span className="text-neutral-300 dark:text-neutral-700">·</span>
          <button
            onClick={onOpenAccessibility}
            className="hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            Aksesibilitas
          </button>
        </div>

        {/* Right: Scroll to top */}
        <button
          onClick={scrollToTop}
          className="inline-flex items-center gap-1.5 p-2 rounded-xl text-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:bg-stone-200/60 dark:hover:bg-neutral-800 transition-colors"
          aria-label="Kembali ke atas"
        >
          <span>Kembali ke Atas</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>

      </div>
    </footer>
  );
};
