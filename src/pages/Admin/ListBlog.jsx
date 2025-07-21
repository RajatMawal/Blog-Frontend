import { useEffect, useState } from "react";
import BlogTableItems from "../../components/BlogTableItems";
import { allBlogs, deleteBlog, isPublish } from "../../../redux/slice/blogSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const ListBlog = () => {

  const dispatch = useDispatch()
  const {allBlog, loading,error,toggle} = useSelector((state)=>state.blog)

  useEffect(() => {
    dispatch(allBlogs())
  }, [dispatch,toggle]);



  const handleToggle = async(id)=>{
    dispatch(isPublish(id))
  }

const handleDelete = async(id)=>{
  const confirmDelete = window.confirm("Are you sure you want to delete?");
  if (!confirmDelete) return;

  try {
    const result = await dispatch(deleteBlog(id)).unwrap();
    dispatch(allBlogs())

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
  return (
    <div className="min-h-screen bg-[#121212] p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">All Blogs</h1>

      {/* Desktop Table */}
      <div className="hidden md:block">
        <div className="overflow-x-auto rounded-lg border border-gray-700 bg-[#1e1e1e] shadow-md">
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
              {allBlog.length > 0 ? (
                allBlog.map((blogItem, index) => (
                  <BlogTableItems
                    key={blogItem._id}
                    blog={blogItem}
                    index={index + 1}
                    id={blogItem._id}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-400">
                    No blogs available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ListBlog;
