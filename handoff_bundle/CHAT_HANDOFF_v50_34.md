# OW Coach Chat Handoff v50.34

## Current state

- Version: `50.34.0`
- Package: `OW Coach v50.34 release stabilization after phase6 browser QA success.`
- Latest package type: full GitHub Desktop reflection ZIP.
- Runtime behavior remains centered on `index.html`. CSV files remain editing, audit, and QA sources.
- `_combined.js` remains removed. QA extracts app JavaScript from `index.html`.

## Macro rebuild status

Completed and stabilized: Phase 1 through Phase 7. Phase 7 is release stabilization after browser QA success.

## GitHub Actions status

User supplied a screenshot showing `OW Coach Browser QA #44` succeeded. `browser-qa`, `Syntax check`, `Run browser QA`, Playwright report upload, test-results upload, and visual snapshot upload all succeeded.

## Current key QA status

Passed locally during v50.34 stabilization: app-source, csv-structure, text-clarity, file-layout, macro-rebuild-phase1 through macro-rebuild-phase7. Browser QA should be run again on GitHub after reflecting v50.34, then once on `main` after merge.

## Important user preferences

- Japanese responses.
- Do not generate ZIPs unless explicitly requested or clearly necessary.
- When generating ZIPs, create a full ZIP including unchanged files unless the user explicitly asks for a delta ZIP.
- Do not provide standalone `index.html` previews unless the user asks to check in browser.
- Be precise about local vs GitHub state.
- User uses GitHub Desktop ZIP workflow.

## Recommended next actions

1. Reflect the v50.34 full ZIP via GitHub Desktop.
2. Branch: `pack-ad-v50-34-release-stabilization`.
3. Commit: `Stabilize v50.34 after phase6 browser QA pass`.
4. Run GitHub Actions `browser-qa`.
5. If branch QA passes, merge to `main`.
6. Run `browser-qa` once on `main`.
7. Start next feature branch from v50.34.

## Recommended next feature

Phase 8: map-aware diagnosis. Add map type, strong composition by map, dangerous enemy synergy by map, DPS default positions, support danger zones, tank no-give zones, and low-rank loss patterns.
