# v50.22 Pack U Hotfix: Synergy Compatibility Text

## Purpose

Pack U moved diagnosis result text into `diagnosis_text/`. Browser QA then caught that the Japanese synergy result no longer included the compatibility phrase required by the existing cross-QA spec:

- `敵5人を1人ずつの対面として読まない`

## Fix

The phrase is restored in the editable diagnosis text bundle, especially in composition `forbidden` guidance. The fix is applied to:

- `diagnosis_text/bundle.json`
- `diagnosis_text/ja/composition_profiles.json`
- embedded fallback bundle in `index.html`
- embedded fallback bundle in `_combined.js`

## Rule

When rewriting diagnosis text, keep browser-QA compatibility phrases unless the corresponding Playwright spec is intentionally updated in the same change.
