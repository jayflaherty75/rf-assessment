
export const selectTopics = state => state.topics;

export const selectTopicName = (state, id) => state.topics[id]?.name;
