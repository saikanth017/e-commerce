import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../components/Header";
import {
  Container,
  Step,
  StepLabel,
  Stepper,
  Typography,
  Box,
  Button,
  Paper,
} from "@mui/material";
import AddressForm from "../components/AddressForm";
import PaymentForm from "../components/PaymentForm";
import Review from "../components/Review";
import { useSelector } from "react-redux";
import Thankyou from "../components/Thankyou";
import { resetCheckout } from "../features/checkout-slice";
import { resetCart } from "../features/cart-slice";
import { useDispatch } from "react-redux";

function Checkout() {
  const steps = ["Shipping Address", "Payment Details", "Review Order"];
  const [activeSteps, setActiveSteps] = useState(0);
  const cartItems = useSelector((state) => state.cart.value);

  const addressValues = useSelector((state) => state.checkout.address);
  const paymentValues = useSelector((state) => state.checkout.payments);
  const dispatch = useDispatch();

  useEffect(() => {
    if (activeSteps === steps.length) {
      dispatch(resetCheckout());
      dispatch(resetCart());
    }
  }, [activeSteps]);

  const handleNext = () => {
    if (activeSteps == 0) {
      if (Object.values(addressValues).every((p) => p.trim() !== "")) {
        setActiveSteps((prevActiveStep) => prevActiveStep + 1);
      } else {
        toast.error("Fill all details", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } else if (activeSteps == 1) {
      if (Object.values(paymentValues).every((p) => p.trim() !== "")) {
        setActiveSteps((prevActiveStep) => prevActiveStep + 1);
      } else {
        toast.error("Fill all details", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } else if (activeSteps == 2) {
      setActiveSteps((prevActiveStep) => prevActiveStep + 1);
      toast.success("Order Placed..", {
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
  };

  const handleBack = () => {
    setActiveSteps((prevActiveStep) => prevActiveStep - 1);
  };

  function displayContent() {
    switch (activeSteps) {
      case 0:
        return <AddressForm />;
      case 1:
        return <PaymentForm />;
      case 2:
        return <Review />;
      case 3:
        return <Thankyou />;
      default:
        throw new Error();
    }
  }

  return (
    <div>
      <Header />
      <Container
        maxWidth="lg"
        sx={{
          marginTop: 3,
        }}
      >
        <Paper sx={{ padding: 3 }}>
          <Box>
            <Typography textAlign="center" variant="h4" marginBottom={3}>
              Checkout
            </Typography>
            <Stepper activeStep={activeSteps}>
              {steps.map((step, index) => (
                <Step key={index}>
                  <StepLabel>{step}</StepLabel>
                </Step>
              ))}
            </Stepper>

            {displayContent()}
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Button
                onClick={handleBack}
                variant="contained"
                sx={{
                  margin: 1,
                  marginTop: 5,
                  display:
                    activeSteps === 3 ||
                    cartItems.length === 0 ||
                    activeSteps === 0
                      ? "none"
                      : "block",
                }}
              >
                Back
              </Button>
              {activeSteps === steps.length - 1 ? (
                <Button
                  variant="contained"
                  sx={{
                    margin: 1,
                    marginTop: 5,
                    display:
                      activeSteps === 3 || cartItems.length === 0
                        ? "none"
                        : "block",
                  }}
                  onClick={handleNext}
                >
                  Place Order
                </Button>
              ) : (
                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{
                    margin: 1,
                    marginTop: 5,
                    display: activeSteps === 3 ? "none" : "block",
                  }}
                >
                  Next
                </Button>
              )}
            </Box>
          </Box>
        </Paper>
      </Container>
      <ToastContainer />
    </div>
  );
}

export default Checkout;
