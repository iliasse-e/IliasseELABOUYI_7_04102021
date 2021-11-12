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
        updatedCards = cards; //reset updated cards
        searchByTag(tagsContainerInnerText(), updatedCards);
    }
    
    // If not result => error message
    const cardsContainer = document.getElementById("cards-container");
    let cardsCounter = document.querySelectorAll(".card-container[data-visible='true']").length;

    if (document.getElementById("data-error")) {
        document.getElementById("data-error").remove()
    }
    if (cardsCounter < 1) {
        const node = document.createElement("p");
        node.setAttribute("id", "data-error")
        node.textContent = "Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc."
        cardsContainer.appendChild(node);
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
    
    searchByTag(tagsContainerInnerText(), recipiesDisplayed());

    for (let recipe = 0; recipe<updatedCards.length; recipe++) { // search on each displayed recipe
            
        let recipeKeywords = getAllKeywordsOf(updatedCards[recipe]); 
        const description = updatedCards[recipe].description.toLowerCase();
        const name = updatedCards[recipe].title.toLowerCase();

        //Sets the toggle() state param
        let toogleState = "on"

        // if title and description doesn't include search input then check in each ingredient, ustensil and appliance
        for (let word = 0; word < description.split(" ").length; word++) { // loops around each description words

            if (textChecker(userInput, description.split(" ")[word]) == -1) { // if description word and input doesnt match

                for (let nameWord=0; nameWord < name.split(" ").length; nameWord++) { // loops around each title words

                    if (textChecker(userInput, name.split(" ")[nameWord]) == -1) { // if title word and input doesnt match

                        for (let keywordsWord = 0; keywordsWord < recipeKeywords.length; keywordsWord++) {

                            for (let str = 0; str < recipeKeywords[keywordsWord].split(" ").length; str++ ) {
                                
                                if (textChecker(userInput, recipeKeywords[keywordsWord].split(" ")[str]) == -1) { // if nothing is found anywhere => clear this recipe
                                    toogleState = "off";
                                }
                                else {
                                    toogleState = "on";
                                    if (toogleState == "on") { break }
                                }
                            }
                            if (toogleState == "on") { break }
                            
                        }
                        
                    }
                    else { 
                        toogleState = "on";
                        break }
                }
            }
            else { 
                toogleState = "on";
                break }
        }

        // clears the recipe if not found
        if (toogleState == "off") {
            updatedCards[recipe].toggle(toogleState);
        }
    }
}


/**
 * Filters cards recipe results when tag is selected
 * @param {Array} selectedTags tag(s) selected by user 
 * @param {Array} recipeCards represents objects of cards recipe
 */
export function searchByTag(selectedTags, recipeCards) {
    console.log(recipiesDisplayed())
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
    console.log(recipiesDisplayed())

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

/************************
* Recipe cards functions
*************************/

/**
 * Gathers all card objects that are visible
 * @returns Array of {Object} cards displayed in result
 */
 export function recipiesDisplayed() { 
    let array = [];

    for (let i=0; i<updatedCards.length; i++) {
        if (updatedCards[i].isVisible == true) {
            array.push(updatedCards[i])
        }
    }
    updatedCards = array;
    return array
}


/***************************
 * Vanilla JS custom methods
 ***************************/

/**
 * This function is the equivalent of the method includes()
 * Check if a pattern is included in a string
 * @param {*} pattern Mostly userInput
 * @param {*} text 
 * @returns -1 if not found or 0 if found
 */
function textChecker(pattern, text) {
if (pattern.length == 0)
    return 0; // Immediate match

// Compute longest suffix-prefix table
let lsp = [0]; // Base case
for (let i = 1; i < pattern.length; i++) {
    let j = lsp[i - 1]; // Start by assuming we're extending the previous LSP
    while (j > 0 && pattern.charAt(i) != pattern.charAt(j))
    j = lsp[j - 1];
    if (pattern.charAt(i) == pattern.charAt(j))
    j++;
    lsp.push(j);
}

// Walk through text string
let j = 0; // Number of chars matched in pattern
for (let i = 0; i < text.length; i++) {
    while (j > 0 && text.charAt(i) != pattern.charAt(j))
    j = lsp[j - 1]; // Fall back in the pattern
    if (text.charAt(i) == pattern.charAt(j)) {
    j++; // Next char matched, increment position
    if (j == pattern.length)
        return i - (j - 1);
    }
}
return -1; // Not found
}
