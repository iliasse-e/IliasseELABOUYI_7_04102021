/**
 * @file Sets up the front element and functionality of the page
 */

import { search } from "../search.js";
import { Tag } from "../tag.js";


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

// gets tag(s) inner text in array
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
 * Displays front dropdown functionnality (hide btn, displays tag)
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
        const tagName = btn.textContent;
        const typeName = e.target.getAttribute("class");

        // index used for Tag instances
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

        new Tag(typeName, tagName, returnTagIndex()).create()
        
        // closes dropdown
        closeList();
        
        // update search result and dropdowns
        search(tagsContainerInnerText());
    }))
    
    //toggles off dropdown on outside or chevron click
    document.querySelector("#" + btn.getAttribute("id") + "-dropdown-close").addEventListener("click", closeList);
    document.querySelector("body").addEventListener("click", (event) => {
        console.log(event.currentTarget);
        if (event.target.getAttribute("id") !== dropdownInput.getAttribute("id")) {
            closeList()
        }
    })
    
}))

