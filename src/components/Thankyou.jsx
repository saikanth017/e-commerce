import React from "react";
import { resetCheckout } from "../features/checkout-slice";
import { resetCart } from "../features/cart-slice";
import { useDispatch } from "react-redux";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function Thankyou() {
  // const dispatch = useDispatch();
  // function resetCartAndCheckout() {
  //   dispatch(resetCheckout());
  //   dispatch(resetCart());
  // }
  // resetCartAndCheckout();

  function generateNumericOrderNumber(length) {
    const uniqueId = Array.from({ length }, () =>
      Math.floor(Math.random() * 10)
    ).join("");

    // const orderNumber = `${prefix}-${uniqueId}`;

    return uniqueId;
  }

  // Example usage for a 6-digit numeric order number:
  const orderNumber = generateNumericOrderNumber(6);
  //   console.log(orderNumber);

  return (
    <>
      <Box
        sx={{
          marginTop: 3,
        }}
      >
        <Typography variant="h5" marginBottom={1}>
          Thank you for your Order
        </Typography>
        <Typography variant="paragraph">
          Your order number is
          <span style={{ fontWeight: "bold" }}> #{orderNumber}.</span> We have
          emailed you the details regarding your order confirmation.
        </Typography>
        <Typography sx={{ marginTop: 3 }}>
          <Link to="/" style={{ textDecoration: "none", color: "royalblue" }}>
            Shop More
          </Link>
        </Typography>
      </Box>
    </>
  );
}

export default Thankyou;
