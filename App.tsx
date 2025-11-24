import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import Shop from './pages/Shop';
import CartPage from './pages/CartPage';
import ProfilePage from './pages/ProfilePage';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import Login from './pages/Login';
import BlogPostPage from './pages/BlogPostPage';
import BookingPage from './pages/BookingPage';
import AwsPage from './pages/AwsPage';
import ProjectDetailsPage from './pages/ProjectDetailsPage';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { Loader2 } from 'lucide-react';

// Use BrowserRouter for clean URLs (no /#/)
const { BrowserRouter: Router, Routes, Route, Navigate } = ReactRouterDOM;

// Wrapper to check if Admin is enabled globally
const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { settings } = useTheme();
  // If adminEnabled is explicitly false, redirect to home
  // Note: system might be undefined in legacy settings, default to true
  if (settings.system?.adminEnabled === false) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

const AppContent: React.FC = () => {
    const { isLoading } = useTheme();

    if (isLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <Loader2 className="w-10 h-10 text-brand-600 animate-spin" />
        </div>
      );
    }

    return (
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/work/:id" element={<ProjectDetailsPage />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/book" element={<BookingPage />} />
              <Route path="/blog/:id" element={<BlogPostPage />} />
              <Route path="/admin" element={<AdminRoute><Admin /></AdminRoute>} />
              <Route path="/aws" element={<AwsPage />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </main>
          <Footer />
          <ChatWidget />
        </div>
    );
};

const App: React.FC = () => {
  return (
    <Router>
        <ThemeProvider>
        <AuthProvider>
            <CartProvider>
                <AppContent />
            </CartProvider>
        </AuthProvider>
        </ThemeProvider>
    </Router>
  );
};

export default App;