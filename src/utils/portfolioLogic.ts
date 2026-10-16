import type { Project } from '../data/portfolioData.ts';

export type CategoryFilter = 'All' | Project['category'];

export function filterProjects(
  projects: Project[],
  category: CategoryFilter,
  searchQuery: string = '',
  selectedTech: string = ''
): Project[] {
  const query = searchQuery.trim().toLowerCase();
  const tech = selectedTech.trim().toLowerCase();

  return projects.filter((project) => {
    // Category match
    if (category !== 'All' && project.category !== category) {
      return false;
    }

    // Technology match
    if (tech && !project.technologies.some((t) => t.toLowerCase() === tech)) {
      return false;
    }

    // Search query match (in title, subtitle, summary, or tech list)
    if (query) {
      const matchTitle = project.title.toLowerCase().includes(query);
      const matchSubtitle = project.subtitle.toLowerCase().includes(query);
      const matchSummary = project.summary.toLowerCase().includes(query);
      const matchTech = project.technologies.some((t) => t.toLowerCase().includes(query));
      const matchCategory = project.category.toLowerCase().includes(query);

      if (!matchTitle && !matchSubtitle && !matchSummary && !matchTech && !matchCategory) {
        return false;
      }
    }

    return true;
  });
}

export function extractAllTechnologies(projects: Project[]): string[] {
  const techSet = new Set<string>();
  for (const p of projects) {
    for (const t of p.technologies) {
      techSet.add(t);
    }
  }
  return Array.from(techSet).sort();
}

export function computePortfolioStats(projects: Project[]) {
  const total = projects.length;
  const flagships = projects.filter((p) => p.isFlagship).length;
  const categories = Array.from(new Set(projects.map((p) => p.category)));
  const technologies = extractAllTechnologies(projects);

  return {
    totalProjects: total,
    flagshipCount: flagships,
    categoryCount: categories.length,
    techStackCount: technologies.length,
  };
}

export function isValidEmail(email: string): boolean {
  if (!email || typeof email !== 'string') return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function formatAcademicSummary(cgpa: string, graduationYear: number): string {
  return `CGPA ${cgpa} · Expected Class of ${graduationYear}`;
}

export function calculateScrollProgress(scrollY: number, scrollHeight: number, innerHeight: number): number {
  const maxScroll = scrollHeight - innerHeight;
  if (maxScroll <= 0) return 0;
  const progress = (scrollY / maxScroll) * 100;
  return Math.min(100, Math.max(0, progress));
}

