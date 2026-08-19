import type { Task } from "../models/Task.js";
import { isTaskArray } from "../utils/validators.js";

const STORAGE_KEY = "tasks";

export function saveTasks(
    tasks: Task[]
): void {
    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(tasks)
    );
}

export function loadTasks(): Task[] {
    const data =
        localStorage.getItem(STORAGE_KEY);

    if (data === null) {
        return [];
    }

    try {
        const parsed: unknown =
            JSON.parse(data);

        if (!isTaskArray(parsed)) {
            return [];
        }

        return parsed;
    } catch {
        return [];
    }
}
