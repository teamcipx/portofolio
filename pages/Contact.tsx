
import React, { useState } from 'react';
import { Mail, Globe, MapPin, Send, Clock, ArrowRight, Phone } from 'lucide-react';
import SeoHead from '../components/SeoHead';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="bg-white min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <SeoHead 
        title="Contact Ali Hossn | Hire a Marketer" 
        description="Get in touch with Ali Hossn for Digital Marketing, Video Editing, and SEO projects."
      />
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
           <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Let's Work Together</h1>
           <p className="text-xl text-gray-600 max-w-2xl mx-auto">
             Have a project in mind? I'm currently accepting new clients for SEO & Video Editing.
           </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Info Side */}
          <div className="flex flex-col justify-center space-y-8 animate-in slide-in-from-left-4 duration-700 delay-150">
            
            <div className="bg-gray-50 p-6 rounded-2xl flex items-start gap-4 border border-gray-100 hover:shadow-md transition group">
                <div className="bg-brand-100 p-3 rounded-xl text-brand-600 group-hover:bg-brand-600 group-hover:text-white transition-colors">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">Direct Email</h3>
                  <p className="text-gray-600 mb-1">For project inquiries, quotes, and collaborations:</p>
                  <a href="mailto:helllo.alihosen@gmail.com" className="text-brand-600 font-bold hover:underline text-lg">helllo.alihosen@gmail.com</a>
                </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-2xl flex items-start gap-4 border border-gray-100 hover:shadow-md transition group">
                <div className="bg-brand-100 p-3 rounded-xl text-brand-600 group-hover:bg-brand-600 group-hover:text-white transition-colors">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">Phone / WhatsApp</h3>
                  <p className="text-gray-600 mb-1">Call me directly:</p>
                  <a href="tel:+8801781146747" className="text-brand-600 font-bold hover:underline text-lg">01781146747</a>
                </div>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-2xl flex items-start gap-4 border border-gray-100 hover:shadow-md transition group">
                <div className="bg-brand-100 p-3 rounded-xl text-brand-600 group-hover:bg-brand-600 group-hover:text-white transition-colors">
                  <Globe size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">Social Presence</h3>
                  <p className="text-gray-600 mb-3">Follow my creative journey & daily updates:</p>
                  <div className="flex gap-4 text-sm font-medium text-gray-500">
                    <a href="#" className="hover:text-brand-600 transition flex items-center gap-1">LinkedIn <ArrowRight size={12}/></a>
                    <a href="#" className="hover:text-brand-600 transition flex items-center gap-1">Facebook <ArrowRight size={12}/></a>
                    <a href="#" className="hover:text-brand-600 transition flex items-center gap-1">YouTube <ArrowRight size={12}/></a>
                  </div>
                </div>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-2xl flex items-start gap-4 border border-gray-100 hover:shadow-md transition group">
                <div className="bg-brand-100 p-3 rounded-xl text-brand-600 group-hover:bg-brand-600 group-hover:text-white transition-colors">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">Location</h3>
                  <p className="text-gray-600">Sherpur, Mymensingh, Bangladesh</p>
                  <p className="text-sm text-brand-600 font-medium mt-1 flex items-center gap-1">
                    <Clock size={14}/> Available for Remote Work
                  </p>
                </div>
            </div>

          </div>

          {/* Form Side */}
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 animate-in slide-in-from-right-4 duration-700 delay-150">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Your Name</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition"
                  placeholder="John Doe"
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition"
                  placeholder="john@company.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">How can I help?</label>
                <textarea 
                  rows={4} 
                  required
                  value={formData.message}
                  onChange={e => setFormData({...formData, message: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition"
                  placeholder="Tell me about your project goals, timeline, and budget..."
                />
              </div>

              <button 
                type="submit" 
                className="w-full bg-gradient-to-r from-brand-600 to-accent-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:scale-[1.02] transition-all duration-200 flex items-center justify-center gap-2"
              >
                {submitted ? 'Message Sent Successfully!' : (
                  <>Send Message <Send size={20} /></>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
