import React, { useEffect } from "react";
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Container, CssBaseline } from "@mui/material";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Layout from "./pages/Admin/Layout";
import Dashboard from "./pages/Admin/Dashboard";
import AddBlog from "./pages/Admin/AddBlog";
import ListBlog from "./pages/Admin/ListBlog";
import Comments from "./pages/Admin/Comments";
import "quill/dist/quill.snow.css";
import ProtectedRoute from "./pages/Admin/ProtectedRoute";
import { useDispatch, useSelector } from "react-redux";
import { checkUser, resetAuthState } from "../redux/slice/authSlice.js";
import { ToastContainer, toast } from "react-toastify";
import NotFound from "./components/NotFOund.jsx";
import AddUser from "./pages/addUser.jsx";
import Logout from "./components/Logout.jsx";
import Loader from "./components/Loader.jsx";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#757575",
    },
    featuredCard: {
      main: "#333333",
    },
  },
});

const App = () => {
  const { isAuthenticated, loading, user} = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(checkUser());
  }, [dispatch, location.pathname]);

  console.log("Redux auth state:", isAuthenticated, user);

  const navigate = useNavigate();

  if (loading) {
    return <Loader />
  }



  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Container>
          <Navbar />
          <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<Home />} />
            <Route path="/blog/:id" element={<Blog />} />
            <Route path="login" element={isAuthenticated ? <Navigate to="/admin" /> : <Login />} />
            <Route path="/admin" element={<ProtectedRoute />}>
              <Route element={<Layout />}>
                <Route index element={<Dashboard />} />
                <Route path="register" element={<AddUser />} />
                <Route path="AddBlog" element={<AddBlog />} />
                <Route path="BlogList" element={<ListBlog />} />
                <Route path="Comments" element={<Comments />} />
                <Route path="logout" element={<Logout />} />
              </Route>
            </Route>
          </Routes>
          <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            pauseOnHover
            theme="dark"
          />
          <Footer />
        </Container>
      </ThemeProvider>
    </>
  );
};

export default App;
