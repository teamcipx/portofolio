import React, { useEffect } from 'react';

interface SeoProps {
  title: string;
  description: string;
  keywords?: string; // Added Keywords support
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product' | 'profile';
  schema?: string; // JSON-LD String
}

const SeoHead: React.FC<SeoProps> = ({ title, description, keywords, image, url, type = 'website', schema }) => {
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

    // Basic Meta
    updateMeta('description', description);
    
    // Keywords Meta
    if (keywords) {
      updateMeta('keywords', keywords);
    }
    
    // Open Graph
    updateOgMeta('og:type', type);
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

    // Structured Data (JSON-LD)
    let script: HTMLScriptElement | null = null;
    if (schema) {
      // Check if script already exists to avoid duplicates
      const existingScript = document.getElementById('seo-schema');
      if (existingScript) {
        existingScript.innerHTML = schema;
        script = existingScript as HTMLScriptElement;
      } else {
        script = document.createElement('script');
        script.id = 'seo-schema';
        script.type = 'application/ld+json';
        script.innerHTML = schema;
        document.head.appendChild(script);
      }
    }

    // Cleanup function
    return () => {
      if (script && script.parentNode) {
        script.remove();
      }
    };

  }, [title, description, keywords, image, url, type, schema]);

  return null;
};

export default SeoHead;