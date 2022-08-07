import { createSlice } from '@reduxjs/toolkit';
import './workers';

const maxOrderReducer = (acc, task) => task.order > acc ? task.order : acc;

const getNextInOrder = (state, order) => Object.keys(state).filter(id => state[id].order === order + 1);

const swapOrder = (task1, task2, temp = task1.order) => {
  task1.order = task2.order;
  task2.order = temp;
};

const reorderTasksAsc = (tasks, listId) => Object.keys(tasks)
  .filter(id => tasks[id].listId === listId)
  .sort((id1, id2) => tasks[id1].order - tasks[id2].order);

const initialState = JSON.parse(localStorage.getItem('tasks')) || {
  DEFAULT: {
    id: 'DEFAULT',
    listId: 'DEFAULT',
    task: 'Call Mom',
    order: 1,
    isDone: false,
    created: '1970-01-01T00:00:00.000Z',
    updated: '1970-01-01T00:00:00.000Z'
  }
};

const tasksReducer = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
      create: (state, { payload }) => {
        const { id, listId, task } = payload;
        const date = (new Date()).toISOString();
        const order = (Object.values(state).reduce(maxOrderReducer, 0) || 0) + 1;

        if (!state[id]) {
          state[id] = {
            id, listId, order,
            task: task.trim(),
            isDone: false,
            created: date,
            updated: date
          };
        }
      },
      update: (state, { payload }) => {
        const { id, task } = payload;
        const date = (new Date()).toISOString();

        state[id].task = task.trim();
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
        const nextId = getNextInOrder(state, state[id].order);

        nextId && swapOrder(state[id], state[nextId]);
      },
      delete: (state, { payload }) => {
        const { id } = payload;
        const { listId } = state[id];

        delete state[id];

        reorderTasksAsc(state, listId).forEach((id, index) => {
          state[id].order = index + 1;
        });
      }
    }
});

export default tasksReducer.reducer;
