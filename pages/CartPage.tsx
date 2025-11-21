
import React, { useState } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { ShoppingBag, Trash2, CreditCard, Mail, Lock, Loader2, CheckCircle, ArrowLeft, ArrowDownToLine } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import SeoHead from '../components/SeoHead';

const { Link } = ReactRouterDOM;

const CartPage: React.FC = () => {
  const { items, removeFromCart, clearCart, total } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [paymentStep, setPaymentStep] = useState<'form' | 'processing' | 'success'>('form');
  const [email, setEmail] = useState('');

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setPaymentStep('form');
  };

  const processPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setPaymentStep('processing');
    setTimeout(() => {
      setPaymentStep('success');
      clearCart();
    }, 2500);
  };

  if (items.length === 0 && !isCheckingOut) {
    return (
      <div className="min-h-screen pt-24 pb-12 bg-gray-50 px-4">
        <SeoHead title="Cart | Siam Hasan" description="Review your shopping cart." />
        <div className="max-w-4xl mx-auto text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
          <ShoppingBag className="mx-auto h-24 w-24 text-gray-200 mb-6"/>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h2>
          <p className="text-gray-500 mb-8">Looks like you haven't added any design assets yet.</p>
          <Link to="/shop" className="inline-flex items-center gap-2 bg-brand-600 text-white px-8 py-3 rounded-full font-bold hover:bg-brand-700 transition">
            <ArrowLeft size={20}/> Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 bg-gray-50 px-4 sm:px-6">
      <SeoHead title="Cart | Siam Hasan" description="Review your shopping cart." />
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          
          {items.map(item => (
            <div key={item.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-6">
              <img src={item.imageUrl} className="w-24 h-24 rounded-xl object-cover bg-gray-100" alt={item.title} />
              <div className="flex-1">
                <h3 className="font-bold text-xl text-gray-900">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.type}</p>
                <div className="mt-2 font-bold text-brand-600">${item.price}</div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <button 
                  onClick={() => removeFromCart(item.id)} 
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition"
                >
                  <Trash2 size={20} />
                </button>
                <span className="text-sm font-bold text-gray-600">Qty: {item.quantity}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Summary / Checkout */}
        <div className="lg:col-span-1">
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 sticky top-24">
             {!isCheckingOut ? (
                <>
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h3>
                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span>${total}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Taxes (Estimated)</span>
                      <span>$0.00</span>
                    </div>
                    <div className="border-t border-gray-100 pt-4 flex justify-between text-xl font-bold text-gray-900">
                      <span>Total</span>
                      <span>${total}</span>
                    </div>
                  </div>
                  <button 
                    onClick={handleCheckout}
                    className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-brand-600 transition flex items-center justify-center gap-2 shadow-lg hover:shadow-brand-500/30"
                  >
                    <Lock size={18} /> Checkout Now
                  </button>
                  <Link to="/shop" className="block text-center mt-4 text-sm font-bold text-gray-500 hover:text-gray-900">
                    Continue Shopping
                  </Link>
                </>
             ) : (
               <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  {paymentStep === 'form' && (
                     <form onSubmit={processPayment} className="space-y-5">
                        <div className="flex items-center gap-2 mb-4 text-brand-600 cursor-pointer" onClick={() => setIsCheckingOut(false)}>
                           <ArrowLeft size={16}/> <span className="text-sm font-bold">Back to Cart</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Payment Details</h3>
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-1">Email</label>
                          <div className="relative">
                              <Mail className="absolute left-3 top-3 text-gray-400" size={18}/>
                              <input 
                                type="email" 
                                required 
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none" 
                                placeholder="you@email.com"
                              />
                          </div>
                        </div>
                        <div>
                           <label className="block text-sm font-bold text-gray-700 mb-1">Card Number</label>
                           <div className="relative">
                              <CreditCard className="absolute left-3 top-3 text-gray-400" size={18}/>
                              <input type="text" className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none" placeholder="0000 0000 0000 0000" required/>
                           </div>
                        </div>
                        <button type="submit" className="w-full bg-brand-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-brand-700 transition flex items-center justify-center gap-2">
                          Pay ${total}
                        </button>
                     </form>
                  )}

                  {paymentStep === 'processing' && (
                    <div className="py-12 text-center">
                       <Loader2 size={48} className="text-brand-500 animate-spin mx-auto mb-4" />
                       <h3 className="font-bold text-gray-900">Processing Transaction...</h3>
                    </div>
                  )}

                  {paymentStep === 'success' && (
                    <div className="py-8 text-center">
                       <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                          <CheckCircle size={32} />
                       </div>
                       <h3 className="text-xl font-bold text-gray-900 mb-2">Order Confirmed!</h3>
                       <p className="text-sm text-gray-500 mb-6">Assets sent to <span className="font-bold">{email}</span></p>
                       <Link to="/shop" className="block w-full bg-gray-900 text-white py-3 rounded-xl font-bold">
                          Done
                       </Link>
                    </div>
                  )}
               </div>
             )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default CartPage;
