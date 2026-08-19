export class TaskService {
    tasks;
    constructor(tasks = []) {
        this.tasks = [...tasks];
    }
    add(task) {
        this.tasks.push(task);
    }
    find(id) {
        return this.tasks.find(task => task.id === id);
    }
    update(id, changes) {
        const task = this.find(id);
        if (!task) {
            return;
        }
        Object.assign(task, changes);
    }
    getAll() {
        return [...this.tasks];
    }
}
