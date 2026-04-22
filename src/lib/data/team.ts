export type TeamMember = {
  slug: string;
  name: string;
  name_ar?: string;
  role: string;
  role_ar?: string;
  bio: string;
  bio_ar?: string;
  photo: string;
  socials?: { linkedin?: string; twitter?: string; github?: string; email?: string };
  featured: boolean;
  orderIndex: number;
  placeholder?: boolean;
};

export const teamMembers: TeamMember[] = [
  {
    slug: "amr-hani",
    name: "Amr Hani",
    name_ar: "عمرو هاني",
    role: "CEO & Founder",
    role_ar: "المدير التنفيذي والمؤسس",
    bio: "Full-stack engineer and product strategist leading Helpers Technologies. Amr blends business-first thinking with hands-on engineering to ship products that actually grow revenue.",
    bio_ar:
      "مهندس برمجيات واستراتيجي منتجات يقود شركة Helpers Technologies. يجمع بين التفكير التجاري والهندسة العملية لبناء منتجات تُنمّي الإيرادات فعليًا.",
    photo: "/images/amr-hani.jpg",
    socials: {
      linkedin: "https://www.linkedin.com/company/helpers-technologies/",
      email: "info@helpers-tech.com",
    },
    featured: true,
    orderIndex: 1,
  },
  {
    slug: "amr-ahmed-el-doweik",
    name: "Amr Ahmed El Doweik",
    name_ar: "عمرو أحمد الدويك",
    role: "Co-Founder",
    role_ar: "شريك مؤسس",
    bio: "Co-founder driving Helpers' design, process, and client strategy. Obsessed with turning complex requirements into elegant, high-converting digital experiences.",
    bio_ar:
      "شريك مؤسس يقود التصميم والعمليات واستراتيجية العملاء. شغوف بتحويل المتطلبات المعقدة إلى تجارب رقمية أنيقة وعالية التحويل.",
    photo: "/images/amr-ahmed.jpg",
    socials: {
      linkedin: "https://www.linkedin.com/company/helpers-technologies/",
    },
    featured: true,
    orderIndex: 2,
  },
  {
    slug: "ahmed-reda",
    name: "Ahmed Reda",
    role: "Engineer",
    bio: "Bio coming soon — the admin dashboard lets you replace this placeholder with a real photo, title, and bio.",
    photo: "/images/placeholder-avatar.svg",
    featured: false,
    orderIndex: 3,
    placeholder: true,
  },
  {
    slug: "ahmed-eid",
    name: "Ahmed Eid",
    role: "Engineer",
    bio: "Bio coming soon — the admin dashboard lets you replace this placeholder with a real photo, title, and bio.",
    photo: "/images/placeholder-avatar.svg",
    featured: false,
    orderIndex: 4,
    placeholder: true,
  },
];
