import React, { useState } from 'react';
import { Cpu, Orbit, Grid, Check, Sparkles } from 'lucide-react';
import { PROFILE_DATA } from '../data/portfolioData';
import { soundManager } from '../utils/audioSynth';
import { SectionHeading } from './SectionHeading';

export const SkillsSection: React.FC = () => {
  const [viewMode, setViewMode] = useState<'constellation' | 'grid'>('constellation');
  const [selectedSkill, setSelectedSkill] = useState<string | null>('Three.js');

  const allSkills = [
    { name: 'Java', domain: 'Languages', role: 'Object-Oriented Architecture', tag: 'Core' },
    { name: 'DSA in Java', domain: 'Algorithms', role: 'Trees, Graphs, Sorting, Dynamic Programming', tag: 'Foundation' },
    { name: 'C', domain: 'Languages', role: 'Pointers, Low-Level Memory & Logic', tag: 'Core' },
    { name: 'JavaScript', domain: 'Languages', role: 'ES6+, Async, DOM & Event Pipelines', tag: 'Web' },
    { name: 'TypeScript', domain: 'Languages', role: 'Type Safety & Interfaces', tag: 'Modern' },
    { name: 'React', domain: 'Frontend', role: 'Component State, Hooks, Custom Renderers', tag: 'Core UI' },
    { name: 'Three.js', domain: 'Creative 3D', role: 'WebGL, PBR Shaders, Matrix Math, 3D Scenes', tag: 'Creative Tech' },
    { name: 'HTML5 & CSS3', domain: 'Frontend', role: 'Semantic Layouts, Responsive Grids', tag: 'Web' },
    { name: 'Tailwind CSS', domain: 'Frontend', role: 'Utility-first Clean Design Systems', tag: 'Styling' },
    { name: 'Responsive Web Design', domain: 'Frontend', role: 'Mobile-first Viewports & Touch Ergonomics', tag: 'UX' },
    { name: 'SQL', domain: 'Databases', role: 'Relational Queries, Joins, Aggregations', tag: 'Data' },
    { name: 'MySQL', domain: 'Databases', role: 'Relational Schema Design & ACID', tag: 'Data' },
    { name: 'MongoDB', domain: 'Databases', role: 'Document Collections, BSON Schemas', tag: 'Data' },
    { name: 'Git & GitHub', domain: 'Tooling', role: 'Version Control, PRs, Branch Workflows', tag: 'Engineering' },
    { name: 'AI Integration', domain: 'Intelligent Systems', role: 'LLM Prompt Engineering, Vision APIs, Triage', tag: 'AI' },
    { name: 'Basic Figma', domain: 'Design', role: 'Wireframing, Component Layouts', tag: 'Design' },
  ];

  return (
    <section id="skills" className="py-24 px-4 sm:px-6 max-w-6xl mx-auto relative z-10">
      {/* Header with View Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
        <SectionHeading
          index="02"
          label="Capabilities Matrix"
          icon={Cpu}
          accent="violet"
          title="Technical Stack & Foundations"
        />

        {/* View Switcher (Constellation vs Grid) */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-neutral-900 border border-neutral-800 self-start sm:self-auto">
          <button
            onClick={() => {
              soundManager.playChime(560, 0.05);
              setViewMode('constellation');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
              viewMode === 'constellation'
                ? 'bg-violet-600/30 text-violet-300 border border-violet-500/50'
                : 'text-neutral-400 hover:text-white'
            }`}
            aria-label="View skills in interactive orbital constellation"
          >
            <Orbit className="w-3.5 h-3.5" />
            <span>Constellation</span>
          </button>

          <button
            onClick={() => {
              soundManager.playChime(520, 0.05);
              setViewMode('grid');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
              viewMode === 'grid'
                ? 'bg-cyan-500/30 text-cyan-300 border border-cyan-400/50'
                : 'text-neutral-400 hover:text-white'
            }`}
            aria-label="View skills in accessible text grid"
          >
            <Grid className="w-3.5 h-3.5" />
            <span>Detailed Grid</span>
          </button>
        </div>
      </div>

      {/* Mode 1: Interactive Constellation Orbit View */}
      {viewMode === 'constellation' ? (
        <div className="p-6 sm:p-8 rounded-2xl bg-[#070b13] border border-neutral-800 relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 border-b border-neutral-800/80 pb-4">
            <div className="flex items-center gap-2 text-xs text-neutral-400">
              <Sparkles className="w-4 h-4 text-violet-400" />
              <span>Click any skill node to inspect engineering application</span>
            </div>
            {selectedSkill && (
              <div className="font-mono text-xs text-cyan-300 px-3 py-1 rounded bg-cyan-950/40 border border-cyan-800/50">
                ACTIVE NODE: <span className="font-bold text-white">{selectedSkill}</span>
              </div>
            )}
          </div>

          {/* Dynamic Nodes Grid with Interactive Orbit Aesthetic */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
            {allSkills.map((skill) => {
              const isSelected = selectedSkill === skill.name;
              return (
                <div
                  key={skill.name}
                  onClick={() => {
                    soundManager.playChime(600, 0.06);
                    setSelectedSkill(skill.name);
                  }}
                  className={`card-lift p-4 rounded-xl border transition-colors cursor-pointer relative group ${
                    isSelected
                      ? 'bg-violet-950/40 border-violet-500 shadow-lg shadow-violet-950/60 -translate-y-1'
                      : 'bg-[#0a0f1a]/80 border-neutral-800/80 hover:border-neutral-700 hover:bg-[#0e1524]'
                  }`}
                  role="button"
                  tabIndex={0}
                  aria-pressed={isSelected}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setSelectedSkill(skill.name);
                    }
                  }}
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-wider">
                      {skill.domain}
                    </span>
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-cyan-400">
                      {skill.tag}
                    </span>
                  </div>

                  <h3 className="font-display font-semibold text-sm sm:text-base text-white group-hover:text-violet-300 transition-colors">
                    {skill.name}
                  </h3>

                  <p className="text-xs text-neutral-400 mt-1 line-clamp-2 leading-relaxed">
                    {skill.role}
                  </p>

                  {/* Corner indicator */}
                  <div
                    className={`absolute bottom-2 right-2 w-1.5 h-1.5 rounded-full ${
                      isSelected ? 'bg-violet-400' : 'bg-neutral-700 group-hover:bg-cyan-400'
                    }`}
                  />
                </div>
              );
            })}
          </div>

          {/* Active Detail Bar */}
          {selectedSkill && (
            <div className="mt-6 p-4 rounded-xl bg-neutral-900/90 border border-violet-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="font-mono text-[10px] text-violet-400 uppercase tracking-widest block">Focus Detail</span>
                <p className="text-sm text-neutral-200 mt-0.5">
                  Applied in portfolio architecture and verified repositories:{' '}
                  <span className="text-white font-medium">
                    {allSkills.find((s) => s.name === selectedSkill)?.role}
                  </span>
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 shrink-0">
                <Check className="w-4 h-4" />
                <span>Verified in Codebase</span>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Mode 2: Accessible Structured Category Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PROFILE_DATA.skills.map((cat) => (
            <div key={cat.category} data-reveal className="card-lift p-6 rounded-2xl bg-[#080d16] border border-white/[0.06] hover:border-violet-500/30">
              <h3 className="font-display font-bold text-lg text-white mb-2">{cat.category}</h3>
              <p className="text-xs text-neutral-400 mb-5 leading-relaxed">{cat.description}</p>
              <div className="flex flex-wrap gap-2">
                {cat.items.map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-200 font-mono text-xs hover:border-violet-500/50 hover:text-violet-300 transition-colors"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
