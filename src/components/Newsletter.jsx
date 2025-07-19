import React from 'react';
import { toast } from 'react-toastify';

const Newsletter = () => {
  return (
    <div className="flex flex-col items-center py-16 px-4 text-center">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold py-2">
        Never Miss a Blog!
      </h1>
      <p className="text-sm sm:text-base md:max-w-xl text-gray-300">
        Subscribe to get the latest blogs, tech news, and exclusive updates delivered to your inbox.
      </p>

      <div className="border border-gray-300 rounded flex flex-col sm:flex-row mt-4 w-full max-w-md">
        <input
          type="text"
          placeholder="Enter your email"
          className="bg-white text-black px-4 py-2 w-full outline-none"
        />
        <button className="bg-[#1de9b6] text-black px-4 py-2 w-full sm:w-auto mt-2 sm:mt-0 cursor-pointer" onClick={()=>{toast.success("Subscribed successfully")}}>
          Subscribe
        </button>
      </div>
    </div>
  );
};

export default Newsletter;
