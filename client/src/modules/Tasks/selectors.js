
const filterTaskIdsInList = listId => task => task.listId === listId;
const sortKeysDesc = (task1, task2) => task2.order - task1.order;
const mapTasksToArray = (tasks, listId) => Object.values(tasks)
        .filter(filterTaskIdsInList(listId))
        .sort(sortKeysDesc);

export const selectTasks = state => state.tasks;

export const selectTasksByListId = (state, listId) => Object.keys(state.tasks)
    .filter(id => state.tasks[id].listId === listId);

export const selectOrderedTasks = (state, listId) => mapTasksToArray(state.tasks, listId);
