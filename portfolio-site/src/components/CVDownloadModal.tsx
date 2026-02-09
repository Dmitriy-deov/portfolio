import { useState } from 'react';
import { FileText, Code, X, Loader2 } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { useProjects } from '../data/useProjectData';
import { generateCV } from '../utils/generateCV';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function CVDownloadModal({ isOpen, onClose }: Props) {
  const { lang, t } = useLanguage();
  const projects = useProjects();
  const [generating, setGenerating] = useState(false);

  if (!isOpen) return null;

  const handlePDF = async () => {
    setGenerating(true);
    try {
      await generateCV(lang as 'ru' | 'en', projects);
    } finally {
      setGenerating(false);
    }
  };

  const handleMD = () => {
    const link = document.createElement('a');
    link.href = `${import.meta.env.BASE_URL}portfolio-prd.md`;
    link.download = 'portfolio-prd.md';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative mx-4 w-full max-w-md rounded-xl bg-bg-primary border border-border p-8 shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-text-muted hover:text-text-primary transition-colors"
        >
          <X size={20} />
        </button>

        {/* Title */}
        <h2 className="text-xl font-black uppercase tracking-tight text-text-primary mb-6">
          {t('cv.modal.title')}
        </h2>

        {/* Options */}
        <div className="flex flex-col gap-3">
          {/* PDF */}
          <button
            onClick={handlePDF}
            disabled={generating}
            className="group flex items-center gap-4 rounded-lg border border-border p-4 text-left transition-all hover:border-accent hover:bg-bg-secondary disabled:opacity-60"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
              {generating ? <Loader2 size={20} className="animate-spin" /> : <FileText size={20} />}
            </div>
            <div>
              <div className="text-sm font-bold text-text-primary group-hover:text-accent transition-colors">
                {t('cv.modal.pdf')}
              </div>
              <div className="text-xs text-text-muted mt-0.5">
                {t('cv.modal.pdfDesc')}
              </div>
            </div>
          </button>

          {/* Markdown */}
          <button
            onClick={handleMD}
            className="group flex items-center gap-4 rounded-lg border border-border p-4 text-left transition-all hover:border-accent hover:bg-bg-secondary"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
              <Code size={20} />
            </div>
            <div>
              <div className="text-sm font-bold text-text-primary group-hover:text-accent transition-colors">
                {t('cv.modal.md')}
              </div>
              <div className="text-xs text-text-muted mt-0.5">
                {t('cv.modal.mdDesc')}
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
