import React, { useEffect, useRef, useState } from 'react';
import { ArrowDown, Code2, FileText, Compass, FastForward } from 'lucide-react';
import gsap from 'gsap';
import { PROFILE_DATA } from '../data/portfolioData';
import { soundManager } from '../utils/audioSynth';
import { useMagnetic } from '../utils/useMagnetic';

interface HeroProps {
  onExploreClick: () => void;
  onProjectsClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onProjectsClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const copyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const lightSweepRef = useRef<HTMLDivElement>(null);

  // Magnetic wrappers for the primary CTAs (desktop pointers only)
  const exploreMagneticRef = useMagnetic<HTMLDivElement>();
  const projectsMagneticRef = useMagnetic<HTMLDivElement>();
  const resumeMagneticRef = useMagnetic<HTMLDivElement>();

  const [introFinished, setIntroFinished] = useState(false);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    // Check for reduced motion preference or explicit autostart query param
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const urlParams = new URLSearchParams(window.location.search);
    const autostart = urlParams.get('autostart') === '1';
    const forceIntro = urlParams.get('intro') === '1';

    let alreadySeen = false;
    try {
      alreadySeen = !forceIntro && sessionStorage.getItem('pawan_portfolio_intro_seen') === '1';
    } catch {
      // Storage fallback
    }

    if (prefersReducedMotion || autostart || alreadySeen) {
      setIntroFinished(true);
      return;
    }

    const heroWords = containerRef.current
      ? Array.from(containerRef.current.querySelectorAll<HTMLElement>('.hero-word'))
      : [];

    const tl = gsap.timeline({
      onComplete: () => {
        setIntroFinished(true);
        try {
          sessionStorage.setItem('pawan_portfolio_intro_seen', '1');
        } catch {
          // Silent fallback
        }
      },
    });
    timelineRef.current = tl;

    // Initial state with 3D perspective rotation
    gsap.set([badgeRef.current, subtitleRef.current, copyRef.current, ctaRef.current, scrollIndicatorRef.current], {
      opacity: 0,
    });
    gsap.set(heroWords, {
      opacity: 0,
      y: '0.6em',
      rotateX: 35,
      transformOrigin: '50% 100%',
      letterSpacing: '0.04em',
    });
    gsap.set(subtitleRef.current, { y: 18, letterSpacing: '0.35em' });
    gsap.set(badgeRef.current, { y: -15, scale: 0.9 });
    gsap.set(copyRef.current, { y: 15 });
    gsap.set(ctaRef.current, { y: 20 });
    gsap.set(lightSweepRef.current, { x: '-100%', opacity: 0 });

    // Choreographed cinematic entrance (≈2.4 seconds total)
    tl.to(lightSweepRef.current, {
      opacity: 0.85,
      x: '100%',
      duration: 1.1,
      ease: 'power2.inOut',
    })
      .to(
        badgeRef.current,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: 'back.out(1.4)',
        },
        '-=0.75'
      )
      .to(
        heroWords,
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          letterSpacing: '-0.03em',
          duration: 0.95,
          stagger: 0.15,
          ease: 'power3.out',
        },
        '-=0.45'
      )
      .to(
        subtitleRef.current,
        {
          opacity: 1,
          y: 0,
          letterSpacing: '0.22em',
          duration: 0.7,
          ease: 'power2.out',
        },
        '-=0.5'
      )
      .to(
        copyRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
        },
        '-=0.3'
      )
      .to(
        ctaRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
        },
        '-=0.3'
      )
      .to(
        scrollIndicatorRef.current,
        {
          opacity: 1,
          duration: 0.5,
          ease: 'power1.out',
        },
        '-=0.2'
      );

    return () => {
      tl.kill();
    };
  }, []);

  const handleSkipIntro = () => {
    soundManager.playChime(620, 0.06);
    if (timelineRef.current) {
      timelineRef.current.progress(1);
    }
    setIntroFinished(true);
    try {
      sessionStorage.setItem('pawan_portfolio_intro_seen', '1');
    } catch {
      // Storage fallback
    }
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen w-full flex items-center pt-24 pb-16 px-4 sm:px-6 pointer-events-none select-none overflow-hidden"
    >
      {/* Cinematic Ambient Vignette */}
      <div className="absolute inset-0 bg-radial from-transparent via-[#030508]/30 to-[#030508] pointer-events-none" />

      {/* Mobile-only legibility scrim — keeps copy readable over the distant core */}
      <div className="lg:hidden absolute inset-0 bg-gradient-to-b from-[#030508]/75 via-[#030508]/40 to-[#030508]/75 pointer-events-none" />

      {/* Controlled Horizontal Light Sweep Line during Intro */}
      <div
        ref={lightSweepRef}
        className="absolute top-1/2 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent pointer-events-none z-10"
      />

      {/* Hero Typography & Primary Actions — editorial asymmetric composition:
          copy owns the left columns, the 3D core owns the right stage */}
      <div className="relative z-10 mx-auto w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 items-center gap-10">
        <div className="lg:col-span-7 xl:col-span-6 flex flex-col items-center text-center lg:items-start lg:text-left">
          {/* Status Badge */}
          <div
            ref={badgeRef}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0a0e18]/85 border border-violet-500/25 text-[11px] font-mono text-violet-300 mb-7 shadow-lg shadow-violet-950/40 pointer-events-auto backdrop-blur-sm transition-transform hover:scale-105"
          >
            <span className="w-2 h-2 rounded-full bg-violet-400" />
            <span>B.Tech CSE '28 · DTC (GGSIPU) · CGPA 9.16</span>
          </div>

          {/* Cinematic Main Title — 3D perspective line reveal with subtle hover shimmer */}
          <h1
            ref={titleRef}
            aria-label="Pawan Singh"
            className="font-display font-bold display-hero text-white mb-5 drop-shadow-[0_12px_42px_rgba(139,92,246,0.35)] [perspective:800px]"
          >
            <span className="hero-word inline-block will-change-transform transition-all duration-300 hover:text-cyan-200 cursor-default">
              PAWAN
            </span>{' '}
            <span className="hero-word inline-block will-change-transform transition-all duration-300 hover:text-violet-200 cursor-default">
              SINGH
            </span>
          </h1>

          {/* Subtitle with Restrained High-Tech Spacing */}
          <p
            ref={subtitleRef}
            className="font-display font-medium text-sm sm:text-lg md:text-xl tracking-[0.22em] text-cyan-300 uppercase mb-4 drop-shadow-md"
          >
            FULL STACK DEVELOPER · AI BUILDER
          </p>

          {/* Supporting Narrative Copy */}
          <p
            ref={copyRef}
            className="font-sans text-neutral-300 text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed mb-9"
          >
            Building intelligent products, robust full-stack systems, and immersive digital experiences with modern web technologies, AI integrations, and real-time architectures.
          </p>

          {/* Primary Action Buttons with Magnetic Elevation */}
          <div
            ref={ctaRef}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pointer-events-auto mb-14"
          >
            {/* Explore My Work CTA */}
            <div ref={exploreMagneticRef} className="inline-flex">
              <button
                onClick={() => {
                  soundManager.playChime(520, 0.1);
                  onExploreClick();
                }}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-medium text-xs sm:text-sm tracking-wider uppercase transition-all shadow-lg shadow-violet-900/50 hover:shadow-violet-600/40 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer border border-violet-400/40"
              >
                <Compass className="w-4 h-4" />
                <span>Explore My Work</span>
              </button>
            </div>

            {/* View Projects CTA */}
            <div ref={projectsMagneticRef} className="inline-flex">
              <button
                onClick={() => {
                  soundManager.playChime(480, 0.1);
                  onProjectsClick();
                }}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#0c121d]/90 hover:bg-[#131b2c] text-cyan-300 hover:text-white font-medium text-xs sm:text-sm tracking-wider uppercase transition-all border border-cyan-500/40 hover:border-cyan-400 hover:-translate-y-0.5 active:translate-y-0 shadow-md cursor-pointer"
              >
                <Code2 className="w-4 h-4" />
                <span>View Projects (18)</span>
              </button>
            </div>

            {/* Download Resume CTA */}
            <div ref={resumeMagneticRef} className="inline-flex">
              <a
                href={PROFILE_DATA.contact.resumeUrl}
                download="Pawan_Singh_Resume.pdf"
                onClick={() => soundManager.playChime(440, 0.08)}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-neutral-900/80 hover:bg-neutral-800 text-neutral-200 hover:text-white font-medium text-xs sm:text-sm tracking-wider uppercase transition-all border border-neutral-700/80 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                aria-label="Download Pawan Singh Resume PDF"
              >
                <FileText className="w-4 h-4 text-violet-400" />
                <span>Download Resume</span>
              </a>
            </div>
          </div>

          {/* Minimal Scroll Indicator */}
          <div
            ref={scrollIndicatorRef}
            onClick={onExploreClick}
            className="flex flex-col items-center lg:items-start gap-1.5 text-neutral-400 hover:text-violet-300 transition-colors pointer-events-auto cursor-pointer group"
            role="button"
            tabIndex={0}
            aria-label="Scroll to portfolio content"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onExploreClick();
              }
            }}
          >
            <span className="font-mono text-[10px] tracking-widest uppercase group-hover:tracking-wider transition-all">
              Scroll to Journey
            </span>
            <span className="scroll-hint inline-flex">
              <ArrowDown className="w-4 h-4 text-neutral-400 group-hover:text-violet-400 transition-colors" />
            </span>
          </div>
        </div>

        {/* Reserved stage columns — the 3D core composes into this space on desktop */}
        <div className="hidden lg:block lg:col-span-5 xl:col-span-6" aria-hidden="true" />
      </div>

      {/* Skip Intro Button (Appears only during initial intro sequence) */}
      {!introFinished && (
        <button
          onClick={handleSkipIntro}
          className="fixed bottom-6 right-6 z-50 pointer-events-auto flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-900/90 border border-neutral-700 text-[11px] font-mono text-neutral-300 hover:text-white hover:border-cyan-400 transition-colors shadow-2xl cursor-pointer"
          aria-label="Skip cinematic introduction"
        >
          <FastForward className="w-3.5 h-3.5 text-cyan-400" />
          <span>Skip Intro</span>
        </button>
      )}
    </section>
  );
};
