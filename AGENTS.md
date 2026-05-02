# Agents Instructions

## Product Overview
- AstroBookings is a backend API for rockets, launches, customers, and seat bookings.
- It is a demo service with in-memory state, no authentication, and no persistent storage.

## Technical Implementation

### Tech Stack
- Language: **TypeScript 5.6**
- Framework: **Express 4.18**
- Database: **In-memory objects (no database)**
- Security: **No authentication or authorization implemented**
- Testing: **Playwright Test 1.59**
- Logging: **Stdout/stderr timestamped logs**

### Development workflow
```bash
npm install
npm run build
npm start
npm run dev
npm test
npm run test:smoke
```

### Folder structure
```text
.                           # Project root
├── AGENTS.md               # This file with instructions for AI agents
├── README.md               # The main human documentation file
├── package.json            # Node scripts and dependency manifest
├── tsconfig.json           # TypeScript compiler configuration
├── playwright.config.ts    # Playwright test config
├── src/                    # Application source code
│   ├── index.ts            # Server entrypoint
│   ├── rockets.ts          # Rocket and booking logic
│   └── server.ts           # Express app and routes
├── tests/                  # Playwright test suite
│   ├── health.spec.ts
│   └── rockets.spec.ts
└── specs/                  # Project specification notes
``` 

### Environment
- Code and documentation must be in English.
- Chat responses must be in the language of the user prompt.
- Sacrifice grammar for conciseness in responses.
- This is a windows environment using git bash terminal.
- My default branch is `main`.
