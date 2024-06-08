import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add(state, action) {
      const item = state.find((item) => item._id === action.payload._id);
      if (item) {
        item.userQuantity += action.payload.userQuantity || 1;
      } else {
        state.push({ ...action.payload, userQuantity: action.payload.userQuantity || 1 });
      }
    },
    remove(state, action) {
      return state.filter((item) => item._id !== action.payload);
    },
    increaseQuantity(state, action) {
      const item = state.find((item) => item._id === action.payload);
      if (item) {
        item.userQuantity += 1;
      }
    },
    decreaseQuantity(state, action) {
      const item = state.find((item) => item._id === action.payload);
      if (item && item.userQuantity > 1) {
        item.userQuantity -= 1;
      }
    },
    clearProduct() {
      return [];
    },
  },
});

export const { add, remove, increaseQuantity, decreaseQuantity, clearProduct } = cartSlice.actions;
export default cartSlice.reducer;
