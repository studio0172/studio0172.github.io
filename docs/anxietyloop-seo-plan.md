# SEO Implementation Plan

## Anxiety Loop — iOS Anxiety Tracking App

**Target URL:** `https://studio0172.com/anxietyloop/`

**Primary Goal:** Drive high-intent, problem-aware organic traffic that converts into App Store installs.

**Secondary Goal:** Build trust, authority, and long-term discoverability as a privacy-first anxiety tracking app.

---

## 1. SEO Positioning & Guardrails

### What Anxiety Loop IS
- A wellness companion
- Helps users track anxiety and notice patterns
- Private, on-device, no account required

### What Anxiety Loop is NOT
- Therapy
- Medical treatment
- Diagnosis or "anxiety management"

All SEO content must stay clearly in **awareness / tracking / reflection** territory.

---

## 2. Target Keyword Strategy

### Primary Keywords (Landing Page)
- anxiety tracking app
- track anxiety
- daily anxiety check-in
- anxiety patterns
- anxiety journal app (light use only)

### Secondary Keywords (Content Pages)
- how to track anxiety
- anxiety patterns over time
- anxiety on certain days
- anxiety without clear triggers
- mood tracking for anxiety

Avoid heavy clinical or treatment-based keywords.

---

## 3. Phase 1 — Technical SEO Foundations (Week 1) ✅

### 3.1 Meta Tags ✅

**Meta Title:**
```
Anxiety Loop – Simple Anxiety Tracking App (Private & One-Tap)
```

**Meta Description:**
```
Track anxiety with simple one-tap daily check-ins. Discover patterns, notice trends, and calm your mind. Private, on-device iOS app.
```

### 3.2 Open Graph & Twitter Cards ✅

- og:title
- og:description
- og:image (clean app preview)
- og:url
- twitter:card (summary_large_image)

### 3.3 Canonical Tag ✅
```html
<link rel="canonical" href="https://studio0172.com/anxietyloop/" />
```

### 3.4 Sitemap & Robots ✅

**sitemap.xml** includes:
- `/`
- `/anxietyloop/`
- `/anxietyloop/privacy.html`
- `/anxietyloop/terms.html`
- `/anxietyloop/how-to-track-anxiety/`
- `/anxietyloop/anxiety-patterns-over-time/`

**robots.txt:**
```
User-agent: *
Allow: /

Sitemap: https://studio0172.com/sitemap.xml
```

### 3.5 Google Search Console
- [ ] Verify domain
- [ ] Submit sitemap
- [ ] Monitor indexing & queries

---

## 4. Phase 2 — On-Page SEO ✅

### 4.1 Landing Page Structure ✅

**H1 (exactly one):**
```
Anxiety Tracking App to Understand Your Patterns
```

**H2 sections:**
- Simple Daily Anxiety Check-Ins
- Track How You Feel With a Clear, Simple System
- See Anxiety Patterns Over Time
- Calm Down When You Need It
- Private, On-Device Anxiety Tracking
- Who Anxiety Loop Is For
- Learn More
- Frequently Asked Questions

### 4.2 FAQ Section ✅

- Is this a therapy or medical app?
- Is my data stored online?
- Do I need an account?
- How long does a check-in take?

### 4.3 Structured Data ✅

```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Anxiety Loop",
  "operatingSystem": "iOS",
  "applicationCategory": "HealthApplication",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
}
```

### 4.4 Image Optimization
- [ ] WebP format
- [ ] Descriptive filenames
- [x] Natural alt text (no keyword stuffing)
- [ ] Width/height set to avoid CLS
- [ ] Create og-image.png (1200x630px)

---

## 5. Phase 3 — Content Pages (Weeks 2–4) ✅

### Priority Pages ✅

1. **`/anxietyloop/how-to-track-anxiety/`** ✅
   - Educational (~1,200 words)
   - Explains awareness, patterns, consistency
   - Soft CTA to Anxiety Loop

2. **`/anxietyloop/anxiety-patterns-over-time/`** ✅
   - Weekly trends (~1,300 words)
   - Certain days being harder
   - Pattern recognition

### Internal Linking ✅
- Main page → Both content pages (Learn More section)
- Patterns page → How-to-track page
- Both pages → Main page (nav + footer)

### Future Expansion (Programmatic SEO)
- [ ] anxiety on Mondays
- [ ] anxiety before work
- [ ] anxiety without trigger
- [ ] anxiety by time of day

---

## 6. Phase 4 — Trust & Authority (Month 2)

### Do
- [ ] Founder story post (Indie Hackers / personal blog)
- [ ] Value-first Reddit posts (no spam)
- [ ] App Store → Website cross-links
- [ ] 1–2 genuine mental health / productivity blog mentions

### Avoid
- Mass directory submissions
- B2B SaaS directories (Capterra, GetApp, etc.)
- Low-quality guest post farms

---

## 7. Phase 5 — Performance & UX

### Core Web Vitals
- [ ] LCP < 2.5s
- [ ] CLS < 0.1
- [ ] Mobile-first testing

### Mobile UX
- [x] Large tap targets
- [x] Readable fonts
- [x] No horizontal scrolling

---

## 8. Tracking & Success Metrics

### Tools
- [ ] Google Search Console
- [ ] GA4 (light usage)
- [ ] App Store Connect (installs)

### KPIs (6–9 months)
- Indexed content pages
- Organic impressions growing steadily
- Top 10 rankings for long-tail keywords
- App Store CTR improving

---

## 9. Execution Checklist

### Week 1 ✅
- [x] Update `/anxietyloop/` landing page structure (H1, H2s)
- [x] Add meta title & description
- [x] Add Open Graph & Twitter Card tags
- [x] Add canonical tag
- [x] Add structured data (JSON-LD)
- [x] Create sitemap.xml
- [x] Create robots.txt
- [ ] Submit to Google Search Console

### Week 2–3 ✅
- [x] Publish `/anxietyloop/how-to-track-anxiety/`
- [x] Publish `/anxietyloop/anxiety-patterns-over-time/`
- [x] Internal linking between pages

### Month 2
- [ ] Light outreach
- [ ] Founder story
- [ ] Iterate based on Search Console data

---

## Remaining Tasks

### Immediate
- [ ] Create `og-image.png` (1200x630px) for social sharing
- [ ] Submit sitemap to Google Search Console
- [ ] Verify domain in Search Console

### Soon (Image Optimization)
- [ ] Convert images to WebP format
- [ ] Add width/height attributes to images

### Month 2 (Outreach)
- [ ] Write founder story for Indie Hackers
- [ ] Identify 2-3 relevant Reddit communities
- [ ] Research mental health / productivity blogs for mentions

### Future (Programmatic SEO)
- [ ] Create page: anxiety on Mondays
- [ ] Create page: anxiety before work
- [ ] Create page: anxiety without trigger
- [ ] Create page: anxiety by time of day

---

*Last updated: January 29, 2026*
