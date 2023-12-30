import { Container, Grid, TextField, Typography, Box } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addressUpdate, paymentUpdate } from "../features/checkout-slice";

function PaymentForm() {
  const payments = useSelector((state) => state.checkout.payments);
  const dispatch = useDispatch();
  function handlePaymentChange(event) {
    const { name, value } = event.target;
    console.log({ name, value });
    dispatch(paymentUpdate({ [name]: value }));
  }

  return (
    <>
      {/* <Container> */}
      <Typography my={2} variant="h6">
        Payment Details
      </Typography>

      <Box component="form" onChange={handlePaymentChange}>
        <Grid container spacing={4}>
          <Grid item sx={12} sm={6}>
            <TextField
              required
              id="nameoncard"
              name="nameoncard"
              label="Card Holder Name"
              variant="standard"
              fullWidth
              defaultValue={payments.nameoncard}
            />
          </Grid>
          <Grid item sx={12} sm={6}>
            <TextField
              required
              id="cardnumber"
              name="cardnumber"
              label="Card Number"
              variant="standard"
              fullWidth
              defaultValue={payments.cardnumber}
            />
          </Grid>
          <Grid item sx={12} sm={6}>
            <TextField
              required
              id="expirydate"
              name="expirydate"
              label="Expiry Date"
              variant="standard"
              fullWidth
              defaultValue={payments.expirydate}
            />
          </Grid>
          <Grid item sx={12} sm={6}>
            <TextField
              required
              id="cvv"
              name="cvv"
              label="CVV"
              variant="standard"
              fullWidth
              type="password"
              defaultValue={payments.cvv}
            />
          </Grid>
        </Grid>
      </Box>
      {/* </Container> */}
    </>
  );
}

export default PaymentForm;
