import React from 'react';
import { Sun, Moon, Sliders, ShieldCheck, UserCheck } from 'lucide-react';
import { useThemeAndAccessibility } from '../context/ThemeAndAccessibilityContext';
import { useAuth } from '../context/AuthContext';

interface TopNavbarProps {
  onOpenDashboard: () => void;
  onOpenAccessibility: () => void;
  onOpenDocs: () => void;
}

export const TopNavbar: React.FC<TopNavbarProps> = ({
  onOpenDashboard,
  onOpenAccessibility,
  onOpenDocs,
}) => {
  const { theme, toggleTheme } = useThemeAndAccessibility();
  const { isAdmin, user } = useAuth();

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-stone-50/85 dark:bg-neutral-950/85 border-b border-stone-200/70 dark:border-neutral-800/70 transition-colors">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single line text element) */}
        <a
          href="#"
          className="text-base font-bold tracking-tight text-neutral-900 dark:text-neutral-100 uppercase hover:opacity-80 transition-opacity whitespace-nowrap shrink-0 font-display"
        >
          Samuel W. <span className="font-light text-stone-500 dark:text-neutral-500">/ Studio</span>
        </a>

        {/* Zone 2: 4-5 Concise single-line navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-xs uppercase tracking-wider font-medium text-neutral-600 dark:text-neutral-400">
          <a
            href="#keahlian"
            className="hover:text-neutral-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Keahlian
          </a>
          <a
            href="#karya"
            className="hover:text-neutral-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Karya Pilihan
          </a>
          <a
            href="#filosofi"
            className="hover:text-neutral-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Filosofi
          </a>
          <a
            href="#kontak"
            className="hover:text-neutral-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Kontak
          </a>
          <button
            onClick={onOpenDocs}
            className="hover:text-neutral-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 text-left"
          >
            Panduan & DB
          </button>
        </nav>

        {/* Zone 3: 1 Primary action + Accessibility/Theme triggers */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Accessibility toggle */}
          <button
            onClick={onOpenAccessibility}
            title="Pengaturan Aksesibilitas"
            aria-label="Pengaturan Aksesibilitas"
            className="p-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-stone-200/60 dark:hover:bg-neutral-800/60 rounded-lg transition-colors"
          >
            <Sliders className="w-4 h-4" />
          </button>

          {/* Dark / Light Mode Toggle */}
          <button
            onClick={toggleTheme}
            title={theme === 'dark' ? 'Beralih ke Mode Terang' : 'Beralih ke Mode Gelap'}
            aria-label="Beralih Tema"
            className="p-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-stone-200/60 dark:hover:bg-neutral-800/60 rounded-lg transition-colors"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Admin / Analytics Portal Trigger */}
          <button
            onClick={onOpenDashboard}
            title={isAdmin ? `Masuk sebagai ${user?.name}` : 'Buka Dasbor Analitik & Pesan'}
            className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 ${
              isAdmin
                ? 'bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400'
                : 'border-stone-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-stone-100 dark:hover:bg-neutral-900'
            }`}
          >
            {isAdmin ? <ShieldCheck className="w-3.5 h-3.5" /> : <UserCheck className="w-3.5 h-3.5" />}
            <span>{isAdmin ? 'Dasbor Pemilik' : 'Panel Analitik'}</span>
          </button>

          {/* Primary CTA */}
          <a
            href="#kontak"
            className="px-4 py-2 text-xs font-semibold tracking-wide uppercase text-white bg-neutral-900 dark:bg-neutral-100 dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-200 rounded-lg transition-all shadow-sm whitespace-nowrap shrink-0"
          >
            Hubungi
          </a>
        </div>
      </div>
    </header>
  );
};
