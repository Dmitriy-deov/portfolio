import type { LucideIcon } from 'lucide-react';
import { TrendingUp, Bot, Code, Search } from 'lucide-react';
import { useSkills } from '../data/useProjectData';
import { useLanguage } from '../i18n/LanguageContext';

const iconMapEn: Record<string, LucideIcon> = {
  'Product Management': TrendingUp,
  'AI/LLM Engineering': Bot,
  'Full-Stack Development': Code,
  'SEO & Content': Search,
};

const iconMapRu: Record<string, LucideIcon> = {
  'Продуктовое управление': TrendingUp,
  'AI/LLM-инженерия': Bot,
  'Full-Stack разработка': Code,
  'SEO и контент': Search,
};

export default function SkillsSection() {
  const { t, lang } = useLanguage();
  const skills = useSkills();
  const iconMap = lang === 'ru' ? iconMapRu : iconMapEn;

  return (
    <section
      id="skills"
      className="border-b border-border bg-bg-secondary"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Section header — left column */}
        <div className="border-b border-border p-8 md:p-10 lg:col-span-3 lg:border-b-0 lg:border-r">
          <p className="mb-2 text-sm font-bold uppercase tracking-widest text-text-muted">
            {t('capabilities.label')}
          </p>
          <h2 className="whitespace-pre-line text-3xl font-black uppercase tracking-tight text-text-primary">
            {t('capabilities.title')}
          </h2>
        </div>

        {/* Skill cards — right columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:col-span-9 lg:grid-cols-3">
          {skills.map((skill, idx) => {
            const Icon = iconMap[skill.category] ?? Code;
            const description = skill.items.slice(0, 2).join('. ');

            return (
              <div
                key={skill.category}
                className={[
                  'group p-8 md:p-10 transition-colors hover:bg-bg-card-hover',
                  idx < skills.length - 1 ? 'border-b border-border sm:border-b-0' : '',
                  '',
                  '',
                  idx >= 3 ? 'lg:border-t lg:border-border' : '',
                  idx >= 2 ? 'sm:border-t sm:border-border lg:border-t-0' : '',
                ].join(' ')}
              >
                <Icon size={36} className="mb-4 block text-accent" />
                <h3 className="mb-2 text-lg font-bold uppercase text-text-primary">
                  {skill.category}
                </h3>
                <p className="text-sm font-medium leading-relaxed text-text-secondary">
                  {description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
