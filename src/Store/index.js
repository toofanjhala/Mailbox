import { configureStore } from "@reduxjs/toolkit";
import { AuthReducer } from "./AuthSlice";
import { Emailreducer } from "./Emailslice";

const store= configureStore({
    reducer:{ Auth:AuthReducer, Email:Emailreducer}
})

export default store