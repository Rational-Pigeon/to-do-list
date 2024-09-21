import { Projects } from "./project";

export const defaultData = () => {
    const projects = new Projects();

    // Add first project using addProject method
    projects.addProject("Website Redesign");

    // Access the first project and add tasks using addTask method
    const project1 = projects.projects[0];
    project1.addTask("Design Homepage", "Create wireframes and mockups", "2024-10-10", "high", []);
    project1.tasks[0].addSubtask("Create wireframe");
    project1.tasks[0].addSubtask("Design mockup");
    project1.tasks[0].addSubtask("Review with team");

    project1.addTask("Develop Backend", "Implement server-side logic", "2024-10-15", "medium", []);
    project1.tasks[1].addSubtask("Set up database");
    project1.tasks[1].addSubtask("Create API endpoints");
    project1.tasks[1].addSubtask("Test API responses");

    // Add second project using addProject method
    projects.addProject("Mobile App Launch");

    // Access the second project and add tasks using addTask method
    const project2 = projects.projects[1];
    project2.addTask("App Design", "Design app interface", "2024-11-01", "high", []);
    project2.tasks[0].addSubtask("Design login screen");
    project2.tasks[0].addSubtask("Design dashboard");
    project2.tasks[0].addSubtask("Design profile page");

    project2.addTask("API Integration", "Integrate with backend API", "2024-11-05", "medium", []);
    project2.tasks[1].addSubtask("Connect to user API");
    project2.tasks[1].addSubtask("Connect to product API");
    project2.tasks[1].addSubtask("Test data synchronization");

    return projects;
};
