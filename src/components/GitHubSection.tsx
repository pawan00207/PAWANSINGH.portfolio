import React, { useState, useEffect } from 'react';
import { Github, ExternalLink, GitBranch, GitFork, Star, Terminal, CheckCircle } from 'lucide-react';
import { PROFILE_DATA, PROJECTS_DATA } from '../data/portfolioData';
import { SectionHeading } from './SectionHeading';

interface GitHubRepoResponse {
  name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
}

export const GitHubSection: React.FC = () => {
  const [liveRepos, setLiveRepos] = useState<GitHubRepoResponse[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [apiFailed, setApiFailed] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function fetchGitHubData() {
      setLoading(true);
      try {
        const res = await fetch('https://api.github.com/users/pawan00207/repos?sort=updated&per_page=6');
        if (!res.ok) {
          throw new Error(`GitHub API response code: ${res.status}`);
        }
        const data = await res.json();
        if (isMounted && Array.isArray(data)) {
          setLiveRepos(data);
          setApiFailed(false);
        }
      } catch {
        if (isMounted) {
          setApiFailed(true);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchGitHubData();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section id="github" className="py-28 px-4 sm:px-6 max-w-6xl mx-auto relative z-10">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
        <SectionHeading
          index="06"
          label="Version Control & Open Source"
          icon={Terminal}
          accent="cyan"
          title="Engineering & GitHub Hub"
        />

        <a
          href={PROFILE_DATA.contact.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-violet-600/30 hover:bg-violet-600/50 border border-violet-500/50 text-white font-medium text-xs transition-colors self-start sm:self-auto cursor-pointer"
        >
          <Github className="w-4 h-4" />
          <span>github.com/pawan00207</span>
          <ExternalLink className="w-3 h-3 text-violet-300" />
        </a>
      </div>

      {/* GitHub Overview Card */}
      <div data-reveal className="p-6 sm:p-8 rounded-2xl bg-[#080d16] border border-white/[0.06] mb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-wider block">
            Profile Status
          </span>
          <h3 className="font-display font-bold text-xl text-white flex items-center gap-2">
            <span>Pawan Singh</span>
            <CheckCircle className="w-4 h-4 text-emerald-400" />
          </h3>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Full Stack Developer & AI Builder. Building verified repositories, hackathon systems, and web applications.
          </p>
        </div>

        <div className="space-y-2">
          <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-wider block">
            Audited Repository Portfolio
          </span>
          <div className="font-mono text-2xl font-bold text-cyan-300">
            {PROJECTS_DATA.length} Curated Repos
          </div>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Spanning AI/ML, Healthcare Systems, Disaster Response, and Developer Utilities.
          </p>
        </div>

        <div className="space-y-2">
          <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-wider block">
            Live GitHub API Status
          </span>
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${apiFailed ? 'bg-amber-400' : 'bg-emerald-400'}`} />
            <span className="font-mono text-xs text-neutral-200">
              {loading ? 'Querying API...' : apiFailed ? 'Fallback Active (Rate Limited)' : 'Live API Connected'}
            </span>
          </div>
          <p className="text-xs text-neutral-400 leading-relaxed">
            {apiFailed
              ? 'Serving verified static repository data from project configuration.'
              : 'Directly synchronized with GitHub public profile endpoint.'}
          </p>
        </div>
      </div>

      {/* Repositories Grid */}
      <div className="space-y-3">
        <span className="font-mono text-xs text-neutral-400 uppercase tracking-wider block">
          Featured Repositories
        </span>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {liveRepos && liveRepos.length > 0 && !apiFailed
            ? liveRepos.map((repo) => (
                <a
                  key={repo.name}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-lift p-5 rounded-xl bg-[#090e18] border border-neutral-800 hover:border-neutral-700 hover:bg-[#0d1424] group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-neutral-400 mb-2">
                      <GitBranch className="w-4 h-4 text-violet-400" />
                      <ExternalLink className="w-3.5 h-3.5 group-hover:text-cyan-300 transition-colors" />
                    </div>
                    <h4 className="font-mono font-bold text-sm text-white group-hover:text-violet-300 transition-colors">
                      {repo.name}
                    </h4>
                    <p className="text-xs text-neutral-400 mt-2 line-clamp-2 leading-relaxed">
                      {repo.description || 'Public repository by Pawan Singh'}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-neutral-800/80 flex items-center justify-between font-mono text-xs text-neutral-400">
                    <span>{repo.language || 'Code'}</span>
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        <span>{repo.stargazers_count}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <GitFork className="w-3 h-3" />
                        <span>{repo.forks_count}</span>
                      </span>
                    </div>
                  </div>
                </a>
              ))
            : PROJECTS_DATA.slice(0, 6).map((project) => (
                <a
                  key={project.id}
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-lift p-5 rounded-xl bg-[#090e18] border border-neutral-800 hover:border-neutral-700 hover:bg-[#0d1424] group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-neutral-400 mb-2">
                      <GitBranch className="w-4 h-4 text-violet-400" />
                      <ExternalLink className="w-3.5 h-3.5 group-hover:text-cyan-300 transition-colors" />
                    </div>
                    <h4 className="font-mono font-bold text-sm text-white group-hover:text-violet-300 transition-colors">
                      {project.title}
                    </h4>
                    <p className="text-xs text-neutral-400 mt-2 line-clamp-2 leading-relaxed">
                      {project.summary}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-neutral-800/80 flex items-center justify-between font-mono text-xs text-neutral-400">
                    <span className="text-cyan-400">{project.technologies[0]}</span>
                    <span className="text-neutral-500">{project.category}</span>
                  </div>
                </a>
              ))}
        </div>
      </div>
    </section>
  );
};
