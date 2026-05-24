# AGENTS.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Repository snapshot
- This is a static portfolio site (`README.md`) with client-side JavaScript and Netlify Functions.
- There is no package manager manifest (`package.json`) or scripted task runner in the repo root.

## Development commands
## Local development (full stack: static pages + Netlify functions)
- Run from repository root:
  - `netlify dev`
- Required environment variable for backend chat proxy:
  - `GROQ_API_KEY`

## Local development (static-only)
- Serve static files without Netlify Functions:
  - `python -m http.server 8080`

## Build
- No explicit build step is configured. Netlify publishes the repository root as-is (`netlify.toml` → `publish = "."`).

## Lint
- No lint tooling/config is currently configured in this repository.

## Tests
- No automated test framework is currently configured in this repository.
- Single endpoint smoke test (after `netlify dev`):
  - PowerShell:
    - `Invoke-RestMethod -Method Post -Uri "http://localhost:8888/.netlify/functions/chat" -ContentType "application/json" -Body '{"model":"llama-3.3-70b-versatile","messages":[{"role":"user","content":"ping"}]}'`

## High-level architecture
## Frontend page model
- The site is multi-page HTML (`index.html`, `about.html`, `projects.html`, etc.) with shared styling in `style-v45.css`.
- Most pages include the same runtime pair at the end of `<body>`:
  - `main-v5.js` for shared UI behaviors (cursor effects, reveal animations, icon init, and SPA-like `<main>` replacement routing).
  - `khan-inject-v45.js` for injecting the Khan AI chat shell and loading chat dependencies.

## Chat system boot sequence
- `khan-inject-v45.js` injects chat DOM + styles, then dynamically loads:
  1) `config.js`
  2) `khan-logic-v45.js`
- `config.js` provides API/config constants and a compatibility helper (`Config.getApiKey`).
- `khan-logic-v45.js` contains the main assistant logic: auth flow, conversation lifecycle, message rendering/markdown, TTS integration, and chat UI state.

## Persistence and session model
- `khan-logic-v45.js` uses `BaasimDB` (IndexedDB) for logged-in users with stores:
  - `users`
  - `conversations`
  - `messages`
- Guest mode stores conversation data in browser storage (`localStorage`) via `ConvDB` guest paths.
- Auth/session state is tracked with cookies and restored into client state on load.

## Backend boundary
- Frontend chat requests target `/.netlify/functions/chat`.
- `netlify/functions/chat.js` is a proxy to Groq Chat Completions:
  - Accepts POST only.
  - Reads `process.env.GROQ_API_KEY`.
  - Applies basic request hardening (temperature/max token bounds, no streaming).

## Caching and delivery
- `sw.js` pre-caches selected assets and serves cache-first.
- `netlify.toml` defines:
  - publish root (`.`)
  - functions dir (`netlify/functions`)
  - security/cache headers
  - redirect rule to `index.html` for language-conditioned SPA fallback.

## Change hotspots and coupling notes
- If chat bootstrap fails, check script load chain in `khan-inject-v45.js` first (config → logic).
- Route transitions in `main-v5.js` depend on each page exposing a `<main>` block; missing/changed `<main>` structure can break in-page transitions.
- Cache/version behavior is split across multiple files (`index.html` version gate, `khan-logic-v45.js` system version checks, `sw.js` cache name); keep them aligned when shipping cache-sensitive updates.
