

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getToken } from "../../utils/token.js";

export const getDashboard = createAsyncThunk("admin/dashboard", async (_, thunkAPI) => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/dashboard`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return res.data.dashBoardData;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Unable to fetch dashboard");
  }
});

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    dashboard: {
      blog: 0,
      comments: 0,
      drafts: 0,
      recentBlogs: [],
    },
    error: null,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDashboard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.dashboard = action.payload;
      })
      .addCase(getDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default adminSlice.reducer;
