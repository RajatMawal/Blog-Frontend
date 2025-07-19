import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


axios.defaults.withCredentials = true;

export const isPublish = createAsyncThunk(
  "admin/publish",
  async (id, thunkAPI) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/blog/toggle-publish`,
        { id }
      );
      return res.data.blogs;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.res?.data?.message || "toggle failed"
      );
    }
  }
);

export const addBlog = createAsyncThunk(
  "admin/addBlog",
  async (blogData, thunkAPI) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/blog/addBlog`,
        blogData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return res.data.blogs;
    } catch (error) {
      return thunkAPI.rejectWithValue(res.data.message || "unable to add data");
    }
  }
);

export const allBlogs = createAsyncThunk(
  "admin/allBlog",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/blog/allBlogs`
      );
      return res.data.blogs;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.res?.data?.message || "unable to fetch blogs"
      );
    }
  }
);

export const deleteBlog = createAsyncThunk(
  "admin/blogDelete",
  async (id, thunkAPI) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/blog/delete`,
        { id }
      );

      return res.data;
    } catch (error) {
      console.log(error)
     const message =
        error.response?.data?.message || error.message || "Unable to delete";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const blogById = createAsyncThunk("home/getBlogById",
  async (blogId, thunkAPI) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/blog/${blogId}`
      );
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.res.data.message || "blog not found"
      );
    }
  });

const blog = createSlice({
  name: "blog",
  initialState: {
    Blog: [
      {
        title: "",
        description: "",
        subtitle: "",
        image: null,
        isPublished: false,
        category: "",
      },
    ],
    allBlog: [],
    singleBlog: null,
    toggle: null,
    loading: false,
    delete: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builders) => {
    builders
      .addCase(isPublish.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(isPublish.fulfilled, (state, action) => {
        state.toggle = action.payload;
        state.loading = false;
      })
      .addCase(isPublish.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addBlog.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(addBlog.fulfilled, (state, action) => {
        (state.loading = false), (state.Blog = action.payload);
      })
      .addCase(addBlog.rejected, (state, action) => {
        (state.loading = false), (state.error = action.payload);
      })
      .addCase(allBlogs.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(allBlogs.fulfilled, (state, action) => {
        (state.loading = false), (state.allBlog = action.payload);
      })
      .addCase(allBlogs.rejected, (state, action) => {
        (state.loading = false), (state.error = action.payload);
      })
      .addCase(deleteBlog.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.toggle = !state.toggle;
        state.allBlog = state.allBlog.filter(
          (blog) => blog._id !== action.payload.id
        );
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        (state.loading = false), (state.error = action.payload);
      })
      .addCase(blogById.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(blogById.fulfilled, (state, action) => {
        state.loading = false;
        state.singleBlog = action.payload;
      })
      .addCase(blogById.rejected, (state, action) => {
        (state.loading = false), (state.error = action.payload);
      });
  },
});

export default blog.reducer;
