# Growth Experiments Agent — Final Specification (v2)

> Updated spec incorporating all interview decisions. Original `06_spec.md` preserved for comparison.

---

## Table of Contents

1. [Overview](#overview)
2. [Architecture](#architecture)
3. [MKT1 Framework Integration](#mkt1-framework-integration)
4. [Signal Detection (XMR)](#signal-detection-xmr)
5. [Channel-Agnostic Design](#channel-agnostic-design)
6. [Data Ingestion](#data-ingestion)
7. [Learning System](#learning-system)
8. [OODA Loop](#ooda-loop)
9. [Onboarding Flow](#onboarding-flow)
10. [Notifications](#notifications)
11. [Error Handling](#error-handling)
12. [SQLite Schema](#sqlite-schema)
13. [Implementation Order](#implementation-order)
14. [Verification Plan](#verification-plan)
15. [Key Decisions Summary](#key-decisions-summary)

---

## Overview

A compound marketing agent that runs autonomously to analyze marketing performance, generate recommendations, create draft content, and compound learnings over time. Designed for maximum autonomy with minimal user friction.

**Location:** `03_agents/growth-experiments/`

**Key Principles:**
- User never edits files directly — all input via chat
- All mutable state in SQLite
- Agent acts first, user approves
- Learnings compound into principles over time
- Human is the approver, not the bottleneck
- CSV is a first-class citizen, not a degraded experience

---

## Architecture

```
03_agents/growth-experiments/
├── CLAUDE.md                     # Agent brain (lean, includes essential reference content)
├── marketing.db                  # SQLite — ALL mutable state
├── .env                          # API credentials (gitignored, separate for security)
├── run.sh                        # Cron entry point
└── README.md                     # User documentation
```

### Key Architectural Decisions

| Decision | Implementation | Rationale |
|----------|----------------|-----------|
| **REFERENCE.md** | Merge essential parts into CLAUDE.md | Reduce file count; archive detailed reference content to `05_research/` |
| **Credentials** | Keep `.env` separate | Security conventions; credentials should never be in CLAUDE.md |
| **Data pipeline** | Direct API + CSV fallback | No ETL platform (n8n/Airbyte); agent IS the pipeline |
| **State management** | SQLite only | Query simplicity over git auditability |

### Two-File Architecture (Agent-Native)

Following the agent-native pattern:

| File | Purpose | Who Writes |
|------|---------|------------|
| `CLAUDE.md` | Agent brain — instructions, frameworks, formats | Human (at setup) |
| `marketing.db` | Mutable state — metrics, learnings, recommendations | Agent (continuously) |

---

## MKT1 Framework Integration

### Perceptions Framework

**Discovery Timing:** During company discovery (Step 1 of onboarding)

**Process:**
1. Agent researches company via WebFetch
2. Agent proposes 3-5 perceptions based on research
3. Agent explains the perceptions framework: "These are what you want to be known for — what you want your audience to repeat back to you"
4. User validates, edits, or rejects proposed perceptions
5. Validated perceptions stored in `company` table and guide all content

**Example perceptions for Autonomous:**
- "Turns routine work into software that runs forever"
- "Shows receipts, not theory"
- "Built by practitioners who've done the work"

### GACC Brief Structure

Every recommendation includes a GACC brief:

```markdown
## GACC Brief

**Goal:** What are we trying to achieve with this content?

**Audience:** Who specifically is this for? (ICP segment)

**Channels:** Where will this be published? What format does that require?

**Creative:** What's the hook? What's the narrative arc? What's the CTA?
```

The GACC structure ensures recommendations are strategically grounded, not just tactically optimized.

### Fuel/Engine Balance (Progressive)

**Tracked silently from day 1.** Only surfaced after ~10 recommendations when the pattern becomes meaningful.

| Concept | Definition | Examples |
|---------|------------|----------|
| **Fuel** | Content that feeds channels | Blog posts, newsletters, social posts |
| **Engine** | Systems that distribute content | Scheduling, repurposing workflows, automation |

**When surfaced:**
> "I've noticed we're heavy on Fuel (12 pieces of content) but light on Engine (1 repurposing workflow). Want to balance this?"

This prevents premature abstraction — the framework emerges from data, not theory.

### Customer Story Framing

Retained from Brinker research. Every recommendation includes customer story framing:

```
As a [ICP ROLE], I want [CONTENT/EXPERIENCE] so that [BENEFIT/REASON WHY].
```

**Example:**
> As a startup generalist drowning in routine work, I want to see a thread about how someone automated their weekly reporting so that I can believe this is achievable for me.

---

## Signal Detection (XMR)

### Method

**XMR charts v1 with fallback:**

| Channel Type | Signal Detection Method |
|--------------|------------------------|
| API channels (sufficient data) | XMR charts (statistical process control) |
| CSV/new channels (limited data) | Percentage threshold fallback (e.g., >20% change from baseline) |

### What XMR Does

- Shows when a metric change is real vs random fluctuation
- Uses three rules: process limits, quartile limits, runs of eight
- Color-codes violations for quick pattern recognition

### Display Format

**Simple text explanation + chart link:**

```markdown
## Signal Detection

**Open rate:** 18.2% (down from 23.1% baseline)

**Signal confidence:** HIGH — This is real, not noise.
- Open rate crossed lower control limit on Jan 15
- Process Limit Rule violation indicates sustained shift

[View XMR chart](https://quickchart.io/chart?c={...})
```

Using [quickchart.io](https://quickchart.io/) for chart generation — no local image storage needed.

### Purpose

XMR separates signal from noise, making compound learning trustworthy. Without it:
- Agent reacts to noise
- Learnings are polluted with false patterns
- User loses trust in recommendations

---

## Channel-Agnostic Design

### Philosophy

The agent is channel-agnostic with a **self-expanding knowledge base**. It starts with pre-built knowledge for common channels but can discover and learn new channels autonomously.

### Known Channel Integrations

| Channel | API Access | Posting Capability | Data Retrieval |
|---------|-----------|-------------------|----------------|
| **Beehiiv** | Beehiiv API v2 | Draft via API | Subscriber stats, open rates, clicks |
| **ConvertKit/Kit** | Kit API | Draft via API | Subscriber stats, open rates, clicks |
| **Buttondown** | Buttondown API | Draft via API | Subscriber stats, engagement |
| **Substack** | None (unofficial) | No API posting | RSS + CSV fallback |
| **Twitter/X** | Twitter API Basic ($100/mo) | Post directly | Impressions, engagement |
| **LinkedIn Company** | LinkedIn Marketing API | Post directly | Impressions, engagement |
| **LinkedIn Personal** | None | No API posting | CSV only |
| **GA4** | Google Analytics Data API | N/A (analytics only) | Traffic, conversions, behavior |

### Unknown Channel Discovery

When user mentions a new channel:

1. **Agent researches** API docs via WebFetch
2. **Agent proposes approach** based on research
3. **Agent stores pattern** in learnings for future use
4. **Falls back to CSV** if no API available

**Example discovery flow:**

```
User: "I also post on Threads"

Agent: [researches Threads API]

Agent: "Threads uses Meta's API (same as Instagram). I found:
- Read: Available via Threads API
- Write: Available but requires Meta app review
- Cost: Free

I can track metrics via API but posting requires you to publish manually.
Want me to set this up?"
```

### Autonomy Model Per Channel

User chooses autonomy level during setup. Agent presents only valid options per channel.

| Channel Type | Draft Only | Auto-Stage | Auto-Post |
|--------------|------------|------------|-----------|
| **Newsletters** (Beehiiv, Kit, Buttondown) | Yes | Yes | — |
| **Social with API** (Twitter, LinkedIn Company) | Yes | — | Yes (after approval) |
| **Social without API** (LinkedIn Personal, Substack) | Yes | — | — |

**Autonomy levels:**
- **Draft only:** Agent creates draft, user copies/pastes to publish
- **Auto-stage:** Agent stages in platform, user clicks publish
- **Auto-post after approval:** Agent posts directly after user approves in CLI

---

## Data Ingestion

### API Tier (Preferred)

Direct API integration for maximum autonomy.

| Platform | API | Cost | Data Available |
|----------|-----|------|----------------|
| GA4 | Google Analytics Data API | Free | Traffic, behavior, conversions |
| Beehiiv | Beehiiv API v2 | Free | Subscribers, opens, clicks |
| ConvertKit/Kit | Kit API | Free | Subscribers, opens, clicks |
| Buttondown | Buttondown API | Free | Subscribers, engagement |
| Twitter/X | Twitter API Basic | $100/mo | Impressions, engagement |
| LinkedIn | Marketing API | Free (approval required) | Company page metrics |

### CSV Fallback (First-Class Citizen)

CSV is not a degraded experience. It's a first-class data source with its own learning loop.

**How it works:**

1. User picks sync day during onboarding (e.g., "Monday")
2. Agent prompts on sync day: "Please upload your [platform] analytics CSV"
3. Agent parses CSV, establishes baselines, generates recommendations
4. CSV is weekly, not daily — agent accepts the freshness tradeoff

**Learning for CSV channels:**

On next session, agent asks:
> "Did you publish the [platform] content? Paste the final version or confirm it was published as-is."

This captures edits and enables learning even without API observation.

### No ETL Platform

The agent IS the pipeline:
- Fetches data on-demand via API
- Falls back to CSV prompts for non-API channels
- Stores metrics in SQLite
- No Airbyte, n8n, or Fivetran required

---

## Learning System

### Specific Learnings

Created automatically when:
- User edits recommendation before publishing
- Published content outperforms/underperforms baseline
- User rejects recommendation (with reason)

**Format:**

```markdown
[L001] 2026-01-25 | Twitter | Optimization
Hypothesis: Curiosity gap hooks increase engagement
Result: +2.1% engagement rate
Learning: "How [X]" format outperforms statements
Applied: 3 times since
```

### Principle Extraction (Inline)

**Trigger:** After 2+ related specific learnings with consistent results.

**Process:** Inline during recommendation delivery, not as separate task.

```markdown
## Today's Recommendation

**Initiative:** Test "How I..." thread format

**Note:** I've used curiosity gap hooks twice now with +2% lift both times.
Should I apply this as a principle? (It would inform future recommendations automatically)

[Yes, make it a principle] [No, keep testing]
```

**Why inline:** Reduces friction. User makes the decision in context, not in a separate "learning review" session.

### Quality Gates (Hard)

Before presenting any draft, agent must pass ALL gates internally. If a gate fails, agent iterates until it passes — user never sees failed drafts.

| Gate | Check | Failure Action |
|------|-------|----------------|
| **Voice** | Matches brand (no hype language) | Rewrite |
| **Hook** | Creates specific curiosity | Rewrite |
| **CTA** | Actionable and clear | Rewrite |
| **Format** | Fits channel best practices | Restructure |
| **Length** | Within channel norms | Trim/expand |

**Why hard gates:** Soft gates (warnings) create decision fatigue. Hard gates ensure quality floor.

### Initiative Balance (70/20/10)

**Tracked as rolling percentage** of last 10 recommendations.

| Type | Target | Description |
|------|--------|-------------|
| **Optimization** | 70% | Improve what's working |
| **Experiment** | 20% | Test new hypotheses |
| **Exploration** | 10% | Try unproven formats/channels |

**Flag when imbalanced:**
> "Note: 8 of your last 10 recommendations were optimizations. Want to run an experiment?"

This prevents local maxima — continuous optimization without exploration leads to stagnation.

### Meta-Learnings (Monthly In-CLI)

**Timing:** In-CLI on session start, near month-end (25th-31st)

**Format:** Conversational, not a formal report

```
Welcome back. Quick note: This month I learned some things about how we work together:

1. You consistently add personal anecdotes to my drafts → I'll include placeholder hooks for your stories
2. Your Twitter audience responds 2x better to threads than single tweets → I've updated my format default
3. Newsletter open rates improved 15% since we started → the compound effect is working

Want to discuss any of these, or shall we dive into today's work?
```

**Why in-CLI:** Email reports get ignored. In-CLI catches attention at the moment of engagement.

---

## OODA Loop

### Observe

1. Fetch metrics via API (or prompt for CSV on sync day)
2. Fetch published content (API) or ask for final version (CSV channels)
3. Match published content to pending recommendations

### Orient

1. Compare metrics to 30-day rolling baselines
2. Apply XMR analysis to detect signal vs noise
3. Identify limiting factor:
   - **Reach problem:** Low impressions despite good engagement
   - **Engagement problem:** High reach but low engagement
   - **Conversion problem:** High engagement but no action
4. Query relevant learnings from SQLite
5. Detect edit patterns if draft was published with changes

### Decide

Choose ONE recommendation based on:

| Criterion | Weight | Description |
|-----------|--------|-------------|
| **Impact** | High | Highest potential ROI |
| **Feasibility** | Medium | Completable in one cycle |
| **Measurability** | Medium | Clear success metric |
| **Initiative balance** | Low | Maintain 70/20/10 |

### Act

1. Create draft applying accumulated learnings
2. Run through quality gates (iterate internally until all pass)
3. Structure with GACC brief + customer story
4. Present to user with signal detection context
5. Save to database with status `pending`

### Compound

1. After results known: Create specific learning
2. After 2+ related learnings: Propose principle (inline)
3. After rejection: Record reason as learning
4. Monthly: Surface meta-learnings in-CLI

---

## Onboarding Flow

### Step 1: Company + Channel Discovery

**Trigger:** First conversation or empty company profile

```
"What's your website or company name?"
```

**Agent actions (silent):**
- Research via WebFetch
- Extract positioning, ICP, differentiators
- Propose 3-5 perceptions (explain framework)
- Discover channels (social, newsletter, etc.)

**Output:**

```
Based on [company]:

**Positioning:** [extracted positioning]
**ICP:** [extracted ICP]

**Proposed perceptions** (what you want to be known for):
1. [Perception 1]
2. [Perception 2]
3. [Perception 3]

Do these capture what you want to be known for? I'll use them to guide all content.

**Channels found:**
- Recommended (active): Twitter (@handle), Newsletter (Beehiiv)
- Also found (dormant): LinkedIn, YouTube

Which channels should I track?
```

### Step 2: Credential Collection

For each selected channel:

```
To connect [channel], I need:
1. Go to [specific settings URL]
2. Create an API key with [specific permissions]
3. Paste the key here

[Detailed step-by-step instructions per platform]
```

**Agent actions:**
- Test connection immediately
- Report success/failure
- Offer retry if failed
- Store credential reference in .env (via user action)

### Step 3: First Recommendation

**Agent actions (silent):**
- Establish baselines from initial data pull
- Research competitors (if relevant)
- Run full OODA cycle

**Output:**
- First recommendation with GACC brief
- Draft content in channel-appropriate format
- Signal detection context (even if limited data)

### Step 4: Scheduling (Optional)

```
Want daily recommendations delivered to your inbox?
- Yes → [collect email, set up cron]
- No → [manual sessions only]
```

**Defaults:**
- Time: 7am user timezone (configurable)
- Format: Full draft in email (self-contained)

---

## Notifications

### Email Format (Full Draft)

The email IS the decision point — user doesn't need CLI to review initial recommendation.

```
Subject: [Channel] Recommendation — [Date]

Your [channel] [metric] is [value] (vs [baseline] baseline).

## GACC Brief

**Goal:** [what we're trying to achieve]
**Audience:** [specific ICP segment]
**Channels:** [where this will be published]
**Creative:** [narrative arc summary]

## Signal Detection

[XMR summary — real signal or noise?]
[Chart link if applicable]

## Recommendation

[One sentence summary]

## Draft

---
[Full draft content, ready to copy/paste or approve]
---

## Learnings Applied

- [L001]: [summary]
- [L003]: [summary]

---

**Actions:**
- Reply "approve" to post (if auto-post enabled)
- Reply "approve with edits" and paste your version
- Reply "reject" with reason
- Or open CLI for detailed editing

⚠️ [If any issues: Couldn't pull data from [channel] — using last known metrics]
```

### CLI Role (Edits Only)

CLI is for:
- Detailed editing of drafts
- Multi-turn conversations about strategy
- Reviewing learnings and patterns
- Complex decisions

CLI is NOT for:
- Initial recommendation review (that's email)
- Simple approve/reject (that's email reply)

This reduces friction — most decisions are simple and can happen in email.

---

## Error Handling

| Scenario | Response | Notification |
|----------|----------|--------------|
| **API failure** | Skip channel, continue others | Note in email: "Couldn't pull [channel] data" |
| **Missing CSV on sync day** | Remind once, proceed after 48h without | Gentle reminder, not blocker |
| **Content match uncertain** (40-80% similarity) | Ask user | "Was this based on my recommendation?" |
| **Critical error** (DB corruption, auth failure) | **Notify + wait** | Do NOT auto-recover; user decides |
| **Rate limit** | Backoff + retry | Silent unless persistent |

### Critical Error Protocol

For critical errors (data loss risk, auth compromise):

1. **Stop** — Do not attempt auto-recovery
2. **Notify** — Email user immediately with specific error
3. **Wait** — User must acknowledge before agent resumes
4. **Log** — Full error context in database for debugging

**Why no auto-recovery:** Auto-recovery for critical errors can compound damage. Human judgment required.

---

## SQLite Schema

```sql
-- Company profile (includes perceptions)
CREATE TABLE company (
  id INTEGER PRIMARY KEY,
  name TEXT,
  url TEXT,
  positioning TEXT,
  primary_icp TEXT,
  secondary_icp TEXT,
  differentiators TEXT,
  perceptions TEXT,  -- JSON array of 3-5 perceptions
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Channels (includes autonomy level)
CREATE TABLE channels (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  platform TEXT NOT NULL,
  handle_or_url TEXT,
  api_credentials_env TEXT,
  data_source TEXT DEFAULT 'api',  -- 'api', 'csv'
  autonomy_level TEXT DEFAULT 'draft_only',  -- 'draft_only', 'auto_stage', 'auto_post'
  csv_sync_day TEXT,
  status TEXT DEFAULT 'active',
  last_fetched DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Metrics (time-series)
CREATE TABLE metrics (
  id INTEGER PRIMARY KEY,
  channel_id INTEGER REFERENCES channels(id),
  date DATE NOT NULL,
  metric_name TEXT NOT NULL,
  value REAL NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(channel_id, date, metric_name)
);

-- XMR baselines (for signal detection)
CREATE TABLE xmr_baselines (
  id INTEGER PRIMARY KEY,
  channel_id INTEGER REFERENCES channels(id),
  metric_name TEXT NOT NULL,
  baseline_value REAL NOT NULL,
  upper_control_limit REAL NOT NULL,
  lower_control_limit REAL NOT NULL,
  calculated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(channel_id, metric_name)
);

-- Published content
CREATE TABLE content (
  id INTEGER PRIMARY KEY,
  channel_id INTEGER REFERENCES channels(id),
  external_id TEXT,
  content_text TEXT NOT NULL,
  content_url TEXT,
  published_at DATETIME,
  fetched_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  recommendation_id INTEGER REFERENCES recommendations(id),
  match_confidence REAL,  -- 0-1 confidence of attribution
  final_version TEXT  -- User-provided final version for CSV channels
);

-- Recommendations (includes GACC brief)
CREATE TABLE recommendations (
  id INTEGER PRIMARY KEY,
  channel_id INTEGER REFERENCES channels(id),
  type TEXT NOT NULL,  -- 'optimization', 'experiment', 'exploration'
  status TEXT DEFAULT 'pending',  -- 'pending', 'approved', 'rejected', 'published'
  gacc_goal TEXT,
  gacc_audience TEXT,
  gacc_channels TEXT,
  gacc_creative TEXT,
  customer_story TEXT,
  analysis TEXT NOT NULL,
  draft TEXT NOT NULL,
  expected_impact TEXT,
  signal_confidence TEXT,  -- 'high', 'medium', 'low'
  xmr_summary TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  approved_at DATETIME,
  published_at DATETIME,
  user_edits TEXT,
  rejection_reason TEXT
);

-- Learnings (specific + principles)
CREATE TABLE learnings (
  id INTEGER PRIMARY KEY,
  channel_id INTEGER,  -- NULL for cross-channel principles
  type TEXT NOT NULL,  -- 'specific', 'principle'
  summary TEXT NOT NULL,
  full_prose TEXT NOT NULL,
  hypothesis TEXT,
  result TEXT,
  performance_impact REAL,
  source_recommendation_id INTEGER REFERENCES recommendations(id),
  validated BOOLEAN DEFAULT FALSE,
  superseded_by INTEGER REFERENCES learnings(id),
  applied_count INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Initiative balance tracking
CREATE TABLE initiative_balance (
  id INTEGER PRIMARY KEY,
  recommendation_id INTEGER REFERENCES recommendations(id),
  type TEXT NOT NULL,  -- 'optimization', 'experiment', 'exploration'
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Delivery config
CREATE TABLE delivery (
  id INTEGER PRIMARY KEY,
  method TEXT NOT NULL,  -- 'email', 'slack'
  frequency TEXT DEFAULT 'daily',
  email_address TEXT,
  slack_channel_id TEXT,
  delivery_time TEXT DEFAULT '07:00',
  timezone TEXT DEFAULT 'UTC',
  enabled BOOLEAN DEFAULT TRUE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Run history
CREATE TABLE runs (
  id INTEGER PRIMARY KEY,
  started_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  completed_at DATETIME,
  status TEXT,
  channels_processed TEXT,  -- JSON array
  channels_failed TEXT,  -- JSON array
  recommendation_id INTEGER REFERENCES recommendations(id),
  errors TEXT
);

-- Channel knowledge (self-expanding)
CREATE TABLE channel_knowledge (
  id INTEGER PRIMARY KEY,
  platform TEXT NOT NULL UNIQUE,
  api_documentation_url TEXT,
  has_read_api BOOLEAN,
  has_write_api BOOLEAN,
  api_cost TEXT,
  discovered_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  notes TEXT  -- Agent's notes on how to use this channel
);
```

---

## Implementation Order

1. **SQLite schema** + database creation
2. **CLAUDE.md** (lean, with essential reference content merged)
3. **Onboarding flow** (4 steps with perceptions discovery)
4. **API integrations** (Beehiiv, ConvertKit, Buttondown, GA4, Twitter)
5. **CSV ingestion** (first-class support)
6. **Content matching** (confidence-based attribution)
7. **XMR signal detection** (with quickchart.io visualization)
8. **Learning system** (specific → principles with inline extraction)
9. **Quality gates** (hard gates, internal iteration)
10. **GACC brief generation**
11. **Recommendation generation** (full OODA loop)
12. **Notification delivery** (email with full draft)
13. **run.sh + cron**
14. **README.md**
15. **Testing**

---

## Verification Plan

### Onboarding Test

1. Start fresh (empty database)
2. Run onboarding via chat
3. **Verify:**
   - Company profile includes perceptions
   - Channels configured with autonomy levels
   - Credentials in .env
   - API connections work

### Perceptions Framework Test

1. Provide company URL
2. **Verify:**
   - Agent proposes 3-5 perceptions
   - Agent explains framework clearly
   - User can edit/validate perceptions
   - Perceptions stored in database

### Signal Detection Test

1. Configure channel with 30+ days of data
2. Introduce artificial anomaly
3. **Verify:**
   - XMR detects signal vs noise correctly
   - Chart link generated and accessible
   - Recommendation cites signal confidence

### Learning System Test

1. Run 3 cycles with user edits
2. **Verify:**
   - Specific learnings created per edit
   - Principle extraction offered after 2+ related learnings
   - Inline prompt appears in recommendation (not separate)

### Initiative Balance Test

1. Run 10+ recommendations
2. **Verify:**
   - Balance tracked correctly (70/20/10)
   - Flag appears when imbalanced (>80% optimization)

### CSV Workflow Test

1. Configure channel as CSV-only
2. Run full cycle with CSV upload
3. **Verify:**
   - Sync day prompt works
   - "Did you publish?" question appears on next session
   - Learnings captured from reported edits

### Notification Test

1. Enable email delivery
2. Run scheduled recommendation
3. **Verify:**
   - Full draft in email (self-contained)
   - GACC brief included
   - Reply actions work (approve, reject)

### Quality Gates Test

1. Observe draft generation
2. **Verify:**
   - All gates pass before presentation
   - User never sees failed drafts
   - Internal iteration logs visible in run history

---

## Key Decisions Summary

| # | Decision | Choice | Rationale |
|---|----------|--------|-----------|
| 1 | REFERENCE.md | Merge essential + archive rest | Reduce complexity; one brain file |
| 2 | Credentials | Keep .env separate | Security best practices |
| 3 | MKT1 Framework | Perceptions + GACC + progressive Fuel/Engine | Full framework without overwhelming new users |
| 4 | Perceptions discovery | Agent-led during onboarding | Agent researches, proposes, user validates |
| 5 | Auto-observation | CSV first-class | Equal learning capability regardless of API access |
| 6 | ETL platform | Skip (Direct API + CSV) | Agent IS the pipeline |
| 7 | CSV learning | Ask on next session | "Did you publish? Paste final version or confirm" |
| 8 | Signal detection | XMR v1 with % fallback | Statistical rigor with graceful degradation |
| 9 | XMR display | Text + quickchart.io link | No local image storage needed |
| 10 | Autonomy level | User chooses per channel | Granular control over automation |
| 11 | LinkedIn Company | Support direct posting | Marketing API allows company page posts |
| 12 | Principle extraction | Inline during recommendation | Reduce friction; decision in context |
| 13 | Quality gates | Hard gates (strict) | No decision fatigue; quality floor guaranteed |
| 14 | Initiative balance | Percentage-based rolling (last 10) | Prevent local maxima; flag imbalance |
| 15 | Meta-learnings | In-CLI on session start | Catch attention at moment of engagement |
| 16 | Notification depth | Full draft in email | Self-contained decision point |
| 17 | CLI role | Edits only | Simple decisions in email, complex in CLI |
| 18 | Channel discovery | Self-expanding knowledge base | Agent researches unknown channels |
| 19 | Competitor intel | Research on-demand | Only when relevant to recommendation |
| 20 | Critical errors | Notify + wait | No auto-recovery for data loss risks |
| 21 | Autonomy boundary | Current boundary is right | Agent: analysis, drafting, tracking. User: approval, perceptions, principles |
| 22 | Spec structure | Single file with TOC | Easy navigation; complete picture |
| 23 | Customer Story | Retained from Brinker research | Complements MKT1; keeps recommendations customer-centric |

---

## Autonomy Boundary

Clear division of responsibility:

| Agent Owns | User Owns |
|------------|-----------|
| Data analysis | Content approval |
| Signal detection | Perceptions validation |
| Draft creation | Principle confirmation |
| Learning extraction | Strategic direction |
| Quality gates | Rejection decisions |
| Metric tracking | Channel selection |
| Pattern recognition | Final publish action |

The agent maximizes autonomy within these boundaries. It never crosses into user territory without explicit permission.

---

## Alignment Checks

### MKT1 Alignment

- [x] Perceptions framework integrated (agent-led discovery)
- [x] GACC brief structures every recommendation
- [x] Fuel/Engine tracked (progressive surfacing)
- [x] Customer Story retained from Brinker

### Autonomous Alignment

- [x] Routine vs judgment boundary clear
- [x] Agent handles routine (analysis, drafting, tracking)
- [x] User handles judgment (approval, strategy, perceptions)
- [x] System compounds over time (learnings → principles)

### Agent-Native Alignment

- [x] Two-file architecture (CLAUDE.md + SQLite)
- [x] All mutable state in SQLite
- [x] User never edits files directly
- [x] Self-expanding knowledge base for channels

---

## References

- Original spec: `05_research/compound_marketing_agent/06_spec.md`
- MKT1 framework: `05_research/compound_marketing_agent/01_research.md`
- Brinker synthesis: `05_research/compound_marketing_agent/04_hacking_synthesis.md`
- Implementation details: `05_research/compound_marketing_agent/05_implementation.md`
