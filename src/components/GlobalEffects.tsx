import React, { useEffect, useRef } from 'react';
import { prefersReducedMotion } from '../utils/motionPrefs';

interface GlobalEffectsProps {
  palette?: 'violet' | 'cyan' | 'chrome';
}

export const GlobalEffects: React.FC<GlobalEffectsProps> = ({ palette = 'violet' }) => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only run on fine-pointer devices with hover capability
    const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!isFinePointer || prefersReducedMotion()) return;

    const cursor = cursorRef.current;
    const ring = ringRef.current;
    if (!cursor || !ring) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let isVisible = false;
    let isClicking = false;
    let isHoveringInteractive = false;
    let rafId = 0;

    const onPointerMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) {
        isVisible = true;
        cursor.style.opacity = '1';
        ring.style.opacity = '0.7';
      }
    };

    const onPointerDown = () => {
      isClicking = true;
    };

    const onPointerUp = () => {
      isClicking = false;
    };

    const onPointerLeave = () => {
      isVisible = false;
      cursor.style.opacity = '0';
      ring.style.opacity = '0';
    };

    // Detect hover on interactive elements to scale the cursor
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.closest('button') ||
          target.closest('a') ||
          target.getAttribute('role') === 'button' ||
          target.classList.contains('cursor-pointer'))
      ) {
        isHoveringInteractive = true;
      } else {
        isHoveringInteractive = false;
      }
    };

    // Click ripple generator using an element pool to prevent unbound DOM allocation
    const MAX_RIPPLES = 6;
    const ripplePool: HTMLDivElement[] = [];
    for (let i = 0; i < MAX_RIPPLES; i++) {
      const rip = document.createElement('div');
      rip.className = 'global-click-ripple';
      rip.style.position = 'fixed';
      rip.style.pointerEvents = 'none';
      rip.style.borderRadius = '50%';
      rip.style.zIndex = '9999';
      rip.style.transform = 'translate(-50%, -50%) scale(0)';
      rip.style.opacity = '0';
      rip.style.transition = 'transform 0.5s cubic-bezier(0.1, 0.8, 0.3, 1), opacity 0.5s ease';
      document.body.appendChild(rip);
      ripplePool.push(rip);
    }
    let poolIndex = 0;

    const onClick = (e: MouseEvent) => {
      const rip = ripplePool[poolIndex];
      poolIndex = (poolIndex + 1) % MAX_RIPPLES;

      const color =
        palette === 'cyan'
          ? 'rgba(34, 211, 238, 0.45)'
          : palette === 'chrome'
          ? 'rgba(255, 255, 255, 0.4)'
          : 'rgba(167, 139, 250, 0.45)';

      rip.style.transition = 'none';
      rip.style.left = `${e.clientX}px`;
      rip.style.top = `${e.clientY}px`;
      rip.style.width = '14px';
      rip.style.height = '14px';
      rip.style.background = color;
      rip.style.boxShadow = `0 0 12px ${color}`;
      rip.style.transform = 'translate(-50%, -50%) scale(0)';
      rip.style.opacity = '0.9';

      requestAnimationFrame(() => {
        rip.style.transition = 'transform 0.55s cubic-bezier(0.1, 0.85, 0.3, 1), opacity 0.55s ease';
        rip.style.transform = 'translate(-50%, -50%) scale(5.5)';
        rip.style.opacity = '0';
      });
    };

    const loop = () => {
      rafId = requestAnimationFrame(loop);

      // Smooth damped follow for outer ring
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;

      cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%) scale(${
        isClicking ? 0.75 : isHoveringInteractive ? 1.5 : 1
      })`;

      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) scale(${
        isClicking ? 0.85 : isHoveringInteractive ? 1.4 : 1
      })`;
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerdown', onPointerDown, { passive: true });
    window.addEventListener('pointerup', onPointerUp, { passive: true });
    document.addEventListener('mouseleave', onPointerLeave);
    document.addEventListener('mouseover', onMouseOver, { passive: true });
    window.addEventListener('click', onClick, { passive: true });

    loop();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointerup', onPointerUp);
      document.removeEventListener('mouseleave', onPointerLeave);
      document.removeEventListener('mouseover', onMouseOver);
      window.removeEventListener('click', onClick);
      for (const rip of ripplePool) {
        if (rip.parentNode) rip.parentNode.removeChild(rip);
      }
    };
  }, [palette]);

  const glowColor =
    palette === 'cyan'
      ? 'rgba(6, 182, 212, 0.85)'
      : palette === 'chrome'
      ? 'rgba(255, 255, 255, 0.85)'
      : 'rgba(167, 139, 250, 0.85)';

  const ringBorder =
    palette === 'cyan'
      ? 'rgba(6, 182, 212, 0.45)'
      : palette === 'chrome'
      ? 'rgba(255, 255, 255, 0.4)'
      : 'rgba(139, 92, 246, 0.45)';

  return (
    <>
      {/* Precision Core Cursor Dot */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[9999] opacity-0 transition-opacity duration-300 hidden md:block"
        style={{
          backgroundColor: glowColor,
          boxShadow: `0 0 10px ${glowColor}`,
        }}
        aria-hidden="true"
      />

      {/* Lagging Ambient Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9998] opacity-0 transition-opacity duration-300 hidden md:block border"
        style={{
          borderColor: ringBorder,
          backgroundColor: 'transparent',
        }}
        aria-hidden="true"
      />
    </>
  );
};
