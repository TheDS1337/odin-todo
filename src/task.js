import TodoList from "./todolist";

export default class Task 
{
    static #_tasksList = [];
    static #_tasksCount = 0;
    static #_tasksDone = 0;

    #_name;
    #_description;
    #_deadline;
    #_priority;
    #_notes;
    #_isStarred;
    #_isDone;
    #_project;

    constructor(name, description, deadline, priority, notes) {
        this.copy(name, description, deadline, priority, notes);

        this.#_isStarred = false;
        this.#_isDone = false;

        Task.#_tasksList.push(this);
    }

    copy(name, description, deadline, priority, notes) {
        this.#_name = name;
        this.#_description = description;
        this.#_deadline = deadline;
        this.#_priority = priority;
        this.#_notes = notes;
        this.#_project = null;
    }

    getName() {
        return this.#_name;
    }

    setname(name) {
        this.#_name = name;
    }

    getDescription() {
        return this.#_description;
    }

    setDescription(description) {
        this.#_description = description;
    }

    getDeadline() {
        return this.#_deadline;
    }

    setDeadline(deadline) {
        this.#_deadline = deadline;
    }

    getPriority() {
        return this.#_priority;
    }

    setPriority(priority) {
        this.#_priority = priority;
    }

    getNotes() {
        return this.#_notes;
    }

    setNotes(notes) {
        this.#_notes = notes;
    }

    isStarred() {
        return this.#_isStarred; 
    }

    toggleStarred() {
        this.#_isStarred = !this.#_isStarred;
    }

    isDone() {
        return this.#_isDone; 
    }

    setAsDone() {
        this.#_isDone = true;
        TodoList.getTodoLists().forEach(list => {
            list.increaseDoneTasks()
        });

        Task.#_tasksDone++;
    }

    setAsNotDone() {
        this.#_isDone = false;
        TodoList.getTodoLists().forEach(list => {
            list.decreaseDoneTasks();
        });

        Task.#_tasksDone--;
    }

    getProject() {
        return this.#_project;
    }

    setProject(project) {
        this.#_project = project;
    }

    static getTasksList = () => Task.#_tasksList;    
    static getProgress = () => 100 * Task.#_tasksDone / Task.#_tasksCount;
}