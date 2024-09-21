import deleteIcon from "./icons/delete.svg";
import "./styles.css";
import { Subtask } from "./tasks";
import { renderProjects, renderTasks, currentPrId } from "./ui";
import { saveProjects, loadProjects } from "./storage";
import { defaultData } from "./default.js";

export let projects = loadProjects(); // Load projects from local storage


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

if (projects.projects.length === 0) {
    // No projects in local storage, initialize with default data
    projects = defaultData();
    saveProjects(projects);  // Save default data to local storage
}

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
    renderTasks(project, projects);
    saveProjects(projects);
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
    saveProjects(projects);
});

addSubtaskBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const stDiv = document.createElement("div");
    stDiv.innerHTML = `
    <input class="input-subtask" type="text">
    <button type="button"><img src="${deleteIcon}" alt="Delete" width="20px" height="20px"/></button>
`;
    const stDelBtn = stDiv.children[1];
    stDelBtn.addEventListener("click", () => stDiv.remove());
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
    renderTasks(project, projects);
    saveProjects(projects);
});

renderProjects(projects);
if (projects.projects.length > 0) {
    renderTasks(projects.projects[0], projects);
}
