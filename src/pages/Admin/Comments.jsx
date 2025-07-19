import { useEffect, useState } from "react";
import { comments_data } from "../../assets/assets";
import { FaTrash, FaCheckCircle } from "react-icons/fa";
import { commentApprove, deleteComment, fetchComment } from "../../../redux/slice/commentSLice.js";
import moment from "moment";
import {useDispatch, useSelector} from "react-redux"
import Loader from "../../components/Loader.jsx";


const Comments = () => {
  const [filter, setFilter] = useState("notApproved");
  const {allComments , loading} = useSelector((state)=>state.comment)

  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(fetchComment())
  }, [dispatch]);

  

  const filterdComments = allComments.filter((c) =>
     filter === "Approved" ? c.isApproved : !c.isApproved
  );


 const handleApprove = async(id)=>{
   try {
    await dispatch(commentApprove(id))
    dispatch(fetchComment())
   } catch (error) {
    console.error("apporve failed",error)
   }
  }

  const handleDelete = async(id)=>{
    try {
    await dispatch(deleteComment(id))
    dispatch(fetchComment())
    } catch (error) {
    console.error("delete failed",error)
    }
  }



  if(loading) return <Loader/>

  return (
    <>
    {
      !filterdComments ? <Loader/> : <div className="p-4 sm:p-6 min-h-screen bg-[#121212] text-white ">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">Comments</h1>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-3 justify-end mb-6">
        {["Approved", "notApproved"].map((item, idx) => (
          <button
            key={idx}
            onClick={() => {setFilter(item)}}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-300 ${
              filter === item
                ? "bg-white text-black border-white"
                : "bg-transparent text-white border-gray-600 hover:bg-gray-800"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Comments Table */}
      <div className="overflow-x-auto rounded-xl border border-gray-700 bg-[#1e1e1e]">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-[#2c2c2c] text-gray-400 uppercase tracking-wide">
            <tr>
              <th className="py-4 px-4 sm:px-6">Blog Title & Comment</th>
              <th className="py-4 px-4 sm:px-6">Date</th>
              <th className="py-4 px-4 sm:px-6">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filterdComments.map((comment, idx) => (
              <tr
                key={idx}
                className="border-b border-gray-700 hover:bg-[#2a2a2a] transition"
              >
                <td className="px-4 sm:px-6 py-4">
                  <p className="font-semibold text-white">
                    Blog: {comment.blog?.title || "No Title"}
                  </p>
                  <p className="text-gray-300">Name: {comment.name}</p>
                  <p className="text-gray-400">Comment: {comment.content}</p>
                </td>
                <td className="px-4 sm:px-6 py-4 text-gray-300 whitespace-nowrap">
                  {comment.createdAt
                    ? moment(comment.createdAt).format("Do MMM, YYYY")
                    : "No date"}
                </td>
                <td className="px-4 sm:px-6 py-4">
                  <div className="flex flex-wrap items-center gap-3 text-lg">
                    {comment.isApproved ? (
                      <FaCheckCircle className="text-green-400 cursor-pointer" onClick={()=>{
                        handleApprove(comment._id)
                      }}/>
                    ) : (
                      <button className="bg-white text-black px-3 py-1 rounded-full text-xs font-semibold shadow hover:bg-gray-200 cursor-pointer" onClick={()=>{
                        handleApprove(comment._id)
                      }}>
                        Approve
                      </button>
                    )}
                    <FaTrash className="text-red-500 cursor-pointer hover:text-red-600 transition" onClick={()=>{handleDelete(comment._id)}}/>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    }
    </>
  );
};

export default Comments;
