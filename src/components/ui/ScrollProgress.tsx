import React, { useEffect, useState } from 'react';

const ScrollProgress: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateScroll = () => {
      const scrollHeight = document.body.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        setProgress((window.scrollY / scrollHeight) * 100);
      }
    };

    window.addEventListener('scroll', updateScroll);
    updateScroll(); // Initial check

    return () => window.removeEventListener('scroll', updateScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 h-[2px] bg-accent z-[900] transition-all duration-150 ease-out"
      style={{ width: `${progress}%` }}
    />
  );
};

export default ScrollProgress;
