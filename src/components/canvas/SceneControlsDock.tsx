import React, { useState, useEffect } from 'react';
import { Sparkles, Eye, EyeOff, RotateCw, Layers, Volume2, VolumeX, Palette, Zap } from 'lucide-react';
import type { SceneConfig } from './HeroCoreScene';
import { soundManager } from '../../utils/audioSynth';

interface SceneControlsDockProps {
  config: SceneConfig;
  onChange: (newConfig: SceneConfig) => void;
}

export const SceneControlsDock: React.FC<SceneControlsDockProps> = ({ config, onChange }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(soundManager.getIsMuted());

  // Auto-collapse on small mobile screens to keep viewport clean
  useEffect(() => {
    if (window.innerWidth < 640) {
      setIsCollapsed(true);
    }
  }, []);

  // Keyboard shortcut 'H' for Zen / Cinema mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === 'h' || e.key === 'H') {
        setIsCollapsed((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handlePaletteChange = (palette: SceneConfig['palette']) => {
    soundManager.playChime(640, 0.08);
    onChange({ ...config, palette });
  };

  const handleExplodeToggle = () => {
    soundManager.playChime(580, 0.08);
    onChange({ ...config, explodedOffset: config.explodedOffset > 0 ? 0 : 0.85 });
  };

  const handleBurstTrigger = () => {
    soundManager.playBurst();
    soundManager.playShockwave();
    onChange({ ...config, burstTrigger: Date.now() });
  };

  const handleAudioToggle = () => {
    const muted = soundManager.toggleMute();
    setIsAudioMuted(muted);
  };

  return (
    <div
      className="fixed bottom-3 inset-x-0 mx-auto z-40 transition-transform duration-300 pointer-events-auto flex flex-col items-center max-w-2xl px-3"
      style={{
        transform: isCollapsed ? 'translateY(calc(100% - 32px))' : 'translateY(0)',
      }}
    >
      {/* Collapse / Expand Tab Button - Clean centered tab */}
      <div className="flex justify-center mb-1">
        <button
          onClick={() => {
            soundManager.playChime(480, 0.06);
            setIsCollapsed((prev) => !prev);
          }}
          className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0b0f17] border border-neutral-700 text-[11px] text-neutral-300 hover:text-white transition-colors shadow-xl cursor-pointer"
          aria-label={isCollapsed ? "Expand 3D Controls Dock" : "Collapse 3D Controls Dock"}
        >
          {isCollapsed ? (
            <>
              <Eye className="w-3.5 h-3.5 text-cyan-400" />
              <span>3D Dock [H]</span>
            </>
          ) : (
            <>
              <EyeOff className="w-3.5 h-3.5 text-neutral-400" />
              <span>Cinema Mode [H]</span>
            </>
          )}
        </button>
      </div>

      {/* Main Control Surface */}
      <div className="w-full bg-[#0b0f17]/95 border border-neutral-800 rounded-2xl p-2.5 sm:p-3 shadow-2xl flex flex-wrap items-center justify-between gap-2 text-xs text-neutral-300">
        {/* Color Palette Switcher */}
        <div className="flex items-center gap-1">
          <Palette className="w-3.5 h-3.5 text-neutral-400 hidden xs:inline" />
          <div className="flex items-center gap-0.5 bg-neutral-900/90 p-0.5 rounded-lg border border-neutral-800">
            <button
              onClick={() => handlePaletteChange('violet')}
              className={`px-2 py-0.5 rounded font-mono text-[10px] sm:text-[11px] transition-colors cursor-pointer ${
                config.palette === 'violet'
                  ? 'bg-violet-600/40 text-violet-200 border border-violet-500/60'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              Violet
            </button>
            <button
              onClick={() => handlePaletteChange('cyan')}
              className={`px-2 py-0.5 rounded font-mono text-[10px] sm:text-[11px] transition-colors cursor-pointer ${
                config.palette === 'cyan'
                  ? 'bg-cyan-500/40 text-cyan-200 border border-cyan-400/60'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              Cyan
            </button>
            <button
              onClick={() => handlePaletteChange('chrome')}
              className={`px-2 py-0.5 rounded font-mono text-[10px] sm:text-[11px] transition-colors cursor-pointer ${
                config.palette === 'chrome'
                  ? 'bg-neutral-200/20 text-neutral-100 border border-neutral-400/50'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              Chrome
            </button>
          </div>
        </div>

        {/* Exploded View Toggle */}
        <button
          onClick={handleExplodeToggle}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border font-mono text-[10px] sm:text-[11px] transition-all cursor-pointer ${
            config.explodedOffset > 0
              ? 'bg-violet-500/20 border-violet-500/60 text-violet-200'
              : 'bg-neutral-900/90 border-neutral-800 text-neutral-300 hover:text-white'
          }`}
          title="Toggle kinetic exploded architecture view"
        >
          <Layers className="w-3.5 h-3.5" />
          <span>{config.explodedOffset > 0 ? 'Exploded' : 'Explode Core'}</span>
        </button>

        {/* Shockwave Burst Button */}
        <button
          onClick={handleBurstTrigger}
          className="flex items-center gap-1 px-2.5 py-1 rounded-lg border border-cyan-500/40 bg-cyan-950/40 text-cyan-300 hover:bg-cyan-900/60 hover:border-cyan-400 font-mono text-[10px] sm:text-[11px] transition-all cursor-pointer shadow-sm active:scale-95"
          title="Trigger kinetic shockwave burst ripple"
          aria-label="Trigger kinetic shockwave burst"
        >
          <Zap className="w-3.5 h-3.5 text-cyan-400" />
          <span>Burst</span>
        </button>

        {/* Rotation Speed Control */}
        <div className="flex items-center gap-1.5">
          <RotateCw className="w-3.5 h-3.5 text-neutral-400" />
          <input
            type="range"
            min="0.2"
            max="2.5"
            step="0.1"
            value={config.rotationSpeed}
            onChange={(e) => onChange({ ...config, rotationSpeed: parseFloat(e.target.value) })}
            className="w-14 sm:w-16 accent-violet-500 cursor-pointer h-1.5 bg-neutral-800 rounded-lg"
            aria-label="Core rotation speed"
          />
        </div>

        {/* Starfield Particles Toggle */}
        <button
          onClick={() => {
            soundManager.playChime(540, 0.06);
            onChange({ ...config, particlesEnabled: !config.particlesEnabled });
          }}
          className={`flex items-center gap-1 px-2 py-1 rounded-lg border font-mono text-[10px] sm:text-[11px] transition-colors cursor-pointer ${
            config.particlesEnabled
              ? 'bg-neutral-900/90 border-neutral-800 text-cyan-300'
              : 'bg-neutral-900/50 border-neutral-800/60 text-neutral-500'
          }`}
          title="Toggle cosmic dust particles"
        >
          <Sparkles className="w-3 h-3" />
          <span>Dust</span>
        </button>

        {/* Audio Ambient Toggle */}
        <button
          onClick={handleAudioToggle}
          className={`flex items-center gap-1 px-2 py-1 rounded-lg border font-mono text-[10px] sm:text-[11px] transition-colors cursor-pointer ${
            !isAudioMuted
              ? 'bg-violet-950/60 border-violet-500/60 text-violet-200'
              : 'bg-neutral-900/90 border-neutral-800 text-neutral-400 hover:text-neutral-200'
          }`}
          aria-label={isAudioMuted ? "Turn on procedural cosmic audio" : "Mute cosmic audio"}
        >
          {isAudioMuted ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3 text-cyan-400" />}
          <span>{isAudioMuted ? 'Mute' : 'Audio'}</span>
        </button>
      </div>
    </div>
  );
};
