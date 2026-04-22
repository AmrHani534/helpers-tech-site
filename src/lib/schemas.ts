import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Name is too short").max(120),
  email: z.string().email("Invalid email"),
  whatsapp: z.string().max(40).optional().or(z.literal("")),
  company: z.string().max(120).optional().or(z.literal("")),
  project_type: z.string().max(120).optional().or(z.literal("")),
  budget: z.string().max(120).optional().or(z.literal("")),
  timeline: z.string().max(120).optional().or(z.literal("")),
  message: z.string().min(10, "Please share a bit more detail").max(5000),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const projectSchema = z.object({
  title: z.string().min(2),
  slug: z.string().min(2),
  category: z.string(),
  industry: z.string(),
  year: z.string(),
  summary: z.string(),
  challenge: z.string(),
  solution: z.string(),
  results: z.array(z.string()).default([]),
  tech_stack: z.array(z.string()).default([]),
  cover_image: z.string().optional().or(z.literal("")),
  live_url: z.string().optional().or(z.literal("")),
  featured: z.boolean().default(false),
  published: z.boolean().default(true),
  order_index: z.number().default(0),
  testimonial_quote: z.string().optional().or(z.literal("")),
  testimonial_author: z.string().optional().or(z.literal("")),
  testimonial_role: z.string().optional().or(z.literal("")),
  title_ar: z.string().optional().or(z.literal("")),
  summary_ar: z.string().optional().or(z.literal("")),
});

export const teamMemberSchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2),
  role: z.string(),
  bio: z.string(),
  photo: z.string().optional().or(z.literal("")),
  featured: z.boolean().default(false),
  placeholder: z.boolean().default(false),
  order_index: z.number().default(0),
  linkedin: z.string().optional().or(z.literal("")),
  email: z.string().optional().or(z.literal("")),
});

export const testimonialSchema = z.object({
  quote: z.string().min(5),
  author: z.string().min(2),
  role: z.string().optional().or(z.literal("")),
  company: z.string().optional().or(z.literal("")),
  rating: z.number().min(1).max(5).default(5),
  featured: z.boolean().default(false),
  order_index: z.number().default(0),
});

export const faqSchema = z.object({
  question: z.string().min(3),
  answer: z.string().min(3),
  category: z.string().optional().or(z.literal("")),
  order_index: z.number().default(0),
  published: z.boolean().default(true),
});

export const careerApplicationSchema = z.object({
  full_name: z.string().min(2, "Name is too short").max(120),
  email: z.string().email("Invalid email"),
  phone: z.string().max(40).optional().or(z.literal("")),
  location: z.string().max(120).optional().or(z.literal("")),
  role: z.string().min(2, "Please pick a role").max(120),
  experience_years: z.string().max(40).optional().or(z.literal("")),
  linkedin: z.string().max(300).optional().or(z.literal("")),
  portfolio: z.string().max(300).optional().or(z.literal("")),
  cover_letter: z
    .string()
    .min(20, "Please share a bit more about yourself")
    .max(8000),
  cv_url: z.string().optional().or(z.literal("")),
  cv_filename: z.string().max(300).optional().or(z.literal("")),
});

export type CareerApplicationInput = z.infer<typeof careerApplicationSchema>;
