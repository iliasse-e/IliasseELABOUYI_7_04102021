/**
 * @file Sets the search functionality
 */

import { cards, dropdownLists, dropdowns, updtatedList } from "./main.js";
import recipes from "./data/recipes.js";

let input = document.getElementById("general-search");
let isGeneralSearch = false;

/**
 * Sends a search when input search is filled
 */
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

let allLi = dropdowns;

let updatedCards = cards;

var compteur = 0;

/**
 * Filters the dropdowns list and recipe results from user search input
 * @param {Array} selectedTags tag(s) selected by user 
 * @returns Array of the impertinent elements (<li> of dropdown lists)
 */
export function search(selectedTags) {
    
    /**
     * Array of (Objects) list elements shown in dropdowns
     */
    
    console.log(allLi)
    /**
     * Array of (Objects) card recipes shown
     */
    let recipeResults = recipiesDisplayed();

    let toHide = [];
    let toShow = [];

    // array of all list element related to the recipies shown
    let recipiesLi = []

    let lastTag = selectedTags[selectedTags.length - 1];

    for (let i = 0; i < allLi.length; i++) {
        allLi[i].toggle()
    }
    
    for (let recipe = 0; recipe<recipeResults.length; recipe++) { // on va chercher dans chaque recette affichées
        
        let recipeKeywords = getAllKeywordsOf(recipeResults[recipe]); 

        if (isGeneralSearch) {
            /*   for (let i=0; i<recipeKeywords.length; i++) {
                if (!recipeKeywords[i].includes(selectedTags[tag])) {
                    if (!unavailableListElements.includes(recipeKeywords[i])) {
                        unavailableListElements.push(recipeKeywords[i])
                    }
                }
            } */

            const description = recipes[recipe].description;
            const name = recipes[recipe].name;

            // if title and description doesn't include search input then check in each ingredient, ustensil and appliance
            if (!description.includes(selectedTags[tag]) && !name.includes(selectedTags[tag]) ) {
                console.log(recipes[recipe].id + " does not include your search : " + selectedTags[tag])

                for (let i = 0; i < recipeKeywords.length; i++) {
                    
                    if (!recipeKeywords[i].includes(selectedTags[tag])) {
                        clear(recipes[recipe].id); // if nothing is find anywhere => clear this recipe

                        
                    }
                }
                
            }

            for (let i = 0; i < recipeKeywords.length; i++) {

                if (!recipeKeywords[i].includes(selectedTags[tag])) {

                    for (let i=0; i< recipes[recipe].ingredients.length; i++) {
                        if (!unavailableListElements.includes(getAllKeywordsOf(recipes[recipe].ingredients[i].ingredient))) {
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

            if (!recipeKeywords.includes(lastTag)) { // si la recette ne contient pas le dernier tag

                updatedCards[recipe].toggle() // supprime la carte de recette
            }

            else { // si la recette contient le dernier tag
                
                // Envoie les ingredients/appl/usten. de chaque carte affichée dans un tableau (pour les maintenir dans les listes déroulantes)
                for (let e = 0; e < recipeKeywords.length; e++) {
                 
                    
                    if (!toShow.includes(recipeKeywords[e])) {
                        toShow.push(recipeKeywords[e]);
                        compteur ++;
                        console.log(compteur)
                    }
                }
            }
        }
    }

    // hides clicked <li>
    if (!isGeneralSearch) {
        toShow.push(lastTag)

    }

    console.log(toShow)

    for (let i=0; i<toShow.length; i++) {
        const list = findObjectOf(toShow[i]);
        list.toggle();
    }

    console.log(allLi)

    allLi = updtatedList(toShow)
    console.log(allLi)
}


/**
 * Clears the element in DOM ( hidding <li> in list or recipe cards in results )
 * @param {*} element id Number of the recipe (ex: "1") or id String of the dropdown list (ex: "sucre-vanille") 
 */
 function clear(element) {
    const node = document.getElementById(element);
    node.setAttribute("data-visible", "false");
}

/**
 * Displays a hidden list element in DOM 
 * @param {*} element 
 */
function display(element) {
    const node = document.getElementById(element);
    node.setAttribute("data-visible", "true");
}


/*************************
 * Dropdown list functions
 *************************/

/**
 * Gathers all words (ingredients, appliances and ustensils) of one card recipe
 * @param {Object} element the card recipe (ex: updatedCards[1])
 * @returns Array with all words related to one recipe
 */
function getAllKeywordsOf(element) {
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

/**
 * Finds and returns an List object from its string name
 * @param {*} keyword 
 * @returns the object List element
 */
export function findObjectOf(keyword) {

    const arrayOfList = dropdowns;
    
    for (let i=0; i<arrayOfList.length; i++) {

        const content = arrayOfList[i].content;
        
        if (keyword == content) {

            return arrayOfList[i];
        }
    }
}


/*************************
 * Recipe cards functions
 *************************/


/**
 * Gathers all card objects that are visible
 * @returns Array of {Object} cards displayed in result
 */
function recipiesDisplayed() {
    let array = updatedCards;

    for (let i=0; i<updatedCards.length; i++) {
        if (updatedCards[i].isVisible == false) {
            array.pop(updatedCards[i])
        }
    }
    updatedCards = array;

    return updatedCards
}

function getDescriptions(element) {
    let array = [];
    array.push(element.description.toLowerCase());
    return array
}