import axios from "axios"
import { EmailAction } from "./Emailslice";

export function PostEmail(Obj) {

    return async (dispatch) => {

        const sendRequest = async () => {
            const RecMail = Obj.receivermail.replace("@", "").replace(".", "");
            localStorage.setItem("receiver", RecMail)
            const response = await axios.post(`https://mailbox-e273f-default-rtdb.firebaseio.com/${RecMail}.json`, Obj);

            if (response.statusText !== "OK") {
                throw new Error('Sending data failed.');
            }

            const email = localStorage.getItem("email").replace("@", "").replace(".", "");
            const responsesec = await axios.post(`https://mailbox-e273f-default-rtdb.firebaseio.com/${email}.json`, Obj);
           

            if (responsesec.statusText !== "OK") {
                throw new Error('Sending data failed.');
            }


        }
        try {
            await sendRequest()
        }
        catch (error) {
            console.log(error)
        }
    }
}


export function GetEmail() {

    return async (dispatch) => {

        const fetchData = async () => {
            const RecMail = localStorage.getItem("receiver")
          
            const response = await axios.get(`https://mailbox-e273f-default-rtdb.firebaseio.com/${RecMail}.json`);
            const responseObject = response.data
            return responseObject
        }

        try {
            const responsedata = await fetchData()
            const responsearray = []

            if (responsedata === null) {
                dispatch(EmailAction.add({
                    maildata: [],
                    unreadarray: null,
                    count: 0
                }))
                return
            }

            Object.keys(responsedata).forEach(key => {
                const newObj = { key: key, total: responsedata[key].read, ...responsedata[key] };
                responsearray.push(newObj)
            })
            const unread = responsearray.filter(item => {
                return item.total === false
            })

            dispatch(EmailAction.add({
                maildata: responsearray,
                unreadarray: unread,
                count: unread.length
            }))

        } catch (error) {
            console.log(error)
        }
    }
}


export function SentGetEmail() {

    return async (dispatch) => {

        const SentfetchData = async () => {
            const email = localStorage.getItem("email")
          
            const response = await axios.get(`https://mailbox-e273f-default-rtdb.firebaseio.com/${email}.json`);
            const responseObject = response.data
            return responseObject
        }

        try {
            const responsedata = await SentfetchData()
            const responsearray = []

            if (responsedata === null) {
                dispatch(EmailAction.Sent({
                    sendmaildata: [],
                    sendcount:0
                    
                }))
                return
            }

            Object.keys(responsedata).forEach(key => {
                const newObj = { key: key,  ...responsedata[key] };
                responsearray.push(newObj)
            })
           
           
            dispatch(EmailAction.Sent({
                sendmaildata:responsearray,
                sendcount:responsearray.length
                }))

        } catch (error) {
            console.log(error)
        }
    }
}


export function PUTEmail(Obj, id) {

    return async (dispatch) => {

        const PutRequest = async () => {
         
            const RecMail = Obj.receivermail.replace("@", "").replace(".", "");
            localStorage.setItem("receiver", RecMail)
            const response = await axios.put(`https://mailbox-e273f-default-rtdb.firebaseio.com/${RecMail}/${id}.json`, {
                ...Obj,
                read: true, total: true
            });

           
            if (response.statusText !== "OK") {
                throw new Error(' put request failed.');
            }
        }
        try {
            await PutRequest()
            dispatch(EmailAction.remove())

        }
        catch (error) {
            console.log(error)
        }
    }


}


export function DeleteEmail(Obj, id) {

    return async (dispatch) => {

        const DeleteRequest = async () => {

            const RecMail = Obj.receivermail.replace("@", "").replace(".", "");
            localStorage.setItem("receiver", RecMail)
            const response = await axios.delete(`https://mailbox-e273f-default-rtdb.firebaseio.com/${RecMail}/${id}.json`);
          
            if (response.statusText !== "OK") {
                throw new Error('deleting data failed.');
            }
        }
        try {
            await DeleteRequest()

        }
        catch (error) {
            console.log(error)
        }
    }


}
