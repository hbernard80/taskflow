"use strict";
/* ------------------------------------
* Etape 5 : Statuts et priorités
* -------------------------------------
*/
const applicationName = "TaskFlow";
// Première tâche
const task = {
    id: 1,
    title: "Tâche 1",
    description: "Description de la tâche 1",
    status: "todo",
    priority: "normal"
};
// Tableau contenant uniquement des Task
const aTasks = [];
// Ajout de la première tâche
aTasks.push(task);
// On ajoute 9 tâches supplémentaires
for (let i = 2; i <= 10; i++) {
    // On crée d'abord une tâche valide.
    // On ne met pas description: undefined,
    // car avec certaines configurations strictes,
    // une propriété optionnelle doit être absente
    // plutôt que présente avec la valeur undefined.
    const newTask = {
        id: i,
        title: `Tâche ${i}`,
        status: 'todo',
        priority: 'normal'
    };
    // On ajoute la propriété description uniquement
    // pour les identifiants pairs.
    if (i % 2 === 0) {
        newTask.description = `Description de la tâche ${i}`;
    }
    aTasks.push(newTask);
}
// On modifie des statuts et priorités pour le jeu de test
aTasks[2].status = 'done';
aTasks[3].priority = 'high';
aTasks[4].priority = 'low';
aTasks[5].status = 'done';
aTasks[8].status = 'doing';
aTasks[9].priority = 'low';
console.log(aTasks);
function addTask(task) {
    aTasks.push(task);
}
// fonction de l'étape 9 
function isPriority(value) {
    return (value === "low" ||
        value === "normal" ||
        value === "high");
}
function changeStatus(task, status) {
    task.status = status;
}
const task9 = aTasks.find(task => task.id === 9);
if (task9) {
    changeStatus(task9, "done");
}
console.log(aTasks);
/* ------------------------------------
* Etape 6 : Statuts et priorités
* -------------------------------------
*/
function completeTask(task) {
    return {
        ...task,
        status: "done"
    };
}
function getTasksByStatus(aTasks, status) {
    return aTasks.filter(task => task.status === status);
}
function findTask(aTasks, id) {
    return aTasks.find(task => task.id === id);
}
// Cherche la tâche 2 dans aTasks 
const task_e6 = findTask(aTasks, 2);
// Test anti undefined
if (task_e6) {
    const completedTask = completeTask(task_e6);
    console.log(completedTask);
}
else {
    console.log("Tâche introuvable");
}
const todoTasks = getTasksByStatus(aTasks, "todo");
console.log(todoTasks);
const user_1 = {
    id: 1,
    firstname: "Dave",
    lastname: "Loper",
    email: "dave.loper@example.com"
};
const task_11 = {
    id: 11,
    title: "Apprendre les interfaces",
    status: "doing",
    priority: "high",
    assignee: user_1
};
/*
if (task.assignee) {
    console.log(task.assignee.email);
} else {
    console.log('Aucune tâche assignée pour l\'utilisateur 1')
}
*/
// optional chaining avec '?.' remplace le bloc précédent
console.log(task_11.assignee?.email);
function assignTask(task, user) {
    return {
        ...task,
        assignee: user_1
    };
}
const assignedTask = assignTask(task_11, user_1);
console.log(assignedTask.assignee?.email);
/* ------------------------------------
* Etape 8 : Passage au DOM
* -------------------------------------
*/
const form = document.querySelector("#task-form");
const titleInput = document.querySelector("#title");
const taskList = document.querySelector("#task-list");
/* remplacé à l'étape 9
* // narrowing
if (form instanceof HTMLFormElement &&
    titleInput instanceof HTMLInputElement &&
    taskList instanceof HTMLUListElement)
{
    form.addEventListener("submit",
        (event) => {
            event.preventDefault();
            console.log(titleInput.value);
        }
    );
}
*/
/* ------------------------------------
* Etape 9 : Formulaire de création d'une tâche
* -------------------------------------
*/
const prioritySelect = document.querySelector("#priority");
if (!(form instanceof HTMLFormElement) ||
    !(titleInput instanceof HTMLInputElement) ||
    !(prioritySelect instanceof HTMLSelectElement) ||
    !(taskList instanceof HTMLUListElement)) {
    throw new Error("Impossible d'initialiser le formulaire.");
}
const handleSubmit = (event) => {
    event.preventDefault();
    const title = titleInput.value.trim();
    const priority = prioritySelect.value;
    if (title === "") {
        return;
    }
    if (!isPriority(priority)) {
        return;
    }
    const task = {
        id: Date.now(),
        title,
        status: "todo",
        priority
    };
    addTask(task);
    const li = document.createElement("li");
    li.textContent = `${task.title} — ${task.priority}`;
    taskList.appendChild(li);
    form.reset();
};
form.addEventListener("submit", handleSubmit);
