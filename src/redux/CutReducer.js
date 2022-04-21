import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export const getCutsByUrl = createAsyncThunk("cutList/getCutsByUrl", async (url) => {

    return fetch(`http://localhost:3500/api/getCutByUrl/${url}`, { method:"GET" })
    .then((res) => res.json())
    .catch(e => e)
})

const INITIALSTATE = {
    cutLists : [],
    loading : false
}

const CutVideoSlice = createSlice({
    name:"cutList",
    initialState : INITIALSTATE,
    reducers:{
        addNewCuts: (state, action) => {
            //{type: "cutList/addNewCuts"}
            state.push(action.payload)
        },

    },

    extraReducers:{
        [getCutsByUrl.pending] : (state, action) => {
            state.loading = true
        },
        [getCutsByUrl.fulfilled] : (state, action) => {
            state.loading = false

            //state.video.push(action.payload)

            console.log(state.video)
        },
        [getCutsByUrl.rejected] : (state, action) => {
            state.loading = false
        }
    }
})

export default CutVideoSlice.reducer