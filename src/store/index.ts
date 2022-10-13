import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import passwordCardsSlice from "./password-cards-slice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    passwordCard: passwordCardsSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
