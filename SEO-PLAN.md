# SEO Strategy Plan for Studio 0172

## Overview

**Sites to optimize:**
- `studio0172.com` - Main landing page (B2B services)
- `studio0172.com/resonant/` - Daily affirmation app
- `studio0172.com/anxietyloop/` - Anxiety tracking app

---

## Phase 1: Technical SEO Fixes (Immediate)

### 1.1 Add Missing Meta Tags

**Resonant page needs:**
```html
<meta name="description" content="Resonant - Daily affirmations that learn what moves you. 700+ handcrafted affirmations across 8 themes. Privacy-first, no account required. Available on iOS.">
<meta name="keywords" content="affirmations app, daily affirmations, mental wellness, self-care app, positive thinking, mindfulness app, iOS app">
```

**Anxiety Loop page needs:**
```html
<meta name="description" content="Anxiety Loop - Track your wellbeing with simple one-tap mood check-ins. Discover patterns, practice guided breathing. All data stays on your device. Free on iOS.">
<meta name="keywords" content="anxiety tracker, mood tracker app, mental health app, wellbeing app, anxiety management, breathing exercises, iOS app">
```

### 1.2 Add Open Graph Tags (for social sharing)

Each page should have:
```html
<meta property="og:title" content="[Page Title]">
<meta property="og:description" content="[Description]">
<meta property="og:image" content="[Preview image URL]">
<meta property="og:url" content="[Canonical URL]">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Studio 0172">
```

### 1.3 Add Twitter Card Tags

```html
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="[Page Title]">
<meta name="twitter:description" content="[Description]">
<meta name="twitter:image" content="[Preview image URL]">
```

### 1.4 Create sitemap.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://studio0172.com/</loc>
    <lastmod>2026-01-28</lastmod>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://studio0172.com/resonant/</loc>
    <lastmod>2026-01-28</lastmod>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://studio0172.com/anxietyloop/</loc>
    <lastmod>2026-01-28</lastmod>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://studio0172.com/resonant/privacy.html</loc>
    <priority>0.3</priority>
  </url>
  <url>
    <loc>https://studio0172.com/resonant/terms.html</loc>
    <priority>0.3</priority>
  </url>
  <url>
    <loc>https://studio0172.com/anxietyloop/privacy.html</loc>
    <priority>0.3</priority>
  </url>
  <url>
    <loc>https://studio0172.com/anxietyloop/terms.html</loc>
    <priority>0.3</priority>
  </url>
</urlset>
```

### 1.5 Create robots.txt

```
User-agent: *
Allow: /

Sitemap: https://studio0172.com/sitemap.xml

# Block old redirect paths from indexing
Disallow: /apps/
```

### 1.6 Add Canonical Tags

Add to each main page:
```html
<link rel="canonical" href="https://studio0172.com/[path]/">
```

### 1.7 Add Structured Data (JSON-LD)

**For app pages, add SoftwareApplication schema:**
```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Resonant",
  "operatingSystem": "iOS",
  "applicationCategory": "HealthApplication",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "ratingCount": "100"
  }
}
```

---

## Phase 2: On-Page SEO Optimization

### 2.1 Target Keywords

**Resonant App - Primary Keywords:**
| Keyword | Search Volume | Difficulty | Priority |
|---------|--------------|------------|----------|
| daily affirmations app | Medium | Medium | High |
| affirmations app ios | Low-Medium | Low | High |
| positive affirmations app | Medium | Medium | High |
| self-love affirmations | Medium | Low | Medium |
| anxiety affirmations | Low | Low | High |
| morning affirmations app | Low | Low | Medium |

**Anxiety Loop - Primary Keywords:**
| Keyword | Search Volume | Difficulty | Priority |
|---------|--------------|------------|----------|
| anxiety tracker app | Medium | Medium | High |
| mood tracker app | High | High | Medium |
| anxiety journal app | Low-Medium | Low | High |
| mental health tracker | Medium | Medium | Medium |
| anxiety management app | Low | Low | High |
| wellbeing app | Medium | Medium | Medium |

### 2.2 Content Optimization

**Resonant page improvements:**
- [ ] Add H1 tag with primary keyword: "Daily Affirmations App That Learns You"
- [ ] Include keyword-rich H2 headings for each section
- [ ] Add alt text to all images with keywords
- [ ] Include internal links to support/privacy pages
- [ ] Add FAQ section (helps with featured snippets)

**Anxiety Loop page improvements:**
- [ ] Add H1 tag: "Simple Anxiety Tracking App for iOS"
- [ ] Include testimonials or social proof
- [ ] Add comparison content (vs other apps)
- [ ] Create FAQ section for common anxiety tracking questions

### 2.3 Image Optimization

- [ ] Compress all images (use WebP format)
- [ ] Add descriptive alt text with keywords
- [ ] Use descriptive filenames (e.g., `resonant-affirmations-app-screenshot.webp`)
- [ ] Add width/height attributes to prevent layout shift

---

## Phase 3: Content Strategy

### 3.1 Blog/Content Hub (Recommended)

Create a `/blog/` section with articles targeting long-tail keywords:

**For Resonant:**
- "50 Morning Affirmations to Start Your Day"
- "How Daily Affirmations Rewire Your Brain"
- "Best Affirmations for Anxiety Relief"
- "Self-Love Affirmations That Actually Work"

**For Anxiety Loop:**
- "How to Track Anxiety Patterns Effectively"
- "Understanding Your Anxiety Triggers"
- "Simple Breathing Exercises for Anxiety"
- "Weekly Mood Review: What to Look For"

### 3.2 Landing Page Variations

Create dedicated landing pages for high-intent keywords:
- `/resonant/affirmations-for-anxiety/`
- `/resonant/morning-affirmations/`
- `/anxietyloop/breathing-exercises/`
- `/anxietyloop/mood-patterns/`

---

## Phase 4: Off-Page SEO & Link Building

### 4.1 App Store Optimization (ASO) Synergy

- Ensure App Store listing matches website keywords
- Use App Store reviews/ratings on website
- Cross-link between App Store and website
- Submit to app review sites:
  - Product Hunt
  - AppAdvice
  - 148Apps
  - AppShopper

### 4.2 Directory Submissions

**Mental Health/Wellness Directories:**
- Anxiety and Depression Association of America (ADAA) resources
- Mental Health America app directory
- NAMI resource lists
- Healthline app recommendations

**App Directories:**
- AlternativeTo
- SaaSHub
- GetApp
- Capterra (if applicable)

### 4.3 Content Marketing & Outreach

- Guest posts on mental health blogs
- Reach out to wellness influencers for reviews
- Submit to newsletters (e.g., Indie Hackers, Product Hunt newsletter)
- Create shareable infographics about anxiety/affirmations

### 4.4 Social Proof

- Encourage App Store reviews
- Display review snippets on website
- Create case studies/testimonials
- Share user success stories (with permission)

---

## Phase 5: Technical Performance

### 5.1 Core Web Vitals

- [ ] Ensure LCP (Largest Contentful Paint) < 2.5s
- [ ] Ensure FID (First Input Delay) < 100ms
- [ ] Ensure CLS (Cumulative Layout Shift) < 0.1
- [ ] Test with Google PageSpeed Insights

### 5.2 Mobile Optimization

- [ ] Test all pages on mobile devices
- [ ] Ensure tap targets are appropriately sized
- [ ] Check font sizes are readable on mobile
- [ ] Verify no horizontal scrolling

### 5.3 Page Speed

- [ ] Minify CSS/JS
- [ ] Enable compression (gzip/brotli)
- [ ] Leverage browser caching
- [ ] Defer non-critical JavaScript

---

## Phase 6: Tracking & Measurement

### 6.1 Set Up Analytics

- [ ] Google Search Console (submit sitemap)
- [ ] Google Analytics 4
- [ ] Bing Webmaster Tools

### 6.2 Track Key Metrics

| Metric | Tool | Target |
|--------|------|--------|
| Organic traffic | GA4 | +50% in 6 months |
| Keyword rankings | Search Console | Top 10 for primary keywords |
| Click-through rate | Search Console | >3% |
| Bounce rate | GA4 | <60% |
| App Store clicks | Custom tracking | Track conversion rate |

### 6.3 Monthly Review Checklist

- [ ] Review Search Console for new keyword opportunities
- [ ] Check for crawl errors
- [ ] Monitor Core Web Vitals
- [ ] Analyze top-performing content
- [ ] Update content based on trends

---

## Implementation Priority

### Week 1-2: Critical Fixes
1. Add meta descriptions to all pages
2. Create and submit sitemap.xml
3. Create robots.txt
4. Add Open Graph tags
5. Set up Google Search Console

### Week 3-4: On-Page Optimization
1. Optimize H1/H2 headings
2. Add image alt text
3. Implement structured data
4. Add canonical tags

### Month 2: Content & Outreach
1. Create 2-4 blog posts
2. Submit to app directories
3. Reach out to 10 mental health blogs
4. Submit to Product Hunt

### Month 3+: Scale & Iterate
1. Continue content creation
2. Build backlinks through guest posting
3. Monitor rankings and adjust strategy
4. A/B test meta descriptions for CTR

---

## Competitive Analysis Notes

### Direct Competitors to Monitor:

**Affirmation Apps:**
- ThinkUp
- Gratitude
- I Am - Daily Affirmations
- Shine

**Anxiety/Mood Tracking:**
- Daylio
- MindShift
- Calm
- Headspace

### Differentiation Points to Emphasize:
- **Resonant**: "Learns what moves you" - AI personalization angle
- **Resonant**: 700+ handcrafted affirmations - quantity + quality
- **Anxiety Loop**: One-tap simplicity - friction-free tracking
- **Both**: Privacy-first, no account required - trust differentiator

---

## Quick Wins Checklist

- [ ] Add meta descriptions (30 min)
- [ ] Create sitemap.xml (15 min)
- [ ] Create robots.txt (5 min)
- [ ] Submit to Google Search Console (15 min)
- [ ] Add OG tags for social sharing (30 min)
- [ ] Submit to Product Hunt (1 hour)
- [ ] Create app directory listings (2 hours)

---

*Last updated: January 2026*
