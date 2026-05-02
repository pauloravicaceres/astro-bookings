---
description: Best practices for TypeScript code style.
applyTo: '**/*.ts, **/*.tsx'
---

# Clean code best practices

## Variables and naming
- Name variables and functions descriptively to enhance readability.
- Use named constants instead of magic numbers or strings.

## Functions and complexity
- Keep functions small and focused on a single task.
- Avoid nested structures to reduce complexity.
- Use early returns to minimize indentation.

## Classes and modules
- Avoid primitive obsession by defining types.
- Favor composition over inheritance.
- Keep dependencies to a minimum.
- Use adapter pattern to decouple from external systems.
- Maintain a shared module (folder...) for common utilities and types.

## Error handling and comments
- Handle errors gracefully with try-catch blocks and meaningful messages.
- Write comments to explain the "why" behind complex logic, not the "what".

## General principles
- Keep it simple and avoid over-engineering.
- Try to keep it DRY (Don't Repeat Yourself) by reusing code where applicable.

### TypeScript specific guidelines

- Use ES modules (`import`/`export`) instead of CommonJS.
- Favor named exports over default exports.
- File names follows `kebab-case.{pattern}.ts`. Ex: `user-login.service.ts`.
- Use strict typing and avoid using `any`.
- Declare `types` for data structures in its own file.
- Use `as const` for constant values to infer literal types.
- Define `interfaces` for class contract behavior in its own file.
- Avoid `null` and `undefined` where possible; prefer optional properties.
- Leverage TypeScript's utility types (e.g., `Partial`, `Pick`, `Omit`).
- Use async/await; wrap awaits in try/catch with structured errors.

<!--
# TypeScript Instructions

## Role
Act as a senior TypeScript engineer working on the AstroBookings backend.

## Task
Provide or modify TypeScript code for this repository when the request is about `ts`, TypeScript, or backend implementation.

## Project Context
- This repo uses TypeScript 5.6 and `type`: `module`.
- The API is built with Express 4.18.
- Data is stored in-memory; there is no database.
- Tests use Playwright Test.
- Code and documentation must be English and concise.

## Coding Guidelines
- Use ES modules: `import` / `export` only.
- Prefer strict typing and avoid `any`.
- Define `type` or `interface` for structured data.
- Avoid `null` and `undefined` when possible; prefer optional properties and defaults.
- Use `readonly` for immutable properties where appropriate.
- Keep functions small, single-purpose, and easy to read.
- Use TypeScript utility types when they improve clarity (`Partial`, `Pick`, `Omit`, etc.).
- Preserve existing repo style and architecture.
- Do not add new package dependencies unless explicitly requested.

## Behavior
- When implementing a feature, use the smallest set of changes needed.
- If a spec file is available, base the implementation on the spec.
- Do not write tests unless the task explicitly asks for them.
- Keep output focused on code changes and avoid extra documentation.

## Output
- Modify or create `.ts` files only for TypeScript work.
- Do not change `package.json` or build config unless needed for the requested feature.
- When creating new files, place them under `src/` or `tests/` as appropriate.
-->