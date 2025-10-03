# 🍛 Interactive Indian Recipe Finder

## Overview
The **Interactive Indian Recipe Finder** helps users discover Indian recipes based on the ingredients they have at home. It reduces food waste and simplifies cooking by providing recipes dynamically, including images, ingredients, and instructions.

## Features
- Search recipes by ingredient(s)
- Displays Indian recipes only
- Shows recipe image, ingredients, category, area, and instructions
- Fully responsive design for mobile, tablet, and desktop
- User-friendly interface with dynamic recipe cards

## Technologies Used
- **Frontend:** HTML5, CSS3, JavaScript
- **API:** [TheMealDB](https://www.themealdb.com/) for Indian recipes
- **Deployment:** GitHub Pages / Netlify

## How It Works
1. User enters one or more ingredients (comma-separated) in the search box.
2. The app fetches all Indian recipes from TheMealDB API.
3. Full recipe details are fetched for each meal.
4. Recipes are filtered to match user-entered ingredients.
5. Matching recipes are displayed dynamically as cards.

## Testing
- Tested across Chrome, Firefox, and Edge
- Mobile-responsive design verified on phones and tablets

## Deployment
- Hosted on **GitHub Pages** / **Netlify** for easy access
- Users can search and view recipes without installation

## Setup Instructions
1. Clone or download this repository.
2. Ensure all files (`index.html`, `style.css`, `script.js`) are in the same folder.
3. Run a local server for testing (optional):
   ```bash
   python -m http.server 5500
