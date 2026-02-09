import type { Project } from '../types/portfolio';

const W = 794;
const H = 1123;
const P = 48;
const ACCENT = '#0055FF';
const FONT = 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

function makePage(): HTMLDivElement {
  const div = document.createElement('div');
  div.style.cssText = `width:${W}px;height:${H}px;background:#fff;font-family:${FONT};color:#111;box-sizing:border-box;padding:${P}px;overflow:hidden;`;
  return div;
}

function heading(text: string): string {
  return `<div style="font-size:13px;font-weight:800;text-transform:uppercase;letter-spacing:2px;margin-bottom:16px;">${text}</div>`;
}

function divider(mb = 20): string {
  return `<div style="height:1px;background:#e5e7eb;margin-bottom:${mb}px;"></div>`;
}

function skillBlock(title: string, items: string[]): string {
  return `<div>
    <div style="font-size:11px;font-weight:700;color:${ACCENT};margin-bottom:8px;text-transform:uppercase;letter-spacing:0.5px;">${title}</div>
    <div style="font-size:10px;line-height:1.8;color:#444;">${items.map(i => `&bull; ${i}`).join('<br>')}</div>
  </div>`;
}

interface CVTexts {
  summary: string;
  statLabels: [string, string, string, string];
  skillsTitle: string;
  skills: { title: string; items: string[] }[];
  projectsTitle: string;
  tableCols: [string, string, string, string];
  timeSavingsTitle: string;
  timeSavings: string[];
  timeSavingsTotal: string;
  methodologyTitle: string;
  methodology: string[];
  complexityMap: Record<string, string>;
}

function getTexts(isRu: boolean): CVTexts {
  if (isRu) {
    return {
      summary:
        'Портфолио из 15 проектов, объединённых стратегией автоматизации полного цикла контент-маркетинга и бизнес-процессов с помощью AI — от SEO-анализа и entity-оптимизации до генерации, верификации и публикации контента. Все инструменты разработаны solo с AI-ассистентами (Claude Code, Cursor) и решают реальные задачи в сферах медиа, маркетинга и B2B.',
      statLabels: ['Проектов', 'AI-агентов', 'Строк тестов', 'Экономия времени'],
      skillsTitle: 'Ключевые компетенции',
      skills: [
        {
          title: 'Product Management',
          items: [
            'Multi-agent AI pipeline design',
            'Quality gates и checkpoint-системы',
            'A/B тестирование (лендинги, лид-формы)',
            'Knowledge base design (YAML, facts, cases)',
            'Design systems (Atomic Design, WCAG 2.1 AA)',
          ],
        },
        {
          title: 'AI/LLM Engineering',
          items: [
            'Multi-agent оркестрация (до 14 агентов)',
            'RAG-системы (Gemini, embeddings, vector DB)',
            'MCP-серверы (FastMCP, 13 инструментов)',
            'Fact verification (fuzzy dedup, source tracking)',
            'Structured outputs (Pydantic, JSON Schema)',
          ],
        },
        {
          title: 'Full-Stack Development',
          items: [
            'React 19, SvelteKit 2, Astro 5, TypeScript',
            'Firebase, FastAPI, Docker Compose',
            'Kuzu, Firestore, MySQL, SQLite',
            'GitHub Actions CI/CD, Nginx',
            'GraphQL, REST APIs',
          ],
        },
        {
          title: 'SEO & Content',
          items: [
            'Entity-based SEO (Knowledge Graph)',
            'Автоматизация SEO-исследований',
            'Fact-checking pipelines с верификацией',
            'Plagiarism detection (Text.ru API)',
            'JSON-LD structured data',
          ],
        },
      ],
      projectsTitle: 'Проекты',
      tableCols: ['Проект', 'Тип', 'Стек (топ 3)', 'Готовность'],
      timeSavingsTitle: 'Экономия времени',
      timeSavings: [
        'MediaUniversal: 14-20ч \u2192 ~30 мин (~96%)',
        'Reviews-WB: 8-12 мин/отзыв \u2192 30-60 сек (~97%)',
        'ESI: 20-30ч аналитики \u2192 автоматический аудит (~95%)',
        'Pereplan Presentation: 2-4ч \u2192 30 сек (~99%)',
        'Mamba Trading: 4-8ч/день \u2192 автоматизация (~99%)',
        'Gemini RAG 2.0: 2-4ч/день \u2192 мгновенный ответ (~90%)',
      ],
      timeSavingsTotal: 'Совокупная экономия: ~60-100 человеко-часов ручной работы в неделю',
      methodologyTitle: 'Методология',
      methodology: [
        'Solo + AI Assistants (Claude Code, Cursor)',
        'Итеративная разработка (фазовый подход)',
        'Test-driven quality (pytest, structured logging)',
        'Documentation-first (CLAUDE.md, PRD.md, QUICKSTART.md)',
        'CI/CD (GitHub Actions, Docker Compose)',
        'Design Systems (Tailwind, tokens, accessibility)',
      ],
      complexityMap: { High: 'Высокая', Medium: 'Средняя', Low: 'Низкая' },
    };
  }
  return {
    summary:
      'Portfolio of 15 projects united by a strategy of full-cycle automation of content marketing and business processes with AI — from SEO analysis and entity optimization to content generation, verification, and publication. All tools built solo with AI assistants (Claude Code, Cursor) solving real-world problems in media, marketing, and B2B.',
    statLabels: ['Projects', 'AI Agents', 'Test Lines', 'Time Savings'],
    skillsTitle: 'Core Competencies',
    skills: [
      {
        title: 'Product Management',
        items: [
          'Multi-agent AI pipeline design',
          'Quality gates & checkpoint systems',
          'A/B testing (landing pages, lead forms)',
          'Knowledge base design (YAML, facts, cases)',
          'Design systems (Atomic Design, WCAG 2.1 AA)',
        ],
      },
      {
        title: 'AI/LLM Engineering',
        items: [
          'Multi-agent orchestration (up to 14 agents)',
          'RAG systems (Gemini, embeddings, vector DB)',
          'MCP servers (FastMCP, 13 tools)',
          'Fact verification (fuzzy dedup, source tracking)',
          'Structured outputs (Pydantic, JSON Schema)',
        ],
      },
      {
        title: 'Full-Stack Development',
        items: [
          'React 19, SvelteKit 2, Astro 5, TypeScript',
          'Firebase, FastAPI, Docker Compose',
          'Kuzu, Firestore, MySQL, SQLite',
          'GitHub Actions CI/CD, Nginx',
          'GraphQL, REST APIs',
        ],
      },
      {
        title: 'SEO & Content',
        items: [
          'Entity-based SEO (Knowledge Graph)',
          'Automated SEO research & analysis',
          'Fact-checking pipelines with verification',
          'Plagiarism detection (Text.ru API)',
          'JSON-LD structured data',
        ],
      },
    ],
    projectsTitle: 'Projects',
    tableCols: ['Project', 'Type', 'Stack (top 3)', 'Sales-Ready'],
    timeSavingsTitle: 'Time Savings',
    timeSavings: [
      'MediaUniversal: 14-20h \u2192 ~30 min (~96%)',
      'Reviews-WB: 8-12 min/review \u2192 30-60 sec (~97%)',
      'ESI: 20-30h analytics \u2192 automated audit (~95%)',
      'Pereplan Presentation: 2-4h \u2192 30 sec (~99%)',
      'Mamba Trading: 4-8h/day \u2192 full automation (~99%)',
      'Gemini RAG 2.0: 2-4h/day \u2192 instant AI answer (~90%)',
    ],
    timeSavingsTotal: 'Total savings: ~60-100 person-hours of manual work per week',
    methodologyTitle: 'Methodology',
    methodology: [
      'Solo + AI Assistants (Claude Code, Cursor)',
      'Iterative delivery (phased development)',
      'Test-driven quality (pytest, structured logging)',
      'Documentation-first (CLAUDE.md, PRD.md, QUICKSTART.md)',
      'CI/CD (GitHub Actions, Docker Compose)',
      'Design Systems (Tailwind, tokens, accessibility)',
    ],
    complexityMap: { High: 'High', Medium: 'Medium', Low: 'Low' },
  };
}

/* All HTML content below is developer-controlled static text — no user input, no XSS risk */

function buildPage1(isRu: boolean): HTMLDivElement {
  const t = getTexts(isRu);
  const page = makePage();

  const statsHtml = [
    { value: '15', label: t.statLabels[0], accent: true },
    { value: '25+', label: t.statLabels[1], accent: false },
    { value: '1592', label: t.statLabels[2], accent: false },
    { value: '~96%', label: t.statLabels[3], accent: true },
  ]
    .map(
      s => `<div style="flex:1;padding:16px;background:#f8f9fa;border-radius:6px;border:1px solid #eee;">
        <div style="font-size:26px;font-weight:900;color:${s.accent ? ACCENT : '#111'};">${s.value}</div>
        <div style="font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#888;margin-top:4px;">${s.label}</div>
      </div>`,
    )
    .join('');

  const skillsHtml = t.skills.map(s => skillBlock(s.title, s.items)).join('');

  const name = isRu ? 'Дмитрий Тамаров' : 'Dmitrij Tamarov';
  const location = isRu ? 'Москва, Россия' : 'Moscow, Russia';

  // Using textContent where possible; innerHTML only for trusted static markup
  const content = document.createElement('div');

  // Blue bar
  const bar = document.createElement('div');
  bar.style.cssText = `height:4px;background:${ACCENT};margin-bottom:32px;`;
  content.appendChild(bar);

  // Name
  const nameEl = document.createElement('div');
  nameEl.style.cssText = 'font-size:32px;font-weight:900;letter-spacing:-0.5px;text-transform:uppercase;line-height:1.1;margin-bottom:6px;';
  nameEl.textContent = name;
  content.appendChild(nameEl);

  // Role
  const roleEl = document.createElement('div');
  roleEl.style.cssText = 'font-size:15px;color:#555;font-weight:500;margin-bottom:12px;';
  roleEl.textContent = 'Product Manager / AI Automation Architect';
  content.appendChild(roleEl);

  // Contact
  const contactEl = document.createElement('div');
  contactEl.style.cssText = 'font-size:11px;color:#888;margin-bottom:28px;display:flex;gap:16px;';
  const loc = document.createElement('span');
  loc.textContent = location;
  const tg = document.createElement('span');
  tg.textContent = 'Telegram: @DTamarov';
  contactEl.appendChild(loc);
  contactEl.appendChild(tg);
  content.appendChild(contactEl);

  // Rest uses innerHTML for complex layout — all content is static/trusted
  const rest = document.createElement('div');
  rest.innerHTML = [
    divider(20),
    `<div style="font-size:12px;line-height:1.7;color:#333;margin-bottom:28px;">${t.summary}</div>`,
    `<div style="display:flex;gap:12px;margin-bottom:28px;">${statsHtml}</div>`,
    divider(20),
    heading(t.skillsTitle),
    `<div style="display:grid;grid-template-columns:1fr 1fr;gap:20px 32px;">${skillsHtml}</div>`,
  ].join('');
  content.appendChild(rest);

  page.appendChild(content);
  return page;
}

function buildPage2(isRu: boolean, projects: Project[]): HTMLDivElement {
  const t = getTexts(isRu);
  const page = makePage();

  const tableRows = projects
    .map(p => {
      const flag = p.flagship ? '\u2605 ' : '';
      const stack = p.techStack.slice(0, 3).join(', ');
      const cx = t.complexityMap[p.complexity] || p.complexity;
      const bold = p.flagship ? '700' : '400';
      return `<tr>
        <td style="padding:5px 8px;border-bottom:1px solid #f0f0f0;font-size:10px;font-weight:${bold};">${flag}${p.name}</td>
        <td style="padding:5px 8px;border-bottom:1px solid #f0f0f0;font-size:10px;color:#555;">${p.type}</td>
        <td style="padding:5px 8px;border-bottom:1px solid #f0f0f0;font-size:9px;color:#666;">${stack}</td>
        <td style="padding:5px 8px;border-bottom:1px solid #f0f0f0;font-size:10px;color:#555;">${cx}</td>
        <td style="padding:5px 8px;border-bottom:1px solid #f0f0f0;font-size:10px;font-weight:600;color:${ACCENT};">${p.salesReady}/10</td>
      </tr>`;
    })
    .join('');

  const content = document.createElement('div');

  // Blue bar
  const bar = document.createElement('div');
  bar.style.cssText = `height:4px;background:${ACCENT};margin-bottom:28px;`;
  content.appendChild(bar);

  // Table + rest — all content is static/trusted developer data
  const rest = document.createElement('div');
  rest.innerHTML = [
    heading(t.projectsTitle),
    `<table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
      <thead><tr style="background:#f8f9fa;">
        <th style="padding:8px;text-align:left;font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#555;border-bottom:2px solid #e5e7eb;">${t.tableCols[0]}</th>
        <th style="padding:8px;text-align:left;font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#555;border-bottom:2px solid #e5e7eb;">${t.tableCols[1]}</th>
        <th style="padding:8px;text-align:left;font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#555;border-bottom:2px solid #e5e7eb;">${t.tableCols[2]}</th>
        <th style="padding:8px;text-align:left;font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#555;border-bottom:2px solid #e5e7eb;">${isRu ? 'Сложность' : 'Complexity'}</th>
        <th style="padding:8px;text-align:left;font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#555;border-bottom:2px solid #e5e7eb;">${t.tableCols[3]}</th>
      </tr></thead>
      <tbody>${tableRows}</tbody>
    </table>`,
    divider(20),
    heading(t.timeSavingsTitle),
    `<div style="font-size:10px;line-height:1.8;color:#444;margin-bottom:8px;">${t.timeSavings.map(s => '&bull; ' + s).join('<br>')}</div>`,
    `<div style="font-size:11px;font-weight:700;color:${ACCENT};margin-bottom:24px;">${t.timeSavingsTotal}</div>`,
    divider(20),
    heading(t.methodologyTitle),
    `<div style="font-size:10px;line-height:1.8;color:#444;">${t.methodology.map(m => '&bull; ' + m).join('<br>')}</div>`,
  ].join('');
  content.appendChild(rest);

  // Footer
  const footer = document.createElement('div');
  footer.style.cssText = `position:absolute;bottom:${P}px;right:${P}px;font-size:9px;color:#ccc;`;
  footer.textContent = `\u00A9 2026 ${isRu ? 'Дмитрий Тамаров' : 'Dmitrij Tamarov'}`;
  page.style.position = 'relative';

  page.appendChild(content);
  page.appendChild(footer);
  return page;
}

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
  container.appendChild(page1);
  container.appendChild(page2);

  // Allow browser to render
  await new Promise(r => setTimeout(r, 100));

  const [canvas1, canvas2] = await Promise.all([
    html2canvas(page1, { scale: 2, backgroundColor: '#ffffff', logging: false }),
    html2canvas(page2, { scale: 2, backgroundColor: '#ffffff', logging: false }),
  ]);

  const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const pw = pdf.internal.pageSize.getWidth();
  const ph = pdf.internal.pageSize.getHeight();

  pdf.addImage(canvas1.toDataURL('image/jpeg', 0.95), 'JPEG', 0, 0, pw, ph);
  pdf.addPage();
  pdf.addImage(canvas2.toDataURL('image/jpeg', 0.95), 'JPEG', 0, 0, pw, ph);

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
