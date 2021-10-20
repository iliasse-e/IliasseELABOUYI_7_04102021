// les petits plat
import  { getIngredients as ingredients, getAppliances as appliances, getUstensils as ustensils } from "./main.js";
import { updateResults } from "./search.js";

// Dom elements
const generalSearchBar = document.getElementById("general-search");
const dropdownButtons = document.querySelectorAll(".dropdown"); // All 3 dropdown buttons
const ingredientsBtn = document.getElementById("ingredients");
const ustentilsBtn = document.getElementById("ustensils");
const appliancesBtn = document.getElementById("appliances");

const dropdownInputs = document.querySelectorAll(".dropdown__input"); // All 3 dropdown search inputs
const ingredientsInput = document.getElementById("ingredients-input");
const ustensilsInput = document.getElementById("ustensils-input");
const appliancesInput = document.getElementById("appliances-input");

const dropdownLists = document.querySelectorAll(".dropdown__list-container") // All 3 dropdown list containers

// gathers all dropdown content by category (for fast method : delete *as* in import and *()* in FillDropdown param call)
/*const ingredients = getIngredients();
const appliances = getAppliances();
const ustensils = getUstensils();*/


// get tag(s) inner text in array
function tagsContainerInnerText() {
    const tagsContainer = document.querySelectorAll("#tags .tag");
    let result = [];
    for (let i = 0; i < tagsContainer.length; i++) {
        result.push(tagsContainer[i].textContent);
    }
    return result;
}

// get rid of params by refresh page
window.onload = () => {
    window.history.pushState({}, "", "index.html")
}

/**
 * Fills the dropdowns' lists with their available content (appareil, ingredients, ustensiles)
 * Is called onload and after user inputs (chosen list element)
 * @param {Array} allElements all ingredients, appliances, or ustensils
 * @param {String} id id of dropdown list node ("#ingredients", "#appliances" or "#ustensils")
 */
export function updateDropdown(allElements, id) {
    const listContainer = document.querySelector(id + "-dropdown-list ul");
    listContainer.innerHTML = ""; // clears list

    for (let content = 0; content < allElements.length; content++) {
        const node = document.createElement("li");
        node.textContent = allElements[content];
        node.classList.add(id.substring(1));
        node.setAttribute("id", allElements[content].split(' ').join('-'));
        node.setAttribute("data-visible", "true");
        listContainer.appendChild(node);
    }
}

updateDropdown(ingredients(), "#ingredients");
updateDropdown(appliances(), "#appliances");
updateDropdown(ustensils(), "#ustensils");


/**
 * Displays dropdown functionnality (hide btn, displays tag)
 */
dropdownButtons.forEach((btn) => btn.addEventListener("click", (event) => {

    // closes current opened dropdown
    dropdownButtons.forEach((btn) => btn.setAttribute("data-hidden", "false"));
    dropdownLists.forEach((list) => list.setAttribute("data-hidden", "true"));

    event.stopPropagation();
    const id = btn.getAttribute("id");
    const dropdownList = document.querySelector("#" + id + "-dropdown-list");
    const dropdownInput = document.getElementById(id + "-input");
    const dropdownlistElements = document.querySelectorAll("#" + id + "-dropdown-list li");
    
    // hide btn
    btn.setAttribute("data-hidden", "true");
    // displays search input and list
    dropdownList.setAttribute("data-hidden", "false");
    
    // focus on input
    document.querySelector("#" + btn.getAttribute("id") + "-input").select();
    
    function closeList(){
        btn.setAttribute("data-hidden", "false");
        dropdownList.setAttribute("data-hidden", "true")
    }


    /****************************************************************************
     * Creates a tag (in DOM) and query string (in url) out of content list click
     ****************************************************************************/   
    dropdownlistElements.forEach((btn) => btn.addEventListener("click", (e) => {
        e.stopImmediatePropagation()
        const tagName = btn.textContent.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        const typeName = e.target.getAttribute("class");

        // index used for tags (in tagToggle func)
        function returnTagIndex() {
            let number = document.querySelectorAll(".tag").length;
            for (let i=0; i<document.querySelectorAll(".tag").length; i++) {
                if (document.querySelectorAll(".tag")[i].getAttribute("tag") > number) {
                    number = Number(document.querySelectorAll(".tag")[i].getAttribute("tag"));
                }
            }
            number += 1;
            return number
        }
        
        
        // creates & displays tag and url
        tagToggle(typeName, tagName, returnTagIndex());

        // closes dropdown
        closeList();
        
        // update search result and dropdowns
        updateResults(tagsContainerInnerText());
        
    }))
    
    //toggles off on outside or chevron click
    document.querySelector("#" + btn.getAttribute("id") + "-dropdown-close").addEventListener("click", closeList);
    document.querySelector("body").addEventListener("click", (event) => {
        console.log(event.currentTarget);
        if (event.target.getAttribute("id") !== dropdownInput.getAttribute("id")) {
            closeList()
        }
    })
    
}))

/**
 * Toggles a tag of the chosen content (on list click)
 * @param {String} category ingredients, appliances or ustensils
 * @param {String} name text content of the tag
 * @param {Number} index index of the tag which will be used for btn and URL
 */
function tagToggle(category, name, index) {
    
    /*************************
     * Pops on URL parameters
     *************************/ 
    const url = window.location.href;
    const urlData = new URL(url);
    const paramName = "tag";

    urlData.searchParams.append(paramName + index, name);
    window.history.pushState({}, "", urlData)

    /*****************
     * Pops on DOM tag
     *****************/ 
    const container = document.getElementById("tags");
    
    // get tag name (from url)
    const tagContent = name;

    // create tag
    const tag = document.createElement("div");
    const text = document.createElement("span");

    // attributes classes
    tag.className = paramName;
    tag.setAttribute("tag", index)
    text.className = "tag__title text-light";

    // appends to html nodes
    container.appendChild(tag);
    tag.appendChild(text);

    // adds content
    text.textContent = tagContent;

    // adds the right color (blue ingredient, orange appareil, ...)
    switch (category) {
        case "ingredients":
            tag.classList.add("bg-primary");
            break;
        case "ustensils":
            tag.classList.add("orange-pastel");
            break;
        case "appliances":
            tag.classList.add("green-pastel");
            break;
        default:
            break;
    }

    /************************************************
     * Pops off the tag and update URL (on tag click)
     ************************************************/
    tag.addEventListener("click", function() {
        let urlUpdtate = new URL(window.location.href);
        urlUpdtate.searchParams.delete(paramName + tag.getAttribute("tag"))
        window.history.pushState({}, "", urlUpdtate)

        tag.remove() // removes tag in DOM

        updateDropdown(ingredients(), "#ingredients");
        updateDropdown(appliances(), "#appliances");
        updateDropdown(ustensils(), "#ustensils");
        
        updateResults(tagsContainerInnerText());
    })
}
