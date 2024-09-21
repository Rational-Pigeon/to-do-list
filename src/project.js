import { Task } from "./tasks.js";

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
        const length = this.tasks.length;
        if (length === 0) {
            this.completionPercent = 0.00;
            return;
        }

        let completedTasks = this.tasks.filter(task => task.complete).length;
        this.completionPercent = ((completedTasks / length) * 100).toFixed(2);
    }
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
