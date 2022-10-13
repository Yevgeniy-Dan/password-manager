import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
  isAuthenticated: boolean;
  loading: boolean;
  authError: string;
};

const initialState: InitialState = {
  isAuthenticated: false,
  loading: true,
  authError: "",
};

const authSlice = createSlice({
  name: "authentication",
  initialState: initialState,
  reducers: {
    login(state) {
      state.isAuthenticated = true;
      state.loading = false;
      state.authError = "";
    },
    logout(state) {
      state.isAuthenticated = false;
      state.loading = false;
      state.authError = "";
    },
    showError(state, action: PayloadAction<{ message: string }>) {
      state.authError = action.payload.message;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
