import React from 'react';
import { ShoppingBag, Star, BookOpen, Image as ImageIcon } from 'lucide-react';
import { PRODUCTS } from '../constants';
import { useCart } from '../contexts/CartContext';

const Shop: React.FC = () => {
  const { addToCart } = useCart();

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Design Shop</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Level up your skills with my courses or grab high-quality assets for your next project.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PRODUCTS.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition duration-300 flex flex-col">
              <div className="relative">
                <img src={product.imageUrl} alt={product.title} className="w-full h-48 object-cover" />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-800 flex items-center gap-1">
                  {product.type === 'Course' ? <BookOpen size={12} /> : <ImageIcon size={12} />}
                  {product.type}
                </div>
              </div>
              
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-gray-900 line-clamp-1">{product.title}</h3>
                </div>
                <p className="text-gray-500 text-sm mb-4 line-clamp-2">{product.description}</p>
                
                <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-gray-900">${product.price}</span>
                    <div className="flex items-center gap-1 text-sm text-yellow-500">
                      <Star size={14} fill="currentColor" />
                      <span className="text-gray-400 font-medium ml-1">{product.rating}</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => addToCart(product)}
                    className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-brand-600 transition"
                  >
                    <ShoppingBag size={18} />
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;