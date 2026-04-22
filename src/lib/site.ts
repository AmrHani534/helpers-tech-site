export const site = {
  name: "Helpers Technologies",
  shortName: "Helpers Tech",
  tagline: "Build Digital Products That Actually Sell.",
  description:
    "Helpers Technologies bridges the gap between complex code and business growth — delivering high-ROI digital solutions for ambitious brands in Egypt and beyond.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://helpers-tech.com",
  email: "info@helpers-tech.com",
  phone: "+201118445625",
  whatsapp: "+201118445625",
  whatsappLink: "https://wa.me/201118445625",
  location: "Giza, Egypt",
  social: {
    linkedin: "https://www.linkedin.com/company/helpers-technologies/",
    facebook: "https://www.facebook.com/helperstechnologies",
  },
  nav: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Projects", href: "/projects" },
    { label: "Team", href: "/team" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
} as const;

export type SiteConfig = typeof site;
