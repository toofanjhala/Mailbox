import React from 'react';
import { useState, useRef } from 'react';
import { Header } from '../UI/Header';
import classes from "./AuthenticationForm.module.css";
import { useDispatch } from 'react-redux';
import { AuthAction } from '../../Store/AuthSlice';
import { useNavigate } from 'react-router-dom';


const AuthForm = () => {

    const dispatch = useDispatch()
    const Navigate = useNavigate()

    const emailref = useRef("")
    const passwordref = useRef("")
    const confirmpasswordref = useRef("")
    const [isLogin, setIsLogin] = useState(true);
    const [request, setrequest] = useState(false)

    const switchAuthModeHandler = () => {
        setIsLogin((prevState) => !prevState);
    };


    function submithandler(event) {
        setrequest(true)
        event.preventDefault();
        const enteredemail = emailref.current.value;
        const enteredpassword = passwordref.current.value;
        const editedemail = enteredemail.replace(/[^a-zA-Z]/g, '');
        if (!isLogin) {
            const enterconfirmpswrd = confirmpasswordref.current.value

            if (enterconfirmpswrd !== enteredpassword) {
                alert("password is in correct")
                setrequest(false)
                return
            }
        }

       let url;

        if (isLogin) {


            url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCEAcggTLIMyaHSiIoTqwLjlyFaFnOJtA0"

        }
        else {
            url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCEAcggTLIMyaHSiIoTqwLjlyFaFnOJtA0"
        }
        fetch(url,
            {
                method: "POST",
                body: JSON.stringify({
                    email: enteredemail,
                    password: enteredpassword,
                    returnSecureToken: true
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((res) => {
                setrequest(false)
                if (res.ok) {
                    return res.json()
                }
                else {
                    return res.json().then((data) => {

                        let error = "Authentication failed"
                        throw new Error(error)

                    })
                }

            }).then((data) => {
                Navigate("/home")
                dispatch(AuthAction.login(data.idToken))
                console.log("login")
                localStorage.setItem("email", editedemail)

            })
            .catch((Err) => {
                alert(Err.message)
            })
    }
    return (
        <>
            <Header />
            <h2 className={classes.welcome} > MailBox Authentication</h2>
              <section className={classes.auth} >
                <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
                <form>
                    <div className={classes.control}>
                        <label htmlFor='email'>Your Email</label>
                        <input type='email' id='email' required ref={emailref} />
                    </div>
                    <div className={classes.control}>
                        <label htmlFor='password'>Your Password</label>
                        <input
                            type='password'
                            id='password'
                            required
                            ref={passwordref}
                        />
                    </div>
                    {!isLogin && <div className={classes.control}>
                        <label htmlFor='confirmpassword'>Confirm Password</label>
                        <input
                            type='password'
                            id='confirmpassword'

                            required
                            ref={confirmpasswordref}
                        />
                    </div>}
                    <div className={classes.actions}>
                        {request ? <p> Request sending</p> : <button onClick={submithandler}>{isLogin ? 'Login' : 'Sign up'}</button>}

                    </div>
                </form>
            </section>
            <div className={classes.actions}>
                <button
                    type='button'
                    className={classes.toggle}
                    onClick={switchAuthModeHandler}
                >
                    {isLogin ? 'Create new account' : 'Have an account? Login'}
                </button>
            </div>
        </>
    );
};



export default AuthForm;