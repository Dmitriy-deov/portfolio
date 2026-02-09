import { useMemo } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { projects as projectsEn, skills as skillsEn, ecosystemLinks as ecosystemLinksEn } from './projects';
import { projectsRu, skillsRu, ecosystemLinksRu } from './projects.ru';

export function useProjects() {
  const { lang } = useLanguage();
  return useMemo(() => (lang === 'ru' ? projectsRu : projectsEn), [lang]);
}

export function useSkills() {
  const { lang } = useLanguage();
  return useMemo(() => (lang === 'ru' ? skillsRu : skillsEn), [lang]);
}

export function useEcosystemLinks() {
  const { lang } = useLanguage();
  return useMemo(() => (lang === 'ru' ? ecosystemLinksRu : ecosystemLinksEn), [lang]);
}
