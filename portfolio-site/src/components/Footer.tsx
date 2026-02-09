import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

const socialLinks = [
  { label: 'Telegram', href: 'https://t.me/DTamarov' },
];

const sitemapLinks = [
  { labelKey: 'nav.projects' as const, href: '#projects' },
  { labelKey: 'nav.skills' as const, href: '#skills' },
  { labelKey: 'nav.contact' as const, href: 'https://t.me/DTamarov' },
];

export default function Footer() {
  const { t } = useLanguage();

  return (
    <>
      {/* CTA Bar */}
      <a
        href="https://t.me/DTamarov"
        className="group flex cursor-pointer items-center justify-between bg-accent p-8 transition-colors hover:bg-accent-hover md:p-12"
      >
        <span className="text-2xl font-black uppercase tracking-tight text-white md:text-4xl">
          {t('cta.title')}
        </span>
        <ArrowUpRight size={36} className="text-white transition-transform group-hover:rotate-45" />
      </a>

      {/* Footer */}
      <footer className="border-t border-border bg-bg-secondary">
        <div className="grid grid-cols-1 gap-8 px-6 py-12 sm:grid-cols-2 lg:grid-cols-12 md:py-20">
          {/* Logo + Copyright */}
          <div className="lg:col-span-3">
            <div className="mb-6 flex items-center gap-3">
              <img src={`${import.meta.env.BASE_URL}logo.svg`} alt="DT" className="h-7 w-auto" />
              <span className="text-lg font-black uppercase tracking-tight text-text-primary">
                DT
              </span>
            </div>
            <p className="whitespace-pre-line text-sm text-text-muted">
              {t('footer.copyright')}
              {'\n'}
              {t('footer.location')}
            </p>
          </div>

          {/* Sitemap */}
          <div className="lg:col-span-3">
            <h4 className="mb-4 text-sm font-bold uppercase text-text-primary">
              {t('footer.sitemap')}
            </h4>
            <ul className="space-y-2">
              {sitemapLinks.map((link) => (
                <li key={link.labelKey}>
                  <a
                    href={link.href}
                    className="text-sm text-text-secondary transition-colors hover:text-accent"
                  >
                    {t(link.labelKey)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div className="lg:col-span-3">
            <h4 className="mb-4 text-sm font-bold uppercase text-text-primary">
              {t('footer.social')}
            </h4>
            <ul className="space-y-2">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-accent"
                  >
                    {link.label}
                    <ArrowUpRight size={14} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Variant label */}
          <div className="flex items-end lg:col-span-3">
            <p className="whitespace-pre-line text-xs font-bold uppercase tracking-widest text-text-muted lg:ml-auto lg:text-right">
              {t('footer.variant')}
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
