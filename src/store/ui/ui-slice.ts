import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Notification from "../../models/notification";

type InitialState = {
  notification: Notification | null;
};

const initialState: InitialState = {
  notification: null,
};

const uiSlice = createSlice({
  name: "ui",
  initialState: initialState,
  reducers: {
    showNotification(
      state,
      action: PayloadAction<{ notification: Notification | null }>
    ) {
      state.notification = action.payload.notification;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
