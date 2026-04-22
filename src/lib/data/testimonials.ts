export type Testimonial = {
  id: string;
  quote: string;
  quote_ar?: string;
  author: string;
  author_ar?: string;
  role: string;
  role_ar?: string;
  company?: string;
  avatar?: string;
  rating?: number;
  featured: boolean;
  orderIndex: number;
};

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    quote:
      "They didn't just build a website; they built a sales machine. The ROI was clear within the first month of launching.",
    quote_ar:
      "لم يكتفوا ببناء موقع؛ بنوا ماكينة مبيعات حقيقية. وضوح العائد على الاستثمار ظهر خلال الشهر الأول من الإطلاق.",
    author: "Flixs Store Management",
    author_ar: "إدارة متجر Flixs",
    role: "Management",
    role_ar: "فريق الإدارة",
    rating: 5,
    featured: true,
    orderIndex: 1,
  },
  {
    id: "t2",
    quote:
      "The AI chatbot they integrated has cut our support response time by 80%. It handles common questions so my team can focus on sales.",
    quote_ar:
      "روبوت المحادثة بالذكاء الاصطناعي الذي طوّروه قلّل زمن استجابة الدعم بنسبة 80%، ويتكفّل بالأسئلة المتكررة ليتفرّغ الفريق للمبيعات.",
    author: "Mohamed Ali",
    author_ar: "محمد علي",
    role: "Marketing Director",
    role_ar: "مدير التسويق",
    rating: 5,
    featured: true,
    orderIndex: 2,
  },
  {
    id: "t3",
    quote:
      "Direct access to the founders makes a huge difference. Problems get solved in minutes, not days. Highly recommended.",
    quote_ar:
      "التواصل المباشر مع المؤسسين يصنع فرقًا كبيرًا. المشاكل تُحل في دقائق لا في أيام. أرشّحهم بقوة.",
    author: "Sarah Hassan",
    author_ar: "سارة حسن",
    role: "Marketing Manager",
    role_ar: "مديرة التسويق",
    rating: 5,
    featured: true,
    orderIndex: 3,
  },
  {
    id: "t4",
    quote:
      "The custom theme is exactly what we imagined. Managing products is so easy now, and the platform has completely automated our sales process.",
    quote_ar:
      "القالب المخصص جاء مطابقًا لما تخيّلناه تمامًا. إدارة المنتجات صارت سهلة جدًا، والمنصة أتمتت عملية البيع بالكامل.",
    author: "Ahmed Ibrahim",
    author_ar: "أحمد إبراهيم",
    role: "Premium Hub Team",
    role_ar: "فريق Premium Hub",
    rating: 5,
    featured: true,
    orderIndex: 4,
  },
];
