import { configureStore } from '@reduxjs/toolkit'
import authReducer from "../redux/slice/authSlice.js"
import adminReducer from "../redux/slice/adminSlice.js"
import blogReducer from "../redux/slice/blogSlice.js"
import commentReducer from "../redux/slice/commentSLice.js"
import searchReducer from "../redux/slice/searchSlice.js"

export const store = configureStore({
  reducer: {
    auth:authReducer,
    admin:adminReducer,
    blog:blogReducer,
    comment:commentReducer,
    search:searchReducer
  },
})