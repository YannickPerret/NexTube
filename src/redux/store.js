import { configureStore } from "@reduxjs/toolkit"
import videoReducer from "./VideoReducer"

export default configureStore({
    reducer: {
        videoInfos : videoReducer,
        devTools: true,
    },
})