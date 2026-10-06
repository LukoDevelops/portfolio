/** Shared scroll inputs are written once per scroll frame, with no React updates. */
export const sceneScroll = new WeakMap<Element, number>();
export const sceneAnchors =
  ".hero-stage, .project-visual, .lab-model-viewport, .about-sculpture-wrap, .contact-sculpture-wrap";
