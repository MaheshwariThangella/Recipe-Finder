const searchForm = document.querySelector('form');
const searchInput = document.querySelector('#search');
const resultsList = document.querySelector('#results');

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    searchIndianRecipes();
});

async function searchIndianRecipes() {
    const query = searchInput.value.trim();
    if (!query) {
        resultsList.innerHTML = "<p>Please enter at least one ingredient.</p>";
        return;
    }

    const ingredients = query.split(',').map(i => i.trim().toLowerCase());

    try {
        // 1. Fetch all Indian meals
        const areaResponse = await fetch('https://www.themealdb.com/api/json/v1/1/filter.php?a=Indian');
        const areaData = await areaResponse.json();

        if (!areaData.meals) {
            resultsList.innerHTML = "<p>No Indian meals found.</p>";
            return;
        }

        // 2. Fetch full details for each Indian meal
        const mealDetailsPromises = areaData.meals.map(meal =>
            fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`)
                .then(res => res.json())
                .then(data => data.meals[0])
        );

        const allMeals = await Promise.all(mealDetailsPromises);

        // 3. Filter meals that contain at least one of the ingredients
        const filteredMeals = allMeals.filter(meal => {
            for (let i = 1; i <= 20; i++) {
                const ingredient = meal[`strIngredient${i}`];
                if (ingredient && ingredients.includes(ingredient.toLowerCase())) {
                    return true;
                }
            }
            return false;
        });

        if (filteredMeals.length === 0) {
            resultsList.innerHTML = "<p>No recipes matched your ingredients. Try different ones!</p>";
            return;
        }

        displayRecipes(filteredMeals);

    } catch (error) {
        console.error("Fetch error:", error);
        resultsList.innerHTML = "<p>Something went wrong. Please try again later.</p>";
    }
}

function displayRecipes(recipes) {
    let html = '';
    recipes.forEach(recipe => {
        const ingredients = [];
        for (let i = 1; i <= 20; i++) {
            const ingredient = recipe[`strIngredient${i}`];
            const measure = recipe[`strMeasure${i}`];
            if (ingredient && ingredient.trim() !== '') {
                ingredients.push(`${ingredient} - ${measure}`);
            }
        }

        html += `
            <div>
                <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}">
                <h3>${recipe.strMeal}</h3>
                <ul>
                    ${ingredients.map(ing => `<li>${ing}</li>`).join('')}
                </ul>
                <p><strong>Category:</strong> ${recipe.strCategory || 'N/A'}</p>
                <p><strong>Area:</strong> ${recipe.strArea || 'N/A'}</p>
                <p><strong>Instructions:</strong> ${recipe.strInstructions}</p>
            </div>
        `;
    });

    resultsList.innerHTML = html;
}
