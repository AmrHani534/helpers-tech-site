export type Faq = {
  id: string;
  question: string;
  question_ar?: string;
  answer: string;
  answer_ar?: string;
  category?: string;
  orderIndex: number;
  published: boolean;
};

export const faqs: Faq[] = [
  {
    id: "f1",
    question: "How much does a project actually cost?",
    question_ar: "كم تكلفة المشروع فعليًا؟",
    answer:
      "Transparency is key. Our Launch Pack starts at $250. Business Bundles start at $400. For custom software and mobile apps we provide a detailed quote after a free discovery call.",
    answer_ar:
      "الشفافية أولًا. باقة الإطلاق تبدأ من $250، وباقة الأعمال من $400. للبرمجيات المخصصة وتطبيقات الجوال نقدّم عرضًا تفصيليًا بعد جلسة استكشاف مجانية.",
    category: "Pricing",
    orderIndex: 1,
    published: true,
  },
  {
    id: "f2",
    question: "How long does it take to launch?",
    question_ar: "كم يستغرق إطلاق المشروع؟",
    answer:
      "Simple websites (Launch Pack) take 3 days. Professional business sites take 2–3 weeks. Complex e-commerce or app projects typically take 4–6 weeks.",
    answer_ar:
      "المواقع البسيطة (باقة الإطلاق) تستغرق 3 أيام. المواقع الاحترافية للأعمال 2–3 أسابيع. مشاريع التجارة الإلكترونية أو التطبيقات 4–6 أسابيع عادةً.",
    category: "Timeline",
    orderIndex: 2,
    published: true,
  },
  {
    id: "f3",
    question: "Do I own the code after the project is done?",
    question_ar: "هل أمتلك الكود بعد انتهاء المشروع؟",
    answer:
      "Yes, 100%. Once the final payment is made, you own the code, the domain, and all assets. We do not believe in vendor lock-in.",
    answer_ar:
      "نعم 100%. بمجرد سداد الدفعة النهائية تمتلك الكود والدومين وجميع الأصول. لا نؤمن بتقييد العملاء.",
    category: "Ownership",
    orderIndex: 3,
    published: true,
  },
  {
    id: "f4",
    question: "Do you support Arabic and English (bilingual)?",
    question_ar: "هل تدعمون العربية والإنجليزية؟",
    answer:
      "Absolutely. We specialize in RTL (right-to-left) design to ensure your platform feels native to Egyptian and Arab audiences.",
    answer_ar:
      "بالتأكيد. لدينا خبرة قوية في تصميم RTL لضمان شعور منصّتك بأنها أصلية للجمهور العربي والمصري.",
    category: "Capabilities",
    orderIndex: 4,
    published: true,
  },
  {
    id: "f5",
    question: "How do payments work?",
    question_ar: "كيف تعمل الدفعات؟",
    answer:
      "We typically require a 50% deposit to start work, with the remaining 50% due on completion and your final approval.",
    answer_ar:
      "نطلب عادةً دفعة مقدمة 50% لبدء العمل، والـ 50% المتبقية عند التسليم وموافقتك النهائية.",
    category: "Pricing",
    orderIndex: 5,
    published: true,
  },
  {
    id: "f6",
    question: "What happens if I need help after launch?",
    question_ar: "ماذا لو احتجت دعمًا بعد الإطلاق؟",
    answer:
      "We offer ongoing maintenance & support plans (Basic, Growth, Premium) to keep your system secure and updated. We are always just a WhatsApp message away.",
    answer_ar:
      "نقدّم باقات دعم وصيانة مستمرة (Basic، Growth، Premium) للحفاظ على النظام آمنًا ومحدّثًا. نحن دائمًا على بُعد رسالة واتساب.",
    category: "Support",
    orderIndex: 6,
    published: true,
  },
];
