import {
  Briefcase,
  Cpu,
  MessageSquare,
  ShieldCheck,
  Rocket,
  LifeBuoy,
  type LucideIcon,
} from "lucide-react";

export type Differentiator = {
  icon: LucideIcon;
  title: string;
  title_ar: string;
  description: string;
  description_ar: string;
};

export const differentiators: Differentiator[] = [
  {
    icon: Briefcase,
    title: "Business-First Engineering",
    title_ar: "هندسة تبدأ من الأعمال",
    description:
      "If it doesn't make money or save time, we don't build it. We dig into your business model and define success before writing a single line of code.",
    description_ar:
      "إذا لم يكن الحل يجلب إيرادًا أو يوفّر وقتًا، فنحن لا نبنيه. نحلّل نموذج عملك ونحدّد مؤشرات النجاح قبل أي سطر كود.",
  },
  {
    icon: Cpu,
    title: "AI-Native Advantage",
    title_ar: "أفضلية مبنية على الذكاء الاصطناعي",
    description:
      "We bake AI into the core of your product from day one — giving you a technological edge competitors can't catch up to quickly.",
    description_ar:
      "ندمج الذكاء الاصطناعي في منتجك منذ اليوم الأول — ليمنحك أفضلية تقنية يصعب على المنافسين اللحاق بها.",
  },
  {
    icon: MessageSquare,
    title: "Direct Access to Experts",
    title_ar: "تواصل مباشر مع الخبراء",
    description:
      "No account managers filtering your requests. You talk directly to the engineers and founders building your product.",
    description_ar:
      "لا وسطاء ولا مديرو حسابات. تتحدث مباشرة مع المهندسين والمؤسسين الذين يبنون منتجك.",
  },
  {
    icon: ShieldCheck,
    title: "100% Ownership",
    title_ar: "ملكية كاملة 100%",
    description:
      "No vendor lock-in. You pay for it, you own it — the code, the designs, the data. Forever.",
    description_ar:
      "لا قيود ولا احتكار. أنت تدفع، وأنت تملك — الكود، التصاميم، والبيانات. للأبد.",
  },
  {
    icon: Rocket,
    title: "Ship in Weeks, Not Quarters",
    title_ar: "إطلاق خلال أسابيع، لا أشهر",
    description:
      "A senior pod that moves fast. Most projects launch in 2–6 weeks — tightly scoped, ruthlessly prioritized, shipped.",
    description_ar:
      "فريق خبير يتحرك بسرعة. معظم المشاريع تُطلق خلال ٢ إلى ٦ أسابيع — نطاق محدد، أولويات صارمة، وإطلاق فعلي.",
  },
  {
    icon: LifeBuoy,
    title: "Support After Launch",
    title_ar: "دعم مستمر بعد الإطلاق",
    description:
      "We don't disappear on launch day. Ongoing optimization, bug-fixing, and growth experiments are built into every engagement.",
    description_ar:
      "لا نختفي بعد الإطلاق. الدعم المستمر وتحسينات الأداء وتجارب النمو جزء من كل تعاون.",
  },
];
