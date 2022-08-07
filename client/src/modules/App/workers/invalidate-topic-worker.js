import { put, createSelector } from 'modules/App/middleware/workers';
import { selectCurrentTopic } from '../selectors';
import { actionSetTopic } from '../actions';

const getCurrentTopicId = createSelector(selectCurrentTopic);

export const invalidateTopicWorker = async ({ payload }) => {
    const { id } = payload;
    const topicId = getCurrentTopicId();

    id === topicId && await put(actionSetTopic(false));
};
