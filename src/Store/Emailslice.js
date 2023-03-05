import { createSlice } from "@reduxjs/toolkit";

const Emailslice=createSlice({
    name:"Email",
    initialState:{
        maildata:[],
       },
reducers:{
    add(state,action){
        state.maildata= action.payload.maildata
    },
    
}
    })

    export const EmailAction=Emailslice.actions
    export const Emailreducer=Emailslice.reducer