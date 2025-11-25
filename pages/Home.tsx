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
    <div className="animate-in fade-in duration-500 overflow-hidden">
      <SeoHead 
        title="Ali Hossn | Digital Marketer & Video Editor Bangladesh"
        description="Expert Digital Marketer and Video Editor in Bangladesh. Services include SEO, Social Media Ads, Youtube Video Editing and Branding."
        keywords="ali hossn, digital marketer bangladesh, video editor sherpur, seo expert bangladesh, youtube video editor, social media marketing, freelance video editor"
        image={profilePic}
      />
      
      <AnnouncementBar />

      {/* Hero Section */}
      {settings.sections.showHero && (
        <section className="relative bg-gradient-to-b from-brand-50/50 via-white to-white min-h-[90vh] flex items-center bg-dot-pattern">
          {/* Animated Background Shapes */}
          <div className="absolute top-20 left-0 w-[30rem] h-[30rem] rounded-full bg-purple-200/30 mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
          <div className="absolute top-20 right-0 w-[30rem] h-[30rem] rounded-full bg-brand-200/30 mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-32 left-1/2 transform -translate-x-1/2 w-[40rem] h-[40rem] rounded-full bg-accent-100/40 mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Text Content (Left) */}
              <div className="lg:col-span-7 text-center lg:text-left space-y-8">
                
                {/* Availability Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-brand-200 shadow-sm text-sm font-bold text-brand-700 animate-fade-in-up">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </span>
                  Available for Hire
                </div>
                
                {/* Main Headline with Animated Name */}
                <div className="space-y-2 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                  <h2 className="text-2xl font-medium text-gray-500">Hello, I am</h2>
                  <h1 className="text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-tight min-h-[1.2em]">
                    <TypewriterName />
                  </h1>
                  <p className="text-2xl md:text-3xl font-bold text-gray-800">
                    Digital Marketer <span className="text-brand-500">&</span> Video Editor
                  </p>
                </div>
                
                {/* Description */}
                <p className="text-lg text-gray-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                  I help businesses grow with <span className="font-bold text-gray-900">Strategic SEO</span>, <span className="font-bold text-gray-900">Engaging Video Content</span>, and <span className="font-bold text-gray-900">Creative Branding</span>. From Sherpur to the World.
                </p>
                
                {/* Buttons */}
                <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-5 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                  <Link to="/contact" className="relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-gray-900 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 hover:bg-gray-800 hover:-translate-y-1 hover:shadow-lg">
                    Hire Me Now
                  </Link>
                  <a href={CV_URL} target="_blank" rel="noopener noreferrer" className="relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-gray-900 transition-all duration-200 bg-white border-2 border-gray-200 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 hover:bg-gray-50 hover:border-gray-300 hover:-translate-y-1 hover:shadow-lg">
                    <Download className="w-5 h-5 mr-2" /> Download CV
                  </a>
                </div>

                {/* Trusted By - Scrolling Marquee */}
                <div className="pt-8 border-t border-gray-100 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                  <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4 text-center lg:text-left">Trusted By</p>
                  <div className="relative w-full overflow-hidden">
                     <div className="flex gap-12 animate-scroll w-max">
                        {[...CLIENT_LOGOS, ...CLIENT_LOGOS].map((logo, index) => (
                          <img key={index} src={logo} alt="Client Logo" className="h-8 md:h-10 opacity-40 hover:opacity-100 transition duration-300 grayscale hover:grayscale-0" />
                        ))}
                     </div>
                  </div>
                </div>
              </div>
              
              {/* Hero Image / Video Showreel (Right) */}
              <div className="lg:col-span-5 relative animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/50 bg-white/20 backdrop-blur-sm group">
                  <img 
                    src={profilePic} 
                    alt="Ali Hossn Profile" 
                    className="w-full object-cover relative z-10 transform transition duration-700 group-hover:scale-105"
                  />
                  
                  {/* Floating Badges */}
                  <div className="absolute top-6 -left-6 bg-white p-4 rounded-xl shadow-lg z-20 flex items-center gap-3 animate-float">
                     <div className="p-3 bg-blue-100 text-blue-600 rounded-full"><TrendingUp size={24}/></div>
                     <div>
                        <p className="text-xs text-gray-500 font-bold uppercase">SEO Ranking</p>
                        <p className="text-lg font-bold text-gray-900">#1 Result</p>
                     </div>
                  </div>

                  <div className="absolute bottom-10 -right-6 bg-white p-4 rounded-xl shadow-lg z-20 flex items-center gap-3 animate-float" style={{ animationDelay: '1s' }}>
                     <div className="p-3 bg-purple-100 text-purple-600 rounded-full"><Video size={24}/></div>
                     <div>
                        <p className="text-xs text-gray-500 font-bold uppercase">Video Edits</p>
                        <p className="text-lg font-bold text-gray-900">500+ Done</p>
                     </div>
                  </div>

                  {/* Play Button Overlay (Mock for Showreel) */}
                  <a href="#video-showcase" className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 bg-black/20">
                      <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center shadow-lg text-brand-600 transform scale-75 group-hover:scale-100 transition">
                         <Play size={32} className="ml-1 fill-current" />
                      </div>
                  </a>
                </div>
              </div>

            </div>
          </div>
        </section>
      )}

      {/* Before & After Showcase */}
      {settings.sections.showPortfolio && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
             <div className="text-center mb-12">
                <span className="text-brand-600 font-bold uppercase tracking-wider text-sm">Magic Touch</span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">See the Difference</h2>
                <p className="text-gray-500 mt-4 max-w-2xl mx-auto">Slide to see how I transform raw footage into cinematic visuals using color grading and effects.</p>
             </div>
             <div className="max-w-4xl mx-auto">
                <BeforeAfterSlider 
                  beforeImage="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1000&q=80" // Raw/Flat
                  afterImage="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1000&q=80" // Graded/Vibrant
                  labelBefore="Raw Footage"
                  labelAfter="Cinematic Color Grade"
                />
             </div>
          </div>
        </section>
      )}

      {/* Featured Video Section */}
      {settings.sections.showPortfolio && (
        <section id="video-showcase" className="py-20 bg-black text-white relative overflow-hidden">
           <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                 <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600 text-white text-xs font-bold uppercase mb-6">
                       <Play size={12} fill="currentColor"/> Featured Work
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">Engaging Video Editing that <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-accent-400">Retention</span></h2>
                    <p className="text-gray-400 text-lg mb-8">
                       I create high-retention videos for YouTube, Instagram Reels, and Ads. My editing style focuses on pacing, storytelling, and visual hooks that keep viewers watching till the end.
                    </p>
                    <div className="flex flex-wrap gap-4">
                       <div className="bg-gray-900 border border-gray-700 p-4 rounded-xl">
                          <h4 className="font-bold text-2xl text-brand-400">10M+</h4>
                          <p className="text-sm text-gray-500">Views Generated</p>
                       </div>
                       <div className="bg-gray-900 border border-gray-700 p-4 rounded-xl">
                          <h4 className="font-bold text-2xl text-accent-400">2x</h4>
                          <p className="text-sm text-gray-500">Avg. Watch Time</p>
                       </div>
                    </div>
                 </div>
                 <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-800">
                    {/* Placeholder for YouTube Embed */}
                    <div className="aspect-video w-full">
                       <iframe 
                         width="100%" 
                         height="100%" 
                         src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0&mute=1" 
                         title="Ali Hossn Video Reel" 
                         frameBorder="0" 
                         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                         allowFullScreen
                         className="w-full h-full"
                       ></iframe>
                    </div>
                 </div>
              </div>
           </div>
        </section>
      )}

      {/* Services Section */}
      {settings.sections.showServices && (
        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-base font-bold text-brand-600 tracking-wide uppercase">My Expertise</h2>
              <p className="mt-2 text-4xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-5xl">
                Professional Services
              </p>
              <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
                Comprehensive digital solutions to help you scale.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Service 1 */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition duration-300">
                <div className="w-14 h-14 bg-brand-100 rounded-xl flex items-center justify-center text-brand-600 mb-6">
                  <Search size={32} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">SEO Optimization</h3>
                <p className="text-gray-500 mb-6">
                  Rank higher on Google with data-driven SEO strategies. I specialize in Keyword Research, On-Page SEO, and Technical Audits.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2 text-sm text-gray-700"><div className="w-2 h-2 bg-brand-500 rounded-full"></div> Keyword Research</li>
                  <li className="flex items-center gap-2 text-sm text-gray-700"><div className="w-2 h-2 bg-brand-500 rounded-full"></div> On-Page & Off-Page</li>
                  <li className="flex items-center gap-2 text-sm text-gray-700"><div className="w-2 h-2 bg-brand-500 rounded-full"></div> Technical Audit</li>
                </ul>
              </div>

              {/* Service 2 */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition duration-300 transform md:-translate-y-4">
                <div className="w-14 h-14 bg-accent-100 rounded-xl flex items-center justify-center text-accent-600 mb-6">
                  <Video size={32} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Video Editing</h3>
                <p className="text-gray-500 mb-6">
                  Professional editing for YouTube, Reels, and Ads. I use Premiere Pro & After Effects to create engaging visual stories.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2 text-sm text-gray-700"><div className="w-2 h-2 bg-accent-500 rounded-full"></div> YouTube Videos</li>
                  <li className="flex items-center gap-2 text-sm text-gray-700"><div className="w-2 h-2 bg-accent-500 rounded-full"></div> Reels & Shorts</li>
                  <li className="flex items-center gap-2 text-sm text-gray-700"><div className="w-2 h-2 bg-accent-500 rounded-full"></div> Motion Graphics</li>
                </ul>
              </div>

              {/* Service 3 */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition duration-300">
                <div className="w-14 h-14 bg-pink-100 rounded-xl flex items-center justify-center text-pink-600 mb-6">
                  <Palette size={32} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Branding & Design</h3>
                <p className="text-gray-500 mb-6">
                  Stand out with unique brand identity designs, social media graphics, and thumbnails that get clicks.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2 text-sm text-gray-700"><div className="w-2 h-2 bg-pink-500 rounded-full"></div> Logo Design</li>
                  <li className="flex items-center gap-2 text-sm text-gray-700"><div className="w-2 h-2 bg-pink-500 rounded-full"></div> Social Media Posts</li>
                  <li className="flex items-center gap-2 text-sm text-gray-700"><div className="w-2 h-2 bg-pink-500 rounded-full"></div> YouTube Thumbnails</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Featured Projects Section */}
      {settings.sections.showPortfolio && featuredProjects.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
             <div className="flex justify-between items-end mb-12">
                <div>
                   <h2 className="text-3xl font-bold text-gray-900">Featured Projects</h2>
                   <p className="text-gray-500 mt-2">Recent work highlights.</p>
                </div>
                <Link to="/portfolio" className="hidden md:flex items-center gap-2 text-brand-600 font-bold hover:underline">View All <ArrowRight size={16}/></Link>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {featuredProjects.map((project) => (
                   <Link to={`/work/${project.id}`} key={project.id} className="group block">
                      <div className="rounded-2xl overflow-hidden aspect-video mb-4 relative">
                         <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500"/>
                         <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition"/>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-brand-600 transition">{project.title}</h3>
                      <p className="text-sm text-gray-500">{project.category}</p>
                   </Link>
                ))}
             </div>
             
             <div className="mt-8 text-center md:hidden">
                <Link to="/portfolio" className="inline-flex items-center gap-2 text-brand-600 font-bold hover:underline">View All Projects <ArrowRight size={16}/></Link>
             </div>
          </div>
        </section>
      )}

      {/* Testimonials Section */}
      {settings.sections.showTestimonials && testimonials.length > 0 && (
        <section className="py-24 bg-gray-900 text-white relative overflow-hidden">
           <div className="absolute inset-0 bg-dot-pattern opacity-10"></div>
           <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
              <Quote size={48} className="mx-auto text-brand-500 mb-8 opacity-50"/>
              
              <div className="min-h-[200px]">
                 {testimonials.map((t, idx) => (
                    <div key={t.id} className={`${idx === currentTestimonialIndex ? 'block animate-in fade-in slide-in-from-bottom-4 duration-500' : 'hidden'}`}>
                       <p className="text-2xl md:text-4xl font-medium leading-relaxed mb-8">"{t.content}"</p>
                       <div className="flex items-center justify-center gap-4">
                          <img src={t.avatarUrl} alt={t.name} className="w-12 h-12 rounded-full object-cover border-2 border-brand-500"/>
                          <div className="text-left">
                             <h4 className="font-bold text-lg">{t.name}</h4>
                             <p className="text-gray-400 text-sm">{t.role}, {t.company}</p>
                          </div>
                       </div>
                    </div>
                 ))}
              </div>

              {testimonials.length > 1 && (
                 <div className="flex justify-center gap-4 mt-12">
                    <button onClick={prevTestimonial} className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition"><ChevronLeft size={24}/></button>
                    <button onClick={nextTestimonial} className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition"><ChevronRight size={24}/></button>
                 </div>
              )}
           </div>
        </section>
      )}
      
      {/* Blog Preview */}
      {settings.sections.showBlogs && recentBlogs.length > 0 && (
         <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4">
               <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Latest from the Blog</h2>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {recentBlogs.map(blog => (
                     <Link to={`/blog/${blog.id}`} key={blog.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition group">
                        <div className="h-48 overflow-hidden">
                           <img src={blog.imageUrl} className="w-full h-full object-cover group-hover:scale-105 transition duration-500"/>
                        </div>
                        <div className="p-6">
                           <span className="text-xs font-bold text-brand-600 uppercase mb-2 block">{blog.category}</span>
                           <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-brand-600 transition">{blog.title}</h3>
                           <p className="text-gray-500 text-sm line-clamp-2">{blog.excerpt}</p>
                           <div className="mt-4 flex items-center text-xs text-gray-400 gap-3">
                              <span className="flex items-center gap-1"><Calendar size={12}/> {blog.date}</span>
                              <span className="flex items-center gap-1"><Clock size={12}/> {blog.readTime}</span>
                           </div>
                        </div>
                     </Link>
                  ))}
               </div>
            </div>
         </section>
      )}

      {/* CTA Section */}
      {settings.sections.showContact && (
        <section className="py-24 bg-white relative overflow-hidden">
           <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">Ready to Scale Your Brand?</h2>
              <p className="text-xl text-gray-500 mb-10 max-w-2xl mx-auto">Whether you need better SEO rankings, high-retention videos, or a brand makeover, I'm here to help.</p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                 <Link to="/contact" className="px-8 py-4 bg-brand-600 text-white text-lg font-bold rounded-xl shadow-lg hover:bg-brand-700 hover:-translate-y-1 transition transform">
                    Start a Project
                 </Link>
                 <Link to="/book" className="px-8 py-4 bg-white text-gray-900 border-2 border-gray-200 text-lg font-bold rounded-xl hover:bg-gray-50 hover:border-gray-300 transition">
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