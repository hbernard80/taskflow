"use strict";
/* ------------------------------------
* Etapes 1 à 4
* ------------------------------------
*/
const applicationName = "TaskFlow";
const task = {
    id: 1,
    title: "Apprendre TypeScript",
    description: "Découvrir les objets et les alias de types",
    completed: false
};
// Déclare un tableau d'éléments du type Task
const aTasks = [];
// On met l'objet déjà créé
aTasks.push(task);
aTasks[0].title = "Tâche 1";
// On ajoute 9 tâches
for (let i = 2; i < 11; i++) {
    aTasks.push({
        id: i,
        title: `Tâche ${i}`,
        description: i % 2 === 0 ? `Description de la tâche ${i}` : undefined,
        completed: i % 2 !== 0
    });
}
function addTask(task) {
    aTasks.push(task);
}
console.log(aTasks);
/* Rechercher une tâche existante avec `find()`
const task2: Task = aTasks.find(
    task => task.id === 2
);
*/
// Gérer les tâches inexistantes (union type/undefined)
const foundTask = aTasks.find(task => task.id === 123);
if (foundTask) {
    console.log(task.title);
}
else {
    console.log('Tache non trouvée');
}
// Filtrage (filter retourne un tableau)
// ici les tâches complétées (true)
const aCompletedTasks = aTasks.filter(task => task.completed);
if (aCompletedTasks) {
    console.log(aCompletedTasks);
}
else {
    console.log('Aucune tâche complétée.');
}
// Uniquement les titres
const aTasksTitle = aTasks.map(task => task.title);
console.log(aTasksTitle);
