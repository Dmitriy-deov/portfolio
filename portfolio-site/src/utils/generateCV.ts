import type { Project } from '../types/portfolio';

const W = 794;
const H = 1123;
const P = 40;
const ACCENT = '#0055FF';
const FONT = 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

function makePage(): HTMLDivElement {
  const div = document.createElement('div');
  div.style.cssText = `width:${W}px;height:${H}px;background:#fff;font-family:${FONT};color:#1a1a1a;box-sizing:border-box;padding:${P}px;overflow:hidden;position:relative;`;
  return div;
}

/*
 * SECURITY NOTE: All HTML content below is developer-controlled static text
 * sourced from hardcoded strings and typed Project data. No user-generated
 * input enters innerHTML. This is safe from XSS by design.
 */

/* ── Shared helpers ── */

function accentBar(): string {
  return `<div style="width:40px;height:3px;background:${ACCENT};margin-bottom:20px;"></div>`;
}

function sectionTitle(text: string): string {
  return `<div style="font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:2.5px;color:#888;margin-bottom:6px;">${text}</div>`;
}

function sectionHeading(text: string): string {
  return `<div style="font-size:18px;font-weight:900;text-transform:uppercase;letter-spacing:-0.3px;color:#111;margin-bottom:16px;">${text}</div>`;
}

function thinDivider(mb = 16): string {
  return `<div style="height:1px;background:#eee;margin-bottom:${mb}px;"></div>`;
}

function pageFooter(name: string, page: number): string {
  return `<div style="position:absolute;bottom:${P}px;left:${P}px;right:${P}px;display:flex;justify-content:space-between;font-size:8px;color:#bbb;text-transform:uppercase;letter-spacing:1px;">
    <span>\u00A9 2026 ${name}</span>
    <span>${page}/3</span>
  </div>`;
}

/* ── Texts ── */

interface CVTexts {
  name: string;
  role: string;
  location: string;
  telegram: string;
  portfolio: string;
  summary: string;
  statLabels: [string, string, string, string];
  skillsTitle: string;
  skills: { title: string; items: string[] }[];
  impactTitle: string;
  impactSubtitle: string;
  projectsTitle: string;
  tableCols: [string, string, string, string, string];
  timeSavingsTitle: string;
  timeSavings: { project: string; before: string; after: string; pct: string }[];
  timeSavingsTotal: string;
  ecosystemTitle: string;
  ecosystemLinks: string[];
  methodologyTitle: string;
  methodology: { title: string; desc: string }[];
  ctaTitle: string;
  ctaText: string;
  complexityMap: Record<string, string>;
  beforeLabel: string;
  afterLabel: string;
  savedLabel: string;
  projectLabel: string;
  flagshipLabel: string;
}

function getTexts(isRu: boolean): CVTexts {
  if (isRu) {
    return {
      name: 'Дмитрий Тамаров',
      role: 'Product Manager / AI Automation Architect',
      location: 'Москва, Россия',
      telegram: 't.me/DTamarov',
      portfolio: 'dmitriy-deov.github.io/portfolio',
      summary: 'Портфолио из 15 проектов автоматизации контент-маркетинга и бизнес-процессов с помощью AI. От SEO-анализа до генерации контента, управления отзывами и корпоративных сайтов. Все проекты разработаны solo с AI-ассистентами (Claude Code, Cursor), решают реальные задачи в сферах медиа, маркетинга и B2B.',
      statLabels: ['Проектов', 'AI-агентов', 'Строк тестов', 'Экономия времени'],
      skillsTitle: 'Ключевые компетенции',
      skills: [
        {
          title: 'Product Management',
          items: ['Multi-agent AI pipeline design', 'Quality gates и чекпоинты', 'A/B-тестирование (лендинги, лид-формы)', 'Knowledge base design (YAML, facts)', 'Design systems (Atomic Design, WCAG 2.1 AA)'],
        },
        {
          title: 'AI/LLM Engineering',
          items: ['Мультиагентная оркестрация (до 14 агентов)', 'RAG-системы (Gemini, embeddings, vector DB)', 'MCP-серверы (FastMCP, 13 инструментов)', 'Fact verification (fuzzy dedup, source tracking)', 'Structured outputs (Pydantic, JSON Schema)'],
        },
        {
          title: 'Full-Stack Development',
          items: ['React 19, SvelteKit 2, Astro 5, TypeScript', 'Firebase, FastAPI, Docker Compose', 'Kuzu, Firestore, MySQL, SQLite', 'GitHub Actions CI/CD, Nginx', 'GraphQL, REST APIs'],
        },
        {
          title: 'SEO & Content',
          items: ['Entity-based SEO (Knowledge Graph)', 'Автоматизация SEO-исследований', 'Фактчекинг с верификацией источников', 'Антиплагиат (Text.ru API)', 'JSON-LD structured data'],
        },
      ],
      impactTitle: 'Ключевые проекты',
      impactSubtitle: 'Флагманские проекты с измеримым бизнес-результатом',
      projectsTitle: 'Полное портфолио',
      tableCols: ['Проект', 'Тип', 'Стек (топ 3)', 'Сложность', 'Готовность'],
      timeSavingsTitle: 'Совокупная экономия',
      timeSavings: [
        { project: 'MediaUniversal', before: '14-20ч', after: '~30 мин', pct: '96%' },
        { project: 'Reviews-WB', before: '8-12 мин/отзыв', after: '30-60 сек', pct: '97%' },
        { project: 'ESI', before: '20-30ч аналитики', after: 'Авто-аудит', pct: '95%' },
        { project: 'Presentation', before: '2-4ч', after: '30 сек', pct: '99%' },
        { project: 'Gemini RAG', before: '2-4ч/день', after: 'Мгновенно', pct: '90%' },
        { project: 'Copiwriter', before: '12-16ч', after: '2-3ч', pct: '80%' },
      ],
      timeSavingsTotal: '~60-100 человеко-часов экономии в неделю',
      ecosystemTitle: 'Связи экосистемы',
      ecosystemLinks: [
        'ESI \u2192 Copiwriter/MediaUniversal (SEO-данные)',
        'Copiwriter \u2192 MediaUniversal (эволюция)',
        'Veritas \u2192 Copiwriter/MediaUniversal (фактчек)',
        'TextRu \u2192 Dzen (антиплагиат)',
        'UXKit \u2192 Site3-0 (дизайн-система)',
      ],
      methodologyTitle: 'Методология',
      methodology: [
        { title: 'Solo + AI', desc: 'Все проекты \u2014 solo с Claude Code и Cursor' },
        { title: 'Итеративная разработка', desc: 'Фазовый подход, roadmap, checkpoints' },
        { title: 'Test-driven quality', desc: 'pytest, structured logging, crash-safe state' },
        { title: 'Documentation-first', desc: 'CLAUDE.md, PRD.md, QUICKSTART.md' },
        { title: 'CI/CD', desc: 'GitHub Actions, Docker, FTP deploy' },
      ],
      ctaTitle: 'Контакт',
      ctaText: 'Открыт к предложениям в сфере AI-автоматизации, product management и full-stack разработки.',
      complexityMap: { High: 'Высокая', Medium: 'Средняя', Low: 'Низкая' },
      beforeLabel: 'Было',
      afterLabel: 'Стало',
      savedLabel: 'Экон.',
      projectLabel: 'Проект',
      flagshipLabel: 'ФЛАГМАН',
    };
  }
  return {
    name: 'Dmitrij Tamarov',
    role: 'Product Manager / AI Automation Architect',
    location: 'Moscow, Russia',
    telegram: 't.me/DTamarov',
    portfolio: 'dmitriy-deov.github.io/portfolio',
    summary: 'Portfolio of 15 projects automating content marketing and business processes with AI. From SEO analysis to content generation, review management, and corporate websites. All projects built solo with AI assistants (Claude Code, Cursor), solving real-world problems in media, marketing, and B2B.',
    statLabels: ['Projects', 'AI Agents', 'Test Lines', 'Time Savings'],
    skillsTitle: 'Core Competencies',
    skills: [
      {
        title: 'Product Management',
        items: ['Multi-agent AI pipeline design', 'Quality gates & checkpoint systems', 'A/B testing (landing pages, lead forms)', 'Knowledge base design (YAML, facts)', 'Design systems (Atomic Design, WCAG 2.1 AA)'],
      },
      {
        title: 'AI/LLM Engineering',
        items: ['Multi-agent orchestration (up to 14 agents)', 'RAG systems (Gemini, embeddings, vector DB)', 'MCP servers (FastMCP, 13 tools)', 'Fact verification (fuzzy dedup, source tracking)', 'Structured outputs (Pydantic, JSON Schema)'],
      },
      {
        title: 'Full-Stack Development',
        items: ['React 19, SvelteKit 2, Astro 5, TypeScript', 'Firebase, FastAPI, Docker Compose', 'Kuzu, Firestore, MySQL, SQLite', 'GitHub Actions CI/CD, Nginx', 'GraphQL, REST APIs'],
      },
      {
        title: 'SEO & Content',
        items: ['Entity-based SEO (Knowledge Graph)', 'Automated SEO research & analysis', 'Fact-checking with source verification', 'Plagiarism detection (Text.ru API)', 'JSON-LD structured data'],
      },
    ],
    impactTitle: 'Key Projects',
    impactSubtitle: 'Flagship projects with measurable business impact',
    projectsTitle: 'Full Portfolio',
    tableCols: ['Project', 'Type', 'Stack (top 3)', 'Complexity', 'Sales-Ready'],
    timeSavingsTitle: 'Total Impact',
    timeSavings: [
      { project: 'MediaUniversal', before: '14-20h', after: '~30 min', pct: '96%' },
      { project: 'Reviews-WB', before: '8-12 min/review', after: '30-60 sec', pct: '97%' },
      { project: 'ESI', before: '20-30h analytics', after: 'Auto audit', pct: '95%' },
      { project: 'Presentation', before: '2-4h', after: '30 sec', pct: '99%' },
      { project: 'Gemini RAG', before: '2-4h/day', after: 'Instant', pct: '90%' },
      { project: 'Copiwriter', before: '12-16h', after: '2-3h', pct: '80%' },
    ],
    timeSavingsTotal: '~60-100 person-hours saved per week',
    ecosystemTitle: 'Ecosystem Connections',
    ecosystemLinks: [
      'ESI \u2192 Copiwriter/MediaUniversal (SEO data)',
      'Copiwriter \u2192 MediaUniversal (evolution)',
      'Veritas \u2192 Copiwriter/MediaUniversal (fact-check)',
      'TextRu \u2192 Dzen (plagiarism)',
      'UXKit \u2192 Site3-0 (design system)',
    ],
    methodologyTitle: 'Methodology',
    methodology: [
      { title: 'Solo + AI', desc: 'All projects built solo with Claude Code and Cursor' },
      { title: 'Iterative Delivery', desc: 'Phased development, roadmaps, checkpoints' },
      { title: 'Test-driven quality', desc: 'pytest, structured logging, crash-safe state' },
      { title: 'Documentation-first', desc: 'CLAUDE.md, PRD.md, QUICKSTART.md' },
      { title: 'CI/CD', desc: 'GitHub Actions, Docker, FTP deploy' },
    ],
    ctaTitle: 'Contact',
    ctaText: 'Open to opportunities in AI automation, product management, and full-stack development.',
    complexityMap: { High: 'High', Medium: 'Medium', Low: 'Low' },
    beforeLabel: 'Before',
    afterLabel: 'After',
    savedLabel: 'Saved',
    projectLabel: 'Project',
    flagshipLabel: 'FLAGSHIP',
  };
}

/* ── PAGE 1: Profile + Competencies ── */

function buildPage1(isRu: boolean): HTMLDivElement {
  const t = getTexts(isRu);
  const page = makePage();

  const stats = [
    { value: '15', label: t.statLabels[0], accent: true },
    { value: '25+', label: t.statLabels[1], accent: false },
    { value: '1 592', label: t.statLabels[2], accent: false },
    { value: '~96%', label: t.statLabels[3], accent: true },
  ];

  const statsHtml = stats.map(s =>
    `<div style="flex:1;text-align:center;padding:14px 8px;">
      <div style="font-size:28px;font-weight:900;color:${s.accent ? ACCENT : '#111'};letter-spacing:-0.5px;">${s.value}</div>
      <div style="font-size:8px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:#999;margin-top:4px;">${s.label}</div>
    </div>`
  ).join('');

  const skillsHtml = t.skills.map(s =>
    `<div style="padding:12px 0;">
      <div style="font-size:10px;font-weight:800;color:${ACCENT};text-transform:uppercase;letter-spacing:1px;margin-bottom:6px;">${s.title}</div>
      <div style="font-size:9px;line-height:1.7;color:#555;">${s.items.map(i => `\u2022 ${i}`).join('<br>')}</div>
    </div>`
  ).join('');

  // All content is static developer-controlled text (no user input)
  const content = document.createElement('div');
  content.innerHTML = [
    `<div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:8px;">
      <div>
        <div style="font-size:32px;font-weight:900;letter-spacing:-1px;text-transform:uppercase;line-height:1;color:#111;">${t.name}</div>
        <div style="font-size:13px;color:#555;font-weight:500;margin-top:6px;">${t.role}</div>
      </div>
      <div style="text-align:right;font-size:10px;color:#888;line-height:1.8;">
        <div>\u2709 ${t.telegram}</div>
        <div>\u25C6 ${t.location}</div>
        <div>\u2197 ${t.portfolio}</div>
      </div>
    </div>`,
    `<div style="height:3px;background:${ACCENT};margin-bottom:24px;"></div>`,
    `<div style="font-size:11px;line-height:1.75;color:#444;margin-bottom:24px;padding:16px 20px;background:#f8f9fb;border-left:3px solid ${ACCENT};border-radius:0 4px 4px 0;">${t.summary}</div>`,
    `<div style="display:flex;margin-bottom:24px;border:1px solid #eee;border-radius:6px;overflow:hidden;">${statsHtml}</div>`,
    thinDivider(20),
    sectionTitle('01'),
    sectionHeading(t.skillsTitle),
    `<div style="display:grid;grid-template-columns:1fr 1fr;gap:0 28px;">${skillsHtml}</div>`,
    pageFooter(t.name, 1),
  ].join('');

  page.appendChild(content);
  return page;
}

/* ── PAGE 2: Key Projects Impact ── */

function buildPage2(isRu: boolean, projects: Project[]): HTMLDivElement {
  const t = getTexts(isRu);
  const page = makePage();

  const topProjects = [...projects]
    .sort((a, b) => {
      if (b.salesReady !== a.salesReady) return b.salesReady - a.salesReady;
      const cxOrder: Record<string, number> = { High: 3, Medium: 2, Low: 1 };
      return cxOrder[b.complexity] - cxOrder[a.complexity];
    })
    .slice(0, 6);

  const projectCards = topProjects.map(p => {
    const stack = p.techStack.slice(0, 3).join(', ');
    const flagshipBadge = p.flagship
      ? `<span style="display:inline-block;background:${ACCENT};color:#fff;font-size:7px;font-weight:800;text-transform:uppercase;letter-spacing:1px;padding:2px 6px;border-radius:2px;margin-left:8px;">\u2605 ${t.flagshipLabel}</span>`
      : '';

    const timeStr = p.timeSavings
      ? `<div style="font-size:9px;color:${ACCENT};font-weight:700;margin-top:6px;">\u23F1 ${p.timeSavings}</div>`
      : '';

    const bv = p.businessValue.length > 160 ? p.businessValue.slice(0, 157) + '...' : p.businessValue;

    return `<div style="padding:12px 14px;background:#fafbfc;border:1px solid #f0f0f0;border-radius:4px;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;">
        <div style="font-size:12px;font-weight:800;color:#111;">${p.name}${flagshipBadge}</div>
        <div style="font-size:11px;font-weight:800;color:${ACCENT};">${p.salesReady}/10</div>
      </div>
      <div style="font-size:9px;font-weight:600;color:#888;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:6px;">${p.subtitle}</div>
      <div style="font-size:9px;line-height:1.6;color:#555;margin-bottom:6px;">${bv}</div>
      <div style="display:flex;justify-content:space-between;align-items:center;">
        <div style="font-size:8px;color:#888;font-family:monospace;">${stack}</div>
        <div style="font-size:8px;font-weight:700;color:#aaa;text-transform:uppercase;">${t.complexityMap[p.complexity] || p.complexity}</div>
      </div>
      ${timeStr}
    </div>`;
  }).join('');

  const savingsRows = t.timeSavings.map(s =>
    `<tr>
      <td style="padding:4px 8px;font-size:9px;font-weight:600;color:#333;border-bottom:1px solid #f5f5f5;">${s.project}</td>
      <td style="padding:4px 8px;font-size:9px;color:#888;border-bottom:1px solid #f5f5f5;">${s.before}</td>
      <td style="padding:4px 8px;font-size:9px;color:#888;border-bottom:1px solid #f5f5f5;">\u2192</td>
      <td style="padding:4px 8px;font-size:9px;font-weight:600;color:${ACCENT};border-bottom:1px solid #f5f5f5;">${s.after}</td>
      <td style="padding:4px 8px;font-size:10px;font-weight:800;color:${ACCENT};border-bottom:1px solid #f5f5f5;text-align:right;">${s.pct}</td>
    </tr>`
  ).join('');

  // All content is static developer-controlled text (no user input)
  const content = document.createElement('div');
  content.innerHTML = [
    accentBar(),
    sectionTitle('02'),
    sectionHeading(t.impactTitle),
    `<div style="font-size:10px;color:#888;margin-bottom:16px;margin-top:-10px;">${t.impactSubtitle}</div>`,
    `<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:24px;">${projectCards}</div>`,
    thinDivider(20),
    sectionTitle(''),
    sectionHeading(t.timeSavingsTitle),
    `<table style="width:100%;border-collapse:collapse;margin-bottom:8px;">
      <thead>
        <tr>
          <th style="padding:6px 8px;text-align:left;font-size:8px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#aaa;border-bottom:2px solid #eee;">${t.projectLabel}</th>
          <th style="padding:6px 8px;text-align:left;font-size:8px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#aaa;border-bottom:2px solid #eee;">${t.beforeLabel}</th>
          <th style="padding:6px 8px;text-align:center;font-size:8px;color:#aaa;border-bottom:2px solid #eee;"></th>
          <th style="padding:6px 8px;text-align:left;font-size:8px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#aaa;border-bottom:2px solid #eee;">${t.afterLabel}</th>
          <th style="padding:6px 8px;text-align:right;font-size:8px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#aaa;border-bottom:2px solid #eee;">${t.savedLabel}</th>
        </tr>
      </thead>
      <tbody>${savingsRows}</tbody>
    </table>`,
    `<div style="font-size:11px;font-weight:800;color:${ACCENT};padding:10px 14px;background:#f0f4ff;border-radius:4px;text-align:center;">${t.timeSavingsTotal}</div>`,
    pageFooter(t.name, 2),
  ].join('');

  page.appendChild(content);
  return page;
}

/* ── PAGE 3: Full Portfolio + Methodology + Contact ── */

function buildPage3(isRu: boolean, projects: Project[]): HTMLDivElement {
  const t = getTexts(isRu);
  const page = makePage();

  const tableRows = projects.map(p => {
    const flag = p.flagship ? '\u2605 ' : '';
    const stack = p.techStack.slice(0, 3).join(', ');
    const cx = t.complexityMap[p.complexity] || p.complexity;
    const bold = p.flagship ? '700' : '400';
    return `<tr>
      <td style="padding:4px 6px;border-bottom:1px solid #f5f5f5;font-size:9px;font-weight:${bold};color:#222;white-space:nowrap;">${flag}${p.name}</td>
      <td style="padding:4px 6px;border-bottom:1px solid #f5f5f5;font-size:8px;color:#666;">${p.type}</td>
      <td style="padding:4px 6px;border-bottom:1px solid #f5f5f5;font-size:8px;color:#888;font-family:monospace;">${stack}</td>
      <td style="padding:4px 6px;border-bottom:1px solid #f5f5f5;font-size:8px;color:#666;">${cx}</td>
      <td style="padding:4px 6px;border-bottom:1px solid #f5f5f5;font-size:9px;font-weight:700;color:${ACCENT};text-align:center;">${p.salesReady}/10</td>
    </tr>`;
  }).join('');

  const ecosystemHtml = t.ecosystemLinks.map(l =>
    `<div style="font-size:8px;color:#666;line-height:1.6;">\u2022 ${l}</div>`
  ).join('');

  const methodHtml = t.methodology.map(m =>
    `<div style="margin-bottom:6px;">
      <span style="font-size:9px;font-weight:700;color:#333;">${m.title}</span>
      <span style="font-size:9px;color:#888;"> \u2014 ${m.desc}</span>
    </div>`
  ).join('');

  // All content is static developer-controlled text (no user input)
  const content = document.createElement('div');
  content.innerHTML = [
    accentBar(),
    sectionTitle('03'),
    sectionHeading(t.projectsTitle),
    `<table style="width:100%;border-collapse:collapse;margin-bottom:20px;">
      <thead>
        <tr style="background:#f8f9fa;">
          <th style="padding:6px;text-align:left;font-size:8px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#888;border-bottom:2px solid #e5e7eb;">${t.tableCols[0]}</th>
          <th style="padding:6px;text-align:left;font-size:8px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#888;border-bottom:2px solid #e5e7eb;">${t.tableCols[1]}</th>
          <th style="padding:6px;text-align:left;font-size:8px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#888;border-bottom:2px solid #e5e7eb;">${t.tableCols[2]}</th>
          <th style="padding:6px;text-align:left;font-size:8px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#888;border-bottom:2px solid #e5e7eb;">${t.tableCols[3]}</th>
          <th style="padding:6px;text-align:center;font-size:8px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#888;border-bottom:2px solid #e5e7eb;">${t.tableCols[4]}</th>
        </tr>
      </thead>
      <tbody>${tableRows}</tbody>
    </table>`,
    thinDivider(16),
    `<div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-bottom:20px;">
      <div>
        ${sectionTitle('')}
        ${sectionHeading(t.ecosystemTitle)}
        ${ecosystemHtml}
      </div>
      <div>
        ${sectionTitle('')}
        ${sectionHeading(t.methodologyTitle)}
        ${methodHtml}
      </div>
    </div>`,
    thinDivider(16),
    `<div style="background:${ACCENT};color:#fff;padding:20px 24px;border-radius:6px;display:flex;justify-content:space-between;align-items:center;">
      <div>
        <div style="font-size:16px;font-weight:900;text-transform:uppercase;letter-spacing:-0.3px;margin-bottom:4px;">${t.ctaTitle}</div>
        <div style="font-size:10px;font-weight:400;opacity:0.85;">${t.ctaText}</div>
      </div>
      <div style="text-align:right;font-size:10px;font-weight:600;line-height:1.8;">
        <div>Telegram: @DTamarov</div>
        <div>${t.portfolio}</div>
      </div>
    </div>`,
    pageFooter(t.name, 3),
  ].join('');

  page.appendChild(content);
  return page;
}

/* ── Export function ── */

export async function generateCV(
  lang: 'ru' | 'en',
  projects: Project[],
): Promise<void> {
  const { default: jsPDF } = await import('jspdf');
  const { default: html2canvas } = await import('html2canvas');

  const container = document.createElement('div');
  container.style.cssText = 'position:fixed;left:-9999px;top:0;';
  document.body.appendChild(container);

  const isRu = lang === 'ru';

  const page1 = buildPage1(isRu);
  const page2 = buildPage2(isRu, projects);
  const page3 = buildPage3(isRu, projects);
  container.appendChild(page1);
  container.appendChild(page2);
  container.appendChild(page3);

  await new Promise(r => setTimeout(r, 150));

  const canvasOptions = { scale: 2, backgroundColor: '#ffffff', logging: false };
  const [canvas1, canvas2, canvas3] = await Promise.all([
    html2canvas(page1, canvasOptions),
    html2canvas(page2, canvasOptions),
    html2canvas(page3, canvasOptions),
  ]);

  const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const pw = pdf.internal.pageSize.getWidth();
  const ph = pdf.internal.pageSize.getHeight();

  pdf.addImage(canvas1.toDataURL('image/jpeg', 0.95), 'JPEG', 0, 0, pw, ph);
  pdf.addPage();
  pdf.addImage(canvas2.toDataURL('image/jpeg', 0.95), 'JPEG', 0, 0, pw, ph);
  pdf.addPage();
  pdf.addImage(canvas3.toDataURL('image/jpeg', 0.95), 'JPEG', 0, 0, pw, ph);

  const blob = pdf.output('blob');
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `CV-Tamarov-${lang.toUpperCase()}.pdf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);

  document.body.removeChild(container);
}
