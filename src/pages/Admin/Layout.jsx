  import { IconButton, Typography } from "@mui/material";
  import { useState, useEffect, useRef } from "react";
  import NewspaperIcon from "@mui/icons-material/Newspaper";
  import { FaBars } from "react-icons/fa";
  import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
  import { checkUser, logoutUser, resetAuthState } from "../../../redux/slice/authSlice.js";
  import { useDispatch, useSelector } from "react-redux";
  import { toast } from "react-toastify";
  import ProtectedRoute from "./ProtectedRoute";

  const Layout = () => {
    const [isOpen, setIsOpen] = useState(false);
    const sidebarRef = useRef(null);
    const dispatch = useDispatch();
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

    

    return (
      <>
        <div className="hidden md:h-[4vw] md:flex items-center justify-center border-b border-white/40 cursor-pointer">
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
              <div className="flex items-center p-2 space-x-4">
                <img
                  src="https://static.vecteezy.com/system/resources/previews/006/487/917/original/man-avatar-icon-free-vector.jpg"
                  alt=""
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h2 className="text-lg font-semibold first-letter:uppercase">
                    {user.name}
                  </h2>
                  <span className="flex items-center space-x-1">
                    <a
                      rel="noopener noreferrer"
                      href="#"
                      className="text-xs hover:underline text-gray-400"
                    >
                      View profile
                    </a>
                  </span>
                </div>
              </div>

              {/* Menu */}
              <div className="divide-y divide-gray-600">
                <ul className="pt-2 pb-4 space-y-1 text-sm">
                  {[
                    {
                      label: "Dashboard",
                      icon: (
                        <path d="M256 48L96 128v160c0 88.366 67.548 160 160 160s160-71.634 160-160V128L256 48z" />
                      ),
                    },
                    {
                      label: "AddBlog",
                      icon: (
                        <path d="M256 32C132.3 32 32 132.3 32 256s100.3 224 224 224 224-100.3 224-224S379.7 32 256 32zm32 240h-48v48h-32v-48h-48v-32h48v-48h32v48h48v32z" />
                      ),
                    },
                    {
                      label: "BlogList",
                      icon: (
                        <path d="M96 128h320v32H96zm0 96h320v32H96zm0 96h192v32H96z" />
                      ),
                    },
                    {
                      label: "Comments",
                      icon: <path d="M496 128H16v256h128v64l96-64h256z" />,
                    },
                    {
                      label: "register",
                      icon: (
                        <path d="M496 128H16v256h128v64l96-64h256zM144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192h42.7c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0H21.3C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7h42.7C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3H405.3zM224 224a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM128 485.3C128 411.7 187.7 352 261.3 352H378.7C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7H154.7c-14.7 0-26.7-11.9-26.7-26.7z" />
                      ),
                    },
                  ].map((item, i) => (
                    <li key={i}>
                      <NavLink
                        end
                        to={`/admin${
                          item.label === "Dashboard" ? "" : "/" + item.label
                        }`}
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
                        <span>{item.label}</span>
                      </NavLink>
                    </li>
                  ))}
                </ul>

                {/* Logout */}
                <ul className="pt-4 pb-2 space-y-1 text-sm">
                  <li>
                    <NavLink
                      to="/admin/logout"
                      className="flex items-center space-x-3 p-2 hover:bg-gray-700 rounded-md"
                    >
                      <svg
                        viewBox="0 0 512 512"
                        className="w-5 h-5 fill-current text-gray-400"
                      >
                        <path d="M320 32L64 64v384H32v32h448v-32h-32V96H320V32zM320 96v64H160V96h160z" />
                      </svg>
                      <span>Logout</span>
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col overflow-x-hidden">
            {/* Mobile Header */}
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
