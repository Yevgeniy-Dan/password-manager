import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import PasswordCard from "../models/password-card";

type InitialState = {
  items: PasswordCard[];
  changed: boolean;
};

const initialState: InitialState = {
  items: [],
  changed: false,
};

const passwordCardsSlice = createSlice({
  name: "password-cards",
  initialState: initialState,
  reducers: {
    replaceCards(state, action: PayloadAction<{ items: PasswordCard[] }>) {
      state.items = action.payload.items;
    },
    addCardToCards(state, action: PayloadAction<{ item: PasswordCard }>) {
      state.changed = true;

      const newItem = action.payload.item;

      state.items.push({
        id: newItem.id,
        password: newItem.password,
        serviceName: newItem.serviceName,
      });
    },
    removeCardFromCards(state, action: PayloadAction<{ item: PasswordCard }>) {
      state.changed = true;

      const id = action.payload.item.id;
      state.items = state.items.filter((item) => item.id !== id);
    },
    editCard(state, action: PayloadAction<{ editItem: PasswordCard }>) {
      state.changed = true;

      const editItem = action.payload.editItem;
      const existingItem = state.items.find((item) => item.id === editItem.id);

      if (existingItem) {
        existingItem.password = editItem.password;
        existingItem.serviceName = editItem.serviceName;
      }
    },
    changeValueByLogout(state) {
      state.changed = false;
    },
  },
});

export const passwordCardsActions = passwordCardsSlice.actions;

export default passwordCardsSlice;
