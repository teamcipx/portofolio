
export interface Project {
  id: string;
  title: string;
  category: 'Branding' | 'Web Design' | 'Illustration' | 'Social Media' | 'Video Editing';
  imageUrl: string; // Main Thumbnail
  images?: string[]; // Album / Gallery
  description: string;
  client?: string;
  date?: string;
  tools?: string[]; // e.g. ["Photoshop", "Figma"]
  liveLink?: string;
}

export interface Product {
  id: string;
  title: string;
  type: 'Course' | 'Asset';
  price: number;
  imageUrl: string;
  description: string;
  rating: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatarUrl: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export enum UserRole {
  GUEST = 'GUEST',
  ADMIN = 'ADMIN'
}

export interface User {
  username: string;
  email: string;
  role: UserRole;
  photoUrl?: string;
}

export interface AuthContextType {
  user: User | null;
  loginWithGoogle: () => Promise<void>;
  loginWithEmail: (email: string, password: string) => Promise<void>;
  registerWithEmail: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAdmin: boolean;
  loading: boolean;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  type: 'Job' | 'Freelance';
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  period: string;
  description: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content?: string; // Full article content
  date: string;
  readTime: string;
  imageUrl: string;
  category: string;
}

export interface Message {
  id: string;
  text: string;
  sender: string;
  email: string;
  photoUrl?: string;
  createdAt: string;
  reply?: string;
  read: boolean;
}

export interface Order {
  id?: string;
  userEmail: string;
  items: CartItem[];
  total: number;
  paymentMethod: 'bKash' | 'Nagad' | 'Rocket' | 'Binance' | 'Card';
  trxId?: string;
  senderNumber?: string;
  status: 'pending' | 'completed' | 'rejected';
  createdAt: string;
}

export interface Booking {
  id?: string;
  name: string;
  email: string;
  date: string;
  time: string;
  topic: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  createdAt: string;
}

// AWS / Theme Settings Interface
export interface ThemeConfig {
  colors: {
    primary: string; // Brand Color
    accent: string;  // Secondary Color
  };
  font: 'Outfit' | 'Inter' | 'Roboto' | 'Playfair Display' | 'Poppins' | 'Montserrat' | 'Lato' | 'Open Sans';
  radius: '0px' | '0.5rem' | '1rem' | '9999px'; // Square, Small, Large, Pill
  style: 'Default' | 'Minimal' | 'Brutalist' | 'Corporate' | 'Playful';
  layout: 'Standard' | 'Wide' | 'Boxed';
  sections: {
    showHero: boolean;
    showServices: boolean;
    showPortfolio: boolean;
    showShop: boolean;
    showTestimonials: boolean;
    showBlogs: boolean;
    showContact: boolean;
  };
  nav: {
    showHome: boolean;
    showPortfolio: boolean;
    showShop: boolean;
    showContact: boolean;
    showBookCall: boolean;
    showDashboard: boolean;
  };
  pages: {
    portfolioEnabled: boolean;
    shopEnabled: boolean;
    blogEnabled: boolean;
  };
  seo: {
    maintenanceMode: boolean; // If true, show maintenance screen
    preventIndexing: boolean; // If true, add noindex meta tag
  };
  system: {
    adminEnabled: boolean; // Master switch to enable/disable admin panel access
  }
}
