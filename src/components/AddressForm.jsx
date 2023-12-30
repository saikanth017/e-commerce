import { Container, Grid, TextField, Typography, Box } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addressUpdate } from "../features/checkout-slice";

function AddressForm() {
  const address = useSelector((state) => state.checkout.address);
  const dispatch = useDispatch();
  function handleAddressChange(event) {
    const { name, value } = event.target;
    dispatch(addressUpdate({ [name]: value }));
  }

  return (
    <>
      {/* <Container> */}
      <Typography my={2} variant="h6">
        Shopping Address
      </Typography>

      <Box component="form" onChange={handleAddressChange}>
        <Grid container spacing={4}>
          <Grid item sx={12} sm={6}>
            <TextField
              required
              id="firstName"
              name="firstName"
              label="First Name"
              variant="standard"
              fullWidth
              defaultValue={address.firstName}
            />
          </Grid>
          <Grid item sx={12} sm={6}>
            <TextField
              required
              id="lastName"
              name="lastName"
              label="Last Name"
              variant="standard"
              fullWidth
              defaultValue={address.lastName}
            />
          </Grid>
          <Grid item sx={12} sm={12}>
            <TextField
              required
              id="address"
              name="address"
              label="Address Line"
              variant="standard"
              fullWidth
              defaultValue={address.address}
            />
          </Grid>
          <Grid item sx={12} sm={6}>
            <TextField
              required
              id="city"
              name="city"
              label="City"
              variant="standard"
              fullWidth
              defaultValue={address.city}
            />
          </Grid>
          <Grid item sx={12} sm={6}>
            <TextField
              required
              id="zipcode"
              name="zipcode"
              label="Zip Code"
              variant="standard"
              fullWidth
              defaultValue={address.zipcode}
            />
          </Grid>
          <Grid item sx={12} sm={12}>
            <TextField
              required
              id="country"
              name="country"
              label="Country"
              variant="standard"
              fullWidth
              defaultValue={address.country}
            />
          </Grid>
        </Grid>
      </Box>
      {/* </Container> */}
    </>
  );
}

export default AddressForm;
