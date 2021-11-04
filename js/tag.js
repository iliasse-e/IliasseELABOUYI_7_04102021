import { tagsContainerInnerText } from "./components/dropdown.js";
import { searchByTag, updatedCards } from "./search.js";

/**
 * Class Representing a tag
 */
export class Tag {
    /**
     * Creates a tag
     * @param {*} type ingredients, appliances or ustensils. 
     * @param {*} content text content of the tag
     * @param {*} index index used as an identifier for url and to identify the tag 
     */
    constructor(type, content, index) {
        this.type = type,
        this.content = content,
        this.index = index
    }

    /**
     * Displays the tag in the DOM and removes it on click in itself
     */
    create() {
        const container = document.getElementById("tags");
    
        // get tag name (from url)
        const tagContent = this.content;
    
        // create tag
        const tag = document.createElement("div");
        const text = document.createElement("span");
        const paramName = "tag";
    
        // attributes classes
        tag.className = paramName;
        tag.setAttribute("id", "tag"+this.index)
        tag.setAttribute("tag", this.index);
        text.className = "tag__title text-light";
    
        // appends to html nodes
        container.appendChild(tag);
        tag.appendChild(text);
    
        // adds content
        text.textContent = tagContent;
    
        // adds the right color (blue ingredient, orange appareil, ...)
        switch (this.type) {
            case "ingredients":
                tag.classList.add("bg-primary");
                break;
            case "ustensils":
                tag.classList.add("green-pastel");
                break;
            case "appliances":
                tag.classList.add("orange-pastel");
                break;
            default:
                break;
        }

        /*************************
         * Pops on URL parameters
         *************************/ 
        const url = window.location.href;
        const urlData = new URL(url);
        
        urlData.searchParams.append(paramName + this.index, this.content.normalize("NFD").replace(/[\u0300-\u036f]/g, ""));
        window.history.pushState({}, "", urlData);

        /**********************
         * Removes tag and url
         *********************/
        tag.addEventListener("click", function() {
            let urlUpdtate = new URL(window.location.href);

            urlUpdtate.searchParams.delete(paramName + tag.getAttribute("tag"));
            window.history.pushState({}, "", urlUpdtate);

            tag.remove();

            // launch search for the rest of the tags
            searchByTag(tagsContainerInnerText(), updatedCards);
            
            // triggers input in case of general search
            let input = document.getElementById("general-search");
            input.dispatchEvent(new Event("input"));
        })
    
    }


}


