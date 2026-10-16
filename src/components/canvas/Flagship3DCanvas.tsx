import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Flagship3DCanvasProps {
  flagshipId: 'mediverse-ai' | 'swasth-saathi' | 'trafficguard-pro' | 'resqmap-app';
}

export const Flagship3DCanvas: React.FC<Flagship3DCanvasProps> = ({ flagshipId }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const isHeadless =
      typeof navigator !== 'undefined' &&
      (Boolean(navigator.webdriver) || /HeadlessChrome/i.test(navigator.userAgent));

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x060911);
    scene.fog = new THREE.FogExp2(0x060911, 0.042);

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 300;
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 50);
    camera.position.set(0, 2.5, 6.5);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isHeadless,
      alpha: true,
      powerPreference: 'low-power',
    });
    renderer.setPixelRatio(isHeadless ? 1 : Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(width, height);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // Common Lighting
    const dirLight = new THREE.DirectionalLight(0xffffff, 2.2);
    dirLight.position.set(3, 5, 4);
    scene.add(dirLight);

    const hemiLight = new THREE.HemisphereLight(0x38bdf8, 0x0f172a, 1.3);
    scene.add(hemiLight);

    // Soft violet fill from below-left for cinematic depth
    const fillLight = new THREE.PointLight(0x8b5cf6, 1.4, 14);
    fillLight.position.set(-3, -2, 3);
    scene.add(fillLight);

    const group = new THREE.Group();
    scene.add(group);

    // Graceful scale-in entrance (respects reduced motion preference)
    const reducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const disposables: { dispose: () => void }[] = [];
    const updateCallbacks: ((time: number, delta: number) => void)[] = [];

    // FLAGSHIP 1: MediVerse.AI
    if (flagshipId === 'mediverse-ai') {
      // 1. Central Holographic Core
      const coreGeo = new THREE.IcosahedronGeometry(1.3, 2);
      const coreMat = new THREE.MeshPhysicalMaterial({
        color: 0x8b5cf6,
        wireframe: true,
        emissive: 0x7c3aed,
        emissiveIntensity: 0.65,
      });
      const coreMesh = new THREE.Mesh(coreGeo, coreMat);
      group.add(coreMesh);
      disposables.push(coreGeo, coreMat);

      // Inner Vital Pulsating Nucleus
      const nucleusGeo = new THREE.SphereGeometry(0.75, 24, 24);
      const nucleusMat = new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        emissive: 0x0284c7,
        emissiveIntensity: 0.8,
        roughness: 0.2,
      });
      const nucleusMesh = new THREE.Mesh(nucleusGeo, nucleusMat);
      group.add(nucleusMesh);
      disposables.push(nucleusGeo, nucleusMat);

      // Orbiting Telemetry Rings
      const ringGeo = new THREE.TorusGeometry(2.1, 0.03, 16, 64);
      const ringMat = new THREE.MeshBasicMaterial({ color: 0x06b6d4 });
      const ring1 = new THREE.Mesh(ringGeo, ringMat);
      ring1.rotation.x = Math.PI / 3;
      group.add(ring1);

      const ring2 = ring1.clone();
      ring2.rotation.y = Math.PI / 4;
      ring2.rotation.x = -Math.PI / 6;
      group.add(ring2);
      disposables.push(ringGeo, ringMat);

      // 4 Surrounding Satellite Care Nodes (Triage, Doctor, Records, Pharmacy)
      const satCount = 4;
      const satGeo = new THREE.OctahedronGeometry(0.18, 0);
      const satMat = new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        emissive: 0x06b6d4,
        emissiveIntensity: 0.9,
      });
      disposables.push(satGeo, satMat);

      const satellites: THREE.Mesh[] = [];
      const packetGeo = new THREE.SphereGeometry(0.06, 12, 12);
      const packetMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
      disposables.push(packetGeo, packetMat);

      const packets: THREE.Mesh[] = [];

      for (let i = 0; i < satCount; i++) {
        const sat = new THREE.Mesh(satGeo, satMat);
        group.add(sat);
        satellites.push(sat);

        const packet = new THREE.Mesh(packetGeo, packetMat);
        group.add(packet);
        packets.push(packet);

        // Connection Line
        const lineGeo = new THREE.BufferGeometry();
        const lineMat = new THREE.LineBasicMaterial({
          color: 0x818cf8,
          transparent: true,
          opacity: 0.5,
        });
        const line = new THREE.Line(lineGeo, lineMat);
        group.add(line);
        disposables.push(lineGeo, lineMat);
      }

      updateCallbacks.push((time, delta) => {
        coreMesh.rotation.y += delta * 0.4;
        coreMesh.rotation.x = Math.sin(time * 0.8) * 0.15;
        ring1.rotation.z += delta * 0.5;
        ring2.rotation.z -= delta * 0.45;
        nucleusMesh.scale.setScalar(1 + Math.sin(time * 3.0) * 0.12);

        for (let i = 0; i < satCount; i++) {
          const angle = time * 0.6 + (i * Math.PI * 2) / satCount;
          const radius = 2.1;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(time * 1.5 + i) * 0.3;
          const z = Math.sin(angle) * radius;
          satellites[i].position.set(x, y, z);
          satellites[i].rotation.y += delta * 1.2;

          // Travelling data packet from core to satellite and back
          const packetProgress = (Math.sin(time * 2.2 + i * 1.2) + 1) * 0.5;
          packets[i].position.set(x * packetProgress, y * packetProgress, z * packetProgress);
        }
      });
    }

    // FLAGSHIP 2: Swasth-Saathi
    else if (flagshipId === 'swasth-saathi') {
      const nodeCount = 7;
      const nodeGeo = new THREE.SphereGeometry(0.2, 16, 16);
      const nodeMat = new THREE.MeshStandardMaterial({
        color: 0x10b981,
        emissive: 0x059669,
        emissiveIntensity: 0.65,
        metalness: 0.8,
      });
      disposables.push(nodeGeo, nodeMat);

      const nodes: THREE.Vector3[] = [];
      const nodeMeshes: THREE.Mesh[] = [];

      for (let i = 0; i < nodeCount; i++) {
        const angle = (i / nodeCount) * Math.PI * 2;
        const rad = 1.7 + (i % 2) * 0.35;
        const pos = new THREE.Vector3(Math.cos(angle) * rad, ((i % 3) - 1) * 0.45, Math.sin(angle) * rad);
        nodes.push(pos);

        const node = new THREE.Mesh(nodeGeo, nodeMat);
        node.position.copy(pos);
        group.add(node);
        nodeMeshes.push(node);
      }

      // Central Healthcare Hub
      const hubGeo = new THREE.CylinderGeometry(0.42, 0.42, 0.28, 16);
      const hubMat = new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        emissive: 0x0284c7,
        emissiveIntensity: 0.75,
      });
      const hub = new THREE.Mesh(hubGeo, hubMat);
      group.add(hub);
      disposables.push(hubGeo, hubMat);

      // Connecting Luminous Transit Lines with Dynamic Shimmer
      const lineMaterials: THREE.LineBasicMaterial[] = [];
      for (let i = 0; i < nodes.length; i++) {
        const lineGeo = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), nodes[i]]);
        const lineMat = new THREE.LineBasicMaterial({
          color: 0x34d399,
          transparent: true,
          opacity: 0.55,
        });
        lineMaterials.push(lineMat);
        const line = new THREE.Line(lineGeo, lineMat);
        group.add(line);
        disposables.push(lineGeo, lineMat);
      }

      // Moving Pulse Bead
      const pulseGeo = new THREE.SphereGeometry(0.08, 12, 12);
      const pulseMat = new THREE.MeshBasicMaterial({ color: 0x6ee7b7 });
      const pulseMesh = new THREE.Mesh(pulseGeo, pulseMat);
      group.add(pulseMesh);
      disposables.push(pulseGeo, pulseMat);

      updateCallbacks.push((time, delta) => {
        hub.rotation.y += delta * 0.4;
        const activeNodeIdx = Math.floor((time * 1.5) % nodeCount);
        const nextNode = nodes[activeNodeIdx];

        // Animate pulse traveling from hub to active node
        const t = (time * 1.5) % 1.0;
        pulseMesh.position.lerpVectors(new THREE.Vector3(0, 0, 0), nextNode, t);

        // Illuminating wave across nodes
        for (let i = 0; i < nodeCount; i++) {
          const isIlluminated = i === activeNodeIdx;
          const targetScale = isIlluminated ? 1.35 : 1.0;
          nodeMeshes[i].scale.setScalar(
            THREE.MathUtils.damp(nodeMeshes[i].scale.x, targetScale, 6, delta)
          );
          lineMaterials[i].opacity = isIlluminated ? 0.95 : 0.35;
        }
      });
    }

    // FLAGSHIP 3: TrafficGuard Pro
    else if (flagshipId === 'trafficguard-pro') {
      const gridHelper = new THREE.GridHelper(5.5, 14, 0xef4444, 0x334155);
      gridHelper.position.y = -0.5;
      group.add(gridHelper);
      disposables.push(gridHelper.geometry, gridHelper.material as THREE.Material);

      const boxGeo = new THREE.BoxGeometry(0.55, 0.32, 0.95);
      const boxMat = new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        metalness: 0.9,
        roughness: 0.2,
      });
      const wireNormalMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, wireframe: true });
      const wireAlertMat = new THREE.MeshBasicMaterial({ color: 0xef4444, wireframe: true });
      disposables.push(boxGeo, boxMat, wireNormalMat, wireAlertMat);

      // Vehicle 1
      const car1 = new THREE.Mesh(boxGeo, boxMat);
      group.add(car1);
      const detection1 = new THREE.Mesh(boxGeo, wireNormalMat);
      detection1.scale.setScalar(1.25);
      car1.add(detection1);

      // Vehicle 2
      const car2 = new THREE.Mesh(boxGeo, boxMat);
      group.add(car2);
      const detection2 = new THREE.Mesh(boxGeo, wireAlertMat);
      detection2.scale.setScalar(1.25);
      car2.add(detection2);

      // Radar scanning cone
      const arcGeo = new THREE.ConeGeometry(2.8, 3.8, 32, 1, true);
      const arcMat = new THREE.MeshBasicMaterial({
        color: 0x06b6d4,
        transparent: true,
        opacity: 0.15,
        side: THREE.DoubleSide,
      });
      const radarCone = new THREE.Mesh(arcGeo, arcMat);
      radarCone.position.set(0, 1.8, 0);
      radarCone.rotation.x = Math.PI;
      group.add(radarCone);
      disposables.push(arcGeo, arcMat);

      updateCallbacks.push((time, delta) => {
        // Vehicle 1 moves forward along lane 1
        const lane1Z = ((time * 1.8) % 6) - 3;
        car1.position.set(-1.1, -0.32, lane1Z);

        // Vehicle 2 moves along lane 2 with alert status near trigger zone
        const lane2Z = 3 - ((time * 1.5) % 6);
        car2.position.set(1.1, -0.32, lane2Z);

        // Radar 360-degree sweep
        radarCone.rotation.y += delta * 1.8;
      });
    }

    // FLAGSHIP 4: ResQMap
    else {
      const terrainGeo = new THREE.PlaneGeometry(4.8, 4.8, 28, 28);
      const posAttr = terrainGeo.attributes.position;
      const initialZ = new Float32Array(posAttr.count);

      for (let i = 0; i < posAttr.count; i++) {
        const vx = posAttr.getX(i);
        const vy = posAttr.getY(i);
        const vz = Math.sin(vx * 1.5) * 0.42 + Math.cos(vy * 1.8) * 0.38 + Math.sin(vx * vy * 0.8) * 0.22;
        posAttr.setZ(i, vz);
        initialZ[i] = vz;
      }
      terrainGeo.computeVertexNormals();

      const terrainMat = new THREE.MeshStandardMaterial({
        color: 0x1e293b,
        wireframe: true,
        roughness: 0.6,
      });
      const terrain = new THREE.Mesh(terrainGeo, terrainMat);
      terrain.rotation.x = -Math.PI / 2.3;
      terrain.position.y = -0.4;
      group.add(terrain);
      disposables.push(terrainGeo, terrainMat);

      // Emergency SOS Pin
      const pinGeo = new THREE.ConeGeometry(0.18, 0.6, 16);
      const pinMat = new THREE.MeshStandardMaterial({
        color: 0xef4444,
        emissive: 0xb91c1c,
        emissiveIntensity: 0.9,
      });
      const pin = new THREE.Mesh(pinGeo, pinMat);
      pin.position.set(0.3, 0.4, 0.2);
      pin.rotation.x = Math.PI;
      group.add(pin);
      disposables.push(pinGeo, pinMat);

      // Beacon expanding ring
      const beaconRingGeo = new THREE.RingGeometry(0.15, 0.22, 24);
      const beaconRingMat = new THREE.MeshBasicMaterial({
        color: 0xef4444,
        transparent: true,
        opacity: 0.8,
        side: THREE.DoubleSide,
      });
      const beaconRing = new THREE.Mesh(beaconRingGeo, beaconRingMat);
      beaconRing.rotation.x = -Math.PI / 2.3;
      beaconRing.position.set(0.3, 0.1, 0.2);
      group.add(beaconRing);
      disposables.push(beaconRingGeo, beaconRingMat);

      // Safe route curve
      const points = [
        new THREE.Vector3(-1.8, -0.2, 1.2),
        new THREE.Vector3(-0.8, 0.1, 0.6),
        new THREE.Vector3(0.3, 0.4, 0.2),
        new THREE.Vector3(1.5, -0.1, -0.8),
      ];
      const curve = new THREE.CatmullRomCurve3(points);
      const tubeGeo = new THREE.TubeGeometry(curve, 36, 0.04, 8, false);
      const tubeMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
      const pathTube = new THREE.Mesh(tubeGeo, tubeMat);
      group.add(pathTube);
      disposables.push(tubeGeo, tubeMat);

      // Moving rescue beacon along path
      const rescueBeadGeo = new THREE.SphereGeometry(0.08, 12, 12);
      const rescueBeadMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const rescueBead = new THREE.Mesh(rescueBeadGeo, rescueBeadMat);
      group.add(rescueBead);
      disposables.push(rescueBeadGeo, rescueBeadMat);

      updateCallbacks.push((time, delta) => {
        // Beacon ring pulse
        const ringScale = 1 + ((time * 1.8) % 1.5);
        beaconRing.scale.setScalar(ringScale);
        beaconRingMat.opacity = Math.max(0, 1 - ((time * 1.8) % 1.5) / 1.5);

        // Rescue vehicle bead traverses curve
        const progress = (time * 0.3) % 1.0;
        const beadPos = curve.getPointAt(progress);
        rescueBead.position.copy(beadPos);

        // Subtle topographic wave breathing
        const wave = Math.sin(time * 1.5) * 0.05;
        terrain.position.y = -0.4 + wave;
      });
    }

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 400;
      const h = container.clientHeight || 300;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Pause the render loop while the stage is scrolled out of view
    let isStageVisible = true;
    const visibilityObserver = new IntersectionObserver(
      (entries) => {
        isStageVisible = entries.some((entry) => entry.isIntersecting);
      },
      { threshold: 0.02 }
    );
    visibilityObserver.observe(container);

    let frameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      if (!isStageVisible) return;

      const delta = Math.min(clock.getDelta(), 0.1);
      const time = clock.getElapsedTime();

      group.rotation.y += delta * 0.32;

      // Cinematic scale-in entrance
      if (!reducedMotion) {
        const intro = Math.min(1, time / 0.9);
        group.scale.setScalar(0.85 + 0.15 * (1 - Math.pow(1 - intro, 3)));
      }

      for (const cb of updateCallbacks) {
        cb(time, delta);
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameId);
      visibilityObserver.disconnect();
      window.removeEventListener('resize', handleResize);
      for (const d of disposables) {
        d.dispose();
      }
      renderer.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [flagshipId]);

  return (
    <div
      ref={mountRef}
      className="w-full h-64 sm:h-72 rounded-xl overflow-hidden border border-neutral-800/80 bg-[#060911]/90 relative shadow-inner"
      aria-label={`3D simulation view for ${flagshipId}`}
      role="img"
    >
      <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-neutral-900/90 border border-neutral-800 text-[10px] font-mono text-cyan-400 z-10 flex items-center gap-1.5 shadow-md">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 inline-block animate-pulse" />
        <span>3D SIMULATION LIVE</span>
      </div>
    </div>
  );
};
