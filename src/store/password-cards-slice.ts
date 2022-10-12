import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import PasswordCard from "../models/password-card";

type InitialState = {
  items: PasswordCard[];
  displayedCard: PasswordCard | undefined;
};

const initialState: InitialState = {
  items: [],
  displayedCard: undefined,
};

const passwordCardsSlice = createSlice({
  name: "password-cards",
  initialState: initialState,
  reducers: {
    replaceCards(state, action: PayloadAction<{ items: PasswordCard[] }>) {
      state.items = action.payload.items;
      state.displayedCard = undefined;
    },
    addItemToCards(state, action: PayloadAction<{ item: PasswordCard }>) {
      state.displayedCard = undefined;

      const newItem = action.payload.item;

      state.items.push({
        id: newItem.id,
        password: newItem.password,
        serviceName: newItem.serviceName,
      });
    },
    removeItemFromCards(state, action: PayloadAction<{ item: PasswordCard }>) {
      state.displayedCard = undefined;

      const id = action.payload.item.id;
      state.items = state.items.filter((item) => item.id !== id);
    },
    editItem(state, action: PayloadAction<{ item: PasswordCard }>) {
      state.displayedCard = undefined;

      const editItem = action.payload.item;
      const existingItem = state.items.find((item) => item.id === editItem.id);

      if (existingItem) {
        existingItem.password = editItem.password;
        existingItem.serviceName = editItem.serviceName;
      }
    },
    revealItem(state, action: PayloadAction<{ id: string }>) {
      state.displayedCard = state.items.find(
        (item) => item.id === action.payload.id
      );
    },
  },
});

export const passwordCardsActions = passwordCardsSlice.actions;

export default passwordCardsSlice;
