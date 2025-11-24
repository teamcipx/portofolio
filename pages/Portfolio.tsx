
import React, { useState, useEffect } from 'react';
import { getProjects } from '../services/dataService';
import { Project } from '../types';
import { Image as ImageIcon, ArrowRight, Layers } from 'lucide-react';
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

  // Create Structured Data for ItemList (Portfolio)
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
        "genre": project.category,
        "creator": {
          "@type": "Person",
          "name": "Ali Hossn"
        }
      }
    }))
  });

  return (
    <div className="bg-white min-h-screen py-12 px-4 sm:px-6 lg:px-8 pt-24">
      <SeoHead 
        title="Portfolio | Ali Hossn - Video Editor & Marketer" 
        description="Explore my professional portfolio featuring SEO results, high-retention video editing, social media branding, and digital marketing campaigns."
        keywords="video editing portfolio, seo case studies, digital marketing results, branding design, premiere pro expert, after effects portfolio, ali hossn work"
        schema={structuredData}
      />
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">My Portfolio</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A selection of my best work across branding, video production, and digital marketing.
          </p>
        </div>

        {/* Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                filter === cat 
                  ? 'bg-brand-600 text-white shadow-md transform scale-105' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        {loading ? (
            <div className="flex justify-center py-20"><div className="w-10 h-10 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin"></div></div>
        ) : filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
                <Link to={`/work/${project.id}`} key={project.id} className="group cursor-pointer block h-full flex flex-col">
                    <div className="relative overflow-hidden rounded-2xl shadow-sm mb-4 aspect-[4/3] border border-gray-100 bg-gray-50">
                        <img 
                        src={project.imageUrl} 
                        alt={project.title} 
                        className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700"
                        loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center backdrop-blur-sm">
                            <span className="text-white border-2 border-white px-6 py-2 rounded-full font-bold flex items-center gap-2 hover:bg-white hover:text-black transition">
                                View Case Study <ArrowRight size={16}/>
                            </span>
                        </div>
                        {/* Multiple Images Badge */}
                        {project.images && project.images.length > 0 && (
                            <div className="absolute top-3 right-3 bg-black/60 backdrop-blur px-3 py-1.5 rounded-lg text-white text-xs font-bold flex items-center gap-1.5 border border-white/20">
                                <Layers size={14}/> {project.images.length + 1}
                            </div>
                        )}
                    </div>
                    <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-brand-600 transition">{project.title}</h3>
                        <p className="text-sm text-gray-500 mt-1 uppercase tracking-wide font-medium">{project.category}</p>
                    </div>
                </Link>
            ))}
            </div>
        ) : (
            <div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
                <ImageIcon className="mx-auto h-16 w-16 text-gray-300 mb-4"/>
                <h3 className="text-xl font-bold text-gray-900">No Projects Found</h3>
                <p className="text-gray-500 mt-2">Upload your first project from the Admin Dashboard.</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default Portfolio;
