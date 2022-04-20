import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const INITIALSTATE = {
    cutLists : [],
}

const CutVideoSlice = createSlice({
    name:"cutList",
    initialState : INITIALSTATE,
    reducers:{
        

    }
})

export default CutVideoSlice.reducer