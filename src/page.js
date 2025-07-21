export default class Page {
    static #_container = null;
    static #_pagesCreated = [];

    static #_activatingButton = null;

    constructor() {
        Page.#_pagesCreated.push(this);
    }

    show() {
    };

    load()
    {
        this.#cleanContainer();
        this.show();
    };

    #cleanContainer() {
        let firstChild;
        
        while( firstChild = Page.#_container.firstChild )
            Page.#_container.removeChild(firstChild);
    }
 
    static getContainer = () => Page.#_container;

    static setContainer = (container) => {
        Page.#_container = container;
    }

    static getActivatingButton = () => Page.#_activatingButton;

    static setActivatingButton = (button) => {
        if( Page.#_activatingButton )
            Page.#_activatingButton.classList.remove("nav-list-active");

        Page.#_activatingButton = button;
        Page.#_activatingButton.classList.add("nav-list-active");
    }
}