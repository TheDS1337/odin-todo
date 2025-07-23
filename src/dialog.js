import Page from "./page.js";
import TodoList from "./todolist.js"
import Task from "./task.js";

export default (function() {
    let _activatingButton = null;
    let dialogElm = document.querySelector("#add-task-dialog");
    let formElm = document.querySelector("#add-task-dialog > form");
    let formCancelButtonElm = document.querySelector("#form-cancel-button");

    formCancelButtonElm.addEventListener("click", () => {
        formElm.elements["name"].value = "";
        formElm.elements["description"].value = "";
        formElm.elements["deadline"].value = "";
        formElm.elements["priority"].value = "1";
        formElm.elements["notes"].textContent = ""

        dialogElm.close();
    });

    formElm.addEventListener('submit', event => {
        event.preventDefault();

        let elm = event.target;
        let viewingTodoList = Page.getViewingTodoList();

        let idToStrs = _activatingButton.id.split('-');

        let data = new FormData(elm);
        let taskInfo = [
            data.get("name"),
            data.get("description"),
            new Date(data.get("deadline")),
            parseInt(data.get("priority")),
            data.get("notes")
        ];

        switch( idToStrs.shift() ) {
            case "edit": {
                Task.getTasksList()
                    .at(parseInt(idToStrs.pop()))
                    .copy(...taskInfo);

                break;
            }

            case "add": {
                let task = new Task(...taskInfo);

                // If we are viewing the starred page, then instantly flag the task as starred so that it loads
                if( viewingTodoList === TodoList.getStarredTodoList() )
                    task.toggleStarred();

                if( viewingTodoList.criterion(task) )
                    viewingTodoList.addTask(task);

                break;
            }
        }

        Page.load();

        elm.reset();
        elm.parentElement.close();
    });

    const show = (button, edit=false) => {
        _activatingButton = button;

        if( edit ) {
            let task = Task.getTasksList()
                    .at(parseInt(button.id.split('-').pop()));

            // modify form default vaues to show what is already set
            formElm.elements["name"].value = task.getName();
            formElm.elements["description"].value = task.getDescription();
            formElm.elements["deadline"].value = formatDatetimeLocal(task.getDeadline());
            formElm.elements["priority"].value = task.getPriority();
            formElm.elements["notes"].textContent = task.getNotes();
        }

        dialogElm.showModal();
    }

    function formatDatetimeLocal(date) {
        const pad = n => String(n).padStart(2, '0');
        return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
    }

    return { show };
})();