# README Pack AH - Text Quality Phase 8 Browser QA Polish

## Version

- Package version: `50.42.0`
- Phase: Text Quality Phase 8
- Focus: Browser QA / rendered snapshot wording stabilization

## Purpose

This pack stabilizes the rendered Japanese UI after the text-quality work. It keeps the composition and synergy logic intact, but normalizes the words users actually see in composition diagnosis and one-hero detail diagnosis.

## User-facing wording policy

- `完成コア`, `5人構成合成`, `配線` are not shown to users.
- Synergy is shown as `シナジー` only when a meaningful 2-hero or 3-hero combination exists.
- `席` is normalized to `立ち位置`.
- `絶対NG` and `NG行動` are normalized to `避ける行動`.
- `優先対象` is normalized to `先に見る相手`.
- Ambiguous line/angle words are expanded where practical, such as `支援線` to `サポートの射線` and `横射線` to `別角度の射線`.
- Meaningless item counters in accordion summaries are removed from rendered output.
- Double numbering after `攻撃優先順位：` is removed from rendered output.

## Browser QA impact

The Phase 6 browser spec expected old labels such as `完成コア検出 / 5人構成合成`. Phase 8 updates those expectations to the public wording:

- `シナジー`
- `敵構成の勝ち方`
- `先に止める連携`
- `主な勝ち方 / 次に警戒する形`

Playwright itself was not executed in this local environment because `@playwright/test` and browsers are not installed. The spec files pass `node --check`, and rendered-output static QA was added for representative desktop/mobile-relevant scenarios.
