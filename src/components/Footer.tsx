import React from 'react';
import { Github, Linkedin, Code2, Heart } from 'lucide-react';
import { PROFILE_DATA } from '../data/portfolioData';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-neutral-900 bg-[#020306] py-12 px-4 sm:px-6 relative z-10 text-neutral-400 text-xs">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Identity */}
        <div className="space-y-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <span className="font-display font-bold text-white text-sm tracking-wide">
              PAWAN SINGH
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-violet-950/60 border border-violet-800/60 text-violet-300">
              v2.0 Cinematic Core
            </span>
          </div>
          <p className="text-neutral-500">
            Delhi Technical Campus (DTC) · affiliated with GGSIPU · B.Tech CSE Class of 2028 · CGPA 9.16
          </p>
        </div>

        {/* Center: Tech Specs */}
        <div className="text-center md:text-right font-mono text-[11px] text-neutral-500 space-y-0.5">
          <p>Rendered with Three.js Procedural PBR & React 19</p>
          <p>Zero external image dependencies · Lossless 60fps WebGL loop</p>
        </div>

        {/* Right: Quick Links */}
        <div className="flex items-center gap-4">
          <a
            href={PROFILE_DATA.contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
            aria-label="GitHub Profile"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href={PROFILE_DATA.contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition-colors"
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href={PROFILE_DATA.contact.leetcode}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-amber-400 transition-colors"
            aria-label="LeetCode Profile"
          >
            <Code2 className="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  );
};
