const {chromium}=require('playwright');
const CSS=`
.matrix,header p,.eyebrow,.room a,.found a,.scn .flow,.room ul,.room .tag,.found .tag,.dep span.x{display:none!important}
html,body{width:1920px;height:1080px;overflow:hidden;margin:0;padding:0!important}
.wrap{max-width:none;width:1920px;padding:40px 64px;box-sizing:border-box;gap:28px;height:1080px;justify-content:center}
header h1{font-size:44px}
.house{grid-template-columns:76px repeat(4,minmax(0,1fr)) 24px minmax(0,1fr);gap:14px}
.lab{font-size:24px;letter-spacing:.3em}
.roof{padding:16px 28px}
.roof h2{font-size:36px!important;margin:0}
.roof p{font-size:24px;opacity:.8}
.ind{padding:12px 22px}
.ind b{font-size:28px}
.ind span{font-size:24px}
.scn{padding:14px 16px;gap:8px}
.chip{font-size:24px;padding:2px 12px;line-height:1.4}
.room{padding:18px 22px;gap:10px}
.room h3{font-size:30px;line-height:1.2}
.room .pos{font-size:24px;line-height:1.45}
.team{font-size:24px;padding:8px 14px;gap:2px 12px;line-height:1.45}
.found{padding:18px 26px;gap:24px;grid-template-columns:minmax(0,1fr) minmax(0,1.6fr)}
.found h3{font-size:34px}
.found p{font-size:24px;line-height:1.45}
.out{font-size:24px}
.caps .chip.x{display:none}
.dep{padding:22px 24px;font-size:24px;display:flex;flex-direction:column;justify-content:center}.dep b{font-size:28px}
`;
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1920,height:1080},deviceScaleFactor:2});
await p.goto('file:///home/user/-/'+encodeURI('业务全景图/在手业务全景图.html'));await p.waitForTimeout(1200);
await p.addStyleTag({content:CSS});
// keep only a few foundation chips
await p.evaluate(()=>{const keep=['Agentic 模式','Plan 模式','Debug 模式','Review 模式','MCP / Skills 扩展'];document.querySelectorAll('.found .chip').forEach(c=>{if(!keep.includes(c.textContent))c.classList.add('x')});
 const out=document.querySelector('.out'); if(out) out.innerHTML='<b>能力输出 ↑</b> AI 协同编码、调试与评审，供上层工具复用';
 const fp=document.querySelector('.found p'); if(fp) fp.textContent='开源 AI Agent 开发环境，对接软件 IDE 实验室，商业转化到 DevEco Studio 等工具。';
 const cons=document.querySelector('.roof.cons p'); if(cons) cons.textContent='C 端 · 面向终端用户';
 const dev=document.querySelector('.roof.dev p'); if(dev) dev.textContent='B 端 · 面向开发者 · 以毕方 IDE 为底座';
});
await p.evaluate(()=>{
 const T=(sel,txt)=>{const e=document.querySelector(sel); if(e) e.textContent=txt;};
 const inds=document.querySelectorAll('.ind span'); ['HarmonyOS 开发者','服务器 / AI 开发者、ISV、硬件厂商','华为终端用户'].forEach((t,i)=>inds[i]&&(inds[i].textContent=t));
 const sc=[['编码','预览','构建','调试','调优'],['迁移','开发','编译调试','诊断','调优'],['建模','代码生成','构建','测试','发布'],['训练','推理','可视化'],['云盘','图库','联系人','查找设备']];
 document.querySelectorAll('.scn').forEach((el,i)=>{el.innerHTML=sc[i].map(t=>'<span class="chip">'+t+'</span>').join('')});
 const pos=['鸿蒙应用官方 IDE','鲲鹏全流程开发工具','BMC 固件组件开发工具链','探索 · 训练推理场景可视化','云空间的浏览器入口'];
 document.querySelectorAll('.room .pos').forEach((e,i)=>e.textContent=pos[i]);
 const d=document.querySelector('.dep'); d.innerHTML='<b>终端云服务平台</b><span>云存储 · 多设备同步</span>';
});
await p.waitForTimeout(400);
const r=await p.evaluate(()=>{let min=99,who='';document.querySelectorAll('body *').forEach(e=>{if(!e.offsetParent&&e.tagName!=='BODY')return;const t=[...e.childNodes].some(n=>n.nodeType===3&&n.textContent.trim());if(!t)return;const f=parseFloat(getComputedStyle(e).fontSize);if(f<min){min=f;who=e.className+':'+e.textContent.slice(0,20)}});return {h:document.querySelector('.wrap').scrollHeight,min,who}});
console.log(r);
await p.screenshot({path:process.argv[2]});await b.close()})();
