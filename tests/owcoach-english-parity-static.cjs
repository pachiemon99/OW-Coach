#!/usr/bin/env node
const fs=require('fs');
const path=require('path');
const root=path.resolve(__dirname,'..');
const index=fs.readFileSync(path.join(root,'index.html'),'utf8');
const pkg=JSON.parse(fs.readFileSync(path.join(root,'package.json'),'utf8'));
function fail(msg){console.error(msg);process.exit(1);}
function must(s,msg){if(!s)fail(msg);}
const isV50Package=(v)=>{const p=String(v||'').split('.').map(Number);return p.length===3&&p.every(Number.isInteger)&&p[0]===50&&p[1]>=0&&p[1]<=99&&p[2]>=0;};
const required=[
  'v50.14 Pack N: English parity renderer and audit helpers',
  'window.OWC_ENGLISH_PARITY_SECTIONS',
  'Access Tier',
  'Matchup Category Summary',
  'Matchup Category',
  'Unique Matchup Focus',
  'Skill Timing Window',
  'Rank Advice',
  'Priority Enemies',
  'window.renderEnglishComposition=function(sel,d)',
  'window.renderEnglishDetail=function(h,d)'
];
for(const token of required) must(index.includes(token),`missing English parity token: ${token}`);
must(index.includes('d.categorySummary'), 'English composition renderer must include categorySummary');
must(index.includes('detailAccessLines(h)'), 'English detail renderer must include entitlement access lines');
must(index.includes('categoryLines(h)'), 'English detail renderer must include matchup category lines');
must(index.includes('uniquenessLines(h,d)'), 'English detail renderer must include uniqueness lines');
must(index.includes('rankHtml(d&&d.rank)'), 'English detail renderer must include rank advice');
must(isV50Package(pkg.version), `package version should stay on v50.x, got ${pkg.version}`);
must(pkg.scripts['check:english-parity']==='node tests/owcoach-english-parity-static.cjs','missing check:english-parity script');
must(pkg.scripts['check:syntax'].includes('check:english-parity'),'check:syntax must include check:english-parity');
const contract=JSON.parse(fs.readFileSync(path.join(root,'data/contracts/owcoach_english_parity_contract_v50_14.json'),'utf8'));
must(contract.required_english_detail_sections.includes('Rank Advice'),'contract missing Rank Advice');
must(fs.existsSync(path.join(root,'data/audits/owcoach_english_parity_audit_v50_14.csv')),'missing English parity audit CSV');
console.log('English parity static checks passed');
