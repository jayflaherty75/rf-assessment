
const actionListCreate = (id, topicId, title) => ({
    type: 'lists/create',
    payload: { id, topicId, title }
});

const actionListUpdate = (id, title) => ({
    type: 'lists/update',
    payload: { id, title }
});

const actionListArchive = id => ({
    type: 'lists/archive',
    payload: { id }
});

const actionListDelete = id => ({
    type: 'lists/delete',
    payload: { id }
});

export {
    actionListCreate,
    actionListUpdate,
    actionListArchive,
    actionListDelete
}