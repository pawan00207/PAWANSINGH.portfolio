/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback, memo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HeroCoreScene, SceneConfig } from './components/canvas/HeroCoreScene';
import { SceneControlsDock } from './components/canvas/SceneControlsDock';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { FlagshipSection } from './components/FlagshipSection';
import { ProjectExplorer } from './components/ProjectExplorer';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { AchievementsSection } from './components/AchievementsSection';
import { GitHubSection } from './components/GitHubSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { GlobalEffects } from './components/GlobalEffects';
import { prefersReducedMotion } from './utils/motionPrefs';
import { Project } from './data/portfolioData';

// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Memoized content sections — scroll-driven state updates in App should not
// re-render the entire page tree on every scroll event.
const MemoAboutSection = memo(AboutSection);
const MemoSkillsSection = memo(SkillsSection);
const MemoAchievementsSection = memo(AchievementsSection);
const MemoGitHubSection = memo(GitHubSection);
const MemoContactSection = memo(ContactSection);
const MemoFooter = memo(Footer);

export default function App() {
  const [sceneConfig, setSceneConfig] = useState<SceneConfig>({
    palette: 'violet',
    rotationSpeed: 1.0,
    particlesEnabled: true,
    explodedOffset: 0,
    isZenMode: false,
    burstTrigger: 0,
  });

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [scrollRatio, setScrollRatio] = useState(0);

  // Active section observer & normalized scroll ratio tracker
  useEffect(() => {
    const sectionIds = ['hero', 'about', 'skills', 'flagships', 'projects', 'achievements', 'github', 'contact'];

    let rafId = 0;
    const handleScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = 0;
        const currentScrollY = window.scrollY || document.documentElement.scrollTop;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const ratio = maxScroll > 0 ? Math.min(1, Math.max(0, currentScrollY / maxScroll)) : 0;
        setScrollRatio(ratio);

        const scrollPos = currentScrollY + 220;
        for (const id of sectionIds) {
          const el = document.getElementById(id);
          if (el) {
            const top = el.offsetTop;
            const height = el.offsetHeight;
            if (scrollPos >= top && scrollPos < top + height) {
              setActiveSection(id);
              break;
            }
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Cinematic GSAP reveals: section headings + staggered [data-reveal] blocks
    const triggers: ScrollTrigger[] = [];
    const reducedMotion = prefersReducedMotion();

    if (!reducedMotion) {
      const sections = document.querySelectorAll('section');

      sections.forEach((sec) => {
        const heading = sec.querySelector('h2');
        if (heading) {
          const trigger = ScrollTrigger.create({
            trigger: sec,
            start: 'top 80%',
            onEnter: () => {
              gsap.fromTo(
                heading,
                { opacity: 0.25, y: 18 },
                { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', overwrite: 'auto' }
              );
            },
          });
          triggers.push(trigger);
        }
      });

      // Staggered fade-up entrances for tagged content blocks
      const revealTargets = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
      if (revealTargets.length > 0) {
        gsap.set(revealTargets, { opacity: 0, y: 26 });
        ScrollTrigger.batch(revealTargets, {
          start: 'top 86%',
          once: true,
          onEnter: (batch) => {
            gsap.to(batch, {
              opacity: 1,
              y: 0,
              duration: 0.85,
              stagger: 0.08,
              ease: 'power3.out',
              overwrite: true,
            });
          },
        });
      }
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
      triggers.forEach((t) => t.kill());
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleSelectProject = useCallback((p: Project) => setSelectedProject(p), []);

  // Coordinated canvas opacity based on storytelling chapter
  let canvasOpacity = 0.9;
  if (activeSection === 'hero') {
    canvasOpacity = 1.0;
  } else if (activeSection === 'about' || activeSection === 'skills') {
    canvasOpacity = 0.72; // Ambient hologram anchored beside the content columns
  } else if (activeSection === 'flagships' || activeSection === 'projects' || activeSection === 'achievements' || activeSection === 'github') {
    canvasOpacity = 0.6; // Soft cosmic background while project previews shine
  } else if (activeSection === 'contact') {
    canvasOpacity = 0.95; // Luminous portal convergence
  }

  return (
    <div className="relative min-h-screen bg-[#030508] text-neutral-100 overflow-x-hidden selection:bg-violet-600/30 selection:text-violet-200">
      {/* 3D WebGL Canvas Layer - Full bleed with section-driven 3D storytelling */}
      <div
        className="fixed inset-0 w-full h-full pointer-events-none z-0 transition-opacity duration-700"
        style={{ opacity: canvasOpacity }}
      >
        <HeroCoreScene
          config={sceneConfig}
          scrollProgress={scrollRatio}
          activeSection={activeSection}
        />
      </div>

      {/* Atmospheric Star Dust & Gradient Overlay */}
      <div className="fixed inset-0 bg-radial from-transparent via-[#030508]/70 to-[#030508] pointer-events-none z-0" />

      {/* Topmost Violet Journey Scroll Progress Bar */}
      <ScrollProgressBar />

      {/* Interactive Cursor Glow & Ambient Pooled Ripples */}
      <GlobalEffects palette={sceneConfig.palette} />

      {/* Top Navbar */}
      <Navbar activeSection={activeSection} onNavigate={scrollToSection} />

      {/* Content Stream */}
      <main className="relative z-10">
        {/* Hero Experience with GSAP Cinematic Intro */}
        <Hero
          onExploreClick={() => scrollToSection('about')}
          onProjectsClick={() => scrollToSection('projects')}
        />

        {/* 01: About & Academic Identity */}
        <MemoAboutSection />

        {/* 02: Skills & Capability Matrix */}
        <MemoSkillsSection />

        {/* 03: Flagship Systems Showcase */}
        <FlagshipSection onSelectProject={handleSelectProject} />

        {/* 04: Complete Repository Explorer */}
        <ProjectExplorer onSelectProject={handleSelectProject} />

        {/* 05: Achievements & Hackathons */}
        <MemoAchievementsSection />

        {/* 06: GitHub & Engineering */}
        <MemoGitHubSection />

        {/* 07: Luminous Portal & Recruiter Contact */}
        <MemoContactSection />
      </main>

      {/* Footer */}
      <MemoFooter />

      {/* Ergonomic 3D Bottom Control Dock */}
      <SceneControlsDock
        config={sceneConfig}
        onChange={(newConfig) => setSceneConfig(newConfig)}
      />

      {/* Project Architecture & Specs Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}
