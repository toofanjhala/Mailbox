import axios from "axios"


export function PostEmail(Obj) {
    const RecMail = Obj.receivermail.replace("@", "").replace(".", "");
 
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


