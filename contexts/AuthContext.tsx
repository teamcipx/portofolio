
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserRole } from '../types';
import { auth } from '../services/firebase';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  isAdmin: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // In a real app, you'd check a custom claim or a 'users' collection.
        // For this portfolio, we'll assume a specific email is Admin.
        // REPLACE THIS EMAIL WITH YOUR OWN ADMIN EMAIL
        const isAdmin = firebaseUser.email === 'admin@siamhasan.com' || firebaseUser.email === 'admin'; 
        
        setUser({
          username: firebaseUser.email?.split('@')[0] || 'User',
          role: isAdmin ? UserRole.ADMIN : UserRole.GUEST
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // Legacy mock support for demo purposes if Firebase fails or for 'admin'/'admin' shortcut
      if (email === 'admin' && password === 'admin') {
          // Note: This mock bypass won't work with Firestore security rules if you enforce auth
          // But useful for the demo UI
          setUser({ username: 'Siam Hasan (Demo)', role: UserRole.ADMIN });
          return true;
      }

      await signInWithEmailAndPassword(auth, email, password);
      return true;
    } catch (error) {
      console.error("Login failed", error);
      return false;
    }
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  const isAdmin = user?.role === UserRole.ADMIN;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
