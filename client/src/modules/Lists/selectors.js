import { sortByUpdated } from 'lib/helpers';

const filterListIdsInTopic = (topicId) => list => list.topicId === topicId;
const mapListsToArray = (lists, topicId) => Object.values(lists)
    .filter(filterListIdsInTopic(topicId));

export const selectLists = (state) => state.lists;

export const selectListTitle = (state, id) => state.lists[id]?.title;

export const selectListsByTopicId = (state, topicId) => Object.keys(state.lists)
    .filter(id => state.lists[id].topicId === topicId);

export const selectOrderedLists = (state, topicId) => sortByUpdated(
    mapListsToArray(state.lists, topicId)
);
