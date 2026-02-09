import { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import type { TranslationKey } from '../i18n/translations';
import CVDownloadModal from './CVDownloadModal';

/* ── Stat box ──────────────────────────────────────────────── */

interface StatBoxProps {
  value: number;
  prefix?: string;
  suffix?: string;
  labelKey: TranslationKey;
  accent?: boolean;
  className?: string;
}

function StatBox({ value, prefix = '', suffix = '', labelKey, accent, className = '' }: StatBoxProps) {
  const { t } = useLanguage();

  return (
    <div className={`flex flex-col justify-end p-6 lg:p-8 ${className}`}>
      <div className={`text-4xl lg:text-5xl font-black ${accent ? 'text-accent' : 'text-text-primary'}`}>
        {prefix}{value}{suffix}
      </div>
      <div className="text-xs font-bold uppercase tracking-widest mt-2 text-text-secondary">
        {t(labelKey)}
      </div>
    </div>
  );
}

/* ── Hero component ────────────────────────────────────────── */

export default function Hero() {
  const { t } = useLanguage();
  const [showCV, setShowCV] = useState(false);

  return (
    <section className="border-b border-border pt-16 md:pt-20">
      <div className="grid grid-cols-1 md:grid-cols-12 min-h-[calc(100vh-5rem)]">
        {/* Left: Title area — col 1-8 */}
        <div className="md:col-span-8 border-r-0 md:border-r border-border flex flex-col justify-center p-8 lg:p-12 xl:p-16">
          <p className="text-sm font-bold uppercase tracking-widest text-text-muted mb-4">
            {t('hero.name')}
          </p>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl font-black tracking-tighter leading-[0.85] uppercase">
            <span className="block text-text-primary">{t('hero.title.line1')}</span>
            <span className="block text-accent">{t('hero.title.line2')}</span>
            <span className="block text-text-primary">{t('hero.title.line3')}</span>
          </h1>

          <p className="max-w-xl text-lg lg:text-xl font-medium mt-6 leading-relaxed text-text-secondary">
            {t('hero.tagline')}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-accent-hover"
            >
              {t('hero.cta')}
              <span className="material-symbols-outlined text-base">arrow_downward</span>
            </a>
            <button
              onClick={() => setShowCV(true)}
              className="inline-flex items-center gap-2 rounded-lg border-2 border-accent px-6 py-3 text-sm font-bold uppercase tracking-wider text-accent transition-colors hover:bg-accent hover:text-white"
            >
              {t('hero.downloadCV')}
              <span className="material-symbols-outlined text-base">download</span>
            </button>
          </div>

          <CVDownloadModal isOpen={showCV} onClose={() => setShowCV(false)} />
        </div>

        {/* Right: Stat boxes — col 9-12, 2×2 grid */}
        <div className="md:col-span-4 grid grid-cols-2 grid-rows-2">
          <StatBox
            value={15}
            labelKey="hero.stat.projects"
            accent
            className="border-b border-r border-border bg-bg-secondary"
          />
          <StatBox
            value={25}
            suffix="+"
            labelKey="hero.stat.agents"
            className="border-b border-border bg-bg-primary"
          />
          <StatBox
            value={1592}
            labelKey="hero.stat.tests"
            className="border-r border-border bg-bg-primary"
          />
          <StatBox
            value={96}
            prefix="~"
            suffix="%"
            labelKey="hero.stat.time"
            className="bg-bg-secondary"
          />
        </div>
      </div>
    </section>
  );
}
