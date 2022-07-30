import { createSelector } from 'modules/App/middleware/workers';
import { debounce, delay } from 'lib/helpers';

const selectAllLists = createSelector(state => state.lists);

export const saveListsWorker = debounce(async () => {
    const lists = selectAllLists();

    await delay(250);

    localStorage.setItem('lists', JSON.stringify(lists));
}, 1000);
