import moment from "moment";
import { VscChromeClose } from "react-icons/vsc";
import { useDispatch } from "react-redux";
import { deleteBlog, isPublish } from "../../redux/slice/blogSlice.js";
import { getDashboard } from "../../redux/slice/adminSlice.js";
import { toast } from "react-toastify";

const BlogTableItems = ({ blog, index }) => {
  const dispatch = useDispatch();
  const { title, createdAt, isPublished, _id } = blog;

  const handleToggle = async () => {
    try {
      await dispatch(isPublish(_id)).unwrap();
      dispatch(getDashboard());
      toast.success(`Blog ${isPublished ? "unpublished" : "published"} successfully`);
    } catch (err) {
      console.error("Toggle publish error:", err);
      toast.error("Failed to update publish status");
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (!confirmDelete) return;

    try {
      await dispatch(deleteBlog(_id)).unwrap();
      dispatch(getDashboard());
      toast.success("Blog deleted successfully");
    } catch (err) {
      console.error("Delete failed:", err);
      toast.error("Failed to delete blog");
    }
  };

  return (
    <tr className="border-b border-gray-700 hover:bg-white/5 transition hidden md:table-row">
      <td className="px-4 py-3 text-gray-300">{index}</td>
      <td className="px-4 py-3 text-white">{title}</td>
      <td className="px-4 py-3 w-[10vw] text-gray-400">
        {moment(createdAt).format("Do MMM YYYY")}
      </td>
      <td
        className={`px-4 py-3 font-semibold ${
          isPublished ? "text-green-400" : "text-red-500"
        }`}
      >
        {isPublished ? "Published" : "Unpublished"}
      </td>
      <td className="px-4 py-3">
        <div className="flex gap-3 items-center">
          <button
            onClick={handleToggle}
            className={`px-3 py-1 text-sm font-medium rounded-md border transition-all duration-300 ${
              isPublished
                ? "border-yellow-500 text-yellow-400 hover:bg-yellow-500/10"
                : "border-blue-500 text-blue-400 hover:bg-blue-500/10"
            }`}
          >
            {isPublished ? "Unpublish" : "Publish"}
          </button>
          <button
            onClick={handleDelete}
            className="p-2 bg-red-500/20 hover:bg-red-500/40 rounded-full text-red-300 transition cursor-pointer"
          >
            <VscChromeClose />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default BlogTableItems;
