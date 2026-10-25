# workwithalfie-site

Static holding page for [workwithalfie.com](https://workwithalfie.com), served by GitHub Pages from the `main` branch root. No build step.

## Blog links: link only to live posts

Posts link to other posts with an include that checks the target is live, so a new post never links
to an unpublished one, and older posts' links switch on by themselves when the target publishes
(GitHub Pages rebuilds the whole site on every publish). "Live" means it is in `site.posts`: not
future-dated (`future: false`), not `published: false`, not in `preview-posts/` (excluded).

```liquid
{% include post-link.html slug="who-should-approve-crm-changes" text="who should approve CRM changes" %}
  -> a link once live; until then the text alone, as plain text

{% include post-link.html slug="who-should-approve-crm-changes" before=" More in " text="who should approve CRM changes" after="." fallback="" %}
  -> the whole " More in ... ." sentence appears only once the post is live

{% include post-live.html slug="who-should-approve-crm-changes" %}{% if post_live %}
Longer copy, with a [link]({{ post_live_url }}), shown only once the post is live.
{% endif %}
```

Use the target's final slug (its file name / `slug:`). If a post's slug changes, update every include
pointing at it in the same PR; `scripts/check-links.rb` lists pending and unknown targets.

### Before every publish PR

    BUNDLE_PATH=vendor/bundle ruby scripts/check-links.rb

It builds the site and fails if any page links to a `/blog/` URL that isn't built, or into
`preview-posts/`, or has another broken internal link.

### Linking pass after each post publishes

1. `ruby scripts/link-candidates.rb <new-slug>` (optional: `--query "target query" --phrases "a, b, c"`).
   It reads the post's `primary_keyword` and `key_phrases:` (2 to 4 phrases other pages might already
   use, e.g. `key_phrases: ["HubSpot workflows", "existing workflows"]`; falls back to
   `secondary_keywords`), and suggests up to 5 live posts/pages (1 sentence each, same category first)
   that could link to the new post, plus live posts the new post could link out to. It never edits files.
2. Add links on existing words only, no new copy. In posts use `post-link.html`; FAQ answers in
   `_data/faq.yml` render as plain text, so use an HTML `<a href>` there.
3. Run `scripts/check-links.rb`.
4. Ship it as a PR titled `Links: <post title>`.
