# PAWAN SINGH — Cinematic 3D Developer Portfolio

## ✨ Experience

- **Cinematic hero** — word-staggered title reveal, skippable intro sequence, magnetic CTAs,
  editorial asymmetric composition with the 3D core staged beside the headline (never through it).
- **Section-driven 3D storytelling** — the WebGL core re-frames itself for every chapter
  (hero, about, skills, flagships, archive, achievements, GitHub, contact) with damped camera
  choreography, counter-rotating gimbal rings, breathing emissive core, orbiting sensors & shards,
  multi-depth starfields, shooting light streaks and pointer-reactive lighting.
- **Live 3D controls dock** — Violet / Cyan / Chrome palettes, Explode Core, spin-speed slider,
  cosmic dust toggle, procedural audio, Cinema Mode (`H` shortcut).
- **Four flagship showcases** — MediVerse.AI, Swasth-Saathi, TrafficGuard Pro and ResQMap, each with a
  bespoke procedural Three.js simulation, problem/solution/architecture tabs and verified links.
- **Complete repository archive** — all 18 projects with live search, category filters and stack filters.
- **Verified achievements, live GitHub API hub, recruiter contact portal** with mailto composer.

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| UI | React 19, TypeScript, Tailwind CSS 4 |
| 3D | Three.js (procedural PBR, PMREM studio lighting, InstancedMesh) |
| Motion | GSAP + ScrollTrigger choreography |
| Audio | Procedural Web Audio API synthesizer (never autoplays) |
| Build | Vite 8 |

## 🚀 Run Locally

**Prerequisites:** Node.js 20+

```bash
npm install
npm run dev        # development server on http://localhost:3000
```

Other scripts:

```bash
npm run lint       # TypeScript check (tsc --noEmit)
npm run build      # production build to dist/
npm run preview    # serve the production build
npm test           # node --test src/utils/portfolioLogic.test.ts
```

> URL params: `?autostart=1` skips the cinematic intro. `prefers-reduced-motion` is fully respected.

## 📁 Structure

```
src/
├── App.tsx                      # scroll orchestration, reveals, scene config
├── components/
│   ├── Hero.tsx                 # cinematic hero stage
│   ├── AboutSection.tsx         # editorial two-column identity
│   ├── SkillsSection.tsx        # constellation / grid capability matrix
│   ├── FlagshipSection.tsx      # flagship showcase stage
│   ├── ProjectExplorer.tsx      # 18-repo searchable archive
│   ├── AchievementsSection.tsx  # verified timeline
│   ├── GitHubSection.tsx        # live GitHub API hub
│   ├── ContactSection.tsx       # recruiter portal
│   ├── ProjectDetailModal.tsx   # system blueprint modal
│   ├── Navbar.tsx / Footer.tsx / ScrollProgressBar.tsx / SectionHeading.tsx
│   └── canvas/
│       ├── HeroCoreScene.tsx    # full-bleed procedural reactor core
│       ├── Flagship3DCanvas.tsx # per-flagship simulations
│       └── SceneControlsDock.tsx# 3D control dock
├── data/portfolioData.ts        # all content (18 projects, profile, achievements)
└── utils/                       # audio synth, filters + tests, motion helpers
```

## 📄 License

Personal portfolio content © Pawan Singh. All project data, descriptions and links belong to their
respective repositories.
