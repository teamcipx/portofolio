
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserRole, AuthContextType } from '../types';
import { auth, googleProvider } from '../services/firebase';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// List of emails allowed to access the Admin Panel
// ACTION REQUIRED: Create a user in Firebase Console > Authentication with one of these emails.
const ADMIN_EMAILS = [
  'admin@siamhasan.com', // Primary Admin
  'siamhasan@gmail.com', // Backup/Personal Google
  'admin' // Legacy/Demo support
];

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        const email = firebaseUser.email || '';
        // Case-insensitive check
        const isAdmin = ADMIN_EMAILS.some(adminEmail => adminEmail.toLowerCase() === email.toLowerCase());
        
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
    } catch (error: any) {
      console.error("Google Login failed", error);
      alert(`Failed to sign in with Google: ${error.message}`);
    }
  };

  const loginWithEmail = async (email: string, password: string) => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
    } catch (error: any) {
      console.error("Email Login failed", error);
      // Provide more specific error messages
      if (error.code === 'auth/invalid-credential' || error.code === 'auth/user-not-found') {
        throw new Error("User not found. Please check email or Sign Up first.");
      } else if (error.code === 'auth/wrong-password') {
        throw new Error("Incorrect password.");
      } else {
        throw error;
      }
    }
  };

  const registerWithEmail = async (email: string, password: string) => {
    try {
      await auth.createUserWithEmailAndPassword(email, password);
    } catch (error: any) {
      console.error("Registration failed", error);
      if (error.code === 'auth/email-already-in-use') {
        throw new Error("This email is already registered. Please Login.");
      }
      throw error;
    }
  };

  const resetPassword = async (email: string) => {
    try {
      await auth.sendPasswordResetEmail(email);
    } catch (error: any) {
      console.error("Password Reset failed", error);
      throw error;
    }
  };

  const logout = async () => {
    await auth.signOut();
    setUser(null);
  };

  const isAdmin = user?.role === UserRole.ADMIN;

  return (
    <AuthContext.Provider value={{ user, loginWithGoogle, loginWithEmail, registerWithEmail, resetPassword, logout, isAdmin, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
