import React from 'react'
import { NavLink } from 'react-router-dom';
import './Header.css';
// import { Logout } from '../functionality/logout'
import { useSelector } from 'react-redux';


export const Header = () => {
 
  const isLoggein=useSelector(state=>state.Auth.isLoggein)
  
  return (
    <header className="sticky">
      <nav className="navbar">
        <h1 className="navbar__title">MailBox</h1>
   


        <ul className="navbar__list">
          {!isLoggein && <li>
            <NavLink to="/" className="navbar__link" activeclassname="active">
              Login
            </NavLink>
          </li>}
          {isLoggein && <li>
            <NavLink to="/home" className="navbar__link" activeclassname="active">
              Home
            </NavLink>
          </li>}
           {/* {!isLoggein && <li>
            <NavLink to="/resetpassword" className="navbar__link" activeclassname="active">
              Resetpassword
            </NavLink>
          </li>} */}
        </ul>
        {/* {isLoggein && <Logout />} */}
      </nav>
    </header>
  );
}
