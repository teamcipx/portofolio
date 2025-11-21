
import React, { useEffect, useState } from 'react';
import { ArrowRight, Download, Zap, Palette, Monitor, PenTool, Calendar, Verified, Video, TrendingUp, Search, Megaphone, Play, BookOpen, GraduationCap, Briefcase, Star, Quote, Users } from 'lucide-react';
import * as ReactRouterDOM from 'react-router-dom';
import { CV_URL, PROFILE_PIC as DEFAULT_PROFILE_PIC, CLIENT_LOGOS, EXPERIENCE, EDUCATION } from '../constants';
import { getProjects, getBlogs, getProfileSettings, getProducts, getTestimonials } from '../services/dataService';
import { Project, BlogPost, Product, Testimonial } from '../types';
import SeoHead from '../components/SeoHead';

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
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [recentBlogs, setRecentBlogs] = useState<BlogPost[]>([]);
  const [featuredCourses, setFeaturedCourses] = useState<Product[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [profilePic, setProfilePic] = useState(DEFAULT_PROFILE_PIC);

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

  return (
    <div className="animate-in fade-in duration-500 overflow-hidden">
      <SeoHead 
        title="Ali Hossn | Digital Marketer & Video Editor"
        description="Portfolio of Ali Hossn - Expert in SEO, Digital Marketing, Graphic Design and Video Editing. Based in Sherpur, Bangladesh."
        image={profilePic}
      />

      {/* Hero Section */}
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
                <Link to="/contact" className="relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-gray-900 rounded-full hover:bg-brand-600 hover:scale-105 shadow-lg hover:shadow-brand-500/40 group overflow-hidden">
                   <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></span>
                   Hire Me <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <a href={CV_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-gray-700 transition-all duration-200 bg-white border-2 border-gray-100 rounded-full hover:bg-gray-50 hover:border-brand-200 hover:text-brand-600 shadow-sm hover:shadow-md">
                  <Download className="mr-2 w-5 h-5" /> Download CV
                </a>
              </div>
              
              {/* Tech Stack Pills */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-3 pt-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                 {['SEO Expert', 'Video Editing', 'Graphic Design', 'Motion Graphics', 'Branding'].map((tech) => (
                    <span key={tech} className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-gray-500 bg-white border border-gray-200 rounded-md shadow-sm">
                       {tech}
                    </span>
                 ))}
              </div>
            </div>
            
            {/* Image/Profile Area (Right) */}
            <div className="lg:col-span-5 relative mt-12 lg:mt-0 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
               <div className="relative w-80 h-80 md:w-96 md:h-96 mx-auto">
                  {/* Spinning Border */}
                  <div className="absolute -inset-4 bg-gradient-to-r from-brand-500 via-accent-500 to-brand-500 rounded-full opacity-30 blur-lg animate-pulse-slow"></div>
                  <div className="absolute -inset-1 bg-gradient-to-tr from-brand-500 to-accent-500 rounded-full animate-spin-slow opacity-70"></div>
                  
                  {/* Profile Picture Container */}
                  <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white shadow-2xl bg-gray-100">
                     <img 
                        src={profilePic} 
                        alt="Ali Hossn" 
                        className="w-full h-full object-cover scale-110 hover:scale-100 transition-transform duration-700"
                     />
                  </div>

                  {/* Floating Badges */}
                  <div className="absolute top-6 -right-4 bg-white p-3 rounded-xl shadow-xl border border-gray-100 flex items-center gap-3 animate-float">
                     <div className="bg-blue-100 p-2 rounded-full text-blue-600">
                       <Verified size={20} fill="currentColor" className="text-blue-500 bg-white rounded-full"/>
                     </div>
                     <div>
                       <p className="font-bold text-gray-900 text-sm">SEO Expert</p>
                       <p className="text-xs text-gray-500">Rank #1</p>
                     </div>
                  </div>

                  <div className="absolute bottom-8 -left-8 bg-white p-3 rounded-xl shadow-xl border border-gray-100 flex items-center gap-3 animate-float" style={{ animationDelay: '1.5s' }}>
                     <div className="bg-brand-100 p-2 rounded-full text-brand-600">
                       <Video size={20} fill="currentColor" />
                     </div>
                     <div>
                       <p className="font-bold text-gray-900 text-sm">Pro Editor</p>
                       <p className="text-xs text-gray-500">Motion Graphics</p>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Animated Company Logos Section */}
      <section className="py-12 bg-white border-y border-gray-100 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 text-center mb-8">
              <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Trusted by Top Companies</p>
          </div>
          <div className="relative w-full flex overflow-x-hidden">
            <div className="animate-scroll flex items-center gap-12 whitespace-nowrap px-12">
                {/* Repeat list twice for infinite scroll effect */}
                {[...CLIENT_LOGOS, ...CLIENT_LOGOS].map((logo, idx) => (
                   <div key={idx} className="w-32 h-16 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-500 opacity-60 hover:opacity-100 cursor-pointer">
                      <img src={logo} alt="Company Logo" className="max-w-full max-h-full object-contain" />
                   </div>
                ))}
            </div>
          </div>
      </section>

      {/* Resume Section (Experience & Education) */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-brand-500 font-bold tracking-wider uppercase text-sm">Resume</span>
            <h2 className="text-4xl font-extrabold text-gray-900 mt-2">My Journey</h2>
            <p className="text-xl text-gray-600 mt-4">Professional Experience & Educational Background</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
             {/* Experience */}
             <div>
               <div className="flex items-center gap-3 mb-8">
                 <div className="p-3 bg-brand-100 rounded-xl text-brand-600"><Briefcase size={24}/></div>
                 <h3 className="text-2xl font-bold text-gray-900">Experience</h3>
               </div>
               <div className="space-y-8">
                 {EXPERIENCE.map((exp) => (
                   <div key={exp.id} className="relative pl-8 border-l-2 border-gray-200 hover:border-brand-400 transition-colors duration-300">
                     <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white border-4 border-brand-500"></div>
                     <span className="inline-block px-3 py-1 mb-2 text-xs font-bold text-brand-600 bg-brand-50 rounded-full">{exp.period}</span>
                     <h4 className="text-xl font-bold text-gray-900">{exp.role}</h4>
                     <p className="text-sm font-bold text-gray-500 mb-2">{exp.company}</p>
                     <p className="text-gray-600 leading-relaxed text-sm">{exp.description}</p>
                   </div>
                 ))}
               </div>
             </div>

             {/* Education */}
             <div>
               <div className="flex items-center gap-3 mb-8">
                 <div className="p-3 bg-accent-100 rounded-xl text-accent-600"><GraduationCap size={24}/></div>
                 <h3 className="text-2xl font-bold text-gray-900">Education</h3>
               </div>
               <div className="space-y-8">
                 {EDUCATION.map((edu) => (
                   <div key={edu.id} className="relative pl-8 border-l-2 border-gray-200 hover:border-accent-400 transition-colors duration-300">
                     <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white border-4 border-accent-500"></div>
                     <span className="inline-block px-3 py-1 mb-2 text-xs font-bold text-accent-600 bg-accent-50 rounded-full">{edu.period}</span>
                     <h4 className="text-xl font-bold text-gray-900">{edu.degree}</h4>
                     <p className="text-sm font-bold text-gray-500 mb-2">{edu.institution}</p>
                     <p className="text-gray-600 leading-relaxed text-sm">{edu.description}</p>
                   </div>
                 ))}
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* Featured YouTube Video Section */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
           <div className="text-center mb-12">
              <span className="text-brand-500 font-bold tracking-wider uppercase text-sm">Video Production</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2">Watch My Latest Edit</h2>
           </div>
           
           <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-black aspect-video group cursor-pointer">
              <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?si=demo" 
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen
                className="absolute inset-0"
              ></iframe>
           </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-dot-pattern opacity-30"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-brand-500 font-bold tracking-wider uppercase text-sm">Services</span>
            <h2 className="text-4xl font-extrabold text-gray-900 mt-2 mb-4">My Expertise</h2>
            <p className="text-xl text-gray-600">I provide a complete package of digital solutions.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-2xl transition-all hover:-translate-y-2 duration-300 group">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform duration-300">
                <Megaphone size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Digital Marketing</h3>
              <p className="text-gray-600 mb-6 text-sm leading-relaxed">Targeted social media campaigns (Facebook/Instagram Ads), Email Marketing, and Growth Strategy.</p>
            </div>

            <div className="bg-gradient-to-b from-brand-50 to-white rounded-3xl p-8 border-2 border-brand-100 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2 duration-300 group relative">
              <div className="absolute top-6 right-6 bg-brand-100 text-brand-700 text-[10px] font-bold px-3 py-1 rounded-full tracking-wide">POPULAR</div>
              <div className="w-16 h-16 bg-brand-100 rounded-2xl flex items-center justify-center text-brand-600 mb-6 group-hover:scale-110 transition-transform duration-300">
                <TrendingUp size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">SEO Optimization</h3>
              <p className="text-gray-600 mb-6 text-sm leading-relaxed">Rank #1 on Google. I provide Technical SEO, On-Page Optimization, and Keyword Research to boost traffic.</p>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-2xl transition-all hover:-translate-y-2 duration-300 group">
              <div className="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600 mb-6 group-hover:scale-110 transition-transform duration-300">
                <Video size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Video Editing</h3>
              <p className="text-gray-600 mb-6 text-sm leading-relaxed">High-quality edits for YouTube, Reels, and Commercials using Premiere Pro & After Effects.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Preview */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
            <div>
              <span className="text-brand-500 font-bold tracking-wider uppercase text-sm">Portfolio</span>
              <h2 className="text-4xl font-extrabold text-gray-900 mt-2">Selected Works</h2>
            </div>
            <Link to="/portfolio" className="flex items-center px-6 py-3 rounded-full bg-gray-50 border border-gray-200 text-gray-900 hover:border-brand-500 hover:text-brand-600 shadow-sm hover:shadow-md font-bold group transition">
              View All Projects <ArrowRight className="ml-2 group-hover:translate-x-1 transition" size={20} />
            </Link>
          </div>

          {loading ? (
            <div className="flex justify-center py-12"><div className="w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full animate-spin"></div></div>
          ) : featuredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredProjects.map((project) => (
                <div key={project.id} className="group relative cursor-pointer">
                  <div className="relative overflow-hidden rounded-2xl shadow-md bg-gray-200 mb-5 aspect-[4/3]">
                    <img 
                      src={project.imageUrl} 
                      alt={project.title} 
                      className="object-cover w-full h-full group-hover:scale-110 transition duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition duration-300"></div>
                    <div className="absolute bottom-6 left-6 right-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition duration-300">
                      <div className="bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-lg">
                          <p className="text-brand-600 text-xs font-bold uppercase mb-1">{project.category}</p>
                          <h3 className="text-lg font-bold text-gray-900">{project.title}</h3>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
             <div className="text-center py-12 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
                <PenTool className="mx-auto h-12 w-12 text-gray-300 mb-3"/>
                <h3 className="text-lg font-medium text-gray-900">New Projects Coming Soon</h3>
                <p className="text-gray-500">I am currently updating my portfolio with recent work.</p>
             </div>
          )}
        </div>
      </section>

      {/* Premium Courses Section */}
      {featuredCourses.length > 0 && (
        <section className="py-24 bg-gray-900 text-white relative overflow-hidden">
           <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-brand-600/20 rounded-full blur-3xl"></div>
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="text-center mb-16">
                <span className="text-brand-400 font-bold tracking-wider uppercase text-sm">Learning</span>
                <h2 className="text-4xl font-extrabold mt-2 text-white">Premium Courses</h2>
                <p className="text-gray-400 mt-4 max-w-2xl mx-auto">Master Digital Marketing and Video Editing with my dedicated courses.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                 {featuredCourses.map(course => (
                    <Link to="/shop" key={course.id} className="bg-gray-800 rounded-3xl overflow-hidden border border-gray-700 hover:border-brand-500 transition duration-300 hover:transform hover:-translate-y-2 group">
                       <div className="h-48 overflow-hidden relative">
                          <img src={course.imageUrl} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-500"/>
                          <div className="absolute top-4 right-4 bg-brand-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">COURSE</div>
                       </div>
                       <div className="p-6">
                          <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                          <div className="flex items-center gap-2 text-yellow-500 mb-4 text-sm font-bold">
                             <Star size={16} fill="currentColor"/> {course.rating}
                          </div>
                          <div className="flex justify-between items-center">
                             <span className="text-2xl font-bold text-white">${course.price}</span>
                             <span className="text-brand-400 font-bold text-sm flex items-center gap-1 group-hover:translate-x-1 transition">Enroll Now <ArrowRight size={16}/></span>
                          </div>
                       </div>
                    </Link>
                 ))}
              </div>
              <div className="text-center mt-12">
                  <Link to="/shop" className="inline-flex items-center px-8 py-3 rounded-full border border-gray-600 text-white hover:bg-white hover:text-gray-900 transition font-bold">View All Courses</Link>
              </div>
           </div>
        </section>
      )}

      {/* Testimonials Section */}
      <section className="py-24 bg-gray-50">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
               <span className="text-brand-500 font-bold tracking-wider uppercase text-sm">Testimonials</span>
               <h2 className="text-4xl font-extrabold text-gray-900 mt-2">Client Stories</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {testimonials.map(t => (
                  <div key={t.id} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 relative">
                     <Quote className="absolute top-8 right-8 text-gray-100 w-12 h-12" />
                     <p className="text-gray-600 leading-relaxed mb-6 relative z-10">"{t.content}"</p>
                     <div className="flex items-center gap-4">
                        <img src={t.avatarUrl} alt={t.name} className="w-12 h-12 rounded-full object-cover"/>
                        <div>
                           <h4 className="font-bold text-gray-900">{t.name}</h4>
                           <p className="text-xs text-gray-500">{t.role}, {t.company}</p>
                        </div>
                     </div>
                  </div>
               ))}
               {testimonials.length === 0 && (
                 <div className="col-span-3 text-center py-12 bg-white rounded-3xl border border-dashed">
                    <p className="text-gray-400">Testimonials will appear here once added from Admin Panel.</p>
                 </div>
               )}
            </div>
         </div>
      </section>

      {/* Latest Insights / Blog Section */}
      <section className="py-24 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-16">
            <span className="text-brand-500 font-bold tracking-wider uppercase text-sm">Blog</span>
            <h2 className="text-4xl font-extrabold text-gray-900 mt-2">Latest Insights</h2>
            <p className="text-xl text-gray-600 mt-4 max-w-2xl mx-auto">Strategies, tips, and trends in Digital Marketing and Video Production.</p>
          </div>

          {loading ? (
            <div className="flex justify-center py-12"><div className="w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full animate-spin"></div></div>
          ) : recentBlogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {recentBlogs.map(blog => (
                  <Link to={`/blog/${blog.id}`} key={blog.id} className="group bg-gray-50 rounded-3xl p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                     <div className="rounded-2xl overflow-hidden mb-6 h-48">
                        <img src={blog.imageUrl} alt={blog.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-500"/>
                     </div>
                     <div className="flex items-center gap-3 text-xs font-bold text-brand-600 mb-3 uppercase tracking-wide">
                        <span>{blog.category}</span>
                        <span className="text-gray-300">•</span>
                        <span className="text-gray-400">{blog.readTime}</span>
                     </div>
                     <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-brand-600 transition">{blog.title}</h3>
                     <p className="text-gray-600 line-clamp-2 mb-6">{blog.excerpt}</p>
                     <div className="flex items-center text-sm font-bold text-gray-900 group-hover:text-brand-600">
                        Read Article <ArrowRight size={16} className="ml-2 transition group-hover:translate-x-2"/>
                     </div>
                  </Link>
               ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-gray-50 rounded-3xl">
               <BookOpen className="mx-auto h-12 w-12 text-gray-300 mb-4"/>
               <h3 className="text-lg font-bold text-gray-900">Articles Coming Soon</h3>
               <p className="text-gray-500">Stay tuned for updates on SEO and Video Editing.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto bg-gray-900 rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-[30rem] h-[30rem] bg-brand-600/20 rounded-full -mr-32 -mt-32 blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-accent-600/20 rounded-full -ml-32 -mb-32 blur-3xl animate-pulse-slow" style={{animationDelay: '1s'}}></div>
          
          <div className="relative z-10">
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white mb-8 tracking-tight">
              Ready to grow your <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-accent-400">Business?</span>
            </h2>
            <p className="text-gray-400 text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
              I'm currently available for freelance projects in SEO, Video Editing, and Marketing.
            </p>
            <Link to="/contact" className="inline-flex items-center justify-center bg-white text-gray-900 px-10 py-5 rounded-full font-bold text-lg hover:bg-brand-500 hover:text-white hover:scale-105 transform transition-all duration-300 shadow-xl gap-2">
              Let's Talk <ArrowRight size={20}/>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
