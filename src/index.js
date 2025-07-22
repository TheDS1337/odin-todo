import "./styles.css"

import Page from "./page.js"
import TodoList from "./todolist.js";
import Task from "./task.js"

new Task("Hit gym", "do 45 mins of bodybuilding followed up by 30 mins of cardio", "Today", "High", "");
new Task("Math homeworks", "Do exercises 1, 4 and 6 page 145", "Today", "Medium", "");
new Task("Read one chapter", "Little bit of reading before sleep, if its not possible then there's no need", "Today", "Low", "");

Page.setContainer(document.querySelector("#general-tasks-container"));

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
        Page.setViewingTodoList(TodoList.getTodoLists().find(todoList => todoList.getName() === elm.id.split('-').pop()));

        Page.load();
    });
}

let formCancelButtonElm = document.querySelector("#form-cancel-button");
formCancelButtonElm.addEventListener("click", event => {
    event.target.parentElement.parentElement.close();
});

let formElm = document.querySelector("#add-task-dialog > form");

formElm.addEventListener('submit', event => {
    event.preventDefault();

    let elm = event.target;
    let data = new FormData(elm);
    let task = new Task(data.get("name"),
        data.get("description"),
        new Date(data.get("deadline")),
        data.get("priority"),
        data.get("notes")
    );

    let viewingTodoList = Page.getViewingTodoList();

    // If we are viewing the starred page, then instantly flag the task as starred so that it loads
    if( viewingTodoList === TodoList.getStarredTodoList() )
        task.toggleStarred();

    if( viewingTodoList.criterion(task) )
        viewingTodoList.addTask(task);

    Page.load();

    elm.reset();
    elm.parentElement.close();
});