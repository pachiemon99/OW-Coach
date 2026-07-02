# CHAT HANDOFF v50.42

Current local package is `v50.42.0`, Text Quality Phase 8.

## What changed

- Added rendered-output wording normalization for composition diagnosis and detail diagnosis.
- Added `tests/owcoach-text-quality-phase8-static.cjs`.
- Updated Phase 6 Browser QA spec expectations from old internal labels to public wording.
- Updated static version gates to allow later v50 package versions.
- Generated full reflection ZIP for GitHub Desktop copy-in workflow.

## Important wording targets

Do not reintroduce these public UI labels:

- 完成コア
- 5人構成合成
- 配線
- 席
- 絶対NG
- 優先対象
- 構成の勝ち筋

Use:

- シナジー
- 敵構成の勝ち方
- 先に止める連携
- 立ち位置
- 避ける行動
- 先に見る相手
- 敵の勝ち筋

## Next action

Push branch `pack-ah-v50-42-text-quality-phase8-browser-qa` and run GitHub Actions `browser-qa`.
