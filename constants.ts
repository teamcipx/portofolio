
import { Project, Product, Testimonial, Experience, Education, BlogPost } from './types';

// Professional Headshot for the Hero Section
export const PROFILE_PIC = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80";

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'PayFlow - FinTech Rebrand',
    category: 'Branding',
    imageUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80',
    description: 'A complete visual identity overhaul for a leading financial technology firm, focusing on trust, security, and modern innovation.'
  },
  {
    id: '2',
    title: 'FreshCart Mobile App',
    category: 'Web Design',
    imageUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80',
    description: 'UI/UX design for a sustainable grocery delivery app. Features include a minimal interface, dark mode, and intuitive checkout flow.'
  },
  {
    id: '3',
    title: 'Cyber Dystopia Art Series',
    category: 'Illustration',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    description: 'A series of digital paintings exploring futuristic cityscapes. Featured in "Digital Art Master" magazine 2023.'
  },
  {
    id: '4',
    title: 'Urban Wear Social Campaign',
    category: 'Social Media',
    imageUrl: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80',
    description: 'High-conversion Instagram carousel templates and story animations designed for a streetwear clothing brand launch.'
  },
  {
    id: '5',
    title: 'Archito - Architecture Firm',
    category: 'Web Design',
    imageUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
    description: 'A clean, typography-focused website design for an award-winning architectural firm, built with React and Framer Motion.'
  },
  {
    id: '6',
    title: 'Neon Retro Logo Pack',
    category: 'Branding',
    imageUrl: 'https://images.unsplash.com/photo-1626785774573-4b79931256aa?auto=format&fit=crop&w=800&q=80',
    description: 'A collection of 80s inspired vector logo marks and badges sold on Creative Market, achieving 500+ sales.'
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    title: 'Mastering Adobe Photoshop',
    type: 'Course',
    price: 49.00,
    imageUrl: 'https://images.unsplash.com/photo-1626785774625-ddcddc3445e9?auto=format&fit=crop&w=400&q=80',
    description: 'Learn photo manipulation and digital art techniques in this comprehensive 4-week video course.',
    rating: 4.9
  },
  {
    id: 'p2',
    title: 'SaaS Dashboard UI Kit',
    type: 'Asset',
    price: 29.00,
    imageUrl: 'https://images.unsplash.com/photo-1586717791821-3f44a5638d48?auto=format&fit=crop&w=400&q=80',
    description: 'Over 200+ customizable Figma components for building modern analytics dashboards.',
    rating: 4.8
  },
  {
    id: 'p3',
    title: 'Freelance Business Guide',
    type: 'Course',
    price: 35.00,
    imageUrl: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=400&q=80',
    description: 'The complete guide to pricing, contracts, and client management for new designers.',
    rating: 5.0
  },
  {
    id: 'p4',
    title: '3D Abstract Backgrounds',
    type: 'Asset',
    price: 12.00,
    imageUrl: 'https://images.unsplash.com/photo-1618005198910-a52ada81f4ed?auto=format&fit=crop&w=400&q=80',
    description: 'A pack of 20 high-resolution 4K renders suitable for web headers and social media posts.',
    rating: 4.6
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Alex Morgan',
    role: 'CEO',
    company: 'PayFlow Tech',
    content: 'Siam\'s attention to detail is unmatched. He took our vague concepts and turned them into a world-class brand identity that investors love.',
    avatarUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=100&q=80'
  },
  {
    id: 't2',
    name: 'Sarah Lin',
    role: 'Creative Director',
    company: 'Studio 8',
    content: 'A true professional. The UI assets he delivered for our campaign were pixel-perfect, organized, and delivered ahead of schedule.',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359-13a74327dadd?auto=format&fit=crop&w=100&q=80'
  },
  {
    id: 't3',
    name: 'David Miller',
    role: 'Marketing Lead',
    company: 'Growthify',
    content: 'The UI kit we bought from Siam saved us hundreds of development hours. The code quality and design consistency are top-notch.',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80'
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
  },
  {
    id: 'e3',
    role: 'Junior Graphic Designer',
    company: 'Creative Hub BD',
    period: '2018 - 2019',
    type: 'Job',
    description: 'Created marketing assets, logos, and social media content for local brands. Mastered Adobe Creative Suite.'
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

export const BLOGS: BlogPost[] = [
  {
    id: 'b1',
    title: 'The Future of UI Design: AI Integration',
    excerpt: 'How artificial intelligence is changing the way we design interfaces, from automated layouts to generative imagery.',
    date: 'Nov 15, 2024',
    readTime: '5 min read',
    category: 'Design Trends',
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'b2',
    title: 'Why Designers Should Learn React',
    excerpt: 'Bridging the gap between design and code. Why understanding components makes you a better designer.',
    date: 'Oct 22, 2024',
    readTime: '7 min read',
    category: 'Development',
    imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'b3',
    title: 'Mastering Color Theory in 2025',
    excerpt: 'Moving beyond basic palettes. How to use semantic colors and variable modes in Figma effectively.',
    date: 'Sep 10, 2024',
    readTime: '4 min read',
    category: 'Tutorial',
    imageUrl: 'https://images.unsplash.com/photo-1502691876148-a84978e59af8?auto=format&fit=crop&w=600&q=80'
  }
];

export const CV_URL = "/cv.pdf";
