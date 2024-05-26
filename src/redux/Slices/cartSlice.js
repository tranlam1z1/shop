import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add(state, action) {
      const item = state.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity += action.payload.quantity || 1;
      } else {
        state.push({ ...action.payload, quantity: action.payload.quantity || 1 });
      }
    },
    remove(state, action) {
      return state.filter((item) => item.id !== action.payload);
    },
    increaseQuantity(state, action) {
      const item = state.find((item) => item.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },
    decreaseQuantity(state, action) {
      const item = state.find((item) => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },
  },
});

export const { add, remove, increaseQuantity, decreaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;
