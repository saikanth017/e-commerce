import {
  Container,
  Grid,
  TextField,
  Typography,
  Box,
  List,
  ListItem,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { addressUpdate } from "../features/checkout-slice";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";

import { getSubTotal } from "../utils";
import { resetCheckout } from "../features/checkout-slice";
import { resetCart } from "../features/cart-slice";

function Review() {
  const address = useSelector((state) => state.checkout.address);
  const formattedAddress = Object.values(address).join(", ");
  const payments = useSelector((state) => state.checkout.payments);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.value);

  const subTotal = getSubTotal(cartItems).toFixed(2);

  function handleAddressChange(event) {
    const { name, value } = event.target;
    console.log({ name, value });
    dispatch(addressUpdate({ [name]: value }));
  }

  return (
    <>
      {cartItems.length > 0 ? (
        <>
          <Typography my={2} variant="h6">
            Order Summary
          </Typography>
          <List
            sx={{
              width: "100%",
              bgcolor: "background.paper",
              padding: 0,
              margin: 0,
            }}
          >
            {cartItems.map(({ product, quantity }, index) => (
              <React.Fragment key={index}>
                <ListItem
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: 0,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar alt={product.title} src={product.image} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={product.title}
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: "inline" }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            Qty : {quantity}
                          </Typography>
                        </React.Fragment>
                      }
                    />
                  </Box>

                  <Typography>
                    ${getSubTotal([{ product, quantity }]).toFixed(2)}
                  </Typography>
                </ListItem>

                <Divider variant="inset" component="li" />
              </React.Fragment>
            ))}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  marginTop: 3,
                  fontWeight: "bold",
                }}
              >
                Total
              </Typography>
              <Typography
                sx={{
                  marginTop: 3,
                  fontWeight: "bold",
                }}
              >
                {subTotal}
              </Typography>
            </Box>
            <Grid
              container
              spacing={3}
              sx={{
                marginTop: 2,
                paddingLeft: 3,
              }}
            >
              <Grid items xs={12} sm={6}>
                <Typography variant="h6" style={{ fontWeight: "bold" }}>
                  Shipping Address
                </Typography>
                <Typography>{formattedAddress}</Typography>
              </Grid>
              <Grid items xs={12} sm={6}>
                <Typography variant="h6" style={{ fontWeight: "bold" }}>
                  Payment Details
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                  }}
                >
                  <Box>
                    <Typography>Holder Name</Typography>
                    <Typography>Card Number</Typography>
                    <Typography>Expiray Date</Typography>
                  </Box>
                  <Box>
                    <Typography>{payments.nameoncard}</Typography>
                    <Typography>{payments.cardnumber}</Typography>
                    <Typography>{payments.expirydate}</Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </List>
        </>
      ) : (
        <>
          <Typography
            sx={{
              marginTop: 4,
            }}
          >
            No items in cart
          </Typography>
          <Typography sx={{ marginTop: 3 }}>
            <RouterLink
              to="/"
              style={{ textDecoration: "none", color: "royalblue" }}
            >
              Shop Products
            </RouterLink>
          </Typography>
        </>
      )}
    </>
  );
}

export default Review;
