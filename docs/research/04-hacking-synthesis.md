# Hacking Marketing + Growth Experiments Agent: Research Synthesis

## Task

Analyze how Scott Brinker's "Hacking Marketing" informs and enhances the compound marketing agent approach developed in `05_research/`, specifically in relation to Ryan Carson's compound-product philosophy.

---

## Executive Summary

After reading the full "Hacking Marketing" book and the Ryan Carson transcript, the alignment is profound. Brinker's core concept of **"management metabolism"** — the rate at which an organization updates its shared mental model — is exactly what compound-product and growth-experiments automate. The book provides the strategic framework; the agent provides the execution engine.

**Key synthesis:** The compound marketing agent is the implementation of Brinker's vision, 10 years later, made possible by AI agents.

---

## Key Concepts from Hacking Marketing That Directly Apply

### 1. Management Metabolism (Chapter 10)

**Brinker's concept:** The frequency at which marketing plans, evaluates, and adapts.

- Quarterly planning = 90-day tempo
- Two-week sprints = 14-day tempo (543% faster)
- **Compound agent loops = 1-day tempo** (enabled by AI)

**Direct parallel to Carson:**
> "What if you wake up to a PR? Instead of deciding what to optimize, you review what was already done."

**Enhancement for growth-experiments:**
The agent should frame its daily loop as "accelerating management metabolism" — each cycle is a mini-sprint review that would take humans weeks to accomplish.

---

### 2. Customer Stories Instead of PRDs (Chapter 14)

**Brinker's insight:** Replace task-based requirements with customer stories using the template:

```
As a BUYER'S ROLE, I would like CONTENT OR EXPERIENCE so that BENEFIT/REASON WHY.
```

This is the "jobs-to-be-done" approach — what job does the customer hire this content to accomplish?

**Direct parallel to Carson:**
In the transcript, Carson explains that compound-product generates recommendations based on "what the user is trying to accomplish" — not internal metrics.

**Enhancement for growth-experiments:**

The agent should frame every recommendation as a customer story:

```markdown
## Recommendation

**Customer Story:** As a startup generalist drowning in routine work, I would like to see a thread about how someone automated their weekly reporting so that I can believe this is achievable for me.

**Why This Format:** Threads allow the "how I did it" narrative that our ICP responds to (see Learning from Jan 22).
```

This keeps recommendations customer-centric, not metric-centric.

---

### 3. Iterative vs Incremental (Chapter 11-12)

**Brinker's distinction:**

| Type | Purpose | Marketing Example |
|------|---------|-------------------|
| **Incremental** | Build out in stages (parts) | Launch website section by section |
| **Iterative** | Improve through versions | A/B test subject lines |

**Enhancement for growth-experiments:**

The initiative types in the current research map directly:

| Initiative Type | Brinker Category |
|-----------------|------------------|
| Optimization | Iterative |
| Experiment | Iterative |
| Campaign | Incremental |
| Cross-channel | Incremental |

The agent should explicitly label initiatives as iterative or incremental, and apply the appropriate success criteria:

- **Iterative:** Compare to baseline, measure improvement
- **Incremental:** Measure completeness, audience reach expansion

---

### 4. The RERO Principle: Release Early, Release Often (Chapter 11)

**Brinker:** Software's RERO (Release Early, Release Often) becomes MEMO (Market Early, Market Often).

**Direct parallel to current research:**

The growth-experiments loop is designed for MEMO — daily recommendations, overnight drafts, morning approvals.

**Enhancement:**

Add explicit MEMO framing in CLAUDE.md:

```markdown
## Philosophy

MEMO: Market Early, Market Often.

Don't wait for perfect content. Release good content, measure, iterate. Each cycle compounds your understanding. Perfection is the enemy of velocity.
```

---

### 5. The Kanban Board Workflow (Chapter 13)

**Brinker's marketing Kanban:**

```
To Do → Create → Review → Test → Done
```

With the addition of a **Triage** box for incoming requests.

**Current research gap:** The agent doesn't track workflow states explicitly.

**Enhancement:**

The agent should maintain lightweight workflow state in context.md:

```markdown
## Workflow

### In Progress
- [Channel: Twitter] Thread on compound systems (draft ready, awaiting publish)

### Triage (Incoming)
- User mentioned wanting LinkedIn content
- Noticed engagement drop needs investigation

### Done This Week
- [2026-01-24] Twitter thread published, 4.2% engagement
- [2026-01-23] Subject line test recorded
```

This mirrors Kanban without requiring infrastructure.

---

### 6. Definition of Done (Chapter 16)

**Brinker's point:** Every task needs clear criteria for "done" — especially quality criteria.

**Current research gap:** The learning entries track results but don't have explicit DoD.

**Enhancement:**

Add quality gates to initiative recommendations:

```markdown
## Initiative

**Definition of Done:**
- [ ] Draft matches Autonomous voice (no hype language)
- [ ] CTA is specific and actionable
- [ ] Hook creates curiosity without clickbait
- [ ] Content delivers value before asking for anything

**Only publish if all boxes checked.**
```

---

### 7. The 70/20/10 Budget Model (Chapter 20)

**Brinker cites Coca-Cola's allocation:**

- 70% — Known programs (status quo)
- 20% — Promising innovations (experiments showing traction)
- 10% — High-risk new ideas (unproven)

**Enhancement for growth-experiments:**

The agent should balance initiative types across this spectrum:

```markdown
## Initiative Balance

Track initiative types to maintain healthy portfolio:

- **Status Quo (70%):** Optimizations of what works
- **Scaling (20%):** Experiments that showed promise, now amplified
- **Exploration (10%):** Unproven formats, topics, or channels

If learnings show 5+ optimizations in a row with no experiments, suggest: "Time to test something new?"
```

---

### 8. Mechanisms vs Messages (Chapter 18)

**Brinker's insight:** Marketing isn't just messages (content) and media (channels). It now includes **mechanisms** — the functionality and interactivity of experiences.

- Messages = what is communicated
- Media = how and where
- **Mechanisms = what the experience does**

**Enhancement for growth-experiments:**

When recommending interactive content (calculators, assessments, quizzes), the agent should frame them as mechanisms:

```markdown
## Mechanism Opportunity

A thread delivers a message. But an interactive assessment delivers an **experience**.

**Recommendation:** Create a "Find Your Automation ROI" calculator that:
1. Asks 3 questions about their routine work
2. Calculates potential time saved
3. Delivers personalized recommendations

This is a mechanism, not content. It creates value through interaction.
```

---

## How Carson's Compound-Product Validates Brinker

The Ryan Carson transcript is essentially a 2025 implementation of Brinker's 2016 vision:

| Brinker (2016) | Carson (2025) |
|----------------|---------------|
| "Accelerate management metabolism" | "Daily reports + overnight PRs" |
| "Test and data over opinions" | "Agent analyzes metrics, suggests one action" |
| "Many small bets over few large ones" | "Atomic user stories, one feature per cycle" |
| "Done is better than perfect" | "Ship it. Wake up to a PR." |
| "Perpetual beta" | "Loop forever. Compound learnings." |

**Carson's key addition:** The human is no longer the bottleneck. They're the approver.

---

## Carson's Compound-Product Architecture (From Transcript)

Key implementation details from the Vibe Code Camp transcript:

### The Loop Structure

```
Phase 0: Daily Report (cron job generates metrics + AI analysis)
Phase 1: Analyze report → create analysis.json with priorities
Phase 2: Create feature branch + generate PRD with atomic tasks
Phase 3: Ralph loop (iterate through tasks, commit on pass, fix on fail)
Phase 4: Push branch → PR ready for review
```

### Memory Layers

Carson describes three memory layers:

1. **Long-term memory** — Trained into the model (knowledge cutoff)
2. **Medium-term memory** — AGENTS.md (patterns, gotchas, project-specific knowledge)
3. **Short-term memory** — progress.txt (learnings from current feature, may graduate to AGENTS.md)

### Key Quotes

> "The problem is that you are now the bottleneck. You need to be thinking of the ideas to improve your app and then proactively going and building those things."

> "What compound product does is basically does this in a loop automatically every day."

> "I shouldn't have to wake up and decide what got built overnight. I should wake up to a PR."

> "Eventually I should wake up to a shipped PR because I have another loop deciding if it should merge."

### The "VP" Analogy

> "This is why you hire people. This is why we used to hire VP of marketing because they would look at data every day and they would give you actionable insights. Well, it turns out for 15 cents, you can get that every day."

---

## Specific Enhancements to Compound-Marketing Research

Based on this synthesis:

### 1. Add "Customer Story" framing to recommendations

**File:** `compound_marketing_agent_implementation.md`

Change initiative output from:

```markdown
**Opportunity:** Engagement rate dropped
**Recommendation:** Test thread format
```

To:

```markdown
**Customer Story:** As a startup generalist, I would like to see how someone automated their workflow so that I can believe it's achievable.
**Initiative:** Thread showing "I built X and here's what happened"
```

### 2. Add management metabolism framing to CLAUDE.md

**File:** `CLAUDE.md` in the agent folder

```markdown
## Philosophy

You accelerate management metabolism. Humans do marketing planning quarterly. You do it daily. Each cycle is a mini-sprint review:
- Observe metrics (what happened)
- Orient (what does it mean)
- Decide (one action)
- Act (create draft)
- Compound (record learning)

This is what Scott Brinker called "hacking marketing" — but now with AI as the execution engine.
```

### 3. Add initiative balance tracking

**File:** `context.md` template

```markdown
## Initiative Balance (Last 30 Days)

| Type | Count | % |
|------|-------|---|
| Optimization | 8 | 67% |
| Experiment | 3 | 25% |
| Exploration | 1 | 8% |

**Health check:** Should be ~70/20/10. Currently over-indexing on optimization.
```

### 4. Add Definition of Done to drafts

**File:** `CLAUDE.md` initiative output format

```markdown
## Quality Gates (Definition of Done)

Before marking draft as ready:
- [ ] Voice matches brand (no hype, practical language)
- [ ] Hook creates specific curiosity
- [ ] Content delivers value before asking
- [ ] CTA is actionable
- [ ] Format fits channel best practices
```

### 5. Add mechanism recommendations

When appropriate, the agent should suggest mechanisms (interactive content), not just content:

```markdown
## Mechanism Check

Could this be interactive instead of passive?

- Thread about ROI → ROI calculator
- Post about best practices → Self-assessment quiz
- Case study → Before/after comparison tool

Mechanisms create experiences. Experiences compound differently than content.
```

### 6. Add Memory Layers (from Carson)

Adapt Carson's three-layer memory for marketing:

```markdown
## Memory Architecture

### Long-term (Model)
- Marketing best practices baked into the model
- Channel-specific conventions

### Medium-term (context.md → Learnings)
- What works for THIS audience
- Voice patterns from human edits
- Format preferences from engagement data

### Short-term (Pending section)
- Current initiative being tested
- Hypothesis waiting for results
- May graduate to Learnings after validation
```

---

## Alignment Summary

| Concept | Brinker | Carson | Growth Experiments |
|---------|---------|--------|--------------------|
| Tempo | Management metabolism | Daily loops | Daily OODA |
| Focus | Customer stories | User problems | Customer stories |
| Iteration | RERO/MEMO | Ship overnight | Draft → Review → Publish |
| Quality | Definition of Done | Acceptance criteria | Quality gates |
| Innovation | 70/20/10 | Atomic features | Initiative balance |
| Learning | Retrospectives | AGENTS.md | context.md Learnings |
| Experience | Mechanisms | Agent-native | (enhance needed) |
| Memory | N/A | 3 layers | Long/Medium/Short-term |

---

## The Agile Marketing Manifesto (2012)

Brinker reproduces the manifesto from SprintZero, which directly informs the compound pattern:

1. **Responding to change** over following a plan
2. **Rapid iterations** over Big-Bang campaigns
3. **Testing and data** over opinions and conventions
4. **Many small experiments** over a few large bets
5. **Individuals and interactions** over one-size-fits-all
6. **Collaboration** over silos and hierarchy

**How growth-experiments implements each:**

| Principle | Implementation |
|-----------|----------------|
| Responding to change | Daily metrics analysis triggers recommendations |
| Rapid iterations | One cycle = one day |
| Testing and data | Every initiative has measurable success criteria |
| Many small experiments | One atomic initiative per cycle |
| Individuals and interactions | Human approves, agent drafts |
| Collaboration | Learnings compound for future sessions |

---

## Perpetual Beta and the MVP Concept (Chapter 19)

**Brinker's key insight:** Marketing touchpoints should be treated as products in perpetual beta.

### Minimum Viable Promotion

Adapting the MVP concept:

```
What marketing hypothesis does this MVP test?
What metric(s) will serve as evidence of its success?
What value does this MVP offer its audience?
Does the quality of the MVP reflect our brand?
```

**Enhancement for growth-experiments:**

Every initiative should answer these four questions:

```markdown
## Initiative Assessment

**Hypothesis:** [What we're testing]
**Success Metric:** [How we'll know it worked]
**Audience Value:** [What they get from this]
**Brand Check:** [Does this reflect who we are? Y/N]
```

---

## Next Steps

1. **Update CLAUDE.md** with management metabolism framing
2. **Update initiative format** to use customer stories + MVP questions
3. **Add initiative balance tracking** to context.md
4. **Add Definition of Done** quality gates
5. **Add mechanism opportunity detection** for interactive content
6. **Add memory layer architecture** based on Carson's model

This synthesis doesn't require architectural changes — it's refinement of the agent's judgment layer (CLAUDE.md) based on battle-tested marketing frameworks.

---

## References

- **Hacking Marketing** by Scott Brinker (2016) — Full text read
- **Ryan Carson transcript** — Vibe Code Camp (2025) — Compound Product section
- **compound_marketing_agent_research.md** — Existing research
- **compound_marketing_agent_native_approach.md** — Agent-native simplification
- **compound_marketing_agent_implementation.md** — Implementation details
- [snarktank/compound-product](https://github.com/snarktank/compound-product) — Carson's open source repo
