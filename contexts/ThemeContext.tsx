
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ThemeConfig } from '../types';

interface ThemeContextType {
  settings: ThemeConfig;
  updateSettings: (newSettings: Partial<ThemeConfig>) => void;
  resetSettings: () => void;
}

const DEFAULT_SETTINGS: ThemeConfig = {
  colors: {
    primary: '#d946ef', // Fuchsia-500
    accent: '#8b5cf6',  // Violet-500
  },
  font: 'Outfit',
  radius: '1rem', // Default Large
  sections: {
    showHero: true,
    showServices: true,
    showPortfolio: true,
    showShop: true,
    showTestimonials: true,
    showBlogs: true,
    showContact: true,
  },
  seo: {
    maintenanceMode: false,
    preventIndexing: false,
  }
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<ThemeConfig>(() => {
    try {
      const saved = localStorage.getItem('aws-settings');
      return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  });

  // Apply Changes to DOM
  useEffect(() => {
    const root = document.documentElement;
    
    // 1. Apply Colors (CSS Variables)
    root.style.setProperty('--color-brand', settings.colors.primary);
    root.style.setProperty('--color-accent', settings.colors.accent);
    
    // 2. Apply Radius
    root.style.setProperty('--radius-global', settings.radius);

    // 3. Apply Font (Simulated by changing body class, requires Font imports in index.html)
    document.body.style.fontFamily = `"${settings.font}", sans-serif`;

    // 4. Save to LocalStorage
    localStorage.setItem('aws-settings', JSON.stringify(settings));

  }, [settings]);

  const updateSettings = (newSettings: Partial<ThemeConfig>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const resetSettings = () => {
    setSettings(DEFAULT_SETTINGS);
  };

  if (settings.seo.maintenanceMode && window.location.pathname !== '/aws') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white text-center p-4">
        <h1 className="text-5xl font-bold mb-4">Under Maintenance</h1>
        <p className="text-gray-400">We are currently updating the website. Please check back later.</p>
        <p className="text-xs text-gray-700 mt-8">Admin? Go to /aws</p>
      </div>
    );
  }

  return (
    <ThemeContext.Provider value={{ settings, updateSettings, resetSettings }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
};
