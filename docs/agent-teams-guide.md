# Agent Teams в Claude Code — практическое руководство

## Что это такое

Agent Teams — **экспериментальная** функция Claude Code, позволяющая запускать несколько сессий Claude одновременно и координировать их как команду. Один агент — **лидер** (team lead), остальные — **тиммейты**. Каждый работает в своём контекстном окне, но все могут общаться друг с другом и работать над общим списком задач.

---

## Отличие от субагентов

|                     | Субагенты                                | Agent Teams                                         |
| ------------------- | ---------------------------------------- | --------------------------------------------------- |
| **Коммуникация**    | Только отчёт назад лидеру               | Тиммейты общаются друг с другом напрямую            |
| **Координация**     | Главный агент управляет всем             | Общий список задач, самоорганизация                 |
| **Контекст**        | Результат возвращается в контекст лидера | Полностью независимый контекст                      |
| **Стоимость**       | Ниже                                     | Выше (каждый тиммейт = отдельный инстанс Claude)   |
| **Когда применять** | Фокусные задачи, важен только результат  | Сложная работа, требующая обсуждения и коллаборации |

**Правило выбора:** если воркерам нужно общаться между собой — Agent Teams. Если достаточно просто вернуть результат — субагенты.

---

## Как включить

Добавить в `~/.claude/settings.json`:

```json
{
  "env": {
    "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1"
  }
}
```

---

## Управление командой

| Действие                        | Как сделать                                              |
| ------------------------------- | -------------------------------------------------------- |
| Переключение между тиммейтами  | `Shift+Up` / `Shift+Down`                               |
| Delegate mode (лидер не кодит)  | `Shift+Tab`                                              |
| Показать список задач           | `Ctrl+T`                                                 |
| Войти в сессию тиммейта         | `Enter` на выбранном тиммейте                            |
| Прервать ход тиммейта           | `Escape` внутри сессии тиммейта                          |
| Режим отображения (split panes) | `--teammate-mode tmux` или настройка `teammateMode`      |

---

## Лучшие сценарии использования

### 1. Параллельный код-ревью

Один ревьюер склонен фокусироваться на одном типе проблем. Разделение по доменам даёт более глубокий анализ.

### 2. Исследование с конкурирующими гипотезами

Несколько агентов тестируют разные теории параллельно и пытаются опровергнуть друг друга — выживает самая устойчивая гипотеза.

### 3. Разработка новых модулей/фич

Каждый тиммейт владеет своей частью кода, нет конфликтов при параллельной работе.

### 4. Кросс-слойная координация

Frontend, backend и тесты разрабатываются одновременно разными тиммейтами.

---

## Примеры промптов

### Пример 1: Параллельный код-ревью PR

```
Create an agent team to review PR #142. Spawn three reviewers:
- One focused on security implications (SQL injection, XSS, auth bypass)
- One checking performance impact (N+1 queries, memory leaks, slow algorithms)
- One validating test coverage (edge cases, error paths, integration tests)
Have them each review independently and report findings with severity ratings.
```

### Пример 2: Отладка сложного бага

```
Users report the app crashes after sending a message.
Spawn 4 agent teammates to investigate different hypotheses:
- Teammate 1: check WebSocket connection handling and reconnection logic
- Teammate 2: investigate memory leaks in message rendering
- Teammate 3: examine database connection pool exhaustion
- Teammate 4: look at race conditions in the message queue

Have them talk to each other to try to disprove each other's theories,
like a scientific debate. Update findings in INVESTIGATION.md.
```

### Пример 3: Разработка новой фичи с разделением по слоям

```
Create an agent team to implement user notification system:
- Backend teammate: create notification service, API endpoints,
  and database migrations in src/server/
- Frontend teammate: build notification bell component, dropdown list,
  and mark-as-read UI in src/client/components/
- Testing teammate: write unit tests for the service and integration
  tests for the API endpoints in tests/

Backend teammate should finish the API contract first,
then frontend and testing can work in parallel.
```

### Пример 4: Исследование технологии перед принятием решения

```
We're choosing between Redis, Memcached, and DragonflyDB for our caching layer.
Create an agent team with 3 researchers:
- One evaluates Redis: features, clustering, memory usage, ecosystem
- One evaluates Memcached: simplicity, performance, limitations
- One evaluates DragonflyDB: compatibility, benchmarks, maturity

Each should produce a summary with pros/cons and a recommendation.
Then have them debate each other's findings before producing a final report.
```

### Пример 5: Рефакторинг с сохранением тестов

```
Create an agent team to refactor the authentication module:
- Architect teammate: analyze current code, design new structure,
  create the migration plan. Require plan approval before proceeding.
- Implementer teammate: execute the refactoring after architect's plan
  is approved. Work file-by-file to keep changes atomic.
- Guardian teammate: continuously run tests after each change,
  report any regressions immediately to the implementer.

Use Sonnet for implementer and guardian to save tokens.
Use Opus for architect.
```

### Пример 6: Документация и аудит кодовой базы

```
Create an agent team to audit and document our API:
- Teammate 1: map all API endpoints, their parameters, and response formats
- Teammate 2: identify undocumented endpoints and missing error handling
- Teammate 3: check API consistency (naming conventions, response structure,
  HTTP status codes)
- Teammate 4: generate OpenAPI spec draft based on findings

Have them share discoveries with each other as they go.
```

### Пример 7: Миграция зависимостей

```
We need to migrate from Webpack to Vite. Create an agent team:
- Researcher: analyze current webpack config, identify all plugins and loaders
  used, find Vite equivalents
- Migrator: create vite.config.ts, update package.json scripts,
  adjust import paths
- Validator: after each migration step, run the dev server and build,
  report any errors back to the migrator

Researcher should finish analysis first, then migrator and validator
work together.
```

### Пример 8: Быстрое прототипирование с обсуждением

```
I want to build a CLI tool for tracking TODO comments in code.
Create an agent team to explore this from different angles:
- UX teammate: design the CLI interface, commands, output formatting,
  and user workflows
- Architecture teammate: propose technical design — parser, storage,
  integrations with git hooks
- Devil's advocate teammate: challenge every decision, find edge cases,
  identify what could go wrong

Have them discuss and converge on a design doc.
```

---

## Продвинутые техники

### Require plan approval — контроль качества планов

Можно требовать, чтобы тиммейт сначала составил план и получил одобрение лидера:

```
Spawn an architect teammate to redesign the database schema.
Require plan approval before they make any changes.
Only approve plans that include rollback strategy and data migration steps.
```

### Delegate mode — лидер только координирует

Если лидер начинает сам писать код вместо делегирования, включите delegate mode (`Shift+Tab`). Лидер будет ограничен инструментами координации: создание тиммейтов, отправка сообщений, управление задачами.

### Хуки для контроля качества

- **`TeammateIdle`** — выполняется когда тиммейт собирается остановиться. Код выхода 2 возвращает тиммейта к работе с фидбеком.
- **`TaskCompleted`** — выполняется при завершении задачи. Код выхода 2 блокирует завершение и отправляет фидбек.

### Выбор модели для тиммейтов

Не все тиммейты требуют самую мощную модель. Экономьте токены:

```
Create a team with 3 teammates:
- Architect (use Opus) — designs the solution
- Two implementers (use Sonnet) — execute the plan
```

---

## Практические советы

| Совет | Почему важно |
| --- | --- |
| Давайте тиммейтам достаточно контекста в промпте | Они **не** наследуют историю разговора лидера |
| Не давайте двум тиммейтам редактировать один файл | Приведёт к перезаписи изменений |
| Оптимальный размер: 5-6 задач на тиммейта | Слишком мелкие — overhead > пользы, слишком крупные — риск впустую |
| Начинайте с ревью и исследований | Проще освоиться, меньше риск конфликтов |
| Мониторьте прогресс, перенаправляйте | Долгая автономная работа = риск потраченных впустую токенов |
| Говорите лидеру «Wait for teammates» | Иначе лидер может начать делать работу сам |

---

## Ограничения

- `/resume` и `/rewind` **не восстанавливают** тиммейтов — после резюма нужно создавать новых
- **Одна команда** на сессию
- **Нет вложенности** — тиммейты не могут создавать свои команды
- **Лидер фиксирован** — нельзя передать лидерство другому агенту
- Split-pane режим требует **tmux** или **iTerm2** (не работает в VS Code terminal, Windows Terminal, Ghostty)
- Тиммейты иногда **забывают отметить задачу завершённой** — проверяйте вручную
- Завершение работы тиммейта **может быть медленным** (ждёт окончания текущего вызова)

---

## Жизненный цикл команды

```
1. Включить фичу (settings.json)
        |
2. Описать задачу и структуру команды
        |
3. Claude создаёт team lead + тиммейтов
        |
4. Лидер разбивает работу на задачи (task list)
        |
5. Тиммейты берут задачи, работают параллельно
        |
6. Тиммейты общаются друг с другом при необходимости
        |
7. Лидер синтезирует результаты
        |
8. Завершение: shutdown тиммейтов -> clean up team
```

---

## Ссылки

- [Официальная документация](https://code.claude.com/docs/en/agent-teams)
- [Субагенты (для сравнения)](https://code.claude.com/docs/en/sub-agents)
- [Настройки разрешений](https://code.claude.com/docs/en/permissions)
- [Хуки](https://code.claude.com/docs/en/hooks)
