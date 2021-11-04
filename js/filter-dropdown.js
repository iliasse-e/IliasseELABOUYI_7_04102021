import { tagsContainerInnerText } from "./components/dropdown.js";
import { dropdowns } from "./main.js";
import { findObjectOf, getAllKeywordsOf, updatedCards } from "./search.js";

/**
 * All List (Object) available
 *  */ 
 let allLi = dropdowns;

/**
 * Filters dropdown by hidding the non pertinent <li> when tag or search is processed
 */
 export function filterDropdowns() {

    let toShow = [];
    let tags = tagsContainerInnerText();

    // toggles off list elements
    for (let i=0; i<allLi.length; i++) {
        allLi[i].toggle("off")
    }
    
    // sends all available list elements in toShow array
    for (let i=0; i<updatedCards.length; i++) {
        if (updatedCards[i].isVisible == true) {
            for (let e=0; e < getAllKeywordsOf(updatedCards[i]).length; e++) {
                if (!toShow.includes(getAllKeywordsOf(updatedCards[i])[e])) {
                    toShow.push(getAllKeywordsOf(updatedCards[i])[e])
                }
                
            }
        }
    }
    
    // toggles on only available list elements
    for (let i=0; i<toShow.length; i++) {
        findObjectOf(toShow[i]).toggle("on")
    }

    // hides selected tags from dropdown
    for (let tag = 0; tag < tags.length; tag++) {
        findObjectOf(tags[tag]).toggle("off")
    }
}