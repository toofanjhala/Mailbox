import React, {  useEffect,useState } from "react";
import classes from "./Inbox.module.css";
import { useDispatch ,useSelector} from "react-redux";
import { GetEmail } from "../../Store/EmailAction";
import { Header } from '../UI/Header'
import { Button } from "react-bootstrap";
import EmailCompose from "./EmailCompose";
import { CiUnread } from "react-icons/ci";
import { PUTEmail } from "../../Store/EmailAction";


function Inbox() {
const count=useSelector((state)=>state.Email.count)
const [showbox,setshowbox]=useState(false)

const emails=useSelector((state)=>state.Email.maildata)


  function composeHandler(){
       setshowbox(!showbox)
  }
  const dispatch=useDispatch()
  useEffect(() => {
    dispatch(GetEmail())
   
  }, [count,dispatch]);


  return (
   <>
    <Header/> 
    <Button className={classes.composebutton}  variant="info" onClick={composeHandler}>Compose</Button>
    <Button  className={classes.composebutton} variant="danger">unread message  {count}</Button>
   {!showbox && <div>
      {emails.map((email) => (
        
        <div className={classes["email-container"]} onClick={async ()=>{
                  await dispatch(PUTEmail(email,email.key))
                 dispatch(GetEmail()) 
                   
          }} key={email.key}>
         {  !email.read &&  <CiUnread  size="2em" color="#00008b" /> }
          <div className={classes["email-header"]}>
            <div className={classes["email-subject"]}><span style={{color:"green",}}>Subject: </span>{email.subjectmail}</div>
            <div className={classes["email-sender"]}><div style={{color:"red"}}>From: </div>{email.senderemail}</div>
          </div>
          <div className={classes["email-body"]}>{email.body}</div>
        </div>
       
      ))}
    </div> }
    {showbox && <EmailCompose/>}
    </>

  );
}

export default Inbox;
