/**
 * @file Sets the search functionalities
 */

import { tagsContainerInnerText } from "./components/dropdown.js";
import { card, cards, dropdownLists, dropdowns } from "./main.js";

let input = document.getElementById("general-search");
export let isGeneralSearch = false;


/**
 * Sends a search when input search is filled
 */
export function generalSearch() {
    // has to modify cards array or call search() inside this func
    isGeneralSearch = true;

    const userInput = input.value.toLowerCase();
    
    search(tagsContainerInnerText(), updatedCards)

    for (let recipe = 0; recipe<updatedCards.length; recipe++) { // on va chercher dans chaque recette affichées
            
        let recipeKeywords = getAllKeywordsOf(updatedCards[recipe]); 

            const description = updatedCards[recipe].description.toLowerCase();
            const name = updatedCards[recipe].title.toLowerCase();

            // if title and description doesn't include search input then check in each ingredient, ustensil and appliance
            if (!description.includes(userInput) && !name.includes(userInput) ) {
                console.log(updatedCards[recipe].title + " does not include your search : " + userInput)

                for (let i = 0; i < recipeKeywords.length; i++) {
                    
                    if (!recipeKeywords[i].includes(userInput)) {
                        updatedCards[recipe].toggle("off") // if nothing is find anywhere => clear this recipe
                        
                    }
                }
                
            }

        }
        isGeneralSearch = false;
}

input.addEventListener("input", function() {
    if (input.value.length > 3) {
        generalSearch()
    }
})

/**
 * All li (Object) available
 * This Array will be updated after the first search to reduce list li available
 *  */ 
export let allLi = dropdowns;

/**
 * All (Object) recipe cards
 * This Array will be updated after each search to reduce cards available
 */
export let updatedCards = cards;

/**
 * Filters the dropdowns list and recipe results from user search input
 * @param {Array} selectedTags tag(s) selected by user 
 * @returns {Boolean} used for the updatedDropdown function
 */
export function search(selectedTags, recipeCards) {

    // indicates if the last tag is deleted
    let noTag = false;
    
    /************************
    * Recipe cards functions
    *************************/

    /**
     * Gathers all card objects that are visible
     * @returns Array of {Object} cards displayed in result
     */
    function recipiesDisplayed() { 
        let array = [];

        for (let i=0; i<recipeCards.length; i++) {
            if (recipeCards[i].isVisible == true) {
                array.push(recipeCards[i])
            }
        }
        recipeCards = array;
        return array
    }
    
    if (isGeneralSearch) {

        // only when last tag is removed
        if (selectedTags.length < 1) {
            
            // shown all cards
            document.querySelector("#cards-container").innerHTML = ""
            recipeCards = cards;
            for (let i = 0; i < recipeCards.length; i++) {
                recipeCards[i].display()
            }
    
            noTag = true
        }
    }
    
    // for each tag
    for (let tag = 0; tag < selectedTags.length; tag++) {

        /*********************
         * Hides all recipes
         *********************/

        // toggles off all cards
        for (let i = 0; i < recipeCards.length; i++) {
            recipeCards[i].toggle("on")
        }

        for (let recipe = 0; recipe<recipeCards.length; recipe++) { // on va chercher dans chaque recette affichées
            
            let recipeKeywords = getAllKeywordsOf(recipeCards[recipe]); 
    
            if (!recipeKeywords.includes(selectedTags[tag])) { // si le dernier tag n'est pas inclu dans la recette
                // hides card
                recipeCards[recipe].toggle("off") 
            }

            else { // si le dernier tag est inclu dans la recette

                recipeCards[recipe].toggle("on")
                
            }
            
        }
    
        // make the next loop look for the recipes related to the previous tag
        recipiesDisplayed()

    }

    return noTag
}


/*************************
 * Dropdown list functions
 *************************/

/**
 * Gathers all words (ingredients, appliances and ustensils) of one card recipe
 * @param {Object} element the card recipe (ex: updatedCards[1])
 * @returns Array with all words related to one recipe
 */
export function getAllKeywordsOf(element) {
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



function getDescriptions(element) {
    let array = [];
    array.push(element.description.toLowerCase());
    return array
}


/**********************
 * Update methods
 **********************/

/**
 * Gathers the visible list elements
 * @param {Array}
 * @returns Array of textContent dropdown elements
 */
 export function updtatedList(availableLiArray) {
    
    let availableElements = [];

    for (let i=0; i<availableLiArray.length; i++) {
        availableElements.push(findObjectOf(availableLiArray[i]))
    }

    return availableElements
}


