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
import Link from "@mui/material/Link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Registration() {
  const { signUp } = useAuth();
  const navgate = useNavigate();
  // async function signup(event) {
  //   event.preventDefault();
  //   const { email, password, name } = event.target;
  //   await signUp(email.value, password.value, name.value);
  //   navgate("/login");
  //   toast.success("Registration Success", {
  //     position: "top-right",
  //     autoClose: 3000,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //     theme: "light",
  //   });
  // }
  async function signup(event) {
    event.preventDefault();
    const { email, password, name } = event.target;

    try {
      await signUp(email.value, password.value, name.value);
      navgate("/login");
      toast.success("Registration Success", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      console.error("Registration failed:", error.message);
      toast.error(
        `Registration failed, Password should at least 6 characters`,
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
    }
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
          <Typography variant="h6">Sign Up</Typography>

          <form
            onSubmit={signup}
            sx={{
              width: "100%",
              mt: 1,
            }}
          >
            <TextField
              variant="outlined"
              required
              name="name"
              id="name"
              type="text"
              label="Name"
              fullWidth
              autoComplete="off"
              margin="normal"
            ></TextField>
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
              Create Account
            </Button>
          </form>
          <Link href="/login" color="royalblue" marginTop={1} underline="none">
            Already have Account? Login
          </Link>
        </Box>
      </Card>
    </Container>
  );
}

export default Registration;
