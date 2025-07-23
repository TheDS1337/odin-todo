import TodoList from "./todolist.js";
import { isToday } from "date-fns";

export default class extends TodoList {
    criterion(task) {
        return isToday(task.getDeadline());
    }

    formatDate(date) {
        return `${date.getHours()}:${date.getMinutes()}`;
    }
};