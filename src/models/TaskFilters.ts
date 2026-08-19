import type {
    Priority,
    Status
} from "./Task.js";

export interface TaskFilters {
    search?: string;
    status?: Status;
    priority?: Priority;
    assigneeId?: number;
}
