import React, { useEffect, useState } from 'react';
import { Menu, X, FileText, Github, Linkedin, Volume2, VolumeX } from 'lucide-react';
import { PROFILE_DATA } from '../data/portfolioData';
import { soundManager } from '../utils/audioSynth';

interface NavbarProps {
  activeSection?: string;
  onNavigate?: (sectionId: string) => void;
}

// Animated gradient underline shared by nav links
const navUnderline =
  'relative after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-full after:origin-left after:bg-gradient-to-r after:from-violet-400 after:to-cyan-300 after:transition-transform after:duration-300 after:ease-out hover:after:scale-x-100';

export const Navbar: React.FC<NavbarProps> = ({ activeSection, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(soundManager.getIsMuted());
  const [isScrolled, setIsScrolled] = useState(false);

  // Elevate the header surface once the journey begins
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Flagship Systems', href: '#flagships' },
    { label: 'Projects Archive', href: '#projects' },
    { label: 'Achievements', href: '#achievements' },
    { label: 'GitHub', href: '#github' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    soundManager.playChime(500, 0.08);
    setMobileMenuOpen(false);

    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    if (onNavigate) {
      onNavigate(targetId);
    }
  };

  const handleAudioToggle = () => {
    const muted = soundManager.toggleMute();
    setIsAudioMuted(muted);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 py-3.5 backdrop-blur-md border-b transition-all duration-500 ${
        isScrolled
          ? 'bg-[#030508]/90 border-white/[0.07] shadow-lg shadow-black/30'
          : 'bg-[#030508]/60 border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#hero"
          onClick={(e) => handleLinkClick(e, '#hero')}
          className="flex items-center gap-2.5 group cursor-pointer"
          aria-label="Pawan Singh Portfolio Home"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-700 flex items-center justify-center font-display font-bold text-white text-xs border border-violet-400/40 shadow-sm shadow-violet-900/30 group-hover:border-violet-300 transition-colors">
            PS
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-sm tracking-wide text-neutral-100 group-hover:text-violet-300 transition-colors">
              PAWAN SINGH
            </span>
            <span className="font-mono text-[9px] uppercase tracking-wider text-neutral-400">
              Full Stack · AI Builder
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace('#', '');
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`font-sans text-xs tracking-wider uppercase py-1 cursor-pointer transition-colors ${navUnderline} ${
                  isActive
                    ? 'text-violet-300 font-semibold after:scale-x-100'
                    : 'text-neutral-400 hover:text-neutral-100'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Actions (Sound toggle, Social links & Resume CTA) */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Audio Synthesizer Toggle */}
          <button
            onClick={handleAudioToggle}
            className="p-1.5 rounded-lg border border-neutral-800 bg-neutral-900/60 text-neutral-400 hover:text-neutral-100 hover:border-neutral-700 transition-colors cursor-pointer"
            title={isAudioMuted ? "Enable ambient cosmic sound" : "Mute ambient cosmic sound"}
            aria-label={isAudioMuted ? "Enable ambient sound" : "Mute ambient sound"}
          >
            {isAudioMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
          </button>

          <a
            href={PROFILE_DATA.contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-lg border border-neutral-800 bg-neutral-900/60 text-neutral-400 hover:text-neutral-100 hover:border-neutral-700 transition-colors cursor-pointer"
            aria-label="GitHub Profile"
          >
            <Github className="w-4 h-4" />
          </a>

          <a
            href={PROFILE_DATA.contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-lg border border-neutral-800 bg-neutral-900/60 text-neutral-400 hover:text-neutral-100 hover:border-neutral-700 transition-colors cursor-pointer"
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="w-4 h-4" />
          </a>

          <a
            href={PROFILE_DATA.contact.resumeUrl}
            download="Pawan_Singh_Resume.pdf"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 border border-violet-500/40 hover:border-violet-400 hover:bg-violet-950/40 text-violet-200 text-xs font-medium transition-all cursor-pointer shadow-sm shadow-violet-950/50"
            aria-label="Download Pawan Singh Resume"
          >
            <FileText className="w-3.5 h-3.5 text-violet-400" />
            <span>Resume</span>
          </a>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={handleAudioToggle}
            className="p-1.5 rounded-lg border border-neutral-800 bg-neutral-900/60 text-neutral-400"
            aria-label="Toggle sound"
          >
            {isAudioMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-lg border border-neutral-800 bg-neutral-900/80 text-neutral-300 hover:text-white cursor-pointer"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-3 pt-3 border-t border-white/[0.07] bg-[#070b12]/95 rounded-xl p-4 flex flex-col gap-3 shadow-2xl stage-enter">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`font-sans text-xs uppercase tracking-wider py-1.5 px-2 rounded-lg transition-colors ${
                    isActive
                      ? 'text-violet-300 bg-violet-950/40'
                      : 'text-neutral-300 hover:text-violet-400 hover:bg-neutral-900/80'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </div>

          <div className="pt-3 border-t border-neutral-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <a
                href={PROFILE_DATA.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300"
                aria-label="GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={PROFILE_DATA.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>

            <a
              href={PROFILE_DATA.contact.resumeUrl}
              download="Pawan_Singh_Resume.pdf"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-violet-600/30 border border-violet-500/50 text-violet-200 text-xs font-medium"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Resume PDF</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
