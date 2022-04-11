import { createSlice } from "@reduxjs/toolkit";

export const videoInfo = createSlice({
    name: 'video',
    initialState :{
        url : '',
        title : '',
        isEdit : false,
        dataSet : [],
    },
    reducers:{
        setVideoInfo : state =>{
            console.log(state)
        }
    }
})


export const {setVideoInfo} = videoInfo.actions

export default videoInfo.reducer