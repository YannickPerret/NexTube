import { configureStore } from "@reduxjs/toolkit";
import videoReducer from "./reducer/videos";

export default configureStore({
    reducer: {
        video : videoReducer
    },
})