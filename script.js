/**
 * 智警财安官网 — 前端交互脚本
 * ---------------------------------------------------------------------------
 * 模块概览：
 * - 多语言（zh / en）：TRANSLATIONS + applyLanguage + lang select
 * - UI：Toast、移动端导航、轮播、回到顶部、客服浮窗
 * - 表单：校验、防抖输入反馈、提交 Loading 模拟
 * - 工具：debounce、安全查询 DOM、事件用 AbortController 统一注销
 * - 高级：Chart.js 看板、KPI 数字动画、案例轮播、FAQ 手风琴
 */

(function () {
  "use strict";

  /** @type {Record<string, Record<string, string>>} 全站文案键值对 */
  const TRANSLATIONS = {
    zh: {
      brand: "智警财安",
      nav_home: "首页",
      nav_features: "产品功能",
      nav_pricing: "服务定价",
      nav_contact: "联系我们",
      nav_insights: "数据洞察",
      nav_cases: "客户案例",
      nav_faq: "常见问题",
      nav_highlights: "产品特色",
      nav_scenarios: "场景方案",
      nav_demo: "功能演示",
      nav_compare: "优势对比",
      lang_label: "语言",
      lang_hint: "切换后全站文案将同步更新",
      stats_heading: "关键业务指标",
      stat_1_suffix: "+",
      stat_1_label: "企业客户",
      stat_2_label: "平台可用性 SLA",
      stat_3_suffix: " ms",
      stat_3_label: "平均风控响应",
      stat_4_suffix: " 项",
      stat_4_label: "合规模板库",
      stat_ai_acc: "风险识别准确率（RNN+CNN）",
      stat_eff: "风控效率提升",
      stat_cost: "人工成本降低",
      stat_reg: "监管合规覆盖",
      stat_reg_suffix: " 项",
      ph_kicker: "金融科技 · AI财务风控专家",
      ph_title: "AI财务风险预警 · 四大核心特色",
      ph_subtitle: "以「实时、精准、智能、定制」为锚点，构建可审计、可落地的企业级财务安全闭环。",
      ph_m1_label: "多模态模型识别准确率",
      ph_m1_hint: "RNN+CNN 融合 · 持续学习",
      ph_m2_label: "企业客户与机构用户",
      ph_m2_hint: "中小企业至大型集团",
      ph_spark_cap: "风险指数（演示）",
      ph_c1_title: "AI多维度财务风控",
      ph_c1_desc: "覆盖资金流、税务、供应链、投融资、合规与舆情六大维度，统一风险视图。",
      ph_c1_metric: "模型迭代周期 ≤ 7 天 · 支持行业特征注入",
      ph_c2_title: "实时预警响应",
      ph_c2_desc: "事件级推送与值班联动，显著压缩从发现到处置的时间窗口。",
      ph_c2_us: "小时 · 我方平均",
      ph_c2_ind: "小时 · 行业平均",
      ph_c2_metric: "多渠道触达：企微 / 邮件 / 短信 / API",
      ph_c3_title: "定制化解决方案",
      ph_c3_desc: "按行业、规模与业务场景配置模型与策略模板，快速对齐组织治理要求。",
      ph_c3_p1: "行业定制",
      ph_c3_p2: "规模定制",
      ph_c3_p3: "场景定制",
      ph_c3_metric: "交付：蓝图 → 配置 → 联调 → 试运行",
      ph_c4_title: "全链路闭环服务",
      ph_c4_desc: "监测、预警、分析、应对、复盘五步闭环，沉淀可复用的策略资产。",
      ph_c4_s1: "监测",
      ph_c4_s2: "预警",
      ph_c4_s3: "分析",
      ph_c4_s4: "应对",
      ph_c4_s5: "复盘",
      ph_c4_metric: "复盘报表可对接审计与董事会材料",
      ph_dim1: "资金流",
      ph_dim2: "税务",
      ph_dim3: "供应链",
      ph_dim4: "投融资",
      ph_dim5: "合规",
      ph_dim6: "舆情",
      features_title: "企业级核心功能矩阵",
      features_subtitle:
        "基础能力夯实监测与预警，高级能力扩展舆情、合规报告、对标与决策辅助；支持按角色与行业灵活组合。",
      feat_f_all: "全部",
      feat_f_basic: "基础功能",
      feat_f_adv: "高级功能",
      feat_f_ind: "行业功能",
      feat_expand: "展开详情",
      feat_collapse: "收起",
      feat_badge_basic: "基础",
      feat_badge_adv: "高级",
      feat_cta_demo: "申请功能演示",
      feat1_title: "实时数据监测",
      feat1_desc: "多源异构数据接入，分钟级同步财务与经营数据，形成统一风险数据湖。",
      feat1_metric: "接入延迟 P95 ≤ 5 分钟",
      feat1_detail_lead: "预置连接器（演示）：",
      feat1_mock_hub: "智警财安",
      feat2_title: "多等级异常预警",
      feat2_desc: "黄 / 橙 / 红三级预警与升级策略，支持值班主任与应急小组自动拉群。",
      feat2_metric: "误报率较规则引擎降低 35%+（样本）",
      feat2_detail_lead: "预警等级演示：",
      feat2_y: "黄 · 关注",
      feat2_o: "橙 · 复核",
      feat2_r: "红 · 处置",
      feat2_channels: "多渠道：企微 / 邮件 / 短信 / Webhook",
      feat3_title: "个性化评估模型",
      feat3_desc: "结合组织风险偏好与行业基准，训练专属评估模型并灰度发布。",
      feat3_metric: "典型上线周期 4–8 周",
      feat3_s1: "需求调研 · 样本标注",
      feat3_s2: "特征工程 · 模型训练",
      feat3_s3: "上线调优 · 漂移监控",
      feat4_title: "智能应对策略",
      feat4_desc: "将预案模板与审批流打通，自动生成处置建议并跟踪执行结果。",
      feat4_metric: "某制造企业案例：处置周期 −42%",
      feat4_bef: "优化前 平均 9.6 天",
      feat4_aft: "优化后 平均 5.5 天",
      feat4_note: "* 演示口径，非承诺效果",
      feat5_title: "财务舆情分析",
      feat5_desc: "聚合公开舆情与行业资讯，NLP 抽取财务相关信号并与内部指标交叉验证。",
      feat5_metric: "日均处理资讯 200 万+ 条（集群）",
      feat5_detail: "支持自定义关键词与负面词典；与「预警」模块一键联动。",
      feat6_title: "合规审计报告",
      feat6_desc: "一键生成符合监管格式的财务合规与内控审计报告，留痕可追溯。",
      feat6_metric: "覆盖 12+ 监管模板（可扩展）",
      feat6_detail: "支持《企业财务通则》《数据安全法》等合规模块勾选组装。",
      feat7_title: "跨企业对比分析",
      feat7_desc: "同行业 / 同规模对标关键财务与风险指标，识别相对薄弱项。",
      feat7_metric: "对标样本库持续更新",
      feat7_detail: "支持集团内跨子公司对标与匿名行业指数对照。",
      feat8_title: "智能决策辅助",
      feat8_desc: "基于风险画像生成财务决策建议，可导出 PDF / Word 供管理层审阅。",
      feat8_metric: "建议书含：情景分析 · 敏感性 · 风险提示",
      feat8_detail: "导出文件含水印与操作日志，满足审计留痕要求。",
      sc_title: "行业场景化方案",
      sc_subtitle: "痛点 → 方案 → 收益，三段式呈现；支持触控滑动切换。",
      sc1_name: "中小企业",
      sc1_pain: "痛点：资金链波动难预判，税务合规成本高。",
      sc1_sol: "方案：轻量接入 + 税务与资金双引擎预警模板。",
      sc1_gain: "收益：平均提前 10–20 天发现现金流压力（演示口径）。",
      sc2_name: "大型集团",
      sc2_pain: "痛点：跨子公司数据割裂，集团统筹难。",
      sc2_sol: "方案：多法人账套映射 + 集团风控驾驶舱。",
      sc2_gain: "收益：统一风险语言，支撑月度经营分析会。",
      sc3_name: "金融机构",
      sc3_pain: "痛点：信贷与反欺诈模型需可解释、可审计。",
      sc3_sol: "方案：监管报送接口 + 模型解释报告 + 实时预警。",
      sc3_gain: "收益：审查材料一次通过率提升（演示口径）。",
      demo_title: "产品功能演示",
      demo_subtitle: "模拟「数据接入 → 风险监测 → 预警推送 → 策略生成」全流程，可自动播放或分步查看。",
      demo_mode_step: "分步演示",
      demo_mode_auto: "自动演示",
      demo_s1: "数据接入",
      demo_s2: "风险监测",
      demo_s3: "预警推送",
      demo_s4: "策略生成",
      demo_n1: "正在连接金蝶 / 用友 / 银行 API（演示）… 数据校验通过。",
      demo_n2: "实时监测 128 项财务指标，识别 3 个异常波动点（演示）。",
      demo_n3: "已推送橙级预警至企微值班群，并抄送风控邮箱（演示）。",
      demo_n4: "策略引擎生成处置建议与复盘提纲，可一键导出 PDF（演示）。",
      demo_prev: "上一步",
      demo_next: "下一步",
      demo_pause: "暂停",
      demo_replay: "重播",
      demo_share: "复制演示链接",
      demo_download: "下载演示说明 PDF",
      toast_demo_link: "演示链接已复制到剪贴板（模拟）。",
      toast_demo_pdf: "将打开演示说明下载（前端模拟）。",
      demo_done_title: "申请免费试用",
      demo_done_lead: "演示已完成。留下信息，我们将为您开通试用评估环境（前端模拟）。",
      cmp_title: "产品优势对比",
      cmp_subtitle: "多维度对标典型市场方案；可隐藏友商名称以便内部分享。",
      cmp_hide: "隐藏竞品名称（显示为友商 A/B）",
      cmp_col_dim: "对比维度",
      cmp_col_us: "智警财安",
      cmp_col_a: "友商 A",
      cmp_col_b: "友商 B",
      cmp_col_a_full: "CloudRisk Pro",
      cmp_col_b_full: "FinGuard Suite",
      cmp_r1: "AI 模型能力",
      cmp_r1_us: "RNN+CNN 多模态 · 可解释",
      cmp_r1_a: "单一规则 + 浅层模型",
      cmp_r1_b: "通用大模型 · 财务域微调不足",
      cmp_r2: "识别准确率（样本）",
      cmp_r3: "预警响应",
      cmp_r3_us: "平均 0.5 小时",
      cmp_r3_a: "~24 小时",
      cmp_r3_b: "~12 小时",
      cmp_r4: "功能覆盖",
      cmp_r4_us: "基础 + 高级 + 行业套件",
      cmp_r4_a: "基础为主",
      cmp_r4_b: "高级功能另购",
      cmp_r5: "服务体系",
      cmp_r5_us: "7×24 · 专属经理 · 定制开发",
      cmp_r5_a: "工作日工单",
      cmp_r5_b: "标准 SLA",
      cmp_r6: "综合成本",
      cmp_r6_us: "一体化 · 运维成本可控",
      cmp_r6_a: "多系统叠加",
      cmp_r6_b: "按模块计费",
      cmp_cta: "获取定制化方案对比",
      modal_book_title: "申请功能演示",
      modal_book_lead: "请留下信息，顾问将在 1 个工作日内与您联系（前端模拟）。",
      modal_trial_title: "申请免费试用",
      modal_trial_lead: "我们将为您开通试用评估与专家回访（前端模拟）。",
      modal_cmp_title: "定制化方案对比",
      modal_cmp_lead: "描述您的行业与规模，我们将输出对标报告（前端模拟）。",
      modal_company: "公司 / 机构",
      modal_note: "补充说明",
      modal_submit: "提交",
      toast_modal_ok: "提交成功，我们将尽快联系您。",
      trust_title: "合作伙伴与生态认证",
      trust_1: "等保三级",
      trust_2: "ISO 27001",
      trust_3: "可信云",
      trust_4: "金标联盟",
      trust_5: "信创适配",
      insights_title: "数据洞察看板",
      insights_subtitle:
        "基于脱敏样本的演示指标，展示平台在风控趋势、告警构成与合规覆盖上的可视化能力。",
      insights_refresh: "刷新演示数据",
      insights_hint: "图表支持交互悬停查看数值",
      insights_note: "* 图示为前端演示数据，不代表任何客户真实业务结果。",
      months_short: "1月,2月,3月,4月,5月,6月,7月,8月,9月,10月,11月,12月",
      chart_line_title: "风险识别趋势（近 12 个月）",
      chart_doughnut_title: "告警类型分布",
      chart_bar_title: "合规检查项覆盖率（按域）",
      chart_badge_trend: "时序分析",
      chart_badge_mix: "构成分析",
      chart_badge_coverage: "域对比",
      chart_leg_high: "高危",
      chart_leg_medium: "中危",
      chart_leg_low: "低危",
      chart_leg_info: "提示",
      chart_domain_1: "财务域",
      chart_domain_2: "资金域",
      chart_domain_3: "数据域",
      chart_domain_4: "访问域",
      cases_title: "客户案例与评价",
      cases_subtitle: "来自金融与公共服务领域的实践摘要，均为演示文案。",
      case_1_quote: "「审计报表从数天缩短到小时级，合规团队与业务部门的协作成本明显下降。」",
      case_1_org: "某城商行 · 风控科技部",
      case_1_tag: "财务合规",
      case_2_quote: "「多租户隔离与细粒度权限满足了我们分级管理的要求，上线过程平滑。」",
      case_2_org: "某省级单位 · 信息化中心",
      case_2_tag: "数据安全",
      case_3_quote: "「告警收敛与值班联动减少了夜间误报，运维大盘对管理层非常友好。」",
      case_3_org: "某证券机构 · 运维中心",
      case_3_tag: "智能运维",
      timeline_title: "实施与交付流程",
      timeline_subtitle: "标准化里程碑 + 可配置扩展，保障交付可预期。",
      tl_1_title: "需求调研",
      tl_1_desc: "梳理业务场景、合规边界与集成系统，输出差距分析。",
      tl_2_title: "方案设计",
      tl_2_desc: "架构与权限模型设计，明确 SLA 与验收指标。",
      tl_3_title: "部署联调",
      tl_3_desc: "环境部署、数据迁移演练与接口联调，灰度验证。",
      tl_4_title: "培训上线",
      tl_4_desc: "管理员与业务培训、值守交接与持续优化建议。",
      faq_title: "常见问题",
      faq_subtitle: "购买与部署前的高频疑问，如需定制方案请联系顾问。",
      faq_q1: "是否支持私有化部署？",
      faq_a1: "支持私有化、混合云与信创环境；企业版提供专项架构评审与交付项目经理。",
      faq_q2: "数据主权与加密策略如何配置？",
      faq_a2: "支持租户级密钥托管、字段级脱敏与按角色最小授权；可对接贵司 KMS 与审计平台。",
      faq_q3: "与现有 ERP / 核心系统如何集成？",
      faq_a3: "提供标准 API、消息队列与文件批处理适配器；专业版含集成顾问人天包。",
      faq_q4: "服务级别与响应时间？",
      faq_a4: "基础版工作日工单；专业版含专属群与约定响应时效；企业版可签 SLA 与驻场。",
      page_title: "智警财安 | AI财务风险预警与企业级智能风控平台",
      hero_eyebrow_1: "AI财务风险预警",
      hero_title_1: "智警财安 · AI财务风控专家",
      hero_desc_1: "金融科技级多模态深度学习，实时 · 精准 · 智能 · 定制 — 让财务风险可见、可测、可控。",
      hero_cta_primary: "了解差异化优势",
      hero_cta_secondary: "观看功能演示",
      hero_eyebrow_2: "合规与可追溯",
      hero_title_2: "全链路审计 · 满足监管要求",
      hero_desc_2: "操作留痕、权限分级、报表一键导出，适配多行业合规框架。",
      hero_cta_pricing: "查看套餐",
      hero_cta_consult: "方案咨询",
      hero_eyebrow_3: "稳定与可扩展",
      hero_title_3: "高可用架构 · 弹性扩展",
      hero_desc_3: "多活部署与智能告警，保障关键业务连续性与运维可视。",
      hero_cta_features: "核心能力",
      hero_cta_support: "联系支持",
      pricing_title: "服务定价",
      pricing_subtitle: "按需选择版本；专业版包含完整审计与专属支持，适合中大型企业。",
      price_basic_name: "基础版",
      price_pro_name: "专业版",
      price_ent_name: "企业版",
      price_per_year: "/ 年",
      price_custom: "定制报价",
      price_badge: "推荐",
      price_basic_1: "核心风控与报表",
      price_basic_2: "邮件与工单支持",
      price_basic_3: "标准部署文档",
      price_pro_1: "全量审计与合规模板",
      price_pro_2: "专属客户经理",
      price_pro_3: "高可用部署指导",
      price_ent_1: "私有化 / 混合云",
      price_ent_2: "定制集成与 SLA",
      price_ent_3: "安全驻场与演练",
      price_cta: "联系销售",
      contact_title: "联系我们",
      contact_lead: "留下信息，我们将在 1 个工作日内与您联系（演示为前端模拟流程）。",
      contact_phone_label: "电话",
      contact_email_label: "邮箱",
      contact_addr_label: "地址",
      contact_addr: "中国 · 上海市浦东新区科技大道 88 号",
      form_name: "姓名",
      form_phone: "手机",
      form_email: "邮箱",
      form_message: "需求描述",
      form_submit: "提交咨询",
      form_loading: "提交中…",
      footer_copy: "© 2025 智警财安科技有限公司 版权所有",
      footer_privacy: "隐私政策",
      footer_terms: "服务条款",
      chat_title: "在线客服",
      chat_welcome: "您好，我是智警财安智能客服。请问需要了解产品演示还是报价？",
      chat_input_label: "输入消息",
      chat_placeholder: "输入消息，回车发送",
      chat_send: "发送",
      toast_form_ok: "提交成功，我们会尽快与您联系。",
      toast_form_err: "请检查表单标红项后重试。",
      toast_chart_refresh: "已刷新演示数据。",
      err_name: "请输入 2–64 个字符的姓名。",
      err_phone: "请输入有效的中国大陆手机号。",
      err_email: "请输入有效邮箱地址。",
      err_message: "请填写需求描述（不超过 2000 字）。",
    },
    en: {
      brand: "ZhiJing CaiAn",
      nav_home: "Home",
      nav_features: "Features",
      nav_pricing: "Pricing",
      nav_contact: "Contact",
      nav_insights: "Insights",
      nav_cases: "Cases",
      nav_faq: "FAQ",
      nav_highlights: "Highlights",
      nav_scenarios: "Scenarios",
      nav_demo: "Demo",
      nav_compare: "Compare",
      lang_label: "Language",
      lang_hint: "Site copy updates after switching",
      stats_heading: "Key metrics",
      stat_1_suffix: "+",
      stat_1_label: "Enterprise customers",
      stat_2_label: "Platform availability SLA",
      stat_3_suffix: " ms",
      stat_3_label: "Avg. risk response",
      stat_4_suffix: " items",
      stat_4_label: "Compliance templates",
      stat_ai_acc: "Detection accuracy (RNN+CNN)",
      stat_eff: "Risk ops efficiency ↑",
      stat_cost: "Labor cost ↓",
      stat_reg: "Regulatory coverage",
      stat_reg_suffix: " items",
      ph_kicker: "FinTech · AI financial risk",
      ph_title: "AI financial early warning · Four pillars",
      ph_subtitle:
        "Real-time, precise, intelligent, and tailored—an auditable enterprise financial risk loop.",
      ph_m1_label: "Multimodal model accuracy",
      ph_m1_hint: "RNN+CNN fusion · continuous learning",
      ph_m2_label: "Enterprise & institutional users",
      ph_m2_hint: "SMEs to large groups",
      ph_spark_cap: "Risk index (demo)",
      ph_c1_title: "Multi-dimensional AI control",
      ph_c1_desc: "Cash, tax, supply chain, investment, compliance, and sentiment in one view.",
      ph_c1_metric: "Iteration ≤ 7 days · industry features injectable",
      ph_c2_title: "Real-time alerting",
      ph_c2_desc: "Event-grade routing with on-call playbooks to shrink time-to-triage.",
      ph_c2_us: "h · our avg",
      ph_c2_ind: "h · industry avg",
      ph_c2_metric: "Channels: WeCom / email / SMS / API",
      ph_c3_title: "Tailored programs",
      ph_c3_desc: "Configure models and policies by industry, scale, and scenario.",
      ph_c3_p1: "Industry",
      ph_c3_p2: "Scale",
      ph_c3_p3: "Scenario",
      ph_c3_metric: "Blueprint → configure → integrate → pilot",
      ph_c4_title: "Closed-loop service",
      ph_c4_desc: "Monitor → alert → analyze → respond → review with reusable assets.",
      ph_c4_s1: "Monitor",
      ph_c4_s2: "Alert",
      ph_c4_s3: "Analyze",
      ph_c4_s4: "Respond",
      ph_c4_s5: "Review",
      ph_c4_metric: "Review packs for audit & board decks",
      ph_dim1: "Cash flow",
      ph_dim2: "Tax",
      ph_dim3: "Supply chain",
      ph_dim4: "Investment",
      ph_dim5: "Compliance",
      ph_dim6: "Sentiment",
      features_title: "Enterprise capability matrix",
      features_subtitle:
        "Basics for monitoring & alerts; advanced for sentiment, audit reports, benchmarking, and copilots.",
      feat_f_all: "All",
      feat_f_basic: "Basic",
      feat_f_adv: "Advanced",
      feat_f_ind: "Industry",
      feat_expand: "Expand",
      feat_collapse: "Collapse",
      feat_badge_basic: "Basic",
      feat_badge_adv: "Adv",
      feat_cta_demo: "Request a demo",
      feat1_title: "Real-time data monitoring",
      feat1_desc: "Multi-source ingestion with minute-level sync into a unified risk lake.",
      feat1_metric: "Ingestion P95 ≤ 5 minutes",
      feat1_detail_lead: "Connectors (demo):",
      feat1_mock_hub: "ZhiJing CaiAn",
      feat2_title: "Tiered anomaly alerts",
      feat2_desc: "Yellow / orange / red with escalation and on-call automation.",
      feat2_metric: "35%+ fewer false positives vs rules-only (sample)",
      feat2_detail_lead: "Severity demo:",
      feat2_y: "Yellow",
      feat2_o: "Orange",
      feat2_r: "Red",
      feat2_channels: "WeCom / email / SMS / Webhook",
      feat3_title: "Custom evaluation models",
      feat3_desc: "Train and canary-release models aligned to your risk appetite.",
      feat3_metric: "Typical 4–8 weeks to prod",
      feat3_s1: "Discovery & labeling",
      feat3_s2: "Features & training",
      feat3_s3: "Launch & drift watch",
      feat4_title: "Intelligent response playbooks",
      feat4_desc: "Tie runbooks to approvals and track execution end-to-end.",
      feat4_metric: "Manufacturing case: −42% time-to-close",
      feat4_bef: "Before: 9.6 days avg",
      feat4_aft: "After: 5.5 days avg",
      feat4_note: "* Illustrative, not a guarantee",
      feat5_title: "Financial sentiment",
      feat5_desc: "NLP over news & filings, crossed with internal signals.",
      feat5_metric: "2M+ items/day (cluster)",
      feat5_detail: "Custom lexicons; one-click bridge to alerts.",
      feat6_title: "Compliance audit reports",
      feat6_desc: "Regulator-ready packs with full traceability.",
      feat6_metric: "12+ templates (extensible)",
      feat6_detail: "Modules for corporate finance rules & data security law.",
      feat7_title: "Cross-firm benchmarking",
      feat7_desc: "Peer and cohort benchmarks for key KPIs and risk signals.",
      feat7_metric: "Continuously refreshed cohorts",
      feat7_detail: "Group subsidiaries & anonymized industry indices.",
      feat8_title: "Decision copilot",
      feat8_desc: "Management briefings exportable to PDF/Word.",
      feat8_metric: "Scenarios · sensitivity · risk notes",
      feat8_detail: "Watermarks and audit logs on exports.",
      sc_title: "Industry scenarios",
      sc_subtitle: "Pain → solution → value; swipe on mobile.",
      sc1_name: "SME",
      sc1_pain: "Pain: cash volatility; high compliance cost.",
      sc1_sol: "Solution: lightweight connectors + tax & treasury templates.",
      sc1_gain: "Value: earlier cash stress signals (demo).",
      sc2_name: "Large group",
      sc2_pain: "Pain: siloed subsidiaries; weak group view.",
      sc2_sol: "Solution: legal-entity mapping + group cockpit.",
      sc2_gain: "Value: one risk language for monthly ops reviews.",
      sc3_name: "Financial institution",
      sc3_pain: "Pain: explainability & audit for credit models.",
      sc3_sol: "Solution: regulatory feeds + model cards + real-time alerts.",
      sc3_gain: "Value: smoother exam submissions (demo).",
      demo_title: "Interactive product demo",
      demo_subtitle: "Simulated flow: ingest → monitor → alert → strategy.",
      demo_mode_step: "Step-by-step",
      demo_mode_auto: "Auto play",
      demo_s1: "Ingest",
      demo_s2: "Monitor",
      demo_s3: "Alert",
      demo_s4: "Strategy",
      demo_n1: "Connecting Kingdee / Yonyou / bank APIs (demo)… validation OK.",
      demo_n2: "Monitoring 128 metrics—3 anomalies flagged (demo).",
      demo_n3: "Orange alert pushed to WeCom on-call + email (demo).",
      demo_n4: "Playbook and review outline generated—export PDF (demo).",
      demo_prev: "Back",
      demo_next: "Next",
      demo_pause: "Pause",
      demo_replay: "Replay",
      demo_share: "Copy link",
      demo_download: "Download PDF brief",
      toast_demo_link: "Link copied (simulated).",
      toast_demo_pdf: "Download will start (simulated).",
      demo_done_title: "Request trial",
      demo_done_lead: "Demo complete—leave your details for a trial sandbox (simulated).",
      cmp_title: "Competitive advantages",
      cmp_subtitle: "Benchmark typical market stacks; hide vendor names for internal sharing.",
      cmp_hide: "Hide vendor names (show as Vendor A/B)",
      cmp_col_dim: "Dimension",
      cmp_col_us: "ZhiJing CaiAn",
      cmp_col_a: "Vendor A",
      cmp_col_b: "Vendor B",
      cmp_col_a_full: "CloudRisk Pro",
      cmp_col_b_full: "FinGuard Suite",
      cmp_r1: "AI capability",
      cmp_r1_us: "RNN+CNN multimodal · explainable",
      cmp_r1_a: "Rules + shallow ML",
      cmp_r1_b: "General LLM · weak finance tuning",
      cmp_r2: "Accuracy (sample)",
      cmp_r3: "Alert response",
      cmp_r3_us: "Avg. 0.5 h",
      cmp_r3_a: "~24 h",
      cmp_r3_b: "~12 h",
      cmp_r4: "Coverage",
      cmp_r4_us: "Basic + advanced + industry",
      cmp_r4_a: "Basic-first",
      cmp_r4_b: "Advanced add-on",
      cmp_r5: "Service",
      cmp_r5_us: "24/7 · TAM · custom dev",
      cmp_r5_a: "Business-day tickets",
      cmp_r5_b: "Standard SLA",
      cmp_r6: "TCO",
      cmp_r6_us: "Unified · predictable ops",
      cmp_r6_a: "Many silos",
      cmp_r6_b: "Per-module fees",
      cmp_cta: "Request a tailored benchmark",
      modal_book_title: "Request a demo",
      modal_book_lead: "We will contact you within 1 business day (simulated).",
      modal_trial_title: "Request trial",
      modal_trial_lead: "We will provision a sandbox and expert follow-up (simulated).",
      modal_cmp_title: "Tailored comparison",
      modal_cmp_lead: "Tell us your industry and scale—we will return a benchmark (simulated).",
      modal_company: "Company",
      modal_note: "Notes",
      modal_submit: "Submit",
      toast_modal_ok: "Submitted successfully.",
      trust_title: "Partners & certifications",
      trust_1: "MLPS Level 3",
      trust_2: "ISO 27001",
      trust_3: "Trusted Cloud",
      trust_4: "Gold Alliance",
      trust_5: "ITAI ready",
      insights_title: "Operational insights",
      insights_subtitle:
        "Demo metrics (anonymized) to showcase trends, alert mix, and coverage by domain.",
      insights_refresh: "Refresh demo data",
      insights_hint: "Hover charts to inspect values",
      insights_note: "* Illustrative data for demo purposes only.",
      months_short: "Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec",
      chart_line_title: "Risk detection trend (12 months)",
      chart_doughnut_title: "Alert distribution",
      chart_bar_title: "Compliance coverage by domain",
      chart_badge_trend: "Time series",
      chart_badge_mix: "Mix",
      chart_badge_coverage: "Domains",
      chart_leg_high: "High",
      chart_leg_medium: "Medium",
      chart_leg_low: "Low",
      chart_leg_info: "Info",
      chart_domain_1: "Finance",
      chart_domain_2: "Treasury",
      chart_domain_3: "Data",
      chart_domain_4: "Access",
      cases_title: "Customer stories",
      cases_subtitle: "Representative narratives for illustration (not endorsements).",
      case_1_quote:
        "“Audit packs moved from days to hours—less cross-team friction for compliance.”",
      case_1_org: "Regional bank · Risk & IT",
      case_1_tag: "Compliance",
      case_2_quote: "“Tenant isolation and fine-grained roles matched our governance model.”",
      case_2_org: "Provincial agency · Digital office",
      case_2_tag: "Data security",
      case_3_quote: "“Alert triage and on-call playbooks cut noisy night pages.”",
      case_3_org: "Securities firm · Ops center",
      case_3_tag: "Operations",
      timeline_title: "Delivery milestones",
      timeline_subtitle: "Predictable phases with optional extensions.",
      tl_1_title: "Discovery",
      tl_1_desc: "Map workflows, compliance scope, and integrations; gap analysis.",
      tl_2_title: "Design",
      tl_2_desc: "Architecture, RBAC/ABAC model, SLAs, and acceptance criteria.",
      tl_3_title: "Deploy & integrate",
      tl_3_desc: "Provisioning, migration drills, API/MQ integration, canary.",
      tl_4_title: "Train & go-live",
      tl_4_desc: "Admin training, handover, runbooks, and continuous improvement.",
      faq_title: "FAQ",
      faq_subtitle: "Common questions before purchase; contact us for tailored plans.",
      faq_q1: "Do you support on-premise deployment?",
      faq_a1: "Yes—private cloud, hybrid, and ITAI environments. Enterprise includes TAM and architecture reviews.",
      faq_q2: "How are data sovereignty and encryption configured?",
      faq_a2: "Per-tenant KMS hooks, field masking, least-privilege roles, and optional KMS/audit integrations.",
      faq_q3: "How do we integrate with ERP / core systems?",
      faq_a3: "REST APIs, message queues, and batch adapters. Professional includes integration consulting hours.",
      faq_q4: "What SLAs and response times apply?",
      faq_a4: "Basic: business-day tickets. Pro: dedicated channel and agreed SLAs. Enterprise: custom SLA and residency.",
      page_title: "ZhiJing CaiAn | AI Financial Risk & Enterprise Controls",
      hero_eyebrow_1: "AI financial early warning",
      hero_title_1: "ZhiJing CaiAn · AI financial risk expert",
      hero_desc_1:
        "Multimodal deep learning for finance—real-time, precise, intelligent, and tailored.",
      hero_cta_primary: "See differentiation",
      hero_cta_secondary: "Watch demo",
      hero_eyebrow_2: "Traceable compliance",
      hero_title_2: "End-to-end audit readiness",
      hero_desc_2: "Granular access, immutable trails, and exportable reports aligned with major frameworks.",
      hero_cta_pricing: "View plans",
      hero_cta_consult: "Talk to us",
      hero_eyebrow_3: "Reliability at scale",
      hero_title_3: "Highly available by design",
      hero_desc_3: "Multi-site patterns and smart alerting for continuity and operational visibility.",
      hero_cta_features: "Capabilities",
      hero_cta_support: "Support",
      pricing_title: "Pricing",
      pricing_subtitle:
        "Choose a plan that fits; Professional includes full audit trails and dedicated support.",
      price_basic_name: "Basic",
      price_pro_name: "Professional",
      price_ent_name: "Enterprise",
      price_per_year: "/ yr",
      price_custom: "Custom",
      price_badge: "Popular",
      price_basic_1: "Core risk controls & reports",
      price_basic_2: "Email & ticket support",
      price_basic_3: "Standard deployment guides",
      price_pro_1: "Full audit templates",
      price_pro_2: "Dedicated account manager",
      price_pro_3: "HA deployment guidance",
      price_ent_1: "Private / hybrid cloud",
      price_ent_2: "Custom integrations & SLA",
      price_ent_3: "Security residency & drills",
      price_cta: "Contact sales",
      contact_title: "Contact us",
      contact_lead:
        "Leave your details—we will respond within 1 business day (demo submission is simulated).",
      contact_phone_label: "Phone",
      contact_email_label: "Email",
      contact_addr_label: "Address",
      contact_addr: "88 Tech Avenue, Pudong, Shanghai, China",
      form_name: "Name",
      form_phone: "Mobile",
      form_email: "Email",
      form_message: "Message",
      form_submit: "Submit",
      form_loading: "Sending…",
      footer_copy: "© 2025 ZhiJing CaiAn Technology Co., Ltd.",
      footer_privacy: "Privacy",
      footer_terms: "Terms",
      chat_title: "Live chat",
      chat_welcome: "Hi—need a product demo or a pricing overview?",
      chat_input_label: "Message",
      chat_placeholder: "Type a message and press Enter",
      chat_send: "Send",
      toast_form_ok: "Submitted successfully. We will get back to you soon.",
      toast_form_err: "Please fix the highlighted fields.",
      toast_chart_refresh: "Demo charts refreshed.",
      err_name: "Enter a name between 2 and 64 characters.",
      err_phone: "Enter a valid CN mobile number.",
      err_email: "Enter a valid email address.",
      err_message: "Enter your message (max 2000 characters).",
    },
  };

  const STORAGE_KEY = "zjca_lang";
  const SCROLL_TOP_THRESHOLD = 480;

  /** @returns {keyof typeof TRANSLATIONS} */
  function getStoredLang() {
    try {
      const v = localStorage.getItem(STORAGE_KEY);
      if (v === "en" || v === "zh") return v;
    } catch (_) {
      /* localStorage 不可用时忽略 */
    }
    return "zh";
  }

  /**
   * 安全获取单个元素；缺失时返回 null 并可在控制台追踪（生产环境可改为上报）
   * @param {string} selector
   * @returns {HTMLElement | null}
   */
  function qs(selector) {
    const el = document.querySelector(selector);
    if (!el && typeof console !== "undefined" && console.warn) {
      console.warn("[zhijincaian] Missing element:", selector);
    }
    return /** @type {HTMLElement | null} */ (el);
  }

  /**
   * 防抖：用于输入框实时校验，降低校验频率
   * @template TArgs
   * @param {(...args: TArgs[]) => void} fn
   * @param {number} wait
   * @returns {(...args: TArgs[]) => void}
   */
  function debounce(fn, wait) {
    let t = 0;
    return function debounced(...args) {
      window.clearTimeout(t);
      t = window.setTimeout(() => {
        fn.apply(this, args);
      }, wait);
    };
  }

  /**
   * 显示 Toast（插入 #toast-region，数秒后移除）
   * @param {string} message
   * @param {"info"|"success"|"error"} [type]
   */
  function showToast(message, type) {
    const region = qs("#toast-region");
    if (!region || !message) return;
    const el = document.createElement("div");
    el.className = "toast" + (type === "success" ? " toast--success" : type === "error" ? " toast--error" : "");
    el.textContent = message;
    region.appendChild(el);
    window.setTimeout(() => {
      el.style.opacity = "0";
      el.style.transition = "opacity 240ms ease";
      window.setTimeout(() => el.remove(), 260);
    }, 4200);
  }

  /**
   * 将当前语言应用到所有 [data-i18n] 与 placeholder
   * @param {keyof typeof TRANSLATIONS} lang
   */
  function applyLanguage(lang) {
    const dict = TRANSLATIONS[lang] || TRANSLATIONS.zh;
    document.documentElement.lang = lang === "en" ? "en" : "zh-CN";
    if (dict.page_title) {
      document.title = dict.page_title;
    }

    document.querySelectorAll("[data-i18n]").forEach((node) => {
      const key = node.getAttribute("data-i18n");
      if (key && dict[key]) node.textContent = dict[key];
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach((node) => {
      const key = node.getAttribute("data-i18n-placeholder");
      if (key && dict[key] && "placeholder" in node) {
        /** @type {HTMLInputElement} */ (node).placeholder = dict[key];
      }
    });

    const ds = document.getElementById("demo-state-step");
    const dn = document.getElementById("demo-narration");
    if (ds && dn) {
      const i = parseInt(ds.value || "0", 10);
      const k = "demo_n" + (i + 1);
      if (dict[k]) dn.textContent = dict[k];
    }

    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (_) {}

    document.dispatchEvent(new CustomEvent("zjca-langchange", { detail: { lang } }));
  }

  /**
   * 平滑滚动到锚点（优先原生 scrollIntoView）
   * @param {string} hash 形如 #section
   */
  function scrollToHash(hash) {
    if (!hash || hash === "#") return;
    const id = hash.replace(/^#/, "");
    const target = document.getElementById(id);
    if (!target) return;
    try {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    } catch (_) {
      target.scrollIntoView(true);
    }
  }

  /**
   * 校验单字段；返回错误文案或空字符串
   * @param {string} name
   * @param {string} value
   * @param {keyof typeof TRANSLATIONS} lang
   */
  function validateField(name, value, lang) {
    const d = TRANSLATIONS[lang] || TRANSLATIONS.zh;
    const v = (value || "").trim();
    if (name === "name") {
      if (v.length < 2 || v.length > 64) return d.err_name;
      return "";
    }
    if (name === "phone") {
      if (!/^1[3-9]\d{9}$/.test(v)) return d.err_phone;
      return "";
    }
    if (name === "email") {
      // 实用邮箱正则（RFC 超集简化）
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return d.err_email;
      return "";
    }
    if (name === "message") {
      if (v.length < 1 || v.length > 2000) return d.err_message;
      return "";
    }
    return "";
  }

  /** Chart.js 实例，销毁后需置空避免内存泄漏 */
  const chartRegistry = { line: null, doughnut: null, bar: null };

  function randomIntSeries(len, min, max) {
    const out = [];
    for (let i = 0; i < len; i++) {
      out.push(Math.floor(min + Math.random() * (max - min + 1)));
    }
    return out;
  }

  function destroyCharts() {
    if (typeof Chart === "undefined") return;
    Object.keys(chartRegistry).forEach((k) => {
      const c = chartRegistry[k];
      if (c) {
        try {
          c.destroy();
        } catch (_) {}
        chartRegistry[k] = null;
      }
    });
  }

  /**
   * 创建图表（演示数据）；randomize 为 true 时重新随机序列
   * @param {keyof typeof TRANSLATIONS} lang
   * @param {boolean} randomize
   */
  function createCharts(lang, randomize) {
    if (typeof Chart === "undefined") return;
    const d = TRANSLATIONS[lang] || TRANSLATIONS.zh;
    const lineEl = document.getElementById("chart-line");
    const doughnutEl = document.getElementById("chart-doughnut");
    const barEl = document.getElementById("chart-bar");
    if (!lineEl || !doughnutEl || !barEl) return;

    destroyCharts();

    const monthLabels = (d.months_short || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    const labels12 =
      monthLabels.length >= 12 ? monthLabels.slice(0, 12) : monthLabels;

    const lineDataRaw = randomize
      ? randomIntSeries(12, 85, 230)
      : [118, 126, 121, 142, 158, 152, 168, 179, 171, 188, 201, 195];
    const nLine = Math.min(labels12.length || 12, lineDataRaw.length);
    const lineData = lineDataRaw.slice(0, nLine);
    const lineLabels = labels12.length ? labels12.slice(0, nLine) : lineData.map((_, i) => String(i + 1));
    const doughnutData = randomize ? randomIntSeries(4, 10, 38) : [30, 24, 19, 14];
    const barData = randomize ? randomIntSeries(4, 74, 96) : [89, 93, 87, 91];

    const primary = "#165dff";
    const accent = "#ff7d00";

    Chart.defaults.font.family = '"DM Sans","Noto Sans SC",system-ui,sans-serif';
    Chart.defaults.color = "#4e5969";

    chartRegistry.line = new Chart(lineEl, {
      type: "line",
      data: {
        labels: lineLabels,
        datasets: [
          {
            label: d.chart_line_title,
            data: lineData,
            borderColor: primary,
            backgroundColor: "rgba(22,93,255,0.14)",
            fill: true,
            tension: 0.35,
            pointRadius: 3,
            pointHoverRadius: 5,
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: "index", intersect: false },
        plugins: {
          legend: { display: false },
        },
        scales: {
          x: { grid: { display: false } },
          y: { beginAtZero: true, grid: { color: "rgba(0,0,0,0.06)" } },
        },
      },
    });

    chartRegistry.doughnut = new Chart(doughnutEl, {
      type: "doughnut",
      data: {
        labels: [d.chart_leg_high, d.chart_leg_medium, d.chart_leg_low, d.chart_leg_info],
        datasets: [
          {
            data: doughnutData,
            backgroundColor: [primary, accent, "#4c8dff", "#9eb7ff"],
            hoverOffset: 6,
            borderWidth: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: "bottom", labels: { boxWidth: 12, padding: 12 } },
        },
      },
    });

    chartRegistry.bar = new Chart(barEl, {
      type: "bar",
      data: {
        labels: [d.chart_domain_1, d.chart_domain_2, d.chart_domain_3, d.chart_domain_4],
        datasets: [
          {
            label: d.chart_bar_title,
            data: barData,
            backgroundColor: [primary, "rgba(22,93,255,0.78)", accent, "rgba(255,125,0,0.72)"],
            borderRadius: 8,
            borderSkipped: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: "y",
        plugins: {
          legend: { display: false },
        },
        scales: {
          x: { beginAtZero: true, max: 100, ticks: { callback: (v) => v + "%" }, grid: { color: "rgba(0,0,0,0.06)" } },
          y: { grid: { display: false } },
        },
      },
    });
  }

  /**
   * KPI 数字滚动（进入视口触发一次）
   * @param {AbortSignal} signal
   */
  function initStatsCounter(signal) {
    const observers = [];
    document.querySelectorAll(".stats-strip, .product-highlights").forEach((root) => {
      let played = false;
      const nums = root.querySelectorAll(".stat-num");
      function play() {
        if (played) return;
        played = true;
        nums.forEach((el) => {
          const target = parseFloat(el.getAttribute("data-target") || "0");
          const decimals = parseInt(el.getAttribute("data-decimals") || "0", 10);
          const duration = 1100;
          const start = performance.now();
          function tick(now) {
            const t = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - t, 3);
            const val = target * eased;
            el.textContent = decimals > 0 ? val.toFixed(decimals) : String(Math.round(val));
            if (t < 1) requestAnimationFrame(tick);
          }
          requestAnimationFrame(tick);
        });
      }
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) play();
          });
        },
        { threshold: 0.15 }
      );
      io.observe(root);
      observers.push(io);
    });
    signal.addEventListener(
      "abort",
      () => {
        observers.forEach((o) => o.disconnect());
      },
      { once: true }
    );
  }

  /**
   * 企业级功能扩展：功能筛选 / 展开 / 场景滑动 / 演示播放器 / 对比表 / 弹窗
   * @param {AbortSignal} signal
   * @param {() => keyof typeof TRANSLATIONS} getLang
   * @param {(msg: string, type?: "info"|"success"|"error") => void} toastFn
   */
  function initEnterpriseWorkbench(signal, getLang, toastFn) {
    const grid = document.getElementById("feature-grid-extended");
    const sk = document.getElementById("feature-skeleton");

    if (sk && grid) {
      sk.classList.add("is-visible");
      grid.style.opacity = "0";
      window.setTimeout(() => {
        sk.classList.remove("is-visible");
        grid.style.transition = "opacity 0.45s ease";
        grid.style.opacity = "1";
      }, 520);
    }

    function applyFeatureFilter(filter) {
      if (!grid) return;
      const cards = grid.querySelectorAll(".feature-card-v2");
      if (filter === "all") {
        grid.classList.remove("is-filtered");
        cards.forEach((c) => c.classList.remove("is-visible"));
      } else {
        grid.classList.add("is-filtered");
        cards.forEach((c) => {
          const tier = c.getAttribute("data-tier");
          const ind = c.getAttribute("data-industry");
          let show = false;
          if (filter === "basic") show = tier === "basic";
          else if (filter === "advanced") show = tier === "advanced";
          else if (filter === "industry") show = ind === "true";
          c.classList.toggle("is-visible", show);
        });
      }
    }

    document.querySelectorAll(".feature-toolbar .chip").forEach((chip) => {
      chip.addEventListener(
        "click",
        () => {
          document.querySelectorAll(".feature-toolbar .chip").forEach((c) => c.classList.remove("chip--active"));
          chip.classList.add("chip--active");
          applyFeatureFilter(chip.getAttribute("data-filter") || "all");
        },
        { signal }
      );
    });

    const dict = () => TRANSLATIONS[getLang()] || TRANSLATIONS.zh;

    document.querySelectorAll(".fc-toggle").forEach((btn) => {
      btn.addEventListener(
        "click",
        () => {
          const card = btn.closest(".feature-card-v2");
          const detail = card && card.querySelector(".fc-detail");
          if (!detail) return;
          const open = detail.hidden;
          detail.hidden = !open;
          btn.setAttribute("aria-expanded", open ? "true" : "false");
          btn.textContent = open ? dict().feat_collapse : dict().feat_expand;
        },
        { signal }
      );
    });

    const backdrop = document.getElementById("modal-backdrop");
    const modal = document.getElementById("modal-generic");
    const modalTitle = document.getElementById("modal-title");
    const modalLead = document.getElementById("modal-lead");
    const modalType = document.getElementById("modal-type");
    const modalForm = document.getElementById("modal-form");

    function openModal(kind) {
      if (!backdrop || !modalTitle || !modalLead || !modalType) return;
      const d = dict();
      modalType.value = kind;
      if (kind === "booking") {
        modalTitle.textContent = d.modal_book_title;
        modalLead.textContent = d.modal_book_lead;
      } else if (kind === "trial") {
        modalTitle.textContent = d.modal_trial_title;
        modalLead.textContent = d.modal_trial_lead;
      } else if (kind === "compare") {
        modalTitle.textContent = d.modal_cmp_title;
        modalLead.textContent = d.modal_cmp_lead;
      }
      backdrop.hidden = false;
      modal && modal.focus();
    }

    function closeModal() {
      if (backdrop) backdrop.hidden = true;
    }

    document.getElementById("btn-booking-demo")?.addEventListener("click", () => openModal("booking"), { signal });
    document.getElementById("btn-cmp-custom")?.addEventListener("click", () => openModal("compare"), { signal });
    document.getElementById("modal-close-btn")?.addEventListener("click", closeModal, { signal });
    backdrop?.addEventListener(
      "click",
      (e) => {
        if (e.target === backdrop) closeModal();
      },
      { signal }
    );
    document.addEventListener(
      "keydown",
      (e) => {
        if (e.key === "Escape" && backdrop && !backdrop.hidden) closeModal();
      },
      { signal }
    );

    modalForm?.addEventListener(
      "submit",
      (e) => {
        e.preventDefault();
        toastFn(dict().toast_modal_ok, "success");
        closeModal();
        modalForm.reset();
      },
      { signal }
    );

    /* 场景滑动 */
    const scTrack = document.getElementById("sc-track");
    const scViewport = document.getElementById("sc-viewport");
    const scDots = document.getElementById("sc-dots");
    let scIdx = 0;
    const scSlides = scTrack ? scTrack.querySelectorAll(".sc-slide").length : 0;

    function renderSc() {
      if (!scTrack || !scViewport) return;
      const w = scViewport.clientWidth;
      scTrack.style.transform = "translateX(" + -scIdx * w + "px)";
      scDots?.querySelectorAll(".sc-dot").forEach((d, i) => {
        d.setAttribute("aria-selected", i === scIdx ? "true" : "false");
      });
    }

    if (scDots && scSlides) {
      for (let i = 0; i < scSlides; i++) {
        const b = document.createElement("button");
        b.type = "button";
        b.className = "sc-dot";
        b.setAttribute("role", "tab");
        b.addEventListener(
          "click",
          () => {
            scIdx = i;
            renderSc();
          },
          { signal }
        );
        scDots.appendChild(b);
      }
    }
    let sx = 0;
    scViewport?.addEventListener(
      "touchstart",
      (e) => {
        sx = e.changedTouches[0].screenX;
      },
      { passive: true, signal }
    );
    scViewport?.addEventListener(
      "touchend",
      (e) => {
        const dx = e.changedTouches[0].screenX - sx;
        if (Math.abs(dx) > 50) {
          if (dx < 0) scIdx = Math.min(scSlides - 1, scIdx + 1);
          else scIdx = Math.max(0, scIdx - 1);
          renderSc();
        }
      },
      { signal }
    );
    window.addEventListener("resize", renderSc, { signal });
    renderSc();

    /* 演示播放器 */
    let demoStep = 0;
    let demoAuto = false;
    let demoTimer = 0;
    const demoProgress = document.getElementById("demo-progress");
    const demoNarration = document.getElementById("demo-narration");
    const demoSteps = document.querySelectorAll("#demo-steps .demo-step");

    function setDemoUi() {
      const d = dict();
      const keys = ["demo_n1", "demo_n2", "demo_n3", "demo_n4"];
      if (demoNarration) demoNarration.textContent = d[keys[demoStep]] || "";
      document.getElementById("demo-state-step")?.setAttribute("value", String(demoStep));
      demoSteps.forEach((s, i) => s.classList.toggle("is-active", i === demoStep));
      if (demoProgress) {
        const pct = ((demoStep + 1) / 4) * 100;
        demoProgress.style.width = pct + "%";
        demoProgress.setAttribute("aria-valuenow", String(Math.round(pct)));
      }
    }

    function demoDone() {
      window.clearInterval(demoTimer);
      demoAuto = false;
      openModal("trial");
    }

    function advanceDemo(dir) {
      if (dir > 0 && demoStep === 3) {
        demoDone();
        return;
      }
      demoStep = Math.max(0, Math.min(3, demoStep + dir));
      setDemoUi();
    }

    document.getElementById("demo-next")?.addEventListener("click", () => advanceDemo(1), { signal });
    document.getElementById("demo-prev")?.addEventListener("click", () => advanceDemo(-1), { signal });
    document.getElementById("demo-replay")?.addEventListener(
      "click",
      () => {
        window.clearInterval(demoTimer);
        demoStep = 0;
        demoAuto = false;
        setDemoUi();
      },
      { signal }
    );
    document.getElementById("demo-mode-step")?.addEventListener(
      "click",
      () => {
        window.clearInterval(demoTimer);
        demoAuto = false;
      },
      { signal }
    );
    document.getElementById("demo-mode-auto")?.addEventListener(
      "click",
      () => {
        window.clearInterval(demoTimer);
        demoAuto = true;
        demoStep = 0;
        setDemoUi();
        demoTimer = window.setInterval(() => {
          if (demoStep < 3) {
            demoStep += 1;
            setDemoUi();
          } else {
            demoDone();
          }
        }, 2200);
      },
      { signal }
    );
    document.getElementById("demo-pause")?.addEventListener(
      "click",
      () => {
        window.clearInterval(demoTimer);
        demoAuto = false;
      },
      { signal }
    );
    document.getElementById("demo-share")?.addEventListener(
      "click",
      () => {
        const url = window.location.href.split("#")[0] + "#product-demo";
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(url).catch(() => {});
        }
        toastFn(dict().toast_demo_link, "success");
      },
      { signal }
    );
    document.getElementById("demo-download")?.addEventListener(
      "click",
      (e) => {
        e.preventDefault();
        toastFn(dict().toast_demo_pdf, "info");
      },
      { signal }
    );
    setDemoUi();

    /* 竞品名称显隐 */
    const cmpHide = document.getElementById("cmp-hide-names");
    function refreshCmpNames() {
      const hide = cmpHide?.checked;
      document.querySelectorAll(".cmp-rival").forEach((el) => {
        const id = el.getAttribute("data-rival");
        const d = dict();
        if (hide) {
          el.textContent = id === "a" ? d.cmp_col_a : d.cmp_col_b;
        } else {
          el.textContent = id === "a" ? d.cmp_col_a_full : d.cmp_col_b_full;
        }
      });
    }
    cmpHide?.addEventListener("change", refreshCmpNames, { signal });
    refreshCmpNames();
    document.addEventListener("zjca-langchange", refreshCmpNames, { signal });
  }

  /**
   * FAQ 手风琴：同时仅展开一项
   * @param {AbortSignal} signal
   */
  function initFaqAccordion(signal) {
    const triggers = document.querySelectorAll(".faq-trigger");
    if (!triggers.length) return;
    triggers.forEach((btn) => {
      btn.addEventListener(
        "click",
        () => {
          const wasOpen = btn.getAttribute("aria-expanded") === "true";
          const panel = document.getElementById(btn.getAttribute("aria-controls") || "");
          triggers.forEach((b) => {
            b.setAttribute("aria-expanded", "false");
            const pid = b.getAttribute("aria-controls");
            const p = pid ? document.getElementById(pid) : null;
            if (p) p.hidden = true;
          });
          if (!wasOpen && panel) {
            btn.setAttribute("aria-expanded", "true");
            panel.hidden = false;
          }
        },
        { signal }
      );
    });
  }

  /**
   * 客户案例轮播
   * @param {AbortSignal} signal
   */
  function initCasesCarousel(signal) {
    const cards = Array.from(document.querySelectorAll(".case-card"));
    const dotsWrap = document.getElementById("cases-dots");
    const prev = document.getElementById("cases-prev");
    const next = document.getElementById("cases-next");
    if (!cards.length) return;
    let idx = 0;
    let timer = 0;

    function render() {
      cards.forEach((c, i) => {
        c.classList.toggle("is-active", i === idx);
        c.setAttribute("aria-hidden", i === idx ? "false" : "true");
      });
      if (dotsWrap) {
        dotsWrap.querySelectorAll(".cases-dot").forEach((d, i) => {
          d.setAttribute("aria-selected", i === idx ? "true" : "false");
        });
      }
    }

    function go(delta) {
      idx = (idx + delta + cards.length) % cards.length;
      render();
      resetAuto();
    }

    function resetAuto() {
      window.clearInterval(timer);
      timer = window.setInterval(() => go(1), 6200);
    }

    if (dotsWrap) {
      dotsWrap.innerHTML = "";
      cards.forEach((_, i) => {
        const b = document.createElement("button");
        b.type = "button";
        b.className = "cases-dot";
        b.setAttribute("role", "tab");
        b.setAttribute("aria-label", "Case " + (i + 1));
        b.addEventListener(
          "click",
          () => {
            idx = i;
            render();
            resetAuto();
          },
          { signal }
        );
        dotsWrap.appendChild(b);
      });
    }

    if (prev) prev.addEventListener("click", () => go(-1), { signal });
    if (next) next.addEventListener("click", () => go(1), { signal });
    render();
    resetAuto();
    document.addEventListener(
      "visibilitychange",
      () => {
        if (document.hidden) window.clearInterval(timer);
        else resetAuto();
      },
      { signal }
    );
  }

  /**
   * 绑定所有交互；使用 AbortController 以便将来扩展为单页卸载时统一 removeEventListener
   */
  function init() {
    const ac = new AbortController();
    const { signal } = ac;

    const langSelect = /** @type {HTMLSelectElement | null} */ (document.getElementById("lang-select"));
    let currentLang = getStoredLang();
    /** 图表是否已因滚动进入视口而挂载 */
    let chartsMounted = false;
    if (langSelect) {
      langSelect.value = currentLang;
    }
    applyLanguage(currentLang);

    if (langSelect) {
      langSelect.addEventListener(
        "change",
        () => {
          currentLang = langSelect.value === "en" ? "en" : "zh";
          applyLanguage(currentLang);
          if (chartsMounted) {
            createCharts(currentLang, false);
          }
        },
        { signal }
      );
    }

    /* 导航：平滑滚动 + 移动端关闭菜单 */
    const primaryNav = qs("#primary-nav");
    const navToggle = qs("#nav-toggle");

    function closeMobileNav() {
      if (!primaryNav || !navToggle) return;
      primaryNav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    }

    function toggleMobileNav() {
      if (!primaryNav || !navToggle) return;
      const open = !primaryNav.classList.contains("is-open");
      primaryNav.classList.toggle("is-open", open);
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    }

    if (navToggle && primaryNav) {
      navToggle.addEventListener("click", toggleMobileNav, { signal });
    }

    document.querySelectorAll('.nav-link[href^="#"]').forEach((link) => {
      link.addEventListener(
        "click",
        (e) => {
          const href = link.getAttribute("href");
          if (!href || href === "#") return;
          e.preventDefault();
          scrollToHash(href);
          closeMobileNav();
        },
        { signal }
      );
    });

    document.querySelectorAll('a[href^="#"]:not(.nav-link)').forEach((link) => {
      const href = link.getAttribute("href");
      if (!href || href === "#hero") return;
      link.addEventListener(
        "click",
        (e) => {
          if (href.startsWith("#")) {
            e.preventDefault();
            scrollToHash(href);
          }
        },
        { signal }
      );
    });

    /* 定价区「联系销售」滚动到联系模块 */
    document.querySelectorAll(".contact-scroll").forEach((btn) => {
      btn.addEventListener(
        "click",
        () => {
          scrollToHash("#contact");
          closeMobileNav();
        },
        { signal }
      );
    });

    /* ---------- KPI 数字动画 / FAQ / 案例轮播 ---------- */
    initStatsCounter(signal);
    initFaqAccordion(signal);
    initCasesCarousel(signal);
    initEnterpriseWorkbench(signal, () => currentLang, showToast);

    /* ---------- 数据洞察：进入视口懒加载 Chart.js ---------- */
    const insightsEl = document.getElementById("insights");
    const chartRefreshBtn = document.getElementById("chart-refresh");
    if (insightsEl) {
      const ioCharts = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) {
              createCharts(currentLang, false);
              chartsMounted = true;
              ioCharts.disconnect();
              break;
            }
          }
        },
        { threshold: 0.12, rootMargin: "0px 0px -10% 0px" }
      );
      ioCharts.observe(insightsEl);
      signal.addEventListener("abort", () => ioCharts.disconnect(), { once: true });
    }
    if (chartRefreshBtn) {
      chartRefreshBtn.addEventListener(
        "click",
        () => {
          if (typeof Chart === "undefined") {
            showToast(currentLang === "en" ? "Chart library not loaded." : "图表库未加载。", "error");
            return;
          }
          createCharts(currentLang, true);
          chartsMounted = true;
          const dict = TRANSLATIONS[currentLang] || TRANSLATIONS.zh;
          showToast(dict.toast_chart_refresh, "success");
        },
        { signal }
      );
    }

    /* ---------- 轮播 ---------- */
    const slides = Array.from(document.querySelectorAll(".hero-slide"));
    const dotsWrap = qs("#carousel-dots");
    const btnPrev = qs("#carousel-prev");
    const btnNext = qs("#carousel-next");
    let slideIndex = 0;
    let autoTimer = 0;
    const AUTO_MS = 6500;

    function renderDots() {
      if (!dotsWrap) return;
      dotsWrap.innerHTML = "";
      slides.forEach((_, i) => {
        const b = document.createElement("button");
        b.type = "button";
        b.className = "carousel-dot";
        b.setAttribute("role", "tab");
        b.setAttribute("aria-label", `Slide ${i + 1}`);
        b.setAttribute("aria-selected", i === slideIndex ? "true" : "false");
        b.addEventListener(
          "click",
          () => {
            goToSlide(i, true);
          },
          { signal }
        );
        dotsWrap.appendChild(b);
      });
    }

    function goToSlide(next, userIntent) {
      if (!slides.length) return;
      slideIndex = (next + slides.length) % slides.length;
      slides.forEach((s, i) => {
        const active = i === slideIndex;
        s.classList.toggle("is-active", active);
        s.setAttribute("aria-hidden", active ? "false" : "true");
      });
      if (dotsWrap) {
        const dots = dotsWrap.querySelectorAll(".carousel-dot");
        dots.forEach((d, i) => d.setAttribute("aria-selected", i === slideIndex ? "true" : "false"));
      }
      if (userIntent) resetAuto();
    }

    function nextSlide() {
      goToSlide(slideIndex + 1, false);
    }

    function prevSlide() {
      goToSlide(slideIndex - 1, false);
    }

    function resetAuto() {
      window.clearInterval(autoTimer);
      autoTimer = window.setInterval(nextSlide, AUTO_MS);
    }

    renderDots();
    goToSlide(0, false);
    resetAuto();

    if (btnNext) btnNext.addEventListener("click", () => goToSlide(slideIndex + 1, true), { signal });
    if (btnPrev) btnPrev.addEventListener("click", () => goToSlide(slideIndex - 1, true), { signal });

    /* 页面可见性：隐藏时暂停自动轮播，节省资源 */
    document.addEventListener(
      "visibilitychange",
      () => {
        if (document.hidden) window.clearInterval(autoTimer);
        else resetAuto();
      },
      { signal }
    );

    /* ---------- 回到顶部 ---------- */
    const backBtn = qs("#back-to-top");
    function onScroll() {
      if (!backBtn) return;
      const show = window.scrollY > SCROLL_TOP_THRESHOLD;
      backBtn.hidden = !show;
    }
    window.addEventListener("scroll", onScroll, { passive: true, signal });
    onScroll();
    if (backBtn) {
      backBtn.addEventListener(
        "click",
        () => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        },
        { signal }
      );
    }

    /* ---------- 客服浮窗 ---------- */
    const chatFab = qs("#chat-fab");
    const chatPanel = qs("#chat-panel");
    const chatClose = qs("#chat-close");
    const chatForm = qs("#chat-form");
    const chatInput = /** @type {HTMLInputElement | null} */ (document.getElementById("chat-input"));
    const chatBody = qs("#chat-body");

    function setChatOpen(open) {
      if (!chatFab || !chatPanel) return;
      chatPanel.hidden = !open;
      chatPanel.setAttribute("aria-hidden", open ? "false" : "true");
      chatFab.setAttribute("aria-expanded", open ? "true" : "false");
      if (open && chatInput) {
        window.setTimeout(() => chatInput.focus(), 50);
      }
    }

    if (chatFab) {
      chatFab.addEventListener(
        "click",
        () => {
          const open = chatPanel ? chatPanel.hidden : false;
          setChatOpen(open);
        },
        { signal }
      );
    }
    if (chatClose) {
      chatClose.addEventListener("click", () => setChatOpen(false), { signal });
    }

    /**
     * 简单客服回复（前端模拟）
     * @param {string} text
     */
    function appendUserAndBot(text) {
      if (!chatBody) return;
      const userLine = document.createElement("p");
      userLine.className = "chat-msg chat-msg--user";
      userLine.textContent = text;
      chatBody.appendChild(userLine);

      const botLine = document.createElement("p");
      botLine.className = "chat-msg chat-msg--bot";
      const dict = TRANSLATIONS[currentLang] || TRANSLATIONS.zh;
      botLine.textContent =
        currentLang === "en"
          ? "Thanks! A specialist will follow up shortly. (Demo reply)"
          : "收到，已为您记录需求，稍后将有顾问与您联系。（演示回复）";
      chatBody.appendChild(botLine);
      chatBody.scrollTop = chatBody.scrollHeight;
    }

    if (chatForm && chatInput) {
      chatForm.addEventListener(
        "submit",
        (e) => {
          e.preventDefault();
          const msg = chatInput.value.trim();
          if (!msg) return;
          appendUserAndBot(msg);
          chatInput.value = "";
        },
        { signal }
      );
    }

    /* ---------- 表单 ---------- */
    const form = /** @type {HTMLFormElement | null} */ (document.getElementById("contact-form"));
    const submitBtn = qs("#form-submit");
    const formStatus = qs("#form-status");

    /** @param {string} name @param {string} err */
    function showFieldError(name, err) {
      const row = document.querySelector(`#field-${name}`)?.closest(".form-row");
      const hint = qs(`#error-${name}`);
      if (row) row.classList.toggle("is-invalid", Boolean(err));
      if (hint) hint.textContent = err || "";
    }

    const debouncedValidate = debounce((name, value) => {
      const err = validateField(name, value, currentLang);
      showFieldError(name, err);
    }, 220);

    if (form) {
      ["name", "phone", "email", "message"].forEach((name) => {
        const field = document.getElementById(`field-${name}`);
        if (!field) return;
        field.addEventListener(
          "input",
          () => {
            debouncedValidate(name, "value" in field ? field.value : "");
          },
          { signal }
        );
      });

      form.addEventListener(
        "submit",
        (e) => {
          e.preventDefault();
          const fd = new FormData(form);
          const payload = {
            name: String(fd.get("name") || ""),
            phone: String(fd.get("phone") || ""),
            email: String(fd.get("email") || ""),
            message: String(fd.get("message") || ""),
          };
          const dict = TRANSLATIONS[currentLang] || TRANSLATIONS.zh;

          const errs = {
            name: validateField("name", payload.name, currentLang),
            phone: validateField("phone", payload.phone, currentLang),
            email: validateField("email", payload.email, currentLang),
            message: validateField("message", payload.message, currentLang),
          };

          Object.keys(errs).forEach((k) => showFieldError(k, errs[k]));

          const hasErr = Object.values(errs).some(Boolean);
          if (hasErr) {
            showToast(dict.toast_form_err, "error");
            if (formStatus) formStatus.textContent = dict.toast_form_err;
            return;
          }

          if (submitBtn) {
            submitBtn.classList.add("is-loading");
            submitBtn.setAttribute("disabled", "true");
          }
          if (formStatus) formStatus.textContent = dict.form_loading;

          window.setTimeout(() => {
            try {
              if (submitBtn) {
                submitBtn.classList.remove("is-loading");
                submitBtn.removeAttribute("disabled");
              }
              showToast(dict.toast_form_ok, "success");
              if (formStatus) formStatus.textContent = dict.toast_form_ok;
              form.reset();
              ["name", "phone", "email", "message"].forEach((n) => showFieldError(n, ""));
            } catch (err) {
              console.error("[zhijincaian] submit handler", err);
              showToast(dict.toast_form_err, "error");
            }
          }, 1400);
        },
        { signal }
      );
    }

  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
