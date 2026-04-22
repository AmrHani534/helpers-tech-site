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
  solution: string;
  results: string[];
  testimonial?: {
    quote: string;
    author: string;
    role: string;
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
    solution:
      "We developed a custom WordPress theme tailored to their brand, tightly integrated with WooCommerce for product management and local payment gateways, plus automated delivery of digital keys on successful checkout.",
    results: [
      "Fully automated digital delivery",
      "Integrated local payment gateways",
      "Easy product management for non-technical team",
      "Mobile-first responsive design",
    ],
    testimonial: {
      quote:
        "The custom theme is exactly what we imagined. Managing products is so easy now, and the platform has completely automated our sales process.",
      author: "Premium Hub Team",
      role: "Management",
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
    solution:
      "We built a custom e-commerce solution with automated order fulfillment, integrated local payment gateways, and a memorable, conversion-focused UI.",
    results: [
      "Distinctive brand identity",
      "Seamless payment integration",
      "Automated digital delivery",
      "Mobile-responsive design",
    ],
    testimonial: {
      quote:
        "They didn't just build a website; they built a sales machine. The ROI was clear within the first month of launching.",
      author: "Flixs Store Management",
      role: "Management",
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
    solution:
      "We designed high-impact marketing creatives and a user-friendly store interface specifically engineered to maximize launch-day conversions.",
    results: [
      "Successful launch campaign",
      "High user engagement",
      "Distinctive brand identity",
      "Conversion-optimized storefront",
    ],
    testimonial: {
      quote:
        "The designs were perfect for our launch. We got so much attention on social media and our conversion rate exceeded expectations.",
      author: "Belal Store Team",
      role: "Management",
    },
    techStack: ["WordPress", "WooCommerce", "Figma", "Tailwind CSS"],
    coverImage: "/images/belal-store.png",
    gallery: [{ url: "/images/belal-store.png", alt: "Belal Store storefront" }],
    featured: true,
    published: true,
    orderIndex: 3,
  },
];
