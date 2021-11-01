/**
 * Class representing an element of list
 */
export class List {
    /**
     * Creates an element of list
     * @param {String} id identifier (text content with "-" to replace " ")
     * @param {String} type ingredients, appliances or ustensils  
     * @param {String} content text of the element
     */
    constructor (id, type, content, isVisible) {
        this.id = id;
        this.type = type;
        this.content = content;
        this.isVisible = false;
    }

    /**
     * Displays the UI element of list inside the DOM
     */
    create() {
        const listContainer = document.querySelector(`#${this.type}-dropdown-list ul`);
        const node = document.createElement("li");
        node.textContent = this.content;
        node.classList.add(this.type);
        node.setAttribute("id", this.id);
        node.setAttribute("data-visible", "true");
        listContainer.appendChild(node);
    }

    /**
     * Toggles off the UI element of list
     */
    toggle(state) {
        const node = document.getElementById(this.id);
        const nodeVisibility = node.getAttribute("data-visible");

        if (state == "off") {
            this.isVisible = false;
            node.setAttribute("data-visible", "false")
        }

        else if (state == "on") {
            this.isVisible = true;
            node.setAttribute("data-visible", "true")
        }

    }
}