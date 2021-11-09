/**
 * @file Sets the search functionalities (input search & filter search)
 */

import { tagsContainerInnerText } from "./components/dropdown.js";
import { cards, dropdowns } from "./main.js";

let input = document.getElementById("general-search");

/**
 * Launch input search 
 */
input.addEventListener("input", function() {
    if (input.value.length > 2) {
        generalSearch()
    }
    else {
        searchByTag(tagsContainerInnerText(), updatedCards);
    }
    
    // If not result => error message
    const cardsContainer = document.getElementById("cards-container");
    let cardsCounter = document.querySelectorAll(".card-container[data-visible='true']").length;

    if (cardsCounter < 1) {
        const node = document.createElement("p");
        node.setAttribute("id", "data-error")
        node.textContent = "Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc."
        cardsContainer.appendChild(node);
    }
    else {
        if (document.getElementById("data-error")) {
            document.getElementById("data-error").remove()
        }
    }
})


/**
 * All (Object) recipe cards
 * This Array will be updated after each search to reduce cards available
 */
export let updatedCards = cards;


/**
 * Filters cards results when input search is filled
 */
export function generalSearch() {
    
    const userInput = input.value.toLowerCase();
    
    searchByTag(tagsContainerInnerText(), updatedCards)

    updatedCards.forEach((card) => { // search on each displayed recipe
        
        let recipeKeywords = getAllKeywordsOf(card); 
        const description = card.description.toLowerCase();
        const name = card.title.toLowerCase();
    
        // if title and description doesn't include search input then check in each ingredient, ustensil and appliance
        if (!description.includes(userInput) && !name.includes(userInput) ) {
    
            recipeKeywords.forEach((keyword) => {
                
                if (!keyword.includes(userInput)) { // if nothing is found anywhere => clear this recipe
                    card.toggle("off") 
                }
            })
        }
    })
}


/**
 * Filters cards recipe results when tag is selected
 * @param {Array} selectedTags tag(s) selected by user 
 * @param {Array} recipeCards represents objects of cards recipe
 */
export function searchByTag(selectedTags, recipeCards) {

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

    // only when last tag is removed
    if (selectedTags.length < 1) {
        
        // shows all cards
        document.querySelector("#cards-container").innerHTML = ""
        updatedCards = cards;
        for (let i = 0; i < updatedCards.length; i++) {
            updatedCards[i].display();
            updatedCards[i].toggle("on")
        }
        return
    }

    // for each tag
    for (let tag = 0; tag < selectedTags.length; tag++) {

        /*********************
         * Hides all recipes
         *********************/

        // toggles off all cards
        for (let i = 0; i < cards.length; i++) {
            cards[i].toggle("off")
        }

        for (let recipe = 0; recipe<recipeCards.length; recipe++) { // look inside each displayed recipe
            
            let recipeKeywords = getAllKeywordsOf(recipeCards[recipe]); 
    
            if (!recipeKeywords.includes(selectedTags[tag])) { // if tag is not include in recipe 
                // hides card
                recipeCards[recipe].toggle("off") 
            }

            else {
                // shows card
                recipeCards[recipe].toggle("on")
            }
        }
        // make the next loop search the recipes related to the previous tag
        recipiesDisplayed()
    }
}


/*******************
 * Generic methods
 *******************/

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
 * Finds and returns a List object from its string name
 * @param {String} keyword 
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
