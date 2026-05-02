import React, { useEffect, useRef, useState, useCallback } from 'react';

const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [cursorType, setCursorType] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

  const dotPos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const rafId = useRef<number | null>(null);

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      dotPos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement;
      const cursorAttr = target.closest('[data-cursor]')?.getAttribute('data-cursor');
      setCursorType(cursorAttr || null);
    },
    [isVisible]
  );

  const onMouseDown = useCallback((e: MouseEvent) => {
    const newRipple = { x: e.clientX, y: e.clientY, id: Date.now() };
    setRipples((prev) => [...prev, newRipple]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 1000);
  }, []);

  useEffect(() => {
    const animate = () => {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${dotPos.current.x}px, ${dotPos.current.y}px)`;
      }

      if (ringRef.current) {
        ringPos.current.x += (dotPos.current.x - ringPos.current.x) * 0.12;
        ringPos.current.y += (dotPos.current.y - ringPos.current.y) * 0.12;
        ringRef.current.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px)`;
      }

      rafId.current = requestAnimationFrame(animate);
    };

    const style = document.createElement('style');
    style.innerHTML = `
      @media (pointer: fine) {
        * { cursor: none !important; }
        .custom-cursor { display: block !important; }
      }
      @media (pointer: coarse) {
        * { cursor: auto !important; }
        .custom-cursor { display: none !important; }
      }
    `;
    document.head.appendChild(style);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      if (rafId.current) cancelAnimationFrame(rafId.current);
      document.head.removeChild(style);
    };
  }, [onMouseMove, onMouseDown]);

  return (
    <div
      className={`custom-cursor fixed inset-0 pointer-events-none z-[9999] transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      <div
        ref={dotRef}
        className={`fixed top-[-4px] left-[-4px] w-2 h-2 bg-accent rounded-full transition-opacity duration-200 ${cursorType === 'text' ? 'opacity-0' : 'opacity-100'}`}
        style={{ mixBlendMode: 'difference' }}
      />

      <div
        ref={ringRef}
        className={`fixed top-[-16px] left-[-16px] w-8 h-8 border border-accent rounded-full flex items-center justify-center transition-all duration-300 ease-out`}
        style={{
          mixBlendMode: 'difference',
          width: cursorType === 'text' ? '64px' : '32px',
          height: cursorType === 'text' ? '64px' : '32px',
          top: cursorType === 'text' ? '-32px' : '-16px',
          left: cursorType === 'text' ? '-32px' : '-16px',
          backgroundColor: cursorType === 'link' ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
          borderColor: cursorType === 'project' ? 'transparent' : 'var(--accent)',
        }}
      >
        {cursorType === 'text' && (
          <span className="text-[10px] font-bold text-accent tracking-tighter">READ</span>
        )}
        {cursorType === 'project' && (
          <div className="w-full h-full rounded-full border-2 border-accent flex items-center justify-center scale-125">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-accent"
            >
              <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </div>
        )}
      </div>

      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className="fixed w-4 h-4 bg-accent/20 rounded-full animate-ping pointer-events-none"
          style={{
            left: ripple.x - 8,
            top: ripple.y - 8,
            animationDuration: '1s',
          }}
        />
      ))}
    </div>
  );
};

export default CustomCursor;
