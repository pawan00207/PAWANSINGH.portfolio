import test from 'node:test';
import assert from 'node:assert/strict';
import {
  filterProjects,
  extractAllTechnologies,
  computePortfolioStats,
  isValidEmail,
  formatAcademicSummary,
  calculateScrollProgress
} from './portfolioLogic.ts';
import { PROJECTS_DATA } from '../data/portfolioData.ts';

test('filterProjects returns all projects when category is All and query is empty', () => {
  const result = filterProjects(PROJECTS_DATA, 'All', '');
  assert.equal(result.length, PROJECTS_DATA.length);
});

test('filterProjects correctly filters by Healthcare category', () => {
  const result = filterProjects(PROJECTS_DATA, 'Healthcare');
  assert.ok(result.length > 0);
  assert.ok(result.every((p) => p.category === 'Healthcare'));
});

test('filterProjects finds projects by search query in title or tech', () => {
  const result = filterProjects(PROJECTS_DATA, 'All', 'MediVerse');
  assert.ok(result.length >= 1);
  assert.equal(result[0].title, 'MediVerse.AI');

  const reactProjects = filterProjects(PROJECTS_DATA, 'All', '', 'React');
  assert.ok(reactProjects.length > 0);
  assert.ok(reactProjects.every((p) => p.technologies.includes('React')));
});

test('extractAllTechnologies aggregates unique sorted tech names', () => {
  const tech = extractAllTechnologies(PROJECTS_DATA);
  assert.ok(tech.includes('React'));
  assert.ok(tech.includes('JavaScript'));
  // Verify array is sorted
  const sortedCopy = [...tech].sort();
  assert.deepEqual(tech, sortedCopy);
});

test('computePortfolioStats computes correct summary numbers', () => {
  const stats = computePortfolioStats(PROJECTS_DATA);
  assert.equal(stats.totalProjects, PROJECTS_DATA.length);
  assert.equal(stats.flagshipCount, 4);
  assert.ok(stats.categoryCount >= 5);
  assert.ok(stats.techStackCount >= 10);
});

test('isValidEmail validates emails correctly', () => {
  assert.equal(isValidEmail('pawan9140582015@gmail.com'), true);
  assert.equal(isValidEmail('invalid-email'), false);
  assert.equal(isValidEmail(''), false);
});

test('formatAcademicSummary formats CGPA and year cleanly', () => {
  assert.equal(formatAcademicSummary('9.16', 2028), 'CGPA 9.16 · Expected Class of 2028');
});

test('calculateScrollProgress calculates 0% at top and 100% at bottom', () => {
  // top of page
  assert.equal(calculateScrollProgress(0, 5000, 1000), 0);
  // halfway
  assert.equal(calculateScrollProgress(2000, 5000, 1000), 50);
  // bottom
  assert.equal(calculateScrollProgress(4000, 5000, 1000), 100);
  // clamp bounds
  assert.equal(calculateScrollProgress(5000, 5000, 1000), 100);
  assert.equal(calculateScrollProgress(-50, 5000, 1000), 0);
  // no scrollable height
  assert.equal(calculateScrollProgress(0, 1000, 1000), 0);
});

