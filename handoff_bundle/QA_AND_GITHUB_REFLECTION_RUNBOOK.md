# QA and GitHub Reflection Runbook

## Current state

Pack A-T GitHub reflection has been completed via PR #3.

- Reflection branch: `pack-t-public-header-v50`
- Merged into: `main`
- Merge commit: `439d13b22e3b45bf6193e3de6671bd238b4c16e1`
- Browser QA after hotfix: passed (`12 passed`)

## Local static checks

Before future GitHub reflection work, run from the repository root:

```bash
npm run check:syntax
node --check _combined.js
npm run check:handoff-readiness
```

When working from a packaged ZIP, repeat the same important checks in `dev_app/` and `public_release/` if needed.

## Browser QA for future branches

1. Create a new branch from current `main`.
2. Apply the intended change.
3. Run local static checks.
4. Commit and push the branch.
5. Confirm GitHub Actions `browser-qa`.
6. If Actions pass, merge or create a release candidate tag.

## Manual public URL checks after deployment

- Japanese mode opens without modal blocking normal use.
- English mode opens and Pack F-M sections are not missing.
- Composition diagnosis can choose all 17 target heroes.
- Detail diagnosis can choose all 17 target heroes.
- Added targets: Junkrat, Pharah, Echo, Emre render text.
- Mobile width does not collapse the result cards.
- CSV loading does not fail.
- Old v49/v50 cache is not shown.

## Do not skip

Pack A-T added a large amount of data and render logic. Static QA passing is not enough. Browser QA is required before publication.
