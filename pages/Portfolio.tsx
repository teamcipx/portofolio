import React, { useState, useEffect } from 'react';
import { getProjects } from '../services/dataService';
import { Project } from '../types';
import { Image as ImageIcon, ArrowRight, Layers, LayoutGrid } from 'lucide-react';
import SeoHead from '../components/SeoHead';
import * as ReactRouterDOM from 'react-router-dom';

const { Link } = ReactRouterDOM;

const Portfolio: React.FC = () => {
  const [filter, setFilter] = useState('All');
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      getProjects().then(data => {
          setProjects(data);
          setLoading(false);
      });
  }, []);

  const categories = ['All', ...Array.from(new Set(projects.map(p => p.category)))];
  
  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.category === filter);

  // Create Structured Data
  const structuredData = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": filteredProjects.map((project, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "CreativeWork",
        "name": project.title,
        "image": project.imageUrl,
        "description": project.description,
        "creator": { "@type": "Person", "name": "Ali Hossn" }
      }
    }))
  });

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8 pt-24">
      <SeoHead 
        title="Portfolio | Ali Hossn - Video Editor & Marketer" 
        description="Explore my professional portfolio featuring SEO results, high-retention video editing, social media branding, and digital marketing campaigns."
        keywords="video editing portfolio, seo case studies, digital marketing results, branding design, premiere pro expert, after effects portfolio"
        schema={structuredData}
      />
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">Selected Works</h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            A curated collection of projects that delivered real results.
          </p>
        </div>

        {/* Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-16 animate-in fade-in slide-in-from-bottom-4 delay-100">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 border ${
                filter === cat 
                  ? 'bg-gray-900 text-white border-gray-900 shadow-lg transform scale-105' 
                  : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        {loading ? (
            <div className="flex justify-center py-32"><div className="w-12 h-12 border-4 border-gray-200 border-t-brand-600 rounded-full animate-spin"></div></div>
        ) : filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {filteredProjects.map((project, idx) => (
                <Link 
                  to={`/work/${project.id}`} 
                  key={project.id} 
                  className="group block h-full animate-in fade-in slide-in-from-bottom-8 fill-mode-backwards"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                    <div className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-gray-100 hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-500 h-full flex flex-col">
                        <div className="relative overflow-hidden aspect-[4/3]">
                            <img 
                              src={project.imageUrl} 
                              alt={project.title} 
                              className="w-full h-full object-cover transform group-hover:scale-105 transition duration-700 ease-out"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gray-900/60 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center backdrop-blur-[2px]">
                                <span className="bg-white text-gray-900 px-6 py-3 rounded-full font-bold flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition duration-300 shadow-xl">
                                    View Project <ArrowRight size={16}/>
                                </span>
                            </div>
                            {/* Album Badge */}
                            {project.images && project.images.length > 0 && (
                                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full text-white text-xs font-bold flex items-center gap-1.5 border border-white/10">
                                    <Layers size={12}/> {project.images.length + 1}
                                </div>
                            )}
                        </div>
                        <div className="p-8 flex-1 flex flex-col justify-between">
                            <div>
                               <div className="flex justify-between items-start mb-2">
                                  <p className="text-xs font-bold text-brand-600 uppercase tracking-widest">{project.category}</p>
                                  {project.date && <p className="text-xs text-gray-400 font-medium">{project.date.split('/')[2]}</p>}
                               </div>
                               <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-brand-600 transition leading-tight">{project.title}</h3>
                               <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed">{project.description}</p>
                            </div>
                            <div className="mt-6 pt-6 border-t border-gray-100 flex items-center text-sm font-bold text-gray-900 group-hover:text-brand-600 transition">
                               Read Case Study <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-1 transition"/>
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
            </div>
        ) : (
            <div className="text-center py-32 bg-white rounded-[3rem] border border-dashed border-gray-200">
                <LayoutGrid className="mx-auto h-16 w-16 text-gray-200 mb-6"/>
                <h3 className="text-2xl font-bold text-gray-900">No Projects Found</h3>
                <p className="text-gray-500 mt-2">Try selecting a different category.</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default Portfolio;