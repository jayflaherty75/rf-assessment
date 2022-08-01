
export const selectTasks = state => state.tasks;

export const selectTasksByListId = (state, listId) => Object.keys(state.tasks)
    .filter(id => state.tasks[id].listId === listId);
