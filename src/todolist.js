import Task from "./task.js";
import { lightFormat } from "date-fns";

export default class TodoList
{
    static #_inboxTodoList = null;
    static #_starredTodoList = null;
    static #_todoLists = [];

    #_name
    #_tasksList;
    #_tasksCount;
    #_tasksDone;

    constructor(name) {
        this.#_name = name;
        this.#_tasksList = [];
        this.#_tasksCount = 0;
        this.#_tasksDone = 0;

        Task.getTasksList().forEach(task => {
            if( this.criterion(task) )
                this.addTask(task);
        });

        TodoList.#_todoLists.push(this);
    }

    criterion(task) {
        return true;
    }

    isProject(task) {
        return false;
    }

    formatDate(date) {
        return lightFormat(date, 'yyyy-MM-dd');
    }

    addTask(task) {
        if( this.#_tasksList.indexOf(task) !== -1 )
            return;

        this.#_tasksList.push(task);
        this.#_tasksCount++;

        if( TodoList.#_inboxTodoList && this !== TodoList.#_inboxTodoList )
            TodoList.#_inboxTodoList.addTask(task);
    }

    removeTask(task, hard = false) {
        let id = this.#_tasksList.indexOf(task);

        if( id !== -1 ) {
            this.#_tasksList.splice(id, 1);
            this.#_tasksCount--;
        }

        if( hard ) {
            TodoList.#_todoLists.forEach(list => {
                if( list === this )
                    return;
                
                list.removeTask(task);
            });
        }
    }

    getName() {
        return this.#_name;
    }

    getTasksList() {
        return this.#_tasksList;
    }

    increaseDoneTasks() {
        this.#_tasksDone++;
    }

    decreaseDoneTasks() {
        this.#_tasksDone--;
    }

    getProgress() {
        return 100 * this.#_tasksDone / this.#_tasksCount; 
    }
    
    static setInboxTodoList = defList => {
        TodoList.#_inboxTodoList = defList;
    }

    static getStarredTodoList = () => TodoList.#_starredTodoList;
    
    static setStarredTodoList = starredList => {
        TodoList.#_starredTodoList = starredList;
    }

    static getTodoLists = () => TodoList.#_todoLists;
    static findByName = (name) => TodoList.#_todoLists.find(list => list.getName() === name);
}