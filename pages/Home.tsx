import React, { useEffect, useState } from 'react';
import { ArrowRight, Download, TrendingUp, Video, Megaphone, Palette, Play, ChevronLeft, ChevronRight, Quote, Calendar, Clock, Star, Briefcase, GraduationCap, Layout, Search } from 'lucide-react';
import * as ReactRouterDOM from 'react-router-dom';
import { CV_URL, PROFILE_PIC as DEFAULT_PROFILE_PIC, CLIENT_LOGOS, EXPERIENCE, EDUCATION } from '../constants';
import { getProjects, getBlogs, getProfileSettings, getProducts, getTestimonials } from '../services/dataService';
import { Project, BlogPost, Product, Testimonial } from '../types';
import SeoHead from '../components/SeoHead';
import AnnouncementBar from '../components/AnnouncementBar';
import BeforeAfterSlider from '../components/BeforeAfterSlider';
import { useTheme } from '../contexts/ThemeContext';

const { Link } = ReactRouterDOM;

const TypewriterName: React.FC = () => {
  const [text, setText] = useState('');
  const fullText = "ALI HOSSN";
  
  useEffect(() => {
    let i = 0;
    setText('');
    const typingEffect = setInterval(() => {
      if (i < fullText.length) {
        setText(fullText.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typingEffect);
      }
    }, 150); // Speed of typing

    return () => clearInterval(typingEffect);
  }, []);

  return (
    <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-accent-500 to-brand-600 animate-text-gradient bg-[length:200%_auto]">
      {text}
      <span className="animate-pulse text-brand-600">|</span>
    </span>
  );
};

const Home: React.FC = () => {
  const { settings } = useTheme();
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [recentBlogs, setRecentBlogs] = useState<BlogPost[]>([]);
  const [featuredCourses, setFeaturedCourses] = useState<Product[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [profilePic, setProfilePic] = useState(DEFAULT_PROFILE_PIC);
  
  // Testimonial Carousel State
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      const projects = await getProjects();
      const blogs = await getBlogs();
      const products = await getProducts();
      const settings = await getProfileSettings();
      const reviews = await getTestimonials();
      
      setFeaturedProjects(projects.slice(0, 3));
      setRecentBlogs(blogs.slice(0, 3));
      setFeaturedCourses(products.filter(p => p.type === 'Course').slice(0, 3));
      setTestimonials(reviews);
      
      if (settings && settings.profilePic) {
        setProfilePic(settings.profilePic);
      }
      
      setLoading(false);
    };
    loadData();
  }, []);

  // Auto-advance carousel
  useEffect(() => {
    if (testimonials.length <= 1) return;
    const interval = setInterval(() => {
        setCurrentTestimonialIndex(prev => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [testimonials]);

  const nextTestimonial = () => {
    setCurrentTestimonialIndex((prev) => (prev + 1) % testimonials.length);
  };
  
  const prevTestimonial = () => {
    setCurrentTestimonialIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="animate-in fade-in duration-500 overflow-hidden bg-gray-50/50">
      <SeoHead 
        title="Ali Hossn | Digital Marketer & Video Editor Bangladesh"
        description="Expert Digital Marketer and Video Editor in Bangladesh. Services include SEO, Social Media Ads, Youtube Video Editing and Branding."
        keywords="ali hossn, digital marketer bangladesh, video editor sherpur, seo expert bangladesh, youtube video editor, social media marketing, freelance video editor"
        image={profilePic}
      />
      
      <AnnouncementBar />

      {/* Hero Section */}
      {settings.sections.showHero && (
        <section className="relative min-h-[92vh] flex items-center bg-dot-pattern overflow-hidden">
          {/* Advanced Background Gradients */}
          <div className="absolute top-0 right-0 w-[50vw] h-[50vh] bg-gradient-to-b from-brand-50 to-transparent opacity-60 rounded-bl-[10rem]"></div>
          <div className="absolute top-1/4 left-10 w-96 h-96 bg-accent-200/20 rounded-full filter blur-[100px] animate-pulse-slow"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-brand-200/20 rounded-full filter blur-[80px] animate-blob"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-12 pb-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
              
              {/* Text Content (Left) */}
              <div className="lg:col-span-7 text-center lg:text-left space-y-8 order-2 lg:order-1">
                
                {/* Availability Badge */}
                <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-gray-100 shadow-sm text-sm font-bold text-gray-700 animate-fade-in-up hover:shadow-md transition cursor-default">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </span>
                  Open for Projects
                </div>
                
                {/* Main Headline with Animated Name */}
                <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                  <h2 className="text-xl md:text-2xl font-medium text-gray-500 tracking-wide">Hello, I am</h2>
                  <h1 className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.9] text-gray-900">
                    <TypewriterName />
                  </h1>
                  <p className="text-2xl md:text-4xl font-bold text-gray-800 leading-tight">
                    Digital Marketer <span className="text-brand-500">&</span><br/> Video Editor
                  </p>
                </div>
                
                {/* Description */}
                <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                  Helping brands dominate with <span className="font-bold text-gray-900 bg-brand-50 px-1 rounded">Strategic SEO</span>, <span className="font-bold text-gray-900 bg-accent-50 px-1 rounded">Viral Video Edits</span>, and <span className="font-bold text-gray-900 bg-pink-50 px-1 rounded">Creative Branding</span>.
                </p>
                
                {/* Buttons */}
                <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                  <Link to="/contact" className="relative group px-8 py-4 bg-gray-900 text-white rounded-2xl font-bold text-lg overflow-hidden transition-all hover:scale-105 hover:shadow-2xl hover:shadow-gray-900/20">
                    <span className="relative z-10 flex items-center gap-2">Let's Talk <ArrowRight size={18} className="group-hover:translate-x-1 transition"/></span>
                    <div className="absolute inset-0 bg-brand-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
                  </Link>
                  <a href={CV_URL} target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-white text-gray-900 border-2 border-gray-100 rounded-2xl font-bold text-lg hover:border-brand-200 hover:bg-brand-50 transition-all hover:scale-105 flex items-center justify-center gap-2">
                    <Download className="w-5 h-5" /> Download Resume
                  </a>
                </div>

                {/* Trusted By - Scrolling Marquee */}
                <div className="pt-10 border-t border-gray-100 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-6 text-center lg:text-left">Trusted by Industry Leaders</p>
                  <div className="relative w-full overflow-hidden mask-linear-fade">
                     <div className="flex gap-16 animate-scroll w-max items-center">
                        {[...CLIENT_LOGOS, ...CLIENT_LOGOS].map((logo, index) => (
                          <img key={index} src={logo} alt="Client Logo" className="h-8 md:h-10 opacity-30 hover:opacity-100 transition duration-500 grayscale hover:grayscale-0" />
                        ))}
                     </div>
                  </div>
                </div>
              </div>
              
              {/* Hero Image - Advanced Profile Design (Right) */}
              <div className="lg:col-span-5 relative animate-fade-in-up order-1 lg:order-2 mb-12 lg:mb-0" style={{ animationDelay: '0.4s' }}>
                 <div className="relative w-full aspect-[4/5] md:aspect-square max-w-md mx-auto">
                    
                    {/* Decorative Spinning Rings */}
                    <div className="absolute inset-0 rounded-[3rem] border border-dashed border-gray-300 animate-[spin_20s_linear_infinite]"></div>
                    <div className="absolute inset-4 rounded-[2.5rem] border border-gray-200 animate-[spin_15s_linear_infinite_reverse]"></div>
                    
                    {/* Main Image Container */}
                    <div className="absolute inset-8 rounded-[2rem] overflow-hidden border-[6px] border-white shadow-2xl bg-white relative group">
                        <img 
                            src={profilePic} 
                            alt="Ali Hossn" 
                            className="w-full h-full object-cover transition duration-1000 group-hover:scale-110 group-hover:rotate-1"
                        />
                        {/* Inner Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-500"></div>
                        
                        {/* Hover Info */}
                        <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition duration-500">
                            <p className="text-white font-bold text-xl">Ali Hossn</p>
                            <p className="text-gray-300 text-sm">Senior Creator</p>
                        </div>
                    </div>

                    {/* Floating Glass Badges */}
                    <div className="absolute top-16 -left-4 md:-left-10 bg-white/80 backdrop-blur-xl p-4 rounded-2xl shadow-xl border border-white/40 animate-float flex items-center gap-3 hover:scale-110 transition cursor-default">
                         <div className="bg-gradient-to-br from-green-400 to-emerald-600 p-2.5 rounded-xl text-white shadow-lg shadow-green-500/30">
                            <TrendingUp size={20} />
                         </div>
                         <div>
                            <p className="text-[10px] uppercase font-bold text-gray-500">Success Rate</p>
                            <p className="text-sm font-bold text-gray-900">99.8%</p>
                         </div>
                    </div>

                    <div className="absolute bottom-20 -right-4 md:-right-10 bg-white/80 backdrop-blur-xl p-4 rounded-2xl shadow-xl border border-white/40 animate-float flex items-center gap-3 hover:scale-110 transition cursor-default" style={{ animationDelay: '1.5s' }}>
                         <div className="bg-gradient-to-br from-brand-500 to-accent-600 p-2.5 rounded-xl text-white shadow-lg shadow-brand-500/30">
                            <Video size={20} />
                         </div>
                         <div>
                            <p className="text-[10px] uppercase font-bold text-gray-500">Projects</p>
                            <p className="text-sm font-bold text-gray-900">500+ Done</p>
                         </div>
                    </div>

                    {/* Play Button Overlay (Showreel) */}
                    <a href="#video-showcase" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/50 text-white cursor-pointer hover:bg-white hover:text-brand-600 hover:scale-110 transition duration-300 group shadow-xl">
                       <Play size={24} className="ml-1 fill-current" />
                    </a>
                 </div>
              </div>

            </div>
          </div>
        </section>
      )}

      {/* Before & After Showcase */}
      {settings.sections.showPortfolio && (
        <section className="py-24 bg-white relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
             <div className="text-center mb-16">
                <span className="text-brand-600 font-bold uppercase tracking-wider text-xs bg-brand-50 px-3 py-1 rounded-full">Magic Touch</span>
                <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mt-4">Visual Transformation</h2>
                <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-lg">Slide to explore how I enhance raw footage into cinematic masterpieces with advanced color grading.</p>
             </div>
             <div className="max-w-5xl mx-auto shadow-2xl rounded-3xl overflow-hidden border-8 border-white bg-gray-100">
                <BeforeAfterSlider 
                  beforeImage="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80" // Raw/Flat
                  afterImage="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80" // Graded/Vibrant
                  labelBefore="RAW Footage"
                  labelAfter="Color Graded"
                />
             </div>
          </div>
        </section>
      )}

      {/* Featured Video Section */}
      {settings.sections.showPortfolio && (
        <section id="video-showcase" className="py-24 bg-gray-900 text-white relative overflow-hidden">
           <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
           <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-brand-600/20 rounded-full filter blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
           
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                 <div className="space-y-8">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-600/10 border border-red-500/30 text-red-500 text-xs font-bold uppercase tracking-widest">
                       <Play size={10} fill="currentColor"/> Showreel 2024
                    </div>
                    <h2 className="text-4xl md:text-6xl font-bold leading-tight">Video Editing that <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-accent-400">Captivates</span></h2>
                    <p className="text-gray-400 text-lg leading-relaxed">
                       In today's attention economy, every second counts. I craft high-retention videos for YouTube, Reels, and Ads using pacing, sound design, and visual storytelling to keep viewers hooked.
                    </p>
                    <div className="grid grid-cols-2 gap-6">
                       <div className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition">
                          <h4 className="font-bold text-3xl text-brand-400 mb-1">10M+</h4>
                          <p className="text-sm text-gray-500 uppercase font-bold tracking-wide">Views Generated</p>
                       </div>
                       <div className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition">
                          <h4 className="font-bold text-3xl text-accent-400 mb-1">200%</h4>
                          <p className="text-sm text-gray-500 uppercase font-bold tracking-wide">Avg. Retention Lift</p>
                       </div>
                    </div>
                    <Link to="/portfolio" className="inline-flex items-center gap-2 text-white font-bold hover:text-brand-400 transition underline decoration-gray-700 underline-offset-4">
                        View All Video Projects <ArrowRight size={16}/>
                    </Link>
                 </div>
                 <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-800 bg-gray-900 group">
                    <div className="aspect-video w-full relative">
                       <iframe 
                         width="100%" 
                         height="100%" 
                         src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0&mute=1&controls=0&showinfo=0&rel=0&loop=1" 
                         title="Ali Hossn Video Reel" 
                         frameBorder="0" 
                         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                         allowFullScreen
                         className="w-full h-full opacity-80 group-hover:opacity-100 transition duration-500"
                       ></iframe>
                       <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]"></div>
                    </div>
                 </div>
              </div>
           </div>
        </section>
      )}

      {/* Services Section */}
      {settings.sections.showServices && (
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-sm font-bold text-brand-600 tracking-widest uppercase mb-2">My Expertise</h2>
              <p className="text-4xl md:text-5xl font-extrabold text-gray-900">
                Premium Services
              </p>
              <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
                Comprehensive digital solutions tailored to scale your business.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: Search, title: "SEO Optimization", desc: "Rank #1 on Google with data-driven Keyword Research & On-page SEO strategies.", color: "brand" },
                { icon: Video, title: "Video Editing", desc: "Cinematic cuts, motion graphics, and color grading for YouTube, Reels & Ads.", color: "accent" },
                { icon: Palette, title: "Branding Design", desc: "Stand out with unique brand identity designs, social media kits, and click-worthy thumbnails.", color: "pink" }
              ].map((service, idx) => (
                <div key={idx} className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 hover:shadow-2xl hover:shadow-gray-200/50 hover:border-brand-100 transition-all duration-300 group hover:-translate-y-2">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-${service.color}-600 mb-6 bg-${service.color}-50 group-hover:bg-${service.color}-600 group-hover:text-white transition-colors duration-300`}>
                    <service.icon size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                  <p className="text-gray-500 mb-8 leading-relaxed">
                    {service.desc}
                  </p>
                  <Link to="/contact" className={`inline-flex items-center text-${service.color}-600 font-bold hover:underline`}>
                     Learn More <ArrowRight size={16} className="ml-1"/>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Projects Section */}
      {settings.sections.showPortfolio && featuredProjects.length > 0 && (
        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
             <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                <div>
                   <h2 className="text-4xl font-bold text-gray-900">Selected Work</h2>
                   <p className="text-gray-500 mt-2 text-lg">Highlights from my recent portfolio.</p>
                </div>
                <Link to="/portfolio" className="hidden md:flex px-6 py-3 bg-white border border-gray-200 rounded-full text-gray-900 font-bold hover:bg-gray-50 transition shadow-sm items-center gap-2">
                   View All Projects <ArrowRight size={16}/>
                </Link>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {featuredProjects.map((project) => (
                   <Link to={`/work/${project.id}`} key={project.id} className="group block h-full">
                      <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition duration-500 h-full flex flex-col border border-gray-100">
                         <div className="relative overflow-hidden aspect-[4/3]">
                            <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-700"/>
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
                               <span className="bg-white text-gray-900 px-6 py-3 rounded-full font-bold transform translate-y-4 group-hover:translate-y-0 transition duration-300 flex items-center gap-2">
                                  View Case <ArrowRight size={16}/>
                               </span>
                            </div>
                         </div>
                         <div className="p-6 flex-1">
                            <p className="text-xs font-bold text-brand-600 uppercase tracking-wider mb-2">{project.category}</p>
                            <h3 className="text-2xl font-bold text-gray-900 group-hover:text-brand-600 transition mb-2">{project.title}</h3>
                         </div>
                      </div>
                   </Link>
                ))}
             </div>
             
             <div className="mt-12 text-center md:hidden">
                <Link to="/portfolio" className="inline-flex px-8 py-4 bg-white border border-gray-200 rounded-full text-gray-900 font-bold shadow-sm items-center gap-2">View All Projects <ArrowRight size={16}/></Link>
             </div>
          </div>
        </section>
      )}

      {/* Testimonials Section */}
      {settings.sections.showTestimonials && testimonials.length > 0 && (
        <section className="py-24 bg-gray-900 text-white relative overflow-hidden">
           {/* Background Decorations */}
           <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
           <div className="absolute -top-20 -left-20 w-96 h-96 bg-brand-500/20 rounded-full blur-[100px]"></div>
           <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-accent-500/20 rounded-full blur-[100px]"></div>

           <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
              <div className="mb-10">
                 <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto text-brand-400 mb-6 backdrop-blur-sm">
                    <Quote size={32} fill="currentColor"/>
                 </div>
                 <h2 className="text-3xl font-bold">Client Stories</h2>
              </div>
              
              <div className="min-h-[250px] relative">
                 {testimonials.map((t, idx) => (
                    <div 
                      key={t.id} 
                      className={`transition-all duration-700 absolute inset-0 flex flex-col items-center justify-center ${idx === currentTestimonialIndex ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 translate-x-20 scale-95 pointer-events-none'}`}
                    >
                       <p className="text-2xl md:text-4xl font-medium leading-relaxed mb-8 text-gray-100">"{t.content}"</p>
                       <div className="flex items-center justify-center gap-4 bg-white/10 p-2 pr-6 rounded-full backdrop-blur-sm border border-white/10">
                          <img src={t.avatarUrl} alt={t.name} className="w-12 h-12 rounded-full object-cover border-2 border-brand-400"/>
                          <div className="text-left">
                             <h4 className="font-bold text-lg leading-tight">{t.name}</h4>
                             <p className="text-gray-400 text-xs uppercase font-bold tracking-wide">{t.role}, {t.company}</p>
                          </div>
                       </div>
                    </div>
                 ))}
              </div>

              {testimonials.length > 1 && (
                 <div className="flex justify-center gap-4 mt-12">
                    <button onClick={prevTestimonial} className="w-12 h-12 rounded-full bg-white/5 border border-white/10 hover:bg-white/20 transition flex items-center justify-center text-white"><ChevronLeft size={24}/></button>
                    <button onClick={nextTestimonial} className="w-12 h-12 rounded-full bg-white/5 border border-white/10 hover:bg-white/20 transition flex items-center justify-center text-white"><ChevronRight size={24}/></button>
                 </div>
              )}
           </div>
        </section>
      )}
      
      {/* Blog Preview */}
      {settings.sections.showBlogs && recentBlogs.length > 0 && (
         <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4">
               <div className="flex justify-between items-end mb-12">
                   <h2 className="text-4xl font-bold text-gray-900">Latest Insights</h2>
                   <Link to="#" className="text-brand-600 font-bold hover:underline">Read Blog</Link>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {recentBlogs.map(blog => (
                     <Link to={`/blog/${blog.id}`} key={blog.id} className="group cursor-pointer">
                        <div className="relative h-60 rounded-3xl overflow-hidden mb-6">
                           <img src={blog.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition duration-700"/>
                           <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-gray-900">
                              {blog.category}
                           </div>
                        </div>
                        <div className="pr-4">
                           <div className="flex items-center text-xs text-gray-400 gap-3 mb-3">
                              <span className="flex items-center gap-1"><Calendar size={12}/> {blog.date}</span>
                              <span className="flex items-center gap-1"><Clock size={12}/> {blog.readTime}</span>
                           </div>
                           <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-brand-600 transition leading-snug">{blog.title}</h3>
                           <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed">{blog.excerpt}</p>
                        </div>
                     </Link>
                  ))}
               </div>
            </div>
         </section>
      )}

      {/* CTA Section */}
      {settings.sections.showContact && (
        <section className="py-32 bg-gray-50 relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
           <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
              <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-8 tracking-tight">Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-accent-600">Scale?</span></h2>
              <p className="text-2xl text-gray-500 mb-12 max-w-2xl mx-auto leading-relaxed">Let's create something extraordinary together. Whether it's SEO, Video, or Design.</p>
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                 <Link to="/contact" className="px-10 py-5 bg-brand-600 text-white text-xl font-bold rounded-2xl shadow-xl shadow-brand-500/20 hover:bg-brand-700 hover:-translate-y-1 transition transform">
                    Start a Project
                 </Link>
                 <Link to="/book" className="px-10 py-5 bg-white text-gray-900 border-2 border-gray-200 text-xl font-bold rounded-2xl hover:bg-gray-50 hover:border-gray-300 transition">
                    Book a Call
                 </Link>
              </div>
           </div>
        </section>
      )}

    </div>
  );
};

export default Home;