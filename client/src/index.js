import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from 'store';
import App from 'modules/App';
import TopicsPage from 'modules/Topics';
import ListsPage from 'modules/Lists';
import TasksPage from 'modules/Tasks';
import { actionIsOnline } from 'modules/App/actions';
import { actionAlertMessage } from 'modules/Shared/components/Alerts/actions';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
  	<Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<TasksPage />} />
            <Route path="lists" element={<ListsPage />} />
            <Route path="/topics" element={<TopicsPage />} />
            <Route path="*" element={<div>Page not found.</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

serviceWorkerRegistration.register({
  onOffline: () => {
    store.dispatch(actionIsOnline(false));
    store.dispatch(actionAlertMessage('warn', 'You are offline'));
  }
});

reportWebVitals();
