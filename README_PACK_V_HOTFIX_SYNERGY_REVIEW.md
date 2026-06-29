# v50.23 Pack V Hotfix: Synergy Compatibility and Review De-duplication

This hotfix preserves the Pack V file layout optimization while restoring browser-QA compatible visible text and the latest review-loop cleanup.

## What changed

- Restored the visible Japanese compatibility sentence in the composition win-condition line:
  - `敵5人を1人ずつの対面として読まない`
- Updated `diagnosis_text/ja/composition_win_conditions.json` and `diagnosis_text/bundle.json`.
- Updated the embedded fallback bundle in `index.html` and `_combined.js`.
- Re-applied composition review-loop cleanup so repeated `next_adjustment` lines do not appear twice in the same result.
- Removed leading `：` when a review line has no enemy label.
- Strengthened static QA so this compatibility text and de-duplication logic are checked before browser QA.

## QA

- `node --check _combined.js`
- `npm run check:diagnosis-text-structure`
- `npm run check:wave-review-loop`
- `npm run check:file-layout`
- `npm run check:syntax`

Browser QA should still be confirmed through GitHub Actions after pushing.
