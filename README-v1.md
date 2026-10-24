# workwithalfie.com, v1 (branch `site-v1`)

Multi-page Jekyll site. The live site stays on GitHub Pages; the preview runs on Cloudflare Pages at
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
bundle exec jekyll serve --drafts --unpublished    # also renders local blog drafts and /terms
```

Cloudflare Pages settings: build command `bundle exec jekyll build`, output directory `_site`, env `RUBY_VERSION=3.3.8`.
GitHub Pages builds with its own Jekyll and ignores the Gemfile. That is fine, because the same gem versions are pinned here.

Files with no front matter are copied through unchanged: CNAME, robots.txt, icons, fonts, favicons and og-image.png.
`_config.yml` excludes README*, Gemfile*, vendor, .bundle, _src, node_modules, tests, screens and *.log. There is no `.nojekyll`.

## Pages

| URL | Source |
|---|---|
| / | index.html |
| /how-it-works/, /features/, /forecastai/, /enrichai/, /services/, /who-its-for/, /security/, /faq/, /about/ | `<name>.html` |
| /book/ | book.html: the form (live form script, Worker endpoint, Turnstile key and field names unchanged) |
| /contact/ | contact.html: redirect stub to /book/ (noindex, not in the sitemap) |
| /privacy | privacy.html: the live text, unchanged |
| /terms/ | terms.html: `published: false`. It is not built, linked or in the sitemap until legal sign-off |
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

- `noindex_all: true` in `_config.yml` adds `noindex` to every page on the preview.
- **Go-live checklist:**
  1. Set `noindex_all: false`.
  2. Bump `last_modified_at` dates and `asset_version`.
  3. Resubmit `/sitemap.xml` in Search Console. Privacy moved from /privacy.html to /privacy; GitHub Pages serves both.
- **CTO action before the preview form can work:** add `https://site-v1.alfie-site-preview.pages.dev` to the Worker's allowed origins and its hostname to the Turnstile widget's hostname list. The preview form posts to the real Worker. All automated tests mock the endpoint.
- Links and assets are root-relative. Absolute https://workwithalfie.com URLs appear only in canonical, og:*, JSON-LD, the sitemap and the feed.
