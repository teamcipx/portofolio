
import { Project, Product, Testimonial, Experience, Education, BlogPost } from './types';

// Professional Headshot for the Hero Section
export const PROFILE_PIC = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80";

// Logos of companies Ali has worked with
export const CLIENT_LOGOS = [
  "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/2560px-Google_2015_logo.svg.png",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Octicons-mark-github.svg/2048px-Octicons-mark-github.svg.png",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Facebook_f_logo_%282019%29.svg/2048px-Facebook_f_logo_%282019%29.svg.png",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Logo_NIKE.svg/1200px-Logo_NIKE.svg.png",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/2048px-Instagram_logo_2016.svg.png",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
];

// Empty arrays to be populated via Admin Panel (Firebase)
export const PROJECTS: Project[] = [];
export const PRODUCTS: Product[] = [];
export const BLOGS: BlogPost[] = [];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Sarah Jenkins',
    role: 'Marketing Director',
    company: 'GrowthX',
    content: 'Ali\'s digital marketing strategies doubled our leads in just 3 months. His video editing skills also gave our ads a massive boost!',
    avatarUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=100&q=80'
  }
];

export const EXPERIENCE: Experience[] = [
  {
    id: 'e1',
    role: 'Senior Digital Marketer',
    company: 'Creative Agency BD',
    period: '2023 - Present',
    type: 'Job',
    description: 'Managing SEO, Social Media Marketing, and PPC campaigns for top local brands. Expert in Meta Ads and Google Ads.'
  },
  {
    id: 'e2',
    role: 'Video Editor & Motion Designer',
    company: 'Freelance (Fiverr/Upwork)',
    period: '2020 - 2023',
    type: 'Freelance',
    description: 'Produced 500+ high-quality videos for YouTubers and businesses. Specialized in Premiere Pro and After Effects.'
  },
  {
    id: 'e3',
    role: 'Graphic Designer',
    company: 'Local Print House',
    period: '2018 - 2020',
    type: 'Job',
    description: 'Designed branding materials, logos, and social media posts. Mastered Photoshop and Illustrator.'
  }
];

export const EDUCATION: Education[] = [
  {
    id: 'ed1',
    degree: 'Professional Digital Marketing',
    institution: 'Google Certification',
    period: '2022',
    description: 'Certified in SEO, SEM, and Analytics.'
  },
  {
    id: 'ed2',
    degree: 'Video Editing Masterclass',
    institution: 'Udemy',
    period: '2021',
    description: 'Advanced certification in Adobe Premiere Pro and After Effects.'
  }
];

export const CV_URL = "/cv.pdf";
