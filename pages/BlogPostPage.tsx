
import React, { useEffect, useState } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { Calendar, Clock, Facebook, Twitter, Linkedin, Link as LinkIcon, ArrowLeft, Share2 } from 'lucide-react';
import { getBlogById } from '../services/dataService';
import { BlogPost } from '../types';
import SeoHead from '../components/SeoHead';

const { useParams, Link } = ReactRouterDOM;

const BlogPostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [showShare, setShowShare] = useState(false);

  useEffect(() => {
    if (id) {
      getBlogById(id).then(data => {
        setPost(data);
        setLoading(false);
      });
    }
  }, [id]);

  const handleShare = (platform: string) => {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(post?.title || '');

    if (platform === 'facebook') window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
    if (platform === 'twitter') window.open(`https://twitter.com/intent/tweet?url=${url}&text=${title}`, '_blank');
    if (platform === 'linkedin') window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}`, '_blank');
    if (platform === 'copy') {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center"><div className="w-10 h-10 border-4 border-brand-500 border-t-transparent rounded-full animate-spin"></div></div>;
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Article Not Found</h2>
        <Link to="/" className="text-brand-600 font-bold hover:underline">Return Home</Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pt-24 pb-12">
      <SeoHead 
        title={`${post.title} | Siam Hasan`} 
        description={post.excerpt} 
        image={post.imageUrl}
        url={window.location.href}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <Link to="/" className="inline-flex items-center text-gray-500 hover:text-brand-600 font-medium mb-8 transition">
          <ArrowLeft size={20} className="mr-2" /> Back to Home
        </Link>

        <div className="space-y-6 mb-12">
          <span className="inline-block px-3 py-1 rounded-full bg-brand-50 text-brand-600 text-xs font-bold uppercase tracking-wider">
            {post.category}
          </span>
          
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-gray-500 text-sm">
            <span className="flex items-center gap-2"><Calendar size={16} /> {post.date}</span>
            <span className="flex items-center gap-2"><Clock size={16} /> {post.readTime}</span>
            
            {/* Share Dropdown */}
            <div className="relative">
               <button 
                 onClick={() => setShowShare(!showShare)}
                 className="flex items-center gap-2 text-brand-600 font-bold hover:bg-brand-50 px-3 py-1 rounded-full transition"
               >
                 <Share2 size={16}/> Share
               </button>
               
               {showShare && (
                 <div className="absolute top-10 left-0 bg-white shadow-xl rounded-xl p-2 border border-gray-100 flex gap-2 z-20 animate-in fade-in slide-in-from-top-2">
                    <button onClick={() => handleShare('facebook')} className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg"><Facebook size={20}/></button>
                    <button onClick={() => handleShare('twitter')} className="p-2 hover:bg-sky-50 text-sky-500 rounded-lg"><Twitter size={20}/></button>
                    <button onClick={() => handleShare('linkedin')} className="p-2 hover:bg-blue-50 text-blue-700 rounded-lg"><Linkedin size={20}/></button>
                    <button onClick={() => handleShare('copy')} className="p-2 hover:bg-gray-50 text-gray-600 rounded-lg"><LinkIcon size={20}/></button>
                 </div>
               )}
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="rounded-3xl overflow-hidden shadow-xl mb-12">
          <img src={post.imageUrl} alt={post.title} className="w-full h-[400px] object-cover hover:scale-105 transition duration-700"/>
        </div>

        {/* Content */}
        <article className="prose prose-lg prose-indigo max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap">
           {post.content || post.excerpt}
        </article>

        {/* Author Box */}
        <div className="mt-16 pt-8 border-t border-gray-100 flex items-center gap-4">
           <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" className="w-16 h-16 rounded-full object-cover" alt="Siam"/>
           <div>
              <h4 className="font-bold text-gray-900">Written by Siam Hasan</h4>
              <p className="text-gray-500 text-sm">Senior Product Designer & Developer</p>
           </div>
        </div>

      </div>
    </div>
  );
};

export default BlogPostPage;
