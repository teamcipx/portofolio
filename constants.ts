
import { Project, Product, Testimonial, Experience, Education, BlogPost } from './types';

// Professional Headshot for the Hero Section
export const PROFILE_PIC = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80";

// Empty arrays to be populated via Admin Panel (Firebase)
export const PROJECTS: Project[] = [];
export const PRODUCTS: Product[] = [];
export const BLOGS: BlogPost[] = [];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Alex Morgan',
    role: 'CEO',
    company: 'PayFlow Tech',
    content: 'Siam\'s attention to detail is unmatched. He took our vague concepts and turned them into a world-class brand identity that investors love.',
    avatarUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=100&q=80'
  }
];

export const EXPERIENCE: Experience[] = [
  {
    id: 'e1',
    role: 'Senior Product Designer',
    company: 'TechFlow Solutions',
    period: '2022 - Present',
    type: 'Job',
    description: 'Leading the UI/UX team for enterprise SaaS products. Increased user retention by 40% through design system optimization.'
  },
  {
    id: 'e2',
    role: 'Frontend Developer & Designer',
    company: 'Upwork (Top Rated)',
    period: '2019 - 2022',
    type: 'Freelance',
    description: 'Completed 100+ projects for global clients. Specialized in converting Figma designs to pixel-perfect React/Tailwind code.'
  }
];

export const EDUCATION: Education[] = [
  {
    id: 'ed1',
    degree: 'B.Sc in Computer Science',
    institution: 'Daffodil International University',
    period: '2018 - 2022',
    description: 'Focused on Human-Computer Interaction (HCI) and Web Technologies. Graduated with a CGPA of 3.8.'
  },
  {
    id: 'ed2',
    degree: 'Google UX Design Certificate',
    institution: 'Coursera',
    period: '2021',
    description: 'Professional certification covering research, wireframing, prototyping, and user testing.'
  }
];

export const CV_URL = "/cv.pdf";
