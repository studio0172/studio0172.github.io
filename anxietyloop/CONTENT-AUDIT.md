# Content Audit — Anxiety Loop Website

**Date:** Feb 15, 2026  
**Pages Reviewed:** 17

## Summary
⚠️ **Issues Found:** Pricing inconsistency across comparison pages

---

## Critical Issue: Inconsistent Pricing

The pricing description for Anxiety Loop varies across comparison pages:

| Page | Current Text | Should Be |
|------|--------------|-----------|
| vs-bearable | "Free" | "Freemium (one-time unlock)" |
| vs-calm | "Freemium (one-time unlock)" | ✅ Correct |
| vs-daylio | "Free (Premium coming)" | "Freemium (one-time unlock)" |
| vs-finch | "Free" | "Freemium (one-time unlock)" |
| vs-headspace | "Freemium (one-time unlock)" | ✅ Correct |
| vs-sanvello | "Free" | "Freemium (one-time unlock)" |
| vs-woebot | Needs check | "Freemium (one-time unlock)" |

**Correct messaging:** "Freemium (one-time unlock)" — free tracker, paid exercises + patterns as one-time purchase.

---

## Pages Reviewed

### ✅ Main Pages (No Issues)
- `index.html` — Landing page looks good
- `privacy.html` — Accurate
- `support.html` — Accurate  
- `terms.html` — Accurate

### ✅ Blog Posts (No Issues)
- `7-day-challenge/` — Good
- `anxiety-patterns-over-time/` — Good
- `anxiety-tracking-apps/` — Good
- `anxiety-tracking-guide/` — Good
- `how-to-track-anxiety/` — Good
- `morning-anxiety/` — Good
- `privacy-explained/` — Good
- `sunday-scaries/` — Good

### ⚠️ Comparison Pages (Pricing Fix Needed)
- `vs-bearable/` — Fix pricing
- `vs-calm/` — ✅ Correct
- `vs-daylio/` — Fix pricing
- `vs-finch/` — Fix pricing
- `vs-headspace/` — ✅ Correct
- `vs-sanvello/` — Fix pricing
- `vs-woebot/` — Check pricing

---

## Recommended Fixes

### Priority 1: Fix Pricing Consistency
Update all comparison pages to use: **"Freemium (one-time unlock)"**

Files to update:
```
vs-bearable/index.html
vs-daylio/index.html
vs-finch/index.html
vs-sanvello/index.html
vs-woebot/index.html
```

### Priority 2: Feature Consistency Check
Verify all comparison pages show the same features for Anxiety Loop:
- ✓ On-device privacy
- ✓ One-tap check-ins
- ✓ Pattern analysis
- ✓ Breathing exercises
- ✓ Guided exercises (paid)
- ✓ Calming audio (paid)

---

## Fix Script

```bash
cd /Users/vdahuja/workspace/studio0172.github.io/anxietyloop

# Fix vs-bearable
sed -i '' 's/<td>Free<\/td>/<td>Freemium (one-time unlock)<\/td>/' vs-bearable/index.html

# Fix vs-daylio  
sed -i '' 's/<td>Free (Premium coming)<\/td>/<td>Freemium (one-time unlock)<\/td>/' vs-daylio/index.html

# Fix vs-finch
sed -i '' 's/<td>Free<\/td>/<td>Freemium (one-time unlock)<\/td>/' vs-finch/index.html

# Fix vs-sanvello
sed -i '' 's/<td>Free<\/td>/<td>Freemium (one-time unlock)<\/td>/' vs-sanvello/index.html
```

---

*Audit complete. Main issue: pricing inconsistency across 4-5 comparison pages.*
