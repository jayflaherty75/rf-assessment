import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const topicsReducer = createSlice({
    name: 'topics',
    initialState,
    reducers: {
      create: (state, { payload }) => {
        const { id, name } = payload;
        const date = (new Date()).toISOString();

        if (!state[id]) {
          state[id] = {
            id, name,
            created: date,
            updated: date
          };
        }
      },
      update: (state, { payload }) => {
        const { id, name } = payload;
        const date = (new Date()).toISOString();

        state[id].name = name;
        state[id].updated = date;
      },
      delete: (state, { payload }) => {
        const { id } = payload;

        delete state[id];
      }
    }
});

export default topicsReducer.reducer;
