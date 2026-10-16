import React from 'react';
import { Trophy, Award, Calendar, CheckCircle2 } from 'lucide-react';
import { PROFILE_DATA } from '../data/portfolioData';
import { SectionHeading } from './SectionHeading';

export const AchievementsSection: React.FC = () => {
  return (
    <section id="achievements" className="py-28 px-4 sm:px-6 max-w-6xl mx-auto relative z-10">
      {/* Section Header */}
      <SectionHeading
        index="05"
        label="Achievements & Milestones"
        icon={Trophy}
        accent="emerald"
        title="Verified Accomplishments & Hackathons"
        description="Honest record of academic excellence, reported hackathon placements, and technical team builds."
        className="mb-14"
      />

      {/* Timeline Grid */}
      <div className="space-y-6">
        {PROFILE_DATA.achievements.map((item, index) => {
          const isVerified = item.status === 'Verified Academic';
          const isReported = item.status === 'Reported Achievement';

          return (
            <div
              key={item.id}
              data-reveal
              className={`card-lift p-6 rounded-2xl border ${
                isVerified
                  ? 'bg-gradient-to-r from-[#0b1322] to-[#080d16] border-emerald-500/40 shadow-lg shadow-emerald-950/20 hover:border-emerald-400/60'
                  : 'bg-[#080c14] border-neutral-800/90 hover:border-neutral-700'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-2.5">
                  <div
                    className={`p-2 rounded-xl ${
                      isVerified
                        ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/30'
                        : isReported
                        ? 'bg-violet-600/20 text-violet-300 border border-violet-500/30'
                        : 'bg-cyan-600/20 text-cyan-300 border border-cyan-500/30'
                    }`}
                  >
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg text-white">
                      {item.title}
                    </h3>
                    <span className="font-mono text-xs text-neutral-400 block">
                      {item.eventOrCategory}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full border ${
                      isVerified
                        ? 'bg-emerald-950/60 border-emerald-800/60 text-emerald-300'
                        : isReported
                        ? 'bg-violet-950/60 border-violet-800/60 text-violet-300'
                        : 'bg-cyan-950/60 border-cyan-800/60 text-cyan-300'
                    }`}
                  >
                    {item.status}
                  </span>

                  <span className="font-mono text-xs text-neutral-400 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{item.date}</span>
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mt-2 pl-0 sm:pl-11">
                {item.description}
              </p>

              <div className="mt-4 pt-3 border-t border-neutral-800/80 pl-0 sm:pl-11 flex items-center justify-between">
                <span className="font-mono text-xs font-semibold text-cyan-300">
                  Recognition: {item.award}
                </span>

                {isReported && (
                  <span className="text-[10px] font-mono text-neutral-400">
                    Subject to certificate verification
                  </span>
                )}
                {isVerified && (
                  <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Official University Record</span>
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
