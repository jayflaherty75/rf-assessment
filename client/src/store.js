import { configureStore } from '@reduxjs/toolkit';
import appReducer from 'modules/App/reducer';
import topicsReducer from 'modules/Topics/reducer';
import listsReducer from 'modules/Lists/reducer';
import tasksReducer from 'modules/Tasks/reducer';
import workersMiddleware, { initializeWorkers } from 'modules/App/middleware/workers';

const reducer = {
    app: appReducer,
    topics: topicsReducer,
    lists: listsReducer,
    tasks: tasksReducer
}

const store = configureStore({
    devTools: process.env.NODE_ENV !== 'production',
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
        workersMiddleware
    )
});

initializeWorkers(store);

store.dispatch({ type: 'app/initialize' });

export default store;
