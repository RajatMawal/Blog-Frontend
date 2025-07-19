import { useEffect, useState } from "react";
import {useDispatch, useSelector} from "react-redux"
import { loginUser } from "../../redux/slice/authSlice.js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const Login = () => {
const navigate= useNavigate()
const [data,setData] = useState({
    email:'rajat@gmail.com',
    password:'1234567'
})

const {isAuthenticated} = useSelector((state)=>state.auth)


const dispatch = useDispatch()

const handleInput = async (e) => {
    const {value,name} = e.target

    setData(prev=>({...prev,[name]:value}))
}


const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await dispatch(loginUser(data)).unwrap();
      if (result) {
        toast.success("Login Successfully")
      }
    } catch (err) {
      console.error("Login failed:", err);
      toast.error("Invalid credentials");
    }
}

useEffect(()=>{
  if (isAuthenticated) {
    navigate("/admin");
  }
}, [isAuthenticated, navigate]);

  return (
    
    <div className="h-screen bg flex justify-center items-center  font-poppins">
      <div className="grid gap-8">
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-[26px] m-4">
          <div className="border-[20px] border-transparent rounded-[20px]   shadow-lg xl:p-10 2xl:p-10 lg:p-10 md:p-10 sm:p-2 m-2" style={{backgroundColor:"rgb(22, 22, 32)"}}>
            <h1 className="pt-8 pb-6 font-bold dark:text-gray-400 text-5xl text-center cursor-default">
              Log in
            </h1>
            <form onSubmit={handleLogin} method="post" className="space-y-4">
              <div>
                <label htmlFor="email" className="mb-2 dark:text-gray-400 text-lg">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Email"
                  name="email"
                  onChange={handleInput}
                  value={data.email}
                  required
                  className="border p-3 dark:bg-indigo-700 dark:text-gray-300 dark:border-gray-700 shadow-md placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
                />
              </div>
              <div>
                <label htmlFor="password" className="mb-2 dark:text-gray-400 text-lg">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={data.password}
                  onChange={handleInput}
                  required
                  className="border p-3 shadow-md dark:bg-indigo-700 dark:text-gray-300 dark:border-gray-700 placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
                />
              </div>

              <a
                href="#"
                className="group text-blue-400 transition-all duration-100 ease-in-out text-sm"
              >
                <span className="bg-left-bottom bg-gradient-to-r from-blue-400 to-blue-400 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                  Forget your password?
                </span>
              </a>

              <button
                type="submit"
                className="bg-gradient-to-r dark:text-gray-300 from-blue-500 to-purple-500 shadow-lg mt-6 p-2 text-white rounded-lg w-full hover:scale-105 hover:from-purple-500 hover:to-blue-500 transition duration-300 ease-in-out cursor-pointer"
              >
                LOG IN
              </button>
            </form>

           

            <div className="text-gray-500 flex text-center flex-col mt-4 items-center text-sm">
              <div className="cursor-default">
                By signing in, you agree to our{" "}
                <a href="#" className="group text-blue-400 transition-all duration-100 ease-in-out">
                  <span className="cursor-pointer bg-left-bottom bg-gradient-to-r from-blue-400 to-blue-400 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                    Terms
                  </span>
                </a>{" "}
                and{" "}
                <div className="group text-blue-400 transition-all duration-100 ease-in-out">
                  <span className="cursor-pointer bg-left-bottom bg-gradient-to-r from-blue-400 to-blue-400 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                    Privacy Policy
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
