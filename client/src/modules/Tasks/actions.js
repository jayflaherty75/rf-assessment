
const actionTaskCreate = (id, listId, task) => ({
    type: 'tasks/create',
    payload: { id, listId, task }
});

const actionTaskUpdate = (id, task) => ({
    type: 'tasks/update',
    payload: { id, task }
});

const actionTaskUpdateIsDone = (id, isDone) => ({
    type: 'tasks/updateIsDone',
    payload: { id, isDone }
});

const actionTaskPrioritize = id => ({
    type: 'tasks/prioritize',
    payload: { id }
});

const actionTaskDelete = id => ({
    type: 'tasks/delete',
    payload: { id }
});

export {
    actionTaskCreate,
    actionTaskUpdate,
    actionTaskUpdateIsDone,
    actionTaskPrioritize,
    actionTaskDelete
}