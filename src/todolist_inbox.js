import TodoList from "./todolist.js"

export default class extends TodoList {
    constructor(name) {
        super(name);
        TodoList.setInboxTodoList(this);
    }
};