# Portfolio PRD: AI-Driven Content & Marketing Automation

**Автор:** Дмитрий Тамаров
**Роль:** Product Manager / AI Automation Architect
**Дата:** 2026-02-07
**Домен:** Marketing / AdTech, Media & Content Production
**Формат:** Resume + PRD Hybrid

---

## Executive Summary

Портфолио из 15 проектов, объединённых общей стратегией: **автоматизация полного цикла контент-маркетинга и бизнес-процессов с помощью AI** — от SEO-анализа и entity-оптимизации до генерации, верификации и публикации контента, управления отзывами и создания корпоративных сайтов. Все инструменты разработаны solo с AI-ассистентами (Claude Code, Cursor) и решают реальные задачи в сферах медиа, маркетинга и B2B.

### Карта экосистемы

```
SEO Intelligence          Content Production           Knowledge & Research
─────────────────         ────────────────────         ────────────────────
knowledge-graph (ESI)  →  copiwriter              ←   search-&-fact-check
     ↓ entity data           ↓ content pipeline             ↓ fact verification
     ↓                  MediaUniversal              ←   embedding-google
     ↓ SEO insights                                     gemini-light-rag2.0
     ↓                                                  ↓ RAG knowledge base
     ↓                                                     ↓
textru ─────────────→   dzen (Яндекс.Дзен)         reviews-wb
  plagiarism check       ↑ content adaptation        marketplace reviews
     ↓                   ↓                              ↓ sentiment routing
stitch ──────────────→  pereplan (GSD) site         pereplan-presentation
  design system          ↓ corporate site             AI presentations
     ↓
uxkit ──────────────→  site3-0 (headless CMS)
  design tokens          WordPress + SvelteKit
```

---

## Проект 1: MediaUniversal

### Multi-Agent AI Content Pipeline

> **Флагманский проект.** Самый технически сложный — 14+ AI-агентов, crash-safe архитектура, 1592 строки тестов.

#### Бизнес-ценность

Полностью автоматизирует создание SEO-оптимизированных статей: от исследования конкурентов до публикации. Заменяет работу команды из 4-5 человек (SEO-аналитик, копирайтер, фактчекер, редактор, мета-специалист).

#### Автоматизируемые процессы

| Этап | Агенты | Что делает | Время |
|------|--------|-----------|-------|
| Research | OSINT Analytic + Gold Panner | Анализ конкурентов через Serper/Tavily, агрегация SEO-метрик | 5-8 мин |
| Blueprint | Competitor Synth + User Advocate + Architector | Структура статьи на основе анализа рынка | 2-3 мин |
| Draft | Draft Writer | Скелетный черновик с маркерами `[[ДАННЫЕ ОТСУТСТВУЮТ]]` | 2-3 мин |
| Factaudit | Fact Auditor + Fact Researcher | Верификация фактов с fuzzy-кешированием (rapidfuzz 85%) | 3-5 мин |
| Editorial | 6-agent chain (Strategist → Writer → Editor → UX → SEO → Chief) | Финальная полировка статьи | 8-10 мин |
| Meta | Meta Generator | SEO-метатеги (title, description, keywords) | 1-2 мин |

**Итого: ~20-30 минут на статью. Ручной труд: 2-5 минут (ответы на фактчек-вопросы).**

#### Экономия ручного времени

| Задача | Ручной процесс | С MediaUniversal | Экономия |
|--------|----------------|------------------|----------|
| SEO-исследование | 3-4 часа | 5-8 мин (авто) | ~95% |
| Написание структуры | 1-2 часа | 2-3 мин (авто) | ~97% |
| Написание черновика | 4-6 часов | 2-3 мин (авто) | ~98% |
| Фактчекинг | 2-3 часа | 3-5 мин + 2-5 мин ручных | ~90% |
| Редактура (6 проходов) | 3-4 часа | 8-10 мин (авто) | ~95% |
| SEO-мета | 30 мин | 1-2 мин (авто) | ~95% |
| **Итого на статью** | **~14-20 часов** | **~30 мин** | **~96%** |

#### Tech Stack

```
Core:       Python 3.11+, Bash
AI:         Claude CLI (subprocess, haiku/sonnet/opus per step)
APIs:       Tavily API (search + extract), Serper API (Google SERP)
Data:       Pydantic 2.0+, PyYAML, Jinja2 (prompt templates)
Quality:    rapidfuzz (fuzzy dedup), BeautifulSoup4
Testing:    pytest 8.0+, pytest-asyncio (1592 строк тестов, 11 файлов)
Logging:    JSONL structured logs (per-article + daily global)
State:      Atomic YAML writes (temp + fsync + os.replace)
```

#### Стадия и стабильность

| Критерий | Оценка |
|----------|--------|
| Code quality | Excellent — type hints, docstrings, atomic writes |
| Test coverage | Solid — 11 test files, core utilities covered |
| Error handling | Production — retry с exponential backoff, crash-safe state |
| Documentation | Excellent — QUICKSTART.md, CLAUDE.md, PRD.md, inline docs |
| Resumability | Yes — state.yaml + partial checkpoints |
| **Sales-ready** | **8/10** — нужен UI и multi-tenant support |

#### Планы развития

- Параллелизация editorial chain (сейчас sequential, 600s timeout)
- Async batch processing для нескольких статей
- Web UI для мониторинга pipeline
- Cloud persistence (сейчас local filesystem)

---

## Проект 2: Entity SEO Intelligence (ESI)

### Knowledge Graph MCP Server для Entity-Based SEO

> **Флагманский проект.** 13 MCP-инструментов, графовая БД Kuzu, 115 тестов, Streamlit dashboard.

#### Бизнес-ценность

Анализирует, как Google воспринимает бренд через Knowledge Graph entities. Даёт SEO-специалисту инструменты для entity-based оптимизации — подход, который выходит за рамки классического keyword SEO.

#### Автоматизируемые процессы

| Workflow | Что делает | Ручная альтернатива |
|----------|-----------|---------------------|
| Brand Audit | Поиск entity в KG → snapshot → diff с предыдущим | 4-6 часов ручного research |
| Entity Landscape | Multi-keyword entity mapping, cross-keyword analysis | 8-12 часов аналитики |
| Brand Monitoring | Scheduled audit + threshold alerting (score drop, type change, lost entity) | Невозможно вручную |
| Content Planning | Entity classification: pillar/cluster/supporting tiers | 3-4 часа стратегии |

**Экономия: ~20-30 часов аналитической работы на один бренд-аудит.**

#### Tech Stack

```
Core:       Python 3.11+, FastMCP 2.14+ (MCP server framework)
Database:   Kuzu 0.7+ (embedded graph DB, 5 node + 6 relationship tables)
APIs:       Google Knowledge Graph API, Wikidata SPARQL, Google CSE
Validation: Pydantic 2.0+, pydantic-settings
Dashboard:  Streamlit 1.30+ (5-page multipage app), Pyvis (graph viz)
Testing:    pytest 8.0+, pytest-asyncio (115 tests, 14 files)
Build:      uv, hatchling
```

#### Архитектура

```
Claude CLI ←→ FastMCP Server (stdio)
                   ↓
         ┌─────────┴──────────┐
    EntityProvider ABC    Kuzu Graph DB
    ├─ Google KG         ├─ Project
    ├─ Wikidata          ├─ Entity
    └─ Google CSE        ├─ Keyword
                         ├─ Snapshot
                         └─ Alert
```

#### Стадия и стабильность

| Критерий | Оценка |
|----------|--------|
| Code quality | High — clean separation, proper async patterns |
| Test coverage | Excellent — 115 tests, offline fixtures |
| Documentation | Excellent — PRD (40KB), PROGRESS, BEST_PRACTICES, GUIDE |
| Error handling | Good — ToolError for user-facing, fallback strategies |
| **Sales-ready** | **7/10** — production-ready MCP, нужен SaaS wrapper |

#### Планы развития

- Миграция с Google KG API (deprecation risk) → Wikidata as primary
- Scheduled cron monitoring с email/Telegram alerts
- Multi-tenant project management
- API rate limit pooling для CSE (100/day limit)

---

## Проект 3: Gemini Light RAG 2.0

### Team Knowledge Base Chat System

> Полноценное full-stack приложение с Firebase backend, Cloud Functions, team management.

#### Бизнес-ценность

Позволяет команде (2-10 человек) загружать документы и задавать вопросы по ним через AI-чат. Замена ручного поиска по инструкциям, регламентам, базам знаний.

#### Автоматизируемые процессы

- Document indexing + embedding (Gemini FileSearch)
- Semantic Q&A с citation tracking
- Auto-generated chat titles
- Query caching с TTL
- Team invitations + role-based access (Admin/Editor/Viewer)
- Per-user daily query limits
- Chat export to Markdown
- RAG store auto-recovery

**Экономия: 2-4 часа/день на поиск информации в документации для команды из 5 человек.**

#### Tech Stack

```
Frontend:   React 19.2, TypeScript 5.8, Vite 6.2, Tailwind CSS
AI:         Google Gemini API (@google/genai), models: flash/pro/3-preview
Backend:    Firebase (Auth, Firestore, Storage, Cloud Functions Node.js v20)
State:      React Context API, custom hooks (11 hooks)
Components: 21+ React components, 92 TS/TSX files
```

#### Стадия и стабильность

| Критерий | Оценка |
|----------|--------|
| Code quality | Good — strict TypeScript, proper hooks |
| Test coverage | Missing — no automated tests |
| Features | Complete — v1.0, 6 phases delivered |
| Error handling | Present — try-catch, loading states, RAG recovery |
| **Sales-ready** | **6/10** — нужны тесты, i18n, SaaS billing |

---

## Проект 4: Copiwriter

### AI Content Creation System с Knowledge Base

> Зрелая система с 7 агентами, 3 checkpoint'ами, YAML-базами фактов и кейсов.

#### Бизнес-ценность

Semi-автоматическое создание экспертного контента с сохранением Tone of Voice бренда. Верифицирует факты по базе данных, интегрирует реальные кейсы и цитаты клиентов.

#### Автоматизируемые процессы

```
progress/ [материалы]
    ↓
Distributor → SEO-Analyst → CHECKPOINT 1
    ↓
Context-Manager → Copywriter → CHECKPOINT 2
    ↓                              ↓
Interactive-Specialist (parallel)  /factcheck [data]
    ↓
Factchecker → Editor → CHECKPOINT 3 → done/
```

**7 статей shipped. 4 типа контента: how-to, comparison, listicle, review.**

**Экономия: ~12-16 часов на экспертную статью (с учётом checkpoint'ов ~2-3 часа участия человека).**

#### Tech Stack

```
Platform:   Claude AI Skills (custom prompts)
Language:   Markdown, YAML (config + databases), Bash (scripts)
Quality:    lint-article.sh (automated checks: emoji, meta, H2, TL;DR)
Knowledge:  YAML databases (facts с sources/expiry, cases с metrics)
VCS:        Git (atomic commits per stage)
```

#### Стадия и стабильность

| Критерий | Оценка |
|----------|--------|
| Code quality | Good — versioned (v1.6), 47+ commits |
| Quality gates | Excellent — 3 checkpoints + automated linting |
| Knowledge base | Production — 8+ facts, 6 cases, glossary, ToV guide |
| Token optimization | v1.1 achieved 60% reduction |
| **Sales-ready** | **6/10** — domain-specific, нужна адаптация под клиентов |

---

## Проект 5: Embedding Google

### NotebookLM-Inspired Document Analysis Platform

> Персональный аналог NotebookLM: загрузка документов, RAG-чат, mind maps, reports.

#### Бизнес-ценность

AI-ассистент для работы с документами: загружаете PDF/TXT/HTML, задаёте вопросы, получаете ответы с citations, генерируете отчёты и mind maps.

#### Ключевые фичи

- Multi-notebook management с emoji и фильтрацией
- Drag-and-drop upload (10+ форматов)
- AI-chat с grounding citations
- Auto-generated starter questions (4) + follow-up suggestions (3)
- Report generation (markdown briefings)
- Interactive mind maps (React Flow)
- Rich notes editor (TipTap)
- Google Sign-In + Firebase persistence

#### Tech Stack

```
Frontend:   React 19.2, TypeScript 5.8, Vite 6.2
AI:         Google Gemini API + FileSearch/RAG
Backend:    Firebase (Auth, Firestore, offline persistence)
Viz:        React Flow (mind maps), html-to-image (export)
Editor:     TipTap 3.18 (rich text)
State:      Zustand (mind map store)
Files:      69 TS/TSX files, 6 development phases completed
```

**Экономия: 1-3 часа/день на работу с документацией и research.**

| Критерий | Оценка |
|----------|--------|
| **Sales-ready** | **5/10** — v1.0, нужны тесты и i18n |

---

## Проект 6: Veritas (Search & Fact-Check)

### AI Research & Fact-Checking Tool

> Лёгкий инструмент: поиск с Google Grounding + верификация Markdown-документов.

#### Бизнес-ценность

Два режима: (1) интерактивный поиск с source attribution, (2) автоматическая проверка фактов в документе с вердиктами по каждому утверждению (True/False/Mixed/Unverified).

#### Tech Stack

```
Frontend:   React 19.2, TypeScript 5.8, Vite 6.2, Tailwind CSS
AI:         Gemini 3 Flash (search) + Gemini 3 Pro (fact-check)
Feature:    Google Search Grounding (real-time web verification)
Size:       712 lines TypeScript, 8 source files
```

**Экономия: 30-60 минут на fact-check одного документа.**

| Критерий | Оценка |
|----------|--------|
| **Sales-ready** | **3/10** — prototype/MVP, нужен backend и auth |

---

## Проект 7: Stitch

### Design System & Landing Page Exports

> Экспорты дизайнов: 9 вариантов лендингов и лид-форм для A/B тестирования.

#### Бизнес-ценность

Набор production-ready дизайнов для компании SPB CSP (Центр Согласования Перепланировок, Санкт-Петербург). 5 вариантов лид-форм + 3 варианта лендингов для конверсионной оптимизации.

#### Tech Stack

```
Frontend:   HTML5, Tailwind CSS (CDN), Material Symbols
Fonts:      Inter, Montserrat, Open Sans, Work Sans
Format:     ZIP-архивы (code.html + screen.png)
Variants:   5 lead forms + 3 landing pages = 8 A/B variants
```

| Критерий | Оценка |
|----------|--------|
| **Sales-ready** | **7/10** — дизайны готовы, нужна backend-интеграция форм |

---

## Проект 8: Reviews-WB

### Multi-Agent Review Processing для Wildberries/Ozon

> **6 AI-агентов** (Claude Haiku + Sonnet), sentiment routing, валидация галлюцинаций, веб-интерфейс + SQLite.

#### Бизнес-ценность

Автоматизирует ответы на отзывы маркетплейсов: анализирует тональность, генерирует персонализированные ответы, проверяет качество. Негативные отзывы проходят через workflow одобрения менеджера. В 10-20 раз быстрее ручной работы.

#### Автоматизируемые процессы

| Этап | Агент | Что делает | Время |
|------|-------|-----------|-------|
| Парсинг | Claude Haiku | Извлечение структурированных данных из свободного текста | 1-2 сек |
| Анализ + Генерация | Claude Sonnet | Определение тональности, роутинг, персонализированный ответ | 2-3 сек |
| Валидация | Claude Haiku | Hallucination detection, проверка персонализации, quality score (0-1) | 1-2 сек |
| Одобрение | Менеджер | Негативные → одобрение менеджера; позитивные → авто-публикация | — |

**Итого: 30-60 секунд на отзыв vs 8-12 минут вручную.**

#### Экономия ручного времени

| Объём | Ручной процесс | С Reviews-WB | Экономия |
|-------|----------------|--------------|----------|
| 1 отзыв | 8-12 мин | 30-60 сек | ~97% |
| 100 отзывов | 13-20 часов | 50-100 мин | ~97% |
| 10 отзывов/день | ~1.5 часа/день | ~8 мин/день | ~3 650 ч/год |

#### Tech Stack

```
Core:       Python 3.14, FastAPI 0.115, Uvicorn 0.30
AI:         anthropic 0.39 (Claude Haiku — парсинг/валидация, Sonnet — анализ/генерация)
Data:       Pydantic, aiosqlite (SQLite async)
Frontend:   HTML5 + Vanilla JS + CSS3, Jinja2 3.1.4
Config:     python-dotenv 1.0.1
API:        5 endpoints (process, regenerate, update, list, detail)
```

#### Архитектура

```
Web UI (HTML/JS/CSS)
        ↓
FastAPI REST API (5 routes)
        ↓
AI Orchestrator (process_single_review)
        ↓
┌───────────────┬──────────────────────┬───────────────┐
│ Parser        │ Analyzer+Generator   │ Validator     │
│ (Haiku)       │ (Sonnet)             │ (Haiku)       │
└───────────────┴──────────────────────┴───────────────┘
        ↓
SQLite DB (17 полей) + JSON Output
```

#### Стадия и стабильность

| Критерий | Оценка |
|----------|--------|
| Code quality | Good — модульная архитектура, Pydantic модели, async/await |
| Test coverage | Missing — ручное тестирование через веб-интерфейс |
| Error handling | Strong — fallback на уровне каждого review, batch не падает |
| Documentation | Good — README, CLAUDE.md, PRD.md, 6 спецификаций агентов (22 KB) |
| **Sales-ready** | **7/10** — нужны тесты, multi-marketplace (Ozon, Yandex.Market) |

#### Метрики

| Метрика | Значение |
|---------|----------|
| Backend LOC | 881 (7 файлов Python) |
| Frontend LOC | 1 636 (HTML/JS/CSS) |
| Агентов | 6 специализированных |
| API endpoints | 5 |
| Таблиц БД | 1 (17 полей) |
| Документация | 30+ KB (6 markdown-файлов) |

#### Планы развития

- Multi-marketplace: Ozon, Yandex.Market, Avito
- A/B тестирование стратегий ответов
- Настраиваемый голос бренда
- Экспорт в CSV/Excel

---

## Проект 9: Pereplan (GSD Corporate Site)

### SEO-Driven Corporate Website на Astro

> Production-сайт на soglasovanie.su: Astro 5, 50+ страниц, CI/CD через GitHub Actions → FTP, Sveltia CMS.

#### Бизнес-ценность

Корпоративный сайт ООО "АПМ-1" (Москва) — архитектурно-согласовательная компания, специализирующаяся на перепланировках квартир с 2011 года. Основной канал привлечения клиентов через органический поиск (Яндекс/Google).

#### Ключевые фичи

- 34 услуги в 6 категориях с ценами
- 7+ экспертных статей (Content Collections с Zod-валидацией)
- Интерактивные калькуляторы (стоимость ПИК, САМОЛЁТ, допуски площадей, мощность)
- Лид-формы с Formspree + honeypot spam-защита + IMask телефон (+7)
- JSON-LD structured data (Organization, BlogPosting, LocalBusiness)
- Build-time валидация: уникальность meta descriptions, проверка внутренних ссылок
- Sveltia CMS (Git-based headless CMS для не-технических редакторов)

#### Tech Stack

```
Framework:  Astro 5.16, TypeScript 5.9 (strict mode)
Styling:    Tailwind CSS 4.1 (@tailwindcss/vite)
Forms:      Formspree (serverless), IMask 7.6 (phone validation)
SEO:        @astrojs/sitemap 3.7, @astrojs/rss 4.0, JSON-LD
CMS:        Sveltia CMS (CDN), Netlify OAuth Proxy
CI/CD:      GitHub Actions → FTP Deploy (SamKirkland/FTP-Deploy-Action v4.3.5)
Pipeline:   Build → Deploy → Smoke Test (curl 5 critical pages)
Domain:     soglasovanie.su
```

#### Архитектура CI/CD

```
Push to main → GitHub Actions
    ↓
Job 1: Build (Node 20, npm ci, astro build)
    ↓
Job 2: Deploy (FTP incremental sync)
    ↓
Job 3: Smoke Test (curl 5 pages, fail on non-200)
```

#### Стадия и стабильность

| Критерий | Оценка |
|----------|--------|
| Code quality | Excellent — TypeScript strict, Zod schemas, build-time validation |
| Test coverage | Build-time — content validation + post-deploy smoke tests |
| SEO | Excellent — sitemap, RSS, JSON-LD, OG tags, canonical URLs |
| Documentation | Excellent — .planning/ (PROJECT, REQUIREMENTS, ROADMAP, STATE), 125 Git commits |
| Files | 64 source files, 12,759 LOC |
| **Sales-ready** | **9/10** — production deployed, нужна CMS-интеграция для editorial workflow |

---

## Проект 10: UXKit (Yandex.Arenda)

### Production Design System

> Полная дизайн-система для Яндекс.Аренда: 30+ компонентов, Atomic Design, WCAG 2.1 AA, 10,227 строк документации.

#### Бизнес-ценность

Комплексная дизайн-система и библиотека компонентов для платформы аренды недвижимости Яндекс.Аренда. Стандартизирует интерфейсы, обеспечивает WCAG 2.1 AA accessibility, ускоряет разработку через переиспользуемые компоненты.

#### Архитектура (Atomic Design)

| Уровень | Компоненты | Примеры |
|---------|-----------|---------|
| **Atoms** (12) | Базовые элементы | Button (6 вариантов × 3 размера), Input (8 типов), Badge, Avatar, Toggle |
| **Molecules** (12) | Простые группы | PropertyCard (4 варианта), Alert (4 типа), Pagination, Filter Chip, Stat Card |
| **Organisms** (8+) | Сложные секции | Navigation Header (5 вариантов), Filter Panel, Hero, Modal, Dashboard |
| **Patterns** (1) | Полные workflows | Search & Filter (autocomplete, active filters, results, pagination) |

#### Design Tokens

```
Colors:     40+ цветов (brand #7d24ff, semantic, neutral, 10-shade palettes)
Typography: YS Text + Halvar Breitschrift, 9 размеров (12-44px), 4 weight'а
Spacing:    15 значений на 8px grid (2px-96px)
Effects:    7 уровней shadow, 6 border-radius, 3 transition duration'а
Z-index:    7 слоёв (0-1060)
```

#### Tech Stack

```
CSS:        Tailwind CSS 3.4, @tailwindcss/forms 0.5.7
Build:      PostCSS 8.4, Autoprefixer 10.4
Fonts:      YS Text (primary), Halvar Breitschrift (display)
Docs:       23 markdown файлов, 10,227 строк
Browsers:   Chrome, Firefox, Safari, Edge (last 2 versions)
```

#### Accessibility (WCAG 2.1 AA)

- Keyboard navigation + visible focus indicators (ring: 2px, purple)
- ARIA attributes (aria-label, aria-describedby, aria-invalid, aria-live)
- Color contrast: primary text ~17.8:1 (AAA), secondary ~7.5:1 (AA)
- Touch targets: minimum 44×44px
- `prefers-reduced-motion` support
- Semantic HTML: `<header>`, `<nav>`, `<main>`, `<article>`, `<footer>`

#### Стадия и стабильность

| Критерий | Оценка |
|----------|--------|
| Code quality | Excellent — comprehensive tokens, atomic methodology |
| Documentation | Outstanding — 23 файлов, 10,227 LOC, code examples в каждом компоненте |
| Accessibility | WCAG 2.1 AA — keyboard nav, ARIA, contrast ratios, reduced-motion |
| Responsive | 5 breakpoints (sm-2xl), mobile-first, touch-friendly |
| **Sales-ready** | **8/10** — production-ready design system, нужна имплементация в React/Vue |

---

## Проект 11: Site3-0

### Headless WordPress + SvelteKit Platform

> Docker-оркестрация: WordPress backend + SvelteKit SSR frontend + Nginx + MySQL, GraphQL API.

#### Бизнес-ценность

Современная headless CMS архитектура: WordPress для управления контентом + SvelteKit для быстрого фронтенда с SSR. Независимое масштабирование, изоляция безопасности, modern developer experience.

#### Tech Stack

```
Frontend:   SvelteKit 2.0, Svelte 5.0, TypeScript 5.0, Tailwind CSS 3.4, Vite 5.0
API:        GraphQL 16.8 + graphql-request 6.1
Backend:    WordPress 6.7, PHP 8.3 (Apache)
Database:   MySQL 8.0
Infra:      Docker Compose (4 containers), Nginx (reverse proxy, SSL/TLS)
AI:         ModelContextProtocol SDK 1.20 (Claude integration)
Icons:      Lucide Svelte 0.460
Quality:    ESLint 8.56, Prettier 3.1
```

#### Архитектура

```
Internet → Nginx (80/443, SSL termination)
              ├── SvelteKit (3000) — SSR frontend
              └── WordPress (8080) — headless CMS
                      └── MySQL 8.0 (3306) — database
```

#### Стадия и стабильность

| Критерий | Оценка |
|----------|--------|
| Code quality | Good — TypeScript, ESLint + Prettier, modular structure |
| Documentation | Good — PROJECT_STATUS, DEPLOYMENT, CONTINUE_HERE (deployment guide 320 строк) |
| Deployment | Ready — Docker Compose, deploy scripts, backup scripts, SSH configured |
| Security | Good — DISALLOW_FILE_EDIT, isolated DB, SSL/TLS termination |
| **Sales-ready** | **6/10** — ready for deployment, нужен production domain и content |

---

## Проект 12: TextRu (Antiplagiat)

### Plagiarism Detection & LLM Refactoring Service

> FastAPI REST API + Text.ru integration + автоматическая генерация LLM-инструкций для рерайта.

#### Бизнес-ценность

Автоматизирует проверку контента на плагиат через Text.ru API с интеллектуальным рефакторингом: если уникальность ниже порога (80%), генерирует инструкции для LLM-рерайта с контекстом найденных заимствований.

#### Автоматизируемые процессы

- Batch-проверка Markdown-статей через CLI
- Polling с exponential backoff (Text.ru API)
- Color-coded HTML-разметка заимствований (красный 90%+, оранжевый 70-89%, жёлтый <70%)
- Автоматическая генерация LLM-инструкций для рерайта
- Итеративная проверка (до 3 попыток)

#### Tech Stack

```
Core:       Python 3.11, FastAPI 0.104, Uvicorn 0.24
API:        Text.ru Plagiarism API (polling-based)
Validation: Pydantic 2.5, python-multipart 0.0.6
Processing: Markdown 3.5 (MD parsing), Colorama 0.4 (terminal)
Optional:   Google Sheets API (batch reporting)
Deploy:     Docker Compose, persistent JSON storage
Endpoints:  POST /api/check, GET /api/result/{uid}, GET /api/formatted/{uid}, GET /api/all
```

#### Стадия и стабильность

| Критерий | Оценка |
|----------|--------|
| Code quality | Good — OOP design, type hints, error handling |
| Documentation | Excellent — 6 документов (README, QUICKSTART, USAGE, LLM_REFACTOR_GUIDE, PROJECT_STRUCTURE, COMPLETION_SUMMARY), 1,800+ строк |
| Error handling | Strong — text length validation, API timeout handling, graceful degradation |
| **Sales-ready** | **6/10** — production-ready API, нужен web UI и SaaS billing |

---

## Проект 13: Dzen

### Yandex Zen Article Adaptation System

> Контент-адаптация: полные статьи → оптимизированные 3000-4000 символов для Яндекс.Дзен с региональным таргетингом.

#### Бизнес-ценность

Трансформирует экспертные статьи (pereplan-one.ru) в формат Яндекс.Дзен: сжатие до 3000-4000 символов с сохранением юридической точности, регионального таргетинга (Москва/СПб) и UTM-трекинга. Обслуживает 1.5M+ ежемесячных пользователей Дзен.

#### Ключевые фичи

- Региональное разделение контента: `articles/moscow/` и `articles/spb/` с отдельными ссылками на консультации
- Multi-point валидация: длина, структура H1/H2, типографика (« » кавычки, тире), UTM-параметры
- Сохранение юридических данных: штрафы (15,000₽-5,000,000₽), сроки, коды законов (73-ФЗ, КоАП)
- UTM-трекинг: `utm_source=dzen&utm_medium=organic&utm_content=[id]`
- Каталог услуг с ценами (40+ услуг, 19,990₽-490,000₽)

#### Tech Stack

```
Content:    Claude Code (AI-адаптация), Markdown
Scripts:    Bash (validate-article.sh, count-chars.sh, generate-utm.sh)
Config:     JSON (config.json v1.0.0, platform specs)
Knowledge:  .claude/memory.md (100 строк контекста, сервисы, цены)
Output:     8 статей (4 Москва + 4 СПб)
```

#### Стадия и стабильность

| Критерий | Оценка |
|----------|--------|
| Code quality | Good — Bash scripts с валидацией, .claude/ AI-контекст |
| Content quality | Production — 8 статей shipped, юридическая точность |
| Documentation | Excellent — README, QUICK-START, WORKFLOW, GUIDELINES, memory.md |
| **Sales-ready** | **7/10** — production content pipeline, нужна интеграция с Дзен API |

---

## Проект 14: Pereplan Presentation Generator

### AI Presentation Builder на Gemini

> React 19 + dual Gemini models (text + images): генерация 5-10 слайдов за 30 секунд с PDF-экспортом.

#### Бизнес-ценность

AI-генератор брендированных презентаций для компании Pereplan: текстовый промпт → 5-10 слайдов с корпоративным стилем → PDF. Для продаж, коммерческих предложений и клиентских материалов.

#### Ключевые фичи

- Two-phase генерация: текст мгновенно (5 сек) → изображения в фоне (параллельно)
- 4 типа слайдов: Title, Section Header, Content (Split Screen / 3-Column Grid), Final (CTA + контакты)
- JSON Schema enforcement для структурированного вывода Gemini API
- PDF-экспорт: html2canvas (2x scale) → jsPDF (landscape 1280×720)
- Real-time logging с UI-viewer (subscribe pattern)

#### Tech Stack

```
Frontend:   React 19.2, TypeScript 5.8, Vite 6.2, Tailwind CSS
AI (text):  Gemini 3 Flash Preview (temperature 0.3, 4096 tokens)
AI (image): Gemini 2.5 Flash Image (parallel background generation)
Export:     jsPDF 2.5, html2canvas 1.4 (2x scale for clarity)
Logging:    Custom LoggerService (singleton, max 100 entries, subscription)
Brand:      Pereplan palette (#1E65F1 primary), logo SVG, blueprint patterns
```

#### Стадия и стабильность

| Критерий | Оценка |
|----------|--------|
| Code quality | Good — TypeScript strict, functional components, error boundaries |
| Architecture | Clean — services layer (geminiService, loggerService), modular slides |
| Documentation | Basic — README с quick start |
| **Sales-ready** | **4/10** — MVP, нужен backend, auth, шаблоны презентаций |

---

## Проект 15: Mamba Trading Bot

### Алгоритмический трейдинг на нейросети Mamba-2

> Торговый бот на архитектуре Mamba-2 (State Space Models) с обучением PPO, индексом турбулентности Махаланобиса и мультиактивным бэктестингом.

#### Бизнес-ценность

Автоматизированная торговля акциями и криптовалютами с использованием архитектуры Mamba-2 (SSM). Бот анализирует длинные исторические ряды данных с линейной сложностью O(n), применяет индекс турбулентности (формула Махаланобиса) для защиты капитала в периоды экстремальной волатильности, принимает решения buy/sell/hold через Reinforcement Learning (PPO). Протестирован на 4 активах: NVDA, AAPL, TSLA, BTC-USD.

#### Автоматизируемые процессы

| Этап | Что делает | Время |
|------|-----------|-------|
| Подготовка данных | Feature engineering: доходность, относительный объём, ATR, FVG, NR4 + StandardScaler нормализация | 1-2 мин |
| Обучение модели | Mamba-2 SSM с Mixed Precision (FP16), Early Stopping, WeightedRandomSampler для баланса классов | 5-15 мин (GPU) |
| Бэктестинг | Симуляция торговли с капиталом $1000, учёт комиссий, визуализация equity curve | < 1 мин |
| Риск-менеджмент | Индекс турбулентности Махаланобиса — блокирует торговлю при экстремальной волатильности рынка | realtime |

#### Tech Stack

```
Core:       Python, PyTorch, Mamba-SSM (causal-conv1d)
ML:         Stable Baselines3, scikit-learn, Mixed Precision (FP16)
Data:       Pandas, NumPy, Matplotlib
Trading:    Alpaca API (данные + исполнение ордеров)
GPU:        CUDA, Triton (кастомные ядра Mamba)
Infra:      Docker, TimescaleDB, Redis (planned)
```

#### Стадия и стабильность

| Критерий | Оценка |
|----------|--------|
| Code quality | Good — оптимизированная архитектура, residual connections, type hints |
| Test coverage | Missing — нет автотестов, но есть бэктесты с визуализацией |
| Documentation | Good — подробные .md гайды (архитектура, деплой, формулы) |
| Trained models | 6+ обученных моделей (.pth), результаты бэктестов (CSV) |
| **Sales-ready** | **4/10** — research-стадия, нужны тесты, live-торговля, CI/CD |

#### Планы развития

- Live-торговля через Alpaca API
- Docker-контейнеризация с TimescaleDB + Redis
- Интеграция Sentiment Analysis через LLM
- Walk-Forward Validation для production-устойчивости

---

## Связи между проектами

| Связь | Описание |
|-------|----------|
| **embedding-google → gemini-light-rag2.0** | Эволюция: v1 (персональный) → v2 (командный + Cloud Functions + team management) |
| **copiwriter → MediaUniversal** | Эволюция: Claude Skills pipeline → Python pipeline с миграцией от N8N |
| **knowledge-graph → copiwriter/MediaUniversal** | ESI entity data → SEO insights для контент-стратегии |
| **search-&-fact-check → copiwriter/MediaUniversal** | Fact verification tool → интегрируется в factcheck этапы |
| **textru → copiwriter/MediaUniversal/dzen** | Plagiarism checking → валидация уникальности контента перед публикацией |
| **dzen ← pereplan (GSD)** | Content repurposing: экспертные статьи с сайта → адаптация для Дзен |
| **uxkit → site3-0** | Design system → имплементация в headless CMS фронтенде |
| **reviews-wb ↔ MediaUniversal** | Общий паттерн: multi-agent orchestration с specialized roles |
| **pereplan-presentation ← pereplan (GSD)** | Данные компании → AI-генерация презентаций для продаж |

---

## Сводная таблица

| Проект | Тип | Стек | Сложность | Tests | Docs | Sales-Ready |
|--------|-----|------|-----------|-------|------|-------------|
| **MediaUniversal** | AI Pipeline | Python, Claude CLI, Tavily/Serper | **High** | 1592 LOC | Excellent | 8/10 |
| **ESI (knowledge-graph)** | MCP Server | Python, FastMCP, Kuzu, Streamlit | **High** | 115 tests | Excellent | 7/10 |
| **Gemini RAG 2.0** | Full-Stack App | React, Firebase, Gemini, Cloud Functions | **High** | - | Good | 6/10 |
| **Reviews-WB** | AI Pipeline | Python 3.14, FastAPI 0.115, Claude SDK 0.39, SQLite | **High** | - | Good | 7/10 |
| **Copiwriter** | AI Pipeline | Claude Skills, YAML, Bash | **Medium** | Lint script | Good | 6/10 |
| **Pereplan (GSD)** | Corporate Site | Astro 5, TypeScript, Tailwind, GitHub Actions | **Medium** | Build + Smoke | Excellent | 9/10 |
| **UXKit** | Design System | Tailwind CSS 3.4, PostCSS, Atomic Design | **Medium** | - | Outstanding | 8/10 |
| **Site3-0** | Headless CMS | SvelteKit 2, WordPress 6.7, Docker, GraphQL | **High** | - | Good | 6/10 |
| **TextRu** | API Service | Python, FastAPI, Text.ru API, Docker | **Medium** | - | Excellent | 6/10 |
| **Embedding Google** | Web App | React, Firebase, Gemini | **Medium** | - | Basic | 5/10 |
| **Dzen** | Content System | Claude Code, Bash, Markdown | **Low** | Lint scripts | Excellent | 7/10 |
| **Veritas** | Web App | React, Gemini 3 | **Low** | - | Minimal | 3/10 |
| **Pereplan Presentation** | Web App | React 19, Gemini API, jsPDF | **Low** | - | Basic | 4/10 |
| **Stitch** | Design Exports | HTML, Tailwind | **Low** | - | - | 7/10 |
| **Mamba Trading Bot** | AI Pipeline | Python, PyTorch, Mamba-SSM | **High** | - | Good | 4/10 |

---

## Ключевые компетенции (для резюме)

### Product Management
- Проектирование multi-agent AI pipelines с quality gates и checkpoint'ами
- Определение content-type систем (how-to, comparison, listicle, review)
- A/B тестирование лендингов (5 вариантов лид-форм, 3 варианта лендингов)
- Knowledge base design: YAML databases с facts, cases, glossary, ToV
- Design systems: Atomic Design methodology, WCAG 2.1 AA accessibility compliance
- CI/CD pipeline design: GitHub Actions → FTP deploy → smoke testing

### AI/LLM Engineering
- Multi-agent orchestration: до 14 специализированных AI-агентов в одном pipeline
- RAG systems: Google Gemini FileSearch, embedding, grounding, Chroma vector DB
- Prompt engineering: Jinja2 templates, system/user prompt separation, 23+ agent roles
- Fact verification: fuzzy dedup (rapidfuzz), claim extraction, source tracking
- MCP server development (FastMCP, 13 tools)
- Claude Agent SDK: sentiment routing, hallucination detection, quality scoring
- Multi-model orchestration: Gemini text + image models, Claude per-step model selection
- Structured AI outputs: JSON Schema enforcement, Pydantic validation

### Full-Stack Development
- Frontend: React 19, SvelteKit 2, Astro 5, TypeScript 5.8, Tailwind CSS, Vite
- Backend: Firebase (Auth, Firestore, Cloud Functions), FastAPI, Python (httpx, Pydantic)
- Database: Kuzu (graph DB), Firestore (NoSQL), MySQL 8, Chroma (vector DB), JSONL (logs)
- APIs: Google Gemini, Tavily, Serper, Google Knowledge Graph, Wikidata SPARQL, Text.ru
- DevOps: Docker Compose, GitHub Actions, Nginx reverse proxy, FTP deploy
- Headless CMS: WordPress + SvelteKit (GraphQL API), Sveltia CMS (Git-based)

### SEO & Content
- Entity-based SEO (Knowledge Graph analysis, entity classification)
- Automated SEO research (competitor analysis, keyword clustering, LSI)
- Content quality automation (linting, E-E-A-T signals, ToV enforcement)
- Fact-checking pipelines с source verification
- Plagiarism detection automation (Text.ru API + LLM refactoring instructions)
- Platform-specific content adaptation (Яндекс.Дзен, regional targeting)
- JSON-LD structured data (Organization, BlogPosting, LocalBusiness)

---

## Сводная экономия ручного времени

| Проект | Ручной процесс | С автоматизацией | Экономия |
|--------|----------------|------------------|----------|
| **MediaUniversal** | 14-20 часов на статью | ~30 минут | **~96%** |
| **ESI** | 20-30 часов аналитики на бренд | Автоматический аудит | **~95%** |
| **Reviews-WB** | 8-12 мин/отзыв (13-20ч на 100) | 30-60 сек/отзыв | **~97%** |
| **Copiwriter** | 12-16 часов на экспертную статью | 2-3 часа (с чекпоинтами) | **~80%** |
| **Gemini RAG 2.0** | 2-4 часа/день поиск в документации | Мгновенный AI-ответ | **~90%** |
| **Mamba Trading Bot** | 4-8 часов/день теханализ | Полная автоматизация | **~99%** |
| **Pereplan Presentation** | 2-4 часа на презентацию | 30 секунд | **~99%** |
| **Dzen** | 2-3 часа на адаптацию статьи | AI-адаптация + валидация | **~85%** |
| **Embedding Google** | 1-3 часа/день на research | AI-чат с документами | **~80%** |
| **TextRu** | 1-2 часа на проверку + рерайт | Автоматический анализ + инструкции | **~85%** |
| **Veritas** | 30-60 минут фактчекинг документа | AI-верификация | **~80%** |
| **Pereplan (GSD)** | Ручной деплой + проверки | CI/CD: push → build → deploy → smoke | **Автоматизировано** |
| **UXKit** | Разработка UI с нуля | 30+ готовых компонентов | **3-5x ускорение** |
| **Stitch** | 2-3 недели дизайна | 8 готовых A/B-вариантов | **Готово** |
| **Site3-0** | 10-15ч/мес разработки на контент | CMS — контент-менеджеры обновляют сами | **Автоматизировано** |

**Совокупная экономия по ключевым проектам: замена ~60-100 человеко-часов ручной работы в неделю.**

---

## Методология разработки

- **Solo + AI Assistants** — все проекты разработаны одним человеком с помощью Claude Code и Cursor
- **Iterative delivery** — фазовая разработка (MediaUniversal: N8N → Python migration, ESI: 8 phases, RAG 2.0: 6 phases, Pereplan: 8 phases с roadmap)
- **Test-driven quality** — pytest, structured logging, crash-safe state management, build-time validation
- **Documentation-first** — CLAUDE.md, PRD.md, QUICKSTART.md, GUIDE.md для каждого проекта
- **CI/CD automation** — GitHub Actions pipelines, Docker Compose orchestration, FTP deploy с smoke tests
- **Design systems** — Atomic Design methodology, design tokens, WCAG accessibility standards
