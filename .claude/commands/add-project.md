# Add Project to Portfolio

You are adding a new project to the portfolio website and PRD documentation.

**Project folder to analyze:** $ARGUMENTS

## Step 1: Research the project

Thoroughly explore the provided folder. Read these files (if they exist):
- README.md, CLAUDE.md, PRD.md, PROJECT.md, QUICKSTART.md, GUIDE.md
- package.json, pyproject.toml, requirements.txt, Cargo.toml, go.mod
- Any .planning/ directory files (REQUIREMENTS.md, ROADMAP.md, STATE.md)
- Docker/CI files: Dockerfile, docker-compose.yml, .github/workflows/
- Source code structure (use `ls` and Glob to understand the shape)

From this research, determine:
- **Project name** and short subtitle
- **Business value** — what problem it solves, who it's for
- **Tech stack** — languages, frameworks, APIs, databases
- **Complexity** — High / Medium / Low (based on agent count, architecture, LOC)
- **Sales-ready score** — 1-10 (based on tests, docs, error handling, production readiness)
- **Type** — one of: "AI Pipeline", "MCP Server", "Full-Stack App", "Web App", "Static Website", "Design Exports"
- **Tests** — test coverage info or "—" if none
- **Docs quality** — Excellent / Good / Basic / Minimal
- **Time savings** — how much manual time it saves
- **Automated processes** — stages with agents, descriptions, times
- **Metrics** — key numbers (LOC, files, endpoints, etc.)
- **Future plans** — if mentioned in docs
- **Ecosystem links** — connections to existing portfolio projects

## Step 2: Present findings for approval

Show the user a summary of what you found and the data you plan to add. Ask for confirmation before making changes.

## Step 3: Update all files

After approval, update these files in order:

### 3a. portfolio-prd.md

Path: `/Users/dmitrijtamarov/Documents/Tamarov local/CV/portfolio-prd.md`

- Update the project count in Executive Summary (e.g., "14" → "15")
- Add a new project section at the end (before "## Связи между проектами"), following the exact format of existing projects. Use the next sequential number.
- Add a row to the summary table ("## Сводная таблица")
- Add ecosystem connections to "## Связи между проектами" if relevant
- Update ecosystem map diagram if the project fits

PRD project section format:
```
## Проект N: [Name]

### [Subtitle]

> [One-line description]

#### Бизнес-ценность

[Business value paragraph in Russian]

#### Автоматизируемые процессы

| Этап | [Агенты] | Что делает | Время |
|------|----------|-----------|-------|
| ... | ... | ... | ... |

#### Tech Stack

\```
Category:   tech1, tech2, tech3
...\```

#### Стадия и стабильность

| Критерий | Оценка |
|----------|--------|
| Code quality | ... |
| Test coverage | ... |
| Documentation | ... |
| **Sales-ready** | **N/10** — ... |

#### Планы развития

- Plan 1
- Plan 2
```

### 3b. projects.ts (English data)

Path: `/Users/dmitrijtamarov/Documents/Tamarov local/CV/portfolio-site/src/data/projects.ts`

Add a new project object to the `projects` array. Follow the existing TypeScript interface:

```typescript
{
  id: 'kebab-case-id',
  name: 'Project Name',
  subtitle: 'Short subtitle in English',
  description: 'One-line description in English.',
  businessValue: 'Business value paragraph in English.',
  complexity: 'High' | 'Medium' | 'Low',
  salesReady: number, // 1-10
  techStack: ['Tech1', 'Tech2', ...],
  type: 'AI Pipeline' | 'MCP Server' | 'Full-Stack App' | 'Web App' | 'Static Website' | 'Design Exports',
  tests?: 'test info or omit',
  docs?: 'Excellent' | 'Good' | 'Basic' | 'Minimal',
  timeSavings?: 'time savings description',
  flagship?: boolean, // only if truly flagship
  metrics?: { 'Key': 'value', ... },
  plans?: ['Plan 1', 'Plan 2'],
  automatedProcesses?: [
    { stage: 'Stage', agents?: 'Agent names', description: 'What it does', time?: 'X min' },
  ],
}
```

Also add any relevant `ecosystemLinks` entries.

### 3c. projects.ru.ts (Russian data)

Path: `/Users/dmitrijtamarov/Documents/Tamarov local/CV/portfolio-site/src/data/projects.ru.ts`

Add the same project object but with Russian text for: `subtitle`, `description`, `businessValue`, `timeSavings`, automated process `stage`/`description`, metric keys, and plan items. Keep `id`, `name`, `techStack`, `type`, `complexity`, `salesReady`, `docs` values identical to the English version.

Also add corresponding Russian `ecosystemLinksRu` entries.

### 3d. Hero.tsx — project counter

Path: `/Users/dmitrijtamarov/Documents/Tamarov local/CV/portfolio-site/src/components/Hero.tsx`

Update the `stats` array — increment the `value` in the first stat (projects count) by 1.

### 3e. translations.ts — subtitle counter

Path: `/Users/dmitrijtamarov/Documents/Tamarov local/CV/portfolio-site/src/i18n/translations.ts`

Update both `projects.subtitle` values:
- Russian: `'N проектов AI-автоматизации и бизнес-инструментов'`
- English: `'N AI automation & business tool projects'`

Where N is the new total count.

## Step 4: Verify

After all edits, open the dev server and take a screenshot to verify the project appears correctly in the table.

## Important rules

- All PRD content must be in Russian
- Website has two data files: English (projects.ts) and Russian (projects.ru.ts) — update BOTH
- Project types must match one of the existing filter categories so filtering works
- Keep the same code style and formatting as existing entries
- Do NOT modify existing project entries, only add new ones
