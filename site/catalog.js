/* =====================================================================
   启动页目录数据 —— 新增内容只改这个文件。

   分类 group：id / title / icon（index.html 里 <symbol id="i-cat-*">）/ note / items
   卡片 item：
     title    标题
     desc     一两句话说清是什么
     view     'ready' 可打开 · 'doc' 文档 · 'sketch' 占位
     date     最近更新 YYYY-MM-DD
     href     点卡片打开的相对路径
     links    次要链接 [{label, href}]
     tags     小标签（只进搜索）
     thumb    {type:'image', src:'site/thumbs/xxx.jpg'} 截图（1280×640）
   ===================================================================== */
window.WORK_CATALOG = {
  updated: '2026-10-29',
  title: '工作梳理',
  groups: [
    {
      id: 'domain', title: '业务梳理', icon: 'i-cat-chart',
      items: [
        {
          title: '在手业务全景图',
          desc: '按领域、产业、场景、产品、底座分层，梳理开发者工具（DevEco Studio、Kunpeng DevKit、openUBMC Studio、毕方 IDE）、昇腾训练推理可视化探索与消费者云服务（云空间网页端），并列出各项目交互 / 视觉协作人。',
          view: 'ready',
          date: '2026-10-28',
          href: '业务全景图/在手业务全景图.html',
          links: [{ label: '在线版（Claude）', href: 'https://claude.ai/artifact/RZBitR8MXpEjfHrHpQ5Gnq' }],
          tags: ['全景图', 'DevEco Studio', 'Kunpeng DevKit', 'openUBMC Studio', '毕方 IDE', '云空间', '昇腾', '协作人'],
          thumb: { type: 'image', src: 'site/thumbs/domain-map.jpg' }
        }
      ]
    },
    {
      id: 'method', title: '方法与 Skill', icon: 'i-cat-book',
      items: [
        {
          title: '规划汇报材料写作 skill',
          desc: '从 DevEco 体验规划汇报提炼的写法：经典八段骨架（概览、背景、用户、竞品、策略、已落地、规划、目标、收尾）、每部分怎么写、推导方法与预判追问，交稿前用高老师视角检查。',
          view: 'doc',
          date: '2026-10-29',
          href: 'skills/planning-deck-craft/SKILL.md',
          links: [{ label: '说明', href: 'skills/README.md' }],
          tags: ['规划汇报', 'deck', '骨架', '病药效', 'Top3', '交稿前检查', 'skill']
        },
        {
          title: '高老师视角材料审视 skill',
          desc: '以三层领导高老师视角预审汇报 PPT、设计方案、用研报告和 UX 目标：七个维度逐条挑问题、模拟领导追问、给可直接执行的修改建议，并按材料类型调整侧重。',
          view: 'doc',
          date: '2026-10-29',
          href: 'skills/gao-review/SKILL.md',
          links: [{ label: '说明', href: 'skills/README.md' }],
          tags: ['高老师', '材料审视', '汇报', 'Why What How', '病药效', 'Top3', '用研报告', 'skill']
        },
        {
          title: 'UX 设计目标制定 skill',
          desc: '提炼自 2026 UX 设计项目目标研讨会的评委点评与各项目改写：五段链路方法论、14 条原则、按 To B/C/D 与项目性质切换的写法、语料模板、自检清单和脱敏范例。',
          view: 'doc',
          date: '2026-10-29',
          href: 'skills/ux-goal-setting/SKILL.md',
          links: [{ label: '说明', href: 'skills/README.md' }],
          tags: ['UX 目标', 'SMART', 'NSS', '设计策略', 'skill', '研讨会']
        }
      ]
    }
  ]
};
