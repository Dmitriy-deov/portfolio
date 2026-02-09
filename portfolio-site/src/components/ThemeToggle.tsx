import { useState, useEffect } from 'react';

export default function ThemeToggle() {
  const [dark, setDark] = useState(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      className="flex items-center justify-center w-8 h-8 rounded-full border border-border text-text-secondary hover:text-text-primary hover:border-accent transition-colors cursor-pointer"
      aria-label="Toggle theme"
    >
      <span className="material-symbols-outlined text-[18px]">
        {dark ? 'light_mode' : 'dark_mode'}
      </span>
    </button>
  );
}
