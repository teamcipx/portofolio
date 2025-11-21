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
  role: UserRole;
}