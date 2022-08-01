import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    topicId: 'DEFAULT',
    listId: 'DEFAULT'
};

const appReducer = createSlice({
    name: 'app',
    initialState,
    reducers: {
      initialize: state => state,
      setTopic: (state, action) => {
        state.topicId = action.payload.id
      },
      setList: (state, action) => {
        state.listId = action.payload.id
      }
    }
});

export default appReducer.reducer;
