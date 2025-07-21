import Page from "./page.js"
import Project from "./project.js"

export default new (class extends Page {
    show() {
        let tasksList = Project.getDefault().getTasksList();

        tasksList.forEach(task => {
            let name = document.createElement("div");
            name.textContent = task.getName(); 
            
            Page.getContainer().appendChild(name);
        });
    }
})();


/*
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


let taskContainer = document.createElement("div");
taskContainer.classList.add("add-task");

let button = document.createElement("button");
button.classList.add("add-task-button");
button.textContent = "Add new task";

const addTaskDialog = document.querySelector("#add-task-dialog");
button.addEventListener("click", (event) => {
    addTaskDialog.showModal();
});


taskContainer.appendChild(button);
generalTasksContainer.appendChild(taskContainer);

const addButton = document.querySelector("#form-add-button");
const cancelButton = document.querySelector("#form-cancel-button");

cancelButton.addEventListener("click", (event) => {
    addTaskDialog.close();
});

const addTaskForm = document.querySelector("#add-task-dialog > form");
addTaskForm.addEventListener("submit", (event) => {
    event.preventDefault();

    let inputs = document.querySelectorAll("#add-task-dialog input");

    for( let input of inputs ) {
        console.log(`Submitted ${input.value}`);
    }

    addTaskForm.reset();
    addTaskDialog.close();
});
*/