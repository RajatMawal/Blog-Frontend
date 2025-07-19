
import { useState } from "react";
import Cards from "./Cards";
import { blogCategories , blog_data} from "../assets/assets";
import Newsletter from "./Newsletter";
import { useDispatch, useSelector } from 'react-redux'
import { allBlogs } from '../../redux/slice/blogSlice.js'
import { useEffect } from 'react'


const BlogList = () => {
  const List = ["all", "technology", "startup", "lifeStyle", "finance"];

  const [menu, setMenu] = useState("all")

  const {allBlog} = useSelector((state)=>state.blog)


const dispatch = useDispatch()
  useEffect(()=>{
  dispatch(allBlogs())
},[])

  const {filteredData} = useSelector((state)=>state.search)


const filterBlog = allBlog.filter((item)=>
  item.isPublished === true
)


  return (
    <>
    <div className="flex pl-3 sm:gap-2 md:justify-around mt-3 mb-4 ">
      {List.map((Content, idx) => (
        <div key={idx} className="first-letter:uppercase">
            <button className={`cursor-pointer px-2.5 rounded-sm ${Content === menu ? " bg-white/20 text-white transform ease-in-out duration-300 ":"text-white bg-[##757575]"}`} onClick={()=>setMenu(Content)}>
                {Content}
            </button>
        </div>
      ))}
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 ml-3.5 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4 ">
      {
        filteredData.length > 0 ? 
          filteredData.map((blog)=>
        <Cards key={blog._id} blog={blog} />
          )
        :
        filterBlog.filter((blog)=> menu === "all"? true : blog.category===menu).map((blog)=> 
        <Cards key={blog._id} blog={blog} />
        )
      }
        {}
    </div>
    <div className="flex justify-center">
    <Newsletter/>
    </div>
    </>
  );
};

export default BlogList;
