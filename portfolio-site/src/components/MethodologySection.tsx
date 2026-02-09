import { Brain, RefreshCw, FlaskConical, BookOpen, Rocket, Palette } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

const items = [
  { key: 'solo', icon: Brain },
  { key: 'iterative', icon: RefreshCw },
  { key: 'testing', icon: FlaskConical },
  { key: 'docs', icon: BookOpen },
  { key: 'cicd', icon: Rocket },
  { key: 'design', icon: Palette },
] as const;

export default function MethodologySection() {
  const { t } = useLanguage();

  return (
    <section id="methodology" className="border-b border-border bg-bg-primary">
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Section header — left column */}
        <div className="border-b border-border p-8 md:p-10 lg:col-span-3 lg:border-b-0 lg:border-r">
          <p className="mb-2 text-sm font-bold uppercase tracking-widest text-text-muted">
            {t('methodology.label')}
          </p>
          <h2 className="whitespace-pre-line text-3xl font-black uppercase tracking-tight text-text-primary">
            {t('methodology.title')}
          </h2>
        </div>

        {/* Methodology cards — right columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:col-span-9 lg:grid-cols-3">
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.key}
                className={[
                  'group p-8 md:p-10 transition-colors hover:bg-bg-card-hover',
                  idx < items.length - 1 ? 'border-b border-border sm:border-b-0' : '',
                  '',
                  '',
                  idx >= 3 ? 'lg:border-t lg:border-border' : '',
                  idx >= 2 ? 'sm:border-t sm:border-border lg:border-t-0' : '',
                ].join(' ')}
              >
                <Icon size={36} className="mb-4 block text-accent" />
                <h3 className="mb-2 text-lg font-bold uppercase text-text-primary">
                  {t(`methodology.${item.key}.title`)}
                </h3>
                <p className="text-sm font-medium leading-relaxed text-text-secondary">
                  {t(`methodology.${item.key}.desc`)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
