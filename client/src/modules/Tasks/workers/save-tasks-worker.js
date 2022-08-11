import { createSelector } from 'modules/App/middleware/workers';
import { debounce, delay } from 'lib/helpers';

const selectAllTasks = createSelector(state => state.tasks);

export const saveTasksWorker = debounce(async () => {
    await delay(250);

    localStorage.setItem('tasks', JSON.stringify(selectAllTasks()));
}, 1000);
