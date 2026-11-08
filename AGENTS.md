# Repository Guidelines

## Project Structure & Module Organization

Corrige is a dependency-free, browser-based optical mark recognition (OMR) prototype for 20-question answer sheets. All application files live in the repository root:

- `index.html`: Portuguese interface and script loading; load `engine.js` before `app.js`.
- `app.js`: canvas-generated answer sheets, image input, manual review, grading, session records, and CSV export.
- `engine.js`: marker detection, perspective transformation, and answer recognition; exposes browser `OMR` and CommonJS exports.
- `style.css`: responsive interface styling.
- `teste.cjs`: synthetic image regression tests.
- `README.md`: usage, privacy, printing, and hosting instructions.

Answer-sheet graphics and test images are generated in code; there is no separate assets directory.

## Build, Test, and Development Commands

- Open `index.html` directly in Chrome, Edge, or Firefox to run locally. No installation, server, or build step is required.
- `node teste.cjs`: run synthetic OMR regression checks.
- `node --check app.js`, `node --check engine.js`, and `node --check teste.cjs`: validate JavaScript syntax individually.

For static hosting, deploy `index.html`, `style.css`, `engine.js`, and `app.js` together.

## Coding Style & Naming Conventions

Use plain JavaScript, HTML, and CSS. Match the existing compact style and minimal indentation; expanded JavaScript blocks currently use single-space indentation. Use camelCase for functions and variables, descriptive coordinate names, and single-quoted JavaScript strings. Keep recognition logic in `engine.js` and DOM interactions in `app.js`. Preserve Portuguese interface text and accessible labels. No formatter or linter is configured; avoid unrelated reformatting.

## Testing Guidelines

Tests use Node's built-in `node:assert/strict`; no coverage threshold is configured. Extend `teste.cjs` with deterministic synthetic cases when changing recognition or geometry. Preserve checks for blank, double, and weak marks, marker detection, perspective, and degenerate transforms.

Manually verify **Testar exemplo**, review confirmation, CSV export, A4 printing at 100%, and mobile image capture when relevant. Synthetic checks do not replace trials with real printed sheets and photos.

## Commit & Pull Request Guidelines

Git history is unavailable in this checkout, so existing commit conventions cannot be verified. Use concise, imperative subjects such as `Fix weak-mark detection`. Include a change description, relevant issue links, verification results, and screenshots for interface changes in pull requests.

## Privacy & Configuration

Preserve local browser processing and mandatory human review. Keep student photos and exported CSV files out of commits. Preserve CSV formula protection and the session-only data lifecycle.
