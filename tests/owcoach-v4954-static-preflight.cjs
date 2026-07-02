const fs=require('fs');
const path=require('path');
function fail(m){console.error(m);process.exit(1);}
const root=process.cwd();
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const pkg=JSON.parse(fs.readFileSync(path.join(root,'package.json'),'utf8'));
const versionParts=String(pkg.version||'').split('.').map(Number);
const validV50=versionParts.length===3 && versionParts.every(Number.isInteger) && versionParts[0]===50 && versionParts[1]>=0 && versionParts[1]<=99 && versionParts[2]>=0;
if(!validV50) fail('package version mismatch');
for(const t of ['Junkrat','Pharah','Echo','Emre']){ if(!html.includes(`value="${t}"`) && !html.includes(`'${t}'`)) fail('missing target '+t); }
for(const f of ['owcEnhancedCompositionDiagnosis','owcSynergyWinConditionLine','owcTargetSynergyRoleLine','OWC_SYNERGY_EN']){ if(!html.includes(f)) fail('missing '+f); }
for(const bad of ['爆風を置く','フラグ・ランチャーを置く','ロケット・ランチャーを置く','曲射を置く','横道','遮蔽へ切る','undefined / null']){ if(html.includes(bad)) fail('forbidden term '+bad); }
console.log('v50 static preflight OK');
