
import React, { useState, useEffect } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Upload, Plus, X, Trash2, MessageSquare, Briefcase, ShoppingBag, BookOpen, Loader2, User, Reply, Settings, Save, CreditCard, CheckCircle, XCircle, Star, PieChart, TrendingUp, Menu } from 'lucide-react';
import { uploadImageToImgBB } from '../services/imgbbService';
import { 
  addProject, addProduct, addBlog, getMessages, getProjects, deleteProject, 
  getProducts, deleteProduct, getBlogs, deleteBlog, replyToMessage, 
  updateProfileSettings, getProfileSettings, getAllOrders, updateOrderStatus,
  getTestimonials, addTestimonial, deleteTestimonial
} from '../services/dataService';
import { Project, Product, BlogPost, Order, Testimonial } from '../types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const { Navigate } = ReactRouterDOM;

const Admin: React.FC = () => {
  const { user, isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'products' | 'blogs' | 'messages' | 'orders' | 'settings' | 'testimonials'>('overview');
  
  // Data Lists
  const [projects, setProjects] = useState<Project[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [profilePicUrl, setProfilePicUrl] = useState('');

  // Form States
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  
  // Chat / Message Logic
  const [selectedUserEmail, setSelectedUserEmail] = useState<string | null>(null);
  const [chatReply, setChatReply] = useState('');
  
  // Generic Forms
  const [projectForm, setProjectForm] = useState({ title: '', category: 'Branding', description: '' });
  const [productForm, setProductForm] = useState({ title: '', type: 'Asset', price: '', description: '' });
  const [blogForm, setBlogForm] = useState({ title: '', category: 'Design', excerpt: '', content: '', readTime: '5 min read' });
  const [testimonialForm, setTestimonialForm] = useState({ name: '', role: '', company: '', content: '' });

  // Load Data
  useEffect(() => {
    if(isAdmin) {
        refreshData();
    }
  }, [isAdmin, activeTab]);

  const refreshData = async () => {
      const [p, prod, b, m, o, t, profile] = await Promise.all([
        getProjects(), 
        getProducts(), 
        getBlogs(), 
        getMessages(),
        getAllOrders(),
        getTestimonials(),
        getProfileSettings()
      ]);
      setProjects(p);
      setProducts(prod);
      setBlogs(b);
      setMessages(m);
      setOrders(o);
      setTestimonials(t);
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

  const handleAddTestimonial = async (e: React.FormEvent) => {
      e.preventDefault();
      if(!uploadedUrl) return alert("Upload Avatar first");
      await addTestimonial({ ...testimonialForm, avatarUrl: uploadedUrl } as any);
      setUploadedUrl(null);
      setTestimonialForm({ name: '', role: '', company: '', content: '' });
      refreshData();
      alert("Testimonial Added");
  };

  const handleDelete = async (id: string, type: 'project' | 'product' | 'blog' | 'testimonial') => {
      if(!confirm("Are you sure?")) return;
      if(type === 'project') await deleteProject(id);
      if(type === 'product') await deleteProduct(id);
      if(type === 'blog') await deleteBlog(id);
      if(type === 'testimonial') await deleteTestimonial(id);
      refreshData();
  };

  const handleUpdateProfilePic = async () => {
    if (!uploadedUrl) return alert("Please upload an image first");
    await updateProfileSettings({ profilePic: uploadedUrl });
    setProfilePicUrl(uploadedUrl);
    setUploadedUrl(null);
    alert("Profile Picture Updated!");
  };

  const handleOrderStatus = async (id: string, status: 'completed' | 'rejected') => {
      if(!confirm(`Mark order as ${status}?`)) return;
      await updateOrderStatus(id, status);
      refreshData();
  };

  const handleSendReply = async (messageId: string) => {
      if (!chatReply.trim()) return;
      await replyToMessage(messageId, chatReply);
      setChatReply('');
      refreshData();
  };

  // --- Helper Logic for Chat ---
  // Group messages by Email
  const uniqueSenders = Array.from(new Set(messages.map(m => m.email))).filter(e => e) as string[];
  const activeChatMessages = selectedUserEmail 
     ? messages.filter(m => m.email === selectedUserEmail).sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
     : [];

  // --- Analytics Data ---
  const revenueData = orders
    .filter(o => o.status === 'completed')
    .reduce((acc: any[], order) => {
       const date = new Date(order.createdAt).toLocaleDateString();
       const existing = acc.find(i => i.date === date);
       if (existing) existing.amount += order.total;
       else acc.push({ date, amount: order.total });
       return acc;
    }, []);

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

  // Menu Items Configuration
  const menuItems = [
    { id: 'overview', icon: PieChart, label: 'Overview' },
    { id: 'orders', icon: CreditCard, label: 'Orders' },
    { id: 'messages', icon: MessageSquare, label: 'Messages' },
    { id: 'projects', icon: Briefcase, label: 'Portfolio (Work)' },
    { id: 'products', icon: ShoppingBag, label: 'Shop Items' },
    { id: 'blogs', icon: BookOpen, label: 'Blogs' },
    { id: 'testimonials', icon: Star, label: 'Reviews' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="bg-gray-50 min-h-screen pt-20 flex">
      
      {/* Sidebar Navigation (Desktop) */}
      <aside className="w-64 bg-white border-r border-gray-100 hidden lg:flex flex-col fixed h-full z-10 left-0 top-20">
         <div className="p-6">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Admin Menu</p>
            <nav className="space-y-1">
               {menuItems.map(tab => (
                  <button 
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all text-left ${activeTab === tab.id ? 'bg-brand-50 text-brand-600' : 'text-gray-600 hover:bg-gray-50'}`}
                  >
                      <tab.icon size={20} /> {tab.label}
                  </button>
               ))}
            </nav>
         </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 p-4 sm:p-8 overflow-y-auto pb-20">
        
        {/* Mobile Tabs (Scrollable) */}
        <div className="lg:hidden flex overflow-x-auto pb-4 gap-3 mb-6 no-scrollbar">
           {menuItems.map(t => (
              <button 
                key={t.id} 
                onClick={() => setActiveTab(t.id as any)} 
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap border transition-colors ${activeTab === t.id ? 'bg-brand-600 text-white border-brand-600' : 'bg-white border-gray-200 text-gray-600'}`}
              >
                <t.icon size={16}/> {t.label}
              </button>
           ))}
        </div>

        {activeTab === 'overview' && (
           <div className="space-y-8 animate-in fade-in">
              <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
              
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                       <div>
                          <p className="text-gray-500 text-sm font-medium">Total Revenue</p>
                          <h3 className="text-3xl font-bold text-gray-900">${orders.filter(o => o.status === 'completed').reduce((s, o) => s + o.total, 0)}</h3>
                       </div>
                       <div className="p-3 bg-green-100 text-green-600 rounded-xl"><TrendingUp size={24}/></div>
                    </div>
                 </div>
                 <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                     <div className="flex justify-between items-start mb-4">
                       <div>
                          <p className="text-gray-500 text-sm font-medium">Pending Orders</p>
                          <h3 className="text-3xl font-bold text-gray-900">{orders.filter(o => o.status === 'pending').length}</h3>
                       </div>
                       <div className="p-3 bg-yellow-100 text-yellow-600 rounded-xl"><CreditCard size={24}/></div>
                    </div>
                 </div>
                 <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                     <div className="flex justify-between items-start mb-4">
                       <div>
                          <p className="text-gray-500 text-sm font-medium">Total Messages</p>
                          <h3 className="text-3xl font-bold text-gray-900">{messages.length}</h3>
                       </div>
                       <div className="p-3 bg-blue-100 text-blue-600 rounded-xl"><MessageSquare size={24}/></div>
                    </div>
                 </div>
              </div>

              {/* Chart */}
              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                 <h3 className="font-bold text-gray-900 mb-6">Revenue Trends</h3>
                 <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                       <BarChart data={revenueData}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} />
                          <XAxis dataKey="date" axisLine={false} tickLine={false} />
                          <YAxis axisLine={false} tickLine={false} />
                          <Tooltip cursor={{fill: '#f9fafb'}} />
                          <Bar dataKey="amount" fill="#d946ef" radius={[4, 4, 0, 0]} barSize={40} />
                       </BarChart>
                    </ResponsiveContainer>
                 </div>
              </div>
           </div>
        )}

        {/* Messenger Style Chat */}
        {activeTab === 'messages' && (
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-140px)] bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
               {/* Sidebar Users */}
               <div className="lg:col-span-1 border-r border-gray-100 flex flex-col">
                  <div className="p-4 border-b border-gray-100 font-bold text-gray-700">Conversations</div>
                  <div className="overflow-y-auto flex-1">
                     {uniqueSenders.length === 0 ? (
                        <p className="p-4 text-gray-400 text-sm">No messages yet.</p>
                     ) : (
                        uniqueSenders.map((email, idx) => (
                            <div 
                               key={idx} 
                               onClick={() => setSelectedUserEmail(email)}
                               className={`p-4 flex items-center gap-3 cursor-pointer hover:bg-gray-50 transition ${selectedUserEmail === email ? 'bg-brand-50 border-r-4 border-brand-500' : ''}`}
                            >
                               <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 font-bold">
                                  {email.charAt(0).toUpperCase()}
                               </div>
                               <div className="min-w-0">
                                  <p className="font-bold text-gray-900 text-sm truncate">{email}</p>
                                  <p className="text-xs text-gray-500 truncate">Click to view chat</p>
                               </div>
                            </div>
                        ))
                     )}
                  </div>
               </div>

               {/* Chat Area */}
               <div className="lg:col-span-2 flex flex-col bg-gray-50/50">
                  {selectedUserEmail ? (
                     <>
                        <div className="p-4 bg-white border-b border-gray-100 flex justify-between items-center shadow-sm z-10">
                           <span className="font-bold text-gray-900">{selectedUserEmail}</span>
                           <a href={`mailto:${selectedUserEmail}`} className="text-xs text-brand-600 font-bold hover:underline flex items-center gap-1"><Reply size={14}/> Email</a>
                        </div>
                        
                        <div className="flex-1 overflow-y-auto p-6 space-y-4">
                           {activeChatMessages.map(m => (
                              <div key={m.id} className="flex flex-col gap-2">
                                 {/* User Message */}
                                 <div className="flex justify-start">
                                    <div className="bg-white border border-gray-200 p-3 rounded-2xl rounded-tl-none max-w-[80%] shadow-sm">
                                       <p className="text-sm text-gray-800">{m.text}</p>
                                       <p className="text-[10px] text-gray-400 mt-1 text-right">{new Date(m.createdAt).toLocaleTimeString()}</p>
                                    </div>
                                 </div>
                                 
                                 {/* Admin Reply (if any) */}
                                 {m.reply && (
                                    <div className="flex justify-end">
                                       <div className="bg-brand-600 text-white p-3 rounded-2xl rounded-tr-none max-w-[80%] shadow-sm">
                                          <p className="text-sm">{m.reply}</p>
                                       </div>
                                    </div>
                                 )}

                                 {/* Reply Input (Per message context) */}
                                 {!m.reply && (
                                    <div className="flex justify-end">
                                       <div className="flex gap-2 w-full max-w-[80%]">
                                          <input 
                                             type="text" 
                                             placeholder="Reply..." 
                                             className="flex-1 border border-gray-300 rounded-full px-3 py-1 text-sm"
                                             value={chatReply}
                                             onChange={(e) => setChatReply(e.target.value)}
                                          />
                                          <button onClick={() => handleSendReply(m.id)} className="bg-gray-900 text-white px-3 py-1 rounded-full text-xs font-bold">Send</button>
                                       </div>
                                    </div>
                                 )}
                              </div>
                           ))}
                        </div>
                     </>
                  ) : (
                     <div className="flex flex-col items-center justify-center h-full text-gray-400">
                        <MessageSquare size={48} className="mb-4 opacity-20"/>
                        <p>Select a conversation to start chatting</p>
                     </div>
                  )}
               </div>
           </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
               <table className="w-full text-left border-collapse">
                  <thead className="bg-gray-50">
                    <tr className="text-gray-500 text-xs uppercase">
                      <th className="p-4">Date</th>
                      <th className="p-4">Customer</th>
                      <th className="p-4">Amount</th>
                      <th className="p-4">Verification</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm divide-y divide-gray-100">
                    {orders.map(order => (
                      <tr key={order.id} className="hover:bg-gray-50/50">
                        <td className="p-4 text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</td>
                        <td className="p-4 font-bold text-gray-900">{order.userEmail}</td>
                        <td className="p-4 text-brand-600 font-bold">${order.total}</td>
                        <td className="p-4">
                           {order.trxId ? (
                             <div>
                                <span className="text-xs bg-gray-100 px-2 py-1 rounded font-mono">{order.trxId}</span>
                                <div className="text-xs text-gray-400 mt-1">{order.paymentMethod} - {order.senderNumber}</div>
                             </div>
                           ) : <span className="text-gray-400 italic">Auto</span>}
                        </td>
                        <td className="p-4">
                           <span className={`inline-flex px-2 py-1 rounded-full text-xs font-bold uppercase ${order.status === 'completed' ? 'bg-green-100 text-green-700' : order.status === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                             {order.status}
                           </span>
                        </td>
                        <td className="p-4 text-right flex justify-end gap-2">
                           {order.status === 'pending' && (
                              <>
                                <button onClick={() => handleOrderStatus(order.id!, 'completed')} className="p-2 hover:bg-green-50 text-green-600 rounded-lg"><CheckCircle size={18}/></button>
                                <button onClick={() => handleOrderStatus(order.id!, 'rejected')} className="p-2 hover:bg-red-50 text-red-600 rounded-lg"><XCircle size={18}/></button>
                              </>
                           )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
               </table>
            </div>
        )}

        {/* Testimonials Manager */}
        {activeTab === 'testimonials' && (
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-2xl border border-gray-100 h-fit sticky top-24">
                 <h2 className="text-xl font-bold mb-6">Add Testimonial</h2>
                 <form onSubmit={handleAddTestimonial} className="space-y-4">
                    <FileUploader />
                    <input type="text" placeholder="Client Name" required className="w-full p-3 bg-gray-50 rounded-lg border-none" value={testimonialForm.name} onChange={e => setTestimonialForm({...testimonialForm, name: e.target.value})} />
                    <input type="text" placeholder="Role (CEO)" required className="w-full p-3 bg-gray-50 rounded-lg border-none" value={testimonialForm.role} onChange={e => setTestimonialForm({...testimonialForm, role: e.target.value})} />
                    <input type="text" placeholder="Company" required className="w-full p-3 bg-gray-50 rounded-lg border-none" value={testimonialForm.company} onChange={e => setTestimonialForm({...testimonialForm, company: e.target.value})} />
                    <textarea placeholder="Review Content" required className="w-full p-3 bg-gray-50 rounded-lg border-none" value={testimonialForm.content} onChange={e => setTestimonialForm({...testimonialForm, content: e.target.value})} />
                    <button type="submit" disabled={!uploadedUrl} className="w-full bg-brand-600 text-white py-3 rounded-lg font-bold hover:bg-brand-700 disabled:opacity-50">Add Review</button>
                 </form>
              </div>
              <div className="lg:col-span-2 space-y-4">
                 {testimonials.map(t => (
                    <div key={t.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex gap-4 items-start">
                       <img src={t.avatarUrl} className="w-12 h-12 rounded-full object-cover bg-gray-100"/>
                       <div className="flex-1">
                          <h4 className="font-bold text-gray-900">{t.name}</h4>
                          <p className="text-xs text-gray-500 mb-2">{t.role}, {t.company}</p>
                          <p className="text-gray-600 italic">"{t.content}"</p>
                       </div>
                       <button onClick={() => handleDelete(t.id, 'testimonial')} className="text-red-400 hover:bg-red-50 p-2 rounded-lg"><Trash2 size={18}/></button>
                    </div>
                 ))}
              </div>
           </div>
        )}

        {/* Content Tabs (Projects/Products/Blogs) */}
        {['projects', 'products', 'blogs'].includes(activeTab) && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
                        <h2 className="text-xl font-bold mb-6 capitalize">Add {activeTab.slice(0, -1)}</h2>
                        {/* Forms Logic */}
                        {activeTab === 'projects' && (
                            <form onSubmit={handleAddProject} className="space-y-4">
                                <FileUploader />
                                <input type="text" placeholder="Title" required className="w-full p-3 bg-gray-50 rounded-lg" value={projectForm.title} onChange={e => setProjectForm({...projectForm, title: e.target.value})} />
                                <select className="w-full p-3 bg-gray-50 rounded-lg" value={projectForm.category} onChange={e => setProjectForm({...projectForm, category: e.target.value})}><option>Branding</option><option>Web Design</option></select>
                                <textarea placeholder="Description" required className="w-full p-3 bg-gray-50 rounded-lg" value={projectForm.description} onChange={e => setProjectForm({...projectForm, description: e.target.value})} />
                                <button type="submit" disabled={!uploadedUrl} className="w-full bg-brand-600 text-white py-3 rounded-lg font-bold">Publish</button>
                            </form>
                        )}
                        {activeTab === 'blogs' && (
                            <form onSubmit={handleAddBlog} className="space-y-4">
                                <FileUploader />
                                <input type="text" placeholder="Title" required className="w-full p-3 bg-gray-50 rounded-lg" value={blogForm.title} onChange={e => setBlogForm({...blogForm, title: e.target.value})} />
                                <textarea placeholder="Content" required className="w-full p-3 bg-gray-50 rounded-lg h-32" value={blogForm.content} onChange={e => setBlogForm({...blogForm, content: e.target.value})} />
                                <button type="submit" disabled={!uploadedUrl} className="w-full bg-brand-600 text-white py-3 rounded-lg font-bold">Post</button>
                            </form>
                        )}
                         {activeTab === 'products' && (
                            <form onSubmit={handleAddProduct} className="space-y-4">
                                <FileUploader />
                                <input type="text" placeholder="Title" required className="w-full p-3 bg-gray-50 rounded-lg" value={productForm.title} onChange={e => setProductForm({...productForm, title: e.target.value})} />
                                <input type="number" placeholder="Price" required className="w-full p-3 bg-gray-50 rounded-lg" value={productForm.price} onChange={e => setProductForm({...productForm, price: e.target.value})} />
                                <button type="submit" disabled={!uploadedUrl} className="w-full bg-brand-600 text-white py-3 rounded-lg font-bold">Add Item</button>
                            </form>
                        )}
                    </div>
                </div>
                <div className="lg:col-span-2 space-y-4">
                   {/* List Logic */}
                   {activeTab === 'projects' && projects.map(p => (
                      <div key={p.id} className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100">
                         <img src={p.imageUrl} className="w-16 h-16 rounded-lg object-cover"/>
                         <div className="flex-1"><h4 className="font-bold">{p.title}</h4><p className="text-xs">{p.category}</p></div>
                         <button onClick={() => handleDelete(p.id, 'project')} className="text-red-400 hover:bg-red-50 p-2 rounded"><Trash2 size={18}/></button>
                      </div>
                   ))}
                   {activeTab === 'blogs' && blogs.map(b => (
                      <div key={b.id} className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100">
                         <img src={b.imageUrl} className="w-16 h-16 rounded-lg object-cover"/>
                         <div className="flex-1"><h4 className="font-bold">{b.title}</h4><p className="text-xs">{b.category}</p></div>
                         <button onClick={() => handleDelete(b.id, 'blog')} className="text-red-400 hover:bg-red-50 p-2 rounded"><Trash2 size={18}/></button>
                      </div>
                   ))}
                    {activeTab === 'products' && products.map(p => (
                      <div key={p.id} className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100">
                         <img src={p.imageUrl} className="w-16 h-16 rounded-lg object-cover"/>
                         <div className="flex-1"><h4 className="font-bold">{p.title}</h4><p className="text-xs">${p.price}</p></div>
                         <button onClick={() => handleDelete(p.id, 'product')} className="text-red-400 hover:bg-red-50 p-2 rounded"><Trash2 size={18}/></button>
                      </div>
                   ))}
                </div>
            </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
            <div className="max-w-xl mx-auto bg-white p-8 rounded-3xl border border-gray-200 shadow-sm text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Profile Settings</h2>
                <div className="flex flex-col items-center gap-6">
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-brand-100">
                        <img src={uploadedUrl || profilePicUrl || "https://via.placeholder.com/150"} className="w-full h-full object-cover" />
                    </div>
                    <FileUploader />
                    <button 
                      onClick={handleUpdateProfilePic}
                      disabled={!uploadedUrl}
                      className="bg-brand-600 text-white px-8 py-3 rounded-full font-bold hover:bg-brand-700 disabled:opacity-50 flex items-center gap-2"
                    >
                      <Save size={18}/> Save Profile Picture
                    </button>
                </div>
            </div>
        )}

      </main>
    </div>
  );
};

export default Admin;
