import { configureStore } from '@reduxjs/toolkit';
import appReducer from 'modules/App/reducer';
import { actionInitialize } from 'modules/App/actions';
import topicsReducer from 'modules/Topics/reducer';
import listsReducer from 'modules/Lists/reducer';
import tasksReducer from 'modules/Tasks/reducer';
import alertsReducer from 'modules/Shared/components/Alerts/reducer';
import * as workers from 'modules/App/middleware/workers';

const reducer = {
    app: appReducer,
    alerts: alertsReducer,
    topics: topicsReducer,
    lists: listsReducer,
    tasks: tasksReducer,
}

const store = configureStore({
    devTools: process.env.NODE_ENV !== 'production',
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
        workers.reduxMiddleware
    )
});

workers.initialize({
    store,
    dispatch: action => store.dispatch(action),
});

store.dispatch(actionInitialize());

export default store;
