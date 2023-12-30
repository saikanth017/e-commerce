import { useTheme } from "@emotion/react";
import { ShoppingCartSharp } from "@mui/icons-material";
import {
  CardMedia,
  Grid,
  Card,
  Container,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import Rating from "@mui/material/Rating";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cart-slice";
import { fetchAllProducts } from "../features/products-slice";
import { useSearchParams } from "react-router-dom";
import Header from "../components/Header";

function Home() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const searchProduct = searchParams.get("searchTerm");

  const products = useSelector((state) => state.products.value);

  if (!products.length) {
    dispatch(fetchAllProducts());
  }

  function addProductToCart(product) {
    dispatch(addToCart({ product, quantity: 1 }));
  }

  let filteredProducts =
    category && category !== "all"
      ? products.filter((prod) => prod.category == category)
      : products;

  filteredProducts = searchProduct
    ? filteredProducts.filter((prod) =>
        prod.title.toLowerCase().includes(searchProduct.toLowerCase())
      )
    : filteredProducts;

  return (
    <div>
      <Header />
      <Container sx={{ py: 4 }} maxWidth="large">
        <Grid container spacing={5}>
          {filteredProducts.map(
            ({ id, title, price, description, rating, image }) => (
              <Grid item key={id} xs={12} sm={6} md={4} lg={3}>
                <Card
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                  }}
                >
                  <CardMedia
                    component="img"
                    image={image}
                    alt={title}
                    sx={{
                      height: theme.spacing(40),
                      width: theme.spacing(40),
                      alignSelf: "center",
                      objectFit: "contain",
                      pt: "50px",
                    }}
                  />

                  <CardContent>
                    <Typography
                      variant="h5"
                      sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: "1",
                        WebkitBoxOrient: "vertical",
                        marginBottom: 2,
                      }}
                    >
                      {title}
                    </Typography>
                    <Typography
                      color="gray"
                      variant="paragraph"
                      sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: "2",
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {description}
                    </Typography>
                    <Typography>$ {price}</Typography>
                    <Rating value={rating.rate} readOnly precision={0.5} />
                  </CardContent>
                  <CardActions sx={{ alignSelf: "center", marginBottom: 2 }}>
                    <Button
                      variant="contained"
                      onClick={(product) =>
                        addProductToCart({
                          id,
                          title,
                          price,
                          description,
                          rating,
                          image,
                        })
                      }
                    >
                      <ShoppingCartSharp></ShoppingCartSharp>
                      Add To Cart
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            )
          )}
        </Grid>
      </Container>
    </div>
  );
}

export default Home;
