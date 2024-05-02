import React from 'react';
import './Header.css';
import HeaderOption from './HeaderOption'
import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import ChatIcon from '@material-ui/icons/Chat';
import NotificationsIcon from '@material-ui/icons/Notifications';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import EventIcon from '@mui/icons-material/Event';
import LogoutIcon from '@mui/icons-material/Logout';
import PfwLogo from './../assets/Logos/pfw.png'
import Logo from './../assets/Logos/logo.png'
import { Link, useNavigate } from "react-router-dom";


function Header() {
    const navigator = useNavigate();

    const logoutOfApp = ()=>{
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigator('/login');

    };
    return (
        <div className="header">
            <div className='header__images'>
                <img
                    className='pfw__logo'
                    src={PfwLogo}
                    alt="PFW logo"
                />
                <img
                    className='app__logo'
                    src={Logo}
                    alt="APP logo"
                />
            </div>
            <div className="header__left">
                <div className="header__search">
                    <SearchIcon style={{ color: 'black' }}/>
                    <input type="text"  placeholder="Search"/>
                </div>
            </div>
            
            <div className="header__right">
                <Link to='/home' style={{ textDecoration: 'none' }}><HeaderOption Icon={HomeIcon} title ="Home"/></Link>
                <Link to='/network' style={{ textDecoration: 'none' }}><HeaderOption Icon={SupervisorAccountIcon} title ="People"/></Link>
                <Link to='/home' style={{ textDecoration: 'none' }}><HeaderOption Icon={BusinessCenterIcon} title ="Jobs"/></Link>
                <Link to='/home' style={{ textDecoration: 'none' }}><HeaderOption Icon={PersonSearchIcon} title ="Match"/></Link>
                <Link to='/home' style={{ textDecoration: 'none' }}><HeaderOption Icon={EventIcon} title ="Event"/></Link>
                <Link to='/home' style={{ textDecoration: 'none' }}><HeaderOption Icon={ChatIcon} title ="Messaging"/></Link>
                <Link to='/notification' style={{ textDecoration: 'none' }}><HeaderOption Icon={NotificationsIcon} title ="Notifications"/></Link>
                <HeaderOption Icon={LogoutIcon} title ="Log Out" onClick ={logoutOfApp}/>
            </div>
        </div>
    );
}

export default Header