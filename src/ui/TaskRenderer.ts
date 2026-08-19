import type {
    Task
} from "../models/Task.js";

export function renderTask(
    task: Task,
    taskList: HTMLUListElement
): void {
    const li =
        document.createElement("li");

    li.textContent =
        `${task.title} — ${task.priority}`;

    taskList.appendChild(li);
}

export function renderTasks(
    tasks: Task[],
    taskList: HTMLUListElement
): void {
    taskList.replaceChildren();

    for (const task of tasks) {
        renderTask(
            task,
            taskList
        );
    }
}
