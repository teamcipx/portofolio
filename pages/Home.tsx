
import React, { useEffect, useState } from 'react';
import { ArrowRight, Download, Zap, Palette, Monitor, PenTool, Calendar, Verified, Figma, Code2, Layout, BookOpen } from 'lucide-react';
import * as ReactRouterDOM from 'react-router-dom';
import { CV_URL, PROFILE_PIC as DEFAULT_PROFILE_PIC } from '../constants';
import { getProjects, getBlogs, getProfileSettings } from '../services/dataService';
import { Project, BlogPost } from '../types';
import SeoHead from '../components/SeoHead';

const { Link } = ReactRouterDOM;

const Home: React.FC = () => {
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [recentBlogs, setRecentBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [profilePic, setProfilePic] = useState(DEFAULT_PROFILE_PIC);

  useEffect(() => {
    const loadData = async () => {
      const projects = await getProjects();
      const blogs = await getBlogs();
      const settings = await getProfileSettings();
      
      setFeaturedProjects(projects.slice(0, 3));
      setRecentBlogs(blogs.slice(0, 3));
      
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
        title="Siam Hasan | Senior Product Designer & Frontend Developer"
        description="Portfolio of Siam Hasan - Specializing in Brand Identity, UI/UX Design, and Frontend Development. Based in Dhaka."
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
                Open to Work & Collaborations
              </div>
              
              {/* Main Headline with Animated Name */}
              <div className="space-y-2 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                <h2 className="text-2xl font-medium text-gray-500">Hello, I am</h2>
                <h1 className="text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-tight">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-accent-500 to-brand-600 animate-text-gradient">
                    SIAM HASAN
                  </span>
                </h1>
                <p className="text-2xl md:text-3xl font-bold text-gray-800">
                  Creative Director <span className="text-brand-500">&</span> Frontend Developer
                </p>
              </div>
              
              {/* Description */}
              <p className="text-lg text-gray-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                I blend artistic vision with technical precision to craft <span className="font-bold text-gray-900">pixel-perfect websites</span> and <span className="font-bold text-gray-900">memorable brand identities</span>. Let's turn your complex ideas into elegant, user-centric digital experiences.
              </p>
              
              {/* Buttons */}
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-5 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                <Link to="/contact" className="relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-gray-900 rounded-full hover:bg-brand-600 hover:scale-105 shadow-lg hover:shadow-brand-500/40 group overflow-hidden">
                   <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></span>
                   Start a Project <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <a href={CV_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-gray-700 transition-all duration-200 bg-white border-2 border-gray-100 rounded-full hover:bg-gray-50 hover:border-brand-200 hover:text-brand-600 shadow-sm hover:shadow-md">
                  <Download className="mr-2 w-5 h-5" /> Download CV
                </a>
              </div>
              
              {/* Tech Stack Pills */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-3 pt-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                 {['Figma', 'React 19', 'TypeScript', 'Tailwind', 'AI Integration'].map((tech) => (
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
                        alt="Siam Hasan - Product Designer" 
                        className="w-full h-full object-cover scale-110 hover:scale-100 transition-transform duration-700"
                     />
                  </div>

                  {/* Floating Badges */}
                  <div className="absolute top-6 -right-4 bg-white p-3 rounded-xl shadow-xl border border-gray-100 flex items-center gap-3 animate-float">
                     <div className="bg-blue-100 p-2 rounded-full text-blue-600">
                       <Verified size={20} fill="currentColor" className="text-blue-500 bg-white rounded-full"/>
                     </div>
                     <div>
                       <p className="font-bold text-gray-900 text-sm">Top Rated</p>
                       <p className="text-xs text-gray-500">Freelancer</p>
                     </div>
                  </div>

                  <div className="absolute bottom-8 -left-8 bg-white p-3 rounded-xl shadow-xl border border-gray-100 flex items-center gap-3 animate-float" style={{ animationDelay: '1.5s' }}>
                     <div className="bg-brand-100 p-2 rounded-full text-brand-600">
                       <Zap size={20} fill="currentColor" />
                     </div>
                     <div>
                       <p className="font-bold text-gray-900 text-sm">Fast Delivery</p>
                       <p className="text-xs text-gray-500">Guaranteed</p>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tools & Tech Section */}
      <section className="py-12 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
           <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-8">Powering world-class products with</p>
           <div className="flex flex-wrap justify-center gap-8 md:gap-16 grayscale hover:grayscale-0 transition-all duration-500">
              <div className="group flex flex-col items-center gap-3">
                <div className="p-4 bg-gray-50 rounded-2xl group-hover:bg-[#F24E1E]/10 group-hover:scale-110 transition-all duration-300">
                  <Figma size={32} className="text-gray-400 group-hover:text-[#F24E1E] transition-colors"/>
                </div>
                <span className="text-xs font-bold text-gray-400 group-hover:text-gray-900">Figma</span>
              </div>
              
              <div className="group flex flex-col items-center gap-3">
                <div className="p-4 bg-gray-50 rounded-2xl group-hover:bg-[#31A8FF]/10 group-hover:scale-110 transition-all duration-300">
                  <Palette size={32} className="text-gray-400 group-hover:text-[#31A8FF] transition-colors"/>
                </div>
                <span className="text-xs font-bold text-gray-400 group-hover:text-gray-900">Adobe XD</span>
              </div>

              <div className="group flex flex-col items-center gap-3">
                <div className="p-4 bg-gray-50 rounded-2xl group-hover:bg-[#61DAFB]/10 group-hover:scale-110 transition-all duration-300">
                  <Code2 size={32} className="text-gray-400 group-hover:text-[#61DAFB] transition-colors"/>
                </div>
                <span className="text-xs font-bold text-gray-400 group-hover:text-gray-900">React</span>
              </div>

              <div className="group flex flex-col items-center gap-3">
                <div className="p-4 bg-gray-50 rounded-2xl group-hover:bg-[#38B2AC]/10 group-hover:scale-110 transition-all duration-300">
                  <Layout size={32} className="text-gray-400 group-hover:text-[#38B2AC] transition-colors"/>
                </div>
                <span className="text-xs font-bold text-gray-400 group-hover:text-gray-900">Tailwind</span>
              </div>
           </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-dot-pattern opacity-30"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-brand-500 font-bold tracking-wider uppercase text-sm">Services</span>
            <h2 className="text-4xl font-extrabold text-gray-900 mt-2 mb-4">What I Do Best</h2>
            <p className="text-xl text-gray-600">Comprehensive design solutions tailored to your business goals.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-2xl transition-all hover:-translate-y-2 duration-300 group">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform duration-300">
                <Palette size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Brand Identity</h3>
              <p className="text-gray-600 mb-6 text-sm leading-relaxed">More than just a logo. I build complete visual systems, color palettes, and brand guidelines that tell your story and build trust.</p>
              <ul className="space-y-3 border-t border-gray-50 pt-6">
                <li className="flex items-center gap-3 text-sm font-medium text-gray-700"><div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div> Logo Design & Strategy</li>
                <li className="flex items-center gap-3 text-sm font-medium text-gray-700"><div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div> Brand Guidelines</li>
                <li className="flex items-center gap-3 text-sm font-medium text-gray-700"><div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div> Marketing Assets</li>
              </ul>
            </div>

            <div className="bg-gradient-to-b from-brand-50 to-white rounded-3xl p-8 border-2 border-brand-100 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2 duration-300 group relative">
              <div className="absolute top-6 right-6 bg-brand-100 text-brand-700 text-[10px] font-bold px-3 py-1 rounded-full tracking-wide">POPULAR</div>
              <div className="w-16 h-16 bg-brand-100 rounded-2xl flex items-center justify-center text-brand-600 mb-6 group-hover:scale-110 transition-transform duration-300">
                <Monitor size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Web Design & Dev</h3>
              <p className="text-gray-600 mb-6 text-sm leading-relaxed">Modern, responsive websites designed in Figma and developed with React & Tailwind for lightning-fast performance.</p>
              <ul className="space-y-3 border-t border-brand-100 pt-6">
                <li className="flex items-center gap-3 text-sm font-medium text-gray-700"><div className="w-1.5 h-1.5 rounded-full bg-brand-500"></div> UI/UX Design (Figma)</li>
                <li className="flex items-center gap-3 text-sm font-medium text-gray-700"><div className="w-1.5 h-1.5 rounded-full bg-brand-500"></div> React Development</li>
                <li className="flex items-center gap-3 text-sm font-medium text-gray-700"><div className="w-1.5 h-1.5 rounded-full bg-brand-500"></div> Interactive Prototyping</li>
              </ul>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-2xl transition-all hover:-translate-y-2 duration-300 group">
              <div className="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600 mb-6 group-hover:scale-110 transition-transform duration-300">
                <PenTool size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Digital Art</h3>
              <p className="text-gray-600 mb-6 text-sm leading-relaxed">Custom digital illustrations, icon sets, and 3D assets to make your product or website uniquely yours and stand out from the crowd.</p>
              <ul className="space-y-3 border-t border-gray-50 pt-6">
                <li className="flex items-center gap-3 text-sm font-medium text-gray-700"><div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div> Custom Iconography</li>
                <li className="flex items-center gap-3 text-sm font-medium text-gray-700"><div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div> Character Design</li>
                <li className="flex items-center gap-3 text-sm font-medium text-gray-700"><div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div> Lottie Animations</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Preview */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <span className="text-brand-500 font-bold tracking-wider uppercase text-sm">Portfolio</span>
              <h2 className="text-4xl font-extrabold text-gray-900 mt-2">Selected Works</h2>
            </div>
            <Link to="/portfolio" className="flex items-center px-6 py-3 rounded-full bg-white border border-gray-200 text-gray-900 hover:border-brand-500 hover:text-brand-600 shadow-sm hover:shadow-md font-bold group transition">
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
             <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-gray-300">
                <PenTool className="mx-auto h-12 w-12 text-gray-300 mb-3"/>
                <h3 className="text-lg font-medium text-gray-900">New Projects Coming Soon</h3>
                <p className="text-gray-500">I am currently updating my portfolio with recent work.</p>
             </div>
          )}
        </div>
      </section>

      {/* Blogs Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
             <span className="text-brand-500 font-bold tracking-wider uppercase text-sm">Blog</span>
             <h2 className="text-4xl font-extrabold text-gray-900 mt-2">Latest Insights</h2>
          </div>

          {loading ? (
            <div className="flex justify-center py-12"><div className="w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full animate-spin"></div></div>
          ) : recentBlogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {recentBlogs.map((blog) => (
                <article key={blog.id} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group hover:-translate-y-2 flex flex-col">
                  <div className="relative h-56 overflow-hidden">
                    <img src={blog.imageUrl} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-700"/>
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-md text-xs font-bold text-gray-900 shadow-sm">
                      {blog.category}
                    </div>
                  </div>
                  <div className="p-8 flex-1 flex flex-col">
                    <div className="flex items-center gap-3 text-xs text-gray-400 mb-4 font-medium uppercase tracking-wide">
                      <span className="flex items-center gap-1"><Calendar size={12}/> {blog.date}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1"><BookOpen size={12}/> {blog.readTime}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 leading-snug group-hover:text-brand-600 transition">{blog.title}</h3>
                    <p className="text-gray-500 text-sm mb-6 line-clamp-3 leading-relaxed">{blog.excerpt}</p>
                    <div className="mt-auto pt-6 border-t border-gray-50">
                      <Link to={`/blog/${blog.id}`} className="text-gray-900 font-bold text-sm flex items-center gap-2 group-hover:text-brand-600 transition-colors">
                        Read Full Article <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform"/>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
               <BookOpen className="mx-auto h-12 w-12 text-gray-300 mb-3"/>
               <h3 className="text-lg font-medium text-gray-900">No Articles Yet</h3>
               <p className="text-gray-500">Stay tuned for upcoming insights on Design & Tech.</p>
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
              Ready to start your <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-accent-400">next big thing?</span>
            </h2>
            <p className="text-gray-400 text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
              I'm currently available for freelance projects. Let's discuss how we can elevate your brand and digital presence.
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
