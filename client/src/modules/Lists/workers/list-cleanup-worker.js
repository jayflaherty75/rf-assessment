import { put, createSelector } from 'modules/App/middleware/workers';
import { selectListsByTopicId } from '../selectors';
import { actionListDelete } from '../actions';

const getListsByTopicId = createSelector(selectListsByTopicId);

export const listCleanupWorker = async ({payload}) => {
    const { id } = payload;
    const listIds = getListsByTopicId(id);

    for (let listId of listIds) {
        await put(actionListDelete(listId));
    }
};
