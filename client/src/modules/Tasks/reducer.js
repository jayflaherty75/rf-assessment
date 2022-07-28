import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const tasksReducer = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
      create: (state, { payload }) => {
        const { id, listId, task } = payload;
        const date = (new Date()).toISOString();

        if (!state[id]) {
          state[id] = {
            id, listId, task,
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
      delete: (state, { payload }) => {
        const { id } = payload;

        delete state[id];
      }
    }
});

export default tasksReducer.reducer;
