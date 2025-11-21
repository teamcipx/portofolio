import React, { useEffect, useState } from 'react';
import { ShoppingBag, Star, BookOpen, Image as ImageIcon, PackageOpen, Lock, CreditCard, CheckCircle, X, Loader2, Mail, ArrowDownToLine, ShoppingCart } from 'lucide-react';
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

  // Generate Structured Data for Shop Items
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
        "offers": {
          "@type": "Offer",
          "price": product.price,
          "priceCurrency": "USD"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": product.rating,
          "reviewCount": "12" // Mock data or implement review count
        }
      }
    }))
  });

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8 pt-24">
      <SeoHead 
        title="Shop Assets & Courses | Ali Hossn" 
        description="Buy high-quality video editing courses, design assets, and digital marketing templates directly from Ali Hossn."
        schema={structuredData}
      />
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Design Shop</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Level up your skills with my courses or grab high-quality assets for your next project.
          </p>
        </div>

        {loading ? (
            <div className="flex justify-center py-20"><div className="w-10 h-10 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin"></div></div>
        ) : products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
                <div key={product.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition duration-300 flex flex-col">
                <div className="relative group">
                    <img src={product.imageUrl} alt={product.title} className="w-full h-52 object-cover group-hover:scale-105 transition duration-500" />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-800 flex items-center gap-1">
                    {product.type === 'Course' ? <BookOpen size={12} /> : <ImageIcon size={12} />}
                    {product.type}
                    </div>
                </div>
                
                <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold text-gray-900 line-clamp-1 mb-2">{product.title}</h3>
                    <p className="text-gray-500 text-sm mb-4 line-clamp-2">{product.description}</p>
                    
                    <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div>
                        <span className="text-2xl font-bold text-gray-900">${product.price}</span>
                        <div className="flex items-center gap-1 text-sm text-yellow-500">
                        <Star size={14} fill="currentColor" />
                        <span className="text-gray-400 font-medium ml-1">{product.rating}</span>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button 
                            onClick={() => handleAddToCart(product)}
                            className="p-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 transition"
                            title="Add to Cart"
                        >
                            <ShoppingCart size={18} />
                        </button>
                        <button 
                            onClick={() => openPaymentModal(product)}
                            className="flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-brand-600 hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
                        >
                            <ShoppingBag size={18} />
                            Buy
                        </button>
                    </div>
                    </div>
                </div>
                </div>
            ))}
            </div>
        ) : (
            <div className="text-center py-20">
                <PackageOpen className="mx-auto h-16 w-16 text-gray-300 mb-4"/>
                <h3 className="text-xl font-bold text-gray-900">Store Opening Soon</h3>
                <p className="text-gray-500 mt-2">I am preparing some high-quality assets and courses. Check back later!</p>
            </div>
        )}
      </div>

      {/* Payment Modal */}
      {showModal && selectedProduct && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowModal(false)}></div>
          
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-300">
             {/* Close Button */}
             <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition">
                <X size={20} className="text-gray-600"/>
             </button>

             {/* Steps */}
             {paymentStep === 'form' && (
                <div className="p-8">
                   <div className="flex items-center gap-4 mb-6">
                      <img src={selectedProduct.imageUrl} className="w-20 h-20 rounded-xl object-cover border border-gray-200" />
                      <div>
                         <h3 className="font-bold text-gray-900 text-lg">{selectedProduct.title}</h3>
                         <p className="text-brand-600 font-bold text-xl">${selectedProduct.price}</p>
                      </div>
                   </div>

                   <form onSubmit={handlePayment} className="space-y-5">
                      <div>
                         <label className="block text-sm font-bold text-gray-700 mb-1">Email Address (For Delivery)</label>
                         <div className="relative">
                            <Mail className="absolute left-3 top-3 text-gray-400" size={18}/>
                            <input 
                               type="email" 
                               required 
                               value={email}
                               onChange={(e) => setEmail(e.target.value)}
                               placeholder="you@email.com" 
                               className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none"
                            />
                         </div>
                         <p className="text-xs text-gray-400 mt-1">The asset file will be sent here.</p>
                      </div>

                      <div>
                         <label className="block text-sm font-bold text-gray-700 mb-1">Card Details</label>
                         <div className="relative">
                            <CreditCard className="absolute left-3 top-3 text-gray-400" size={18}/>
                            <input 
                               type="text" 
                               required 
                               value={cardName}
                               onChange={(e) => setCardName(e.target.value)}
                               placeholder="0000 0000 0000 0000" 
                               className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none"
                            />
                         </div>
                         <div className="grid grid-cols-2 gap-3 mt-3">
                            <input type="text" placeholder="MM/YY" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none text-center"/>
                            <input type="text" placeholder="CVC" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none text-center"/>
                         </div>
                      </div>

                      <button type="submit" className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-brand-600 transition flex items-center justify-center gap-2">
                         <Lock size={18} /> Pay ${selectedProduct.price}
                      </button>
                   </form>
                   
                   <div className="mt-4 flex justify-center gap-2 opacity-50">
                      <div className="h-2 w-8 bg-gray-300 rounded"></div>
                      <div className="h-2 w-8 bg-gray-300 rounded"></div>
                      <div className="h-2 w-8 bg-gray-300 rounded"></div>
                   </div>
                </div>
             )}

             {paymentStep === 'processing' && (
                <div className="p-12 flex flex-col items-center justify-center text-center min-h-[400px]">
                   <Loader2 size={64} className="text-brand-500 animate-spin mb-6" />
                   <h3 className="text-xl font-bold text-gray-900">Processing Payment...</h3>
                   <p className="text-gray-500 mt-2">Verifying details & preparing file transfer...</p>
                </div>
             )}

             {paymentStep === 'success' && (
                <div className="p-12 flex flex-col items-center justify-center text-center min-h-[400px] bg-green-50">
                   <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 animate-bounce">
                      <CheckCircle size={40} />
                   </div>
                   <h3 className="text-2xl font-bold text-gray-900">Purchase Successful!</h3>
                   <p className="text-gray-600 mt-4 max-w-xs mx-auto">
                      The <strong>High-Res Image Asset</strong> has been sent to your email:
                   </p>
                   <div className="bg-white px-4 py-2 rounded-lg border border-green-200 text-green-800 font-mono mt-2 font-bold mb-6">
                      {email}
                   </div>
                   
                   <div className="flex gap-3 w-full">
                        <button 
                            onClick={() => setShowModal(false)}
                            className="flex-1 px-6 py-3 bg-gray-200 text-gray-800 rounded-xl font-bold hover:bg-gray-300 transition"
                        >
                            Close
                        </button>
                        <button 
                            className="flex-1 px-6 py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition flex items-center justify-center gap-2"
                        >
                            <ArrowDownToLine size={18}/> Download
                        </button>
                   </div>
                </div>
             )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Shop;