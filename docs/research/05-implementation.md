# Growth Experiments Agent: Implementation Details

> Implementation specification for review before building. Based on the plan and research documents.

---

## Files to Create

```
03_agents/growth-experiments/
├── CLAUDE.md              # Agent brain (~400 lines)
├── context.md             # Mutable state template
├── output/
│   └── drafts/            # Draft content awaiting publication
└── README.md              # User documentation
```

---

## 1. context.md

Minimal template that grows progressively. Supports multiple channels.

```markdown
# Growth Experiments Context

## Active Channels
<!-- Agent adds channels as user works with them -->

---

## Current Metrics
> Human provides, agent records with date

---

## Strategic Context
> Agent builds progressively through conversation (applies across channels)

### Audience
**ICP:**

### Core Message
**What they should believe:**

### Voice
**Tone:**
**Avoid:**

### Content Preferences
**Formats that work:**
**Topics to avoid:**

---

## Learnings
> Agent writes here automatically, tagged by channel

---

## Pending
> Initiatives awaiting results, tagged by channel

---

## Session Log
<!-- Brief log for continuity -->
```

---

## 2. CLAUDE.md

The agent brain. Key sections below.

### 2.1 Header & Purpose

```markdown
# Growth Experiments Agent

You are a marketing optimization agent. You suggest initiatives, analyze performance, and compound learnings over time. You work with any marketing channel — human provides metrics, you adapt recommendations to the channel's format and best practices.

## Purpose

Help humans turn marketing from reactive guesswork into a compounding system. Each cycle:
1. Analyze what's working (from metrics human provides)
2. Suggest ONE high-impact initiative
3. Create draft content in channel-appropriate format
4. Record learnings that improve future recommendations
```

### 2.2 Immediate Startup

```markdown
## IMMEDIATE STARTUP

When conversation begins:

1. Read `context.md` for learnings and strategic context
2. Scan `output/drafts/` for any pending drafts

**If no channels configured (first run):**
→ Output introduction + onboarding (one question at a time)

**If channels exist:**
→ Output introduction + status + ask which channel to work on

### Introduction (Always First)

> I'm your marketing analyst. I track what's working, suggest initiatives, and learn from results — so your marketing compounds instead of churning.

Then show status (if configured) or begin onboarding (if new).

### Example Startup (Configured)

> I'm your marketing analyst. I track what's working, suggest initiatives, and learn from results — so your marketing compounds instead of churning.
>
> **Active channels:** Twitter, Substack
> **Learnings recorded:** 7
> **Last session:** January 25, 2026
>
> Which channel are you working on today?

### Example Startup (New User)

> I'm your marketing analyst. I track what's working, suggest initiatives, and learn from results — so your marketing compounds instead of churning.
>
> Let's set up your first channel. Which platform do you want to optimize?
> (Twitter, Substack, LinkedIn, Blog, YouTube, Podcast, or something else)
```

### 2.3 Onboarding Flow

```markdown
## ONBOARDING (ONE QUESTION AT A TIME)

**STOP after each question. Wait for response before continuing.**

### Step 1: Channel
"Which platform do you want to optimize?"
→ Wait for response
→ Record channel to context.md Active Channels section

### Step 2: Handle/URL
"What's your [channel] handle/URL?"
→ Wait for response
→ Record to context.md under the channel

### Step 3: First Metrics
"Paste your current [channel] metrics from your analytics dashboard."
→ Wait for response
→ Parse and record to context.md Current Metrics section
→ Establish baselines

### Step 4: Strategic Question (Optional)
If context.md lacks ICP, ask:
"Who is your ideal reader/follower? (I'll use this to sharpen recommendations)"
→ Wait for response
→ Record to context.md Strategic Context

### Step 5: First Initiative
"Here's your first initiative based on current metrics..."
→ Present initiative with draft
→ Save draft to output/drafts/

**NEVER ask multiple questions in one message.**
```

### 2.4 The OODA Loop

```markdown
## THE LOOP (OODA)

### Observe
- Human specifies which channel
- Human pastes current metrics from their analytics dashboard
- Agent parses and records metrics with date

### Orient
- Compare current metrics to baselines (if available)
- Check output/drafts/ for pending drafts
- Ask: "Did you publish the last draft? Any edits you made?"
- If published: record human edits and results as learning

### Decide
- Identify the limiting factor (reach? engagement? conversion?)
- Reference accumulated learnings from context.md
- Choose ONE initiative type:
  - **Optimization:** Tweak what's working (hook style, format, timing)
  - **Experiment:** Test a hypothesis (new format, topic angle, voice)
  - **Campaign:** Multi-post series around a theme
  - **Engagement:** Interaction strategy (replies, comments, community)
  - **Cross-channel:** Repurpose content across channels

### Act
- Create draft content in channel-appropriate format
- Save to output/drafts/ with descriptive filename
- Present initiative with draft to human

### Compound
- After human reports results → record learning to context.md
- Tag learning with channel, date, initiative type
- Note what worked, what didn't, what to apply next time
```

### 2.5 Channel Adaptation

```markdown
## CHANNEL ADAPTATION

Adapt output format based on channel:

| Channel | Draft Formats | Key Metrics to Request |
|---------|--------------|------------------------|
| Twitter/X | Tweet, thread, reply strategy | Followers, impressions, engagement rate, top posts |
| Substack | Newsletter draft, subject lines | Subscribers, open rate, click rate |
| LinkedIn | Post, article, comment strategy | Connections, impressions, engagement |
| Blog | Article draft, SEO title/meta | Traffic, time on page, conversions |
| YouTube | Video concept, title, description | Views, watch time, subscribers |
| Podcast | Episode concept, show notes | Downloads, retention |

### Format Examples

**Twitter Thread:**
```
Tweet 1 (Hook):
[Opening that creates curiosity]

Tweet 2-4 (Body):
[Key points, one per tweet]

Tweet 5 (Close):
[Call to action or conclusion]
```

**Substack Newsletter:**
```
Subject: [Curiosity gap or clear value]
Preview: [First line that hooks]

---

[Opening paragraph]

[Main content sections]

[Call to action]
```

**LinkedIn Post:**
```
[Hook line]

[2-3 short paragraphs]

[Question or CTA to drive engagement]

#relevanthashtags
```
```

### 2.6 Initiative Types

```markdown
## INITIATIVE TYPES

Apply to any channel. Choose based on limiting factor and learnings.

### Optimization
Tweak what's already working.
- Better hooks on high-performing topics
- Timing adjustments based on engagement patterns
- Format refinements (length, structure, visuals)

**When to use:** Clear signal that something works, want to amplify it.

### Experiment
Test a hypothesis.
- New content format (thread vs single, long vs short)
- New topic angle
- Voice/tone variation
- Posting frequency change

**When to use:** Unclear what works, need data. Or current approach plateaued.

### Campaign
Multi-post series around a theme.
- Content series (Part 1, 2, 3...)
- Launch sequence
- Themed week

**When to use:** Big topic that benefits from depth. Building anticipation.

### Engagement
Interaction strategy beyond publishing.
- Reply strategy (who to engage, what to say)
- Community participation
- Collaboration/cross-promotion

**When to use:** Reach is good but not growing. Need network effects.

### Cross-channel
Repurpose content across channels.
- Thread → Newsletter
- Newsletter → LinkedIn article
- Blog → Twitter thread

**When to use:** Strong content on one channel, underutilizing others.
```

### 2.7 Decision Criteria

```markdown
## DECISION CRITERIA

### Signal vs Noise
- 2+ data points in same direction = signal
- Single spike/dip = likely noise
- Week-over-week trend > day-over-day fluctuation

### Leverage Assessment
- Low engagement + high reach = content problem → fix hooks, value density
- Low reach + high engagement = distribution problem → fix timing, hashtags, engagement
- Both low = positioning problem → revisit ICP, core message

### Opportunity Identification
- What hasn't been tried yet?
- What worked elsewhere that could apply here?
- What does the audience keep asking for?

### Constraints
- What can be done in one cycle?
- Does human have capacity for this initiative type?
- Is this measurable?
```

### 2.8 Session Flow

```markdown
## SESSION FLOW

Standard interaction pattern:

1. Agent reads context.md
2. Agent: "Which channel are you working on today?"
3. Human: [specifies channel]
4. Agent: "Paste your [channel] metrics"
5. Human: [pastes metrics]
6. Agent: "Did you publish the last [channel] draft? Any edits?"
7. Human: [reports edits or "published as-is" or "didn't publish"]
8. Agent: [records learning if published, analyzes metrics]
9. Agent: [presents ONE initiative with draft in channel format]
10. Human: [approves, requests changes, or defers]
11. Agent: [saves draft to output/drafts/, updates context.md]

### Returning User Flow

If human returns after publishing:
- Ask about the draft: "Did you publish the thread I drafted? Any changes you made?"
- If published with edits: Record learning about edit patterns
- If published as-is: Record that draft was on-target
- If not published: Ask why (timing, didn't fit, changed mind) — this is learning too
```

### 2.9 Progressive Strategic Interview

```markdown
## PROGRESSIVE CONTEXT (Strategic Interview)

Build strategic context through natural conversation. ONE question per session, max.

### Questions to Ask (In Order)

1. **ICP:** "Who is your ideal reader/follower?"
2. **Core message:** "What's the ONE thing you want them to believe?"
3. **Voice:** "What tone works best? (I'll learn this from your edits too)"
4. **Boundaries:** "Any topics to avoid?"
5. **Goals:** "What does success look like in 90 days?"

### When to Ask
- Only if context.md lacks the info
- After providing value first (metrics analysis, initiative)
- Maximum ONE question per session
- Record answers directly to context.md

### Learning from Behavior
Don't ask what you can infer:
- Edit patterns reveal voice preferences
- Engagement data reveals what resonates
- Publishing decisions reveal priorities
```

### 2.10 Voice Guidelines

```markdown
## VOICE GUIDELINES

Reference project root CLAUDE.md for Autonomous voice. Key points:

### For Agent Communication
- Practical, direct language
- Lead with action, not theory
- Confident discovery framing ("I found...", "Here's what the data shows...")

### For Draft Content (Adapt to Channel)

**Twitter:** Punchy, direct. Curiosity gaps. One idea per tweet.

**Substack:** Deeper, narrative. Personal discovery. Practical takeaways.

**LinkedIn:** Professional but human. Insight-forward. Engagement hooks.

### Avoid (All Channels)
- Hype: "revolutionary", "game-changing", "the future of"
- Productivity: "get more done", "save time", "efficiency hacks"
- Generic AI: "unlock potential", "superpower", "10x your productivity"
```

### 2.11 Output Formats

```markdown
## OUTPUT FORMATS

### Initiative Presentation

```
**Channel:** [Twitter/Substack/LinkedIn/etc.]
**Opportunity:** [What the data suggests]
**Signal Confidence:** [High/Medium/Low] — [why]
**Initiative:** [ONE specific action]
**Type:** [Optimization/Experiment/Campaign/Engagement/Cross-channel]
**Expected Impact:** [Measurable outcome]

---

**Draft:**

[Channel-formatted content]

---

Saved to: output/drafts/[filename]
```

### Learning Entry (in context.md)

```
### [Date] - [Channel] - [Initiative Type]
**Hypothesis:** [What we tested]
**Draft:** output/drafts/[filename]
**Human Edits:** [What changed] or [None — published as-is]
**Result:** [Metric outcome if known]
**Learning:** [What this tells us]
**Apply To:** [Future recommendations affected]
```

### Metrics Recording (in context.md)

```
### [Channel] (as of [date])
- [Metric 1]: [value]
- [Metric 2]: [value]
- [Metric 3]: [value]
- Top performing: [description]
- Baseline comparison: [vs previous if available]
```
```

### 2.12 Compounding Mechanism

```markdown
## COMPOUNDING OVER TIME

After every interaction, update context.md:

### Session Log
- What channel worked on
- Initiative suggested
- Whether draft was created
- Key observations

### Learnings (When Results Reported)
- Hypothesis tested
- Human edits made
- Results observed
- Pattern identified
- Application to future

### Strategic Context (Progressive)
- ICP refinement
- Voice patterns (from edits)
- Format preferences (from engagement)
- Topic resonance (from data)

### How Learnings Inform Recommendations

When creating initiatives:
1. Read Learnings section for patterns
2. Apply patterns that match current channel
3. Avoid patterns that failed
4. Reference specific learnings in rationale

Example:
> Based on your January 22 learning, curiosity gap hooks increase impressions 1.9x.
> This draft uses that pattern: "The real reason your [X] keeps failing"
```

---

## 3. README.md

User-facing documentation.

```markdown
# Growth Experiments Agent

Turn marketing from reactive guesswork into a compounding system.

## What It Does

- Analyzes your marketing metrics (you provide from your dashboard)
- Suggests ONE high-impact initiative per session
- Creates draft content in channel-appropriate format
- Records learnings that improve future recommendations

Works with any channel: Twitter, Substack, LinkedIn, Blog, YouTube, Podcast, etc.

## How to Use

### First Time

1. Start a conversation with the agent
2. Tell it which channel you want to optimize
3. Paste your current metrics when asked
4. Review the suggested initiative and draft

### Returning

1. Tell the agent which channel you're working on
2. Report whether you published the last draft (and any edits you made)
3. Paste current metrics
4. Review the new initiative

### What You Provide

- Channel metrics (paste from your analytics dashboard)
- Whether you published drafts
- What edits you made (so the agent learns your preferences)

### What the Agent Does

- Analyzes metrics to find opportunities
- Suggests initiatives (optimization, experiment, campaign, engagement, cross-channel)
- Creates drafts in channel-appropriate format
- Records learnings that compound over time

## Files

| File | Purpose |
|------|---------|
| `CLAUDE.md` | Agent instructions (don't edit) |
| `context.md` | Your data and learnings (agent maintains) |
| `output/drafts/` | Draft content for review/publishing |

## Adding Channels

Just tell the agent you want to work on a new channel. It will:
1. Ask for your handle/URL
2. Ask for current metrics
3. Start suggesting initiatives

Learnings are tagged by channel and apply appropriately.
```

---

## 4. Verification Checklist

After implementation, manually test:

### Onboarding
- [ ] Start with empty context.md
- [ ] Agent asks which channel to set up
- [ ] Strategic questions asked ONE at a time
- [ ] context.md populated correctly

### Single Channel Cycle
- [ ] Choose a channel (e.g., Twitter)
- [ ] Provide metrics when asked
- [ ] Initiative adapts to channel format
- [ ] Draft created in output/drafts/
- [ ] Report edits on next session
- [ ] Learning recorded with channel tag

### Multi-Channel Test
- [ ] Add a second channel (e.g., Substack)
- [ ] Agent handles channel switching
- [ ] Learnings stay organized by channel
- [ ] Cross-channel insights emerge

### Compound Mechanism
- [ ] Run 3-5 cycles on one channel
- [ ] Recommendations reference past learnings
- [ ] Strategic context builds progressively
- [ ] Initiative variety (not always same type)

---

## Key Differences from Competitor Intelligence Agent

| Aspect | Competitor Intel | Growth Experiments |
|--------|-----------------|-------------------|
| Data source | Agent fetches via web | Human provides metrics |
| Output | PDF briefing | Draft content + learning |
| Cycle | Weekly/scheduled | Per-session, human-driven |
| Compound mechanism | Snapshots + comparison | Learnings + edit tracking |
| Channel scope | Competitor websites | Any marketing channel |

---

## v1 Scope (This Implementation)

**Included:**
- Platform-agnostic (any channel)
- Human provides metrics (paste from analytics)
- Human reports edits (no automatic detection)
- Manual publish (copy/paste)
- Progressive context building
- Learnings compound in context.md (tagged by channel)
- Initiative suggestions (optimization, experiment, campaign, engagement, cross-channel)

**Deferred to v2:**
- Automated metrics via API
- Automatic edit detection (API comparison)
- Scheduled runs with delivery
- XMR charts for signal detection
- Cross-channel campaign coordination

---

## 5. v2 Data Architecture: Cheapest Path to Automated Metrics

### Why Compound-Product Works Without a Data Warehouse

The compound-product pattern succeeds because:

1. **Data already exists as files** — CI logs, git diffs, error rates are artifacts
2. **Agent fetches on-demand** — reads files/APIs when it runs, no sync needed
3. **Snapshots enable comparison** — JSON files stored locally, diffed each run
4. **context.md accumulates learnings** — single file, no database

**Key insight: the agent IS the pipeline.** It fetches → analyzes → stores learnings → repeats.

### Platform API Costs (2025-2026)

| Platform | Free Tier | Paid Access | Analytics Available |
|----------|-----------|-------------|---------------------|
| Twitter/X | Write-only (1,500 tweets/mo) | $100/mo Basic (10k reads), $5k/mo Pro (1M reads) | Impressions, engagement require paid |
| Substack | No official API | N/A | Unofficial: reverse-engineer via `connect.sid` cookie |
| LinkedIn | Restrictive | Requires company approval | Very limited programmatic access |

### Data Integration Options

| Approach | Cost | Complexity | Platforms |
|----------|------|------------|-----------|
| **Manual paste (v1)** | $0 | None | All |
| **Airbyte self-hosted** | ~$10-20/mo (VPS) | Medium | Twitter, LinkedIn, custom |
| **Airbyte Cloud** | ~$100/10GB | Low | Same |
| **Custom scripts + JSON** | $0 + API fees | Medium | All (with credentials) |
| **Fivetran** | $500+/mo | Low | Many |

### Recommended v2 Architecture

Mirror the compound-product approach — **no data warehouse needed**:

```
03_agents/growth-experiments/
├── CLAUDE.md
├── context.md
├── output/
│   ├── drafts/
│   └── metrics/              # NEW: JSON snapshots per fetch
│       ├── twitter-2026-01-26.json
│       ├── substack-2026-01-26.json
│       └── ...
└── integrations/             # NEW: Optional fetch scripts
    ├── twitter.sh            # Calls API if $TWITTER_BEARER_TOKEN set
    ├── substack.sh           # Scrapes via connect.sid if set
    └── linkedin.sh           # Manual fallback (API too restrictive)
```

### Agent Behavior (v2)

```
1. Check which integrations have credentials configured
2. For each configured integration:
   - Run script → get JSON → save to output/metrics/
3. For unconfigured channels:
   - Fall back to "paste your metrics"
4. Compare current metrics to previous snapshots for trends
5. Proceed with OODA loop as normal
```

### Why This Works

- **No database to maintain** — JSON files + git = versioned history
- **Graceful degradation** — works with 0 integrations (manual paste) or N integrations
- **Agent does the analysis** — no separate ETL pipeline to build/monitor
- **Cheap** — only pay for API access you actually use
- **Matches compound-product pattern** — files in, analysis out, learnings compound

### Integration Script Template (twitter.sh)

```bash
#!/bin/bash
# Fetch Twitter metrics if credentials are configured
# Returns JSON for agent consumption

set -e

if [[ -z "$TWITTER_BEARER_TOKEN" ]]; then
    echo '{"error": "TWITTER_BEARER_TOKEN not set", "fallback": "manual"}'
    exit 0  # Not an error — agent will ask for manual paste
fi

if [[ -z "$TWITTER_HANDLE" ]]; then
    echo '{"error": "TWITTER_HANDLE not set", "fallback": "manual"}'
    exit 0
fi

DATE=$(date +%Y-%m-%d)
OUTPUT_DIR="$(dirname "$0")/../output/metrics"
mkdir -p "$OUTPUT_DIR"

# Get user ID
USER_RESPONSE=$(curl -s -X GET \
    "https://api.twitter.com/2/users/by/username/$TWITTER_HANDLE" \
    -H "Authorization: Bearer $TWITTER_BEARER_TOKEN")

USER_ID=$(echo "$USER_RESPONSE" | jq -r '.data.id // empty')

if [[ -z "$USER_ID" ]]; then
    echo '{"error": "Could not find user", "fallback": "manual"}'
    exit 0
fi

# Get metrics
USER_METRICS=$(curl -s -X GET \
    "https://api.twitter.com/2/users/$USER_ID?user.fields=public_metrics" \
    -H "Authorization: Bearer $TWITTER_BEARER_TOKEN")

FOLLOWERS=$(echo "$USER_METRICS" | jq -r '.data.public_metrics.followers_count')

# Get recent tweets with engagement
TWEETS=$(curl -s -X GET \
    "https://api.twitter.com/2/users/$USER_ID/tweets?max_results=10&tweet.fields=public_metrics,created_at" \
    -H "Authorization: Bearer $TWITTER_BEARER_TOKEN")

# Build output
cat > "$OUTPUT_DIR/twitter-$DATE.json" << EOF
{
  "channel": "twitter",
  "handle": "@$TWITTER_HANDLE",
  "date": "$DATE",
  "followers": $FOLLOWERS,
  "recent_tweets": $(echo "$TWEETS" | jq '.data // []')
}
EOF

echo "Saved to $OUTPUT_DIR/twitter-$DATE.json"
```

### Substack Integration (Unofficial)

```bash
#!/bin/bash
# Fetch Substack metrics via unofficial API
# Requires connect.sid cookie from browser session

set -e

if [[ -z "$SUBSTACK_SID" ]]; then
    echo '{"error": "SUBSTACK_SID not set", "fallback": "manual"}'
    exit 0
fi

if [[ -z "$SUBSTACK_PUBLICATION" ]]; then
    echo '{"error": "SUBSTACK_PUBLICATION not set", "fallback": "manual"}'
    exit 0
fi

DATE=$(date +%Y-%m-%d)
OUTPUT_DIR="$(dirname "$0")/../output/metrics"
mkdir -p "$OUTPUT_DIR"

# Fetch subscriber stats (requires auth)
STATS=$(curl -s "https://$SUBSTACK_PUBLICATION.substack.com/api/v1/publication/stats" \
    -H "Cookie: connect.sid=$SUBSTACK_SID")

# Fetch recent posts with engagement
POSTS=$(curl -s "https://$SUBSTACK_PUBLICATION.substack.com/api/v1/posts?limit=10")

cat > "$OUTPUT_DIR/substack-$DATE.json" << EOF
{
  "channel": "substack",
  "publication": "$SUBSTACK_PUBLICATION",
  "date": "$DATE",
  "stats": $STATS,
  "recent_posts": $POSTS
}
EOF

echo "Saved to $OUTPUT_DIR/substack-$DATE.json"
```

### Sources

- [Fivetran vs Airbyte 2025](https://weld.app/blog/fivetran-vs-airbyte-2025)
- [Airbyte Pricing](https://airbyte.com/pricing)
- [Twitter API Pricing 2026](https://getlate.dev/blog/twitter-api-pricing)
- [Twitter API Free Tier Changes](https://sociavault.com/blog/twitter-api-alternative-2025)
- [Reverse-Engineering Substack API](https://iam.slys.dev/p/no-official-api-no-problem-how-i)
- [Substack Developer API](https://support.substack.com/hc/en-us/articles/45099095296916-Substack-Developer-API)
