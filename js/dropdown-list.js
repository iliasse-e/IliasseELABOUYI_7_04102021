export class List {
    constructor (id, type, content) {
        this.id = id;
        this.type = type;
        this.content = content;
    }

    create() {
        const listContainer = document.querySelector(`#${this.type}-dropdown-list ul`);
        const node = document.createElement("li");
        node.textContent = this.content;
        node.classList.add(this.type);
        node.setAttribute("id", this.id);
        node.setAttribute("data-visible", "true");
        listContainer.appendChild(node);
    }

    toggle() {
        const node = document.getElementById(this.id);
        const nodeVisibility = node.getAttribute("data-visible");

        if (nodeVisibility == "true") {
            node.setAttribute("data-visible", "false")
        }

    }
}