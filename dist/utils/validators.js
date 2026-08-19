export function isStatus(value) {
    return (value === "todo" ||
        value === "doing" ||
        value === "done");
}
export function isPriority(value) {
    return (value === "low" ||
        value === "normal" ||
        value === "high");
}
export function isTask(value) {
    if (typeof value !== "object" ||
        value === null) {
        return false;
    }
    const task = value;
    return (typeof task.id === "number" &&
        typeof task.title === "string" &&
        (task.status === "todo" ||
            task.status === "doing" ||
            task.status === "done") &&
        (task.priority === "low" ||
            task.priority === "normal" ||
            task.priority === "high"));
}
export function isTaskArray(value) {
    return (Array.isArray(value) &&
        value.every(isTask));
}
