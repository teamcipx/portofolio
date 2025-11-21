import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark-bg text-dark-text py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-2xl font-bold mb-4">Siam Hasan</h2>
            <p className="text-dark-muted max-w-sm">
              Creating visual experiences that matter. Specialized in branding, UI/UX, and digital art.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-dark-muted hover:text-white transition"><Facebook size={20} /></a>
              <a href="#" className="text-dark-muted hover:text-white transition"><Twitter size={20} /></a>
              <a href="#" className="text-dark-muted hover:text-white transition"><Instagram size={20} /></a>
              <a href="#" className="text-dark-muted hover:text-white transition"><Linkedin size={20} /></a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2 text-dark-muted">
              <li><a href="#/" className="hover:text-brand-500 transition">Home</a></li>
              <li><a href="#/portfolio" className="hover:text-brand-500 transition">Portfolio</a></li>
              <li><a href="#/shop" className="hover:text-brand-500 transition">Shop Courses</a></li>
              <li><a href="#/contact" className="hover:text-brand-500 transition">Contact</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Contact</h3>
            <ul className="space-y-2 text-dark-muted">
              <li className="flex items-center gap-2">
                <Mail size={16} />
                <span>hello@siamhasan.design</span>
              </li>
              <li>New York, NY 10012</li>
              <li>+1 (555) 123-4567</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-dark-muted text-sm">
          &copy; {new Date().getFullYear()} Siam Hasan. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;