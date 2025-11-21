
import React, { useEffect, useState } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getUserOrders } from '../services/dataService';
import { Order } from '../types';
import SeoHead from '../components/SeoHead';
import { User, ShoppingBag, Clock, CheckCircle, XCircle, Loader2, Download } from 'lucide-react';

const { Navigate } = ReactRouterDOM;

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (user) {
        const data = await getUserOrders(user.email);
        setOrders(data);
        setLoading(false);
      }
    };
    fetchOrders();
  }, [user]);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed': return <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold uppercase"><CheckCircle size={12}/> Completed</span>;
      case 'rejected': return <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold uppercase"><XCircle size={12}/> Rejected</span>;
      default: return <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs font-bold uppercase"><Clock size={12}/> Pending</span>;
    }
  };

  const downloadReceipt = (order: Order) => {
      const content = `
SIAM HASAN DESIGN SHOP - RECEIPT
--------------------------------
Order ID: ${order.id}
Date: ${new Date(order.createdAt).toLocaleString()}
Status: ${order.status.toUpperCase()}

CUSTOMER:
Email: ${order.userEmail}

ITEMS:
${order.items.map(item => `- ${item.title} (x${item.quantity}) - $${item.price * item.quantity}`).join('\n')}

--------------------------------
TOTAL PAID: $${order.total}
PAYMENT METHOD: ${order.paymentMethod}
TRX ID: ${order.trxId || 'N/A'}
--------------------------------
Thank you for your purchase!
      `;
      
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Receipt-${order.id}.txt`;
      a.click();
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6">
      <SeoHead title="My Profile | Siam Hasan" description="Manage your account and view order history." />
      
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 mb-8 flex flex-col md:flex-row items-center gap-6 animate-in fade-in slide-in-from-bottom-4">
           <div className="w-24 h-24 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 font-bold text-3xl border-4 border-white shadow-lg overflow-hidden">
              {user.photoUrl ? <img src={user.photoUrl} className="w-full h-full object-cover"/> : user.username.charAt(0)}
           </div>
           <div className="text-center md:text-left">
              <h1 className="text-3xl font-bold text-gray-900">{user.username}</h1>
              <p className="text-gray-500">{user.email}</p>
              <span className="inline-block mt-2 px-3 py-1 bg-gray-100 rounded-full text-xs font-bold text-gray-600 uppercase tracking-wide">
                {user.role} User
              </span>
           </div>
        </div>

        {/* Orders Section */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 animate-in fade-in slide-in-from-bottom-8">
           <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
             <ShoppingBag className="text-brand-600"/> Order History
           </h2>

           {loading ? (
             <div className="flex justify-center py-12"><Loader2 className="animate-spin text-brand-500 w-8 h-8"/></div>
           ) : orders.length > 0 ? (
             <div className="space-y-4">
               {orders.map(order => (
                 <div key={order.id} className="border border-gray-100 rounded-2xl p-6 hover:shadow-md transition bg-gray-50/50">
                    <div className="flex flex-col md:flex-row justify-between md:items-center mb-4 gap-4">
                       <div>
                          <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Order #{order.id?.slice(0, 8)}</p>
                          <p className="text-sm text-gray-600">{new Date(order.createdAt).toLocaleDateString()}</p>
                       </div>
                       <div className="flex items-center gap-3">
                          {getStatusBadge(order.status)}
                          <span className="font-bold text-xl text-gray-900">${order.total}</span>
                       </div>
                    </div>
                    
                    <div className="space-y-2 border-t border-gray-200 pt-4 mb-4">
                       {order.items.map((item, idx) => (
                          <div key={idx} className="flex justify-between text-sm">
                             <span className="text-gray-700">{item.title} <span className="text-gray-400">x{item.quantity}</span></span>
                             <span className="font-medium text-gray-900">${item.price * item.quantity}</span>
                          </div>
                       ))}
                    </div>

                    <div className="flex justify-between items-center pt-2">
                        <p className="text-xs text-gray-500">Paid via <span className="font-bold">{order.paymentMethod}</span> {order.trxId && `(TrxID: ${order.trxId})`}</p>
                        <button 
                          onClick={() => downloadReceipt(order)}
                          className="text-brand-600 font-bold text-sm flex items-center gap-1 hover:underline"
                        >
                           <Download size={14}/> Receipt
                        </button>
                    </div>
                 </div>
               ))}
             </div>
           ) : (
             <div className="text-center py-12">
                <ShoppingBag className="mx-auto h-12 w-12 text-gray-200 mb-3"/>
                <h3 className="text-lg font-bold text-gray-900">No Orders Yet</h3>
                <p className="text-gray-500">Your purchased items will appear here.</p>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
