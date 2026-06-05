# Growth Experiments Agent Research

## Overview

This document defines the architecture for a **compound marketing agent** — a direct parallel to Ryan Carson's compound-product approach, applied to marketing campaigns instead of code.

**Core sources:**
- [snarktank/compound-product](https://github.com/snarktank/compound-product) — Autonomous product improvement via OODA loop
- [Every.to Compound Engineering](https://every.to/chain-of-thought/compound-engineering-how-every-codes-with-agents) — 80/20 planning/review, knowledge compounding
- [ghuntley/ralph](https://ghuntley.com/ralph/) — Simple looping for autonomous execution
- [compound-product README](https://github.com/snarktank/compound-product) — Canonical source for "while you sleep" compound philosophy
- **Hacking Marketing** by Scott Brinker — Agile practices applied to marketing
- [MKT1 Newsletter](https://mkt1.substack.com/) — Strategic marketing foundations (positioning, perceptions, GTM)
- [xmrit](https://github.com/xmrit/xmrit) — Statistical process control for visual signal detection

---

## The Compound Pattern

### compound-product (Original)

```
Daily Report → Analyze → Plan → Execute → PR Review
         ↑                                    ↓
         └─── Knowledge compounds via AGENTS.md ←┘
```

**How it works:**
1. **Daily Report** — Metrics (signups, errors, conversion) + user feedback
2. **Analyze** — AI picks the #1 highest-impact actionable item
3. **Plan** — Generate PRD with machine-verifiable tasks
4. **Execute** — Agent implements, runs tests, commits to branch
5. **PR Review** — Human reviews and merges (or requests changes)
6. **Compound** — Learnings stored in AGENTS.md for next cycle

**Key insight:** The human is removed from the bottleneck. "You're no longer the decider—you're the approver."

### growth-experiments (Parallel)

```
Daily Report → Analyze → Recommend → Draft → Review → Compound
         ↑                                              ↓
         └──── Knowledge compounds via AGENTS.md ←──────┘
```

**How it works:**
1. **Daily Report** — Campaign metrics (opens, clicks, conversions) + engagement data
2. **Analyze** — AI analyzes performance with XMR charts to separate signal from noise
3. **Recommend** — Generate recommendation with embedded evidence and success criteria
4. **Draft** — Agent creates markdown draft in `drafts/` folder
5. **Review** — Human approves, edits, or rejects; publishes manually; saves final version to `published/`
6. **Compound** — Agent compares draft vs published vs results; learnings stored in AGENTS.md

**The PR equivalent:** A markdown draft waiting for approval. Human doesn't implement — just approves/rejects/edits, then publishes manually.

---

## Direct Parallel Table

| compound-product | growth-experiments |
|------------------|-------------------|
| Agent writes code | Agent writes campaign content |
| Code saved to branch | Draft saved to `drafts/` folder |
| Tests run automatically | Format/link validation runs |
| PR created for review | Recommendation created with draft |
| Human merges or requests changes | Human approves, edits, or rejects |
| Merge triggers deploy | Human publishes to platform manually |
| Results tracked (errors, metrics) | Results tracked (opens, clicks, conversions) |
| Learnings → AGENTS.md | Learnings → AGENTS.md |

---

## Channel Categories

The pattern applies to ANY channel with measurable performance data, content that can be drafted, and iteration potential.

| Layer | Channels |
|-------|----------|
| **Content** | Blog, newsletter, podcast show notes, video scripts, webinar content |
| **Distribution** | Email, LinkedIn, Twitter/X, YouTube, paid ads (copy), PR pitches |
| **Conversion** | Landing pages, case studies, sales decks, one-pagers |
| **Lifecycle** | Onboarding sequences, nurture emails, re-engagement campaigns |
| **Sales Enablement** | Account briefs, personalized outreach, follow-up sequences |

---

## Scope: Optimizations AND Fresh Initiatives

The compound-product pattern supports both optimizations and fresh initiatives. The key constraint: **work that can be completed in one cycle with clear success metrics.**

| Type | Example | Fits pattern? |
|------|---------|---------------|
| Optimization | A/B test subject line | ✓ One cycle, measurable |
| Optimization | Rewrite underperforming CTA | ✓ One cycle, measurable |
| Fresh initiative | New email based on VoC patterns | ✓ If scoped to one email |
| Fresh initiative | Content addressing recurring question | ✓ If draft can be completed |
| Fresh initiative | Launch new channel | ✗ Too big for one cycle |

**How fresh initiatives emerge:**
- AGENTS.md accumulates patterns ("curiosity gaps work", "pain points outperform benefits")
- Agent notices: "We've never tested X format" or "VoC shows demand for Y topic"
- Recommendation becomes: "Create new [thing] based on [accumulated learning]"

**The compound effect:** Optimizations generate learnings → learnings suggest initiatives → initiatives generate more learnings.

---

## The Compound Loop

### Phase 1: Observe (Daily Report)

The agent needs a daily report of campaign performance.

```markdown
# Marketing Report - [DATE]

## Email Metrics (Last 24h)
- Campaign: [name]
- Sends: X
- Opens: X% (vs Y% baseline)
- Clicks: X% (vs Y% baseline)
- Unsubscribes: X

## Social Metrics (Last 24h)
- LinkedIn: X impressions, Y engagements, Z% engagement rate
- Twitter: X impressions, Y engagements, Z% engagement rate

## Anomalies
- [Any significant deviations from baseline]

## XMR Charts (Optional)
- Open rate: reports/charts/[DATE]-open-rate-xmr.png
- Click rate: reports/charts/[DATE]-click-rate-xmr.png

## Upcoming
- [Scheduled campaigns in next 48h]
```

#### XMR Charts for Signal Detection (Optional Enhancement)

XMR (Individuals and Moving Range) charts separate signal from noise in time-series data. They answer "is this change real or random fluctuation?" before the agent recommends action.

**What XMR does:**
- Shows when a metric change is real vs random fluctuation
- Uses three rules: process limits, quartile limits, runs of eight
- Color-codes violations for quick pattern recognition

**Why it fits:**
- Marketers stare at dashboards and overreact to noise
- XMR answers "is this real?" before recommending action
- Visual evidence makes recommendations more credible
- Aligns with "data over opinions" from Agile Marketing Manifesto

**Implementation:**
- Generate via script using [xmrit](https://github.com/xmrit/xmrit) (open source TypeScript)
- Store chart images in `reports/charts/`
- Embed in recommendations for complete decision context

### Phase 2: Orient (Analysis)

The agent analyzes the report and picks the **single highest-impact optimization**.

Selection criteria:
- Highest potential ROI (impact × feasibility)
- Can be completed in one cycle
- Has clear success metrics
- Doesn't require external dependencies

If XMR charts are available, the agent interprets them:
- **Signal detected:** Metric crossed control limits — real change, action warranted
- **Noise only:** Metric within control limits — no action needed, avoid overreaction

Output: JSON with priority item, rationale, success criteria.

### Phase 3: Decide (Recommendation)

The agent generates a specific, actionable recommendation with embedded evidence:

```markdown
# Recommendation - [DATE]

## Signal Detection
![Open Rate XMR](charts/[DATE]-open-rate-xmr.png)

**Interpretation:** Open rate dropped below lower control limit on [date]. This is signal, not noise (Process Limit Rule violation).

## Recommendation

**Priority:** Subject line optimization for newsletter
**Rationale:** Open rate 18% is 5 points below baseline. XMR confirms this is signal, not random fluctuation. Subject line is generic.
**Proposed change:** "How [specific benefit]" → testing curiosity gap formula
**Success criteria:** Open rate ≥ 23% (baseline recovery)

## Draft

[Full draft content below, or link to drafts/[DATE]-subject-line-test.md]
```

### Phase 4: Act (Draft Creation)

The agent creates a markdown draft in the `drafts/` folder:

```
drafts/2025-01-26-subject-line-test.md
```

**Draft metadata:**

```markdown
---
date: 2025-01-26
channel: email
recommendation: recommendations/2025-01-26.md
hypothesis: Curiosity gap formula will increase opens
status: pending_review
---

# Subject Line Test

**Subject:** How startup generalists are automating their routine work

**Preview text:** The compound effect is real.

**Body:**
[Full email content]
```

**Key insight:** compound-product stores code in git branches, not directly in production. The marketing parallel stores drafts in markdown, not directly in platforms. Human publishes manually after approval.

### Phase 5: Review (Human Approval)

Human reviews the draft and chooses:
- **Approve** → Make any edits, publish to platform manually, save final version to `published/`
- **Reject** → Discard with reason (reason feeds back to AGENTS.md)

**Published file format:**

```markdown
---
draft: drafts/2025-01-26-subject-line-test.md
published_date: 2025-01-26
channel: email
platform: beehiiv
human_edits: true
---

# Subject Line Test (Published Version)

**Subject:** How startup generalists are automating their routine work (and why you should too)

**Preview text:** The compound effect is real.

**Body:**
[Final content as published, with any human edits]
```

**Why track the final published version:**
- Agent sees what human changed (draft vs published diff)
- Learnings compound on ACTUAL content, not draft content
- Pattern library reflects real-world performance

### Phase 6: Compound (Learning)

After results are in, agent compares draft vs published vs results and logs to AGENTS.md:

```markdown
## [DATE] - Subject Line Test

**Hypothesis:** Curiosity gap formula will increase opens
**Draft:** drafts/2025-01-26-subject-line-test.md
**Published:** published/2025-01-26-subject-line-test.md
**Human edits:** Added "(and why you should too)" to subject line
**Result:** Open rate 24% (vs 18% baseline) ✓
**Learning:** Curiosity gap works for this audience. Human addition of "why you should" strengthens CTA. Add both patterns to playbook.
```

Over time, AGENTS.md becomes a pattern library of what works for YOUR specific audience.

---

## AGENTS.md Strategic Context Template

Human fills the Strategic Context section ONCE at setup. Agent reads it every cycle and fills the Learnings section continuously.

```markdown
# AGENTS.md

## Strategic Context

### 1. Audience (ICP + Persona)

**Ideal Customer Profile (Company Level)**
- Industry: [e.g., B2B SaaS, e-commerce, fintech]
- Company size: [e.g., 10-100 employees, Series A-B]
- Tech stack/signals: [e.g., uses Salesforce, hiring for X role]

**Buyer Persona (Individual Level)**
- Role: [e.g., Head of Marketing, Founder, RevOps Lead]
- Pain points: [top 3 problems they face daily]
- Jobs-to-be-done: [what they're trying to accomplish]
- Decision triggers: [what makes them buy NOW vs later]

### 2. Positioning (Who/What/Why Better)

**Who is it for?**
[One sentence describing your ideal customer]

**What is it?**
[One sentence describing your product in plain language]

**Why is it better?**
- Comparator: [who/what they'd use instead of you]
- Key differentiator: [single most compelling difference]

### 3. Perceptions (What You Want to Be Known For)

3-5 narratives you want your audience to believe about you. These guide all content.

1. **[Perception 1]**: [e.g., "We're the fastest to implement"]
   - Supporting evidence: [proof points]

2. **[Perception 2]**: [e.g., "Built by practitioners, not consultants"]
   - Supporting evidence: [proof points]

3. **[Perception 3]**: [e.g., "Results in weeks, not months"]
   - Supporting evidence: [proof points]

### 4. Voice & Tone

**We sound like:** [3-5 adjectives, e.g., direct, practical, confident]
**We don't sound like:** [3-5 anti-adjectives, e.g., corporate, salesy, vague]

**Language we use:**
- [specific phrases that are on-brand]

**Language we avoid:**
- [specific phrases that are off-brand]

### 5. Competitive Landscape

**Main competitors:**
- [Competitor A]: [their positioning, what they emphasize]
- [Competitor B]: [their positioning, what they emphasize]

**Our opportunity:** [what competitors aren't saying that we can own]

---

## Learnings (Agent Fills This)

This section grows automatically as the agent runs experiments.

### What Works
- [Agent adds patterns that drove results]

### What Doesn't Work
- [Agent adds patterns that underperformed]

### Audience Insights
- [Agent adds discoveries about what resonates]
```

### What Human Fills vs What Agent Fills

| Section | Who fills it | When |
|---------|-------------|------|
| Audience (ICP + Persona) | Human | Once at setup, update quarterly |
| Positioning (Who/What/Why Better) | Human | Once at setup, update if positioning changes |
| Perceptions (3-5 narratives) | Human | Once at setup, update annually |
| Voice & Tone | Human | Once at setup, rarely changes |
| Competitive Landscape | Human | Once at setup, update as needed |
| **Learnings (What Works/Doesn't)** | **Agent** | **Continuous, automatic** |

**The compound effect:** Human provides strategic foundation → Agent makes recommendations aligned with strategy → Agent learns what works → Learnings make future recommendations better → Cycle continues.

---

## Source Summaries

### compound-product Architecture

**Core loop:**
```
Daily Report → Analyze (Phase 1) → Plan (Phase 2) → Execute (Phase 3) → PR Review
```

**What makes it work:**
- Reads daily reports to identify the single highest-impact actionable item
- Creates PRD → breaks into 8-15 machine-verifiable tasks
- Iterates through tasks with quality gates after each
- Human review at PR level (bounded autonomy)
- Knowledge compounds via AGENTS.md (patterns, gotchas, dependencies)

**Key constraint:** Targets work that doesn't require database migrations, can be completed in a few hours, has clear success metrics, is verifiable through automated tests.

### Every.to Compound Engineering

**Core philosophy:**
- 80% on planning/review, 20% on execution (inverted from typical)
- Each feature makes subsequent features *easier* to build
- Knowledge management: bugs, insights, patterns documented for reuse

**Four phases:**
1. **Plan** — Agents research codebase and best practices
2. **Work** — Agents write code and tests
3. **Review** — Engineers assess outputs and lessons learned
4. **Compound** — Results feed back into the system

**Key insight:** "The complexity of your codebase still grows, but now so does the AI's knowledge of it."

### Ralph Pattern

**Core loop:**
```bash
while :; do cat PROMPT.md | claude-code ; done
```

**Philosophy:**
- Simple iteration creates compound improvement
- Memory persists through files (git, PROMPT.md, progress.txt)
- Each loop iteration builds on previous outputs
- Improvements come through accumulated feedback cycles

**Key insight:** Prompt engineering is the tuning mechanism. After failures, you update the prompt with guardrails.

### Ryan Carson: "How to Grow Your Startup While You Sleep"

**The old loop (human bottleneck):**
1. Human looks at dashboards
2. Human interprets data
3. Human decides what to optimize
4. Human writes specs
5. Human assigns to engineers
6. Engineers build (days/weeks)
7. Ship, measure, repeat

**Cycle time: 2-4 weeks. 4-8 experiments/month.**

**The new loop (AI-powered):**
1. AI generates daily report
2. AI picks #1 highest-impact optimization
3. AI builds it overnight
4. Human wakes up to PR
5. Review and ship

**Cycle time: 24 hours. 30 experiments/month.**

**Key quote:** "The human is removed from the bottleneck. You're no longer the decider—you're the approver."

**Application to marketing:**
- Old loop: Weekly campaign reviews, monthly reports, quarterly planning
- New loop: Daily analysis, overnight recommendations, morning approvals

### Hacking Marketing: Management Metabolism

**Concept:** The rate at which an organization updates its shared mental model of the market.

- Quarterly planning = 90-day management tempo
- Two-week sprints = 14-day tempo (543% faster)
- Daily compound loops = 1-day tempo

**Agile Marketing Manifesto (2012):**
1. Numerous small experiments over a few large bets
2. Testing and data over opinions and conventions
3. Responding to change over following a plan

**Key insight:** Faster cycles = more opportunities to learn. The compound agent runs this loop faster than humans ever could.

### MKT1: Strategic Marketing Foundations

**The Three Strategic Drivers:**

| Driver | What it answers |
|--------|-----------------|
| **Product Marketing Research** | Who are we selling to? Where do we fit? |
| **Business Model & GTM Motion** | How do we sell? |
| **Marketing Advantages** | What makes us win? |

**The Story Stack:**
```
Brand Story → Company narrative, why we exist
    ↓
Product Story → What we do, how it works
    ↓
Positioning → Who/What/Why Better vs comparator
    ↓
Perceptions → 3-5 narratives we want audience to believe (~annual)
    ↓
Messaging → Specific claims by segment/channel
```

**Key insight:** Perceptions are "what you want to be known for and what you want your audience to repeat back to you." They guide all content and cascade to goals, messaging, and roadmaps.

---

## Implementation Architecture

```
growth-experiments/
├── scripts/
│   ├── compound-loop.sh      # Main orchestration
│   ├── analyze-report.sh     # Phase 2: Analysis + XMR interpretation
│   └── generate-xmr.sh       # Generate XMR charts via xmrit
├── reports/
│   ├── [daily-reports].md    # Marketing performance data
│   └── charts/               # XMR chart images
├── recommendations/
│   └── [dated-recs].md       # Recommendations with embedded XMR
├── drafts/
│   └── [dated-drafts].md     # Agent-created drafts awaiting review
├── published/
│   └── [dated-published].md  # Final versions that actually went live
├── AGENTS.md                 # Knowledge base:
│                             #   - Strategic Context (human fills once)
│                             #   - Learnings (agent fills continuously)
├── PROMPT.md                 # Agent instructions
└── config.json               # Thresholds, channel config
```

### What Flows Where

```
External inputs:
├── Positioning docs → AGENTS.md (Strategic Context section)
├── Competitor Intel → AGENTS.md (Competitive Landscape section)
└── Performance data → reports/

Agent loop:
├── reports/ + AGENTS.md → Analysis
├── Analysis → recommendations/ (with XMR charts)
├── Recommendation → drafts/
├── Human approval → published/
└── Results + draft vs published diff → AGENTS.md (Learnings section)
```

### The Compound Mechanisms

1. **Baseline Store** — Track all metrics over time for trend detection
2. **XMR Charts** — Separate signal from noise visually
3. **Prediction Tracking** — Record predictions ("I said X would work"), compare to outcomes
4. **Pattern Library** — What works for this specific audience
5. **Draft vs Published Diff** — Learn from human edits
6. **AGENTS.md** — Strategic context + accumulated learnings

---

## Success Metrics

**Cycle velocity:**
- Old: Weekly optimization cycles
- Target: Daily optimization cycles

**Compound evidence:**
- AGENTS.md grows with actionable patterns
- Recommendations improve over time (measured by approval rate)
- Results improve over time (measured by campaign metrics)
- Human edits decrease over time (agent learns preferences)

**Portfolio demonstration:**
- Clear OODA loop running autonomously
- Knowledge compounding visible in AGENTS.md
- Human-in-loop workflow that scales
- Visual evidence via XMR charts

---

## References

- [snarktank/compound-product](https://github.com/snarktank/compound-product) — Original compound-product implementation
- [Every.to Compound Engineering](https://every.to/chain-of-thought/compound-engineering-how-every-codes-with-agents) — Compound engineering philosophy
- [ghuntley/ralph](https://ghuntley.com/ralph/) — Simple looping pattern
- [xmrit](https://github.com/xmrit/xmrit) — XMR chart generation (open source TypeScript)
- [xmrit.com/t/](https://xmrit.com/t/) — Manual XMR chart tool
- [MKT1 Newsletter](https://mkt1.substack.com/) — Strategic marketing foundations
- **Hacking Marketing** by Scott Brinker — Agile marketing practices
