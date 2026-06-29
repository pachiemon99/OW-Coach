const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
function fail(msg){ console.error(msg); process.exit(1); }
function exists(rel){ return fs.existsSync(path.join(root, rel)); }
const requiredDirs = [
  'data/targets',
  'data/contracts',
  'data/audits',
  'data/shared',
  'data/reports',
  'docs/contracts',
  'docs/packs',
  'docs/audits',
  'diagnosis_text',
  'handoff_bundle',
  'tests'
];
for (const dir of requiredDirs) if (!exists(dir)) fail(`missing layout directory: ${dir}`);
const rootFiles = fs.readdirSync(root).filter(name => fs.statSync(path.join(root, name)).isFile());
if (rootFiles.length > 16) fail(`too many root files after layout optimization: ${rootFiles.length}`);
const targetDirs = fs.readdirSync(path.join(root, 'data/targets')).filter(name => fs.statSync(path.join(root, 'data/targets', name)).isDirectory());
if (targetDirs.length !== 17) fail(`target data directory count ${targetDirs.length}, expected 17`);
for (const slug of targetDirs) {
  if (!exists(`data/targets/${slug}/${slug}_comp_diagnosis_db_v1.csv`)) fail(`missing comp CSV for ${slug}`);
  if (!exists(`data/targets/${slug}/${slug}_hero_db_v1_full_all_roles.csv`)) fail(`missing detail CSV for ${slug}`);
}
const sharedRequired = [
  'data/shared/owcoach_priority_target_decision_db_v50_8.csv',
  'data/shared/owcoach_matchup_category_taxonomy_db_v50_12.csv',
  'data/shared/owcoach_feature_entitlement_db_v50_13.csv',
  'data/shared/owcoach_matchup_reason_db_v50_10.csv',
  'data/shared/owcoach_wave_review_loop_db_v50_18.csv'
];
for (const rel of sharedRequired) if (!exists(rel)) fail(`missing shared DB: ${rel}`);
const contractRequired = [
  'data/contracts/owcoach_handoff_readiness_contract_v50_20.json',
  'docs/contracts/HANDOFF_READINESS_CONTRACT_v50_20.md',
  'docs/packs/README_PACK_U_DIAGNOSIS_TEXT_STRUCTURE.md',
  'data/reports/validation_report.json'
];
for (const rel of contractRequired) if (!exists(rel)) fail(`missing moved contract/doc: ${rel}`);
const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
if (pkg.version !== '50.23.0') fail(`package version mismatch: ${pkg.version}`);
console.log('File layout optimization static checks passed');
