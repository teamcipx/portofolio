
import React from 'react';
import { ArrowRight, Download, Star, PlayCircle, Palette, Layers, MousePointer2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CV_URL, PROJECTS, TESTIMONIALS } from '../constants';

const Home: React.FC = () => {
  return (
    <div className="animate-in fade-in duration-500">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-brand-50/50 to-white overflow-hidden">
        {/* Background Blobs */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[40rem] h-[40rem] rounded-full bg-brand-200/40 mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[35rem] h-[35rem] rounded-full bg-accent-200/40 mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        
        <div className="max-w-7xl mx-auto pt-32 pb-24 px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-center">
            <div className="lg:col-span-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-brand-100 shadow-sm text-sm font-semibold text-brand-600 mb-8 animate-in slide-in-from-bottom-2 fade-in duration-700">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
                </span>
                Available for Freelance Projects
              </div>
              
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 mb-6 leading-[1.1]">
                Designing the <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-accent-500">Future of Digital</span>
              </h1>
              
              <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0 mb-10 leading-relaxed">
                I'm Siam Hasan. I craft immersive brand identities and intuitive digital experiences that captivate audiences and drive growth.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                <Link to="/portfolio" className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-bold rounded-full text-white bg-gray-900 hover:bg-brand-600 transition-all transform hover:-translate-y-1 shadow-xl shadow-gray-900/20 hover:shadow-brand-500/30">
                  View Portfolio
                </Link>
                <a href={CV_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-8 py-4 border border-gray-200 text-lg font-bold rounded-full text-gray-700 bg-white hover:bg-gray-50 transition gap-2 shadow-sm hover:shadow-md">
                  <Download size={20} />
                  Download CV
                </a>
              </div>
              
              <div className="mt-12 flex items-center justify-center lg:justify-start gap-8 text-gray-400 font-medium">
                 <div className="flex items-center gap-2 hover:text-brand-500 transition"><Palette size={20}/> Branding</div>
                 <div className="flex items-center gap-2 hover:text-brand-500 transition"><PlayCircle size={20}/> Motion</div>
                 <div className="flex items-center gap-2 hover:text-brand-500 transition"><Layers size={20}/> UI/UX</div>
              </div>
            </div>
            
            <div className="lg:col-span-6 mt-16 lg:mt-0 relative">
               <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl shadow-brand-500/20 transform rotate-2 hover:rotate-0 transition duration-700 ease-out border-8 border-white bg-white">
                  <img
                    className="w-full h-auto object-cover scale-105 hover:scale-100 transition duration-700"
                    src="https://picsum.photos/800/800?random=99"
                    alt="Designer workspace"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-8 left-8 right-8">
                     <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl text-white">
                        <p className="font-bold text-xl mb-1">Neon City Project</p>
                        <p className="text-white/80 text-sm">3D Illustration & Motion Design</p>
                     </div>
                  </div>
               </div>
               
               {/* Floating Stats */}
               <div className="absolute -top-6 -right-6 bg-white p-4 rounded-2xl shadow-xl border border-gray-100 flex flex-col items-center animate-bounce" style={{ animationDuration: '4s' }}>
                  <div className="bg-accent-100 p-3 rounded-full text-accent-600 mb-2">
                    <MousePointer2 fill="currentColor" size={24} />
                  </div>
                  <p className="font-bold text-gray-900 text-lg">120+</p>
                  <p className="text-xs text-gray-500 font-medium">Projects Done</p>
               </div>

               <div className="absolute top-1/2 -left-12 bg-white p-4 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-3 animate-pulse hidden lg:flex">
                  <div className="bg-yellow-100 p-2 rounded-full text-yellow-600">
                    <Star fill="currentColor" size={24} />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">5.0 Rating</p>
                    <p className="text-xs text-gray-500">Client Satisfaction</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Preview */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <span className="text-brand-500 font-bold tracking-wider uppercase text-sm">Selected Works</span>
              <h2 className="text-4xl font-extrabold text-gray-900 mt-2">Featured Projects</h2>
            </div>
            <Link to="/portfolio" className="flex items-center px-6 py-3 rounded-full bg-gray-50 text-gray-900 hover:bg-brand-50 hover:text-brand-600 font-semibold group transition">
              View All Works <ArrowRight className="ml-2 group-hover:translate-x-1 transition" size={20} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PROJECTS.slice(0, 3).map((project) => (
              <div key={project.id} className="group relative cursor-pointer">
                <div className="relative overflow-hidden rounded-2xl shadow-sm bg-gray-100 mb-4 aspect-[4/3]">
                  <img 
                    src={project.imageUrl} 
                    alt={project.title} 
                    className="object-cover w-full h-full group-hover:scale-110 transition duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
                     <div className="bg-white p-4 rounded-full text-gray-900 transform translate-y-4 group-hover:translate-y-0 transition duration-300">
                        <ArrowRight size={24} className="-rotate-45" />
                     </div>
                  </div>
                </div>
                <div>
                  <span className="text-brand-600 text-xs font-bold uppercase tracking-wide">{project.category}</span>
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-brand-600 transition mt-1">{project.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-gray-50 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Client Love</h2>
            <p className="text-xl text-gray-500">Don't just take my word for it. Here is what industry leaders say about my work.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t) => (
              <div key={t.id} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl hover:shadow-brand-100/50 transition duration-300 relative group">
                <div className="absolute -top-4 -right-4 bg-gradient-to-br from-brand-400 to-brand-600 w-12 h-12 rounded-full flex items-center justify-center text-white text-2xl font-serif transform group-hover:rotate-12 transition">"</div>
                <div className="flex gap-1 text-yellow-400 mb-6">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <p className="text-gray-700 text-lg leading-relaxed mb-8 italic">"{t.content}"</p>
                <div className="flex items-center gap-4 pt-6 border-t border-gray-50">
                  <img src={t.avatarUrl} alt={t.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-brand-100" />
                  <div>
                    <h4 className="font-bold text-gray-900 text-base">{t.name}</h4>
                    <p className="text-xs text-brand-600 font-bold uppercase tracking-wide">{t.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto bg-gray-900 rounded-[2.5rem] p-12 md:p-24 text-center relative overflow-hidden shadow-2xl shadow-gray-900/30">
          {/* Decor */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/20 rounded-full -mr-20 -mt-20 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-500/20 rounded-full -ml-20 -mb-20 blur-3xl"></div>
          
          <div className="relative z-10">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-8 tracking-tight">Let's build something <br/> <span className="text-brand-400">extraordinary.</span></h2>
            <p className="text-gray-400 text-xl mb-12 max-w-2xl mx-auto">Available for new freelance opportunities and collaborations. Let's turn your vision into a reality.</p>
            <Link to="/contact" className="inline-block bg-white text-gray-900 px-10 py-5 rounded-full font-bold text-lg hover:bg-brand-50 hover:text-brand-600 transition shadow-xl hover:shadow-2xl hover:scale-105 transform duration-200">
              Start a Project
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
