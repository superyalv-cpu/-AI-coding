AI 股票监控
一个移动端优先的 AI 股票监控演示项目，目标用户
* 上班族 / 无时间盯盘人群
* 具备基础投资经验（A股 / 港股 / 美股）
* 关注收益但不希望高频操作
本项目为 纯前端 Demo，使用 Mock Data 构建，不接入真实股票 API，也不包含后端服务。

项目特点
移动端优先，针对 iPhone 14 Pro 宽度优化
金融科技风格 UI，包含蓝色渐变、玻璃拟态、柔和阴影与圆角设计
固定底部 Tab 导航，包含 5 个核心页面
多条资产表现图表、迷你走势图、AI 洞察卡片、自选股提醒弹窗
使用中文界面文案，更适合作为中文演示项目展示
可本地运行
可部署到 Vercel
页面说明
项目包含以下 5 个核心页面：

首页
市场
自选
洞察
我的
主要功能包括：

资产总览卡片
多基准收益走势图
热门赛道横向卡片
自选股预览与滑动交互
AI 投资建议与风险分析
提醒弹窗与个人设置面板
技术栈
Next.js 15
App Router
TypeScript
Tailwind CSS
shadcn/ui
Framer Motion
Recharts
Lucide Icons
设计说明
本项目 只针对移动端体验做优化
桌面端展示效果是刻意弱化的，不作为主要使用场景
所有股票、行业、组合数据均为模拟数据，仅用于演示 UI 与交互
本地运行
先安装依赖：

npm install
启动开发环境：

npm run dev
默认访问地址：

http://localhost:3000
生产构建
npm run build
如需本地启动生产模式：

npm run start
部署到 Vercel
推荐方式：

将项目上传到 GitHub
登录 Vercel
导入本仓库
保持默认 Next.js 配置
点击 Deploy
部署完成后，Vercel 会自动生成公开访问链接。

项目结构
app/
  (mobile)/
    dashboard/
    market/
    watchlist/
    insights/
    profile/
  globals.css
  layout.tsx
  page.tsx

components/
  charts/
  layout/
  providers/
  screens/
  shared/
  ui/
  watchlist/

hooks/
lib/
mock-data/
关键目录说明
app/：Next.js 路由与页面入口
components/screens/：五个主页面的 UI 组件
components/ui/：通用 UI 基础组件
components/charts/：收益图与迷你图表组件
components/watchlist/：自选股卡片与提醒弹窗
mock-data/：项目使用的全部模拟数据
hooks/：界面状态与挂载相关 Hook
lib/：工具函数
当前实现范围
已完成：

中文化界面
移动端金融风格视觉设计
多页面导航与交互动效
Mock Data 驱动的图表和卡片
Vercel 部署支持
未包含：

真实股票行情接口
登录注册系统
用户数据库
后端服务
实时推送能力

说明
本项目中的市场数据、投资建议、风险评分和行业摘要均为演示用途，不构成任何真实投资建议。
