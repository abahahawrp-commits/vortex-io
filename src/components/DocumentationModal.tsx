import React, { useState } from 'react';
import { X, BookOpen, Database, FolderTree, Mail, Check, Copy } from 'lucide-react';
import { SUPABASE_SQL_SCHEMA } from '../lib/supabase';
import { useThemeAndAccessibility } from '../context/ThemeAndAccessibilityContext';

interface DocumentationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DocumentationModal: React.FC<DocumentationModalProps> = ({ isOpen, onClose }) => {
  const { addToast } = useThemeAndAccessibility();
  const [copiedSql, setCopiedSql] = useState(false);

  if (!isOpen) return null;

  const handleCopySql = () => {
    navigator.clipboard.writeText(SUPABASE_SQL_SCHEMA);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2000);
    addToast('SQL Disalin', 'Skrip tabel Supabase berhasil disalin ke clipboard.', 'success');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-neutral-950/80 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="docs-modal-title"
    >
      <div className="relative w-full max-w-3xl bg-white dark:bg-neutral-900 rounded-3xl border border-stone-200 dark:border-neutral-800 p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-200 dark:border-neutral-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 id="docs-modal-title" className="text-lg font-display font-bold text-neutral-900 dark:text-white">
                Dokumentasi & Panduan Pemeliharaan
              </h3>
              <p className="text-xs text-neutral-500 font-mono">
                Struktur Modular, Setup Supabase, & Alur Kontak Email
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Tutup Dokumentasi"
            className="p-2 rounded-xl bg-stone-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="py-6 space-y-8 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
          
          {/* Section 1: Folder Architecture */}
          <div>
            <div className="flex items-center gap-2 font-display font-bold text-neutral-900 dark:text-white text-base mb-2">
              <FolderTree className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <h4>1. Struktur Folder Modular</h4>
            </div>
            <p className="text-neutral-500 dark:text-neutral-400 mb-3">
              Kode diatur secara modular agar Anda dapat menambah atau memodifikasi fitur baru di masa depan dengan cepat:
            </p>
            <div className="p-4 rounded-2xl bg-stone-50 dark:bg-neutral-800/50 border border-stone-200 dark:border-neutral-700 font-mono text-xs space-y-1.5">
              <p><strong className="text-amber-600 dark:text-amber-400">src/components/</strong> : Komponen UI terisolasi (TopNavbar, EditorialHero, ThreeDisciplines, FeaturedWorks, ContactSection, AdminDashboardModal, AccessibilityModal, DocsModal)</p>
              <p><strong className="text-amber-600 dark:text-amber-400">src/context/</strong> : State management terpadu (ThemeAndAccessibilityContext & AuthContext)</p>
              <p><strong className="text-amber-600 dark:text-amber-400">src/lib/</strong> : Adapter Supabase hybrid & skrip SQL otomatis</p>
              <p><strong className="text-amber-600 dark:text-amber-400">src/types/</strong> : Definisi tipe TypeScript lengkap</p>
              <p><strong className="text-amber-600 dark:text-amber-400">server.ts</strong> : Backend Express mandiri (rute API kontak, analitik, dan AI Thinking Gemini 4 Argon)</p>
            </div>
          </div>

          {/* Section 2: Supabase Setup */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 font-display font-bold text-neutral-900 dark:text-white text-base">
                <Database className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <h4>2. Menghubungkan Supabase Database Anda</h4>
              </div>
              <button
                onClick={handleCopySql}
                className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono rounded-lg bg-stone-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white border border-stone-200 dark:border-neutral-700 transition-colors"
              >
                {copiedSql ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSql ? 'SQL Tersalin' : 'Salin SQL Schema'}</span>
              </button>
            </div>
            <p className="text-neutral-500 dark:text-neutral-400 mb-3">
              Langkah cepat menghubungkan akun Supabase yang sudah Anda miliki:
            </p>
            <ol className="list-decimal list-inside space-y-1.5 text-xs sm:text-sm pl-2">
              <li>Buka dashboard proyek Anda di <span className="font-mono text-amber-600 dark:text-amber-400">supabase.com</span>.</li>
              <li>Masuk ke menu <strong>SQL Editor</strong>, klik <strong>New Query</strong>, lalu tempel (paste) skrip SQL di bawah dan tekan <strong>RUN</strong>.</li>
              <li>Buka menu <strong>Project Settings &gt; API</strong> di Supabase untuk menyalin <em>Project URL</em> dan <em>anon public key</em>.</li>
              <li>Di website ini, buka <strong>Panel Pemilik &gt; Integrasi Supabase</strong> dan masukkan URL serta Anon Key Anda. Sistem akan langsung tersinkron!</li>
            </ol>

            <div className="mt-3 p-4 rounded-2xl bg-neutral-950 text-neutral-200 font-mono text-xs overflow-x-auto max-h-48 border border-neutral-800">
              <pre>{SUPABASE_SQL_SCHEMA}</pre>
            </div>
          </div>

          {/* Section 3: Contact Email Integration */}
          <div>
            <div className="flex items-center gap-2 font-display font-bold text-neutral-900 dark:text-white text-base mb-2">
              <Mail className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <h4>3. Integrasi Kontak Email Langsung</h4>
            </div>
            <p className="text-neutral-500 dark:text-neutral-400">
              Setiap kali formulir dikirimkan oleh pengunjung:
            </p>
            <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm pl-2 mt-1">
              <li>Endpoint <code className="font-mono text-amber-600 dark:text-amber-400">POST /api/contact</code> mencatat data pesan ke memori/database.</li>
              <li>Tersimpan secara instan di database Supabase / cache lokal terenkripsi.</li>
              <li>Sistem secara otomatis menyiapkan forward dan tautan <code className="font-mono text-amber-600 dark:text-amber-400">mailto:abahahawrp@gmail.com</code> sehingga pesan dapat langsung Anda terima dan balas seketika.</li>
            </ul>
          </div>

        </div>

        {/* Footer */}
        <div className="flex justify-end pt-4 border-t border-stone-200 dark:border-neutral-800">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-white bg-neutral-900 dark:bg-neutral-100 dark:text-neutral-900 rounded-xl hover:bg-neutral-800 transition-colors"
          >
            Tutup Dokumentasi
          </button>
        </div>
      </div>
    </div>
  );
};
