import { createSlice } from "@reduxjs/toolkit";

const checkoutSlice = createSlice({
  name: "checkout",
  initialState: {
    address: {
      firstName: "",
      lastName: "",
      address: "",
      zipcode: "",
      country: "",
    },
    payments: {
      nameoncard: "",
      cardnumber: "",
      expirydate: "",
      cvv: "",
    },
  },
  reducers: {
    addressUpdate: (state, action) => {
      state.address = { ...state.address, ...action.payload };
    },
    paymentUpdate: (state, action) => {
      state.payments = { ...state.payments, ...action.payload };
    },
    resetCheckout: (state) => {
      state.address = {
        firstName: "",
        lastName: "",
        address: "",
        zipcode: "",
        country: "",
      };
      state.payments = {
        nameoncard: "",
        cardnumber: "",
        expirydate: "",
        cvv: "",
      };
    },
  },
});

export const { addressUpdate, paymentUpdate, resetCheckout } =
  checkoutSlice.actions;
export default checkoutSlice.reducer;
