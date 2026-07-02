const isV50Package=(v)=>{const p=String(v||'').split('.').map(Number);return p.length===3&&p.every(Number.isInteger)&&p[0]===50&&p[1]>=0&&p[1]<=99&&p[2]>=0;};
const fs = require('fs');
const path = require('path');
const { assertAppSourceSyntax } = require('./owcoach-app-source-utils.cjs');

const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const spec = fs.readFileSync(path.join(root, 'tests/owcoach-macro-rebuild-phase6-browser.spec.js'), 'utf8');
const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));

function fail(message) {
  console.error(message);
  process.exit(1);
}
function mustInclude(source, token, label) {
  if (!source.includes(token)) fail(`missing ${label}: ${token}`);
}

const requiredSpecTokens = [
  'phase 5 synthesis is visible in all result modes',
  'phase 6 browser qa detects',
  'phase 4 detail surface stays visible after phase 5 synthesis',
  'シナジー',
  '敵構成の勝ち方',
  '先に止める連携',
  '主な勝ち方 / 次に警戒する形',
  'ウィンストン＋トレーサー＋アナ',
  'ラインハルト＋メイ＋ルシオ',
  'シグマ＋バスティオン＋バティスト',
  'Mobile Safari width'
];
for (const token of requiredSpecTokens) mustInclude(spec, token, 'phase6 browser spec token');

for (const token of [
  'owcoach-macro-rebuild-phase6-browser.spec.js',
  'check:macro-rebuild-phase6'
]) mustInclude(JSON.stringify(pkg), token, 'package phase6 wiring');

if (!isV50Package(pkg.version)) fail(`package version mismatch: ${pkg.version}`);
if (!/phase6 browser QA|text quality phase8/i.test(String(pkg.description || ''))) fail('package description does not mention phase6 browser QA or later text quality phase');

const notesPath = path.join(root, 'data/shared/owcoach_macro_rebuild_phase6_notes_v50_33_wip.json');
const notes = JSON.parse(fs.readFileSync(notesPath, 'utf8'));
if (notes.phase !== 'macro_rebuild_phase6') fail('unexpected phase6 notes phase');
if (notes.package_version !== '50.33.0') fail('unexpected phase6 notes package version');
if (!Array.isArray(notes.browser_qa_cases) || notes.browser_qa_cases.length < 3) fail('missing phase6 browser QA cases');
if (!notes.browser_qa_cases.some((x) => String(x).includes('Winston + Tracer + Ana'))) fail('missing dive core browser QA case');

const readmePath = path.join(root, 'docs/packs/README_PACK_AC_MACRO_REBUILD_PHASE6.md');
const readme = fs.readFileSync(readmePath, 'utf8');
for (const token of ['Phase 6', 'Browser QA', 'Mobile Safari width', 'Desktop Chromium']) {
  mustInclude(readme, token, 'phase6 readme token');
}

for (const token of ['OWC_MACRO_REBUILD_PHASE5_APPLIED', 'owcRenderMacroCoreSynthesis', 'owcMacroPhase5']) {
  mustInclude(html, token, 'phase5 app token retained');
}

assertAppSourceSyntax(root);
console.log('Macro rebuild phase6 Browser QA wiring static checks passed');
