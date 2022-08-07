import { createSlice } from '@reduxjs/toolkit';
import './workers';

const initialState = JSON.parse(localStorage.getItem('topics')) || {
  DEFAULT: {
    id: 'DEFAULT',
    name: 'General',
    created: '1970-01-01T00:00:00.000Z',
    updated: '1970-01-01T00:00:00.000Z'
  }
};

const topicsReducer = createSlice({
    name: 'topics',
    initialState,
    reducers: {
      create: (state, { payload }) => {
        const { id, name } = payload;
        const date = (new Date()).toISOString();

        if (!state[id]) {
          state[id] = {
            id,
            name: name.trim(),
            created: date,
            updated: date
          };
        }
      },
      update: (state, { payload }) => {
        const { id, name } = payload;
        const date = (new Date()).toISOString();

        state[id].name = name.trim();
        state[id].updated = date;
      },
      delete: (state, { payload }) => {
        const { id } = payload;

        delete state[id];
      }
    }
});

export default topicsReducer.reducer;
