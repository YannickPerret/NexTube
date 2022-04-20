import { configureStore } from "@reduxjs/toolkit"
import CutReducer from "./CutReducer"
import videoReducer from "./VideoReducer"

export default configureStore({
    reducer: {
        videoInfos : videoReducer,
        cutListInfo : CutReducer,
        devTools: true,
    },
})