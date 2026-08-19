import type {
    Task,
    TaskChanges
} from "../models/Task.js";


export class TaskService {
    private readonly tasks: Task[];

    constructor(tasks: Task[] = []) {
        this.tasks = [...tasks];
    }

    add(task: Task): void {
        this.tasks.push(task);
    }

    find(id: number): Task | undefined {
        return this.tasks.find(
            task => task.id === id
        );
    }

    update(
        id: number,
        changes: TaskChanges
    ): void {
        const task =
            this.find(id);

        if (!task) {
            return;
        }

        Object.assign(
            task,
            changes
        );
    }

    getAll(): Task[] {
        return [...this.tasks];
    }
}
