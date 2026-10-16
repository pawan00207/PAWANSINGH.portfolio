import React, { useState, useMemo } from 'react';
import { Search, FolderGit2, Github, ExternalLink, ArrowUpRight } from 'lucide-react';
import { PROJECTS_DATA, Project } from '../data/portfolioData';
import { filterProjects, extractAllTechnologies, CategoryFilter } from '../utils/portfolioLogic';
import { soundManager } from '../utils/audioSynth';
import { SectionHeading } from './SectionHeading';
import { useCardTilt } from '../utils/useCardTilt';

interface ProjectExplorerProps {
  onSelectProject: (project: Project) => void;
}

interface ProjectCardItemProps {
  project: Project;
  onSelectProject: (project: Project) => void;
}

const ProjectCardItem: React.FC<ProjectCardItemProps> = ({ project, onSelectProject }) => {
  const cardRef = useCardTilt<HTMLDivElement>({ maxTilt: 5, perspective: 900, scale: 1.015, glare: true });

  return (
    <div
      ref={cardRef}
      data-reveal
      className={`card-lift p-5 rounded-2xl border flex flex-col justify-between group ${
        project.isFlagship
          ? 'bg-gradient-to-b from-[#0e1322] to-[#070b13] border-violet-500/40 hover:border-violet-400/80 hover:shadow-xl hover:shadow-violet-950/30'
          : 'bg-[#080c14] border-neutral-800/90 hover:border-neutral-700 hover:bg-[#0c121e] hover:shadow-xl hover:shadow-black/40'
      }`}
    >
      <div>
        {/* Header: Category & Flagship Badge */}
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <span className="font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-300">
            {project.category}
          </span>
          {project.isFlagship && (
            <span className="font-mono text-[9px] px-2 py-0.5 rounded bg-violet-950/70 border border-violet-800/70 text-violet-300">
              FLAGSHIP
            </span>
          )}
          {project.status === 'Open Source' && (
            <span className="font-mono text-[9px] px-2 py-0.5 rounded bg-blue-950/60 border border-blue-800/60 text-blue-300">
              Open Source
            </span>
          )}
        </div>

        {/* Project Title */}
        <h3 className="font-display font-bold text-base sm:text-lg text-white group-hover:text-cyan-300 transition-colors">
          {project.title}
        </h3>

        {/* Subtitle */}
        <p className="font-mono text-[11px] text-violet-300 mt-0.5 line-clamp-1">
          {project.subtitle}
        </p>

        {/* Summary */}
        <p className="text-xs text-neutral-300 mt-2.5 line-clamp-3 leading-relaxed">
          {project.summary}
        </p>
      </div>

      {/* Bottom Details & Links */}
      <div className="mt-5 pt-4 border-t border-neutral-800/80 space-y-3">
        {/* Tech chips */}
        <div className="flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 3).map((t) => (
            <span
              key={t}
              className="px-2 py-0.5 rounded bg-neutral-900 text-[10px] font-mono text-neutral-400 border border-neutral-800"
            >
              {t}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="px-1.5 py-0.5 rounded bg-neutral-900 text-[10px] font-mono text-neutral-400">
              +{project.technologies.length - 3}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between gap-2 pt-1">
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs font-mono text-neutral-400 hover:text-white transition-colors cursor-pointer"
            aria-label={`View ${project.title} repository on GitHub`}
          >
            <Github className="w-3.5 h-3.5" />
            <span>Repo</span>
          </a>

          {project.demoUrl ? (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs font-mono text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer"
            >
              <ExternalLink className="w-3 h-3" />
              <span>Live Demo</span>
            </a>
          ) : (
            <span className="text-[10px] font-mono text-neutral-400">No Demo Configured</span>
          )}

          <button
            onClick={() => {
              soundManager.playChime(580, 0.06);
              onSelectProject(project);
            }}
            aria-label={`View specifications and architecture for ${project.title}`}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-xs text-neutral-200 hover:text-white transition-colors cursor-pointer"
          >
            <span>Details</span>
            <ArrowUpRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};

export const ProjectExplorer: React.FC<ProjectExplorerProps> = ({ onSelectProject }) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTech, setSelectedTech] = useState('');

  const categories: CategoryFilter[] = [
    'All',
    'AI/ML',
    'Healthcare',
    'Safety & Emergency',
    'Web Applications',
    'Developer Tools',
    'Hackathons',
  ];

  const allTechnologies = useMemo(() => extractAllTechnologies(PROJECTS_DATA), []);

  const filteredProjects = useMemo(() => {
    return filterProjects(PROJECTS_DATA, selectedCategory, searchQuery, selectedTech);
  }, [selectedCategory, searchQuery, selectedTech]);

  const handleCategoryChange = (cat: CategoryFilter) => {
    soundManager.playChime(550, 0.05);
    setSelectedCategory(cat);
  };

  const handleTechClick = (tech: string) => {
    soundManager.playChime(500, 0.05);
    setSelectedTech(selectedTech === tech ? '' : tech);
  };

  const handleClearFilters = () => {
    soundManager.playChime(450, 0.05);
    setSelectedCategory('All');
    setSearchQuery('');
    setSelectedTech('');
  };

  return (
    <section id="projects" className="py-28 px-4 sm:px-6 max-w-6xl mx-auto relative z-10">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
        <SectionHeading
          index="04"
          label="Complete Engineering Archive"
          icon={FolderGit2}
          accent="violet"
          title={`Repository Directory (${PROJECTS_DATA.length})`}
        />

        {/* Live Counter Badge */}
        <div className="font-mono text-xs text-neutral-400 flex items-center gap-2">
          <span>Showing:</span>
          <span className="font-bold text-cyan-300 px-2 py-0.5 rounded bg-cyan-950/40 border border-cyan-800/40">
            {filteredProjects.length} of {PROJECTS_DATA.length} Projects
          </span>
        </div>
      </div>

      {/* Search and Category Control Bar */}
      <div className="space-y-4 mb-8">
        {/* Search Input Box */}
        <div className="relative">
          <Search className="w-4 h-4 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search all 18 repositories by name, keywords, problem domain, or stack (e.g. React, Vision, Triage, Leaflet)..."
            className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#090d16] border border-neutral-800 focus:border-violet-500 text-sm text-neutral-100 placeholder:text-neutral-500 outline-none transition-colors"
            aria-label="Search repositories"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-mono text-neutral-400 hover:text-white"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-wider mr-1 hidden sm:inline">
            Domain:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-violet-600/40 text-violet-200 border border-violet-500/60 font-medium'
                  : 'bg-neutral-900/80 border border-neutral-800 text-neutral-400 hover:text-neutral-200 hover:border-neutral-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Technology Tag Chips */}
        <div className="flex items-center gap-1.5 flex-wrap pt-1 text-xs">
          <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-wider mr-1">
            Stack Filter:
          </span>
          {allTechnologies.slice(0, 12).map((tech) => {
            const isSelected = selectedTech === tech;
            return (
              <button
                key={tech}
                onClick={() => handleTechClick(tech)}
                className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-cyan-500/30 text-cyan-200 border border-cyan-400/60 font-semibold'
                    : 'bg-neutral-900/60 border border-neutral-800/80 text-neutral-400 hover:text-neutral-200'
                }`}
              >
                {tech}
              </button>
            );
          })}
          {(selectedTech || selectedCategory !== 'All' || searchQuery) && (
            <button
              onClick={handleClearFilters}
              className="text-[11px] font-mono text-violet-400 hover:underline ml-2 cursor-pointer"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-[#080c14] border border-neutral-800 space-y-3">
          <p className="font-display text-neutral-300 text-lg">No matching projects found</p>
          <p className="text-xs text-neutral-500 max-w-sm mx-auto">
            Try adjusting your search terms or clearing the selected technology filter.
          </p>
          <button
            onClick={handleClearFilters}
            className="px-4 py-2 rounded-xl bg-neutral-900 border border-neutral-700 text-xs text-white cursor-pointer hover:bg-neutral-800"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProjects.map((project) => (
            <ProjectCardItem
              key={project.id}
              project={project}
              onSelectProject={onSelectProject}
            />
          ))}
        </div>
      )}
    </section>
  );
};
