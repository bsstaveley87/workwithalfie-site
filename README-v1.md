# workwithalfie.com, v1 (branch `site-v1`)

Multi-page Jekyll site. The live site stays on GitHub Pages; the preview runs on the preview host at
https://site-v1.alfie-site-preview.pages.dev. Nothing on this branch is pushed or merged yet.

## Build

| | |
|---|---|
| Ruby | **3.3.8** |
| Bundler | 4.0.23 |
| Gems | `github-pages` 232 only (Jekyll 3.10.0). Versions are pinned in the committed `Gemfile.lock` |
| Plugins | jekyll-feed, jekyll-sitemap, jekyll-seo-tag, jekyll-paginate. All are on the GitHub Pages allow-list. There is no `_plugins/` folder |
| Build command | `bundle exec jekyll build` |
| Output dir | `_site` |

```sh
bundle config set --local path vendor/bundle
bundle install
bundle exec jekyll build                           # production build into _site
bundle exec jekyll serve                           # local server at http://127.0.0.1:4000
bundle exec jekyll serve --drafts                  # also renders local blog drafts
```

Preview host build settings: build command `bundle exec jekyll build`, output directory `_site`, env `RUBY_VERSION=3.3.8`.
GitHub Pages builds with its own Jekyll and ignores the Gemfile. That is fine, because the same gem versions are pinned here.

Files with no front matter are copied through unchanged: CNAME, robots.txt, icons, fonts, favicons and og-image.png.
`_config.yml` excludes README*, Gemfile*, vendor, .bundle, _src, node_modules, tests, screens and *.log. There is no `.nojekyll`.

## Pages

| URL | Source |
|---|---|
| / | index.html |
| /how-it-works/, /features/, /forecastai/, /enrichai/, /services/, /who-its-for/, /security/, /faq/, /about/ | `<name>.html` |
| /book/ | book.html: the form (live form script, form endpoint, spam-check site key and field names unchanged) |
| /contact/ | contact.html: redirect stub to /book/ (noindex, not in the sitemap) |
| /privacy | privacy.html: the live text, unchanged |
| /blog/, /blog/category/<slug>/, /blog/<slug>/, /blog/feed.xml | blog/, _layouts/post.html, jekyll-feed |
| 404 | 404.html |
| /sitemap.xml | jekyll-sitemap. `sitemap: false` keeps a page out |
| /llms.txt | llms.txt |

The FAQ text lives once, in `_data/faq.yml`. The visible answers and the FAQPage JSON-LD on each page are both built from it.
The nav and footer are in `_data/nav.yml`, and the shared styles are in `assets/site.css`.
Restyling is done through the CSS variables in section 1 of that file.

## Swapping the "Book a call" target

There is one setting, in `_config.yml`:

```yaml
book_call:
  url: /book/            # e.g. https://cal.com/alfie/intro once a booking tool is chosen
  label: Book a call
```

The build writes this setting into every CTA link. These are the `a[data-cta]` elements, which also act as the no-JS fallback.
It is also written into `/assets/config.js` as `window.ALFIE = { bookCallUrl, bookCallLabel }`.
At runtime `assets/site.js` rewrites every `a[data-cta]` from `window.ALFIE` and adds `rel="noopener"` for external URLs.
So you can edit `book_call.url` and rebuild. For an emergency swap without a rebuild, edit the built `/assets/config.js`.

## Blog posts and drafts

- Published posts go in `_posts/YYYY-MM-DD-<slug>.md`. A post's front matter needs: title, meta_title, description, category (one of the 5 slugs in `_data/nav.yml`), tags, summary, and `faq: [{q, a}]`.
- Drafts live in `_drafts/`, which is gitignored per ADR-0002. They never reach the public repo, the built site, the RSS feed or the sitemap. Use `--drafts` to see them locally.

## Preview vs live

- `noindex_all` in `_config.yml` is committed as **false**. Production is indexable, so merging this branch to main can never deindex it.
- The preview is kept out of search by the preview host itself: its branch preview deployments are served with an `X-Robots-Tag: noindex` header automatically. The site adds no noindex for the preview. Setting `noindex_all: true` would put `<meta name="robots" content="noindex">` on every page; never commit it as true.
- 404 and the /contact/ redirect stub are noindex on every host.
- **Go-live checklist:**
  1. Bump `last_modified_at` dates and `asset_version`.
  2. Resubmit `/sitemap.xml` in Search Console. Privacy moved from /privacy.html to /privacy; GitHub Pages serves both.
- **CTO action before the preview form can work:** add `https://site-v1.alfie-site-preview.pages.dev` to the form endpoint's allowed origins and its hostname to the spam check's hostname list. The preview form posts to the real form endpoint. All automated tests mock the endpoint.
- Links and assets are root-relative. Absolute https://workwithalfie.com URLs appear only in canonical, og:*, JSON-LD, the sitemap and the feed.

## Motion (spec v1)

- **Files.** `assets/motion.js` runs on every page (about 2.3 KB, no libraries): section reveals, nav-on-scroll, the How it works timeline fill, the ForecastAI count-up and the blog reading-progress bar. `assets/home.js` covers the hero work queue (with its pause/play control) and the flow strip.
- **CSS.** Timing tokens are `--motion-fast`, `--motion-base`, `--motion-slow`, `--ease-out`, `--rise` and `--m` in section 2 of `site.css`. The motion rules are in section 17.
- **The static HTML and CSS are the final state.** Hidden-then-reveal states only apply under `html.motion`, which the scripts add when JS runs and reduced motion is off. They also only apply to elements below the fold at load.
- **Reduced motion.** `prefers-reduced-motion: reduce` turns off every transition and animation and shows the end states.
- **Rules.** Only `transform` and `opacity` animate. The pause control's space is reserved in CSS, so CLS stays 0.
