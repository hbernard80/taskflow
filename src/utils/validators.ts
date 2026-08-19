import type {
    Priority,
    Status,
    Task
} from "../models/Task.js";

export function isStatus(
    value: string
): value is Status {
    return (
        value === "todo" ||
        value === "doing" ||
        value === "done"
    );
}

export function isPriority(
    value: string
): value is Priority {
    return (
        value === "low" ||
        value === "normal" ||
        value === "high"
    );
}

export function isTask(
    value: unknown
): value is Task {
    if (
        typeof value !== "object" ||
        value === null
    ) {
        return false;
    }

    const task =
        value as Record<string, unknown>;

    return (
        typeof task.id === "number" &&
        typeof task.title === "string" &&
        (
            task.status === "todo" ||
            task.status === "doing" ||
            task.status === "done"
        ) &&
        (
            task.priority === "low" ||
            task.priority === "normal" ||
            task.priority === "high"
        )
    );
}

export function isTaskArray(
    value: unknown
): value is Task[] {
    return (
        Array.isArray(value) &&
        value.every(isTask)
    );
}
