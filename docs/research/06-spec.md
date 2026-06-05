# Growth Experiments Agent — Final Specification

> Consolidated spec based on interview process. Incorporates decisions from research docs, compound-product blueprint, MKT1 framework, and user preferences.

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

---

## Architecture

```
03_agents/growth-experiments/
├── CLAUDE.md                     # Agent brain (~12k chars, lean)
├── REFERENCE.md                  # Full specification for maintainer reference
├── marketing.db                  # SQLite — ALL mutable state
├── .env                          # API credentials (gitignored)
├── run.sh                        # Cron entry point
└── README.md                     # User documentation
```

### Key Decision: No n8n Templates

n8n is documented as an option with links to their docs, but we don't ship/maintain templates. If user doesn't have API access, they use CSV fallback.

---

## SQLite Schema

```sql
-- Company profile
CREATE TABLE company (
  id INTEGER PRIMARY KEY,
  name TEXT,
  url TEXT,
  positioning TEXT,
  primary_icp TEXT,
  secondary_icp TEXT,
  differentiators TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Channels
CREATE TABLE channels (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  platform TEXT NOT NULL,
  handle_or_url TEXT,
  api_credentials_env TEXT,
  data_source TEXT DEFAULT 'api',  -- 'api', 'rss', 'csv'
  status TEXT DEFAULT 'active',
  last_fetched DATETIME,
  csv_sync_day TEXT,
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

-- Published content
CREATE TABLE content (
  id INTEGER PRIMARY KEY,
  channel_id INTEGER REFERENCES channels(id),
  external_id TEXT,
  content_text TEXT NOT NULL,
  content_url TEXT,
  published_at DATETIME,
  fetched_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  recommendation_id INTEGER REFERENCES recommendations(id)
);

-- Recommendations
CREATE TABLE recommendations (
  id INTEGER PRIMARY KEY,
  channels TEXT NOT NULL,  -- JSON array
  type TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  analysis TEXT NOT NULL,
  draft TEXT NOT NULL,
  expected_impact TEXT,
  tier TEXT,  -- for website: 'quick' or 'requires_dev_work'
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  approved_at DATETIME,
  published_at DATETIME,
  user_edits TEXT
);

-- Learnings
CREATE TABLE learnings (
  id INTEGER PRIMARY KEY,
  channel TEXT,
  type TEXT NOT NULL,  -- 'specific' or 'principle'
  summary TEXT NOT NULL,
  full_prose TEXT NOT NULL,
  hypothesis TEXT,
  result TEXT,
  performance_impact REAL,
  source_recommendation_id INTEGER REFERENCES recommendations(id),
  source_content_id INTEGER REFERENCES content(id),
  validated BOOLEAN DEFAULT FALSE,
  superseded_by INTEGER REFERENCES learnings(id),
  context_version TEXT,  -- for tracking pre/post pivot
  applied_count INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Context versions (for tracking strategic changes)
CREATE TABLE context_versions (
  id INTEGER PRIMARY KEY,
  field TEXT NOT NULL,
  old_value TEXT,
  new_value TEXT,
  changed_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Competitors
CREATE TABLE competitors (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  url TEXT,
  description TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Delivery config
CREATE TABLE delivery (
  id INTEGER PRIMARY KEY,
  method TEXT NOT NULL,
  frequency TEXT DEFAULT 'daily',
  email_address TEXT,
  slack_channel_id TEXT,
  enabled BOOLEAN DEFAULT TRUE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Run history
CREATE TABLE runs (
  id INTEGER PRIMARY KEY,
  started_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  completed_at DATETIME,
  status TEXT,
  channels_processed TEXT,
  channels_failed TEXT,
  recommendation_id INTEGER REFERENCES recommendations(id),
  errors TEXT
);
```

---

## Data Ingestion (Tiered)

### Tier 1: Direct API (Preferred)

| Platform | API | Cost |
|----------|-----|------|
| GA4 | Google Analytics Data API | Free |
| Beehiiv | Beehiiv API v2 | Free |
| ConvertKit/Kit | Kit API | Free |
| Buttondown | Buttondown API | Free |
| Substack | None (RSS + CSV) | Free |
| Twitter/X | Twitter API Basic | $100/mo |
| LinkedIn | None (CSV only) | Free |

### Tier 2: n8n (Documented, Not Shipped)

For platforms without API access, user can set up n8n workflows. We provide:
- Link to n8n docs
- Description of required output format (JSON to SQLite)
- No maintained templates

### Tier 3: CSV Import (Fallback)

- User picks sync day during onboarding
- Agent prompts on sync day: "Please upload your [platform] analytics CSV"
- CSV is weekly, not daily — accept the freshness tradeoff

---

## Content Matching & Attribution

### Confidence-Based Matching

When agent detects new published content:

| Similarity | Action |
|------------|--------|
| >80% | Auto-attribute, generate learning from diff |
| 40-80% | Ask: "Was this based on my recommendation?" |
| <40% | Treat as organic content, still track performance |

### Graduated Attribution for Partial Matches

When user adopts only part of draft (e.g., hook but rewrote body):
- Track as "partially adopted"
- Extract which elements survived
- Generate learning: "User trusts hooks but rewrites body content"

---

## Learning System

### Specific Learnings
Created when:
- User edits recommendation before publishing
- Published content outperforms/underperforms baseline

### Principle Extraction
After 2+ related specific learnings:
- Agent proposes: "I've noticed a pattern... Should I apply this as a principle?"
- User confirms or rejects
- Validated principles get applied with higher confidence

### Channel-Scoped vs Cross-Channel

- Specific learnings: always channel-scoped
- Principles: get channel weights (e.g., "Curiosity hooks: Twitter +2.1%, LinkedIn -0.5%")
- Superseding happens within channel OR when principle invalidates specific

### Context Versioning

When user indicates strategic change (new ICP, pivot):
1. Record the change in context_versions table
2. Flag affected learnings as "pre-pivot-[date]"
3. Apply flagged learnings with lower confidence
4. Validate through new data

---

## The OODA Loop

### Observe
- Fetch metrics via API (or prompt for CSV on sync day)
- Fetch published content
- Match published content to pending recommendations

### Orient
- Compare metrics to 30-day rolling baselines
- Identify limiting factor (reach vs engagement vs conversion)
- Query relevant learnings
- Detect edit patterns if draft was published with changes

### Decide
Choose ONE recommendation based on:
1. **Impact** — Highest potential ROI
2. **Feasibility** — Completable in one cycle
3. **Measurability** — Clear success metric

**Initiative Types:**
- Optimization (70%)
- Experiment (20%)
- Exploration (10%)

Track balance. If >5 optimizations in a row, suggest experimenting.

### Act
- Create draft in channel-appropriate format
- Apply quality gates (Definition of Done)
- Present with customer story framing
- Save to database

### Compound
- Record learning after results
- Track edit patterns
- Propose principle extraction when patterns emerge
- Monthly: share meta-learnings ("Here's what I've learned about how we work together")

---

## Onboarding (4 Steps)

### Step 1: Company + Channel Discovery
"What's your website or company name?"
→ Research via WebFetch
→ Extract positioning, ICP, differentiators
→ Discover channels (social, newsletter, etc.)
→ Present with tiered display:
  - **Recommended (active):** Twitter, Newsletter
  - **Also found (dormant):** LinkedIn, YouTube
→ User selects which to track

### Step 2: Credential Collection
For each selected channel:
→ Provide step-by-step credential instructions
→ Test connection immediately
→ Report success/failure
→ Offer retry if failed

### Step 3: First Recommendation
→ Establish baselines (silent)
→ Research competitors (silent)
→ Run full OODA cycle
→ Present first recommendation

### Step 4: Scheduling (Optional)
"Want daily recommendations?"
→ Collect notification method (email/Slack)
→ Collect credentials
→ Install cron (2am default, no config)

---

## Cross-Channel Opportunities

When content performs >2x baseline:
- Proactively suggest repurposing
- "Your thread got 4.2% engagement. Want me to draft a newsletter version?"
- Don't auto-create without user consent
- If user declines, note preference and reduce future suggestions

---

## Strategic Signals

Agent flags (doesn't prescribe) positioning issues when:
- Content performs but doesn't convert
- Same message resonates differently across channels
- Engagement drops despite varied tactics (3+ cycles)

Response: "These signals might indicate positioning needs review. Want me to analyze?"

Based on MKT1 framework, agent can help investigate but human owns positioning decisions.

---

## Notification Format

**Email (Hybrid: summary + CLI):**
```
Subject: Marketing Recommendation — [date]

Your [channel] engagement is [value] (vs [baseline] baseline).

Key insight: [one sentence summary]

Today's recommendation: [one sentence]

→ Open Claude in your terminal to review the full draft.

---
Learnings applied:
- [L001 summary]

⚠️ [If API failed: Couldn't pull data from [channel]]
```

Short, scannable. Full review happens in CLI.

---

## Website Channel

Include all recommendations, tier clearly:
- **Quick:** Headline changes, CTA text, meta descriptions
- **Requires dev work:** New pages, structural changes

User decides what's actionable based on their capabilities.

---

## Error Handling

| Scenario | Response |
|----------|----------|
| API failure | Skip channel, continue others, note in notification |
| Missing CSV on sync day | Remind, proceed after 48h without |
| Content match uncertain | Ask user (40-80% similarity) |
| User doesn't report results | Check via API if draft was published |

---

## CLAUDE.md Approach

**Ship:** Lean version (~12k chars)
- Purpose, OODA loop, decision criteria, output formats
- Trust Claude to handle edge cases
- Add specifics to learnings as they emerge

**Keep:** Comprehensive version as REFERENCE.md
- Full credential flows
- All error scenarios
- Detailed examples
- For maintainer reference, not agent consumption

---

## MKT1 Enhancements

Incorporated from research:

1. **Customer Story framing** — Every recommendation includes:
   "As a [ICP], I want [content] so that [benefit]"

2. **70/20/10 initiative balance** — Track and flag imbalance

3. **Definition of Done quality gates** — Before presenting draft:
   - Voice matches brand
   - Hook creates curiosity
   - CTA is actionable

4. **Flag + investigate** for positioning signals — Don't prescribe, just surface

---

## Files to Create

| File | Purpose | Size |
|------|---------|------|
| `CLAUDE.md` | Agent brain (lean) | ~12k chars |
| `REFERENCE.md` | Full specification | ~28k chars |
| `run.sh` | Cron entry point | ~30 lines |
| `README.md` | User documentation | ~200 lines |

---

## Implementation Order

1. SQLite schema + database creation
2. CLAUDE.md (lean version)
3. Onboarding flow (4 steps)
4. API integrations (Beehiiv, ConvertKit, Buttondown, GA4)
5. Content fetching (RSS, API endpoints)
6. Content matching (confidence-based)
7. Learning system (specific → principles)
8. Recommendation generation
9. Delivery setup (email/Slack)
10. run.sh + cron
11. README.md
12. REFERENCE.md (comprehensive version)
13. Testing

---

## Verification Plan

### Onboarding Test
1. Start fresh (empty database)
2. Run onboarding via chat
3. Verify: company in DB, channels configured, credentials in .env
4. Verify: API connections work

### Data Ingestion Test
1. Configure GA4 + one newsletter platform
2. Run data fetch
3. Verify: metrics in DB with correct dates
4. Verify: published content captured

### Content Matching Test
1. Create and approve recommendation
2. Simulate publishing (insert into content table with variations)
3. Verify: confidence-based matching works
4. Verify: learning generated from diff

### Learning Test
1. Run 3 cycles with user edits
2. Verify: specific learnings created
3. Verify: principle extraction offered after pattern

### Scheduled Run Test
1. Install cron
2. Manually trigger run.sh
3. Verify: recommendation generated
4. Verify: notification sent
5. Verify: API failure handled gracefully

---

## Key Decisions Summary

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Data migration (CSV→API) | Migrate and merge | Preserve compound learnings |
| Edit attribution | Graduated (confidence-based) | Learn from partial adoption |
| Learning conflicts | Weighted principles | Cross-channel patterns with channel context |
| Channel discovery | Tiered presentation | Agent demonstrates judgment |
| Strategic escalation | Flag + investigate | Human owns positioning |
| Scheduling | 2am default, no config | Keep it simple |
| Learnings storage | SQLite only | Query simplicity over git auditability |
| Learnings delivery | In context with recommendations | Demonstrates compound effect |
| Meta-learnings | Periodic reflection (monthly) | Transparency without noise |
| Cross-channel | Proactive suggestions with consent | Compound opportunities, user control |
| Review UX | Hybrid (summary email + CLI) | Scannable notification, rich interaction |
| Silent publishing | Confidence-based detection | Balance accuracy with friction |
| Website channel | All recommendations, tiered | User decides what's actionable |
| Context updates | Version and flag | Preserve learnings, note pivot |
| v1 scope | Keep comprehensive minus n8n templates | Ship complete solution |
| Onboarding steps | Collapse to 4 | Maintain momentum, silent background work |
| CLAUDE.md size | Lean + Reference | Ship simple, document comprehensively |
