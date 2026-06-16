import { useEffect, useRef } from 'react';

export default function useScrollReveal() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const reveals = el.querySelectorAll('.reveal');
    reveals.forEach((el) => observer.observe(el));

    // Also observe the container itself
    if (el.classList.contains('reveal')) {
      observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  return ref;
}
