import { put, createSelector } from 'modules/App/middleware/workers';
import { selectCurrentList } from '../selectors';
import { actionSetList } from '../actions';

const getCurrentListId = createSelector(selectCurrentList);

export const invalidateListWorker = async ({ payload }) => {
    const { id } = payload;
    const listId = getCurrentListId();

    id === listId && await put(actionSetList(false));
};
