import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      if (!action.payload.quantity) {
        action.payload.quantity = 1;
      }
      const { name } = action.payload;
      let isPreviouslyPresent = false;
      state.forEach(item => {
        if (item.name === name) {
          item.quantity += 1;
          isPreviouslyPresent = true;
        }
      });
      if (!isPreviouslyPresent) {
        state.push(action.payload)
      }
    },
    removeFromCart(state, action) {
      console.log(action.payload);
      state.splice(action.payload, 1);
    },
  }
})

export const { addToCart, removeFromCart,increaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;