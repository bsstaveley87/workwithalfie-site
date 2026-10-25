---
layout: post
title: "Alfie vs building HubSpot workflows yourself"
meta_title: "Alfie vs building HubSpot workflows yourself · Alfie"
description: "Building HubSpot workflows yourself works for simple, stable rules. The real work is the rules behind them and the upkeep. When to DIY, when to get help."
slug: alfie-vs-building-hubspot-workflows-yourself
primary_keyword: "building HubSpot workflows yourself"
secondary_keywords: ["build your own HubSpot workflows", "DIY workflows vs Alfie", "when to keep building your own"]
date: 2026-10-24 # draft date; set to the real publish date when it goes live
last_modified_at: 2026-10-24
category: rules-process
tags: [workflows, automation, comparison]
author: "The Alfie team"
og_title: "Alfie vs building HubSpot workflows yourself"
og_description: "Building HubSpot workflows yourself works for simple, stable rules. The real work is the rules behind them and the upkeep. When to DIY, when to get help."
og_image: /assets/og/blog.png
og_image_alt: "Alfie blog: Alfie vs building HubSpot workflows yourself"
summary: "Building HubSpot workflows yourself works well when the rule is simple, stable and someone on your team owns it. Consider ongoing help like Alfie when the rules aren't written down, several people would build or edit the automation, or changes such as merges need a person to approve them first. Many teams do both."
faq:
  - q: "Does Alfie replace our HubSpot workflows?"
    a: "No. Alfie works in your HubSpot alongside your existing workflows. It checks your records against the rules you've approved and proposes fixes for your admin to approve. During setup we list any workflows that touch the same fields, such as owner rotation, so the two don't clash."
  - q: "Can HubSpot workflows enforce required fields by deal stage?"
    a: "HubSpot lets you set required properties on pipeline stages, and workflows can help with follow-up. Deals can still reach a stage by other routes, such as imports or integrations, so it's worth checking. More in [how to set required fields by deal stage in HubSpot](/blog/hubspot-required-fields-by-deal-stage/)."
  - q: "Does Alfie use AI to make changes?"
    a: "Alfie uses AI to read requests and propose changes, and to suggest parent and subsidiary company links. Fixed checks written from your approved rules decide whether a change is allowed, and nothing changes in HubSpot until it passes and, where your rules say so, a person approves."
  - q: "Can Alfie change records without asking?"
    a: "At the start, every change waits for approval. A rule runs on its own only after your admin signs it off, and merges always need a fresh approval from your admin."
related_pages: [/how-it-works, /features, /security]
related_posts: [/blog/should-ai-be-allowed-to-change-your-crm/, /blog/hubspot-required-fields-by-deal-stage/]
# PREVIEW ONLY. Not for launch: remove before merging unless Ben approves it.
preview_only: true
noindex: true
sitemap: false
permalink: /blog/alfie-vs-building-hubspot-workflows-yourself/
---

## Is building your own HubSpot workflows a good option?

Often, yes. HubSpot workflows are a capable, built-in way to automate routine work: set a property when something happens, notify an owner, create a task, rotate new records between reps. They live where your data lives, and there's no extra tool to add. What's available depends on your HubSpot subscription, so check what your plan includes.

If you have someone who enjoys building automation and has the time to look after it, your own workflows can carry a lot of the load.

## Where does the effort really go?

Rarely into the first build. Building a workflow is usually the quick part. The effort goes into what surrounds it:

- **Deciding the rule.** "Deals at Proposal need a close date" is easy to say. Which deals, which pipeline, who's told, and what happens to the ones already there take longer to agree.
- **Writing it down.** The rule ends up encoded in the workflow's settings. Unless someone also documents it, the only record of why it exists is the workflow itself.
- **Keeping workflows from clashing.** As more people build, two workflows can write to the same field and undo each other's work.
- **Handling exceptions.** Some changes shouldn't happen automatically at all. A merge of two important accounts, or moving a customer to a different rep, usually needs a person to look first.
- **Keeping it in step.** A new territory, a new product or a new hire changes the rules. Every automation built on the old rules needs checking.

None of this is a HubSpot problem. It's what happens to any setup that doesn't get regular upkeep as the team grows.

## What does Alfie do differently?

Alfie is a RevOps service for growing SaaS companies that run on HubSpot: hands-on RevOps help plus automation that does the repetitive HubSpot upkeep, like merging duplicates, fixing required fields and routing new contacts and companies, by rules you set and with your admin in control of what changes.

It starts from the rules rather than the automation:

1. **Rules first, in writing.** You start on standard rules for the basics, adjusted to your team, and you approve them. Alfie keeps your approved rules and gives you a written copy, as Markdown or PDF, to keep wherever you like. To change a rule, you tell us, and we update it and send you the new version.
2. **Checked, then proposed.** From day one, Alfie checks your HubSpot against those rules and proposes fixes. In the first week it only reads, and gives you a baseline of where your data stands.
3. **A person approves where it matters.** Your rules say which changes need a person, and which person. Alfie asks them in Slack and waits. Merges always need a fresh approval from your admin.
4. **Verified, and recorded.** After each write, Alfie is designed to read the record back from HubSpot and count nothing as done until it matches. You can see and export a record of every change Alfie makes.

Deals that reach a stage without the details your team agreed are flagged, not blocked. See [how a change goes from request to verified](/how-it-works/).

## How do DIY workflows and Alfie compare?

| | Building workflows yourself | Alfie |
|---|---|---|
| Best for | Simple, stable, well-understood automations | Upkeep that should follow written rules your team approves |
| Who designs the rules | Whoever builds the workflow | Standard rules for the basics, adjusted to your team, approved by you |
| Where the rules live | In the workflow settings, plus any notes you keep | Kept by Alfie, with a written copy you own |
| Approvals before a change | Up to how you build it | Designed in: your rules say who approves, and Alfie asks in Slack |
| Merges | Up to your process | Found by rule, merged once your admin approves |
| Checking the result | Up to how you build it | Designed to read each change back from HubSpot and flag mismatches |
| Record of changes | HubSpot's own history, plus anything you build | A record of every change Alfie makes, which you can see and export |
| Upkeep as you grow | Your team's time | Part of the service; tell us what changed |
| Extra tools | None | Alfie, plus Slack for requests and approvals |

## When should you keep building your own?

Your own workflows are the better fit when:

- **The rule is simple and won't change much.** Notify the owner when a deal goes quiet. Set a default value on a new record.
- **Someone owns them.** One person builds, documents and checks them, and has time to keep doing it.
- **Speed matters more than sign-off.** The change is low-risk, and nobody needs to approve it first.
- **It's part of a marketing or service process.** Alfie doesn't send nurture emails or route support tickets. Those stay in your HubSpot workflows. Alfie keeps the records and ownership those workflows rely on clean.

## When does Alfie make more sense?

Alfie tends to fit when:

- **The rules live in someone's head.** Nobody can say which workflow enforces which rule, or why.
- **The person who built the workflows has moved on.** Or HubSpot sits with a founder who doesn't have time to maintain them.
- **Some changes need a person first.** Merges, reassignments and edits to what your team entered shouldn't happen silently.
- **You want a record you can hand to someone.** A written rules document and a record of each change make the setup easier to explain, audit and hand over.

## Do you have to choose?

No. Alfie works alongside the workflows you already have. During setup, we list any workflows that touch the same fields, such as owner rotation, so the two don't clash. You can keep the automations that work and let Alfie take on the rule-checked upkeep around them.

If a process is custom or was never defined, [Services](/services/) helps work out how it should run first, before anything is automated.

Related: {% include post-link.html url="/blog/should-ai-be-allowed-to-change-your-crm/" text="should AI be allowed to change your CRM?" %}, {% include post-link.html url="/blog/alfie-vs-hiring-a-revops-person/" text="Alfie vs hiring a RevOps person" %} and [what Alfie does](/features/).
