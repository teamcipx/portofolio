
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ThemeConfig } from '../types';
import * as ReactRouterDOM from 'react-router-dom';
import { getThemeSettings, saveThemeSettings } from '../services/dataService';

const { useLocation, useNavigate } = ReactRouterDOM;

interface ThemeContextType {
  settings: ThemeConfig;
  updateSettings: (newSettings: Partial<ThemeConfig>) => void;
  applyPreset: (preset: ThemeConfig['preset']) => void;
  resetSettings: () => void;
  isLoading: boolean;
}

const DEFAULT_SETTINGS: ThemeConfig = {
  preset: 'Custom',
  colors: {
    primary: '#d946ef', // Fuchsia-500
    accent: '#8b5cf6',  // Violet-500
  },
  font: 'Outfit',
  radius: '1rem', // Default Large
  style: 'Default',
  layout: 'Standard',
  sections: {
    showHero: true,
    showServices: true,
    showPortfolio: true,
    showShop: true,
    showTestimonials: true,
    showBlogs: true,
    showContact: true,
  },
  nav: {
    showHome: true,
    showPortfolio: true,
    showShop: true,
    showContact: true,
    showBookCall: true,
    showDashboard: true,
  },
  pages: {
    portfolioEnabled: true,
    shopEnabled: true,
    blogEnabled: true,
  },
  seo: {
    maintenanceMode: false,
    preventIndexing: false,
  },
  system: {
    adminEnabled: true,
  }
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<ThemeConfig>(DEFAULT_SETTINGS);
  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();

  // Load from Firebase on Mount
  useEffect(() => {
    const loadSettings = async () => {
      const cloudSettings = await getThemeSettings();
      if (cloudSettings) {
        setSettings({ ...DEFAULT_SETTINGS, ...cloudSettings });
      }
      setIsLoading(false);
    };
    loadSettings();
  }, []);

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

    // 4. Apply Styles (Spacing/Shadows)
    if (settings.style === 'Minimal') {
        root.style.setProperty('--shadow-sm', 'none');
        root.style.setProperty('--shadow-md', '0 1px 2px 0 rgb(0 0 0 / 0.05)');
    } else if (settings.style === 'Brutalist') {
        root.style.setProperty('--radius-global', '0px');
        document.body.style.border = '4px solid black';
    } else if (settings.style === 'Corporate') {
        root.style.setProperty('--radius-global', '4px');
        document.body.style.letterSpacing = '-0.01em';
    } else {
        document.body.style.border = 'none';
        document.body.style.letterSpacing = 'normal';
    }

  }, [settings]);

  // Page Visibility Guard
  useEffect(() => {
    if (!settings.pages.portfolioEnabled && location.pathname.startsWith('/portfolio')) navigate('/');
    if (!settings.pages.shopEnabled && location.pathname.startsWith('/shop')) navigate('/');
    if (!settings.pages.shopEnabled && location.pathname.startsWith('/cart')) navigate('/');
  }, [location, settings, navigate]);

  const updateSettings = (newSettings: Partial<ThemeConfig>) => {
    const updated = { ...settings, ...newSettings, preset: 'Custom' as const };
    setSettings(updated);
    saveThemeSettings(updated); // Sync to Cloud
  };

  const applyPreset = (preset: ThemeConfig['preset']) => {
    let presetConfig: Partial<ThemeConfig> = { preset };

    switch (preset) {
      case 'Tech':
        presetConfig = {
          ...presetConfig,
          colors: { primary: '#0ea5e9', accent: '#10b981' }, // Cyan & Emerald
          font: 'Roboto',
          radius: '0px',
          style: 'Brutalist',
          layout: 'Wide'
        };
        break;
      case 'Modern':
        presetConfig = {
          ...presetConfig,
          colors: { primary: '#3b82f6', accent: '#6366f1' }, // Blue & Indigo
          font: 'Inter',
          radius: '0.5rem',
          style: 'Minimal',
          layout: 'Standard'
        };
        break;
      case 'Stylish':
        presetConfig = {
          ...presetConfig,
          colors: { primary: '#ec4899', accent: '#8b5cf6' }, // Pink & Purple
          font: 'Outfit',
          radius: '1rem',
          style: 'Playful',
          layout: 'Standard'
        };
        break;
      case 'Premium':
        presetConfig = {
          ...presetConfig,
          colors: { primary: '#d4af37', accent: '#1f2937' }, // Gold & Dark Gray
          font: 'Montserrat',
          radius: '0px',
          style: 'Corporate',
          layout: 'Boxed'
        };
        break;
    }

    const finalSettings = { ...settings, ...presetConfig };
    setSettings(finalSettings);
    saveThemeSettings(finalSettings);
  };

  const resetSettings = () => {
    setSettings(DEFAULT_SETTINGS);
    saveThemeSettings(DEFAULT_SETTINGS);
  };

  // Maintenance Mode Logic
  // Bypass via ?access=admin123
  const searchParams = new URLSearchParams(location.search);
  const bypass = searchParams.get('access') === 'admin123';
  const isAwsPage = location.pathname === '/aws';

  if (settings.seo.maintenanceMode && !isAwsPage && !bypass) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white text-center p-4 font-sans">
        <h1 className="text-6xl font-bold mb-6">Under Maintenance</h1>
        <p className="text-gray-400 text-xl max-w-md mx-auto">We are currently upgrading our infrastructure to serve you better.</p>
        <div className="mt-12 w-16 h-1 bg-brand-500 rounded-full mx-auto"></div>
        <p className="text-xs text-gray-700 mt-8 opacity-50">Admin Access: ?access=admin123</p>
      </div>
    );
  }

  return (
    <ThemeContext.Provider value={{ settings, updateSettings, applyPreset, resetSettings, isLoading }}>
      <div className={settings.layout === 'Boxed' ? 'max-w-[1400px] mx-auto shadow-2xl bg-white min-h-screen my-8 rounded-2xl overflow-hidden border border-gray-200' : ''}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
};
