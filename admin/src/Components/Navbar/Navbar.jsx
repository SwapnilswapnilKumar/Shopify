import React from 'react';
import navlogo from '../Assets/nav-logo.svg';
import navprofileIcon from '../Assets/nav-profile.svg';
import './Navbar.css';



const Navbar= ()=>{

    return (
        <div className='navbar'>
            <img src={navlogo} className='nav-logo' alt="logo of navbar" />
            <img src={navprofileIcon} className='profile' alt="nav profile icon" />


        </div>
    )
}

export default Navbar;