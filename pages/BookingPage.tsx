
import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, User, Mail, CheckCircle, ArrowRight, Video, Loader2 } from 'lucide-react';
import SeoHead from '../components/SeoHead';
import { createBooking } from '../services/dataService';
import { Booking } from '../types';

const BookingPage: React.FC = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    date: '',
    time: '',
    topic: 'SEO Consultation'
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    const newBooking: Booking = {
      ...form,
      status: 'scheduled',
      createdAt: new Date().toISOString()
    };

    try {
      await createBooking(newBooking);
      setTimeout(() => setStatus('success'), 1500);
    } catch (error) {
      console.error("Booking failed", error);
      alert("Failed to book appointment. Please try again.");
      setStatus('idle');
    }
  };

  if (status === 'success') {
    return (
      <div className="min-h-screen pt-24 pb-12 flex items-center justify-center bg-gray-50 px-4">
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 text-center max-w-md w-full animate-in zoom-in duration-300">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
            <CheckCircle size={40} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h2>
          <p className="text-gray-500 mb-6">We have received your request. A confirmation email with the Zoom link will be sent to <strong>{form.email}</strong>.</p>
          <button onClick={() => window.location.reload()} className="w-full bg-gray-900 text-white py-3 rounded-xl font-bold hover:bg-gray-800">Book Another</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6">
      <SeoHead title="Book a Consultation | Ali Hossn" description="Schedule a video call to discuss your project." />
      
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-brand-500 font-bold tracking-wider uppercase text-sm">Appointment</span>
          <h1 className="text-4xl font-bold text-gray-900 mt-2">Book a Free Discovery Call</h1>
          <p className="text-xl text-gray-600 mt-4 max-w-2xl mx-auto">
            Let's discuss your project goals via Zoom/Google Meet. 30 Minutes, No obligation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
           {/* Benefits Side */}
           <div className="lg:col-span-2 space-y-6">
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                 <h3 className="font-bold text-gray-900 text-lg mb-4 flex items-center gap-2"><Video size={20} className="text-brand-600"/> What we'll cover:</h3>
                 <ul className="space-y-3">
                    {['Project requirements & Budget', 'SEO Strategy Audit', 'Video Editing Style', 'Timeline & Deliverables'].map((item, i) => (
                        <li key={i} className="flex items-center gap-2 text-gray-600 text-sm">
                            <CheckCircle size={16} className="text-green-500 shrink-0"/> {item}
                        </li>
                    ))}
                 </ul>
              </div>
              
              <div className="bg-gradient-to-br from-brand-600 to-accent-600 p-6 rounded-2xl text-white shadow-lg">
                  <h3 className="font-bold text-lg mb-2">Availability</h3>
                  <p className="opacity-90 text-sm mb-4">Monday - Friday<br/>10:00 AM - 8:00 PM (GMT+6)</p>
                  <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-lg text-xs font-bold">
                      <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span> Currently Accepting New Clients
                  </div>
              </div>
           </div>

           {/* Form Side */}
           <div className="lg:col-span-3 bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                       <label className="block text-sm font-bold text-gray-700 mb-2">Date</label>
                       <div className="relative">
                          <CalendarIcon className="absolute left-3 top-3 text-gray-400" size={18}/>
                          <input 
                            type="date" 
                            required
                            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 ring-brand-500 outline-none"
                            value={form.date}
                            onChange={e => setForm({...form, date: e.target.value})}
                          />
                       </div>
                    </div>
                    <div>
                       <label className="block text-sm font-bold text-gray-700 mb-2">Time</label>
                       <div className="relative">
                          <Clock className="absolute left-3 top-3 text-gray-400" size={18}/>
                          <input 
                            type="time" 
                            required
                            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 ring-brand-500 outline-none"
                            value={form.time}
                            onChange={e => setForm({...form, time: e.target.value})}
                          />
                       </div>
                    </div>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                       <label className="block text-sm font-bold text-gray-700 mb-2">Your Name</label>
                       <div className="relative">
                          <User className="absolute left-3 top-3 text-gray-400" size={18}/>
                          <input 
                            type="text" 
                            required
                            placeholder="John Doe"
                            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 ring-brand-500 outline-none"
                            value={form.name}
                            onChange={e => setForm({...form, name: e.target.value})}
                          />
                       </div>
                    </div>
                    <div>
                       <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                       <div className="relative">
                          <Mail className="absolute left-3 top-3 text-gray-400" size={18}/>
                          <input 
                            type="email" 
                            required
                            placeholder="john@company.com"
                            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 ring-brand-500 outline-none"
                            value={form.email}
                            onChange={e => setForm({...form, email: e.target.value})}
                          />
                       </div>
                    </div>
                 </div>

                 <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Topic</label>
                    <select 
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 ring-brand-500 outline-none"
                      value={form.topic}
                      onChange={e => setForm({...form, topic: e.target.value})}
                    >
                       <option>SEO Consultation</option>
                       <option>Video Editing Project</option>
                       <option>Digital Marketing Strategy</option>
                       <option>General Inquiry</option>
                    </select>
                 </div>

                 <button type="submit" disabled={status === 'submitting'} className="w-full bg-brand-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-brand-700 transition flex items-center justify-center gap-2 shadow-lg hover:shadow-brand-500/30">
                    {status === 'submitting' ? <Loader2 className="animate-spin"/> : <>Schedule Meeting <ArrowRight size={20} /></>}
                 </button>
              </form>
           </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
