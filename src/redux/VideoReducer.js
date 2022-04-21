import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

//VIDEO INFORMATIONS
export const getVideoByURL = createAsyncThunk("videoInfos/getVideoByURL", async (url) => {
    return fetch(`http://localhost:3500/api/getVideo/${url}`, { method:"GET" })
    .then((res) => res.json())
    .catch(e => e)
});


//CUT VIDEO 



/*export const getCutsByUrl = createAsyncThunk("videoInfos/getCutsByUrl", async (url) => {
    return fetch(`http://localhost:3500/api/getCutByUrl/${url}`, { method:"GET" })
    .then((res) => res.json())
})

export const getVideoBySearch = createAsyncThunk("videoInfos/getVideoBySearch", async (search) => {
    return fetch(`http://localhost:3500/api/getVideoBySearch/${search}`, { method:"GET" })
    .then((res) => res.json())
})*/


const INITIALSTATE = {
    video : [],
    cutLists : [],
    loading : false,
    errorMessage:{error : false, message : ""},
}

const videoSlice = createSlice({
    name: 'videoInfos',
    initialState: INITIALSTATE,
    reducers:{

        updateVideoInfos: (state, action) => {
            //{type : "videoInfos/updateVideoInfos"}
        },

        removeVideoInfos : (state, action) => {
            //{type : "videoInfos/removeVideoInfos"}
            state = state.filter(item => item.id !== action.payload)
            return state
        },
    },
    extraReducers: {

        //VIDEO INFO
        [getVideoByURL.pending]: (state, action) => {
            state.loading = true;
        },

        [getVideoByURL.fulfilled]: (state, action) => {
            state.loading = false

            const addNewVideo = {
                idUrl: action.payload.url,
                idPlateformProvider : action.payload.idPlateforme,
                isEdit : action.payload.isEdit,
                title : action.payload.title,
                dataSet : action.payload.dataSet
            };
            state.video.push(addNewVideo)
        },

        [getVideoByURL.rejected]: (state, action) => {
            state.loading = false;
            state.errorMessage.error = true
            state.errorMessage.message = action.payload
        },


        // CUT VIDEO
        /*[getVideoBySearch.pending] : (state, action) => {
            state.loading = true
        },

        [getVideoBySearch.fulfilled] : (state, action) => {
            state.loading = false

            state.video = action.payload.video
            state.cutLists = action.payload.cutList
        },

        [getVideoBySearch.rejected] : (state, action) => {
            state.loading = false
        }*/
    },
})

export default videoSlice.reducer;