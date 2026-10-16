import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { hasFinePointer, prefersReducedMotion } from './motionPrefs';

const MAX_SHIFT_PX = 6;

/**
 * Subtle magnetic attraction for major CTAs. Active only on desktop pointer
 * devices with motion allowed; the element springs back to rest on leave.
 */
export function useMagnetic<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !hasFinePointer() || prefersReducedMotion()) return;

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      gsap.to(el, {
        x: (dx / rect.width) * MAX_SHIFT_PX * 2,
        y: (dy / rect.height) * MAX_SHIFT_PX * 2,
        duration: 0.4,
        ease: 'power3.out',
        overwrite: 'auto',
      });
    };

    const onLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.55)', overwrite: 'auto' });
    };

    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    return () => {
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
      gsap.killTweensOf(el);
    };
  }, []);

  return ref;
}

/**
 * Reveals the provided element once when it enters the viewport with a
 * clip-path + fade wipe. Self-cleaning; no-op under reduced motion.
 */
export function useInViewReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);

  const attach = useCallback((node: T | null) => {
    ref.current = node;
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    el.style.opacity = '0';
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            observer.disconnect();
            gsap.fromTo(
              el,
              { opacity: 0, y: 26 },
              { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', clearProps: 'transform' }
            );
          }
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      el.style.opacity = '';
    };
  }, []);

  return attach;
}
