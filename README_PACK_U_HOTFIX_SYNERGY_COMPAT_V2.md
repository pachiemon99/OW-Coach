# Pack U Hotfix: Synergy Compatibility Text v2

## Purpose

The first compatibility hotfix restored `敵5人を1人ずつの対面として読まない` inside the editable forbidden guidance, but the rendered Japanese synergy QA case did not display that guidance because target-specific forbidden lines were selected first.

This v2 hotfix moves the compatibility phrase into the `ダイブ救助構成` win-condition sentence, which is always rendered directly under `構成の勝ち筋` for the failing test composition.

## Changed files

- `diagnosis_text/ja/composition_win_conditions.json`
- `diagnosis_text/bundle.json`
- `index.html`
- `_combined.js`

## QA note

This keeps Pack U's editable `diagnosis_text/` structure intact while preserving the existing Playwright expectation in `tests/owcoach-synergy-cross-qa.spec.js`.
