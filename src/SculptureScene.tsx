import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { sceneAnchors, sceneScroll } from "./sceneInputs";

type Props = {
  variant: "orbit" | "stack" | "portal";
  motion: boolean;
  className?: string;
};

type AnimatedPart = {
  object: THREE.Object3D;
  update: (time: number) => void;
};

const palette = {
  cream: "#fff3dc",
  mint: "#b9f3d3",
  coral: "#ff8269",
  graphite: "#242d2a",
  silver: "#d0dad4",
};

function plate(width: number, height: number, depth: number, radius: number) {
  const shape = new THREE.Shape();
  const left = -width / 2;
  const bottom = -height / 2;
  shape.moveTo(left + radius, bottom);
  shape.lineTo(left + width - radius, bottom);
  shape.quadraticCurveTo(left + width, bottom, left + width, bottom + radius);
  shape.lineTo(left + width, bottom + height - radius);
  shape.quadraticCurveTo(
    left + width,
    bottom + height,
    left + width - radius,
    bottom + height,
  );
  shape.lineTo(left + radius, bottom + height);
  shape.quadraticCurveTo(left, bottom + height, left, bottom + height - radius);
  shape.lineTo(left, bottom + radius);
  shape.quadraticCurveTo(left, bottom, left + radius, bottom);
  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: true,
    bevelThickness: 0.065,
    bevelSize: 0.065,
    bevelSegments: 3,
    curveSegments: 10,
    steps: 1,
  });
  geometry.translate(0, 0, -depth / 2);
  return geometry;
}

function surfaceTexture(kind: "ceramic" | "brushed" | "etched") {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 256;
  const context = canvas.getContext("2d")!;
  context.fillStyle = kind === "brushed" ? "#999999" : "#c0c0c0";
  context.fillRect(0, 0, 256, 256);
  let seed = 82731;
  const random = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
  if (kind === "brushed") {
    for (let y = 0; y < 256; y++) {
      const value = Math.floor(112 + random() * 75);
      context.strokeStyle = `rgb(${value},${value},${value})`;
      context.lineWidth = 0.6;
      context.beginPath();
      context.moveTo(0, y + random());
      context.lineTo(256, y + random());
      context.stroke();
    }
    // A few longer tool marks sit over the fine directional grain.
    context.strokeStyle = "rgba(48,48,48,0.14)";
    context.lineWidth = 0.35;
    for (let i = 0; i < 34; i++) {
      const y = random() * 256;
      const x = random() * 210;
      context.beginPath();
      context.moveTo(x, y);
      context.lineTo(Math.min(256, x + 20 + random() * 90), y + 0.2);
      context.stroke();
    }
  } else {
    for (let i = 0; i < 7000; i++) {
      const value = Math.floor(152 + random() * 75);
      context.fillStyle = `rgb(${value},${value},${value})`;
      context.fillRect(random() * 256, random() * 256, 0.8, 0.8);
    }
  }
  if (kind === "etched") {
    context.strokeStyle = "#777777";
    context.lineWidth = 1;
    for (let i = 0; i < 8; i++) {
      context.beginPath();
      context.moveTo(8 + i * 28, 8);
      context.lineTo(8 + i * 28, 70 + i * 9);
      context.lineTo(22 + i * 28, 85 + i * 9);
      context.lineTo(22 + i * 28, 244);
      context.stroke();
    }
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(kind === "etched" ? 2 : 3, kind === "brushed" ? 1 : 3);
  return texture;
}

function circuitryTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 384;
  const context = canvas.getContext("2d")!;
  context.strokeStyle = "rgba(186,243,212,0.52)";
  context.lineWidth = 2;
  const paths = [
    [24, 80, 84, 80, 116, 112, 182, 112],
    [24, 130, 68, 130, 100, 162, 182, 162],
    [24, 200, 116, 200, 140, 176, 182, 176],
    [330, 112, 398, 112, 428, 82, 488, 82],
    [330, 146, 376, 146, 408, 178, 488, 178],
    [330, 176, 374, 176, 420, 222, 488, 222],
    [220, 244, 220, 300, 182, 338, 86, 338],
    [278, 244, 278, 286, 316, 324, 428, 324],
  ];
  paths.forEach((points) => {
    context.beginPath();
    context.moveTo(points[0], points[1]);
    for (let i = 2; i < points.length; i += 2)
      context.lineTo(points[i], points[i + 1]);
    context.stroke();
    context.beginPath();
    context.arc(points[0], points[1], 4, 0, Math.PI * 2);
    context.stroke();
  });
  context.strokeStyle = "rgba(255,243,220,0.34)";
  context.strokeRect(178, 102, 156, 144);
  context.strokeRect(186, 110, 140, 128);
  for (let i = 0; i < 6; i++) {
    context.fillStyle = "rgba(255,243,220,0.42)";
    context.fillRect(195 + i * 22, 91, 10, 7);
    context.fillRect(195 + i * 22, 250, 10, 7);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/** Original, decorative studio sculptures. No downloaded models or textures. */
export default function SculptureScene({
  variant,
  motion,
  className = "",
}: Props) {
  const host = useRef<HTMLDivElement>(null);
  const motionRef = useRef(motion);
  const scheduleRef = useRef<() => void>(() => {});
  const [status, setStatus] = useState<"waiting" | "ready" | "fallback">(
    "waiting",
  );

  useEffect(() => {
    motionRef.current = motion;
    scheduleRef.current();
  }, [motion]);

  useEffect(() => {
    const element = host.current!;
    let teardown = () => {};
    let mounted = false;
    const initialize = () => {
      if (mounted) return;
      mounted = true;
      let renderer: THREE.WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({
          antialias: true,
          alpha: true,
          powerPreference: "low-power",
        });
      } catch {
        setStatus("fallback");
        return;
      }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
      renderer.setClearColor(0x000000, 0);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.18;
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFShadowMap;
      renderer.domElement.setAttribute("aria-hidden", "true");
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";
      renderer.domElement.style.display = "block";
      element.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(33, 1, 0.1, 60);
      const sculpture = new THREE.Group();
      const animated: AnimatedPart[] = [];
      scene.add(sculpture);
      const geometryCache = new Set<THREE.BufferGeometry>();
      const materialCache = new Set<THREE.Material>();
      const textureCache = new Set<THREE.Texture>();
      const ceramicTexture = surfaceTexture("ceramic");
      const brushedTexture = surfaceTexture("brushed");
      const etchedTexture = surfaceTexture("etched");
      [ceramicTexture, brushedTexture, etchedTexture].forEach((texture) => {
        texture.anisotropy = Math.min(
          renderer.capabilities.getMaxAnisotropy(),
          4,
        );
        textureCache.add(texture);
      });
      const environmentScene = new THREE.Scene();
      environmentScene.background = new THREE.Color("#29342e");
      const panelGeometry = new THREE.PlaneGeometry(12, 8);
      const panelMaterial = new THREE.MeshBasicMaterial({
        color: "#fff4de",
        side: THREE.DoubleSide,
      });
      const panel = new THREE.Mesh(panelGeometry, panelMaterial);
      panel.position.set(-4, 6, 5);
      panel.lookAt(0, 0, 0);
      environmentScene.add(panel);
      const secondPanel = new THREE.Mesh(
        panelGeometry,
        new THREE.MeshBasicMaterial({
          color: "#b9f3d3",
          side: THREE.DoubleSide,
        }),
      );
      secondPanel.position.set(5, 0, -5);
      secondPanel.lookAt(0, 0, 0);
      environmentScene.add(secondPanel);
      const pmrem = new THREE.PMREMGenerator(renderer);
      const environment = pmrem.fromScene(environmentScene, 0.045);
      scene.environment = environment.texture;
      panelGeometry.dispose();
      panelMaterial.dispose();
      (secondPanel.material as THREE.Material).dispose();
      pmrem.dispose();

      scene.add(new THREE.HemisphereLight(0xfff4e2, 0x16251e, 2));
      const key = new THREE.DirectionalLight(0xffe9d0, 4.1);
      key.position.set(-4, 7, 7);
      key.castShadow = true;
      key.shadow.mapSize.set(512, 512);
      key.shadow.camera.left = -6;
      key.shadow.camera.right = 6;
      key.shadow.camera.top = 6;
      key.shadow.camera.bottom = -6;
      key.shadow.bias = -0.0005;
      key.shadow.normalBias = 0.018;
      scene.add(key);
      const rim = new THREE.DirectionalLight(0xb9f3d3, 3.7);
      rim.position.set(5, 3, -4);
      scene.add(rim);
      const coralFill = new THREE.PointLight(0xff8269, 11, 15, 2);
      coralFill.position.set(-4, -1, 2);
      scene.add(coralFill);

      const material = (
        color: string,
        metalness = 0.15,
        roughness = 0.36,
        glow = false,
      ) => {
        const value = new THREE.MeshPhysicalMaterial({
          color,
          metalness,
          roughness,
          clearcoat: metalness > 0.7 ? 0.16 : 0.42,
          clearcoatRoughness: 0.25,
          envMapIntensity: 1.15,
          anisotropy: metalness > 0.7 ? 0.48 : 0,
          anisotropyRotation: Math.PI / 2,
          bumpMap: metalness > 0.7 ? brushedTexture : ceramicTexture,
          bumpScale: metalness > 0.7 ? 0.013 : 0.012,
          roughnessMap: metalness > 0.7 ? brushedTexture : ceramicTexture,
          ...(glow ? { emissive: color, emissiveIntensity: 0.2 } : {}),
        });
        materialCache.add(value);
        return value;
      };
      const cream = material(palette.cream);
      const mint = material(palette.mint, 0.18, 0.32, true);
      const coral = material(palette.coral, 0.1, 0.38);
      const dark = material(palette.graphite, 0.52, 0.4);
      const metal = material(palette.silver, 0.93, 0.3);
      const satin = material("#737e77", 0.85, 0.46);
      const etched = material("#3e5147", 0.7, 0.38);
      etched.bumpMap = etchedTexture;
      etched.bumpScale = 0.014;
      const lens = material("#244a41", 0.72, 0.08, true);
      lens.clearcoat = 1;
      lens.clearcoatRoughness = 0.06;
      lens.iridescence = 0.14;
      lens.iridescenceIOR = 1.35;
      const mesh = (
        geometry: THREE.BufferGeometry,
        surface: THREE.Material,
        parent: THREE.Object3D = sculpture,
      ) => {
        geometryCache.add(geometry);
        const value = new THREE.Mesh(geometry, surface);
        value.castShadow = true;
        value.receiveShadow = true;
        parent.add(value);
        return value;
      };
      const sphereGeometry = new THREE.SphereGeometry(1, 28, 18);
      const sphere = (
        radius: number,
        surface: THREE.Material,
        parent?: THREE.Object3D,
      ) => {
        const value = mesh(sphereGeometry, surface, parent);
        value.scale.setScalar(radius);
        return value;
      };
      const ring = (
        radius: number,
        thickness: number,
        surface: THREE.Material,
        parent?: THREE.Object3D,
      ) =>
        mesh(
          new THREE.TorusGeometry(radius, thickness, 12, 84),
          surface,
          parent,
        );
      const cylinder = (
        radius: number,
        depth: number,
        surface: THREE.Material,
        parent: THREE.Object3D,
      ) => {
        const value = mesh(
          new THREE.CylinderGeometry(radius, radius, depth, 32),
          surface,
          parent,
        );
        value.rotation.x = Math.PI / 2;
        return value;
      };
      const tickMarks = (
        radius: number,
        count: number,
        parent: THREE.Object3D,
        surface: THREE.Material = metal,
      ) => {
        const geometry = new THREE.BoxGeometry(0.027, 0.11, 0.023);
        geometryCache.add(geometry);
        const ticks = new THREE.InstancedMesh(geometry, surface, count);
        const dummy = new THREE.Object3D();
        for (let i = 0; i < count; i++) {
          const angle = (i * Math.PI * 2) / count;
          dummy.position.set(
            Math.cos(angle) * radius,
            Math.sin(angle) * radius,
            0.02,
          );
          dummy.rotation.z = angle - Math.PI / 2;
          dummy.scale.y = i % 4 === 0 ? 1 : 0.55;
          dummy.updateMatrix();
          ticks.setMatrixAt(i, dummy.matrix);
        }
        parent.add(ticks);
        return ticks;
      };
      const boltGeometry = new THREE.CylinderGeometry(0.044, 0.044, 0.025, 8);
      const boltSlotGeometry = new THREE.BoxGeometry(0.043, 0.007, 0.004);
      const bolt = (
        x: number,
        y: number,
        z: number,
        parent: THREE.Object3D,
      ) => {
        const head = mesh(boltGeometry, metal, parent);
        head.rotation.x = Math.PI / 2;
        head.position.set(x, y, z);
        head.castShadow = false;
        const slot = mesh(boltSlotGeometry, dark, parent);
        slot.position.set(x, y, z + 0.016);
        slot.rotation.z = (x + y) * 2;
        slot.castShadow = false;
      };
      const band = (
        radius: number,
        thickness: number,
        surface: THREE.Material,
        parent: THREE.Object3D,
        arc: number,
        angle: number,
      ) => {
        const value = mesh(
          new THREE.TorusGeometry(radius, thickness, 10, 42, arc),
          surface,
          parent,
        );
        value.rotation.z = angle;
        return value;
      };

      if (variant === "orbit") {
        const core = new THREE.Group();
        sculpture.add(core);
        core.rotation.set(0.2, 0.4, -0.28);
        mesh(plate(1.58, 1.58, 1.25, 0.28), cream, core);
        const rear = mesh(plate(1.6, 1.6, 0.12, 0.28), satin, core);
        rear.position.z = -0.57;
        const face = mesh(plate(1.35, 1.35, 0.055, 0.22), etched, core);
        face.position.z = 0.69;
        const bezel = cylinder(0.57, 0.17, dark, core);
        bezel.position.z = 0.79;
        const outerLip = ring(0.55, 0.042, metal, core);
        outerLip.position.z = 0.88;
        const innerLip = ring(0.39, 0.045, mint, core);
        innerLip.position.z = 0.92;
        const centerDot = sphere(0.32, lens, core);
        centerDot.position.z = 0.92;
        centerDot.scale.z = 0.12;
        tickMarks(0.47, 32, outerLip, cream);
        for (const x of [-0.55, 0.55]) {
          for (const y of [-0.55, 0.55]) bolt(x, y, 0.76, core);
        }
        const ventGeometry = new THREE.BoxGeometry(0.018, 0.66, 0.055);
        for (let i = 0; i < 7; i++) {
          const vent = mesh(ventGeometry, dark, core);
          vent.rotation.y = Math.PI / 2;
          vent.position.set(0.84, 0, -0.32 + i * 0.105);
          vent.castShadow = false;
        }
        const signal = band(
          0.48,
          0.025,
          coral,
          core,
          Math.PI * 0.45,
          Math.PI * 0.6,
        );
        signal.position.z = 0.99;
        const gyro = new THREE.Group();
        sculpture.add(gyro);
        const mintRing = ring(2.45, 0.19, mint, gyro);
        mintRing.rotation.set(0.45, 0.78, 0.15);
        const ringSeam = ring(2.45, 0.018, satin, mintRing);
        ringSeam.position.z = 0.195;
        tickMarks(2.45, 48, ringSeam, dark);
        for (let i = 0; i < 4; i++) {
          const angle = (i * Math.PI) / 2;
          const clamp = mesh(plate(0.34, 0.3, 0.16, 0.055), dark, mintRing);
          clamp.position.set(
            Math.cos(angle) * 2.45,
            Math.sin(angle) * 2.45,
            0.09,
          );
          clamp.rotation.z = angle;
          bolt(0, 0, 0.115, clamp);
        }
        const ivoryRing = ring(2.12, 0.09, cream, gyro);
        ivoryRing.rotation.set(0.8, -0.65, -0.25);
        band(2.12, 0.094, coral, ivoryRing, Math.PI * 0.28, 0.2);
        band(2.12, 0.094, metal, ivoryRing, Math.PI * 0.18, Math.PI * 1.2);
        const fineRing = ring(2.93, 0.025, metal, gyro);
        fineRing.rotation.set(1.0, 0.25, 0.4);
        const track = new THREE.Group();
        sculpture.add(track);
        track.rotation.set(0.72, -0.3, 0.2);
        const coralSatellite = sphere(0.32, coral, track);
        const ivorySatellite = sphere(0.2, cream, track);
        const metallicSatellite = sphere(0.12, metal, track);
        const satelliteBelt = ring(1.01, 0.085, dark, coralSatellite);
        satelliteBelt.rotation.x = 0.8;
        ring(1.015, 0.05, metal, ivorySatellite).rotation.x = 0.4;
        const satelliteLight = sphere(0.17, mint, coralSatellite);
        satelliteLight.position.set(0, 0, 1);
        animated.push({
          object: core,
          update: (t) => {
            core.rotation.y = 0.4 + Math.sin(t * 0.25) * 0.38;
            core.rotation.x = 0.2 + Math.sin(t * 0.4) * 0.15;
            core.rotation.z = -0.28 + Math.sin(t * 0.25 + 0.8) * 0.045;
            core.position.z = Math.sin(t * 0.25 + 0.4) * 0.065;
            signal.rotation.z = Math.PI * 0.6 + t * 0.12;
          },
        });
        animated.push({
          object: gyro,
          update: (t) => {
            gyro.rotation.y = Math.sin(t * 0.25) * 0.14;
            gyro.rotation.x = Math.sin(t * 0.25 + 1.3) * 0.045;
            gyro.rotation.z = t * 0.04;
            ivoryRing.rotation.y = -0.65 + Math.sin(t * 0.25 + 0.9) * 0.075;
            fineRing.rotation.x = 1 + Math.sin(t * 0.25 + 2.1) * 0.08;
          },
        });
        animated.push({
          object: track,
          update: (t) => {
            const angle = t * 0.22;
            track.rotation.x = 0.72 + Math.sin(t * 0.25 + 0.5) * 0.045;
            track.rotation.y = -0.3 + Math.sin(t * 0.25 + 1.7) * 0.035;
            coralSatellite.rotation.y = Math.sin(t * 0.3) * 0.24;
            coralSatellite.position.set(
              Math.cos(angle) * 2.92,
              Math.sin(angle) * 2.92,
              0,
            );
            ivorySatellite.position.set(
              Math.cos(angle + 2.5) * 2.92,
              Math.sin(angle + 2.5) * 2.92,
              0,
            );
            metallicSatellite.position.set(
              Math.cos(angle + 4.5) * 2.92,
              Math.sin(angle + 4.5) * 2.92,
              0,
            );
          },
        });
        const dust = new THREE.InstancedMesh(sphereGeometry, metal, 28);
        geometryCache.add(sphereGeometry);
        sculpture.add(dust);
        const dustTransform = new THREE.Object3D();
        for (let i = 0; i < 28; i++) {
          const angle = i * 2.399;
          dustTransform.position.set(
            Math.cos(angle) * (3.45 + (i % 4) * 0.2),
            Math.sin(angle) * 2.9,
            Math.sin(i * 4) * 0.7 - 1.4,
          );
          dustTransform.scale.setScalar(i % 5 === 0 ? 0.032 : 0.016);
          dustTransform.updateMatrix();
          dust.setMatrixAt(i, dustTransform.matrix);
        }
      } else if (variant === "stack") {
        sculpture.rotation.set(-0.18, -0.5, 0.06);
        const stack = new THREE.Group();
        sculpture.add(stack);
        const circuitMap = circuitryTexture();
        circuitMap.anisotropy = Math.min(
          renderer.capabilities.getMaxAnisotropy(),
          4,
        );
        textureCache.add(circuitMap);
        const circuitMaterial = new THREE.MeshBasicMaterial({
          map: circuitMap,
          transparent: true,
          depthWrite: false,
          polygonOffset: true,
          polygonOffsetFactor: -1,
        });
        materialCache.add(circuitMaterial);
        const layers = [etched, mint, cream];
        layers.forEach((surface, i) => {
          const layer = new THREE.Group();
          stack.add(layer);
          const slab = mesh(plate(3.2, 2.4, 0.18, 0.3), surface, layer);
          slab.rotation.x = -Math.PI / 2;
          const chassis = mesh(
            plate(3.22, 2.42, 0.07, 0.3),
            i === 0 ? metal : dark,
            layer,
          );
          chassis.rotation.x = -Math.PI / 2;
          chassis.position.y = -0.105;
          const initialY = -1.3 + i * 1.25;
          layer.position.y = initialY;
          layer.rotation.y = (i - 1) * 0.12;
          const badge = ring(0.31, 0.055, i === 2 ? mint : metal, layer);
          badge.rotation.x = -Math.PI / 2;
          badge.position.set(-0.93, 0.18, 0.58);
          tickMarks(0.3, 16, badge, i === 0 ? mint : dark);
          const badgeCenter = cylinder(
            0.16,
            0.035,
            i === 0 ? mint : dark,
            badge,
          );
          badgeCenter.rotation.x = Math.PI / 2;
          badgeCenter.position.z = 0.025;
          const screwPlane = new THREE.Group();
          screwPlane.position.y = 0.16;
          screwPlane.rotation.x = -Math.PI / 2;
          layer.add(screwPlane);
          for (const x of [-1.3, 1.3]) {
            for (const y of [-0.88, 0.88]) bolt(x, y, 0, screwPlane);
          }
          const channel = mesh(
            new THREE.BoxGeometry(2.15, 0.012, 0.018),
            metal,
            layer,
          );
          channel.position.set(0, 0.16, -0.98);
          channel.castShadow = false;
          const portGeometry = new THREE.BoxGeometry(0.28, 0.065, 0.018);
          for (let p = 0; p < 4; p++) {
            const port = mesh(portGeometry, dark, layer);
            port.position.set(-0.45 + p * 0.4, 0.025, 1.245);
            port.castShadow = false;
          }
          const barGeometry = plate(1.1, 0.11, 0.035, 0.04);
          for (let j = 0; j < 3; j++) {
            const bar = mesh(barGeometry, i === 0 ? mint : dark, layer);
            bar.rotation.x = -Math.PI / 2;
            bar.scale.x = 1 - j * 0.18;
            bar.position.set(0.38, 0.16, -0.2 + j * 0.32);
          }
          if (i === 0) {
            const circuits = mesh(
              new THREE.PlaneGeometry(2.9, 2.15),
              circuitMaterial,
              layer,
            );
            circuits.rotation.x = -Math.PI / 2;
            circuits.position.y = 0.164;
            circuits.castShadow = false;
            const chip = mesh(plate(0.83, 0.83, 0.055, 0.07), dark, layer);
            chip.rotation.x = -Math.PI / 2;
            chip.position.set(-0.1, 0.21, -0.3);
            const chipLid = mesh(plate(0.64, 0.64, 0.018, 0.07), satin, layer);
            chipLid.rotation.x = -Math.PI / 2;
            chipLid.position.set(-0.1, 0.25, -0.3);
            const chipAccent = ring(0.14, 0.024, mint, layer);
            chipAccent.rotation.x = -Math.PI / 2;
            chipAccent.position.set(-0.1, 0.274, -0.3);
          } else {
            const inset = mesh(
              plate(1.88, 0.53, 0.025, 0.09),
              i === 1 ? dark : satin,
              layer,
            );
            inset.rotation.x = -Math.PI / 2;
            inset.position.set(0.05, 0.15, -0.6);
            for (let v = 0; v < 5; v++) {
              const vent = mesh(
                new THREE.BoxGeometry(0.055, 0.013, 0.29),
                i === 1 ? mint : dark,
                layer,
              );
              vent.position.set(-0.58 + v * 0.28, 0.183, -0.6);
              vent.castShadow = false;
            }
          }
          animated.push({
            object: layer,
            update: (t) => {
              const wave = t * 0.48 - i * 0.45;
              layer.position.y = initialY + Math.sin(wave) * 0.11;
              layer.position.x = Math.sin(wave + 0.8) * 0.035;
              layer.rotation.y = (i - 1) * 0.12 + Math.sin(wave + 0.65) * 0.045;
              layer.rotation.z = Math.sin(wave) * 0.012;
            },
          });
        });
        const conduitMaterial = material(palette.mint, 0.15, 0.2, true);
        for (const x of [-1.16, 1.16]) {
          const spine = mesh(
            new THREE.CylinderGeometry(0.024, 0.024, 3.05, 8),
            metal,
            stack,
          );
          spine.position.set(x, 0, -0.8);
          for (const y of [-1.36, -0.11, 1.14]) {
            const collar = mesh(
              new THREE.CylinderGeometry(0.075, 0.075, 0.12, 16),
              satin,
              stack,
            );
            collar.position.set(x, y, -0.8);
          }
          const connection = sphere(0.09, conduitMaterial, stack);
          connection.position.set(x, 0, -0.8);
          animated.push({
            object: connection,
            update: (t) => {
              connection.position.y = Math.sin(t * 0.75 + x) * 1.2;
              connection.scale.setScalar(0.09 + Math.sin(t * 0.75 + x) * 0.009);
              conduitMaterial.emissiveIntensity =
                0.3 + Math.sin(t * 0.75) * 0.1;
            },
          });
        }
        const orbit = ring(2.55, 0.018, metal);
        orbit.rotation.set(0.42, 0.4, 0.18);
        const node = sphere(0.24, coral);
        animated.push({
          object: node,
          update: (t) => {
            node.position.set(
              Math.cos(t * 0.3) * 2.65,
              Math.sin(t * 0.3) * 2.3,
              0.5,
            );
          },
        });
        const littleCube = mesh(plate(0.6, 0.6, 0.5, 0.1), coral);
        littleCube.position.set(-2.18, 1.9, -0.3);
        littleCube.rotation.set(0.5, 0.4, 0.6);
        const cubeFace = mesh(plate(0.4, 0.4, 0.02, 0.055), dark, littleCube);
        cubeFace.position.z = 0.315;
        ring(0.11, 0.021, mint, cubeFace).position.z = 0.036;
        animated.push({
          object: littleCube,
          update: (t) => {
            littleCube.rotation.y = 0.4 + Math.sin(t * 0.48 + 0.8) * 0.32;
            littleCube.rotation.z = 0.6 + Math.sin(t * 0.48 + 1.3) * 0.06;
            littleCube.position.y = 1.9 + Math.sin(t * 0.65) * 0.12;
          },
        });
      } else {
        sculpture.rotation.set(0.05, -0.24, -0.12);
        const portals = new THREE.Group();
        sculpture.add(portals);
        const outer = ring(2.23, 0.18, cream, portals);
        const backRail = ring(2.23, 0.17, dark, portals);
        backRail.position.z = -0.22;
        const outerSeam = ring(2.23, 0.025, metal, outer);
        outerSeam.position.z = 0.19;
        const energySweep = band(2.23, 0.012, mint, outer, Math.PI * 0.28, 0);
        energySweep.position.z = 0.22;
        energySweep.castShadow = false;
        tickMarks(2.22, 64, outerSeam, dark);
        band(2.23, 0.182, coral, outer, Math.PI * 0.19, Math.PI * 0.9);
        for (let i = 0; i < 4; i++) {
          const angle = (i * Math.PI) / 2 + Math.PI / 4;
          const mount = mesh(plate(0.28, 0.42, 0.24, 0.05), satin, outer);
          mount.position.set(
            Math.cos(angle) * 2.23,
            Math.sin(angle) * 2.23,
            0.01,
          );
          mount.rotation.z = angle - Math.PI / 2;
          bolt(0, 0.1, 0.16, mount);
          bolt(0, -0.1, 0.16, mount);
        }
        const middle = ring(1.85, 0.075, metal, portals);
        middle.rotation.set(0.22, -0.25, 0);
        band(1.85, 0.079, dark, middle, Math.PI * 0.4, Math.PI * 0.1);
        tickMarks(1.85, 40, middle, cream);
        const inner = ring(1.47, 0.21, mint, portals);
        inner.rotation.set(-0.32, 0.35, 0);
        const innerRail = ring(1.47, 0.044, dark, inner);
        innerRail.position.z = 0.204;
        tickMarks(1.47, 40, innerRail, metal);
        const center = sphere(0.63, dark, portals);
        center.scale.set(0.63, 0.63, 0.63);
        const centerHousing = ring(0.66, 0.06, satin, portals);
        centerHousing.rotation.set(0.32, -0.15, -0.25);
        const lensMount = cylinder(0.29, 0.12, metal, portals);
        lensMount.position.z = 0.58;
        const centerLens = sphere(0.235, lens, portals);
        centerLens.position.z = 0.66;
        centerLens.scale.z = 0.05;
        const lensLight = ring(0.23, 0.026, mint, portals);
        lensLight.position.z = 0.68;
        const vaneProfile = new THREE.Shape();
        vaneProfile.moveTo(0.6, -0.055);
        vaneProfile.quadraticCurveTo(0.98, -0.065, 1.3, 0.22);
        vaneProfile.quadraticCurveTo(1.35, 0.26, 1.31, 0.32);
        vaneProfile.lineTo(1.265, 0.385);
        vaneProfile.quadraticCurveTo(0.99, 0.175, 0.615, 0.095);
        vaneProfile.quadraticCurveTo(0.58, 0.035, 0.6, -0.055);
        const bladeGeometry = new THREE.ExtrudeGeometry(vaneProfile, {
          depth: 0.065,
          bevelEnabled: true,
          bevelThickness: 0.018,
          bevelSize: 0.018,
          bevelSegments: 2,
          curveSegments: 12,
          steps: 1,
        });
        bladeGeometry.translate(0, 0, -0.0325);
        // A gentle radial pitch catches the studio panels along the milled edge.
        bladeGeometry.rotateY(-0.18);
        geometryCache.add(bladeGeometry);
        const vaneMaterial = material("#bccbc1", 0.74, 0.28);
        const blades = new THREE.InstancedMesh(bladeGeometry, vaneMaterial, 12);
        const bladeTransform = new THREE.Object3D();
        for (let i = 0; i < 12; i++) {
          const angle = (i * Math.PI * 2) / 12;
          bladeTransform.position.set(0, 0, -0.07);
          bladeTransform.rotation.set(0, 0, angle);
          bladeTransform.updateMatrix();
          blades.setMatrixAt(i, bladeTransform.matrix);
        }
        portals.add(blades);
        const centerRing = ring(0.82, 0.035, coral, portals);
        centerRing.rotation.set(0.55, 0.62, 0);
        const satellites = new THREE.Group();
        portals.add(satellites);
        for (let i = 0; i < 9; i++) {
          const dot = sphere(
            i === 0 ? 0.18 : 0.065,
            i === 0 ? coral : cream,
            satellites,
          );
          const angle = i * ((Math.PI * 2) / 9);
          dot.position.set(
            Math.cos(angle) * 2.72,
            Math.sin(angle) * 2.72,
            (i % 2) * 0.15,
          );
          if (i === 0) {
            const belt = ring(1.01, 0.08, metal, dot);
            belt.rotation.x = 0.8;
            sphere(0.18, mint, dot).position.z = 1;
          }
        }
        animated.push({
          object: satellites,
          update: (t) => {
            satellites.rotation.z = t * 0.11;
            satellites.rotation.x = Math.sin(t * 0.32 + 1.2) * 0.035;
          },
        });
        animated.push({
          object: middle,
          update: (t) => {
            middle.rotation.x = 0.22 + Math.sin(t * 0.32) * 0.19;
            middle.rotation.y = -0.25 + Math.sin(t * 0.32 + 0.75) * 0.18;
            middle.position.z = Math.sin(t * 0.32 + 0.75) * 0.035;
          },
        });
        animated.push({
          object: inner,
          update: (t) => {
            inner.rotation.x = -0.32 + Math.sin(t * 0.32 + 1.5) * 0.16;
            inner.rotation.y = 0.35 + Math.sin(t * 0.32 + 2.1) * 0.18;
          },
        });
        animated.push({
          object: outer,
          update: (t) => {
            outer.rotation.y = Math.sin(t * 0.22) * 0.1;
            energySweep.rotation.z = -t * 0.17;
            lensLight.scale.setScalar(1 + Math.sin(t * 0.64) * 0.018);
          },
        });
        animated.push({
          object: blades,
          update: (t) => {
            blades.rotation.z = -t * 0.07;
          },
        });
      }

      const shadowSurface = mesh(
        new THREE.PlaneGeometry(30, 30),
        new THREE.ShadowMaterial({ opacity: 0.2 }),
        scene,
      );
      materialCache.add(shadowSurface.material as THREE.Material);
      shadowSurface.rotation.x = -Math.PI / 2;
      shadowSurface.position.y = -3.4;
      shadowSurface.castShadow = false;

      let frame = 0;
      let disposed = false;
      let contextLost = false;
      let visible = false;
      let elapsed = 0;
      let previous = 0;
      let pointerX = 0;
      let pointerY = 0;
      let currentX = 0;
      let currentY = 0;
      let scrollPose = 0;
      const scrollAnchor = element.closest(sceneAnchors);
      const initialRotation = sculpture.rotation.clone();
      const draw = (stamp: number) => {
        frame = 0;
        if (disposed || contextLost || !visible || document.hidden) {
          previous = 0;
          return;
        }
        const dt = previous ? Math.min((stamp - previous) / 1000, 0.05) : 0;
        previous = stamp;
        if (motionRef.current) elapsed += dt;
        animated.forEach((part) => part.update(elapsed));
        mint.emissiveIntensity = 0.22 + Math.sin(elapsed * 0.48) * 0.035;
        coralFill.intensity = 11 + Math.sin(elapsed * 0.48 + 0.8) * 0.7;
        if (motionRef.current) {
          const easing = 1 - Math.exp(-5.2 * dt);
          currentX += (pointerX - currentX) * easing;
          currentY += (pointerY - currentY) * easing;
          scrollPose +=
            ((scrollAnchor ? (sceneScroll.get(scrollAnchor) ?? 0) : 0) -
              scrollPose) *
            easing;
        }
        sculpture.rotation.y =
          initialRotation.y + currentX * 0.13 + scrollPose * 0.18;
        sculpture.rotation.x =
          initialRotation.x + currentY * 0.085 + scrollPose * 0.07;
        // Pausing freezes the current composition instead of snapping to its base.
        sculpture.position.y =
          Math.sin(elapsed * 0.55) * 0.075 + scrollPose * 0.06;
        renderer.render(scene, camera);
        if (motionRef.current) frame = requestAnimationFrame(draw);
      };
      const schedule = () => {
        if (!frame && !disposed && !contextLost && visible && !document.hidden)
          frame = requestAnimationFrame(draw);
      };
      scheduleRef.current = schedule;
      const resize = () => {
        const width = Math.max(element.clientWidth, 1);
        const height = Math.max(element.clientHeight, 1);
        renderer.setPixelRatio(
          Math.min(
            window.devicePixelRatio || 1,
            1.5,
            Math.sqrt(1_250_000 / (width * height)),
          ),
        );
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        // Keep the whole sculpture inside even narrow phone containers.
        const verticalFov = THREE.MathUtils.degToRad(camera.fov);
        const halfExtent = variant === "orbit" ? 3.85 : 3.05;
        const distance =
          halfExtent /
          Math.tan(verticalFov / 2) /
          Math.min(camera.aspect, 1.25);
        camera.position.set(
          0,
          variant === "stack" ? distance * 0.42 : distance * 0.07,
          distance,
        );
        camera.lookAt(0, 0, 0);
        camera.updateProjectionMatrix();
        schedule();
      };
      const pointerMove = (event: PointerEvent) => {
        if (!motionRef.current) return;
        const bounds = element.getBoundingClientRect();
        pointerX = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
        pointerY = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
        schedule();
      };
      const pointerLeave = () => {
        if (!motionRef.current) return;
        pointerX = 0;
        pointerY = 0;
        schedule();
      };
      const onVisibilityChange = () => {
        previous = 0;
        if (document.hidden && frame) {
          cancelAnimationFrame(frame);
          frame = 0;
        }
        schedule();
      };
      const visibility = new IntersectionObserver(
        ([entry]) => {
          visible = entry.isIntersecting;
          previous = 0;
          if (!visible && frame) {
            cancelAnimationFrame(frame);
            frame = 0;
          }
          schedule();
        },
        { threshold: 0.01 },
      );
      visibility.observe(element);
      const observer = new ResizeObserver(resize);
      observer.observe(element);
      element.addEventListener("pointermove", pointerMove, { passive: true });
      element.addEventListener("pointerleave", pointerLeave);
      document.addEventListener("visibilitychange", onVisibilityChange);
      const onContextLost = (event: Event) => {
        event.preventDefault();
        contextLost = true;
        setStatus("fallback");
        if (frame) {
          cancelAnimationFrame(frame);
          frame = 0;
        }
        visible = false;
      };
      renderer.domElement.addEventListener("webglcontextlost", onContextLost);
      resize();
      setStatus("ready");
      teardown = () => {
        disposed = true;
        if (frame) cancelAnimationFrame(frame);
        visibility.disconnect();
        observer.disconnect();
        element.removeEventListener("pointermove", pointerMove);
        element.removeEventListener("pointerleave", pointerLeave);
        document.removeEventListener("visibilitychange", onVisibilityChange);
        renderer.domElement.removeEventListener(
          "webglcontextlost",
          onContextLost,
        );
        geometryCache.forEach((item) => item.dispose());
        materialCache.forEach((item) => item.dispose());
        textureCache.forEach((item) => item.dispose());
        scene.traverse((object) => {
          if (object instanceof THREE.InstancedMesh) object.dispose();
        });
        key.shadow.dispose();
        environment.dispose();
        renderer.dispose();
        renderer.forceContextLoss();
        renderer.domElement.remove();
        scheduleRef.current = () => {};
      };
    };
    const proximity = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          initialize();
          proximity.disconnect();
        }
      },
      { rootMargin: "300px" },
    );
    proximity.observe(element);
    return () => {
      proximity.disconnect();
      teardown();
    };
  }, [variant]);

  return (
    <div
      className={`sculpture-scene sculpture-${variant} ${className}`}
      ref={host}
      aria-hidden="true"
      data-scene-status={status}
    >
      {status === "fallback" && (
        <div
          className="sculpture-fallback"
          style={{
            position: "absolute",
            inset: "15%",
            display: "grid",
            placeItems: "center",
          }}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                position: "absolute",
                width: `${82 - i * 20}%`,
                aspectRatio: "1",
                borderRadius: "50%",
                border: `${8 - i * 2}px solid ${[palette.cream, palette.mint, palette.coral][i]}`,
                transform: `rotate(${i * 20}deg) scaleX(${1 - i * 0.1})`,
                boxShadow: "0 15px 35px #0003",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
