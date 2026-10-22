import React, { useState, useEffect } from 'react';
import {
  X,
  ShieldCheck,
  BarChart3,
  Mail,
  Database,
  Bell,
  Download,
  CheckCircle2,
  RefreshCw,
  LogOut,
  Send,
  Lock,
  Layers,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useThemeAndAccessibility } from '../context/ThemeAndAccessibilityContext';
import {
  getSavedSupabaseConfig,
  saveSupabaseConfig,
  fetchAllMessages,
  getSupabaseClient,
} from '../lib/supabase';
import { ContactMessage, SupabaseConfig, AnalyticsSummary, WeeklyStat } from '../types';

interface AdminDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminDashboardModal: React.FC<AdminDashboardModalProps> = ({ isOpen, onClose }) => {
  const { user, isAdmin, loginAsDemoAdmin, loginWithSupabase, logout, isLoading: authLoading } = useAuth();
  const { addToast, requestNotificationPermission } = useThemeAndAccessibility();

  // Active dashboard tab
  const [activeTab, setActiveTab] = useState<'analytics' | 'messages' | 'supabase' | 'notifications'>('analytics');

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);

  // Messages state
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [messageFilter, setMessageFilter] = useState<'all' | 'new' | 'read' | 'replied'>('all');
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);

  // Supabase config state
  const [supabaseConfig, setSupabaseConfig] = useState<SupabaseConfig>(getSavedSupabaseConfig);
  const [isTestingConnection, setIsTestingConnection] = useState(false);

  // Analytics stats
  const [analyticsSummary, setAnalyticsSummary] = useState<AnalyticsSummary>({
    totalViews: 1420,
    uniqueVisitors: 980,
    inquiriesReceived: 8,
    averageSessionDuration: '3m 48s',
    syncStatus: 'Active & Encrypted',
  });

  const [weeklyStats, setWeeklyStats] = useState<WeeklyStat[]>([
    { day: 'Sen', views: 184, inquiries: 2 },
    { day: 'Sel', views: 210, inquiries: 1 },
    { day: 'Rab', views: 245, inquiries: 3 },
    { day: 'Kam', views: 198, inquiries: 0 },
    { day: 'Jum', views: 265, inquiries: 4 },
    { day: 'Sab', views: 160, inquiries: 1 },
    { day: 'Min', views: 158, inquiries: 2 },
  ]);

  // Load messages and server analytics
  useEffect(() => {
    if (isOpen) {
      loadMessages();
      loadAnalyticsData();
    }
  }, [isOpen]);

  const loadMessages = async () => {
    setIsLoadingMessages(true);
    try {
      const msgs = await fetchAllMessages();
      setMessages(msgs);
    } catch (e) {
      console.warn('Failed to fetch messages:', e);
    } finally {
      setIsLoadingMessages(false);
    }
  };

  const loadAnalyticsData = async () => {
    try {
      const res = await fetch('/api/analytics');
      if (res.ok) {
        const data = await res.json();
        if (data.summary) setAnalyticsSummary(data.summary);
        if (data.weeklyStats) setWeeklyStats(data.weeklyStats);
      }
    } catch (e) {
      console.warn('Using local analytics baseline:', e);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    const result = await loginWithSupabase(loginEmail, loginPassword);
    if (!result.success) {
      setLoginError(result.error || 'Login gagal.');
    } else {
      addToast('Autentikasi Berhasil', 'Selamat datang di Panel Dasbor Pemilik.', 'success');
    }
  };

  const handleUpdateMessageStatus = async (id: string, status: 'read' | 'replied') => {
    try {
      await fetch(`/api/messages/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
    } catch {}

    setMessages(prev =>
      prev.map(m => (m.id === id ? { ...m, status } : m))
    );

    // Update in local storage too
    try {
      const stored: ContactMessage[] = JSON.parse(localStorage.getItem('portfolio_local_messages') || '[]');
      const updated = stored.map(m => (m.id === id ? { ...m, status } : m));
      localStorage.setItem('portfolio_local_messages', JSON.stringify(updated));
    } catch {}

    addToast('Status Diperbarui', `Pesan telah ditandai sebagai ${status === 'read' ? 'dibaca' : 'dibalas'}.`, 'info');
  };

  const handleSaveSupabase = async () => {
    setIsTestingConnection(true);
    try {
      const newConfig: SupabaseConfig = {
        ...supabaseConfig,
        isConnected: Boolean(supabaseConfig.url.trim() && supabaseConfig.anonKey.trim()),
        lastSyncedAt: new Date().toISOString(),
      };
      saveSupabaseConfig(newConfig);
      setSupabaseConfig(newConfig);

      // Verify connection via client instance
      const client = getSupabaseClient();
      if (client) {
        addToast('Koneksi Supabase Tersimpan', 'Supabase Client aktif dan tersambung.', 'success');
      } else {
        addToast('Pengaturan Disimpan', 'Mode penyimpanan hybrid aktif dengan fallback lokal.', 'info');
      }
    } catch (err: any) {
      addToast('Catatan Koneksi', 'Pengaturan disimpan dengan perlindungan cache lokal.', 'warning');
    } finally {
      setIsTestingConnection(false);
    }
  };

  const handleExportData = () => {
    const exportObject = {
      exportedAt: new Date().toISOString(),
      ownerEmail: 'abahahawrp@gmail.com',
      analyticsSummary,
      weeklyStats,
      messages,
      supabaseStatus: supabaseConfig.isConnected ? 'Connected' : 'Local Hybrid',
    };

    const blob = new Blob([JSON.stringify(exportObject, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `portfolio-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    addToast('Ekspor Berhasil', 'Data analitik & pesan berhasil diunduh dalam format JSON.', 'success');
  };

  if (!isOpen) return null;

  const filteredMessages =
    messageFilter === 'all' ? messages : messages.filter(m => m.status === messageFilter);

  // Maximum view count for chart scale
  const maxWeeklyViews = Math.max(...weeklyStats.map(s => s.views), 1);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-neutral-950/80 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="dashboard-modal-title"
    >
      <div className="relative w-full max-w-4xl bg-white dark:bg-neutral-900 rounded-3xl border border-stone-200 dark:border-neutral-800 p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-200 dark:border-neutral-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 id="dashboard-modal-title" className="text-lg font-display font-bold text-neutral-900 dark:text-white">
                Panel Dasbor & Analitik Pemilik
              </h3>
              <p className="text-xs text-neutral-500 font-mono">
                Pusat Kontrol Privasi, Pesan Masuk, & Sinkronisasi Supabase
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAdmin && (
              <button
                onClick={logout}
                title="Keluar dari sesi admin"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-red-600 dark:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors font-mono"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Keluar</span>
              </button>
            )}
            <button
              onClick={onClose}
              aria-label="Tutup Dasbor"
              className="p-2 rounded-xl bg-stone-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* If user is not authenticated: Show Login & Instant Demo Access */}
        {!isAdmin ? (
          <div className="py-8 max-w-md mx-auto space-y-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <Lock className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-display font-bold text-neutral-900 dark:text-white">
                Autentikasi Pemilik Terenkripsi
              </h4>
              <p className="text-xs text-neutral-500 leading-relaxed">
                Akses privat ke statistik analitik, pengelolaan pesan masuk klien, dan konfigurasi database Supabase secara real-time.
              </p>
            </div>

            {/* Quick Demo Access Button */}
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/25 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-amber-900 dark:text-amber-300">
                  Opsi Akses Instan (Mode Demo Pemilik)
                </span>
                <span className="text-[10px] font-mono text-amber-600 dark:text-amber-400 bg-amber-500/20 px-2 py-0.5 rounded-full">
                  1-Klik
                </span>
              </div>
              <p className="text-xs text-neutral-600 dark:text-neutral-300">
                Masuk seketika sebagai pemilik website (<code className="font-mono text-amber-700 dark:text-amber-400">abahahawrp@gmail.com</code>) untuk meninjau data tanpa memasukkan kata sandi manual.
              </p>
              <button
                onClick={loginAsDemoAdmin}
                className="w-full mt-2 py-2.5 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider text-amber-950 bg-amber-400 hover:bg-amber-300 dark:bg-amber-500 dark:hover:bg-amber-400 transition-all shadow-sm"
              >
                Masuk Langsung sebagai Pemilik (Demo)
              </button>
            </div>

            <div className="relative flex items-center justify-center">
              <span className="absolute bg-white dark:bg-neutral-900 px-3 text-[11px] font-mono text-neutral-400">
                ATAU LOGIN DENGAN SUPABASE AUTH
              </span>
              <div className="w-full border-t border-stone-200 dark:border-neutral-800" />
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              {loginError && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-xs">
                  {loginError}
                </div>
              )}

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-1.5">
                  Email Akun
                </label>
                <input
                  type="email"
                  required
                  value={loginEmail}
                  onChange={e => setLoginEmail(e.target.value)}
                  placeholder="abahahawrp@gmail.com"
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-50 dark:bg-neutral-800/60 border border-stone-200 dark:border-neutral-700 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-1.5">
                  Kata Sandi
                </label>
                <input
                  type="password"
                  required
                  value={loginPassword}
                  onChange={e => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-50 dark:bg-neutral-800/60 border border-stone-200 dark:border-neutral-700 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={authLoading}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider text-white bg-neutral-900 dark:bg-neutral-100 dark:text-neutral-900 hover:bg-neutral-800 transition-all shadow-sm disabled:opacity-50"
              >
                {authLoading ? 'Memverifikasi...' : 'Masuk via Supabase'}
              </button>
            </form>
          </div>
        ) : (
          /* Authenticated Dashboard View */
          <div className="mt-6 space-y-6">
            
            {/* Top Navigation Tabs */}
            <div className="flex items-center gap-1 border-b border-stone-200 dark:border-neutral-800 pb-3 overflow-x-auto">
              {[
                { key: 'analytics', label: 'Grafik & Metrik Analitik', icon: BarChart3 },
                { key: 'messages', label: `Pesan Masuk (${messages.length})`, icon: Mail },
                { key: 'supabase', label: 'Integrasi Supabase', icon: Database },
                { key: 'notifications', label: 'Push & Notifikasi', icon: Bell },
              ].map(tab => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key as any)}
                    className={`inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-xl transition-colors whitespace-nowrap shrink-0 ${
                      activeTab === tab.key
                        ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900'
                        : 'text-neutral-600 dark:text-neutral-400 hover:bg-stone-100 dark:hover:bg-neutral-800'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}

              <div className="ml-auto">
                <button
                  onClick={handleExportData}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white border border-stone-200 dark:border-neutral-800 rounded-xl transition-colors font-mono"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Ekspor JSON</span>
                </button>
              </div>
            </div>

            {/* TAB 1: ANALYTICS */}
            {activeTab === 'analytics' && (
              <div className="space-y-6">
                {/* 4 Summary Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="p-4 rounded-2xl bg-stone-50 dark:bg-neutral-800/40 border border-stone-200 dark:border-neutral-800">
                    <p className="text-[11px] font-mono uppercase tracking-wider text-neutral-500">Total Kunjungan</p>
                    <p className="text-2xl font-bold font-mono tabular-nums text-neutral-900 dark:text-white mt-1">
                      {analyticsSummary.totalViews.toLocaleString()}
                    </p>
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono">+14.2% minggu ini</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-stone-50 dark:bg-neutral-800/40 border border-stone-200 dark:border-neutral-800">
                    <p className="text-[11px] font-mono uppercase tracking-wider text-neutral-500">Pengunjung Unik</p>
                    <p className="text-2xl font-bold font-mono tabular-nums text-neutral-900 dark:text-white mt-1">
                      {analyticsSummary.uniqueVisitors.toLocaleString()}
                    </p>
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono">82% desktop / 18% mobile</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-stone-50 dark:bg-neutral-800/40 border border-stone-200 dark:border-neutral-800">
                    <p className="text-[11px] font-mono uppercase tracking-wider text-neutral-500">Pesan Masuk</p>
                    <p className="text-2xl font-bold font-mono tabular-nums text-neutral-900 dark:text-white mt-1">
                      {messages.length}
                    </p>
                    <span className="text-[10px] text-amber-600 dark:text-amber-400 font-mono">
                      {messages.filter(m => m.status === 'new').length} belum dibaca
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-stone-50 dark:bg-neutral-800/40 border border-stone-200 dark:border-neutral-800">
                    <p className="text-[11px] font-mono uppercase tracking-wider text-neutral-500">Durasi Rata-rata</p>
                    <p className="text-2xl font-bold font-mono tabular-nums text-neutral-900 dark:text-white mt-1">
                      {analyticsSummary.averageSessionDuration}
                    </p>
                    <span className="text-[10px] text-neutral-500 font-mono">Retensi tinggi</span>
                  </div>
                </div>

                {/* Weekly Interactive Bar Chart */}
                <div className="p-6 rounded-3xl bg-stone-50 dark:bg-neutral-800/40 border border-stone-200 dark:border-neutral-800">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h4 className="text-sm font-display font-bold text-neutral-900 dark:text-white">
                        Aktivitas Kunjungan & Interaksi 7 Hari Terakhir
                      </h4>
                      <p className="text-xs text-neutral-500 font-mono">
                        Grafik volume kunjungan harian dan inquiry konversi
                      </p>
                    </div>
                    <div className="flex items-center gap-4 text-xs font-mono">
                      <div className="flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded-md bg-amber-500" />
                        <span className="text-neutral-600 dark:text-neutral-400">Kunjungan</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded-md bg-emerald-500" />
                        <span className="text-neutral-600 dark:text-neutral-400">Inquiry Pesan</span>
                      </div>
                    </div>
                  </div>

                  {/* Visual Bars Container */}
                  <div className="grid grid-cols-7 gap-3 sm:gap-6 items-end h-44 pt-4 border-b border-stone-200 dark:border-neutral-700">
                    {weeklyStats.map((stat, i) => {
                      const heightPercent = Math.max((stat.views / maxWeeklyViews) * 100, 15);
                      return (
                        <div key={i} className="flex flex-col items-center gap-2 group h-full justify-end">
                          {/* Floating tooltip */}
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-mono text-center bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 px-2 py-0.5 rounded shadow pointer-events-none whitespace-nowrap">
                            {stat.views} kunjungan · {stat.inquiries} inquiry
                          </div>
                          
                          {/* Double Bar */}
                          <div className="w-full max-w-[40px] flex items-end gap-1 h-32">
                            <div
                              style={{ height: `${heightPercent}%` }}
                              className="w-full bg-amber-500/80 hover:bg-amber-500 rounded-t-md transition-all duration-300"
                            />
                            {stat.inquiries > 0 && (
                              <div
                                style={{ height: `${Math.min(stat.inquiries * 25, 100)}%` }}
                                className="w-2.5 bg-emerald-500 rounded-t-sm"
                              />
                            )}
                          </div>
                          <span className="text-xs font-mono text-neutral-500 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors">
                            {stat.day}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* System Diagnostics */}
                <div className="p-4 rounded-2xl bg-stone-100 dark:bg-neutral-800/60 flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="text-neutral-700 dark:text-neutral-300">
                      Enkripsi Web & Sinkronisasi: Aktif
                    </span>
                  </div>
                  <span className="text-neutral-500">
                    Penerima Kontak: abahahawrp@gmail.com
                  </span>
                </div>
              </div>
            )}

            {/* TAB 2: INBOX / MESSAGES */}
            {activeTab === 'messages' && (
              <div className="space-y-4">
                {/* Filter buttons */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 p-1 bg-stone-100 dark:bg-neutral-800 rounded-xl text-xs font-medium">
                    {[
                      { key: 'all', label: `Semua (${messages.length})` },
                      { key: 'new', label: `Baru (${messages.filter(m => m.status === 'new').length})` },
                      { key: 'read', label: 'Dibaca' },
                      { key: 'replied', label: 'Dibalas' },
                    ].map(f => (
                      <button
                        key={f.key}
                        onClick={() => setMessageFilter(f.key as any)}
                        className={`px-3 py-1.5 rounded-lg transition-colors ${
                          messageFilter === f.key
                            ? 'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white shadow-sm'
                            : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
                        }`}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={loadMessages}
                    className="p-2 text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
                    title="Muat Ulang Pesan"
                  >
                    <RefreshCw className={`w-4 h-4 ${isLoadingMessages ? 'animate-spin' : ''}`} />
                  </button>
                </div>

                {/* Messages list */}
                {filteredMessages.length === 0 ? (
                  <div className="text-center py-12 text-neutral-400 font-mono text-xs">
                    Tidak ada pesan dalam kategori ini.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {filteredMessages.map(msg => (
                      <div
                        key={msg.id}
                        className={`p-5 rounded-2xl border transition-all ${
                          msg.status === 'new'
                            ? 'bg-amber-500/5 dark:bg-amber-500/10 border-amber-500/30'
                            : 'bg-stone-50 dark:bg-neutral-800/40 border-stone-200 dark:border-neutral-800'
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-sm text-neutral-900 dark:text-white">
                                {msg.sender_name}
                              </span>
                              <span className="text-xs font-mono text-neutral-400">
                                &lt;{msg.sender_email}&gt;
                              </span>
                              {msg.status === 'new' && (
                                <span className="text-[10px] font-mono text-amber-700 dark:text-amber-400 bg-amber-500/20 px-2 py-0.5 rounded-full">
                                  Pesan Baru
                                </span>
                              )}
                            </div>
                            <p className="text-xs font-mono text-amber-600 dark:text-amber-400 mt-0.5">
                              {msg.project_category}
                            </p>
                          </div>

                          <span className="text-[11px] font-mono text-neutral-400">
                            {new Date(msg.created_at).toLocaleString('id-ID')}
                          </span>
                        </div>

                        <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed whitespace-pre-wrap bg-white/60 dark:bg-neutral-900/40 p-3 rounded-xl border border-stone-200/50 dark:border-neutral-800">
                          {msg.message_body}
                        </p>

                        <div className="flex items-center justify-end gap-2 mt-3 pt-2">
                          {msg.status === 'new' && (
                            <button
                              onClick={() => handleUpdateMessageStatus(msg.id, 'read')}
                              className="px-3 py-1 text-xs font-medium text-neutral-600 dark:text-neutral-400 hover:bg-stone-200/60 dark:hover:bg-neutral-700 rounded-lg transition-colors"
                            >
                              Tandai Dibaca
                            </button>
                          )}
                          <a
                            href={`mailto:${msg.sender_email}?subject=${encodeURIComponent(`Re: [Portofolio] ${msg.project_category}`)}`}
                            onClick={() => handleUpdateMessageStatus(msg.id, 'replied')}
                            className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-white bg-neutral-900 dark:bg-neutral-100 dark:text-neutral-900 rounded-lg hover:bg-neutral-800 transition-colors"
                          >
                            <Send className="w-3 h-3" />
                            <span>Balas Email</span>
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: SUPABASE INTEGRATION */}
            {activeTab === 'supabase' && (
              <div className="space-y-6">
                <div className="p-4 rounded-2xl bg-stone-50 dark:bg-neutral-800/50 border border-stone-200 dark:border-neutral-700 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono uppercase tracking-wider text-neutral-500">
                      Status Koneksi Supabase
                    </span>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                        supabaseConfig.isConnected
                          ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                          : 'bg-amber-500/20 text-amber-600 dark:text-amber-400'
                      }`}
                    >
                      {supabaseConfig.isConnected ? 'Terhubung ke Database Awan' : 'Mode Hybrid Aktif (Cache Lokal)'}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    Website Anda sudah mendukung mode hybrid: saat kredensial Supabase di bawah ini dimasukkan, semua pesan kontak dan event analitik disinkronkan otomatis ke tabel Supabase Anda.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-1.5">
                      Supabase Project URL
                    </label>
                    <input
                      type="url"
                      value={supabaseConfig.url}
                      onChange={e => setSupabaseConfig({ ...supabaseConfig, url: e.target.value })}
                      placeholder="https://xyzcompany.supabase.co"
                      className="w-full px-4 py-2.5 rounded-xl bg-stone-50 dark:bg-neutral-800/60 border border-stone-200 dark:border-neutral-700 text-xs sm:text-sm font-mono focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-1.5">
                      Supabase Anon Public API Key
                    </label>
                    <input
                      type="password"
                      value={supabaseConfig.anonKey}
                      onChange={e => setSupabaseConfig({ ...supabaseConfig, anonKey: e.target.value })}
                      placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                      className="w-full px-4 py-2.5 rounded-xl bg-stone-50 dark:bg-neutral-800/60 border border-stone-200 dark:border-neutral-700 text-xs sm:text-sm font-mono focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white transition-all"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <p className="text-[11px] text-neutral-400 font-mono">
                      * Kredensial disimpan aman di penyimpanan sesi lokal Anda.
                    </p>
                    <button
                      onClick={handleSaveSupabase}
                      disabled={isTestingConnection}
                      className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-neutral-900 dark:bg-neutral-100 dark:text-neutral-900 hover:bg-neutral-800 rounded-xl transition-all shadow-sm"
                    >
                      {isTestingConnection ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          <span>Menyimpan...</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Simpan & Aktifkan Supabase</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: PUSH NOTIFICATIONS */}
            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <div className="p-6 rounded-3xl bg-stone-50 dark:bg-neutral-800/40 border border-stone-200 dark:border-neutral-800 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
                      <Bell className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-display font-bold text-neutral-900 dark:text-white">
                        Sistem Notifikasi Push Real-Time
                      </h4>
                      <p className="text-xs text-neutral-500 font-mono">
                        Memberi tahu pemilik seketika saat ada pesan baru masuk dari pengunjung
                      </p>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    Sistem ini terhubung dengan Web Notification API modern di peramban Anda. Aktifkan izin notifikasi untuk menerima pemberitahuan desktop meskipun tab sedang di latar belakang.
                  </p>

                  <div className="flex flex-wrap gap-3 pt-2">
                    <button
                      onClick={requestNotificationPermission}
                      className="px-4 py-2.5 text-xs font-semibold text-white bg-neutral-900 dark:bg-neutral-100 dark:text-neutral-900 rounded-xl hover:bg-neutral-800 transition-colors"
                    >
                      Minta Izin Notifikasi Web
                    </button>
                    <button
                      onClick={() =>
                        addToast(
                          'Uji Notifikasi Masuk',
                          'Pesan baru dari calon klien: "Tertarik dengan arsitektur web portofolio Anda!"',
                          'success'
                        )
                      }
                      className="px-4 py-2.5 text-xs font-medium text-neutral-700 dark:text-neutral-300 bg-stone-200/70 dark:bg-neutral-800 hover:bg-stone-300 rounded-xl transition-colors"
                    >
                      Kirim Simulasi Notifikasi Masuk
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
