## Development

When starting the dev server, use background mode:

```
npx astro dev --background
```

Manage the background server with `npx astro dev stop`, `npx astro dev status`, and `npx astro dev logs`.

**Never install dependencies while the dev server is running.** An `npm install`
can swap the Sharp binary on disk and leave the live process unable to load images
(MissingSharp, every page 500). Always:

```
npx astro dev stop && npm install && npx astro dev --background
```

## Verifying changes

```
npm run check:all
```

Runs typecheck + build + SEO + content checks. The same command runs in CI and
blocks the deploy, so run it before claiming any change is done.

## Covers

Covers live in `src/assets/covers/` and must be `.webp` at 1200x675, under 400 KB.
Unsized originals go in `covers-originals/`, which is gitignored and outside
`src/assets` on purpose, because the content check rejects anything heavier.
`node scripts/alt-review.mjs && open _alt-review.html` shows every cover next to
its current `coverAlt` for accessibility review.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
