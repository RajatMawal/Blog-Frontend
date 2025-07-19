import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const searchFilter = createAsyncThunk("home/search", async(search,thunkAPI)=>{
    try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/search`,{
            params:{  category: search }
        })
        return res.data.result
    } catch (error) {
        console.log(error)
        return thunkAPI.rejectWithValue(error.response.data.message || "server error")
    }
})


const search = createSlice({
    name:"search",
    initialState:{
        filteredData:[],
        loading:false,
        error:null
    },
    reducers:{},
    extraReducers: (builders)=>{
        builders.addCase(searchFilter.pending,(state)=>{
            state.loading = true,
            state.error = null
        }
        ).addCase(searchFilter.fulfilled,(state,action)=>{
            state.loading = false,
            state.filteredData = action.payload
        }
        ).addCase(searchFilter.rejected,(state,action)=>{
            state.loading = false,
            state.error = action.payload
        }
        )
    }
    
})

export default search.reducer