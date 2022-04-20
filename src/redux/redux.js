import { configureStore, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getVideoByURL = createAsyncThunk("videoInfos/getVideoByURL", async (url) => {
    return fetch(`http://localhost:3500/api/getVideo/${url}`, { method:"GET" })
    .then((res) => res.json())
    .catch(e => e)
});


const INITIALSTATE = {
    video : [],
    loading : false,
    errorMessage:{error : false, message : ""},
}

export const videoSlice = createSlice({
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
        }
    },
})


export const store = configureStore({
    reducer: {
        videoInfos : videoSlice.reducer,
        devTools: true,
    },
})