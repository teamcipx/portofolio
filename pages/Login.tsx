
import React, { useEffect, useState } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Lock, ArrowLeft, Mail, Loader2, UserPlus, KeyRound } from 'lucide-react';
import SeoHead from '../components/SeoHead';

const { useNavigate, Link } = ReactRouterDOM;

const Login: React.FC = () => {
  const { loginWithGoogle, loginWithEmail, registerWithEmail, resetPassword, user, isAdmin } = useAuth();
  const navigate = useNavigate();
  
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      if (isAdmin) {
        navigate('/admin');
      } else {
        navigate('/');
      }
    }
  }, [user, isAdmin, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);
    setSuccessMessage(null);
    try {
      if (isLoginMode) {
        await loginWithEmail(email, password);
      } else {
        await registerWithEmail(email, password);
      }
      // Navigation handled by useEffect
    } catch (error: any) {
      setIsSubmitting(false);
      
      // Smart Error Handling
      if (error.message.includes("already registered")) {
        setErrorMessage(error.message);
        setTimeout(() => {
            setIsLoginMode(true); // Auto Switch to Login
            setErrorMessage("Account exists. Please Login.");
        }, 1500);
      } else {
        setErrorMessage(error.message || "Authentication failed");
      }
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
        setErrorMessage("Please enter your email address first.");
        return;
    }
    try {
        await resetPassword(email);
        setSuccessMessage("Password reset email sent! Check your inbox.");
        setErrorMessage(null);
    } catch (error: any) {
        setErrorMessage(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    await loginWithGoogle();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <SeoHead title="Login | Ali Hossn" description="Login to access your account or admin dashboard." />
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link to="/" className="flex justify-center mb-6 text-gray-500 hover:text-brand-600 transition">
           <ArrowLeft className="mr-2" /> Back to Home
        </Link>
        <div className="flex justify-center">
          <div className="bg-brand-600 p-3 rounded-full text-white shadow-lg">
            {isLoginMode ? <Lock size={32} /> : <UserPlus size={32} />}
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {isLoginMode ? 'Admin Access' : 'Create Account'}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          {isLoginMode ? 'Sign in to manage portfolio or chat.' : 'Register to access features.'}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl rounded-2xl sm:px-10 border border-gray-100">
          
          {errorMessage && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100 flex items-center gap-2">
              <span className="font-bold">Error:</span> {errorMessage}
            </div>
          )}

          {successMessage && (
            <div className="mb-4 p-3 bg-green-50 text-green-600 text-sm rounded-lg border border-green-100 flex items-center gap-2">
              <CheckCircle size={16}/> {successMessage}
            </div>
          )}

          {/* Email Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-500 focus:border-brand-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  {isLoginMode && (
                      <button type="button" onClick={handleForgotPassword} className="text-xs text-brand-600 hover:underline font-bold">
                          Forgot Password?
                      </button>
                  )}
              </div>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-500 focus:border-brand-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition disabled:opacity-70"
              >
                {isSubmitting ? <Loader2 className="animate-spin w-5 h-5"/> : (isLoginMode ? 'Sign in with Email' : 'Create Account')}
              </button>
            </div>
          </form>

          <div className="mt-6">
             <button 
                type="button"
                onClick={() => { setIsLoginMode(!isLoginMode); setErrorMessage(null); setSuccessMessage(null); }}
                className="w-full text-center text-sm text-brand-600 hover:text-brand-500 font-medium"
             >
                {isLoginMode ? "Don't have an account? Sign Up" : "Already have an account? Login"}
             </button>
          </div>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-xl shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-all hover:scale-[1.02] duration-200"
              >
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="h-5 w-5 mr-3" alt="Google" />
                Sign in with Google
              </button>
            </div>
          </div>

          <div className="mt-6 text-center">
             <p className="text-xs text-gray-400">
               Authorized Admin Email: <span className="font-mono text-gray-600">admin@siamhasan.com</span>
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};
import { CheckCircle } from 'lucide-react';

export default Login;
