---
layout: post
title: "How to set required fields by deal stage in HubSpot"
meta_title: "Required fields by deal stage in HubSpot · Alfie"
description: "How to set required fields by deal stage in HubSpot: decide what each stage needs, keep the list short, then check the gaps stage settings miss."
slug: hubspot-required-fields-by-deal-stage
primary_keyword: "required fields by deal stage"
secondary_keywords: ["which fields to require at each stage", "set required fields in HubSpot", "what stage requirements don't cover"]
date: 2026-10-24 # matches the preview post date; set to the real publish date when it goes live
last_modified_at: 2026-10-24
category: clean-data
tags: [required-fields, deal-stages]
author: "The Alfie team"
og_title: "How to set required fields by deal stage in HubSpot"
og_description: "How to set required fields by deal stage in HubSpot: decide what each stage needs, keep the list short, then check the gaps stage settings miss."
og_image: /assets/og/blog.png
og_image_alt: "Alfie blog: How to set required fields by deal stage in HubSpot"
summary: "To set required fields by deal stage, decide what a deal must have before it can enter each stage, keep that list short, and write it down as a rule. Then mark those properties as required on each stage in your HubSpot pipeline settings, and check how imports, integrations and automations move deals, since they can skip the prompt."
faq:
  - q: "Can you make a field required only at certain deal stages in HubSpot?"
    a: "Yes. HubSpot lets you set required properties for each stage in a deal pipeline, so a field can be optional early and required later. Check what your subscription includes."
  - q: "Do required stage properties apply to imports and automations?"
    a: "Not always in the same way. The prompt appears when a person moves a deal in HubSpot. Check how imports, integrations and automations behave in your portal, and run a weekly list of deals with missing required fields."
  - q: "How many required fields should each deal stage have?"
    a: "Three or four at most. Require only fields someone uses at that stage, or people will fill them with placeholder values to get past the prompt."
  - q: "What should be required before a deal reaches Proposal?"
    a: "Usually an amount, a close date and a decision maker, so the deal can be counted in the forecast. Adjust to how your team sells."
  - q: "Should required fields be dropdowns or free text?"
    a: "Use dropdowns for anything you'll report on, such as lost reason or lead source. Free text is fine for notes nobody filters by."
related_pages: [/features, /how-it-works]
related_posts: [/blog/sales-rules-of-engagement-document/, /blog/alfie-vs-building-hubspot-workflows-yourself/]
---

## Why do required fields by stage matter?

They make each stage mean the same thing for everyone. When "Proposal" means "has an amount, a close date and a primary contact", your pipeline report and your forecast are built on deals that look alike.

Without them, stages drift. One rep moves a deal to Proposal after a first call. Another waits for a signed scope. Both deals look the same in the pipeline, and the forecast inherits the difference. The HubSpot setup was built when the team was smaller, and it hasn't kept up.

## Which fields should be required at each stage?

Only the fields someone actually uses at that stage. A good test: if nobody would notice the field was empty, don't require it.

A starting point for a typical SaaS pipeline (Example; adjust to your stages):

| Stage | Required before entering | Why |
|---|---|---|
| Discovery | Deal owner, associated company, lead source | Someone owns it and you know where it came from |
| Demo or evaluation | Primary contact, use case or problem | You know who you're talking to and why |
| Proposal | Amount, close date, decision maker | The deal can be counted in the forecast |
| Negotiation | Contract term, expected start date | Finance and onboarding can plan |
| Closed lost | Lost reason | You can learn from it |

Three rules of thumb:

- **Three or four fields per stage at most.** Long lists get filled with junk to get past the prompt.
- **Prefer dropdowns over free text** for anything you'll report on, such as lost reason or lead source.
- **Require the field at the stage where it becomes true.** Asking for a contract term at Discovery just produces guesses.

## How do you set required fields in HubSpot?

HubSpot lets you mark properties as required when a deal moves into a given stage. You set this in your deal pipeline settings, stage by stage. When someone moves a deal into that stage in HubSpot, they're asked to fill in the missing properties first.

A simple order of work:

1. **Write the rule first.** For each stage, list the required fields and one line on why. This becomes part of your rules of engagement (more in {% include post-link.html url="/blog/sales-rules-of-engagement-document/" text="what goes in a rules of engagement document" %}).
2. **Check the properties exist and are the right type.** Turn free-text fields you'll report on into dropdowns before you require them.
3. **Set the requirements stage by stage** in your pipeline settings.
4. **Tell the team** what changed and why, in one short message.

Menus and options change, and some features depend on your HubSpot subscription, so check HubSpot's current documentation for your plan.

## What do stage requirements not cover?

The prompt appears when a person moves a deal in HubSpot. Deals can also change stage in other ways, and you should check how each one behaves in your portal:

- **Imports** that create or update deals in bulk
- **Integrations** that update deal stages from other tools
- **Automations** that move deals when something else happens
- **Deals that were already past the stage** before you added the rule

Requirements also don't check whether a value makes sense. A close date in the past, or an amount of 1, will pass.

So after you set them up, run a simple check: a list of open deals at each stage that are missing a required field, or have a close date in the past. Look at it weekly until it's short, then monthly.

## How do you keep them working as the team grows?

Treat required fields as a rule you own, not a setting you forget. If you're weighing whether to automate the follow-up with workflows you build yourself, see {% include post-link.html url="/blog/alfie-vs-building-hubspot-workflows-yourself/" text="Alfie vs building HubSpot workflows yourself" %}. Three habits help:

- **Review the list when the process changes.** A new stage, a new product or a new region usually means new required fields.
- **Fix the gaps at the source.** If the same field keeps coming in empty from an integration, fix the integration rather than chasing reps.
- **Keep one owner.** One person decides what's required and approves changes. Otherwise fields get added and nobody removes them.

This is the kind of upkeep that slips when HubSpot is a side job. Alfie starts here for most teams: clean data and required fields are the first process. You approve the rules, Alfie checks your HubSpot against them every day, flags deals when they reach a stage without the details your team agreed, and proposes fixes. A person approves where your rules say so. Alfie doesn't stop a deal from moving; HubSpot's own stage settings do that part. See [what core Alfie does](/features/) and [how the first month works](/how-it-works/).
