import { IconButton, Typography } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import { FaBars } from "react-icons/fa";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { IoExitOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { RiUserAddFill } from "react-icons/ri";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FaCommentAlt } from "react-icons/fa";
import { CiBoxList } from "react-icons/ci";
import { MdOutlineSpaceDashboard } from "react-icons/md";

import {
  logoutUser,
  resetAuthState,
} from "../../../redux/slice/authSlice.js";

const Layout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);


  const navItems = [
    {
      label: "Dashboard",
      icon: <MdOutlineSpaceDashboard />,
    },
    {
      label: "AddBlog",
      icon: <IoMdAddCircleOutline />,
    },
    {
      label: "BlogList",
      icon: <CiBoxList />,
    },
    {
      label: "Comments",
      icon: <FaCommentAlt />,
    },
    {
      label: "register",
      icon: <RiUserAddFill />, 
    },
  ];

  return (
    <>
      <div className="hidden md:h-[4vw] md:flex items-center justify-center border-b border-white/40">
        <IconButton>
          <NewspaperIcon />
        </IconButton>
        <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600 }}>
          <NavLink to="/">BlogVault</NavLink>
        </Typography>
      </div>

      <div className="flex min-h-screen bg-white/10 text-white relative overflow-x-hidden">
        {/* Sidebar */}
        <div
          ref={sidebarRef}
          className={`fixed z-30 inset-y-0 left-0 transform bg-[#1A1A1D] ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } md:relative md:translate-x-0 transition duration-200 ease-in-out w-60 max-w-[240px] shadow-[5px_0_5px_rgba(0,0,0,0.2)]`}
        >
          <div className="p-3 space-y-2 h-full overflow-y-auto">
            {/* Profile */}
            <div className="flex items-center p-2 space-x-4">
              <img
                src="https://static.vecteezy.com/system/resources/previews/006/487/917/original/man-avatar-icon-free-vector.jpg"
                alt="avatar"
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h2 className="text-lg text-white font-semibold first-letter:uppercase">
                  {user.name }
                </h2>
                <span className="text-xs text-gray-400">View profile</span>
              </div>
            </div>

            {/* Nav Items */}
            <div className="divide-y divide-gray-600">
              <ul className="pt-2 pb-4 space-y-1 text-sm">
                {navItems.map((item, i) => (
                  <li key={i}>
                    <NavLink
                      end
                      to={`/admin${item.label === "Dashboard" ? "" : "/" + item.label}`}
                      className={({ isActive }) =>
                        `flex items-center space-x-3 p-2 hover:bg-gray-400/20 rounded-md ${
                          isActive ? "bg-slate-500/70" : ""
                        }`
                      }
                    >
                      <svg
                        viewBox="0 0 512 512"
                        className="w-5 h-5 fill-current text-gray-400"
                      >
                        {item.icon}
                      </svg>
                      {item.icon}
                      <span>{item.label}</span>
                    </NavLink>
                  </li>
                ))}
              </ul>

              
              <ul className="text-sm mt-4">
                <li>
                  <NavLink
                    
                    to={"/admin/logout"}
                    className="flex items-center px-3 py-2 hover:bg-gray-700 rounded-md w-full"
                  >
                    <IoExitOutline className="text-2xl mr-2" />
                    <span>Logout</span>
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="flex-1 flex flex-col overflow-x-hidden">
        
          <div className="md:hidden bg-[rgb(22,22,32)] text-white flex items-center justify-between p-4">
            <button onClick={() => setIsOpen(!isOpen)}>
              <FaBars className="text-2xl" />
            </button>
            <span className="text-lg font-semibold">
              <NavLink to="/">BlogVault</NavLink>
            </span>
          </div>

          {/* Page Content */}
          <main className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};

export default Layout;
