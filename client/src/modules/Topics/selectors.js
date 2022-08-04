import { sortByUpdated } from 'lib/helpers';

const mapTopicsToArray = topics => sortByUpdated(Object.values(topics));

export const selectTopics = state => state.topics;

export const selectTopicName = (state, id) => state.topics[id]?.name;

export const selectOrderedTopics = state => mapTopicsToArray(state.topics);
