import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, User } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { items } = useCart();
  const { user, logout } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path ? 'text-brand-600 font-bold' : 'text-gray-600 hover:text-brand-500';

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">S</div>
            <span className="font-bold text-xl tracking-tight text-gray-900">Siam<span className="text-brand-600">.</span>Design</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className={isActive('/')}>Home</Link>
            <Link to="/portfolio" className={isActive('/portfolio')}>Portfolio</Link>
            <Link to="/shop" className={isActive('/shop')}>Shop</Link>
            <Link to="/contact" className={isActive('/contact')}>Contact</Link>
            
            {user?.role === 'ADMIN' && (
              <Link to="/admin" className="text-purple-600 font-semibold">Dashboard</Link>
            )}
          </div>

          {/* Icons */}
          <div className="hidden md:flex items-center space-x-4">
             {user ? (
                <div className="flex items-center space-x-3">
                    <span className="text-sm font-medium text-gray-700">Hi, {user.username}</span>
                    <button onClick={logout} className="text-sm text-red-500 hover:text-red-600">Logout</button>
                </div>
             ) : (
                <Link to="/login" className="p-2 hover:bg-gray-100 rounded-full">
                    <User size={20} className="text-gray-600" />
                </Link>
             )}

            <Link to="/shop" className="relative p-2 hover:bg-gray-100 rounded-full">
              <ShoppingCart size={20} className="text-gray-600" />
              {items.length > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-brand-600 rounded-full">
                  {items.length}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col">
            <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-brand-600 hover:bg-gray-50" onClick={() => setIsOpen(false)}>Home</Link>
            <Link to="/portfolio" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-brand-600 hover:bg-gray-50" onClick={() => setIsOpen(false)}>Portfolio</Link>
            <Link to="/shop" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-brand-600 hover:bg-gray-50" onClick={() => setIsOpen(false)}>Shop</Link>
            <Link to="/contact" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-brand-600 hover:bg-gray-50" onClick={() => setIsOpen(false)}>Contact</Link>
             {user?.role === 'ADMIN' && (
              <Link to="/admin" className="block px-3 py-2 rounded-md text-base font-medium text-purple-600 hover:bg-purple-50" onClick={() => setIsOpen(false)}>Dashboard</Link>
            )}
             {user ? (
                <button onClick={() => { logout(); setIsOpen(false); }} className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-red-500">Logout</button>
             ) : (
                <Link to="/login" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700" onClick={() => setIsOpen(false)}>Login</Link>
             )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;