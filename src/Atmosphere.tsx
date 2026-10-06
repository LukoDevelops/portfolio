import { lazy, Suspense, useEffect, useRef } from "react";
import PointerFlow from "./PointerFlow";
import { sceneAnchors, sceneScroll } from "./sceneInputs";

const LivingBackground = lazy(() => import("./LivingBackground"));

/** Motion shares live inputs, while scroll never triggers a React render. */
export default function Atmosphere({
  motion,
  cursorEnabled,
}: {
  motion: boolean;
  cursorEnabled: boolean;
}) {
  const progress = useRef<HTMLDivElement>(null);
  const progressValue = useRef(0);
  const pointer = useRef({ x: 0.7, y: 0.4 });
  const motionValue = useRef(motion);
  motionValue.current = motion;

  useEffect(() => {
    const root = document.documentElement;
    const targets = document.querySelectorAll<HTMLElement>(
      "[data-reveal], .section-title-row, .featured-card, .toolbox-layout, .about-copy, .testimonial-grid figure, .contact-layout",
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -20px 0px" },
    );
    targets.forEach((target) => {
      target.classList.add("reveal-item");
      observer.observe(target);
    });
    root.classList.add("reveal-ready");

    const chapters = [
      ...document.querySelectorAll<HTMLElement>(
        ".hero, .industry-explorer, .work, .creative-lab, .skills-section, .capabilities, .experience-journey, .leadership-studio, .working-method, .learning-section, .about-section, .testimonials, .contact-section",
      ),
    ];
    const drifts = [
      ...document.querySelectorAll<HTMLElement>(
        ".lab-art, .about-sculpture-wrap, .contact-sculpture-wrap, .capability-art",
      ),
    ];
    const sceneTargets = [
      ...document.querySelectorAll<HTMLElement>(sceneAnchors),
    ];
    let frame = 0;
    const update = () => {
      frame = 0;
      if (document.hidden) return;
      const height = window.innerHeight;
      const range = root.scrollHeight - height;
      const journey =
        range > 0 ? Math.max(0, Math.min(1, window.scrollY / range)) : 0;
      progressValue.current = journey;
      if (progress.current)
        progress.current.style.transform = `scaleX(${journey})`;
      root.style.setProperty("--journey", journey.toFixed(4));
      let nearest = Infinity;
      let chapter = 0;
      const chapterRects = chapters.map((section) =>
        section.getBoundingClientRect(),
      );
      const driftRects = drifts.map((element) =>
        element.getBoundingClientRect(),
      );
      const sceneRects = sceneTargets.map((element) =>
        element.getBoundingClientRect(),
      );
      // App resolves the reduced-motion default and any explicit user override.
      const canMove = motionValue.current;
      const depthScale = window.innerWidth <= 640 ? 0.4 : 1;
      chapterRects.forEach((rect, index) => {
        const distance = Math.abs(rect.top + rect.height * 0.5 - height * 0.5);
        if (distance < nearest) {
          nearest = distance;
          chapter = index;
        }
        const travel = canMove
          ? Math.max(
              -1,
              Math.min(
                1,
                (rect.top + rect.height * 0.35 - height * 0.5) / height,
              ),
            )
          : 0;
        chapters[index].style.setProperty(
          "--chapter-travel",
          travel.toFixed(3),
        );
      });
      root.dataset.chapter = String(chapter);
      driftRects.forEach((rect, index) => {
        const drift = canMove
          ? Math.max(
              -1,
              Math.min(
                1,
                (rect.top + rect.height * 0.5 - height * 0.5) / (height * 0.8),
              ),
            )
          : 0;
        drifts[index].style.setProperty("--drift", drift.toFixed(3));
      });
      sceneRects.forEach((rect, index) => {
        const value = canMove
          ? Math.max(
              -1,
              Math.min(
                1,
                (rect.top + rect.height * 0.5 - height * 0.5) / (height * 0.8),
              ),
            ) * depthScale
          : 0;
        sceneScroll.set(sceneTargets[index], value);
        sceneTargets[index].style.setProperty(
          "--scene-depth",
          value.toFixed(3),
        );
      });
    };
    const schedule = () => {
      if (!frame && !document.hidden) frame = requestAnimationFrame(update);
    };
    const move = (event: PointerEvent) => {
      if (!motionValue.current || event.pointerType !== "mouse") return;
      pointer.current = {
        x: event.clientX / window.innerWidth,
        y: event.clientY / window.innerHeight,
      };
    };
    const visibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(frame);
        frame = 0;
      } else schedule();
    };
    const contentResize = new ResizeObserver(schedule);
    contentResize.observe(document.body);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("visibilitychange", visibility);
    schedule();
    return () => {
      observer.disconnect();
      contentResize.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("pointermove", move);
      document.removeEventListener("visibilitychange", visibility);
      cancelAnimationFrame(frame);
      root.classList.remove("reveal-ready");
      delete root.dataset.chapter;
      root.style.removeProperty("--journey");
      drifts.forEach((element) => element.style.removeProperty("--drift"));
      chapters.forEach((element) =>
        element.style.removeProperty("--chapter-travel"),
      );
      sceneTargets.forEach((element) => {
        sceneScroll.delete(element);
        element.style.removeProperty("--scene-depth");
      });
    };
  }, []);

  useEffect(() => {
    if (!motion) {
      document
        .querySelectorAll<HTMLElement>("[style*='--drift']")
        .forEach((element) => element.style.setProperty("--drift", "0"));
      document
        .querySelectorAll<HTMLElement>(sceneAnchors)
        .forEach((element) => {
          sceneScroll.set(element, 0);
          element.style.setProperty("--scene-depth", "0");
        });
      document
        .querySelectorAll<HTMLElement>("[style*='--chapter-travel']")
        .forEach((element) =>
          element.style.setProperty("--chapter-travel", "0"),
        );
    }
  }, [motion]);

  return (
    <>
      <div className="atmosphere" aria-hidden="true">
        <Suspense fallback={<div className="atmosphere-fallback" />}>
          <LivingBackground
            motion={motion}
            progressRef={progressValue}
            pointerRef={pointer}
          />
        </Suspense>
        <div className="atmosphere-grain" />
        <div className="atmosphere-vignette" />
      </div>
      <PointerFlow motion={motion} enabled={cursorEnabled} />
      <div className="reading-progress" ref={progress} aria-hidden="true" />
    </>
  );
}
