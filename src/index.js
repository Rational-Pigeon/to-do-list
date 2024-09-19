import "./styles.css";
import { Projects, Project } from "./project.js";
import { Subtask, Task } from "./tasks";
import { renderProjects, renderTasks, currentPrId } from "./ui.js";

export const projects = new Projects();
const prDialog = document.querySelector(".pr-prompt");
const taskDialog = document.querySelector(".task-prompt");
const addPrBtn = document.querySelector(".addpr");
const addTaskBtn = document.querySelector(".addtask-btn");
const prCancelBtn = document.querySelector(".pr-cancel-btn");
const taskCancelBtn = document.querySelector(".task-cancel-btn");
const prForm = document.querySelector(".pr-form");
const taskForm = document.querySelector(".task-form");
const submitPrBtn = document.querySelector(".submit-pr-btn");
const submitTaskBtn = document.querySelector(".submit-task-btn");
const submitPrEditBtn = document.querySelector(".submit-pr-edit-btn");
const cancelPrEditBtn = document.querySelector(".pr-cancel-edit-btn");
const prEditDialog = document.querySelector(".pr-edit-prompt");
const prEditForm = document.querySelector(".pr-edit-form");
const addSubtaskBtn = document.querySelector("#subtask-btn");

addPrBtn.addEventListener("click", () => prDialog.showModal());

prCancelBtn.addEventListener("click", () => {
    prDialog.close()
    prForm.reset();
});

addTaskBtn.addEventListener("click", () => taskDialog.showModal());
taskCancelBtn.addEventListener("click", () => {
    taskDialog.close();
    taskForm.reset();
});

submitPrBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const title = document.querySelector("#pr-name").value;
    projects.addProject(title);
    prDialog.close();
    prForm.reset();
    renderProjects(projects);
    const project = projects.projects.find(p => p.title === title);
    renderTasks(project);
});


cancelPrEditBtn.addEventListener("click", () => {
    prEditDialog.close();
    prEditForm.reset();
});

submitPrEditBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const title = document.querySelector("#new-pr-title").value;
    const id = document.querySelector(".edit-pr-id").value;
    const project = projects.projects.find(p => p.id === parseInt(id));
    project.title = title;
    renderProjects(projects);
    prEditDialog.close();
    prEditForm.reset();
});

addSubtaskBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const stDiv = document.createElement("div");
    stDiv.innerHTML = `
    <input class="input-subtask" type="text">
`;
    taskDialog.appendChild(stDiv);
});

submitTaskBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const project = projects.projects.find(p => p.id === parseInt(currentPrId));
    const title = document.querySelector("#input-title").value;
    const description = document.querySelector("#input-description").value;
    const date = document.querySelector("#input-due").value;
    const priority = document.querySelector("#input-priority").value;
    const subtaskNodes = document.querySelectorAll(".input-subtask");
    const subtasks = [];
    if (!(subtaskNodes.length === 0)) {
        let i = 0;
        for (let element of subtaskNodes) {
            if (element.value) {
                const subtask = new Subtask(i, element.value);
                i++;
                subtasks.push(subtask);
            }
        }
    }


    project.addTask(title, description, date, priority, subtasks);
    taskDialog.close();
    taskForm.reset();
    subtaskNodes.forEach(element => element.remove());
    renderTasks(project);
});

projects.addProject("Website Redesign");
projects.addProject("Mobile App Launch");

const project1 = projects.projects[0];
project1.addTask("Design Homepage", "Create wireframes and mockups", "2024-10-10", "high", []);
project1.tasks[0].addSubtask("Create wireframe");
project1.tasks[0].addSubtask("Design mockup");
project1.tasks[0].addSubtask("Review with team");

project1.addTask("Develop Backend", "Implement server-side logic", "2024-10-15", "medium", []);
project1.tasks[1].addSubtask("Set up database");
project1.tasks[1].addSubtask("Create API endpoints");
project1.tasks[1].addSubtask("Test API responses");

project1.addTask("User Testing", "Conduct testing sessions", "2024-10-20", "low", []);
project1.tasks[2].addSubtask("Create test cases");
project1.tasks[2].addSubtask("Schedule testing sessions");
project1.tasks[2].addSubtask("Analyze feedback");

const project2 = projects.projects[1]
project2.addTask("App Design", "Design app interface", "2024-11-01", "high", []);
project2.tasks[0].addSubtask("Design login screen");
project2.tasks[0].addSubtask("Design dashboard");
project2.tasks[0].addSubtask("Design profile page");

project2.addTask("API Integration", "Integrate with backend API", "2024-11-05", "medium", []);
project2.tasks[1].addSubtask("Connect to user API");
project2.tasks[1].addSubtask("Connect to product API");
project2.tasks[1].addSubtask("Test data synchronization");

project2.addTask("App Testing", "Test on different devices", "2024-11-10", "low", []);
project2.tasks[2].addSubtask("Test on Android");
project2.tasks[2].addSubtask("Test on iOS");
project2.tasks[2].addSubtask("Report bugs");

project1.tasks[1].flipCompletionStatus();
project1.tasks[0].checklist[1].flipCompletionStatus();

renderProjects(projects);
renderTasks(project1);
