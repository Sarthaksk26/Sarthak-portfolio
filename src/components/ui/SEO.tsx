import React, { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
}

const SEO: React.FC<SEOProps> = ({ title, description, keywords }) => {
  useEffect(() => {
    if (title) {
      document.title = `${title} | Sarthak Kumbhar`;
    }

    if (description) {
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', description);
      }
    }

    if (keywords) {
      const metaKeywords = document.querySelector('meta[name="keywords"]');
      if (metaKeywords) {
        metaKeywords.setAttribute('content', keywords);
      } else {
        const tag = document.createElement('meta');
        tag.name = 'keywords';
        tag.content = keywords;
        document.head.appendChild(tag);
      }
    }
  }, [title, description, keywords]);

  return null;
};

export default SEO;
