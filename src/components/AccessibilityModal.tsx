import React from 'react';
import { X, Sliders, Eye, Type, Activity, Volume2, RotateCcw } from 'lucide-react';
import { useThemeAndAccessibility } from '../context/ThemeAndAccessibilityContext';

interface AccessibilityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AccessibilityModal: React.FC<AccessibilityModalProps> = ({ isOpen, onClose }) => {
  const { accessibility, updateAccessibility, addToast } = useThemeAndAccessibility();

  if (!isOpen) return null;

  const handleReset = () => {
    updateAccessibility('highContrast', false);
    updateAccessibility('largeText', false);
    updateAccessibility('reducedMotion', false);
    updateAccessibility('screenReaderOptimized', false);
    addToast('Aksesibilitas Direset', 'Semua pengaturan kembali ke standar normal.', 'info');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-neutral-950/80 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="a11y-modal-title"
    >
      <div className="relative w-full max-w-md bg-white dark:bg-neutral-900 rounded-3xl border border-stone-200 dark:border-neutral-800 p-6 sm:p-8 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-200 dark:border-neutral-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h3 id="a11y-modal-title" className="text-lg font-display font-bold text-neutral-900 dark:text-white">
                Pusat Aksesibilitas (WCAG)
              </h3>
              <p className="text-xs text-neutral-500 font-mono">
                Penyesuaian visual & ergonomi antarmuka
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Tutup pengaturan aksesibilitas"
            className="p-2 rounded-xl bg-stone-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toggles */}
        <div className="py-6 space-y-4">
          {/* High Contrast */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-stone-50 dark:bg-neutral-800/40 border border-stone-200/80 dark:border-neutral-800">
            <div className="flex items-center gap-3">
              <Eye className="w-4 h-4 text-neutral-500" />
              <div>
                <p className="text-xs font-semibold text-neutral-900 dark:text-white">Kontras Visual Tinggi</p>
                <p className="text-[11px] text-neutral-500">Meningkatkan saturasi dan ketajaman teks</p>
              </div>
            </div>
            <button
              onClick={() => updateAccessibility('highContrast', !accessibility.highContrast)}
              className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                accessibility.highContrast ? 'bg-amber-500' : 'bg-stone-300 dark:bg-neutral-700'
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  accessibility.highContrast ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Large Text */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-stone-50 dark:bg-neutral-800/40 border border-stone-200/80 dark:border-neutral-800">
            <div className="flex items-center gap-3">
              <Type className="w-4 h-4 text-neutral-500" />
              <div>
                <p className="text-xs font-semibold text-neutral-900 dark:text-white">Perbesar Ukuran Teks</p>
                <p className="text-[11px] text-neutral-500">Menaikkan skala font sebesar +10% untuk kemudahan baca</p>
              </div>
            </div>
            <button
              onClick={() => updateAccessibility('largeText', !accessibility.largeText)}
              className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                accessibility.largeText ? 'bg-amber-500' : 'bg-stone-300 dark:bg-neutral-700'
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  accessibility.largeText ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Reduced Motion */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-stone-50 dark:bg-neutral-800/40 border border-stone-200/80 dark:border-neutral-800">
            <div className="flex items-center gap-3">
              <Activity className="w-4 h-4 text-neutral-500" />
              <div>
                <p className="text-xs font-semibold text-neutral-900 dark:text-white">Kurangi Gerakan (Reduced Motion)</p>
                <p className="text-[11px] text-neutral-500">Meminimalkan transisi dan animasi visual layar</p>
              </div>
            </div>
            <button
              onClick={() => updateAccessibility('reducedMotion', !accessibility.reducedMotion)}
              className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                accessibility.reducedMotion ? 'bg-amber-500' : 'bg-stone-300 dark:bg-neutral-700'
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  accessibility.reducedMotion ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Screen Reader Optimization */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-stone-50 dark:bg-neutral-800/40 border border-stone-200/80 dark:border-neutral-800">
            <div className="flex items-center gap-3">
              <Volume2 className="w-4 h-4 text-neutral-500" />
              <div>
                <p className="text-xs font-semibold text-neutral-900 dark:text-white">Pemberitahuan Suara (Audio Chime)</p>
                <p className="text-[11px] text-neutral-500">Umpan balik audio saat pesan sukses terkirim</p>
              </div>
            </div>
            <button
              onClick={() => updateAccessibility('screenReaderOptimized', !accessibility.screenReaderOptimized)}
              className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                accessibility.screenReaderOptimized ? 'bg-amber-500' : 'bg-stone-300 dark:bg-neutral-700'
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  accessibility.screenReaderOptimized ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-between pt-4 border-t border-stone-200 dark:border-neutral-800">
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Standar</span>
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-white bg-neutral-900 dark:bg-neutral-100 dark:text-neutral-900 rounded-xl hover:bg-neutral-800 transition-colors"
          >
            Selesai
          </button>
        </div>
      </div>
    </div>
  );
};
