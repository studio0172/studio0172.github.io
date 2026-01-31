#!/usr/bin/env node
/**
 * Add Recipe to Website
 * 
 * Usage: node add-recipe.js <recipe-folder-path>
 * 
 * Example: node add-recipe.js /home/max/workspace/animator/recipe-screens-generator/output/2026-01-31_creamy-garlic-bliss
 */

const fs = require('fs');
const path = require('path');

const RECIPES_DIR = __dirname;
const IMAGES_DIR = path.join(RECIPES_DIR, 'images');

function slugify(str) {
    return str.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
}

function generateRecipeHTML(metadata, slides, slug) {
    const { 
        recipe_name, 
        description, 
        cooking_time_minutes, 
        servings, 
        nutrition,
        original_url 
    } = metadata;

    // Parse slides for carousel
    const slideImages = slides.map((s, i) => {
        const alt = s.includes('title') ? 'Recipe Title' 
            : s.includes('ingredients') ? 'Ingredients' 
            : s.includes('step') ? `Step ${i}` 
            : s.includes('cta') ? 'Get the App' : `Slide ${i + 1}`;
        return `<div class="carousel-slide"><img src="images/${slug}/${s}" alt="${alt}" loading="lazy"></div>`;
    }).join('\n                    ');

    // Estimate prep/cook time
    const prepTime = Math.round(cooking_time_minutes * 0.2);
    const cookTime = cooking_time_minutes - prepTime;

    const calories = nutrition?.calories || '???';
    const protein = nutrition?.protein || '??';
    const fat = nutrition?.fat || '??';
    const carbs = nutrition?.carbohydrates || '??';
    const fiber = nutrition?.fiber || '??';

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${recipe_name} – Easy ${cooking_time_minutes}-Minute Recipe | Mealie AI</title>
    <meta name="description" content="${description.substring(0, 155)}">
    
    <link rel="canonical" href="https://studio0172.com/mealieai/recipes/${slug}.html" />
    
    <meta property="og:type" content="article">
    <meta property="og:title" content="${recipe_name}">
    <meta property="og:description" content="${description.substring(0, 100)}">
    <meta property="og:url" content="https://studio0172.com/mealieai/recipes/${slug}.html">
    <meta property="og:image" content="https://studio0172.com/mealieai/recipes/images/${slug}.png">

    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "Recipe",
        "name": "${recipe_name}",
        "description": "${description}",
        "author": { "@type": "Organization", "name": "Mealie AI" },
        "datePublished": "${new Date().toISOString().split('T')[0]}",
        "prepTime": "PT${prepTime}M",
        "cookTime": "PT${cookTime}M",
        "totalTime": "PT${cooking_time_minutes}M",
        "recipeYield": "${servings} servings",
        "nutrition": {
            "@type": "NutritionInformation",
            "calories": "${calories} kcal",
            "proteinContent": "${protein}g",
            "fatContent": "${fat}g",
            "carbohydrateContent": "${carbs}g"
        },
        "image": "https://studio0172.com/mealieai/recipes/images/${slug}.png"
    }
    </script>

    <style>
        /* ... existing styles would go here ... */
        /* For now, link to a shared stylesheet */
    </style>
    <link rel="stylesheet" href="recipe-styles.css">
</head>
<body>
    <div class="container">
        <nav class="nav">
            <a href="../index.html">Home</a>
            <a href="index.html" class="active">Recipes</a>
            <a href="../privacy.html">Privacy</a>
            <a href="../terms.html">Terms</a>
        </nav>

        <section class="recipe-hero">
            <div class="recipe-hero-image">
                <img src="images/${slug}.png" alt="${recipe_name}" loading="lazy">
            </div>
            <div class="recipe-hero-content">
                <span class="recipe-category-tag">Quick Meals</span>
                <h1>${recipe_name}</h1>
                <p class="recipe-description">${description}</p>
                <div class="recipe-meta-bar">
                    <div class="meta-item"><div class="meta-label">Prep</div><div class="meta-value">${prepTime} min</div></div>
                    <div class="meta-item"><div class="meta-label">Cook</div><div class="meta-value">${cookTime} min</div></div>
                    <div class="meta-item"><div class="meta-label">Total</div><div class="meta-value">${cooking_time_minutes} min</div></div>
                    <div class="meta-item"><div class="meta-label">Servings</div><div class="meta-value">${servings}</div></div>
                </div>
                <div class="hero-buttons">
                    <a href="#recipe-card" class="jump-btn">Jump to Recipe</a>
                    <a href="https://apps.apple.com/us/app/mealie-ai-your-ai-sous-chef/id6754790038" class="save-btn-hero">📱 Save to App</a>
                </div>
            </div>
        </section>

        <section class="carousel-section">
            <div class="carousel-header">
                <h2>📱 Visual Recipe Guide</h2>
                <span class="carousel-badge">Swipe Through</span>
            </div>
            <div class="carousel-container">
                <button class="carousel-btn prev" onclick="moveSlide(-1)">‹</button>
                <div class="carousel-track" id="carouselTrack">
                    ${slideImages}
                </div>
                <button class="carousel-btn next" onclick="moveSlide(1)">›</button>
                <div class="carousel-dots" id="carouselDots"></div>
                <div class="carousel-app-promo">
                    <p><strong>Love this view?</strong> Get the full experience in our app!</p>
                    <a href="https://apps.apple.com/us/app/mealie-ai-your-ai-sous-chef/id6754790038" class="carousel-app-btn">Download Mealie AI</a>
                </div>
            </div>
        </section>

        <!-- Recipe content would be generated from decorated recipe data -->
        <div id="recipe-card">
            <p style="color: #a3a3a3; text-align: center; padding: 40px;">
                Recipe content generated from metadata...
            </p>
        </div>

        <section class="nutrition-section">
            <h2>Nutrition Facts</h2>
            <p class="nutrition-subtitle">Per serving</p>
            <div class="nutrition-grid">
                <div class="nutrition-item"><div class="nutrition-value">${calories}</div><div class="nutrition-label">Calories</div></div>
                <div class="nutrition-item"><div class="nutrition-value">${protein}g</div><div class="nutrition-label">Protein</div></div>
                <div class="nutrition-item"><div class="nutrition-value">${fat}g</div><div class="nutrition-label">Fat</div></div>
                <div class="nutrition-item"><div class="nutrition-value">${carbs}g</div><div class="nutrition-label">Carbs</div></div>
            </div>
        </section>

        <section class="app-cta">
            <h2>Plan Your Meals with Mealie AI</h2>
            <p>Save this recipe and auto-generate grocery lists.</p>
            <a href="https://apps.apple.com/us/app/mealie-ai-your-ai-sous-chef/id6754790038" class="app-store-btn">Download for iPhone</a>
        </section>

        <footer class="footer">
            <div class="footer-links">
                <a href="../index.html">Home</a>
                <a href="index.html">Recipes</a>
                <a href="../privacy.html">Privacy Policy</a>
                <a href="../terms.html">Terms of Service</a>
            </div>
            <p>&copy; 2026 Mealie AI. All rights reserved.</p>
        </footer>
    </div>

    <script>
        let currentSlide = 0;
        const track = document.getElementById('carouselTrack');
        const slides = track.querySelectorAll('.carousel-slide');
        const dotsContainer = document.getElementById('carouselDots');
        
        slides.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
            dot.onclick = () => goToSlide(i);
            dotsContainer.appendChild(dot);
        });
        
        function updateCarousel() {
            track.style.transform = \`translateX(-\${currentSlide * 100}%)\`;
            document.querySelectorAll('.carousel-dot').forEach((dot, i) => {
                dot.classList.toggle('active', i === currentSlide);
            });
        }
        
        function moveSlide(dir) {
            currentSlide = (currentSlide + dir + slides.length) % slides.length;
            updateCarousel();
        }
        
        function goToSlide(i) {
            currentSlide = i;
            updateCarousel();
        }
        
        let touchStartX = 0;
        track.addEventListener('touchstart', e => touchStartX = e.touches[0].clientX);
        track.addEventListener('touchend', e => {
            const diff = touchStartX - e.changedTouches[0].clientX;
            if (Math.abs(diff) > 50) moveSlide(diff > 0 ? 1 : -1);
        });
    </script>
</body>
</html>`;
}

async function main() {
    const recipeFolder = process.argv[2];
    
    if (!recipeFolder) {
        console.log('Usage: node add-recipe.js <recipe-folder-path>');
        console.log('Example: node add-recipe.js /path/to/output/2026-01-31_creamy-garlic-bliss');
        process.exit(1);
    }

    // Read metadata
    const metadataPath = path.join(recipeFolder, 'metadata.json');
    if (!fs.existsSync(metadataPath)) {
        console.error('Error: metadata.json not found in', recipeFolder);
        process.exit(1);
    }

    const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
    const slug = slugify(metadata.recipe_name);
    
    console.log(`\nAdding recipe: ${metadata.recipe_name}`);
    console.log(`Slug: ${slug}`);

    // Create image directory
    const recipeImagesDir = path.join(IMAGES_DIR, slug);
    if (!fs.existsSync(recipeImagesDir)) {
        fs.mkdirSync(recipeImagesDir, { recursive: true });
    }

    // Copy slides
    const slides = metadata.slides || [];
    console.log(`Copying ${slides.length} slides...`);
    
    for (const slide of slides) {
        const src = path.join(recipeFolder, slide);
        const dest = path.join(recipeImagesDir, slide);
        if (fs.existsSync(src)) {
            fs.copyFileSync(src, dest);
        }
    }

    // Copy title image as main image
    const titleSlide = slides.find(s => s.includes('title')) || slides[0];
    if (titleSlide) {
        const src = path.join(recipeFolder, titleSlide);
        const dest = path.join(IMAGES_DIR, `${slug}.png`);
        fs.copyFileSync(src, dest);
        console.log(`Main image: ${slug}.png`);
    }

    // Generate HTML (basic template - would need full implementation)
    // const html = generateRecipeHTML(metadata, slides, slug);
    // fs.writeFileSync(path.join(RECIPES_DIR, `${slug}.html`), html);

    console.log(`\n✅ Images copied to: images/${slug}/`);
    console.log(`\nNext steps:`);
    console.log(`1. Create ${slug}.html with full recipe content`);
    console.log(`2. Add to index.html recipe grid`);
    console.log(`3. Add to appropriate category pages`);
    console.log(`4. Update sitemap.xml`);
    console.log(`5. git add, commit, push`);
}

main().catch(console.error);
