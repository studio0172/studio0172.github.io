# Mealie AI - Project Goals & Strategy

## Project Overview

**Mealie AI** is an iOS meal planning app with a web presence at `studio0172.com/mealieai/`.

### Dual Purpose
1. **Landing Page** - Convert visitors to app downloads (App Store: id6504238545)
2. **Content Funnel** - Recipe blog that drives organic traffic → app installs

---

## Strategy: Recipe Blog as Growth Engine

### Goal
Build a food blogger-quality recipe site that:
- Ranks well in search (SEO-optimized recipes with schema markup)
- Provides genuine value (tested recipes with nutrition info)
- Funnels readers to the Mealie AI app

### Content Pillars
| Pillar | Target Audience | Example Topics |
|--------|-----------------|----------------|
| Quick Meals | Busy professionals | "15-minute dinners", "5-ingredient recipes" |
| Meal Prep | Batch cookers | "Sunday meal prep", "freezer-friendly meals" |
| Healthy | Health-conscious | "High protein", "Low carb", "Vegetarian" |
| Comfort Food | Families | "One-pot dinners", "Kid-friendly" |

### Posting Cadence
| Phase | Timeline | Frequency | Focus |
|-------|----------|-----------|-------|
| Foundation | Months 1-3 | 3 posts/week | Cornerstone content, long-tail keywords |
| Momentum | Months 4-6 | 4-5 posts/week | Seasonal content, internal linking |
| Scale | Months 6+ | Daily | Trending topics, repurposing for social |

---

## What's Been Built

### Infrastructure (Completed)
- [x] Recipe hub page (`/recipes/index.html`)
- [x] Recipe template with full SEO schema markup
- [x] Category pages: quick-meals, healthy, meal-prep, comfort-food
- [x] Email signup component (hello@mealie.ai)
- [x] Navigation updated across all pages
- [x] Images directory (`/recipes/images/`)

### Sample Recipes (Placeholders)
- Garlic Butter Chicken (quick-meals)
- Mediterranean Quinoa Bowl (healthy)
- Sheet Pan Chicken Fajitas (meal-prep)
- Honey Garlic Salmon (quick-meals)
- Creamy Tuscan Chicken (comfort-food)

### File Structure
```
/mealieai/
├── index.html              # App landing page
├── privacy.html
├── terms.html
├── assets/
│   ├── logo.webp
│   ├── logo.png
│   └── og-image.png
└── recipes/
    ├── index.html          # Recipe hub
    ├── images/             # Recipe photos go here
    ├── category/
    │   ├── quick-meals.html
    │   ├── healthy.html
    │   ├── meal-prep.html
    │   └── comfort-food.html
    └── [recipe-slug].html  # Individual recipes
```

---

## Adding New Recipes

### Workflow
1. Provide `recipe_diff.txt` with `+` prefixed lines being your version
2. Provide image file (WebP preferred, 1200x800px)
3. Specify category: `quick-meals` | `healthy` | `meal-prep` | `comfort-food`

Claude will:
- Parse your recipe content
- Optimize for SEO (title, meta description, keywords)
- Generate HTML with Recipe schema (JSON-LD)
- Update hub and category pages

### Image Guidelines
- Format: WebP (with JPG/PNG fallback)
- Size: 1200x800px landscape
- Naming: `recipe-slug.webp` (e.g., `honey-garlic-salmon.webp`)
- Location: `/recipes/images/`

---

## Monetization Roadmap

| Revenue Stream | Implementation | Timeline |
|----------------|----------------|----------|
| App Subscriptions | Primary revenue via iOS app | Active |
| Email List | Weekly meal plans, nurture to app | Month 1 |
| Affiliate Links | Kitchen tools, ingredients (Amazon) | Month 3+ |
| Sponsored Content | Brand partnerships | 50k+ monthly visitors |
| Recipe Ebooks | Compile top recipes | After 50+ recipes |

---

## SEO Checklist (Per Recipe)

- [ ] Title: Primary keyword + benefit (under 60 chars)
- [ ] Meta description: Compelling + keyword (under 155 chars)
- [ ] Recipe schema: All required fields populated
- [ ] Alt text: Descriptive image alt tags
- [ ] Internal links: Link to related recipes
- [ ] Headings: Proper H1 → H2 → H3 hierarchy
- [ ] URL: Clean slug (`/recipes/honey-garlic-salmon.html`)

---

## Traffic Projections

| Timeline | Recipes Published | Est. Monthly Visitors |
|----------|-------------------|----------------------|
| Month 3 | 36 | 500 - 2,000 |
| Month 6 | 70+ | 5,000 - 15,000 |
| Month 12 | 150+ | 20,000 - 50,000 |
| Year 2 | 300+ | 50,000 - 150,000 |

---

## Key Links

- **App Store**: https://apps.apple.com/app/mealie-ai/id6504238545
- **Web App**: https://mealie.ai
- **Landing Page**: https://studio0172.com/mealieai/
- **Recipe Hub**: https://studio0172.com/mealieai/recipes/
- **Contact**: hello@mealie.ai

---

## Notes for Future Sessions

- Replace sample recipe emoji placeholders with real images
- Set up proper email service (ConvertKit, Buttondown) to replace Formspree
- Consider Pinterest strategy for food content
- Add search functionality when recipe count exceeds 20
