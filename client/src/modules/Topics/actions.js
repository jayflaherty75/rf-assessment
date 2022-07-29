
const actionTopicCreate = (id, name) => ({
    type: 'topics/create',
    payload: { id, name }
});

const actionTopicUpdate = (id, name) => ({
    type: 'topics/update',
    payload: { id, name }
});

const actionTopicDelete = id => ({
    type: 'topics/delete',
    payload: { id }
});

export {
    actionTopicCreate,
    actionTopicUpdate,
    actionTopicDelete
}