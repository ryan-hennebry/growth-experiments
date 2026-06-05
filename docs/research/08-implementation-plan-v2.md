# Growth Experiments Agent Implementation Plan

## Overview

Implement the compound marketing agent from spec `05_research/compound_marketing_agent/07_spec_v2.md`. This agent runs autonomously to analyze marketing performance, generate recommendations, create draft content, and compound learnings over time.

**Target location:** `03_agents/growth-experiments/`

---

## Architecture Summary

```
03_agents/growth-experiments/
├── CLAUDE.md                 # Agent brain (lean, includes essential reference)
├── marketing.db              # SQLite — ALL mutable state
├── .env.example              # Template for credentials
├── run.sh                    # Cron entry point
└── README.md                 # User documentation
```

**Key principles:**
- User never edits files directly — all input via chat
- All mutable state in SQLite
- Agent acts first, user approves
- Learnings compound into principles over time
- CSV is first-class, not degraded

---

## Implementation Order

Following the spec's 15-step order:

### Phase 1: Foundation (Steps 1-2)

1. **SQLite schema** — Create database initialization script
   - 11 tables: company, channels, metrics, xmr_baselines, content, recommendations, learnings, initiative_balance, delivery, runs, channel_knowledge
   - Initialize via Bash sqlite3 commands

2. **CLAUDE.md** — Agent brain file
   - Merge essential reference content
   - Include: MKT1 frameworks, OODA loop, onboarding flow, quality gates
   - ~800-1200 lines following competitor-intelligence pattern

### Phase 2: Onboarding (Step 3)

3. **Onboarding flow** — 4 steps
   - Step 1: Company + channel discovery (with perceptions)
   - Step 2: Credential collection (per-channel)
   - Step 3: First recommendation (full OODA)
   - Step 4: Scheduling (optional)

### Phase 3: Data Ingestion (Steps 4-6)

4. **API integrations**
   - Beehiiv API v2 (newsletters)
   - ConvertKit/Kit API (newsletters)
   - Buttondown API (newsletters)
   - GA4 (Google Analytics Data API)
   - Twitter API Basic ($100/mo)
   - LinkedIn Marketing API (company pages)

5. **CSV ingestion** — First-class support
   - Sync day prompts
   - CSV parsing and baseline establishment
   - "Did you publish?" follow-up questions

6. **Content matching** — Confidence-based attribution
   - 40-80% similarity triggers user confirmation
   - Match published content to recommendations

### Phase 4: Intelligence (Steps 7-11)

7. **XMR signal detection**
   - Moving range calculations
   - Process limit rule, quartile limit rule, runs of eight
   - quickchart.io visualization links
   - Percentage fallback for limited data

8. **Learning system**
   - Specific learnings from edits/performance
   - Principle extraction (inline, after 2+ related learnings)
   - Meta-learnings (monthly, in-CLI)

9. **Quality gates** — Hard gates
   - Voice, hook, CTA, format, length
   - Internal iteration until all pass

10. **GACC brief generation**
    - Goal, Audience, Channels, Creative
    - Customer story framing

11. **Recommendation generation** — Full OODA loop
    - Observe: Fetch metrics, match content
    - Orient: XMR analysis, limiting factor identification
    - Decide: Choose ONE recommendation (impact/feasibility/measurability)
    - Act: Create draft, run quality gates, present
    - Compound: Create learnings, propose principles

### Phase 5: Delivery (Steps 12-15)

12. **Notification delivery** — Email with full draft
    - Resend API integration
    - Self-contained decision point
    - Reply actions: approve, approve with edits, reject

13. **run.sh + cron** — Automated execution
    - Atomic lock (prevent concurrent runs)
    - Check database exists
    - Invoke Claude with allowed tools

14. **README.md** — User documentation
    - Setup instructions
    - Credential configuration
    - Usage guide

15. **Testing** — Per verification plan
    - Onboarding test
    - Perceptions framework test
    - Signal detection test
    - Learning system test
    - Initiative balance test
    - CSV workflow test
    - Notification test
    - Quality gates test

---

## Critical Files to Create

| File | Size Est. | Purpose |
|------|-----------|---------|
| `CLAUDE.md` | ~1000 lines | Agent brain with all frameworks |
| `init_db.sql` | ~100 lines | SQLite schema initialization |
| `run.sh` | ~50 lines | Cron entry point |
| `README.md` | ~200 lines | User documentation |
| `.env.example` | ~30 lines | Credential template |

---

## SQLite Integration Approach

Use Bash `sqlite3` commands directly:
```bash
sqlite3 marketing.db "INSERT INTO company (name, url) VALUES ('$name', '$url');"
sqlite3 marketing.db "SELECT * FROM metrics WHERE channel_id = 1;"
```

For complex queries, create inline SQL in CLAUDE.md that agent executes via Bash.

---

## Key Decisions from Spec

1. **Two-file architecture**: CLAUDE.md + marketing.db (no separate REFERENCE.md)
2. **Credentials**: Keep .env separate (security)
3. **Signal detection**: XMR v1 with percentage fallback
4. **Quality gates**: Hard (strict) — no soft warnings
5. **Principle extraction**: Inline during recommendation
6. **Notification**: Full draft in email (self-contained)
7. **CLI role**: Edits only (simple decisions in email)

---

## Verification Checklist

After implementation, verify:

- [ ] Onboarding creates company profile with perceptions
- [ ] Channels configured with autonomy levels
- [ ] API connections work (test each)
- [ ] CSV sync day prompts work
- [ ] XMR detects signal vs noise
- [ ] Specific learnings created from edits
- [ ] Principle extraction offered inline
- [ ] Initiative balance tracked (70/20/10)
- [ ] Quality gates pass before presentation
- [ ] Full draft in email notifications
- [ ] run.sh executes without error
- [ ] Cron scheduling works

---

## Estimated Effort

This is a substantial implementation (~2000+ lines of new code/content across files). The spec is comprehensive and well-structured, so execution should be straightforward following the implementation order.
