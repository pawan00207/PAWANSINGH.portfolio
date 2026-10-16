/**
 * Shared motion-environment helpers used across the 3D scene, GSAP
 * choreography and micro-interactions.
 */

export function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

/** True on devices with a precise hover-capable pointer (desktop mice / trackpads). */
export function hasFinePointer(): boolean {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(hover: hover) and (pointer: fine)').matches
  );
}
