export type Testimonial = {
  id: string;
  quote: string;
  quote_ar?: string;
  author: string;
  role: string;
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
    author: "Flixs Store Management",
    role: "Management",
    rating: 5,
    featured: true,
    orderIndex: 1,
  },
  {
    id: "t2",
    quote:
      "The AI chatbot they integrated has cut our support response time by 80%. It handles common questions so my team can focus on sales.",
    author: "Mohamed Ali",
    role: "Marketing Director",
    rating: 5,
    featured: true,
    orderIndex: 2,
  },
  {
    id: "t3",
    quote:
      "Direct access to the founders makes a huge difference. Problems get solved in minutes, not days. Highly recommended.",
    author: "Sarah Hassan",
    role: "Marketing Manager",
    rating: 5,
    featured: true,
    orderIndex: 3,
  },
  {
    id: "t4",
    quote:
      "The custom theme is exactly what we imagined. Managing products is so easy now, and the platform has completely automated our sales process.",
    author: "Ahmed Ibrahim",
    role: "Premium Hub Team",
    rating: 5,
    featured: true,
    orderIndex: 4,
  },
];
