import React, { useEffect } from 'react';
import { X, Github, ExternalLink, Check, Layers, AlertCircle, Sparkles } from 'lucide-react';
import { Project } from '../data/portfolioData';
import { soundManager } from '../utils/audioSynth';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (project) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-sm pointer-events-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
    >
      <div
        className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#0a0e17] border border-neutral-800 rounded-2xl p-6 sm:p-8 shadow-2xl relative text-neutral-200 stage-enter"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => {
            soundManager.playChime(420, 0.05);
            onClose();
          }}
          className="absolute top-5 right-5 p-2 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="mb-6 pr-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-violet-950/60 border border-violet-800/60 text-violet-300">
              {project.category}
            </span>
            <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-400">
              {project.status}
            </span>
            {project.highlightMetric && (
              <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-800/60 text-cyan-300">
                {project.highlightMetric}
              </span>
            )}
          </div>
          <h2 id="modal-project-title" className="font-display font-bold text-2xl sm:text-3xl text-white">
            {project.title}
          </h2>
          <p className="font-mono text-xs sm:text-sm text-cyan-300 mt-1">
            {project.subtitle}
          </p>
        </div>

        {/* Overview */}
        <div className="p-4 rounded-xl bg-[#0e1320] border border-neutral-800/80 mb-6">
          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
            {project.summary}
          </p>
        </div>

        {/* Problem and Solution */}
        <div className="space-y-4 mb-6">
          <div className="p-4 rounded-xl bg-[#080c14] border border-neutral-800">
            <span className="font-mono text-[10px] text-amber-400 uppercase tracking-widest block mb-1">
              Problem Context
            </span>
            <p className="text-xs text-neutral-300 leading-relaxed">
              {project.problem}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#080c14] border border-neutral-800">
            <span className="font-mono text-[10px] text-emerald-400 uppercase tracking-widest block mb-1">
              Engineering Solution
            </span>
            <p className="text-xs text-neutral-300 leading-relaxed">
              {project.solution}
            </p>
          </div>
        </div>

        {/* Architecture Tiers */}
        {project.architecture && project.architecture.length > 0 && (
          <div className="mb-6">
            <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-wider block mb-2">
              System Architecture & Implementation
            </span>
            <div className="space-y-2">
              {project.architecture.map((arch, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-neutral-900/60 border border-neutral-800/80 flex items-start gap-2.5 text-xs text-neutral-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-400 mt-1.5 shrink-0" />
                  <span>{arch}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Technologies */}
        <div className="mb-8">
          <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-wider block mb-2">
            Technologies & Tools
          </span>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((t) => (
              <span
                key={t}
                className="px-2.5 py-1 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300 font-mono text-xs"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-neutral-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2.5">
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-medium text-xs transition-colors cursor-pointer"
            >
              <Github className="w-3.5 h-3.5" />
              <span>Open GitHub Repository</span>
            </a>

            {project.altRepoUrl && (
              <a
                href={project.altRepoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-neutral-300 text-xs transition-colors cursor-pointer"
              >
                <span>Alternative Repo</span>
                <ExternalLink className="w-3 h-3 text-neutral-400" />
              </a>
            )}

            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600/30 border border-emerald-500/50 hover:bg-emerald-600/50 text-emerald-200 text-xs font-medium transition-colors cursor-pointer"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Live Demo</span>
              </a>
            )}
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white text-xs cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
