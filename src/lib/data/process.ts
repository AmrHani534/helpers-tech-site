export type ProcessStep = {
  number: string;
  title: string;
  title_ar: string;
  description: string;
  description_ar: string;
};

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Discovery & Strategy",
    title_ar: "الاستكشاف والاستراتيجية",
    description:
      "We dig deep into your business model, audience, and revenue drivers. We define 'success' in measurable terms before writing any code.",
    description_ar:
      "نتعمّق في نموذج عملك وجمهورك ومصادر إيراداتك، ونحدّد معنى النجاح بأرقام قابلة للقياس قبل أي سطر كود.",
  },
  {
    number: "02",
    title: "Design & Development",
    title_ar: "التصميم والتطوير",
    description:
      "We build using modern, battle-tested stacks (Next.js, React Native, Tailwind) focused on speed, security, and scalability.",
    description_ar:
      "نبني بأحدث التقنيات الموثوقة (Next.js، React Native، Tailwind) مع تركيز على السرعة والأمان وقابلية التوسع.",
  },
  {
    number: "03",
    title: "Launch & QA",
    title_ar: "الإطلاق واختبار الجودة",
    description:
      "Rigorous QA across devices, networks, and edge cases. We handle the server setup, domain connection, and full go-live checklist.",
    description_ar:
      "اختبارات جودة صارمة عبر الأجهزة والشبكات وسيناريوهات الحافة. نتولى إعداد الخادم وربط الدومين وقائمة الإطلاق كاملة.",
  },
  {
    number: "04",
    title: "Growth & Optimization",
    title_ar: "النمو والتحسين",
    description:
      "We don't disappear after launch. We analyze user behavior and relentlessly optimize for conversion, retention, and revenue growth.",
    description_ar:
      "لا نختفي بعد الإطلاق. نحلّل سلوك المستخدمين ونحسّن باستمرار معدلات التحويل والاحتفاظ والنمو.",
  },
];
