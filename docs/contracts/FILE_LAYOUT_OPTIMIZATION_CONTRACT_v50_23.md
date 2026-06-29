# v50.23 File Layout Optimization Contract

## Purpose

Reduce root-directory clutter while preserving runtime speed and the existing browser QA surface.

## Rules

- Keep `index.html` and `_combined.js` at the repository root so static hosting remains unchanged.
- Keep `diagnosis_text/` at the repository root because the app loads `diagnosis_text/bundle.json` at runtime.
- Move target CSV mirrors into `data/targets/<target-slug>/`.
- Move shared generated CSV mirrors into `data/shared/`.
- Move audit CSV files into `data/audits/`.
- Move generated contract JSON files into `data/contracts/`.
- Move pack and contract documentation into `docs/`.
- Update static QA paths after moving files.
- Do not add runtime network fetches for large CSV files.

## Performance note

The runtime still uses the embedded data bundle in `index.html` / `_combined.js`; the reorganized CSV and contract files are QA/editor mirrors. This keeps page-load behavior equivalent while making maintenance less chaotic.
