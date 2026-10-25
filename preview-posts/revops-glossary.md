---
layout: post
title: "RevOps glossary for small SaaS teams"
meta_title: "RevOps glossary for small SaaS teams · Alfie"
description: "A RevOps glossary for small SaaS teams: plain definitions of rules of engagement, territories, duplicates, merges, change records and other HubSpot terms."
slug: revops-glossary
primary_keyword: "RevOps glossary"
secondary_keywords: ["RevOps terms", "change record", "read-back verification", "least-privilege access"]
date: 2026-10-24 # draft date; set to the real publish date when it goes live
last_modified_at: 2026-10-24
category: rules-process
tags: [glossary, revops]
author: "The Alfie team"
format: glossary
og_title: "RevOps glossary for small SaaS teams"
og_description: "A RevOps glossary for small SaaS teams: plain definitions of rules of engagement, territories, duplicates, merges, change records and other HubSpot terms."
og_image: /assets/og/blog.png
og_image_alt: "Alfie blog: RevOps glossary for small SaaS teams"
summary: "RevOps comes with its own vocabulary, and you don't need all of it to run a clean HubSpot setup. This RevOps glossary gives one plain definition for each term growing SaaS teams run into, from rules of engagement and territories to weighted pipeline, and notes where Alfie uses a term in a specific way."
faq:
  - q: "What is the difference between a territory and a segment?"
    a: "A territory is usually a slice of the market by geography assigned to a rep or team. A segment groups accounts by a shared trait, such as company size or industry. Many teams assign ownership using both."
  - q: "What is the difference between weighted pipeline and a forecast?"
    a: "Weighted pipeline multiplies each open deal's amount by its stage probability. A forecast is a judgment of what will actually close in a period, which may use weighted pipeline as one input."
  - q: "What does approval-first vs a signed-off rule mean at Alfie?"
    a: "In approval-first mode, Alfie proposes fixes and every write waits for a person to approve it. With a signed-off rule, that single rule runs on its own after your admin signs off that version of the rule. Merges always need a fresh admin approval."
related_pages: [/features, /how-it-works, /security, /forecastai, /enrichai]
related_posts: [/blog/sales-rules-of-engagement-document/, /blog/who-should-approve-crm-changes/, /blog/should-ai-be-allowed-to-change-your-crm/]
# PREVIEW ONLY. Not for launch: remove before merging unless Ben approves it.
preview_only: true
noindex: true
sitemap: false
permalink: /blog/revops-glossary/
---

Alfie is a RevOps service for growing SaaS companies that run on HubSpot: hands-on RevOps help plus automation that does the repetitive HubSpot upkeep, like merging duplicates, fixing required fields and routing new contacts and companies, by rules you set and with your admin in control of what changes. Where a term means something specific at Alfie, it's marked **At Alfie**.

## Rules and process

**RevOps (revenue operations).**
The rules, systems and upkeep that keep a company's CRM, pipeline, ownership and reporting straight across sales, marketing and customer success.

**Rules of engagement.**
A short written set of rules for a revenue team covering who owns which accounts and leads, what each record needs, how disputes are settled and who approves exceptions. More in {% include post-link.html url="/blog/sales-rules-of-engagement-document/" text="what goes in a rules of engagement document" %}.
*At Alfie:* Alfie keeps your approved rules and gives you a written copy, as Markdown or PDF, that's yours whether or not you keep using Alfie. See [how it works](/how-it-works/).

**Standard rules.**
A sensible starting set of rules for the basics, such as which fields are required and how duplicates are handled, that a team adjusts and approves instead of writing from scratch.
*At Alfie:* every team starts on standard rules, adjusted to how it works and approved before anything runs.

**Rule version.**
A numbered edition of a rule, so you can tell which wording was in force when a change was made.
*At Alfie:* an admin's sign-off is recorded against a specific version of a rule; if the rule changes, it's signed off again.

**Approval.**
A named person's explicit yes before a change is made.
*At Alfie:* your rules say which changes need a person and which person, and Alfie asks them in Slack and waits. More in {% include post-link.html url="/blog/who-should-approve-crm-changes/" text="who should approve CRM changes" %}.

**Admin sign-off.**
A recorded decision by your HubSpot admin that a rule can run without asking each time.

**Approval-first (at Alfie).**
The mode where Alfie proposes each fix and every write waits for a person to approve it in Slack; every team starts here, after a first read-only week.

**Signed-off rule (at Alfie).**
A single rule that runs on its own, only after your admin has signed off that version of the rule; merges never run this way and always need a fresh admin approval.

At Alfie the rollout runs in this order:

1. **Read-only week:** Alfie reads and reports, and changes nothing.
2. **Every change approved:** Alfie proposes fixes, and each one waits for a person to approve it in Slack.
3. **Signed-off rules run on their own:** only rules your admin has signed off run without asking. Merges always wait for your admin.

**Read-only week.**
A first period where a tool can read your CRM but not change it.
*At Alfie:* in the first week, Alfie only reads, runs your approved rules in the background without changing anything, and gives you a baseline of where your data stands.

**Baseline.**
A snapshot of where your data stands against your rules before anything is fixed, so you can see what's changed since.

**Exception.**
A record or request that a rule doesn't allow as it stands, and which needs a person to decide.

**CRM governance.**
The agreed rules for who can change what in the CRM, and how those changes are checked and recorded.

## Ownership and routing

**Account ownership.**
The rule for which rep is responsible for a company record and the deals and contacts tied to it.
*At Alfie:* account ownership is a later process, added after clean data and required fields are running. See [core features](/features/).

**Territory.**
A defined slice of the market, usually by geography, assigned to a rep or team.

**Segment.**
A group of accounts sorted by a shared trait, such as company size, industry or plan, often used to decide who owns them.

**Round robin.**
A way of assigning new records by rotating through a list of reps in turn.

**Lead routing.**
The rules that decide who gets a new lead or contact, and how fast.

**Fallback owner.**
The person a record goes to when no routing rule matches it.

**Reassignment.**
Moving a record from one owner to another, for example when a rep leaves or a territory changes.

## Clean data

**Required fields by deal stage.**
The properties a deal must have before it counts as being in a given pipeline stage, such as a close date and amount at Proposal. See {% include post-link.html url="/blog/hubspot-required-fields-by-deal-stage/" text="how to set required fields by deal stage in HubSpot" %}.
*At Alfie:* deals that reach a stage without the details your team agreed are flagged, not blocked.

**Duplicate record.**
Two or more CRM records that describe the same real-world company, contact or deal.
*At Alfie:* duplicates are found by rule, such as a shared domain, not by guesswork.

**Merge.**
Combining duplicate records into one, keeping the values your rules say should win.
*At Alfie:* duplicates are merged once your admin approves, and merges always need a fresh admin approval. More in {% include post-link.html url="/blog/merge-duplicate-companies-hubspot/" text="how to merge duplicate companies in HubSpot" %}.

**Parent and child company.**
A link between a parent company record and its subsidiaries or regional offices, so related accounts roll up together.
*At Alfie:* Alfie uses AI to suggest parent and subsidiary company links, and nothing changes in HubSpot until you approve it.

**Data hygiene.**
The ongoing work of keeping CRM records accurate, complete, consistent and free of duplicates.

**Standardized field.**
A property written the same way on every record, such as one format for country names or phone numbers.

**Property.**
HubSpot's name for a field on a record, such as close date, industry or lifecycle stage.

**Property dictionary (data dictionary).**
A document that lists each property, what it means, who fills it in and which values are allowed.

**Enrichment.**
Adding company or contact details to CRM records from outside sources.
*At Alfie:* enrichment is part of [EnrichAI](/enrichai/), an optional add-on, not core Alfie.

## Changes and control

**Change record.**
A log of each change made to the CRM: what was asked, what changed, who approved it and when.
*At Alfie:* Alfie is designed to keep a record of every change it makes that can't be edited after the fact, including the request, the rule and rule version that checked it, the approver, the before and after values and the read-back. You can see and export it. See [Security](/security/).

**Audit trail.**
Another name for a change record, used when the point is being able to show who changed what and why.

**Read-back verification.**
Reading a record back from the CRM right after a write to confirm the new value actually saved.
*At Alfie:* after each write, Alfie is designed to read the record back by ID, count nothing as done until it matches, and flag any mismatch instead of hiding it.

**Least-privilege access.**
Giving a tool only the permissions it needs for the job in front of it.
*At Alfie:* Alfie asks only for the HubSpot permissions each process needs, and adds more only with your admin's approval.

**Rule check.**
A fixed test, written from your approved rules, that decides whether a proposed change is allowed.
*At Alfie:* AI proposes, and rule checks decide; if a change fails, nothing is written and Alfie says which rule it failed. More in {% include post-link.html url="/blog/should-ai-be-allowed-to-change-your-crm/" text="should AI be allowed to change your CRM?" %}.

## Pipeline and forecasting

**Pipeline.**
The set of open deals moving through your sales stages toward closed won or closed lost.

**Deal stage.**
A named step in a pipeline, such as Discovery or Proposal, that says how far a deal has progressed.

**Lifecycle stage.**
A HubSpot property that marks where a contact or company is in its relationship with you, from subscriber or lead through to customer.

**Weighted pipeline.**
The total value of open deals, with each deal's amount multiplied by the probability set for its stage.

**Forecast.**
An estimate of how much revenue will close in a period.

**Forecast category.**
A rep's or manager's call on a deal, such as commit or best case, used to build a forecast alongside stage probability.

**Slipped deal.**
A deal whose expected close date has moved into a later period.
*At Alfie:* [ForecastAI](/forecastai/) is an optional add-on: a weekly leadership forecast built from the activity logged in HubSpot, read-only, never shown to reps. Each digest shows its view next to what reps entered and HubSpot's weighted pipeline, plus deals that slipped or moved forward.

**Insufficient evidence.**
*At Alfie:* what ForecastAI says about a deal that has too little logged activity to forecast, rather than guess.
