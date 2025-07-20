export default class Project
{
    static #_defaultProject = new Project("Default");
    static #_projectsList = [];

    #_name
    #_tasksList;
    #_tasksCount;
    #_tasksDone;

    constructor(name) {
        this.#_name = name;
        this.#_tasksList = [];
        this.#_tasksCount = 0;
        this.#_tasksDone = 0;

        Project.#_projectsList.push(this);
    }

    addTask = (task) => {
        this.#_tasksList.push(task);
        this.#_tasksCount++;
    }

    increaseDoneTasks = () => {
        this.#_tasksDone++;
    }

    decreaseDoneTasks = () => {
        this.#_tasksDone--;
    }

    getProgress = () => 100 * this.#_tasksDone / this.#_tasksCount;

    static getDefault = () => Project.#_defaultProject;
    static getProjectsList = () => Project.#_projectsList;
}