import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    topicId: false,
    listId: false
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
