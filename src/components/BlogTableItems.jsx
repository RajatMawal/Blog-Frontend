import moment from "moment";
import { VscChromeClose } from "react-icons/vsc";
import {useDispatch, useSelector} from "react-redux"
import {allBlogs, deleteBlog, isPublish} from "../../redux/slice/blogSlice.js"
import { getDashboard } from "../../redux/slice/adminSlice.js";
import { useEffect } from "react";
import { toast } from "react-toastify";

const BlogTableItems = ({ blog, index ,id}) => {
  const { title, createdAt, isPublished ,} = blog;
  const BlogDate = new Date(createdAt);
  const {toggle} = useSelector((state)=>state.blog)

  const dispatch = useDispatch()

const handleToggle = async (id) => {
  await dispatch(isPublish(id));
  dispatch(getDashboard())
};

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

  return (
    <>
      <tr className="border-b border-gray-700 hover:bg-white/5 transition hidden md:table-row">
        <td className="px-4 py-3 text-gray-300">{index}</td>
        <td className="px-4 py-3 text-white">{title}</td>
        <td className="px-4 py-3 w-[10vw] text-gray-400">
          {moment(BlogDate).format("Do MMM YYYY")}
        </td>
        <td
          className={`px-4 py-3 font-semibold ${
            isPublished ? "text-green-400" : "text-red-500"
          }`}
        >
          {isPublished ? "Published" : "UnPublished"}
        </td>
        <td className="px-4 py-3">
          <div className="flex gap-3 items-center">
            <button
              className={`px-3 py-1 text-sm font-medium rounded-md border transition-all duration-300 ${
                isPublished
                  ? "border-yellow-500 text-yellow-400 hover:bg-yellow-500/10"
                  : "border-blue-500 text-blue-400 hover:bg-blue-500/10"
              }`}
              onClick={()=>{handleToggle(id)}}
            >
              {isPublished ? "UnPublish" : "Publish"}
            </button>
            <button className="p-2 bg-red-500/20 hover:bg-red-500/40 rounded-full text-red-300 transition cursor-pointer"
            onClick={()=>{handleDelete(id)}}>
              <VscChromeClose />
            </button>
          </div>
        </td>
      </tr>
    </>
  );
};

export default BlogTableItems;
