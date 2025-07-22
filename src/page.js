import TodoList from "./todolist.js";
import Task from "./task.js"

export default (function() {
    let _container = null;
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
            deadlineElem.textContent = task.getDeadline();

            priorityElem = document.createElement("div");
            priorityElem.textContent = task.getPriority();
            
            let starButtonElm = document.createElement("div");
            let editButtonElm = document.createElement("div");
            let removeButtonElm = document.createElement("div");

            let start = document.createElement("button");
            start.id = taskId;
            start.addEventListener("click", onClickStar);

            starButtonElm.appendChild(start);

            let edit = document.createElement("button");
            edit.id = taskId;
            edit.addEventListener("click", onClickEdit);

            editButtonElm.appendChild(edit);

            let remove = document.createElement("button");
            remove.id = taskId;
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
            divContainerElm.classList.add("task");
            divContainerElm.appendChild(taskInfoElm);
            divContainerElm.appendChild(taskButtonsElm);

            _container.appendChild(divContainerElm);
        });

        let addTaskDialog = document.querySelector("#add-task-dialog");

        divContainerElm = document.createElement("div");
        divContainerElm.id = "add-task";
        divContainerElm.textContent = "Add task";

        divContainerElm.addEventListener("click", () => {
            addTaskDialog.showModal();
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

    const onClickEdit = event => {
    }

    const onClickRemove = event => {
        let taskId = parseInt(event.target.id.split('-').pop());
        let tasksList = Task.getTasksList();

        _viewingTodoList.removeTask(tasksList.at(taskId));
        tasksList.splice(taskId, 1);

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

    const setContainer = container => {
        _container = container;
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

    return { load, setContainer, getActivatingButton, setActivatingButton, getViewingTodoList, setViewingTodoList }
})();