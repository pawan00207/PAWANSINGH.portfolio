import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { prefersReducedMotion } from '../../utils/motionPrefs';

export interface SceneConfig {
  palette: 'violet' | 'cyan' | 'chrome';
  rotationSpeed: number;
  particlesEnabled: boolean;
  explodedOffset: number; // 0 to 1
  isZenMode: boolean;
}

interface HeroCoreSceneProps {
  config: SceneConfig;
  scrollProgress?: number; // 0 to 1
  activeSection?: string;
  onSceneReady?: () => void;
}

// Reusable scratch objects to eliminate GC in animation loop
const _mouse = new THREE.Vector2(0, 0);
const _targetCameraPos = new THREE.Vector3(0, 0, 7.5);
const _currentCameraPos = new THREE.Vector3(0, 0, 10.5); // Starts slightly back for opening glide
const _targetLookAt = new THREE.Vector3(0, 0, 0);
const _currentLookAt = new THREE.Vector3(0, 0, 0);
const _targetObjectPos = new THREE.Vector3(0, 0, 0);
const _currentObjectPos = new THREE.Vector3(0, 0, 0);
const _tempMatrix = new THREE.Matrix4();
const _tempPos = new THREE.Vector3();
const _tempQuat = new THREE.Quaternion();
const _tempEuler = new THREE.Euler();
const _tempScale = new THREE.Vector3();
const _pointerLightPos = new THREE.Vector3(0, 0, 3.2);

/**
 * Cinematic pose table — one composition per storytelling chapter, with
 * separate desktop / mobile art direction. Object positions keep the core
 * framing the copy instead of crossing through it.
 */
interface ChapterPose {
  objectPos: [number, number, number];
  objectRot: [number, number, number];
  scale: number;
  lookAt: [number, number, number];
  camZ: number;
  exposure: number;
  parallax: number; // pointer parallax amplitude multiplier
}

const CHAPTER_POSES: Record<string, { desktop: ChapterPose; mobile: ChapterPose }> = {
  // CHAPTER 0: HERO — core rests beside the headline (desktop) / deep backdrop (mobile)
  hero: {
    desktop: {
      objectPos: [2.72, -0.08, -1.25],
      objectRot: [0.08, 0.2, 0.02],
      scale: 0.96,
      lookAt: [-0.62, -0.02, 0],
      camZ: 7.35,
      exposure: 1.08,
      parallax: 1,
    },
    mobile: {
      objectPos: [0, 0.62, -3.9],
      objectRot: [0.06, 0.1, 0],
      scale: 0.62,
      lookAt: [0, 0.34, 0],
      camZ: 8.9,
      exposure: 0.74,
      parallax: 0.4,
    },
  },
  // CHAPTER 1: ABOUT — ambient hologram docked in the upper-right margin
  about: {
    desktop: {
      objectPos: [3.2, 1.45, -2.9],
      objectRot: [0.16, 0.44, -0.08],
      scale: 0.52,
      lookAt: [0.1, 0.08, 0],
      camZ: 7.95,
      exposure: 0.88,
      parallax: 0.6,
    },
    mobile: {
      objectPos: [0, 1.0, -4.6],
      objectRot: [0.1, 0.3, 0],
      scale: 0.46,
      lookAt: [0, 0.2, 0],
      camZ: 9.3,
      exposure: 0.7,
      parallax: 0.3,
    },
  },
  // CHAPTER 2: SKILLS — mirrored dock on the left margin
  skills: {
    desktop: {
      objectPos: [-3.3, -0.4, -2.8],
      objectRot: [-0.12, -0.4, 0.08],
      scale: 0.5,
      lookAt: [-0.1, 0, 0],
      camZ: 7.95,
      exposure: 0.86,
      parallax: 0.6,
    },
    mobile: {
      objectPos: [0, 1.0, -4.6],
      objectRot: [-0.1, -0.3, 0],
      scale: 0.46,
      lookAt: [0, 0.2, 0],
      camZ: 9.3,
      exposure: 0.7,
      parallax: 0.3,
    },
  },
  // CHAPTER 3: FLAGSHIPS — distant celestial anchor behind the showcase stage
  flagships: {
    desktop: {
      objectPos: [0, 0.35, -5.5],
      objectRot: [0.12, 0, 0],
      scale: 0.56,
      lookAt: [0, 0.2, 0],
      camZ: 8.5,
      exposure: 0.8,
      parallax: 0.45,
    },
    mobile: {
      objectPos: [0, 0.5, -5.8],
      objectRot: [0.12, 0, 0],
      scale: 0.5,
      lookAt: [0, 0.25, 0],
      camZ: 9.4,
      exposure: 0.68,
      parallax: 0.25,
    },
  },
  // CHAPTER 4: PROJECTS ARCHIVE — far cosmic backdrop
  projects: {
    desktop: {
      objectPos: [0, 0.5, -6.0],
      objectRot: [0.15, 0, 0],
      scale: 0.52,
      lookAt: [0, 0.25, 0],
      camZ: 8.7,
      exposure: 0.76,
      parallax: 0.4,
    },
    mobile: {
      objectPos: [0, 0.6, -6.2],
      objectRot: [0.15, 0, 0],
      scale: 0.46,
      lookAt: [0, 0.3, 0],
      camZ: 9.6,
      exposure: 0.66,
      parallax: 0.2,
    },
  },
  // CHAPTER 5: ACHIEVEMENTS — quiet medallion drifting above the timeline
  achievements: {
    desktop: {
      objectPos: [0, 0.55, -4.9],
      objectRot: [0.14, 0, 0],
      scale: 0.5,
      lookAt: [0, 0.24, 0],
      camZ: 8.6,
      exposure: 0.78,
      parallax: 0.4,
    },
    mobile: {
      objectPos: [0, 0.7, -5.4],
      objectRot: [0.14, 0, 0],
      scale: 0.46,
      lookAt: [0, 0.3, 0],
      camZ: 9.5,
      exposure: 0.68,
      parallax: 0.2,
    },
  },
  // CHAPTER 6: GITHUB — same deep orbit family as projects
  github: {
    desktop: {
      objectPos: [0, 0.5, -5.1],
      objectRot: [0.13, 0, 0],
      scale: 0.52,
      lookAt: [0, 0.22, 0],
      camZ: 8.65,
      exposure: 0.78,
      parallax: 0.4,
    },
    mobile: {
      objectPos: [0, 0.65, -5.6],
      objectRot: [0.13, 0, 0],
      scale: 0.46,
      lookAt: [0, 0.28, 0],
      camZ: 9.5,
      exposure: 0.68,
      parallax: 0.2,
    },
  },
  // CHAPTER 7: CONTACT — luminous portal convergence behind the card
  contact: {
    desktop: {
      objectPos: [0, -0.18, -1.55],
      objectRot: [0, 0, 0],
      scale: 1.06,
      lookAt: [0, 0, 0],
      camZ: 7.25,
      exposure: 1.14,
      parallax: 0.9,
    },
    mobile: {
      objectPos: [0, 0.1, -2.7],
      objectRot: [0, 0, 0],
      scale: 0.8,
      lookAt: [0, 0.05, 0],
      camZ: 8.5,
      exposure: 0.9,
      parallax: 0.35,
    },
  },
};

const DEFAULT_POSE = CHAPTER_POSES.hero;

export const HeroCoreScene: React.FC<HeroCoreSceneProps> = ({
  config,
  scrollProgress = 0,
  activeSection = 'hero',
  onSceneReady,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const configRef = useRef<SceneConfig>(config);
  configRef.current = config;

  const scrollRef = useRef<number>(scrollProgress);
  scrollRef.current = scrollProgress;

  const sectionRef = useRef<string>(activeSection);
  sectionRef.current = activeSection;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Headless test check for lossless software rendering
    const isHeadless =
      typeof navigator !== 'undefined' &&
      (Boolean(navigator.webdriver) || /HeadlessChrome/i.test(navigator.userAgent));

    const reducedMotion = prefersReducedMotion();
    const urlParams = new URLSearchParams(window.location.search);
    const autostart = urlParams.get('autostart') === '1';
    // Skippable scene intro (runs in parallel with the hero text timeline)
    const runIntro = !reducedMotion && !autostart && !isHeadless;
    const introDuration = 2.3;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;
    const isSmallScreen = width < 768;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x030508);
    scene.fog = new THREE.FogExp2(0x030508, 0.045);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 10.5); // Opening camera distance

    // 2. Renderer Setup
    const renderer = new THREE.WebGLRenderer({
      antialias: !isHeadless,
      powerPreference: 'high-performance',
      alpha: false,
    });
    renderer.setPixelRatio(isHeadless ? 1 : Math.min(window.devicePixelRatio, isSmallScreen ? 1.75 : 2));
    renderer.setSize(width, height);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = !isHeadless && !isSmallScreen;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // 3. Studio Environment Map (PMREMGenerator + RoomEnvironment)
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();
    const envTexture = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTexture;
    pmremGenerator.dispose();

    // 4. Lighting Rig (Warm key directional + cool hemisphere + dynamic breathing rim lights)
    const keyLight = new THREE.DirectionalLight(0xfff5ea, 2.6);
    keyLight.position.set(4.5, 6, 5);
    keyLight.castShadow = !isHeadless && !isSmallScreen;
    if (keyLight.castShadow) {
      keyLight.shadow.mapSize.width = 1024;
      keyLight.shadow.mapSize.height = 1024;
      keyLight.shadow.bias = -0.0005;
      keyLight.shadow.normalBias = 0.02;
    }
    scene.add(keyLight);

    const hemiLight = new THREE.HemisphereLight(0x38bdf8, 0x030508, 1.25);
    hemiLight.position.set(0, 8, 0);
    scene.add(hemiLight);

    const rimPointLight1 = new THREE.PointLight(0x8b5cf6, 3.8, 16);
    rimPointLight1.position.set(-4.5, -2, -2.5);
    scene.add(rimPointLight1);

    const rimPointLight2 = new THREE.PointLight(0x06b6d4, 2.5, 16);
    rimPointLight2.position.set(4.5, -3, 3);
    scene.add(rimPointLight2);

    // Pointer-reactive fill light (desktop only, gently damped)
    const pointerLight = new THREE.PointLight(0xa78bfa, 0.0, 13);
    pointerLight.position.copy(_pointerLightPos);
    scene.add(pointerLight);

    // 5. Procedural Materials Library
    const getPaletteColors = (palette: SceneConfig['palette']) => {
      switch (palette) {
        case 'cyan':
          return {
            accent: 0x06b6d4,
            secondary: 0x0284c7,
            glow: 0x38bdf8,
            chromeRough: 0.1,
          };
        case 'chrome':
          return {
            accent: 0xe2e8f0,
            secondary: 0x94a3b8,
            glow: 0xffffff,
            chromeRough: 0.05,
          };
        case 'violet':
        default:
          return {
            accent: 0x8b5cf6,
            secondary: 0x6366f1,
            glow: 0xa855f7,
            chromeRough: 0.12,
          };
      }
    };

    let currentColors = getPaletteColors(configRef.current.palette);

    // Chrome Material
    const chromeMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0.96,
      roughness: currentColors.chromeRough,
      clearcoat: 0.85,
      clearcoatRoughness: 0.1,
      reflectivity: 1.0,
    });

    // Titanium Accent Material
    const titaniumMaterial = new THREE.MeshPhysicalMaterial({
      color: currentColors.secondary,
      metalness: 0.88,
      roughness: 0.22,
      clearcoat: 0.6,
    });

    // Glass Transmissive Outer Geodesic Shell
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0.08,
      roughness: 0.12,
      transmission: 0.92,
      ior: 1.54,
      thickness: 0.9,
      transparent: true,
      opacity: 0.8,
      depthWrite: false,
    });

    // Glowing Reactor Energy Core
    const coreMaterial = new THREE.MeshPhysicalMaterial({
      color: currentColors.accent,
      emissive: currentColors.glow,
      emissiveIntensity: 0.85,
      metalness: 0.35,
      roughness: 0.18,
      clearcoat: 1.0,
    });

    // Structural Wireframe Cage
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: currentColors.accent,
      wireframe: true,
      transparent: true,
      opacity: 0.4,
    });

    // Inner Crystalline Refraction Core
    const innerCrystalMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0.92,
      roughness: 0.04,
      clearcoat: 1.0,
    });

    // 6. Assemble Composite Procedural Subject (THREE.Group)
    const heroSubject = new THREE.Group();
    heroSubject.position.set(0, 0, 0);

    // Part 1: Outer Heavy Gimbal Ring (Torus with beveled tube)
    const ring1Geo = new THREE.TorusGeometry(2.1, 0.05, 24, 96);
    const ring1 = new THREE.Mesh(ring1Geo, chromeMaterial);
    ring1.castShadow = !isHeadless && !isSmallScreen;
    ring1.receiveShadow = !isHeadless && !isSmallScreen;
    heroSubject.add(ring1);

    // Part 2: Intersecting Equatorial Ring
    const ring2Geo = new THREE.TorusGeometry(1.8, 0.04, 20, 80);
    const ring2 = new THREE.Mesh(ring2Geo, titaniumMaterial);
    ring2.rotation.x = Math.PI / 3;
    heroSubject.add(ring2);

    // Part 3: Orthogonal Polar Precision Ring
    const ring3Geo = new THREE.TorusGeometry(1.5, 0.035, 16, 64);
    const ring3 = new THREE.Mesh(ring3Geo, chromeMaterial);
    ring3.rotation.y = Math.PI / 2.5;
    heroSubject.add(ring3);

    // Part 4: Outer Geodesic Glass Icosahedron Shell
    const icosaGeo = new THREE.IcosahedronGeometry(1.2, 1);
    const glassShell = new THREE.Mesh(icosaGeo, glassMaterial);
    glassShell.renderOrder = 2;
    heroSubject.add(glassShell);

    // Part 5: Wireframe Geometric Structural Cage
    const wireframeCage = new THREE.Mesh(icosaGeo, wireframeMaterial);
    wireframeCage.scale.setScalar(1.025);
    heroSubject.add(wireframeCage);

    // Part 6: Floating Central Energy Sphere
    const coreGeo = new THREE.SphereGeometry(0.72, 32, 32);
    const energyCore = new THREE.Mesh(coreGeo, coreMaterial);
    heroSubject.add(energyCore);

    // Part 7: Inner Crystalline Core (Faceted Octahedron)
    const innerCrystalGeo = new THREE.OctahedronGeometry(0.42, 0);
    const innerCrystal = new THREE.Mesh(innerCrystalGeo, innerCrystalMat);
    heroSubject.add(innerCrystal);

    // Part 8: Radial Orbital Sensor Nodes (InstancedMesh - 8 nodes with harmonic oscillation)
    const sensorNodeCount = 8;
    const sensorGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.16, 12);
    const sensorMesh = new THREE.InstancedMesh(sensorGeo, chromeMaterial, sensorNodeCount);
    for (let i = 0; i < sensorNodeCount; i++) {
      const angle = (i / sensorNodeCount) * Math.PI * 2;
      const radius = 2.1;
      _tempPos.set(Math.cos(angle) * radius, Math.sin(angle) * radius, 0);
      _tempQuat.setFromAxisAngle(new THREE.Vector3(0, 0, 1), angle);
      _tempScale.set(1, 1, 1);
      _tempMatrix.compose(_tempPos, _tempQuat, _tempScale);
      sensorMesh.setMatrixAt(i, _tempMatrix);
    }
    sensorMesh.instanceMatrix.needsUpdate = true;
    ring1.add(sensorMesh);

    // Part 9: Floating Orbiting Data Shards (InstancedMesh - 24 faceted octahedrons on 3 orbital planes)
    const shardCount = isHeadless ? 8 : isSmallScreen ? 16 : 24;
    const shardGeo = new THREE.OctahedronGeometry(0.08, 0);
    const shardMesh = new THREE.InstancedMesh(shardGeo, titaniumMaterial, shardCount);
    const shardData: { radius: number; speed: number; angle: number; yOffset: number; tilt: number; plane: number }[] = [];

    for (let i = 0; i < shardCount; i++) {
      const plane = i % 3; // 0 = equatorial, 1 = polar, 2 = inclined
      const radius = 2.3 + (i % 4) * 0.38;
      const speed = (0.22 + (i % 5) * 0.07) * (i % 2 === 0 ? 1 : -1);
      const angle = (i / shardCount) * Math.PI * 2;
      const yOffset = ((i % 7) - 3) * 0.22;
      const tilt = ((i % 4) - 2) * 0.25;
      shardData.push({ radius, speed, angle, yOffset, tilt, plane });

      _tempPos.set(Math.cos(angle) * radius, yOffset, Math.sin(angle) * radius);
      _tempQuat.setFromEuler(new THREE.Euler(tilt, angle, 0));
      _tempScale.setScalar(0.7 + (i % 4) * 0.25);
      _tempMatrix.compose(_tempPos, _tempQuat, _tempScale);
      shardMesh.setMatrixAt(i, _tempMatrix);
    }
    shardMesh.instanceMatrix.needsUpdate = true;
    heroSubject.add(shardMesh);

    // Part 10: Ground Contact Shadow & Radial Horizon Plane
    const shadowGeo = new THREE.PlaneGeometry(8, 8);
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d')!;
    const gradient = ctx.createRadialGradient(64, 64, 5, 64, 64, 60);
    gradient.addColorStop(0, 'rgba(0, 0, 0, 0.65)');
    gradient.addColorStop(0.5, 'rgba(0, 0, 0, 0.25)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 128, 128);
    const shadowTex = new THREE.CanvasTexture(canvas);
    shadowTex.colorSpace = THREE.SRGBColorSpace;

    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      depthWrite: false,
      opacity: 0.55,
    });
    const contactShadow = new THREE.Mesh(shadowGeo, shadowMat);
    contactShadow.rotation.x = -Math.PI / 2;
    contactShadow.position.y = -2.8;
    scene.add(contactShadow);

    scene.add(heroSubject);

    // 7. Multi-Depth Starfields & Atmospheric Dust
    // Layer 1: Deep Galactic Background Dust
    const bgParticleCount = isHeadless ? 250 : isSmallScreen ? 520 : 1000;
    const bgParticleGeo = new THREE.BufferGeometry();
    const bgPos = new Float32Array(bgParticleCount * 3);
    for (let i = 0; i < bgParticleCount; i++) {
      const r = 8.0 + Math.random() * 25;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      bgPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      bgPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      bgPos[i * 3 + 2] = r * Math.cos(phi);
    }
    bgParticleGeo.setAttribute('position', new THREE.BufferAttribute(bgPos, 3));
    const bgParticleMat = new THREE.PointsMaterial({
      color: 0x818cf8,
      size: 0.03,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
    });
    const bgParticles = new THREE.Points(bgParticleGeo, bgParticleMat);
    scene.add(bgParticles);

    // Layer 2: Mid-field Twinkling Stellar Motes
    const midCount = isHeadless ? 80 : isSmallScreen ? 180 : 400;
    const midGeo = new THREE.BufferGeometry();
    const midPos = new Float32Array(midCount * 3);
    for (let i = 0; i < midCount; i++) {
      const r = 3.5 + Math.random() * 9;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      midPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      midPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      midPos[i * 3 + 2] = r * Math.cos(phi);
    }
    midGeo.setAttribute('position', new THREE.BufferAttribute(midPos, 3));
    const midMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.045,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });
    const midParticles = new THREE.Points(midGeo, midMat);
    scene.add(midParticles);

    // Layer 3: Transient Shooting Light Streak (Dynamic Line)
    const streakCurve = new THREE.LineCurve3(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0));
    const streakGeo = new THREE.BufferGeometry().setFromPoints(streakCurve.getPoints(12));
    const streakMat = new THREE.LineBasicMaterial({
      color: 0xa855f7,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
    });
    const shootingStreak = new THREE.Line(streakGeo, streakMat);
    shootingStreak.visible = !isSmallScreen && !reducedMotion;
    scene.add(shootingStreak);

    let streakActive = false;
    let streakTimer = 0;
    let streakProgress = 0;
    const streakStart = new THREE.Vector3();
    const streakEnd = new THREE.Vector3();

    // 8. Event Handlers (Mouse Parallax, Resize & Page Visibility)
    let isTabVisible = true;
    const handleVisibility = () => {
      isTabVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibility);

    const handlePointerMove = (e: MouseEvent) => {
      _mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      _mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('resize', handleResize);

    // Pre-warm shaders
    renderer.compile(scene, camera);
    if (onSceneReady) onSceneReady();

    // 9. Lossless 60fps Render Loop with Section-Driven Choreography
    const clock = new THREE.Clock();
    let animationFrameId: number;
    const currentSubjectQuat = new THREE.Quaternion();
    const targetSubjectQuat = new THREE.Quaternion();
    let currentExposure = 1.15;
    let pointerLightIntensity = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Pause/throttle when tab is backgrounded
      if (!isTabVisible) return;

      const delta = Math.min(clock.getDelta(), 0.1);
      const time = clock.getElapsedTime();
      const currentConfig = configRef.current;
      const scroll = scrollRef.current; // 0 to 1, used for fine in-chapter drift
      const section = sectionRef.current;

      // Skippable cinematic scene intro: core illumination + ring alignment
      const introT = runIntro ? Math.min(1, time / introDuration) : 1;
      const introEase = 1 - Math.pow(1 - introT, 3); // cubic out

      // Update palette colors reactively if changed
      const newColors = getPaletteColors(currentConfig.palette);
      if (newColors.accent !== currentColors.accent) {
        currentColors = newColors;
        coreMaterial.color.setHex(currentColors.accent);
        coreMaterial.emissive.setHex(currentColors.glow);
        wireframeMaterial.color.setHex(currentColors.accent);
        titaniumMaterial.color.setHex(currentColors.secondary);
        rimPointLight1.color.setHex(currentColors.accent);
      }

      // ── Resolve chapter pose (desktop / mobile art direction) ──
      const pose = CHAPTER_POSES[section] ?? DEFAULT_POSE;
      const activePose = isSmallScreen ? pose.mobile : pose.desktop;

      // Gyroscopic Gimbal Precession & Harmonic Nutation
      const speed = currentConfig.rotationSpeed;
      const p1 = time * 0.45 * speed;
      const p2 = time * 0.35 * speed;
      const p3 = time * 0.55 * speed;

      // Ring 1: Compound Precession + smooth continuous spin
      ring1.rotation.z += 0.5 * speed * delta;
      ring1.rotation.y = Math.sin(p1) * 0.35;
      ring1.rotation.x = Math.cos(p2) * 0.25;

      // Ring 2: Counter-rotation with inclined nutation
      ring2.rotation.z -= 0.65 * speed * delta;
      ring2.rotation.x = Math.PI / 3 + Math.sin(p2 * 1.2) * 0.3;
      ring2.rotation.y = Math.cos(p3) * 0.4;

      // Ring 3: Orthogonal precession
      ring3.rotation.y += 0.55 * speed * delta;
      ring3.rotation.x = Math.PI / 2.5 + Math.sin(p3 * 0.8) * 0.25;
      ring3.rotation.z = Math.cos(p1) * 0.3;

      // Geodesic Glass Shell & Cage
      glassShell.rotation.y += 0.4 * speed * delta;
      glassShell.rotation.x = Math.sin(p1 * 0.5) * 0.2;
      wireframeCage.rotation.y = glassShell.rotation.y;
      wireframeCage.rotation.x = glassShell.rotation.x;

      // Inner Crystalline Core (Counter-revolving with sharp refraction highlights)
      innerCrystal.rotation.y -= 1.1 * speed * delta;
      innerCrystal.rotation.z += 0.8 * speed * delta;
      innerCrystal.rotation.x = Math.sin(time * 1.8) * 0.15;

      // Dual-frequency Breathing Emissive Core
      const breath1 = Math.sin(time * 2.2);
      const breath2 = Math.sin(time * 5.4) * 0.15;
      const corePulse = 0.75 + breath1 * 0.25 + breath2;
      coreMaterial.emissiveIntensity = corePulse * (0.15 + 0.85 * introEase);

      // Light breathing reaction (studio lights harmonize with core energy)
      rimPointLight1.intensity = (3.0 + breath1 * 1.2) * (0.25 + 0.75 * introEase);
      rimPointLight2.intensity = 2.0 + Math.cos(time * 2.2) * 0.8;

      // Pointer-reactive fill light follows the cursor with damping
      const targetPointerIntensity = isSmallScreen || reducedMotion ? 0 : 0.85;
      pointerLightIntensity = THREE.MathUtils.damp(pointerLightIntensity, targetPointerIntensity, 3, delta);
      pointerLight.intensity = pointerLightIntensity;
      _pointerLightPos.set(_mouse.x * 3.4, _mouse.y * 2.4, 3.2);
      pointerLight.position.x = THREE.MathUtils.damp(pointerLight.position.x, _pointerLightPos.x, 4, delta);
      pointerLight.position.y = THREE.MathUtils.damp(pointerLight.position.y, _pointerLightPos.y, 4, delta);

      // Oscillating Orbital Sensor Nodes on Ring 1 (with subtle pulse)
      for (let i = 0; i < sensorNodeCount; i++) {
        const baseAngle = (i / sensorNodeCount) * Math.PI * 2;
        const waveOffset = Math.sin(time * 2.0 + i) * 0.08;
        const radius = 2.1 + waveOffset;
        const pulse = 0.9 + Math.sin(time * 3.2 + i * 1.7) * 0.22;
        _tempPos.set(Math.cos(baseAngle) * radius, Math.sin(baseAngle) * radius, waveOffset * 0.5);
        _tempQuat.setFromAxisAngle(new THREE.Vector3(0, 0, 1), baseAngle + waveOffset * 0.3);
        _tempScale.set(1, pulse, 1);
        _tempMatrix.compose(_tempPos, _tempQuat, _tempScale);
        sensorMesh.setMatrixAt(i, _tempMatrix);
      }
      sensorMesh.instanceMatrix.needsUpdate = true;

      // Multi-layer Orbiting Shard Dynamics
      const targetExplode = currentConfig.explodedOffset;
      for (let i = 0; i < shardCount; i++) {
        const item = shardData[i];
        item.angle += item.speed * speed * delta;
        const radius = item.radius * (1 + targetExplode * 0.6);

        // Plane 0: Equatorial, Plane 1: Polar, Plane 2: Inclined 45°
        let x = Math.cos(item.angle) * radius;
        let y = item.yOffset + Math.sin(time * 1.6 + i) * 0.2;
        let z = Math.sin(item.angle) * radius;

        if (item.plane === 1) {
          // Polar orbit
          y = Math.sin(item.angle) * radius;
          z = item.yOffset + Math.cos(time * 1.4 + i) * 0.2;
        } else if (item.plane === 2) {
          // Inclined orbit
          const inclinedY = y * 0.7 - z * 0.7;
          const inclinedZ = y * 0.7 + z * 0.7;
          y = inclinedY;
          z = inclinedZ;
        }

        _tempPos.set(x, y, z);
        _tempQuat.setFromEuler(new THREE.Euler(item.tilt + time * 0.6, item.angle, time * 0.4));
        _tempScale.setScalar((0.7 + (i % 4) * 0.25) * (1 - targetExplode * 0.15));
        _tempMatrix.compose(_tempPos, _tempQuat, _tempScale);
        shardMesh.setMatrixAt(i, _tempMatrix);
      }
      shardMesh.instanceMatrix.needsUpdate = true;

      // Exploded-View Scale Interpolation (rings bloom open, staged by intro)
      const explodeRing1 = 1.0 + targetExplode * 0.65;
      const explodeRing2 = 1.0 + targetExplode * 0.45;
      const explodeRing3 = 1.0 + targetExplode * 0.25;
      const ringBloom = 0.55 + 0.45 * introEase;

      ring1.scale.setScalar(THREE.MathUtils.damp(ring1.scale.x, explodeRing1 * ringBloom, 6, delta));
      ring2.scale.setScalar(THREE.MathUtils.damp(ring2.scale.x, explodeRing2 * ringBloom, 6, delta));
      ring3.scale.setScalar(THREE.MathUtils.damp(ring3.scale.x, explodeRing3 * ringBloom, 6, delta));
      glassShell.scale.setScalar(THREE.MathUtils.damp(glassShell.scale.x, ringBloom, 6, delta));
      wireframeCage.scale.setScalar(THREE.MathUtils.damp(wireframeCage.scale.x, ringBloom * 1.025, 6, delta));

      // Starfield Twinkle & Ambient Cosmic Drift
      if (currentConfig.particlesEnabled) {
        bgParticles.rotation.y = time * 0.01;
        midParticles.rotation.y = -time * 0.018;
        midParticles.position.y = Math.sin(time * 0.12) * 0.35; // slow depth drift
        midMat.opacity = 0.5 + Math.sin(time * 3.0) * 0.2; // Twinkle
        bgParticles.visible = true;
        midParticles.visible = true;
      } else {
        bgParticles.visible = false;
        midParticles.visible = false;
      }

      // Periodic Shooting Star / Light Streak Sweep (every 7-9 seconds)
      streakTimer += delta;
      if (shootingStreak.visible && !streakActive && streakTimer > 7.5 && Math.random() < 0.05) {
        streakActive = true;
        streakTimer = 0;
        streakProgress = 0;
        const startX = (Math.random() - 0.5) * 12;
        const startY = 3.5 + Math.random() * 3;
        const startZ = -4 + (Math.random() - 0.5) * 4;
        streakStart.set(startX, startY, startZ);
        streakEnd.set(startX - 8, startY - 4.5, startZ + 2);
      }

      if (streakActive) {
        streakProgress += delta * 1.4;
        if (streakProgress >= 1.0) {
          streakActive = false;
          streakMat.opacity = 0;
        } else {
          const currentHead = streakStart.clone().lerp(streakEnd, streakProgress);
          const currentTail = streakStart.clone().lerp(streakEnd, Math.max(0, streakProgress - 0.25));
          const pts = [currentTail, currentHead];
          streakGeo.setFromPoints(pts);
          streakMat.opacity = Math.sin(streakProgress * Math.PI) * 0.75;
        }
      }

      // ── Subject pose: damped position, rotation & scale toward chapter target ──
      _targetObjectPos.set(
        activePose.objectPos[0],
        activePose.objectPos[1],
        activePose.objectPos[2]
      );
      // Gentle scroll-linked vertical drift keeps motion alive within a chapter
      _targetObjectPos.y += Math.sin(scroll * Math.PI) * 0.15;

      _currentObjectPos.x = THREE.MathUtils.damp(_currentObjectPos.x, _targetObjectPos.x, 3.2, delta);
      _currentObjectPos.y = THREE.MathUtils.damp(_currentObjectPos.y, _targetObjectPos.y, 3.2, delta);
      _currentObjectPos.z = THREE.MathUtils.damp(_currentObjectPos.z, _targetObjectPos.z, 3.2, delta);
      heroSubject.position.copy(_currentObjectPos);

      // Chapter attitude with organic yaw drift (bounded, never runaway)
      _tempEuler.set(
        activePose.objectRot[0] + Math.sin(time * 0.16) * 0.03,
        activePose.objectRot[1] + Math.sin(time * 0.11) * 0.09,
        activePose.objectRot[2]
      );
      targetSubjectQuat.setFromEuler(_tempEuler);
      currentSubjectQuat.slerp(targetSubjectQuat, 1 - Math.exp(-3.2 * delta));
      heroSubject.quaternion.copy(currentSubjectQuat);

      // Damped pointer tilt layered on top (parallax depth cue)
      const tiltAmt = 0.05 * activePose.parallax;
      heroSubject.rotateX(_mouse.y * tiltAmt * 0.6);
      heroSubject.rotateY(_mouse.x * tiltAmt);

      // Chapter scale with intro bloom
      const targetScale = activePose.scale * (0.22 + 0.78 * introEase);
      heroSubject.scale.setScalar(THREE.MathUtils.damp(heroSubject.scale.x, targetScale, 3.4, delta));

      // ── Camera choreography: per-chapter distance, pointer parallax, slow drift ──
      const driftX = Math.sin(time * 0.18) * 0.2;
      const driftY = Math.cos(time * 0.15) * 0.15;
      const parallax = activePose.parallax;
      _targetCameraPos.set(
        _mouse.x * 1.3 * parallax + driftX,
        _mouse.y * 0.9 * parallax + driftY,
        activePose.camZ + Math.sin(scroll * Math.PI) * 0.35
      );

      _currentCameraPos.x = THREE.MathUtils.damp(_currentCameraPos.x, _targetCameraPos.x, 3.0, delta);
      _currentCameraPos.y = THREE.MathUtils.damp(_currentCameraPos.y, _targetCameraPos.y, 3.0, delta);
      _currentCameraPos.z = THREE.MathUtils.damp(_currentCameraPos.z, _targetCameraPos.z, 2.2, delta);
      camera.position.copy(_currentCameraPos);

      // Damped look-at target per chapter (frames the composition)
      _targetLookAt.set(activePose.lookAt[0], activePose.lookAt[1], activePose.lookAt[2]);
      _currentLookAt.x = THREE.MathUtils.damp(_currentLookAt.x, _targetLookAt.x, 3.2, delta);
      _currentLookAt.y = THREE.MathUtils.damp(_currentLookAt.y, _targetLookAt.y, 3.2, delta);
      _currentLookAt.z = THREE.MathUtils.damp(_currentLookAt.z, _targetLookAt.z, 3.2, delta);
      camera.lookAt(_currentLookAt);

      // Cinematic exposure grading per chapter (protects text contrast)
      currentExposure = THREE.MathUtils.damp(currentExposure, activePose.exposure, 3, delta);
      renderer.toneMappingExposure = currentExposure;

      renderer.render(scene, camera);
    };

    animate();

    // 10. Clean Resource Disposal on Unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('resize', handleResize);

      ring1Geo.dispose();
      ring2Geo.dispose();
      ring3Geo.dispose();
      icosaGeo.dispose();
      coreGeo.dispose();
      innerCrystalGeo.dispose();
      sensorGeo.dispose();
      shardGeo.dispose();
      shadowGeo.dispose();
      bgParticleGeo.dispose();
      midGeo.dispose();
      streakGeo.dispose();

      chromeMaterial.dispose();
      titaniumMaterial.dispose();
      glassMaterial.dispose();
      coreMaterial.dispose();
      wireframeMaterial.dispose();
      innerCrystalMat.dispose();
      shadowMat.dispose();
      shadowTex.dispose();
      bgParticleMat.dispose();
      midMat.dispose();
      streakMat.dispose();
      envTexture.dispose();

      renderer.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full pointer-events-auto"
      style={{ touchAction: 'none' }}
      data-testid="hero-threejs-canvas"
      aria-label="Interactive 3D Chrome Energy Core"
      role="img"
    />
  );
};
