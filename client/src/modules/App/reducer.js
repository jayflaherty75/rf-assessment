import { createSlice } from '@reduxjs/toolkit';
import './workers';

const initialState = {
  isInitialized: false,
  isOnline: false,
  topicId: 'DEFAULT',
  listId: 'DEFAULT'
};

const appReducer = createSlice({
    name: 'app',
    initialState,
    reducers: {
      initialize: state => {
        state.isInitialized = true;
        state.isOnline = window.navigator.onLine;
      },
      isOnline: (state, { payload }) => {
        state.isOnline = payload;
      },
      setTopic: (state, action) => {
        state.topicId = action.payload.id
      },
      setList: (state, action) => {
        state.listId = action.payload.id
      }
    }
});

export default appReducer.reducer;
