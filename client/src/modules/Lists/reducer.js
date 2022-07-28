import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const listsReducer = createSlice({
    name: 'lists',
    initialState,
    reducers: {
      create: (state, { payload }) => {
        const { id, topicId, title } = payload;
        const date = (new Date()).toISOString();

        if (!state[id]) {
          state[id] = {
            id, topicId, title,
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

        state[id].title = title;
        state[id].updated = date;
      },
      /*
      index: (state, { payload }) => {
        const { id } = payload;
        console.log(state.tasks);
        const concatArgs = [
            [],
            ...state.tasks.filter(t => t.listId === id)
        ];
        console.log(concatArgs);
        const allTasks = [].concat.apply(concatArgs);
        console.log(allTasks);
        const superStr = allTasks.join(' ');
        console.log(superStr);
        const wordsOnly = superStr.replace(/[.,;'"]/g).toLowerCase();
        console.log(wordsOnly);
        const keys = Array.from(new Set(wordsOnly.split(' ')));
        console.log(keys);

        state[id].keys = keys;
      },
      */
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
