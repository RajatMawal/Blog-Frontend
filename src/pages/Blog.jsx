import { useEffect, useState } from 'react'
import { blog_data,comments_data} from '../assets/assets'
import BlogFeatured from '../components/BlogFeatured'
import { useParams } from 'react-router-dom'
import { VscAccount } from "react-icons/vsc";
import moment from 'moment';
import { Button } from '@mui/material';
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import Loader from '../components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { allBlogs, blogById } from '../../redux/slice/blogSlice.js';
import CommentForm from '../components/commentForm.jsx';
import { homeComments, fetchComment } from '../../redux/slice/commentSLice.js';
import { toast } from 'react-toastify';

const Blog = () => {
  const {id} = useParams()

 const data = useSelector((state) => state.blog.singleBlog?.blog);
 const {loading}= useSelector((state)=>state.blog)
 const {blogAllComments} = useSelector((state)=>state.comment)

  const dispatch = useDispatch()

  useEffect(() => {
  dispatch(blogById(id));
}, [id,dispatch]);

  const blogUrl = encodeURIComponent(window.location.href);
  const blogTitle = encodeURIComponent("Check out this awesome blog!");

  const handleCopy = () => {
  navigator.clipboard.writeText(window.location.href);
  toast.success("Link copied! Paste it in your Instagram bio or story.");
};
  

  useEffect(()=>{
    if(id){
    dispatch(homeComments(id))
    }
  },[id,dispatch])



 let filterComments = blogAllComments.filter((item) =>
     item.blog === id)
  


  if (loading || !data) return <Loader />;
  return data ? (
    <div>
      <BlogFeatured data={data}/>
      <div className='flex flex-col items-center my-[-30px] mt-2'>
        <img src={`${data.image}`} alt="" className='rounded-md w-[80vw]  md:w-[60vw]'/>
        <div className='rich-text max-w-4xl text-justify mx-auto mt-4 xs:px-8' dangerouslySetInnerHTML={{"__html":data.description}}></div>
      </div>
      

  
  {
    filterComments.length === 0 ? "" : 
      <div className="w-full max-w-3xl mt-10 md:ml-50">
    <h1 className="text-xl font-semibold mb-4">Comments ({filterComments.length})</h1>
    {filterComments.map((item, idx) => (
      <div
        key={idx}
        className="bg-white/20 text-white p-4 my-3 rounded-lg w-full "
      >
        <div className="flex items-center gap-2 mb-1">
          <VscAccount className="text-2xl" />
          <h4 className="font-medium">{item.name}</h4>
        </div>
        <p className="text-sm pl-7">{item.content}</p>
        <p className="text-xs text-right pr-2 mt-1">
          {moment(item.createdAt).format("MMM Do YY")}
        </p>
      </div>
    ))}
  </div>  
  }


<CommentForm blogId={id}/>
  

  
  <div className="w-full max-w-3xl mt-10 text-white md:ml-50">
    <h1 className="text-lg font-semibold mb-2">Share your article on</h1>
    <div className="flex text-2xl md:text-3xl gap-4">
       <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${blogUrl}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaFacebook size={30} className="text-blue-600 hover:scale-110 transition" />
      </a>
   
  <FaInstagram size={30} className="text-pink-600 hover:scale-110 transition cursor-pointer" onClick={handleCopy} />
      <a
        href={`https://twitter.com/intent/tweet?url=${blogUrl}&text=${blogTitle}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaTwitter size={30} className="text-blue-400 hover:scale-110 transition" />
      </a>
    </div>
  </div>
    </div>
  ) 
  : <Loader/>
}

export default Blog