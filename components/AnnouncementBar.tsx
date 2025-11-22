
import React, { useState } from 'react';
import { X, Megaphone } from 'lucide-react';

const AnnouncementBar: React.FC = () => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="bg-gradient-to-r from-brand-600 to-accent-600 text-white px-4 py-2.5 relative z-[60]">
      <div className="max-w-7xl mx-auto flex items-center justify-center text-center text-sm font-medium gap-2 pr-8">
        <Megaphone size={16} className="animate-bounce" />
        <span>
          <span className="font-bold bg-white/20 px-2 py-0.5 rounded mr-2">NEW</span>
          Special Offer: Get <span className="font-bold text-yellow-300">20% OFF</span> on all Video Editing packages this week!
        </span>
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
