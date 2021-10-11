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

// gathers all dropdown content by category
const ingredients = getIngredients();
const appliances = getAppliances();
const ustensils = getUstensils();

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

    /**
     * Selects tag and send it to url
     * */   
    dropdownlistElements.forEach((btn) => btn.addEventListener("click", (e) => {
        e.stopImmediatePropagation()
        const url = "index.html";
        const tagName = btn.textContent;
        window.history.pushState({}, "", url + "?" + e.target.getAttribute("class") + "=" + tagName);
        // creates & displays tag with out of url param
        tagPopper()
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
 * creates and displays a tag of the clicked dropdown text
 */
function tagPopper() {
    const container = document.getElementById("tags");
    
    // get tag name (from url)
    const tagContent = window.location.search.split('=')[1];

    // create tag
    const tag = document.createElement("div");
    const text = document.createElement("span");

    // attributes classes
    tag.className = "tag";
    text.className = "tag__title text-light";

    // appends to html nodes
    container.appendChild(tag);
    tag.appendChild(text);

    // adds content
    text.textContent = tagContent;

    // adds the right color (blue ingredient, orange appareil, ...)
    switch (window.location.search.split('=')[0].substring(1)) {
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

    // Pops off the tag
}
