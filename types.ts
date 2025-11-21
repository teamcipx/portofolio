
export interface Project {
  id: string;
  title: string;
  category: 'Branding' | 'Web Design' | 'Illustration' | 'Social Media';
  imageUrl: string;
  description: string;
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
  date: string;
  readTime: string;
  imageUrl: string;
  category: string;
}