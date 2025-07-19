import { useEffect, useState } from 'react'
import { assets, dashboard_data } from '../../assets/assets.js'
import BlogTableItems from '../../components/BlogTableItems.jsx'
import { getDashboard } from '../../../redux/slice/adminSlice.js'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBlog, isPublish } from '../../../redux/slice/blogSlice.js'
import { toast } from 'react-toastify'
const Dashboard = () => {

  const {dashboard,error, loading} = useSelector((state)=>state.admin)
  const {toggle} = useSelector((state)=>state.blog)

   const dispatch = useDispatch()
  const handleToggle = async (id) => {
  dispatch(isPublish(id));
};
useEffect(() => {
  dispatch(getDashboard());
}, [dispatch,toggle]);
 


const handleDelete = async(id)=>{
  const confirmDelete = window.confirm("Are you sure you want to delete?");
  if (!confirmDelete) return;

  try {
    const result = await dispatch(deleteBlog(id)).unwrap();
    dispatch(getDashboard())

      if (result) {
      toast.success("Blog Deleted Successfully")
     }
     else{
    toast.error("Server error")
     }
  } catch (error) {
    console.error("Delete failed:", error);
    toast.error("Something went wrong while deleting")
  }
  }


  if(loading) return <div className="flex justify-center items-center h-20 h-full">
  <div className="w-15 h-15 border-7 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
</div>

  if(error) return <h1>Loading....</h1>
  if (!dashboard) return <h1>No dashboard data</h1>;
  return (
    <div className="p-6 text-white min-h-screen bg-[#121212] ">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

    
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
        {[
          { label: 'Blogs', value: dashboard.blog },
          { label: 'Comments', value: dashboard.comments },
          { label: 'Drafts', value: dashboard.drafts },
        ].map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-4 bg-[#1e1e1e] border border-gray-700 p-4 rounded-xl shadow-md hover:shadow-lg transition"
          >
            <img
              src={assets.dashboard_icon_1}
              alt={`${item.label} Icon`}
              className="w-10 h-10 object-contain"
            />
            <div>
              <h1 className="text-2xl font-semibold">{item.value}</h1>
              <p className="text-sm text-gray-400">{item.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Latest Blogs */}
      <div className="mb-4 flex items-center gap-2">
        <img
          src={assets.star_icon}
          alt="Star Icon"
          className="bg-white p-1 rounded-md w-6 h-6"
        />
        <h2 className="text-xl font-semibold text-white">Latest Blogs</h2>
      </div>

    
      <div className="hidden md:block overflow-x-auto rounded-lg border border-gray-700 bg-[#1e1e1e] shadow-md">
        <table className="min-w-full text-sm text-left text-white">
          <thead className="bg-[#2c2c2c] text-gray-300 uppercase tracking-wider">
            <tr>
              <th className="py-3 px-4">#</th>
              <th className="py-3 px-4">Blog Title</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {dashboard.recentBlogs.length > 0 ? (
              dashboard.recentBlogs.map((blog, index) => (
                <BlogTableItems
                  key={blog._id}
                  blog={blog}
                  index={index + 1}
                  id={blog._id}
                />
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-400">
                  No recent blogs available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      
        <div className=" md:hidden space-y-4">
          {dashboard.recentBlogs.length > 0 ? (
            dashboard.recentBlogs.map((blog, index) => (
              <div
                key={blog._id}
                className="bg-[#1e1e1e] border border-gray-700 p-4 rounded-lg shadow-md"
              >
                <p className="text-gray-400 text-sm mb-1">#{index + 1}</p>
                <p className="text-white font-semibold text-lg">{blog.title}</p>
                <p className="text-gray-400 text-sm mb-1">
                  {new Date(blog.createdAt).toDateString()}
                </p>
                <p
                  className={`text-sm mb-3 font-medium ${
                    blog.isPublished ? 'text-green-400' : 'text-red-500'
                  }`}
                >
                  {blog.isPublished ? 'Published' : 'UnPublished'}
                </p>
                <div className="flex gap-3">
                  <button className="border border-blue-500 px-3 py-1 text-sm rounded text-blue-400"
                  onClick={()=>{handleToggle(blog._id)}}>
                    {blog.isPublished ? 'UnPublish' : 'Publish'}
                  </button>
                  <button className="p-2 bg-red-500/20 cursor-pointer hover:bg-red-500/40 rounded-full text-red-300 transition "
                  onClick={()=>{handleDelete(blog._id)}}>
                    ✕
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-center">No recent blogs available.</p>
          )}
        </div>
    </div>
  )
}

export default Dashboard
