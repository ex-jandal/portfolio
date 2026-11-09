# portfolio — abu_jandal

A simple, static, bilingual (English/Arabic) personal portfolio for **abu_jandal (ابو جندل)**.

- **Stack:** SvelteKit + `@sveltejs/adapter-static` (fully prerendered), TypeScript (light), plain CSS.
- **Theme:** [Melange (dark)](https://github.com/savq/melange-nvim) palette, flat/minimal — no rounded corners, no shadows, no gradients.
- **i18n:** English + Arabic with a language toggle, RTL via CSS logical properties, default Arabic.
- **Package manager:** **pnpm only** (`pnpm`/`pnpm dlx`). Do not use `npm`/`npx`. `pnpm-lock.yaml` is committed and `packageManager` is set in `package.json`.

## Commands

```sh
pnpm install          # install dependencies
pnpm dev              # local dev server
pnpm check            # svelte-check (types/diagnostics)
pnpm build            # production static build -> build/
pnpm preview          # preview the production build locally
pnpm deploy           # build + deploy to Cloudflare (wrangler)
```

## Editing content & translations

- **All text/content** lives in `src/lib/i18n/en.json` and `src/lib/i18n/ar.json` (profile, bio, skills, projects, links, UI labels/meta). Edit both files to keep languages in sync.
- **Styles/theme:** `src/app.css` (Melange CSS variables, layout, `border-radius: 0` everywhere).
- **Layout/page:** `src/routes/+layout.svelte`, `src/routes/+page.svelte`.
- **Static assets:** `static/` (fonts, `favicon.svg`, `robots.txt`).

## Fonts (self-hosted, woff2, no CDNs)

All fonts are self-hosted in `static/fonts/` with `font-display: swap`.

| Font | Use | License | Source |
|---|---|---|---|
| JetBrains Mono (Regular/Bold) | Latin monospace | SIL OFL 1.1 (`static/fonts/OFL.txt`) | https://github.com/JetBrains/JetBrainsMono |
| Kawkab Mono (Regular/Bold) | Arabic-capable monospace (has Arabic glyphs) | SIL OFL 1.1 (`static/fonts/KawkabMono-OFL.txt`) | https://github.com/aiaf/kawkab-mono |
| Symbols Nerd Font Mono | Nerd Font icons (by codepoint) | see `static/fonts/SymbolsNerdFont-LICENSE.txt` | https://github.com/ryanoasis/nerd-fonts (Symbols Only) |

Icons are decorative (`aria-hidden="true"`) and always paired with text labels.

## Deploy (Cloudflare)

Static assets are deployed with **Wrangler** (Cloudflare) to the Workers static-assets target.

1. Install deps: `pnpm install` (includes `wrangler`).
2. Log in (run this yourself; never paste tokens into chat): `pnpm dlx wrangler login`
3. Deploy: `pnpm deploy` (runs `pnpm build && wrangler deploy`).

Config: `wrangler.jsonc` (`name: "port"`, `assets.directory: "./build"`). Default domain is `*.workers.dev` unless you attach a custom domain.

**Automatic deploys (GitHub integration):** in the Cloudflare dashboard, create/connect a Workers/Pages project to this GitHub repo. Set the build command to `pnpm build`, the output/assets directory to `build`, and pin Node/pnpm versions to match your environment. (You can keep using `wrangler deploy` locally as well.)

## Notes

- Fully static/prerendered. No tracking or analytics. Respects `prefers-reduced-motion`.
- Verify no rounded corners: `grep -n 'border-radius' src/app.css` (should be `0 !important`).
