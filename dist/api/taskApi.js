import { isTask, isTaskArray } from "../utils/validators.js";
import { apiFetch } from "./apiFetch.js";
const TASKS_URL = "/api/tasks";
export function getTasks() {
    return apiFetch(TASKS_URL, isTaskArray);
}
export function createTask(task) {
    return apiFetch(TASKS_URL, isTask, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(task)
    });
}
export function updateTask(id, changes) {
    return apiFetch(`${TASKS_URL}/${id}`, isTask, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(changes)
    });
}
export async function deleteTask(id) {
    try {
        const response = await fetch(`${TASKS_URL}/${id}`, {
            method: "DELETE"
        });
        if (!response.ok) {
            return {
                success: false,
                error: `HTTP ${response.status}`
            };
        }
        return {
            success: true,
            data: undefined
        };
    }
    catch (error) {
        return {
            success: false,
            error: error instanceof Error
                ? error.message
                : "Une erreur inconnue est survenue."
        };
    }
}
