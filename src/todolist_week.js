import TodoList from "./todolist.js"

export default class extends TodoList {
    criterion(task) {
        return false;
    }
};