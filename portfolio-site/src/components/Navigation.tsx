import { useState, useEffect } from 'react';
import { ArrowRight, X, Menu } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeToggle from './ThemeToggle';
import type { TranslationKey } from '../i18n/translations';

const navLinks: { key: TranslationKey; href: string }[] = [
  { key: 'nav.projects', href: '#projects' },
  { key: 'nav.skills', href: '#skills' },
];

export default function Navigation() {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 border-b border-border transition-colors duration-300 ${
        scrolled ? 'bg-bg-primary/80 backdrop-blur-xl' : 'bg-bg-primary'
      }`}
    >
      {/* Desktop layout */}
      <div className="hidden md:grid grid-cols-12 h-20 items-stretch">
        {/* Logo — col 1-3 */}
        <div className="col-span-3 border-r border-border flex items-center px-8">
          <a
            href="#"
            onClick={handleLogoClick}
            className="flex items-center gap-2 text-text-primary hover:text-accent transition-colors"
          >
            <img src={`${import.meta.env.BASE_URL}logo.svg`} alt="DT" className="h-6 w-auto" />
            <span className="text-xl font-black uppercase tracking-tight">DT</span>
          </a>
        </div>

        {/* Center nav — col 4-9 */}
        <div className="col-span-6 border-r border-border flex items-center justify-center gap-12 px-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleClick(link.href);
              }}
              className="text-sm font-bold uppercase tracking-widest text-text-primary hover:text-accent transition-colors"
            >
              {t(link.key)}
            </a>
          ))}
        </div>

        {/* Right side — col 10-12 */}
        <div className="col-span-3 flex items-center justify-end gap-3 px-8">
          <LanguageSwitcher />
          <ThemeToggle />
          <a
            href="https://t.me/DTamarov"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-accent text-white text-xs font-black uppercase tracking-widest hover:bg-accent/90 transition-colors"
          >
            {t('nav.cta')}
            <ArrowRight size={14} />
          </a>
        </div>
      </div>

      {/* Mobile layout */}
      <div className="flex md:hidden items-center justify-between h-16 px-4">
        <a
          href="#"
          onClick={handleLogoClick}
          className="flex items-center gap-2 text-text-primary hover:text-accent transition-colors"
        >
          <img src={`${import.meta.env.BASE_URL}logo.svg`} alt="DT" className="h-5 w-auto" />
          <span className="text-xl font-black uppercase tracking-tight">DT</span>
        </a>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex items-center justify-center w-8 h-8 text-text-primary hover:text-accent transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-bg-primary border-t border-border">
          <div className="flex flex-col">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleClick(link.href);
                }}
                className="px-4 py-4 text-sm font-bold uppercase tracking-widest text-text-primary hover:text-accent border-b border-border transition-colors"
              >
                {t(link.key)}
              </a>
            ))}
            <a
              href="https://t.me/DTamarov"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-4 text-sm font-black uppercase tracking-widest text-accent flex items-center gap-2"
            >
              {t('nav.cta')}
              <ArrowRight size={14} />
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
