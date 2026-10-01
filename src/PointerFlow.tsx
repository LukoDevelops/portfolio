import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import "./pointer-flow.css";

type Point = { x: number; y: number };
type TrailPoint = Point & { time: number };
type PointerFlowProps = { motion: boolean; enabled?: boolean };

const finePointerQuery =
  "(hover: hover) and (pointer: fine) and (forced-colors: none)";
const fieldSelector = "input, textarea, select, [role='textbox'], iframe";
const interactiveSelector =
  "a[href], button:not(:disabled), [role='button']:not([aria-disabled='true']), summary";
const trailLifetime = 320;
const trailLength = 108;
const wakeAnchor = { x: 8, y: 16 };

/** A sculpted arrow stays exact while a tapered ribbon flows behind its heel. */
export default function PointerFlow({
  motion,
  enabled = true,
}: PointerFlowProps) {
  const flow = useRef<HTMLDivElement>(null);
  const cursor = useRef<HTMLDivElement>(null);
  const trail = useRef<SVGGElement>(null);
  const gradient = useRef<SVGLinearGradientElement>(null);
  const gradientId = `pointer-flow-trail-${useId().replace(/:/g, "")}`;
  const materialId = `${gradientId}-material`;
  const [pointerEligible, setPointerEligible] = useState(
    () => typeof window !== "undefined" && matchMedia(finePointerQuery).matches,
  );

  useEffect(() => {
    const capability = matchMedia(finePointerQuery);
    const update = () => setPointerEligible(capability.matches);
    capability.addEventListener("change", update);
    update();
    return () => capability.removeEventListener("change", update);
  }, []);

  useLayoutEffect(() => {
    // App owns reduced motion and its explicit override. Cursor preference is
    // separate, so pausing motion never discards the user's saved choice.
    if (!motion || !enabled || !pointerEligible) return;
    const decoration = flow.current;
    const reticle = cursor.current;
    const ink = gradient.current;
    if (!decoration || !reticle || !trail.current || !ink) return;
    const paths = [...trail.current.querySelectorAll("path")];
    const ribbon = trail.current.querySelector(".pointer-flow__ribbon");
    const glow = trail.current.querySelector(".pointer-flow__glow");
    const spine = trail.current.querySelector(".pointer-flow__spine");
    const root = document.documentElement;
    const capability = matchMedia(finePointerQuery);
    let target: Point = { x: 0, y: 0 };
    let follower: Point = { x: 0, y: 0 };
    let history: TrailPoint[] = [];
    let frame = 0;
    let previousFrame = 0;
    let lastMove = 0;
    let visible = false;
    let dragging = false;
    let targetSpeed = 0;
    let speed = 0;
    let targetBank = 0;
    let bank = 0;
    let dialogOpen = Boolean(document.querySelector("dialog[open]"));

    const hide = () => {
      // Native cursor restoration is synchronous, including effect cleanup.
      if (root.dataset.cursor === "custom") delete root.dataset.cursor;
      decoration.dataset.visible = "false";
      decoration.dataset.kind = "idle";
      decoration.dataset.pressed = "false";
      decoration.style.setProperty("--trail-opacity", "0");
      paths.forEach((path) => path.removeAttribute("d"));
      visible = false;
      history = [];
      speed = 0;
      targetSpeed = 0;
      bank = 0;
      targetBank = 0;
      lastMove = 0;
      cancelAnimationFrame(frame);
      frame = 0;
      previousFrame = 0;
    };

    const hover = (element: Element | null) => {
      // SVG descendants inherit editing from the nearest HTML ancestor too.
      let htmlAncestor = element;
      while (htmlAncestor && !(htmlAncestor instanceof HTMLElement)) {
        htmlAncestor = htmlAncestor.parentElement;
      }
      const editable =
        htmlAncestor instanceof HTMLElement && htmlAncestor.isContentEditable;
      if (!element || editable || element.closest(fieldSelector)) {
        hide();
        return false;
      }
      const interactive = element.closest(interactiveSelector);
      const scene = element.closest(
        "canvas, .keyboard-scene, .sculpture-scene",
      );
      decoration.dataset.kind = interactive?.matches(
        ".featured-card, .repo-card, [data-cursor='project']",
      )
        ? "project"
        : interactive?.matches("a[href]")
          ? "link"
          : interactive
            ? "control"
            : scene
              ? "scene"
              : "idle";
      decoration.dataset.external = interactive?.matches("a[target='_blank']")
        ? "true"
        : "false";
      // Canvas raycasting can identify a clickable key without a DOM button.
      decoration.dataset.sceneAction =
        element instanceof HTMLCanvasElement &&
        element.style.cursor === "pointer"
          ? "true"
          : "false";
      decoration.dataset.overText =
        !interactive && element.closest("p, li, h1, h2, h3, h4")
          ? "true"
          : "false";
      decoration.dataset.surface = element.closest(
        ".creative-lab, .project-visual",
      )
        ? "light"
        : "dark";
      return true;
    };

    const drawTrail = (time: number) => {
      history = history.filter((point) => time - point.time < trailLifetime);
      const head = { x: target.x + wakeAnchor.x, y: target.y + wakeAnchor.y };
      const points: Point[] = [head];
      let length = 0;
      for (const point of history) {
        const previous = points[points.length - 1];
        const distance = Math.hypot(point.x - previous.x, point.y - previous.y);
        if (distance < 0.5) continue;
        const remaining = trailLength - length;
        if (distance >= remaining) {
          points.push({
            x: previous.x + ((point.x - previous.x) * remaining) / distance,
            y: previous.y + ((point.y - previous.y) * remaining) / distance,
          });
          break;
        }
        points.push(point);
        length += distance;
      }
      const opacity = Math.max(0, 1 - (time - lastMove) / trailLifetime);
      decoration.style.setProperty(
        "--trail-opacity",
        (Math.pow(opacity, 1.15) * Math.min(targetSpeed / 0.22, 0.86)).toFixed(
          3,
        ),
      );
      if (points.length < 2 || opacity === 0) {
        paths.forEach((path) => path.removeAttribute("d"));
        return false;
      }
      const coordinate = (point: Point) =>
        `${point.x.toFixed(1)} ${point.y.toFixed(1)}`;
      const smooth = (samples: Point[], start = true) => {
        let d = start ? `M ${coordinate(samples[0])}` : "";
        for (let i = 1; i < samples.length - 1; i++) {
          const point = samples[i];
          const next = samples[i + 1];
          d += ` Q ${coordinate(point)} ${coordinate({ x: (point.x + next.x) / 2, y: (point.y + next.y) / 2 })}`;
        }
        const end = samples[samples.length - 1];
        return `${d} Q ${coordinate(end)} ${coordinate(end)}`;
      };
      const lengths = points.map((point, index) =>
        index
          ? Math.hypot(
              point.x - points[index - 1].x,
              point.y - points[index - 1].y,
            )
          : 0,
      );
      const total = lengths.reduce((sum, length) => sum + length, 0);
      const left: Point[] = [];
      const right: Point[] = [];
      let travelled = 0;
      const fullness = 2.6 + Math.min(speed * 1.5, 3.3);
      points.forEach((point, index) => {
        const previous = points[Math.max(0, index - 1)];
        const next = points[Math.min(points.length - 1, index + 1)];
        const dx = next.x - previous.x;
        const dy = next.y - previous.y;
        const distance = Math.hypot(dx, dy) || 1;
        travelled += lengths[index];
        const progress = travelled / total;
        const width =
          fullness *
          Math.pow(1 - progress, 1.2) *
          (0.35 + Math.sin(progress * Math.PI) * 0.95);
        left.push({
          x: point.x - (dy / distance) * width,
          y: point.y + (dx / distance) * width,
        });
        right.push({
          x: point.x + (dy / distance) * width,
          y: point.y - (dx / distance) * width,
        });
      });
      const reverse = right.reverse();
      ribbon?.setAttribute(
        "d",
        `${smooth(left)} L ${coordinate(reverse[0])}${smooth(reverse, false)} Z`,
      );
      const centerline = smooth(points);
      glow?.setAttribute("d", centerline);
      spine?.setAttribute("d", centerline);
      const end = points[points.length - 1];
      ink.setAttribute("x1", String(head.x));
      ink.setAttribute("y1", String(head.y));
      ink.setAttribute("x2", String(end.x));
      ink.setAttribute("y2", String(end.y));
      return true;
    };

    const tick = (time: number) => {
      frame = 0;
      if (!visible || document.hidden || !capability.matches || dialogOpen) {
        hide();
        return;
      }
      const elapsed = previousFrame
        ? Math.min(time - previousFrame, 40)
        : 16.67;
      previousFrame = time;
      const follow = 1 - Math.exp(-elapsed / 58);
      follower.x += (target.x - follower.x) * follow;
      follower.y += (target.y - follower.y) * follow;
      const distance = Math.hypot(target.x - follower.x, target.y - follower.y);
      const desiredSpeed = targetSpeed * Math.exp(-(time - lastMove) / 90);
      speed += (desiredSpeed - speed) * (1 - Math.exp(-elapsed / 48));
      const desiredBank = targetBank * Math.exp(-(time - lastMove) / 85);
      bank += (desiredBank - bank) * (1 - Math.exp(-elapsed / 60));
      reticle.style.setProperty("--cursor-bank", `${bank.toFixed(2)}deg`);
      const sample = {
        x: follower.x + wakeAnchor.x,
        y: follower.y + wakeAnchor.y,
        time,
      };
      if (
        !history.length ||
        Math.hypot(sample.x - history[0].x, sample.y - history[0].y) > 0.55
      ) {
        history.unshift(sample);
        history = history.slice(0, 16);
      }
      const hasTrail = drawTrail(time);
      if (
        distance > 0.09 ||
        speed > 0.012 ||
        Math.abs(bank) > 0.02 ||
        hasTrail
      ) {
        frame = requestAnimationFrame(tick);
      } else {
        previousFrame = 0;
      }
    };

    const move = (event: PointerEvent) => {
      if (
        !capability.matches ||
        event.pointerType !== "mouse" ||
        document.hidden ||
        dialogOpen ||
        dragging ||
        !decoration.isConnected
      ) {
        hide();
        return;
      }
      const element = event.target instanceof Element ? event.target : null;
      if (!hover(element)) return;
      const time = performance.now();
      const next = { x: event.clientX, y: event.clientY };
      const dx = next.x - target.x;
      const dy = next.y - target.y;
      const distance = Math.hypot(dx, dy);
      if (!visible || distance > 260) {
        follower = { ...next };
        history = [];
        targetSpeed = 0;
        speed = 0;
        targetBank = 0;
        bank = 0;
        reticle.style.setProperty("--cursor-bank", "0deg");
      } else {
        targetSpeed = Math.min(distance / Math.max(time - lastMove, 8), 2.2);
        targetBank = Math.max(
          -4.5,
          Math.min(4.5, (dx / Math.max(time - lastMove, 8)) * 2.5),
        );
      }
      target = next;
      lastMove = time;
      // Set the hit point before removing the native cursor. No animation delay.
      reticle.style.setProperty("--cursor-x", `${next.x}px`);
      reticle.style.setProperty("--cursor-y", `${next.y}px`);
      decoration.dataset.pressed = event.buttons > 0 ? "true" : "false";
      decoration.dataset.visible = "true";
      visible = true;
      root.dataset.cursor = "custom";
      if (!frame) frame = requestAnimationFrame(tick);
    };
    const leave = (event: PointerEvent) => {
      if (!event.relatedTarget) hide();
    };
    const press = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") hide();
      else if (visible) decoration.dataset.pressed = "true";
    };
    const release = () => {
      decoration.dataset.pressed = "false";
    };
    const scroll = () => {
      if (visible) hover(document.elementFromPoint(target.x, target.y));
    };
    const visibility = () => {
      if (document.hidden) {
        dragging = false;
        hide();
      }
    };
    const cancel = () => {
      dragging = false;
      hide();
    };
    const changeCapability = () => {
      if (!capability.matches) hide();
    };
    const keyboard = (event: KeyboardEvent) => {
      if (!["Shift", "Control", "Alt", "Meta"].includes(event.key)) hide();
    };
    const focus = (event: FocusEvent) => {
      const element = event.target instanceof Element ? event.target : null;
      if (element?.closest("dialog[open]")) hide();
      else if (visible) hover(element);
    };
    const startDrag = () => {
      dragging = true;
      hide();
    };
    const endDrag = () => {
      dragging = false;
      hide();
    };
    // Native dialogs live in the browser's top layer, above this decoration.
    // Close leaves the native cursor intact until the next real pointer move.
    const dialogs = new MutationObserver(() => {
      dialogOpen = Boolean(document.querySelector("dialog[open]"));
      if (dialogOpen) hide();
    });
    dialogs.observe(document.body, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ["open"],
    });

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerout", leave, { passive: true });
    window.addEventListener("pointerdown", press, { passive: true });
    window.addEventListener("pointerup", release, { passive: true });
    window.addEventListener("pointercancel", cancel, { passive: true });
    window.addEventListener("scroll", scroll, { passive: true, capture: true });
    window.addEventListener("blur", cancel);
    window.addEventListener("resize", hide);
    window.addEventListener("keydown", keyboard);
    window.addEventListener("contextmenu", hide);
    window.addEventListener("dragstart", startDrag);
    window.addEventListener("dragend", endDrag);
    document.addEventListener("focusin", focus);
    document.addEventListener("mouseleave", hide);
    document.addEventListener("visibilitychange", visibility);
    capability.addEventListener("change", changeCapability);
    return () => {
      hide();
      dialogs.disconnect();
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerout", leave);
      window.removeEventListener("pointerdown", press);
      window.removeEventListener("pointerup", release);
      window.removeEventListener("pointercancel", cancel);
      window.removeEventListener("scroll", scroll, true);
      window.removeEventListener("blur", cancel);
      window.removeEventListener("resize", hide);
      window.removeEventListener("keydown", keyboard);
      window.removeEventListener("contextmenu", hide);
      window.removeEventListener("dragstart", startDrag);
      window.removeEventListener("dragend", endDrag);
      document.removeEventListener("focusin", focus);
      document.removeEventListener("mouseleave", hide);
      document.removeEventListener("visibilitychange", visibility);
      capability.removeEventListener("change", changeCapability);
    };
  }, [motion, enabled, pointerEligible]);

  if (!motion || !enabled || !pointerEligible) return null;
  return (
    <div
      ref={flow}
      className="pointer-flow"
      data-visible="false"
      data-kind="idle"
      aria-hidden="true"
    >
      <svg className="pointer-flow__trail" fill="none">
        <defs>
          <linearGradient
            ref={gradient}
            id={gradientId}
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#d3ffe8" />
            <stop offset="32%" stopColor="#b7f0d6" stopOpacity="0.95" />
            <stop offset="72%" stopColor="#edb8a4" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#edb8a4" stopOpacity="0" />
          </linearGradient>
        </defs>
        <g ref={trail}>
          <path className="pointer-flow__glow" stroke={`url(#${gradientId})`} />
          <path className="pointer-flow__ribbon" fill={`url(#${gradientId})`} />
          <path
            className="pointer-flow__spine"
            stroke={`url(#${gradientId})`}
          />
        </g>
      </svg>
      <div ref={cursor} className="pointer-flow__cursor">
        <svg className="pointer-flow__nib" viewBox="-2 -2 26 32" fill="none">
          <defs>
            <linearGradient
              id={materialId}
              x1="0"
              y1="0"
              x2="18"
              y2="27"
              gradientUnits="userSpaceOnUse"
            >
              <stop className="pointer-flow__material-light" offset="0%" />
              <stop className="pointer-flow__material-mid" offset="58%" />
              <stop className="pointer-flow__material-end" offset="100%" />
            </linearGradient>
          </defs>
          <path
            className="pointer-flow__nib-body"
            fill={`url(#${materialId})`}
            d="M0 0 19.6 13.6c.8.6.5 1.5-.5 1.8l-6.7 1.1 2.5 6.8c.4.9 0 1.4-.8 1.7l-2.9 1.1c-.8.3-1.4 0-1.7-.8l-2.4-6.8-4.6 4.1c-.8.7-1.5.3-1.5-.7L0 0Z"
          />
          <path
            className="pointer-flow__nib-facet"
            d="m1.2 2.6 11.1 13.8-5.1 2.2L1.2 2.6Z"
          />
          <path className="pointer-flow__nib-ridge" d="m.8 1.5 6.8 16.7" />
          <path className="pointer-flow__nib-heel" d="m10.2 21.3 1.2 3.1" />
        </svg>
      </div>
    </div>
  );
}
