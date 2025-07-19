import { BsTypeBold } from "react-icons/bs";
import { FaItalic, FaUnderline, FaListUl } from "react-icons/fa";
import { IoIosLink } from "react-icons/io";
import { MdFormatListNumbered, MdOutlineArrowDropDown } from "react-icons/md";
import { Button } from "@mui/material";
import Quill from "quill";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { addBlog } from "../../../redux/slice/blogSlice.js";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../components/Loader.jsx";

const AddBlog = () => {
  const editorRef = useRef(null);
  const quillRef = useRef(null);
  const descriptionRef = useRef("");

  const navigate = useNavigate();

  const [data, setData] = useState({
    title: "",
    description: "",
    subTitle: "",
    image: null,
    isPublished: false,
    category: "startup",
  });

  const dispatch = useDispatch();

  function handleInput(e) {
    const { value, name, files, type, checked } = e.target;
    let file = files?.[0];

    if (type === "file") {
      if (file) {
        setData((prev) => ({
          ...prev,
          [name]: file,
        }));
      }
    } else if (type === "checkbox") {
      setData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  }

  const handleSubmit = async(e)=>{
    e.preventDefault();
    const formData = new FormData();

    formData.append(
      "blog",
      JSON.stringify({
        title: data.title,
        subtitle: data.subTitle,
        description: data.description,
        isPublished: data.isPublished,
        category: data.category,
      })
    );
    formData.append("image", data.image);
    //     for (let pair of formData.entries()) {
    //   console.log(pair[0], pair[1]);
    // }
try {
    const result = await dispatch(addBlog(formData)).unwrap();

    toast.success("Blog added successfully", { theme: "dark" });

    setTimeout(
      ()=>{
        <Loader/>
      },4000
    )

    navigate("/admin");


  } catch (err) {
    toast.error("Blog not added");
  }

    
  }


  useEffect(
    () => {
      if (!quillRef.current && editorRef.current) {
        quillRef.current = new Quill(editorRef.current, { theme: "snow" });

        quillRef.current.on("text-change", () => {
          const html = quillRef.current.root.innerHTML;
          if (html !== descriptionRef.current) {
          setData((prev) => {
            const updated = { ...prev, description: html };
            descriptionRef.current = html; 
            return updated;
          });

          
        }

        });
      }
    },
    [handleSubmit]
  );
  return (
    <div className="min-h-screen bg-[#121212] px-4 py-8 sm:px-6 md:px-10 flex justify-center">
      <form
        className="w-full max-w-3xl bg-[#1e1e1e] border border-gray-700 p-6 sm:p-8 rounded-xl space-y-6 shadow-xl text-white"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-center">Add Blog</h1>

        <div>
          <label className="block mb-2 text-sm text-gray-300">
            Upload Thumbnail
          </label>
          <input
            type="file"
            accept="image/*"
            className="w-full file:bg-blue-600 file:text-white file:px-4 file:py-1.5 file:rounded file:border-none text-sm bg-white/10 border border-gray-700 rounded-md p-2"
            onChange={handleInput}
            name="image"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm text-gray-300">Blog Title</label>
          <input
            type="text"
            placeholder="Type here"
            className="w-full bg-white/10 border border-gray-700 rounded-md p-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={data.title}
            onChange={handleInput}
            name="title"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm text-gray-300">Sub Title</label>
          <input
            type="text"
            placeholder="Type here"
            className="w-full bg-white/10 border border-gray-700 rounded-md p-2 text-white placeholder-gray-400"
            value={data.subTitle}
            onChange={handleInput}
            name="subTitle"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm text-gray-300">
            Blog Description
          </label>
          <div ref={editorRef}></div>
         
        </div>

        {/* Blog Category */}
        <div>
          <label className="block mb-2 text-sm text-gray-300">
            Blog Category
          </label>
          <select
            className="w-full bg-white/10 border border-gray-700 rounded-md p-2 text-white "
            value={data.category}
            onChange={handleInput}
            name="category"
          >
            <option value="startup" className="bg-black/70">startup</option>
            <option value="lifeStyle" className="bg-black/70">lifeStyle</option>
            <option value="finance" className="bg-black/70">finance</option>
            <option value="technology" className="bg-black/70">technology</option>
          </select>
        </div>

        {/* Publish Now */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="publish"
            checked={data.isPublished}
            name="isPublished"
            onChange={handleInput}
          />
          <label htmlFor="publish" className="text-sm text-gray-300">
            Publish Now
          </label>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="!bg-blue-600 hover:!bg-blue-700 !text-white !px-6 !py-2 !rounded"
          >
            Add Blog
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddBlog;
