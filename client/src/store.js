import { configureStore } from '@reduxjs/toolkit';
import appReducer from 'modules/App/reducer';
import topicsReducer from 'modules/Topics/reducer';
import listsReducer from 'modules/Lists/reducer';
import tasksReducer from 'modules/Tasks/reducer';
import * as workers from 'modules/App/middleware/workers';

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
        workers.reduxMiddleware
    )
});

workers.initialize({
    getState: () => store.getState(),
    dispatch: action => store.dispatch(action),
});

store.dispatch({ type: 'app/initialize' });

export default store;
