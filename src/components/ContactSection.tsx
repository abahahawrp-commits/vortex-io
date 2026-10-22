import React, { useState } from 'react';
import { Send, Mail, CheckCircle2, AlertCircle, Sparkles, Loader2, ArrowRight } from 'lucide-react';
import { syncContactMessage } from '../lib/supabase';
import { ContactMessage } from '../types';
import { useThemeAndAccessibility } from '../context/ThemeAndAccessibilityContext';

interface ContactSectionProps {
  onOpenConsultation: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenConsultation }) => {
  const { addToast } = useThemeAndAccessibility();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'UI/UX & Desain Kreatif',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState<ContactMessage | null>(null);
  const [mailtoUrl, setMailtoUrl] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const categories = [
    'UI/UX & Desain Kreatif',
    'Arsitektur Web Full-Stack',
    'Pengembangan Sistem Supabase',
    'Audit Performa & Aksesibilitas',
    'Konsultasi Strategis Umum',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMsg('Mohon isi semua kolom yang diperlukan.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg(null);

    const messageRecord: ContactMessage = {
      id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      sender_name: formData.name.trim(),
      sender_email: formData.email.trim(),
      project_category: formData.category,
      message_body: formData.message.trim(),
      status: 'new',
      created_at: new Date().toISOString(),
    };

    try {
      // 1. Submit to local Express backend API
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Gagal mengirim pesan ke server.');
      }

      // 2. Synchronize with Supabase & Local Cache
      await syncContactMessage(messageRecord);

      // 3. Prepare direct mailto URL to abahahawrp@gmail.com
      const targetEmail = 'abahahawrp@gmail.com';
      const mailSubject = encodeURIComponent(`[Inquiry Portofolio] ${formData.category} - ${formData.name}`);
      const mailBody = encodeURIComponent(
        `Halo Samuel,\n\nNama: ${formData.name}\nEmail: ${formData.email}\nKategori: ${formData.category}\n\nPesan Proyek:\n${formData.message}\n\nDikirim melalui formulir website personal.`
      );
      const generatedMailto = `mailto:${targetEmail}?subject=${mailSubject}&body=${mailBody}`;

      setMailtoUrl(data.directMailtoUrl || generatedMailto);
      setSubmittedMessage(messageRecord);
      addToast('Pesan Berhasil Terkirim', 'Pesan Anda telah disimpan dan diteruskan ke email pemilik.', 'success');

      // Reset form fields
      setFormData({
        name: '',
        email: '',
        category: 'UI/UX & Desain Kreatif',
        message: '',
      });
    } catch (err: any) {
      console.warn('Backend API note:', err);
      // Fallback: Save directly via Supabase sync adapter and prepare client mailto
      await syncContactMessage(messageRecord);

      const targetEmail = 'abahahawrp@gmail.com';
      const mailSubject = encodeURIComponent(`[Inquiry Portofolio] ${formData.category} - ${formData.name}`);
      const mailBody = encodeURIComponent(
        `Halo Samuel,\n\nNama: ${formData.name}\nEmail: ${formData.email}\nKategori: ${formData.category}\n\nPesan:\n${formData.message}`
      );
      setMailtoUrl(`mailto:${targetEmail}?subject=${mailSubject}&body=${mailBody}`);
      setSubmittedMessage(messageRecord);
      addToast('Tersimpan di Sistem', 'Pesan disimpan di database & siap dikirim via email.', 'success');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="kontak" className="w-full py-16 px-4 sm:px-6 lg:px-8 border-t border-stone-200/70 dark:border-neutral-800/70">
      <div className="max-w-6xl mx-auto">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Info & AI Consultation Pitch */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] font-mono text-amber-600 dark:text-amber-400 mb-2">
                Jalur Komunikasi Langsung
              </p>
              <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight text-neutral-900 dark:text-white">
                Mulai Diskusi Proyek
              </h2>
            </div>

            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Setiap karya hebat dimulai dari percakapan jujur mengenai tujuan, nilai estetika, dan ekspektasi teknis. Kirimkan pesan melalui formulir ini untuk diteruskan langsung ke kotak masuk email saya di <span className="font-mono text-neutral-900 dark:text-white font-semibold">abahahawrp@gmail.com</span>.
            </p>

            {/* Email Direct Contact Card */}
            <div className="p-6 rounded-3xl bg-white/70 dark:bg-neutral-900/60 border border-stone-200/80 dark:border-neutral-800/80 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                    Alamat Email Utama
                  </p>
                  <a
                    href="mailto:abahahawrp@gmail.com"
                    className="text-sm font-semibold text-neutral-900 dark:text-white hover:text-amber-600 dark:hover:text-amber-400 transition-colors font-mono"
                  >
                    abahahawrp@gmail.com
                  </a>
                </div>
              </div>

              <div className="pt-4 border-t border-stone-200/60 dark:border-neutral-800/60 text-xs text-neutral-500 space-y-1">
                <p>· Waktu respon rata-rata: &lt; 24 jam kerja</p>
                <p>· Berbasis di Jakarta, Indonesia (WIB / GMT+7)</p>
                <p>· Tersedia untuk kontrak remote internasional & lokal</p>
              </div>
            </div>

            {/* High Thinking AI Assistant Card */}
            <div className="p-6 rounded-3xl bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/20 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                  <Sparkles className="w-4 h-4" />
                  <span>AI Thinking Assistant</span>
                </div>
                <span className="text-[10px] font-mono text-amber-600/80 dark:text-amber-400/80 border border-amber-500/30 px-2 py-0.5 rounded-full">
                  Gemini 4 Argon
                </span>
              </div>
              <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                Belum yakin dengan arsitektur teknis atau anggaran proyek Anda? Jalankan konsultasi penalaran tinggi dengan model AI kami untuk mendapatkan rincian roadmap dan estimasi strategi instan.
              </p>
              <button
                onClick={onOpenConsultation}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold text-amber-950 bg-amber-400 hover:bg-amber-300 dark:bg-amber-500 dark:hover:bg-amber-400 rounded-xl transition-all shadow-sm"
              >
                <span>Mulai Konsultasi Cerdas</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-white/80 dark:bg-neutral-900/60 border border-stone-200/80 dark:border-neutral-800/80 shadow-sm backdrop-blur-sm">
              
              {submittedMessage ? (
                <div className="space-y-6 py-4 text-center">
                  <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-display font-bold text-neutral-900 dark:text-white mb-2">
                      Pesan Anda Berhasil Dicatat!
                    </h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-md mx-auto leading-relaxed">
                      Terima kasih, <strong className="text-neutral-900 dark:text-white">{submittedMessage.sender_name}</strong>. Pesan Anda telah tersimpan dengan aman di database dan siap ditindaklanjuti.
                    </p>
                  </div>

                  {/* Direct mail client dispatch */}
                  <div className="p-4 rounded-2xl bg-stone-50 dark:bg-neutral-800/60 border border-stone-200 dark:border-neutral-700/60 text-left space-y-2">
                    <p className="text-xs font-semibold text-neutral-800 dark:text-neutral-200">
                      Ingin membuka langsung di aplikasi email (Gmail / Outlook / Apple Mail)?
                    </p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                      Klik tombol di bawah untuk membuka draf pesan siap kirim langsung ke <code className="text-amber-600 dark:text-amber-400">abahahawrp@gmail.com</code>.
                    </p>
                    <div className="pt-2">
                      <a
                        href={mailtoUrl}
                        className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-white bg-neutral-900 dark:bg-neutral-100 dark:text-neutral-900 hover:bg-neutral-800 rounded-xl transition-colors"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>Buka Email Sekarang</span>
                      </a>
                    </div>
                  </div>

                  <button
                    onClick={() => setSubmittedMessage(null)}
                    className="text-xs font-medium text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors underline underline-offset-4"
                  >
                    Kirim Pesan Lain
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {errorMsg && (
                    <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-xs">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="input-name" className="block text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-2">
                        Nama Lengkap *
                      </label>
                      <input
                        id="input-name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Contoh: Pratama Wicaksana"
                        className="w-full px-4 py-2.5 rounded-xl bg-stone-50/70 dark:bg-neutral-800/50 border border-stone-200 dark:border-neutral-700 text-neutral-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white transition-all"
                      />
                    </div>

                    <div>
                      <label htmlFor="input-email" className="block text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-2">
                        Email Anda *
                      </label>
                      <input
                        id="input-email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        placeholder="nama@perusahaan.com"
                        className="w-full px-4 py-2.5 rounded-xl bg-stone-50/70 dark:bg-neutral-800/50 border border-stone-200 dark:border-neutral-700 text-neutral-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="input-category" className="block text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-2">
                      Fokus / Kategori Proyek
                    </label>
                    <select
                      id="input-category"
                      value={formData.category}
                      onChange={e => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-stone-50/70 dark:bg-neutral-800/50 border border-stone-200 dark:border-neutral-700 text-neutral-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white transition-all"
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="input-message" className="block text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-2">
                      Rincian Kebutuhan atau Ide Proyek *
                    </label>
                    <textarea
                      id="input-message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Jelaskan secara ringkas visi proyek Anda, estimasi waktu, atau tantangan desain dan teknologi yang ingin Anda selesaikan..."
                      className="w-full px-4 py-3 rounded-xl bg-stone-50/70 dark:bg-neutral-800/50 border border-stone-200 dark:border-neutral-700 text-neutral-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white transition-all resize-y"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <p className="text-[11px] text-neutral-400 font-mono">
                      * Terenkripsi & diteruskan langsung ke email pemilik
                    </p>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-xs uppercase tracking-wider text-white bg-neutral-900 dark:bg-neutral-100 dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-all shadow-md disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Mengirim...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Kirim Pesan Sekarang</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
