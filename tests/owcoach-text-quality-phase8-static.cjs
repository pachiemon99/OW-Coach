const fs = require('fs');
const path = require('path');
const { assertAppSourceSyntax } = require('./owcoach-app-source-utils.cjs');
const { createHarness, renderComposition, renderDetail, representativeCompositions, uniqueSampleCompositions } = require('./owcoach-render-audit-utils.cjs');
const root = path.resolve(__dirname, '..');
function fail(msg){ console.error(msg); process.exit(1); }
function must(cond,msg){ if(!cond) fail(msg); }
const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
must(/^50\.42\.0$/.test(pkg.version), `package version mismatch: ${pkg.version}`);
must(String(pkg.description || '').includes('text quality phase8'), 'package description must mention text quality phase8');
must(pkg.scripts['check:text-quality-phase8'] === 'node tests/owcoach-text-quality-phase8-static.cjs', 'missing phase8 text quality script');
must(pkg.scripts['check:syntax'].includes('check:text-quality-phase8'), 'check:syntax must include phase8 text quality check');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
for (const token of ['OWC_TEXT_QUALITY_PHASE8_APPLIED','OWC_TEXT_QUALITY_PHASE8B_APPLIED','OWC_TEXT_QUALITY_PHASE8C_APPLIED','owcNormalizeTextQualityPhase8']) must(html.includes(token), `missing phase8 runtime token: ${token}`);
assertAppSourceSyntax(root);
const banned = [
  '完成コア','5人構成合成','5人合成','切るべき配線','切る配線','構成読み取り 2.0','診断スコア連動','最重要レンズ','同時に警戒する接続','指令書表示','指令カード','6枚の要点カード','6枚の指令カード','構成の勝ち筋','公開区分','相性理由','成立役・シナジー確認','優先対象','絶対NG','NG行動','安全な席','自分の席','今回の席','止める線','まず見るもの','崩し方','先に崩す連携','ランク別アドバイス','初心者向け要約','メイン火力管理','高台運用','主シナジー','副シナジー','支援線','回復線','長射線','横射線','別射線','自由射線','上下射線','横圧','火力源','吐かせる','吐かせて','咎める','撃破圏内','撃破対象','位置取り破壊','遮蔽の向きを破壊する','帰り道','曲がり曲がり角','角管理'
];
const badRegex = /攻撃優先順位：\s*\d+\./;
const h = createHarness(root);
const heroes = h.context.OWCOACH_DATA.shared.heroes;
const combos = [
  { label:'rush split', tank:'Reinhardt', dps1:'Mei', dps2:'Reaper', sup1:'Lúcio', sup2:'Kiriko' },
  { label:'bunker sustain', tank:'Sigma', dps1:'Bastion', dps2:'Ashe', sup1:'Baptiste', sup2:'Zenyatta' },
  { label:'air pocket', tank:'D.Va', dps1:'Pharah', dps2:'Echo', sup1:'Mercy', sup2:'Ana' },
  ...representativeCompositions(heroes),
  ...uniqueSampleCompositions(heroes, 10, 5042)
];
const targets = ['Soldier76','Sojourn','Cassidy','Ashe','Sombra','Tracer','Echo','Emre'];
const issues = [];
function scan(kind,label,text){
  for (const b of banned) if (String(text).includes(b)) issues.push({kind,label,banned:b,ctx:String(text).slice(Math.max(0,String(text).indexOf(b)-80), String(text).indexOf(b)+140)});
  const m = String(text).match(badRegex); if (m) issues.push({kind,label,banned:'double priority number',ctx:String(text).slice(Math.max(0,m.index-80),m.index+140)});
}
for (const target of targets){
  for (const combo of combos) scan('composition', `${target}:${combo.label||combo.tank}`, renderComposition(h, target, combo));
}
for (const target of targets){
  for (const enemy of ['Winston','Reinhardt','Sigma','Pharah','Sombra','Bastion','Ana','Mercy','Zenyatta','Torbjörn']) scan('detail', `${target}:${enemy}`, renderDetail(h, target, enemy));
}
if (issues.length){
  const preview = issues.slice(0, 20).map((x,i)=>`${i+1}. ${JSON.stringify(x)}`).join('\n');
  fail(`phase8 rendered text quality issues: ${issues.length}\n${preview}`);
}
const rush = renderComposition(h,'Soldier76',{tank:'Reinhardt',dps1:'Mei',dps2:'Reaper',sup1:'Lúcio',sup2:'Kiriko'});
must(rush.includes('シナジー'), 'rush representative output should include synergy heading');
must(rush.includes('ラインハルト＋メイ＋ルシオ'), 'rush representative output should keep hero synergy names');
must(rush.includes('止め方') || rush.includes('先に止める連携'), 'rush representative output should explain how to stop synergy');
console.log('Text quality phase8 rendered browser QA static checks passed');
