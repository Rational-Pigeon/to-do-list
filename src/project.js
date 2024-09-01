import { Task, Subtask } from "./tasks.js";

export class Project {
    constructor(id, title) {
        this.id = id;
        this.title = title;
    }

    tasks = [];

    addTask(id, title, description, dueDate, priority, checklist) {
        this.tasks.push(new Task(id, title, description, dueDate, priority, checklist));
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
    constructor(id, projects = []) {
        this.id = id;
        this.projects = projects;
    }

    addProject(id, title) {
        this.projects.push(new Project(id, title))
    }

    removeProject(id) {
        this.projects = this.projects.filter(project => project.id !== id);
    }
}
