import "./styles.css"

import Project from "./project.js"
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


new Task("Hit gym", "do 45 mins of bodybuilding followed up by 30 mins of cardio", "Today", 3, "");
new Task("Math homeworks", "Do exercises 1, 4 and 6 page 145", "Today", 3, "");
new Task("Read one chapter", "Little bit of reading before sleep, if its not possible then there's no need", "Today", 1, "");

const generalTasksContainer = document.querySelector("#general-tasks-container");

Project.getDefault().getTasksList().forEach(task => {
    let taskContainer = document.createElement("div");
    taskContainer.classList.add("general-task");

    let p1 = document.createElement("p");
    p1.textContent = `Name: ${task.getName()}`;

    let p2 = document.createElement("p");
    p2.textContent = `Description: ${task.getDescription()}`;

    let p3 = document.createElement("p");
    p3.textContent = `Deadline: ${task.getDeadline()}`;

    taskContainer.appendChild(p1);
    taskContainer.appendChild(p2);
    taskContainer.appendChild(p3);

    generalTasksContainer.appendChild(taskContainer);
});