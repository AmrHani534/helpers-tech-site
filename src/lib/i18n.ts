export type Locale = "en" | "ar";

export const locales: Locale[] = ["en", "ar"];

export const dictionaries = {
  en: {
    nav: {
      home: "Home",
      about: "About",
      services: "Services",
      projects: "Projects",
      team: "Team",
      faq: "FAQ",
      contact: "Contact",
      getQuote: "Get a Quote",
    },
    hero: {
      eyebrow: "Helpers Technologies · Giza, Egypt",
      cta_primary: "Start a Project",
      cta_secondary: "See Our Work",
      scroll: "Scroll to explore",
    },
    sections: {
      services: "Services",
      servicesHeading: "What we build for ambitious brands",
      differentiators: "Why Helpers",
      differentiatorsHeading: "We build engines, not just showrooms.",
      process: "Our Process",
      processHeading: "A clear, repeatable path from idea to revenue",
      projects: "Featured Work",
      projectsHeading: "Case studies that closed deals",
      testimonials: "Success Stories",
      testimonialsHeading: "Real teams. Real revenue impact.",
      team: "Team",
      teamHeading: "Founders-first. Always.",
      faq: "FAQ",
      faqHeading: "Answers before you ask",
      cta: "Let's build something great together",
      ctaBody:
        "Tell us about your product. We'll reply on WhatsApp within a few hours with a straight-talking plan.",
    },
    common: {
      readCaseStudy: "Read case study",
      viewAllProjects: "View all projects",
      meetTheTeam: "Meet the team",
      seeAllFaqs: "See all FAQs",
      learnMore: "Learn more",
      getInTouch: "Get in touch",
      whatsapp: "WhatsApp us",
      email: "Email us",
    },
    footer: {
      copyright: "© {year} Helpers Technologies. All rights reserved.",
      tagline: "Building digital products that actually sell.",
    },
  },
  ar: {
    nav: {
      home: "الرئيسية",
      about: "من نحن",
      services: "الخدمات",
      projects: "المشاريع",
      team: "الفريق",
      faq: "الأسئلة الشائعة",
      contact: "تواصل معنا",
      getQuote: "اطلب عرض سعر",
    },
    hero: {
      eyebrow: "هيلبرز تكنولوجيز · الجيزة، مصر",
      cta_primary: "ابدأ مشروعك",
      cta_secondary: "استعرض أعمالنا",
      scroll: "اسحب للأسفل",
    },
    sections: {
      services: "الخدمات",
      servicesHeading: "ماذا نبني للعلامات التجارية الطموحة",
      differentiators: "لماذا هيلبرز",
      differentiatorsHeading: "نبني محركات نمو، لا مجرد واجهات.",
      process: "منهجيتنا",
      processHeading: "مسار واضح ومتكرّر من الفكرة إلى الإيراد",
      projects: "أعمال مختارة",
      projectsHeading: "قصص أعمال حقّقت صفقات",
      testimonials: "قصص نجاح",
      testimonialsHeading: "فرق حقيقية. أثر حقيقي على الإيرادات.",
      team: "الفريق",
      teamHeading: "المؤسسون في الخط الأول دائمًا.",
      faq: "الأسئلة الشائعة",
      faqHeading: "إجابات قبل أن تسأل",
      cta: "لنبنِ شيئًا رائعًا معًا",
      ctaBody:
        "أخبرنا عن منتجك، وسنردّ عليك على واتساب خلال ساعات قليلة بخطة واضحة وصريحة.",
    },
    common: {
      readCaseStudy: "اقرأ دراسة الحالة",
      viewAllProjects: "جميع المشاريع",
      meetTheTeam: "تعرّف على الفريق",
      seeAllFaqs: "كل الأسئلة",
      learnMore: "اعرف المزيد",
      getInTouch: "تواصل معنا",
      whatsapp: "راسلنا على واتساب",
      email: "أرسل لنا بريدًا",
    },
    footer: {
      copyright: "© {year} Helpers Technologies. جميع الحقوق محفوظة.",
      tagline: "نصمّم منتجات رقمية تبيع فعلًا.",
    },
  },
} as const;

export type Dict = (typeof dictionaries)["en"];

export function getDict(locale: Locale): Dict {
  const d = dictionaries[locale] ?? dictionaries.en;
  return d as Dict;
}
