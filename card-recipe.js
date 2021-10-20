import recipes from "./recipes.js";

export function displayCardRecipe(recipe) {
    /* Creates DOM */
    const cardsContainer = document.getElementById("cards-container");

    const cardContainer = document.createElement("div");
    const card = document.createElement("div");
    const image = document.createElement("img");
    
    const recipeContainer = document.createElement("div");
    const recipeHeader = document.createElement("div");

    const title = document.createElement("h5");
    const timeSubtitle = document.createElement("h5");
    const timeSubtitleSpan = document.createElement("span");
    const titmeSubitleIcon = document.createElement("img");

    const ingredientContainer = document.createElement("div");
    const ingredientQuantity = document.createElement("div");
    
    // ingredient lines creator
    recipe.ingredients.forEach(element => {

        const ingredient = document.createElement("p");
        ingredient.className = "card-text recipe__ingredient";
        ingredientQuantity.appendChild(ingredient);

        if (element.quantity && element.unit) {
            ingredient.innerHTML = element.ingredient + " : " + `<span class="recipe__ingredient-quantity"> ${element.quantity} ${element.unit}</span>`;
        } 

        else if (element.quantity && !element.unit) {
            ingredient.innerHTML = element.ingredient + " : " + `<span class="recipe__ingredient-quantity"> ${element.quantity}</span>`;
        }

        else {
            ingredient.innerHTML = element.ingredient;
        }
    });

    const ingredientDescription = document.createElement("div");
    const description = document.createElement("p");


    /* Sets attributes and classes */
    cardContainer.className = "col card-container";
    cardContainer.setAttribute("data-visible", "true");
    cardContainer.setAttribute("recipe", recipe.name);
    cardContainer.setAttribute("id", recipe.id); 
    
    card.className = "card recipe";
    
    image.className = "card-img-top recipe__image"
    image.src = "/assets/img.png";
    image.alt = "image de la recette";

    recipeContainer.className = "row card-body recipe__container";
    recipeHeader.className = "recipe__header";

    title.className = "card-title recipe__title"
    title.textContent = recipe.name // from file

    timeSubtitle.className = "card-title recipe__timer";
    timeSubtitle.innerHTML = `<span><img src="/assets/clock.png" alt="icone horloge"></span> ${recipe.time} min`

    ingredientContainer.className = "recipe__ingredient-container";
    ingredientQuantity.className = "col";
    ingredientDescription.className = "col";
    description.className = "card-text recipe__description";
    description.textContent = recipe.description


    /* Appends content in DOM */
    cardsContainer.appendChild(cardContainer);
    cardContainer.appendChild(card);
    card.appendChild(image);
    card.appendChild(recipeContainer);
    recipeContainer.appendChild(recipeHeader);
    recipeHeader.appendChild(title);
    recipeHeader.appendChild(timeSubtitle);
    timeSubtitle.appendChild(timeSubtitleSpan);
    timeSubtitleSpan.appendChild(titmeSubitleIcon);
    recipeContainer.appendChild(ingredientContainer);
    ingredientContainer.appendChild(ingredientQuantity);
    ingredientContainer.appendChild(ingredientDescription);
    ingredientDescription.appendChild(description);

}

export function toggleCard() {

}

