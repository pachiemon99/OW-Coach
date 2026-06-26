# GitHub Actions next run

1. Upload the contents of this package to the repository root. Do not upload the ZIP itself.
2. Confirm these files/folders are at the repository root: `index.html`, `package.json`, `playwright.config.js`, `tests/`, `.github/workflows/playwright.yml`, `robots.txt`, `sitemap.xml`.
3. Open Actions -> OW Coach Browser QA -> Run workflow -> main -> Run workflow.
4. If the full run fails, first run/check the split scripts locally or temporarily in the workflow:
   - `npm run test:e2e:smoke`
   - `npm run test:e2e:regression`
   - `npm run test:e2e:visual`
5. Download artifacts: `playwright-report`, `test-results`, `visual-snapshots`.

## v49.44 workflow fix

The workflow intentionally does not use `cache: npm`, because the previous run failed when no lock file was present. The package now also includes `package-lock.json` when available, but the workflow no longer depends on npm cache.
