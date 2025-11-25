
import React, { useEffect, useState } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { ArrowLeft, ExternalLink, Calendar, User, Wrench, X, Image as ImageIcon, ZoomIn } from 'lucide-react';
import { getProjectById } from '../services/dataService';
import { Project } from '../types';
import SeoHead from '../components/SeoHead';

const { useParams, Link } = ReactRouterDOM;

const ProjectDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      getProjectById(id).then(data => {
        setProject(data);
        setLoading(false);
      });
    }
  }, [id]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center"><div className="w-10 h-10 border-4 border-brand-500 border-t-transparent rounded-full animate-spin"></div></div>;
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Project Not Found</h2>
        <Link to="/portfolio" className="text-brand-600 font-bold hover:underline">Back to Portfolio</Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pt-24 pb-12">
      <SeoHead 
        title={`${project.title} | Work Details`} 
        description={project.description.slice(0, 150)} 
        image={project.imageUrl}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <Link to="/portfolio" className="inline-flex items-center text-gray-500 hover:text-brand-600 font-medium mb-8 transition">
          <ArrowLeft size={20} className="mr-2" /> Back to Works
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Content Side */}
          <div className="lg:col-span-2 space-y-8">
             {/* Main Image */}
             <div 
               className="rounded-3xl overflow-hidden shadow-xl border border-gray-100 relative group cursor-pointer" 
               onClick={() => setSelectedImage(project.imageUrl)}
             >
                <img src={project.imageUrl} alt={project.title} className="w-full h-auto object-cover" />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                    <span className="bg-white/90 p-3 rounded-full text-gray-900 shadow-lg"><ZoomIn size={24}/></span>
                </div>
             </div>

             {/* Gallery / Album System */}
             {project.images && project.images.length > 0 && (
                <div>
                   <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2"><ImageIcon size={20}/> Project Gallery</h3>
                   <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {project.images.map((img, idx) => (
                         <div 
                           key={idx} 
                           className="relative aspect-square rounded-xl overflow-hidden shadow-sm cursor-pointer border border-gray-100 group" 
                           onClick={() => setSelectedImage(img)}
                         >
                            <img src={img} className="w-full h-full object-cover transition duration-500 group-hover:scale-110" alt={`Detail ${idx+1}`}/>
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition"/>
                         </div>
                      ))}
                   </div>
                </div>
             )}

             <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed whitespace-pre-wrap">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">About the Project</h3>
                {project.description}
             </div>
          </div>

          {/* Details Sidebar */}
          <div className="lg:col-span-1 space-y-8">
             <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 sticky top-24 shadow-sm">
                <span className="inline-block px-3 py-1 rounded-full bg-brand-100 text-brand-600 text-xs font-bold uppercase tracking-wider mb-6">
                   {project.category}
                </span>
                <h1 className="text-3xl font-extrabold text-gray-900 leading-tight mb-6">{project.title}</h1>
                
                <div className="space-y-6 mb-8 border-t border-b border-gray-200 py-6">
                   {project.client && (
                      <div className="flex items-center gap-4 text-gray-700">
                         <div className="p-2 bg-white rounded-lg shadow-sm"><User size={20} className="text-brand-500"/></div>
                         <div>
                            <p className="text-xs font-bold uppercase text-gray-400">Client</p>
                            <p className="font-bold">{project.client}</p>
                         </div>
                      </div>
                   )}
                   {project.date && (
                      <div className="flex items-center gap-4 text-gray-700">
                         <div className="p-2 bg-white rounded-lg shadow-sm"><Calendar size={20} className="text-brand-500"/></div>
                         <div>
                            <p className="text-xs font-bold uppercase text-gray-400">Date</p>
                            <p className="font-bold">{project.date}</p>
                         </div>
                      </div>
                   )}
                   {project.tools && project.tools.length > 0 && (
                      <div className="flex items-start gap-4 text-gray-700">
                         <div className="p-2 bg-white rounded-lg shadow-sm"><Wrench size={20} className="text-brand-500"/></div>
                         <div>
                            <p className="text-xs font-bold uppercase text-gray-400 mb-2">Tools Used</p>
                            <div className="flex flex-wrap gap-2">
                               {project.tools.map(tool => (
                                  <span key={tool} className="bg-white border border-gray-200 px-2 py-1 rounded text-xs font-bold shadow-sm">{tool}</span>
                               ))}
                            </div>
                         </div>
                      </div>
                   )}
                </div>

                {project.liveLink && (
                   <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-brand-600 transition flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-1">
                      Visit Live Site <ExternalLink size={20}/>
                   </a>
                )}
             </div>
          </div>

        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
         <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300" onClick={() => setSelectedImage(null)}>
            <button className="absolute top-6 right-6 text-white hover:text-gray-300 transition bg-white/10 p-2 rounded-full">
               <X size={32}/>
            </button>
            <img 
               src={selectedImage} 
               alt="Fullscreen" 
               className="max-w-full max-h-[90vh] rounded-lg shadow-2xl animate-in zoom-in-95 duration-300"
               onClick={(e) => e.stopPropagation()} 
            />
         </div>
      )}
    </div>
  );
};

export default ProjectDetailsPage;