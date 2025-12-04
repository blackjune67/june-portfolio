# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **single-page portfolio website** for a backend developer (5+ years experience) built with vanilla JavaScript, Tailwind CSS, and Three.js. The site features interactive 3D animations, smooth scrolling, and a pixel-art aesthetic with neon green theming. It's deployed via GitHub Pages.

**Key Characteristics:**
- Static HTML/CSS/JS (no build system needed)
- Minimal dependencies - all via CDN
- Direct file editing workflow (no dev server required)
- GitHub Pages compatible (just push to master branch)

## Technology Stack

- **HTML5**: Semantic markup with Tailwind utility classes
- **CSS**: Tailwind CSS v3.4.0 (via CDN) + custom `css/style.css`
- **JavaScript**: Vanilla ES6+ in `js/main.js`
- **3D Graphics**: Three.js v0.160.0 - TorusKnot geometry with wireframe material
- **Smooth Scrolling**: Lenis v1.0.42
- **Deployment**: GitHub Pages (master branch)

## Architecture & Code Organization

### File Structure
```
portfolio/
├── index.html           # Main entry point - contains all HTML structure
├── css/
│   └── style.css        # Custom styles (Tailwind @apply, animations, pixel aesthetic)
├── js/
│   └── main.js          # All JavaScript logic (~109 lines)
├── docs/
│   └── resume.md        # Extended resume content (not used in website)
└── .cursor/
    └── rules/my-project-rules.mdc  # Project context for Cursor IDE
```

### Key Sections & HTML Structure

1. **Header (`<header>`)**: Fixed navigation with links to main sections
2. **Hero Section (`#hero`)**: 3D canvas background, name/title, buttons to GitHub/Blog
3. **Skills Section (`#skills`)**: Three skill categories (Backend, Cloud & DevOps, Frontend & AI)
4. **Projects Section (`#work`)**: Four project cards with descriptions and tech tags
5. **Career Section (`#career`)**: Timeline of three companies with achievements
6. **Contact Section (`#contact`)**: Email CTA and footer links
7. **Canvas (`#bg-canvas`)**: Fixed background for Three.js 3D rendering

### JavaScript Architecture (`js/main.js`)

The main.js file is organized into clear sections:

1. **Three.js Setup (`initThree()`)**:
   - Creates scene, camera, renderer
   - Generates TorusKnot geometry (9 radius, 2.5 tube, 150 tubular segs, 20 radial segs)
   - Uses MeshStandardMaterial with neon green (#00ff00) wireframe
   - Adds PointLight and AmbientLight for rendering

2. **Lenis Smooth Scroll**:
   - Manages smooth scroll behavior via RAF (requestAnimationFrame)
   - Tracks scroll position for 3D model rotation

3. **Fade-in Animation** (`handleFadeIn()`):
   - Watches `.fade-in` elements
   - Adds `.is-visible` class when 90% of viewport is visible (triggerBottom = window.innerHeight * 0.9)
   - Permanent fade-in (doesn't fade back out)

4. **Animation Loop** (`animate()`):
   - Continuous RAF loop for 3D rendering
   - Applies scroll-based rotation (0.0003 multiplier for both X and Y)
   - Applies idle Z-axis rotation (0.0005 constant)

5. **Resize Handler**: Recalculates camera aspect ratio and renderer size on window resize

### CSS Strategy (`css/style.css`)

**Pixel Aesthetic:**
- Press Start 2P font (English) with system-ui fallback for Korean
- Scanlines overlay via `body::after` pseudo-element (repeating-linear-gradient)
- Neon green (#00ff00) text with glow shadow effects
- Dark background (#0D0D0D) with subtle green tint sections

**Key Classes:**
- `.pixel-nav`: Navigation with glassmorphism blur effect
- `.fade-in` / `.fade-in.is-visible`: Scroll-triggered opacity + transform animation
- `.pixel-button` / `.pixel-button-secondary`: Neon buttons with offset box-shadow
- `.section-title`: Large centered text with neon color
- `.skill-pixel`: Skill tags with subtle background and border
- `.project-card-pixel`: Project cards with hover glow effect
- `.timeline-pixel` / `.timeline-item-pixel`: Career timeline with square markers

**3D Canvas Styling:**
- `#bg-canvas`: Fixed position (behind main content), 40% opacity, z-index -1

## Development Workflow

### Local Development (No Build Required)

Simply open `index.html` in a browser or use a simple HTTP server:
```bash
# Python 3
python -m http.server 8000

# Or use any static server (VS Code Live Server, etc.)
```

Then navigate to `http://localhost:8000` and edit files - changes are reflected on page reload.

### Making Changes

1. **Update Content**: Edit HTML directly in `index.html` (sections, text, links)
2. **Modify Styles**: Add/update CSS in `css/style.css` or use Tailwind classes in HTML
3. **Change 3D Animation**: Edit `js/main.js` (geometry, materials, rotation speeds, etc.)
4. **Test Responsiveness**: Use browser DevTools (mobile emulation)

### Common Tasks

**Update Portfolio Content:**
- **Skills**: Edit the flex container in `#skills` section, duplicate/modify `<span class="skill-pixel">` tags
- **Projects**: Duplicate/modify `.project-card-pixel` divs in `#work` section
- **Career Timeline**: Modify `.timeline-item-pixel` divs in `#career` section
- **Contact**: Update email link in `#contact` section

**Customize Visual Theme:**
- **Colors**: Edit Tailwind config in `<script>` tag in `index.html` (pixel-bg, pixel-text, pixel-neon, pixel-dark-green)
- **Fonts**: Modify `@import` in `css/style.css` for Press Start 2P or add new fonts
- **Animations**: Adjust transition delays (`.fade-in` transition-delay), scroll multipliers in `main.js`

**Modify 3D Scene:**
- **Geometry**: Change TorusKnot parameters or use different THREE geometry (BoxGeometry, SphereGeometry, etc.)
- **Material**: Edit color, wireframe mode, metalness, roughness in `initThree()` material definition
- **Lighting**: Adjust PointLight position/intensity or AmbientLight intensity
- **Rotation Speed**: Change multipliers in `animate()` and scroll handler (currently 0.0003 and 0.0005)

## Deployment

This site is deployed via GitHub Pages (master branch):

1. Push changes to `master` branch
2. GitHub automatically serves `index.html` as the site root
3. No build process or CI/CD needed

## Key Dependencies & Versions

- **Tailwind CSS**: v3.4.0 (CDN)
- **Three.js**: r128 (0.160.0 implied)
- **Lenis**: v1.0.42 (smooth scroll)
- **Press Start 2P Font**: Google Fonts

All loaded via CDN - no npm/package.json needed.

## Important Notes

### Pixel Rendering & Performance

- The `body` element has `image-rendering: pixelated; -webkit-font-smoothing: none;` to enforce pixel-perfect rendering
- Scanlines overlay is purely CSS (performant)
- Three.js renderer pixel ratio is clamped to max 2x (`Math.min(window.devicePixelRatio, 2)`)

### Cursor IDE Rules

The `.cursor/rules/my-project-rules.mdc` file contains Cursor-specific guidelines for this project. It's auto-applied when working in Cursor IDE.

### GitHub Pages Compatibility

- `index.html` is the entry point (no routing needed)
- CSS/JS paths are relative and work correctly with GitHub Pages
- All external resources are via HTTPS CDN links (required for GitHub Pages)

### Browser Compatibility

- Requires modern browser with WebGL support (for Three.js)
- ES6+ JavaScript features used (const, arrow functions, template literals)
- CSS Grid/Flexbox widely used (Tailwind)

## SEO & Meta

- Title: "최하준 | 백엔드 개발자 포트폴리오 [Pixel Ver.]"
- Viewport meta tag set for mobile responsiveness
- Semantic HTML5 structure (header, main, section, footer)
- Open Graph/Twitter meta tags can be added to `<head>` if needed

## Future Enhancement Ideas (Not Currently Implemented)

- Smooth scroll behavior on anchor links (currently handled by Lenis)
- Project cards with modal/detail view
- Dark/light theme toggle
- Resume PDF download
- Email contact form (would require backend)
- Internationalization (i18n) for Korean/English
- Performance monitoring (Lighthouse)

## Related Files

- `.cursor/rules/my-project-rules.mdc` - Cursor IDE context rules
- `docs/resume.md` - Extended resume (referenced in HTML but not directly displayed)
- `.git/` - Git repository with commit history
