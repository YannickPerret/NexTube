import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

//VIDEO INFORMATIONS
export const getOneVideo = createAsyncThunk("videoInfos/getOneVideo", async (video) => {
      return fetch(`http://localhost:3500/api/getOneVideo/${video.url}/${video.idTimeLine}`, { method:"GET" })
    .then((res) => res.json())
    .catch(e => console.error(e))
});


export const getAllVideoBySearch = createAsyncThunk("videoInfos/getAllVideoBySearch", async (search) => {
    return fetch(`http://localhost:3500/api/getAllVideoBySearch/${search}`, { method:"GET" })
    .then((res) => res.json())
})


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

        removeAllVideo: (state, action) => {
            state.video = []

            return state
        },
        removeAllCut : (state, action) => {
            state.cutLists = []

            return state
        }

    },
    extraReducers: {

        [getOneVideo.pending]: (state, action) => {
            state.loading = true;
        },

        [getOneVideo.fulfilled]: (state, action) => {
            state.loading = false

            const addNewVideo = [{
                idUrl: action.payload.video.url,
                idPlateformProvider : action.payload.video.idPlateforme,
                isEdit : action.payload.video.isEdit,
                title : action.payload.video.title,
                dataSet : action.payload.video.dataSet,
            }];
            state.video = addNewVideo


            if(action.payload.timeLine){
                const addNewCutTimeline = [{
                    id: action.payload.timeLine.idSkip,
                    url: action.payload.timeLine.urlVideo,
                    idUser : action.payload.timeLine.idUser,
                    title: action.payload.timeLine.title,
                    dataSet : JSON.parse(action.payload.timeLine.dataSet),
                }];
                state.cutLists = addNewCutTimeline

            }
            
        },

        [getOneVideo.rejected]: (state, action) => {
            console.log("test3")
            state.loading = false;
            state.errorMessage.error = true
            state.errorMessage.message = action.payload
        },


   
        [getAllVideoBySearch.pending] : (state, action) => {
            state.loading = true
        },

        [getAllVideoBySearch.fulfilled] : (state, action) => {
            state.loading = false

            state.video = action.payload.video
            state.cutLists = action.payload.cutList
        },

        [getAllVideoBySearch.rejected] : (state, action) => {
            state.loading = false
        }
    },
})

export default videoSlice.reducer;