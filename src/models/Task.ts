import type { User } from "./User.js";

export type Status =
    "todo" |
    "doing" |
    "done";

export type Priority =
    "low" |
    "normal" |
    "high";

export type Task = {
    readonly id: number;
    title: string;
    description?: string;
    status: Status;
    priority: Priority;
    assignee?: User;
};

export type NewTask =
    Omit<Task, "id">;

export type TaskChanges =
    Partial<
        Omit<Task, "id">
    >;

export type TaskSummary =
    Pick<
        Task,
        "id" | "title" | "status"
    >;

export type ReadonlyTask =
    Readonly<Task>;
