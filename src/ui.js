import deleteIcon from "./icons/delete.svg";
import editIcon from "./icons/edit.svg";
import { saveProjects } from "./storage.js";

export let currentPrId;
const projectsDiv = document.querySelector(".projects");
const prEditDialog = document.querySelector(".pr-edit-prompt");
const prTitle = document.querySelector("#pr-title");
const tasksDiv = document.querySelector(".tasks");

export function clearElementsByClass(parentDiv, className) {
    const elements = parentDiv.querySelectorAll(`.${className}`);
    if (elements.length > 0) {
        elements.forEach(element => element.remove());
    }
}


export function renderProjects(projects) {
    clearElementsByClass(projectsDiv, "project");
    for (let project of projects.projects) {
        const prDiv = document.createElement("div");
        prDiv.classList.add("project");
        project.updateCompletionPercent();
        prDiv.innerHTML = `
    <div class="pr-left">
        <p class="project-name">${project.title}</p>
        <div class="progress-bar">
            <div class="progress" style="width: ${project.completionPercent}%;"></div>
            <span class="progress-text">${project.completionPercent}%</span>
        </div>
    </div>
    <div class="pr-btns">
        <button class="icn editBtn"><img src="${editIcon}" alt="Edit" width="20px" height="20px"></button>
        <button class="icn deleteBtn"><img src="${deleteIcon}" alt="Delete" width="20px" height="20px"></button>
    </div>
`;

        const editBtn = prDiv.querySelector(".editBtn");
        const deleteBtn = prDiv.querySelector(".deleteBtn");
        const prTitle = prDiv.querySelector(".project-name");


        editBtn.classList.add("editBtn");
        deleteBtn.classList.add("deleteBtn");

        deleteBtn.addEventListener("click", () => {
            projects.removeProject(project.id)
            renderProjects(projects)
            saveProjects(projects);
        });

        editBtn.addEventListener("click", () => {
            document.querySelector('.edit-pr-id').value = project.id;
            document.querySelector("#new-pr-title").value = project.title;
            prEditDialog.showModal()
        });

        prTitle.addEventListener("click", () => { // To render tasks when clicking on project name
            renderTasks(project, projects);
            currentPrId = project.id;
        }
        );


        projectsDiv.appendChild(prDiv);
    }
}

export function renderTasks(project, projects) {
    clearElementsByClass(tasksDiv, "task-container")
    prTitle.textContent = project.title;
    currentPrId = project.id;

    if (!(project.tasks.length === 0)) {
        for (let task of project.tasks) {
            const container = document.createElement("div");
            container.classList.add("task-container");
            container.innerHTML = `
        <div class="todo-item">
            <input type="checkbox" class="custom-checkbox" ${task.complete ? "checked" : ""}>
            <input type="text" class="task-title" value="${task.title}">
            <div class="arrow">&#9662;</div> <!-- Downward arrow -->
        </div>
        <div class="more-info">
            <textarea class="description" rows="3" cols="20">${task.description}</textarea>
            <div class="subtasks"></div>
        </div>`

            const todoItem = container.querySelector(".todo-item");
            const prioritySelect = createPriorityElement(task.priority);
            const dateInput = document.createElement("input");
            const title = todoItem.querySelector(".task-title");
            const moreInfo = container.querySelector(".more-info");
            const description = moreInfo.querySelector(".description");
            const subtasksDiv = moreInfo.querySelector(".subtasks");
            const arrow = todoItem.querySelector(".arrow");
            const deleteTaskButton = document.createElement("button");
            deleteTaskButton.classList.add("icn");
            deleteTaskButton.innerHTML = `<img src="${deleteIcon}" alt="Delete" width="20px" height="20px"/>`;

            todoItem.appendChild(prioritySelect);
            dateInput.type = "date";
            dateInput.value = task.dueDate;
            todoItem.appendChild(dateInput);
            todoItem.appendChild(deleteTaskButton);

            renderSubtasks(task, subtasksDiv, projects);

            arrow.addEventListener("click", () => {
                if (moreInfo.style.display === 'none' || moreInfo.style.display === '') {
                    moreInfo.style.display = 'block';
                    arrow.innerHTML = '&#9652;'; // Change to upward arrow when expanded
                } else {
                    moreInfo.style.display = 'none';
                    arrow.innerHTML = '&#9662;'; // Change to downward arrow when collapsed
                }
            });

            const checkbox = todoItem.querySelector(".custom-checkbox");

            checkbox.addEventListener("change", () => {
                task.complete = checkbox.checked;

                if (checkbox.checked) {
                    container.style.order = "2";
                    container.style.backgroundColor = "rgba(128, 128, 128)";
                    container.querySelector("textarea").style.backgroundColor = "rgba(128, 128, 128)";

                } else {
                    container.style.order = "0";
                    container.style.backgroundColor = "";
                    container.querySelector("textarea").style.backgroundColor = "";
                }

                project.updateCompletionPercent();
                renderProjects(projects);
                saveProjects(projects);
            });

            title.addEventListener("input", () => {
                task.title = title.value
                saveProjects(projects);
            });
            prioritySelect.addEventListener("change", () => {
                task.priority = prioritySelect.value
                saveProjects(projects);
            });
            dateInput.addEventListener("input", () => {
                task.dueDate = dateInput.value;
                saveProjects(projects);
            });
            description.addEventListener("input", () => {
                task.description = description.value
                saveProjects(projects);
            });
            deleteTaskButton.addEventListener("click", () => {
                project.removeTask(task.id);
                renderTasks(project, projects);
                saveProjects(projects);
            });

            tasksDiv.appendChild(container);
        }
    }
}

function createPriorityElement(priority) {
    const prioritySelect = document.createElement("select");
    prioritySelect.innerHTML = `
                <select>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
        </select>

                `
    for (let i = 0; i < prioritySelect.options.length; i++) {
        if (prioritySelect.options[i].value === priority) {
            prioritySelect.options[i].selected = true;
        }
    }
    return prioritySelect;
}

function renderSubtasks(task, container, projects) {
    for (let subtask of task.checklist) {
        const stContainer = document.createElement("div");
        stContainer.classList.add("st-container");
        stContainer.innerHTML = `
            <input type="checkbox" class="custom-checkbox" ${(subtask.complete || task.complete) ? "checked" : ""}>
            <input type="text" class="subtask-title" value="${subtask.title}">
            <button type="button" class="icn subtask-del-btn">
                <img src="${deleteIcon}" alt="Delete" width="20px" height="20px"/>
            </button>`
        const subtaskDelBtn = stContainer.querySelector(".subtask-del-btn");
        subtaskDelBtn.addEventListener("click", () => {
            task.removeSubtask(subtask.id)
            clearElementsByClass(container, "st-container");
            renderSubtasks(task, container, projects);
            saveProjects(projects);
        });
        container.appendChild(stContainer);
    }

}
