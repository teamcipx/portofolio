
import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import * as ReactRouterDOM from 'react-router-dom';

const { Link } = ReactRouterDOM;

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark-bg text-dark-text py-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-2xl font-bold mb-4 text-white">Ali Hossn</h2>
            <p className="text-dark-muted max-w-sm">
              Elevating brands with data-driven marketing, SEO strategies, and compelling video content.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-dark-muted hover:text-brand-400 transition transform hover:scale-110"><Facebook size={20} /></a>
              <a href="#" className="text-dark-muted hover:text-brand-400 transition transform hover:scale-110"><Twitter size={20} /></a>
              <a href="#" className="text-dark-muted hover:text-brand-400 transition transform hover:scale-110"><Instagram size={20} /></a>
              <a href="#" className="text-dark-muted hover:text-brand-400 transition transform hover:scale-110"><Linkedin size={20} /></a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2 text-dark-muted">
              <li><Link to="/" className="hover:text-brand-500 transition">Home</Link></li>
              <li><Link to="/portfolio" className="hover:text-brand-500 transition">Portfolio</Link></li>
              <li><Link to="/shop" className="hover:text-brand-500 transition">Shop Assets</Link></li>
              <li><Link to="/contact" className="hover:text-brand-500 transition">Contact Me</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Get in Touch</h3>
            <ul className="space-y-3 text-dark-muted">
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-brand-500" />
                <a href="mailto:helllo.alihosen@gmail.com" className="hover:text-white transition">helllo.alihosen@gmail.com</a>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-brand-500" />
                <a href="tel:+8801781146747" className="hover:text-white transition">01781146747</a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={16} className="text-brand-500 mt-1" />
                <span>Sherpur, Mymensingh, BD<br/><span className="text-xs text-gray-500">Available Remote Worldwide</span></span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-dark-muted text-sm">
          &copy; {new Date().getFullYear()} Ali Hossn. All rights reserved. Designed & Built by Ali.
        </div>
      </div>
    </footer>
  );
};

export default Footer;