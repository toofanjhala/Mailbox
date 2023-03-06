import React, { useState ,useEffect} from "react";
import classes from "./Sent.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Header } from '../UI/Header'
import { Button } from "react-bootstrap";
import EmailCompose from "./EmailCompose";
import { SentGetEmail } from "../../Store/EmailAction";



function Sent() {
  const count = useSelector((state) => state.Email.sendcount)

  const emails = useSelector((state) => state.Email.sendmaildata)
  console.log(emails)
  const [showbox, setshowbox] = useState(false)

  
const dispatch = useDispatch()
  useEffect(() => {
    dispatch(SentGetEmail())

  }, [count, dispatch]);

  
  function composeHandler() {
    setshowbox(!showbox)
  }

  const emailaddress=localStorage.getItem("email")



  return (
    <>
      <Header />
      <h2 className={classes.welcome}>Sentbox of {emailaddress}</h2>
      <Button className={classes.composebutton} variant="info" onClick={composeHandler}>Compose</Button>
      <Button className={classes.composebutton} variant="danger"> Total Sent {count}</Button>
      {!showbox && <div>
        {emails.map((email) => (

          <div className={classes["email-container"]} key={email.key}>
          <div className={classes["email-header"]}>
              <div className={classes["email-subject"]}><span style={{ color: "green", }}>Subject: </span>{email.subjectmail}</div>
              <div className={classes["email-sender"]}><div style={{ color: "red" }}>To: </div> {email.receivermail} </div>
            </div>
            <div className={classes["email-body"]}>{email.body}</div>
            <div className={classes.button}>
              {/* <Button variant="danger" onClick={async() => {
                await dispatch(DeleteEmail(email, email.key))
                await dispatch(GetEmail())
              }}>Delete</Button> */}
             </div>
             </div>

        ))}
      </div>}
      {showbox && <EmailCompose />}
    </>

  );
}

export default Sent;
