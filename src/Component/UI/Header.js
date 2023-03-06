import React from 'react'
import { NavLink } from 'react-router-dom';
import classes from './Header.module.css';
import { Logout } from './Logout';
import { useSelector } from 'react-redux';


export const Header = () => {

    const isLoggein = useSelector(state => state.Auth.isLoggein)

    return (
        <header className={classes.sticky}>
            <nav className={classes.navbar}>
                <h1 className={classes.navbar__title}>MailBox</h1>
                <ul className={classes.navbar__list}>
                    {!isLoggein && <li>
                        <NavLink to="/" className={classes.navbar__link} activeclassname={classes.active}>
                            Login
                        </NavLink>
                    </li>}
                    {isLoggein && <li>
                        <NavLink to="/home" className={classes.navbar__link} activeclassname={classes.active}>
                            Home
                        </NavLink>
                    </li>}
                    {isLoggein && <li>
                        <NavLink to="/inbox" className={classes.navbar__link} activeclassname={classes.active}>
                            Inbox
                        </NavLink>
                    </li>}
                    {isLoggein && <li>
                        <NavLink to="/sent" className={classes.navbar__link} activeclassname={classes.active}>
                            Sent
                        </NavLink>
                    </li>}
                </ul>
                {isLoggein && <Logout />}
            </nav>
        </header>
    );
}
