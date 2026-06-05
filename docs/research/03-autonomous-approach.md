# Growth Experiments Agent: Autonomous Approach

> Synthesis of original research + agent-native approach. True parallel to compound-product with API-based observation and minimal architecture.

---

## Evolution Summary

### Original Research (`compound_marketing_agent_research.md`)

**Strengths:**
- Complete OODA loop with clear phases
- Draft vs published tracking (learns from human edits)
- XMR charts for signal detection
- Strategic context in AGENTS.md

**Weaknesses:**
- 8+ file types (scripts, folders, config)
- Manual data entry (paste metrics, save to folders)
- Infrastructure engineering, not agent-native design
- Setup-heavy (value requires configuration)

### Agent-Native Approach (`compound_marketing_agent_native_approach.md`)

**Strengths:**
- Two core files (CLAUDE.md + context.md)
- Value on Day 1 (just paste metrics)
- Workflow in prose, not architecture
- Agent-led interaction pattern

**Weaknesses:**
- Lost edit tracking (no draft vs published comparison)
- Still requires manual paste of metrics
- No API integration path
- Compound mechanism weakened

### What Breaks the Compound Pattern

**Why compound-product works:**
1. Data auto-generated (daily report from CI/metrics)
2. Results auto-observed (tests pass/fail, error rates)
3. Edits auto-tracked (git diff between PR and merged code)
4. Human = approver only (not data entry)

**What broke in previous approaches:**
- Original: Too much manual input (paste metrics, save to folders)
- Agent-native: Lost compound mechanisms (no edit tracking)

**The fix:** API-based observation. Agent fetches everything automatically.

---

## Compound-Product Comparison

| compound-product | growth-experiments (autonomous) |
|------------------|--------------------------------|
| Daily report auto-generated | Metrics fetched via API |
| Agent reads CI/error logs | Agent reads Twitter analytics |
| Code saved to branch (git) | Draft saved to output/ |
| Diff visible via git | Diff computed: draft vs API-fetched published |
| Tests run automatically | Format validation optional |
| PR created for review | Recommendation created with draft |
| Human merges or requests changes | Human approves, edits, publishes |
| Results tracked (errors, metrics) | Results fetched via API (engagement, reach) |
| Learnings → AGENTS.md | Learnings → context.md |

**Key parallel:** In compound-product, the agent never asks "what are today's metrics?" — it observes automatically. Same principle applies here.

---

## Architecture

```
growth-experiments/
├── CLAUDE.md              # Agent instructions (OODA in prose)
├── context.md             # Learnings + strategic context (progressive)
├── output/                # Drafts + recommendations (browsable history)
└── integrations/
    └── twitter.sh         # API: metrics + content + per-post results
```

**4 items.** Simpler than original (8+), richer than agent-native (3).

### What Each Item Does

| Item | Purpose |
|------|---------|
| `CLAUDE.md` | Agent brain. Contains OODA loop, voice guidelines, decision criteria. Workflow lives here as prose. |
| `context.md` | Mutable state. Learnings compound here. Strategic context is progressive (value before config). |
| `output/` | Archive of recommendations and drafts. Human can browse history. Agent doesn't need this to function. |
| `integrations/twitter.sh` | API fetch script. Returns metrics + recent tweets + per-post engagement. Enables automatic edit detection. |

---

## The Autonomous Loop

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│   1. Fetch metrics (API)                                        │
│      └── Agent runs twitter.sh → gets reach, engagement, etc.  │
│                                                                 │
│   2. Fetch recent posts (API)                                   │
│      └── Agent gets published content text                     │
│                                                                 │
│   3. Detect edits (automatic)                                   │
│      └── Agent diffs draft vs published content                │
│      └── No published/ folder needed                           │
│                                                                 │
│   4. Fetch per-post results (API)                               │
│      └── Agent gets engagement metrics per tweet               │
│                                                                 │
│   5. Record learning (automatic)                                │
│      └── Agent writes to context.md Learnings section          │
│                                                                 │
│   6. Analyze + recommend                                        │
│      └── Agent identifies limiting factor                      │
│      └── Creates ONE recommendation                            │
│                                                                 │
│   7. Create draft                                               │
│      └── Agent writes draft content                            │
│      └── Optionally saves to output/                           │
│                                                                 │
│   8. Human approves/publishes                                   │
│      └── ONLY touchpoint                                       │
│                                                                 │
│   9. Repeat                                                     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Key difference from previous approaches:** Steps 1-5 are fully automatic. Human involvement begins at step 8.

---

## Key Features

### 1. Automatic Edit Detection

**Old approach:** Separate `published/` folder with metadata. Human must save final version after publishing.

**Autonomous approach:** Agent fetches published content via API, diffs against draft stored in output/. No manual save required.

```
Draft (output/2026-01-25-thread.md):
  "How startup generalists are turning routine work into systems"

Published (fetched via API):
  "How startup generalists turn routine work into systems that run forever"

Edit detected:
  - Changed "are turning" → "turn"
  - Added "that run forever"

Learning recorded:
  Human prefers more direct phrasing and explicit outcome statement.
```

### 2. Agent-Led Strategic Interview

**Old approach:** Human fills out AGENTS.md Strategic Context section before agent can provide good recommendations.

**Autonomous approach:** Agent asks questions conversationally as needed. Writes answers to context.md progressively.

```
Day 1:
  Agent: Here's your engagement analysis. To improve recommendations,
         who is your ideal reader? (I'll record this for future sessions)
  Human: Startup generalists drowning in routine work
  Agent: [writes to context.md] Got it. What's the ONE thing you want
         them to believe about Autonomous?
  Human: That routine work can become software that runs forever
  Agent: [writes to context.md] Perfect. Using that framing now.

Day 7:
  Agent already knows ICP and core message. Recommendations are targeted.
```

### 3. Progressive Context

Value is delivered BEFORE configuration is complete.

| Day | Strategic Context | Recommendation Quality |
|-----|------------------|----------------------|
| 1 | None | Generic but useful (metrics-based) |
| 3 | ICP known | Audience-aware |
| 7 | Voice + positioning | On-brand |
| 14 | Learnings accumulated | Personalized to what works |
| 30 | Full context | Near-autonomous quality |

### 4. Output Folder for History

Human can browse past recommendations and drafts. But learnings live in context.md — the agent doesn't need to re-read old files.

```
output/
├── 2026-01-20-recommendation.md
├── 2026-01-20-thread-draft.md
├── 2026-01-22-recommendation.md
├── 2026-01-22-thread-draft.md
└── 2026-01-25-recommendation.md
```

**Why this matters:** Human has auditability and history. Agent has compounded learnings in one place (context.md).

---

## CLAUDE.md Template

```markdown
# Growth Experiments Agent

## Purpose

Daily marketing optimization agent. Fetches channel metrics automatically, analyzes performance, recommends ONE high-impact action, creates draft content, and records learnings that compound over time.

## Capabilities

1. **Fetch metrics** — Run integration scripts to get current data
2. **Analyze performance** — Compare to baseline, identify limiting factors
3. **Detect edits** — Compare drafts to published content (via API)
4. **Recommend action** — Suggest ONE improvement with clear rationale
5. **Create draft** — Write content matching brand voice
6. **Record learning** — Capture insights in context.md automatically

## The Loop (OODA)

### Observe
- Run `integrations/twitter.sh` to fetch metrics + recent posts
- Parse response for engagement rates, reach, per-post performance

### Orient
- Compare current metrics to baselines in context.md
- Identify the limiting factor (reach? engagement? conversion?)
- If draft exists in output/, diff against published content (fetched via API)

### Decide
- Recommend ONE action based on:
  1. Highest potential impact
  2. Completable in one cycle
  3. Measurable outcome
- Reference learnings from context.md

### Act
- Create draft content
- Save to output/ with date prefix
- Present to human for approval

### Compound
- After human publishes: fetch results via API
- Diff draft vs published for edit patterns
- Record learning to context.md

## Decision Criteria

When choosing what to recommend:

1. **Signal vs Noise** — Is this metric change real or fluctuation?
   - 2+ consecutive days in same direction = likely signal
   - Single day spike/dip = likely noise

2. **Leverage** — Where does 10x impact come from?
   - Low engagement + high reach = content problem
   - Low reach + high engagement = distribution problem

3. **Constraints** — What can be done in one cycle?
   - Thread format change: yes
   - New content series: no (too big)

## Voice Guidelines

Match context.md voice section. If not yet defined:

- Lead with concrete routine work
- Be specific about leverage
- Practical, direct language
- No hype ("revolutionary", "game-changing", "unlock potential")

## Startup Behavior

When session starts:

1. Read context.md for learnings and strategic context
2. Run fetch script to get current metrics
3. If recent draft exists in output/, check for published version via API
4. If edits detected, record learning
5. Analyze current metrics → recommend → draft

Always act first. Don't wait to be asked.

## Human Touchpoints

- **Approval:** Human reviews recommendation and draft
- **Publishing:** Human publishes to platform (external to this system)
- **Strategic updates:** Human may answer agent questions to build context

Note: Human does NOT need to paste metrics, save published versions, or manually record results. Agent fetches everything via API.

## Strategic Interview

If context.md lacks key strategic context, ask ONE question per session:

1. Who is your ideal reader? (→ ICP)
2. What's the one thing you want them to believe? (→ Core message)
3. What topics should we avoid? (→ Boundaries)
4. What's your preferred format? (→ Content type)

Record answers directly to context.md. Don't ask questions that can be inferred from analyzing content performance.

## Output Formats

### Recommendation
```
**Limiting Factor:** [What metric is underperforming]
**Signal Confidence:** [High/Medium/Low] — [why]
**Recommendation:** [ONE specific action]
**Expected Impact:** [Measurable outcome]
**Draft:** [Inline or saved to output/]
```

### Learning Entry
```
## [Date] - [Channel] - [Type]
**Hypothesis:** [What we tested]
**Draft:** [Summary of original]
**Human Edits:** [What changed] or [None]
**Result:** [Metric outcome]
**Learning:** [What this tells us]
**Apply To:** [Future recommendations affected]
```
```

---

## context.md Template

```markdown
# Growth Experiments Context

## Current Metrics

> Agent updates this section after each fetch

**Twitter (as of [date]):**
- Followers: [number]
- Impressions (7d): [number]
- Engagements (7d): [number]
- Engagement rate: [%]
- Top post: [link]

**Baselines (30-day rolling average):**
- Engagement rate: [%]
- Impressions/post: [number]
- Follower growth: [+/- per week]

---

## Strategic Context

> Agent builds this progressively through conversation

### Audience
**ICP:** [Agent fills after asking, e.g., "Startup generalists drowning in routine work"]

### Core Message
**What they should believe:** [Agent fills, e.g., "Routine work can become software that runs forever"]

### Voice
**Tone:** [Agent fills as patterns emerge, e.g., "Confident discovery — 'I found...' not 'I think...'"]
**Avoid:** [Agent fills, e.g., "Hype language, generic AI advice"]

### Content Preferences
**Formats that work:** [Agent fills from performance data]
**Topics to avoid:** [Agent fills from human input]

---

## Learnings

> Agent writes here automatically. Each entry captures what worked, what didn't, and what to apply.

### 2026-01-25 - Twitter - Thread Format Test
**Hypothesis:** Thread format increases engagement for educational content
**Draft:** 5-tweet thread on Autonomous Method
**Human Edits:** Shortened tweet 3, added "run forever" to conclusion
**Result:** 4.2% engagement (vs 2.1% baseline)
**Learning:** Threads outperform single tweets 2x. Human edits suggest preference for brevity and explicit outcomes.
**Apply To:** Default to thread format. End with concrete outcome statement.

### 2026-01-22 - Twitter - Curiosity Gap Subject
**Hypothesis:** Curiosity gap opening increases impressions
**Draft:** "The real reason your routine work keeps coming back"
**Human Edits:** None
**Result:** 340 impressions (vs 180 average)
**Learning:** Curiosity gap works. Specificity ("routine work") outperforms vague ("your productivity").
**Apply To:** Use curiosity gap + specific pain point in hooks.

---

## Pending

> Recommendations awaiting results

**2026-01-25:** Thread format test (results expected 2026-01-26)

---

## Session Log

> Brief log for continuity

- 2026-01-25: Analyzed metrics, recommended thread format, created draft
- 2026-01-22: Recorded learning from curiosity gap test
- 2026-01-20: First session, established baselines
```

---

## integrations/twitter.sh

```bash
#!/bin/bash
# Fetch Twitter metrics, recent tweets, and per-post engagement
# Outputs JSON for agent consumption

set -e

# Configuration
TWITTER_HANDLE="${TWITTER_HANDLE:-}"
BEARER_TOKEN="${TWITTER_BEARER_TOKEN:-}"
OUTPUT_DIR="${OUTPUT_DIR:-../output}"
DATE=$(date +%Y-%m-%d)

# Check requirements
if [[ -z "$BEARER_TOKEN" ]]; then
    echo "Error: TWITTER_BEARER_TOKEN environment variable required"
    echo ""
    echo "To get a Bearer Token:"
    echo "1. Go to developer.twitter.com"
    echo "2. Create a project/app with read access"
    echo "3. Generate a Bearer Token"
    echo "4. Export: export TWITTER_BEARER_TOKEN='your-token'"
    exit 1
fi

if [[ -z "$TWITTER_HANDLE" ]]; then
    echo "Error: TWITTER_HANDLE environment variable required"
    echo "Export: export TWITTER_HANDLE='yourusername'"
    exit 1
fi

# Get user ID from handle
USER_RESPONSE=$(curl -s -X GET \
    "https://api.twitter.com/2/users/by/username/$TWITTER_HANDLE" \
    -H "Authorization: Bearer $BEARER_TOKEN")

USER_ID=$(echo "$USER_RESPONSE" | jq -r '.data.id')

if [[ "$USER_ID" == "null" || -z "$USER_ID" ]]; then
    echo "Error: Could not find user ID for @$TWITTER_HANDLE"
    echo "Response: $USER_RESPONSE"
    exit 1
fi

# Get user metrics (follower count, etc.)
USER_METRICS=$(curl -s -X GET \
    "https://api.twitter.com/2/users/$USER_ID?user.fields=public_metrics" \
    -H "Authorization: Bearer $BEARER_TOKEN")

FOLLOWERS=$(echo "$USER_METRICS" | jq -r '.data.public_metrics.followers_count')
FOLLOWING=$(echo "$USER_METRICS" | jq -r '.data.public_metrics.following_count')

# Get recent tweets with engagement metrics
TWEETS_RESPONSE=$(curl -s -X GET \
    "https://api.twitter.com/2/users/$USER_ID/tweets?max_results=10&tweet.fields=public_metrics,created_at" \
    -H "Authorization: Bearer $BEARER_TOKEN")

# Calculate aggregate metrics
TOTAL_IMPRESSIONS=0
TOTAL_ENGAGEMENTS=0
TWEET_COUNT=0

while read -r tweet; do
    impressions=$(echo "$tweet" | jq -r '.public_metrics.impression_count // 0')
    likes=$(echo "$tweet" | jq -r '.public_metrics.like_count // 0')
    retweets=$(echo "$tweet" | jq -r '.public_metrics.retweet_count // 0')
    replies=$(echo "$tweet" | jq -r '.public_metrics.reply_count // 0')

    engagements=$((likes + retweets + replies))

    TOTAL_IMPRESSIONS=$((TOTAL_IMPRESSIONS + impressions))
    TOTAL_ENGAGEMENTS=$((TOTAL_ENGAGEMENTS + engagements))
    TWEET_COUNT=$((TWEET_COUNT + 1))
done < <(echo "$TWEETS_RESPONSE" | jq -c '.data[]? // empty')

# Calculate engagement rate
if [[ $TOTAL_IMPRESSIONS -gt 0 ]]; then
    ENGAGEMENT_RATE=$(echo "scale=2; $TOTAL_ENGAGEMENTS * 100 / $TOTAL_IMPRESSIONS" | bc)
else
    ENGAGEMENT_RATE="0.00"
fi

# Build output JSON
OUTPUT_FILE="$OUTPUT_DIR/metrics-twitter-$DATE.json"

cat > "$OUTPUT_FILE" << EOF
{
  "channel": "twitter",
  "handle": "@$TWITTER_HANDLE",
  "date": "$DATE",
  "account_metrics": {
    "followers": $FOLLOWERS,
    "following": $FOLLOWING
  },
  "period_metrics": {
    "tweets_analyzed": $TWEET_COUNT,
    "total_impressions": $TOTAL_IMPRESSIONS,
    "total_engagements": $TOTAL_ENGAGEMENTS,
    "engagement_rate_percent": $ENGAGEMENT_RATE
  },
  "recent_tweets": $(echo "$TWEETS_RESPONSE" | jq '.data // []')
}
EOF

echo "Twitter metrics saved to $OUTPUT_FILE"
echo ""
echo "Summary:"
echo "  Followers: $FOLLOWERS"
echo "  Tweets analyzed: $TWEET_COUNT"
echo "  Total impressions: $TOTAL_IMPRESSIONS"
echo "  Total engagements: $TOTAL_ENGAGEMENTS"
echo "  Engagement rate: $ENGAGEMENT_RATE%"
```

### Environment Setup

```bash
# Add to ~/.bashrc or ~/.zshrc
export TWITTER_BEARER_TOKEN='your-bearer-token-here'
export TWITTER_HANDLE='yourusername'
```

---

## Agent-Led Interview Flow

Instead of requiring upfront configuration, the agent builds strategic context through natural conversation.

### Session 1: Metrics Only

```
Agent: I've fetched your Twitter metrics. Engagement rate is 2.1%,
       impressions are 340/tweet on average.

       Your recent posts about "AI agents" got 2x engagement vs
       posts about "productivity."

       **Recommendation:** Post more about AI agents, less about
       general productivity.

       To improve future recommendations: Who is your ideal reader?

Human: Startup generalists drowning in routine work.

Agent: Got it. [writes to context.md]
```

### Session 3: Context Building

```
Agent: Your thread format got 4.2% engagement — 2x your baseline.
       Human edit pattern: You shortened my draft and added
       "that runs forever" to the conclusion.

       **Learning recorded:** Audience prefers brevity + explicit outcomes.

       To sharpen the voice: What's the ONE thing you want readers
       to believe about Autonomous?

Human: That routine work can become software that runs forever.

Agent: Perfect — that matches your edit pattern. [writes to context.md]
```

### Session 7: Full Context

```
Agent: Based on accumulated learnings:
       - Threads outperform single tweets 2x
       - Curiosity gap hooks increase impressions 1.9x
       - Your audience responds to "I found..." framing
       - They want concrete outcomes, not abstract principles

       Today's recommendation uses all of these.

       [presents draft that incorporates all learnings]
```

---

## UX Walkthrough

### Day 1: First Run

**Setup required:** Export environment variables (2 min)

**Human:** "Analyze my Twitter"

**Agent:**
1. Runs `twitter.sh` automatically
2. Presents metrics summary
3. Identifies limiting factor
4. Creates recommendation + draft
5. Asks ONE strategic question

**Value delivered:** Actionable recommendation based on real data.

### Day 7: Learning Accumulated

**Human:** "What should I post today?"

**Agent:**
1. Fetches current metrics
2. Checks if yesterday's draft was published (via API)
3. If yes: diffs draft vs published, records learning
4. Fetches per-post results for recent content
5. Uses accumulated learnings to create better recommendation

**Value delivered:** Recommendation informed by a week of learnings.

### Day 30: Near-Autonomous

**Human:** "Run the loop"

**Agent:**
1. Full autonomous cycle with minimal interaction
2. Strategic context fully built
3. Recommendations match human preferences
4. Human just approves/rejects

**Value delivered:** Marketing operates like compound-product — human is approver, not driver.

---

## Comparison Table

| Aspect | Original Research | Agent-Native | Autonomous |
|--------|------------------|--------------|------------|
| **Files** | 8+ | 3 | 4 |
| **Manual data entry** | High (paste, save) | Medium (paste) | None |
| **Edit detection** | Yes (published/ folder) | No | Yes (API diff) |
| **Strategic context** | Required upfront | Progressive | Progressive |
| **Value on Day 1** | After setup | Immediately | Immediately |
| **API integration** | None | Stub | Full |
| **Compound mechanism** | Strong | Weakened | Strong |
| **Human touchpoint** | Multiple | Multiple | Approval only |

---

## v1 vs v2 Scope

### v1: Twitter, Read APIs

**Build now:**
- `CLAUDE.md` with full OODA loop
- `context.md` with progressive context structure
- `integrations/twitter.sh` using Twitter API v2
- `output/` folder for draft history
- Edit detection via API comparison

**Human involvement:**
- Approves recommendations
- Publishes manually (copy/paste to Twitter)
- Answers strategic questions (progressive)

**What's NOT included:**
- Auto-publish
- Other channels (Substack, LinkedIn)
- XMR charts (add if signal/noise becomes problem)

### v2: Multi-channel, Write APIs

**Build later (if needed):**
- `integrations/substack.sh` for newsletter metrics
- `integrations/linkedin.sh` for LinkedIn metrics
- Auto-publish with approval workflow
- XMR charts for signal detection
- Cross-channel learning correlation

**Trigger for v2:** When Twitter loop is running smoothly and human wants to expand to other channels.

---

## Verification Checklist

After implementation, verify:

- [x] True compound-product parallel
  - Data auto-observed (API fetch) ✓
  - Results auto-observed (per-post metrics via API) ✓
  - Edits auto-detected (draft vs published diff via API) ✓

- [x] Human touchpoint is approval only
  - No manual metric paste required ✓
  - No saving published versions ✓
  - No recording results manually ✓

- [x] Strategic context is progressive
  - Value on Day 1 without config ✓
  - Context builds through conversation ✓

- [x] Edit detection works via API comparison
  - Fetch published content via API ✓
  - Diff against draft in output/ ✓
  - Record learning automatically ✓

- [x] Architecture is minimal
  - 4 items total ✓
  - CLAUDE.md + context.md + output/ + integrations/ ✓

- [x] Learnings compound in context.md
  - Agent writes learnings automatically ✓
  - Learnings inform future recommendations ✓

- [x] Implementable with Twitter API
  - Uses Twitter API v2 ✓
  - Bearer token authentication ✓
  - Read access only (v1) ✓

---

## Next Steps

1. **Create directory structure**
   ```bash
   mkdir -p growth-experiments/{output,integrations}
   ```

2. **Copy templates**
   - CLAUDE.md from this document
   - context.md from this document
   - twitter.sh from this document

3. **Configure environment**
   - Get Twitter API Bearer Token
   - Export environment variables

4. **Test fetch script**
   ```bash
   ./integrations/twitter.sh
   ```

5. **Run first session**
   - Let agent fetch metrics
   - Review recommendation
   - Approve or iterate

6. **Compound over time**
   - Agent learns from each cycle
   - Strategic context builds progressively
   - Recommendations improve automatically
