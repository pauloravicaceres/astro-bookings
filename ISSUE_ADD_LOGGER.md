# Add simple console-based logging using console.log

Problem:
- The application currently lacks logging. This makes debugging, monitoring, and understanding runtime behavior difficult.

Goals:
- Provide a minimal, consistent logging approach using console.log (no external logging libraries).
- Make logs easy to read and addable across the codebase.
- Keep changes small and non-breaking.

Scope:
- Implement a thin logging helper that standardizes message format (timestamp, level, message).
- Replace / add logging calls in key application files: startup, request handlers, and business logic (`src/index.ts`, `src/server.ts`, `src/rockets.ts`).
- Do not add persistent storage or external log sinks.

Implementation Plan (actionable tasks):

- **Task 1 — Design logger API:**
  - Provide simple helper methods: `info()`, `warn()`, `error()`, `debug()` that call `console.log`/`console.error`.
  - Define a compact log format: `[ISO timestamp] [LEVEL] message` and optional metadata JSON.

- **Task 2 — Add logger helper:**
  - Create module `src/logger.ts` that exports the methods above and formats messages consistently.
  - Keep implementation trivial: format string + call `console.log` / `console.error`.

- **Task 3 — Integrate logger into startup and server:**
  - Add startup logs in `src/index.ts` (app start, port).
  - Add request-level logs in `src/server.ts` for incoming requests and errors.

- **Task 4 — Add logs in core logic:**
  - Add informative logs in `src/rockets.ts` for key events (rocket creation, booking attempts, failures).
  - Use `info` for normal events, `warn` for recoverable issues, `error` for unexpected errors.

- **Task 5 — Validation and cleanup:**
  - Run the app and exercise endpoints; verify logs appear and are readable.
  - Adjust placement/verbosity of logs as needed; avoid noisy debug logs in normal runs.

Acceptance criteria:
- A `src/logger.ts` helper exists and is used in the listed files.
- Log messages follow the agreed format and appear on stdout/stderr.
- No runtime errors introduced; tests (if any) run or are updated accordingly.

Checklist:
- [ ] Design logger API
- [ ] Add `src/logger.ts`
- [ ] Integrate logger in `src/index.ts`
- [ ] Integrate logger in `src/server.ts`
- [ ] Add logs in `src/rockets.ts`
- [ ] Validate logs in local runs

---

To publish this as a GitHub issue, provide a repository access token or confirm repository visibility and permissions so I can retry through the GitHub API.
