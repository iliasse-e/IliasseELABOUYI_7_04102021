import { Card } from "./card-recipe.js";
import { List } from "./dropdown-list.js";
import { recipes } from "./data/recipes.js";
import { findObjectOf } from "./search.js";

/**
 * Gathers all recipes
 * This Array might be updated with the following search by deleting some of its objects
 */
export let currentRecipes = recipes;

/**
 * Creates all List objects, and displays them in DOM
 * @returns Array of all List objects
 */
export function dropdownLists() { // calls List class and display dropdowns lists
     
    let allElements = [];
    
    for (let i=0; i< getIngredients().length; i++) {
        if (!allElements.includes(new List(getIngredients()[i].toLowerCase().split(' ').join('-'), "ingredients", getIngredients()[i].toLowerCase()))) {
            allElements.push(new List(getIngredients()[i].toLowerCase().split(' ').join('-'), "ingredients", getIngredients()[i].toLowerCase()))
        }
    }

    for (let i=0; i< getAppliances().length; i++) {
        if (!allElements.includes(new List(getAppliances()[i].toLowerCase().split(' ').join('-'), "appliances", getAppliances()[i].toLowerCase()))) {
            allElements.push(new List(getAppliances()[i].toLowerCase().split(' ').join('-'), "appliances", getAppliances()[i].toLowerCase()))
        }
    }

    for (let i=0; i< getUstensils().length; i++) {
        if (!allElements.includes(new List(getUstensils()[i].toLowerCase().split(' ').join('-'), "ustensils", getUstensils()[i].toLowerCase()))) {
            allElements.push(new List(getUstensils()[i].toLowerCase().split(' ').join('-'), "ustensils", getUstensils()[i].toLowerCase()))
        }
    }
    for (let i = 0; i< allElements.length; i++) {
        allElements[i].create()
    }
    return allElements
}

/**
 * Gathers the visivle list elements
 * @returns Array of textContent dropdown elements
 */
export function updtatedList(availableLiArray) {
    
    let availableElements = [];

    for (let i=0; i<availableLiArray.length; i++) {
        availableElements.push(findObjectOf(availableLiArray[i]))
    }

    return availableElements
}

// gathers all ingredients
export function getIngredients() {
    
    let ingredients = [];
    
    for (let i = 0; i < currentRecipes.length; i++) {
        for (let e = 0; e < currentRecipes[i]["ingredients"].length; e++) {
            let currentIngredient = currentRecipes[i].ingredients[e].ingredient.toLowerCase();
            
            if (!ingredients.includes(currentIngredient)) {
                ingredients.push(currentIngredient)
            }
        }
    }
    return ingredients
}

// gathers all appliances
export function getAppliances() {
    
    let appliances = [];
    
    for (let i = 0; i < currentRecipes.length; i++) {
        let currentAppliance = currentRecipes[i].appliance.toLowerCase();
        
        if (!appliances.includes(currentAppliance)) {
            appliances.push(currentAppliance)
        }
    }
    return appliances
}

// gathers all ustensils
export function getUstensils() {
    
    let ustensils = [];
    
    for (let i = 0; i < currentRecipes.length; i++) {
        for (let e = 0; e < currentRecipes[i].ustensils.length; e++) {
            let currentUstensil = currentRecipes[i].ustensils[e].toLowerCase();
            
            if (!ustensils.includes(currentUstensil)) {
                ustensils.push(currentUstensil)
            }
        }
    }
    return ustensils
}

export function updatedListOf(element) {
    const cards = document.querySelectorAll("."+element+"[data-visible='true']")
    let array = [];

    for (let i=0; i<cards.length; i++) {
        array.push(cards[i].getAttribute("id").split('-').join(' '))
    }
    return array
}

/******************
 * Create objects *
 ******************/

// Array of all cards objects
export let cards = [];
// calls class Card and display cards
for (let recipe = 0; recipe < currentRecipes.length; recipe++) {
    cards.push(new Card(currentRecipes[recipe].id, currentRecipes[recipe].name, currentRecipes[recipe].ingredients, currentRecipes[recipe].appliance, currentRecipes[recipe].ustensils, currentRecipes[recipe].description, currentRecipes[recipe].time));
    cards[recipe].display()
}

// Array of all lists objects (displayed in dropdown.js)
export let dropdowns = dropdownLists()


console.log(cards)
console.log(dropdowns)