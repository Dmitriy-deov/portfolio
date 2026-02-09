# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website for Dmitriy Tamarov (Product Manager / AI Automation Architect). Bilingual (Russian/English), with day/night theme support. Showcases 15 AI automation projects with architecture visualizations, metrics, and automated process details.

## Commands

All commands run from `portfolio-site/`:

```bash
cd portfolio-site
npm run dev       # Vite dev server with HMR
npm run build     # tsc -b && vite build (type-check then bundle)
npm run lint      # ESLint
npm run preview   # Preview production build
npx tsc --noEmit  # Type-check only (no build output)
```

## Architecture

### Tech Stack
- React 19 + TypeScript + Vite 7
- Tailwind CSS v4 (via `@tailwindcss/vite` plugin, NOT PostCSS)
- Lucide React for icons
- No router — single-page, scroll-based navigation

### Page Layout (App.tsx)
Sections render in order: `Navigation` → `Hero` → `SkillsSection` → `MethodologySection` → `SummaryTable` → `Footer`

### i18n System
- `LanguageProvider` wraps the app in `main.tsx`, stores language in localStorage
- `useLanguage()` hook returns `{ lang, setLang, t }` where `t(key)` looks up a `TranslationKey`
- **Static strings**: `src/i18n/translations.ts` — single file with `ru` and `en` objects, type-safe keys via `TranslationKey`
- **Project data**: separate files — `src/data/projects.ts` (English) and `src/data/projects.ru.ts` (Russian)
- `useProjects()`, `useSkills()`, `useEcosystemLinks()` hooks in `src/data/useProjectData.ts` switch data by language

### Theme System
- Light/dark mode via `.dark` class on `<html>`
- CSS custom properties defined in `src/index.css` under `@theme { }` (light) and `.dark { }` (dark)
- Accent color: `#0055FF` (blue)
- Custom property naming: `--color-bg-primary`, `--color-text-primary`, `--color-border`, `--color-accent`, etc.

### Project Data Model (types/portfolio.ts)
Key `Project` fields: `id`, `name`, `subtitle`, `description`, `businessValue`, `complexity` (High/Medium/Low), `salesReady` (1-10), `techStack`, `type`, `timeSavings?`, `flagship?`, `metrics?`, `automatedProcesses?`, `architecture?` (string[][] for visual flow diagrams)

Project types for filtering: `"AI Pipeline"`, `"MCP Server"`, `"Full-Stack App"`, `"Web App"`, `"Static Website"`, `"Design Exports"`

### Adding a New Project
Use the `/add-project` custom command (`.claude/commands/add-project.md`). It updates 5 files: `portfolio-prd.md`, `projects.ts`, `projects.ru.ts`, `Hero.tsx` (project count stat), and `translations.ts` (subtitle count). Both English and Russian data files must stay in sync.

### PRD Document
`portfolio-prd.md` at repo root is the source-of-truth product requirements doc (written in Russian). It contains project descriptions, ecosystem connections, and the summary table.

## Key Conventions

- All PRD content is in Russian; website data has parallel English and Russian files
- Tailwind v4 uses `@theme` blocks for CSS variables — NOT `tailwind.config.js`
- The `SummaryTable` component has expandable rows showing architecture diagrams, automated processes, and business value details
- `architecture` field is `string[][]` where each inner array is a layer in a top-to-bottom flow diagram
- Components use responsive border patterns with index-based logic for grid layouts (SkillsSection, MethodologySection)
