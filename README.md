# LukoDevelops portfolio

Personal portfolio for Lukas Zemolochinas / LukoDevelops, with interactive 3D artwork, selected projects, and an animated editorial layout.

Repository: [LukoDevelops/portfolio](https://github.com/LukoDevelops/portfolio). The portfolio source is published on the main branch. Cloudflare GitHub authorization, Pages configuration, and public-host verification are pending. No live website or custom domain is claimed yet.

## Run locally

Requires Node.js 22.12+ (tested with Node.js 24.13.1).

```sh
npm install
npm run dev
```

Open http://127.0.0.1:5174/. The development server is bound to the local machine.

```sh
npm run build
npm run preview
```

The production output is `dist/`. No API keys, external font requests, or server-side runtime are required.

## Launch on Cloudflare Pages

1. Push this portfolio directory to its separate GitHub repository. Do not publish the surrounding Personal workspace.
2. Connect `LukoDevelops/portfolio` to Cloudflare Pages after the Git integration is authorized. Use production branch `main`, the repository root as the build root, build command `npm run build`, and output directory `dist`.
3. Set the build environment variable `NODE_VERSION` to `24.13.1`. Once the production address is assigned, set `VITE_SITE_URL` to that public HTTPS origin and rebuild. Use the final custom-domain origin after it is connected; do not use a preview-deployment address.
4. Verify the public site, project links, search, keyboard interaction, dialogs, motion controls, and phone layout before sharing it. Custom-domain registration and DNS configuration are separate from the Pages deployment.

`npm run build` runs TypeScript checking, Vite, and `scripts/prepare-site.mjs`. The final script uses `VITE_SITE_URL` to write the canonical URL, social-image URLs, sitemap, and sitemap reference in `robots.txt`. The value must be a public HTTPS origin without credentials, a port, a path beyond `/`, a query, or a fragment. With the variable unset, builds still work and omit URL-specific metadata and the sitemap, so local builds do not advertise an unverified address.

Cloudflare Pages' free plan is sufficient for the static build. The launch configuration and successful public deployment still need verification.

## Included

- Sculpted Three.js mechanical keyboard with chamfered keycaps, polymer micrograin, brushed-metal chassis, instanced switch housings/stems, machined screws, ventilation, LEDs, illuminated trim, and cable hardware. A raised neon LUKO plaque uses a proportional 1280 × 480 label; the spacebar retains its proportional 2048 × 288 texture. Studio reflections are generated locally and refreshed after context restoration.
- Spring-driven key travel, soft hover tilt, distance-delayed selection light waves, and staggered LEDs. A full 3 × 5 keyboard includes HTML alongside the existing technologies.
- Three original sculptural compositions (orbit, floating architecture, and portal), presented throughout selected work, the creative interlude, About, and contact. Ceramic grain, brushed and etched metal, indexed rails, clamps, lens assemblies, circuit traces, ports, processor packages, and curved turbine vanes enrich the models. Repeated details are instanced and procedural maps are shared within each scene.
- Coordinated ring motion, lens energy arcs, traveling architecture waves, and gentle light breathing. Pointer easing uses elapsed time so response stays consistent across refresh rates. Pausing retains the sculptures' current pose and ignores decorative pointer movement.
- Animated front-end glass panels with fasteners and etched details, layered back-end hardware with chips and pins, a dimensional engraved creative cube, and textured Skyline panels.
- Fullscreen procedural aurora ribbons, topographic contours, and drifting particles. Scroll position eases the palette and paths between sections; pointer movement gently bends the ribbons. The middle remains quiet for readable copy.
- A sculpted custom arrow with an exact tip, subtle banking, faceted mint/coral material, hover warmth, and click contraction. A tapered SVG ribbon, soft glow, and fine spine follow its heel through an eased rear point. The wake uses at most 16 samples, extends at most 108 px, and fades within 320 ms. Richer sage/copper ink keeps the effect visible over cream artwork, while text hover reduces its intensity. Decorative motion settles without an idle animation loop.
- A persistent cursor switch lets visitors return to the system pointer. Native hiding begins only after the custom tip has a real mouse position. Text fields, native dialogs, keyboard use, paused animations, inactive windows, drag operations, touch/pen input, coarse pointers, and forced-colors mode retain or restore the native pointer.
- Gradient typography, layered section surfaces, scrolling artwork, entrance reveals, cream-panel contour animations, and a visible reading-progress indicator. Supporting browsers use a view-timeline reveal for the creative interlude.
- Accessible controls for all 15 technologies with the same selection state, including HTML in the toolbox, hero shortcuts, and front-end overview. Interface scans, layered hardware motion, routed data signals, and a rocking creative cube animate the supporting illustrations.
- Animation pause control, reduced-motion preference, off-screen/hidden rendering suspension, capped rendering resolution, and a visual fallback when WebGL is unavailable or its context is lost. The atmosphere draws at up to 30 fps with a 1.15-million-pixel budget; its phase, scroll composition, and pointer response freeze while paused. The keyboard is capped at 1.4 million pixels and each sculpture at 1.25 million. Decorative sculpture canvases initialize as they approach the viewport.
- Responsive navigation and project overview dialogs with native focus handling.
- The creative interlude separates IDEAS IN MOTION, DESIGN × CODE × CURIOSITY, and KEEP EXPLORING into reserved metadata rows. The portal's scroll drift stays inside a bounded model viewport; the outer caption rows remain stationary. A two-row phone footer keeps all three captions visible.
- Deterministic section tracking with an end-of-page correction for Contact, layout-change observation, animated white dots, and accessible current-location markers.
- Three featured presentations, including Skyline Dynamics industry experience.
- Searchable, filterable library of 22 relevant repositories with category counts, trimmed search, a clear control, keyboard Escape clearing, focus-preserving reset, result announcements, and accessible expansion state.
- Cohesive project-card panels, subtle directional hover cues, focus highlights, refined overview dialogs, and tactile contact controls. Click targets stay stationary while their inner details respond.
- Attributed excerpts from public LinkedIn recommendations.
- Email, LinkedIn, and GitHub contact links.

## Content sources and review

`src/content.ts` contains project descriptions, skill copy, public links, overview copy, and testimonials. The GitHub catalogue was checked against the public API on September 30, 2026. The profile README and introductory hello-world repository are intentionally excluded from the work library. Forks are labeled explicitly; repository size and upstream popularity are not presented as personal achievements. This catalogue is a curated snapshot, not a live feed.

Skyline copy uses the user's descriptions of healthcare/dentistry interfaces, real-estate integration work, automotive payment-related back-end work, and past contracting/project coordination. There are no invented client names, technologies, results, or metrics. Detailed contribution evidence can be added during the case-study pass.

Testimonials are short, exact excerpts from Nicholas Evans, Timothy Williams, and William Maness, with public profile attribution and a link to the recommendations section. The AI Study Companion card is an original interface concept, labeled as such, rather than an actual app screenshot.

The previous resume PDF has outdated experience information and is not included. A reviewed final resume, the approved portrait, detailed education timeline, and expanded case studies remain future content updates. Domain configuration and public deployment are tracked in the launch steps above.

## Verification

- TypeScript checking and production build pass.
- Chrome visual inspection of the redesigned desktop opening, selected work, sculpture interlude, toolbox, About, and narrow-phone contact.
- Responsive layout checks at 320, 390, 768, 1024, 1440, and 1920 px, plus 844 × 390 landscape. No horizontal layout overflow found in the main content at these sizes. A narrow-phone social-link overflow was fixed and rechecked.
- Actual Three.js TypeScript key click updates selected skill.
- HTML skill selection updates the corresponding description.
- Search, Tools filtering, all 22 projects, and an empty result state checked.
- Mobile menu navigation and automatic menu closing checked.
- Overview dialog opening, Escape dismissal, and restoration of focus checked.
- Animation toggle checked. Fresh-load paused About-to-Contact screenshots have identical samples across the empty background gutter; the decorative cursor is removed while paused.
- The atmosphere and cursor were visually checked on dark and cream surfaces. The decorative layers preserve 3D keyboard selection, search, project-dialog focus restoration, and mobile navigation.
- The atmosphere pass rechecked page widths and contact controls at 320, 390, 768, 1024, 1440, and 1920 px, plus 844 × 390 landscape, without horizontal page overflow. Phone opening and contact were inspected visually.
- The material pass rechecked the same responsive sizes, inspected all three sculpture variants and both orbit placements, and checked the illuminated keyboard label and portal framing on a phone viewport. Production QA confirmed a 3D TypeScript key selection, search results, cursor suppression over fields, pause removal, Escape dismissal, and restored dialog focus. No browser console errors were observed.
- The motion pass verified all four header links and Contact at the end of the page, including after expansion to 22 projects and viewport resizing. Contact remains current at 320, 390, 768, 1024, 1440, and 1920 px and 844 × 390 landscape; the main page has no horizontal overflow at those sizes. The phone menu closes after selection. HTML selection works in both the 3D keyboard and toolbox. All sculpture variants and the supporting capability artwork were inspected. Paused pointer movement leaves a 16,000-pixel sample of the Contact sculpture unchanged; the decorative cursor is absent while paused.
- The custom-cursor pass checked native hiding, exact tip positioning, project/scene/external-link cues, actual 3D HTML selection, visible trail geometry and decay, system-pointer preference after reload, pause suppression, Tab fallback, text-field I-beam restoration, modal suspension, Escape dismissal, and restored project focus. Chrome touch and forced-colors emulation remove the cursor decoration and its switch; temporary emulation was reset afterward.
- The browsing polish pass checked trimmed search, clear/reset focus recovery, category counts, responsive project panels, and native dialog layout. Main content and the header have no horizontal overflow at 320, 390, 768, 1024, 1440, and 1920 px and 844 × 390 landscape. Phone navigation closes after selection and Contact remains current. Browser console errors were checked after the final production build.
- The sculpted-cursor and caption pass checked the new arrow/wake on dark and cream surfaces, live ribbon geometry and decay, exact positioning, actual Three.js HTML selection, the system-cursor switch, Tab fallback, pause removal, text-field I-beam restoration, project-dialog suspension, Escape dismissal, and restored focus. Touch and forced-colors emulation remove the cursor decoration after the capability update; both emulations were reset afterward.
- Portal labels were measured at 320, 390, 700, 768, 1024, 1440, and 1920 px plus 844 × 390 landscape. The model viewport has over 41 px of clearance to the caption text above and below it, the art block remains stationary, KEEP EXPLORING stays visible, and the page has no horizontal overflow at these sizes. Phone and desktop portal layouts were visually inspected.

Reference screenshots are kept locally in `qa/` and excluded from the repository and deployment. The Three.js bundle is lazy-loaded separately; Vite reports its expected >500 kB uncompressed chunk warning. Gzipped Three.js output is approximately 143 kB. Physical touch hardware, Safari, Firefox, and actual browser zoom have not been tested. Context-loss recovery and offscreen scheduling were reviewed in code; forced context-loss and GPU profiling were not part of browser QA.

## Assets and licenses

The keyboard geometry, labels, sculptural artwork, procedural background, cursor effects, generated reflection environment, diagrams, interface concept, and skyline illustration are generated locally from code. Fonts are self-hosted Manrope and DM Sans from Fontsource under their included OFL licenses. Lucide icons are distributed under ISC. React and Three.js retain their package licenses in the dependency tree.
