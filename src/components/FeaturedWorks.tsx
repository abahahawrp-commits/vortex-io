import React, { useState } from 'react';
import { Project } from '../types';
import { ExternalLink, X, ArrowUpRight, Sparkles } from 'lucide-react';

export const FeaturedWorks: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      id: 'work-1',
      title: 'Aethelgard Monolith & Editorial Archive',
      subtitle: 'Platform Portofolio & Jurnal Desain Arsitektural',
      category: 'Design',
      year: '2025',
      client: 'Atelier Monolith International',
      impact: '+180% Engagement Waktu Baca & 4 Penghargaan Desain Web',
      description:
        'Sistem publikasi web bertema editorial monoline yang mengadopsi tipografi asimetris, pengindeksan digital responsif, serta rendering performa tinggi tanpa lag. Dirancang untuk menghadirkan pengalaman membaca layaknya majalah cetak mewah di layar digital.',
      tags: ['Editorial Direction', 'React', 'Tailwind CSS', 'Fluid Typography'],
      image: '/assets/aistudio/image_f92b4bb4.png',
      aspect: 'col-span-1 lg:col-span-2',
    },
    {
      id: 'work-2',
      title: 'Vortex Capital Real-Time Analytics',
      subtitle: 'Dasbor Finansial & Sinkronisasi Data Awan',
      category: 'Engineering',
      year: '2025',
      client: 'Vortex Asset Management',
      impact: 'Latensi Sinkronisasi < 60ms & 25.000 Transaksi/Detik',
      description:
        'Aplikasi analitik keuangan enterprise dengan integrasi database Supabase real-time, grafik performa tabular terakselerasi GPU, dan sistem enkripsi data ujung-ke-ujung (E2EE) untuk trader profesional.',
      tags: ['Supabase Live', 'TypeScript', 'Data Visualization', 'E2EE Auth'],
      image: '/assets/aistudio/Gemini_Generated_Image_k4jo3dk4jo3dk4jo_8bf28cf4.jpg',
      aspect: 'col-span-1',
    },
    {
      id: 'work-3',
      title: 'Sankara Spatial Audio System',
      subtitle: 'Antarmuka Kontrol Tata Suara & Pengalaman Pengguna',
      category: 'Product UI/UX',
      year: '2026',
      client: 'Sankara Acoustics',
      impact: 'Peningkatan Adopsi Pengguna +310% dalam 90 Hari',
      description:
        'Redesain holistik ekosistem kontrol audio multi-ruangan cerdas. Menghadirkan navigasi berbasis gestur sentuhan mikro yang responsif, visualisasi medan suara 3D, serta kepatuhan standar aksesibilitas WCAG AA.',
      tags: ['Design Systems', 'Spatial Audio UX', 'Micro-Interactions', 'WCAG AA'],
      image: '/assets/aistudio/image_f92b4bb4.png',
      aspect: 'col-span-1',
    },
    {
      id: 'work-4',
      title: 'Kinetix Studio Cloud Engine',
      subtitle: 'Arsitektur Multi-Penyewa & Kolaborasi Real-Time',
      category: 'Engineering',
      year: '2026',
      client: 'Kinetix Creative Lab',
      impact: 'Efisiensi Biaya Komputasi Cloud Sebesar 42%',
      description:
        'Pondasi backend cloud hybrid yang menggabungkan edge caching otomatis, otentikasi role-based granular (RBAC), dan pipeline sinkronisasi multi-perangkat tanpa konflik untuk tim kreatif terdistribusi.',
      tags: ['Edge Functions', 'Supabase Storage', 'WebSockets', 'Offline-First'],
      image: '/assets/aistudio/Gemini_Generated_Image_k4jo3dk4jo3dk4jo_8bf28cf4.jpg',
      aspect: 'col-span-1 lg:col-span-2',
    },
  ];

  const filteredProjects =
    activeFilter === 'all'
      ? projects
      : projects.filter(p => p.category.toLowerCase().includes(activeFilter.toLowerCase()));

  return (
    <section id="karya" className="w-full py-16 px-4 sm:px-6 lg:px-8 border-t border-stone-200/70 dark:border-neutral-800/70">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header with Filter Segmented Control */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] font-mono text-amber-600 dark:text-amber-400 mb-2">
              Katalog Pekerjaan Terpilih
            </p>
            <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight text-neutral-900 dark:text-white">
              Studi Kasus & Eksplorasi
            </h2>
          </div>

          {/* Interactive filter buttons (Functional segmented control) */}
          <div className="flex items-center gap-1 p-1 bg-stone-100 dark:bg-neutral-900 rounded-xl border border-stone-200 dark:border-neutral-800 w-fit">
            {[
              { key: 'all', label: 'Semua Karya' },
              { key: 'design', label: 'Desain Editorial' },
              { key: 'engineering', label: 'Rekayasa Software' },
              { key: 'product', label: 'UI/UX Produk' },
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveFilter(tab.key)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 whitespace-nowrap shrink-0 ${
                  activeFilter === tab.key
                    ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-sm'
                    : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Bento Box Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {filteredProjects.map(project => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className={`group cursor-pointer rounded-3xl bg-white/70 dark:bg-neutral-900/50 border border-stone-200/80 dark:border-neutral-800/80 p-6 flex flex-col justify-between hover:border-stone-400 dark:hover:border-neutral-600 transition-all duration-300 ${project.aspect}`}
            >
              <div>
                {/* Media frame */}
                <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden mb-6 bg-stone-100 dark:bg-neutral-800 border border-stone-200/50 dark:border-neutral-700/50">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover object-center filter saturate-[0.9] group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/70 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                  {/* Corner expansion prompt */}
                  <div className="absolute top-3 right-3 p-2 rounded-xl bg-neutral-900/60 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Unboxed Metadata Header (NO PILLS) */}
                <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 dark:text-neutral-500 mb-2">
                  <span>{project.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{project.client}</span>
                  <span aria-hidden="true">·</span>
                  <span>{project.year}</span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-display font-bold text-neutral-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 font-mono mt-1 mb-3">
                  {project.subtitle}
                </p>

                {/* Summary */}
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 line-clamp-2 leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Bottom Tags (Unboxed inline text with separators) */}
              <div className="mt-6 pt-4 border-t border-stone-200/60 dark:border-neutral-800/60 flex items-center justify-between text-xs">
                <span className="font-mono text-amber-600 dark:text-amber-400 text-[11px]">
                  {project.impact}
                </span>
                <span className="text-neutral-400 dark:text-neutral-500 font-mono text-[11px] group-hover:translate-x-1 transition-transform">
                  Detail Studi Kasus →
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Project Lightbox Modal */}
        {selectedProject && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-neutral-950/80 backdrop-blur-md"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-project-title"
          >
            <div className="relative w-full max-w-3xl bg-white dark:bg-neutral-900 rounded-3xl border border-stone-200 dark:border-neutral-800 p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[90vh]">
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                aria-label="Tutup detail proyek"
                className="absolute top-6 right-6 p-2 rounded-xl bg-stone-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Image */}
              <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden mb-6 bg-neutral-950 border border-stone-200 dark:border-neutral-800">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover object-center"
                />
              </div>

              {/* Unboxed Metadata */}
              <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 dark:text-neutral-500 mb-2">
                <span>{selectedProject.category}</span>
                <span aria-hidden="true">·</span>
                <span>Klien: {selectedProject.client}</span>
                <span aria-hidden="true">·</span>
                <span>Tahun: {selectedProject.year}</span>
              </div>

              <h3 id="modal-project-title" className="text-2xl sm:text-3xl font-display font-bold text-neutral-900 dark:text-white mb-2">
                {selectedProject.title}
              </h3>
              <p className="text-sm font-mono text-amber-600 dark:text-amber-400 mb-6">
                {selectedProject.impact}
              </p>

              <div className="space-y-4 text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed border-t border-stone-200/70 dark:border-neutral-800/70 pt-4">
                <p>{selectedProject.description}</p>
                <p>
                  Proyek ini menyeimbangkan efisiensi arsitektur data awan (Supabase), kepatuhan desain responsif, serta waktu respon halaman yang teruji di bawah 100ms. Seluruh komponen dibangun dengan pendekatan modular dan mudah diperluas.
                </p>
              </div>

              {/* Tags & Tech */}
              <div className="mt-6 pt-4 border-t border-stone-200/70 dark:border-neutral-800/70 flex flex-wrap gap-2 text-xs font-mono text-neutral-500">
                <span className="text-neutral-400">Teknologi:</span>
                {selectedProject.tags.map((t, i) => (
                  <span key={t}>
                    {t}
                    {i < selectedProject.tags.length - 1 ? ' ·' : ''}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="mt-8 flex items-center justify-end gap-3">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-4 py-2 text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:bg-stone-100 dark:hover:bg-neutral-800 rounded-xl transition-colors"
                >
                  Tutup
                </button>
                <a
                  href="#kontak"
                  onClick={() => setSelectedProject(null)}
                  className="px-5 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-neutral-900 dark:bg-neutral-100 dark:text-neutral-900 hover:bg-neutral-800 rounded-xl transition-colors"
                >
                  Ajukan Kolaborasi Serupa
                </a>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
