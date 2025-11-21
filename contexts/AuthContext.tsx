
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserRole, AuthContextType } from '../types';
import { auth, googleProvider } from '../services/firebase';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// List of emails allowed to access the Admin Panel
const ADMIN_EMAILS = [
  'admin@siamhasan.com',
  'siamhasan@gmail.com', // Add your real Google email here
  'admin' // Legacy/Demo support
];

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        const email = firebaseUser.email || '';
        const isAdmin = ADMIN_EMAILS.includes(email);
        
        setUser({
          username: firebaseUser.displayName || email.split('@')[0],
          email: email,
          role: isAdmin ? UserRole.ADMIN : UserRole.GUEST,
          photoUrl: firebaseUser.photoURL || undefined
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    try {
      await auth.signInWithPopup(googleProvider);
    } catch (error) {
      console.error("Google Login failed", error);
      alert("Failed to sign in with Google.");
    }
  };

  const logout = async () => {
    await auth.signOut();
    setUser(null);
  };

  const isAdmin = user?.role === UserRole.ADMIN;

  return (
    <AuthContext.Provider value={{ user, loginWithGoogle, logout, isAdmin, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
