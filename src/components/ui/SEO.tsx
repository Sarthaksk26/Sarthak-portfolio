import React from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
}

const SEO: React.FC<SEOProps> = ({ title, description, keywords }) => (
  <>
    {title && <title>{title} | Sarthak</title>}
    {description && <meta name="description" content={description} />}
    {keywords && <meta name="keywords" content={keywords} />}
  </>
);

export default SEO;
