# SARC homepage design specification

## Homepage refinement, 24 October 2026

This is the current direction for the web homepage. The older mockup specification below is retained as design history where it differs from the implementation.

**Brief:** Present SARC as the student and alumni bridge at IIT Bombay. Help students find initiatives, alumni find the team, and both groups reach events and the gallery. Use real photographs and the existing React app. Only the homepage changes.

**Concepts considered:**

1. **The living archive:** a dense collage of SARC events. Memorable, but it would bury the practical routes people need.
2. **The campus bridge:** a restrained institutional page moving from one human conversation to the wider community. Chosen because the original SARC photographs make the idea specific and credible.
3. **The initiative directory:** a utility-first index of all programs. Useful, but it would duplicate the dedicated initiatives page.

**Concept card:** The homepage moves from one connection to many. The hero gathering establishes the community; an individual conversation follows. A dated list of the three nearest SARC events sits beside an Alumination feature, inspired by the clarity of alumni event calendars while using SARC's own names, people and colors. ASMP and ILP show people at work in larger photographs; the gallery widens the view. The signature moment remains the quiet rotation of real photographs in the hero. Motion settles rather than bounces. The first frame reads as a photograph-led poster even when motion is disabled.

**System:** Navy `#011627` remains the structural field and text; indigo `#140d4f` brings through the Contact and Gallery palette in the Alumination feature and archive; forest `#04724d` marks primary actions; copper `#cf743f` draws from Gallery's orange for the festival action and event dates; paper `#fdfffc`, mist `#e8f0ec`, and warm stone `#f2e9de` give reading sections distinct weights. Mint `#2dd881` marks the selected photograph. Cabinet Grotesk handles display headings, Switzer handles copy and controls. A shared content grid, rectangular image crops, short arrow movements, and fine dividers keep the page consistent. Desktop sections alternate hero, three quick routes, split about, the event-list and feature pair, two image-led program rows, asymmetric gallery, and a direct contact close. Mobile stacks each section in a deliberate reading order. The header uses the SARC mark alone; the footer repeats it with a labeled quick-link list. Lenis smooths homepage wheel and anchor travel while honoring reduced motion and native touch scrolling.

**Content rule:** No unsupported reach metrics, dated event claims, or invented credentials. The event list is sourced from InstiApp's public SARC events API through a small same-origin backend endpoint, cached for 15 minutes. It filters ended events, sorts by start time, and returns the nearest three. The browser also removes elapsed events each minute and refreshes the feed every 15 minutes. A dated local fallback covers an unavailable feed and naturally expires. Event rows and the Alumination feature link to InstiApp; the requested "Explore more events" line links to the existing Initiatives page. The mock interview listing is temporarily excluded because its structured dates conflict with its description. Current event imagery can be replaced with an official Alumination 2026 photo or poster supplied by SARC.

**Performance and access:** Homepage photographs have WebP derivatives. The initial photograph gets priority, subsequent media is lazy where useful. The layout retains a visible skip link, one H1, focus indicators, mobile navigation with Escape, 44px menu control, and reduced-motion handling.

**Revision:** final review direction, 22 October 2026
**Scope:** homepage only
**Reference viewports:** desktop 1440px, tablet 834px, mobile 390px
**Deliverables:** responsive preview references, the implemented React website homepage and a companion Expo/React Native app in this repository.

## 1. Purpose and audience

Present the Student Alumni Relations Cell at IIT Bombay clearly and help visitors reach its official programs, events and resources. Serve current students looking for guidance, alumni exploring participation, and visitors learning about SARC.

The page should feel institutional, welcoming and active. Real SARC photography and accurate program names carry the identity. Avoid invented slogans, unsupported participation metrics and decorative status badges.

## 2. Final direction

Use the original SARC mark, strong but restrained typography, navy structure, forest-green emphasis, and generous reading surfaces. Photography remains the dominant expressive element. Large sections vary in composition rather than repeating identical cards.

The latest refinement makes two deliberate changes:

- The hero's SARC heading is smaller, lower and more comfortably spaced. Its description and action share the same left alignment.
- About SARC becomes a complete image-and-text composition. A real interaction photo occupies the former empty column; the section label belongs with the introduction.

Fluidity means smooth scaling and consistent visual continuity. Transparency is reserved for controls over photography. Body text and reading surfaces remain opaque.

## 3. Information architecture

1. Institutional header with original logo, IIT Bombay descriptor, Programs, Events, About SARC and primary action.
2. Rotating photo hero with SARC title, factual description, initiative action and playback controls.
3. Three direct routes: alumni mentorship, upcoming events, program directory.
4. About SARC: interaction photograph, factual introduction, supporting paragraph and official information link.
5. Programs: featured ASMP story, supporting PMP and ILP listings, additional initiative links.
6. Events: forest-green section with Alumination feature and dated event listings.
7. Gallery: varied documentary images with concise captions.
8. Footer: original mark, official resources, location and social link.

## 4. Palette

Use only the supplied palette for interface colors. Natural photographic colors are retained. Opacity may derive borders and overlays from these values.

| Token | Value | Role |
|---|---|---|
| Navy | `#011627` | Core text, hero base, footer, primary actions |
| Indigo | `#140D4F` | Reserved secondary blue emphasis |
| Forest | `#04724D` | Events field, key links, semantic emphasis |
| Emerald | `#2DD881` | Active photo selector, small action accents |
| Teal | `#2EC4B6` | Supporting labels on dark surfaces |
| White | `#FFFFFF` | Text on dark fields, light controls |
| Paper | `#FDFFFC` | Main reading canvas |

Keep navy and forest as the dominant structural colors. Emerald is a small accent, not a large neon field. Use navy text on emerald. Do not introduce extra gray, cobalt, cream or purple gradient colors.

Suggested semantic tokens: `--ink: navy`, `--surface: paper`, `--action: forest`, `--active: emerald`, `--line: rgba(1,22,39,.18)`. Components refer to semantic tokens so a future adjustment stays coherent.

## 5. Typography

**Display:** Cabinet Grotesk, weights 500, 700 and 800.
**Body and interface:** Switzer, weights 400, 600 and 700.
**Source:** Fontshare. Original web/native font files are fetched from Fontshare's official API during `npm ci` and kept out of Git under the ITF Free Font License.

| Element | Desktop | Tablet | Mobile |
|---|---|---|---|
| Hero SARC | Up to 148px | 132px | Fluid 80–100px |
| Section titles | Fluid 42–59px | About 48px | 42px |
| About statement | Fluid 30–43px | 32px | 32px |
| Program titles | 31–34px | 25–30px | 27–30px |
| Main body | 16px | 15–16px | 16px |
| Supporting captions | 12–13px | 12–13px | 12–13px |

Hero tracking: `-0.025em`, leading `0.92`. About heading tracking: `-0.025em`, leading `1.1–1.12`. Body leading: `1.5–1.6`. Use fluid sizing within each layout range; change layout at deliberate breakpoints. Never distort text through horizontal transforms or substitute a new family mid-scroll.

## 6. Layout and borders

- Desktop content margins: 64px; tablet: 36px; mobile: 20px.
- Hero and green event section outer margins: 24px desktop, 10px mobile.
- Main content has a maximum width of 1440px.
- Media containers: 12px radius; smaller thumbnails: 8px.
- Buttons and photo controls: pill/circle geometry, consistently applied.
- Section separators: 1px navy at 18% opacity.
- Hero inset keyline: 1px white at 30% opacity, inset 18px desktop and 10px mobile.
- Photography remains sharp. Avoid large blurred shadows and nested ornamental frames.
- Shared alignment lines connect header branding, hero content and section content.

## 7. Hero composition and behavior

Place SARC in the lower-left region, above the purpose statement and action. At desktop size the heading is materially smaller than the earlier 180px version. Keep a clear gap between the action and bottom caption/control row.

Exact supporting copy:

> Mentorship, events and initiatives for IIT Bombay students and alumni.

Use three existing SARC gallery images. Desktop/tablet begins with the outdoor group image. Mobile begins with the Alumination stage group image to avoid excessive canopy and empty background. The slideshow retains the same identity and action throughout; only photography changes.

The transparent playback backplate uses navy at 36% opacity, a subtle white border and an 8px backdrop blur. Controls must remain legible when blur is unsupported. Selected control uses emerald with navy text.

**Implemented:** 3.5-second autoplay interval, a gentle crossfade, manual numbered selection, pause/play, hidden-tab pause on web, app-background pause on native, and reduced-motion autoplay disabled. The headline stays still during transitions.

**Potential later refinements:** pause autoplay while focus is inside controls and while the hero is off-screen; preload only the next necessary image. An explicit user pause already persists until they resume. The homepage does not delay content behind a loader.

## 8. About SARC composition

Desktop uses approximately 44% image and 56% copy, separated by a fluid 30–72px gap. The photograph is 310px high with a restrained border and a caption below. Tablet uses a 300px crop. Mobile stacks the 235px image above the introduction with a 26px gap.

The section label sits above the statement inside the text column. The supporting paragraph and official ACR link follow vertically, removing the detached label and empty space of the previous design.

Use the actual repo photograph `gallery/gallery/5.JPG`. Caption it descriptively as a student and alumni interaction. Do not invent the person's name, event or date.

## 9. Programs, events and gallery

ASMP receives the larger image-led feature. PMP and ILP use compact editorial rows with thumbnails, readable summaries and explicit destination links. Additional initiatives appear as directory links, not another repeated card grid.

The events section uses a full forest field with white text. The Alumination feature is visually distinct from the adjacent date-led event list. Dates must be data-driven in production; remove or archive expired entries automatically.

The current mockup uses event information previously checked on IIT Bombay InstiApp as of 22 October 2026. It is a design snapshot, not a live calendar.

Gallery photography is documentary. Use verified event captions where available and descriptive captions otherwise. Some program photos illustrate SARC activity; they are not verified documentation of a particular program session.

## 10. Motion and continuity specification

| Interaction | Treatment | Status |
|---|---|---|
| Hero photo rotation | 3.5-second interval, 850ms crossfade | Implemented |
| Button hover | Small arrow rotation and field response | Implemented |
| Media hover | Gentle 1.025–1.03 scale inside fixed crop | Implemented |
| Navigation hover | Short underline reveal | Implemented |
| In-page navigation | Lenis on fine-pointer web devices; native ScrollView on Android/iOS | Implemented |
| Section arrival | 12–16px translation with opacity, 500–650ms; once per section | Specified for integration |
| Child sequence | 40–60ms stagger, only within a meaningful group | Specified for integration |
| Between internal pages | Existing routes retain their current navigation behavior | Outside homepage scope |

Use a restrained ease-out family such as `cubic-bezier(.22,1,.36,1)`. Animate transform and opacity. Keep document flow stable. Avoid parallax behind reading text, scroll hijacking, character scrambling and a reveal on every paragraph.

Reduced motion: no autoplay, parallax, page transition or scroll animation. All content must be visible without JavaScript. Do not intercept links to external initiative sites to animate their navigation.

## 11. Responsive and accessibility requirements

- Compose, rather than shrink, the mobile layout. Use the separate hero crop and stack About, programs and events.
- Header menu is a visible button with expanded state; Escape closes it and returns focus appropriately.
- Keep one H1, ordered section headings, semantic navigation and real links.
- Include a skip link and visible focus styles.
- Body copy remains readable against solid surfaces. Check AA contrast for all states during production integration.
- Hero photo controls use 44px touch targets on web and native.
- Preserve browser scrolling, native cursor, keyboard navigation and reduced-motion preferences.
- Ensure content remains visible if scripts, animation libraries or backdrop filters fail.

## 12. Asset and integration handoff

Prototype: `sarc-polished-interactive-preview.html`. Supporting assets are in `sarc-polished-assets/` alongside this document. PNGs include full-page desktop, tablet and mobile renders, a responsive overview, and an About detail image.

Suggested homepage responsibilities for the existing application: `HomeHero`, `HomeQuickLinks`, `HomeAbout`, `HomePrograms`, `HomeEvents`, `HomeGallery` and the existing site header/footer. These are proposed component boundaries, not verified existing filenames. Use the existing React/router/styling stack and inspect the current repository before implementation.

Keep content separate from presentation. Event records should hold title, date range, location, image, destination and status; initiative records should hold name, acronym, summary, category and verified destination. Verify destination URLs again before shipping because some SARC subdomains have served different program content during research.

Native photographs are optimized JPEG assets. The existing website still imports the repository's larger source photographs; responsive AVIF/WebP derivatives and lazy loading remain performance follow-up work before deployment.

## 13. References

- [OHO alumni website collection](https://www.oho.com/blog/college-university-alumni-websites): research shortlist.
- [Stanford Alumni](https://alumni.stanford.edu/): persistent institutional identity and useful resource access.
- [Brown Alumni & Friends](https://alumni-friends.brown.edu/): clear participation routes and campus photography.
- [Caltech Alumni](https://www.alumni.caltech.edu/): descriptive program navigation.
- [IIT Bombay ACR: SARC](https://acr.iitbombay.org/sarc/): organisational purpose and initiatives.
- [IIT Bombay InstiApp: SARC](https://gymkhana.iitb.ac.in/instiapp//org/sarc): programs and event listings.
- [IIT Bombay Alumni Association: SARC](https://www.iitbombay.org/page/sarc): role and relationship to the institute.

References informed information hierarchy and visual craft. SARC copy and imagery come from SARC/IIT Bombay sources, not other universities' slogans.

## 14. Review status

This specification now accompanies the implemented website homepage and Expo app. The responsive static previews remain visual references. CI website build, native typecheck, lint, Expo Doctor and platform export validate the source; browser review verified the website first frame and native web layout. Device testing, real deployment, accessibility and network-performance audits, and current event data verification remain release checks.
