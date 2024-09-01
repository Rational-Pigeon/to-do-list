import { Subtask, Task } from "./tasks.js";
import { Project, Projects } from "./project.js";

let prs = new Projects(0);

prs.addProject(0, "test project");

let pr = prs.projects[0];

pr.addTask(0, "Prepare Project Proposal", "Draft the initial project proposal including objectives, scope, and timeline.", "2024-09-15", "High", [new Subtask(0, "Research background information"), new Subtask(1, "Outline project goals"), new Subtask(2, "Define project scope")]);

pr.addTask(1, "Organize Team Meeting", "Schedule and prepare for the first team meeting to discuss project plans.", "2024-09-20", "Medium", [new Subtask(0, "Set meeting agenda"), new Subtask(1, "Invite team members"), new Subtask(2, "Book conference room")]);

pr.addTask(2, "Develop Initial Wireframes", "Create initial wireframes for the project’s user interface.", "2024-09-25", "High", [new Subtask(0, "Sketch homepage layout"), new Subtask(1, "Design navigation flow"), new Subtask(2, "Review wireframes with the design team")]);


let mytesttask = pr.tasks[0];
console.log(prs);
prs.removeProject(0);
console.log(prs);
