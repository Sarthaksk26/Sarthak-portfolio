import { useEffect, useRef, useCallback } from 'react';

interface RevealOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

export const useScrollReveal = (options: RevealOptions = {}) => {
  const { threshold = 0.15, rootMargin = '0px 0px -50px 0px', once = true } = options;
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Only initialize the observer once (or when options change)
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const delay = el.getAttribute('data-reveal-delay');
            if (delay) {
              el.style.transitionDelay = `${delay}ms`;
            }
            el.classList.add('is-visible');
            if (once) {
              observerRef.current?.unobserve(el);
            }
          }
        });
      },
      { threshold, rootMargin }
    );

    return () => {
      observerRef.current?.disconnect();
    };
  }, [threshold, rootMargin, once]);

  // Use a callback ref to handle elements being added/removed dynamically
  const addToRefs = useCallback((el: HTMLElement | null) => {
    if (el && observerRef.current) {
      observerRef.current.observe(el);
    }
  }, []);

  return addToRefs;
};
