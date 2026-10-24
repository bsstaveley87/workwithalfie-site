---
layout: post
title: "How to merge duplicate companies in HubSpot without losing data"
meta_title: "Merge duplicate companies in HubSpot safely · Alfie"
description: "How to merge duplicate companies in HubSpot safely: agree what counts as a duplicate and which values win, review the pairs, merge in small batches."
slug: merge-duplicate-companies-hubspot
primary_keyword: "merge duplicate companies in HubSpot"
secondary_keywords: ["duplicate companies", "which values win in a merge", "stop duplicates coming back"]
date: 2026-10-24 # matches the preview post date; set to the real publish date when it goes live
last_modified_at: 2026-10-24
category: clean-data
tags: [duplicates, data-cleanup]
author: "The Alfie team"
og_title: "How to merge duplicate companies in HubSpot without losing data"
og_description: "How to merge duplicate companies in HubSpot safely: agree what counts as a duplicate and which values win, review the pairs, merge in small batches."
og_image: /assets/og/blog.png
og_image_alt: "Alfie blog: How to merge duplicate companies in HubSpot without losing data"
summary: "To merge duplicate companies in HubSpot without losing data, first agree what counts as a duplicate and which values should win, and write that down. Export a backup, review the pairs, and merge in small batches, starting with the clearest matches. Then fix where the duplicates come from, or they'll be back within weeks."
faq:
  - q: "How do I find duplicate companies in HubSpot?"
    a: "Check whether your subscription includes HubSpot's duplicate management tools. If not, export companies and sort by domain and name to find candidate pairs, then review them before merging."
  - q: "Can I undo a company merge in HubSpot?"
    a: "Assume you can't cleanly undo it. Export a backup first, review each pair, and merge in small batches so mistakes are easy to spot."
  - q: "Should I merge a subsidiary into its parent company?"
    a: "Usually not. Link it to the parent as a child company instead, so you keep the structure for ownership and reporting."
  - q: "What causes duplicate companies in HubSpot?"
    a: "Usually imports, integrations that create companies, records added by hand, and different versions of a company's name or domain."
  - q: "Who should approve merging companies?"
    a: "The account owners involved and the person who owns your CRM rules. Merges of customer accounts or accounts with open deals should always have a named approver."
related_pages: [/features, /security]
related_posts: [/blog/sales-rules-of-engagement-document/, /blog/who-should-approve-crm-changes/]
---

## Why do duplicate companies keep appearing?

Because more than one thing creates company records, and they don't all match on the same details. Common sources:

- **Imports** of event or prospect lists
- **Integrations** that create companies when a contact signs up or a deal syncs
- **People** adding a company by hand without searching first
- **Different versions of a name or domain**: "Acme", "Acme Inc." and "acme.co.uk" for one business

HubSpot can associate contacts with companies by email domain, which helps. But anything that creates companies another way, or uses a different domain, can still produce a second record. As the team and the number of tools grow, the setup that worked at the start stops keeping up.

## Why does it matter?

Duplicates split the history of one customer across two records. Two reps can both believe they own the account. Activity, deals and contacts end up attached to different versions, so reports undercount, and nobody sees the full picture before a call.

## What counts as a duplicate?

Decide this before you start, and write it as a rule. A sensible order (Example; adjust to your data):

1. **Same primary domain**: almost always the same company.
2. **Same name and same country, with no domain on one record**: probably the same; review first.
3. **Same name, different domains**: often not a duplicate. It may be a subsidiary or a regional office, which should be linked to a parent company, not merged.

That third case matters. Merging a regional office into its parent loses the structure you need for ownership and reporting. Link it instead (HubSpot supports parent and child company associations).

## Which values should win in a merge?

Agree this before merging, not pair by pair. When records are merged, one record's value is kept for each property, and the others are lost or kept only in history. Check HubSpot's current documentation for exactly how your portal handles merged properties, because it varies by property.

Rules that work for most teams:

- **Company owner:** keep the current owner of the record with the most recent sales activity, and flag conflicts for the sales lead.
- **Name and domain:** keep the version that matches your naming rule.
- **Lifecycle stage:** keep the most advanced stage.
- **Values a person entered** beat values from an import, unless your rules say otherwise.

Write these down as part of your rules of engagement, so the next cleanup follows the same rules (see {% include post-link.html url="/blog/sales-rules-of-engagement-document/" text="what goes in a rules of engagement document" %}).

## How do you merge safely?

Work slowly enough that you can catch a mistake.

1. **Export a backup** of your companies first, with the properties you care about.
2. **Find candidate pairs.** HubSpot has duplicate management tools in some subscriptions; otherwise, sort an export by domain and name. Check what your plan includes.
3. **Review the list.** Mark each pair as merge, link as parent and child, or leave alone.
4. **Merge the clearest matches first,** in small batches, starting with same-domain pairs.
5. **Spot-check after each batch:** open a few merged records and confirm the owner, deals and contacts look right.
6. **Treat a merge as permanent.** Assume you can't cleanly undo it, which is why the review comes first.

## Who should approve merges?

At least the account owners for any account that matters, and ideally one person who owns the rules. A merge changes who owns what and what the history shows, so it shouldn't happen quietly. A common rule: merges of customer accounts, or accounts with open deals, always need a named approver. More in {% include post-link.html url="/blog/who-should-approve-crm-changes/" text="who should approve CRM changes, and when" %}.

That's how Alfie handles it. Duplicates are found by rule and merged once your admin approves, with the kept values chosen by rule, not by guesswork. Alfie also uses AI to suggest parent and subsidiary company links, and nothing changes in HubSpot until you approve it. Each change Alfie makes is checked against your rules and recorded. See [what core Alfie does](/features/) and [how we handle access and data](/security/).

## How do you stop duplicates coming back?

Fix the sources you found in the first step.

- **Imports:** match on domain before importing, and include the domain column.
- **Integrations:** check whether each one creates companies, and on what basis.
- **People:** make "search first" part of the rules, and keep naming consistent.
- **A regular check:** a weekly list of new companies that share a domain with an existing one. When it's empty for a month, move it to monthly.
