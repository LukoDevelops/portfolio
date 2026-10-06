# LukoDevelops portfolio

Personal portfolio for Lukas Zemolochinas / LukoDevelops, with interactive 3D artwork, selected projects, and an animated editorial layout.

### October 6, 2026 career refresh

The portfolio now leads with cross-industry experience in business ownership, client relationships, operations, sales, design, analytics, and technology. Historical job titles stay accurate. All six roles sit in one expandable career journey; education states that University of London coursework, credits, and the final project are complete, with results and the formal degree award pending until December 2026. Toronto Mississauga is transfer coursework without a degree.

Visitors can explore four career perspectives, six industry families with 25 selectable sector contexts, four skill groups, and an interactive working-method console. Family and sector choices reveal confirmed client/work context; their career links open and focus the relevant experience entry. The 3D keyboard connects to a mix of professional and technical skills. The atlas uses a compact two-column family directory on phones. A shared, flat circular L seal is used in the header, atlas, passport, favicon, and social card; the sculpted keyboard remains an interactive feature. The green ticker is straight with explicit vertical clearance. The original scene artwork, cursor preferences, animation pause, responsive project catalogue, and accessible native project dialogs remain in place.

The new Coordination Studio explores three career chapters: Skyline Dynamics, the Upwork agency, and Bison Onward. Selecting a chapter changes the scale, responsibilities, and context; selecting a network node or workstream reveals real examples. A four-position delivery slider follows understand / organize / coordinate / follow-through and updates the selected node and detail. The layered network uses native SVG and CSS perspective, with lightweight pointer tilt and flowing connections, rather than an additional WebGL context. Reduced motion and the site's animation control freeze decorative movement without removing the controls.

Skyline Dynamics is identified as a past Delaware-incorporated business operated remotely from Cobourg, with US clients across industries. User-confirmed figures are explicitly separate: **US$300,000+ earned revenue** and **US$500,000+ signed contract value**. Skyline team size is **15–20 international members**. The Upwork agency had **8–10 specialists** and **approximately US$50,000 agency revenue**, explicitly labeled as an estimate. Fiverr sales are **CAD $15,000+**. Public GitHub evidence was checked on October 6: 526 authored merged WoW-Pro-Guides PRs, 19 in ALL THE THINGS, two in ResourceCalculator, and one in Questie. Shared-project authorship stays attributed to upstream communities, with direct evidence links in the open-source overview. Counts are dated snapshots.

Professional learning includes nine entries from Google, IBM, HarvardX, MITx, Queen's, and PADI. Four Coursera credentials have direct verification links; first-aid training is explicitly identified as expired in August 2024. The search/social metadata and share-card artwork also use the broader identity.

Live portfolio and free backup address: [lukodevelops.pages.dev](https://lukodevelops.pages.dev/).

Repository: [LukoDevelops/portfolio](https://github.com/LukoDevelops/portfolio). Cloudflare Pages automatically builds and deploys the main branch. The public Pages deployment is verified; custom-domain registration and configuration remain pending.

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

## Cloudflare Pages deployment

The `lukodevelops` project uses the existing GitHub integration, limited to `LukoDevelops/portfolio`. Only this repository is deployed, not the surrounding Personal workspace.

- Production branch: `main`
- Build root: repository root
- Build command: `npm run build`
- Output directory: `dist`
- Build environment: `NODE_VERSION=24.13.1`, `VITE_SITE_URL=https://lukodevelops.pages.dev`

The Pages address is free and does not require student verification or a separately purchased domain. Keep it available alongside the future custom domain: do not redirect `pages.dev` to the custom domain. Once the main domain is connected and verified, update `VITE_SITE_URL` to its HTTPS origin and rebuild; the backup address will still serve the same site.

If the custom domain has a registration or DNS problem, use the Pages URL in portfolio links while resolving it. This is a manual switch, not automatic failover. Both addresses share Cloudflare hosting, so this does not provide a separate host for a Cloudflare outage.

`npm run build` runs TypeScript checking, Vite, and `scripts/prepare-site.mjs`. The final script uses `VITE_SITE_URL` to write the canonical URL, social-image URLs, sitemap, and sitemap reference in `robots.txt`. The value must be a public HTTPS origin without credentials, a port, a path beyond `/`, a query, or a fragment. With the variable unset, builds still work and omit URL-specific metadata and the sitemap, so local builds do not advertise an unverified address.

Cloudflare Pages' free plan serves this static build. Production deployment and public browser checks passed on September 30, 2026.

## Included

- Sculpted Three.js mechanical keyboard with chamfered keycaps, polymer micrograin, brushed-metal chassis, instanced switch housings/stems, machined screws, ventilation, LEDs, illuminated trim, and cable hardware. A raised neon LUKO plaque uses a proportional 1280 × 480 label; the spacebar retains its proportional 2048 × 288 texture. Studio reflections are generated locally and refreshed after context restoration.
- Spring-driven key travel, soft hover tilt, distance-delayed selection light waves, and staggered LEDs. The 3 × 5 keyboard mixes business, client, creative, analytical, and technical skills, including HTML.
- Three original sculptural compositions (orbit, floating architecture, and portal), presented throughout selected work, the creative interlude, About, and contact. Ceramic grain, brushed and etched metal, indexed rails, clamps, lens assemblies, circuit traces, ports, processor packages, and curved turbine vanes enrich the models. Repeated details are instanced and procedural maps are shared within each scene.
- Coordinated ring motion, lens energy arcs, traveling architecture waves, and gentle light breathing. Pointer easing uses elapsed time so response stays consistent across refresh rates. Pausing retains the sculptures' current pose and ignores decorative pointer movement.
- Animated front-end glass panels with fasteners and etched details, layered back-end hardware with chips and pins, a dimensional engraved creative cube, and textured Skyline panels.
- Fullscreen procedural aurora ribbons, topographic contours, and drifting particles. Scroll position eases the palette and paths between sections; pointer movement gently bends the ribbons. The middle remains quiet for readable copy.
- A sculpted custom arrow with an exact tip, subtle banking, faceted mint/coral material, hover warmth, and click contraction. A tapered SVG ribbon, soft glow, and fine spine follow its heel through an eased rear point. The wake uses at most 16 samples, extends at most 108 px, and fades within 320 ms. Richer sage/copper ink keeps the effect visible over cream artwork, while text hover reduces its intensity. Decorative motion settles without an idle animation loop.
- A persistent cursor switch lets visitors return to the system pointer. Native hiding begins only after the custom tip has a real mouse position. Text fields, native dialogs, keyboard use, paused animations, inactive windows, drag operations, touch/pen input, coarse pointers, and forced-colors mode retain or restore the native pointer.
- Gradient typography, layered section surfaces, scrolling artwork, entrance reveals, cream-panel contour animations, and a visible reading-progress indicator. Supporting browsers use a view-timeline reveal for the creative interlude.
- Accessible controls for all 25 skills in four groups, with the same selection state used by the 15-key scene and hero shortcuts. Interface scans, layered hardware motion, routed data signals, and a rocking creative cube animate the supporting illustrations.
- Animation pause control, reduced-motion preference, off-screen/hidden rendering suspension, capped rendering resolution, and a visual fallback when WebGL is unavailable or its context is lost. The atmosphere draws at up to 30 fps with a 1.15-million-pixel budget; its phase, scroll composition, and pointer response freeze while paused. The keyboard is capped at 1.4 million pixels and each sculpture at 1.25 million. Decorative sculpture canvases initialize as they approach the viewport.
- Responsive navigation and project overview dialogs with native focus handling.
- The creative interlude separates IDEAS IN MOTION, PEOPLE × IDEAS × POSSIBILITY, and KEEP EXPLORING into reserved metadata rows. The portal's scroll drift stays inside a bounded model viewport; the outer caption rows remain stationary. A two-row phone footer keeps all three captions visible.
- Deterministic section tracking with an end-of-page correction for Contact, layout-change observation, animated white dots, and accessible current-location markers.
- Three featured presentations, including Skyline Dynamics industry experience.
- Searchable, filterable library of 22 relevant repositories with category counts, trimmed search, a clear control, keyboard Escape clearing, focus-preserving reset, result announcements, and accessible expansion state.
- Cohesive project-card panels, subtle directional hover cues, focus highlights, refined overview dialogs, and tactile contact controls. Click targets stay stationary while their inner details respond.
- Attributed excerpts from public LinkedIn recommendations.
- Email, LinkedIn, and GitHub contact links, plus downloadable resume and cover letter PDFs.

## Content sources and review

`src/content.ts` contains project descriptions, skill copy, public links, overview copy, and testimonials. `src/background.ts` supplies the career perspectives, industry families and sector contexts, experience journey, and working-method copy. `src/LeadershipStudio.tsx` contains the user-confirmed leadership chapters and responsibilities; `src/CareerContext.tsx` connects their controls to the experience journey. The repository collection was checked on September 30, 2026, and direct contribution evidence was checked against GitHub on October 6, 2026. The profile README, introductory hello-world repository, and this portfolio are intentionally excluded from the work library. Forks are labeled explicitly; repository size and upstream popularity are not presented as personal achievements. This catalogue is a curated snapshot, not a live feed.

Skyline copy uses the user's descriptions of cross-industry US client delivery, healthcare/EHR work, real-estate interfaces, automotive payments and vehicle showcases, e-commerce systems, AI/ML, DevOps, international leadership, invited conference discussions, quarterly/annual priorities, budgeting, forecasting, financial planning, legal administration, and taxes. Bison investment-advice copy concerns business spending and technology investment. Expanded sector contexts do not invent client-specific case studies. The revenue and signed-contract figures were separately confirmed by the user. There are no invented client names or performance results. Open-source case studies link directly to verified upstream contributions and distinguish personal work from shared-project authorship.

Testimonials are short, exact excerpts from Nicholas Evans, Timothy Williams, and William Maness, with public profile attribution and a link to the recommendations section. The AI Study Companion card is an original interface concept, labeled as such, rather than an actual app screenshot.

The cross-industry 2026 resume and cover letter are available in `public/documents/` and linked from Contact. They are copied from the finalized PDFs in the parent workspace; updates to those source documents must also be copied into this repository before deployment. The experience journey includes the education timeline, and project overviews include direct contribution evidence and expanded client-delivery context. The current site uses original artwork rather than a portrait. The free public address is live; custom-domain configuration remains a separate step.

## Verification

### October 6, 2026 leadership and identity refinement

- TypeScript checking and the production build pass; public and built career PDFs exactly match the finalized parent documents. The SVG favicon and 1200 × 630 share-card PNG use the shared circular seal.
- Chrome checks at 320, 390, 640, 768, 1024, and 1920 px found no horizontal page overflow; sector and studio panels stayed contained. The ticker is straight and has 42 px phone / 54 px desktop clearance below it.
- All three leadership chapters, secondary sector controls, the Consulting-to-Bison career link, focused experience opening, Home / End keyboard control of the delivery slider, and animation pause passed.
- Decorative network layers do not intercept controls. Pointer clicks on the Priorities and Business nodes passed after that fix.
- Desktop atlas/network and 320 px studio detail / 390 px atlas were visually inspected. Other browsers and physical touch hardware were not tested in this refinement.

### October 6, 2026 initial refresh

- TypeScript checking and production build pass. The final build includes the refreshed share card and synchronized 2026 career PDFs.
- Isolated Chrome checks passed at 320, 390, 640, 768, 1024, 1440, and 1920 px, plus 844 × 390 landscape. No page overflow or colliding industry controls were found.
- Career-perspective selection, industry selection, grouped skills including PowerPoint and HTML, the experience accordion, working-method steps, Skyline's project dialog and Escape dismissal, and the Contact active indicator all passed.
- Reduced-motion disables the atlas animation. No page errors were observed.
- Desktop opening, industry atlas, toolbox, timeline, phone atlas, and share-card artwork were rendered and visually inspected. Phone industry controls use two columns to avoid overlap.
- Other browsers and physical touch hardware were not tested in this refresh.

### Earlier design checks

- The free public Pages deployment was checked in Chrome: desktop and 390 px phone layouts, project search, project dialog and Escape dismissal, HTML selection, Contact navigation, correct canonical/social-image origin, and no browser console errors.
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
