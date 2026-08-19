import type {
    NewTask
} from "./models/Task.js";
import type {
    TaskFilters
} from "./models/TaskFilters.js";

import {
    TaskService
} from "./services/TaskService.js";

import {
    createTask,
    getTasks
} from "./api/taskApi.js";

import {
    renderTasks
} from "./ui/TaskRenderer.js";

import {
    filterTasks
} from "./services/filterTasks.js";

import {
    isPriority,
    isStatus
} from "./utils/validators.js";

const form =
    document.querySelector("#task-form");

const titleInput =
    document.querySelector("#title");

const prioritySelect =
    document.querySelector("#priority");

const taskList =
    document.querySelector("#task-list");

const filterSearchInput =
    document.querySelector("#filter-search");

const filterStatusSelect =
    document.querySelector("#filter-status");

const filterPrioritySelect =
    document.querySelector("#filter-priority");

const filterAssigneeSelect =
    document.querySelector("#filter-assignee");

if (
    !(form instanceof HTMLFormElement) ||
    !(titleInput instanceof HTMLInputElement) ||
    !(prioritySelect instanceof HTMLSelectElement) ||
    !(taskList instanceof HTMLUListElement) ||
    !(filterSearchInput instanceof HTMLInputElement) ||
    !(filterStatusSelect instanceof HTMLSelectElement) ||
    !(filterPrioritySelect instanceof HTMLSelectElement) ||
    !(filterAssigneeSelect instanceof HTMLSelectElement)
) {
    throw new Error(
        "Impossible d'initialiser l'application."
    );
}

const taskForm: HTMLFormElement = form;
const taskTitleInput: HTMLInputElement = titleInput;
const taskPrioritySelect: HTMLSelectElement = prioritySelect;
const taskListElement: HTMLUListElement = taskList;
const searchInput: HTMLInputElement = filterSearchInput;
const statusSelect: HTMLSelectElement = filterStatusSelect;
const taskPriorityFilter: HTMLSelectElement = filterPrioritySelect;
const assigneeSelect: HTMLSelectElement = filterAssigneeSelect;

function getFilters(): TaskFilters {
    const status =
        isStatus(statusSelect.value)
            ? statusSelect.value
            : undefined;

    const priority =
        isPriority(taskPriorityFilter.value)
            ? taskPriorityFilter.value
            : undefined;

    const assigneeId =
        assigneeSelect.value
            ? Number(assigneeSelect.value)
            : undefined;

    return {
        search: searchInput.value,
        status,
        priority,
        assigneeId
    };
}

function refreshTasks(
    taskService: TaskService
): void {
    const tasks =
        filterTasks(
            taskService.getAll(),
            getFilters()
        );

    renderTasks(
        tasks,
        taskListElement
    );
}

async function handleSubmit(
    event: SubmitEvent,
    taskService: TaskService
): Promise<void> {
    event.preventDefault();

    const title =
        taskTitleInput.value.trim();

    const priority =
        taskPrioritySelect.value;

    if (title === "") {
        return;
    }

    if (!isPriority(priority)) {
        return;
    }

    const task: NewTask = {
        title,
        status: "todo",
        priority
    };

    const result =
        await createTask(task);

    if (result.success) {
        taskService.add(result.data);

        refreshTasks(taskService);

        taskForm.reset();
    } else {
        console.error(result.error);
    }
}

async function init(): Promise<void> {
    const result =
        await getTasks();

    if (result.success) {
        const taskService =
            new TaskService(result.data);

        for (const task of taskService.getAll()) {
            if (!task.assignee) {
                continue;
            }

            if (
                assigneeSelect.querySelector(
                    `option[value="${task.assignee.id}"]`
                )
            ) {
                continue;
            }

            const option =
                document.createElement("option");

            option.value =
                String(task.assignee.id);
            option.textContent =
                `${task.assignee.firstname} ${task.assignee.lastname}`;

            assigneeSelect.appendChild(option);
        }

        refreshTasks(taskService);

        taskForm.addEventListener(
            "submit",
            event => {
                void handleSubmit(
                    event,
                    taskService
                );
            }
        );

        searchInput.addEventListener(
            "input",
            () => refreshTasks(taskService)
        );

        statusSelect.addEventListener(
            "change",
            () => refreshTasks(taskService)
        );

        taskPriorityFilter.addEventListener(
            "change",
            () => refreshTasks(taskService)
        );

        assigneeSelect.addEventListener(
            "change",
            () => refreshTasks(taskService)
        );
    } else {
        console.error(result.error);
    }
}

void init();
