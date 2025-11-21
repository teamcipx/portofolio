
import React, { useEffect } from 'react';

interface SeoProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
}

const SeoHead: React.FC<SeoProps> = ({ title, description, image, url }) => {
  useEffect(() => {
    // Update Title
    document.title = title;

    // Helper to update meta tags
    const updateMeta = (name: string, content: string) => {
      let element = document.querySelector(`meta[name="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('name', name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Helper to update OG tags
    const updateOgMeta = (property: string, content: string) => {
      let element = document.querySelector(`meta[property="${property}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('property', property);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    updateMeta('description', description);
    
    updateOgMeta('og:title', title);
    updateOgMeta('og:description', description);
    updateOgMeta('og:url', url || window.location.href);
    
    if (image) {
      updateOgMeta('og:image', image);
      updateOgMeta('twitter:image', image);
    }

    // Twitter Card
    updateMeta('twitter:card', 'summary_large_image');
    updateMeta('twitter:title', title);
    updateMeta('twitter:description', description);

  }, [title, description, image, url]);

  return null;
};

export default SeoHead;
