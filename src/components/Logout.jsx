import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logoutUser, resetAuthState } from "../../redux/slice/authSlice.js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(logoutUser()).then((result) => {
      toast.success("Logged out successfully");
      navigate("/");
      dispatch(resetAuthState());
      window.location.reload();
    });
  }, [dispatch, navigate]);

  return null;
};

export default Logout;