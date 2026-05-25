export type TimeframeKey = "1D" | "1W" | "1M" | "1Y";
export type MarketKey = "US" | "HK" | "CN";

export const portfolioSummary = {
  owner: "Alex",
  balance: 128420.84,
  dailyChange: 3240.54,
  dailyChangePct: 2.59,
};

export const portfolioPerformance: Record<
  TimeframeKey,
  {
    label: string;
    portfolio: number;
    sp500: number;
    nasdaq: number;
  }[]
> = {
  "1D": [
    { label: "09:30", portfolio: 124100, sp500: 121200, nasdaq: 122300 },
    { label: "10:30", portfolio: 124800, sp500: 121480, nasdaq: 122920 },
    { label: "11:30", portfolio: 125200, sp500: 121900, nasdaq: 123400 },
    { label: "12:30", portfolio: 124980, sp500: 121760, nasdaq: 123150 },
    { label: "13:30", portfolio: 126140, sp500: 122220, nasdaq: 124020 },
    { label: "14:30", portfolio: 127560, sp500: 122900, nasdaq: 125030 },
    { label: "15:30", portfolio: 128420, sp500: 123140, nasdaq: 125480 },
  ],
  "1W": [
    { label: "周一", portfolio: 122800, sp500: 120400, nasdaq: 121800 },
    { label: "周二", portfolio: 123200, sp500: 120980, nasdaq: 122450 },
    { label: "周三", portfolio: 124320, sp500: 121300, nasdaq: 123180 },
    { label: "周四", portfolio: 126080, sp500: 122600, nasdaq: 124490 },
    { label: "周五", portfolio: 128420, sp500: 123140, nasdaq: 125480 },
  ],
  "1M": [
    { label: "第1周", portfolio: 117400, sp500: 116100, nasdaq: 117820 },
    { label: "第2周", portfolio: 119920, sp500: 117520, nasdaq: 118260 },
    { label: "第3周", portfolio: 121880, sp500: 118940, nasdaq: 120440 },
    { label: "第4周", portfolio: 128420, sp500: 123140, nasdaq: 125480 },
  ],
  "1Y": [
    { label: "1月", portfolio: 82100, sp500: 93800, nasdaq: 91240 },
    { label: "3月", portfolio: 91880, sp500: 97200, nasdaq: 95820 },
    { label: "5月", portfolio: 98420, sp500: 100880, nasdaq: 99660 },
    { label: "7月", portfolio: 104320, sp500: 105240, nasdaq: 103480 },
    { label: "9月", portfolio: 112140, sp500: 110920, nasdaq: 108940 },
    { label: "11月", portfolio: 119700, sp500: 116280, nasdaq: 117640 },
    { label: "当前", portfolio: 128420, sp500: 123140, nasdaq: 125480 },
  ],
};

export const hotSectors = [
  {
    name: "AI",
    performance: 5.8,
    summary: "算力芯片需求与云端资本开支仍在同步加速。",
    chart: [42, 48, 47, 53, 59, 61, 64].map((value) => ({ value })),
  },
  {
    name: "半导体",
    performance: 4.1,
    summary: "先进制程产能持续紧张，行业景气度维持高位。",
    chart: [28, 32, 34, 39, 42, 43, 47].map((value) => ({ value })),
  },
  {
    name: "EV",
    performance: 2.6,
    summary: "交付预期重估后，整车与供应链利润压力有所缓解。",
    chart: [18, 21, 19, 24, 26, 27, 29].map((value) => ({ value })),
  },
  {
    name: "能源",
    performance: 1.9,
    summary: "即使油价曲线走弱，板块现金流仍保持稳健。",
    chart: [16, 17, 18, 18, 20, 21, 23].map((value) => ({ value })),
  },
  {
    name: "加密资产",
    performance: 6.7,
    summary: "现货资金回流再次带动高弹性代币与矿企走强。",
    chart: [23, 28, 25, 31, 38, 40, 44].map((value) => ({ value })),
  },
];

export const watchlistStocks = [
  {
    ticker: "TSLA",
    company: "特斯拉",
    price: 212.64,
    change: 3.14,
    priceLabel: "$212.64",
    logo: "TS",
    gradient: "from-sky-500 to-cyan-400",
    sparkline: [188, 192, 189, 196, 202, 208, 212].map((value) => ({ value })),
  },
  {
    ticker: "AAPL",
    company: "苹果",
    price: 198.22,
    change: 1.48,
    priceLabel: "$198.22",
    logo: "AP",
    gradient: "from-blue-500 to-indigo-400",
    sparkline: [178, 181, 183, 186, 190, 194, 198].map((value) => ({ value })),
  },
  {
    ticker: "NVDA",
    company: "英伟达",
    price: 1134.8,
    change: 4.92,
    priceLabel: "$1,134.80",
    logo: "NV",
    gradient: "from-cyan-500 to-sky-400",
    sparkline: [960, 992, 1014, 1040, 1066, 1104, 1134].map((value) => ({ value })),
  },
  {
    ticker: "MSFT",
    company: "微软",
    price: 438.11,
    change: 0.92,
    priceLabel: "$438.11",
    logo: "MS",
    gradient: "from-sky-600 to-blue-400",
    sparkline: [406, 411, 415, 420, 429, 434, 438].map((value) => ({ value })),
  },
  {
    ticker: "AMD",
    company: "超威半导体",
    price: 178.04,
    change: 2.21,
    priceLabel: "$178.04",
    logo: "AM",
    gradient: "from-teal-500 to-cyan-400",
    sparkline: [154, 159, 161, 166, 169, 172, 178].map((value) => ({ value })),
  },
];

export const marketOverview: Record<
  MarketKey,
  {
    indices: {
      name: string;
      value: string;
      change: number;
      breadth: number;
    }[];
    heat: {
      name: string;
      strength: number;
      trend: "强势" | "观望" | "降温";
    }[];
  }
> = {
  US: {
    indices: [
      { name: "S&P 500", value: "5,414.8", change: 0.88, breadth: 76 },
      { name: "Nasdaq", value: "17,920.6", change: 1.26, breadth: 82 },
      { name: "道琼斯", value: "39,668.4", change: 0.42, breadth: 61 },
    ],
    heat: [
      { name: "科技巨头", strength: 84, trend: "强势" },
      { name: "AI 基础设施", strength: 78, trend: "强势" },
      { name: "医疗保健", strength: 52, trend: "观望" },
      { name: "公用事业", strength: 40, trend: "降温" },
    ],
  },
  HK: {
    indices: [
      { name: "恒生指数", value: "18,943.2", change: 0.64, breadth: 67 },
      { name: "恒生科技", value: "3,936.5", change: 1.42, breadth: 74 },
      { name: "国企指数", value: "6,728.9", change: 0.37, breadth: 58 },
    ],
    heat: [
      { name: "平台科技", strength: 73, trend: "强势" },
      { name: "电动车供应链", strength: 61, trend: "观望" },
      { name: "地产", strength: 33, trend: "降温" },
      { name: "生物科技", strength: 56, trend: "观望" },
    ],
  },
  CN: {
    indices: [
      { name: "上证指数", value: "3,179.8", change: 0.22, breadth: 54 },
      { name: "深证成指", value: "10,186.3", change: 0.74, breadth: 64 },
      { name: "科创50", value: "761.4", change: 1.18, breadth: 71 },
    ],
    heat: [
      { name: "AI 软件", strength: 76, trend: "强势" },
      { name: "工业科技", strength: 65, trend: "观望" },
      { name: "新能源", strength: 58, trend: "观望" },
      { name: "消费", strength: 41, trend: "降温" },
    ],
  },
};

export const insightsData = {
  healthScore: 84,
  narrative: "你的投资组合整体保持稳定，当前波动敞口适中，AI 相关成长股仍是主要收益来源。",
  suggestions: [
    "如果英伟达动能跌破趋势线，可考虑降低约 3% 的集中持仓。",
    "未来两周保留部分现金，等待 AI 基础设施方向回调后的加仓机会。",
    "当前防御性资产偏少，可补充一只低 Beta 高股息标的平衡组合。",
  ],
  riskFactors: [
    { label: "集中度", value: 72 },
    { label: "波动率", value: 58 },
    { label: "流动性", value: 86 },
    { label: "回撤缓冲", value: 63 },
  ],
  aiCards: [
    {
      title: "动量雷达",
      body: "半导体龙头仍在持续创出阶段新高，市场广度也保持在健康区间。",
    },
    {
      title: "风险脉冲",
      body: "你的前三大持仓受 AI 宏观情绪影响较强，短期联动性较高，因此风险处于中等水平。",
    },
    {
      title: "机会信号",
      body: "你的账户对能源与公用事业配置仍然偏低，这类资产有望在不明显牺牲收益的前提下降低整体 Beta。",
    },
  ],
};

export const profileData = {
  name: "Alex Morgan",
  role: "产品战略负责人",
  avatarFallback: "AM",
  yearlyReturnTarget: 18,
  connectedMarkets: ["纽交所", "纳斯达克", "港交所", "上交所"],
  settings: [
    { label: "推送通知", description: "即时价格提醒与 AI 快速总结。" },
    { label: "每日简报", description: "开盘前推送晨间市场摘要。" },
    { label: "智能再平衡建议", description: "当风险偏离时主动给出调整建议。" },
  ],
};
