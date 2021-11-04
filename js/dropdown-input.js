/**
 * @file Sets the filter functionnality on dropdown's input
 * No List objects are manipulated unlike the search functionnality
 */

const inputs = document.querySelectorAll(".dropdown__input");

inputs.forEach(input => {
    input.addEventListener("input", function () {
        toggleLi(input.getAttribute("category"))
    } 
)})

export function toggleLi(type) {
    const input = document.getElementById(type.toString() + "-input").value;
    const list = document.querySelectorAll("." + type + "[data-visible='true']");
    
    list.forEach(li => {
        li.removeAttribute("toggle-off");
    });

    list.forEach(li => {
        if (!li.textContent.includes(input.toLowerCase())) {
            li.setAttribute("toggle-off", "true")
        }        
    });
}