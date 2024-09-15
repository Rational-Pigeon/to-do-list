import "./styles.css";
import { Projects } from "./project.js";

const prDialog = document.querySelector(".pr-prompt");
const taskDialog = document.querySelector(".task-prompt");
const addPrBtn = document.querySelector(".addpr");
const addTaskBtn = document.querySelector(".addtask-btn");
const prCancelBtn = document.querySelector(".pr-cancel-btn");
const taskCancelBtn = document.querySelector(".task-cancel-btn");
const prForm = document.querySelector(".pr-form");
const taskForm = document.querySelector(".task-form");


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

