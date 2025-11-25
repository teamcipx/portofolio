
import React, { useState, useEffect } from 'react';
import { X, Megaphone } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import * as ReactRouterDOM from 'react-router-dom';

const { Link } = ReactRouterDOM;

const AnnouncementBar: React.FC = () => {
  const { settings } = useTheme();
  const [visible, setVisible] = useState(true);

  // If disabled in AWS or user dismissed locally
  if (!settings.announcement?.enabled || !visible) return null;

  return (
    <div className="bg-gradient-to-r from-brand-600 to-accent-600 text-white px-4 py-2.5 relative z-[60] transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-center text-center text-sm font-medium gap-2 pr-8">
        <Megaphone size={16} className="animate-bounce" />
        <span className="flex items-center gap-2">
           <span className="font-bold bg-white/20 px-2 py-0.5 rounded text-[10px] uppercase">News</span>
           {settings.announcement.text}
        </span>
        {settings.announcement.link && (
            <Link to={settings.announcement.link} className="underline font-bold hover:text-brand-100 ml-1">
                Check it out
            </Link>
        )}
      </div>
      <button 
        onClick={() => setVisible(false)}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-white/20 rounded-full transition"
      >
        <X size={16} />
      </button>
    </div>
  );
};

export default AnnouncementBar;
