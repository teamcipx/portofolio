
import React, { useEffect, useState } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { Calendar, Clock, Facebook, Twitter, Linkedin, Link as LinkIcon, ArrowLeft, Share2, User } from 'lucide-react';
import { getBlogById, getProfileSettings } from '../services/dataService';
import { BlogPost } from '../types';
import SeoHead from '../components/SeoHead';

const { useParams, Link } = ReactRouterDOM;

const BlogPostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [showShare, setShowShare] = useState(false);
  const [authorPic, setAuthorPic] = useState("https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80");

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const [blogData, profileData] = await Promise.all([
          getBlogById(id),
          getProfileSettings()
        ]);
        
        setPost(blogData);
        if (profileData && profileData.profilePic) {
          setAuthorPic(profileData.profilePic);
        }
        setLoading(false);
      }
    };
    fetchData();
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

  // JSON-LD Structured Data for Blog Post
  const structuredData = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "image": [post.imageUrl],
    "datePublished": post.date, 
    "dateModified": post.date,
    "author": [{
      "@type": "Person",
      "name": "Ali Hossn",
      "image": authorPic,
      "url": window.location.origin
    }],
    "publisher": {
      "@type": "Organization",
      "name": "Ali Hossn Digital",
      "logo": {
        "@type": "ImageObject",
        "url": authorPic
      }
    },
    "description": post.excerpt,
    "articleBody": post.content || post.excerpt
  });

  return (
    <div className="bg-white min-h-screen pt-24 pb-12">
      <SeoHead 
        title={`${post.title} | Ali Hossn`} 
        description={post.excerpt} 
        image={post.imageUrl}
        url={window.location.href}
        type="article"
        schema={structuredData}
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <Link to="/" className="inline-flex items-center text-gray-500 hover:text-brand-600 font-medium mb-8 transition">
          <ArrowLeft size={20} className="mr-2" /> Back to Home
        </Link>

        <div className="space-y-6 mb-10">
          <span className="inline-block px-3 py-1 rounded-full bg-brand-50 text-brand-600 text-xs font-bold uppercase tracking-wider">
            {post.category}
          </span>
          
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 pb-6">
            <div className="flex items-center gap-4">
               <img src={authorPic} className="w-10 h-10 rounded-full object-cover border border-gray-200" alt="Ali Hossn"/>
               <div className="text-sm">
                  <p className="font-bold text-gray-900">Ali Hossn</p>
                  <div className="flex gap-2 text-gray-500 text-xs">
                    <span>{post.date}</span>
                    <span>• {post.readTime}</span>
                  </div>
               </div>
            </div>
            
            {/* Share Dropdown */}
            <div className="relative group">
               <button 
                 onClick={() => setShowShare(!showShare)}
                 className="flex items-center gap-2 text-gray-500 font-bold hover:text-brand-600 transition"
               >
                 <Share2 size={18}/> Share Article
               </button>
               
               <div className="hidden group-hover:flex absolute top-6 right-0 bg-white shadow-xl rounded-xl p-2 border border-gray-100 gap-2 z-20 animate-in fade-in slide-in-from-top-2">
                  <button onClick={() => handleShare('facebook')} className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg"><Facebook size={20}/></button>
                  <button onClick={() => handleShare('twitter')} className="p-2 hover:bg-sky-50 text-sky-500 rounded-lg"><Twitter size={20}/></button>
                  <button onClick={() => handleShare('linkedin')} className="p-2 hover:bg-blue-50 text-blue-700 rounded-lg"><Linkedin size={20}/></button>
                  <button onClick={() => handleShare('copy')} className="p-2 hover:bg-gray-50 text-gray-600 rounded-lg"><LinkIcon size={20}/></button>
               </div>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="rounded-2xl overflow-hidden shadow-lg mb-12 border border-gray-100">
          <img src={post.imageUrl} alt={post.title} className="w-full max-h-[500px] object-cover hover:scale-105 transition duration-700"/>
        </div>

        {/* Content */}
        <article className="prose prose-lg prose-indigo max-w-none text-gray-800 leading-relaxed whitespace-pre-wrap font-serif">
           {post.content || post.excerpt}
        </article>

        {/* Author Box Footer */}
        <div className="mt-16 p-8 bg-gray-50 rounded-3xl flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
           <div className="w-20 h-20 shrink-0 rounded-full overflow-hidden border-4 border-white shadow-md">
             <img src={authorPic} className="w-full h-full object-cover" alt="Ali Hossn"/>
           </div>
           <div>
              <h4 className="font-bold text-xl text-gray-900 mb-2">Written by Ali Hossn</h4>
              <p className="text-gray-600 mb-4">Digital Marketer & Video Editor based in Bangladesh. Passionate about helping brands grow through data-driven strategies and compelling storytelling.</p>
              <Link to="/contact" className="text-brand-600 font-bold hover:underline text-sm">Work with me →</Link>
           </div>
        </div>

      </div>
    </div>
  );
};

export default BlogPostPage;
