import TodoList from "./todolist.js";
import Task from "./task.js";
import Dialog from "./dialog.js";
import { isPast } from "date-fns";

import starIcon from "./icons/star.png";
import editIcon from "./icons/edit.png";
import removeIcon from "./icons/remove.png";

export default (function() {
    let _container = document.querySelector("#general-tasks-container");
    let _activatingButton = null;
    let _viewingTodoList = null;

    const load = () =>
    {
        let firstChild;
        
        while( firstChild = _container.firstChild )
            _container.removeChild(firstChild);

        let nameElm = document.createElement("div");
        nameElm.textContent = "Name";

        let deadlineElem = document.createElement("div");
        deadlineElem.textContent = "Deadline";

        let priorityElem = document.createElement("div");
        priorityElem.textContent = "Priority";

        let taskInfoElm = document.createElement("div");
        taskInfoElm.classList.add("task-info");
        taskInfoElm.appendChild(nameElm);
        taskInfoElm.appendChild(deadlineElem);
        taskInfoElm.appendChild(priorityElem);

        let taskButtonsElm = document.createElement("div");

        let divContainerElm = document.createElement("div");
        divContainerElm.id = "task-header";
        divContainerElm.appendChild(taskInfoElm);
        divContainerElm.appendChild(taskButtonsElm);

        _container.appendChild(divContainerElm);
        
        _viewingTodoList.getTasksList().forEach(task => {
            let taskId = `task-${Task.getTasksList().indexOf(task)}`;

            nameElm = document.createElement("div");
            nameElm.textContent = task.getName();

            nameElm.id = taskId;
            nameElm.addEventListener("click", onTaskClick);

            deadlineElem = document.createElement("div");
            deadlineElem.textContent = _viewingTodoList.formatDate(task.getDeadline());

            if( isPast(task.getDeadline()) ) {
                // make it grey?
            }

            priorityElem = document.createElement("div");
            
            switch( task.getPriority() ) {
                case 1:
                    priorityElem.textContent = "Low";
                    break;

                case 2:
                    priorityElem.textContent = "Medium";
                    break;

                case 3:
                    priorityElem.textContent = "High";
                    break;
            }
            
            let starButtonElm = document.createElement("div");
            let editButtonElm = document.createElement("div");
            let removeButtonElm = document.createElement("div");

            let star = new Image();
            star.id = taskId;
            star.src = starIcon;
            star.classList.add("icon");

            if( task.isStarred() )
                star.classList.add("starred");;

            star.addEventListener("click", onClickStar);

            starButtonElm.appendChild(star);

            let edit = new Image();
            edit.id = `edit-${taskId}`;
            edit.src = editIcon;
            edit.classList.add("icon");
            edit.addEventListener("click", event => {
                Dialog.show(event.target, true);
            });

            editButtonElm.appendChild(edit);

            let remove = new Image();
            remove.id = taskId;
            remove.src = removeIcon;
            remove.classList.add("icon");
            remove.addEventListener("click", onClickRemove);

            removeButtonElm.appendChild(remove);

            taskInfoElm = document.createElement("div");
            taskInfoElm.classList.add("task-info");
            taskInfoElm.classList.add(task.isDone() ? "task-is-done" : "task-is-not-done");
            taskInfoElm.appendChild(nameElm);
            taskInfoElm.appendChild(deadlineElem);
            taskInfoElm.appendChild(priorityElem);

            taskButtonsElm = document.createElement("div");
            taskButtonsElm.classList.add("task-buttons");
            taskButtonsElm.appendChild(starButtonElm);
            taskButtonsElm.appendChild(editButtonElm);
            taskButtonsElm.appendChild(removeButtonElm);

            divContainerElm = document.createElement("div");
            divContainerElm.classList.add(task.isDone() ? "task-is-done-parent" : "task-is-not-done-parent");
            divContainerElm.classList.add("task");
            divContainerElm.appendChild(taskInfoElm);
            divContainerElm.appendChild(taskButtonsElm);

            _container.appendChild(divContainerElm);
        });


        divContainerElm = document.createElement("div");
        divContainerElm.id = "add-task";
        divContainerElm.textContent = "Add task";

        divContainerElm.addEventListener("click", () => {
            Dialog.show(divContainerElm);
        });

        _container.appendChild(divContainerElm);
    };

    const onClickStar = event => {
        let task = Task.getTasksList()
            .at(parseInt(event.target.id.split('-').pop()));

        task.toggleStarred();

        if( task.isStarred() )
            TodoList.getStarredTodoList().addTask(task);
        else
            TodoList.getStarredTodoList().removeTask(task);

        load();
    }

    const onClickRemove = event => {
        let task = Task.getTasksList()
            .at(parseInt(event.target.id.split('-').pop()));

        _viewingTodoList.removeTask(task, true);

        load();
    }

    const onTaskClick = event => {
        let nameElem = event.target;
        let task = Task.getTasksList().at(parseInt(nameElem.id.split('-').pop()));

        let parentElement = nameElem.parentElement;
        let grandParentElement = parentElement.parentElement;

        if( task.isDone() ) {
            task.setAsNotDone();

            parentElement.classList.remove("task-is-done");
            grandParentElement.classList.remove("task-is-done-parent");

            parentElement.classList.add("task-is-not-done");
            grandParentElement.classList.add("task-is-not-done-parent");
        } else {
            task.setAsDone();

            parentElement.classList.remove("task-is-not-done");
            grandParentElement.classList.remove("task-is-not-done-parent");

            parentElement.classList.add("task-is-done");
            grandParentElement.classList.add("task-is-done-parent");
        }
    }

    const getActivatingButton = () => _activatingButton;

    const setActivatingButton = button => {
        if( _activatingButton )
            _activatingButton.classList.remove("nav-list-active");

        _activatingButton = button;
        _activatingButton.classList.add("nav-list-active");
    }

    const getViewingTodoList = () => _viewingTodoList;

    const setViewingTodoList = todoList => {
        _viewingTodoList = todoList;
    }

    return { load, getActivatingButton, setActivatingButton, getViewingTodoList, setViewingTodoList }
})();