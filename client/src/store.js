import { configureStore } from '@reduxjs/toolkit';
import appReducer from 'modules/App/reducer';
import topicsReducer from 'modules/Topics/reducer';
import listsReducer from 'modules/Lists/reducer';
import tasksReducer from 'modules/Tasks/reducer';

const reducer = {
    app: appReducer,
    topics: topicsReducer,
    lists: listsReducer,
    tasks: tasksReducer
}

const store = configureStore({
    devTools: process.env.NODE_ENV !== 'production',
    reducer
});

export default store;
