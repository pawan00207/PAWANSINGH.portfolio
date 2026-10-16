import { useRef, useEffect } from 'react';
import { prefersReducedMotion } from './motionPrefs';

interface TiltOptions {
  maxTilt?: number; // max tilt degrees (default: 10)
  perspective?: number; // perspective in px (default: 1000)
  scale?: number; // scale on hover (default: 1.02)
  speed?: number; // transition speed in ms (default: 400)
  glare?: boolean; // whether to add cursor glare effect (default: true)
}

/**
 * High-performance 3D perspective card tilt with cursor-following specular glare.
 * Uses requestAnimationFrame, zero per-frame React state re-renders.
 * Automatically disabled on touch devices and for users with reduced motion preferences.
 */
export function useCardTilt<T extends HTMLElement>(options: TiltOptions = {}) {
  const ref = useRef<T | null>(null);
  const {
    maxTilt = 8,
    perspective = 800,
    scale = 1.015,
    speed = 350,
    glare = true,
  } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Only enable on desktop pointer devices
    const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!isFinePointer || prefersReducedMotion()) return;

    let glareEl: HTMLDivElement | null = null;
    if (glare) {
      glareEl = document.createElement('div');
      glareEl.className = 'card-tilt-glare';
      glareEl.style.position = 'absolute';
      glareEl.style.inset = '0';
      glareEl.style.pointerEvents = 'none';
      glareEl.style.borderRadius = 'inherit';
      glareEl.style.opacity = '0';
      glareEl.style.transition = `opacity ${speed}ms ease`;
      glareEl.style.zIndex = '2';
      el.style.position = el.style.position || 'relative';
      el.appendChild(glareEl);
    }

    el.style.transformStyle = 'preserve-3d';
    el.style.transition = `transform ${speed}ms cubic-bezier(0.23, 1, 0.32, 1)`;

    let rafId = 0;
    let targetX = 0;
    let targetY = 0;
    let glareX = 50;
    let glareY = 50;

    const onPointerMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const normX = (x / rect.width) * 2 - 1; // -1 to 1
      const normY = (y / rect.height) * 2 - 1; // -1 to 1

      targetX = -normY * maxTilt;
      targetY = normX * maxTilt;

      glareX = (x / rect.width) * 100;
      glareY = (y / rect.height) * 100;

      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          rafId = 0;
          el.style.transform = `perspective(${perspective}px) rotateX(${targetX.toFixed(2)}deg) rotateY(${targetY.toFixed(2)}deg) scale3d(${scale}, ${scale}, ${scale})`;
          if (glareEl) {
            glareEl.style.opacity = '0.14';
            glareEl.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(167, 139, 250, 0.5) 0%, transparent 60%)`;
          }
        });
      }
    };

    const onPointerLeave = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = 0;
      el.style.transform = `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
      if (glareEl) {
        glareEl.style.opacity = '0';
      }
    };

    el.addEventListener('mousemove', onPointerMove, { passive: true });
    el.addEventListener('mouseleave', onPointerLeave, { passive: true });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      el.removeEventListener('mousemove', onPointerMove);
      el.removeEventListener('mouseleave', onPointerLeave);
      if (glareEl && el.contains(glareEl)) {
        el.removeChild(glareEl);
      }
    };
  }, [maxTilt, perspective, scale, speed, glare]);

  return ref;
}
