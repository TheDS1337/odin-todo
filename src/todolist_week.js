import TodoList from "./todolist.js";
import { isThisWeek } from "date-fns";

const dayToString = (day) => ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].at(day);

export default class extends TodoList {
    criterion(task) {
        return isThisWeek(task.getDeadline());
    }

    formatDate(date) {
        return `${dayToString(date.getDay())}, at ${date.getHours()}:${date.getMinutes()}`;
    }
};