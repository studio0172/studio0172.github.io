const fs = require('fs');
const path = require('path');

const recipesDir = __dirname;
const categoryDir = path.join(recipesDir, 'category');

// Extract recipe data from HTML files
function extractRecipeData(filename) {
  const filepath = path.join(recipesDir, filename);
  const html = fs.readFileSync(filepath, 'utf8');
  
  const nameMatch = html.match(/"name":\s*"([^"]+)"/);
  const categoryMatch = html.match(/"recipeCategory":\s*"([^"]+)"/);
  const timeMatch = html.match(/"totalTime":\s*"PT(\d+)M"/);
  const descMatch = html.match(/"description":\s*"([^"]+)"/);
  const calMatch = html.match(/"calories":\s*"(\d+)/);
  const servingsMatch = html.match(/"recipeYield":\s*"(\d+)/);
  
  if (!nameMatch) return null;
  
  return {
    file: filename,
    name: nameMatch[1],
    category: categoryMatch ? categoryMatch[1] : 'Uncategorized',
    time: timeMatch ? timeMatch[1] : '30',
    desc: descMatch ? descMatch[1].substring(0, 100) : '',
    cal: calMatch ? calMatch[1] : '400',
    servings: servingsMatch ? servingsMatch[1] : '4'
  };
}

// Get all recipes
const files = fs.readdirSync(recipesDir).filter(f => 
  f.endsWith('.html') && f !== 'index.html'
);

const recipes = files.map(extractRecipeData).filter(Boolean);

// Group by category
const categories = {
  'Quick Meals': recipes.filter(r => r.category === 'Quick Meals'),
  'Comfort Food': recipes.filter(r => r.category === 'Comfort Food'),
  'Healthy': recipes.filter(r => r.category === 'Healthy'),
  'Meal Prep': recipes.filter(r => r.category === 'Meal Prep')
};

console.log('Recipe counts:');
Object.entries(categories).forEach(([cat, list]) => {
  console.log(`  ${cat}: ${list.length}`);
});

// Generate recipe card HTML
function recipeCard(recipe) {
  const slug = recipe.file.replace('.html', '');
  const imgPath = `../images/${slug}.png`;
  const imgExists = fs.existsSync(path.join(recipesDir, 'images', `${slug}.png`)) ||
                    fs.existsSync(path.join(recipesDir, 'images', `${slug}.jpg`));
  
  const imgStyle = imgExists 
    ? `background-image: url('${imgPath}'); font-size: 0;`
    : `font-size: 64px;`;
  const imgContent = imgExists ? '' : '🍽️';
  
  return `
                <a href="../${recipe.file}" class="recipe-card">
                    <div class="recipe-image" style="${imgStyle}">${imgContent}</div>
                    <div class="recipe-content">
                        <span class="recipe-time">${recipe.time} min</span>
                        <h3>${recipe.name}</h3>
                        <p>${recipe.desc.substring(0, 80)}...</p>
                        <div class="recipe-meta">
                            <span>🔥 ${recipe.cal} cal</span>
                            <span>👤 ${recipe.servings} servings</span>
                        </div>
                    </div>
                </a>`;
}

// Category page template
function categoryPage(catName, catRecipes, icon, description) {
  const cards = catRecipes.map(recipeCard).join('\n');
  const slug = catName.toLowerCase().replace(/ /g, '-');
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${catName} Recipes | Mealie AI</title>
    <meta name="description" content="${description}">
    <link rel="canonical" href="https://studio0172.com/mealieai/recipes/category/${slug}.html" />
    <meta property="og:type" content="website">
    <meta property="og:title" content="${catName} Recipes | Mealie AI">
    <meta property="og:description" content="${description}">
    <meta property="og:url" content="https://studio0172.com/mealieai/recipes/category/${slug}.html">
    <meta property="og:site_name" content="Mealie AI">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', Roboto, sans-serif; line-height: 1.6; background: linear-gradient(to bottom, #0a0a0a 0%, #1a1a1a 100%); color: #e5e5e5; min-height: 100vh; }
        .container { max-width: 1100px; margin: 0 auto; padding: 20px; }
        .nav { display: flex; justify-content: center; gap: 8px; margin-bottom: 24px; flex-wrap: wrap; }
        .nav a { padding: 10px 20px; border-radius: 8px; font-size: 14px; font-weight: 500; text-decoration: none; transition: all 0.2s; color: #a3a3a3; background: rgba(30, 30, 30, 0.6); border: 1px solid rgba(255, 255, 255, 0.1); }
        .nav a:hover { color: #e5e5e5; border-color: rgba(251, 146, 60, 0.3); }
        .nav a.active { color: #000; background: #fb923c; border-color: #fb923c; }
        .breadcrumb { display: flex; gap: 8px; margin-bottom: 24px; font-size: 14px; flex-wrap: wrap; }
        .breadcrumb a { color: #737373; text-decoration: none; }
        .breadcrumb a:hover { color: #fb923c; }
        .breadcrumb span { color: #525252; }
        .breadcrumb .current { color: #a3a3a3; }
        .hero { text-align: center; padding: 60px 20px; background: linear-gradient(135deg, rgba(251, 146, 60, 0.1) 0%, rgba(234, 88, 12, 0.05) 100%); border-radius: 24px; border: 1px solid rgba(251, 146, 60, 0.2); margin-bottom: 40px; }
        .hero-icon { font-size: 64px; margin-bottom: 16px; }
        .hero h1 { color: #fff; font-size: 42px; font-weight: 700; margin-bottom: 16px; letter-spacing: -1px; }
        .hero-description { color: #a3a3a3; font-size: 18px; max-width: 600px; margin: 0 auto; line-height: 1.7; }
        .stats-bar { display: flex; justify-content: center; gap: 40px; margin-top: 24px; flex-wrap: wrap; }
        .stat { text-align: center; }
        .stat-value { color: #fb923c; font-size: 28px; font-weight: 700; }
        .stat-label { color: #737373; font-size: 14px; }
        .recipe-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 24px; margin-bottom: 48px; }
        .recipe-card { background: rgba(30, 30, 30, 0.6); border-radius: 16px; overflow: hidden; border: 1px solid rgba(255, 255, 255, 0.1); transition: all 0.3s; text-decoration: none; }
        .recipe-card:hover { border-color: rgba(251, 146, 60, 0.3); transform: translateY(-4px); }
        .recipe-image { width: 100%; aspect-ratio: 4 / 5; background: linear-gradient(135deg, rgba(251, 146, 60, 0.3) 0%, rgba(234, 88, 12, 0.2) 100%); background-size: cover; background-position: center top; display: flex; align-items: center; justify-content: center; }
        .recipe-content { padding: 20px; }
        .recipe-time { display: inline-block; background: rgba(251, 146, 60, 0.2); color: #fb923c; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; margin-bottom: 12px; }
        .recipe-card h3 { color: #fff; font-size: 18px; font-weight: 600; margin-bottom: 8px; }
        .recipe-card p { color: #a3a3a3; font-size: 14px; margin-bottom: 16px; line-height: 1.5; }
        .recipe-meta { display: flex; gap: 16px; color: #737373; font-size: 13px; }
        .footer { text-align: center; padding: 40px 20px; border-top: 1px solid rgba(255, 255, 255, 0.1); margin-top: 40px; }
        .footer-links { display: flex; justify-content: center; gap: 24px; margin-bottom: 16px; flex-wrap: wrap; }
        .footer-links a { color: #737373; text-decoration: none; font-size: 14px; }
        .footer-links a:hover { color: #fb923c; }
        .footer p { color: #525252; font-size: 13px; }
        @media (max-width: 768px) { .hero h1 { font-size: 32px; } .hero { padding: 40px 16px; } }
    </style>
</head>
<body>
    <div class="container">
        <nav class="nav">
            <a href="../../index.html">Home</a>
            <a href="../index.html" class="active">Recipes</a>
            <a href="../../privacy.html">Privacy</a>
            <a href="../../terms.html">Terms</a>
        </nav>

        <div class="breadcrumb">
            <a href="../../index.html">Home</a><span>/</span>
            <a href="../index.html">Recipes</a><span>/</span>
            <span class="current">${catName}</span>
        </div>

        <div class="hero">
            <div class="hero-icon">${icon}</div>
            <h1>${catName}</h1>
            <p class="hero-description">${description}</p>
            <div class="stats-bar">
                <div class="stat">
                    <div class="stat-value">${catRecipes.length}</div>
                    <div class="stat-label">Recipes</div>
                </div>
            </div>
        </div>

        <section>
            <div class="recipe-grid">
${cards}
            </div>
        </section>

        <footer class="footer">
            <div class="footer-links">
                <a href="../../index.html">Home</a>
                <a href="../index.html">Recipes</a>
                <a href="../../privacy.html">Privacy Policy</a>
                <a href="../../terms.html">Terms of Service</a>
            </div>
            <p>&copy; 2026 Mealie AI. All rights reserved.</p>
        </footer>
    </div>
</body>
</html>`;
}

// Generate category pages
const categoryMeta = {
  'Quick Meals': { icon: '⚡', desc: 'Delicious dinner recipes ready in 30 minutes or less. Perfect for busy weeknights.' },
  'Comfort Food': { icon: '🍲', desc: 'Hearty, satisfying meals that warm the soul. Classic favorites and cozy dishes.' },
  'Healthy': { icon: '🥗', desc: 'Nutritious recipes packed with vegetables, lean proteins, and whole grains.' },
  'Meal Prep': { icon: '📦', desc: 'Make-ahead recipes perfect for batch cooking and weekly meal preparation.' }
};

Object.entries(categories).forEach(([catName, catRecipes]) => {
  if (catRecipes.length === 0) return;
  
  const meta = categoryMeta[catName];
  const slug = catName.toLowerCase().replace(/ /g, '-');
  const html = categoryPage(catName, catRecipes, meta.icon, meta.desc);
  
  fs.writeFileSync(path.join(categoryDir, `${slug}.html`), html);
  console.log(`Generated ${slug}.html with ${catRecipes.length} recipes`);
});

console.log('Done!');
