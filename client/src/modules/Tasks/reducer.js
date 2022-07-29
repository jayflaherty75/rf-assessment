import { createSlice } from '@reduxjs/toolkit';

const orderReducer = (acc, task) => task.order > acc ? task.order : acc;

const initialState = {};

const tasksReducer = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
      create: (state, { payload }) => {
        const { id, listId, task } = payload;
        const date = (new Date()).toISOString();
        const order = (Object.values(state).reduce(orderReducer, 0) || 0) + 1;

        if (!state[id]) {
          state[id] = {
            id, listId, task, order,
            isDone: false,
            created: date,
            updated: date
          };
        }
      },
      update: (state, { payload }) => {
        const { id, task } = payload;
        const date = (new Date()).toISOString();

        state[id].task = task;
        state[id].updated = date;
      },
      updateIsDone: (state, { payload }) => {
        const { id, isDone } = payload;
        const date = (new Date()).toISOString();

        state[id].isDone = isDone;
        state[id].updated = date;
      },
      prioritize: (state, { payload }) => {
        const { id } = payload;
        const order = state[id].order;
        const nextId = Object.keys(state).filter(id => state[id].order === order + 1);

        if (nextId) {
          state[nextId].order = order;
          state[id].order = order + 1;
        }
      },
      delete: (state, { payload }) => {
        const { id } = payload;

        delete state[id];
      }
    }
});

export default tasksReducer.reducer;
