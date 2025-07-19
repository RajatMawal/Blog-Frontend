import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/slice/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(logoutUser()).then((result) => {
      toast.success("Logged out successfully");
      navigate("/login");
      window.location.reload();
    });
  }, [dispatch, navigate]);

  return null;
};

export default Logout;