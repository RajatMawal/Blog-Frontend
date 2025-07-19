import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addComment, homeComments } from '../../redux/slice/commentSLice.js';


const CommentForm = (id) => {

  const [comment , setComment] = useState(
    {
      blog:id.blogId,
      name:"",
      content:""
    }
  )

  const dispatch = useDispatch()

  function handleInput(e){
  const {name,value} = e.target
    setComment(prev =>({
      ...prev, [name]:value
    }))
  }


  const handleSubmit = async(e)=>{
    e.preventDefault()
    try{
    const result =await dispatch(addComment(comment)).unwrap()
    setComment({
     blog:id.blogId,
     name:"",
     content:""
    })

    if(result){
    dispatch(homeComments(id.blogId))
    }
    }catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="w-full max-w-3xl  flex flex-col gap-4 text-white md:ml-50">
    <h1 className="text-xl font-semibold">Add your comments</h1>
    {/* <input type="text" value={id.blogId} className='hidden' name='blog' onChange={handleInput}/> */}
    <input
      type="text"
      placeholder="Name"
      className="border border-gray-300 w-full p-2 bg-white/20 rounded-md"
      name="name"
      onChange={handleInput}
      value={comment.name}
          />
    <textarea
      className="border border-gray-300 w-full h-40 resize-none p-2 bg-white/20 rounded-md"
      placeholder="Comment"
      name="content"
      onChange={handleInput}
      value={comment.content}
    />
    <Button
      sx={{
        backgroundColor: "#1de9b6",
        width: "150px",
        color: "#000",
        fontWeight: 600,
      }}
      type='submit'
    >
      Submit
    </Button>
  </form>
    </>
  )
}

export default CommentForm