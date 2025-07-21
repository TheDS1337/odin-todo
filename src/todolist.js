export default class TodoList
{
    static #_defaultTodoList = null;
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

//        TodoList.#_todoLists.push(this);
    }

    addTask(task) {
        this.#_tasksList.push(task);
        this.#_tasksCount++;
    }

    removeTask(task) {
        let id = this.#_tasksList.indexOf(task);

        if( id !== -1 ) {
            this.#_tasksList.splice(id, 1);
            this.#_tasksCount--;
        }
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

    static getDefault = () => TodoList.#_defaultTodoList;
    static setDefault = (defList) => {
        TodoList.#_defaultTodoList = defList;
    }

    static getProjectsList = () => TodoList.#_todoLists;
}