export function renderTask(task, taskList) {
    const li = document.createElement("li");
    li.textContent =
        `${task.title} — ${task.priority}`;
    taskList.appendChild(li);
}
export function renderTasks(tasks, taskList) {
    taskList.replaceChildren();
    for (const task of tasks) {
        renderTask(task, taskList);
    }
}
