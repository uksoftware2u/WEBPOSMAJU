# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Durable POS Maju website direction: use the selected Emerald Product Theatre visual, premium Excel-emerald branding, tasteful lightweight motion, strong affordable positioning, authentic POS screenshots, and complete language switching for English, Simplified Chinese, Bahasa Malaysia, Thai, and Vietnamese.

Durable resources direction: expose the POS Maju YouTube video-guide playlist at `https://youtube.com/playlist?list=PLAYF-rVdF9KA&si=b8z4V-sKIYavs8os`. Until a direct installer URL is supplied, the Download action must route visitors to the inquiry form to request the latest compatible Android installer rather than presenting a broken or invented download.
The `Video Guide` and `Download` fields must also remain immediately visible in the primary navigation; do not rely only on the lower-page resources section for discovery.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.
