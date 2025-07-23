import "./styles.css";

// load tasks first
import Page from "./page.js";
import TodoList from "./todolist.js";
import Task from "./task.js";

new Task("Hit gym", "do 45 mins of bodybuilding followed up by 30 mins of cardio", new Date(Date.now() + 10000), 3, "");
new Task("Math homeworks", "Do exercises 1, 4 and 6 page 145", new Date(Date.now() + 15000), 2, "");
new Task("Read one chapter", "Little bit of reading before sleep, if its not possible then there's no need", new Date(), 1, "");

const navList = document.querySelector("#nav-list");

for(const li of navList.children ) {
    let pageName = li.id.split('-').pop();

    let TodoListType = (await import(`./todolist_${pageName}.js`)).default;
    new TodoListType(pageName);
    
    li.addEventListener("click", event => {
        let elm = event.target;

        while( elm.tagName !== "LI" )
            elm = elm.parentElement;

        Page.setActivatingButton(elm);
        Page.setViewingTodoList(TodoList.findByName(elm.id.split('-').pop()));

        Page.load();
    });
}