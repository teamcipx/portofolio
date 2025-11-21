
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { useAuth } from '../contexts/AuthContext';
import { PRODUCTS } from '../constants';
import { DollarSign, Users, ShoppingBag, TrendingUp, Upload, Plus, X, Image as ImageIcon, Loader2 } from 'lucide-react';
import { uploadImageToImgBB } from '../services/imgbbService';

// Mock Data
const SALES_DATA = [
  { name: 'Mon', sales: 4000 },
  { name: 'Tue', sales: 3000 },
  { name: 'Wed', sales: 2000 },
  { name: 'Thu', sales: 2780 },
  { name: 'Fri', sales: 1890 },
  { name: 'Sat', sales: 2390 },
  { name: 'Sun', sales: 3490 },
];

const VISITOR_DATA = [
  { name: 'Mon', visitors: 240 },
  { name: 'Tue', visitors: 139 },
  { name: 'Wed', visitors: 980 },
  { name: 'Thu', visitors: 390 },
  { name: 'Fri', visitors: 480 },
  { name: 'Sat', visitors: 380 },
  { name: 'Sun', visitors: 430 },
];

const Admin: React.FC = () => {
  const { user, isAdmin } = useAuth();
  
  // Upload State
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [projectForm, setProjectForm] = useState({
    title: '',
    category: 'Branding',
    description: ''
  });

  if (!user || !isAdmin) {
    return <Navigate to="/login" replace />;
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploading(true);
      const url = await uploadImageToImgBB(e.target.files[0]);
      if (url) {
        setUploadedUrl(url);
      }
      setUploading(false);
    }
  };

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if(!uploadedUrl) {
      alert("Please upload an image first!");
      return;
    }
    
    const newProject = {
      ...projectForm,
      imageUrl: uploadedUrl,
      id: Date.now().toString()
    };
    
    console.log("New Project Payload:", newProject);
    alert(`Success! Project "${newProject.title}" ready to be saved to database. (See console)`);
    
    // Reset Form
    setUploadedUrl(null);
    setProjectForm({ title: '', category: 'Branding', description: '' });
  };

  const StatCard = ({ title, value, icon: Icon, color }: any) => (
    <div className="glass-card bg-white p-6 rounded-2xl flex items-center gap-4 transition-all duration-300 hover:transform hover:-translate-y-1">
      <div className={`p-4 rounded-xl ${color} bg-opacity-10 text-${color.replace('bg-', '')}`}>
        <Icon size={24} className={color.replace('bg-', 'text-')} />
      </div>
      <div>
        <p className="text-gray-500 text-sm font-medium">{title}</p>
        <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-500 mt-1">Manage your portfolio, shop, and analytics.</p>
          </div>
          <div className="flex items-center gap-4">
             <div className="text-right hidden md:block">
                <p className="text-sm font-bold text-gray-900">{user.username}</p>
                <p className="text-xs text-gray-500">Super Admin</p>
             </div>
             <div className="h-10 w-10 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 font-bold border-2 border-white shadow-sm">
                {user.username.charAt(0)}
             </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard title="Total Revenue" value="$12,345" icon={DollarSign} color="bg-green-500" />
          <StatCard title="Active Users" value="1,234" icon={Users} color="bg-blue-500" />
          <StatCard title="Total Sales" value="456" icon={ShoppingBag} color="bg-brand-500" />
          <StatCard title="Growth" value="+23%" icon={TrendingUp} color="bg-accent-500" />
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
           
           {/* Add New Project Form */}
           <div className="lg:col-span-1">
             <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-full">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Plus size={20} className="text-brand-600"/> Add New Project
                </h3>
                
                <form onSubmit={handleAddProject} className="space-y-5">
                  {/* Image Upload Area */}
                  <div className="relative border-2 border-dashed border-gray-200 rounded-2xl p-6 flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-colors group">
                    {uploadedUrl ? (
                      <div className="relative w-full">
                        <img src={uploadedUrl} alt="Preview" className="w-full h-48 object-cover rounded-xl shadow-sm" />
                        <button 
                          type="button"
                          onClick={() => setUploadedUrl(null)}
                          className="absolute top-2 right-2 bg-white/90 p-2 rounded-full shadow-md hover:bg-red-50 text-red-500 transition"
                        >
                          <X size={16} />
                        </button>
                        <div className="mt-2 flex items-center justify-center gap-1 text-xs text-green-600 font-medium">
                            <span className="w-2 h-2 rounded-full bg-green-500"></span> Image Uploaded
                        </div>
                      </div>
                    ) : (
                      <>
                        <input 
                          type="file" 
                          accept="image/*"
                          onChange={handleFileChange}
                          disabled={uploading}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10 disabled:cursor-not-allowed"
                        />
                        {uploading ? (
                          <div className="flex flex-col items-center text-brand-600">
                            <Loader2 size={32} className="animate-spin mb-2" />
                            <span className="text-sm font-medium">Uploading to ImgBB...</span>
                          </div>
                        ) : (
                          <>
                            <div className="bg-brand-50 p-4 rounded-full mb-3 text-brand-500 group-hover:scale-110 transition-transform">
                              <Upload size={24} />
                            </div>
                            <p className="text-sm font-medium text-gray-900">Click to upload image</p>
                            <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 10MB</p>
                          </>
                        )}
                      </>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Project Title</label>
                    <input 
                      type="text" 
                      required
                      value={projectForm.title}
                      onChange={e => setProjectForm({...projectForm, title: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all"
                      placeholder="e.g., Neon Branding"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <div className="relative">
                      <select 
                        value={projectForm.category}
                        onChange={e => setProjectForm({...projectForm, category: e.target.value})}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none appearance-none transition-all"
                      >
                        <option>Branding</option>
                        <option>Web Design</option>
                        <option>Illustration</option>
                        <option>Social Media</option>
                      </select>
                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                      </div>
                    </div>
                  </div>

                  <div>
                     <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                     <textarea 
                        rows={3}
                        required
                        value={projectForm.description}
                        onChange={e => setProjectForm({...projectForm, description: e.target.value})}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all"
                        placeholder="Short description..."
                     />
                  </div>

                  <button 
                    type="submit" 
                    disabled={!uploadedUrl}
                    className="w-full bg-gradient-to-r from-brand-600 to-accent-600 text-white py-3 rounded-xl font-bold shadow-lg shadow-brand-200 hover:shadow-xl hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none disabled:scale-100"
                  >
                    Publish Project
                  </button>
                </form>
             </div>
           </div>

           {/* Charts Section */}
           <div className="lg:col-span-2 flex flex-col gap-8">
             <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-6">Sales Overview</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={SALES_DATA}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                      <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                      <Tooltip 
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                        cursor={{ fill: '#f8fafc' }}
                      />
                      <Bar dataKey="sales" fill="#d946ef" radius={[6, 6, 0, 0]} barSize={40} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-6">Visitor Traffic</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={VISITOR_DATA}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                      <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                      <Tooltip 
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                      />
                      <Line type="monotone" dataKey="visitors" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 4, fill: '#8b5cf6', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6, strokeWidth: 0 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
           </div>
        </div>

        {/* Product List */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center">
            <h3 className="text-lg font-bold text-gray-900">Existing Products</h3>
            <button className="text-sm text-brand-600 font-semibold hover:text-brand-700">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-100">
              <thead className="bg-gray-50/50">
                <tr>
                  <th className="px-8 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Product</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Rating</th>
                  <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {PRODUCTS.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50/50 transition">
                    <td className="px-8 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-12 w-12 flex-shrink-0 rounded-lg overflow-hidden border border-gray-100 bg-gray-50">
                          <img className="h-full w-full object-cover" src={product.imageUrl} alt="" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-bold text-gray-900">{product.title}</div>
                          <div className="text-xs text-gray-400">ID: #{product.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full ${product.type === 'Course' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                        {product.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                      ${product.price}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex items-center gap-1">
                      <span className="text-yellow-400">★</span> {product.rating}
                    </td>
                     <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-gray-400 hover:text-brand-600 transition mx-2">Edit</button>
                      <button className="text-gray-400 hover:text-red-500 transition">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
