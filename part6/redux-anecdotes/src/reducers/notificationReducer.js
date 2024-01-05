import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    changeNotification(state, action) {
      return action.payload;
    },
    hideNotification(state, action) {
      return '';
    },
  },
});

export const setTimeoutNotification = (text, time) => {
  return (dispatch) => {
    dispatch(changeNotification(text));
    setTimeout(() => {
      dispatch(hideNotification());
    }, time * 1000);
  };
};

export const { changeNotification, hideNotification } =
  notificationSlice.actions;
export default notificationSlice.reducer;
