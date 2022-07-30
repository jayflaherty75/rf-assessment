import { createSelector } from 'modules/App/middleware/workers';
import { debounce, delay } from 'lib/helpers';

const selectAllTopics = createSelector(state => state.topics);

export const saveTopicsWorker = debounce(async () => {
    const topics = selectAllTopics();

    await delay(250);

    localStorage.setItem('topics', JSON.stringify(topics));
}, 1000);
