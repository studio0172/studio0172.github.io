#!/usr/bin/env python3
"""
Update the recipes index.html and sitemap.xml with published recipes.
"""

import json
from pathlib import Path
from datetime import datetime

WEBSITE_DIR = Path("/home/max/workspace/studio0172.github.io/mealieai")
SITEMAP_PATH = Path("/home/max/workspace/studio0172.github.io/sitemap.xml")

def generate_recipe_card_html(recipe_data):
    """Generate HTML for a recipe card in the index listing."""
    slug = recipe_data["slug"]
    recipe = recipe_data["recipe"]
    category = recipe_data["category"]
    
    name = recipe["name"]
    description = recipe.get("description", "")
    if len(description) > 80:
        description = description[:80] + "..."
    total_time = recipe.get("prepTime", 0) + recipe.get("cookTime", 0)
    calories = recipe.get("calories", 400)
    servings = recipe.get("servings", 4)
    
    return f'''                <a href="{slug}.html" class="recipe-card">
                    <div class="recipe-image" style="background: url('images/{slug}.png') center/cover; font-size: 0;"></div>
                    <div class="recipe-content">
                        <span class="recipe-category">{category}</span>
                        <h3>{name}</h3>
                        <p>{description}</p>
                        <div class="recipe-meta">
                            <span>🕐 {total_time} min</span>
                            <span>🔥 {calories} cal</span>
                            <span>👤 {servings} servings</span>
                        </div>
                    </div>
                </a>
'''

def main():
    # Load published recipes
    with open(WEBSITE_DIR / "published_recipes.json") as f:
        published = json.load(f)
    
    print(f"Updating index with {len(published)} new recipes...")
    
    # Read current index.html
    index_path = WEBSITE_DIR / "recipes" / "index.html"
    with open(index_path) as f:
        index_html = f.read()
    
    # Generate all recipe cards HTML
    recipe_cards_html = ""
    
    # Add existing recipes first (creamy-garlic-bliss and peanut-chicken-noodle-party)
    existing = [
        {
            "slug": "creamy-garlic-bliss",
            "category": "Comfort Food",
            "recipe": {
                "name": "Creamy Garlic Bliss",
                "description": "Rich, velvety pasta bursting with garlic and Parmesan. The ultimate comfort food!",
                "prepTime": 5,
                "cookTime": 20,
                "calories": 699,
                "servings": 4
            }
        },
        {
            "slug": "peanut-chicken-noodle-party",
            "category": "Quick Meals",
            "recipe": {
                "name": "Peanut Chicken Noodle Party",
                "description": "Vibrant noodles with sweet-spicy sauce, crunchy peanuts, and fresh herbs.",
                "prepTime": 5,
                "cookTime": 10,
                "calories": 407,
                "servings": 4
            }
        }
    ]
    
    # Generate cards for existing recipes
    for r in existing:
        recipe_cards_html += generate_recipe_card_html(r)
    
    # Generate cards for new recipes
    for r in published:
        recipe_cards_html += generate_recipe_card_html(r)
    
    # Find the recipe-grid div and replace its contents
    # The marker is: <div class="recipe-grid">
    start_marker = '<div class="recipe-grid">'
    end_marker = '</div>\n        </section>\n\n        <!-- Newsletter'
    
    start_idx = index_html.find(start_marker)
    end_idx = index_html.find(end_marker)
    
    if start_idx == -1 or end_idx == -1:
        print("Could not find recipe-grid section in index.html")
        return
    
    # Build new section
    new_recipe_section = f'''{start_marker}
{recipe_cards_html}            '''
    
    # Replace
    new_index = index_html[:start_idx] + new_recipe_section + index_html[end_idx:]
    
    # Update category counts
    quick_meals_count = 1 + sum(1 for r in published if r["category"] == "Quick Meals")
    healthy_count = sum(1 for r in published if r["category"] == "Healthy")
    meal_prep_count = sum(1 for r in published if r["category"] == "Meal Prep")
    comfort_food_count = 1 + sum(1 for r in published if r["category"] == "Comfort Food")
    
    # Update counts in HTML
    new_index = new_index.replace(
        '<span class="category-count">1 recipe</span>\n                </a>\n                <a href="category/healthy.html"',
        f'<span class="category-count">{quick_meals_count} recipes</span>\n                </a>\n                <a href="category/healthy.html"'
    )
    new_index = new_index.replace(
        '<span class="category-count">Coming Soon</span>\n                </a>\n                <a href="category/meal-prep.html"',
        f'<span class="category-count">{healthy_count} recipes</span>\n                </a>\n                <a href="category/meal-prep.html"'
    )
    new_index = new_index.replace(
        '<span class="category-count">Coming Soon</span>\n                </a>\n                <a href="category/comfort-food.html"',
        f'<span class="category-count">{meal_prep_count} recipes</span>\n                </a>\n                <a href="category/comfort-food.html"'
    )
    new_index = new_index.replace(
        '<span class="category-count">1 recipe</span>\n                </a>\n            </div>\n        </section>',
        f'<span class="category-count">{comfort_food_count} recipes</span>\n                </a>\n            </div>\n        </section>'
    )
    
    # Write updated index
    with open(index_path, "w") as f:
        f.write(new_index)
    print(f"✅ Updated recipes/index.html")
    
    # Update sitemap.xml
    print("Updating sitemap.xml...")
    with open(SITEMAP_PATH) as f:
        sitemap = f.read()
    
    # Generate new recipe URLs
    today = datetime.now().strftime("%Y-%m-%d")
    new_urls = ""
    for r in published:
        new_urls += f'''  <url>
    <loc>https://studio0172.com/mealieai/recipes/{r["slug"]}.html</loc>
    <lastmod>{today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
'''
    
    # Insert before closing </urlset>
    sitemap = sitemap.replace("</urlset>", new_urls + "</urlset>")
    
    with open(SITEMAP_PATH, "w") as f:
        f.write(sitemap)
    print(f"✅ Updated sitemap.xml with {len(published)} new URLs")

if __name__ == "__main__":
    main()
