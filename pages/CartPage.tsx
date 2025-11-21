
import React, { useState } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { ShoppingBag, Trash2, CreditCard, Mail, Lock, Loader2, CheckCircle, ArrowLeft, ArrowDownToLine, Smartphone, Wallet, Copy } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { createOrder } from '../services/dataService';
import { Order } from '../types';
import SeoHead from '../components/SeoHead';

const { Link } = ReactRouterDOM;

type PaymentMethod = 'Card' | 'bKash' | 'Nagad' | 'Rocket' | 'Binance';

const CartPage: React.FC = () => {
  const { items, removeFromCart, clearCart, total } = useCart();
  const { user } = useAuth();
  
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [step, setStep] = useState<'method' | 'details' | 'processing' | 'success'>('method');
  
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('Card');
  const [email, setEmail] = useState(user?.email || '');
  
  // Verification Fields
  const [senderNumber, setSenderNumber] = useState('');
  const [trxId, setTrxId] = useState('');
  
  // Created Order for Receipt
  const [lastOrder, setLastOrder] = useState<Order | null>(null);

  const handleCheckoutStart = () => {
    if (items.length === 0) return;
    setIsCheckingOut(true);
    setStep('method');
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setStep('processing');

    // Prepare Order
    const newOrder: Order = {
        userEmail: email,
        items: items,
        total: total,
        paymentMethod: paymentMethod,
        trxId: (paymentMethod !== 'Card') ? trxId : undefined,
        senderNumber: (paymentMethod !== 'Card') ? senderNumber : undefined,
        status: 'pending', // Default pending for manual verification
        createdAt: new Date().toISOString(),
    };

    // Simulate Network / API Call
    try {
        await createOrder(newOrder);
        // Simulate delay
        setTimeout(() => {
            setLastOrder(newOrder);
            setStep('success');
            clearCart();
        }, 2000);
    } catch (error) {
        console.error("Order Failed", error);
        alert("Failed to create order. Please try again.");
        setStep('details');
    }
  };

  const downloadReceipt = () => {
    if (!lastOrder) return;
    const content = `
SIAM HASAN DESIGN SHOP - RECEIPT
--------------------------------
Date: ${new Date().toLocaleString()}
Status: PENDING VERIFICATION

CUSTOMER:
Email: ${lastOrder.userEmail}

ITEMS:
${lastOrder.items.map(item => `- ${item.title} (x${item.quantity}) - $${item.price * item.quantity}`).join('\n')}

--------------------------------
TOTAL: $${lastOrder.total}
METHOD: ${lastOrder.paymentMethod}
TRX ID: ${lastOrder.trxId || 'Card Payment'}
--------------------------------
Your order is being processed. You will receive the items via email shortly.
    `;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Receipt-${Date.now()}.txt`;
    a.click();
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Copied!");
  };

  // Render Payment Instructions based on method
  const renderPaymentFields = () => {
      if (paymentMethod === 'Card') {
          return (
              <div className="space-y-4 animate-in fade-in">
                  <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">Card Number</label>
                      <div className="relative">
                          <CreditCard className="absolute left-3 top-3 text-gray-400" size={18}/>
                          <input type="text" className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 ring-brand-500" placeholder="0000 0000 0000 0000" required />
                      </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                      <input type="text" placeholder="MM/YY" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 ring-brand-500 text-center" required/>
                      <input type="text" placeholder="CVC" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 ring-brand-500 text-center" required/>
                  </div>
              </div>
          );
      }

      // Manual Gateways
      let number = "01700000000";
      let type = "Personal";
      if (paymentMethod === 'Binance') number = "TQ8...xYz (TRC20)";

      return (
          <div className="space-y-6 animate-in fade-in bg-blue-50 p-6 rounded-2xl border border-blue-100">
              <div className="text-center">
                  <p className="text-sm text-blue-600 font-bold mb-1">Send Money to {paymentMethod === 'Binance' ? 'Wallet' : 'Number'}</p>
                  <div className="flex items-center justify-center gap-2 bg-white p-3 rounded-lg border border-blue-200 shadow-sm">
                      <span className="text-lg font-mono font-bold text-gray-800">{number}</span>
                      <button type="button" onClick={() => copyToClipboard(number)} className="text-blue-500 hover:text-blue-700"><Copy size={16}/></button>
                  </div>
                  {paymentMethod !== 'Binance' && <p className="text-xs text-gray-500 mt-1">{type}</p>}
              </div>

              <div className="space-y-4">
                 <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Sender Number / Wallet</label>
                    <input 
                        type="text" 
                        value={senderNumber} 
                        onChange={e => setSenderNumber(e.target.value)}
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 ring-brand-500" 
                        placeholder={paymentMethod === 'Binance' ? "Your Wallet Address" : "01X XXXX XXXX"}
                        required
                    />
                 </div>
                 <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Transaction ID (TrxID)</label>
                    <input 
                        type="text" 
                        value={trxId}
                        onChange={e => setTrxId(e.target.value)}
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 ring-brand-500" 
                        placeholder="e.g. 9GHA..."
                        required
                    />
                 </div>
              </div>
          </div>
      );
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
        
        {/* Cart Items List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
              <button onClick={clearCart} className="text-sm text-red-500 hover:underline font-medium">Clear Cart</button>
          </div>
          
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

        {/* Checkout Sidebar */}
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
                      <span>Taxes (0%)</span>
                      <span>$0.00</span>
                    </div>
                    <div className="border-t border-gray-100 pt-4 flex justify-between text-xl font-bold text-gray-900">
                      <span>Total</span>
                      <span>${total}</span>
                    </div>
                  </div>
                  <button 
                    onClick={handleCheckoutStart}
                    className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-brand-600 transition flex items-center justify-center gap-2 shadow-lg hover:shadow-brand-500/30"
                  >
                    <Lock size={18} /> Proceed to Checkout
                  </button>
                  <Link to="/shop" className="block text-center mt-4 text-sm font-bold text-gray-500 hover:text-gray-900">
                    Continue Shopping
                  </Link>
                </>
             ) : (
               <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  
                  {/* Header Back Button */}
                  {step !== 'success' && step !== 'processing' && (
                     <div className="flex items-center gap-2 mb-6 text-brand-600 cursor-pointer hover:underline" onClick={() => setIsCheckingOut(false)}>
                        <ArrowLeft size={16}/> <span className="text-sm font-bold">Back to Cart</span>
                     </div>
                  )}

                  {/* Step 1: Select Method */}
                  {step === 'method' && (
                      <div className="space-y-4">
                          <h3 className="text-xl font-bold text-gray-900 mb-4">Select Payment Method</h3>
                          <div className="grid grid-cols-2 gap-3">
                              {['Card', 'bKash', 'Nagad', 'Rocket', 'Binance'].map((m) => (
                                  <button
                                    key={m}
                                    onClick={() => { setPaymentMethod(m as PaymentMethod); setStep('details'); }}
                                    className={`p-4 rounded-xl border-2 font-bold text-sm transition-all flex flex-col items-center justify-center gap-2 ${paymentMethod === m ? 'border-brand-500 bg-brand-50 text-brand-700' : 'border-gray-100 hover:border-gray-300 text-gray-600'}`}
                                  >
                                      {m === 'Card' && <CreditCard size={24}/>}
                                      {m === 'bKash' && <Smartphone size={24} className="text-pink-600"/>}
                                      {m === 'Nagad' && <Smartphone size={24} className="text-orange-600"/>}
                                      {m === 'Rocket' && <Smartphone size={24} className="text-purple-600"/>}
                                      {m === 'Binance' && <Wallet size={24} className="text-yellow-500"/>}
                                      {m}
                                  </button>
                              ))}
                          </div>
                      </div>
                  )}

                  {/* Step 2: Details Form */}
                  {step === 'details' && (
                     <form onSubmit={handleSubmitOrder} className="space-y-6">
                        <div>
                            <h3 className="text-xl font-bold text-gray-900">Payment Details</h3>
                            <p className="text-xs text-gray-500">Paying via <span className="font-bold text-brand-600">{paymentMethod}</span></p>
                        </div>

                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-1">Email Address</label>
                          <div className="relative">
                              <Mail className="absolute left-3 top-3 text-gray-400" size={18}/>
                              <input 
                                type="email" 
                                required 
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 ring-brand-500" 
                                placeholder="you@email.com"
                              />
                          </div>
                          <p className="text-xs text-gray-400 mt-1">Receipt will be sent here.</p>
                        </div>

                        {renderPaymentFields()}

                        <div className="flex gap-3">
                             <button type="button" onClick={() => setStep('method')} className="px-4 py-3 rounded-xl font-bold bg-gray-100 text-gray-600 hover:bg-gray-200">Back</button>
                             <button type="submit" className="flex-1 bg-brand-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-brand-700 transition flex items-center justify-center gap-2">
                                Pay ${total}
                             </button>
                        </div>
                     </form>
                  )}

                  {/* Processing */}
                  {step === 'processing' && (
                    <div className="py-12 text-center">
                       <Loader2 size={48} className="text-brand-500 animate-spin mx-auto mb-4" />
                       <h3 className="font-bold text-gray-900">Verifying Payment...</h3>
                       <p className="text-gray-500 text-sm mt-2">Please wait while we process your order.</p>
                    </div>
                  )}

                  {/* Success */}
                  {step === 'success' && (
                    <div className="py-8 text-center">
                       <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                          <CheckCircle size={32} />
                       </div>
                       <h3 className="text-xl font-bold text-gray-900 mb-2">Order Successful!</h3>
                       <p className="text-sm text-gray-500 mb-6 max-w-xs mx-auto">
                          Your order for <span className="font-bold">${lastOrder?.total}</span> has been placed. 
                          {lastOrder?.paymentMethod !== 'Card' ? ' Admin will verify the transaction shortly.' : ''}
                       </p>
                       
                       <button onClick={downloadReceipt} className="w-full bg-gray-100 text-gray-900 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-200 mb-3">
                          <ArrowDownToLine size={18}/> Download Receipt
                       </button>
                       
                       <Link to="/profile" className="block w-full bg-brand-600 text-white py-3 rounded-xl font-bold hover:bg-brand-700">
                          View Order History
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
