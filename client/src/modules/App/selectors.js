
const selectIsInitialized = (state) => state.app.isInitialized;

const selectIsOnline = (state) => state.app.isOnline;

const selectCurrentTopic = (state) => state.app.topicId;

const selectCurrentList = (state) => state.app.listId;

export {
    selectIsInitialized,
    selectIsOnline,
    selectCurrentTopic,
    selectCurrentList
};
