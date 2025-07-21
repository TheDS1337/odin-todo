import Project from "./project.js"

export default class Task 
{
    static #_tasksCount = 0;
    static #_tasksDone = 0;

    #_name;
    #_description;
    #_deadline;
    #_priority;
    #_notes;
    #_isDone;
    #_project;

    constructor(name, description, deadline, priority, notes) {
        this.#_name = name;
        this.#_description = description;
        this.#_deadline = deadline;
        this.#_priority = priority;
        this.#_notes = notes;
        this.#_isDone = false;
        this.#project = Project.getDefault();
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

    isDone() {
        return this.#_isDone; 
    }

    setAsDone() {
        this.#_isDone = true;
        this.#_project.increaseDoneTasks();

        Task.#_tasksDone++;
    }

    setAsNotDone() {
        this.#_isDone = false;
        this.#_project.decreaseDoneTasks();

        Task.#_tasksDone--;
    }

    get #project() {
        return this._project;
    }

    set #project(_project) {
        if( this.#_project )
            this.#_project.removeTask(this);
        
        this.#_project = _project;
        this.#_project.addTask(this);
    }

    static getProgress = () => 100 * Task.#_tasksDone / Task.#_tasksCount;
}