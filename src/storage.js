import { Projects, Project } from "./project.js";
import { Task, Subtask } from "./tasks.js";

export function saveProjects(projects) {
    const projectsData = JSON.stringify(projects.projects);
    localStorage.setItem('projects', projectsData);
}

export function loadProjects() {
    const savedProjects = localStorage.getItem('projects');

    if (savedProjects) {
        const parsedProjects = JSON.parse(savedProjects);

        if (Array.isArray(parsedProjects)) {
            const projects = new Projects();

            let highestProjectId = 0;

            parsedProjects.forEach(projectData => {
                const project = new Project(projectData.id, projectData.title);

                // Track the highest project ID
                if (projectData.id > highestProjectId) {
                    highestProjectId = projectData.id;
                }

                let highestTaskId = 0;

                projectData.tasks.forEach(taskData => {
                    const task = new Task(taskData.id, taskData.title, taskData.description, taskData.dueDate, taskData.priority);

                    // Track the highest task ID
                    if (taskData.id > highestTaskId) {
                        highestTaskId = taskData.id;
                    }

                    taskData.checklist.forEach(subtaskData => {
                        const subtask = new Subtask(subtaskData.id, subtaskData.title);
                        subtask.complete = subtaskData.complete;
                        task.checklist.push(subtask);
                    });

                    task.complete = taskData.complete;
                    project.tasks.push(task);
                });

                // After loading all tasks, set the project's nextTaskId to the highest task ID + 1
                project.nextTaskId = highestTaskId + 1;

                projects.projects.push(project);
            });

            // After loading all projects, set the nextPrId to the highest project ID + 1
            projects.nextPrId = highestProjectId + 1;

            return projects;
        } else {
            console.error("Error: Parsed projects data is not an array.");
        }
    }

    return new Projects();
}
