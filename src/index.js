import "./styles.css";

// load tasks first
import Page from "./page.js";
import TodoList from "./todolist.js";
import Task from "./task.js";
import addIcon from "./icons/add.png";

new Task("Hit gym", "do 45 mins of bodybuilding followed up by 30 mins of cardio", new Date(Date.now() + 10000), 3, "");
new Task("Math homeworks", "Do exercises 1, 4 and 6 page 145", new Date(Date.now() + 15000), 2, "");
new Task("Read one chapter", "Little bit of reading before sleep, if its not possible then there's no need", new Date(), 1, "");

const navList = document.querySelector("#nav-list");
const projectsElm = document.querySelector("#list-projects > div:last-child");

for(const li of navList.children ) {
    let pageName = li.id.split('-').pop();

    if( pageName !== "projects" )
        new ((await import(`./todolist_${pageName}.js`)).default)(pageName);

    let addProjectButtonContainerElm = document.createElement("div");
    addProjectButtonContainerElm.id = "add-project-container";

    let add = new Image();
    add.src = addIcon;
    add.classList.add("icon");

    let addProjectButtonElm = document.createElement("div");

    addProjectButtonElm.id = "add-project";
    addProjectButtonElm.textContent = "Add project";

    addProjectButtonContainerElm.appendChild(add);
    addProjectButtonContainerElm.appendChild(addProjectButtonElm);

    addProjectButtonContainerElm.addEventListener("click", () => {
        //Dialog.show(divContainerElm);
    });
    
    li.addEventListener("click", event => {
        let elm = event.target;

        while( elm.tagName !== "LI" )
            elm = elm.parentElement;

        let todoListName = elm.id.split('-').pop();

        // reenter the tree and grap the first div
        elm = elm.firstChild;
        Page.setActivatingButton(elm);

        if( todoListName === "projects" ) {
            if( projectsElm.contains(addProjectButtonContainerElm) )
                projectsElm.removeChild(addProjectButtonContainerElm);
            else
                projectsElm.appendChild(addProjectButtonContainerElm);
        } else {
            Page.setViewingTodoList(TodoList.findByName(todoListName));

            Page.load();
        }
    });
}