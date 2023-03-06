import React, { useEffect, useState } from "react";
import classes from "./Inbox.module.css";
import { useDispatch, useSelector } from "react-redux";
import { GetEmail } from "../../Store/EmailAction";
import { Header } from '../UI/Header'
import { Button } from "react-bootstrap";
import EmailCompose from "./EmailCompose";
import { CiUnread } from "react-icons/ci";
import { PUTEmail, DeleteEmail } from "../../Store/EmailAction";



function Inbox() {
  const count = useSelector((state) => state.Email.count)
  const [showbox, setshowbox] = useState(false)

  const emails = useSelector((state) => state.Email.maildata)


  function composeHandler() {
    setshowbox(!showbox)
  }
  const dispatch = useDispatch()
  useEffect(() => {
    const intervalid=setInterval(()=>{
      dispatch(GetEmail())
    },1000)
console.log("useeffect")
    return(()=>{
      
      clearInterval(intervalid)
    })
   

  }, [count, dispatch]);

  const emailaddress=localStorage.getItem("receiver")



  return (
    <>
      <Header />
      <h2 className={classes.welcome}>Inbox of {emailaddress}</h2>
      <Button className={classes.composebutton} variant="info" onClick={composeHandler}>Compose</Button>
      <Button className={classes.composebutton} variant="danger">unread message  {count}</Button>
      {!showbox && <div>
        {emails.map((email) => (

          <div className={classes["email-container"]} key={email.key}>
            {!email.read && <CiUnread size="2em" color="#00008b" />}
            <div className={classes["email-header"]}>
              <div className={classes["email-subject"]}><span style={{ color: "green", }}>Subject: </span>{email.subjectmail}</div>
              <div className={classes["email-sender"]}><div style={{ color: "red" }}>From: </div>  {email.senderemail} </div>
            </div>
            <div className={classes["email-body"]}>{email.body}</div>
            <div className={classes.button}>
              <Button variant="danger" onClick={async() => {
                await dispatch(DeleteEmail(email, email.key))
                // await dispatch(GetEmail())
              }}>Delete</Button>
              <span>  </span>
              <Button variant="success"onClick={async () => {
               await dispatch(PUTEmail(email, email.key))
               
              }}>Mark as read</Button> </div>

          </div>

        ))}
      </div>}
      {showbox && <EmailCompose />}
    </>

  );
}

export default Inbox;
