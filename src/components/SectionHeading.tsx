import React, { useEffect, useRef } from 'react';
import type { LucideIcon } from 'lucide-react';

type Accent = 'violet' | 'cyan' | 'emerald';

const accentText: Record<Accent, string> = {
  violet: 'text-violet-300',
  cyan: 'text-cyan-300',
  emerald: 'text-emerald-300',
};

interface SectionHeadingProps {
  index: string;
  label: string;
  title: React.ReactNode;
  description?: string;
  icon: LucideIcon;
  accent?: Accent;
  className?: string;
}

/**
 * Unified editorial section header: tracked eyebrow label, fluid display
 * title, optional lede, and an animated violet→cyan signature hairline.
 */
export const SectionHeading: React.FC<SectionHeadingProps> = ({
  index,
  label,
  title,
  description,
  icon: Icon,
  accent = 'cyan',
  className = '',
}) => {
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const line = lineRef.current;
    if (!line) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            line.style.transform = 'scaleX(1)';
            observer.disconnect();
          }
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(line);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={className}>
      <div className={`inline-flex items-center gap-2 eyebrow mb-3 ${accentText[accent]}`}>
        <Icon className="w-3.5 h-3.5" aria-hidden="true" />
        <span>
          {index} / {label}
        </span>
      </div>
      <h2 className="font-display font-bold display-section text-white">{title}</h2>
      {description && (
        <p
          data-reveal
          className="text-neutral-400 text-sm sm:text-base mt-3.5 max-w-2xl leading-relaxed"
        >
          {description}
        </p>
      )}
      <div
        ref={lineRef}
        className="hairline w-24 mt-4 origin-left transition-transform duration-1000 ease-out"
        style={{ transform: 'scaleX(0)' }}
        aria-hidden="true"
      />
    </div>
  );
};
