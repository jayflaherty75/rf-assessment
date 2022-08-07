import { createSlice } from '@reduxjs/toolkit';
import './workers';

const initialState = JSON.parse(localStorage.getItem('lists')) || {
  DEFAULT: {
    id: 'DEFAULT',
    topicId: 'DEFAULT',
    title: 'Reminders',
    keys: [],
    isArchived: false,
    created: '1970-01-01T00:00:00.000Z',
    updated: '1970-01-01T00:00:00.000Z'
  }
};

const listsReducer = createSlice({
    name: 'lists',
    initialState,
    reducers: {
      create: (state, { payload }) => {
        const { id, topicId, title } = payload;
        const date = (new Date()).toISOString();

        if (!state[id]) {
          state[id] = {
            id, topicId,
            title: title.trim(),
            keys: [],
            isArchived: false,
            created: date,
            updated: date
          };
        }
      },
      update: (state, { payload }) => {
        const { id, title } = payload;
        const date = (new Date()).toISOString();

        state[id].title = title.trim();
        state[id].updated = date;
      },
      archive: (state, { payload }) => {
        const { id } = payload;
        const date = (new Date()).toISOString();

        state[id].isArchived = true;
        state[id].updated = date;
      },
      delete: (state, { payload }) => {
        const { id } = payload;

        delete state[id];
      }
    }
});

export default listsReducer.reducer;
