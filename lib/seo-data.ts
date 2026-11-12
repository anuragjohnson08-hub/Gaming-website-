export interface DashboardViewData {
  id: "overview" | "analytics" | "keywords" | "health" | "settings";
  label: string;
  domain: string;
  dateRange: string;
  organicKeywords: {
    label: string;
    value: string;
    delta: string;
    positive: boolean;
  };
  totalImpressions: {
    label: string;
    value: string;
    delta: string;
    positive: boolean;
  };
  visibilityStat: {
    label: string;
    value: string;
    delta: string;
    positive: boolean;
  };
  trafficStat: {
    label: string;
    value: string;
    delta: string;
    positive: boolean;
  };
  highlightPoint: {
    date: string;
    metricLabel: string;
    metricValue: string;
    x: number;
    y: number;
  };
  splinePath: string;
  areaPath: string;
  topKeywords: {
    term: string;
    rank: number;
    volume: string;
    change: string;
  }[];
}

export const DASHBOARD_VIEWS: Record<DashboardViewData["id"], DashboardViewData> = {
  overview: {
    id: "overview",
    label: "Site Overview",
    domain: "www.website.com",
    dateRange: "Jun 24 -> Today",
    organicKeywords: {
      label: "Organic Keywords",
      value: "10.15k",
      delta: "+24%",
      positive: true,
    },
    totalImpressions: {
      label: "Total Impressions",
      value: "25.8k",
      delta: "+12%",
      positive: true,
    },
    visibilityStat: {
      label: "Visibility",
      value: "10.15%",
      delta: "+5.6%",
      positive: true,
    },
    trafficStat: {
      label: "Traffic",
      value: "59.8K",
      delta: "+10.7%",
      positive: true,
    },
    highlightPoint: {
      date: "Jun 18",
      metricLabel: "Visibility",
      metricValue: "9.8%",
      x: 248,
      y: 66,
    },
    splinePath:
      "M 12 132 C 45 124, 65 92, 98 96 C 132 100, 152 126, 186 88 C 212 60, 232 64, 248 66 C 276 70, 304 42, 340 48 C 368 52, 392 26, 428 22",
    areaPath:
      "M 12 132 C 45 124, 65 92, 98 96 C 132 100, 152 126, 186 88 C 212 60, 232 64, 248 66 C 276 70, 304 42, 340 48 C 368 52, 392 26, 428 22 L 428 164 L 12 164 Z",
    topKeywords: [
      { term: "online payment processing", rank: 1, volume: "14.2k", change: "+3" },
      { term: "secure transactions", rank: 2, volume: "9.8k", change: "+1" },
      { term: "online transaction platform", rank: 3, volume: "8.4k", change: "+4" },
      { term: "online shopping payments", rank: 4, volume: "6.1k", change: "+2" },
      { term: "e-commerce payment gateway", rank: 5, volume: "5.3k", change: "+5" },
      { term: "B2B payment processing", rank: 7, volume: "4.9k", change: "+2" },
    ],
  },
  analytics: {
    id: "analytics",
    label: "Analytics",
    domain: "www.website.com/analytics",
    dateRange: "Last 30 Days",
    organicKeywords: {
      label: "Organic Keywords",
      value: "14.82k",
      delta: "+31%",
      positive: true,
    },
    totalImpressions: {
      label: "Total Impressions",
      value: "41.4k",
      delta: "+19%",
      positive: true,
    },
    visibilityStat: {
      label: "SERP Share",
      value: "18.40%",
      delta: "+8.2%",
      positive: true,
    },
    trafficStat: {
      label: "Organic Sessions",
      value: "68.2K",
      delta: "+14.2%",
      positive: true,
    },
    highlightPoint: {
      date: "Jun 21",
      metricLabel: "SERP Share",
      metricValue: "18.4%",
      x: 290,
      y: 46,
    },
    splinePath:
      "M 12 138 C 50 118, 82 108, 118 86 C 154 64, 184 92, 224 62 C 254 44, 272 48, 290 46 C 326 42, 360 32, 428 18",
    areaPath:
      "M 12 138 C 50 118, 82 108, 118 86 C 154 64, 184 92, 224 62 C 254 44, 272 48, 290 46 C 326 42, 360 32, 428 18 L 428 164 L 12 164 Z",
    topKeywords: [
      { term: "generative seo automation", rank: 1, volume: "18.6k", change: "+6" },
      { term: "ai keyword cluster engine", rank: 1, volume: "11.2k", change: "+4" },
      { term: "serp intent analyzer", rank: 2, volume: "9.4k", change: "+3" },
      { term: "automated meta tags ai", rank: 3, volume: "7.8k", change: "+2" },
      { term: "technical crawl diagnostics", rank: 4, volume: "5.9k", change: "+5" },
      { term: "enterprise backlink audit", rank: 6, volume: "4.3k", change: "+1" },
    ],
  },
  keywords: {
    id: "keywords",
    label: "Keywords",
    domain: "www.website.com/keywords",
    dateRange: "Live Index",
    organicKeywords: {
      label: "Organic Keywords",
      value: "35.6k",
      delta: "+28%",
      positive: true,
    },
    totalImpressions: {
      label: "Total Impressions",
      value: "89.2k",
      delta: "+16%",
      positive: true,
    },
    visibilityStat: {
      label: "Top 3 Rankings",
      value: "1,420",
      delta: "+14.5%",
      positive: true,
    },
    trafficStat: {
      label: "Keyword Clicks",
      value: "64.1K",
      delta: "+11.9%",
      positive: true,
    },
    highlightPoint: {
      date: "Jun 22",
      metricLabel: "Top 3 Terms",
      metricValue: "1,420",
      x: 310,
      y: 42,
    },
    splinePath:
      "M 12 126 C 48 122, 84 98, 126 94 C 166 90, 198 72, 242 58 C 274 48, 292 44, 310 42 C 348 38, 388 28, 428 20",
    areaPath:
      "M 12 126 C 48 122, 84 98, 126 94 C 166 90, 198 72, 242 58 C 274 48, 292 44, 310 42 C 348 38, 388 28, 428 20 L 428 164 L 12 164 Z",
    topKeywords: [
      { term: "ai content optimization", rank: 1, volume: "22.1k", change: "+4" },
      { term: "semantic keyword research", rank: 2, volume: "15.4k", change: "+2" },
      { term: "competitor rank tracker", rank: 2, volume: "12.0k", change: "+5" },
      { term: "llm search visibility", rank: 3, volume: "9.7k", change: "+7" },
      { term: "schema markup generator", rank: 4, volume: "8.2k", change: "+1" },
      { term: "internal link graph seo", rank: 5, volume: "6.5k", change: "+3" },
    ],
  },
  health: {
    id: "health",
    label: "Site Health",
    domain: "www.website.com/health",
    dateRange: "Continuous Crawl",
    organicKeywords: {
      label: "Pages Indexed",
      value: "12.4k",
      delta: "+18%",
      positive: true,
    },
    totalImpressions: {
      label: "Core Web Vitals",
      value: "99.2%",
      delta: "+4.1%",
      positive: true,
    },
    visibilityStat: {
      label: "Site Health",
      value: "98/100",
      delta: "+6 pts",
      positive: true,
    },
    trafficStat: {
      label: "Crawl Throughput",
      value: "48.5K",
      delta: "+22.0%",
      positive: true,
    },
    highlightPoint: {
      date: "Today",
      metricLabel: "Health Score",
      metricValue: "98%",
      x: 340,
      y: 34,
    },
    splinePath:
      "M 12 118 C 60 110, 96 90, 144 78 C 192 66, 224 56, 272 46 C 304 40, 322 36, 340 34 C 372 30, 400 24, 428 22",
    areaPath:
      "M 12 118 C 60 110, 96 90, 144 78 C 192 66, 224 56, 272 46 C 304 40, 322 36, 340 34 C 372 30, 400 24, 428 22 L 428 164 L 12 164 Z",
    topKeywords: [
      { term: "0 broken canonical tags", rank: 1, volume: "Passed", change: "OK" },
      { term: "LCP 0.8s mobile performance", rank: 1, volume: "Passed", change: "OK" },
      { term: "JSON-LD structured schema", rank: 1, volume: "Passed", change: "OK" },
      { term: "XML sitemap auto-synced", rank: 1, volume: "Passed", change: "OK" },
      { term: "Hreflang international tags", rank: 1, volume: "Passed", change: "OK" },
      { term: "Zero redirect chains detected", rank: 1, volume: "Passed", change: "OK" },
    ],
  },
  settings: {
    id: "settings",
    label: "Settings",
    domain: "www.website.com/config",
    dateRange: "API v2.4 Active",
    organicKeywords: {
      label: "Organic Keywords",
      value: "10.15k",
      delta: "+24%",
      positive: true,
    },
    totalImpressions: {
      label: "Total Impressions",
      value: "25.8k",
      delta: "+12%",
      positive: true,
    },
    visibilityStat: {
      label: "AI Automation",
      value: "Active",
      delta: "100%",
      positive: true,
    },
    trafficStat: {
      label: "Webhook Events",
      value: "19.4K",
      delta: "+9.4%",
      positive: true,
    },
    highlightPoint: {
      date: "Live",
      metricLabel: "Index Sync",
      metricValue: "99.9%",
      x: 248,
      y: 52,
    },
    splinePath:
      "M 12 112 C 56 104, 96 84, 148 76 C 190 70, 220 56, 248 52 C 290 46, 348 38, 428 28",
    areaPath:
      "M 12 112 C 56 104, 96 84, 148 76 C 190 70, 220 56, 248 52 C 290 46, 348 38, 428 28 L 428 164 L 12 164 Z",
    topKeywords: [
      { term: "Google Search Console sync", rank: 1, volume: "Connected", change: "Live" },
      { term: "GA4 real-time attribution", rank: 1, volume: "Connected", change: "Live" },
      { term: "Automated meta tag deployment", rank: 1, volume: "Enabled", change: "Live" },
      { term: "Slack weekly rank digest", rank: 1, volume: "Enabled", change: "Live" },
      { term: "Competitor SERP anomaly alerts", rank: 1, volume: "Enabled", change: "Live" },
      { term: "LLM citation monitor (Perplexity)", rank: 1, volume: "Enabled", change: "Live" },
    ],
  },
};

export interface PricingTier {
  id: "starter" | "pro" | "business";
  name: string;
  subtitle: string;
  monthlyPrice: number;
  popular?: boolean;
  features: string[];
  ctaLabel: string;
}

export const PRICING_TIERS: PricingTier[] = [
  {
    id: "starter",
    name: "Starter",
    subtitle: "Essential AI SEO tools for emerging sites and creators.",
    monthlyPrice: 29,
    features: [
      "Keyword optimization (up to 250 terms)",
      "Automated meta tags & schema",
      "Weekly technical SEO monitoring",
      "Monthly executive PDF reports",
    ],
    ctaLabel: "Join waitlist",
  },
  {
    id: "pro",
    name: "Pro",
    subtitle: "Full-scale generative search optimization for growth teams.",
    monthlyPrice: 79,
    popular: true,
    features: [
      "Keyword optimization (2,500+ terms)",
      "Automated meta tags & internal linking",
      "Real-time 24/7 SEO & SERP monitoring",
      "Custom visual performance reports",
      "AI content & readability suggestions",
      "Backlink intelligence & gap analysis",
    ],
    ctaLabel: "Join waitlist",
  },
  {
    id: "business",
    name: "Business",
    subtitle: "Advanced enterprise limits, custom integrations, and SLAs.",
    monthlyPrice: 199,
    features: [
      "Unlimited keyword & cluster tracking",
      "Automated meta tags across multi-domains",
      "Continuous enterprise crawl monitoring",
      "Custom BI & Looker Studio exports",
      "AI content & SERP intent modeling",
      "Backlink toxicity & disavow automation",
      "Multi-user role access & SSO",
      "Dedicated REST API & webhook integration",
    ],
    ctaLabel: "Join waitlist",
  },
];

export function computePlanPrice(monthlyPrice: number, isAnnual: boolean): number {
  if (!isAnnual) return monthlyPrice;
  return Math.round(monthlyPrice * 0.8);
}

export function computeSeoAuditScore(
  domain: string,
  activeFilters: string[]
): {
  score: number;
  visibilityDelta: string;
  keywordCount: string;
  checksPassed: number;
} {
  const clean = domain.trim().toLowerCase();
  const filterBonus = Math.min(4, activeFilters.length);
  if (!clean || clean === "www.website.com" || clean === "rankpulse.ai") {
    const base = 94 + filterBonus;
    return {
      score: Math.min(100, base),
      visibilityDelta: "+5.6%",
      keywordCount: "10.15k",
      checksPassed: Math.min(50, 36 + activeFilters.length * 3),
    };
  }
  let hash = 0;
  for (let i = 0; i < clean.length; i++) {
    hash = (hash * 31 + clean.charCodeAt(i)) % 13;
  }
  const score = Math.min(99, Math.max(86, 87 + hash + Math.floor(filterBonus / 2)));
  return {
    score,
    visibilityDelta: `+${(4.2 + (hash % 6) * 0.7).toFixed(1)}%`,
    keywordCount: `${(8.4 + (hash % 9) * 1.1).toFixed(2)}k`,
    checksPassed: Math.min(50, 34 + (hash % 8) + activeFilters.length * 2),
  };
}

export function validateWaitlistEmail(email: string): {
  valid: boolean;
  error?: string;
} {
  const trimmed = email.trim();
  if (!trimmed) {
    return { valid: false, error: "Please enter your work email address." };
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmed)) {
    return { valid: false, error: "Please enter a valid email (e.g. alex@company.com)." };
  }
  return { valid: true };
}
