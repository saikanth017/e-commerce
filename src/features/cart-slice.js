import { createSlice } from "@reduxjs/toolkit";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    value: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const { product, quantity } = action.payload;
      const existingItem = state.value.find(
        ({ product: prod }) => prod.id === product.id
      );
      if (existingItem && existingItem.quantity == 10) {
        toast.warn("You can add upto 10 products only", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else if (existingItem && existingItem.quantity < 10) {
        existingItem.quantity += 1;
      } else if (!existingItem) {
        state.value.push(action.payload);
      }
    },
    removeFromCart: (state, action) => {
      const { product } = action.payload;
      const index = state.value.findIndex(
        ({ product: prod }) => prod.id === product.id
      );

      if (index > -1) {
        const existingItem = state.value[index];
        if (existingItem.quantity === 1) {
          state.value.splice(index, 1);
        } else {
          existingItem.quantity -= 1;
        }
      }
    },
    resetCart: (state) => {
      state.value = [];
    },
  },
});

export const { addToCart, removeFromCart, resetCart } = cartSlice.actions;
export default cartSlice.reducer;
