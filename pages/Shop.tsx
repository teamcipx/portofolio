import React, { useEffect, useState } from 'react';
import { ShoppingBag, Star, BookOpen, Image as ImageIcon, PackageOpen, Lock, CreditCard, CheckCircle, X, Loader2, Mail, ArrowDownToLine, ShoppingCart, Info } from 'lucide-react';
import { getProducts } from '../services/dataService';
import { Product } from '../types';
import SeoHead from '../components/SeoHead';
import { useCart } from '../contexts/CartContext';

const Shop: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  
  // Payment Modal State
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [paymentStep, setPaymentStep] = useState<'form' | 'processing' | 'success'>('form');
  
  // Form Data
  const [email, setEmail] = useState('');
  const [cardName, setCardName] = useState('');

  useEffect(() => {
      getProducts().then(data => {
          setProducts(data);
          setLoading(false);
      });
  }, []);

  const openPaymentModal = (product: Product) => {
    setSelectedProduct(product);
    setPaymentStep('form');
    setShowModal(true);
  };

  const handleAddToCart = (product: Product) => {
      addToCart(product);
      alert(`${product.title} added to cart!`);
  };

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setPaymentStep('processing');
    
    // Simulate Payment API and Email Transfer
    setTimeout(() => {
      setPaymentStep('success');
    }, 2500);
  };

  // Structured Data
  const structuredData = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": products.map((product, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Product",
        "name": product.title,
        "image": product.imageUrl,
        "description": product.description,
        "offers": { "@type": "Offer", "price": product.price, "priceCurrency": "USD" }
      }
    }))
  });

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8 pt-24">
      <SeoHead 
        title="Shop Assets & Courses | Ali Hossn" 
        description="Buy high-quality video editing courses, design assets, and digital marketing templates."
        schema={structuredData}
      />
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">Digital Store</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Premium resources to accelerate your creative workflow.
          </p>
        </div>

        {loading ? (
            <div className="flex justify-center py-20"><div className="w-12 h-12 border-4 border-gray-200 border-t-brand-600 rounded-full animate-spin"></div></div>
        ) : products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, idx) => (
                <div key={product.id} className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden hover:shadow-2xl hover:shadow-gray-200/50 transition duration-500 flex flex-col group animate-in fade-in slide-in-from-bottom-8" style={{ animationDelay: `${idx * 100}ms` }}>
                <div className="relative overflow-hidden aspect-[16/10]">
                    <img src={product.imageUrl} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-bold text-gray-900 flex items-center gap-1.5 shadow-sm">
                    {product.type === 'Course' ? <BookOpen size={14} className="text-brand-600"/> : <ImageIcon size={14} className="text-accent-600"/>}
                    {product.type}
                    </div>
                </div>
                
                <div className="p-8 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold text-gray-900 line-clamp-1 mb-2 group-hover:text-brand-600 transition">{product.title}</h3>
                    <p className="text-gray-500 text-sm mb-6 line-clamp-2 leading-relaxed">{product.description}</p>
                    
                    <div className="mt-auto flex items-center justify-between gap-4">
                        <div>
                            <span className="block text-xs text-gray-400 font-bold uppercase tracking-wider mb-0.5">Price</span>
                            <span className="text-2xl font-extrabold text-gray-900">${product.price}</span>
                        </div>
                        <div className="flex gap-2">
                            <button 
                                onClick={() => handleAddToCart(product)}
                                className="w-12 h-12 rounded-2xl bg-gray-50 text-gray-600 hover:bg-gray-100 flex items-center justify-center transition"
                                title="Add to Cart"
                            >
                                <ShoppingCart size={20} />
                            </button>
                            <button 
                                onClick={() => openPaymentModal(product)}
                                className="px-6 h-12 bg-gray-900 text-white rounded-2xl font-bold hover:bg-brand-600 transition shadow-lg hover:shadow-brand-500/25 flex items-center gap-2"
                            >
                                Buy Now
                            </button>
                        </div>
                    </div>
                </div>
                </div>
            ))}
            </div>
        ) : (
            <div className="text-center py-20 bg-white rounded-[3rem]">
                <PackageOpen className="mx-auto h-20 w-20 text-gray-200 mb-6"/>
                <h3 className="text-2xl font-bold text-gray-900">Store Opening Soon</h3>
                <p className="text-gray-500 mt-2">I am preparing some high-quality assets and courses. Check back later!</p>
            </div>
        )}
      </div>

      {/* Payment Modal (Reused Logic) */}
      {showModal && selectedProduct && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-md" onClick={() => setShowModal(false)}></div>
          
          <div className="relative bg-white rounded-[2rem] shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-300">
             <button onClick={() => setShowModal(false)} className="absolute top-6 right-6 p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition z-10">
                <X size={20} className="text-gray-600"/>
             </button>

             {paymentStep === 'form' && (
                <div className="p-8">
                   <div className="flex items-center gap-5 mb-8">
                      <img src={selectedProduct.imageUrl} className="w-24 h-24 rounded-2xl object-cover shadow-md" />
                      <div>
                         <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Checkout</p>
                         <h3 className="font-bold text-gray-900 text-lg leading-tight mb-1">{selectedProduct.title}</h3>
                         <p className="text-brand-600 font-extrabold text-2xl">${selectedProduct.price}</p>
                      </div>
                   </div>

                   <form onSubmit={handlePayment} className="space-y-6">
                      <div>
                         <label className="block text-sm font-bold text-gray-800 mb-2">Delivery Email</label>
                         <div className="relative">
                            <Mail className="absolute left-4 top-3.5 text-gray-400" size={20}/>
                            <input 
                               type="email" 
                               required 
                               value={email}
                               onChange={(e) => setEmail(e.target.value)}
                               placeholder="you@email.com" 
                               className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-brand-500 outline-none transition"
                            />
                         </div>
                      </div>

                      <div>
                         <label className="block text-sm font-bold text-gray-800 mb-2">Card Information</label>
                         <div className="relative">
                            <CreditCard className="absolute left-4 top-3.5 text-gray-400" size={20}/>
                            <input 
                               type="text" 
                               required 
                               value={cardName}
                               onChange={(e) => setCardName(e.target.value)}
                               placeholder="0000 0000 0000 0000" 
                               className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-brand-500 outline-none transition"
                            />
                         </div>
                         <div className="grid grid-cols-2 gap-4 mt-4">
                            <input type="text" placeholder="MM/YY" className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-brand-500 outline-none text-center"/>
                            <input type="text" placeholder="CVC" className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-brand-500 outline-none text-center"/>
                         </div>
                      </div>

                      <button type="submit" className="w-full bg-brand-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-brand-700 transition flex items-center justify-center gap-2 shadow-lg shadow-brand-500/25">
                         <Lock size={20} /> Pay & Download
                      </button>
                   </form>
                </div>
             )}

             {paymentStep === 'processing' && (
                <div className="p-12 flex flex-col items-center justify-center text-center min-h-[500px]">
                   <Loader2 size={64} className="text-brand-500 animate-spin mb-8" />
                   <h3 className="text-2xl font-bold text-gray-900 mb-2">Processing...</h3>
                   <p className="text-gray-500">Securing your transaction</p>
                </div>
             )}

             {paymentStep === 'success' && (
                <div className="p-12 flex flex-col items-center justify-center text-center min-h-[500px] bg-gradient-to-b from-white to-green-50">
                   <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-8 animate-bounce">
                      <CheckCircle size={48} />
                   </div>
                   <h3 className="text-3xl font-bold text-gray-900 mb-2">Success!</h3>
                   <p className="text-gray-600 mb-6">
                      Asset sent to <br/><span className="font-bold text-gray-900">{email}</span>
                   </p>
                   
                   <button className="w-full px-8 py-4 bg-gray-900 text-white rounded-2xl font-bold hover:bg-gray-800 transition flex items-center justify-center gap-2">
                      <ArrowDownToLine size={20}/> Download Now
                   </button>
                </div>
             )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Shop;