import TodoList from "./todolist.js";
import Task from "./task.js"

export default (function() {
    let _container = null;
    let _activatingButton = null;
    let _lastRememberedTodoList = null

    const load = (todoList) =>
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

        let starButtonElm = document.createElement("div");
        let editButtonElm = document.createElement("div");
        let removeButtonElm = document.createElement("div");

        let divContainerElement = document.createElement("div");

        divContainerElement.appendChild(nameElm);
        divContainerElement.appendChild(deadlineElem);
        divContainerElement.appendChild(priorityElem);
        divContainerElement.appendChild(starButtonElm);
        divContainerElement.appendChild(editButtonElm);
        divContainerElement.appendChild(removeButtonElm);

        _container.appendChild(divContainerElement);
        
        todoList.getTasksList().forEach(task => {
            let taskId = `task-${Task.getTasksList().indexOf(task)}`;

            nameElm = document.createElement("div");
            nameElm.textContent = task.getName();

            nameElm.id = taskId;
            nameElm.addEventListener("click", onTaskClick);

            deadlineElem = document.createElement("div");
            deadlineElem.textContent = task.getDeadline();

            priorityElem = document.createElement("div");
            priorityElem.textContent = task.getPriority();
            
            starButtonElm = document.createElement("button");
            starButtonElm.id = taskId;
            starButtonElm.addEventListener("click", onClickStar);

            editButtonElm = document.createElement("button");
            starButtonElm.id = taskId;
            starButtonElm.addEventListener("click", onClickEdit);

            removeButtonElm = document.createElement("button");
            removeButtonElm.id = taskId;
            removeButtonElm.addEventListener("click", onClickRemove);

            divContainerElement = document.createElement("div");
            divContainerElement.classList.add("task-is-not-done");
            
            divContainerElement.appendChild(nameElm);
            divContainerElement.appendChild(deadlineElem);
            divContainerElement.appendChild(priorityElem);
            divContainerElement.appendChild(starButtonElm);
            divContainerElement.appendChild(editButtonElm);
            divContainerElement.appendChild(removeButtonElm);

            _container.appendChild(divContainerElement);
        });

        _lastRememberedTodoList = todoList;
    };

    const onClickStar = event => {
    }

    const onClickEdit = event => {
    }

    const onClickRemove = event => {
        let taskId = parseInt(event.target.id.split('-').pop());
        let tasksList = Task.getTasksList();

        _lastRememberedTodoList.removeTask(tasksList[taskId]);
        tasksList.splice(taskId, 1);

        load(_lastRememberedTodoList);
    }

    const onTaskClick = event => {
        let nameElem = event.target;

        let taskId = parseInt(nameElem.id.split('-').pop());
        let task = Task.getTasksList().at(taskId);

        if( task.isDone() ) {
            task.setAsNotDone();

            nameElem.parentElement.classList.remove("task-is-done");
            nameElem.parentElement.classList.add("task-is-not-done");
        } else {
            task.setAsDone();

            nameElem.parentElement.classList.add("task-is-done");
            nameElem.parentElement.classList.remove("task-is-not-done");
        }
    }

    const setContainer = container => {
        _container = container;
    }

    const setActivatingButton = button => {
        if( _activatingButton )
            _activatingButton.classList.remove("nav-list-active");

        _activatingButton = button;
        _activatingButton.classList.add("nav-list-active");
    }

    return { load, setContainer, setActivatingButton }
})();