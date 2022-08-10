
const selectIsInitialize = (state) => state.app.isInitialized;

const selectCurrentTopic = (state) => state.app.topicId;

const selectCurrentList = (state) => state.app.listId;

export {
    selectIsInitialize,
    selectCurrentTopic,
    selectCurrentList
};
