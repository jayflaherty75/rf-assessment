import { put, createSelector } from 'modules/App/middleware/workers';
import { selectTasksByListId } from '../selectors';
import { actionTaskDelete } from '../actions';

const getTasksByListId = createSelector(selectTasksByListId);

export const taskCleanupWorker = async ({payload}) => {
    const { id } = payload;
    const taskIds = getTasksByListId(id);

    for (let taskId of taskIds) {
        await put(actionTaskDelete(taskId));
    }
};
