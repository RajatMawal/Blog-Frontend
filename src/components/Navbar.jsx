import React, { useEffect } from 'react';
import {
  Badge,
  Divider,
  IconButton,
  Toolbar,
  Typography
} from '@mui/material';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { checkUser, logoutUser } from '../../redux/slice/authSlice';
import { VscAccount } from "react-icons/vsc";
import { toast } from 'react-toastify';


const Navbar = () => {


  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const location = useLocation().pathname.startsWith("/admin");
  const navigate = useNavigate();


  return location ? "" : (
    <>
      <Toolbar>
        <IconButton>
          <NewspaperIcon />
        </IconButton>

        <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600 }}>
          <NavLink to="/">
            BlogVault
          </NavLink>
        </Typography>
        {
          !isAuthenticated  ? (
            
            <NavLink to='/login' className={"bg-blue-500 px-4 p-1 rounded-lg"}> 
              <h1>Login</h1>
            </NavLink>
          ) : (
            <div>
              <NavLink to='/admin' className="flex items-center gap-2 block">
                <VscAccount className={`text-3xl `} />
              </NavLink>
            </div>
          )
        }
      </Toolbar>
      <Divider />
      <Toolbar variant="h3" sx={{ fontSize: { xs: 13.7, md: 20 }, fontFamily: "sans-serif", justifyContent: 'center', paddingY: "10px" }}>
        EXPRESS YOUR EMOTIONS THROUGH WORDS
      </Toolbar>
    </>
  );
};

export default Navbar;
