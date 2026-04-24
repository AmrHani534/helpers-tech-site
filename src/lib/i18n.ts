export type Locale = "en" | "ar";

export const locales: Locale[] = ["en", "ar"];

const en = {
  dir: "ltr" as const,

  a11y: {
    skipToContent: "Skip to content",
    switchLang: "Switch language",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    whatsapp: "Chat on WhatsApp",
    openChat: "Open chat",
    closeChat: "Close chat",
    messageInput: "Message",
    sendMessage: "Send message",
    linkedin: "LinkedIn",
    facebook: "Facebook",
    emailPerson: "Email {name}",
    linkedinPerson: "{name} on LinkedIn",
  },

  nav: {
    home: "Home",
    about: "About",
    services: "Services",
    projects: "Projects",
    team: "Team",
    faq: "FAQ",
    contact: "Contact",
    careers: "Careers",
    privacy: "Privacy Policy",
    terms: "Terms of Service",
    getQuote: "Get a Quote",
  },

  hero: {
    eyebrow: "Helpers Technologies · Giza, Egypt",
    titleA: "We build solutions that",
    titleB: "grow your business",
    description:
      "We combine world-class design, robust engineering, and AI automation to help ambitious brands in Egypt and beyond grow revenue — not just traffic.",
    ctaPrimary: "Start a Project",
    ctaSecondary: "See Our Work",
    scroll: "Scroll to explore",
    stats: [
      { value: "20+", label: "Projects shipped" },
      { value: "95%", label: "Client retention" },
      { value: "3 wks", label: "Avg. launch time" },
      { value: "24/7", label: "AI automations" },
    ],
  },

  trustedBy: {
    aria: "Trusted by",
    caption: "Trusted by ambitious teams in Egypt and beyond",
  },

  sections: {
    services: "Services",
    servicesHeading: "What we build for ambitious brands",
    servicesDescription:
      "Four deep capabilities, fused into one team. No silos, no hand-offs — every engagement pulls from all four.",
    differentiators: "Why Helpers",
    differentiatorsHeading: "We build engines, not just showrooms.",
    differentiatorsDescription:
      "We're not the cheapest. We're the team that treats your business like our own — and refuses to ship features that don't move the needle.",
    process: "Our Process",
    processHeading: "A clear, repeatable path from idea to revenue",
    processDescription:
      "No mystery. No 'creative chaos'. Every engagement runs through the same disciplined four-stage process — tuned for speed and measurable outcomes.",
    projects: "Featured Work",
    projectsHeading: "Case studies that closed deals",
    projectsDescription:
      "Selected case studies. Each one a story of a business we helped turn a digital idea into repeatable revenue.",
    testimonials: "Success Stories",
    testimonialsHeading: "Real teams. Real revenue impact.",
    testimonialsDescription:
      "Straight from the founders and marketing leads who trusted Helpers to ship what matters.",
    team: "Team",
    teamHeading: "Meet our team",
    teamDescription:
      "A tight, senior team. You'll talk to the engineers building your product — not to a filter of account managers.",
    faq: "FAQ",
    faqHeading: "Answers before you ask",
    faqDescription:
      "The questions smart founders ask before signing — and our honest answers.",
    cta: "Let's build something great together",
    ctaBody:
      "Tell us about your product. We'll reply on WhatsApp within a few hours with a straight-talking plan.",
    ctaPrimary: "Start a project",
    ctaWhatsapp: "WhatsApp us",
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
    exploreAllServices: "Explore all services",
  },

  process: {
    stepLabel: "Step {n} of {total}",
  },

  about: {
    eyebrow: "About Helpers Technologies",
    titleA: "We build engines,",
    titleB: "not just showrooms.",
    missionEyebrow: "Mission",
    missionHeading: "What we do",
    visionEyebrow: "Vision",
    visionHeading: "Where we're going",
    valuesEyebrow: "Our values",
    valuesHeading: "Principles we actually live by.",
  },

  services: {
    eyebrow: "Services",
    titleA: "Every capability you need to ship",
    titleHighlight: "revenue-ready",
    titleC: "products.",
    description:
      "Four deeply-practiced capabilities, fused into one team. Choose one, or stack them for an end-to-end growth engine.",
    discussProject: "Discuss a {service} project",
  },

  projects: {
    eyebrow: "Case studies",
    titleA: "Work that",
    titleHighlight: "shipped revenue",
    titleC: ".",
    description:
      "Every project on this page launched, got real users, and moved a real business metric. No vanity work.",
    readCaseStudy: "Read case study",
    allProjects: "All projects",
    visitLiveSite: "Visit live site",
    moreCaseStudies: "More case studies",
    challenge: "Challenge",
    solution: "Solution",
    techStack: "Tech stack",
    results: "Results",
    categories: {
      "E-Commerce (WordPress)": "E-Commerce (WordPress)",
      "E-Commerce & Branding": "E-Commerce & Branding",
    } as Record<string, string>,
    industries: {
      "Digital Services": "Digital Services",
      Entertainment: "Entertainment",
      Retail: "Retail",
    } as Record<string, string>,
  },

  team: {
    eyebrow: "The team",
    titleA: "Senior, founders-first,",
    titleHighlight: "and in your corner.",
    description:
      "A tight group of engineers and designers. You'll talk to the people actually building your product — no filters, no handoffs.",
    comingSoon: "Coming soon",
    profileComingSoon: "Profile coming soon",
    joinHeading: "Want to join the team?",
    joinBody:
      "We're always open to meeting product-minded engineers and designers. Send us your CV and a short note — we read everything.",
    applyNow: "Apply now",
  },

  faq: {
    eyebrow: "Frequently asked",
    titleA: "Answers",
    titleHighlight: "before you ask",
    titleC: ".",
    description: "Pricing, timelines, ownership — written plainly, no fluff.",
    categories: {
      Pricing: "Pricing",
      Timeline: "Timeline",
      Ownership: "Ownership",
      Capabilities: "Capabilities",
      Support: "Support",
      General: "General",
    } as Record<string, string>,
  },

  contact: {
    eyebrow: "Contact",
    titleA: "Let's build something",
    titleHighlight: "great together.",
    description:
      "Fill in the form and we'll reply with honest next steps — usually within a few hours. Or WhatsApp us directly for the fastest response.",
    reachHeading: "Reach out",
    reachBody: "We reply fast. Pick whichever is easiest for you.",
    emailLabel: "Email",
    whatsappLabel: "WhatsApp",
    locationLabel: "Location",
    location: "Giza, Egypt",
    fastestHeading: "Fastest reply",
    fastestBody:
      "Need an answer today? WhatsApp is the quickest way to get one of the founders in a conversation.",
    chatOnWhatsapp: "Chat on WhatsApp",
  },

  contactForm: {
    heading: "Tell us about your project",
    required: "* required",
    selectPlaceholder: "Select…",
    successHeading: "Message received.",
    successBody:
      "Thanks for reaching out. One of the founders will get back to you shortly — usually within a few hours during business hours.",
    sendAnother: "Send another message",
    fields: {
      name: "Your name *",
      email: "Email *",
      whatsapp: "WhatsApp / Phone",
      company: "Company",
      projectType: "Project type *",
      budget: "Budget",
      timeline: "Timeline",
      message: "What are you trying to build? *",
    },
    placeholders: {
      name: "Jane Doe",
      email: "you@company.com",
      whatsapp: "+20 111 844 5625",
      company: "Acme Inc.",
      message:
        "Goals, audience, known constraints, links to anything relevant…",
    },
    options: {
      projectTypes: [
        "New Website / Redesign",
        "E-Commerce Store",
        "Mobile App (iOS/Android)",
        "AI & Automation",
        "Digital Marketing / Branding",
        "Other / Custom Project",
      ],
      budgets: [
        "Under $500 (Launch Pack)",
        "$500 – $2,000",
        "$2,000 – $5,000",
        "$5,000 – $15,000",
        "$15,000+",
        "Flexible / Researching",
      ],
      timelines: ["ASAP (Next 2 weeks)", "Within 1 month", "1–3 months", "Flexible"],
    },
    replyNote: "We reply within a few hours on business days.",
    cta: "Send message",
    sending: "Sending…",
    errorGeneric: "Something went wrong. Please try again.",
    errorNetwork: "Network error. Please try again.",
  },

  careers: {
    eyebrow: "Careers",
    titleA: "Build products that",
    titleHighlight: "actually ship.",
    description:
      "We hire senior, product-minded people who like moving fast without cutting corners. If that's you, we'd love to hear from you.",
    perks: [
      {
        title: "Real ownership",
        description:
          "Ship product decisions, not tickets. You own the outcome, start to finish.",
      },
      {
        title: "Senior-only pod",
        description:
          "Work alongside engineers and designers who actually ship — no juniors to babysit, no filters.",
      },
      {
        title: "Remote-friendly",
        description:
          "Based in Giza; we work hybrid. Flexible hours, async-first communication.",
      },
      {
        title: "Humans, not resources",
        description:
          "No bureaucracy. Clear expectations, honest feedback, and room to grow fast.",
      },
    ],
  },

  careerForm: {
    heading: "Apply to join the team",
    required: "* required",
    selectPlaceholder: "Select…",
    successHeading: "Application received.",
    successBody:
      "Thanks for applying. We read every application ourselves — if there's a fit, you'll hear back within a week.",
    submitAnother: "Submit another",
    fields: {
      fullName: "Full name *",
      email: "Email *",
      phone: "Phone / WhatsApp",
      location: "Location",
      role: "Role applying for *",
      experienceYears: "Years of experience",
      linkedin: "LinkedIn",
      portfolio: "Portfolio / GitHub",
      coverLetter: "Cover letter / message *",
    },
    placeholders: {
      fullName: "Jane Doe",
      email: "you@example.com",
      phone: "+20 111 844 5625",
      location: "Cairo, Egypt",
      linkedin: "https://linkedin.com/in/…",
      portfolio: "https://github.com/…",
      coverLetter:
        "Why do you want to join Helpers Technologies? Link to a project you're proud of.",
    },
    options: {
      roles: [
        "Frontend Engineer",
        "Backend Engineer",
        "Full-Stack Engineer",
        "Mobile Engineer",
        "Product Designer",
        "AI / ML Engineer",
        "Growth / Marketing",
        "Project Manager",
        "Internship",
        "Other",
      ],
      experience: [
        "Student / Internship",
        "0–1 years",
        "1–3 years",
        "3–5 years",
        "5–8 years",
        "8+ years",
      ],
    },
    cv: {
      label: "CV / Résumé (PDF, DOC, DOCX — max 6 MB)",
      click: "Click to upload your CV",
      optional: "Optional",
    },
    replyNote: "We read every application. Expect a reply within a week.",
    cta: "Submit application",
    sending: "Sending…",
    errorGeneric: "Something went wrong. Please try again.",
    errorNetwork: "Network error. Please try again.",
  },

  footer: {
    copyright: "© {year} Helpers Technologies. All rights reserved.",
    tagline: "We build solutions that grow your business.",
    explore: "Explore",
    servicesTitle: "Services",
    legalTitle: "Legal",
    servicesLinks: [
      "Custom Web Development",
      "Mobile Apps",
      "AI & Automation",
      "Digital Growth",
    ],
    crafted: "Crafted in Giza · Shipped worldwide.",
  },

  legal: {
    legalEyebrow: "Legal",
    privacyTitle: "Privacy Policy",
    termsTitle: "Terms of Service",
    updated: "Last updated: {date}",
    lastUpdatedDate: "January 2025",
    privacy: {
      intro:
        "This Privacy Policy describes how Helpers Technologies (\"we\", \"us\", \"our\") collects, uses, and shares information when you interact with our website and services.",
      infoHeading: "Information we collect",
      infoBody:
        "We collect the information you give us directly — for example when you submit a contact form — and basic technical data such as your browser, device, and pages visited. We use this to reply to your inquiry and to improve the site.",
      useHeading: "How we use your information",
      useItems: [
        "To respond to your inquiries and send project proposals.",
        "To operate, maintain, and improve our website.",
        "To communicate with you about our services (only if you opt in).",
      ],
      storageHeading: "Data storage",
      storageBody:
        "Contact submissions are stored securely in our database. We never sell or rent your data to third parties. You can request deletion of your data at any time by emailing us.",
      contactHeading: "Contact",
      contactBody: "Questions about this policy? Email us at",
    },
    terms: {
      intro:
        "By accessing this website you agree to these Terms of Service. If you do not agree, please do not use the site.",
      useHeading: "Use of the site",
      useBody:
        "The content on this website is provided for general information. You may not copy, reproduce, or republish our content without our written permission.",
      engagementsHeading: "Engagements & ownership",
      engagementsBody:
        "All engagements begin with a signed scope document. Upon final payment, you own 100% of the code, designs, and assets we produce for you — no vendor lock-in, no hidden licenses.",
      liabilityHeading: "Limitation of liability",
      liabilityBody:
        "The website is provided \"as is\". We are not liable for any damages arising from use of the site or reliance on its content.",
      lawHeading: "Governing law",
      lawBody: "This agreement is governed by the laws of the Arab Republic of Egypt.",
      contactHeading: "Contact",
      contactBody: "Questions about these terms? Email us at",
    },
  },

  notFound: {
    eyebrow: "404",
    heading: "This page took a different path.",
    body:
      "The link might be outdated, or the project was unpublished. Let's get you back to something real.",
    backHome: "Back home",
    seeProjects: "See our projects",
  },

  errorPage: {
    eyebrow: "Something broke",
    heading: "We're sorry for the inconvenience.",
    body:
      "Try refreshing. If this keeps happening, reach us on WhatsApp — we'll fix it immediately.",
    tryAgain: "Try again",
    backHome: "Back home",
  },

  whatsapp: {
    label: "WhatsApp",
  },

  chat: {
    openLabel: "Chat with AI",
    title: "HelperBot",
    status: "AI Assistant · Online",
    greeting:
      "Hi! I'm HelperBot. Ask me anything about our services, team, or how we can help your business grow.",
    placeholder: "Ask about our services…",
    thinking: "thinking…",
    fallback:
      "I'm having a bit of trouble right now. Please reach out to us on WhatsApp!",
    errorNetwork:
      "Sorry, I'm having trouble connecting. Please try again or reach us on WhatsApp.",
  },

  meta: {
    home: {
      title: "Helpers Technologies — We Build Solutions That Grow Your Business",
      description:
        "Helpers Technologies is a Giza-based digital agency combining world-class design, robust engineering, and AI automation to grow revenue for ambitious brands.",
    },
    about: {
      title: "About",
      description:
        "Helpers Technologies is a Giza-based digital studio combining engineering, design, and AI automation to turn digital products into repeatable revenue.",
    },
    services: {
      title: "Services",
      description:
        "Custom web development, mobile apps, AI automation, and digital growth strategy — from a team that treats your business like its own.",
    },
    projects: {
      title: "Projects",
      description:
        "Case studies from Helpers Technologies — e-commerce platforms, AI automation, and mobile apps that move the revenue needle.",
    },
    team: {
      title: "Team",
      description:
        "Meet the engineers and founders behind Helpers Technologies — a senior, founders-first team shipping products in Giza, Egypt.",
    },
    faq: {
      title: "FAQ",
      description:
        "Straight answers on pricing, timelines, ownership, support and bilingual delivery — everything founders ask before signing with Helpers Technologies.",
    },
    contact: {
      title: "Contact",
      description:
        "Tell us about your project. Helpers Technologies replies on WhatsApp within hours with a straight-talking plan.",
    },
    careers: {
      title: "Careers",
      description:
        "Join Helpers Technologies — a senior, founders-first team shipping digital products from Giza, Egypt. Apply with your CV and portfolio.",
    },
    privacy: {
      title: "Privacy Policy",
      description:
        "How Helpers Technologies collects, uses, and protects personal data.",
    },
    terms: {
      title: "Terms of Service",
      description:
        "Terms and conditions for using the Helpers Technologies website and services.",
    },
  },
};

// Arabic dict — same shape, natural professional Arabic.
const ar: typeof en = {
  dir: "rtl" as unknown as "ltr",

  a11y: {
    skipToContent: "تخطَّ إلى المحتوى",
    switchLang: "تغيير اللغة",
    openMenu: "فتح القائمة",
    closeMenu: "إغلاق القائمة",
    whatsapp: "راسلنا على واتساب",
    openChat: "فتح المحادثة",
    closeChat: "إغلاق المحادثة",
    messageInput: "رسالة",
    sendMessage: "إرسال الرسالة",
    linkedin: "لينكدإن",
    facebook: "فيسبوك",
    emailPerson: "راسل {name} بالبريد",
    linkedinPerson: "{name} على لينكدإن",
  },

  nav: {
    home: "الرئيسية",
    about: "من نحن",
    services: "الخدمات",
    projects: "المشاريع",
    team: "الفريق",
    faq: "الأسئلة الشائعة",
    contact: "تواصل معنا",
    careers: "الوظائف",
    privacy: "سياسة الخصوصية",
    terms: "شروط الاستخدام",
    getQuote: "اطلب عرض سعر",
  },

  hero: {
    eyebrow: "هيلبرز تكنولوجيز · الجيزة، مصر",
    titleA: "نبني حلول",
    titleB: "تبيع فعلًا.",
    description:
      "نجمع بين تصميم عالمي وهندسة قوية وأتمتة الذكاء الاصطناعي لمساعدة العلامات الطموحة في مصر وخارجها على تنمية الإيرادات، لا مجرد زيادة الزيارات.",
    ctaPrimary: "ابدأ مشروعك",
    ctaSecondary: "استعرض أعمالنا",
    scroll: "اسحب للأسفل",
    stats: [
      { value: "+20", label: "مشروع منجز" },
      { value: "95%", label: "معدل الاحتفاظ بالعملاء" },
      { value: "3 أسابيع", label: "متوسط وقت الإطلاق" },
      { value: "24/7", label: "أتمتة ذكاء اصطناعي" },
    ],
  },

  trustedBy: {
    aria: "يثق بنا",
    caption: "فرق طموحة في مصر وخارجها تثق بنا",
  },

  sections: {
    services: "الخدمات",
    servicesHeading: "ما نبنيه للعلامات التجارية الطموحة",
    servicesDescription:
      "أربع قدرات عميقة تندمج في فريق واحد. بلا حواجز ولا تسليمات مجزّأة — كل تعاون يستفيد من القدرات الأربع معًا.",
    differentiators: "لماذا هيلبرز",
    differentiatorsHeading: "نبني محركات نمو، لا مجرد واجهات.",
    differentiatorsDescription:
      "لسنا الأرخص. نحن الفريق الذي يعامل عملك كعمله الخاص ويرفض إطلاق أي ميزة لا تُحدث فرقًا حقيقيًا.",
    process: "منهجيتنا",
    processHeading: "مسار واضح ومتكرر من الفكرة إلى الإيراد",
    processDescription:
      "لا غموض ولا «فوضى إبداعية». كل مشروع يمر بنفس المنهجية المنضبطة من أربع مراحل، مُحسَّنة للسرعة والنتائج القابلة للقياس.",
    projects: "أعمال مختارة",
    projectsHeading: "قصص أعمال حقّقت نتائج فعلية",
    projectsDescription:
      "دراسات حالة مختارة. كل واحدة منها قصة شركة ساعدناها على تحويل فكرة رقمية إلى إيرادات متكرّرة.",
    testimonials: "قصص نجاح",
    testimonialsHeading: "فرق حقيقية. أثر حقيقي على الإيرادات.",
    testimonialsDescription:
      "مباشرةً من المؤسسين وقادة التسويق الذين وثقوا بنا لتنفيذ ما يهم.",
    team: "الفريق",
    teamHeading: "تعرّف على فريقنا",
    teamDescription:
      "فريق خبير ومتماسك. ستتحدث مع المهندسين الذين يبنون منتجك فعلًا — لا مديري حسابات يصفّون ما تريد قوله.",
    faq: "الأسئلة الشائعة",
    faqHeading: "إجابات قبل أن تسأل",
    faqDescription:
      "الأسئلة التي يطرحها المؤسسون الأذكياء قبل التوقيع — وإجاباتنا الصريحة عليها.",
    cta: "لنبنِ شيئًا رائعًا معًا",
    ctaBody:
      "أخبرنا عن منتجك، وسنردّ عليك على واتساب خلال ساعات قليلة بخطة واضحة وصريحة.",
    ctaPrimary: "ابدأ مشروعك",
    ctaWhatsapp: "راسلنا على واتساب",
  },

  common: {
    readCaseStudy: "اقرأ دراسة الحالة",
    viewAllProjects: "كل المشاريع",
    meetTheTeam: "تعرّف على الفريق",
    seeAllFaqs: "كل الأسئلة",
    learnMore: "اعرف المزيد",
    getInTouch: "تواصل معنا",
    whatsapp: "راسلنا على واتساب",
    email: "أرسل لنا بريدًا",
    exploreAllServices: "استعرض كل الخدمات",
  },

  process: {
    stepLabel: "الخطوة {n} من {total}",
  },

  about: {
    eyebrow: "عن هيلبرز تكنولوجيز",
    titleA: "نبني محركات نمو،",
    titleB: "لا مجرد واجهات.",
    missionEyebrow: "المهمة",
    missionHeading: "ماذا نفعل",
    visionEyebrow: "الرؤية",
    visionHeading: "إلى أين نتجه",
    valuesEyebrow: "قيمنا",
    valuesHeading: "مبادئ نعيش بها فعلًا.",
  },

  services: {
    eyebrow: "الخدمات",
    titleA: "كل القدرات التي تحتاجها لإطلاق منتجات",
    titleHighlight: "جاهزة لتحقيق الإيرادات",
    titleC: ".",
    description:
      "أربع قدرات متمرّسة نجمعها في فريق واحد. اختر واحدة، أو ادمجها لتحصل على محرك نمو متكامل من البداية للنهاية.",
    discussProject: "ناقش مشروع {service}",
  },

  projects: {
    eyebrow: "دراسات الحالة",
    titleA: "أعمال",
    titleHighlight: "حقّقت إيرادات",
    titleC: ".",
    description:
      "كل مشروع على هذه الصفحة أُطلق، ووصل لمستخدمين حقيقيين، وحرّك مؤشر أعمال حقيقي. لا أعمال شكلية.",
    readCaseStudy: "اقرأ دراسة الحالة",
    allProjects: "كل المشاريع",
    visitLiveSite: "زيارة الموقع",
    moreCaseStudies: "دراسات حالة أخرى",
    challenge: "التحدي",
    solution: "الحل",
    techStack: "التقنيات المستخدمة",
    results: "النتائج",
    categories: {
      "E-Commerce (WordPress)": "تجارة إلكترونية (ووردبريس)",
      "E-Commerce & Branding": "تجارة إلكترونية وهوية بصرية",
    } as Record<string, string>,
    industries: {
      "Digital Services": "خدمات رقمية",
      Entertainment: "ترفيه",
      Retail: "تجارة تجزئة",
    } as Record<string, string>,
  },

  team: {
    eyebrow: "الفريق",
    titleA: "فريق خبير، مؤسّسون في المقام الأول،",
    titleHighlight: "وإلى جانبك دائمًا.",
    description:
      "مجموعة متماسكة من المهندسين والمصممين. ستتحدث مع الأشخاص الذين يبنون منتجك فعلًا، بلا وسطاء ولا تسليمات مجزّأة.",
    comingSoon: "قريبًا",
    profileComingSoon: "الملف التعريفي قريبًا",
    joinHeading: "تريد الانضمام إلى الفريق؟",
    joinBody:
      "نحن دائمًا منفتحون على التعرّف على مهندسين ومصممين يتبنّون عقلية المنتج. أرسل لنا سيرتك الذاتية ورسالة قصيرة، ونحن نقرأ كل شيء.",
    applyNow: "قدّم الآن",
  },

  faq: {
    eyebrow: "الأكثر تكرارًا",
    titleA: "إجابات",
    titleHighlight: "قبل أن تسأل",
    titleC: ".",
    description: "الأسعار والجداول الزمنية والملكية — بوضوح ومن دون حشو.",
    categories: {
      Pricing: "الأسعار",
      Timeline: "الجداول الزمنية",
      Ownership: "الملكية",
      Capabilities: "القدرات",
      Support: "الدعم",
      General: "عام",
    } as Record<string, string>,
  },

  contact: {
    eyebrow: "تواصل معنا",
    titleA: "لنبنِ شيئًا",
    titleHighlight: "رائعًا معًا.",
    description:
      "املأ النموذج وسنردّ عليك بخطوات صريحة، عادةً خلال ساعات قليلة. أو راسلنا على واتساب مباشرةً للحصول على أسرع رد.",
    reachHeading: "طرق التواصل",
    reachBody: "نردّ بسرعة. اختر الأنسب لك.",
    emailLabel: "البريد الإلكتروني",
    whatsappLabel: "واتساب",
    locationLabel: "الموقع",
    location: "الجيزة، مصر",
    fastestHeading: "أسرع رد",
    fastestBody:
      "تحتاج إجابة اليوم؟ واتساب هو أسرع طريق لفتح محادثة مع أحد المؤسسين.",
    chatOnWhatsapp: "تحدث عبر واتساب",
  },

  contactForm: {
    heading: "أخبرنا عن مشروعك",
    required: "* مطلوب",
    selectPlaceholder: "اختر…",
    successHeading: "تم استلام رسالتك.",
    successBody:
      "شكرًا لتواصلك. سيعود إليك أحد المؤسسين قريبًا — عادةً خلال ساعات قليلة في أوقات العمل.",
    sendAnother: "أرسل رسالة أخرى",
    fields: {
      name: "اسمك *",
      email: "البريد الإلكتروني *",
      whatsapp: "واتساب / الهاتف",
      company: "الشركة",
      projectType: "نوع المشروع *",
      budget: "الميزانية",
      timeline: "الجدول الزمني",
      message: "ما الذي تريد بناءه؟ *",
    },
    placeholders: {
      name: "مثال: محمد أحمد",
      email: "you@company.com",
      whatsapp: "+20 111 844 5625",
      company: "اسم شركتك",
      message:
        "الأهداف، الجمهور، القيود المعروفة، وأي روابط مفيدة…",
    },
    options: {
      projectTypes: [
        "موقع جديد / إعادة تصميم",
        "متجر إلكتروني",
        "تطبيق جوال (iOS/Android)",
        "ذكاء اصطناعي وأتمتة",
        "تسويق رقمي / هوية بصرية",
        "مشروع مخصص آخر",
      ],
      budgets: [
        "أقل من 500 دولار (باقة الإطلاق)",
        "500 – 2,000 دولار",
        "2,000 – 5,000 دولار",
        "5,000 – 15,000 دولار",
        "+15,000 دولار",
        "مرن / ما زلت أبحث",
      ],
      timelines: [
        "بأسرع وقت (خلال أسبوعين)",
        "خلال شهر",
        "1 – 3 أشهر",
        "مرن",
      ],
    },
    replyNote: "نردّ خلال ساعات قليلة في أيام العمل.",
    cta: "إرسال الرسالة",
    sending: "جارٍ الإرسال…",
    errorGeneric: "حدث خطأ ما. يرجى المحاولة مرة أخرى.",
    errorNetwork: "خطأ في الشبكة. يرجى المحاولة مرة أخرى.",
  },

  careers: {
    eyebrow: "الوظائف",
    titleA: "ابنِ منتجات",
    titleHighlight: "تُطلق فعلًا.",
    description:
      "نُوظّف أشخاصًا خبراء يتبنّون عقلية المنتج ويحبّون التحرك بسرعة دون تفريط في الجودة. إن كنت كذلك، يسعدنا أن نتعرّف عليك.",
    perks: [
      {
        title: "ملكية حقيقية",
        description:
          "ستتخذ قرارات منتج، لا مجرد تنفيذ تذاكر. أنت تملك النتيجة من البداية للنهاية.",
      },
      {
        title: "فريق خبرات فقط",
        description:
          "ستعمل مع مهندسين ومصممين ينفّذون فعلًا — بلا مبتدئين يحتاجون رعاية، وبلا وسطاء.",
      },
      {
        title: "عمل مرن عن بُعد",
        description:
          "مقرّنا في الجيزة ونعمل بنظام هجين. ساعات مرنة وتواصل غير متزامن أولًا.",
      },
      {
        title: "بشر، لا موارد",
        description:
          "بلا بيروقراطية. توقّعات واضحة، وتغذية راجعة صريحة، ومساحة للنمو السريع.",
      },
    ],
  },

  careerForm: {
    heading: "قدّم للانضمام إلى الفريق",
    required: "* مطلوب",
    selectPlaceholder: "اختر…",
    successHeading: "تم استلام طلبك.",
    successBody:
      "شكرًا لتقديمك. نقرأ كل طلب بأنفسنا — وإن كان هناك توافق، ستسمع منا خلال أسبوع.",
    submitAnother: "قدّم طلبًا آخر",
    fields: {
      fullName: "الاسم الكامل *",
      email: "البريد الإلكتروني *",
      phone: "الهاتف / واتساب",
      location: "الموقع",
      role: "الدور الذي تتقدم له *",
      experienceYears: "سنوات الخبرة",
      linkedin: "لينكدإن",
      portfolio: "ملف الأعمال / GitHub",
      coverLetter: "خطاب التغطية / رسالتك *",
    },
    placeholders: {
      fullName: "مثال: محمد أحمد",
      email: "you@example.com",
      phone: "+20 111 844 5625",
      location: "القاهرة، مصر",
      linkedin: "https://linkedin.com/in/…",
      portfolio: "https://github.com/…",
      coverLetter:
        "لماذا تريد الانضمام إلى هيلبرز تكنولوجيز؟ ضع رابطًا لمشروع تفتخر به.",
    },
    options: {
      roles: [
        "مهندس واجهة أمامية",
        "مهندس خلفية",
        "مهندس متكامل (Full-Stack)",
        "مهندس تطبيقات جوال",
        "مصمم منتج",
        "مهندس ذكاء اصطناعي / تعلم آلي",
        "نمو / تسويق",
        "مدير مشروع",
        "تدريب",
        "أخرى",
      ],
      experience: [
        "طالب / تدريب",
        "0 – 1 سنة",
        "1 – 3 سنوات",
        "3 – 5 سنوات",
        "5 – 8 سنوات",
        "+8 سنوات",
      ],
    },
    cv: {
      label: "السيرة الذاتية (PDF أو DOC أو DOCX — بحد أقصى 6 ميجا)",
      click: "اضغط لرفع السيرة الذاتية",
      optional: "اختياري",
    },
    replyNote: "نقرأ كل طلب. توقّع الرد خلال أسبوع.",
    cta: "إرسال الطلب",
    sending: "جارٍ الإرسال…",
    errorGeneric: "حدث خطأ ما. يرجى المحاولة مرة أخرى.",
    errorNetwork: "خطأ في الشبكة. يرجى المحاولة مرة أخرى.",
  },

  footer: {
    copyright: "© {year} هيلبرز تكنولوجيز. جميع الحقوق محفوظة.",
    tagline: "نصمّم منتجات رقمية تبيع فعلًا.",
    explore: "استكشف",
    servicesTitle: "الخدمات",
    legalTitle: "قانوني",
    servicesLinks: [
      "تطوير مواقع مخصصة",
      "تطبيقات الجوال",
      "الذكاء الاصطناعي والأتمتة",
      "النمو الرقمي",
    ],
    crafted: "صُنع في الجيزة · يصل إلى العالم كله.",
  },

  legal: {
    legalEyebrow: "قانوني",
    privacyTitle: "سياسة الخصوصية",
    termsTitle: "شروط الاستخدام",
    updated: "آخر تحديث: {date}",
    lastUpdatedDate: "يناير 2025",
    privacy: {
      intro:
        "توضّح سياسة الخصوصية هذه كيف تجمع هيلبرز تكنولوجيز (\"نحن\"، \"لنا\") معلوماتك وتستخدمها وتشاركها عند تعاملك مع موقعنا وخدماتنا.",
      infoHeading: "المعلومات التي نجمعها",
      infoBody:
        "نجمع المعلومات التي تقدّمها لنا مباشرةً — مثلًا عند تعبئة نموذج تواصل — وبيانات تقنية أساسية مثل المتصفح والجهاز والصفحات التي تزورها. نستخدم ذلك للرد على استفسارك وتحسين الموقع.",
      useHeading: "كيف نستخدم معلوماتك",
      useItems: [
        "للرد على استفساراتك وإرسال عروض المشاريع.",
        "لتشغيل الموقع وصيانته وتحسينه.",
        "للتواصل معك بشأن خدماتنا (فقط إذا وافقت على ذلك).",
      ],
      storageHeading: "تخزين البيانات",
      storageBody:
        "تُحفظ رسائل التواصل بأمان في قاعدة بياناتنا. لا نبيع بياناتك ولا نؤجّرها لأي طرف ثالث. يمكنك طلب حذف بياناتك في أي وقت عبر البريد الإلكتروني.",
      contactHeading: "التواصل",
      contactBody: "استفسارات حول هذه السياسة؟ راسلنا عبر",
    },
    terms: {
      intro:
        "باستخدامك هذا الموقع فأنت توافق على شروط الاستخدام هذه. إن لم توافق فيرجى عدم استخدامه.",
      useHeading: "استخدام الموقع",
      useBody:
        "المحتوى على هذا الموقع مخصّص للمعلومة العامة. لا يُسمح بنسخه أو إعادة نشره دون إذن خطي منّا.",
      engagementsHeading: "التعاقدات والملكية",
      engagementsBody:
        "كل تعاون يبدأ بوثيقة نطاق موقّعة. عند سداد الدفعة النهائية تمتلك 100% من الكود والتصاميم والأصول — بلا احتكار ولا تراخيص خفية.",
      liabilityHeading: "حدود المسؤولية",
      liabilityBody:
        "الموقع مُقدَّم \"كما هو\". لا نتحمل المسؤولية عن أي أضرار ناتجة عن استخدامه أو الاعتماد على محتواه.",
      lawHeading: "القانون الحاكم",
      lawBody: "تخضع هذه الاتفاقية لقوانين جمهورية مصر العربية.",
      contactHeading: "التواصل",
      contactBody: "استفسارات حول الشروط؟ راسلنا عبر",
    },
  },

  notFound: {
    eyebrow: "404",
    heading: "هذه الصفحة سلكت طريقًا آخر.",
    body:
      "قد يكون الرابط قديمًا أو المشروع لم يُنشر بعد. لنعد بك إلى شيء مفيد.",
    backHome: "العودة للرئيسية",
    seeProjects: "استعرض مشاريعنا",
  },

  errorPage: {
    eyebrow: "حدث خلل",
    heading: "نعتذر عن هذا الإزعاج.",
    body:
      "جرّب تحديث الصفحة. إن استمر الأمر راسلنا على واتساب — سنعالجه فورًا.",
    tryAgain: "حاول مجددًا",
    backHome: "العودة للرئيسية",
  },

  whatsapp: {
    label: "واتساب",
  },

  chat: {
    openLabel: "تحدث مع الذكاء الاصطناعي",
    title: "هيلبربوت",
    status: "مساعد ذكاء اصطناعي · متصل",
    greeting:
      "أهلًا! أنا هيلبربوت. اسألني عن خدماتنا وفريقنا وكيف يمكننا مساعدة نمو أعمالك.",
    placeholder: "اسأل عن خدماتنا…",
    thinking: "جارٍ التفكير…",
    fallback:
      "تواجهني مشكلة مؤقتة. يُفضَّل التواصل معنا على واتساب!",
    errorNetwork:
      "عذرًا، هناك مشكلة في الاتصال. يرجى المحاولة مجددًا أو مراسلتنا على واتساب.",
  },

  meta: {
    home: {
      title: "هيلبرز تكنولوجيز — نبني منتجات رقمية تبيع فعلًا",
      description:
        "هيلبرز تكنولوجيز وكالة رقمية مقرها الجيزة، تجمع بين تصميم عالمي وهندسة قوية وأتمتة الذكاء الاصطناعي لتنمية إيرادات العلامات الطموحة.",
    },
    about: {
      title: "من نحن",
      description:
        "هيلبرز تكنولوجيز استوديو رقمي في الجيزة يجمع الهندسة والتصميم وأتمتة الذكاء الاصطناعي لتحويل المنتجات الرقمية إلى إيرادات متكرّرة.",
    },
    services: {
      title: "الخدمات",
      description:
        "تطوير مواقع مخصصة وتطبيقات جوال وأنظمة ذكاء اصطناعي واستراتيجية نمو رقمي — من فريق يعامل عملك كعمله الخاص.",
    },
    projects: {
      title: "المشاريع",
      description:
        "دراسات حالة من هيلبرز تكنولوجيز — منصات تجارة إلكترونية وأنظمة ذكاء اصطناعي وتطبيقات جوال تُحرّك مؤشرات الإيراد.",
    },
    team: {
      title: "الفريق",
      description:
        "تعرّف على المهندسين والمؤسسين وراء هيلبرز تكنولوجيز — فريق خبير يعمل من الجيزة، مصر.",
    },
    faq: {
      title: "الأسئلة الشائعة",
      description:
        "إجابات صريحة عن الأسعار والجداول الزمنية والملكية والدعم والتقديم ثنائي اللغة — كل ما يسأله المؤسسون قبل التعاون مع هيلبرز تكنولوجيز.",
    },
    contact: {
      title: "تواصل معنا",
      description:
        "أخبرنا عن مشروعك. يرد عليك فريق هيلبرز تكنولوجيز على واتساب خلال ساعات قليلة بخطة صريحة.",
    },
    careers: {
      title: "الوظائف",
      description:
        "انضم إلى هيلبرز تكنولوجيز — فريق خبير يعمل من الجيزة، مصر. قدّم طلبك بسيرتك الذاتية وملف أعمالك.",
    },
    privacy: {
      title: "سياسة الخصوصية",
      description:
        "كيف تجمع هيلبرز تكنولوجيز البيانات الشخصية وتستخدمها وتحميها.",
    },
    terms: {
      title: "شروط الاستخدام",
      description:
        "الشروط والأحكام الخاصة باستخدام موقع هيلبرز تكنولوجيز وخدماتها.",
    },
  },
};

export const dictionaries = { en, ar } as const;

export type Dict = typeof en;

export function getDict(locale: Locale): Dict {
  return (locale === "ar" ? ar : en) as Dict;
}

/**
 * Format a template string containing {placeholders} with values.
 * Keeps the left-to-right ordering natural for RTL readers as well.
 */
export function formatTemplate(
  template: string,
  values: Record<string, string | number>,
): string {
  return template.replace(/\{(\w+)\}/g, (_, k) =>
    k in values ? String(values[k]) : `{${k}}`,
  );
}
