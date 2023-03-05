import React from 'react'
import { Header } from '../UI/Header'
import classes from "./Home.module.css"
import EmailCompose from './EmailCompose';

export const Home = () => {
  return (
    <React.Fragment>
    <Header/>
    <h2 className={classes.welcome}> Welcome to Mail box</h2>
    <EmailCompose/>
   </React.Fragment>
  )
}
