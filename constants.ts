import { Project, Product, Testimonial } from './types';

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Neon Horizon Branding',
    category: 'Branding',
    imageUrl: 'https://picsum.photos/800/600?random=1',
    description: 'Complete brand identity for a futuristic tech startup.'
  },
  {
    id: '2',
    title: 'EcoLife App UI',
    category: 'Web Design',
    imageUrl: 'https://picsum.photos/800/600?random=2',
    description: 'User interface design for a sustainable living mobile application.'
  },
  {
    id: '3',
    title: 'Urban Jungle Illustrations',
    category: 'Illustration',
    imageUrl: 'https://picsum.photos/800/600?random=3',
    description: 'A series of digital illustrations depicting nature taking over cities.'
  },
  {
    id: '4',
    title: 'Coffee House Socials',
    category: 'Social Media',
    imageUrl: 'https://picsum.photos/800/600?random=4',
    description: 'Instagram campaign templates for a local coffee chain.'
  },
  {
    id: '5',
    title: 'Minimalist Portfolio',
    category: 'Web Design',
    imageUrl: 'https://picsum.photos/800/600?random=5',
    description: 'Clean and effective personal portfolio template.'
  },
  {
    id: '6',
    title: 'Retro Logo Collection',
    category: 'Branding',
    imageUrl: 'https://picsum.photos/800/600?random=6',
    description: 'A study of 80s typography and logo design styles.'
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    title: 'Mastering Adobe Illustrator',
    type: 'Course',
    price: 49.99,
    imageUrl: 'https://picsum.photos/400/300?random=10',
    description: 'Go from beginner to pro in vector graphics.',
    rating: 4.8
  },
  {
    id: 'p2',
    title: 'Ultimate UI Kit Bundle',
    type: 'Asset',
    price: 29.99,
    imageUrl: 'https://picsum.photos/400/300?random=11',
    description: 'Over 500+ UI components for your next project.',
    rating: 4.9
  },
  {
    id: 'p3',
    title: 'Freelance Design Business 101',
    type: 'Course',
    price: 39.99,
    imageUrl: 'https://picsum.photos/400/300?random=12',
    description: 'How to find clients and price your work.',
    rating: 4.7
  },
  {
    id: 'p4',
    title: '3D Abstract Texture Pack',
    type: 'Asset',
    price: 15.00,
    imageUrl: 'https://picsum.photos/400/300?random=13',
    description: 'High resolution 3D renders for backgrounds.',
    rating: 4.5
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Sarah Jenkins',
    role: 'Marketing Director',
    company: 'TechFlow',
    content: 'Siam is a visionary designer. He completely transformed our brand identity.',
    avatarUrl: 'https://picsum.photos/100/100?random=20'
  },
  {
    id: 't2',
    name: 'Michael Chen',
    role: 'Founder',
    company: 'StartUp Inc',
    content: 'Fast, professional, and incredibly talented. Highly recommended!',
    avatarUrl: 'https://picsum.photos/100/100?random=21'
  },
  {
    id: 't3',
    name: 'Emily Davis',
    role: 'Product Owner',
    company: 'Creative Studio',
    content: 'The UI designs Siam produced were exactly what our users needed.',
    avatarUrl: 'https://picsum.photos/100/100?random=22'
  }
];

export const CV_URL = "#"; // Mock URL