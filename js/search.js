/**
 * @file Sets the search functionalities
 */

import { cards, dropdownLists, dropdowns } from "./main.js";
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
 * @returns Array of the impertinent elements (<li> of dropdown lists)
 */
export function search(selectedTags, recipeCards, listElements) {
    
    // array of all list element related to the recipies shown
    let recipiesLi = []
    
    let lastTag = selectedTags[selectedTags.length - 1];
    
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
        //recipeCards = array;
        return array
    }
    
    // only when last tag is removed
    if (selectedTags.length < 1) {
        
        // shown all list <li>
        listElements = dropdowns;
        for (let i = 0; i < listElements.length; i++) {
            listElements[i].toggle()
        }
        
        // shown all cards
        document.querySelector("#cards-container").innerHTML = ""
        recipeCards = cards;
        for (let i = 0; i < recipeCards.length; i++) {
            recipeCards[i].display()
        }
    }
    
    // for each tag
    for (let tag = 0; tag < selectedTags.length; tag++) {

        /********************
         * Hides all elements
         *******************/

        // toggles off all cards
        for (let i = 0; i < recipeCards.length; i++) {
            recipeCards[i].toggle("off")
        }

        // toggles off all list
        for (let i = 0; i < listElements.length; i++) {
            listElements[i].toggle("off")
        }

        /**
         * Array of (Objects) card recipes shown
         */
        let recipeResults = recipiesDisplayed();

        let toHide = [];
        let toShow = [];

        // to push available recipes
        let updated = [];

        for (let recipe = 0; recipe<recipeCards.length; recipe++) { // on va chercher dans chaque recette affichées
            
            let recipeKeywords = getAllKeywordsOf(recipeCards[recipe]); 
    
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
    
                if (!recipeKeywords.includes(selectedTags[tag])) { // si le dernier tag n'est pas inclu dans la recette
                    // hides card
                    //recipeCards[recipe].toggle() 
                }
    
                else { // si le dernier tag est inclu dans la recette
    
                    if (!updated.includes(recipeCards[recipe])) { // on envoie la recette dans le tableau update
                        updated.push(recipeCards[recipe])
                    }
                    
                    // Envoie les ingredients/appl/usten. de chaque carte affichée dans un tableau (pour les maintenir dans les listes déroulantes)
                    for (let e = 0; e < recipeKeywords.length; e++) {
                        
                        if (!toShow.includes(recipeKeywords[e])) {
                            toShow.push(recipeKeywords[e]);
                        }

                    }
                }
            }
        }
    

        /*********************************************
         * Updates data (cards Array and list Array) *
         *********************************************/
        
        // updates lists data
        listElements = updtatedList(toShow);
    
        // updates cards data
        recipeCards = updated;


        /***************************
         * Shows available elements
         ***************************/

        // toggles on all cards
        for (let i = 0; i < recipeCards.length; i++) {
            recipeCards[i].toggle("on")
        }

        // toggles on list <li> available
        for (let i=0; i<toShow.length; i++) {
            const list = findObjectOf(toShow[i]);
            list.toggle("on");
        }

    }

    // hides tags from dropdown
    for (let tag = 0; tag < selectedTags.length; tag++) {
        findObjectOf(selectedTags[tag]).toggle("off")
    }


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
 * @returns Array of textContent dropdown elements
 */
 export function updtatedList(availableLiArray) {
    
    let availableElements = [];

    for (let i=0; i<availableLiArray.length; i++) {
        availableElements.push(findObjectOf(availableLiArray[i]))
    }

    return availableElements
}