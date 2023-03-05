import { createSlice } from "@reduxjs/toolkit";

const Emailslice=createSlice({
    name:"Email",
    initialState:{
        maildata:[],
        counter:0,
        senderemailid:localStorage.getItem("email"),
        
},
reducers:{
    add(state,action){
        state.maildata=[action.payload , ...state.maildata]
    },
    addcount(state){
        state.counter++
    }
}
    })

    export const EmailAction=Emailslice.actions
    export const Emailreducer=Emailslice.reducer