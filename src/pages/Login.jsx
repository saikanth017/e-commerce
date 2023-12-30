import React from "react";
import Container from "@mui/material/Container";
import {
  Box,
  Button,
  Card,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { LockClockOutlined } from "@mui/icons-material";
import { useAuth } from "../firebase/Auth";
import { useNavigate } from "react-router-dom";
import Registration from "./Registration";
import Link from "@mui/material/Link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const { signIn } = useAuth();
  const navgate = useNavigate();
  async function login(event) {
    event.preventDefault();
    const { email, password } = event.target;
    await signIn(email.value, password.value);
    navgate("/");
    toast.success("Logged In Success", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
  return (
    <Container maxWidth="xs">
      <Card sx={{ marginTop: 10, padding: 2 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mt: 10,
            width: "100%",
          }}
        >
          <AccountCircleIcon />
          <Typography variant="h6">Sign In</Typography>

          <form
            onSubmit={login}
            sx={{
              width: "100%",
              mt: 1,
            }}
          >
            <TextField
              variant="outlined"
              required
              name="email"
              id="email"
              type="email"
              label="Email"
              fullWidth
              autoComplete="off"
              margin="normal"
            ></TextField>
            <TextField
              variant="outlined"
              required
              name="password"
              id="password"
              type="password"
              label="Password"
              fullWidth
              autoComplete="off"
              margin="normal"
            ></TextField>
            <Button
              type="submit"
              variant="contained"
              sx={{
                width: "100%",
                marginTop: 2.5,
              }}
            >
              Sign In
            </Button>
          </form>
          <Link
            href="/registration"
            color="royalblue"
            marginTop={1}
            underline="none"
          >
            Create an account
          </Link>
        </Box>
      </Card>
    </Container>
  );
}

export default Login;
