import { useEffect, useRef, type RefObject } from "react";
import * as THREE from "three";

type Props = {
  motion: boolean;
  progressRef: RefObject<number>;
  pointerRef: RefObject<{ x: number; y: number }>;
};

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

// One screen-sized draw call. The quiet middle leaves room for readable content,
// while two independently flowing ribbons carry the atmosphere at the edges.
const fragmentShader = `
  precision highp float;
  varying vec2 vUv;
  uniform vec2 uResolution;
  uniform vec2 uPointer;
  uniform float uProgress;
  uniform float uTime;

  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
               mix(hash(i + vec2(0.0, 1.0)), hash(i + 1.0), f.x), f.y);
  }

  float flow(vec2 p) {
    mat2 turn = mat2(0.8, -0.6, 0.6, 0.8);
    float f = noise(p) * 0.55;
    p = turn * p * 2.03 + 2.4;
    f += noise(p) * 0.28;
    p = turn * p * 2.01 + 4.6;
    return f + noise(p) * 0.17;
  }

  vec3 ribbon(vec2 uv, float phase, float direction, vec3 tint) {
    float time = uTime * 0.065;
    float travel = uProgress * 4.4;
    float y = uv.y + travel * direction * 0.17;
    float bend = sin(y * 4.7 + phase + time * direction) * 0.076;
    bend += sin(y * 10.0 - time * 0.54 + phase * 0.7) * 0.021;
    bend += (uPointer.x - 0.5) * 0.025 * sin(y * 3.14159);
    float path = direction > 0.0 ? 0.065 + bend : 0.925 + bend;
    float turbulence = flow(vec2(uv.x * 3.4, y * 3.5) + vec2(time * 0.4, -time));
    float d = uv.x - path + (turbulence - 0.5) * 0.1;
    float width = 0.065 + sin(travel + phase) * 0.012;
    float veil = exp(-abs(d) / width);
    float fold = sin(d * 136.0 + turbulence * 8.0 + phase + time * 1.3);
    float silk = pow(max(0.0, fold * 0.5 + 0.5), 4.0);
    float fine = pow(max(0.0, sin(d * 430.0 + turbulence * 11.0)), 16.0);
    float breath = 0.76 + sin(y * 6.0 - time + phase) * 0.24;
    return tint * veil * breath * (0.16 + silk * 0.19 + fine * 0.075);
  }

  float stars(vec2 uv, float scale, float depth) {
    vec2 p = uv * vec2(uResolution.x / uResolution.y, 1.0) * scale;
    p.y += uTime * 0.014 * depth + uProgress * 2.8 * depth;
    p += (uPointer - 0.5) * depth * 0.11;
    vec2 cell = floor(p);
    vec2 local = fract(p);
    float seed = hash(cell + depth * 17.0);
    vec2 center = vec2(hash(cell + 2.3), hash(cell + 6.7)) * 0.7 + 0.15;
    float radius = length(local - center);
    float pin = exp(-radius * radius * 1100.0);
    float halo = exp(-radius * radius * 85.0) * 0.075;
    float shimmer = 0.62 + 0.38 * sin(seed * 29.0 + uTime * (0.2 + seed * 0.35));
    return (pin + halo) * step(0.91, seed) * shimmer;
  }

  void main() {
    vec2 uv = vUv;
    float chapter = uProgress * 6.283185;
    float time = uTime * 0.032;
    vec3 mint = vec3(0.34, 0.80, 0.66);
    vec3 blue = vec3(0.26, 0.48, 0.72);
    vec3 coral = vec3(0.74, 0.38, 0.27);
    vec3 first = mix(mint, blue, (sin(chapter - 0.7) + 1.0) * 0.31);
    vec3 second = mix(blue, coral, (sin(chapter + 0.8) + 1.0) * 0.42);

    float field = flow(uv * vec2(2.5, 3.0) + vec2(time, chapter * 0.11));
    vec3 color = vec3(0.022, 0.031, 0.034);
    color += first * field * 0.013;
    color += ribbon(uv, chapter * 0.55, 1.0, first);
    color += ribbon(uv, 3.5 + chapter * 0.38, -1.0, second);

    // Fine topographic lines pass through broad arcs, rather than a flat grid.
    vec2 arc = uv - vec2(0.74 + sin(chapter) * 0.12, 0.56);
    arc.x *= uResolution.x / uResolution.y;
    float radius = length(arc);
    float contours = radius * 23.0 + field * 1.8 - time * 0.5;
    float line = pow(max(0.0, cos(contours * 6.283185)), 38.0);
    float edge = smoothstep(0.13, 0.47, abs(uv.x - 0.5));
    float contourMask = smoothstep(0.28, 0.66, field) * edge;
    color += mix(first, second, uv.x) * line * contourMask * 0.055;

    float dust = stars(uv, 22.0, 0.7) * 0.22 + stars(uv, 39.0, 1.2) * 0.1;
    color += mix(vec3(0.69, 0.78, 0.75), first, 0.3) * dust * (0.22 + edge * 0.78);
    float vignette = 1.0 - smoothstep(0.1, 0.9, length((uv - 0.5) * vec2(0.78, 1.0)));
    color *= 0.62 + vignette * 0.38;
    // Static subpixel grain avoids digital banding without animated noise.
    color += (hash(floor(uv * uResolution)) - 0.5) * 0.004;
    gl_FragColor = vec4(color, 1.0);
  }
`;

export default function LivingBackground({
  motion,
  progressRef,
  pointerRef,
}: Props) {
  const hostRef = useRef<HTMLDivElement>(null);
  const phaseRef = useRef(0);
  const motionRef = useRef(motion);
  const controllerRef = useRef<((enabled: boolean) => void) | null>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: false,
        antialias: false,
        depth: false,
        stencil: false,
        powerPreference: "low-power",
      });
    } catch {
      host.dataset.ready = "false";
      return;
    }
    renderer.domElement.className = "living-background__canvas";
    renderer.domElement.setAttribute("aria-hidden", "true");
    host.appendChild(renderer.domElement);
    host.dataset.ready = "true";

    const scene = new THREE.Scene();
    const camera = new THREE.Camera();
    const uniforms = {
      uResolution: { value: new THREE.Vector2(1, 1) },
      uPointer: { value: new THREE.Vector2(pointerRef.current.x, 1 - pointerRef.current.y) },
      uProgress: { value: Math.min(1, Math.max(0, progressRef.current)) },
      uTime: { value: phaseRef.current },
    };
    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
      depthTest: false,
      depthWrite: false,
    });
    scene.add(new THREE.Mesh(geometry, material));
    let animation = 0;
    let invalidation = 0;
    let previous = 0;
    let lastRender = 0;
    let visible = !document.hidden;
    let disposed = false;
    let contextLost = false;
    const targetProgress = () => Math.min(1, Math.max(0, progressRef.current));
    let easedProgress = targetProgress();
    const easedPointer = new THREE.Vector2(pointerRef.current.x, 1 - pointerRef.current.y);
    const targetPointer = new THREE.Vector2();

    const render = () => {
      if (contextLost) return;
      uniforms.uPointer.value.copy(easedPointer);
      uniforms.uProgress.value = easedProgress;
      uniforms.uTime.value = phaseRef.current;
      renderer.render(scene, camera);
    };

    const invalidate = () => {
      if (disposed || !visible || contextLost || motionRef.current || invalidation) return;
      invalidation = requestAnimationFrame(() => {
        invalidation = 0;
        if (!disposed && visible) render();
      });
    };

    const resize = () => {
      const width = Math.max(1, host.clientWidth || window.innerWidth);
      const height = Math.max(1, host.clientHeight || window.innerHeight);
      // Large desktop screens and high-DPI phones share the same pixel budget.
      renderer.setPixelRatio(
        Math.min(window.devicePixelRatio || 1, 1, Math.sqrt(1_150_000 / (width * height))),
      );
      renderer.setSize(width, height, false);
      renderer.getDrawingBufferSize(uniforms.uResolution.value);
      if (visible) {
        if (motionRef.current) render();
        else invalidate();
      }
    };

    const tick = (now: number) => {
      if (disposed || !visible || !motionRef.current || contextLost) return;
      const delta = previous ? Math.min((now - previous) / 1000, 0.1) : 0;
      phaseRef.current += delta;
      easedProgress += (targetProgress() - easedProgress) * (1 - Math.exp(-delta * 6));
      const pointer = pointerRef.current;
      targetPointer.set(pointer.x, 1 - pointer.y);
      easedPointer.lerp(targetPointer, 1 - Math.exp(-delta * 8));
      previous = now;
      const elapsed = now - lastRender;
      if (elapsed >= 1000 / 30) {
        render();
        // Keep the scheduled cadence even when a browser frame arrives late.
        lastRender = now - (elapsed % (1000 / 30));
      }
      animation = requestAnimationFrame(tick);
    };

    const onVisibility = () => {
      visible = !document.hidden;
      cancelAnimationFrame(animation);
      cancelAnimationFrame(invalidation);
      animation = 0;
      invalidation = 0;
      previous = 0;
      if (visible) {
        render();
        if (motionRef.current) animation = requestAnimationFrame(tick);
      }
    };

    const onContextLost = (event: Event) => {
      event.preventDefault();
      contextLost = true;
      cancelAnimationFrame(animation);
      cancelAnimationFrame(invalidation);
      animation = 0;
      invalidation = 0;
      renderer.domElement.style.visibility = "hidden";
      host.dataset.ready = "false";
    };
    const onContextRestored = () => {
      contextLost = false;
      renderer.domElement.style.visibility = "visible";
      host.dataset.ready = "true";
      onVisibility();
    };

    const setMotion = (enabled: boolean) => {
      motionRef.current = enabled;
      cancelAnimationFrame(animation);
      cancelAnimationFrame(invalidation);
      animation = 0;
      invalidation = 0;
      previous = 0;
      if (!enabled) {
        // Freeze the last visible composition, not a newer undrawn animation step.
        easedProgress = uniforms.uProgress.value;
        phaseRef.current = uniforms.uTime.value;
        easedPointer.copy(uniforms.uPointer.value);
      }
      if (disposed || !visible || contextLost) return;
      render();
      if (enabled) animation = requestAnimationFrame(tick);
    };
    controllerRef.current = setMotion;

    const observer = new ResizeObserver(resize);
    observer.observe(host);
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);
    renderer.domElement.addEventListener("webglcontextlost", onContextLost);
    renderer.domElement.addEventListener("webglcontextrestored", onContextRestored);
    resize();
    if (motionRef.current && visible) animation = requestAnimationFrame(tick);

    return () => {
      disposed = true;
      if (controllerRef.current === setMotion) controllerRef.current = null;
      cancelAnimationFrame(animation);
      cancelAnimationFrame(invalidation);
      observer.disconnect();
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
      renderer.domElement.removeEventListener("webglcontextlost", onContextLost);
      renderer.domElement.removeEventListener("webglcontextrestored", onContextRestored);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.domElement.remove();
      delete host.dataset.ready;
    };
  }, [progressRef, pointerRef]);

  useEffect(() => {
    motionRef.current = motion;
    controllerRef.current?.(motion);
  }, [motion]);

  return (
    <div className="living-background" ref={hostRef} aria-hidden="true">
      <div className="living-background__fallback" />
    </div>
  );
}
