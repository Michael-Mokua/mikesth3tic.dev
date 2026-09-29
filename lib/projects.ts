export interface Project {
  slug: string;
  title: string;
  tagline: string;
  category: "AI & Reasoning" | "Marketplace & Fintech" | "Mobile & Systems" | "Analytics & ML";
  featured: boolean; // Top 6 on homepage
  rank: number;
  tags: string[];
  repoUrl: string;
  liveUrl?: string;
  accentColor: string; // Tailwind color class
  gradient: string;
  problem: string;
  role: string;
  stack: string[];
  built: string[];
  whatDifferent: string;
  metrics?: { label: string; value: string }[];
}

export const PROJECTS: Project[] = [
  {
    slug: "agri-value-connect",
    title: "Agri Value Connect (MAZAOLOOP)",
    tagline: "Agricultural marketplace connecting Kenyan smallholder farmers directly to commercial buyers and crop-waste processors.",
    category: "Marketplace & Fintech",
    featured: true,
    rank: 1,
    tags: ["Next.js", "TypeScript", "Supabase", "M-Pesa Daraja", "Groq LLM"],
    repoUrl: "https://github.com/Michael-Mokua/agri-value-connect",
    liveUrl: "https://agri-value-connect-two.vercel.app",
    accentColor: "text-emerald-400",
    gradient: "from-emerald-500/20 via-amber-500/10 to-transparent",
    problem:
      "Kenyan smallholder farmers lose significant margins and produce to multi-tier middleman cartels, spoilage during transit, and lack of transparent pricing. Agricultural byproducts and crop waste also go unmonetized.",
    role: "Founder & Full-Stack Architect (Sole builder across backend, frontend, M-Pesa integration, and LLM matching engine).",
    stack: ["Next.js 14", "TypeScript", "PostgreSQL / Supabase", "M-Pesa Daraja API", "Groq AI (Llama 3)", "Tailwind CSS"],
    built: [
      "Integrated Safaricom Daraja STK Push and C2B payment verification for instant, trust-free mobile settlements.",
      "Developed an AI byproduct-matching engine that pairs crop-waste sellers (bagasse, husks, straw) with industrial recyclers.",
      "Architected low-bandwidth responsive UI and USSD workflow mockups for rural farmers with limited 3G connectivity.",
      "Built role-based dashboards for farmers, bulk aggregators, and logistics transporters with live order dispatch."
    ],
    whatDifferent:
      "In a future iteration, I would implement offline-first IndexedDB state sync and native SMS notifications so farmers without smartphones can receive instant price bid alerts via SMS gateway.",
    metrics: [
      { label: "Built For", value: "KCIC Cleantech Innovation" },
      { label: "Settlement Method", value: "M-Pesa Daraja" },
      { label: "Architecture", value: "Offline-Ready" }
    ]
  },
  {
    slug: "aura-intelligence",
    title: "AURA Intelligence",
    tagline: "Adaptive User Reasoning Architecture — neuro-symbolic hybrid reasoning engine combining deterministic logic with LLM orchestration.",
    category: "AI & Reasoning",
    featured: true,
    rank: 2,
    tags: ["Next.js", "Claude API", "LangChain", "TypeScript", "Python"],
    repoUrl: "https://github.com/Michael-Mokua/AURA-Adaptive-User-Reasoning-Assistant",
    accentColor: "text-amber-400",
    gradient: "from-amber-500/20 via-orange-500/10 to-transparent",
    problem:
      "Pure LLMs frequently hallucinate and struggle with strict multi-step rule validation, while traditional expert systems lack semantic comprehension. Builders need verifiable, explainable reasoning loops.",
    role: "AI Systems Engineer & Architecture Designer.",
    stack: ["Next.js", "TypeScript", "Claude 3.5 Sonnet API", "LangChain", "Framer Motion", "Vector Embeddings"],
    built: [
      "Engineered a dual-stream reasoning pipeline where symbolic constraints gate and validate LLM inference output.",
      "Implemented dynamic memory graphs and stateful execution chains for multi-turn investigative problem-solving.",
      "Designed an interactive visual canvas showing token deliberation paths and confidence scoring in real time.",
      "Constructed custom prompt schemas with structured JSON outputs and automated fallback verification."
    ],
    whatDifferent:
      "I would introduce local embedding caching via SQLite/WASM in the client to eliminate repeated vector lookups for common reasoning chains and cut API latency by 40%.",
    metrics: [
      { label: "Reasoning Pipeline", value: "Neuro-Symbolic" },
      { label: "LLM Orchestration", value: "LangChain + Claude" },
      { label: "Inference Checks", value: "Deterministic Gate" }
    ]
  },
  {
    slug: "strideos",
    title: "StrideOS",
    tagline: "Native Android GPS route tracker and athletic telemetry engine built with Kotlin and Jetpack Compose.",
    category: "Mobile & Systems",
    featured: true,
    rank: 3,
    tags: ["Kotlin", "Jetpack Compose", "OpenStreetMap", "Coroutines", "Clean Arch"],
    repoUrl: "https://github.com/Michael-Mokua/strideOS",
    accentColor: "text-blue-400",
    gradient: "from-blue-500/20 via-cyan-500/10 to-transparent",
    problem:
      "Mainstream fitness apps consume excessive background battery power, lock historical data behind costly subscriptions, and fail in offline or remote areas with weak cellular coverage.",
    role: "Native Mobile Engineer (Android).",
    stack: ["Kotlin", "Jetpack Compose", "Room Database", "OpenStreetMap OSMDroid", "Kotlin Coroutines", "Android Services"],
    built: [
      "Engineered a high-efficiency Android Foreground Service that records location coordinates with Kalman filter noise reduction.",
      "Rendered vector telemetry routes and elevation profiles completely offline using cached OpenStreetMap tiles.",
      "Implemented local persistence using Room DB following Clean Architecture principles (UseCases, Repositories, ViewModels).",
      "Created dynamic pace, cadence, and split-interval calculations updated on-device every 500ms."
    ],
    whatDifferent:
      "I would rewrite the path-smoothing algorithm in C++ via the Android NDK to squeeze even more battery efficiency during continuous multi-hour GPS logging.",
    metrics: [
      { label: "Platform", value: "Native Android" },
      { label: "UI Framework", value: "Jetpack Compose" },
      { label: "Map Engine", value: "Offline OSM" }
    ]
  },
  {
    slug: "xgaffer-analytics",
    title: "xGAFFER Analytics",
    tagline: "Fantasy Premier League analytics platform with predictive squad optimization and fixture trajectory modeling.",
    category: "Analytics & ML",
    featured: true,
    rank: 4,
    tags: ["Next.js", "TypeScript", "Zustand", "FPL API", "Statistical Modeling"],
    repoUrl: "https://github.com/Michael-Mokua/xGAFFER",
    accentColor: "text-cyan-400",
    gradient: "from-cyan-500/20 via-blue-500/10 to-transparent",
    problem:
      "FPL managers make emotional, sub-optimal transfer choices because raw statistics are scattered and don't factor in rolling fixture difficulty, rotation risk, and underlying expected data (xG / xA).",
    role: "Full-Stack Engineer & Algorithm Developer.",
    stack: ["Next.js", "TypeScript", "Zustand", "Official FPL API", "Chart.js / Recharts", "Tailwind CSS"],
    built: [
      "Built live sync pipeline with the official Premier League API to ingest player form, ownership, and price trends.",
      "Developed a custom Transfer Optimizer evaluating squad combinations against rolling 5-week fixture difficulty indices.",
      "Created an interactive bench-planning and captaincy matrix based on expected minutes and historical opposition data.",
      "Engineered lightweight client-side state caching using Zustand for instant player comparisons without reload."
    ],
    whatDifferent:
      "I would integrate a Monte Carlo simulation engine to project 10,000 gameweek outcomes and provide probabilistic confidence intervals for transfer hits.",
    metrics: [
      { label: "Data Pipeline", value: "Real-time FPL API" },
      { label: "State Layer", value: "Zustand" },
      { label: "Optimization", value: "Fixture Adjusted" }
    ]
  },
  {
    slug: "oracle-nse",
    title: "ORACLE: NSE Market Intelligence",
    tagline: "Nairobi Securities Exchange equity intelligence platform extracting market sentiment and synthesizing company filings.",
    category: "AI & Reasoning",
    featured: true,
    rank: 5,
    tags: ["Next.js", "Python", "Claude API", "PostgreSQL", "Financial NLP"],
    repoUrl: "https://github.com/Michael-Mokua/ORACLE",
    accentColor: "text-orange-400",
    gradient: "from-orange-500/20 via-amber-500/10 to-transparent",
    problem:
      "East African stock investors lack accessible institutional-grade research tools. NSE filings, balance sheets, and regulatory disclosures are published in dense PDFs without automated summary or sentiment extraction.",
    role: "Full-Stack Developer & Financial NLP Architect.",
    stack: ["Next.js", "Python", "Claude API", "PostgreSQL", "FastAPI", "Tailwind CSS"],
    built: [
      "Created an automated ingestion pipeline for listed Kenyan equities (Safaricom, Equity Group, KCB, EABL, etc.).",
      "Integrated Claude API with strict extraction templates to parse quarterly financial statements into standardized ratios.",
      "Developed a news & disclosure sentiment classifier gauging market reaction to regulatory and macro-economic shifts.",
      "Designed clean financial visualization dashboards for price-to-earnings, dividend yield, and debt-to-equity histories."
    ],
    whatDifferent:
      "I would connect live broker APIs and add SMS-based automated stock alert triggers for Kenyan retail investors.",
    metrics: [
      { label: "Market Focus", value: "Nairobi Securities Exchange" },
      { label: "Intelligence Engine", value: "Claude Financial NLP" },
      { label: "Data Parsed", value: "PDFs & Disclosures" }
    ]
  },
  {
    slug: "rekrut-ai",
    title: "REKRUT: AI Hiring Co-Pilot",
    tagline: "AI talent evaluation pipeline providing structured candidate qualification, skill matrix matching, and anti-bias scoring.",
    category: "AI & Reasoning",
    featured: true,
    rank: 6,
    tags: ["Next.js", "Anthropic Claude", "Firebase", "TypeScript", "Tailwind CSS"],
    repoUrl: "https://github.com/Michael-Mokua/REKRUT",
    accentColor: "text-purple-400",
    gradient: "from-purple-500/20 via-pink-500/10 to-transparent",
    problem:
      "Recruiters are overwhelmed with hundreds of unstructured applications per role, leading to arbitrary keyword screening that discards qualified non-traditional candidates.",
    role: "Full-Stack Engineer & AI Integration Lead.",
    stack: ["Next.js", "Anthropic Claude API", "Firebase Firestore & Auth", "TypeScript", "PDF.js"],
    built: [
      "Developed structured resume text extraction using PDF.js and deterministic entity normalization.",
      "Built an objective rubric evaluator matching candidate evidence directly against job competency benchmarks.",
      "Integrated anti-bias anonymization that masks demographic indicators prior to qualitative scoring.",
      "Created interactive hiring manager dashboards with deep-dive rationale for every ranked recommendation."
    ],
    whatDifferent:
      "I would build an interactive automated technical assessment sandbox to evaluate code submissions alongside CV evaluation.",
    metrics: [
      { label: "Screening Model", value: "Competency Rubrics" },
      { label: "Evaluation", value: "Anonymized Scoring" },
      { label: "Backend", value: "Firebase + Claude" }
    ]
  },
  {
    slug: "chapuo",
    title: "CHAPUO AI Studio",
    tagline: "Localized content generation studio powered by custom Sheng and Swahili language intelligence for East African brands.",
    category: "AI & Reasoning",
    featured: false,
    rank: 7,
    tags: ["Python", "Next.js", "Claude API", "Sheng Dataset", "NLP"],
    repoUrl: "https://github.com/Michael-Mokua/CHAPUO",
    accentColor: "text-amber-400",
    gradient: "from-amber-500/20 via-emerald-500/10 to-transparent",
    problem:
      "Global AI copy models produce sterile, robotic Swahili that fails to connect with urban African youth and misses cultural Sheng nuances.",
    role: "Creator & NLP Dataset Curator.",
    stack: ["Next.js", "Python", "Claude API", "Custom Sheng/Swahili Lexicon", "PostgreSQL"],
    built: [
      "Curated and structured an ongoing Sheng/Swahili vocabulary dataset capturing urban colloquialisms and slang idioms.",
      "Engineered few-shot prompt injection modules translating brand marketing briefs into culturally resonant youth vernacular.",
      "Built social format adapters generating tailored copy for TikTok, Instagram, X, and WhatsApp broadcasts.",
      "Implemented nuance validation rules avoiding misinterpretations of regional slang variants across Nairobi."
    ],
    whatDifferent:
      "I plan to fine-tune an open-source model (such as Llama 3 / Mistral) directly on the full curated dataset for zero-shot localized generation.",
    metrics: [
      { label: "Dialect Focus", value: "Sheng & Kenyan Swahili" },
      { label: "Target Market", value: "East African Creators" },
      { label: "Dataset", value: "Proprietary Lexicon" }
    ]
  },
  {
    slug: "naipulse-os",
    title: "NaiPulse OS",
    tagline: "Nairobi urban intelligence platform featuring Sheng microcopy, matatu-inspired Afrofuturist aesthetics, and city insights.",
    category: "Analytics & ML",
    featured: false,
    rank: 8,
    tags: ["Next.js", "JavaScript", "Leaflet Maps", "Sheng UI", "Framer Motion"],
    repoUrl: "https://github.com/Michael-Mokua/naipulse-os-naivibe",
    accentColor: "text-rose-400",
    gradient: "from-rose-500/20 via-amber-500/10 to-transparent",
    problem:
      "City discovery apps in Africa mirror Western design paradigms and fail to capture Nairobi's unique street rhythm, transit matatu culture, and local neighborhood pulses.",
    role: "Lead Designer & Frontend Engineer.",
    stack: ["Next.js", "JavaScript", "Leaflet Maps", "Tailwind CSS", "Framer Motion"],
    built: [
      "Designed an authentic Afrofuturist UI blending matatu graffiti aesthetics with precision typography.",
      "Engineered 'Pulse' for real-time neighborhood vibe tracking and 'Truth' for crowdsourced city rumor verification.",
      "Created 'NaiVibe' mood-based music and culture discovery matching Nairobi tempo with local playlist feeds.",
      "Integrated responsive mobile-first map views with custom SVG route styling."
    ],
    whatDifferent:
      "I would integrate real-time crowd-sourced traffic and transit fare reporting via WhatsApp bot input.",
    metrics: [
      { label: "Aesthetic", value: "Matatu Afrofuturism" },
      { label: "Language", value: "Sheng & English" },
      { label: "Focus", value: "Nairobi Urban Intel" }
    ]
  },
  {
    slug: "breast-cancer-ai",
    title: "Breast Cancer AI Diagnostic Detector",
    tagline: "Deep learning computer vision classifier for mammography scan interpretation and tissue anomaly detection.",
    category: "Analytics & ML",
    featured: false,
    rank: 9,
    tags: ["Python", "PyTorch", "FastAPI", "Next.js", "Computer Vision"],
    repoUrl: "https://github.com/Michael-Mokua/breast-cancer-ai-detector",
    accentColor: "text-pink-400",
    gradient: "from-pink-500/20 via-rose-500/10 to-transparent",
    problem:
      "Sub-Saharan Africa faces a severe shortage of specialist radiologists, delaying early detection of oncological anomalies when treatment is most effective.",
    role: "ML Engineer & Full-Stack Interface Developer.",
    stack: ["Python", "PyTorch", "FastAPI", "Next.js", "OpenCV", "Docker"],
    built: [
      "Trained a convolutional neural network (ResNet backbone) on curated mammographic imaging datasets.",
      "Integrated Grad-CAM visual heatmaps highlighting suspicious tissue clusters to assist clinical review.",
      "Built a secure web diagnostic dashboard for image upload, inference execution, and PDF report export.",
      "Implemented strict confidence thresholds to prevent false negatives in ambiguous scans."
    ],
    whatDifferent:
      "I would test quantized on-device inference using ONNX Runtime to enable diagnostic assistance on low-spec hospital laptops without internet.",
    metrics: [
      { label: "Domain", value: "Medical Computer Vision" },
      { label: "Explainability", value: "Grad-CAM Heatmaps" },
      { label: "Stack", value: "PyTorch + FastAPI" }
    ]
  },
  {
    slug: "eats-and-reps",
    title: "EatsAndReps",
    tagline: "Integrated fitness and nutritional tracking platform balancing progressive overload with macronutrient management.",
    category: "Mobile & Systems",
    featured: false,
    rank: 10,
    tags: ["React", "TypeScript", "Node.js", "PostgreSQL", "Tailwind CSS"],
    repoUrl: "https://github.com/Michael-Mokua/EatsAndReps",
    accentColor: "text-green-400",
    gradient: "from-green-500/20 via-emerald-500/10 to-transparent",
    problem:
      "Fitness apps tend to split diet and exercise into two disconnected silos, making it cumbersome to track workout volume alongside daily caloric and macronutrient expenditure.",
    role: "Full-Stack Developer.",
    stack: ["React", "TypeScript", "Node.js", "PostgreSQL", "Tailwind CSS"],
    built: [
      "Built interactive workout logging with 1RM projections and historical volume progression curves.",
      "Engineered flexible macronutrient targets dynamically adjusting based on rest days vs training days.",
      "Implemented clean local caching for fast gym-floor logging without waiting for network requests.",
      "Designed a sleek dark-mode dashboard with weekly trend breakdowns."
    ],
    whatDifferent:
      "I would add barcode scanner camera integration and local offline meal saving.",
    metrics: [
      { label: "Category", value: "Health & Performance" },
      { label: "Architecture", value: "Full-Stack TypeScript" },
      { label: "Tracking", value: "Diet + Progressive Overload" }
    ]
  }
];

export function getFeaturedProjects(): Project[] {
  return PROJECTS.filter((p) => p.featured).sort((a, b) => a.rank - b.rank);
}

export function getAllProjects(): Project[] {
  return [...PROJECTS].sort((a, b) => a.rank - b.rank);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}
