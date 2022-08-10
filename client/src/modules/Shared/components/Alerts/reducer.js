import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  alerts: []
};

const appReducer = createSlice({
    name: 'alert',
    initialState,
    reducers: {
      message: (state, { payload }) => {
        state.alerts.push({
            level: payload.level,
            message: payload.message,
        });
      },
      close: state => {
        state.alerts.shift();
      }
    },
});

export default appReducer.reducer;
