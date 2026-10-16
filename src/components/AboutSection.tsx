import React from 'react';
import { GraduationCap, Terminal, CheckCircle2 } from 'lucide-react';
import { PROFILE_DATA } from '../data/portfolioData';
import { SectionHeading } from './SectionHeading';

const CORE_PRINCIPLES = [
  {
    title: 'Algorithmic Rigor',
    body: 'Strong DSA foundations in Java and memory-level understanding in C.',
    accent: 'text-emerald-400',
  },
  {
    title: 'AI System Integration',
    body: 'Applied multi-modal models, structured triage prompts, and computer vision.',
    accent: 'text-violet-400',
  },
  {
    title: 'Resilient Architecture',
    body: 'Modular full-stack separation, clean schema modeling, and offline tolerance.',
    accent: 'text-cyan-400',
  },
  {
    title: 'Verified Execution',
    body: 'Transparent repositories, verified commits, and honest metric reporting.',
    accent: 'text-amber-400',
  },
] as const;

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-28 px-4 sm:px-6 max-w-6xl mx-auto relative z-10">
      {/* Legibility bands — softly darken the section edges over the canvas */}
      <div
        className="absolute inset-x-0 -top-10 -bottom-10 -z-10 bg-gradient-to-b from-[#030508]/70 via-transparent to-[#030508]/60 pointer-events-none"
        aria-hidden="true"
      />

      <SectionHeading
        index="01"
        label="System Identity"
        icon={Terminal}
        accent="cyan"
        title="About Pawan Singh"
        className="mb-14"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
        {/* Narrative & Focus */}
        <div className="lg:col-span-7 space-y-6 text-neutral-300 font-sans text-sm sm:text-[15px] leading-[1.85]">
          <p data-reveal className="prose-measure text-[15px] sm:text-base">
            I am a Computer Science & Engineering undergraduate at{' '}
            <span className="text-white font-medium">Delhi Technical Campus (DTC)</span>, affiliated with{' '}
            <span className="text-white font-medium">Guru Gobind Singh Indraprastha University (GGSIPU)</span>.
            My focus centers on architecting real-world web applications, AI-assisted healthcare systems, and rapid emergency response platforms.
          </p>

          <p data-reveal className="prose-measure">
            Rather than building superficial clones, I approach software with rigorous algorithmic foundations — blending{' '}
            <span className="text-violet-300 font-medium">Java, Data Structures & Algorithms, C, and React</span> with
            modern database architectures (MongoDB, MySQL) and intelligent model integration.
          </p>

          <p data-reveal className="prose-measure">
            From engineering <span className="text-cyan-300 font-medium">MediVerse.AI</span> (an AI-enabled healthcare triage platform)
            to developing <span className="text-cyan-300 font-medium">ResQMap</span> (disaster navigation and hazard mapping),
            my projects emphasize resilience, clear technical structure, and human impact.
          </p>

          {/* Core Principles */}
          <div className="pt-5 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {CORE_PRINCIPLES.map((principle) => (
              <div
                key={principle.title}
                data-reveal
                className="card-lift p-4 rounded-xl bg-[#0a0f19]/80 border border-white/[0.06] hover:border-violet-500/35 flex items-start gap-3"
              >
                <CheckCircle2 className={`w-4 h-4 ${principle.accent} shrink-0 mt-0.5`} />
                <div>
                  <h4 className="font-display font-medium text-xs text-white uppercase tracking-wider">
                    {principle.title}
                  </h4>
                  <p className="text-xs text-neutral-400 mt-1.5 leading-relaxed">{principle.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Academic & Metric Cards */}
        <div className="lg:col-span-5 space-y-5">
          {/* Academic Highlight Card */}
          <div
            data-reveal
            className="card-lift p-6 rounded-2xl bg-[#090d16] border border-violet-500/25 relative overflow-hidden shadow-xl shadow-violet-950/20"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-violet-600/10 rounded-full blur-2xl pointer-events-none" />
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-violet-600/20 text-violet-300 border border-violet-500/30">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <span className="font-mono text-[10px] text-violet-400 uppercase tracking-widest block">Academic Standing</span>
                <h3 className="font-display font-bold text-base text-white">{PROFILE_DATA.education.degree}</h3>
              </div>
            </div>

            <div className="space-y-3 font-sans text-xs text-neutral-300 border-t border-white/[0.06] pt-4">
              <div className="flex justify-between items-center">
                <span className="text-neutral-400">Current CGPA</span>
                <span className="font-mono font-bold text-emerald-400 text-sm px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-800/60">
                  {PROFILE_DATA.education.cgpa} / 10.0
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-neutral-400">Expected Graduation</span>
                <span className="font-mono text-white font-medium">{PROFILE_DATA.education.graduationYear}</span>
              </div>
              <div className="flex justify-between items-start">
                <span className="text-neutral-400">Institution</span>
                <span className="text-right text-neutral-200">{PROFILE_DATA.education.institution}</span>
              </div>
              <div className="flex justify-between items-start">
                <span className="text-neutral-400">Affiliation</span>
                <span className="text-right text-neutral-200">{PROFILE_DATA.education.university}</span>
              </div>
            </div>
          </div>

          {/* Quick Verified Profiles */}
          <div data-reveal className="p-5 rounded-2xl bg-[#080c14] border border-white/[0.06] space-y-3.5">
            <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-wider block">
              Verified Developer Profiles
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <a
                href={PROFILE_DATA.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="card-lift p-3 rounded-xl bg-neutral-900/80 hover:bg-neutral-800 border border-white/[0.06] hover:border-cyan-500/40 flex flex-col items-center text-center group cursor-pointer"
              >
                <span className="font-display font-semibold text-xs text-white group-hover:text-cyan-300">GitHub</span>
                <span className="font-mono text-[10px] text-neutral-400 mt-0.5">pawan00207</span>
              </a>

              <a
                href={PROFILE_DATA.contact.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                className="card-lift p-3 rounded-xl bg-neutral-900/80 hover:bg-neutral-800 border border-white/[0.06] hover:border-amber-500/40 flex flex-col items-center text-center group cursor-pointer"
              >
                <span className="font-display font-semibold text-xs text-white group-hover:text-amber-300">LeetCode</span>
                <span className="font-mono text-[10px] text-neutral-400 mt-0.5">pawansingh2005</span>
              </a>

              <a
                href={PROFILE_DATA.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="card-lift p-3 rounded-xl bg-neutral-900/80 hover:bg-neutral-800 border border-white/[0.06] hover:border-blue-500/40 flex flex-col items-center text-center group cursor-pointer"
              >
                <span className="font-display font-semibold text-xs text-white group-hover:text-blue-300">LinkedIn</span>
                <span className="font-mono text-[10px] text-neutral-400 mt-0.5">Pawan Singh</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
