import axios from "axios"
import { EmailAction } from "./Emailslice";

export function PostEmail(Obj) {
    const RecMail = Obj.receivermail.replace("@", "").replace(".", "");
    localStorage.setItem("receiver",RecMail)
 
  return async (dispatch) => {
       
        try {
      
            const response = await axios.post(`https://mailbox-e273f-default-rtdb.firebaseio.com/${RecMail}.json`, Obj);
           
            console.log(response)


        } catch (error) {
            console.log(error)
        }
    }
}


export function GetEmail() {
    const RecMail = localStorage.getItem("receiver")

    console.log("get request")
 
  return async (dispatch) => {
       
        try {
          
            const response = await axios.get(`https://mailbox-e273f-default-rtdb.firebaseio.com/${RecMail}.json`);
            if (!response.data) {
               console.log("null")
             }
             const responseObject = response.data

            
            
             const responsearray = []
             
              Object.keys(responseObject).forEach(key => {
     const newObj = { key: key, total:responseObject[key].read , ...responseObject[key] };
                responsearray.push(newObj)
           
             })
        
                 
             const unread= responsearray.filter(item=>{
                return item.total===false
            })
         
             
             
        
            dispatch(EmailAction.add({
                maildata:responsearray,
                unreadarray:unread,
                count:unread.length


             
            }))
      
        } catch (error) {
            console.log(error)
        }
    }
}


export function PUTEmail(Obj,id) {
    
    const RecMail = Obj.receivermail.replace("@", "").replace(".", "");
    localStorage.setItem("receiver",RecMail)
 
  return async (dispatch) => {
       
        try {
           
            const response = await axios.put(`https://mailbox-e273f-default-rtdb.firebaseio.com/${RecMail}/${id}.json`, { ...Obj,
                read:true,total:true
            });
           
            console.log(response)
             

        } catch (error) {
            console.log(error)
        }
    }

   
}
