import { isTaskArray } from "../utils/validators.js";
const STORAGE_KEY = "tasks";
export function saveTasks(tasks) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}
export function loadTasks() {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data === null) {
        return [];
    }
    try {
        const parsed = JSON.parse(data);
        if (!isTaskArray(parsed)) {
            return [];
        }
        return parsed;
    }
    catch {
        return [];
    }
}
