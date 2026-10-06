import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { sceneAnchors, sceneScroll } from "./sceneInputs";
import { keyboardSkills as skills } from "./content";

type Props = {
  selected: string;
  onSelect: (id: string) => void;
  motion: boolean;
};

/** All dimensions describe the finished part, including its chamfer. */
function roundedBox(
  width: number,
  height: number,
  depth: number,
  radius: number,
  bevel = 0.055,
  taper = 0,
) {
  const shape = new THREE.Shape();
  const w = width - bevel * 2;
  const d = depth - bevel * 2;
  const r = Math.max(0.01, radius - bevel);
  const x = -w / 2;
  const y = -d / 2;
  shape.moveTo(x + r, y);
  shape.lineTo(x + w - r, y);
  shape.quadraticCurveTo(x + w, y, x + w, y + r);
  shape.lineTo(x + w, y + d - r);
  shape.quadraticCurveTo(x + w, y + d, x + w - r, y + d);
  shape.lineTo(x + r, y + d);
  shape.quadraticCurveTo(x, y + d, x, y + d - r);
  shape.lineTo(x, y + r);
  shape.quadraticCurveTo(x, y, x + r, y);
  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: height - bevel * 2,
    bevelEnabled: true,
    bevelSegments: 5,
    steps: 1,
    bevelSize: bevel,
    bevelThickness: bevel,
    curveSegments: 10,
  });
  geometry.rotateX(-Math.PI / 2);
  geometry.translate(0, bevel, 0);
  if (taper) {
    const positions = geometry.getAttribute("position");
    for (let i = 0; i < positions.count; i++) {
      const scale = 1 - (positions.getY(i) / height) * taper;
      positions.setXYZ(
        i,
        positions.getX(i) * scale,
        positions.getY(i),
        positions.getZ(i) * scale,
      );
    }
    geometry.computeVertexNormals();
  }
  return geometry;
}

function labelTexture(
  label: string,
  width = 768,
  height = 768,
  detail?: string,
  ink = "#182822",
) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = ink;
  ctx.strokeStyle = ink;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  if (label === "React") {
    ctx.lineWidth = width * 0.018;
    for (let i = 0; i < 3; i++) {
      ctx.save();
      ctx.translate(width / 2, height * 0.47);
      ctx.rotate((i * Math.PI) / 3);
      ctx.beginPath();
      ctx.ellipse(0, 0, width * 0.24, height * 0.085, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }
    ctx.beginPath();
    ctx.arc(width / 2, height * 0.47, width * 0.032, 0, Math.PI * 2);
    ctx.fill();
    ctx.font = `700 ${height * 0.073}px Arial, sans-serif`;
    ctx.fillText("REACT", width / 2, height * 0.82);
  } else {
    // A wide key gets a wide texture. Matching both aspect ratios keeps the
    // spacebar lettering crisp and proportional instead of stretching a square.
    let fontSize =
      height *
      (label === "LUKO"
        ? 0.7
        : width > height * 2
          ? 0.5
          : label.length > 4
            ? 0.2
            : label.length > 2
              ? 0.24
              : 0.3);
    ctx.font = `700 ${fontSize}px Arial, sans-serif`;
    const textWidth = ctx.measureText(label).width;
    if (textWidth > width * 0.83) {
      fontSize *= (width * 0.83) / textWidth;
      ctx.font = `700 ${fontSize}px Arial, sans-serif`;
    }
    ctx.fillText(label, width / 2, height * (width > height * 2 ? 0.5 : 0.47));
  }
  if (detail) {
    ctx.textAlign = "left";
    ctx.font = `600 ${height * 0.066}px Arial, sans-serif`;
    ctx.fillText(detail, width * 0.11, height * 0.12);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  return texture;
}

/** Small, deterministic, shared maps add surface detail without asset downloads. */
function materialGrain(brushed: boolean) {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext("2d")!;
  const pixels = ctx.createImageData(256, 256);
  let seed = brushed ? 9271 : 1753;
  const noise = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };
  for (let y = 0; y < 256; y++) {
    const streak = brushed ? (noise() - 0.5) * 28 : 0;
    for (let x = 0; x < 256; x++) {
      const shade = Math.round(
        (brushed ? 218 : 232) + streak + (noise() - 0.5) * (brushed ? 8 : 22),
      );
      const index = (y * 256 + x) * 4;
      pixels.data[index] = shade;
      pixels.data[index + 1] = shade;
      pixels.data[index + 2] = shade;
      pixels.data[index + 3] = 255;
    }
  }
  ctx.putImageData(pixels, 0, 0);
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(brushed ? 3 : 2, brushed ? 10 : 2);
  return texture;
}

function studioReflection(renderer: THREE.WebGLRenderer) {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext("2d")!;
  const background = ctx.createLinearGradient(0, 0, 0, 256);
  background.addColorStop(0, "#242e2c");
  background.addColorStop(0.5, "#52615b");
  background.addColorStop(1, "#101817");
  ctx.fillStyle = background;
  ctx.fillRect(0, 0, 512, 256);
  ctx.fillStyle = "#edf0e4";
  ctx.fillRect(40, 42, 90, 86);
  ctx.fillStyle = "#9bc3b3";
  ctx.fillRect(280, 65, 34, 110);
  ctx.fillStyle = "#d3dae8";
  ctx.fillRect(408, 52, 62, 76);
  const source = new THREE.CanvasTexture(canvas);
  source.colorSpace = THREE.SRGBColorSpace;
  source.mapping = THREE.EquirectangularReflectionMapping;
  const generator = new THREE.PMREMGenerator(renderer);
  const reflection = generator.fromEquirectangular(source);
  generator.dispose();
  source.dispose();
  return reflection;
}

export default function KeyboardScene({ selected, onSelect, motion }: Props) {
  const host = useRef<HTMLDivElement>(null);
  const selectedRef = useRef(selected);
  const chooseRef = useRef(onSelect);
  const motionRef = useRef(motion);
  const invalidateRef = useRef<(() => void) | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    selectedRef.current = selected;
    chooseRef.current = onSelect;
    motionRef.current = motion;
    invalidateRef.current?.();
  }, [selected, onSelect, motion]);

  useEffect(() => {
    const element = host.current!;
    const scrollAnchor = element.closest(sceneAnchors);
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "low-power",
      });
    } catch {
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.domElement.setAttribute("aria-hidden", "true");
    element.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    let reflection = studioReflection(renderer);
    scene.environment = reflection.texture;
    scene.environmentIntensity = 0.6;
    const polymerGrain = materialGrain(false);
    const metalGrain = materialGrain(true);
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 70);
    const cameraDirection = new THREE.Vector3(6.8, 10.5, 10.9).normalize();
    const target = new THREE.Vector3(0, 0.15, 0.05);
    scene.add(new THREE.HemisphereLight(0xf6f2e4, 0x182b29, 2.35));
    const keyLight = new THREE.DirectionalLight(0xfff1d8, 4.8);
    keyLight.position.set(-4, 9, 5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.set(1024, 1024);
    Object.assign(keyLight.shadow.camera, {
      left: -6,
      right: 6,
      top: 6,
      bottom: -6,
      near: 0.1,
      far: 30,
    });
    keyLight.shadow.bias = -0.0003;
    keyLight.shadow.normalBias = 0.025;
    scene.add(keyLight);
    const rim = new THREE.DirectionalLight(0x83ffc1, 3.4);
    rim.position.set(4, 5, -6);
    scene.add(rim);
    const fill = new THREE.DirectionalLight(0xb9d6ff, 1.8);
    fill.position.set(6, 2, 5);
    scene.add(fill);

    const assembly = new THREE.Group();
    assembly.rotation.y = -0.24;
    scene.add(assembly);
    const chassisMaterial = new THREE.MeshPhysicalMaterial({
      color: "#333b39",
      metalness: 0.7,
      roughness: 0.43,
      clearcoat: 0.28,
      clearcoatRoughness: 0.25,
      roughnessMap: metalGrain,
      bumpMap: metalGrain,
      bumpScale: 0.012,
      anisotropy: 0.5,
      anisotropyRotation: Math.PI / 2,
      envMapIntensity: 0.9,
    });
    const chassis = new THREE.Mesh(
      roundedBox(7.15, 0.45, 5.7, 0.36, 0.1),
      chassisMaterial,
    );
    chassis.position.set(0, -0.47, 0.05);
    chassis.castShadow = true;
    chassis.receiveShadow = true;
    assembly.add(chassis);

    const trimMaterial = new THREE.MeshStandardMaterial({
      color: "#85edbb",
      emissive: "#45c894",
      emissiveIntensity: 0.35,
      roughness: 0.38,
      metalness: 0.2,
    });
    const trim = new THREE.Mesh(
      roundedBox(7.17, 0.065, 5.72, 0.38, 0.022),
      trimMaterial,
    );
    trim.position.set(0, -0.5, 0.05);
    assembly.add(trim);
    const lower = new THREE.Mesh(
      roundedBox(7.0, 0.22, 5.55, 0.36, 0.07),
      new THREE.MeshStandardMaterial({
        color: "#141c19",
        metalness: 0.6,
        roughness: 0.42,
      }),
    );
    lower.position.set(0, -0.69, 0.05);
    lower.castShadow = true;
    assembly.add(lower);

    // The dark inset plate creates a visible gap around every switch.
    const plate = new THREE.Mesh(
      roundedBox(6.52, 0.08, 4.22, 0.2, 0.025),
      new THREE.MeshStandardMaterial({
        color: "#161e1b",
        metalness: 0.35,
        roughness: 0.5,
      }),
    );
    plate.position.set(0, -0.065, -0.46);
    plate.receiveShadow = true;
    assembly.add(plate);

    const screwMaterial = new THREE.MeshStandardMaterial({
      color: "#cbd1ca",
      roughness: 0.22,
      metalness: 0.9,
      roughnessMap: metalGrain,
    });
    for (const x of [-3.23, 3.23]) {
      for (const z of [-2.45, 2.49]) {
        const screw = new THREE.Mesh(
          new THREE.CylinderGeometry(0.058, 0.058, 0.012, 12),
          screwMaterial,
        );
        screw.position.set(x, -0.012, z);
        assembly.add(screw);
        const countersink = new THREE.Mesh(
          new THREE.TorusGeometry(0.083, 0.012, 6, 16),
          screwMaterial,
        );
        countersink.rotation.x = -Math.PI / 2;
        countersink.position.set(x, -0.014, z);
        assembly.add(countersink);
        const slot = new THREE.Mesh(
          new THREE.BoxGeometry(0.069, 0.014, 0.014),
          new THREE.MeshBasicMaterial({ color: "#26332b" }),
        );
        slot.position.set(x, 0, z);
        slot.rotation.y = 0.4;
        assembly.add(slot);
      }
    }

    const palette = [
      "#f2eadb",
      "#a5e4bc",
      "#d1e8e3",
      "#f09e89",
      "#e9e0ce",
      "#b3c3dd",
      "#eae3d4",
      "#b9dcbb",
      "#a3c9d0",
      "#e9e1d1",
      "#f1b487",
      "#dedbcf",
      "#eead9a",
      "#96e0b4",
      "#b7e9c6",
    ];
    const keys: {
      group: THREE.Group;
      cap: THREE.Mesh;
      id: string;
      accent: THREE.Mesh;
      velocity: number;
    }[] = [];
    const hitObjects: THREE.Object3D[] = [];
    const capGeometry = roundedBox(1.13, 0.54, 1.13, 0.17, 0.072, 0.12);
    const collarGeometry = roundedBox(1.13, 0.06, 1.13, 0.16, 0.02);
    const anisotropy = Math.min(renderer.capabilities.getMaxAnisotropy(), 8);
    polymerGrain.anisotropy = anisotropy;
    metalGrain.anisotropy = anisotropy;
    const makeLabel = (text: string, w: number, d: number, detail?: string) => {
      const texture = labelTexture(
        text,
        text === "MAKE IT REAL" ? 2048 : 768,
        text === "MAKE IT REAL" ? 288 : 768,
        detail,
      );
      texture.anisotropy = anisotropy;
      const label = new THREE.Mesh(
        new THREE.PlaneGeometry(w, d),
        new THREE.MeshBasicMaterial({
          map: texture,
          transparent: true,
          depthWrite: false,
          toneMapped: false,
          polygonOffset: true,
          polygonOffsetFactor: -1,
        }),
      );
      label.rotation.x = -Math.PI / 2;
      return label;
    };
    const switchHousing = new THREE.InstancedMesh(
      roundedBox(0.75, 0.12, 0.75, 0.1, 0.025),
      new THREE.MeshStandardMaterial({
        color: "#394742",
        metalness: 0.3,
        roughness: 0.55,
      }),
      skills.length,
    );
    const stemMaterial = new THREE.MeshStandardMaterial({
      color: "#ecba9c",
      roughness: 0.32,
    });
    const stemHorizontal = new THREE.InstancedMesh(
      new THREE.BoxGeometry(0.3, 0.15, 0.1),
      stemMaterial,
      skills.length,
    );
    const stemVertical = new THREE.InstancedMesh(
      new THREE.BoxGeometry(0.1, 0.15, 0.3),
      stemMaterial,
      skills.length,
    );
    const placement = new THREE.Object3D();
    skills.forEach((skill, i) => {
      const key = new THREE.Group();
      key.position.set(
        ((i % 5) - 2) * 1.25,
        0.07,
        (Math.floor(i / 5) - 1) * 1.25 - 0.51,
      );
      placement.position.set(key.position.x, -0.035, key.position.z);
      placement.updateMatrix();
      switchHousing.setMatrixAt(i, placement.matrix);
      placement.position.y = 0.105;
      placement.updateMatrix();
      stemHorizontal.setMatrixAt(i, placement.matrix);
      stemVertical.setMatrixAt(i, placement.matrix);
      const collar = new THREE.Mesh(
        collarGeometry,
        new THREE.MeshStandardMaterial({
          color: "#7cdeac",
          emissive: "#53c592",
          emissiveIntensity: 0.06,
          roughness: 0.4,
          metalness: 0.2,
        }),
      );
      collar.position.y = -0.015;
      key.add(collar);
      const cap = new THREE.Mesh(
        capGeometry,
        new THREE.MeshPhysicalMaterial({
          color: palette[i % palette.length],
          roughness: 0.36,
          metalness: 0.035,
          clearcoat: 0.26,
          clearcoatRoughness: 0.35,
          roughnessMap: polymerGrain,
          bumpMap: polymerGrain,
          bumpScale: 0.012,
        }),
      );
      cap.castShadow = true;
      cap.receiveShadow = true;
      cap.userData.skill = skill.id;
      key.add(cap);
      const label = makeLabel(
        skill.label,
        0.89,
        0.89,
        String(i + 1).padStart(2, "0"),
      );
      label.position.y = 0.548;
      key.add(label);
      assembly.add(key);
      keys.push({ group: key, cap, id: skill.id, accent: collar, velocity: 0 });
      hitObjects.push(cap);
    });
    assembly.add(switchHousing, stemHorizontal, stemVertical);

    const spaceGroup = new THREE.Group();
    spaceGroup.position.set(-0.52, 0.07, 2.02);
    const space = new THREE.Mesh(
      roundedBox(4.95, 0.48, 0.77, 0.16, 0.068, 0.09),
      new THREE.MeshPhysicalMaterial({
        color: "#b4edc7",
        roughness: 0.36,
        clearcoat: 0.34,
        roughnessMap: polymerGrain,
        bumpMap: polymerGrain,
        bumpScale: 0.012,
      }),
    );
    space.castShadow = true;
    space.receiveShadow = true;
    spaceGroup.add(space);
    const spaceLabel = makeLabel("MAKE IT REAL", 3.58, 0.505);
    spaceLabel.position.y = 0.488;
    spaceGroup.add(spaceLabel);
    assembly.add(spaceGroup);

    const badgeBacking = new THREE.Mesh(
      roundedBox(1.24, 0.095, 0.68, 0.1, 0.025),
      new THREE.MeshPhysicalMaterial({
        color: "#172923",
        metalness: 0.72,
        roughness: 0.25,
        roughnessMap: metalGrain,
        clearcoat: 0.4,
      }),
    );
    badgeBacking.position.set(2.68, -0.012, 2.02);
    badgeBacking.castShadow = true;
    assembly.add(badgeBacking);
    const badgeTexture = labelTexture("LUKO", 1280, 480, undefined, "#a6ffd0");
    badgeTexture.anisotropy = anisotropy;
    const badge = new THREE.Mesh(
      new THREE.PlaneGeometry(1.08, 0.405),
      new THREE.MeshBasicMaterial({
        map: badgeTexture,
        transparent: true,
        depthWrite: false,
        toneMapped: false,
        polygonOffset: true,
        polygonOffsetFactor: -1,
      }),
    );
    badge.rotation.x = -Math.PI / 2;
    badge.position.set(2.68, 0.09, 2.02);
    assembly.add(badge);
    const badgeLight = new THREE.PointLight(0x83ffba, 0.22, 1.25, 2);
    badgeLight.position.set(2.68, 0.22, 2.04);
    assembly.add(badgeLight);
    const badgeRim = new THREE.Mesh(
      new THREE.BoxGeometry(0.72, 0.014, 0.018),
      new THREE.MeshBasicMaterial({ color: "#83ffc0", toneMapped: false }),
    );
    badgeRim.position.set(2.68, 0.091, 2.285);
    assembly.add(badgeRim);
    const ledMaterial = new THREE.MeshBasicMaterial({
      color: "#b0ffcb",
      toneMapped: false,
    });
    const leds: THREE.Mesh[] = [];
    for (let i = 0; i < 3; i++) {
      const led = new THREE.Mesh(
        new THREE.SphereGeometry(0.033, 10, 8),
        ledMaterial.clone(),
      );
      led.position.set(2.45 + i * 0.19, 0.03, 2.5);
      assembly.add(led);
      leds.push(led);
    }
    ledMaterial.dispose();

    // A suspended USB connector and coiled cable add depth behind the board.
    const cablePoints: THREE.Vector3[] = [];
    for (let i = 0; i <= 80; i++) {
      const t = i / 80;
      cablePoints.push(
        new THREE.Vector3(
          0.68 + Math.sin(t * Math.PI * 12) * 0.15,
          -0.22 + Math.cos(t * Math.PI * 12) * 0.12,
          -2.78 - t * 1.05,
        ),
      );
    }
    const cable = new THREE.Mesh(
      new THREE.TubeGeometry(
        new THREE.CatmullRomCurve3(cablePoints),
        80,
        0.048,
        8,
        false,
      ),
      new THREE.MeshStandardMaterial({
        color: "#b8d8c3",
        roughness: 0.65,
        bumpMap: polymerGrain,
        bumpScale: 0.025,
      }),
    );
    cable.castShadow = true;
    assembly.add(cable);
    const plug = new THREE.Mesh(
      roundedBox(0.37, 0.24, 0.53, 0.07, 0.025),
      chassisMaterial,
    );
    plug.position.set(0.68, -0.34, -2.9);
    assembly.add(plug);
    const plugCollar = new THREE.Mesh(
      roundedBox(0.39, 0.25, 0.105, 0.06, 0.018),
      screwMaterial,
    );
    plugCollar.position.set(0.68, -0.345, -2.69);
    assembly.add(plugCollar);
    const vents = new THREE.InstancedMesh(
      new THREE.BoxGeometry(0.18, 0.055, 0.024),
      new THREE.MeshStandardMaterial({ color: "#0b1510", roughness: 0.8 }),
      8,
    );
    for (let i = 0; i < 8; i++) {
      placement.position.set(-1.52 + i * 0.27, -0.27, 2.899);
      placement.updateMatrix();
      vents.setMatrixAt(i, placement.matrix);
    }
    assembly.add(vents);

    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(30, 30),
      new THREE.ShadowMaterial({ opacity: 0.27 }),
    );
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -1.14;
    ground.receiveShadow = true;
    scene.add(ground);

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2(9, 9);
    let hovered = "";
    let tiltX = 0;
    let tiltY = 0;
    let down = false;
    let visible = false;
    let frame = 0;
    let contextLost = false;
    let disposed = false;
    let needsRender = true;
    let lastSelection = "";
    let previousTime = performance.now();
    let elapsed = 0;
    let waveAge = Number.POSITIVE_INFINITY;
    const waveOrigin = new THREE.Vector2();
    const startSelectionWave = (id: string) => {
      const key = keys.find((item) => item.id === id);
      if (!key || !motionRef.current) return;
      waveOrigin.set(key.group.position.x, key.group.position.z);
      waveAge = 0;
    };
    const wavePulse = (age: number) => {
      if (age < 0 || age > 0.64) return 0;
      return Math.sin((age / 0.64) * Math.PI) * Math.exp(-age * 3.3);
    };
    const stopFrame = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
    };
    const requestFrame = () => {
      if (disposed || contextLost || !visible || document.hidden || frame)
        return;
      frame = requestAnimationFrame(animate);
    };
    const invalidate = () => {
      needsRender = true;
      requestFrame();
    };
    invalidateRef.current = invalidate;

    const pointerMove = (event: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.set(
        ((event.clientX - rect.left) / rect.width) * 2 - 1,
        -((event.clientY - rect.top) / rect.height) * 2 + 1,
      );
      tiltX = pointer.x;
      tiltY = pointer.y;
      raycaster.setFromCamera(pointer, camera);
      hovered =
        raycaster.intersectObjects(hitObjects, false)[0]?.object.userData
          .skill || "";
      renderer.domElement.style.cursor = hovered ? "pointer" : "default";
      invalidate();
    };
    const leave = () => {
      hovered = "";
      tiltX = 0;
      tiltY = 0;
      down = false;
      invalidate();
    };
    const press = (event: PointerEvent) => {
      pointerMove(event);
      down = true;
      if (hovered) {
        startSelectionWave(hovered);
        chooseRef.current(hovered);
      }
      invalidate();
    };
    const release = () => {
      down = false;
      invalidate();
    };
    const visibilityChange = () => {
      previousTime = performance.now();
      if (document.hidden) stopFrame();
      else invalidate();
    };
    const contextLostHandler = (event: Event) => {
      event.preventDefault();
      contextLost = true;
      stopFrame();
      renderer.domElement.style.display = "none";
      setReady(false);
    };
    const contextRestoredHandler = () => {
      reflection.dispose();
      reflection = studioReflection(renderer);
      scene.environment = reflection.texture;
      contextLost = false;
      previousTime = performance.now();
      renderer.domElement.style.display = "";
      setReady(true);
      invalidate();
    };
    renderer.domElement.addEventListener("pointermove", pointerMove);
    renderer.domElement.addEventListener("pointerleave", leave);
    renderer.domElement.addEventListener("pointerdown", press);
    renderer.domElement.addEventListener("pointerup", release);
    renderer.domElement.addEventListener("pointercancel", leave);
    renderer.domElement.addEventListener(
      "webglcontextlost",
      contextLostHandler,
    );
    renderer.domElement.addEventListener(
      "webglcontextrestored",
      contextRestoredHandler,
    );
    document.addEventListener("visibilitychange", visibilityChange);

    const resizeScene = () => {
      const width = Math.max(1, element.clientWidth);
      const height = Math.max(1, element.clientHeight);
      renderer.setPixelRatio(
        Math.min(
          window.devicePixelRatio,
          2,
          Math.sqrt(1_400_000 / (width * height)),
        ),
      );
      renderer.setSize(width, height);
      camera.aspect = width / height;
      // Fit a three-dimensional assembly, including its cable, at every aspect.
      const distance = Math.max(14.7, 12.7 / camera.aspect);
      camera.position
        .copy(cameraDirection)
        .multiplyScalar(distance)
        .add(target);
      camera.lookAt(target);
      camera.updateProjectionMatrix();
      invalidate();
    };
    const resize = new ResizeObserver(resizeScene);
    resize.observe(element);
    resizeScene();
    const intersection = new IntersectionObserver(
      (entries) => {
        visible = entries[0].isIntersecting;
        previousTime = performance.now();
        if (visible) invalidate();
        else stopFrame();
      },
      { rootMargin: "100px" },
    );
    intersection.observe(element);

    function animate() {
      frame = 0;
      if (disposed || contextLost || !visible || document.hidden) return;
      const now = performance.now();
      const delta = Math.min((now - previousTime) / 1000, 0.05);
      previousTime = now;
      const animated = motionRef.current;
      if (!animated && !needsRender && lastSelection === selectedRef.current)
        return;
      if (lastSelection !== selectedRef.current) {
        // HTML skill controls and raycast presses share the same choreography.
        startSelectionWave(selectedRef.current);
      }
      if (animated) {
        elapsed += delta;
        waveAge += delta;
      } else {
        waveAge = Number.POSITIVE_INFINITY;
      }
      const ease = animated ? 1 - Math.exp(-delta * 5.5) : 1;
      const illuminationEase = animated ? 1 - Math.exp(-delta * 17) : 1;
      const idleLift = animated ? Math.sin(elapsed * 0.64) * 0.075 : 0;
      const scrollPose =
        animated && scrollAnchor ? (sceneScroll.get(scrollAnchor) ?? 0) : 0;
      assembly.position.y +=
        (idleLift + scrollPose * 0.035 - assembly.position.y) * ease;
      const rotationY =
        -0.24 +
        (animated
          ? Math.sin(elapsed * 0.31) * 0.025 +
            tiltX * 0.055 +
            scrollPose * 0.075
          : 0);
      assembly.rotation.y += (rotationY - assembly.rotation.y) * ease;
      assembly.rotation.z +=
        ((animated ? tiltX * -0.037 + Math.sin(elapsed * 0.47) * 0.009 : 0) -
          assembly.rotation.z) *
        ease;
      assembly.rotation.x +=
        ((animated
          ? tiltY * 0.045 +
            Math.sin(elapsed * 0.38) * 0.008 +
            scrollPose * 0.035
          : 0) -
          assembly.rotation.x) *
        ease;
      keys.forEach((key) => {
        const active = key.id === selectedRef.current;
        const isHovered = key.id === hovered;
        const distance =
          Math.hypot(
            key.group.position.x - waveOrigin.x,
            key.group.position.z - waveOrigin.y,
          ) / 1.25;
        const pulse = animated ? wavePulse(waveAge - distance * 0.075) : 0;
        const targetY =
          0.07 +
          (isHovered ? (down ? -0.05 : 0.105) : active ? 0.07 : 0) +
          pulse * 0.024;
        if (animated) {
          // Closed-form underdamped spring: the same key feel at any frame rate,
          // with a small natural settle rather than linear floating transitions.
          const frequency = isHovered && down ? 32 : 24;
          const damping = 0.68;
          const dampedFrequency = frequency * Math.sqrt(1 - damping * damping);
          const decay = Math.exp(-damping * frequency * delta);
          const phase = dampedFrequency * delta;
          const displacement = key.group.position.y - targetY;
          const velocity = key.velocity;
          key.group.position.y =
            targetY +
            decay *
              (displacement * Math.cos(phase) +
                ((velocity + damping * frequency * displacement) /
                  dampedFrequency) *
                  Math.sin(phase));
          key.velocity =
            decay *
            (velocity * Math.cos(phase) -
              ((damping * frequency * velocity +
                frequency * frequency * displacement) /
                dampedFrequency) *
                Math.sin(phase));
        } else {
          key.group.position.y = targetY;
          key.velocity = 0;
        }
        key.group.rotation.z +=
          ((animated && isHovered ? -tiltX * 0.018 : 0) -
            key.group.rotation.z) *
          illuminationEase;
        key.group.rotation.x +=
          ((animated && isHovered ? tiltY * 0.018 : 0) - key.group.rotation.x) *
          illuminationEase;
        const material = key.accent.material as THREE.MeshStandardMaterial;
        const illumination =
          (active ? 0.62 : isHovered ? 0.36 : 0.05) + pulse * 0.82;
        material.emissiveIntensity +=
          (illumination - material.emissiveIntensity) * illuminationEase;
      });
      leds.forEach((led, i) => {
        const material = led.material as THREE.MeshBasicMaterial;
        const intensity = animated
          ? 0.69 +
            Math.sin(elapsed * 1.35 - i * 0.6) * 0.08 +
            wavePulse(waveAge - 0.1 - i * 0.105) * 0.46
          : 0.85;
        material.color.setRGB(0.5 * intensity, intensity, 0.65 * intensity);
      });
      trimMaterial.emissiveIntensity = animated
        ? 0.35 +
          Math.sin(elapsed * 0.76) * 0.025 +
          wavePulse(waveAge - 0.08) * 0.18
        : 0.35;
      badgeLight.intensity = animated
        ? 0.22 + wavePulse(waveAge - 0.15) * 0.1
        : 0.22;
      renderer.render(scene, camera);
      needsRender = false;
      lastSelection = selectedRef.current;
      // Paused scenes get a single frame per invalidation. Animated scenes
      // continue only while they are visible and their WebGL context is alive.
      if (animated) requestFrame();
    }
    invalidate();
    setReady(true);
    return () => {
      invalidateRef.current = null;
      disposed = true;
      stopFrame();
      resize.disconnect();
      intersection.disconnect();
      document.removeEventListener("visibilitychange", visibilityChange);
      renderer.domElement.removeEventListener("pointermove", pointerMove);
      renderer.domElement.removeEventListener("pointerleave", leave);
      renderer.domElement.removeEventListener("pointerdown", press);
      renderer.domElement.removeEventListener("pointerup", release);
      renderer.domElement.removeEventListener("pointercancel", leave);
      renderer.domElement.removeEventListener(
        "webglcontextlost",
        contextLostHandler,
      );
      renderer.domElement.removeEventListener(
        "webglcontextrestored",
        contextRestoredHandler,
      );
      const geometries = new Set<THREE.BufferGeometry>();
      const materials = new Set<THREE.Material>();
      const textures = new Set<THREE.Texture>();
      scene.traverse((object) => {
        if (!(object instanceof THREE.Mesh)) return;
        if (object instanceof THREE.InstancedMesh) object.dispose();
        geometries.add(object.geometry);
        const objectMaterials = Array.isArray(object.material)
          ? object.material
          : [object.material];
        objectMaterials.forEach((material) => {
          materials.add(material);
          Object.values(material).forEach((value) => {
            if (value instanceof THREE.Texture) textures.add(value);
          });
        });
      });
      textures.forEach((texture) => texture.dispose());
      geometries.forEach((geometry) => geometry.dispose());
      materials.forEach((material) => material.dispose());
      reflection.dispose();
      keyLight.shadow.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div className={`keyboard-scene ${ready ? "is-ready" : ""}`} ref={host}>
      {!ready && (
        <div className="scene-fallback" aria-hidden="true">
          {skills.slice(0, 10).map((skill) => (
            <span key={skill.id} style={{ backgroundColor: skill.color }}>
              {skill.label}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
