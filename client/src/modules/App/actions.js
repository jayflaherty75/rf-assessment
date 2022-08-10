
const actionInitialize = () => ({
    type: 'app/initialize'
});

const actionIsOnline = isOnline => ({
    type: 'app/isOnline',
    payload: isOnline,
});

const actionSetTopic = id => ({
    type: 'app/setTopic',
    payload: { id }
});

const actionSetList = id => ({
    type: 'app/setList',
    payload: { id }
});

export {
    actionInitialize,
    actionIsOnline,
    actionSetTopic,
    actionSetList
};
