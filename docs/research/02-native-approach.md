# Growth Experiments Agent: Agent-Native Approach

> Alternative research exploring a simpler, agent-native architecture. See `compound_marketing_agent_research.md` for the original infrastructure-heavy approach.

---

## Executive Summary

The original research describes a system with 3 scripts, 5 folder types, and external tooling dependencies. This is infrastructure engineering, not agent-native design.

**Agent-native principle:** Two files — CLAUDE.md (judgment) + context.md (state). Everything else is generated output, not architecture.

This document proposes a simplified approach that:
- Delivers value immediately (no setup required)
- Preserves the OODA loop and compound learning mechanism
- Starts with Twitter analytics, designed for multi-channel extensibility
- Can be built and tested in under 2 hours

---

## Agent-Native Principles

### The Core Constraint

From the `creating-agents` skill:

> "Universal structure for agent-native apps: Two files only — CLAUDE.md (judgment) + context.md (state). That's all that's required. Two files. One for judgment, one for state."

### Five Principles

| Principle | Requirement |
|-----------|-------------|
| **Universal Structure** | Two files: CLAUDE.md + context.md |
| **Granularity** | Tools are atomic primitives. Features are outcomes achieved by agents in loops. |
| **Parity** | Whatever users can do, agents must achieve through tools |
| **Composability** | New features = new prompts, not new code |
| **Improvement Over Time** | Agent-native apps improve without shipping code |

### UX Mandates

- Agent acts first on startup
- One question at a time during onboarding
- Agent suggests, user validates
- Value delivered before secondary config collected
- Context compounds through session history

---

## Evaluation of Original Research

### Principle 1: Universal Structure ❌ VIOLATED

**Original design:** 8+ file types
```
scripts/compound-loop.sh, analyze-report.sh, generate-xmr.sh
reports/[daily-reports].md, charts/
recommendations/[dated-recs].md
drafts/[dated-drafts].md
published/[dated-published].md
AGENTS.md
PROMPT.md
config.json
```

**Problem:** This prescribes infrastructure. The agent doesn't need folders to follow a workflow — it needs instructions.

---

### Principle 2: Granularity ❌ VIOLATED

**Original design:** Workflow-shaped phases baked into architecture
- Phase 1: Observe (Daily Report)
- Phase 2: Orient (Analysis)
- Phase 3: Decide (Recommendation)
- Phase 4: Act (Draft Creation)
- Phase 5: Review (Human Approval)
- Phase 6: Compound (Learning)

**Problem:** This describes HOW the agent works, not WHAT capabilities it has. If you want to change the loop, you'd have to refactor the architecture.

**Fix:** The OODA loop emerges from the prompt, not from folder structure.

---

### Principle 3: Parity ✅ PARTIALLY MET

Agent can read metrics, analyze, recommend, draft. Human must:
- Publish to platform manually
- Record results back

This is intentional human-in-loop design, which is fine. But the friction is high.

---

### Principle 4: Composability ❌ VIOLATED

**Problem:** Adding XMR charts requires new scripts, new folders, new tooling dependencies.

**Test from the skill:** "Can you add a feature by writing a prompt instead of code?"

XMR fails this test. It's premature optimization.

---

### Principle 5: Improvement Over Time ✅ MET

AGENTS.md accumulates learnings. This is the core compound mechanism and it's sound.

---

### UX Checklist

| Requirement | Original | Verdict |
|-------------|----------|---------|
| Agent acts first on startup | Not specified | ❌ |
| One question at a time | Not specified | ❌ |
| Agent suggests, user validates | ✓ Recommendations | ✅ |
| Context compounds | ✓ AGENTS.md learnings | ✅ |
| Value before config | Requires full strategic context first | ❌ |

---

## Simplified Architecture

### Structure

```
growth-experiments/
├── CLAUDE.md              # Agent brain (all instructions)
├── context.md             # Mutable state (learnings, metrics, strategic context)
├── channels/
│   └── twitter.sh         # v1: Fetch Twitter metrics
└── output/                # Generated recommendations + drafts (optional archive)
```

### Why This Works

| Original | Simplified |
|----------|------------|
| 3 scripts | 1 utility script |
| 5 folders | 1 optional folder |
| XMR charts | Simple baseline comparison |
| Published folder + metadata | Learning entry captures diff |
| Recommendations folder | Output in conversation or output/ |
| Drafts folder | Output in conversation or output/ |

---

## CLAUDE.md Template

```markdown
# Growth Experiments Agent

## Purpose

Daily marketing optimization agent for Autonomous. Analyzes channel metrics, recommends ONE high-impact action, creates draft content, and records learnings that compound over time.

## Capabilities

1. **Analyze metrics** — Read channel data, identify signal vs noise
2. **Recommend action** — Suggest ONE improvement with clear rationale
3. **Create draft** — Write content matching Autonomous voice
4. **Record learning** — Capture what worked/didn't in context.md

## Decision Logic

When recommending actions, prioritize by:

1. **ROI** — What has the biggest potential impact?
2. **Feasibility** — Can this be executed in one cycle?
3. **Measurability** — Will we know if it worked?

Always recommend ONE action. Multiple recommendations dilute focus.

## The Loop (OODA)

1. **Observe** — Read today's metrics from context.md or human paste
2. **Orient** — Compare to baseline, identify the limiting factor
3. **Decide** — Recommend ONE action with clear rationale
4. **Act** — Create draft content ready for human review
5. **Compound** — After results, record learning to context.md

## Voice & Positioning

Match the Autonomous brand:

- Lead with concrete routine work
- Be specific about where AI creates leverage
- Ground recommendations in implementation reality
- Practical, direct language (no hype)

**Avoid:** "revolutionary", "game-changing", "unlock potential", "10x productivity"

## Output Formats

### Recommendation
```
**Limiting Factor:** [What metric is underperforming]
**Why This Matters:** [Impact on growth]
**Recommendation:** [ONE specific action]
**Expected Impact:** [Measurable outcome]
**Draft Below:** [Y/N]
```

### Draft
```
**Channel:** [Twitter/Newsletter/LinkedIn]
**Type:** [Thread/Post/Email]
**Content:**
[Full draft content]
**Notes:** [Any context for human reviewer]
```

### Learning Entry
```
## [Date] - [Channel] - [Experiment Type]
**Hypothesis:** [What we tested]
**Result:** [Metric change]
**Learning:** [What this tells us]
**Apply To:** [Future recommendations affected]
```

## Startup Behavior

When the session starts:

1. Read context.md for current state and recent learnings
2. Check if new metrics are available (human may paste)
3. If metrics available: Analyze → Recommend → Draft
4. If no metrics: Ask human to paste today's metrics OR run fetch script

Always act first. Don't wait to be asked.

## Human Interaction Points

- **Approval:** Human reviews recommendation and draft before publishing
- **Publishing:** Human publishes to platform externally
- **Results:** Human pastes results back for learning capture
- **Strategic Updates:** Human may update ICP/positioning in context.md

## Extensibility

To add a new channel:
1. Add fetch script to `channels/` (outputs JSON to same format)
2. Add baseline to context.md strategic section
3. Update this file's channel list if needed

No architectural changes required.
```

---

## context.md Template

```markdown
# Growth Experiments Context

## Current State

### Latest Metrics

**Twitter (as of [date]):**
- Impressions: [number]
- Engagements: [number]
- Engagement rate: [%]
- Profile visits: [number]
- Follower change: [+/-]

### Pending Recommendations
[None / Description of pending recommendation awaiting results]

### Baselines (30-day average)
- Twitter engagement rate: [%]
- Newsletter open rate: [%]
- Newsletter click rate: [%]

---

## Strategic Context

> Note: This section is optional at start. The agent delivers value immediately.
> Fill this in as patterns emerge to improve recommendation quality.

### ICP (Ideal Customer Profile)
**Who:** [Startup generalists drowning in routine work]
**Pain:** [Routine work takes time/energy that should go to strategic work]
**Desire:** [Turn routine into systems that run forever]

### Positioning
**Core claim:** [Work that doesn't need your judgment doesn't deserve your time]
**Differentiator:** [Practical implementation, not theory]

### Voice
**Tone:** Confident discovery ("I found...", "Here's what happened...")
**Avoid:** Hype language, generic AI advice, productivity framing

### Active Channels
- Twitter: [@handle] - Primary thought leadership
- Newsletter: [Substack URL] - Deep dives for subscribers
- LinkedIn: [future]

---

## Learnings

> Agent writes here. Each entry captures what worked, what didn't, and what to apply going forward.

### [Date] - Twitter - Subject Line Test
**Hypothesis:** Curiosity gap subject lines increase opens
**Result:** Open rate 18% → 24%
**Learning:** Audience responds to specific curiosity, not vague intrigue
**Apply To:** All future subject lines should pose a concrete question

---

## Session History

> Brief log of agent sessions for context continuity

- [Date]: Analyzed Twitter metrics, recommended thread format change
- [Date]: Recorded learning from subject line test
```

---

## channels/twitter.sh Sketch

```bash
#!/bin/bash
# Fetch Twitter analytics and output to standard format
# Usage: ./twitter.sh [--csv path/to/export.csv | --api]

set -e

OUTPUT_DIR="../output"
DATE=$(date +%Y-%m-%d)
OUTPUT_FILE="$OUTPUT_DIR/metrics-twitter-$DATE.json"

# Option 1: Parse Twitter analytics CSV export
if [[ "$1" == "--csv" && -n "$2" ]]; then
    CSV_FILE="$2"

    # Extract last row metrics (most recent)
    # Twitter CSV format: Date, Impressions, Engagements, Engagement rate, etc.
    LAST_ROW=$(tail -1 "$CSV_FILE")

    # Parse CSV (adjust column indices based on actual Twitter export format)
    IFS=',' read -ra FIELDS <<< "$LAST_ROW"

    cat > "$OUTPUT_FILE" << EOF
{
  "channel": "twitter",
  "date": "$DATE",
  "metrics": {
    "impressions": ${FIELDS[1]:-0},
    "engagements": ${FIELDS[2]:-0},
    "engagement_rate": "${FIELDS[3]:-0}",
    "profile_visits": ${FIELDS[4]:-0},
    "new_followers": ${FIELDS[5]:-0}
  },
  "source": "csv_export"
}
EOF

    echo "Twitter metrics saved to $OUTPUT_FILE"

# Option 2: Manual paste (human copies from Twitter Analytics)
elif [[ "$1" == "--manual" ]]; then
    echo "Paste your Twitter metrics (JSON format):"
    read -r METRICS
    echo "$METRICS" > "$OUTPUT_FILE"
    echo "Saved to $OUTPUT_FILE"

# Option 3: API (future - requires Twitter API credentials)
elif [[ "$1" == "--api" ]]; then
    echo "Twitter API integration not yet implemented"
    echo "Use --csv with exported analytics or --manual for now"
    exit 1

else
    echo "Usage: ./twitter.sh [--csv path/to/export.csv | --manual | --api]"
    echo ""
    echo "Options:"
    echo "  --csv FILE   Parse Twitter analytics CSV export"
    echo "  --manual     Paste metrics manually"
    echo "  --api        Use Twitter API (not yet implemented)"
    exit 1
fi
```

---

## User Experience Walkthrough

### Day 1: First Run (No Setup Required)

**Human:** [pastes today's Twitter metrics]

**Agent:**
```
I see your Twitter engagement rate is 2.1%, down from your baseline of 3.4%.
Looking at the data, your impressions are stable but engagements dropped.
This suggests the content isn't resonating — not a reach problem.

**Limiting Factor:** Engagement rate (2.1% vs 3.4% baseline)
**Why This Matters:** Low engagement signals content-audience mismatch
**Recommendation:** Test a thread format instead of single tweet
**Expected Impact:** Threads typically see 2-3x engagement for educational content

**Draft Below:** Yes

---

**Channel:** Twitter
**Type:** Thread (5 tweets)
**Content:**

1/ How startup generalists are turning routine work into systems

I've been building agents that handle the work that doesn't need my judgment.

Here's what I've learned:

2/ The first step isn't building — it's identifying.

What work keeps taking your time that doesn't need your taste or judgment?

That's your routine. That's what you automate.

3/ The leverage question: Where does AI create 10x impact?

Not "how do I use AI?" but "where is AI the right tool?"

The answer is usually: high volume, clear inputs, pattern-matching decisions.

4/ Systems beat tools.

A tool helps you do work faster.
A system does the work while you focus elsewhere.

The goal isn't efficiency. It's elimination.

5/ The compound layer is what matters.

Good systems don't just execute — they improve.

Each run generates data. Data generates learning. Learning improves the next run.

That's how routine work becomes autonomous.

---

**Notes:** This thread follows the Autonomous method (routine → leverage → system → compound). First tweet hooks with proof, middle tweets deliver framework, final tweet lands the positioning.

Should I save this draft to output/?
```

---

### Day 2: After Publishing Results

**Human:** The thread got 4.2% engagement, 340 impressions, 14 engagements

**Agent:**
```
Excellent. The thread format increased engagement from 2.1% to 4.2% — double your baseline.

Recording this learning:

---

## 2026-01-27 - Twitter - Format Test
**Hypothesis:** Thread format increases engagement for educational content
**Result:** Engagement rate 2.1% → 4.2% (2x improvement)
**Learning:** Audience prefers structured, multi-part content over single tweets
**Apply To:** Default to thread format for educational/framework content

---

Based on today's metrics, what's your engagement rate on the most recent content?
```

---

### Day N: Strategic Context Added

After a few sessions, the human updates context.md with strategic context (ICP, positioning, voice). Now recommendations become more targeted:

**Agent:**
```
I see your thread engagement dropped to 2.8% yesterday.

Looking at the content, it was more abstract ("the future of work") vs your usual
concrete framing ("here's what happened when I built X").

Based on our learnings, your audience responds to:
- Specific examples over abstract principles
- "I found..." framing over "The truth is..."
- Concrete routine work, not productivity advice

**Recommendation:** Return to practitioner voice with a specific build story

**Draft:** [Thread about a specific agent you built and what happened]
```

---

## Comparison: Original vs Agent-Native

| Aspect | Original Research | Agent-Native Approach |
|--------|-------------------|----------------------|
| **Files to create** | 8+ | 3 (2 core + 1 utility) |
| **Setup time** | Multi-day | Under 2 hours |
| **Value delivery** | After strategic context filled | Immediately (paste metrics) |
| **Workflow enforcement** | Architecture (folders, scripts) | Instructions (CLAUDE.md) |
| **Adding channels** | New architecture | New fetch script only |
| **XMR charts** | Required v1 | Deferred (add if needed) |
| **Published tracking** | Separate folder + metadata | Captured in learnings |
| **Behavior change** | Refactor code | Edit prose |

---

## Extensibility Guide

### Adding a New Channel (e.g., Newsletter)

**Step 1:** Create fetch script
```bash
# channels/substack.sh
#!/bin/bash
# Fetch Substack metrics (from export or API)
# Output: output/metrics-substack-[date].json
```

**Step 2:** Add baseline to context.md
```markdown
### Baselines (30-day average)
- Twitter engagement rate: 3.4%
- Newsletter open rate: 42%      # ← Add this
- Newsletter click rate: 8%      # ← Add this
```

**Step 3:** (Optional) Update CLAUDE.md channel list
```markdown
### Active Channels
- Twitter: Primary thought leadership
- Newsletter: Deep dives for subscribers  # ← Add this
```

No architectural changes. No new folders. Just a script and context updates.

---

### Adding XMR (If Signal/Noise Becomes a Problem)

**When to add:** If you find yourself unsure whether a metric change is signal or noise.

**How to add:**
1. Create `channels/xmr.sh` that calculates control limits
2. Update CLAUDE.md to reference XMR when analyzing metrics
3. Add XMR baselines to context.md

This is a prompt change + utility script, not architectural refactor.

---

## Verification Checklist

After implementation, verify:

- [ ] Readable standalone (doesn't require reading original research)
- [ ] Buildable in under 2 hours
- [ ] Addresses "manual paste" friction (fetch script available)
- [ ] Preserves compound learning mechanism (learnings section in context.md)
- [ ] Testable with real Autonomous metrics (Twitter first)
- [ ] New channels addable without architecture changes
- [ ] Behavior changeable by editing prose, not code

---

## Next Steps

1. **Build v1** — Create CLAUDE.md and context.md from templates above
2. **Test manually** — Run a few sessions pasting real Twitter metrics
3. **Add fetch script** — Implement twitter.sh for CSV export parsing
4. **Iterate** — Refine CLAUDE.md based on recommendation quality
5. **Add channels** — Newsletter, LinkedIn as needed

The goal: A compound marketing system in two files that improves over time through learnings, not code changes.
