
export const selectLists = (state) => state.lists;

export const selectListTitle = (state, id) => state.lists[id]?.title;

export const selectListsByTopicId = (state, topicId) => Object.keys(state.lists)
    .filter(id => state.lists[id].topicId === topicId);
