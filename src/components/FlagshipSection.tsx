import React, { useState } from 'react';
import { Sparkles, Github, ExternalLink, ChevronRight, Activity, ShieldAlert, HeartPulse, MapPin } from 'lucide-react';
import { PROJECTS_DATA, Project } from '../data/portfolioData';
import { Flagship3DCanvas } from './canvas/Flagship3DCanvas';
import { soundManager } from '../utils/audioSynth';
import { SectionHeading } from './SectionHeading';
import { useCardTilt } from '../utils/useCardTilt';

interface FlagshipSectionProps {
  onSelectProject: (project: Project) => void;
}

export const FlagshipSection: React.FC<FlagshipSectionProps> = ({ onSelectProject }) => {
  const flagships = PROJECTS_DATA.filter((p) => p.isFlagship);
  const [activeTab, setActiveTab] = useState<string>(flagships[0]?.id || 'mediverse-ai');
  const [viewTab, setViewTab] = useState<'solution' | 'architecture' | 'features'>('solution');
  const cardTiltRef = useCardTilt<HTMLDivElement>({ maxTilt: 4, perspective: 1200, scale: 1.005, glare: true });

  const currentFlagship = flagships.find((f) => f.id === activeTab) || flagships[0];

  const getFlagshipIcon = (id: string) => {
    switch (id) {
      case 'mediverse-ai':
        return <Activity className="w-4 h-4 text-violet-400" />;
      case 'swasth-saathi':
        return <HeartPulse className="w-4 h-4 text-emerald-400" />;
      case 'trafficguard-pro':
        return <ShieldAlert className="w-4 h-4 text-amber-400" />;
      case 'resqmap-app':
      default:
        return <MapPin className="w-4 h-4 text-cyan-400" />;
    }
  };

  return (
    <section id="flagships" className="py-28 px-4 sm:px-6 max-w-6xl mx-auto relative z-10">
      {/* Header */}
      <SectionHeading
        index="03"
        label="Flagship Engineering"
        icon={Sparkles}
        accent="cyan"
        title="Architectural Showcases"
        description="Four flagship systems featuring deep technical architectures, verified repositories, and cinematic 3D procedural visualizations."
        className="mb-12"
      />

      {/* Flagship Selector Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 mb-8">
        {flagships.map((f) => {
          const isActive = f.id === activeTab;
          return (
            <button
              key={f.id}
              onClick={() => {
                soundManager.playChime(580, 0.08);
                setActiveTab(f.id);
              }}
              className={`card-lift p-3.5 rounded-xl border text-left cursor-pointer flex flex-col justify-between ${
                isActive
                  ? 'bg-violet-950/40 border-violet-500/80 shadow-lg shadow-violet-950/50'
                  : 'bg-[#090d16] border-neutral-800 hover:border-neutral-700 hover:bg-[#0d1422]'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                {getFlagshipIcon(f.id)}
                {f.highlightMetric && (
                  <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-neutral-900 border border-neutral-700 text-neutral-300">
                    {f.highlightMetric}
                  </span>
                )}
              </div>
              <div>
                <span className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest block">
                  {f.category}
                </span>
                <span className={`font-display font-bold text-sm tracking-tight ${isActive ? 'text-white' : 'text-neutral-300'}`}>
                  {f.title}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Flagship Detail Stage */}
      <div
        ref={cardTiltRef}
        data-reveal
        className="rounded-2xl bg-[#070b13] border border-white/[0.07] p-6 sm:p-8 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative overflow-hidden"
      >
        {/* Signature top hairline */}
        <div className="hairline absolute top-0 left-0 right-0 h-px opacity-70" aria-hidden="true" />
        {/* Left Column: 3D Canvas Visualizer & Quick Actions */}
        <div className="lg:col-span-5 space-y-4">
          <Flagship3DCanvas
            flagshipId={currentFlagship.id as 'mediverse-ai' | 'swasth-saathi' | 'trafficguard-pro' | 'resqmap-app'}
          />

          <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-wider">Visual Atmosphere</span>
              <span className="font-mono text-[10px] text-cyan-300 font-medium">{currentFlagship.visualTheme}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-wider">Project Status</span>
              <span className="font-mono text-[10px] text-emerald-400 px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-800/60">
                {currentFlagship.status}
              </span>
            </div>
          </div>

          {/* Action Links */}
          <div className="flex flex-wrap gap-2.5 pt-2">
            <a
              href={currentFlagship.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-violet-600/30 hover:bg-violet-600/50 border border-violet-500/50 text-white font-medium text-xs transition-colors cursor-pointer"
            >
              <Github className="w-3.5 h-3.5" />
              <span>Verified Repository</span>
            </a>

            {currentFlagship.altRepoUrl && (
              <a
                href={currentFlagship.altRepoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 px-3 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-neutral-300 text-xs transition-colors cursor-pointer"
                title="Alternative/Sister Repository"
              >
                <span>Alt Repo</span>
                <ExternalLink className="w-3 h-3 text-neutral-400" />
              </a>
            )}

            {currentFlagship.huggingFaceUrl && (
              <a
                href={currentFlagship.huggingFaceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-amber-950/40 border border-amber-800/60 text-amber-300 text-xs hover:bg-amber-900/40 transition-colors cursor-pointer"
              >
                <span>HF Model Space</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}

            <button
              onClick={() => onSelectProject(currentFlagship)}
              className="w-full flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-neutral-200 text-xs transition-colors cursor-pointer"
            >
              <span>Full System Blueprint Modal</span>
              <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
            </button>
          </div>
        </div>

        {/* Right Column: Problem, Solution & Architecture Breakdown */}
        <div key={currentFlagship.id} className="lg:col-span-7 space-y-6 stage-enter">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-[10px] text-violet-400 uppercase tracking-widest px-2 py-0.5 rounded bg-violet-950/50 border border-violet-800/50">
                {currentFlagship.category}
              </span>
              {currentFlagship.highlightMetric && (
                <span className="font-mono text-[10px] text-cyan-300 px-2 py-0.5 rounded bg-cyan-950/40 border border-cyan-800/40">
                  {currentFlagship.highlightMetric}
                </span>
              )}
            </div>
            <h3 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight">
              {currentFlagship.title}
            </h3>
            <p className="text-cyan-300 font-display text-xs sm:text-sm tracking-wide mt-1">
              {currentFlagship.subtitle}
            </p>
            <p className="text-neutral-300 text-sm mt-3 leading-relaxed">
              {currentFlagship.summary}
            </p>
          </div>

          {/* Sub-view navigation tabs */}
          <div className="flex border-b border-neutral-800 gap-4">
            <button
              onClick={() => setViewTab('solution')}
              className={`pb-2 font-mono text-xs uppercase tracking-wider transition-colors cursor-pointer ${
                viewTab === 'solution'
                  ? 'text-violet-300 border-b-2 border-violet-500 font-semibold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Problem & Solution
            </button>
            <button
              onClick={() => setViewTab('architecture')}
              className={`pb-2 font-mono text-xs uppercase tracking-wider transition-colors cursor-pointer ${
                viewTab === 'architecture'
                  ? 'text-violet-300 border-b-2 border-violet-500 font-semibold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Architecture Tiers
            </button>
            <button
              onClick={() => setViewTab('features')}
              className={`pb-2 font-mono text-xs uppercase tracking-wider transition-colors cursor-pointer ${
                viewTab === 'features'
                  ? 'text-violet-300 border-b-2 border-violet-500 font-semibold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Core Capabilities
            </button>
          </div>

          {/* Sub-view stage — re-animates on every tab switch */}
          <div key={viewTab} className="stage-enter">

          {/* Tab 1: Problem & Solution */}
          {viewTab === 'solution' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-[#0b101c] border border-red-950/60">
                <span className="font-mono text-[10px] text-red-400 uppercase tracking-widest block mb-1">
                  The Problem Landscape
                </span>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                  {currentFlagship.problem}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0b101c] border border-emerald-950/60">
                <span className="font-mono text-[10px] text-emerald-400 uppercase tracking-widest block mb-1">
                  Engineered Solution
                </span>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                  {currentFlagship.solution}
                </p>
              </div>
            </div>
          )}

          {/* Tab 2: Architecture Tiers */}
          {viewTab === 'architecture' && (
            <div className="space-y-2.5">
              {currentFlagship.architecture.map((tier, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-[#0b101c] border border-neutral-800 flex items-start gap-3">
                  <span className="font-mono text-xs text-violet-400 font-bold px-1.5 py-0.5 rounded bg-violet-950/60 shrink-0">
                    0{idx + 1}
                  </span>
                  <p className="text-xs text-neutral-300 leading-relaxed">{tier}</p>
                </div>
              ))}
            </div>
          )}

          {/* Tab 3: Core Capabilities */}
          {viewTab === 'features' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {currentFlagship.keyFeatures.map((feat, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-[#0b101c] border border-neutral-800 flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                  <span className="text-xs text-neutral-200">{feat}</span>
                </div>
              ))}
            </div>
          )}

          </div>

          {/* Technology Badges */}
          <div className="pt-2">
            <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-wider block mb-2">
              Implemented Tech Stack
            </span>
            <div className="flex flex-wrap gap-2">
              {currentFlagship.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300 font-mono text-xs"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
