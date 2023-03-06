import { createSlice } from "@reduxjs/toolkit";

const Emailslice=createSlice({
    name:"Email",
    initialState:{
        maildata:[],
        sendmaildata:[],
        unreadarray:[],
        count:0,
        sendcount:0,
        
       },
reducers:{
    add(state,action){
        state.maildata= action.payload.maildata
        state.count=action.payload.count
        state.unreadarray=action.payload.unreadarray
    },
    remove(state){
        state.count--
    },
    Sent(state,action){
        state.sendmaildata=action.payload.sendmaildata
        state.sendcount=action.payload.sendcount
    }
}
    })

    export const EmailAction=Emailslice.actions
    export const Emailreducer=Emailslice.reducer