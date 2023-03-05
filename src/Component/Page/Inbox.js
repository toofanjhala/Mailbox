import React, {  useEffect,useState } from "react";
import classes from "./Inbox.module.css";
import { useDispatch ,useSelector} from "react-redux";
import { GetEmail } from "../../Store/EmailAction";
import { Header } from '../UI/Header'
import { Button } from "react-bootstrap";
import EmailCompose from "./EmailCompose";

function Inbox() {
const [showbox,setshowbox]=useState(false)
const emails=useSelector((state)=>state.Email.maildata)
console.log(emails)

  function composeHandler(){
       setshowbox(!showbox)
  }
  const dispatch=useDispatch()
  useEffect(() => {
    dispatch(GetEmail())
   
  }, [dispatch]);

  return (
   <>
    <Header/>
    <Button className={classes.composebutton}  variant="info" onClick={composeHandler}>Compose</Button>
   {!showbox && <div>
      {emails.map((email) => (
        <div className={classes["email-container"]} key={email.key}>
          <div className={classes["email-header"]}>
            <div className={classes["email-subject"]}>{email.subjectmail}</div>
            <div className={classes["email-sender"]}>{email.senderemail}</div>
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
