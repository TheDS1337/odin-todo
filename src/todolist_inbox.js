import TodoList from "./todolist.js"
import Task from "./task.js"

export default class extends TodoList {
    constructor(name) {
        super(name);
        TodoList.setDefault(this);

        Task.getTasksList().forEach(task => {
            this.addTask(task);
        });
    }
};