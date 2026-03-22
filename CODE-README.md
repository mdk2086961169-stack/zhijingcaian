# 智警财安官网 — 代码说明文档

## 1. 项目结构

| 文件 | 说明 |
|------|------|
| `index.html` | 语义化页面结构、SEO meta、`data-i18n` 文案锚点、`aria-*` 无障碍属性 |
| `style.css` | 设计令牌（`:root` 变量）、布局、响应式、动效与组件样式 |
| `script.js` | 多语言、轮播、导航、表单、Toast、客服浮窗、回到顶部（IIFE 单例） |

## 2. 模块与交互逻辑

### 2.1 多语言（中 / 英）

- **数据**：`TRANSLATIONS.zh` / `TRANSLATIONS.en` 键值对；键名与 DOM 上 `data-i18n` / `data-i18n-placeholder` 对应。
- **流程**：`getStoredLang()` 读取 `localStorage` → 初始化 `#lang-select` → `applyLanguage(lang)` 更新 `document.documentElement.lang`、`document.title`、文本节点与占位符。
- **扩展**：新增文案时同时在中英文字典增加同名 key，并在 HTML 对应节点上加 `data-i18n`。

### 2.2 导航与平滑滚动

- 顶栏锚点链接拦截默认跳转，调用 `scrollIntoView({ behavior: "smooth" })`，并在移动端关闭折叠菜单（`#primary-nav.is-open`）。
- 「联系销售」按钮类名 `contact-scroll`，统一滚动至 `#contact`。

### 2.3 Banner 轮播

- **状态**：`slideIndex` + DOM 上 `.hero-slide.is-active`；非当前屏 `aria-hidden="true"`。
- **自动**：`setInterval` 约 6.5s 切换；`document.visibilitychange` 在页签隐藏时暂停定时器以节省资源。
- **手动**：上一张 / 下一张按钮；圆点 `role="tab"` + `aria-selected`。

### 2.4 表单校验与提交

- **规则**：姓名长度、中国大陆手机 `^1[3-9]\d{9}$`、简化邮箱格式、留言长度。
- **体验**：`input` 使用 `debounce`（约 220ms）触发单字段校验，减少输入时计算次数。
- **提交**：全部通过后按钮 `is-loading` + `disabled`，`setTimeout` 模拟 1.4s 网络请求，成功后 `Toast` + `reset()`；错误时标红行内 `role="alert"`。

### 2.5 Toast

- 向 `#toast-region`（`aria-live="polite"`）追加节点，定时淡出移除；成功 / 失败通过修饰类区分左边框颜色。

### 2.6 在线客服

- 右下角 FAB 切换 `#chat-panel` 的 `hidden` / `aria-hidden` / `aria-expanded`；提交后在 `#chat-body` 追加用户与机器人消息（演示回复）。

### 2.7 回到顶部

- `scroll` 监听（`passive: true`）在 `scrollY > 480` 时显示按钮；点击 `window.scrollTo({ top: 0, behavior: "smooth" })`。

### 2.8 事件与内存

- 使用 `AbortController` 绑定主要监听器，便于将来在单页应用或热替换场景下统一 `abort()`；整页关闭时由浏览器回收，无需额外卸载逻辑。

## 3. CSS 要点

- **变量**：颜色、间距、圆角、阴影、过渡集中在 `:root`，主色 `#165DFF`、辅助色 `#FF7D00`。
- **性能**：卡片与按钮 hover 优先 `transform` / `opacity`；`prefers-reduced-motion` 下缩短动画。
- **响应式**：顶栏 900px 以下汉堡菜单；功能卡片 4→2→1 列；定价 3 列→单列居中。

## 4. 测试建议

1. **布局**：Chrome / Edge / Firefox / Safari 下缩放 320px～1920px，检查顶栏、轮播、定价、表单与浮层无横向滚动条（除聊天消息区纵向滚动）。
2. **导航**：点击各锚点是否平滑滚动；移动端打开菜单后点击链接是否收起并跳转。
3. **轮播**：自动播放、前后按钮、圆点切换；切换浏览器页签后是否暂停自动播放。
4. **语言**：切换中/英后标题、导航、正文、表单标签、Toast、错误文案是否一致。
5. **表单**：故意输错手机/邮箱是否标红；正确提交是否 Loading → Toast → 清空。
6. **无障碍**：仅键盘 Tab 能否走完顶栏、轮播按钮、表单；读屏软件是否播报 Toast（粗略验证）。

## 5. 部署说明

- **本地预览**：在站点目录执行 `npx --yes serve .` 或 VS Code Live Server 打开 `index.html`（部分浏览器对 `file://` 限制较少，仍建议使用本地 HTTP）。
- **免费托管**：可将文件夹推送到 GitHub / Gitee，启用 **GitHub Pages**、**Cloudflare Pages** 或 **Netlify** 静态站点，根目录指向含 `index.html` 的路径即可。
- **自有服务器**：Nginx 配置 `root` 指向构建产物目录，`try_files $uri $uri/ /index.html;`（纯单页无路由时可省略最后一项），开启 `gzip` 与静态资源缓存。

---

*本文档随 `CODE-README.md` 提供，与源码同步维护。*
