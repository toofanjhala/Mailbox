import { configureStore } from "@reduxjs/toolkit";
import { AuthReducer } from "./AuthSlice";

const store= configureStore({
    reducer:{ Auth:AuthReducer}
})

export default store