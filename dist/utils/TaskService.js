export function addTask(tasks, task) {
    tasks.push(task);
}
export function completeTask(task) {
    return {
        ...task,
        status: "done"
    };
}
export function getTasksByStatus(tasks, status) {
    return tasks.filter(task => task.status === status);
}
export function findTask(tasks, id) {
    return tasks.find(task => task.id === id);
}
