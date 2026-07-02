const isV50Package=(v)=>{const p=String(v||'').split('.').map(Number);return p.length===3&&p.every(Number.isInteger)&&p[0]===50&&p[1]>=0&&p[1]<=99&&p[2]>=0;};
const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
function fail(msg){ console.error(msg); process.exit(1); }
function read(rel){ return fs.readFileSync(path.join(root, rel), 'utf8'); }
function exists(rel){ return fs.existsSync(path.join(root, rel)); }
const pkg = JSON.parse(read('package.json'));
if (!isV50Package(pkg.version)) fail(`package version mismatch: ${pkg.version}`);
if (!/release stabilization|text quality phase8/i.test(String(pkg.description || ''))) fail('package description must describe release stabilization or later text quality stabilization');
if (pkg.scripts['check:macro-rebuild-phase7'] !== 'node tests/owcoach-macro-rebuild-phase7-static.cjs') fail('missing phase7 check script');
if (!pkg.scripts['check:syntax'].includes('check:macro-rebuild-phase7')) fail('check:syntax must include phase7 check');
if (!pkg.scripts['test:e2e:ci'].includes('owcoach-macro-rebuild-phase6-browser.spec.js')) fail('browser QA must retain phase6 browser spec');
const required = ['docs/packs/README_PACK_AD_RELEASE_STABILIZATION.md','docs/status/GITHUB_ACTIONS_PHASE6_BROWSER_QA_PASS_v50_33.md','data/shared/owcoach_macro_rebuild_phase7_release_status_v50_34.json','handoff_bundle/CHAT_HANDOFF_v50_34.md','handoff_bundle/NEXT_CHAT_PROMPT.md','handoff_bundle/LATEST_FILES.md'];
for (const rel of required) if (!exists(rel)) fail(`missing phase7 release file: ${rel}`);
if (!read('README.md').includes('v50.34 Phase 7 - Release Stabilization')) fail('README missing v50.34 Phase 7 section');
const pack = read('docs/packs/README_PACK_AD_RELEASE_STABILIZATION.md');
for (const token of ['v50.34', 'Release Stabilization', 'OW Coach Browser QA #44', 'Phase 1', 'Phase 6', 'Phase 7']) if (!pack.includes(token)) fail(`release stabilization README missing token: ${token}`);
const gh = read('docs/status/GITHUB_ACTIONS_PHASE6_BROWSER_QA_PASS_v50_33.md');
for (const token of ['OW Coach Browser QA #44', 'browser-qa', 'Syntax check', 'Run browser QA', 'succeeded']) if (!gh.includes(token)) fail(`GitHub Actions status missing token: ${token}`);
const handoff = read('handoff_bundle/CHAT_HANDOFF_v50_34.md');
for (const token of ['50.34.0', 'Phase 7', 'browser QA success', 'pack-ad-v50-34-release-stabilization', 'Phase 8']) if (!handoff.includes(token)) fail(`handoff missing token: ${token}`);
const note = JSON.parse(read('data/shared/owcoach_macro_rebuild_phase7_release_status_v50_34.json'));
if (note.package_version !== '50.34.0') fail('phase7 note package version mismatch'); // Phase 7 note remains the v50.34 release baseline.
if (note.runtime_feature_change !== false) fail('phase7 must not introduce runtime feature changes');
if (!Array.isArray(note.stabilized_phases) || note.stabilized_phases.length !== 6) fail('phase7 note must list phases 1-6 as stabilized');
console.log('Macro rebuild phase7 release stabilization static checks passed');
