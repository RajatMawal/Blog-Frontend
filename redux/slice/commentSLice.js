import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchComment = createAsyncThunk(
  "admin/comments",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/Comments`,
        {withCredentials:true}
      );
    
      return res.data.allComments
    } catch (error) {
         console.error("Error:", error)
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "unable to fetch comments"
      );
    }
  }
);

export const addComment = createAsyncThunk("home/commentForm",async(commentData,thunkAPI)=>{
try {
  const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/comment/addComment`,
  commentData
  )
  return res.data
} catch (error) {
  return thunkAPI.rejectWithValue(error.res?.data?.message || "unable to add Comment")
}
})

export const commentApprove = createAsyncThunk("admin/approve" , async(id,thunkAPI)=>{
 try {
   const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/admin/approve-comments`,{id})
  //  thunkAPI.dispatch(fetchComment());
  return res.data.message
 } catch (error) {
  console.log(error)
  return thunkAPI.rejectWithValue(error.res.data.message  || "approve comment failed")
 }
})

export const homeComments = createAsyncThunk("blog/comments",async(id,thunkAPI)=>{
  try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/comment/allComments`,{id})
      return res.data.getComment
  } catch (error) {
    console.log(error)
    return thunkAPI.rejectWithValue(error.response.data.messsage || "unable to fetch comments")
  }
})

export const deleteComment = createAsyncThunk("admin/deleteComments",async(id,thunkAPI)=>{
  try {
    const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/admin/delete-comments`,{id})

    return res.data
  } catch (error) {
    console.log(error)
    return thunkAPI.rejectWithValue(error.response.data.message || "unable to delete")
  }
})

const comment = createSlice({
  name: "comments",
  initialState: {
    allComments: [],
    commentForm:[],
    blogAllComments:[],
    loading: false,
    error: null,
    approve:null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComment.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchComment.fulfilled, (state, action) => {
        state.loading = false;
        state.allComments = action.payload;
         })
      .addCase(fetchComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }) .addCase(addComment.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.loading = false;
        state.allComments = action.payload;
         })
      .addCase(addComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }).addCase(commentApprove.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(commentApprove.fulfilled, (state, action) => {
        state.loading = false;
        state.approve = action.payload;
         })
      .addCase(commentApprove.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }).addCase(homeComments.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(homeComments.fulfilled, (state, action) => {
        state.loading = false;
        state.blogAllComments = action.payload;
         })
      .addCase(homeComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }).addCase(deleteComment.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.loading = false;
        const id = action.payload
        state.blogAllComments = state.blogAllComments.filter((c)=>c._id !== id)
        state.allComments = state.blogAllComments.filter((c)=>c._id !== id)
         })
      .addCase(deleteComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default comment.reducer;
