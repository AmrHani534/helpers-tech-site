export type ProjectImage = {
  url: string;
  alt?: string;
};

export type Project = {
  slug: string;
  title: string;
  title_ar?: string;
  category: string;
  industry: string;
  year: string;
  summary: string;
  summary_ar?: string;
  challenge: string;
  challenge_ar?: string;
  solution: string;
  solution_ar?: string;
  results: string[];
  results_ar?: string[];
  testimonial?: {
    quote: string;
    quote_ar?: string;
    author: string;
    author_ar?: string;
    role: string;
    role_ar?: string;
  };
  techStack: string[];
  coverImage: string;
  gallery: ProjectImage[];
  featured: boolean;
  published: boolean;
  orderIndex: number;
  liveUrl?: string;
};

export const projects: Project[] = [
  {
    slug: "premium-hub-store",
    title: "Premium Hub Store",
    title_ar: "متجر بريميوم هَب",
    category: "E-Commerce (WordPress)",
    industry: "Digital Services",
    year: "2024",
    summary:
      "A custom-built WordPress theme for a premium digital-subscriptions marketplace, with a bold dark visual identity and automated order fulfillment.",
    summary_ar:
      "قالب ووردبريس مخصّص لمتجر اشتراكات رقمية مميز، بهوية بصرية جريئة وتسليم آلي للطلبات.",
    challenge:
      "The client needed a flexible, easy-to-manage platform to sell various digital subscriptions with a unique, dark-themed design and automated delivery, while still letting their non-technical team manage products themselves.",
    challenge_ar:
      "احتاج العميل إلى منصة مرنة سهلة الإدارة لبيع اشتراكات رقمية متنوعة، بهوية بصرية داكنة مميزة وتسليم آلي للطلبات، مع تمكين فريقه غير التقني من إدارة المنتجات بنفسه.",
    solution:
      "We developed a custom WordPress theme tailored to their brand, tightly integrated with WooCommerce for product management and local payment gateways, plus automated delivery of digital keys on successful checkout.",
    solution_ar:
      "طوّرنا قالب ووردبريس مخصصًا يعكس هوية العلامة، متكاملًا بإحكام مع WooCommerce لإدارة المنتجات وبوابات الدفع المحلية، مع تسليم آلي لأكواد الاشتراكات فور إتمام الشراء.",
    results: [
      "Fully automated digital delivery",
      "Integrated local payment gateways",
      "Easy product management for non-technical team",
      "Mobile-first responsive design",
    ],
    results_ar: [
      "تسليم رقمي آلي بالكامل",
      "بوابات دفع محلية مدمجة",
      "إدارة منتجات سهلة لفريق غير تقني",
      "تصميم متجاوب يبدأ من الجوال",
    ],
    testimonial: {
      quote:
        "The custom theme is exactly what we imagined. Managing products is so easy now, and the platform has completely automated our sales process.",
      quote_ar:
        "القالب المخصص جاء مطابقًا لما تخيّلناه تمامًا. إدارة المنتجات صارت سهلة جدًا، والمنصة أتمتت عملية البيع بالكامل.",
      author: "Premium Hub Team",
      author_ar: "فريق متجر بريميوم هَب",
      role: "Management",
      role_ar: "فريق الإدارة",
    },
    techStack: ["WordPress", "WooCommerce", "PHP", "Tailwind CSS", "JavaScript"],
    coverImage: "/images/premium-hub.jpg",
    gallery: [{ url: "/images/premium-hub.jpg", alt: "Premium Hub Store homepage" }],
    featured: true,
    published: true,
    orderIndex: 1,
  },
  {
    slug: "flixs-store",
    title: "Flixs Store",
    title_ar: "متجر فليكس",
    category: "E-Commerce (WordPress)",
    industry: "Entertainment",
    year: "2024",
    summary:
      "A digital marketplace for entertainment and software subscriptions with a custom-built WordPress theme and automated fulfillment.",
    summary_ar:
      "سوق رقمي لاشتراكات الترفيه والبرمجيات بقالب ووردبريس مخصّص وتسليم آلي.",
    challenge:
      "The client needed a platform to sell digital subscriptions with automated delivery and secure payment processing — plus a distinctive brand identity.",
    challenge_ar:
      "احتاج العميل إلى منصة لبيع الاشتراكات الرقمية مع تسليم آلي ومعالجة دفع آمنة — إضافة إلى هوية بصرية مميزة.",
    solution:
      "We built a custom e-commerce solution with automated order fulfillment, integrated local payment gateways, and a memorable, conversion-focused UI.",
    solution_ar:
      "بنينا حلًا مخصصًا للتجارة الإلكترونية مع تسليم طلبات آلي وبوابات دفع محلية مدمجة وواجهة استخدام لافتة تركّز على التحويل.",
    results: [
      "Distinctive brand identity",
      "Seamless payment integration",
      "Automated digital delivery",
      "Mobile-responsive design",
    ],
    results_ar: [
      "هوية بصرية مميزة",
      "تكامل دفع سلس",
      "تسليم رقمي آلي",
      "تصميم متجاوب مع الجوال",
    ],
    testimonial: {
      quote:
        "They didn't just build a website; they built a sales machine. The ROI was clear within the first month of launching.",
      quote_ar:
        "لم يكتفوا ببناء موقع؛ بنوا ماكينة مبيعات حقيقية. وضوح العائد على الاستثمار ظهر خلال الشهر الأول من الإطلاق.",
      author: "Flixs Store Management",
      author_ar: "إدارة متجر فليكس",
      role: "Management",
      role_ar: "فريق الإدارة",
    },
    techStack: ["WordPress", "WooCommerce", "PHP", "Tailwind CSS"],
    coverImage: "/images/flixs-store.jpg",
    gallery: [{ url: "/images/flixs-store.jpg", alt: "Flixs Store homepage" }],
    featured: true,
    published: true,
    orderIndex: 2,
  },
  {
    slug: "belal-store",
    title: "Belal Store",
    title_ar: "متجر بلال",
    category: "E-Commerce & Branding",
    industry: "Retail",
    year: "2024",
    summary:
      "High-impact marketing assets and a user-friendly storefront built to drive maximum conversion on launch day.",
    summary_ar:
      "أصول تسويقية ذات تأثير قوي وواجهة متجر سهلة الاستخدام مصممة لتحقيق أقصى تحويل في يوم الإطلاق.",
    challenge:
      "The client required a striking visual identity and a storefront to announce their grand opening and launch-day discounts.",
    challenge_ar:
      "احتاج العميل إلى هوية بصرية لافتة وواجهة متجر تعلن عن افتتاحه الكبير وعروض يوم الإطلاق.",
    solution:
      "We designed high-impact marketing creatives and a user-friendly store interface specifically engineered to maximize launch-day conversions.",
    solution_ar:
      "صمّمنا أصولًا تسويقية عالية التأثير وواجهة متجر سهلة الاستخدام مصممة خصيصًا لتعظيم تحويلات يوم الإطلاق.",
    results: [
      "Successful launch campaign",
      "High user engagement",
      "Distinctive brand identity",
      "Conversion-optimized storefront",
    ],
    results_ar: [
      "حملة إطلاق ناجحة",
      "تفاعل عالٍ من المستخدمين",
      "هوية بصرية مميزة",
      "واجهة متجر محسّنة للتحويل",
    ],
    testimonial: {
      quote:
        "The designs were perfect for our launch. We got so much attention on social media and our conversion rate exceeded expectations.",
      quote_ar:
        "جاءت التصاميم مثالية ليوم الإطلاق، وحصلنا على اهتمام كبير على وسائل التواصل، وتجاوز معدل التحويل توقعاتنا.",
      author: "Belal Store Team",
      author_ar: "فريق متجر بلال",
      role: "Management",
      role_ar: "فريق الإدارة",
    },
    techStack: ["WordPress", "WooCommerce", "Figma", "Tailwind CSS"],
    coverImage: "/images/belal-store.png",
    gallery: [{ url: "/images/belal-store.png", alt: "Belal Store storefront" }],
    featured: true,
    published: true,
    orderIndex: 3,
  },
];
