import TodoList from "./todolist.js"
import Task from "./task.js"

export default class extends TodoList {
    constructor(name) {
        super(name);
        TodoList.setStarredTodoList(this);
    }

    criterion(task) {
        return task.isStarred();
    }
};