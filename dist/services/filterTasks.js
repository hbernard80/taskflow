export function filterTasks(tasks, filters) {
    const search = filters.search
        ?.trim()
        .toLowerCase();
    return tasks.filter(task => {
        if (search &&
            !task.title
                .toLowerCase()
                .includes(search)) {
            return false;
        }
        if (filters.status !== undefined &&
            task.status !== filters.status) {
            return false;
        }
        if (filters.priority !== undefined &&
            task.priority !== filters.priority) {
            return false;
        }
        if (filters.assigneeId !== undefined &&
            task.assignee?.id !== filters.assigneeId) {
            return false;
        }
        return true;
    });
}
