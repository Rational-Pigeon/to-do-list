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
        checklist.length > 0 ? this.nextSubtaskId = checklist.at(-1).id + 1 : this.nextSubtaskId = 0;
    }
    addSubtask(title) {
        this.checklist.push(new Subtask(this.nextSubtaskId, title));
        this.nextSubtaskId++;
    }
    removeSubtask(id) {
        this.checklist = this.checklist.filter(subtask => subtask.id !== id);
    }
}
