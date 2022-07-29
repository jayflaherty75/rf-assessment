
const actionSetTopic = id => ({
    type: 'app/setTopic',
    payload: { id }
});

const actionSetList = id => ({
    type: 'app/setList',
    payload: { id }
});

export {
    actionSetTopic,
    actionSetList
};
