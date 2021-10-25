import { cards, dropdowns, updtatedList } from "./main.js";
import recipes from "./data/recipes.js";

let input = document.getElementById("general-search");
let isGeneralSearch = false;

export function generalSearch() {
    isGeneralSearch = true;
    search([input.value.toLowerCase()]);
    isGeneralSearch = false;
}

input.addEventListener("input", function() {
    if (input.value.length > 3) {
        generalSearch()
    }
})

/**
 * Filters the dropdowns and recipe results from user search choice
 * This function clears all the impertinent elements
 * @param {Array} selectedTags tag(s) selected by user 
 * @returns Array of the impertinent elements (<li> of dropdown lists)
 */
export function search(selectedTags) {
    
    let currentListElements = updtatedList(); // array of list element shown
    let recipeResults = getRecipiesResults(); // array of id's recipes shown

    let unavailableListElements = [];
    let availableListElements = [];


    let lastTag = selectedTags[selectedTags.length - 1];


    for (let recipe = 0; recipe<recipeResults.length; recipe++) { // on va chercher dans chaque recette affichées

        if (isGeneralSearch) {
            /*   for (let i=0; i<getObjectKeywords(recipes[recipeResults[recipe]]).length; i++) {
                if (!getObjectKeywords(recipes[recipeResults[recipe]])[i].includes(selectedTags[tag])) {
                    if (!unavailableListElements.includes(getObjectKeywords(recipes[recipeResults[recipe]])[i])) {
                        unavailableListElements.push(getObjectKeywords(recipes[recipeResults[recipe]])[i])
                    }
                }
            } */

            const description = recipes[recipe].description;
            const name = recipes[recipe].name;

            // if title and description doesn't include search input then check in each ingredient, ustensil and appliance
            if (!description.includes(selectedTags[tag]) && !name.includes(selectedTags[tag]) ) {
                console.log(recipes[recipe].id + " does not include your search : " + selectedTags[tag])

                for (let i = 0; i < getObjectKeywords(recipes[recipeResults[recipe]]).length; i++) {
                    
                    if (!getObjectKeywords(recipes[recipeResults[recipe]])[i].includes(selectedTags[tag])) {
                        clear(recipes[recipe].id); // if nothing is find anywhere => clear this recipe

                        
                    }
                }
                
            }

            for (let i = 0; i < getObjectKeywords(recipes[recipeResults[recipe]]).length; i++) {

                if (!getObjectKeywords(recipes[recipeResults[recipe]])[i].includes(selectedTags[tag])) {

                    for (let i=0; i< recipes[recipe].ingredients.length; i++) {
                        if (!unavailableListElements.includes(getObjectKeywords(recipes[recipe].ingredients[i].ingredient))) {
                            unavailableListElements.push(recipes[recipe].ingredients[i].ingredient) // or clear
                        }
                    }
    
                    if (!unavailableListElements.includes(recipes[recipe].appliance)) {
                        unavailableListElements.push(recipes[recipe].appliance) // or clear
                    }
    
                    for (let i=0; i< recipes[recipe].ustensils.length; i++) {
                        if (!unavailableListElements.includes(recipes[recipe].ustensils[i])) {
                            unavailableListElements.push(recipes[recipe].ustensils[i]) // or clear
                        }
                    }
                
                }


            }



            
        }

        else {

            if (!getObjectKeywords(recipes[recipeResults[recipe]]).includes(lastTag)) { // si la recette n'inclue pas le dernier tag
            
                cards[recipe].toggle() // supprime la carte de recette
                
                for (let e = 0; e < getObjectKeywords(recipes[recipeResults[recipe]]).length; e++) { // pour chaque éléments de la recette
                    
                    
                    if (currentListElements.includes(getObjectKeywords(recipes[recipeResults[recipe]])[e])) { // si l'élément de la recette est présent dans les listes déroulantes
                        
                        //dropdowns[e].toggle()
                        //clear(getObjectKeywords(recipes[recipeResults[recipe]])[e].split(' ').join('-')) // supprimer l'élément de la liste

                        if (!unavailableListElements.includes(getObjectKeywords(recipes[recipeResults[recipe]])[e])) { // l'ajouter dans le tableaux d'éléments à faire supprimer
                            unavailableListElements.push(getObjectKeywords(recipes[recipeResults[recipe]])[e]);
                        }
                    }
                }
            }
            
            else { // si la recherche est inclue dans la recette

                //if (isToggleOff) { // si on supprime un tag }                    }
                
                for (let e = 0; e < getObjectKeywords(recipes[recipeResults[recipe]]).length; e++) { // pour chaque élément de la recette
                    
                    if (currentListElements.includes(getObjectKeywords(recipes[recipeResults[recipe]])[e])) { // si l'élément de la recette n'est pas dans la liste des dropdown
                        
                        if (!availableListElements.includes(getObjectKeywords(recipes[recipeResults[recipe]])[e])) { // l'ajouter dans la liste d'éléments à faire apparaitre
                            availableListElements.push(getObjectKeywords(recipes[recipeResults[recipe]])[e]);
                        }
                    }
                }
                display(recipes[recipe].id);
            }
        }

    }
    // hides clicked <li>
    if (!isGeneralSearch) {
        unavailableListElements.push(lastTag)
    } 

    // Clears the dropdowns from its unavailable <li> elements

    for (let i=0; i<unavailableListElements.length; i++) {
        console.log(unavailableListElements.length)
        //clear(unavailableListElements[i].split(' ').join('-'))
        unavailableListElements[i]
    }

    for (let i=0; i<availableListElements.length; i++) {
        display(availableListElements[i].split(' ').join('-'))
    }



    return unavailableListElements
}


/**
 * Clears the element in DOM ( hidding <li> in list or recipe cards in results )
 * @param {*} element id Number of the recipe (ex: "1") or id String of the dropdown list (ex: "sucre-vanille") 
 */
 function clear(element) {
    const node = document.getElementById(element);
    node.setAttribute("data-visible", "false");
}

function display(element) {
    const node = document.getElementById(element);
    node.setAttribute("data-visible", "true");
}

/**
 * Gathers all words (ingredients, appliances and ustensils) of one recipe
 * @param {Object} element the object recipe (ex: recipes[1])
 * @returns Array with all words relayed to one recipe
 */
function getObjectKeywords(element) {
    let array = [];
    for (let i=0; i<element.ingredients.length; i++) {
        array.push(element.ingredients[i].ingredient.toLowerCase())
    };
    array.push(element.appliance.toLowerCase());
    for (let i=0; i<element.ustensils.length; i++) {
        array.push(element.ustensils[i].toLowerCase())
    }
  
    return array
}

function getDescriptions(element) {
    let array = [];
    array.push(element.description.toLowerCase());
    return array
}

function getRecipiesResults() {
    const cards = document.querySelectorAll(".card-container[data-visible='true']")
    let array = [];

    for (let i=0; i<cards.length; i++) {
        array.push(cards[i].getAttribute("id")-1)
    }
    return array
}

