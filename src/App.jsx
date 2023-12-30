import Header from "./components/Header";
import Cart from "./pages/Cart";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material";
import Checkout from "./pages/Checkout";
import Home from "./pages/Home";
import BasicMenu from "./pages/BasicMenu";
import { useAuth } from "./firebase/Auth";
import Registration from "./pages/Registration";

function App() {
  const { user } = useAuth();
  function ProtectedRoute({ children }) {
    if (!user) {
      return <Navigate to={"/login"}></Navigate>;
    }
    return children;
  }
  const theme = createTheme({
    palette: {
      mode: "light",
    },
  });
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/cart" element={<Cart />}></Route>
            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <Checkout />
                </ProtectedRoute>
              }
            ></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/registration" element={<Registration />}></Route>

            <Route path="/basicmenu" element={<BasicMenu />}></Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
