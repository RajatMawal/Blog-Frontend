import { useEffect } from "react";
import BlogTableItems from "../../components/BlogTableItems";
import { allBlogs, deleteBlog, isPublish } from "../../../redux/slice/blogSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const ListBlog = () => {
  const dispatch = useDispatch();
  const { allBlog, loading, error, toggle } = useSelector((state) => state.blog);

  useEffect(() => {
    dispatch(allBlogs());
  }, [dispatch, toggle]);

  const handleToggle = async (id) => {
    dispatch(isPublish(id));
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (!confirmDelete) return;

    try {
      const result = await dispatch(deleteBlog(id)).unwrap();
      if (result) {
        toast.success("Blog Deleted Successfully");
      } else {
        toast.error("Server error");
      }
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error("Something went wrong while deleting");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-40">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  if (error)
    return (
      <div className="text-center text-red-500 py-4">
        {error || "Something went wrong."}
      </div>
    );

  return (
    <div className="min-h-screen bg-[#121212] p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">All Blogs</h1>

  
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
                    onToggle={handleToggle}
                    onDelete={handleDelete}
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
      <div className="md:hidden space-y-4">
  {allBlog.length > 0 ? (
    allBlog.map((blogItem, index) => (
      <div
        key={blogItem._id}
        className="bg-[#1e1e1e] border border-gray-700 p-4 rounded-lg shadow"
      >
        <h2 className="text-xl font-semibold mb-2">{blogItem.title}</h2>
        <p className="text-gray-400 mb-1">
          Date: {new Date(blogItem.createdAt).toLocaleDateString()}
        </p>
        <p
          className={`mb-3 font-semibold ${
            blogItem.isPublished ? "text-green-400" : "text-red-500"
          }`}
        >
          {blogItem.isPublished ? "Published" : "Unpublished"}
        </p>
        <div className="flex gap-3">
          <button
            onClick={() => handleToggle(blogItem._id)}
            className={`px-3 py-1 text-sm font-medium rounded-md border transition-all duration-300 ${
              blogItem.isPublished
                ? "border-yellow-500 text-yellow-400 hover:bg-yellow-500/10"
                : "border-blue-500 text-blue-400 hover:bg-blue-500/10"
            }`}
          >
            {blogItem.isPublished ? "Unpublish" : "Publish"}
          </button>
          <button
            onClick={() => handleDelete(blogItem._id)}
            className="px-3 py-1 text-sm font-medium rounded-md border border-red-500 text-red-400 hover:bg-red-500/10"
          >
            Delete
          </button>
        </div>
      </div>
    ))
  ) : (
    <div className="text-center py-4 text-gray-400">No blogs available.</div>
  )}
</div>
    </div>
  );
};

export default ListBlog;
