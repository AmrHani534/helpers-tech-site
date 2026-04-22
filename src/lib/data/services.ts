import {
  Code2,
  Smartphone,
  Sparkles,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

export type Service = {
  slug: string;
  icon: LucideIcon;
  title: string;
  title_ar: string;
  tagline: string;
  tagline_ar: string;
  description: string;
  description_ar: string;
  deliverables: string[];
  deliverables_ar: string[];
  features: string[];
  features_ar: string[];
  accent: string;
};

export const services: Service[] = [
  {
    slug: "custom-web-development",
    icon: Code2,
    title: "Custom Web Development",
    title_ar: "تطوير مواقع مخصصة",
    tagline: "Blazing-fast websites & web apps",
    tagline_ar: "مواقع وتطبيقات ويب فائقة السرعة",
    description:
      "Production-grade websites and web apps built on Next.js, React, and TypeScript. SEO-optimized, performance-tuned, and engineered to turn visitors into revenue.",
    description_ar:
      "مواقع وتطبيقات ويب احترافية مبنية على Next.js و React و TypeScript، محسّنة لمحركات البحث والأداء ومصمّمة لتحويل الزوار إلى إيرادات.",
    deliverables: [
      "Marketing sites & landing pages",
      "E-commerce platforms",
      "Internal tools & dashboards",
      "Headless CMS integrations",
    ],
    deliverables_ar: [
      "مواقع تسويقية وصفحات هبوط",
      "منصات تجارة إلكترونية",
      "أدوات داخلية ولوحات تحكم",
      "تكامل أنظمة إدارة محتوى Headless",
    ],
    features: [
      "Core Web Vitals-optimized",
      "Accessible by default (WCAG AA)",
      "SEO & analytics built-in",
    ],
    features_ar: [
      "محسّنة لمقاييس Core Web Vitals",
      "وصولية بمعايير WCAG AA افتراضيًا",
      "تحسين محركات بحث وتحليلات مدمجة",
    ],
    accent: "from-brand-500/30 to-transparent",
  },
  {
    slug: "mobile-app-development",
    icon: Smartphone,
    title: "Mobile App Development",
    title_ar: "تطوير تطبيقات الجوال",
    tagline: "iOS & Android, one codebase",
    tagline_ar: "iOS و Android بكود واحد",
    description:
      "Native and cross-platform mobile applications engineered for retention: delightful UX, rock-solid performance, and deep integration with your existing systems.",
    description_ar:
      "تطبيقات جوال أصلية ومتعددة المنصات مصممة للاحتفاظ بالمستخدمين: تجربة مميزة، أداء قوي، وتكامل عميق مع أنظمتك.",
    deliverables: [
      "React Native & Flutter apps",
      "Push notifications & analytics",
      "Payment & auth integrations",
      "App Store & Play Store launch",
    ],
    deliverables_ar: [
      "تطبيقات React Native و Flutter",
      "إشعارات فورية وتحليلات",
      "تكامل الدفع والمصادقة",
      "إطلاق على متجري Apple و Google",
    ],
    features: [
      "Offline-first architecture",
      "Crash & performance monitoring",
      "Release pipeline set up for you",
    ],
    features_ar: [
      "بنية تعمل دون اتصال",
      "مراقبة الأعطال والأداء",
      "خط إصدار جاهز للنشر",
    ],
    accent: "from-accent-500/30 to-transparent",
  },
  {
    slug: "ai-automation",
    icon: Sparkles,
    title: "AI & Automation Systems",
    title_ar: "أنظمة الذكاء الاصطناعي والأتمتة",
    tagline: "Cut manual work. Operate 24/7.",
    tagline_ar: "قلّل العمل اليدوي. اعمل 24/7.",
    description:
      "We bake AI into the core of your product — chatbots, automated workflows, document intelligence, and Gemini/OpenAI integrations that reduce manual labor and scale your team.",
    description_ar:
      "ندمج الذكاء الاصطناعي في صميم منتجك — روبوتات محادثة، تدفقات آلية، واستخراج بيانات ذكي لتقليل العمل اليدوي وتوسيع قدرة فريقك.",
    deliverables: [
      "AI chatbots & assistants",
      "Automated sales & support flows",
      "Custom LLM integrations",
      "Document & data extraction",
    ],
    deliverables_ar: [
      "روبوتات ومساعدات ذكاء اصطناعي",
      "أتمتة المبيعات والدعم",
      "تكامل مخصص مع النماذج اللغوية",
      "استخراج بيانات المستندات",
    ],
    features: [
      "Private data stays private",
      "Measurable hours saved per month",
      "Model-agnostic (Gemini / OpenAI / local)",
    ],
    features_ar: [
      "بياناتك الخاصة تبقى خاصة",
      "ساعات موفَّرة قابلة للقياس شهريًا",
      "يعمل مع أي نموذج (Gemini / OpenAI / محلي)",
    ],
    accent: "from-emerald-400/20 to-transparent",
  },
  {
    slug: "digital-growth",
    icon: TrendingUp,
    title: "Digital Growth Strategy",
    title_ar: "استراتيجية النمو الرقمي",
    tagline: "Find your market. Own it.",
    tagline_ar: "اكتشف سوقك. وهيمن عليه.",
    description:
      "Data-driven marketing, analytics, and brand positioning. We align your product with the audience that pays — then optimize relentlessly for conversion.",
    description_ar:
      "تسويق معتمد على البيانات وتحليلات وتموضع علامة تجارية. نوائم منتجك مع الجمهور الذي يدفع — ثم نحسّن باستمرار لرفع معدلات التحويل.",
    deliverables: [
      "Brand & positioning",
      "Performance marketing setup",
      "Analytics & CRO",
      "SEO & content strategy",
    ],
    deliverables_ar: [
      "هوية العلامة والتموضع",
      "إعداد حملات الأداء",
      "تحليلات وتحسين معدلات التحويل",
      "تحسين محركات البحث واستراتيجية المحتوى",
    ],
    features: [
      "Revenue-focused KPIs",
      "Weekly experimentation cadence",
      "Dashboards you actually read",
    ],
    features_ar: [
      "مؤشرات أداء تركز على الإيرادات",
      "تجارب أسبوعية منتظمة",
      "لوحات بيانات تقرأها فعلًا",
    ],
    accent: "from-amber-400/20 to-transparent",
  },
];
