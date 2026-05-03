import { useCallback, useEffect, useRef } from 'react';

export const useMagnetic = <T extends HTMLElement = HTMLElement>(strength: number = 0.3) => {
  const ref = useRef<T>(null);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const element = ref.current;
      if (!element) return;

      const { clientX, clientY } = e;
      const { left, top, width, height } = element.getBoundingClientRect();

      const centerX = left + width / 2;
      const centerY = top + height / 2;

      const distanceX = clientX - centerX;
      const distanceY = clientY - centerY;

      // Calculate translation based on strength and distance
      const tx = distanceX * strength;
      const ty = distanceY * strength;

      element.style.transform = `translate(${tx}px, ${ty}px)`;
    },
    [strength]
  );

  const handleMouseLeave = useCallback(() => {
    const element = ref.current;
    if (!element) return;

    // Spring back to center
    element.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)';
    element.style.transform = 'translate(0, 0)';

    // Remove transition after it completes to keep movement smooth during mousemove
    setTimeout(() => {
      if (element) element.style.transition = '';
    }, 500);
  }, []);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave]);

  return ref;
};
