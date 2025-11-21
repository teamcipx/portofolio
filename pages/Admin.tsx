
import React, { useState, useEffect } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Upload, Plus, X, Trash2, MessageSquare, Briefcase, ShoppingBag, BookOpen, Loader2, User, Reply, Settings, Save } from 'lucide-react';
import { uploadImageToImgBB } from '../services/imgbbService';
import { addProject, addProduct, addBlog, getMessages, getProjects, deleteProject, getProducts, deleteProduct, getBlogs, deleteBlog, replyToMessage, updateProfileSettings, getProfileSettings } from '../services/dataService';
import { Project, Product, BlogPost } from '../types';

const { Navigate } = ReactRouterDOM;

const Admin: React.FC = () => {
  const { user, isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'products' | 'blogs' | 'messages' | 'settings'>('projects');
  
  // Data Lists
  const [projects, setProjects] = useState<Project[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [profilePicUrl, setProfilePicUrl] = useState('');

  // Form States
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  
  // Reply State
  const [replyText, setReplyText] = useState<{[key: string]: string}>({});
  
  // Generic Forms
  const [projectForm, setProjectForm] = useState({ title: '', category: 'Branding', description: '' });
  const [productForm, setProductForm] = useState({ title: '', type: 'Asset', price: '', description: '' });
  const [blogForm, setBlogForm] = useState({ title: '', category: 'Design', excerpt: '', content: '', readTime: '5 min read' });

  // Load Data
  useEffect(() => {
    if(isAdmin) {
        refreshData();
    }
  }, [isAdmin, activeTab]);

  const refreshData = async () => {
      const [p, prod, b, m, profile] = await Promise.all([
        getProjects(), 
        getProducts(), 
        getBlogs(), 
        getMessages(),
        getProfileSettings()
      ]);
      setProjects(p);
      setProducts(prod);
      setBlogs(b);
      setMessages(m);
      if (profile && profile.profilePic) {
        setProfilePicUrl(profile.profilePic);
      }
  };

  if (!user || !isAdmin) {
    return <Navigate to="/login" replace />;
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploading(true);
      const url = await uploadImageToImgBB(e.target.files[0]);
      if (url) setUploadedUrl(url);
      setUploading(false);
    }
  };

  // Handlers
  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!uploadedUrl) return alert("Upload image first");
    await addProject({ ...projectForm, imageUrl: uploadedUrl } as any);
    setUploadedUrl(null);
    setProjectForm({ title: '', category: 'Branding', description: '' });
    refreshData();
    alert("Project Added");
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!uploadedUrl) return alert("Upload image first");
    await addProduct({ ...productForm, price: Number(productForm.price), imageUrl: uploadedUrl, rating: 5 } as any);
    setUploadedUrl(null);
    setProductForm({ title: '', type: 'Asset', price: '', description: '' });
    refreshData();
    alert("Product Added");
  };

  const handleAddBlog = async (e: React.FormEvent) => {
      e.preventDefault();
      if(!uploadedUrl) return alert("Upload image first");
      await addBlog({ ...blogForm, imageUrl: uploadedUrl, date: new Date().toLocaleDateString() } as any);
      setUploadedUrl(null);
      setBlogForm({ title: '', category: 'Design', excerpt: '', content: '', readTime: '5 min' });
      refreshData();
      alert("Blog Published");
  };

  const handleDelete = async (id: string, type: 'project' | 'product' | 'blog') => {
      if(!confirm("Are you sure?")) return;
      if(type === 'project') await deleteProject(id);
      if(type === 'product') await deleteProduct(id);
      if(type === 'blog') await deleteBlog(id);
      refreshData();
  };

  const handleReply = async (messageId: string) => {
    const text = replyText[messageId];
    if (!text) return;
    await replyToMessage(messageId, text);
    refreshData();
    setReplyText(prev => ({ ...prev, [messageId]: '' }));
    alert("Reply sent!");
  };

  const handleUpdateProfilePic = async () => {
    if (!uploadedUrl) return alert("Please upload an image first");
    await updateProfileSettings({ profilePic: uploadedUrl });
    setProfilePicUrl(uploadedUrl);
    setUploadedUrl(null);
    alert("Profile Picture Updated!");
  };

  // Components
  const FileUploader = () => (
    <div className="relative border-2 border-dashed border-gray-200 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-colors mb-4">
        {uploadedUrl ? (
            <div className="relative w-full">
                <img src={uploadedUrl} alt="Preview" className="w-full h-32 object-cover rounded-lg" />
                <button type="button" onClick={() => setUploadedUrl(null)} className="absolute top-1 right-1 bg-white p-1 rounded-full shadow text-red-500"><X size={14}/></button>
            </div>
        ) : (
            <>
                <input type="file" accept="image/*" onChange={handleFileChange} disabled={uploading} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                {uploading ? <Loader2 className="animate-spin text-brand-500"/> : <Upload className="text-gray-400 mb-2"/>}
                <span className="text-xs text-gray-500">Upload Image</span>
            </>
        )}
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
            <p className="text-gray-500">Content Management System</p>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
              {[
                  { id: 'projects', icon: Briefcase, label: 'Projects' },
                  { id: 'products', icon: ShoppingBag, label: 'Shop' },
                  { id: 'blogs', icon: BookOpen, label: 'Blogs' },
                  { id: 'messages', icon: MessageSquare, label: 'Messages' },
                  { id: 'settings', icon: Settings, label: 'Settings' },
              ].map(tab => (
                  <button 
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${activeTab === tab.id ? 'bg-brand-600 text-white shadow-lg' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
                  >
                      <tab.icon size={18} /> <span className="hidden md:inline">{tab.label}</span>
                  </button>
              ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Form Column (Left) */}
            {activeTab !== 'messages' && activeTab !== 'overview' && activeTab !== 'settings' && (
                <div className="lg:col-span-1">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
                        <h2 className="text-xl font-bold mb-6 capitalize">Add New {activeTab.slice(0, -1)}</h2>
                        
                        {activeTab === 'projects' && (
                            <form onSubmit={handleAddProject} className="space-y-4">
                                <FileUploader />
                                <input type="text" placeholder="Project Title" required className="w-full p-3 bg-gray-50 rounded-lg border-none focus:ring-2 ring-brand-500" value={projectForm.title} onChange={e => setProjectForm({...projectForm, title: e.target.value})} />
                                <select className="w-full p-3 bg-gray-50 rounded-lg border-none" value={projectForm.category} onChange={e => setProjectForm({...projectForm, category: e.target.value})}>
                                    <option>Branding</option><option>Web Design</option><option>Illustration</option>
                                </select>
                                <textarea placeholder="Description" required className="w-full p-3 bg-gray-50 rounded-lg border-none" value={projectForm.description} onChange={e => setProjectForm({...projectForm, description: e.target.value})} />
                                <button type="submit" disabled={!uploadedUrl} className="w-full bg-brand-600 text-white py-3 rounded-lg font-bold hover:bg-brand-700 disabled:opacity-50">Publish Project</button>
                            </form>
                        )}

                        {activeTab === 'products' && (
                            <form onSubmit={handleAddProduct} className="space-y-4">
                                <FileUploader />
                                <input type="text" placeholder="Product Title" required className="w-full p-3 bg-gray-50 rounded-lg border-none" value={productForm.title} onChange={e => setProductForm({...productForm, title: e.target.value})} />
                                <div className="flex gap-2">
                                    <select className="flex-1 p-3 bg-gray-50 rounded-lg border-none" value={productForm.type} onChange={e => setProductForm({...productForm, type: e.target.value})}>
                                        <option>Course</option><option>Asset</option>
                                    </select>
                                    <input type="number" placeholder="Price $" required className="w-24 p-3 bg-gray-50 rounded-lg border-none" value={productForm.price} onChange={e => setProductForm({...productForm, price: e.target.value})} />
                                </div>
                                <textarea placeholder="Description" required className="w-full p-3 bg-gray-50 rounded-lg border-none" value={productForm.description} onChange={e => setProductForm({...productForm, description: e.target.value})} />
                                <button type="submit" disabled={!uploadedUrl} className="w-full bg-brand-600 text-white py-3 rounded-lg font-bold hover:bg-brand-700 disabled:opacity-50">Add Product</button>
                            </form>
                        )}

                        {activeTab === 'blogs' && (
                             <form onSubmit={handleAddBlog} className="space-y-4">
                                <FileUploader />
                                <input type="text" placeholder="Article Title" required className="w-full p-3 bg-gray-50 rounded-lg border-none" value={blogForm.title} onChange={e => setBlogForm({...blogForm, title: e.target.value})} />
                                <input type="text" placeholder="Category (e.g. Design)" required className="w-full p-3 bg-gray-50 rounded-lg border-none" value={blogForm.category} onChange={e => setBlogForm({...blogForm, category: e.target.value})} />
                                <textarea placeholder="Short Excerpt (2 lines)" required className="w-full p-3 bg-gray-50 rounded-lg border-none" value={blogForm.excerpt} onChange={e => setBlogForm({...blogForm, excerpt: e.target.value})} />
                                <textarea 
                                  placeholder="Full Article Content..." 
                                  required 
                                  className="w-full p-3 bg-gray-50 rounded-lg border-none h-40" 
                                  value={blogForm.content} 
                                  onChange={e => setBlogForm({...blogForm, content: e.target.value})} 
                                />
                                <button type="submit" disabled={!uploadedUrl} className="w-full bg-brand-600 text-white py-3 rounded-lg font-bold hover:bg-brand-700 disabled:opacity-50">Publish Post</button>
                            </form>
                        )}
                    </div>
                </div>
            )}

            {/* List Column (Right) */}
            <div className={`${(activeTab === 'messages' || activeTab === 'settings') ? 'col-span-3' : 'lg:col-span-2'}`}>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 min-h-[500px]">
                    
                    {activeTab !== 'settings' && (
                      <h3 className="text-lg font-bold mb-6 border-b pb-4 flex justify-between">
                          <span>Manage {activeTab}</span>
                          <span className="text-sm text-gray-500 font-normal">Live Data from Firebase</span>
                      </h3>
                    )}

                    {activeTab === 'projects' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {projects.map(p => (
                                <div key={p.id} className="flex items-center gap-4 p-3 border rounded-xl hover:bg-gray-50">
                                    <img src={p.imageUrl} className="w-16 h-16 rounded-lg object-cover" />
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-bold truncate">{p.title}</h4>
                                        <p className="text-xs text-gray-500">{p.category}</p>
                                    </div>
                                    <button onClick={() => handleDelete(p.id, 'project')} className="text-red-400 hover:text-red-600"><Trash2 size={18}/></button>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'products' && (
                        <div className="space-y-3">
                             {products.map(p => (
                                <div key={p.id} className="flex items-center gap-4 p-3 border rounded-xl hover:bg-gray-50">
                                    <img src={p.imageUrl} className="w-12 h-12 rounded-lg object-cover" />
                                    <div className="flex-1">
                                        <h4 className="font-bold">{p.title}</h4>
                                        <p className="text-xs text-gray-500">${p.price} • {p.type}</p>
                                    </div>
                                    <button onClick={() => handleDelete(p.id, 'product')} className="text-red-400 hover:text-red-600"><Trash2 size={18}/></button>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'blogs' && (
                        <div className="space-y-3">
                             {blogs.map(b => (
                                <div key={b.id} className="flex items-center gap-4 p-3 border rounded-xl hover:bg-gray-50">
                                    <img src={b.imageUrl} className="w-12 h-12 rounded-lg object-cover" />
                                    <div className="flex-1">
                                        <h4 className="font-bold">{b.title}</h4>
                                        <p className="text-xs text-gray-500">{b.date} • {b.category}</p>
                                    </div>
                                    <button onClick={() => handleDelete(b.id, 'blog')} className="text-red-400 hover:text-red-600"><Trash2 size={18}/></button>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'messages' && (
                        <div className="space-y-4">
                            {messages.length === 0 && <p className="text-center text-gray-400 mt-10">No messages yet.</p>}
                            {messages.map((m: any) => (
                                <div key={m.id} className="p-4 bg-gray-50 rounded-xl border border-gray-200 flex flex-col sm:flex-row gap-4">
                                    <div className="flex-shrink-0">
                                        {m.photoUrl ? (
                                            <img src={m.photoUrl} alt={m.sender} className="w-10 h-10 rounded-full bg-gray-200 object-cover"/>
                                        ) : (
                                            <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center text-brand-600">
                                                <User size={20}/>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1 w-full">
                                        <div className="flex justify-between items-start mb-1">
                                            <div className="flex flex-col">
                                                <span className="font-bold text-gray-900">{m.sender}</span>
                                                {m.email && <a href={`mailto:${m.email}`} className="text-xs text-brand-500 hover:underline">{m.email}</a>}
                                            </div>
                                            <span className="text-xs text-gray-400 whitespace-nowrap ml-2">{new Date(m.createdAt).toLocaleString()}</span>
                                        </div>
                                        <p className="text-gray-700 mt-2 text-sm leading-relaxed bg-white p-3 rounded-lg border border-gray-100">{m.text}</p>
                                        
                                        {/* Admin Reply Display / Input */}
                                        {m.reply ? (
                                          <div className="mt-3 ml-4 pl-4 border-l-2 border-brand-300">
                                            <p className="text-xs text-brand-600 font-bold">You replied:</p>
                                            <p className="text-sm text-gray-600">{m.reply}</p>
                                          </div>
                                        ) : (
                                          <div className="mt-3 flex gap-2">
                                             <input 
                                                type="text" 
                                                placeholder="Type a direct reply to chat..." 
                                                className="flex-1 border border-gray-200 rounded-full px-4 py-2 text-sm focus:ring-2 ring-brand-500 outline-none"
                                                value={replyText[m.id] || ''}
                                                onChange={(e) => setReplyText({...replyText, [m.id]: e.target.value})}
                                             />
                                             <button 
                                                onClick={() => handleReply(m.id)}
                                                className="bg-gray-900 text-white px-4 py-2 rounded-full text-sm font-bold hover:bg-brand-600"
                                             >
                                                Send
                                             </button>
                                          </div>
                                        )}

                                        {/* Email Reply Button */}
                                        {m.email && (
                                          <div className="mt-2 flex justify-end">
                                            <a 
                                              href={`mailto:${m.email}?subject=Re: Portfolio Inquiry&body=Hi ${m.sender},%0D%0A%0D%0AThank you for reaching out via my portfolio chat.%0D%0A%0D%0ARegarding your message: "${m.text.substring(0, 50)}..."%0D%0A%0D%0A`}
                                              className="flex items-center gap-1 text-xs font-medium text-gray-500 hover:text-brand-600 transition-colors"
                                            >
                                              <Reply size={14} /> Reply via Email Client
                                            </a>
                                          </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'settings' && (
                        <div className="max-w-xl mx-auto text-center space-y-6">
                            <h3 className="text-2xl font-bold text-gray-900">Admin Settings</h3>
                            <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
                                <h4 className="font-bold text-gray-700 mb-4">Update Profile Picture</h4>
                                <p className="text-sm text-gray-500 mb-6">This image appears on the Home Page hero section.</p>
                                
                                <div className="flex flex-col items-center gap-4">
                                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-brand-100">
                                      {uploadedUrl ? (
                                         <img src={uploadedUrl} className="w-full h-full object-cover" />
                                      ) : (
                                         <img src={profilePicUrl || "https://via.placeholder.com/150"} className="w-full h-full object-cover" />
                                      )}
                                    </div>
                                    
                                    <FileUploader />
                                    
                                    <button 
                                      onClick={handleUpdateProfilePic}
                                      disabled={!uploadedUrl}
                                      className="flex items-center gap-2 bg-brand-600 text-white px-6 py-3 rounded-full font-bold hover:bg-brand-700 disabled:opacity-50 transition"
                                    >
                                      <Save size={18} /> Save New Profile Pic
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

        </div>
      </div>
    </div>
  );
};

export default Admin;
