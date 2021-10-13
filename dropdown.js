// les petits plat
import  { getIngredients, getAppliances, getUstensils } from "./main.js";

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

// gathers all dropdown content by category
const ingredients = getIngredients();
const appliances = getAppliances();
const ustensils = getUstensils();

window.onload = () => {
    window.history.pushState({}, "", "index.html")
}

/**
 * Fills the dropdowns' lists with all their content (appareil, ingredients, ustensiles)
 * @param {Array} type ingredients, appliances, or ustensils
 * @param {String} id id of dropdown list node ("#ingredients", "#appliances" or "#ustensils")
 */
function FillDropdownLists(type, id) {
    const listContainer = document.querySelector(id + "-dropdown-list ul");
    for (let content = 0; content < type.length; content++) {
        const node = document.createElement("li");
        node.textContent = type[content];
        node.classList.add(id.substring(1))
        listContainer.appendChild(node)
    }
}

FillDropdownLists(ingredients, "#ingredients");
FillDropdownLists(appliances, "#appliances");
FillDropdownLists(ustensils, "#ustensils");

console.log(ingredients)

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

        // index used for tags (in tagPopper func)
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
        tagPopper(typeName, tagName, returnTagIndex())
        // closes dropdown
        closeList()
    }))
    
    //toggles off on outside or chevron click
    document.querySelector("#" + btn.getAttribute("id") + "-dropdown-close").addEventListener("click", closeList);
    document.querySelector("body").addEventListener("click", (event) => {
        console.log(event.currentTarget);
        if (event.target.getAttribute("id") !== dropdownInput.getAttribute("id")) {
            console.log(event.target.getAttribute("id"));
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
function tagPopper(category, name, index) {
    
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
        console.log(urlUpdtate.toString())
        urlUpdtate.searchParams.delete(paramName + tag.getAttribute("tag"))
        console.log(urlUpdtate.toString())
        window.history.pushState({}, "", urlUpdtate)

        tag.remove() // removes tag in DOM
    })
}
