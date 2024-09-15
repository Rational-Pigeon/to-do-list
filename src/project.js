import { Task, Subtask } from "./tasks.js";

export class Project {
    constructor(id, title) {
        this.id = id;
        this.title = title;
        this.nextTaskId = 0;
    }

    tasks = [];

    addTask(title, description, dueDate, priority, checklist) {
        this.tasks.push(new Task(this.nextTaskId, title, description, dueDate, priority, checklist));
        this.nextTaskId++;
    }

    removeTask(id) {
        this.tasks = this.tasks.filter(task => task.id !== id);
    }

    completionPercent = 0;
    updateCompletionPercent() {
        let length = this.tasks.length;
        if (length == 0) { return 0.00 };

        let completeCount = this.tasks.reduce((count, task) => count + (task.complete ? 1 : 0), 0);
        let percent = (completeCount / length) * 100;
        this.completionPercent = +percent.toFixed(2);
    };
}

export class Projects {
    constructor(projects = []) {
        projects.length > 0 ? this.nextPrId = projects.at(-1).id + 1 : this.nextPrId = 0;
        this.projects = projects;
    }

    addProject(title) {
        this.projects.push(new Project(this.nextPrId, title))
        this.nextPrId++;
    }

    removeProject(id) {
        this.projects = this.projects.filter(project => project.id !== id);
    }
}
