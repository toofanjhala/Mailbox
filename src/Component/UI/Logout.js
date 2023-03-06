import React from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { AuthAction } from '../../Store/AuthSlice'


export const Logout = () => {
  let navigate = useNavigate()
  const dispatch = useDispatch()


  function logouthandler() {
    dispatch(AuthAction.logout())
    navigate("/")
  }
  return (
    <Button variant='warning' onClick={logouthandler} style={{ position: "relative", top: "0", right: "0", margin: "14px" }}>Logout</Button>
   )
}