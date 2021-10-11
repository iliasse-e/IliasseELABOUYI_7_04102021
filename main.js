import { recipes } from "./recipes.js";

export function getIngredients() {
    
    let ingredients = [];
    
    for (let i = 0; i < recipes.length; i++) {
        for (let e = 0; e < recipes[i]["ingredients"].length; e++) {
            let currentIngredient = recipes[i].ingredients[e].ingredient;
            
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
            let currentAppliance = recipes[i].appliance;
            
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
            let currentUstensil = recipes[i].ustensils[e];
            
            if (!ustensils.includes(currentUstensil)) {
                ustensils.push(currentUstensil)
            }
        }
    }
    console.log(ustensils)
    return ustensils
}
