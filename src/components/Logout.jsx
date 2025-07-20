import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logoutUser, resetAuthState } from "../../redux/slice/authSlice.js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // useEffect(() => {
  //   dispatch(logoutUser()).then((result) => {
  //     toast.success("Logged out successfully");
  //     dispatch(resetAuthState());
  //     navigate("/");
  //     window.location.reload();
  //   });
  // }, [dispatch, navigate]);


    useEffect(() => {
    const performLogout = async () => {
      try {
        await dispatch(logoutUser()).unwrap();
        dispatch(resetAuthState());
        toast.success("Logged out successfully");
        navigate("/");
      } catch (err) {
        toast.error("Logout failed");
      }
    };

    performLogout()
  }
  )


  return null;
};

export default Logout;