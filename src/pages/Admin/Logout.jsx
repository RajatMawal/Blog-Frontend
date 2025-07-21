import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/slice/authSlice";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(logoutUser());
    navigate("/login", { replace: true });
  }, [dispatch, navigate]);

  return null;
};

export default Logout;
