/**
 * Central Animation & Motion Configuration
 * 
 * Provides typed runtime control, intensity scaling, feature toggles,
 * mobile performance overrides, and reduced-motion compliance.
 */

export interface AnimationConfig {
  // Feature toggles
  heroCoreMotion: boolean;
  pointerParallax: boolean;
  cameraChoreography: boolean;
  introSequence: boolean;
  scrollDrivenAnimation: boolean;
  particleLayers: boolean;
  bloomPostprocessing: boolean;
  typographyReveal: boolean;
  cardTiltGlare: boolean;
  magneticButtons: boolean;
  customCursor: boolean;
  clickRipples: boolean;
  contactAnimation: boolean;
  soundEffects: boolean;

  // Motion intensity parameters (0.0 to 1.0)
  intensity: {
    parallaxStrength: number;
    rotationMultiplier: number;
    shockwavePower: number;
    tiltAngleMax: number; // in degrees
    cameraDrift: number;
    particleDensity: number; // factor 0.2 to 1.0
  };

  // State
  isReducedMotion: boolean;
  isTouchDevice: boolean;
}

const checkReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

const checkTouchDevice = (): boolean => {
  if (typeof window === 'undefined') return false;
  return (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    window.matchMedia('(pointer: coarse)').matches
  );
};

export const defaultAnimationConfig: AnimationConfig = {
  heroCoreMotion: true,
  pointerParallax: true,
  cameraChoreography: true,
  introSequence: true,
  scrollDrivenAnimation: true,
  particleLayers: true,
  bloomPostprocessing: true,
  typographyReveal: true,
  cardTiltGlare: true,
  magneticButtons: true,
  customCursor: true,
  clickRipples: true,
  contactAnimation: true,
  soundEffects: true,

  intensity: {
    parallaxStrength: 1.0,
    rotationMultiplier: 1.0,
    shockwavePower: 1.0,
    tiltAngleMax: 12,
    cameraDrift: 1.0,
    particleDensity: 1.0,
  },

  isReducedMotion: checkReducedMotion(),
  isTouchDevice: checkTouchDevice(),
};

/**
 * Returns an animation configuration adapted for the current runtime environment.
 * Touch screens disable fine cursor and heavy tilt.
 * Reduced motion disables camera shakes, rapid spins, and large transitions.
 */
export function getResolvedAnimationConfig(overrides?: Partial<AnimationConfig>): AnimationConfig {
  const isReduced = checkReducedMotion();
  const isTouch = checkTouchDevice();

  const base: AnimationConfig = {
    ...defaultAnimationConfig,
    isReducedMotion: isReduced,
    isTouchDevice: isTouch,
  };

  if (isReduced) {
    base.pointerParallax = false;
    base.cameraChoreography = false;
    base.introSequence = false;
    base.cardTiltGlare = false;
    base.customCursor = false;
    base.clickRipples = false;
    base.intensity.parallaxStrength = 0;
    base.intensity.rotationMultiplier = 0.2;
    base.intensity.shockwavePower = 0.2;
    base.intensity.cameraDrift = 0;
  } else if (isTouch) {
    // Touch optimizations: preserve high visual fidelity but drop pointer-specific systems
    base.customCursor = false;
    base.cardTiltGlare = false;
    base.pointerParallax = false;
    base.intensity.parallaxStrength = 0.3;
    base.intensity.particleDensity = 0.6;
  }

  return { ...base, ...overrides };
}
