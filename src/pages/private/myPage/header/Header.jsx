import React from 'react';
import { NavLink } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';
import { BsHouse } from 'react-icons/bs';
import { BsPlusSquareFill } from 'react-icons/bs';
// eslint-disable-next-line no-unused-vars
import headerm from "./headerm.scss";

export default function Header() {
    return (
        <header className='header-top'>
            <NavLink to = '/feed'><span className='header_image'> 
            {/* нужно поставить модалку с подтверждением */}
                Gigagram
            </span></NavLink>

            <div className=''>
                <NavLink to="/landing"><span className='button_landing'><BsSearch /></span></NavLink>
                <NavLink to="/signin"><span className='button_create'><BsPlusSquareFill/></span></NavLink>
                <NavLink to="/"><span className='landing'><BsHouse/></span></NavLink>
            </div>
        </header>
    );
};