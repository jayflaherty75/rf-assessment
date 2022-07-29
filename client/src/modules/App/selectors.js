
const selectCurrentTopic = (state) => state.app.topicId;

const selectCurrentList = (state) => state.app.listId;

export {
    selectCurrentTopic,
    selectCurrentList
};
