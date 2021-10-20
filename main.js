import { displayCardRecipe } from "./card-recipe.js";
import { recipes } from "./recipes.js";

export function availableListElements() { //filtrer son tableau dans search
     
    let allElements = [];
    
    for (let i=0; i< getIngredients().length; i++) {
        if (!allElements.includes(getIngredients()[i])) {
            allElements.push(getIngredients()[i])
        }
    }

    for (let i=0; i< getAppliances().length; i++) {
        if (!allElements.includes(getAppliances()[i])) {
            allElements.push(getAppliances()[i])
        }
    }

    for (let i=0; i< getUstensils().length; i++) {
        if (!allElements.includes(getUstensils()[i])) {
            allElements.push(getUstensils()[i])
        }
    }
    return allElements
}

export function updtatedList() {
    
    let availableElements = [];

    const allElements = document.querySelectorAll(".dropdown__list li");

    for (let i=0; i<allElements.length; i++) {
        if (allElements[i].getAttribute("data-visible") == "true") {
            availableElements.push(allElements[i].textContent.split('-').join(' '))
        }
    }

    return availableElements
}


export function getIngredients() {
    
    let ingredients = [];
    
    for (let i = 0; i < recipes.length; i++) {
        for (let e = 0; e < recipes[i]["ingredients"].length; e++) {
            let currentIngredient = recipes[i].ingredients[e].ingredient.toLowerCase();
            
            if (!ingredients.includes(currentIngredient)) {
                ingredients.push(currentIngredient)
            }
        }
    }
    return ingredients
}

export function getAppliances() {
    
    let appliances = [];
    
    for (let i = 0; i < recipes.length; i++) {
        let currentAppliance = recipes[i].appliance.toLowerCase();
        
        if (!appliances.includes(currentAppliance)) {
            appliances.push(currentAppliance)
        }
    }
    return appliances
}

export function getUstensils() {
    
    let ustensils = [];
    
    for (let i = 0; i < recipes.length; i++) {
        for (let e = 0; e < recipes[i].ustensils.length; e++) {
            let currentUstensil = recipes[i].ustensils[e].toLowerCase();
            
            if (!ustensils.includes(currentUstensil)) {
                ustensils.push(currentUstensil)
            }
        }
    }
    return ustensils
}

recipes.forEach((recipe) => displayCardRecipe(recipe));
