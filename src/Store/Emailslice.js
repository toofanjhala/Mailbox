import { createSlice } from "@reduxjs/toolkit";

const Emailslice=createSlice({
    name:"Email",
    initialState:{
        maildata:[],
        unreadarray:[],
        count:0
        
       },
reducers:{
    add(state,action){
        state.maildata= action.payload.maildata
        state.count=action.payload.count
        state.unreadarray=action.payload.unreadarray
    },
    remove(state){
        state.count--
    }
}
    })

    export const EmailAction=Emailslice.actions
    export const Emailreducer=Emailslice.reducer