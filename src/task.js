import Project from "./project"

class Task 
{
    static #_tasksCount = 0;
    static #_tasksDone = 0;

    #_title;
    #_description;
    #_deadline;
    #_priority;
    #_notes;
    #_isDone;
    #_project;

    constructor(title, description, deadline, priority, notes) {
        this.#_title = title;
        this.#_description = description;
        this.#_deadline = deadline;
        this.#_priority = priority;
        this.#_notes = notes;
        this.#_isDone = false;
        this.#_project = Project.getDefault();
    }

    isDone = () => this.#_isDone;

    setAsDone = () => {
        this.#_isDone = true;
        this.#_project.increaseDoneTasks();

        Task.#_tasksDone++;
    }

    setAsNotDone = () => {
        this.#_isDone = false;
        this.#_project.decreaseDoneTasks();

        Task.#_tasksDone--;
    }

    static getProgress = () => 100 * Task.#_tasksDone / Task.#_tasksCount;
}