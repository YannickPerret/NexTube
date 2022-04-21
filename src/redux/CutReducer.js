import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const getCutsByUrl = createAsyncThunk("cutList/getCutsByUrl", async (url) => {
    return fetch(`http://localhost:3500/api/getCutByUrl/${url}`, { method:"GET" })
    .then((res) => res.json())
})

export const getVideoBySearch = createAsyncThunk("cutList/getVideoBySearch", async (search) => {
    return fetch(`http://localhost:3500/api/getVideoBySearch/${search}`, { method:"GET" })
    .then((res) => res.json())
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
        },


        [getVideoBySearch.pending] : (state, action) => {
            state.loading = true
        },
        [getVideoBySearch.fulfilled] : (state, action) => {
            state.loading = false
            console.log(state)

            //state.video.push(action.payload)

        },
        [getVideoBySearch.rejected] : (state, action) => {
            state.loading = false
        }
    }
})

export default CutVideoSlice.reducer