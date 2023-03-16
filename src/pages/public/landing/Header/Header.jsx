import React from 'react';
import { NavLink } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import headerm from "./headerm.scss";

export default function Header() {
    return (
        <header>
            <figure className='header_image'>
                {/* <img src="" alt="logo" className='image_logo'/> */}
                Gigagram
            </figure>
            <div className='header_buttons'>
                <NavLink to="/signin"><button className='button_signin'>Sign In</button></NavLink>|
                <NavLink to="/signup"><button className='button_signup'>Sign Up</button></NavLink>
            </div>
        </header>
    );
};