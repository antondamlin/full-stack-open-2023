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

let notificationActive = null;

export const setTimeoutNotification = (text, time) => {
  return (dispatch) => {
    if (notificationActive !== null) {
      clearTimeout(notificationActive);
    }
    dispatch(changeNotification(text));
    notificationActive = setTimeout(() => {
      dispatch(hideNotification());
    }, time * 1000);
  };
};

export const { changeNotification, hideNotification } =
  notificationSlice.actions;
export default notificationSlice.reducer;
