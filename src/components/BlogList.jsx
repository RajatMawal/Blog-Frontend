import { useState, useEffect } from "react";
import Cards from "./Cards";
import Newsletter from "./Newsletter";
import { useDispatch, useSelector } from "react-redux";
import { allBlogs } from "../../redux/slice/blogSlice.js";

const BlogList = () => {
  const categories = ["all", "technology", "startup", "lifestyle", "finance"];
  const [menu, setMenu] = useState("all");

  const dispatch = useDispatch();
  const { allBlog } = useSelector((state) => state.blog);
  const { filteredData } = useSelector((state) => state.search);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        await dispatch(allBlogs()).unwrap();
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      }
    };
    fetchBlogs();
  }, [dispatch]);

  const publishedBlogs = allBlog?.filter((item) => item.isPublished === true) || [];

  const blogsToDisplay =
    filteredData?.length > 0
      ? filteredData
      : publishedBlogs.filter((blog) =>
          menu === "all" ? true : blog.category?.toLowerCase() === menu.toLowerCase()
        );

  return (
    <>
    
      <div className="flex  gap-2 md:justify-around mt-3 mb-4">
        {categories.map((category, idx) => (
          <div key={idx} className="first-letter:uppercase">
            <button
              className={`cursor-pointer px-2.5 rounded-sm ${
                category === menu
                  ? "bg-white/20 text-white transform ease-in-out duration-300"
                  : "text-white bg-[#757575]"
              }`}
              onClick={() => setMenu(category)}
            >
              {category}
            </button>
          </div>
        ))}
      </div>

    
      <div className="grid grid-cols-1 sm:grid-cols-2 ml-6 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4">
        {blogsToDisplay.map((blog) => (
          <Cards key={blog._id} blog={blog} />
        ))}
      </div>

      
      <div className="flex justify-center">
        <Newsletter />
      </div>
    </>
  );
};

export default BlogList;
