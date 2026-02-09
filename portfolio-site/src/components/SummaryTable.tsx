import React, { useState, useMemo } from 'react';
import { Clock, FlaskConical, FileText, ArrowDown, ArrowUpRight, ChevronDown } from 'lucide-react';
import { useProjects } from '../data/useProjectData';
import { useLanguage } from '../i18n/LanguageContext';
import type { Project } from '../types/portfolio';
import type { TranslationKey } from '../i18n/translations';

type SortKey = 'name' | 'type' | 'complexity' | 'salesReady';
type SortDir = 'asc' | 'desc';

const complexityOrder: Record<string, number> = { High: 3, Medium: 2, Low: 1 };

const FILTER_TABS: { key: TranslationKey; match: string | null }[] = [
  { key: 'projects.filter.all', match: null },
  { key: 'projects.filter.pipeline', match: 'AI Pipeline' },
  { key: 'projects.filter.mcp', match: 'MCP Server' },
  { key: 'projects.filter.fullstack', match: 'Full-Stack App' },
  { key: 'projects.filter.webapp', match: 'Web App' },
  { key: 'projects.filter.static', match: 'Static/Design' },
];

function matchesFilter(type: string, match: string | null): boolean {
  if (match === null) return true;
  if (match === 'Static/Design') {
    return type === 'Static Website' || type === 'Design Exports';
  }
  return type === match;
}

/* ── Complexity badge ── */
function ComplexityBadge({ level, label }: { level: Project['complexity']; label: string }) {
  const styles: Record<string, string> = {
    High: 'bg-text-muted/15 text-text-primary',
    Medium: 'bg-text-muted/10 text-text-secondary',
    Low: 'bg-text-muted/8 text-text-muted',
  };
  return (
    <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-bold ${styles[level]}`}>
      {label}
    </span>
  );
}

/* ── Sales-ready bar ── */
function SalesBar({ value }: { value: number }) {
  const pct = (value / 10) * 100;
  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-14 rounded-full bg-border-light">
        <div
          className="h-full rounded-full bg-accent transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-sm font-bold tabular-nums text-text-primary">{value}/10</span>
    </div>
  );
}

/* ── Sort indicator ── */
function SortArrow({ active, dir }: { active: boolean; dir: SortDir }) {
  if (!active) return <span className="ml-1 text-text-muted/40">↕</span>;
  return <span className="ml-1 text-accent">{dir === 'asc' ? '↑' : '↓'}</span>;
}

/* ── Expanded details ── */
function ExpandedDetails({ project, t }: { project: Project; t: (key: TranslationKey) => string }) {
  return (
    <div className="space-y-5">
      {/* Subtitle + Business Value */}
      <div>
        <p className="mb-1 text-sm font-bold uppercase tracking-wide text-text-primary">{project.subtitle}</p>
        <p className="text-sm leading-relaxed text-text-secondary">{project.businessValue}</p>
      </div>

      {/* Time savings */}
      {project.timeSavings && (
        <div className="flex items-center gap-2 text-xs font-bold uppercase text-accent">
          <Clock size={14} />
          <span>{project.timeSavings}</span>
        </div>
      )}

      {/* Full tech stack */}
      <div className="flex flex-wrap gap-1.5">
        {project.techStack.map((tech) => (
          <span
            key={tech}
            className="rounded-md border border-border-light bg-bg-primary px-2 py-0.5 text-[11px] text-text-muted"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Tests & Docs meta */}
      <div className="flex flex-wrap gap-4 text-xs text-text-muted">
        {project.tests && (
          <span className="inline-flex items-center gap-1.5">
            <FlaskConical size={14} />
            {project.tests}
          </span>
        )}
        {project.docs && (
          <span className="inline-flex items-center gap-1.5">
            <FileText size={14} />
            {t('card.docs')} {t(`docs.${project.docs}` as TranslationKey)}
          </span>
        )}
      </div>

      {/* Automated processes */}
      {project.automatedProcesses && project.automatedProcesses.length > 0 && (
        <div>
          <h4 className="mb-2 text-xs font-bold uppercase tracking-widest text-text-muted">
            {t('card.automatedProcesses')}
          </h4>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-border text-text-muted">
                  <th className="pb-1.5 pr-4 font-bold uppercase tracking-wider">{t('card.stage')}</th>
                  {project.automatedProcesses.some((p) => p.agents) && (
                    <th className="pb-1.5 pr-4 font-bold uppercase tracking-wider">{t('card.agents')}</th>
                  )}
                  <th className="pb-1.5 pr-4 font-bold uppercase tracking-wider">{t('card.description')}</th>
                  {project.automatedProcesses.some((p) => p.time) && (
                    <th className="pb-1.5 font-bold uppercase tracking-wider">{t('card.time')}</th>
                  )}
                </tr>
              </thead>
              <tbody className="text-text-secondary">
                {project.automatedProcesses.map((proc) => (
                  <tr key={proc.stage} className="border-b border-border-light last:border-0">
                    <td className="py-1.5 pr-4 font-medium text-text-primary">{proc.stage}</td>
                    {project.automatedProcesses!.some((p) => p.agents) && (
                      <td className="py-1.5 pr-4 font-mono text-[11px]">{proc.agents ?? '\u2014'}</td>
                    )}
                    <td className="py-1.5 pr-4">{proc.description}</td>
                    {project.automatedProcesses!.some((p) => p.time) && (
                      <td className="py-1.5 whitespace-nowrap text-accent">{proc.time ?? '\u2014'}</td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Metrics */}
      {project.metrics && Object.keys(project.metrics).length > 0 && (
        <div>
          <h4 className="mb-2 text-xs font-bold uppercase tracking-widest text-text-muted">
            {t('card.metrics')}
          </h4>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs">
            {Object.entries(project.metrics).map(([key, value]) => (
              <div key={key} className="flex justify-between gap-2">
                <span className="text-text-muted">{key}</span>
                <span className="font-mono text-text-primary">{value}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Architecture */}
      {project.architecture && project.architecture.length > 0 && (
        <div>
          <h4 className="mb-3 text-xs font-bold uppercase tracking-widest text-text-muted">
            {t('card.architecture')}
          </h4>
          <div className="flex flex-col items-center gap-1.5">
            {project.architecture.map((row, rowIdx) => (
              <React.Fragment key={rowIdx}>
                {rowIdx > 0 && (
                  <ArrowDown size={16} className="text-text-muted/50" />
                )}
                <div className="flex flex-wrap justify-center gap-1.5">
                  {row.map((node, nodeIdx) => (
                    <span
                      key={nodeIdx}
                      className="rounded border border-border-light bg-bg-primary px-3 py-1.5 font-mono text-[11px] text-text-primary"
                    >
                      {node}
                    </span>
                  ))}
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      )}

      {/* Future plans */}
      {project.plans && project.plans.length > 0 && (
        <div>
          <h4 className="mb-2 text-xs font-bold uppercase tracking-widest text-text-muted">
            {t('card.futurePlans')}
          </h4>
          <ul className="space-y-1.5 text-xs text-text-secondary">
            {project.plans.map((plan, i) => (
              <li key={i} className="flex items-start gap-2">
                <ArrowUpRight size={14} className="mt-0.5 text-accent" />
                <span>{plan}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

/* ── Grid template for the 7-column table ── */
const COL_TEMPLATE = 'minmax(160px, 2fr) minmax(80px, 0.9fr) minmax(180px, 2.2fr) minmax(90px, 1fr) minmax(100px, 1.2fr) minmax(100px, 1.1fr) minmax(110px, 1.2fr)';

export default function SummaryTable() {
  const { t } = useLanguage();
  const projects = useProjects();
  const [sortKey, setSortKey] = useState<SortKey>('complexity');
  const [sortDir, setSortDir] = useState<SortDir>('desc');
  const [filterIdx, setFilterIdx] = useState(0);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir(key === 'salesReady' ? 'desc' : 'asc');
    }
  };

  const activeMatch = FILTER_TABS[filterIdx].match;

  const sorted = useMemo(() => {
    const list = projects.filter((p) => matchesFilter(p.type, activeMatch));
    list.sort((a, b) => {
      let cmp = 0;
      switch (sortKey) {
        case 'name':
          cmp = a.name.localeCompare(b.name);
          break;
        case 'type':
          cmp = a.type.localeCompare(b.type);
          break;
        case 'complexity':
          cmp = complexityOrder[a.complexity] - complexityOrder[b.complexity];
          break;
        case 'salesReady':
          cmp = a.salesReady - b.salesReady;
          break;
      }
      return sortDir === 'asc' ? cmp : -cmp;
    });
    return list;
  }, [projects, sortKey, sortDir, activeMatch]);

  return (
    <section id="projects" className="border-b border-border bg-bg-primary">
      {/* ── Sticky header area ── */}
      <div className="sticky top-0 z-10 bg-bg-secondary">
        {/* Row 1: Section title */}
        <div className="border-b border-border">
          <div className="flex items-end justify-between p-8 md:p-10">
            <div>
              <p className="mb-2 text-sm font-bold uppercase tracking-widest text-text-muted">
                {t('projects.label')}
              </p>
              <h2 className="text-4xl font-black uppercase tracking-tight text-text-primary md:text-5xl">
                {t('projects.title')}
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 animate-pulse rounded-full bg-accent" />
              <span className="text-sm font-bold uppercase text-text-muted">
                {t('projects.status')}
              </span>
            </div>
          </div>
        </div>

        {/* Row 2: Filter tabs */}
        <div className="border-b border-border">
          <div className="flex flex-wrap items-center gap-2 px-8 py-3 md:px-10">
            {FILTER_TABS.map((tab, i) => (
              <button
                key={tab.key}
                onClick={() => setFilterIdx(i)}
                className={`cursor-pointer rounded-lg px-3 py-1.5 text-xs font-bold uppercase transition-colors ${
                  filterIdx === i
                    ? 'bg-accent text-white'
                    : 'bg-bg-primary text-text-muted hover:text-text-secondary'
                }`}
              >
                {t(tab.key)}
              </button>
            ))}
          </div>
        </div>

        {/* Row 3: Column headers (desktop only) */}
        <div className="hidden border-b border-border bg-bg-primary lg:block">
          <div
            className="grid items-center"
            style={{ gridTemplateColumns: COL_TEMPLATE }}
          >
            <button
              onClick={() => handleSort('name')}
              className="cursor-pointer border-r border-border-light px-6 py-4 text-left text-xs font-bold uppercase tracking-widest text-text-muted transition-colors hover:text-text-primary"
            >
              {t('projects.col.project')}
              <SortArrow active={sortKey === 'name'} dir={sortDir} />
            </button>
            <button
              onClick={() => handleSort('type')}
              className="cursor-pointer border-r border-border-light px-4 py-4 text-left text-xs font-bold uppercase tracking-widest text-text-muted transition-colors hover:text-text-primary"
            >
              {t('projects.col.type')}
              <SortArrow active={sortKey === 'type'} dir={sortDir} />
            </button>
            <div className="border-r border-border-light px-4 py-4">
              <span className="text-xs font-bold uppercase tracking-widest text-text-muted">
                {t('projects.col.stack')}
              </span>
            </div>
            <button
              onClick={() => handleSort('complexity')}
              className="cursor-pointer border-r border-border-light px-4 py-4 text-left text-xs font-bold uppercase tracking-widest text-text-muted transition-colors hover:text-text-primary"
            >
              {t('projects.col.complexity')}
              <SortArrow active={sortKey === 'complexity'} dir={sortDir} />
            </button>
            <div className="border-r border-border-light px-4 py-4">
              <span className="text-xs font-bold uppercase tracking-widest text-text-muted">
                {t('projects.col.tests')}
              </span>
            </div>
            <div className="border-r border-border-light px-4 py-4">
              <span className="text-xs font-bold uppercase tracking-widest text-text-muted">
                {t('projects.col.docs')}
              </span>
            </div>
            <button
              onClick={() => handleSort('salesReady')}
              className="cursor-pointer px-4 py-4 text-left text-xs font-bold uppercase tracking-widest text-text-muted transition-colors hover:text-text-primary"
            >
              {t('projects.col.salesReady')}
              <SortArrow active={sortKey === 'salesReady'} dir={sortDir} />
            </button>
          </div>
        </div>
      </div>

      {/* ── Desktop project rows ── */}
      <div className="hidden lg:block">
        {sorted.map((p, _i) => {
          const isExpanded = expandedIds.has(p.id);

          return (
            <React.Fragment key={p.id}>
              <div
                onClick={() => toggleExpand(p.id)}
                className="group grid cursor-pointer items-center border-b border-border-light transition-colors hover:bg-bg-secondary"
                style={{ gridTemplateColumns: COL_TEMPLATE, minHeight: '4.5rem' }}
              >
                {/* Project name */}
                <div className="flex items-center gap-3 border-r border-border-light px-6 py-5">
                  <span
                    className="inline-flex shrink-0 text-text-muted transition-transform duration-200"
                    style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
                  >
                    <ChevronDown size={18} />
                  </span>
                  <span className="text-sm font-bold text-text-primary transition-colors group-hover:text-accent">
                    {p.name}
                  </span>
                </div>

                {/* Type */}
                <div className="border-r border-border-light px-4 py-5">
                  <span className="text-xs text-text-secondary">{p.type}</span>
                </div>

                {/* Stack (top 3) */}
                <div className="border-r border-border-light px-4 py-5">
                  <span className="font-mono text-xs text-text-secondary">
                    {p.techStack.slice(0, 3).join(', ')}
                  </span>
                </div>

                {/* Complexity badge */}
                <div className="border-r border-border-light px-4 py-5">
                  <ComplexityBadge
                    level={p.complexity}
                    label={t(`complexity.${p.complexity}` as TranslationKey)}
                  />
                </div>

                {/* Tests */}
                <div className="border-r border-border-light px-4 py-5">
                  <span className="text-xs text-text-secondary">
                    {p.tests ?? '\u2014'}
                  </span>
                </div>

                {/* Documentation */}
                <div className="border-r border-border-light px-4 py-5">
                  <span className="text-xs text-text-secondary">
                    {p.docs ? t(`docs.${p.docs}` as TranslationKey) : '\u2014'}
                  </span>
                </div>

                {/* Sales-ready */}
                <div className="px-4 py-5">
                  <SalesBar value={p.salesReady} />
                </div>
              </div>

              {/* Expanded detail row */}
              {isExpanded && (
                <div className="border-b border-border bg-bg-card">
                  <div className="px-8 py-6 md:px-10">
                    <ExpandedDetails project={p} t={t} />
                  </div>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* ── Mobile card layout ── */}
      <div className="flex flex-col lg:hidden">
        {sorted.map((p, _i) => {
          const isExpanded = expandedIds.has(p.id);

          return (
            <div key={p.id} className="border-b border-border bg-bg-secondary">
              {/* Card header */}
              <div
                onClick={() => toggleExpand(p.id)}
                className="cursor-pointer p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="text-lg font-black uppercase leading-tight text-text-primary">
                      {p.name}
                    </h3>
                    <p className="mt-0.5 text-xs text-text-muted">{p.type}</p>
                  </div>
                  <span
                    className="mt-1 inline-flex shrink-0 text-text-muted transition-transform duration-200"
                    style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
                  >
                    <ChevronDown size={14} />
                  </span>
                </div>

                {/* Stack preview */}
                <p className="mt-2 font-mono text-xs text-text-secondary">
                  {p.techStack.slice(0, 3).join(', ')}
                </p>

                {/* Bottom row: complexity + sales-ready */}
                <div className="mt-3 flex items-center justify-between gap-4">
                  <ComplexityBadge
                    level={p.complexity}
                    label={t(`complexity.${p.complexity}` as TranslationKey)}
                  />
                  <SalesBar value={p.salesReady} />
                </div>
              </div>

              {/* Mobile expanded details */}
              {isExpanded && (
                <div className="border-t border-border px-5 pb-5 pt-4">
                  <ExpandedDetails project={p} t={t} />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Empty state */}
      {sorted.length === 0 && (
        <p className="py-20 text-center text-sm font-bold uppercase tracking-widest text-text-muted">
          {t('projects.empty')}
        </p>
      )}
    </section>
  );
}
