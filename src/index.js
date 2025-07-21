import "./styles.css"

import Page from "./page.js"
import Task from "./task.js"

function storageAvailable(type)
{
    let storage;
    try {
        storage = window[type];
        const x = "__storage_test__";
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    } catch (e) {
        return (
            e instanceof DOMException &&
            e.name === "QuotaExceededError" &&
            // acknowledge QuotaExceededError only if there's something already stored
            storage &&
            storage.length !== 0
        );
    }
}

if( storageAvailable("localStorage") )
    console.log("Windows.localStorage is available and ready to store!");
else 
    console.log("Windows.localStorage is not available!");




Page.setContainer(document.querySelector("#general-tasks-container"));

const navList = document.querySelector("#nav-list");

for(const li of navList.children ) {
    let pageName = li.id.split('-').pop();

    let TodoList = (await import(`./todolist_${pageName}.js`)).default;
    
    li.addEventListener("click", (event) => {
        let elm = event.target;

        while( elm.tagName !== "LI" )
            elm = elm.parentElement;

        Page.setActivatingButton(elm);
        Page.load(new TodoList(pageName));
    });
}

new Task("Hit gym", "do 45 mins of bodybuilding followed up by 30 mins of cardio", "Today", 3, "");
new Task("Math homeworks", "Do exercises 1, 4 and 6 page 145", "Today", 3, "");
new Task("Read one chapter", "Little bit of reading before sleep, if its not possible then there's no need", "Today", 1, "");