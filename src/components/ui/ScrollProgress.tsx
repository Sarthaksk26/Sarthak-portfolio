import React, { useEffect, useRef } from 'react';

const ScrollProgress: React.FC = () => {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateScroll = () => {
      const scrollHeight = document.body.scrollHeight - window.innerHeight;
      if (scrollHeight > 0 && barRef.current) {
        barRef.current.style.width = `${(window.scrollY / scrollHeight) * 100}%`;
      }
    };
    window.addEventListener('scroll', updateScroll, { passive: true });
    updateScroll();
    return () => window.removeEventListener('scroll', updateScroll);
  }, []);

  return (
    <div
      ref={barRef}
      className="fixed top-0 left-0 h-[2px] bg-accent z-[900]"
      style={{ width: '0%', transition: 'width 150ms ease-out' }}
    />
  );
};

export default ScrollProgress;
