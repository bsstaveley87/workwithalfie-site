---
layout: post
title: "Who should approve CRM changes, and when?"
meta_title: "Who should approve CRM changes, and when? · Alfie"
description: "Who should approve CRM changes? The person who owns the rule. Who approves merges, ownership moves and data fixes, and when approval can stop."
slug: who-should-approve-crm-changes
primary_keyword: "who should approve CRM changes"
secondary_keywords: ["CRM change approval process", "approve CRM changes", "CRM change record"]
date: 2026-10-24 # draft date; set to the real publish date when it goes live
last_modified_at: 2026-10-24
category: rules-process
tags: [approvals, crm-governance]
author: "The Alfie team"
og_title: "Who should approve CRM changes, and when?"
og_description: "Who should approve CRM changes? The person who owns the rule. Who approves merges, ownership moves and data fixes, and when approval can stop."
og_image: /assets/og/blog.png
og_image_alt: "Alfie blog: Who should approve CRM changes, and when?"
summary: "CRM changes should be approved by the person who owns the rule they touch: usually your CRM admin for merges and data rules, and the sales lead for moving accounts between reps. Deals missing details are flagged to their owner, not changed. Routine fixes can skip approval once your admin signs off that rule. Merges always need approval."
faq:
  - q: "Who should approve changes in a CRM?"
    a: "The person who owns the rule the change touches. On a small team that's usually the CRM admin for merges and data rules, and the sales lead for moving accounts between reps. Write the names down next to the rules."
  - q: "Do all CRM changes need approval?"
    a: "No. Routine fixes, like standardizing a field's format, can run without asking once the rule behind them is signed off. Merges and moving a departing rep's records should always be approved."
  - q: "What is a CRM change approval process?"
    a: "A written set of rules that says which CRM changes need a person to say yes, which person, and how the decision is recorded. It keeps hard-to-undo changes from happening quietly."
  - q: "What should a CRM change record include?"
    a: "The request, the proposed change, the rule and rule version that checked it, who approved it, the values before and after, and confirmation that the change landed."
related_pages: [/how-it-works, /security, /features]
related_posts: [/blog/should-ai-be-allowed-to-change-your-crm/, /blog/sales-rules-of-engagement-document/, /blog/merge-duplicate-companies-hubspot/]
# PREVIEW ONLY. Not for launch: remove before merging unless Ben approves it.
preview_only: true
noindex: true
sitemap: false
permalink: /blog/who-should-approve-crm-changes/
---

Most growing teams never decide who should approve CRM changes. Approval happens by habit: whoever notices, whoever's online. That works until two people make opposite calls on the same account.

## Why does a CRM change approval process matter?

It stops hard-to-undo changes from happening quietly. A CRM change approval process is a short written rule set: which changes need a person to say yes, which person, and how that yes is recorded.

Without one, three things tend to happen. Changes stall because nobody's sure they're allowed to decide. Or they happen without the right person knowing, and a rep finds a customer moved off their book. Or the same question gets a different answer each week, and the rules drift.

The CRM setup usually isn't wrong. It was built when one person made every call, and the team grew past that.

## Which CRM changes need approval, and from whom?

Match each kind of change to the person who owns the rule behind it. A starting point for a small SaaS team (Example; adjust to your roles):

| Change | Who approves | Can it run without asking later? |
|---|---|---|
| Standardizing a format, such as country or phone | CRM admin signs off the rule once | Yes, once the rule is signed off |
| Filling a missing field from a trusted source | CRM admin signs off the rule once | Yes, once the rule is signed off |
| Deal missing agreed details at a stage | Nobody: flag it to the deal owner | It's a flag, not a change |
| Merging duplicate records | CRM admin | No. Every merge is approved |
| Moving a departing rep's records | CRM admin | No. Always approved |
| Moving an account to a different rep | Sales lead | Only within rules the sales lead has signed off |
| Linking a parent and subsidiary company | CRM admin or account owner | No. AI can suggest the link, but nothing changes until a person approves it |
| Changing a rule itself | The rule's owner, often the founder or head of sales | No |

Two patterns sit behind the table. Changes that are hard to undo, or that move someone's book of business, always get a person. Changes that only tidy data can earn their way to running on their own.

## Who should the approvers be on a small team?

Usually two or three people, not a committee. A founder or head of sales owns the rules. A CRM admin, often a sales or ops lead doing it on the side, approves data changes. The sales lead approves ownership moves.

Name one person per kind of change, plus a backup for holidays. "The sales team" isn't an approver. If nobody is named, approvals stall or get waved through.

Write the names into your rules of engagement, next to the rules they approve. More in {% include post-link.html url="/blog/sales-rules-of-engagement-document/" text="what goes in a rules of engagement document" %}.

## When can a CRM change skip approval?

When the rule behind it has been signed off, and the change is easy to undo. Approval is for building trust, not for every keystroke forever.

A practical path:

1. **Start with everything approved.** Every proposed change waits for a person, so you see how each rule behaves.
2. **Sign off rules one at a time.** When your admin is happy with a rule, it can run without asking.
3. **Tie sign-off to the rule's wording.** If the rule changes, it's signed off again.
4. **Keep some changes approved forever.** Merges and moving a leaver's records never skip approval, however long a rule has run.

## How do you approve CRM changes without slowing the team down?

Bring the decision to where the approver already works, with the reason attached. A good approval request says what's changing, which rule asked for it and what the values are before and after, with approve and decline next to it.

Approving CRM changes in Slack works well for small teams, because that's where the conversation already is. Batch routine items. And make waiting the default: if nobody approves, nothing changes.

Merges deserve extra care. See {% include post-link.html url="/blog/merge-duplicate-companies-hubspot/" text="who should approve merges" %} in our guide to duplicate companies.

## What should a CRM change record show?

Enough that someone who wasn't there can tell what happened and why. For each change, record:

- the request and who made it
- the proposed change
- the rule, and the version of the rule, that checked it
- who approved it, or that the rule was signed off to run on its own
- the values before and after
- confirmation that the change landed in the CRM

A record you can export matters more than a nice screen. Terms like "change record" and "rule version" are defined in our {% include post-link.html url="/blog/revops-glossary/" text="RevOps glossary" %}.

## How does Alfie handle approvals in HubSpot?

Alfie is a RevOps service for growing SaaS companies that run on HubSpot: hands-on RevOps help plus automation that checks your HubSpot records against rules you approve and proposes fixes for your admin to approve.

Your rules say which changes need a person, and which person. Alfie is designed so that:

- Alfie asks in Slack and waits. Slack is required, and there are no email approvals.
- In the first week Alfie only reads HubSpot. Then every change waits for approval. A rule runs on its own only after your admin signs it off, and that sign-off is recorded against that version of the rule.
- Merges and moving a leaver's records always need your admin's approval.
- Deals missing agreed details are flagged, not blocked.
- It keeps a record of every change it makes that can't be edited after the fact, which you can see and export.

AI can propose a change, such as a parent and subsidiary company link, but your rules decide whether it's allowed, and nothing changes in HubSpot until it's approved. More on where AI fits in {% include post-link.html url="/blog/should-ai-be-allowed-to-change-your-crm/" text="should AI be allowed to change your CRM?" %}. See [how a change goes from request to verified](/how-it-works/), [how Alfie handles access and data](/security/) and [what core Alfie does](/features/).
