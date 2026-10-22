import React from 'react';
import { Palette, Code2, Layers, ArrowUpRight } from 'lucide-react';

export const ThreeDisciplines: React.FC = () => {
  const disciplines = [
    {
      index: '01',
      title: 'Desain Kreatif & Arahan Seni',
      subtitle: 'Creative Direction & Brand Systems',
      description:
        'Merumuskan identitas visual yang khas dan berkarakter, mengutamakan tipografi berani, hierarki spasial terukur, serta komposisi editorial yang membedakan merek Anda dari kebisingan pasar digital.',
      icon: Palette,
      skills: ['Editorial Art Direction', 'Brand Identity Systems', 'Spatial Composition', 'Motion & Kinetic Typography'],
      metrics: '30+ Identitas Brand & Proyek Kreatif Terkurasi',
    },
    {
      index: '02',
      title: 'Rekayasa Full-Stack & Arsitektur Web',
      subtitle: 'Modern Engineering & Cloud Scale',
      description:
        'Membangun aplikasi web mutakhir dengan React, TypeScript, Tailwind CSS, dan database modern seperti Supabase. Menjamin kinerja rendering instan, keamanan berlapis, serta arsitektur kode yang teruji dan mudah dipelihara.',
      icon: Code2,
      skills: ['React & Next.js Ecosystem', 'TypeScript Rigor', 'Supabase & Relational Data', 'Performance & Accessibility (WCAG)'],
      metrics: '100% Skor Lighthouse Performance & Core Web Vitals',
    },
    {
      index: '03',
      title: 'Desain UI/UX & Strategi Produk',
      subtitle: 'User Experience & Product Thinking',
      description:
        'Mengonversi masalah bisnis yang kompleks menjadi antarmuka digital yang intuitif dan memikat. Mengintegrasikan riset perilaku pengguna, alur navigasi tanpa gesekan, serta design system modular.',
      icon: Layers,
      skills: ['Design Systems at Scale', 'User Journey Mapping', 'Interactive Prototyping', 'Conversion-Driven UX'],
      metrics: 'Rata-rata Peningkatan 2.4x Retensi Pengguna',
    },
  ];

  return (
    <section id="keahlian" className="w-full py-16 px-4 sm:px-6 lg:px-8 border-t border-stone-200/70 dark:border-neutral-800/70">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] font-mono text-amber-600 dark:text-amber-400 mb-2">
              Spektrum Keahlian Terpadu
            </p>
            <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight text-neutral-900 dark:text-white">
              Tiga Pilar Disiplin
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 max-w-md leading-relaxed">
            Menghubungkan estetika murni studio desain kelas dunia dengan ketelitian rekayasa perangkat lunak modern.
          </p>
        </div>

        {/* 3 Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {disciplines.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.index}
                className="group relative p-8 rounded-3xl bg-white/60 dark:bg-neutral-900/40 border border-stone-200/80 dark:border-neutral-800/80 hover:border-stone-400/80 dark:hover:border-neutral-700 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Top Index & Icon */}
                  <div className="flex items-center justify-between mb-8 pb-4 border-b border-stone-200/60 dark:border-neutral-800/60">
                    <span className="font-mono text-sm tracking-wider text-neutral-400 dark:text-neutral-500">
                      {item.index}.
                    </span>
                    <div className="p-2.5 rounded-2xl bg-stone-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 group-hover:bg-amber-500 group-hover:text-white transition-colors duration-300">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-xl font-display font-bold text-neutral-900 dark:text-white leading-snug mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-neutral-400 dark:text-neutral-500 font-mono mb-4">
                    {item.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                {/* Unboxed Metadata (NO PILLS rule strictly followed) */}
                <div className="pt-6 border-t border-stone-200/60 dark:border-neutral-800/60">
                  <p className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mb-2">
                    Kapabilitas Inti:
                  </p>
                  <div className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed flex flex-wrap gap-x-2 gap-y-1">
                    {item.skills.map((skill, sIdx) => (
                      <React.Fragment key={skill}>
                        <span>{skill}</span>
                        {sIdx < item.skills.length - 1 && <span className="text-neutral-300 dark:text-neutral-700 font-mono">·</span>}
                      </React.Fragment>
                    ))}
                  </div>

                  <div className="mt-4 pt-3 flex items-center justify-between text-[11px] font-mono text-amber-600 dark:text-amber-400">
                    <span>{item.metrics}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
