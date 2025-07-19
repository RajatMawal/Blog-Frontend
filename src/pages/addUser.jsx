import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../redux/slice/authSlice.js";
import { toast } from "react-toastify";

const AddUser = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const result = await dispatch(registerUser(data)).unwrap();
      if (result) {
        toast.success("User added successfully");
        setData({ name: "", email: "", password: "" }); // Reset form
      }
    } catch (error) {
      toast.error(error?.message || "Failed to add user");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-200">Add New User</h2>

      <form
        onSubmit={handleRegister}
        className="bg-[#1e1e2f] p-6 rounded-xl shadow-lg max-w-lg w-full"
      >
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-300 mb-1">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="John Doe"
            value={data.name}
            onChange={handleInput}
            className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-indigo-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-300 mb-1">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="john@example.com"
            value={data.email}
            onChange={handleInput}
            className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-indigo-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-300 mb-1">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            value={data.password}
            onChange={handleInput}
            className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-indigo-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-2 px-4 rounded-lg hover:scale-105 transition duration-300 ease-in-out cursor-pointer"
        >
          Add User
        </button>
      </form>
    </div>
  );
};

export default AddUser;
