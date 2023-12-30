import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { Badge, Button, useTheme } from "@mui/material";
import ShoppingCartSharpIcon from "@mui/icons-material/ShoppingCartSharp";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getItemsCount } from "../utils";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { fetchAllCategories } from "../features/categories-slice";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/icons-material/Menu";
import { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { useAuth } from "../firebase/Auth";
import Fade from "@mui/material/Fade";
import BasicMenu from "../pages/BasicMenu";

function Header() {
  const { user, signOut } = useAuth();
  const cartItems = useSelector((state) => state.cart.value);
  const cartItemsCount = getItemsCount(cartItems);
  const products = useSelector((state) => state.products.value);
  const categories = useSelector((state) => state.categories.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [searchTermValue, setSearchTermValue] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("all");
  function handleCategoryChange(event) {
    const { value } = event.target;
    setSelectedCategory(value);
    setSearchTermValue("");
    navigate(value === "all" ? "/" : `/?category=${value}`);
  }

  function handleSearchChange(searchTerm) {
    if (searchTerm) {
      navigate(
        selectedCategory === "all"
          ? `/?searchTerm=${searchTerm}`
          : `/?category=${selectedCategory}&searchTerm=${searchTerm}`
      );
    } else {
      navigate(
        selectedCategory === "all" ? `/` : `/?category=${selectedCategory}`
      );
    }
  }

  if (!categories.length) {
    dispatch(fetchAllCategories());
  }

  const theme = useTheme();

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          top: 0,
          padding: "8px",
        }}
      >
        <Toolbar variant="dense" sx={{ justifyContent: "center" }}>
          <Link
            to="/"
            style={{ textDecoration: "none", color: "inherit", flexGrow: 1 }}
          >
            <Typography
              variant="h6"
              color="inherit"
              component="div"
              sx={{ flexGrow: 1 }}
            >
              ECommerce
            </Typography>
          </Link>
          <FormControl
            sx={{
              minWidth: 120,
              marginLeft: 2,
              backgroundColor: alpha(theme.palette.common.white, 0.15),
              "&:hover": {
                border: "none",
                outline: "none",
              },
              boxShadow: "none",
              ".MuiOutlinedInput-notchedOutline": { border: 0 },
            }}
          >
            <InputLabel
              id="demo-simple-select-label"
              sx={{
                border: "none",
                outlineColor: "none",
                color: "white",
                boxShadow: "none",
                ".MuiOutlinedInput-notchedOutline": { border: 0 },
              }}
            ></InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedCategory}
              label="Category"
              onChange={handleCategoryChange}
              sx={{
                boxShadow: "none",
                ".MuiOutlinedInput-notchedOutline": { border: 0 },
                textTransform: "capitalize",
                color: "white",
              }}
            >
              <MenuItem value="all" sx={{ textTransform: "capitalize" }}>
                All
              </MenuItem>
              {categories.map((category) => (
                <MenuItem
                  key={category}
                  value={category}
                  sx={{ textTransform: "capitalize" }}
                >
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Autocomplete
            value={searchTermValue}
            onChange={(event, value) => {
              console.log(value);
              handleSearchChange(value.label);
            }}
            disablePortal
            freeSolo
            id="combo-box-demo"
            options={Array.from(
              selectedCategory === "all"
                ? products
                : products.filter((prod) => prod.category == selectedCategory),
              (prod) => ({
                id: prod.id,
                label: prod.title,
              })
            )}
            sx={{
              width: "100%",
              backgroundColor: alpha(theme.palette.common.white, 0.15),
              border: "none",
              outline: "none",
              color: "white",
              marginLeft: "0px",
              ".MuiAutocomplete-input": {
                color: "white",
              },
              ".MuiAutocomplete-clearIndicator": {
                color: "white",
                marginRight: "58px",
              },

              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
              ":hover": {
                border: "none",
                outline: "none",
              },
              boxShadow: "none",
              ".MuiOutlinedInput-notchedOutline": { border: 0 },
            }}
            renderInput={(params) => (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  border: "none",
                  outline: "none",
                }}
              >
                <TextField
                  {...params}
                  variant="outlined"
                  // label="Search"
                  placeholder="Search"
                  InputLabelProps={{
                    style: {
                      color: "white",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "10px",
                      borderColor: "none",
                      outlineColor: alpha(theme.palette.common.white, 0.15),
                      border: "none",
                      outline: "none",
                    },
                    ".MuiOutlinedInput-root": {
                      color: alpha(theme.palette.common.white, 0.15),
                    },
                  }}
                />
                <SearchIcon sx={{ marginLeft: "-50px" }} />
              </div>
            )}
          />
          <Link to="/cart" style={{ textDecoration: "none", color: "inherit" }}>
            <IconButton>
              <Badge badgeContent={cartItemsCount} color="error">
                <ShoppingCartSharpIcon sx={{ color: "white" }} />
              </Badge>
            </IconButton>
          </Link>
          {user ? (
            <>
              <BasicMenu name={user.email} displayName={user.displayName} />
            </>
          ) : (
            <>
              <Link
                to="/login"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Button
                  color="inherit"
                  style={{
                    whiteSpace: "nowrap",
                    textTransform: "none",
                    fontSize: 16,
                  }}
                >
                  Login
                </Button>
              </Link>
              <Link
                to="/registration"
                style={{
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <Button
                  color="inherit"
                  style={{
                    whiteSpace: "nowrap",
                    textTransform: "none",
                    fontSize: 16,
                  }}
                >
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Header;
