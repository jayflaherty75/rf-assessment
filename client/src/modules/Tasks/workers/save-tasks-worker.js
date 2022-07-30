import { createSelector } from 'modules/App/middleware/workers';
import { debounce, delay } from 'lib/helpers';

const selectAllTasks = createSelector(state => state.tasks);

export const saveTasksWorker = debounce(async () => {
    const tasks = selectAllTasks();

    await delay(250);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}, 1000);
