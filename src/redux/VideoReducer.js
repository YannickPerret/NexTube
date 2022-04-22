import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

//VIDEO INFORMATIONS
export const getVideoByURL = createAsyncThunk("videoInfos/getVideoByURL", async (url) => {
    return fetch(`http://localhost:3500/api/getVideo/${url}`, { method:"GET" })
    .then((res) => res.json())
    .catch(e => e)
});

export const getAllVideoBySearch = createAsyncThunk("videoInfos/getAllVideoBySearch", async (search) => {
    return fetch(`http://localhost:3500/api/getAllVideoBySearch/${search}`, { method:"GET" })
    .then((res) => res.json())
})



//CUT VIDEO 



/*export const getCutsByUrl = createAsyncThunk("videoInfos/getCutsByUrl", async (url) => {
    return fetch(`http://localhost:3500/api/getCutByUrl/${url}`, { method:"GET" })
    .then((res) => res.json())
})

*/


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

        getOneVideo: (state, action) => {
            //type :  videoInfos/getOneVideo  payload : idVideo
            state.video = state.video.filter(item => item.url === action.payload)
            return state
        },

        getOneCut : (state, action) => {
            //type :  videoInfos/getOneCut  payload : idCut 
            console.log(state.cutLists)
            state.cutLists = state.cutLists.filter(item => item.id === action.payload)

            return state   
        },

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