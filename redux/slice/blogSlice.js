import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getToken } from "../../utils/token";

axios.defaults.withCredentials = true;

export const isPublish = createAsyncThunk(
  "admin/publish",
  async (id, thunkAPI) => {
    try {
      const token = getToken();
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/blog/toggle-publish`,
        { id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data.blogs;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Toggle failed"
      );
    }
  }
);

export const addBlog = createAsyncThunk(
  "admin/addBlog",
  async (blogData, thunkAPI) => {
    try {
      const token = getToken();
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/blog/addBlog`,
        blogData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data.blogs;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Unable to add blog"
      );
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
        error.response?.data?.message || "Unable to fetch blogs"
      );
    }
  }
);

export const deleteBlog = createAsyncThunk(
  "admin/blogDelete",
  async (id, thunkAPI) => {
    try {
      const token = getToken();
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/blog/delete`,
        { id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data; // should return something like { id: "..." }
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Unable to delete blog"
      );
    }
  }
);

export const blogById = createAsyncThunk(
  "home/getBlogById",
  async (blogId, thunkAPI) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/blog/${blogId}`
      );
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Blog not found"
      );
    }
  }
);

const blog = createSlice({
  name: "blog",
  initialState: {
    Blog: [],
    allBlog: [],
    singleBlog: null,
    toggle: null,
    loading: false,
    delete: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(isPublish.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(isPublish.fulfilled, (state, action) => {
        state.loading = false;
        state.toggle = action.payload;
      })
      .addCase(isPublish.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.Blog = action.payload;
      })
      .addCase(addBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(allBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(allBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.allBlog = action.payload;
      })
      .addCase(allBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.toggle = !state.toggle;
        state.allBlog = state.allBlog.filter(
          (blog) => blog._id !== action.payload.id
        );
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(blogById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(blogById.fulfilled, (state, action) => {
        state.loading = false;
        state.singleBlog = action.payload;
      })
      .addCase(blogById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default blog.reducer;
