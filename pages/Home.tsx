import React from 'react';
import { ArrowRight, Download, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CV_URL, PROJECTS, TESTIMONIALS } from '../constants';

const Home: React.FC = () => {
  return (
    <div className="animate-in fade-in duration-500">
      {/* Hero Section */}
      <section className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32 pt-20 px-4 sm:px-6 lg:px-8">
            <main className="mt-10 mx-auto max-w-7xl sm:mt-12 md:mt-16 lg:mt-20 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <span className="inline-block py-1 px-3 rounded-full bg-brand-50 text-brand-600 text-sm font-semibold mb-4">
                  Available for Freelance
                </span>
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block xl:inline">Creative Design that</span>{' '}
                  <span className="block text-brand-600 xl:inline">Inspires Action</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Hi, I'm Siam Hasan. I craft visually stunning brand identities, intuitive user interfaces, and digital art that helps businesses stand out.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start gap-4">
                  <div className="rounded-md shadow">
                    <Link to="/portfolio" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-brand-600 hover:bg-brand-700 md:py-4 md:text-lg transition">
                      View Portfolio
                    </Link>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <a href={CV_URL} target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center px-8 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 md:py-4 md:text-lg transition gap-2">
                      <Download size={20} />
                      Download CV
                    </a>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 bg-gray-50">
          <img
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full opacity-90"
            src="https://picsum.photos/1000/1000?random=99"
            alt="Designer workspace"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white to-transparent lg:via-white/20"></div>
        </div>
      </section>

      {/* Featured Projects Preview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Featured Work</h2>
              <p className="mt-2 text-gray-600">A glimpse into my latest creations.</p>
            </div>
            <Link to="/portfolio" className="hidden sm:flex items-center text-brand-600 hover:text-brand-700 font-medium group">
              View All <ArrowRight className="ml-2 group-hover:translate-x-1 transition" size={20} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PROJECTS.slice(0, 3).map((project) => (
              <div key={project.id} className="group relative overflow-hidden rounded-2xl shadow-lg bg-white">
                <div className="aspect-w-4 aspect-h-3">
                  <img 
                    src={project.imageUrl} 
                    alt={project.title} 
                    className="object-cover w-full h-64 group-hover:scale-105 transition duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-end p-6">
                  <span className="text-brand-400 text-sm font-medium">{project.category}</span>
                  <h3 className="text-white text-xl font-bold">{project.title}</h3>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 sm:hidden text-center">
            <Link to="/portfolio" className="text-brand-600 font-medium">View All Projects &rarr;</Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Client Testimonials</h2>
            <p className="mt-2 text-gray-600">What people say about working with me.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t) => (
              <div key={t.id} className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
                <div className="flex gap-1 text-yellow-400 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <p className="text-gray-700 italic mb-6">"{t.content}"</p>
                <div className="flex items-center gap-4">
                  <img src={t.avatarUrl} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <h4 className="font-bold text-gray-900">{t.name}</h4>
                    <p className="text-sm text-gray-500">{t.role}, {t.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="bg-brand-600 py-20">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Ready to start your next project?</h2>
          <p className="text-brand-100 text-lg mb-8">Let's turn your vision into a reality together. Available for new collaborations.</p>
          <Link to="/contact" className="inline-block bg-white text-brand-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-brand-50 transition shadow-lg">
            Let's Talk
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;