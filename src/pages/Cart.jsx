import Container from "@mui/material/Container";
import React from "react";
import Grid from "@mui/material/Grid";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Card,
  Box,
  Rating,
  TextField,
} from "@mui/material";
import { useTheme } from "@mui/material";
import { getSubTotal } from "../utils";
import { addToCart, removeFromCart } from "../features/cart-slice";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

function Cart() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.value);
  const navigate = useNavigate();
  const subTotal = getSubTotal(cartItems).toFixed(2);

  function handleQuantityChange(event, { product, quantity }) {
    const updatedQuantity = event.target.value;
    if (updatedQuantity < quantity) {
      dispatch(removeFromCart({ product }));
    } else {
      dispatch(addToCart({ product, quantity }));
    }
  }

  function goToHome() {
    navigate("/");
  }

  function checkoutPage() {
    navigate("/checkout");
  }

  return (
    <div>
      <Header></Header>
      <Container>
        <Grid container spacing={2}>
          <Grid item container md={8}>
            {cartItems.map(({ product, quantity }, index) => (
              <Grid item key={index} xs={12}>
                <Card
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    marginTop: 5,
                    marginBottom: 5,
                  }}
                >
                  <CardMedia
                    component="img"
                    alt={product.title}
                    image={product.image}
                    sx={{
                      height: theme.spacing(25),
                      width: theme.spacing(25),
                      alignSelf: "center",
                      objectFit: "contain",
                      padding: "17px",
                    }}
                  />
                  <CardContent
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: 2,
                      flex: 1,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Typography gutterBottom variant="h6" component="div">
                        {product.title}
                      </Typography>
                      <Typography>$ {product.price}</Typography>
                      <Rating
                        value={product.rating.rate}
                        readOnly
                        precision={0.5}
                      />
                      <Typography>Subtotal</Typography>

                      <form>
                        <TextField
                          sx={{ width: theme.spacing(8) }}
                          id="standard-number"
                          label="Quantity"
                          type="number"
                          inputProps={{ min: 0, max: 10 }}
                          variant="standard"
                          value={quantity}
                          onChange={(e) =>
                            handleQuantityChange(e, { product, quantity })
                          }
                        ></TextField>
                      </form>
                    </Box>
                    <Box>
                      <Typography variant="h6">
                        ${getSubTotal([{ product, quantity }]).toFixed(2)}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Grid item container md={4} sx={{ marginTop: 5 }}>
            <Box sx={{ width: "100%" }}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  padding: 2,
                }}
              >
                <Typography variant="h5">Subtotal</Typography>
                <Typography variant="h6">$ {subTotal}</Typography>
                {subTotal > 0 ? (
                  <Button
                    onClick={() => {
                      checkoutPage();
                    }}
                    sx={{ marginTop: 2 }}
                    variant="contained"
                  >
                    Buy Now
                  </Button>
                ) : (
                  <Button
                    onClick={() => {
                      goToHome();
                    }}
                    sx={{ marginTop: 2 }}
                    variant="contained"
                  >
                    Shop Products
                  </Button>
                )}
              </Card>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default Cart;
