/**
 * projects.config.ts
 *
 * Manual configuration and overrides for projects fetched from GitHub.
 * Allows Michael to:
 * - Pin priority projects to the top
 * - Hide specific repos from the portfolio
 * - Override titles, taglines, categories, and case study details
 * - Map repos to live demo URLs
 */

export interface ProjectOverride {
  repoName: string; // Exact GitHub repo name (e.g., 'agri-value-connect', 'strideOS')
  title?: string;
  tagline?: string;
  category?: "AI & Reasoning" | "Marketplace & Fintech" | "Mobile & Systems" | "Analytics & ML";
  pinned?: boolean; // Pinned repos appear first regardless of complexity score
  pinnedRank?: number; // 1-indexed order for pinned projects
  hidden?: boolean; // Set to true to exclude from portfolio
  liveUrl?: string;
  accentColor?: string;
  gradient?: string;
  problem?: string;
  role?: string;
  stack?: string[];
  built?: string[];
  whatDifferent?: string;
  metrics?: { label: string; value: string }[];
  zone3D?: {
    name: string;
    position: [number, number, number]; // [x, y, z] in 3D Nairobi world
    color: string;
    easterEgg?: string;
  };
}

export const PROJECTS_CONFIG: {
  githubUsername: string;
  revalidateSeconds: number;
  hiddenRepos: string[];
  overrides: Record<string, ProjectOverride>;
} = {
  githubUsername: "Michael-Mokua",
  revalidateSeconds: 3600 * 6, // 6 hours ISR cache
  hiddenRepos: [
    "Michael-Mokua", // Profile README repo
    ".github",
    "mikesth3tic.dev", // Portfolio self repo
  ],
  overrides: {
    "agri-value-connect": {
      repoName: "agri-value-connect",
      title: "Agri Value Connect (MAZAOLOOP)",
      tagline: "Agricultural marketplace connecting Kenyan smallholder farmers directly to commercial buyers and crop-waste processors.",
      category: "Marketplace & Fintech",
      pinned: true,
      pinnedRank: 1,
      liveUrl: "https://agri-value-connect-two.vercel.app",
      accentColor: "text-emerald-400",
      gradient: "from-emerald-500/20 via-amber-500/10 to-transparent",
      problem: "Kenyan smallholder farmers lose significant margins and produce to multi-tier middleman cartels, spoilage during transit, and lack of transparent pricing. Crop waste also goes unmonetized.",
      role: "Founder & Full-Stack Architect (Sole builder across backend, frontend, M-Pesa integration, and LLM matching engine).",
      stack: ["Next.js 14", "TypeScript", "PostgreSQL / Supabase", "M-Pesa Daraja API", "Groq AI (Llama 3)", "Tailwind CSS"],
      built: [
        "Integrated Safaricom Daraja STK Push and C2B payment verification for instant mobile settlements.",
        "Developed an AI byproduct-matching engine pairing crop-waste sellers (bagasse, husks, straw) with industrial recyclers.",
        "Architected low-bandwidth responsive UI and USSD workflow mockups for rural farmers with limited 3G connectivity.",
        "Built role-based dashboards for farmers, bulk aggregators, and logistics transporters with live order dispatch."
      ],
      whatDifferent: "In a future iteration, I would implement offline-first IndexedDB state sync and native SMS notifications so farmers without smartphones receive instant price bid alerts via SMS gateway.",
      metrics: [
        { label: "Built For", value: "KCIC Cleantech Innovation" },
        { label: "Settlement Method", value: "M-Pesa Daraja" },
        { label: "Architecture", value: "Offline-Ready" }
      ],
      zone3D: {
        name: "Shamba Loop (AgriTech Zone)",
        position: [-18, 0, -15],
        color: "#10b981",
        easterEgg: "Soko ya Joska · Fresh mazao directly from the soil."
      }
    },
    "MAZAOLOOP": {
      repoName: "MAZAOLOOP",
      hidden: true // Merged with agri-value-connect
    },
    "AURA-Adaptive-User-Reasoning-Assistant": {
      repoName: "AURA-Adaptive-User-Reasoning-Assistant",
      title: "AURA Intelligence",
      tagline: "Adaptive User Reasoning Architecture — neuro-symbolic hybrid reasoning engine combining deterministic logic with LLM orchestration.",
      category: "AI & Reasoning",
      pinned: true,
      pinnedRank: 2,
      accentColor: "text-amber-400",
      gradient: "from-amber-500/20 via-orange-500/10 to-transparent",
      problem: "Pure LLMs frequently hallucinate and struggle with strict multi-step rule validation, while traditional expert systems lack semantic comprehension. Builders need verifiable reasoning loops.",
      role: "AI Systems Engineer & Architecture Designer.",
      stack: ["Next.js", "TypeScript", "Claude 3.5 Sonnet API", "LangChain", "Framer Motion", "Vector Embeddings"],
      built: [
        "Engineered a dual-stream reasoning pipeline where symbolic constraints gate and validate LLM inference output.",
        "Implemented dynamic memory graphs and stateful execution chains for multi-turn investigative problem-solving.",
        "Designed an interactive visual canvas showing token deliberation paths and confidence scoring in real time.",
        "Constructed custom prompt schemas with structured JSON outputs and automated fallback verification."
      ],
      whatDifferent: "I would introduce local embedding caching via SQLite/WASM in the client to eliminate repeated vector lookups for common reasoning chains and cut API latency by 40%.",
      metrics: [
        { label: "Reasoning Pipeline", value: "Neuro-Symbolic" },
        { label: "LLM Orchestration", value: "LangChain + Claude" },
        { label: "Inference Checks", value: "Deterministic Gate" }
      ],
      zone3D: {
        name: "AURA Neural Tower",
        position: [18, 0, -18],
        color: "#f59e0b",
        easterEgg: "Akili ni Nywele · Neuro-symbolic synthesis node."
      }
    },
    "strideOS": {
      repoName: "strideOS",
      title: "StrideOS",
      tagline: "Native Android GPS route tracker and athletic telemetry engine built with Kotlin and Jetpack Compose.",
      category: "Mobile & Systems",
      pinned: true,
      pinnedRank: 3,
      accentColor: "text-blue-400",
      gradient: "from-blue-500/20 via-cyan-500/10 to-transparent",
      problem: "Mainstream fitness apps consume excessive background battery power, lock historical data behind costly subscriptions, and fail in offline or remote areas with weak cellular coverage.",
      role: "Native Mobile Engineer (Android).",
      stack: ["Kotlin", "Jetpack Compose", "Room Database", "OpenStreetMap OSMDroid", "Kotlin Coroutines", "Android Services"],
      built: [
        "Engineered a high-efficiency Android Foreground Service that records location coordinates with Kalman filter noise reduction.",
        "Rendered vector telemetry routes and elevation profiles completely offline using cached OpenStreetMap tiles.",
        "Implemented local persistence using Room DB following Clean Architecture principles (UseCases, Repositories, ViewModels).",
        "Created dynamic pace, cadence, and split-interval calculations updated on-device every 500ms."
      ],
      whatDifferent: "I would rewrite the path-smoothing algorithm in C++ via the Android NDK to squeeze even more battery efficiency during continuous multi-hour GPS logging.",
      metrics: [
        { label: "Platform", value: "Native Android" },
        { label: "UI Framework", value: "Jetpack Compose" },
        { label: "Map Engine", value: "Offline OSM" }
      ],
      zone3D: {
        name: "StrideOS Track Lab",
        position: [-22, 0, 15],
        color: "#38bdf8",
        easterEgg: "Mboka ya Kasi · Native Android route telemetry."
      }
    },
    "xGAFFER": {
      repoName: "xGAFFER",
      title: "xGAFFER Analytics",
      tagline: "Fantasy Premier League analytics platform with predictive squad optimization and fixture trajectory modeling.",
      category: "Analytics & ML",
      pinned: true,
      pinnedRank: 4,
      accentColor: "text-cyan-400",
      gradient: "from-cyan-500/20 via-blue-500/10 to-transparent",
      problem: "FPL managers make emotional, sub-optimal transfer choices because raw statistics are scattered and don't factor in rolling fixture difficulty, rotation risk, and underlying expected data (xG / xA).",
      role: "Full-Stack Engineer & Algorithm Developer.",
      stack: ["Next.js", "TypeScript", "Zustand", "Official FPL API", "Chart.js / Recharts", "Tailwind CSS"],
      built: [
        "Built live sync pipeline with the official Premier League API to ingest player form, ownership, and price trends.",
        "Developed a custom Transfer Optimizer evaluating squad combinations against rolling 5-week fixture difficulty indices.",
        "Created an interactive bench-planning and captaincy matrix based on expected minutes and historical opposition data.",
        "Engineered lightweight client-side state caching using Zustand for instant player comparisons without reload."
      ],
      whatDifferent: "I would integrate a Monte Carlo simulation engine to project 10,000 gameweek outcomes and provide probabilistic confidence intervals for transfer hits.",
      metrics: [
        { label: "Data Pipeline", value: "Real-time FPL API" },
        { label: "State Layer", value: "Zustand" },
        { label: "Optimization", value: "Fixture Adjusted" }
      ],
      zone3D: {
        name: "xGAFFER Stadium Node",
        position: [20, 0, 16],
        color: "#06b6d4",
        easterEgg: "Triple Captain Activated · Fixture intelligence."
      }
    },
    "ORACLE": {
      repoName: "ORACLE",
      title: "ORACLE: NSE Market Intelligence",
      tagline: "Nairobi Securities Exchange equity intelligence platform extracting market sentiment and synthesizing company filings.",
      category: "AI & Reasoning",
      pinned: true,
      pinnedRank: 5,
      accentColor: "text-orange-400",
      gradient: "from-orange-500/20 via-amber-500/10 to-transparent",
      problem: "East African stock investors lack accessible institutional-grade research tools. NSE filings and disclosures are published in dense PDFs without automated summary or sentiment extraction.",
      role: "Full-Stack Developer & Financial NLP Architect.",
      stack: ["Next.js", "Python", "Claude API", "PostgreSQL", "FastAPI", "Tailwind CSS"],
      built: [
        "Created an automated ingestion pipeline for listed Kenyan equities (Safaricom, Equity Group, KCB, EABL, etc.).",
        "Integrated Claude API with strict extraction templates to parse quarterly financial statements into standardized ratios.",
        "Developed a news & disclosure sentiment classifier gauging market reaction to regulatory and macro-economic shifts.",
        "Designed clean financial visualization dashboards for price-to-earnings, dividend yield, and debt-to-equity histories."
      ],
      whatDifferent: "I would connect live broker APIs and add SMS-based automated stock alert triggers for Kenyan retail investors.",
      metrics: [
        { label: "Market Focus", value: "Nairobi Securities Exchange" },
        { label: "Intelligence Engine", value: "Claude Financial NLP" },
        { label: "Data Parsed", value: "PDFs & Disclosures" }
      ],
      zone3D: {
        name: "ORACLE Exchange Vault",
        position: [0, 0, -25],
        color: "#ea580c",
        easterEgg: "Bourse ya Nairobi · Real-time equity sentiment."
      }
    },
    "REKRUT": {
      repoName: "REKRUT",
      title: "REKRUT: AI Hiring Co-Pilot",
      tagline: "AI talent evaluation pipeline providing structured candidate qualification, skill matrix matching, and anti-bias scoring.",
      category: "AI & Reasoning",
      pinned: true,
      pinnedRank: 6,
      accentColor: "text-purple-400",
      gradient: "from-purple-500/20 via-pink-500/10 to-transparent",
      problem: "Recruiters are overwhelmed with hundreds of unstructured applications per role, leading to arbitrary keyword screening that discards qualified non-traditional candidates.",
      role: "Full-Stack Engineer & AI Integration Lead.",
      stack: ["Next.js", "Anthropic Claude API", "Firebase Firestore & Auth", "TypeScript", "PDF.js"],
      built: [
        "Developed structured resume text extraction using PDF.js and deterministic entity normalization.",
        "Built an objective rubric evaluator matching candidate evidence directly against job competency benchmarks.",
        "Integrated anti-bias anonymization that masks demographic indicators prior to qualitative scoring.",
        "Created interactive hiring manager dashboards with deep-dive rationale for every ranked recommendation."
      ],
      whatDifferent: "I would build an interactive automated technical assessment sandbox to evaluate code submissions alongside CV evaluation.",
      metrics: [
        { label: "Screening Model", value: "Competency Rubrics" },
        { label: "Evaluation", value: "Anonymized Scoring" },
        { label: "Backend", value: "Firebase + Claude" }
      ],
      zone3D: {
        name: "REKRUT Copilot Bay",
        position: [0, 0, 25],
        color: "#c084fc",
        easterEgg: "Radar ya Talanta · Structured competency scoring."
      }
    },
    "CHAPUO": {
      repoName: "CHAPUO",
      title: "CHAPUO AI Studio",
      tagline: "Localized content generation studio powered by custom Sheng and Swahili language intelligence for East African brands.",
      category: "AI & Reasoning",
      zone3D: {
        name: "CHAPUO Sheng Kiosk",
        position: [-30, 0, 0],
        color: "#eab308",
        easterEgg: "Sheng Safi · Street nuance meets generative AI."
      }
    },
    "naipulse-os-naivibe": {
      repoName: "naipulse-os-naivibe",
      title: "NaiPulse OS",
      tagline: "Nairobi urban intelligence platform featuring Sheng microcopy, matatu-inspired Afrofuturist aesthetics, and city insights.",
      category: "Analytics & ML",
      zone3D: {
        name: "NaiPulse Matatu Stage",
        position: [30, 0, 0],
        color: "#f43f5e",
        easterEgg: "Vibe ya Kanairo · Urban intelligence on wheels."
      }
    }
  }
};
