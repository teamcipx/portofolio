
import React, { useState, useEffect } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { ShoppingCart, Menu, X, User } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

const { Link, useLocation } = ReactRouterDOM;

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { items } = useCart();
  const { user, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path ? 'text-brand-600 font-bold' : 'text-gray-600 hover:text-brand-500 font-medium';

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'glass-nav py-3' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group z-50">
            <div className="w-10 h-10 bg-gradient-to-br from-brand-500 to-accent-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-brand-500/20 group-hover:rotate-12 transition duration-300">S</div>
            <span className="font-bold text-2xl tracking-tight text-gray-900">Siam<span className="text-brand-500">.</span></span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1 bg-white/60 backdrop-blur-md px-2 py-1.5 rounded-full border border-white/40 shadow-sm">
            <Link to="/" className={`px-5 py-2 rounded-full transition-all duration-300 ${isActive('/') === 'text-brand-600 font-bold' ? 'bg-white shadow-sm text-brand-600 font-bold' : 'text-gray-600 hover:text-brand-600'}`}>Home</Link>
            <Link to="/portfolio" className={`px-5 py-2 rounded-full transition-all duration-300 ${isActive('/portfolio') === 'text-brand-600 font-bold' ? 'bg-white shadow-sm text-brand-600 font-bold' : 'text-gray-600 hover:text-brand-600'}`}>Portfolio</Link>
            <Link to="/shop" className={`px-5 py-2 rounded-full transition-all duration-300 ${isActive('/shop') === 'text-brand-600 font-bold' ? 'bg-white shadow-sm text-brand-600 font-bold' : 'text-gray-600 hover:text-brand-600'}`}>Shop</Link>
            <Link to="/contact" className={`px-5 py-2 rounded-full transition-all duration-300 ${isActive('/contact') === 'text-brand-600 font-bold' ? 'bg-white shadow-sm text-brand-600 font-bold' : 'text-gray-600 hover:text-brand-600'}`}>Contact</Link>
          </div>

          {/* Icons */}
          <div className="hidden md:flex items-center space-x-3">
             {user?.role === 'ADMIN' && (
                <Link to="/admin" className="px-4 py-2 rounded-full bg-gray-900 text-white text-sm font-bold hover:bg-gray-800 transition shadow-lg shadow-gray-900/20">
                  Dashboard
                </Link>
             )}
             
             {user ? (
                <div className="flex items-center space-x-3 bg-white rounded-full px-4 py-2 shadow-sm border border-gray-100">
                    <Link to="/profile" className="flex items-center gap-2 hover:text-brand-600 transition">
                      <div className="w-6 h-6 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center text-xs font-bold overflow-hidden">
                        {user.photoUrl ? <img src={user.photoUrl} className="w-full h-full object-cover"/> : user.username.charAt(0)}
                      </div>
                      <span className="text-sm font-bold text-gray-800">{user.username}</span>
                    </Link>
                    <div className="h-4 w-px bg-gray-200"></div>
                    <button onClick={logout} className="text-xs font-bold text-red-500 hover:text-red-600 uppercase tracking-wide">Logout</button>
                </div>
             ) : (
                <Link to="/login" className="p-2.5 hover:bg-brand-50 rounded-full transition text-gray-700 hover:text-brand-600">
                    <User size={20} />
                </Link>
             )}

            <Link to="/cart" className="relative p-2.5 hover:bg-brand-50 rounded-full transition text-gray-700 hover:text-brand-600">
              <ShoppingCart size={20} />
              {items.length > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-brand-500 rounded-full shadow-md transform translate-x-1 -translate-y-1">
                  {items.length}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Button */}
          <div className="md:hidden flex items-center gap-4">
             <Link to="/cart" className="relative text-gray-800">
                <ShoppingCart size={24} />
                {items.length > 0 && (
                  <span className="absolute -top-2 -right-2 w-4 h-4 bg-brand-500 rounded-full text-[10px] text-white flex items-center justify-center font-bold">
                    {items.length}
                  </span>
                )}
             </Link>
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-800 p-1">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-gray-100 absolute w-full shadow-xl animate-in slide-in-from-top-5 h-screen z-40">
          <div className="px-6 pt-8 pb-6 space-y-4 flex flex-col">
            <Link to="/" className="text-2xl font-bold text-gray-900 hover:text-brand-500" onClick={() => setIsOpen(false)}>Home</Link>
            <Link to="/portfolio" className="text-2xl font-bold text-gray-900 hover:text-brand-500" onClick={() => setIsOpen(false)}>Portfolio</Link>
            <Link to="/shop" className="text-2xl font-bold text-gray-900 hover:text-brand-500" onClick={() => setIsOpen(false)}>Shop</Link>
            <Link to="/contact" className="text-2xl font-bold text-gray-900 hover:text-brand-500" onClick={() => setIsOpen(false)}>Contact</Link>
             <hr className="border-gray-100 my-4"/>
             {user?.role === 'ADMIN' && (
              <Link to="/admin" className="text-lg font-bold text-brand-600" onClick={() => setIsOpen(false)}>Admin Dashboard</Link>
            )}
             {user ? (
                <>
                  <Link to="/profile" className="text-lg font-bold text-gray-800 flex items-center gap-2" onClick={() => setIsOpen(false)}>
                    <User size={18}/> My Profile
                  </Link>
                  <button onClick={() => { logout(); setIsOpen(false); }} className="text-left text-lg font-medium text-red-500">Logout</button>
                </>
             ) : (
                <Link to="/login" className="text-lg font-medium text-gray-600" onClick={() => setIsOpen(false)}>Login</Link>
             )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
