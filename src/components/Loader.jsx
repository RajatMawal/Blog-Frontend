import React from 'react'

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-20 h-20 border-[8px] border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  )
}

export default Loader;
