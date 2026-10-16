import React, { useState } from 'react';
import { Mail, Copy, Check, Github, Linkedin, ArrowUp, Send, Code, Sparkles, FileText, ExternalLink } from 'lucide-react';
import { PROFILE_DATA } from '../data/portfolioData';
import { soundManager } from '../utils/audioSynth';
import { isValidEmail } from '../utils/portfolioLogic';
import { useMagnetic } from '../utils/useMagnetic';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [showRecruiterModal, setShowRecruiterModal] = useState(false);
  const [recruiterName, setRecruiterName] = useState('');
  const [recruiterCompany, setRecruiterCompany] = useState('');
  const [recruiterRole, setRecruiterRole] = useState('Software Engineering Intern / SDE');
  const [recruiterMessage, setRecruiterMessage] = useState('');

  // Magnetic wrappers for the two primary portal CTAs
  const copyEmailMagneticRef = useMagnetic<HTMLDivElement>();
  const recruiterNoteMagneticRef = useMagnetic<HTMLDivElement>();

  const email = PROFILE_DATA.contact.email;

  const handleCopyEmail = async () => {
    if (!email || !isValidEmail(email)) return;
    soundManager.playChime(660, 0.1);
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(email);
      } else {
        throw new Error('Clipboard API not available');
      }
    } catch {
      // Safe fallback for iframe and headless browser environments
      try {
        const textArea = document.createElement('textarea');
        textArea.value = email;
        textArea.style.position = 'fixed';
        textArea.style.left = '-9999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      } catch {
        // Silent fallback
      }
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  const handleScrollToTop = () => {
    soundManager.playChime(500, 0.08);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSendRecruiterNote = (e: React.FormEvent) => {
    e.preventDefault();
    soundManager.playChime(600, 0.1);
    const subject = encodeURIComponent(`Opportunity with ${recruiterCompany || 'Our Team'}: ${recruiterRole}`);
    const body = encodeURIComponent(
      `Hi Pawan,\n\nI came across your 3D engineering portfolio and would like to discuss an opportunity.\n\nFrom: ${recruiterName || 'A Recruiter'}\nCompany: ${recruiterCompany || 'Not specified'}\nRole: ${recruiterRole}\n\nNote:\n${recruiterMessage || 'Looking forward to connecting with you!'}\n\nBest regards,\n${recruiterName || 'Recruiter'}`
    );
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    setShowRecruiterModal(false);
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 max-w-5xl mx-auto relative z-10">
      {/* Luminous Portal Convergence Card */}
      <div
        data-reveal
        className="relative rounded-3xl bg-gradient-to-b from-[#0e1424] via-[#090d16] to-[#04060b] border border-violet-500/30 p-8 sm:p-12 text-center overflow-hidden shadow-2xl"
      >
        {/* Glow Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-40 bg-gradient-to-b from-violet-600/20 to-transparent blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-72 h-32 bg-cyan-500/10 blur-2xl pointer-events-none" />

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-950/60 border border-violet-800/60 text-xs font-mono text-violet-300 mb-6 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>07 / Luminous Portal Convergence</span>
        </div>

        {/* Title */}
        <h2 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight mb-4">
          Initiate Connection
        </h2>

        {/* Subtitle */}
        <p className="text-neutral-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed mb-8">
          Available for software engineering internships, technical collaborations, and innovative AI/web systems development.
        </p>

        {/* Primary Contact Actions */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 mb-10">
          {/* Copy Email Button */}
          <div ref={copyEmailMagneticRef} className="inline-flex">
            <button
              onClick={handleCopyEmail}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-medium text-xs sm:text-sm tracking-wider uppercase transition-all shadow-lg shadow-violet-950/60 hover:-translate-y-0.5 cursor-pointer border border-violet-400/40"
              aria-label="Copy Pawan Singh's email address"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Email Copied!' : 'Copy Email Address'}</span>
            </button>
          </div>

          {/* Quick Recruiter Note CTA */}
          <div ref={recruiterNoteMagneticRef} className="inline-flex">
            <button
              onClick={() => {
                soundManager.playChime(520, 0.08);
                setShowRecruiterModal(true);
              }}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#0c121e] hover:bg-[#121a2c] text-cyan-300 hover:text-white font-medium text-xs sm:text-sm tracking-wider uppercase transition-all border border-cyan-500/40 hover:border-cyan-400 cursor-pointer shadow-md"
            >
              <Send className="w-4 h-4" />
              <span>Send Recruiter Note</span>
            </button>
          </div>

          {/* Direct Resume Download */}
          <a
            href={PROFILE_DATA.contact.resumeUrl}
            download="Pawan_Singh_Resume.pdf"
            className="flex items-center gap-2 px-4 py-3 rounded-xl bg-neutral-900/80 hover:bg-neutral-800 text-neutral-300 hover:text-white font-medium text-xs sm:text-sm tracking-wider uppercase transition-all border border-neutral-700/80 cursor-pointer"
          >
            <FileText className="w-4 h-4 text-violet-400" />
            <span>Download Resume</span>
          </a>
        </div>

        {/* Displayed Email Tag */}
        <div className="inline-block px-4 py-2 rounded-xl bg-neutral-900/80 border border-neutral-800 font-mono text-xs text-neutral-300 mb-8">
          Direct Inbox:{' '}
          <a
            href={`mailto:${email}`}
            className="text-violet-300 hover:text-cyan-300 underline underline-offset-4 transition-colors"
          >
            {email}
          </a>
        </div>

        {/* Verified Social Channels */}
        <div className="pt-6 border-t border-neutral-800/80 flex flex-wrap items-center justify-center gap-4">
          <a
            href={PROFILE_DATA.contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-900/60 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 hover:text-white text-xs font-mono transition-colors"
          >
            <Github className="w-4 h-4 text-violet-400" />
            <span>GitHub Profile</span>
            <ExternalLink className="w-3 h-3 text-neutral-500" />
          </a>

          <a
            href={PROFILE_DATA.contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-900/60 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 hover:text-white text-xs font-mono transition-colors"
          >
            <Linkedin className="w-4 h-4 text-blue-400" />
            <span>LinkedIn Profile</span>
            <ExternalLink className="w-3 h-3 text-neutral-500" />
          </a>

          <a
            href={PROFILE_DATA.contact.leetcode}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-900/60 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 hover:text-white text-xs font-mono transition-colors"
          >
            <Code className="w-4 h-4 text-amber-400" />
            <span>LeetCode Profile</span>
            <ExternalLink className="w-3 h-3 text-neutral-500" />
          </a>
        </div>

        {/* Back to Top Floating Button */}
        <div className="mt-10 flex justify-center">
          <button
            onClick={handleScrollToTop}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-xs text-neutral-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Return to top of portfolio"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            <span>Back to Top</span>
          </button>
        </div>
      </div>

      {/* Recruiter Quick Compose Modal */}
      {showRecruiterModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm pointer-events-auto"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-lg bg-[#0a0f19] border border-neutral-800 rounded-2xl p-6 sm:p-8 shadow-2xl relative text-neutral-200">
            <h3 className="font-display font-bold text-xl text-white mb-2">
              Recruiter Quick Message
            </h3>
            <p className="text-xs text-neutral-400 mb-5 leading-relaxed">
              Compose a message that opens directly in your mail client addressed to{' '}
              <span className="text-white font-mono">{email}</span>.
            </p>

            <form onSubmit={handleSendRecruiterNote} className="space-y-4">
              <div>
                <label className="block font-mono text-[11px] text-neutral-300 uppercase mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  value={recruiterName}
                  onChange={(e) => setRecruiterName(e.target.value)}
                  placeholder="e.g. Sarah Jenkins"
                  className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 focus:border-violet-500 text-xs text-white outline-none"
                />
              </div>

              <div>
                <label className="block font-mono text-[11px] text-neutral-300 uppercase mb-1">
                  Company / Organization
                </label>
                <input
                  type="text"
                  required
                  value={recruiterCompany}
                  onChange={(e) => setRecruiterCompany(e.target.value)}
                  placeholder="e.g. Google / Microsoft / Startup"
                  className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 focus:border-violet-500 text-xs text-white outline-none"
                />
              </div>

              <div>
                <label className="block font-mono text-[11px] text-neutral-300 uppercase mb-1">
                  Target Role
                </label>
                <input
                  type="text"
                  value={recruiterRole}
                  onChange={(e) => setRecruiterRole(e.target.value)}
                  placeholder="e.g. Full Stack Developer Intern / AI Engineer"
                  className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 focus:border-violet-500 text-xs text-white outline-none"
                />
              </div>

              <div>
                <label className="block font-mono text-[11px] text-neutral-300 uppercase mb-1">
                  Message / Invitation Note
                </label>
                <textarea
                  rows={3}
                  value={recruiterMessage}
                  onChange={(e) => setRecruiterMessage(e.target.value)}
                  placeholder="We'd love to chat about your projects and upcoming internship opportunities..."
                  className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 focus:border-violet-500 text-xs text-white outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowRecruiterModal(false)}
                  className="px-4 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-neutral-400 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-medium text-xs cursor-pointer shadow-md"
                >
                  Launch Email Client
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
