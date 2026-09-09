# POS Maju Website — Design QA

Reference: `design-source.png`

Verified in the Codex in-app browser on 10 September 2026.

## Visual comparison

- Compared the selected reference and live implementation side by side at the same 825 px content width.
- Confirmed the emerald-and-mint brand palette, white navigation, bold editorial headline, product-device composition, real business photography, high-contrast calls to action, and alternating light/dark section rhythm.
- The implementation intentionally expands the compact reference into a complete marketing journey while retaining its visual direction.

## Responsive QA

- Desktop: 1440 × 900 — navigation, hero copy, device mockups and CTAs remain aligned without clipping.
- Mobile: 390 × 844 — navigation collapses, CTAs stack, proof points remain readable and hero imagery scales cleanly.
- Narrow mobile: approximately 305 px — removed root min-width overflow; no horizontal scrollbar remains.

## Functional QA

- Five locales validated: English, Chinese, Bahasa Malaysia, Thai and Vietnamese.
- Feature tabs, mobile navigation, FAQ accordions, smooth-scroll CTAs and inquiry form logic are wired.
- WhatsApp inquiry copy is generated from the form without storing customer details locally.
- Reduced-motion fallback is included.

## Build QA

- Production build: passed.
- Sites packaging tests: 4 passed, 0 failed.
- Standalone HTML build: passed (`POS-Maju-Website.html`).
- CSS, JavaScript and all locally bundled raster images are embedded into one file; no `/assets/` dependencies remain.
- Standalone file opened successfully in the Codex in-app browser, rendered without exposed source text, and retained the full navigation, feature content and inquiry form.
- Language selector interaction re-tested in the standalone file; Chinese-to-English switching passed.
- GitHub Pages build: passed with repository base path `/POSMAJU/`.
- GitHub Pages mobile preview: passed; logo, hero photography, device screenshots and responsive navigation all loaded from the repository subpath.
- GitHub Pages interaction check: mobile menu and Bahasa Malaysia language switch passed.
- New console errors after final reload: 0.

final result: passed
