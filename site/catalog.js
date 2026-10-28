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
  updated: '2026-10-28',
  title: '工作梳理',
  groups: [
    {
      id: 'domain', title: '业务梳理', icon: 'i-cat-chart',
      items: [
        {
          title: '在手业务全景图',
          desc: '按领域、产业、场景、产品、底座分层，梳理开发者工具（DevEco Studio、Kunpeng DevKit、openUBMC Studio、毕方 IDE）与消费者云服务（云空间网页端），并列出各项目交互 / 视觉协作人。',
          view: 'ready',
          date: '2026-10-28',
          href: '业务全景图/在手业务全景图.html',
          links: [{ label: '在线版（Claude）', href: 'https://claude.ai/artifact/RZBitR8MXpEjfHrHpQ5Gnq' }],
          tags: ['全景图', 'DevEco Studio', 'Kunpeng DevKit', 'openUBMC Studio', '毕方 IDE', '云空间', '协作人'],
          thumb: { type: 'image', src: 'site/thumbs/domain-map.jpg' }
        }
      ]
    }
  ]
};
