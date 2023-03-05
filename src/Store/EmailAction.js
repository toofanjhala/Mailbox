import axios from "axios"
import { EmailAction } from "./Emailslice";

export function PostEmail(Obj) {
    const RecMail = Obj.receivermail.replace("@", "").replace(".", "");
    localStorage.setItem("receiver",RecMail)
 
  return async (dispatch) => {
       
        try {
            console.log(RecMail)
            const response = await axios.post(`https://mailbox-e273f-default-rtdb.firebaseio.com/${RecMail}.json`, Obj);
           
            console.log(response)


        } catch (error) {
            console.log(error)
        }
    }
}


export function GetEmail(Obj) {
    const RecMail = localStorage.getItem("receiver")
 
  return async (dispatch) => {
       
        try {
          
            const response = await axios.get(`https://mailbox-e273f-default-rtdb.firebaseio.com/${RecMail}.json`);
            if (!response.data) {
               console.log("null")
             }
             const responseObject = response.data
            
             const responsearray = []
              Object.keys(responseObject).forEach(key => {
                const newObj = { key: key, ...responseObject[key] };
                responsearray.push(newObj)
              });
        
             
             
        
            dispatch(EmailAction.add({
                maildata:responsearray
            }))
      
        } catch (error) {
            console.log(error)
        }
    }
}



