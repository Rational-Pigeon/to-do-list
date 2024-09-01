export class Subtask {
    constructor(id, title) {
        this.id = id;
        this.title = title;
    }

    complete = false;

    flipCompletionStatus() {
        this.complete = !this.complete;
    }
};

export class Task extends Subtask {
    constructor(id, title, description = "", dueDate, priority = "unspecifed", checklist = []) {
        super(id, title);
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.checklist = checklist;
    }
    addSubtask(subtaskId, title) {
        this.checklist.push(new Subtask(subtaskId, title));
    }
    removeSubtask(id) {
        this.checklist = this.checklist.filter(subtask => subtask.id !== id);
    }
}
